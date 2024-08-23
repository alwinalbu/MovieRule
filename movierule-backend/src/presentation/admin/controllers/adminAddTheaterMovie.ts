import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminAddTheaterMovieController = (
  dependencies: IAdminDependencies
) => {
  const {
    useCases: { adminAddTheaterMovieUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        id,
        title,
        overview,
        releaseDate,
        rating,
        posterPath,
        trailerKey,
        type,
        backdrop_path,
        runtime,
        original_language,
      } = req.body;

      if (
        (!id ||
          !title ||
          !overview ||
          !releaseDate ||
          !rating ||
          !posterPath ||
          !type ||
          !runtime ||
          !original_language ||
          !backdrop_path)
      ) {
        return res
          .status(400)
          .json({ message: "All movie details are required" });
      }

      const movieData = {
        id,
        title,
        overview,
        releaseDate,
        rating,
        posterPath,
        backdrop_path,
        trailerKey,
        type,
        runtime,
        original_language,
      };

      const movie = await adminAddTheaterMovieUseCase(dependencies).execute(movieData);

      if(!movie){
        throw new Error("Movie already exists");
      }


      console.log(movie,"movie is added in database");
      

      return res.status(200).json({
        message: "Movie added successfully",
        data: movie,
      });

    } catch (error: any) {
      console.error("Add Movie error:", error); 
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
