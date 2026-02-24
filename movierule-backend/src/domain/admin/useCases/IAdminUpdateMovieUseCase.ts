import { IMovie } from "../../../infrastructure/database/mogodb/models/movieSchema";


export interface IAdminUpdateMovieUseCase {
  execute(dbMovieId: string, publicId: string): Promise<IMovie | null>;
}
