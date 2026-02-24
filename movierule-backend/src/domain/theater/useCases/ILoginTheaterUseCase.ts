import { TheaterEntity } from "../entities";


export interface ILoginTheaterUseCase {
  execute(email: string, password: string): Promise<TheaterEntity | null>;
}
