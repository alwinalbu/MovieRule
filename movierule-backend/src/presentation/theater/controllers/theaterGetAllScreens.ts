
import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";

export const theaterGetAllScreensController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { theaterGetAllScreensUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { theaterId } = req.query;

      console.log(theaterId,"inside the screen backend");
      

      if (!theaterId || typeof theaterId !== "string") {
        throw new Error("Invalid theaterId provided");
      }

      const screens = await theaterGetAllScreensUseCase(dependencies).execute(
        theaterId
      );

      if (!screens) {
        throw new Error("Screens Not Available");
      }

      res.status(200).json({
        success: true,
        data: screens,
        message: "All screens fetched successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: (error as Error)?.message || "Internal server error",
      });
    }
  };
};

