import { IMovie, Movie } from "../../models/movieSchema";


export const userGetOTTMovies = async (): Promise<boolean | IMovie[]> => {
  try {
    const movies = await Movie.find({
      type: "OTT",
      streamingURL: { $ne: "" },
    });
    if (movies.length === 0) {
      return false;
    }
    return movies;
  } catch (error) {
    console.error("Error fetching OTT movies:", error);
    throw new Error("Failed to fetch OTT movies");
  }
};
