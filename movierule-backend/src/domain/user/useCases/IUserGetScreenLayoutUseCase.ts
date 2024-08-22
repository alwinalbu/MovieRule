import { IScreen } from "@/infrastructure/database/mogodb/models/screenSchema";

export interface IUserGetScreenLayoutUseCase {
  execute: (screenId: string) => Promise<IScreen | null>;
}
