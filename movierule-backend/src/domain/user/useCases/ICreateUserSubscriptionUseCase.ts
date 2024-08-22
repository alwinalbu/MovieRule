
import { SubscriptionData, UserEntity } from "../entities";

export interface ICreateUserSubscriptionUseCase {
  execute(
    userId: string,
    subscriptionData:SubscriptionData,
  ): Promise<UserEntity | null>;
}
