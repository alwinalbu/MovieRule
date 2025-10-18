import { IMovie, Movie } from "../../models/movieSchema";

export const getAllTheaterMovies = async (): Promise<boolean|IMovie[]> => {
  try {
    const movies = await Movie.find({ type: "Theater" });
    if (movies.length === 0) {
      return false;
    }
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};
