import { IScreen } from "../../../infrastructure/database/mogodb/models/screenSchema";
import { IDependencies } from "../interfaces/IDependencies";


export const userGetScreenLayoutUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { userGetScreenById },
  } = dependencies;

  return {
    execute: async (screenId: string): Promise<IScreen | null> => {
      try {
        return await userGetScreenById(screenId);
      } catch (error: any) {
        throw new Error(error.message || "Fetching screen layout failed");
      }
    },
  };
};
