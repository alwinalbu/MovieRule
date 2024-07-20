import { Schema, model } from "mongoose";

// Define the TypeScript interface for a Movie document
export interface IMovie {
  id?: number;
  title: string;
  overview: string;
  releaseDate?: string;
  rating?: number;
  posterPath?: string;
  backdrop_path?:string;
  trailerKey?: string;
  type: "Theater" | "OTT";
}


const movieSchema = new Schema<IMovie>({
  id:{
    type:Number,
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
  backdrop_path:{
    type:String,
  },
  trailerKey: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Theater", "OTT"],
    required: true, 
  },
});

export const Movie = model<IMovie>("Movie", movieSchema);
