import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";


export const theaterGetAllMoviesUseCase = (dependencies: ITheaterDependencies) => {
  const {
    repositories: { theaterGetAllMovies },
  } = dependencies;

  return {
    execute: async () => {
      return await theaterGetAllMovies();
    },
  };
};
