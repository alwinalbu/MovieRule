import { comparePassword } from "../../../utils/bcrypt";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";


export const loginTheaterUseCase = (dependencies:ITheaterDependencies) => {
  const {
    repositories: { theaterFindByEmail },
  } = dependencies;

  return {
    execute: async (email: string, password: string) => {
      try {
        const Theater = await theaterFindByEmail(email);
        if (!Theater) {
          throw new Error("Theater not found");
        }

        if(Theater.status==='blocked'){
           throw new Error("Sorry, Your Account is Blocked");
        }

        const isPasswordValid = await comparePassword(password, Theater.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
        return Theater;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  };
};
