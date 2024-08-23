
import { Schema, model } from "mongoose";


export interface IMovie {
  id?: number;
  title: string;
  overview: string;
  releaseDate?: string;
  rating?: number;
  posterPath?: string;
  backdrop_path?: string;
  trailerKey?: string;
  type: "Theater" | "OTT";
  runtime?: number;
  original_language?: string;
  streamingURL?: string; 
}

const movieSchema = new Schema<IMovie>({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
  },
  rating: {
    type: Number,
  },
  posterPath: {
    type: String,
  },
  backdrop_path: {
    type: String,
  },
  trailerKey: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Theater", "OTT"],
    required: true,
  },
  runtime: {
    type: Number,
  },
  original_language: {
    type: String,
  },
  streamingURL: {
    type: String,
  },
});

export const Movie = model<IMovie>("Movie", movieSchema);

