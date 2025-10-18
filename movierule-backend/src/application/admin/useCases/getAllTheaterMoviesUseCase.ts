import { IAdminDependencies } from "../interfaces/IAdminDependencies";


export const getAllTheaterMoviesUseCase=(dependencies:IAdminDependencies)=>{
    const {repositories:{getAllTheaterMovies}}=dependencies;

    return {
        execute:async ()=>{
            return await getAllTheaterMovies();
        }
    }
}