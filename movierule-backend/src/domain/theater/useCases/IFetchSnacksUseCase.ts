import { ISnack } from "@/infrastructure/database/mogodb/models/snackSchema";

export interface IFetchSnacksUseCase {
  execute: (theaterId: string) => Promise<ISnack[]>;
}
