import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { IScreen } from "@/infrastructure/database/mogodb/models/screenSchema";
import { Theater } from "@/infrastructure/database/mogodb/models/theaterSchema";
import { NextFunction, Request, Response } from "express";

export const theaterAddScreenController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { AddScreenTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Destructure screen details from request body
      const { name, quality, sound, rows, cols, price, image, theaterId } =
        req.body;

      console.log(
        name,
        quality,
        sound,
        rows,
        cols,
        price,
        image,
        "backend file "
      );
      

      // Validate user authentication
      if (!req.user || !req.user._id) {
        return res.status(402).json("Authentication failed");
      }

      // Validate required fields
      if (!name || !quality || !sound || !rows || !cols || !price || !image) {
        return res.status(400).json({ message: "All fields are required" });
      }

      
      const data: IScreen = {
        name,
        quality,
        sound,
        rows,
        cols,
        price,
        image,
        theaterId,
      };

      
      const newScreen = await AddScreenTheaterUseCase(dependencies).execute(
        data
      );

       await Theater.findByIdAndUpdate(theaterId, {
         $push: { screen: newScreen?._id },
       });
 
      return res.status(200).json({
        message: "Screen added successfully",
        data: newScreen,
      });
    } catch (error: any) {
      
      console.error("Add screen error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
