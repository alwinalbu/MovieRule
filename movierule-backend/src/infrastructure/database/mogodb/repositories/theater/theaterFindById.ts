import { TheaterEntity } from "@/domain/theater/entities";
import { Theater } from "../../models/theaterSchema";


export const theaterFindById = async (id: string): Promise<TheaterEntity | null> => {
  try {
    const existingUser = await Theater.findById(id);

    if (!existingUser) {
      throw new Error("User does not exist!");
    }

    return existingUser;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
