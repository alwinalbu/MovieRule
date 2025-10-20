import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";
import { Screen } from "../../../infrastructure/database/mogodb/models/screenSchema";

export const theaterUpdateScreenController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { updateScreenTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, quality, sound, rows, cols, price, image, theaterId } =
        req.body;
      const { screenId } = req.params;

      // 🛡️ Validate authentication
      if (!req.user || !req.user._id) {
        return res.status(402).json("Authentication failed");
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

      // 🔢 Safely parse numbers
      const parsedPrice = Number(price);
      const parsedRows = Number(rows);
      const parsedCols = Number(cols);

      if (isNaN(parsedPrice) || isNaN(parsedRows) || isNaN(parsedCols)) {
        return res.status(400).json({ message: "Invalid numeric values" });
      }

      // ⚠️ Validate non-negative price
      if (parsedPrice < 0) {
        return res.status(400).json({ message: "Price cannot be negative" });
      }

      // 🧩 Prevent duplicate screen names in the same theater
      const existingScreen = await Screen.findOne({
        name,
        theaterId,
        _id: { $ne: screenId },
      });
      if (existingScreen) {
        return res
          .status(400)
          .json({ message: "Screen name already exists in this theater" });
      }

      // 🧠 Prepare data for update
      const data = {
        _id: screenId,
        name,
        quality,
        sound,
        rows: parsedRows,
        cols: parsedCols,
        price: parsedPrice,
        image,
        theaterId,
      };

      // 💾 Execute update
      const updatedScreen = await updateScreenTheaterUseCase(
        dependencies
      ).execute(data);

      if (!updatedScreen) {
        return res.status(404).json({ message: "Screen not found" });
      }

      // ✅ Success response
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

