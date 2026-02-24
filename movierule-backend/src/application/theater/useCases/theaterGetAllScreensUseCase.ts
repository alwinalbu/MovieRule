
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const theaterGetAllScreensUseCase = (
  dependencies: ITheaterDependencies
) => {
  const {
    repositories: { theaterGetAllScreens },
  } = dependencies;

  return {
    execute: async (theaterId:string) => {
      return await theaterGetAllScreens(theaterId);
    },
  };
};
