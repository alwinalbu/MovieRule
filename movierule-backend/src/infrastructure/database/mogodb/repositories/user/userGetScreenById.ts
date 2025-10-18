import { IScreen, Screen } from "../../models/screenSchema";

export const userGetScreenById = async (id: string): Promise<IScreen | null> => {
  try {
    const screen = await Screen.findById(id).populate("theaterId");
    return screen;
  } catch (error: any) {
    throw new Error(error.message || "Fetching screen failed");
  }
};
