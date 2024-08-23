import { SubscriptionData, UserEntity } from "../../../domain/user/entities";
import { IDependencies } from "../interfaces/IDependencies";


export const createUserSubscriptionUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createUserSubscription },
  } = dependencies;

  return {
    execute: async (
      userId: string,
      subscriptionData: SubscriptionData 
    ): Promise<UserEntity | null> => {
      try {
        return await createUserSubscription(userId, subscriptionData);
      } catch (error: any) {
        throw new Error(error.message || "Failed to create user subscription");
      }
    },
  };
};
