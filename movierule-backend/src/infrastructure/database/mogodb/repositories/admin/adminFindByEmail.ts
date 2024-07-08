import { AdminEntity } from "@/domain/admin/entities";
import { Admin } from "../../models/adminSchema";

export const adminFindByEmail = async (
  email: string
): Promise<AdminEntity | null> => {
  console.log("🚀 ~ AdminEmail to find:", email);

  try {
    const esistingAdmin = await Admin.findOne({
      email: email,
    });

    console.log("🚀 ~ AdminEmail in database:", esistingAdmin);

    return esistingAdmin;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
