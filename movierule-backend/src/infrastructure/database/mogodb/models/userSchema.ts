
// import { Schema, model } from "mongoose";
// import { UserEntity } from "../../../../domain/user/entities";

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["user"],
//       default: "user",
//     },
//     status: {
//       type: String,
//       default: "active",
//     },
//     isSubscribed: {
//       status: {
//         type: String,
//         enum: ["initiated", "active", "inactive"],
//         default: "inactive",
//       },
//       sessionId: {
//         type: String,
//         default: "",
//       },
//       amount: {
//         type: Number,
//         default: 0,
//       },
//       paymentStatus: {
//         type: String,
//         enum: ["pending", "paid", "failed"],
//         default: "pending",
//       },
//     },
//     profilePicture: {
//       type: String,
//       default: "",
//     },
//     city: {
//       type: String,
//     },
//     favoriteGenres: [
//       {
//         type: String,
//       },
//     ],
//     watchlist: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Movie",
//       },
//     ],
//     watchedMovies: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Movie",
//       },
//     ],
//     chatHistory: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Chat",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// export const User = model<UserEntity>("users", userSchema);


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



import { Schema, model } from "mongoose";
import { UserEntity } from "../../../../domain/user/entities";

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
      status: {
        type: String,
        enum: ["initiated", "active", "inactive"],
        default: "inactive",
      },
      sessionId: {
        type: String,
        default: "",
      },
      amount: {
        type: Number,
        default: 0,
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
    },
    profilePicture: {
      type: String,
      default: "",
    },
    city: {
      type: String,
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
    walletBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<UserEntity>("users", userSchema);

