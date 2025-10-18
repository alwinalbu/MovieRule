import { IShow } from "../../../infrastructure/database/mogodb/models/showSchema";

export interface IGetShowsByMovieUseCase {
  execute(movie_id: string): Promise<boolean | IShow[]>;
}
