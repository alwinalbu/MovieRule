import { IDependencies } from "../interfaces/IDependencies";

export const getAllShowsUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getAllShows },
  } = dependencies;

  return {
    execute: async () => {
      return await getAllShows();
    },
  };
};
