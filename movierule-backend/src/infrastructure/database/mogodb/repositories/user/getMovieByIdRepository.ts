import {
  Movie,
  IMovie,
} from "../../models/movieSchema"

export const getMovieByIdRepository = async (id: string): Promise<IMovie | null> => {
  try {
    const movie = await Movie.findById(id);
    return movie;
  } catch (error: any) {
    throw new Error(
      error.message || "Error fetching movie by ID from repository"
    );
  }
};
