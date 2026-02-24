import { TheaterEntity } from "../../../domain/theater/entities";

export interface IGetTheaterDetailsUseCase {
  execute(theaterId: string): Promise<TheaterEntity | null>;
}
