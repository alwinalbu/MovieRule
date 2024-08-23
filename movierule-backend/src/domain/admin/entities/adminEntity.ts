
import { ObjectId } from "mongoose";

export interface AdminEntity {
  _id?: ObjectId;
  username?: string;
  email: string;
  password: string;
  role?: "admin";
  usersList?: ObjectId[];
  theaterList?: ObjectId[];
  movies?: ObjectId[];
  streamingMovies?: ObjectId[];
  status:"active";
}
