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
import { UserGetMoviesListController } from "./userGetMoviesList";
import { getAllShowListController } from "./getAllShowList";
import { getShowsByMovieController } from "./getShowsByMovie";
import { getScreenLayoutController } from "./getScreenLayout";
import { getUserController } from "./getUser";
import { createCheckoutSessionController } from "./createCheckoutSession";
import { updatePaymentStatusController } from "./updatePaymentStatus";
import {  getQRBookingIdController } from "./getQRBookingById";
import { userGetAllBookingsController } from "./userGetAllBookings";
import { updateSeatStatusController } from "./updateSeatStatus";
import { UserGetOTTMoviesListController } from "./userGetOTTMoviesList";
import { handleCancelTicketController } from "./handleCancelTicket";
import { createSubscripeCheckoutSession } from "./createSubscripeCheckoutSession";
import { updateUserSubscriptionController } from "./updateUserSubscription";
import { getReservation } from "./getReservation";


export const controllers = (dependencies: IDependencies) => {
  return {
    signup: signupController(dependencies),
    verifyOtp: verifyOtpController(dependencies),
    loginUser: loginUserController(dependencies),
    getUser: getUserController(dependencies),
    logoutUser: logoutController(dependencies),
    googleAuth: googleAuthController(dependencies),
    updateUserDetails: updateUserController(dependencies),
    reSendOtp: resendOtpController(dependencies),
    forgetPassword: forgotPasswordController(dependencies),
    updatePassword: updatePasswordController(dependencies),
    userGetMoviesList: UserGetMoviesListController(dependencies),
    getAllShowList: getAllShowListController(dependencies),
    getShowsByMovie: getShowsByMovieController(dependencies),
    getScreenLayout: getScreenLayoutController(dependencies),
    createCheckoutSession: createCheckoutSessionController(dependencies),
    updatePaymentStatus: updatePaymentStatusController(dependencies),
    // getBookingBySessionId: getBookingBySessionIdController(dependencies),
    getQRBookingById: getQRBookingIdController(dependencies),
    userGetAllBookings: userGetAllBookingsController(dependencies),
    updateSeatStatus: updateSeatStatusController(dependencies),
    userGetOTTMoviesList: UserGetOTTMoviesListController(dependencies),
    handleCancelTicket: handleCancelTicketController(dependencies),
    createSubscripeCheckoutSession:createSubscripeCheckoutSession(dependencies),
    updateUserSubscription:updateUserSubscriptionController(dependencies),
    reservedSeats: getReservation(dependencies)
  };
};

