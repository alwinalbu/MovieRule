import { ISnack, SnackModel } from "../../models/snackSchema";


export const theaterSaveSnack = async (data: ISnack): Promise<ISnack | null> => {
  try {
    const newSnack = await SnackModel.create(data);
    return newSnack;
  } catch (error: any) {
    throw new Error(error.message || "Saving snack failed");
  }
};
