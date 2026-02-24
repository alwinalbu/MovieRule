import { IShow, Show } from "../../models/showSchema";

export const getShowsByMovie= async (movie_id:string):Promise<boolean| IShow[]>=>{

    console.log(movie_id,"movie id inside repo");
    
    try {
        const shows = await Show.find({ "movie": movie_id })
          .populate("movie")
          .populate("screen")
          .populate("theater_id");

        if (shows.length === 0) {
          return false;
        }

        return shows;
        
    } catch (error:any) {
         console.error("Error fetching shows:", error);
         throw new Error("Failed to fetch shows");
    }
}