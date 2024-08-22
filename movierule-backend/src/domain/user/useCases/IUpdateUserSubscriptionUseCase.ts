import { SubscriptionData, UserEntity } from "../entities";

export interface IUpdateUserSubscriptionUseCase {
  execute(
    userId: string,
    subscriptionData: Partial<SubscriptionData> // Allow partial updates
  ): Promise<UserEntity | null>;
}
