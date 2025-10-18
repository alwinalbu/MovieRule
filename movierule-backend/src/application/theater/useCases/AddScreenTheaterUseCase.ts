
import { IScreen } from "../../../infrastructure/database/mogodb/models/screenSchema";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const AddScreenTheaterUseCase = (dependencies: ITheaterDependencies) => {
  const {
    repositories: { theaterSaveScreen },
  } = dependencies;

  return {
    execute: async (data: IScreen) => {
      try {
        
        console.log(data, "inside the usecase for screen");

        return await theaterSaveScreen(data);
      } catch (error: any) {
        throw new Error(error.message || "Adding screen failed");
      }
    },
  };
};
