import { IDependencies } from "../../application/user/interfaces/IDependencies";
import { controllers } from "../../presentation/user/controllers";
import { jwtMiddleware } from "../../utils/middlewares/VerifyToken";

import { Router } from "express";

export const routes = (dependencies: IDependencies) => {
  const {
    signup,
    verifyOtp,
    loginUser,
    getUser,
    logoutUser,
    googleAuth,
    updateUserDetails,
    reSendOtp,
    forgetPassword,
    updatePassword,
    userGetMoviesList,
    getAllShowList,
    getShowsByMovie,
    getScreenLayout,
    createCheckoutSession,
    updatePaymentStatus,
    userGetAllBookings,
    updateSeatStatus,
    userGetOTTMoviesList,
    handleCancelTicket,
    getQRBookingById,
    createSubscripeCheckoutSession,
    updateUserSubscription,
    reservedSeats,
    getUserWalletDetails
  } = controllers(dependencies);

  const router = Router();

  router.route("/signup").post(signup);
  router.route("/verify-otp").post(verifyOtp);
  router.route("/resend-otp").post(reSendOtp);

  router.route("/login").post(loginUser);
  router.route("/logout").delete(logoutUser);
  router.route("/google").post(googleAuth);

  router.route("/getUser").get(getUser);

  router.put("/updateUser/:userId", jwtMiddleware, updateUserDetails);
  router.route("/forgetpassword").post(forgetPassword);
  router.route("/reset-password").post(updatePassword);

  router.route("/get-Movies").get(userGetMoviesList);

  router.route("/get-OTT-Movies").get(userGetOTTMoviesList)
  
  router.route("/get-Shows").get(getAllShowList);
  router
    .route("/movies/:movie_id/available-shows/")
    .get(jwtMiddleware, getShowsByMovie);
  router.route("/screens/:screenId/layout").get(jwtMiddleware, getScreenLayout);

  router.route("/create-checkout-session").post(createCheckoutSession);

  router.route("/Subscribe/create-checkout-session").post(createSubscripeCheckoutSession);

  router.route("/users/:userId/subscription").patch(updateUserSubscription)
  

  router
    .route("/screens/:screenId/book")
    .patch(jwtMiddleware, updateSeatStatus);

  router
    .route("/bookings/:sessionId")
    .patch(jwtMiddleware, updatePaymentStatus);

  router.route("/get-bookings/:userId").get(userGetAllBookings);

  router.route("/bookings/:bookingId").get(getQRBookingById)

  router.route("/cancel-ticket/:id").post(handleCancelTicket);

  router.route("/reservations/:showId").get(reservedSeats);

  router.route("/get-wallet/:userId").get(jwtMiddleware,getUserWalletDetails);

  return router;
};
