import { ILoginAdminUseCase } from "@/domain/admin/useCases/ILoginAdminUseCase";
import { IAdminDependencies } from "./IAdminDependencies";
import { IAdminAddOTTMovieUseCase, IAdminAddTheaterMovieUseCase, IAdminHandleAcceptTheaterUseCase, IAdminHandleBlockUnblockUser, IGetAllOTTMoviesUseCase, IGetAllTheaterMoviesUseCase, IGetAllTheatersAdmin, IGetAllUsersAdmin } from "@/domain/admin/useCases";

export interface IAdminUseCases {
  loginAdminUseCase: (dependencies: IAdminDependencies) => ILoginAdminUseCase;
  getAllTheatersAdminUseCase: (dependencies: any) => IGetAllTheatersAdmin;
  getAllUsersAdminUseCase: (dependencies: IAdminDependencies) => IGetAllUsersAdmin;
  adminHandleBlockUnblockUserUseCase: (dependencies: IAdminDependencies) => IAdminHandleBlockUnblockUser;
  adminHandleAcceptTheaterUseCase:(dependencies:IAdminDependencies)=>IAdminHandleAcceptTheaterUseCase;
  adminAddTheaterMovieUseCase:(dependencies:IAdminDependencies)=>IAdminAddTheaterMovieUseCase;
  getAllTheaterMoviesUseCase:(dependencies:IAdminDependencies)=>IGetAllTheaterMoviesUseCase;
  adminAddOTTMovieUseCase:(dependencies:IAdminDependencies)=>IAdminAddOTTMovieUseCase;
  getAllOTTMoviesUseCase:(dependencies:IAdminDependencies)=>IGetAllOTTMoviesUseCase;
}