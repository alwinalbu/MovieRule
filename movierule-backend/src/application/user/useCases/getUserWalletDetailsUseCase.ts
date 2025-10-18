import { IUserWalletDetails } from "../../../infrastructure/database/mogodb/models/userSchema";
import { IDependencies } from "../interfaces/IDependencies";

export const getUserWalletDetailsUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { userWalletDetails },
  } = dependencies;

  return {
    execute: async (userId: string): Promise<IUserWalletDetails> => {
      try {
        console.log(userId, "user id inside use case");

        // Fetch the user wallet details from the repository
        const walletDetails = await userWalletDetails(userId);

        if (!walletDetails) {
          throw new Error("User wallet details not found");
        }

        return walletDetails;
      } catch (error: any) {
        throw new Error(error.message || "Fetching Wallet details failed");
      }
    },
  };
};
