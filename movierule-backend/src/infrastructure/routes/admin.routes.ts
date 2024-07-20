
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { admincontrollers } from "@/presentation/admin/controllers";

import { Router } from "express";

export const adminRoutes=(dependencies:IAdminDependencies)=>{
    const {loginAdmin,logoutAdmin,getAllTheatersListAdmin,getAllUsersListAdmin,handleBlockUnblockUser,adminHandleAcceptTheater,adminAddTheaterMovie,getAllTheaterMoviesAdmin,adminAddOTTMovie,getAllOTTMoviesAdmin}=admincontrollers(dependencies);

    const router=Router();

    router.route('/login').post(loginAdmin)
    router.route('/logout').delete(logoutAdmin)
    router.route('/get-theaters').get(getAllTheatersListAdmin)
    router.route("/get-users").get(getAllUsersListAdmin)
    router.route('/:id/status').patch(handleBlockUnblockUser)
    router.route("/:id/accept-theater").patch(adminHandleAcceptTheater);
    router.route('/add-movie-theater').post(adminAddTheaterMovie)
    router.route('/add-movie-ott').post(adminAddOTTMovie)
    router.route("/get-theatersMovies").get(getAllTheaterMoviesAdmin)
    router.route("/get-OTT-Movies").get(getAllOTTMoviesAdmin)


    return router;
}