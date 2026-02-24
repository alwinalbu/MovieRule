import { TheaterEntity } from "../entities";


export interface ICreateTheaterUseCase {
  execute(data: TheaterEntity): Promise<TheaterEntity | null>;
}
