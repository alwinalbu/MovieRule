import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./loginAdmin";
import { logoutAdminController } from "./logoutAdmin";
import { getAllTheaterAdminController } from "./getAllTheatersListAdmin";
import { getAllUsersAdminController } from "./getAllUsersListAdmin";
import { handleBlockUnblockController } from "./handleBlockUnblockUser";
import { adminHandleAcceptTheaterController } from "./adminHandleAcceptTheater";
import { adminAddTheaterMovieController } from "./adminAddTheaterMovie";
import { getAllTheaterMoviesAdminController } from "./getAllTheaterMoviesAdmin";
import { adminAddOTTMovieController } from "./adminAddOTTMovie";
import { getAllOTTMoviesAdminController } from "./getAllOTTMoviesAdmin";
import { adminDeleteMovieController } from "./adminDeleteMovie";
import { getTheaterDetailsController } from "./getTheaterDetails";
import { adminUpdateMovieController } from "./adminUpdateMovie";


export const admincontrollers=(dependencies:IAdminDependencies)=>{
    return {
      loginAdmin: loginAdminController(dependencies),
      logoutAdmin: logoutAdminController(dependencies),
      getAllTheatersListAdmin: getAllTheaterAdminController(dependencies),
      getAllUsersListAdmin: getAllUsersAdminController(dependencies),
      handleBlockUnblockUser: handleBlockUnblockController(dependencies),
      adminHandleAcceptTheater:
        adminHandleAcceptTheaterController(dependencies),
      adminAddTheaterMovie: adminAddTheaterMovieController(dependencies),
      getAllTheaterMoviesAdmin:
        getAllTheaterMoviesAdminController(dependencies),
      adminAddOTTMovie: adminAddOTTMovieController(dependencies),
      getAllOTTMoviesAdmin: getAllOTTMoviesAdminController(dependencies),
      adminDeleteMovie: adminDeleteMovieController(dependencies),
      getTheaterDetails: getTheaterDetailsController(dependencies),
      adminUpdateMovie:adminUpdateMovieController(dependencies),
    };
}