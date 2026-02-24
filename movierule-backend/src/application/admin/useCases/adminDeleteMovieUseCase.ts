import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";

export const adminDeleteMovieUseCase = (dependencies: IAdminDependencies) => {
  const {
    repositories: { deleteMovieById },
  } = dependencies;

  return {
    execute: async (movieId: string): Promise<boolean> => {
      if (!movieId) {
        throw new Error("Movie ID is required");
      }

      const deletedMovie = await deleteMovieById(movieId);

      if (!deletedMovie) {
        throw new Error("Movie not found or could not be deleted");
      }

      return true;
    },
  };
};
