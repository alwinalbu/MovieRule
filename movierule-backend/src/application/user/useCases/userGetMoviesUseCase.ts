import { IDependencies } from "../interfaces/IDependencies";


export const userGetMoviesUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { userGetMovies },
  } = dependencies;

  return {
    execute: async () => {
      return await userGetMovies();
    },
  };
};
