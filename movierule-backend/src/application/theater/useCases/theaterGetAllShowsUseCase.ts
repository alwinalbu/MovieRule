import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const theaterGetAllShowsUseCase = (dependencies: ITheaterDependencies) => {
  const {repositories:{theaterGetAllShows}}=dependencies;

  return {
    execute: async (theaterId: string) => {
      return await theaterGetAllShows(theaterId);
    },
  };
};
