import { IScreen } from "@/infrastructure/database/mogodb/models/screenSchema";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";


export const getScreenLayoutUseCase = (dependencies:ITheaterDependencies) => {
  const {
    repositories: { getScreenById },
  } = dependencies;

  return {
    execute: async (screenId: string): Promise<IScreen | null> => {
      try {
        return await getScreenById(screenId);
      } catch (error: any) {
        throw new Error(error.message || "Fetching screen layout failed");
      }
    },
  };
};
