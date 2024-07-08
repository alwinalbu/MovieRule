import { UserEntity } from "../entities";


export interface IFindUserByIdUseCase {
  execute(id: string): Promise<any | null>;
}
