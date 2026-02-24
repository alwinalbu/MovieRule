
import { Request, Response, NextFunction } from "express";

export const getCurrentAdminController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Not authenticated",
        });
      }

      console.log(req.user, "ADMIN data is here in get CURRENT ADMIN");

      // Return admin info (from JWT payload)
      return res.status(200).json({
        success: true,
        data: req.user, // contains _id, email, role
      });
    } catch (error) {
      next(error);
    }
  };
};
