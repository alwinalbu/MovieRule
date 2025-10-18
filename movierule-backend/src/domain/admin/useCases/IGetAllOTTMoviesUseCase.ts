import { IMovie } from "../../../infrastructure/database/mogodb/models/movieSchema";

export interface IGetAllOTTMoviesUseCase {
  execute(): Promise<boolean | IMovie[]>;
}
