import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const getAllOTTMoviesUseCase = (
  dependencies: IAdminDependencies
) => {
  const {
    repositories: { getAllOTTMovies },
  } = dependencies;

  return {
    execute: async () => {
      return await getAllOTTMovies();
    },
  };
};
