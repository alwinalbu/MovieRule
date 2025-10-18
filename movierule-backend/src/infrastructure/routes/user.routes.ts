import { jwtMiddleware } from "../../utils/middlewares/VerifyToken";
import { IDependencies } from "../../application/user/interfaces/IDependencies";
import { controllers } from "../../presentation/user/controllers";

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
    getUserWalletDetails,
    getMoviesDetailsByID,
    toggleWatchlist,
    getWatchlist,
    getCurrentUser,
    lockSeats,
    unlockSeats,
    getLockedSeats
  } = controllers(dependencies);

  const router = Router();



  router.route("/signup").post(signup);
  router.route("/verify-otp").post(verifyOtp);
  router.route("/resend-otp").post(reSendOtp);

  router.route("/login").post(loginUser);
  router.route("/logout").delete(logoutUser);
  router.route("/google").post(googleAuth);

  router.route("/forgetpassword").post(forgetPassword);
  router.route("/reset-password").post(updatePassword);

  // ✅ Needs login
  router.route("/getUser").get(jwtMiddleware(["user"]), getUser);
  // router.get("/getUser", jwtMiddleware(["user"]),getCurrentUser);

  router.put("/updateUser/:userId", jwtMiddleware(["user"]), updateUserDetails);

  // Public browsing
  router.route("/movie/:id").get(getMoviesDetailsByID);
  router.route("/get-Movies").get(userGetMoviesList);
  router.route("/get-OTT-Movies").get(userGetOTTMoviesList);
  router.route("/get-Shows").get(getAllShowList);

  // ✅ Protected (user-specific actions)
  router
    .route("/toggle-watchlist")
    .post(jwtMiddleware(["user"]), toggleWatchlist);
  router.route("/get-watchlist").get(jwtMiddleware(["user"]), getWatchlist);

  router
    .route("/movies/:movie_id/available-shows/")
    .get(jwtMiddleware(["user"]), getShowsByMovie);

  router
    .route("/screens/:screenId/layout")
    .get(jwtMiddleware(["user"]), getScreenLayout);

    // locked and unlocked process routes 

    router.post("/lock-seats", jwtMiddleware(["user"]),lockSeats);
    router.post("/unlock-seats",jwtMiddleware(["user"]),unlockSeats);

    //lock fetching route
    router.get("/locks/:showId", getLockedSeats);


  router
    .route("/create-checkout-session")
    .post(jwtMiddleware(["user"]), createCheckoutSession);

  router
    .route("/Subscribe/create-checkout-session")
    .post(jwtMiddleware(["user"]), createSubscripeCheckoutSession);

  router
    .route("/users/:userId/subscription")
    .patch(jwtMiddleware(["user"]), updateUserSubscription);

  router
    .route("/screens/:screenId/book")
    .patch(jwtMiddleware(["user"]), updateSeatStatus);

  router
    .route("/bookings/:sessionId")
    .patch(jwtMiddleware(["user"]), updatePaymentStatus);

  router
    .route("/get-bookings/:userId")
    .get(jwtMiddleware(["user"]), userGetAllBookings);

  router
    .route("/bookings/:bookingId")
    .get(jwtMiddleware(["user"]), getQRBookingById);

  router
    .route("/cancel-ticket/:id")
    .post(jwtMiddleware(["user"]), handleCancelTicket);

  router
    .route("/reservations/:showId")
    .get(jwtMiddleware(["user"]), reservedSeats);

  router
    .route("/get-wallet/:userId")
    .get(jwtMiddleware(["user"]), getUserWalletDetails);


  return router;
};
