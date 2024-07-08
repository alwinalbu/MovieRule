import { ILoginAdminUseCase } from "@/domain/admin/useCases/ILoginAdminUseCase";
import { IAdminDependencies } from "./IAdminDependencies";

export interface IAdminUseCases {
  loginAdminUseCase:(dependencies: IAdminDependencies)=>ILoginAdminUseCase;
  
}