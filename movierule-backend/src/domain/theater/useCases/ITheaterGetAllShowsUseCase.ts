import { IShow } from "@/infrastructure/database/mogodb/models/showSchema";


export interface ITheaterGetAllShowsUseCase {
  execute(theaterId:string): Promise<boolean | IShow[]>;
}
