
// import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
// import { Otp } from "@/infrastructure/database/mogodb/models/otpSchema";
// import { hashPassword } from "@/utils/bcrypt";
// import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
// import { NextFunction, Request, Response } from "express";

// export const verifyTheaterOtpController = (dependencies:ITheaterDependencies) => {
//   const {
//     useCases: { verifyTheaterOtpUseCase, createTheaterUseCase },
//   } = dependencies;

//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { otp, email, username, password } = req.body;

//       console.log(
//         req.body,
//         "inside verify theater controller data from front end"
//       );

//       const isOtpVerified = await verifyTheaterOtpUseCase(dependencies).execute(
//         email,
//         otp
//       );

//       console.log(isOtpVerified, "otp verified or not");

//       if (isOtpVerified) {
//         // Hash the password before creating the theater
//         const hashedPassword = await hashPassword(password);

//         // Create the theater
//         const theater = await createTheaterUseCase(dependencies).execute({
//           email,
//           username,
//           password: hashedPassword,
//           role: "theatre",
//           status: "pending",
//         });

//         if (!theater) {
//           throw new Error("Theater creation failed");
//         }

//         // Delete the OTP record after successful verification and theater creation
//         await Otp.deleteOne({ email });

//         // Generate JWT tokens using theater._id
//         const accessToken = generateAccessToken({
//           _id: String(theater._id),
//           email: theater.email!,
//           role: theater.role!,
//         });

//         const refreshToken = generateRefreshToken({
//           _id: String(theater._id),
//           email: theater.email!,
//           role: theater.role!,
//         });

//         // Set cookies with tokens
//         res.cookie("access_token", accessToken, {
//           httpOnly: true,
//         });

//         res.cookie("refresh_token", refreshToken, {
//           httpOnly: true,
//         });

//         res.status(200).json({
//           success: true,
//           message: "OTP verified and theater created successfully",
//           data: theater,
//         });
//       } else {
//         res.status(400).json({
//           success: false,
//           message: "Invalid OTP",
//         });
//       }
//     } catch (error: any) {
//       console.error("Error verifying OTP:", error);
//       res.status(500).json({ error: "Error verifying OTP" });
//     }
//   };
// };


import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { Otp } from "@/infrastructure/database/mogodb/models/otpSchema";
import { hashPassword } from "@/utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
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

      console.log(
        req.body,
        "inside verify theater controller data from front end"
      );

      const isOtpVerified = await verifyTheaterOtpUseCase(dependencies).execute(
        email,
        otp
      );

      console.log(isOtpVerified, "otp verified or not");

      if (isOtpVerified) {
        // Hash the password before creating the theater
        const hashedPassword = await hashPassword(password);

        // Create the theater
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

        if (!theater) {
          throw new Error("Theater creation failed");
        }

        // Delete the OTP record after successful verification and theater creation
        await Otp.deleteOne({ email });

        // Generate JWT tokens using theater._id
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

        // Set cookies with tokens
        res.cookie("access_token", accessToken, {
          httpOnly: true,
        });

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
        });

        res.status(200).json({
          success: true,
          message: "OTP verified and theater created successfully",
          data: theater,
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

