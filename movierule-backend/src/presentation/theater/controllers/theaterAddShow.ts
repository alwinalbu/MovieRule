import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";
import { IShow } from "@/infrastructure/database/mogodb/models/showSchema";
import { NextFunction, Request, Response } from "express";

export const theaterAddShowController = (dependencies: ITheaterDependencies) => {
  const {
    useCases: { AddShowTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { show_name, movie, screen, date, start_time, end_time,theater_id } = req.body;

      
         console.log(show_name, movie, screen, date, start_time, end_time,"data inside backend");

         console.log(req.user, "theater req inside add show deatails");

         if (!req.user || !req.user._id) {
           return res.status(402).json("Authentication failed");
         }
      
      if (
        !theater_id ||
        !movie ||
        !screen ||
        !show_name ||
        !date ||
        !start_time ||
        !end_time
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const data:IShow = {
        theater_id,
        movie,
        screen,
        show_name,
        date,
        start_time,
        end_time,
      };
      const newShow = await AddShowTheaterUseCase(dependencies).execute(data);

      return res.status(200).json({
        message: "Show added successfully",
        data: newShow,
      });
    } catch (error: any) {
      console.error("Add show error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
