import { UserEntity } from "@/domain/user/entities";
import { User } from "../../models/userSchema";

export const findById=async(id:string):Promise<UserEntity|null>=>{

 try {
   const existingUser = await User.findById(id);

   if (!existingUser) {
     throw new Error("User does not exist!");
   }

   return existingUser;
 } catch (error: any) {
   throw new Error(error?.message);
 }
 
}