import { IMovie } from "../../../infrastructure/database/mogodb/models/movieSchema";
import { IDependencies } from "../interfaces/IDependencies";

export const getMovieDetailsByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getMovieByIdRepository },
  } = dependencies;

  return {
    execute: async (id: string): Promise<IMovie | null> => {
      try {
        return await getMovieByIdRepository(id);
      } catch (error: any) {
        throw new Error(error.message || "Fetching movie by ID failed");
      }
    },
  };
};


