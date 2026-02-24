import { Request, Response } from "express";
import mongoose from "mongoose";
import { SeatLock } from "../../../infrastructure/database/mogodb/models/SeatLock";
import { Reservation } from "../../../infrastructure/database/mogodb/models/Reservation";
import { io } from "../../../presentation/server";

export const lockSeatsController = async (req: Request, res: Response) => {
  const { showId, seatIds } = req.body;
  const userId = req.user?._id;

  if (!showId || !seatIds?.length) {
    return res.status(400).json({ message: "showId and seatIds are required" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 2 * 60 * 1000); // 2 mins

    // 🔍 1️⃣ Check sold seats (Reservation)
    const reservation = await Reservation.findOne({ showId }).session(session);
    const soldSeats = reservation ? reservation.reservedSeats : [];
   const invalidSeats = seatIds.filter((id: string) => soldSeats.includes(id));
   if (invalidSeats.length > 0) {
     throw { code: 409, lockedSeatIds: invalidSeats };
   }


    // 🔍 2️⃣ Check if already locked by someone else
    const existingLocks = await SeatLock.find({
      showId,
      seatId: { $in: seatIds },
      expiresAt: { $gt: now },
    }).session(session);

    if (existingLocks.length > 0) {
      const lockedSeatIds = existingLocks.map((l) => l.seatId);
      throw { code: 409, lockedSeatIds };
    }

    // 🔒 3️⃣ Lock seats
    const seatDocs = seatIds.map((seatId: string) => ({
      showId,
      seatId,
      userId,
      expiresAt,
    }));
    await SeatLock.insertMany(seatDocs, { session });

    await session.commitTransaction();
    session.endSession();

    // 🎯 Notify all users in room except locker
    io.to(showId.toString()).emit("seat:locked", { showId, seatIds, userId });

    res.status(200).json({
      success: true,
      lockedSeats: seatIds,
      expiresAt,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    if (error.code === 409) {
      return res.status(409).json({
        message: "Some seats already locked or sold",
        lockedSeatIds: error.lockedSeatIds,
      });
    }

    console.error("Lock seats error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


