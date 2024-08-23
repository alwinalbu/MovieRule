import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { Request, Response, NextFunction } from "express";

export const getALLBookingsController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { getALLBookingsUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {

    try {
     
      console.log("reached inside booking");
      
      const bookings = await getALLBookingsUseCase(dependencies).execute();

      if (!bookings || bookings.length === 0) {
        return res
          .status(404)
          .json({ error: "No bookings found for this theater" });
      }

      console.log(bookings,"backend answer");
      

      return res.status(200).json({ bookings });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  };
};
