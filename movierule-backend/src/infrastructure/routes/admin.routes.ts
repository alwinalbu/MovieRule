
import { IAdminDependencies } from "../../application/admin/interfaces/IAdminDependencies";
import { admincontrollers } from "../../presentation/admin/controllers";
import { jwtMiddleware } from "../../utils/middlewares/VerifyToken"; // ✅ import middleware
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
    getCurrentAdmin,
  } = admincontrollers(dependencies);

  const router = Router();

  /** ---------- Public (no JWT) ---------- */
  router.post("/login", loginAdmin);
  router.delete("/logout", logoutAdmin);

  /** ---------- Protected (JWT + role = "admin") ---------- */
  // Lists

  // router.get("/getAdmin",jwtMiddleware(["admin"]),getCurrentAdmin);

  router.get(
    "/get-theaters",
    jwtMiddleware(["admin"]),
    getAllTheatersListAdmin
  );
  router.get(
    "/get-theater/:theaterId",
    jwtMiddleware(["admin"]),
    getTheaterDetails
  );
  router.get("/get-users", jwtMiddleware(["admin"]), getAllUsersListAdmin);

  // Change user/theater status
  router.patch("/:id/status", jwtMiddleware(["admin"]), handleBlockUnblockUser);
  router.patch(
    "/:id/change-status",
    jwtMiddleware(["admin"]),
    adminHandleAcceptTheater
  );
  router.patch(
    "/:id/accept-theater",
    jwtMiddleware(["admin"]),
    adminHandleAcceptTheater
  );

  // Movies management
  router.post(
    "/add-movie-theater",
    jwtMiddleware(["admin"]),
    adminAddTheaterMovie
  );
  router.post("/add-movie-ott", jwtMiddleware(["admin"]), adminAddOTTMovie);
  
  router.patch(
    "/update-movie/:dbMovieId",
    jwtMiddleware(["admin"]),
    adminUpdateMovie
  );
  router.delete(
    "/delete-Movie/:movieId",
    jwtMiddleware(["admin"]),
    adminDeleteMovie
  );

  // View movies
  router.get(
    "/get-theatersMovies",
    jwtMiddleware(["admin"]),
    getAllTheaterMoviesAdmin
  );
  router.get("/get-OTT-Movies", jwtMiddleware(["admin"]), getAllOTTMoviesAdmin);

  return router;
};
