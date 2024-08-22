//  import { ObjectId } from "mongoose";
 
//  export interface UserEntity {
//    _id?: ObjectId;
//    username?: string;
//    email: string;
//    password: string;
//    role?: "user";
//    otp?: string;
//    status?: string;
//    createdAt?: Date;
//    updatedAt?: Date;
//    profilePicture?:string;
//    city?:string;
//  }
export interface SubscriptionData {
  status: "initiated" | "active" | "inactive"; // Constrain to specific values
  sessionId: string;
  amount: number;
  paymentStatus: "pending" | "completed" | "failed"; // Constrain to specific values
};


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
  profilePicture?: string;
  city?: string;
  favoriteGenres?: string[];
  watchlist?: ObjectId[];
  watchedMovies?: ObjectId[];
  chatHistory?: ObjectId[];
  isSubscribed?: SubscriptionData;
}

