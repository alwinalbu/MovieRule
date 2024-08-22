import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";

export interface IUserGetOTTMoviesUseCase {
  execute(): Promise<boolean | IMovie[]>;
}
