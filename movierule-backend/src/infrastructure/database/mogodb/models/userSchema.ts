import { UserEntity } from "../../../../domain/user/entities/userEntity";
import { Schema, model } from "mongoose";

// ✅ Add this interface and export it
export interface IUserWalletDetails {
  walletBalance: number;
  refunds: {
    refundAmount: number;
    refundDate: Date;
    movieTitle: string;
    theaterName: string;
    screenName: string;
    showDate: Date;
    showTime: string;
    selectedSeats: string[];
  }[];
}

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user"], default: "user" },
    status: { type: String, default: "active" },
    isSubscribed: {
      status: {
        type: String,
        enum: ["initiated", "active", "inactive"],
        default: "inactive",
      },
      sessionId: { type: String, default: "" },
      amount: { type: Number, default: 0 },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
    },
    profilePicture: { type: String, default: "" },
    city: { type: String },
    favoriteGenres: [{ type: String }],
    watchlist: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    watchedMovies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    chatHistory: [{ type: Schema.Types.ObjectId, ref: "Chat" }],

    walletBalance: { type: Number, default: 0 },

    refunds: [
      {
        refundAmount: { type: Number, required: true },
        refundDate: { type: Date, default: Date.now },
        movieTitle: { type: String, required: true },
        theaterName: { type: String, required: true },
        screenName: { type: String, required: true },
        showDate: { type: Date, required: true },
        showTime: { type: String, required: true },
        selectedSeats: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true }
);

export const User = model<UserEntity>("users", userSchema);


