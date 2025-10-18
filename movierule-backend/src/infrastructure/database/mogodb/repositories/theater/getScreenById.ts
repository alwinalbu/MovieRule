import { IScreen, Screen } from "../../models/screenSchema";

export const getScreenById = async (id: string): Promise<IScreen | null> => {
  try {
    const screen = await Screen.findById(id);
    return screen;
  } catch (error:any) {
    throw new Error(error.message || "Fetching screen failed");
  }
};
