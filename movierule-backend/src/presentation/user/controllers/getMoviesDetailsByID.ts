import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";


export const getMovieByIdController = (dependencies: IDependencies) => {
  const {
    useCases: { getMovieDetailsByIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      console.log(id, "movie id here");

      const movie = await getMovieDetailsByIdUseCase(dependencies).execute(id);

      console.log(movie, "after finding the movie details");

      if (!movie) {
        return res
          .status(404)
          .json({ success: false, message: "Movie not found" });
      }

      return res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  };
};
