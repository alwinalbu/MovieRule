// import { ObjectId } from "mongoose";

// export interface AdminEntity {
//   _id?: ObjectId;
//   username?: string;
//   email: string;
//   password: string;
//   role?:'admin',
//   usersList?: string[];
//   theaterList?: string[];
//   movies?: string[];
//   streamingMovies?: string[];
// }


import { ObjectId } from "mongoose";

export interface AdminEntity {
  _id?: ObjectId;
  username?: string;
  email: string;
  password: string;
  role?: "admin";
  usersList?: ObjectId[]; // Array of ObjectId references to user documents
  theaterList?: ObjectId[]; // Array of ObjectId references to theater documents
  movies?: ObjectId[]; // Array of ObjectId references to movie documents
  streamingMovies?: ObjectId[]; // Array of ObjectId references to streaming movie documents
}
