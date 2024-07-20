// application/show/controllers/theaterGetAllShowsListController.ts
import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";

export const theaterGetAllShowsListController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { theaterGetAllShowsUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

       const { theaterId } = req.query;

       console.log(theaterId,"Theater-id inside the backend ");
       

       // Ensure theaterId is properly extracted from query parameters
       if (!theaterId || typeof theaterId !== "string") {
         throw new Error("Invalid theaterId provided");
       }

      const shows = await theaterGetAllShowsUseCase(dependencies).execute(
        theaterId
      );

      if (!shows) {
        throw new Error("Shows Not Available");
      }

      res.status(200).json({
        success: true,
        data: shows,
        message: "All theater shows fetched successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: (error as Error)?.message || "Internal server error",
      });
    }
  };
};
