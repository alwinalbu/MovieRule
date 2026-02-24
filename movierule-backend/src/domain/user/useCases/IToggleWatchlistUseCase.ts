export interface IToggleWatchlistUseCase {
  execute: (
    userId: string,
    movieId: string
  ) => Promise<{ success: boolean; inWatchlist?: boolean; watchlist?: string[] }>;
}
