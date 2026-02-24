
import { IMovie } from "../../../infrastructure/database/mogodb/models/movieSchema";

export interface IGetWatchlistUseCase {
  execute: (
    userId: any
  ) => Promise<{ success: boolean; data?: IMovie[]; message?: string }>;
}
