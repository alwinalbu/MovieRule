import { Schema, model, Types } from "mongoose";

// 🪑 Seat Interface
export interface Seat {
  seatId: string;
  status: "available" | "selected" | "sold";
}

// 🎬 Screen Interface
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
  baseLayout?: (Seat | null)[][];
}

// 🧱 Seat Schema
const seatSchema = new Schema<Seat>({
  seatId: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "selected", "sold"],
    default: "available",
  },
});

// 🏗️ Screen Schema
const screenSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    quality: { type: String, required: true },
    sound: { type: String, required: true },
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },

    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },

    image: { type: String, required: true },

    theaterId: { type: Schema.Types.ObjectId, ref: "Theater", required: true },

    layout: { type: [[seatSchema]], default: undefined },
    baseLayout: { type: [[seatSchema]], default: undefined },
  },
  { timestamps: true }
);

// 🟢 Create default seat layout before saving
screenSchema.pre<IScreen>("save", function (next) {
  if (!this.layout || this.layout.length === 0) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const generatedLayout: (Seat | null)[][] = Array.from(
      { length: this.rows },
      (_, rowIndex) =>
        Array.from({ length: this.cols }, (_, colIndex) => {
          const rowLabel = alphabet[rowIndex % alphabet.length];
          const seatNumber = colIndex + 1;
          const seatId = `${rowLabel}${seatNumber}`;
          return { seatId, status: "available" } as Seat;
        })
    );

    this.layout = generatedLayout;
    this.baseLayout = generatedLayout;
  }
  next();
});

// 🧠  To Ensure each screen name is unique per theater
screenSchema.index({ theaterId: 1, name: 1 }, { unique: true });


export const Screen = model<IScreen>("Screen", screenSchema);





