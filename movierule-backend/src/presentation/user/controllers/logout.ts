
import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { Request, Response, NextFunction, CookieOptions } from "express";

export const logoutController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isProduction = process.env.NODE_ENV === "production";

      // ✅ Shared cookie clearing options
      const clearCookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: (isProduction ? "none" : "lax") as
          | true
          | "none"
          | "lax"
          | "strict",
        domain: isProduction ? ".movierule.shop" : undefined, // ✅ ensures clearing across subdomains
        path: "/", // ✅ clears on all routes
      };

      // ✅ Clear both access and refresh tokens safely
      res.clearCookie("access_token", clearCookieOptions);
      res.clearCookie("refresh_token", clearCookieOptions);

      return res
        .status(204)
        .json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      next(error);
    }
  };
};
