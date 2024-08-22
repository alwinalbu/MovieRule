import { AdminEntity } from "@/domain/admin/entities";
import { TheaterEntity } from "@/domain/theater/entities";
import { UserEntity } from "@/domain/user/entities";
import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";

export interface IAdminRepositories {
  adminFindByEmail: (email: string) => Promise<AdminEntity | null>;
  getAllTheaters: () => Promise<boolean | TheaterEntity[]>;
  getAllUsers: () => Promise<boolean | UserEntity[]>;
  updateUserStatus: (id: string, status: string) => Promise<UserEntity | null>;
  updateTheaterStatus:(id:string,status:string)=>Promise<TheaterEntity|null>;
  addTheaterMovie: (movieData: IMovie) => Promise<IMovie | null>;
  addOTTMovie: (movieData: IMovie) => Promise<IMovie | null>;
  getAllTheaterMovies:()=>Promise<boolean | IMovie[]>;
  getAllOTTMovies:()=>Promise<boolean | IMovie[]>;
  deleteMovieById:(movieId:string)=>Promise<IMovie|null>;
  getTheaterById:(theaterId: string)=>Promise<TheaterEntity | null>;
  updateMovieStreamingURL:(dbMovieId: string,videoUrl: string)=>Promise<IMovie | null>
}