import { TheaterEntity } from "@/domain/theater/entities";
import { Theater } from "../../models/theaterSchema";


export const getAllTheaters = async (): Promise<TheaterEntity[] | false> => {
  try {
    const allTheaters = await Theater.find({}, { password: 0 });
    if (!allTheaters) {
      return false;
    }
    return allTheaters;
  } catch (error: any) {
    throw new Error(error);
  }
};
