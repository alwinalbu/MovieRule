import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";


export interface IGetAllTheaterMoviesUseCase {
  execute(): Promise<boolean|IMovie[]>;
}
