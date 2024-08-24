import { UserEntity } from "../../../../../domain/user/entities";
import { User } from "../../models/userSchema";


export const getAllUsers = async (): Promise<UserEntity[] | false> => {
  try {
    const allUsers = await User.find({}, { password: 0 });
    if (!allUsers) {
      return false;
    }
    return allUsers;
  } catch (error: any) {
    throw new Error(error);
  }
};
