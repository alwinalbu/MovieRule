import { IScreen } from "../../../infrastructure/database/mogodb/models/screenSchema";

export interface IUpdateScreenTheaterUseCase {
  execute: (data: IScreen) => Promise<IScreen | null>;
}
