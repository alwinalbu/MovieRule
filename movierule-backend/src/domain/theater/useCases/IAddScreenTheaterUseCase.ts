import { IScreen } from "../../../infrastructure/database/mogodb/models/screenSchema";


export interface IAddScreenTheaterUseCase {
  execute: (data: IScreen) => Promise<IScreen | null>;
}
