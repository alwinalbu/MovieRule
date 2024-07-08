import { Schema, model } from "mongoose";
import { UserEntity } from "@/domain/user/entities";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    status: {
      type: String,
      default: "active",
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    favoriteGenres: [
      {
        type: String,
      },
    ],
    watchlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    watchedMovies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    chatHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = model<UserEntity>("users", userSchema);
