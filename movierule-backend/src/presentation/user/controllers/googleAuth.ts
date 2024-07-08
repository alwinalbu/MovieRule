import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { UserEntity } from "@/domain/user/entities";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { generateRandomString } from "@/utils/generateRamdomString";
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
          message:
            "Google token is invalid or does not contain an email address.",
        });
      }

      const { email, given_name, family_name, sub } = payload;

      const exist = await findUserByEmailUseCase(dependencies).execute(email);

      if (exist) {
        const accessToken = generateAccessToken({
          _id: String(exist?._id),
          email: exist?.email!,
          role: exist?.role!,
        });

        const refreshToken = generateRefreshToken({
          _id: String(exist?._id),
          email: exist?.email!,
          role: exist?.role!,
        });

        res.cookie("access_token", accessToken, {
          httpOnly: true,
        });

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
        });

        return res.status(200).json({
          success: true,
          data: exist,
          message: "User Google login!",
        });
      }

      const newUser: UserEntity = {
        username: given_name, // Generate a random username
        email: email,
        password: `${generateRandomString()}`, // Generate a random password
        role: "user", // Default role
        status: "active", // Default status
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await createUserUseCase(dependencies).execute(newUser);

      if (!result) {
        throw new Error("User creation failed!");
      }

      const accessToken = generateAccessToken({
        _id: String(result?._id),
        email: result?.email!,
        role: result?.role!,
      });

      const refreshToken = generateRefreshToken({
        _id: String(result?._id),
        email: result?.email!,
        role: result?.role!,
      });

      res.cookie("access_token", accessToken, {
        httpOnly: true,
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        data: result,
        message: "User Google signup!",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
