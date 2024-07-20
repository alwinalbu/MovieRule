import { IShow } from "@/infrastructure/database/mogodb/models/showSchema";

export interface IGetAllShowUseCase {
    execute():Promise<boolean|IShow[]>;
}