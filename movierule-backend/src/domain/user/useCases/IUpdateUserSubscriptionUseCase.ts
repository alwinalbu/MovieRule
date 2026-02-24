import { SubscriptionData, UserEntity } from "../entities";

export interface IUpdateUserSubscriptionUseCase {
  execute(
    userId: string,
    subscriptionData: Partial<SubscriptionData> 
  ): Promise<UserEntity | null>;
}
