import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";


export const getAllTheaterMoviesAdminController=(dependencies:IAdminDependencies)=>{
    const {useCases:{getAllTheaterMoviesUseCase}}=dependencies


    return async (req:Request,res:Response,next:NextFunction)=>{

        try {

            const Movies=await getAllTheaterMoviesUseCase(dependencies).execute();

            if(!Movies){
               throw new Error("Movies Not Available");   
            }

            res.status(200).json({
              success: true,
              data: Movies,
              message: "getAllTheatersMovies!",
            });
            
        } catch (error:any) {
          
            res.status(401).json({
              success: false,
              message: (error as Error)?.message,
            });   
        }
    }
}