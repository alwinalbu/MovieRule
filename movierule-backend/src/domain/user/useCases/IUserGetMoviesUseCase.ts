import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";

export interface IUserGetMoviesUseCase {
  execute(): Promise<boolean | IMovie[]>;
}
