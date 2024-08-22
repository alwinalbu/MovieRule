import { TheaterEntity } from "@/domain/theater/entities";
import { Theater } from "../../models/theaterSchema"; // Adjust the import path if necessary

export const getTheaterById = async (
  theaterId: string
): Promise<TheaterEntity | null> => {
  try {
    console.log(theaterId, "id inside backend repo");

    const theaterDetails = await Theater.findById(theaterId);

    if (!theaterDetails) {
      throw new Error("Theater not found");
    }

    return theaterDetails.toObject() as TheaterEntity;
  } catch (error: any) {
    console.error("Failed to get theater details:", error);
    throw new Error("Failed to get theater details");
  }
};
