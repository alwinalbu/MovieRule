


import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const userGetAllBookingsController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllBookingsUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { userId } = req.params;

      console.log(userId,"userid in backend");
      

      const bookings = await getAllBookingsUseCase(dependencies).execute(
        userId
      );

      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ error: "No bookings found" });
      }


      return res.status(200).json({ bookings });
    } catch (error:any) {
      console.error("Failed to fetch bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  };
};
