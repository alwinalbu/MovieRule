import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { Otp } from "@/infrastructure/database/mogodb/models/otpSchema";
import { generateOtp } from "@/utils/otp/generateOtp";
import { sendOtp } from "@/utils/otp/sendOtp";
import { NextFunction, Request, Response } from "express";

export const theaterSignupController = (dependencies: ITheaterDependencies) => {
  const {
    useCases: { checkTheaterEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const theaterCredentials = req.body;

    console.log("theater data in controller ", theaterCredentials);

    if (theaterCredentials) {
      try {
        const theaterExist = await checkTheaterEmailUseCase(
          dependencies
        ).execute(req.body.email);

        // checking if theater exist or not
        if (theaterExist) {
          return res.status(409).send({ error: "E-mail already in use" });
        }

        // Generate OTP
        const otp = generateOtp();
        console.log(otp, "Generated OTP");

        // Check if OTP entry already exists
        let emailExist = await Otp.findOne({ email: theaterCredentials.email });
        let dbOtp;

        if (emailExist) {
          dbOtp = await Otp.findOneAndUpdate(
            { email: theaterCredentials.email },
            { $set: { otp, createdAt: new Date() } }
          );
        } else {
          dbOtp = await Otp.create({ email: theaterCredentials.email, otp });
        }

        // Send OTP to email
        if (dbOtp) {
          await sendOtp(theaterCredentials.email, otp);
        }

        res.status(200).json({
          success: true,
          message: "An OTP has been sent to your email.",
          ...theaterCredentials,
        });
      } catch (error: any) {
        console.log(error, "<<Something went wrong in theater signup>>");
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid theater credentials",
      });
    }
  };
};