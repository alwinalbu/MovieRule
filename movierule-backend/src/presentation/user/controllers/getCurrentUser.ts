
import { Request, Response, NextFunction } from "express";

export const getCurrentUserController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Not authenticated",
        });
      }

      console.log(req.user, "USER data is here in get CURRENT USER BACKEDN");

      return res.status(200).json({
        success: true,
        data: req.user, // { _id, email, role } from token
      });
    } catch (error) {
      next(error);
    }
  };
};
