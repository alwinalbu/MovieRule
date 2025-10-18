import { IDependencies } from "../interfaces/IDependencies";

export const getWatchlistUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getWatchlist },
  } = dependencies;

  return {
    execute: async (userId: string) => {
      const result = await getWatchlist(userId);
      if (!result) {
        return { success: false, message: "User not found" };
      }
      return { success: true, data: result };
    },
  };
};
