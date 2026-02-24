import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const getAllUsersAdminUseCase = (dependencies:IAdminDependencies)=>{
    const {
        repositories:{getAllUsers}
    }=dependencies

    return {
        execute:async()=>{
            return await getAllUsers();
        }
    }
}