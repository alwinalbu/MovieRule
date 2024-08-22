import {  ISnack, SnackModel } from "../../models/snackSchema";

export const fetchSnacks = async (theaterId: string): Promise<ISnack[]> => {
  try {
    return await SnackModel.find({ theater_id: theaterId });
  } catch (error: any) {
    throw new Error(error.message || "Fetching snacks failed");
  }
};
