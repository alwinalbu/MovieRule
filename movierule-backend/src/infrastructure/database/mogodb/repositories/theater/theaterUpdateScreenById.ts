
import { IScreen, Screen } from "../../models/screenSchema";

export const updateScreenById = async (id:any,updateData: Partial<IScreen>): Promise<IScreen | null> => {

  try {

    console.log("Updating screen with ID:", id, "and data:", updateData);

    const updatedScreen = await Screen.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedScreen) {
      throw new Error("Screen not found!");
    }

    console.log("Updated screen data:", updatedScreen);

    return updatedScreen;
    
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
