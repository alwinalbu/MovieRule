import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";


export const checkTheaterEmailUseCase = (dependencies:ITheaterDependencies) => {
  const {
    repositories: { theaterCheckEmail },
  } = dependencies;

  return {
    execute: async (email: string) => {
      try {
        return await theaterCheckEmail(email);
      } catch (error: any) {
        throw new Error(error?.message);
      }
    },
  };
};
