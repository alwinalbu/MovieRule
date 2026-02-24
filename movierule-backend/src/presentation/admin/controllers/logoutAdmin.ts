import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { Request, Response, NextFunction, CookieOptions } from "express";

export const logoutAdminController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isProduction = process.env.NODE_ENV === "production";

      // ✅ Shared cookie options for clearing
      const clearCookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: (isProduction ? "none" : "lax") as
          | true
          | "none"
          | "lax"
          | "strict",
        domain: isProduction ? ".movierule.shop" : undefined, // ✅ clears across movierule.shop + www.movierule.shop
        path: "/", // ✅ clears on all routes
      };

      // ✅ Safely clear both cookies
      res.clearCookie("access_token", clearCookieOptions);
      res.clearCookie("refresh_token", clearCookieOptions);

      // ✅ Fallback: expire immediately (some browsers delay deletion)
      res.cookie("access_token", "", { ...clearCookieOptions, maxAge: 1 });
      res.cookie("refresh_token", "", { ...clearCookieOptions, maxAge: 1 });

      return res.status(204).json({
        success: true,
        message: "Admin logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      next(error);
    }
  };
};

