import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const getAllOTTMoviesAdminController = (
  dependencies: IAdminDependencies
) => {
  const {
    useCases: { getAllOTTMoviesUseCase},
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Movies = await getAllOTTMoviesUseCase(dependencies).execute();

      if (!Movies) {
        throw new Error("Movies Not Available");
      }

      res.status(200).json({
        success: true,
        data: Movies,
        message: "getAllOTTMovies!",
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: (error as Error)?.message,
      });
    }
  };
};
