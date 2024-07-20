import { UserEntity } from "@/domain/user/entities";
import { User } from "../../models/userSchema";

export const updateUserStatus = async (
  id: string,
  status: string
): Promise<UserEntity | null> => {
  try {

    console.log(id,status,"id and status insdie backedn repo");
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return updatedUser; 
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
