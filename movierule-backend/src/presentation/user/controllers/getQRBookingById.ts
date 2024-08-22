import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";


export const getQRBookingIdController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { getQRBookingByIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    
    const { bookingId } = req.params;

    try {

      if (!bookingId) {
        return res.status(400).json({ error: "Missing bookingId" });
      }

      const booking = await getQRBookingByIdUseCase(dependencies).execute(
        bookingId
      );

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.status(200).json({ booking });
    } catch (error) {
      console.error("Failed to fetch booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  };
};
