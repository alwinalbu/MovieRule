import { TheaterEntity } from "@/domain/theater/entities";
import { Theater } from "../../models/theaterSchema";

export const theaterCreate = async (
  data: TheaterEntity
): Promise<TheaterEntity | null> => {
  try {
    console.log("Data inside the theater repository create:", data);

    const newTheater = await Theater.create(data);

    console.log(
      "Data after creating inside the theater repository create:",
      newTheater
    );

    return newTheater;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
