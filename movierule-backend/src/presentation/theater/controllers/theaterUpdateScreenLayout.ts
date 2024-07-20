

import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";


export const theaterUpdateScreenLayoutController = (dependencies:ITheaterDependencies) => {
  
    const {
    useCases: { theaterUpdateScreenLayoutUseCase },
  } = dependencies 

  return async (req: Request, res: Response, next: NextFunction) => {
    const { screenId } = req.params;
    const { layout } = req.body;

    // Validate user authentication
    if (!req.user || !req.user._id) {
      return res.status(402).json("Authentication failed");
    }

    try {
      const updatedScreen = await theaterUpdateScreenLayoutUseCase(
        dependencies
      ).execute(screenId, layout);

      if (!updatedScreen) {
        return res
          .status(404)
          .json({ success: false, message: "Screen not found" });
      }

      res.status(200).json({
        success: true,
        layout: updatedScreen.layout,
        message: "Screen layout updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating screen layout:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update screen layout",
      });
    }
  };
};
