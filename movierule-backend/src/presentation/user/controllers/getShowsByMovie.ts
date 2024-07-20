import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const getShowsByMovieController = (dependencies: IDependencies) => {
  const {
    useCases: { getShowsByMovieUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {

     if (!req.user || !req.user._id) {
       return res.status(402).json("Authentication failed");
     }


    const { movie_id } = req.params;

    console.log(movie_id,"movie id reached here");
    

    try {
      const shows = await getShowsByMovieUseCase(dependencies).execute(
        movie_id
      );

      if (!shows) {
        return res.status(404).json({
          success: false,
          message: "Shows not available for this movie",
        });
      }

      res.status(200).json({
        success: true,
        data: shows,
        message: "Available shows fetched successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: (error as Error)?.message || "Internal server error",
      });
    }
  };
};
