export interface ISnack {
  _id?: string;
  name: string;
  price: number;
  image: string;
  theater_id: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { Schema, model, Types, Document } from "mongoose";

const snackSchema = new Schema<ISnack & Document>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    theater_id: {
      type: Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SnackModel = model<ISnack & Document>("Snack", snackSchema);
