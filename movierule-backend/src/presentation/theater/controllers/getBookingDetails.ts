import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";

export const getBookingDetailsController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { getBookingDetailsUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId } = req.params;

      console.log(bookingId, "id of booking backend");

      // Execute the use case to get booking details
      const bookingDetails = await getBookingDetailsUseCase(
        dependencies
      ).execute(bookingId);

      console.log(bookingDetails, "inside the backend controller");

      if (!bookingDetails) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }

      res.status(200).json({ success: true, data: bookingDetails });
    } catch (error: any) {
      console.error("Failed to get booking details:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
};
