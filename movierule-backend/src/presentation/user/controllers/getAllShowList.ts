import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const getAllShowListController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllShowsUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shows = await getAllShowsUseCase(dependencies).execute();

      if (!shows) {
        throw new Error("Shows Not Available");
      }

      res.status(200).json({
        success: true,
        data: shows,
        message: "All theater shows fetched successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: (error as Error)?.message || "Internal server error",
      });
    }
  };
};
