import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { theaterControllers } from "@/presentation/theater/controllers";
import { Router } from "express";

export const theaterRoutes=(dependencies:ITheaterDependencies)=>{
    const {theaterSignup,theaterLogin,theaterVerifyOtp,theaterLogout,updateTheaterDetails,theaterForgetPassword,updateTheaterPassword}=theaterControllers(dependencies);

    const router=Router();

    router.route('/signup').post(theaterSignup);
     router.route("/verify-otp").post(theaterVerifyOtp);
     router.route("/login").post(theaterLogin);
     router.route('/logout').delete(theaterLogout)
     router.route("/updateTheater/:theaterId").put(updateTheaterDetails);
     router.route('/forgetpassword').post(theaterForgetPassword);
     router.route("/theater-reset-password").post(updateTheaterPassword)
    return router;
}