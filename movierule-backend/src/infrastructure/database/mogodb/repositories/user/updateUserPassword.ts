import { UserEntity } from "../../../../../domain/user/entities";
import { User } from "../../models/userSchema";


export const updateUserPassword = async (data: {email: string;
  password: string;
}): Promise<UserEntity> => {
  try {
    const updatePassword = await User.findOneAndUpdate(
      {
        email: data.email,
      },
      {
        password: data.password,
      },
      {
        new: true,
      }
    );
    if (!updatePassword) {
      throw new Error("User password update failed");
    }

    return updatePassword;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
