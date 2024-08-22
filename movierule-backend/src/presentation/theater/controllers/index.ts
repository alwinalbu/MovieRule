import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { theaterSignupController } from "./theaterSignup";
import { theaterLoginController } from "./theaterLogin";
import { theaterlogoutController } from "./theaterLogout";
import { verifyTheaterOtpController } from "./theaterVerifyOtp";
import { updateTheaterController } from "./updateTheaterDetails";
import { forgotTheaterPasswordController } from "./theaterForgetPassword";
import { updateTheaterPasswordController } from "./updateTheaterPassword";
import { theaterGetAllMoviesListController } from "./theaterGetAllMoviesList";
import { theaterAddShowController } from "./theaterAddShow";
import { theaterGetAllShowsListController } from "./theaterGetAllShowsList";
import { theaterAddScreenController } from "./theaterAddScreen";
import { theaterGetAllScreensController } from "./theaterGetAllScreens";
import { theaterUpdateScreenController } from "./theaterUpdateScreen";
import { theaterGetScreenLayoutController } from "./theaterGetScreenLayout";
import { theaterUpdateScreenLayoutController } from "./theaterUpdateScreenLayout";
import { theaterAddSnackController } from "./theaterAddSnacks";
import { theaterGetSnacksController } from "./theaterGetSnacks";
import { getBookingsByTheaterIdController } from "./getBookingsByTheaterId";
import { getBookingDetailsController } from "./getBookingDetails";
import { getALLBookingsController } from "./getAllBookings";


export const theaterControllers=(dependencies:ITheaterDependencies)=>{
    return {
      theaterSignup: theaterSignupController(dependencies),
      theaterVerifyOtp: verifyTheaterOtpController(dependencies),
      theaterLogin: theaterLoginController(dependencies),
      theaterLogout: theaterlogoutController(dependencies),
      updateTheaterDetails: updateTheaterController(dependencies),
      theaterForgetPassword: forgotTheaterPasswordController(dependencies),
      updateTheaterPassword: updateTheaterPasswordController(dependencies),
      theaterGetAllMoviesList: theaterGetAllMoviesListController(dependencies),
      theaterAddShow: theaterAddShowController(dependencies),
      theaterGetAllShowsList: theaterGetAllShowsListController(dependencies),
      theaterAddScreen: theaterAddScreenController(dependencies),
      theaterGetAllScreens: theaterGetAllScreensController(dependencies),
      theaterUpdateScreen: theaterUpdateScreenController(dependencies),
      theaterGetScreenLayout: theaterGetScreenLayoutController(dependencies),
      theaterUpdateScreenLayout:theaterUpdateScreenLayoutController(dependencies),
      theaterAddSnacks: theaterAddSnackController(dependencies),
      theaterGetSnacks: theaterGetSnacksController(dependencies),
      getBookingsByTheaterId: getBookingsByTheaterIdController(dependencies),
      getBookingDetails:getBookingDetailsController(dependencies),
      getAllBookings:getALLBookingsController(dependencies),
    };
};