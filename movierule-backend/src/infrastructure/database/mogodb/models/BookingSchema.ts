// import mongoose, { Schema,model } from "mongoose";

// export interface IBooking {
//   sessionId: string;
//   userId?: mongoose.Types.ObjectId|string;
//   showId: mongoose.Types.ObjectId |string;
//   theaterId: mongoose.Types.ObjectId|string;
//   screenId: mongoose.Types.ObjectId|string;
//   selectedSeats: string[];
//   selectedItems?: {
//     name: string;
//     price: number;
//     quantity: number;
//     image: string;
//   }[];
//   deliveryOptions?: string[];
//   totalAmount: number;
//   paymentStatus: string;
// }




// const BookingSchema = new Schema<IBooking>({
//   sessionId: { type: String, required: true },
//   userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
//   showId: { type: Schema.Types.ObjectId, ref: "Show", required: true },
//   theaterId: { type: Schema.Types.ObjectId, ref: "Theater", required: true },
//   screenId: { type: Schema.Types.ObjectId, ref: "Screen", required: true },
//   selectedSeats: { type: [String], required: true },
//   selectedItems: [
//     {
//       name: { type: String, required: true },
//       price: { type: Number, required: true },
//       quantity: { type: Number, required: true },
//       image: { type: String, required: true },
//     },
//   ],
//   deliveryOptions: { type: [String] },
//   totalAmount: { type: Number, required: true },
//   paymentStatus: {
//     type: String,
//     enum: ["pending", "paid", "failed", "refunded"],
//     default: "pending",
//   },
// });

// export const Booking=model<IBooking>("Booking", BookingSchema);

import mongoose, { Schema, model } from "mongoose";

export interface IBooking {
  sessionId: string;
  userId?: mongoose.Types.ObjectId | string;
  showId: mongoose.Types.ObjectId | string;
  theaterId: mongoose.Types.ObjectId | string;
  screenId: mongoose.Types.ObjectId | string;
  selectedSeats: string[];
  selectedItems?: {
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  deliveryOptions?: string[];
  totalAmount: number;
  paymentStatus: string;
}

const BookingSchema = new Schema<IBooking>(
  {
    sessionId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    showId: { type: Schema.Types.ObjectId, ref: "Show", required: true },
    theaterId: { type: Schema.Types.ObjectId, ref: "Theater", required: true },
    screenId: { type: Schema.Types.ObjectId, ref: "Screen", required: true },
    selectedSeats: { type: [String], required: true },
    selectedItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    deliveryOptions: { type: [String] },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Booking = model<IBooking>("Booking", BookingSchema);

