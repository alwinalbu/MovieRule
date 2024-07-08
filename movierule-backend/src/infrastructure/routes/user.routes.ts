import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { controllers } from "@/presentation/user/controllers";

import { Router } from "express";

export const routes = (dependencies: IDependencies) => {
  const { signup,verifyOtp,loginUser,logoutUser,googleAuth,updateUserDetails,reSendOtp,forgetPassword,updatePassword } = controllers(dependencies);

  const router = Router();

  
  router.route("/signup").post(signup);
  router.route("/verify-otp").post(verifyOtp)
  router.route("/resend-otp").post(reSendOtp)
  router.route("/login").post(loginUser);
  router.route('/logout').delete(logoutUser)
  router.route("/google").post(googleAuth);
  router.put("/updateUser/:userId", updateUserDetails);
  router.route('/forgetpassword').post(forgetPassword);
  router.route("/reset-password").post(updatePassword)

  return router;
};
