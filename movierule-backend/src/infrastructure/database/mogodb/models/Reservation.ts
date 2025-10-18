import { Schema, model, Types } from "mongoose";

export interface IReservation {
  _id?: Types.ObjectId;
  showId: Types.ObjectId;
  reservedSeats: string[]; 
}

const reservationSchema = new Schema<IReservation>(
  {
    showId: {
      type: Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },
    reservedSeats: {
      type: [String], 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reservation = model<IReservation>("Reservation",reservationSchema);
