import { TheaterEntity } from "@/domain/theater/entities";

export interface IAdminHandleAcceptTheaterUseCase {
  execute(id: string, status: string): Promise<TheaterEntity | null>;
}
