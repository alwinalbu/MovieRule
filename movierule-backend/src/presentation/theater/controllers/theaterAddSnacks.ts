import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { ISnack } from "@/infrastructure/database/mogodb/models/snackSchema";

import { NextFunction, Request, Response } from "express";

export const theaterAddSnackController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { AddSnackTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, price, image, theater_id } = req.body;

      console.log(name, price, image, "data inside backend");
      console.log(req.user, "theater req inside add snack details");

      if (!req.user || !req.user._id) {
        return res.status(402).json("Authentication failed");
      }

      if (!theater_id || !name || !price || !image) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const data: ISnack = {
        theater_id,
        name,
        price,
        image,
      };

      const newSnack = await AddSnackTheaterUseCase(dependencies).execute(data);

      return res.status(200).json({
        message: "Snack added successfully",
        data: newSnack,
      });
    } catch (error: any) {
      console.error("Add snack error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
