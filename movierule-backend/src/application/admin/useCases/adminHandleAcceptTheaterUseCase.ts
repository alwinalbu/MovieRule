import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const adminHandleAcceptTheaterUseCase=(dependencies:IAdminDependencies)=>{
    const {repositories:{updateTheaterStatus}}=dependencies

    return {
        execute:async (id:string,string:string)=>{
            try {

              const updatedTheater=await updateTheaterStatus (id,string);
              console.log(updatedTheater,"after updating the theater in backend");  
                return updatedTheater;
            } catch (error:any) {
                 console.error("Failed to handle block/unblock:", error);
                throw new Error("Failed to handle block/unblock");
            }
        }
    }
}