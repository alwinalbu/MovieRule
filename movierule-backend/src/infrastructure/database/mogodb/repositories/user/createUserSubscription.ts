import { SubscriptionData, UserEntity } from "../../../../../domain/user/entities";
import { User } from "../../models/userSchema";



export const createUserSubscription = async (
  userId: string,
  subscriptionData: SubscriptionData 
): Promise<UserEntity | null> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Update user's subscription information
    user.isSubscribed = subscriptionData;

    // Save the updated user document
    await user.save();

    return user as UserEntity;
  } catch (error: any) {
    console.error("Error updating user subscription:", error);
    throw new Error("Failed to update user subscription.");
  }
};
