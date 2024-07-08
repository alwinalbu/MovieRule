import { TheaterEntity } from "../entities";

export interface IFindTheaterByEmailUseCase {
  execute(email: string): Promise<TheaterEntity |null>;
}
