import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const UserGetOTTMoviesListController = (dependencies: IDependencies) => {
  const {
    useCases: { userGetOTTMoviesUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Movies = await userGetOTTMoviesUseCase(dependencies).execute();

      if (!Movies) {
        throw new Error("Movies Not Available");
      }

      res.status(200).json({
        success: true,
        data: Movies,
        message: "Got Movies!",
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };
};
