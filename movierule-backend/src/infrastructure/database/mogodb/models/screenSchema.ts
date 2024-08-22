// import { Schema, model, Types } from "mongoose";

// export interface IScreen {
//   _id?: any;
//   name: string;
//   quality: string;
//   sound: string;
//   rows: number;
//   cols: number;
//   price: number;
//   image: string;
//   theaterId: Types.ObjectId | string;
//   layout?: (string | null)[][];
// }

// const screenSchema: Schema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     quality: {
//       type: String,
//       required: true,
//     },
//     sound: {
//       type: String,
//       required: true,
//     },
//     rows: {
//       type: Number,
//       required: true,
//     },
//     cols: {
//       type: Number,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     theaterId: {
//       type: Schema.Types.ObjectId,
//       ref: "Theater",
//       required: true,
//     },
//     layout: {
//       type: [[String]],
//       default: undefined,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// screenSchema.pre<IScreen>("save", function (next) {
//   if (!this.layout || this.layout.length === 0) {
//     const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     this.layout = Array.from({ length: this.rows }, (_, rowIndex) =>
//       Array.from({ length: this.cols }, (_, colIndex) => {
//         const rowLabel = alphabet[rowIndex % alphabet.length];
//         const seatNumber = colIndex + 1;
//         return `${rowLabel}${seatNumber}`;
//       })
//     );
//   }
//   next();
// });


// export const Screen = model<IScreen>("Screen", screenSchema);


import { Schema, model, Types } from "mongoose";

export interface IScreen {
  _id?: any;
  name: string;
  quality: string;
  sound: string;
  rows: number;
  cols: number;
  price: number;
  image: string;
  theaterId: Types.ObjectId | string;
  layout?: (Seat | null)[][];
}

interface Seat {
  seatId: string;
  status: "available" | "selected" | "sold";
}

const seatSchema = new Schema<Seat>({
  seatId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "selected", "sold"],
    default: "available",
  },
});

const screenSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    sound: {
      type: String,
      required: true,
    },
    rows: {
      type: Number,
      required: true,
    },
    cols: {
      type: Number,
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
    theaterId: {
      type: Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    layout: {
      type: [[seatSchema]],
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

screenSchema.pre<IScreen>("save", function (next) {
  if (!this.layout || this.layout.length === 0) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.layout = Array.from({ length: this.rows }, (_, rowIndex) =>
      Array.from({ length: this.cols }, (_, colIndex) => {
        const rowLabel = alphabet[rowIndex % alphabet.length];
        const seatNumber = colIndex + 1;
        const seatId = `${rowLabel}${seatNumber}`;
        return { seatId, status: "available" };
      })
    );
  }
  next();
});

export const Screen = model<IScreen>("Screen", screenSchema);



