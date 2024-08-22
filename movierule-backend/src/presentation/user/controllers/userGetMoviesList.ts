import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const UserGetMoviesListController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { userGetMoviesUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {

    try {
         
      const Movies = await userGetMoviesUseCase(dependencies).execute();

      if (!Movies) {
        throw new Error("Movies Not Available");
      }

      res.status(200).json({
        success: true,
        data: Movies,
        message: "gotMovies!",
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: (error as Error)?.message,
      });
    }
  };
};
