// theaterGetScreenLayoutController.ts
import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { Request, Response, NextFunction } from "express";

export const theaterGetScreenLayoutController = (dependencies: ITheaterDependencies) => {
  const {
    useCases: { getScreenLayoutUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { screenId } = req.params;

      // Validate user authentication
      if (!req.user || !req.user._id) {
        return res.status(402).json("Authentication failed");
      }

      const screenLayout = await getScreenLayoutUseCase(dependencies).execute(
        screenId
      );

      console.log(screenLayout,"screen from backend");
      

      if (!screenLayout) {
        return res.status(404).json({ message: "Screen not found" });
      }

      return res.status(200).json({ layout: screenLayout.layout });
    } catch (error: any) {
      console.error("Get screen layout error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
