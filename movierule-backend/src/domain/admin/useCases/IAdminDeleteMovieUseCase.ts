
export interface IAdminDeleteMovieUseCase {
  execute(movieId: string): Promise<boolean>;
}
