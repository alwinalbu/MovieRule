import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { generateForgotPasswordToken } from "../../../utils/jwt/generateForgotPasswordToken";
import { sendResetPasswordEmail } from "../../../utils/sendResetPasswordEmail";
import { Request, Response, NextFunction } from "express";


export const forgotPasswordController = (dependencies: IDependencies) => {
  const {
    useCases: { findUserByEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { email } = req.body;

      let roletype:any = "";

      console.log(email,"forget email in backend");
      

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await findUserByEmailUseCase(dependencies).execute(email);
       
      roletype=user?.role
    
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = generateForgotPasswordToken({ email });

      await sendResetPasswordEmail(email, resetToken,roletype);

      return res.status(200).json({ message: "Password reset email sent" });
    } catch (error: any) {
      next(error);
    }
  };
};
