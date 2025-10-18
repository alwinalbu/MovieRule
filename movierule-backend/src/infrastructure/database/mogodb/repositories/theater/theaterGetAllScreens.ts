import { IScreen, Screen } from "../../models/screenSchema";

export const theaterGetAllScreens = async (theaterId: string): Promise<boolean | IScreen[]> => {

  console.log(theaterId,"inside repo theater id");
  
  try {
    const screens = await Screen.find({ theaterId: theaterId }).exec(); // Use .exec() to return a true Promise

    if (!screens || screens.length === 0) {
      return false; 
    }

    return screens; 
  } catch (error) {
    console.error("Error fetching screens:", error);
    throw new Error("Failed to fetch screens");
  }
};



