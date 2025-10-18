
import { IScreen } from "../../../infrastructure/database/mogodb/models/screenSchema";

export interface IGetScreenLayoutUseCase {
  execute: (screenId: string) => Promise<IScreen | null>;
}
