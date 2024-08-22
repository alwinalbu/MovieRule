import { IDependencies } from "../interfaces/IDependencies";

export const findMainUserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: {findByRole},
  } = dependencies;

  return {
    execute: async (id: string, role: string) => {
      console.log(role,"inside use case role");
      
      return await findByRole(id, role);
    },
  };
};
