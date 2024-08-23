import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { Reservation } from "../../../infrastructure/database/mogodb/models/Reservation";
import { NextFunction, Request, Response } from "express";

export const getReservation = (dependencies: IDependencies) => {
 

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {showId}: any = req.params;
        const reservedSeats = await Reservation.findOne({showId})
        if(!reservedSeats){
            throw new Error("No Resevation found")
        } else {
            res.status(200).json({
              success: true,
              data: reservedSeats,
              message: "All theater shows fetched successfully",
            });
        }

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: (error as Error)?.message || "Internal server error",
      });
    }
  };
};
