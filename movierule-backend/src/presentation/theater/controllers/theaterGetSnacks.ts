import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";

export const theaterGetSnacksController = (
  dependencies: ITheaterDependencies
) => {
  const {
    useCases: { FetchSnacksUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { theaterId } = req.query;

      console.log(theaterId,"inside fetch snacks thater id");
      

      if (!theaterId) {
        return res.status(400).json({ message: "Theater ID is required" });
      }

      const snacks = await FetchSnacksUseCase(dependencies).execute(
        theaterId as string
      );

    console.log(snacks, "snacks  in backend ");

      return res.status(200).json({
        message: "Snacks fetched successfully",
        data: snacks,
      });

    
    } catch (error: any) {
      console.error("Fetch snacks error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
