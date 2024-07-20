
import { IScreen } from "@/infrastructure/database/mogodb/models/screenSchema";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const theaterUpdateScreenLayoutUseCase=(dependencies:ITheaterDependencies)=>{
    const {repositories:{updateTheaterScreenLayout}}=dependencies


     return {
       execute: async (screenId: string,layout:number[][]): Promise<IScreen | null> => {
         try {

           return await updateTheaterScreenLayout(screenId,layout);
           
         } catch (error: any) {
           throw new Error(error.message || "Fetching screen layout failed");
         }
       },
     };
}
