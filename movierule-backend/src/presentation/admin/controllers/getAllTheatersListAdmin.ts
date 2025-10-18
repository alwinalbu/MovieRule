
import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";


export const getAllTheaterAdminController = (dependencies: IAdminDependencies) => {
  const {
    useCases: { getAllTheatersAdminUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Theaters = await getAllTheatersAdminUseCase(dependencies).execute();
      if (!Theaters) {
        
      }
      res.status(200).json({
        success: true,
        data: Theaters,
        message: "getAllTheaters!",
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: (error as Error)?.message,
      });
    }
  };
};
