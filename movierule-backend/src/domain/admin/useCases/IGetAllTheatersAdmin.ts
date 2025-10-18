import { TheaterEntity } from "../../../domain/theater/entities";


export interface IGetAllTheatersAdmin {
  execute(): Promise<TheaterEntity[] | boolean>;
}
