import { TheaterEntity } from "@/domain/theater/entities";
import { Schema, model } from "mongoose";

const theaterSchema = new Schema(
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
      enum: ["theatre"],
      default: "theatre",
    },
    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    theaterName: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Theater = model<TheaterEntity>("Theater", theaterSchema);
