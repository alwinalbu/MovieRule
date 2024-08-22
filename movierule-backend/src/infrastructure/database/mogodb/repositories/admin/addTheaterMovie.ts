import { IMovie, Movie } from "../../models/movieSchema";


export const addTheaterMovie = async (
  movieData: IMovie
): Promise<IMovie | null> => {
  try {
   
   const existingMovie=await Movie.findOne({id:movieData.id})
 
   if (existingMovie) {
     console.log("Movie already exists:", existingMovie);
    throw new Error("Movie already exists:");
   }

    const newMovie = new Movie({
      id: movieData.id,
      title: movieData.title,
      overview: movieData.overview,
      releaseDate: movieData.releaseDate,
      rating: movieData.rating,
      posterPath: movieData.posterPath,
      backdrop_path: movieData.backdrop_path,
      trailerKey: movieData.trailerKey,
      type: "Theater",
      runtime: movieData.runtime,
      original_language: movieData.original_language,
    });

    
    const savedMovie = await newMovie.save();

    console.log(savedMovie,"saved movie here backend");
    

    return savedMovie.toObject() as IMovie; 

  } catch (error:any) {
    console.error("Error adding theater movie:", error);
    return null;
  }
};
