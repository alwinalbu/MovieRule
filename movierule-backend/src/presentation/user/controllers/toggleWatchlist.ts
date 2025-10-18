import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/user/interfaces/IDependencies";

export const toggleWatchlistController = (dependencies: IDependencies) => {
  const {
    useCases: { toggleWatchlistUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, movieId } = req.body;

      console.log("inside the watch list", userId,"<---user id","movie id is --->",movieId);
      

      if (!userId || !movieId) {
        return res
          .status(400)
          .json({ success: false, message: "userId and movieId required" });
      }

      const result = await toggleWatchlistUseCase(dependencies).execute(
        userId,
        movieId
      );

      if (!result.success) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }


      console.log("result before sednig to front end",result);
      
      return res.status(200).json(result);
    } catch (err) {
      console.error("Toggle watchlist error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
};
