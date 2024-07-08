import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./loginAdmin";
import { logoutAdminController } from "./logoutAdmin";


export const admincontrollers=(dependencies:IAdminDependencies)=>{
    return {
        loginAdmin:loginAdminController(dependencies),
        logoutAdmin:logoutAdminController(dependencies),
    }
}