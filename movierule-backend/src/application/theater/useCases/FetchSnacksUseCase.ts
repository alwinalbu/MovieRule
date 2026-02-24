
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const FetchSnacksUseCase = (dependencies: ITheaterDependencies) => {
  const {
    repositories: { fetchSnacks },
  } = dependencies;

  return {
    execute: async (theaterId: string) => {
      try {
        return await fetchSnacks(theaterId);
      } catch (error: any) {
        throw new Error(error.message || "Fetching snacks failed");
      }
    },
  };
};


