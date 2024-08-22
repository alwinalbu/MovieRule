import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { Request, Response, NextFunction } from "express";

export const getBookingsByTheaterIdController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { getBookingsByTheaterIdUseCase }, 
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const { theaterId } = req.params; 


    if (!req.user || !req.user._id) {
      return res.status(402).json("Authentication failed");
    }

    try {
      if (!theaterId) {
        return res.status(400).json({ error: "Missing theaterId" }); 
      }

      const bookings = await getBookingsByTheaterIdUseCase(
        dependencies
      ).execute(theaterId);

      if (!bookings || bookings.length === 0) {

        return res
          .status(404)
          .json({ error: "No bookings found for this theater" }); 
      }

      return res.status(200).json({ bookings });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  };
};
