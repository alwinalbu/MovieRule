 import { ObjectId } from "mongoose";
 
 export interface UserEntity {
   _id?: ObjectId;
   username?: string;
   email: string;
   password: string;
   role?: "user";
   otp?: string;
   status?: string;
   createdAt?: Date;
   updatedAt?: Date;
   profilePicture?:string;
   city?:string;
 }


