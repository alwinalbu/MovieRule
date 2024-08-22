// import { TheaterEntity } from "@/domain/theater/entities";
// import { Schema, model, Types } from "mongoose";

// const theaterSchema = new Schema(
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
//       enum: ["theatre"],
//       default: "theatre",
//     },
//     status: {
//       type: String,
//       enum: ["pending", "active", "blocked", "rejected"],
//       default: "pending",
//     },
//     profilePicture: {
//       type: String,
//       default: "",
//     },
//     aadhaarCard: {
//       type: String,
//       default: "",
//     },
//     licenseDocument: {
//       type: String,
//       default: "",
//     },
//     OwnerName: {
//       type: String,
//     },
//     address: {
//       type: String,
//     },
//     city: {
//       type: String,
//     },
//     state: {
//       type: String,
//     },
//     zipCode: {
//       type: String,
//     },
//     phone: {
//       type: String,
//     },
//     comments: {
//       type: String,
//     },
//     rating: {
//       type: String,
//     },
//     screen: [
//       {
//         type: Types.ObjectId,
//         ref: "Screen",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Theater = model<TheaterEntity>("Theater", theaterSchema);


import { TheaterEntity } from "@/domain/theater/entities";
import { Schema, model, Types } from "mongoose";

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
      enum: ["pending", "active", "blocked", "rejected"],
      default: "pending",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    aadhaarCard: {
      type: String,
      default: "",
    },
    licenseDocument: {
      type: String,
      default: "",
    },
    OwnerName: {
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
    comments: {
      type: String,
    },
    rating: {
      type: String,
    },
    screen: [
      {
        type: Types.ObjectId,
        ref: "Screen",
      },
    ],
    snacks: [
      {
        type: Types.ObjectId,
        ref: "Snack",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Theater = model<TheaterEntity>("Theater", theaterSchema);

