import { Theater } from "../../models/theaterSchema";


export const theaterCheckEmail = async (email: string) => {
  try {
    const TheaterExist = await Theater.findOne({ email });
    return TheaterExist ? true : false;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
