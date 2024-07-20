import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";

export const theaterUpdateScreenController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { updateScreenTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Destructure screen details from request body
      const { name, quality, sound, rows, cols, price, image, theaterId } =
        req.body;
      const { screenId } = req.params;

      console.log(screenId,"screen id here backend");
      
      // Validate user authentication
      if (!req.user || !req.user._id) {
        return res.status(402).json("Authentication failed");
      }

      // Validate required fields
      if (!name || !quality || !sound || !rows || !cols || !price || !image) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const data = {
        _id: screenId,
        name,
        quality,
        sound,
        rows,
        cols,
        price,
        image,
        theaterId,
      };

      const updatedScreen = await updateScreenTheaterUseCase(
        dependencies
      ).execute(data);

      if (!updatedScreen) {
        return res.status(404).json({ message: "Screen not found" });
      }

      return res.status(200).json({
        message: "Screen updated successfully",
        data: updatedScreen,
      });
    } catch (error: any) {
      console.error("Update screen error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
