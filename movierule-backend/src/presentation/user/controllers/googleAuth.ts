import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { UserEntity } from "../../../domain/user/entities";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { generateRandomString } from "../../../utils/generateRamdomString";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthController = (dependencies: IDependencies) => {
  const {
    useCases: { createUserUseCase, findUserByEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { credential } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        return res.status(400).json({
          success: false,
          message: "Invalid Google token or missing email",
        });
      }

      const { email, given_name } = payload;
      const existingUser = await findUserByEmailUseCase(dependencies).execute(
        email
      );

      // ✅ Environment check
      const isProduction = process.env.NODE_ENV === "production";

      // ========== If user already exists ==========
      if (existingUser) {
        const accessToken = generateAccessToken({
          _id: String(existingUser._id),
          email: existingUser.email!,
          role: existingUser.role!,
        });

        const refreshToken = generateRefreshToken({
          _id: String(existingUser._id),
          email: existingUser.email!,
          role: existingUser.role!,
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
          success: true,
          message: "User logged in via Google",
          data: existingUser,
        });
      }

      // ========== New Google signup ==========
      const newUser: UserEntity = {
        username: given_name,
        email,
        password: generateRandomString(),
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await createUserUseCase(dependencies).execute(newUser);
      if (!result) throw new Error("User creation failed");

      const accessToken = generateAccessToken({
        _id: String(result._id),
        email: result.email!,
        role: result.role!,
      });

      const refreshToken = generateRefreshToken({
        _id: String(result._id),
        email: result.email!,
        role: result.role!,
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
        success: true,
        message: "User signed up via Google",
        data: result,
      });
    } catch (error: any) {
      console.error("Google auth error:", error);
      next(error);
    }
  };
};

