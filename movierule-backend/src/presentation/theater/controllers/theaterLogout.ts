
import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { Request, Response, NextFunction } from "express";

export const theaterlogoutController = (dependencies: ITheaterDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isProduction = process.env.NODE_ENV === "production";

      res.cookie("access_token", "", {
        maxAge: 1,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
      });
      res.cookie("refresh_token", "", {
        maxAge: 1,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
      });

      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  };
};

