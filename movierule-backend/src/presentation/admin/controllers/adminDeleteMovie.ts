import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminDeleteMovieController = (
  dependencies: IAdminDependencies
) => {
  const {
    useCases: {adminDeleteMovieUseCase},
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { movieId } = req.params;

      if (!movieId) {
        return res.status(400).json({ message: "Movie ID is required" });
      }

      await adminDeleteMovieUseCase(dependencies).execute(movieId);

      return res
        .status(200)
        .json({ success: true, message: "Movie deleted successfully" });
    } catch (error: any) {
      console.error("Delete Movie error:", error);
      return res
        .status(500)
        .json({
          success: false,
          message: error.message || "Internal Server Error",
        });
    }
  };
};
