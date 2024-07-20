// import { IShow, Show } from "../../models/showSchema";


// export const theaterGetAllShows = async (): Promise<boolean | IShow[]> => {
//   try {
//     const shows = await Show.find().populate("movie");
//     if (shows.length === 0) {
//       return false;
//     }
//     return shows;
//   } catch (error) {
//     console.error("Error fetching shows:", error);
//     throw new Error("Failed to fetch shows");
//   }
// };

import { IShow, Show } from "../../models/showSchema";

export const theaterGetAllShows = async (theaterId: string): Promise<boolean | IShow[]> => {
  try {

    console.log(theaterId,"inside the repository");
    
    const shows = await Show.find({ theater_id: theaterId })
      .populate("movie")
      .populate("screen")
      .populate("theater_id");

    if (shows.length === 0) {
      return false;
    }

    console.log(shows,"inside the repo backend");
    
    return shows;

  } catch (error) {
    console.error("Error fetching shows:", error);
    throw new Error("Failed to fetch shows");
  }
};

