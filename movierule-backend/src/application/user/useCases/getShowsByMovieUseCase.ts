import { IDependencies } from "../interfaces/IDependencies";

export const getShowsByMovieUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getShowsByMovie },
  } = dependencies;

  return {
    execute: async (movie_id: string) => {
      return await getShowsByMovie(movie_id);
    },
  };
};
