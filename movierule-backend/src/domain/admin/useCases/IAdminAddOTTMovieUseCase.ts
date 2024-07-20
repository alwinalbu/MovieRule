import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";

export interface IAdminAddOTTMovieUseCase {
  execute(movieData: IMovie): Promise<IMovie | null>;
}
