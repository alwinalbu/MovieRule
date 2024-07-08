import { TheaterEntity } from "@/domain/theater/entities";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const createTheaterUseCase = (dependencies: ITheaterDependencies) => {
  const {
    repositories: { theaterCreate },
  } = dependencies;

  return {
    execute: async (data: TheaterEntity) => {
      try {
        return await theaterCreate(data);
      } catch (error: any) {
        throw new Error(error.message || "Theater creation failed");
      }
    },
  };
};
