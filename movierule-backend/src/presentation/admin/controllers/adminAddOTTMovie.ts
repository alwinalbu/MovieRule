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
        title,
        overview,
        releaseDate,
        rating,
        posterPath,
        backdrop_path,
        trailerKey,
        type,
      } = req.body;

      if (
        !title ||
        !overview ||
        !releaseDate ||
        !rating ||
        !posterPath ||
        !backdrop_path ||
        !type
      ) {
        return res
          .status(400)
          .json({ message: "All movie details are required" });
      }

      const movieData = {
        title,
        overview,
        releaseDate,
        rating,
        posterPath,
        backdrop_path,
        trailerKey,
        type,
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
