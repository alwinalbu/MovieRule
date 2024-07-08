import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { hashPassword } from "@/utils/bcrypt";
import { verifyForgetPasswordToken } from "@/utils/jwt/verifyForgetPasswordToken";
import { Request, Response, NextFunction } from "express";

export const updateTheaterPasswordController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { findTheaterByEmailUseCase, updateTheaterPasswordUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { param, password } = req.body.data;

      console.log("reached inside the backend of updatepassword");
      

      if (!param || !password) {
        return res.status(400).json({
          success: false,
          message: "Token and password are required fields",
        });
      }

      const decoded = await verifyForgetPasswordToken(param);
      const email = decoded.email;

      console.log("🚀 Email with token", email);

      const theaterExist = await findTheaterByEmailUseCase(
        dependencies
      ).execute(email);
      console.log("🚀 Email given for updatepassword in theater:", theaterExist);

      if (!theaterExist) {
        return res.status(404).json({
          success: false,
          message: "Theater not found",
        });
      }

      const hashNewPassword = await hashPassword(password);

      console.log(
        "🚀 ~ file: updatePassword.ts ~ hashNewPassword:",
        hashNewPassword
      );

      const updatePassword = await updateTheaterPasswordUseCase(
        dependencies
      ).execute({ email, password: hashNewPassword });

      console.log(
        "🚀 ~ file: updatePassword.ts ~ updatePassword:",
        updatePassword
      );

      if (updatePassword) {
        return res.status(200).json({
          success: true,
          data: theaterExist,
          message: "Password updated successfully",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to update password",
        });
      }
    } catch (error: any) {
      console.error("Error updating password:", error);
      return res.status(500).json({
        success: false,
        message: "Error updating password",
      });
    }
  };
};
