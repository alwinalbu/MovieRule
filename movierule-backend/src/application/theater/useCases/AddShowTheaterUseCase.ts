import { IShow } from "../../../infrastructure/database/mogodb/models/showSchema";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const AddShowTheaterUseCase = (dependencies: ITheaterDependencies) => {
  const {
    repositories: { theaterSaveShow },
  } = dependencies;

  return {
    execute: async (data: IShow) => {
      try {
        console.log(data,"inside the usecase");
        
        return await theaterSaveShow(data);
        
      } catch (error: any) {
        throw new Error(error.message || "Adding show failed");
      }
    },
  };
};
