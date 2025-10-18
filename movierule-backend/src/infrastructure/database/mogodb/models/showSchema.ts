import { Schema, model, Types } from "mongoose";


export interface IShow {
  theater_id: Types.ObjectId | string;
  movie: Types.ObjectId | string;
  screen: Types.ObjectId | string;
  show_name: string;
  date: Date;
  start_time: string;
  end_time: string;
}

const showSchema = new Schema<IShow>({
  theater_id: {
    type: Schema.Types.ObjectId,
    ref: "Theater",
    required: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  screen: {
    type: Schema.Types.ObjectId,
    ref: "Screen",
    required: true,
  },
  show_name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
});

export const Show = model<IShow>("Show", showSchema);
