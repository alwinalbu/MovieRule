// import { IDependencies } from "@/application/user/interfaces/IDependencies";
// import { Request, Response, NextFunction } from "express";


// export const updatePaymentStatusController = (dependencies: IDependencies) => {
//   const {
//     useCases: { updatePaymentStatusUseCase },
//   } = dependencies;

//   return async (req: Request, res: Response, next: NextFunction) => {
//     const { sessionId } = req.params;
//     const { paymentStatus } = req.body;

//     console.log("Request body:", req.body);

//     console.log(paymentStatus,"status");
    
//     try {

//         if (!req.user || !req.user._id) {
//           return res.status(402).json("Authentication failed");
//         }

//       if (!sessionId || !paymentStatus) {
//         return res
//           .status(400)
//           .json({ error: "Missing sessionId or paymentStatus" });
//       }

//       const updatedBooking = await updatePaymentStatusUseCase(dependencies).execute(sessionId,paymentStatus);

//       console.log(updatedBooking,"updated booking in backend");
      
//       if (!updatedBooking) {
//         return res
//           .status(404)
//           .json({ error: "Booking not found or payment status update failed" });
//       }

//       res
//         .status(200)
//         .json({
//           message: "Payment status updated successfully",
//           booking: updatedBooking,
//         });
//     } catch (error) {
//       console.error("Failed to update payment status:", error);
//       res.status(500).json({ error: "Failed to update payment status" });
//     }
//   };
// };



import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { Booking } from "@/infrastructure/database/mogodb/models/BookingSchema";
import { Reservation } from "@/infrastructure/database/mogodb/models/Reservation";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";

export const updatePaymentStatusController = (dependencies: IDependencies) => {
  const {
    useCases: { updatePaymentStatusUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.params;
    const { paymentStatus } = req.body;

    console.log("Request body:", req.body);

    console.log(paymentStatus, "status");

    try {
      if (!req.user || !req.user._id) {
        return res.status(402).json("Authentication failed");
      }

      if (!sessionId || !paymentStatus) {
        return res
          .status(400)
          .json({ error: "Missing sessionId or paymentStatus" });
      }

      const updatedBooking = await updatePaymentStatusUseCase(
        dependencies
      ).execute(sessionId, paymentStatus);

      const booking = await Booking.findOne({sessionId})

      const showId: any = booking?.showId;

      const reservedseats=await Reservation.findOne(showId)

      const reservedSeats: any = booking?.selectedSeats;

      if (reservedseats) {
        reservedseats.reservedSeats.push(...reservedSeats);
        reservedseats.save()
      }else{
        await Reservation.create({ showId, reservedSeats });
      }

      console.log(updatedBooking, "updated booking in backend");

      if (!updatedBooking) {
        return res
          .status(404)
          .json({ error: "Booking not found or payment status update failed" });
      }

      res.status(200).json({
        message: "Payment status updated successfully",
        booking: updatedBooking,
      });
    } catch (error) {
      console.error("Failed to update payment status:", error);
      res.status(500).json({ error: "Failed to update payment status" });
    }
  };
};
