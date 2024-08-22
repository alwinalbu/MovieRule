import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";
import { IAdminDependencies } from "../interfaces/IAdminDependencies";


export const adminAddTheaterMovieUseCase=(dependencies:IAdminDependencies)=>{
    const {repositories:{addTheaterMovie}}=dependencies;


    return {
        execute:async (movieData:IMovie)=>{

            try {
                
                const newMovie=await addTheaterMovie(movieData);
                return newMovie;

            } catch (error:any) {
                throw new Error(error.message ||"Failed to Add Movie");
                
            }
        }
    }
}