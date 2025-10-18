// import { IDependencies } from "../../../application/user/interfaces/IDependencies";
// import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
// import { NextFunction, Request, Response } from "express";

// export const loginUserController = (dependencies: IDependencies) => {
//   const {
//     useCases: { loginUserUseCase },
//   } = dependencies;

//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//         return res
//           .status(400)
//           .json({ message: "Email and password are required" });
//       }

//       const user = await loginUserUseCase(dependencies).execute(
//         email,
//         password
//       );

//       if (!user) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }

//       // ✅ Ensure user properties exist
//       const userId = user._id?.toString();
//       const userEmail = user.email;
//       const userRole = user.role;

//       if (!userId || !userEmail || !userRole) {
//         return res
//           .status(500)
//           .json({ message: "User information is incomplete" });
//       }

//       // ✅ Generate tokens
//       const accessToken = generateAccessToken({
//         _id: userId,
//         email: userEmail,
//         role: userRole,
//       });

//       const refreshToken = generateRefreshToken({
//         _id: userId,
//         email: userEmail,
//         role: userRole,
//       });

//       // ✅ Detect environment automatically
//       const isProduction = process.env.NODE_ENV === "production";

//       // ✅ Set cookies properly (works on localhost & production)
//       res.cookie("access_token", accessToken, {
//         httpOnly: true, // JS cannot access it
//         secure: isProduction, // true only on HTTPS
//         sameSite: isProduction ? "none" : "lax", // "none" → allows cross-site
//         path: "/", // send on all routes
//       });

//       res.cookie("refresh_token", refreshToken, {
//         httpOnly: true,
//         secure: isProduction,
//         sameSite: isProduction ? "none" : "lax",
//         path: "/",
//       });

//       // ✅ Success response
//       return res.status(200).json({
//         success: true,
//         message: "Login successful",
//         data: user,
//       });
//     } catch (error: any) {
//       console.error("Login error:", error);
//       return res
//         .status(500)
//         .json({ message: error.message || "Internal Server Error" });
//     }
//   };
// };

import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { NextFunction, Request, Response, CookieOptions } from "express";

export const loginUserController = (dependencies: IDependencies) => {
  const {
    useCases: { loginUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await loginUserUseCase(dependencies).execute(
        email,
        password
      );

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // ✅ Ensure user properties exist
      const userId = user._id?.toString();
      const userEmail = user.email;
      const userRole = user.role;

      if (!userId || !userEmail || !userRole) {
        return res
          .status(500)
          .json({ message: "User information is incomplete" });
      }

      // ✅ Generate tokens
      const accessToken = generateAccessToken({
        _id: userId,
        email: userEmail,
        role: userRole,
      });

      const refreshToken = generateRefreshToken({
        _id: userId,
        email: userEmail,
        role: userRole,
      });

      // ✅ Environment detection
      const isProduction = process.env.NODE_ENV === "production";

      // ✅ Shared cookie options
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction, // only true for HTTPS
        sameSite: (isProduction ? "none" : "lax") as
          | true
          | "none"
          | "lax"
          | "strict",
        domain: isProduction ? ".movierule.shop" : undefined,
        path: "/",
      };

      // ✅ Set cookies
      res.cookie("access_token", accessToken, cookieOptions);
      res.cookie("refresh_token", refreshToken, cookieOptions);

      // ✅ Success response
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};

