import { IMovie, Movie } from "../../models/movieSchema";


export const updateMovieStreamingURL = async (dbMovieId: string,publicId: string): Promise<IMovie | null> => {
  try {
    console.log(
      dbMovieId,
      publicId,
      "movieId and publicId inside backend repo"
    );

   const updatedMovie = await Movie.findByIdAndUpdate(
     dbMovieId,
     { streamingPublicId: publicId },
     { new: true }
   );

    return updatedMovie;
  } catch (error) {
    console.error("Failed to update movie streaming URL:", error);
    throw new Error("Failed to update movie streaming URL");
  }
};
