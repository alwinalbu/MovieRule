import { UserEntity } from "@/domain/user/entities";
import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";
import { IShow } from "@/infrastructure/database/mogodb/models/showSchema";

export interface IRepositories {
  create: (data: UserEntity) => Promise<UserEntity | null>;
  checkEmail: (email: string) => Promise<boolean>;
  verifyOtpRepo: (email: string, otp: string[]) => Promise<boolean>;
  findByEmail: (email: string) => Promise<UserEntity | null>;
  findById: (id: string) => Promise<UserEntity | null>;
  updateUserPassword: (data: {email: string, password: string}) => Promise<UserEntity | null>;
   userGetMovies:()=>Promise<boolean | IMovie[]>;
   getAllShows:()=>Promise<boolean|IShow[]>;
   getShowsByMovie:(movie_id:string)=>Promise<boolean| IShow[]>
}
