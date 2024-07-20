import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { controllers } from "@/presentation/user/controllers";
import { jwtMiddleware } from "@/utils/middlewares/VerifyToken";

import { Router } from "express";

export const routes = (dependencies: IDependencies) => {
  const { signup,verifyOtp,loginUser,logoutUser,googleAuth,updateUserDetails,reSendOtp,forgetPassword,updatePassword,userGetMoviesList,getAllShowList,getShowsByMovie } = controllers(dependencies);

  const router = Router();

  
  router.route("/signup").post(signup);
  router.route("/verify-otp").post(verifyOtp)
  router.route("/resend-otp").post(reSendOtp)
  router.route("/login").post(loginUser);
  router.route('/logout').delete(logoutUser)
  router.route("/google").post(googleAuth);
  router.put("/updateUser/:userId",jwtMiddleware, updateUserDetails);
  router.route('/forgetpassword').post(forgetPassword);
  router.route("/reset-password").post(updatePassword)
  router.route("/get-Movies").get(jwtMiddleware,userGetMoviesList);
  router.route("/get-Shows").get(getAllShowList);
  router.route("/movies/:movie_id/available-shows/").get(jwtMiddleware,getShowsByMovie)

  return router;
};
