import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";


export const findTheaterByEmailUseCase = (dependencies:ITheaterDependencies) => {
  const {
    repositories: { theaterFindByEmail },
  } = dependencies;

  return {
    execute: async (email: string) => {
      return await theaterFindByEmail(email);
    },
  };
};
