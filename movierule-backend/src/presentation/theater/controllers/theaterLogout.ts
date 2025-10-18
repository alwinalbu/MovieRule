
// import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
// import { Request, Response, NextFunction } from "express";

// export const theaterlogoutController = (dependencies: ITheaterDependencies) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const isProduction = process.env.NODE_ENV === "production";

//       res.cookie("access_token", "", {
//         maxAge: 1,
//         httpOnly: true,
//         secure: isProduction,
//         sameSite: isProduction ? "none" : "lax",
//         path: "/",
//       });
//       res.cookie("refresh_token", "", {
//         maxAge: 1,
//         httpOnly: true,
//         secure: isProduction,
//         sameSite: isProduction ? "none" : "lax",
//         path: "/",
//       });

//       res.status(204).json({});
//     } catch (error) {
//       next(error);
//     }
//   };
// };

import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { Request, Response, NextFunction, CookieOptions } from "express";

export const theaterlogoutController = (dependencies: ITheaterDependencies) => {
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
        domain: isProduction ? ".movierule.shop" : undefined, // ✅ ensures deletion across subdomains
        path: "/", // ✅ clears on all routes
      };

      // ✅ Use res.clearCookie instead of empty cookie (more reliable)
      res.clearCookie("access_token", clearCookieOptions);
      res.clearCookie("refresh_token", clearCookieOptions);

      // ✅ Optional: explicitly expire in case some browsers cache cookies
      res.cookie("access_token", "", { ...clearCookieOptions, maxAge: 1 });
      res.cookie("refresh_token", "", { ...clearCookieOptions, maxAge: 1 });

      return res
        .status(204)
        .json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      next(error);
    }
  };
};

