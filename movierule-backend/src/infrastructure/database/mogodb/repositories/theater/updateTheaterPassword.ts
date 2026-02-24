import { TheaterEntity } from "../../../../../domain/theater/entities";
import { Theater } from "../../models/theaterSchema";

export const updateTheaterPassword = async (data: {
  email: string;
  password: string;
}): Promise<TheaterEntity> => {
  try {
    const updatePassword = await Theater.findOneAndUpdate(
      {
        email: data.email,
      },
      {
        password: data.password,
      },
      {
        new: true,
      }
    );
    if (!updatePassword) {
      throw new Error("Theater password update failed");
    }
    return updatePassword;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
