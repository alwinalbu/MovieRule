import { TheaterEntity } from "../entities";

export interface IUpdateTheaterPasswordUseCase {
    execute(data:{email:string,password:string}):Promise<TheaterEntity|null>;
}