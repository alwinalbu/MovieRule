import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction } from "express";

export const logoutAdminController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.cookie("refresh_token", "", {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  };
};
