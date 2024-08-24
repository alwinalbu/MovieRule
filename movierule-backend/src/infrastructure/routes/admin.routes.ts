import { IAdminDependencies } from "../../application/admin/interfaces/IAdminDependencies";
import { admincontrollers } from "../../presentation/admin/controllers";

import { Router } from "express";

export const adminRoutes = (dependencies: IAdminDependencies) => {
  const {
    loginAdmin,
    logoutAdmin,
    getAllTheatersListAdmin,
    getAllUsersListAdmin,
    handleBlockUnblockUser,
    adminHandleAcceptTheater,
    adminAddTheaterMovie,
    getAllTheaterMoviesAdmin,
    adminAddOTTMovie,
    getAllOTTMoviesAdmin,
    adminDeleteMovie,
    getTheaterDetails,
    adminUpdateMovie,
  } = admincontrollers(dependencies);

  const router = Router();

  //Login
  router.route("/login").post(loginAdmin);
  router.route("/logout").delete(logoutAdmin);

  //dashboard
  // router.route('/get-AllBookings')

  //List
  router.route("/get-theaters").get(getAllTheatersListAdmin);
  router.route("/get-theater/:theaterId").get(getTheaterDetails);
  router.route("/get-users").get(getAllUsersListAdmin);

  //Changing Status
  router.route("/:id/status").patch(handleBlockUnblockUser);
  router.route("/:id/change-status").patch(adminHandleAcceptTheater);
  router.route("/:id/accept-theater").patch(adminHandleAcceptTheater);

  //Adding Movies
  router.route("/add-movie-theater").post(adminAddTheaterMovie);
  router.route("/add-movie-ott").post(adminAddOTTMovie);

  router.route("/update-movie/:dbMovieId").patch(adminUpdateMovie);

  //Deleting Movies
  router.route("/delete-Movie/:movieId").delete(adminDeleteMovie);

  //Viewing Movies
  router.route("/get-theatersMovies").get(getAllTheaterMoviesAdmin);
  router.route("/get-OTT-Movies").get(getAllOTTMoviesAdmin);

  return router;
};
