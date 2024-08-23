import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";

export const logoutAdminController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", {
        maxAge: 1,
      });

      res.cookie("refresh_token", "", {
        maxAge: 1,
      });

      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  };
};
