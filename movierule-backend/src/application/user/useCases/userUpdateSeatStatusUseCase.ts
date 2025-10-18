import { IDependencies } from "../../../application/user/interfaces/IDependencies";


export const userUpdateSeatStatusUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { userUpdateSeatStatus },
  } = dependencies;

  return {
    execute: async (
      screenId: string,
      selectedSeats: string[]
    ): Promise<boolean> => {
      try {
        const result = await userUpdateSeatStatus(screenId, selectedSeats);

        console.log(result,"inside the usecase of seat status");
        
        return result; 
      } catch (error: any) {
        throw new Error(error.message || "Updating seat status failed");
      }
    },
  };
};
