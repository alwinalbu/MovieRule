import { IShow } from "../../../infrastructure/database/mogodb/models/showSchema";

export interface IAddShowTheaterUseCase {
    execute:(data:IShow)=>Promise<IShow|null>;
}