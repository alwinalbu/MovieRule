import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";

export const theaterGetAllMoviesListController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { theaterGetAllMoviesUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Movies = await theaterGetAllMoviesUseCase(dependencies).execute();

      if (!Movies) {
        throw new Error("Movies Not Available");
      }

      res.status(200).json({
        success: true,
        data: Movies,
        message: "getAllTheatersMovies!",
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: (error as Error)?.message,
      });
    }
  };
};
