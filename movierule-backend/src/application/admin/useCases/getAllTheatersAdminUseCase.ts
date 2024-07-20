import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const getAllTheatersAdminUseCase=(dependencies:IAdminDependencies)=>{
    const {
        repositories:{getAllTheaters}
    }=dependencies;

    return{
        execute:async ()=>{
            return await getAllTheaters();
        }
    }
}