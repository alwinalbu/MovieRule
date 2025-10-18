import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { Otp } from "../../../infrastructure/database/mogodb/models/otpSchema";
import { hashPassword } from "../../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const verifyTheaterOtpController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { verifyTheaterOtpUseCase, createTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        otp,
        email,
        username,
        password,
        role,
        status,
        OwnerName,
        address,
        city,
        state,
        zipCode,
        phone,
        profilePicture,
        aadhaarCard,
        licenseDocument,
      } = req.body;

      const isOtpVerified = await verifyTheaterOtpUseCase(dependencies).execute(
        email,
        otp
      );

      if (!isOtpVerified) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      // ✅ Hash password before saving
      const hashedPassword = await hashPassword(password);

      // ✅ Create new theater
      const theater = await createTheaterUseCase(dependencies).execute({
        email,
        username,
        password: hashedPassword,
        role,
        status,
        OwnerName,
        address,
        city,
        state,
        zipCode,
        phone,
        profilePicture,
        aadhaarCard,
        licenseDocument,
      });

      if (!theater) throw new Error("Theater creation failed");

      // ✅ Delete OTP record
      await Otp.deleteOne({ email });

      // ✅ Generate JWT tokens
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

      const isProduction = process.env.NODE_ENV === "production";

      // ✅ Set cookies safely
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
        message: "OTP verified and theater created successfully",
        data: theater,
      });
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Error verifying OTP" });
    }
  };
};

