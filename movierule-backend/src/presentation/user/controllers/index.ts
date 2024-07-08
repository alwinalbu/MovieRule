import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { signupController } from "./signup";
import { verifyOtpController } from "./verifyOtp";
import { loginUserController } from "./loginUser";
import { logoutController } from "./logout";
import { googleAuthController } from "./googleAuth";
import { updateUserController } from "./updateUserDetails";
import { resendOtpController } from "./reSendOtp";
import { forgotPasswordController } from "./forgetPassword";
import { updatePasswordController } from "./updatePassword";


export const controllers = (dependencies: IDependencies) => {
  return {
    signup: signupController(dependencies),
    verifyOtp: verifyOtpController(dependencies),
    loginUser: loginUserController(dependencies),
    logoutUser: logoutController(dependencies),
    googleAuth: googleAuthController(dependencies),
    updateUserDetails:updateUserController(dependencies),
    reSendOtp:resendOtpController(dependencies),
    forgetPassword:forgotPasswordController(dependencies),
    updatePassword:updatePasswordController(dependencies),
  };
};

