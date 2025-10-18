import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const theaterLoginController = (dependencies: ITheaterDependencies) => {
  const {
    useCases: { loginTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const isProduction = process.env.NODE_ENV === "production";

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

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
      });

      return res.status(200).json({
        message: "Login successful",
        data: theater,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};

