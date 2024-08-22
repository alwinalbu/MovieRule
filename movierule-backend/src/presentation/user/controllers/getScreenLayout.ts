
import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getScreenLayoutController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { userGetScreenLayoutUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { screenId } = req.params;

      if (!req.user || !req.user._id) {
        return res.status(402).json("Authentication failed");
      }

      const screenLayout = await userGetScreenLayoutUseCase(dependencies).execute(
        screenId
      );

      console.log(screenLayout, "screen from backend------------------------------------");

      if (!screenLayout) {
        return res.status(404).json({ message: "Screen not found" });
      }

      return res.status(200).json({ screenLayout });
    } catch (error: any) {
      console.error("Get screen layout error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
