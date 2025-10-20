import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { Reservation } from "../../../infrastructure/database/mogodb/models/Reservation";
import { NextFunction, Request, Response } from "express";

// export const getReservation = (dependencies: IDependencies) => {
 

//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const {showId}: any = req.params;

//         console.log(showId,"shiw id in bakcedn for getting reservations");
        
//         const reservedSeats = await Reservation.findOne({showId})
//         if(!reservedSeats){
//             throw new Error("No Resevation found")
//         } else {
//             res.status(200).json({
//               success: true,
//               data: reservedSeats,
//               message: "All theater shows fetched successfully",
//             });
//         }

//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: (error as Error)?.message || "Internal server error",
//       });
//     }
//   };
// };

export const getReservation = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { showId } = req.params;

      console.log(showId, "🎬 Fetching reservations for showId");

      // Find the reservation for this show
      const reservation = await Reservation.findOne({ showId });

      // ✅ If no reservation found, return empty reservedSeats array
      if (!reservation) {
        return res.status(200).json({
          success: true,
          data: { reservedSeats: [] },
          message: "No reservations yet",
        });
      }

      // ✅ If found, return its reservedSeats
      return res.status(200).json({
        success: true,
        data: reservation,
        message: "Reserved seats fetched successfully",
      });
    } catch (error: any) {
      console.error("❌ Reservation fetch error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
};
