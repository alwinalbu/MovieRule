

import { IDependencies } from "../interfaces/IDependencies";

export const userGetOTTMoviesUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { userGetOTTMovies },
  } = dependencies;

  return {
    execute: async () => {
      return await userGetOTTMovies();
    },
  };
};
