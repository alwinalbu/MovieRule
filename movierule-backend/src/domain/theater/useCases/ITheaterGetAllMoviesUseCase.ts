import { IMovie } from "../../../infrastructure/database/mogodb/models/movieSchema";

export interface ITheaterGetAllMoviesUseCase {
  execute(): Promise<boolean | IMovie[]>;
}
