import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/user/interfaces/IDependencies";

export const getWatchlistController = (dependencies: IDependencies) => {
  const {
    useCases: { getWatchlistUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.query;

      console.log(userId,"user id in getwatch list ");
      
      if (!userId) {
        return res
          .status(400)
          .json({ success: false, message: "User ID required" });
      }

      const result = await getWatchlistUseCase(dependencies).execute(userId);

      if (!result.success) {
        return res.status(404).json(result);
      }

      console.log(result,"movies from users wactlist");
      

      return res.status(200).json(result);
    } catch (err) {
      console.error("Get watchlist error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
};
