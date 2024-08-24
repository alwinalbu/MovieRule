import { TheaterEntity } from "../../../../../domain/theater/entities";
import { Theater } from "../../models/theaterSchema";


export const theaterFindByEmail = async (
  email: string
): Promise<TheaterEntity | null> => {
  console.log("🚀 ~ findByEmail:", email);

  try {
    const esistingTheater = await Theater.findOne({
      email: email,
    });

    console.log("🚀 ~ Email in database:", esistingTheater);

    return esistingTheater;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
