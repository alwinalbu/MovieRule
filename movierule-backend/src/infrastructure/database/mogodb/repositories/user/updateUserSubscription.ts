import { UserEntity } from "@/domain/user/entities";
import { User } from "../../models/userSchema";

export const updateUserSubscription = async (
  userId: string,
  subscriptionData: any // Using any for flexibility
): Promise<UserEntity | null> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    console.log(user.isSubscribed, "user before");

    // Merge existing data with the provided partial updates
    user.isSubscribed = {
      ...user.isSubscribed, // Keep existing values
      ...subscriptionData, // Apply updates
    };

    await user.save();

    return user;
  } catch (error: any) {
    console.error("Error updating user subscription:", error);
    throw new Error("Failed to update user subscription.");
  }
};
