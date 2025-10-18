import { Request, Response } from "express";
import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { Booking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
import { Reservation } from "../../../infrastructure/database/mogodb/models/Reservation";
import { SeatLock } from "../../../infrastructure/database/mogodb/models/SeatLock";
import mongoose from "mongoose";
import { io } from "../../../presentation/server";

export const updatePaymentStatusController = (dependencies: IDependencies) => {
  const {
    useCases: { updatePaymentStatusUseCase },
  } = dependencies;

  // ✅ Add types for req, res
  return async (req: Request, res: Response): Promise<void> => {
    const { sessionId } = req.params;
    const { paymentStatus } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const booking = await Booking.findOne({ sessionId }).session(session);
      if (!booking) throw new Error("Booking not found");

      const showId = booking.showId;
      const selectedSeats = booking.selectedSeats;

      await updatePaymentStatusUseCase(dependencies).execute(
        sessionId,
        paymentStatus
      );

      //  Add reserved seats atomically
      await Reservation.findOneAndUpdate(
        { showId },
        { $addToSet: { reservedSeats: { $each: selectedSeats } } },
        { upsert: true, session }
      );

      //  Delete seat locks
      await SeatLock.deleteMany({
        showId,
        seatId: { $in: selectedSeats },
      }).session(session);

      await session.commitTransaction();
      session.endSession();

      //  Notify show room
      io.to(showId.toString()).emit("seat:sold", {
        showId,
        seatIds: selectedSeats,
      });

      res.status(200).json({ success: true, message: "Booking finalized" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Payment update failed:", error);
      res
        .status(500)
        .json({ success: false, message: "Payment update failed" });
    }
  };
};
