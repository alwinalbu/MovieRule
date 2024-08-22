import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { theaterControllers } from "@/presentation/theater/controllers";
import { jwtMiddleware } from "@/utils/middlewares/VerifyToken";
import { Router } from "express";

export const theaterRoutes = (dependencies: ITheaterDependencies) => {
  const {
    theaterSignup,
    theaterLogin,
    theaterVerifyOtp,
    theaterLogout,
    updateTheaterDetails,
    theaterForgetPassword,
    updateTheaterPassword,
    theaterGetAllMoviesList,
    theaterAddShow,
    theaterGetAllShowsList,
    theaterAddScreen,
    theaterGetAllScreens,
    theaterUpdateScreen,
    theaterGetScreenLayout,
    theaterUpdateScreenLayout,
    theaterAddSnacks,
    theaterGetSnacks,
    getBookingsByTheaterId,
    getBookingDetails,
    getAllBookings
  } = theaterControllers(dependencies);

  const router = Router();

  router.route("/signup").post(theaterSignup);
  router.route("/verify-otp").post(theaterVerifyOtp);
  router.route("/login").post(theaterLogin);
  router.route("/logout").delete(theaterLogout);
  router
    .route("/updateTheater/:theaterId")
    .put(jwtMiddleware, updateTheaterDetails);
  router.route("/forgetpassword").post(theaterForgetPassword);
  router.route("/theater-reset-password").post(updateTheaterPassword);
  router.route("/get-Movies").get(theaterGetAllMoviesList);
  router.route("/add-Show").post(jwtMiddleware, theaterAddShow);
  router.route("/get-Shows").get(theaterGetAllShowsList);

  router.route("/add-snack").post(jwtMiddleware, theaterAddSnacks);
  router.route("/get-snacks").get(theaterGetSnacks);

  router.route("/get-ALLBookings").get(getAllBookings);

  router.route("/add-screen").post(jwtMiddleware, theaterAddScreen);
  router.route("/get-screens").get(theaterGetAllScreens);
  router
    .route("/update-screen/:screenId")
    .put(jwtMiddleware, theaterUpdateScreen);
  router
    .route("/screen-layout/:screenId")
    .get(jwtMiddleware, theaterGetScreenLayout);
  router
    .route("/update-layout/:screenId")
    .put(jwtMiddleware, theaterUpdateScreenLayout);

router.route("/bookings/:theaterId").get(jwtMiddleware, getBookingsByTheaterId);

router.route("/get-booking/:bookingId").get(getBookingDetails)

  return router;
};
