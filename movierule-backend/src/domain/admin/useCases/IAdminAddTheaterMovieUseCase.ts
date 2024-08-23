import { IMovie } from "../../../infrastructure/database/mogodb/models/movieSchema";


export interface IAdminAddTheaterMovieUseCase {
  execute(movieData: IMovie): Promise<IMovie | null>;
}
