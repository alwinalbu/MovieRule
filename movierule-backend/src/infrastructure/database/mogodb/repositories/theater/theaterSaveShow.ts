
// import { IShow, Show } from "../../models/showSchema";
// import { Movie } from "../../models/movieSchema";
// import { Screen } from "../../models/screenSchema";


// export const theaterSaveShow = async (data: IShow): Promise<IShow | null> => {
//   try {

//     console.log("data inside the show repository before save:", data);
   
//     const movieDocument = await Movie.findOne({ title: data.movie });
    
//     if (!movieDocument) {
//       throw new Error("Movie not found");
//     }

   
//     const screenDocument = await Screen.findOne({ name: data.screen }); 

//     if (!screenDocument) {
//       throw new Error("Screen not found");
//     }

    
//     const newData = {
//       ...data,
//       movie: movieDocument._id,
//       screen: screenDocument._id,
//     };

    
//     const newShow = await Show.create(newData);

//     console.log(
//       "show after creating inside the show repository create:",
//       newShow
//     );

//     return newShow;
//   } catch (error) {
//     throw new Error((error as Error).message);
//   }
// };


// import { IShow, Show } from "../../models/showSchema";
// import { Movie } from "../../models/movieSchema";
// import { Screen } from "../../models/screenSchema";

// export const theaterSaveShow = async (data: IShow): Promise<IShow | null> => {
//   try {
//     console.log("data inside the show repository before save:", data);

//     const movieDocument = await Movie.findOne({ title: data.movie });
//     if (!movieDocument) {
//       throw new Error("Movie not found");
//     }

//     const screenDocument = await Screen.findOne({ name: data.screen });
//     if (!screenDocument) {
//       throw new Error("Screen not found");
//     }

//     // Check if the screen is already occupied during the given time slot
//     const overlappingShow = await Show.findOne({
//       screen: screenDocument._id,
//       date: data.date,
//       $or: [
//         {
//           start_time: { $lt: data.end_time, $gte: data.start_time },
//         },
//         {
//           end_time: { $gt: data.start_time, $lte: data.end_time },
//         },
//         {
//           start_time: { $lte: data.start_time },
//           end_time: { $gte: data.end_time },
//         },
//       ],
//     });

//     if (overlappingShow) {
//       throw new Error(
//         "Screen is already occupied during the specified time slot."
//       );
//     }

//     const newData = {
//       ...data,
//       movie: movieDocument._id,
//       screen: screenDocument._id,
//     };

//     const newShow = await Show.create(newData);

//     console.log(
//       "show after creating inside the show repository create:",
//       newShow
//     );

//     return newShow;
//   } catch (error) {
//     throw new Error((error as Error).message);
//   }
// };


import { IShow, Show } from "../../models/showSchema";
import { Movie } from "../../models/movieSchema";
import { Screen } from "../../models/screenSchema";

export const theaterSaveShow = async (data: IShow): Promise<IShow | null> => {
  try {
    console.log("data inside the show repository before save:", data);

    // Find the movie document by its title
    const movieDocument = await Movie.findOne({ title: data.movie });
    if (!movieDocument) {
      throw new Error("Movie not found");
    }

    console.log(movieDocument,"movie document");
    

    // Find the screen document by its name and theater ID
    const screenDocument = await Screen.findOne({
      name: data.screen,
      theaterId: data.theater_id,
    });

    console.log(screenDocument,"screenn document ");
    
    if (!screenDocument) {
      throw new Error("Screen not found in the specified theater");
    }

    // Check if the screen is already occupied during the given time slot within the same theater
    const overlappingShow = await Show.findOne({
      theater_id: data.theater_id,
      screen: screenDocument._id,
      date: data.date,
      $or: [
        {
          start_time: { $lt: data.end_time, $gte: data.start_time },
        },
        {
          end_time: { $gt: data.start_time, $lte: data.end_time },
        },
        {
          start_time: { $lte: data.start_time },
          end_time: { $gte: data.end_time },
        },
      ],
    });

    if (overlappingShow) {
      throw new Error(
        "Screen is already occupied during the specified time slot in the same theater."
      );
    }

    // Prepare the data with the movie and screen ObjectIds
    const newData = {
      ...data,
      movie: movieDocument._id,
      screen: screenDocument._id,
    };

    // Create the new show
    const newShow = await Show.create(newData);

    console.log(
      "show after creating inside the show repository create:",
      newShow
    );

    return newShow;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
