import { ObjectId } from "mongoose";

export interface TheaterEntity {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  OwnerName?: string;
  profilePicture?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  role?: "theatre";
  status?: string;
  aadhaarCard?: string;
  licenseDocument?: string;
  comments?: string;
  rating?: string;
  createdAt?: Date;
  updatedAt?: Date;
  screen?: ObjectId[];
  snacks?: ObjectId[];
}
  