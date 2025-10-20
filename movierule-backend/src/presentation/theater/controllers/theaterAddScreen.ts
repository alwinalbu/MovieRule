
import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import {
  IScreen,
  Screen,
} from "../../../infrastructure/database/mogodb/models/screenSchema";
import { Theater } from "../../../infrastructure/database/mogodb/models/theaterSchema";
import { NextFunction, Request, Response } from "express";

export const theaterAddScreenController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { AddScreenTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, quality, sound, rows, cols, price, image, theaterId } =
        req.body;

      console.log("Adding screen:", name, "for theater:", theaterId);

      // 🔐 Authentication check
      if (!req.user || !req.user._id) {
        return res.status(402).json({ message: "Authentication failed" });
      }

      // ⚠️ Validate required fields (allow price = 0)
      if (
        !name ||
        !quality ||
        !sound ||
        !rows ||
        !cols ||
        price === undefined ||
        price === null ||
        !image
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // 🔢 Parse numeric values
      const parsedPrice = Number(price);
      const parsedRows = Number(rows);
      const parsedCols = Number(cols);

      if (isNaN(parsedPrice) || isNaN(parsedRows) || isNaN(parsedCols)) {
        return res
          .status(400)
          .json({ message: "Invalid numeric values for rows, cols, or price" });
      }

      // ⚠️ Validate non-negative price
      if (parsedPrice < 0) {
        return res.status(400).json({ message: "Price cannot be negative" });
      }

      // 🧩 Check for duplicate screen name in the same theater
      const existingScreen = await Screen.findOne({ theaterId, name });
      if (existingScreen) {
        return res.status(400).json({
          message: `Screen name "${name}" already exists in this theater.`,
        });
      }

      // 🧱 Construct new screen object
      const data: IScreen = {
        name,
        quality,
        sound,
        rows: parsedRows,
        cols: parsedCols,
        price: parsedPrice,
        image,
        theaterId,
      };

      // 💾 Save new screen
      const newScreen = await AddScreenTheaterUseCase(dependencies).execute(
        data
      );

      // 🧩 Link the new screen to theater document
      await Theater.findByIdAndUpdate(theaterId, {
        $push: { screen: newScreen?._id },
      });

      // ✅ Success response
      return res.status(200).json({
        message: "Screen added successfully",
        data: newScreen,
      });
    } catch (error: any) {
      console.error("Add screen error:", error);

      // 🧠 Handle MongoDB duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Screen name already exists in this theater.",
        });
      }

      // ⚙️ Handle other errors
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  };
};


