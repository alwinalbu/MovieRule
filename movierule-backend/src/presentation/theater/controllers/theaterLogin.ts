import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { NextFunction, Request, Response, CookieOptions } from "express";

export const theaterLoginController = (dependencies: ITheaterDependencies) => {
  const {
    useCases: { loginTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const theater = await loginTheaterUseCase(dependencies).execute(
        email,
        password
      );

      if (!theater) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (theater.status !== "active") {
        return res.status(403).json({ message: "You are not approved yet" });
      }

      // ✅ Generate JWTs
      const accessToken = generateAccessToken({
        _id: String(theater._id),
        email: theater.email!,
        role: theater.role!,
      });

      const refreshToken = generateRefreshToken({
        _id: String(theater._id),
        email: theater.email!,
        role: theater.role!,
      });

      // ✅ Detect environment
      const isProduction = process.env.NODE_ENV === "production";

      // ✅ Universal cookie options
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction, // secure only in production (HTTPS)
        sameSite: (isProduction ? "none" : "lax") as
          | true
          | "none"
          | "lax"
          | "strict",
        domain: isProduction ? ".movierule.shop" : undefined, // ✅ allows across subdomains
        path: "/", // ✅ send on all routes
      };

      // ✅ Set tokens in cookies
      res.cookie("access_token", accessToken, cookieOptions);
      res.cookie("refresh_token", refreshToken, cookieOptions);

      // ✅ Success response
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: theater,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
};


