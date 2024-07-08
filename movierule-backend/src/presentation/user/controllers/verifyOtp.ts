
import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { Otp } from "@/infrastructure/database/mogodb/models/otpSchema";
import { hashPassword } from "@/utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";

import { NextFunction, Request, Response } from "express";

export const verifyOtpController = (dependencies: IDependencies) => {
  const {
    useCases: { verifyOtpUseCase, createUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { otp, email, username, password } = req.body;

    console.log(req.body,"inside verify controller data from front end");
    

      const isOtpVerified = await verifyOtpUseCase(dependencies).execute(
        email,
        otp
      );

      console.log(isOtpVerified,"otpverified or not");
      
      if (isOtpVerified) {

        // Hash the password before creating the user
        const hashedPassword = await hashPassword(password);

        // Create the user
        const user = await createUserUseCase(dependencies).execute({
          email,
          username,
          password: hashedPassword,
        });

        if (!user) {
          throw new Error("User creation failed");
        }

        // Delete the OTP record after successful verification and user creation
        await Otp.deleteOne({ email });

        // Generate JWT tokens using user._id
        const accessToken = generateAccessToken({
          _id: String(user._id),
          email: user.email!,
          role: user.role!,
        });

        const refreshToken = generateRefreshToken({
          _id: String(user._id),
          email: user.email!,
          role: user.role!,
        });

        // Set cookies with tokens
        res.cookie("access_token", accessToken, {
          httpOnly: true,
        });

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
        });

        res.status(200).json({
          success: true,
          message: "OTP verified and user created successfully",
          data: user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Error verifying OTP" });
    }
  };
};
