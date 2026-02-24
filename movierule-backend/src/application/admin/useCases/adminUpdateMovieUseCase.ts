
import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const adminUpdateMovieUseCase = (dependencies: IAdminDependencies) => {
  const {
    repositories: { updateMovieStreamingURL },
  } = dependencies;

  return {
    execute: async (dbMovieId: string, publicId: string) => {
      try {

        // Update the movie's streamingURL in the database
        const updatedMovie = await updateMovieStreamingURL(dbMovieId, publicId);
        
        console.log(
          updatedMovie,
          "after updating the movie streaming URL in backend"
        );

        return updatedMovie;

      } catch (error: any) {
        console.error("Failed to update movie:", error);
        throw new Error("Failed to update movie");
      }
    },
  };
};
