import { IDependencies } from "../interfaces/IDependencies";

export const toggleWatchlistUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { toggleWatchlist },
  } = dependencies;

  return {
    execute: async (userId: string, movieId: string) => {
      return await toggleWatchlist(userId, movieId);
    },
  };
};
