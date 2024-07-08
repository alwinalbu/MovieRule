import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";


export const verifyTheaterOtpUseCase=(dependecies:ITheaterDependencies)=>{
const {repositories:{theaterVerifyOtpRepo}}=dependecies;

return {
    execute:async (email:string,otp:string[])=>{
        try {
            return await theaterVerifyOtpRepo(email,otp);
        } catch (error:any) {
            throw new Error(error?.message);
        }
    }
}
}