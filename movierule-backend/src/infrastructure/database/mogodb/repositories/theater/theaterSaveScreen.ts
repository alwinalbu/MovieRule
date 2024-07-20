
import  { IScreen, Screen } from "../../models/screenSchema";



export const theaterSaveScreen = async (data: IScreen): Promise<IScreen|null> => {

  try {
    
    const newScreen = await Screen.create(data);

    return newScreen;

  } catch (error: any) {
    throw new Error(error.message || "Saving screen failed");
  }
};
