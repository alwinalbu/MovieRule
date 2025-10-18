import { IMovie } from "../../../infrastructure/database/mogodb/models/movieSchema";


export interface IGetMovieDetails {
  execute(id: string): Promise<IMovie | null>;
}
