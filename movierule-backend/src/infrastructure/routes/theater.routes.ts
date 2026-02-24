import { ITheaterDependencies } from "../../application/theater/interfaces/ITheaterDependencies";
import { theaterControllers } from "../../presentation/theater/controllers";
import { jwtMiddleware } from "../../utils/middlewares/VerifyToken";
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
    getAllBookings,
    getCurrentTheater,
    cancelBookingByTheater,
    manageShowByTheater
  } = theaterControllers(dependencies);

  const router = Router();

  /** ---------- Public Routes (No JWT required) ---------- */
  router.post("/signup", theaterSignup);
  router.post("/verify-otp", theaterVerifyOtp);
  router.post("/login", theaterLogin);
  router.delete("/logout", theaterLogout);

  router.post("/forgetpassword", theaterForgetPassword);
  router.post("/theater-reset-password", updateTheaterPassword);

  // General data available without auth
  router.get("/get-Movies", theaterGetAllMoviesList);
  router.get("/get-Shows", theaterGetAllShowsList);
  router.get("/get-snacks", theaterGetSnacks);

  router.get("/get-ALLBookings", getAllBookings);
  router.get("/get-booking/:bookingId", getBookingDetails);
  router.get("/get-screens",theaterGetAllScreens);

  /** ---------- Protected Routes (JWT + role = "theatre") ---------- */

  router.get("/getTheater",jwtMiddleware(["theatre"]),getCurrentTheater);

  router.put(
    "/updateTheater/:theaterId",
    jwtMiddleware(["theatre"]),
    updateTheaterDetails
  );

  router.post("/add-Show", jwtMiddleware(["theatre"]), theaterAddShow);

  router.post("/add-snack", jwtMiddleware(["theatre"]), theaterAddSnacks);

  router.post("/add-screen", jwtMiddleware(["theatre"]), theaterAddScreen);

  router.get("/show/manage/:showId", jwtMiddleware(["theatre"]),manageShowByTheater);

  router.patch(
    "/bookings/:bookingId/cancel",
    jwtMiddleware(["theatre"]),
    cancelBookingByTheater // <-- You’ll need to add this controller
  );


  router.put(
    "/update-screen/:screenId",
    jwtMiddleware(["theatre"]),
    theaterUpdateScreen
  );

  router.get(
    "/screen-layout/:screenId",
    jwtMiddleware(["theatre"]),
    theaterGetScreenLayout
  );

  router.put(
    "/update-layout/:screenId",
    jwtMiddleware(["theatre"]),
    theaterUpdateScreenLayout
  );

  router.get(
    "/bookings/:theaterId",
    jwtMiddleware(["theatre"]),
    getBookingsByTheaterId
  );

  return router;
};

