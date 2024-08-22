import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";


export interface IAdminUpdateMovieUseCase {
  execute(dbMovieId: string, videoUrl: string): Promise<IMovie | null>;
}
