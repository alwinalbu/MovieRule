import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { Otp } from "../../../infrastructure/database/mogodb/models/otpSchema";
import { hashPassword } from "../../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const verifyOtpController = (dependencies: IDependencies) => {
  const {
    useCases: { verifyOtpUseCase, createUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { otp, email, username, password } = req.body;
      console.log(req.body, "Inside verifyOtpController: frontend data");

      const isOtpVerified = await verifyOtpUseCase(dependencies).execute(
        email,
        otp
      );
      console.log(isOtpVerified, "OTP verified or not");

      if (!isOtpVerified) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }

      // ✅ Hash password before creating the user
      const hashedPassword = await hashPassword(password);

      // ✅ Create new user
      const user = await createUserUseCase(dependencies).execute({
        email,
        username,
        password: hashedPassword,
      });

      if (!user) {
        throw new Error("User creation failed");
      }

      // ✅ Delete OTP record
      await Otp.deleteOne({ email });

      // ✅ Generate tokens
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

      // ✅ Environment check
      const isProduction = process.env.NODE_ENV === "production";

      // ✅ Set cookies correctly
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
        message: "OTP verified and user created successfully",
        data: user,
      });
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Error verifying OTP" });
    }
  };
};

