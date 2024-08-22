import { Admin } from "../../models/adminSchema";
import { Theater } from "../../models/theaterSchema";
import { User } from "../../models/userSchema";

export const findByRole = async (
  id: string,
  role: string
): Promise<any | null> => {
  try {
    let existingUser: any;

    console.log(role,"role inside repo");
    

    switch (role) {
      case "user":
        existingUser = await User.findById(id);
        break;
      case "theatre":
        existingUser = await Theater.findById(id);
        break;
      case "admin":
        existingUser = await Admin.findById(id);
        break;
      default:
        throw new Error("Invalid role provided");
    }

    if (!existingUser) {
      throw new Error("User does not exist!");
    }

    return existingUser;
  } catch (error: any) {
    throw new Error(
      error?.message || "An error occurred while fetching the user."
    );
  }
};
