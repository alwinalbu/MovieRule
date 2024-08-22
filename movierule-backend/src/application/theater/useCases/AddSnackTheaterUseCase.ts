
import { ISnack } from "@/infrastructure/database/mogodb/models/snackSchema";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const AddSnackTheaterUseCase = (dependencies: ITheaterDependencies) => {
  const {
    repositories: { theaterSaveSnack },
  } = dependencies;

  return {
    execute: async (data: ISnack) => {
      try {
        console.log(data, "inside the use case");
        return await theaterSaveSnack(data);
      } catch (error: any) {
        throw new Error(error.message || "Adding snack failed");
      }
    },
  };
};


