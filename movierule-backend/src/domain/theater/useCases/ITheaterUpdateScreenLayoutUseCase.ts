import { IScreen } from "@/infrastructure/database/mogodb/models/screenSchema";


export interface ITheaterUpdateScreenLayoutUseCase {

 execute(screenId: string,layout: number[][]): Promise<IScreen | null>;
 
}
