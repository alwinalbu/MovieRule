

import { IMovie, Movie } from "../../models/movieSchema";
import { Show } from "../../models/showSchema";

// export const userGetMovies = async (): Promise<boolean | IMovie[]> => {
//   try {
//     const movies = await Movie.find({ type: "Theater" });
//     if (movies.length === 0) {
//       return false;
//     }
//     return movies;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     throw new Error("Failed to fetch movies");
//   }
// };




export const userGetMovies = async (): Promise<boolean | IMovie[]> => {

  try {
   
    const movieIds = await Show.distinct("movie");

    if (movieIds.length === 0) {
      return false; 
    }

    console.log(movieIds,"movies id from shows");
    
  
    const movies = await Movie.find({ _id: { $in: movieIds } });

    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};
