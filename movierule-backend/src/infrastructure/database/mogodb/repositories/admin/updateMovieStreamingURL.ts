import { IMovie, Movie } from "../../models/movieSchema";


export const updateMovieStreamingURL = async (dbMovieId: string,videoUrl: string): Promise<IMovie | null> => {
  try {
    console.log(
      dbMovieId,
      videoUrl,
      "movieId and videoUrl inside backend repo"
    );

    const updatedMovie = await Movie.findByIdAndUpdate(
      dbMovieId,
      { streamingURL: videoUrl },
      { new: true }
    );

    return updatedMovie;
  } catch (error) {
    console.error("Failed to update movie streaming URL:", error);
    throw new Error("Failed to update movie streaming URL");
  }
};
