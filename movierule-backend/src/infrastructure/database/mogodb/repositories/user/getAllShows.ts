import { IShow, Show } from "../../models/showSchema";

export const getAllShows=async ():Promise<boolean|IShow[]>=>{
    try {
      const shows = await Show.find()
        .populate("movie")
        .populate("screen")
        .populate("theater_id");

      if (shows.length === 0) {
        return false;
      }
      return shows;
    } catch (error) {
      console.error("Error fetching shows:", error);
      throw new Error("Failed to fetch shows");
    }
}