import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";


export const findTheaterByIdUseCase = (dependencies: ITheaterDependencies) => {
  const {
    repositories: { theaterFindById },
  } = dependencies;

  return {
    execute: async (id: string) => {
      return await theaterFindById(id);
    },
  };
};
