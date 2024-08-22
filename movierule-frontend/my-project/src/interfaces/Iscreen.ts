
import { ISeat } from "./ISeat";

export interface IScreen {
  _id?: any;
  name: string;
  quality: string;
  sound: string;
  rows: number;
  cols: number;
  price: number;
  image: string;
  theaterId: string;
  layout?: (ISeat | null)[][];
}
