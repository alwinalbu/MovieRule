// import { IShow, Show } from "../../models/showSchema";
// import { Movie } from "../../models/movieSchema"; 

// export const theaterSaveShow = async (data: IShow): Promise<IShow | null> => {

//   try {


//     console.log("data inside the show repository before save:", data);

//     const movieDocument = await Movie.findOne({ title: data.movie });

//     if (!movieDocument) {
//       throw new Error("Movie not found");
//     }

  
//     const newData = {
//       ...data,
//       movie: movieDocument._id,
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
   
    const movieDocument = await Movie.findOne({ title: data.movie });
    
    if (!movieDocument) {
      throw new Error("Movie not found");
    }

   
    const screenDocument = await Screen.findOne({ name: data.screen }); 

    if (!screenDocument) {
      throw new Error("Screen not found");
    }

    
    const newData = {
      ...data,
      movie: movieDocument._id,
      screen: screenDocument._id,
    };

    
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
