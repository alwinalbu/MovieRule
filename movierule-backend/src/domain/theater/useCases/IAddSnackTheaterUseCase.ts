import { ISnack } from "../../../infrastructure/database/mogodb/models/snackSchema";

export interface IAddSnackTheaterUseCase {
  execute: (data: ISnack) => Promise<ISnack | null>;
}
