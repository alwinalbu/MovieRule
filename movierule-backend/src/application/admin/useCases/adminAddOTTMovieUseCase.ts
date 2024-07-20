import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";
import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const adminAddOTTMovieUseCase = (
  dependencies: IAdminDependencies
) => {
  const {
    repositories: { addOTTMovie },
  } = dependencies;

  return {
    execute: async (movieData: IMovie) => {
      try {
        const newMovie = await addOTTMovie(movieData);

        if (!newMovie) {
          throw new Error("Failed To Add Movie");
        }
        return newMovie;
      } catch (error: any) {
        throw new Error(error.message || "Failed to Add Movie");
      }
    },
  };
};
