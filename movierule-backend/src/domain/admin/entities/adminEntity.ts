import { ObjectId } from "mongoose";

export interface AdminEntity {
  _id?: ObjectId;
  username?: string;
  email: string;
  password: string;
  role?:'admin',
  usersList?: string[];
  theaterList?: string[];
  movies?: string[];
  streamingMovies?: string[];
}
