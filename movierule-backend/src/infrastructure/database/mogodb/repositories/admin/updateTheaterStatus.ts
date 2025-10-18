import { TheaterEntity } from "../../../../../domain/theater/entities";
import { Theater } from "../../models/theaterSchema"; 
export const updateTheaterStatus = async (
  id: string,
  status: string
): Promise<TheaterEntity | null> => {
  try {
    console.log(id, status, "id and status  theater insdie backedn repo");
    
    const updatedTheater = await Theater.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return updatedTheater
  } catch (error) {
    console.error("Failed to update theater status:", error);
    throw new Error("Failed to update theater status");
  }
};
