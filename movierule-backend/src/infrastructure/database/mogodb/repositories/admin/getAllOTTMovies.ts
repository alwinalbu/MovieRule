import { IMovie, Movie } from "../../models/movieSchema";

export const getAllOTTMovies = async (): Promise<boolean | IMovie[]> => {
  try {
    const movies = await Movie.find({ type: "OTT" });
    if (movies.length === 0) {
      return false;
    }
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};
