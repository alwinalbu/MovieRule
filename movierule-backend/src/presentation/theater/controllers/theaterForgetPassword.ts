import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies"
import { generateForgotPasswordToken } from "../../../utils/jwt/generateForgotPasswordToken";
import { sendResetPasswordEmail } from "../../../utils/sendResetPasswordEmail";
import { Request, Response, NextFunction } from "express";

export const forgotTheaterPasswordController = (dependencies:ITheaterDependencies) => {
  const {
    useCases: { findTheaterByEmailUseCase },
  } = dependencies


   return async (req: Request, res: Response, next: NextFunction) => {
     try {
       const { email } = req.body;

       let roletype: any = "";

       console.log(email, "forget email in backend");

       if (!email) {
         return res.status(400).json({ message: "Email is required" });
       }

       const theater = await findTheaterByEmailUseCase(dependencies).execute(email);

       if (!theater) {
         return res.status(404).json({ message: "Theater not found" });
       }

         roletype=theater.role

       
       const resetToken = generateForgotPasswordToken({ email });

       // Send the reset email
       await sendResetPasswordEmail(email, resetToken,roletype);

       return res.status(200).json({ message: "Password reset email sent" });
     } catch (error: any) {
       next(error);
     }
   };
}