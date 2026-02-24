import { IMovie, Movie } from "../../models/movieSchema";

export const deleteMovieById = async (
  movieId: string
): Promise<IMovie | null> => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId).exec();

    if (!deletedMovie) {
      throw new Error("Movie not found");
    }

    return deletedMovie.toObject() as IMovie;
  } catch (error) {
    console.error("Error deleting theater movie:", error);
    return null;
  }
};
