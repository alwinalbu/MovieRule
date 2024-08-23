import { IDependencies } from "../interfaces/IDependencies";
import { SubscriptionData, UserEntity } from "../../../domain/user/entities";

export const updateUserSubscriptionUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { updateUserSubscription },
  } = dependencies;

  return {
    execute: async (
      userId: string,
      subscriptionData: Partial<SubscriptionData>
    ): Promise<UserEntity | null> => {
      try {
        // Pass partial data to the repository
        return await updateUserSubscription(userId, subscriptionData);
      } catch (error: any) {
        throw new Error(error.message || "Failed to update user subscription");
      }
    },
  };
};
