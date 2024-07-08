
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { admincontrollers } from "@/presentation/admin/controllers";

import { Router } from "express";

export const adminRoutes=(dependencies:IAdminDependencies)=>{
    const {loginAdmin,logoutAdmin}=admincontrollers(dependencies);

    const router=Router();

    router.route('/login').post(loginAdmin)
    router.route('/logout').delete(logoutAdmin)

    return router;
}