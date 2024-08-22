import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminAddOTTMovieController = (
  dependencies: IAdminDependencies
) => {
  const {
    useCases: { adminAddOTTMovieUseCase },
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
        backdrop_path,
        trailerKey,
        type,
        runtime,
        original_language,
      } = req.body;

      if (
        !id ||
        !title ||
        !overview ||
        !releaseDate ||
        !rating ||
        !posterPath ||
        !backdrop_path ||
        !type ||
        !runtime ||
        !original_language
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

      const movie = await adminAddOTTMovieUseCase(dependencies).execute(
        movieData
      );

      console.log(movie, "movie is added in database");

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
