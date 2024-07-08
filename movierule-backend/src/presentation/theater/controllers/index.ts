import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { theaterSignupController } from "./theaterSignup";
import { theaterLoginController } from "./theaterLogin";
import { theaterlogoutController } from "./theaterLogout";
import { verifyTheaterOtpController } from "./theaterVerifyOtp";
import { updateTheaterController } from "./updateTheaterDetails";
import { forgotTheaterPasswordController } from "./theaterForgetPassword";
import { updateTheaterPasswordController } from "./updateTheaterPassword";


export const theaterControllers=(dependencies:ITheaterDependencies)=>{
    return {
      theaterSignup: theaterSignupController(dependencies),
      theaterVerifyOtp: verifyTheaterOtpController(dependencies),
      theaterLogin: theaterLoginController(dependencies),
      theaterLogout: theaterlogoutController(dependencies),
      updateTheaterDetails: updateTheaterController(dependencies),
      theaterForgetPassword: forgotTheaterPasswordController(dependencies),
      updateTheaterPassword:updateTheaterPasswordController(dependencies),
    };
};