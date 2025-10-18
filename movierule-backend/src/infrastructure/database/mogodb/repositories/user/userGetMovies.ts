

import { IMovie, Movie } from "../../models/movieSchema";
import { Show } from "../../models/showSchema";



export const userGetMovies = async (): Promise<IMovie[]> => {
  try {
    const now = new Date();
    const todayDate = new Date(now.toDateString()); // today at 00:00

    //  Get Theater movies with valid shows
    const validShows = await Show.find({
      $or: [
        { date: { $gt: todayDate } }, // future shows
        {
          date: { $eq: todayDate }, // today's shows, not yet started
          start_time: { $gt: now.toTimeString().slice(0, 5) }, // "HH:MM"
        },
      ],
    }).select("movie");

    const movieIds = [...new Set(validShows.map((show) => show.movie))];

    // Theater Movies
    const theaterMovies = await Movie.find({ _id: { $in: movieIds } });

    //  OTT Movies
    const ottMovies = await Movie.find({ type: "OTT" });

    // Merge & remove duplicates
    const allMoviesMap = new Map<string, IMovie>();
    [...theaterMovies, ...ottMovies].forEach((movie: any) => {
      allMoviesMap.set(movie._id.toString(), movie);
    });

    const movies = Array.from(allMoviesMap.values());

    // Always return array
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

