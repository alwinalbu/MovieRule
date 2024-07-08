import { AdminEntity } from "@/domain/admin/entities/adminEntity";
import { Schema, model } from "mongoose";

const adminSchema = new Schema<AdminEntity>(
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
      enum: ["admin"],
      default: "admin",
    },
    usersList: [{ type: Schema.Types.ObjectId, ref: "User" }],
    theaterList: [{ type: Schema.Types.ObjectId, ref: "Theater" }],
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    streamingMovies: [{ type: Schema.Types.ObjectId, ref: "StreamingMovie" }],
  },
  {
    timestamps: true,
  }
);

// Create and export Admin model
export const Admin = model<AdminEntity>("Admin", adminSchema);
