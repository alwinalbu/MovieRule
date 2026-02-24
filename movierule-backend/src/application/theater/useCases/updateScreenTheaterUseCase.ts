import { IScreen } from "../../../infrastructure/database/mogodb/models/screenSchema";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const updateScreenTheaterUseCase = (dependencies: ITheaterDependencies) => {

  const {
    repositories: { updateScreenById },
  } = dependencies;

  return {
    execute: async (data:IScreen) => {

      const { _id, ...updateData } = data;
    
      try {
        return await updateScreenById(_id, updateData);
      } catch (error: any) {
        throw new Error(error.message || "Screen update failed");
      }
    },
  };
};
