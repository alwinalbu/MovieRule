import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";


export const updateTheaterPasswordUseCase = (dependencies:ITheaterDependencies) => {
  const {
    repositories: { updateTheaterPassword },
  } = dependencies;
  return {
    execute: async (data: { email: string; password: string }) => {
      return await updateTheaterPassword({
        email: data.email,
        password: data.password,
      });
    },
  };
};
