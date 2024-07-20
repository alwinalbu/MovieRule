import { ObjectId } from "mongoose";

export interface TheaterEntity {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  theaterName?: string;
  profilePicture?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  role?: "theatre";
  status?:string;
  createdAt?: Date;
  updatedAt?: Date;
  screen?:ObjectId[];
}
  