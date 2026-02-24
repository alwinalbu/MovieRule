

import { IScreen } from "../../../infrastructure/database/mogodb/models/screenSchema";


export interface ITheaterGetAllScreensUseCase {
  execute(theaterId:string): Promise<boolean | IScreen[]>;
}
