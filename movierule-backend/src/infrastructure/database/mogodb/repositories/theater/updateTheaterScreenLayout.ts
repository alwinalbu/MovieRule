// import { IScreen, Screen } from "../../models/screenSchema";

// export const updateTheaterScreenLayout= async(screenId:string,layout:number[][]):Promise<IScreen|null>=>{
//      try {
//        const updatedScreen = await Screen.findByIdAndUpdate(
//          screenId,
//          { layout },
//          { new: true } 
//        );

//        return updatedScreen;
//      } catch (error) {
//        console.error("Error updating screen layout:", error);
//        throw new Error("Failed to update screen layout");
//      }
// }

import { IScreen, Screen } from "../../models/screenSchema";

export const updateTheaterScreenLayout = async (
  screenId: string,
  layout: (any | null)[][] // 🟢 FIX type
): Promise<IScreen | null> => {
  try {
    const updatedScreen = await Screen.findByIdAndUpdate(
      screenId,
      { layout }, // 🟢 Only layout gets updated, baseLayout remains safe
      { new: true }
    );

    return updatedScreen;
  } catch (error) {
    console.error("Error updating screen layout:", error);
    throw new Error("Failed to update screen layout");
  }
};
