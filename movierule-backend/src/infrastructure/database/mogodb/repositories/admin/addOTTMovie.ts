import { IMovie, Movie } from "../../models/movieSchema";

export const addOTTMovie = async (
  movieData: IMovie
): Promise<IMovie | null> => {
  try {
    const newMovie = new Movie({
      id: movieData.id,
      title: movieData.title,
      overview: movieData.overview,
      releaseDate: movieData.releaseDate,
      rating: movieData.rating,
      posterPath: movieData.posterPath,
      backdrop_path: movieData.backdrop_path,
      trailerKey: movieData.trailerKey,
      type: "OTT",
      runtime: movieData.runtime,
      original_language: movieData.original_language,
    });

    const savedMovie = await newMovie.save();

    console.log(savedMovie, "saved movie here backend");

    return savedMovie.toObject() as IMovie;
  } catch (error) {
    console.error("Error adding OTT movie:", error);
    return null;
  }
};
