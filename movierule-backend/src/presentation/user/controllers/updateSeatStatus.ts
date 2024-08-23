import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const updateSeatStatusController = (dependencies: IDependencies) => {
  const {
    useCases: { userUpdateSeatStatusUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { screenId } = req.params;
      const { selectedSeats }: { selectedSeats: string[] } = req.body;

      console.log(screenId,selectedSeats,"seat status update.........");
      

      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const seatsUpdated = await userUpdateSeatStatusUseCase(dependencies).execute(
        screenId,
        selectedSeats
      );

      if (!seatsUpdated) {
        return res.status(400).json({ message: "No seats were updated" });
      }

      console.log(seatsUpdated,"seat update from backend after booking..........................................");
      

      return res.status(200).json({ message: "Seats updated successfully" });
    } catch (error: any) {
      console.error("Update seat status error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
