import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminUpdateMovieController = (
  dependencies: IAdminDependencies
) => {
  const {
    useCases: { adminUpdateMovieUseCase }, 
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { dbMovieId } = req.params;
      const { videoUrl } = req.body;

      // Validate input
      if (!dbMovieId) {
        return res.status(400).json({ message: "Movie ID is required" });
      }

      if (!videoUrl) {
        return res.status(400).json({ message: "Video URL is required" });
      }

      
      const updatedmovie=await adminUpdateMovieUseCase(dependencies).execute(dbMovieId, videoUrl);

      if (!updatedmovie) {
        throw new Error("Movie Not Updated...");
      }

      console.log(updatedmovie,"movie url updated last..................");
      

      return res
        .status(200)
        .json({ success: true, message: "Movie updated successfully" });
    } catch (error: any) {
      console.error("Update Movie error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
};
