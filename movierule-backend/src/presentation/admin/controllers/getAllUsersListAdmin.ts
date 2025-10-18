import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const getAllUsersAdminController = (
  dependencies: IAdminDependencies
) => {
  const {
    useCases: { getAllUsersAdminUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Users = await getAllUsersAdminUseCase(dependencies).execute();
      if (!Users) {
      }
      res.status(200).json({
        success: true,
        data: Users,
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
