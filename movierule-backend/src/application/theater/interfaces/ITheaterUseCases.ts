import { ICreateTheaterUseCase, ILoginTheaterUseCase ,ICheckTheaterEmailUseCase,IVerifyTheaterOtpUseCase, IFindTheaterByIdUseCase, IFindTheaterByEmailUseCase, IUpdateTheaterPasswordUseCase, ITheaterGetAllMoviesUseCase, IAddShowTheaterUseCase, ITheaterGetAllShowsUseCase, IAddScreenTheaterUseCase, ITheaterGetAllScreensUseCase, IUpdateScreenTheaterUseCase, IGetScreenLayoutUseCase, ITheaterUpdateScreenLayoutUseCase} from "@/domain/theater/useCases";
import { ITheaterDependencies } from "./ITheaterDependencies";



export interface ITheaterUseCases {
  createTheaterUseCase: (dependencies: ITheaterDependencies) =>ICreateTheaterUseCase;
  checkTheaterEmailUseCase:(dependecies:ITheaterDependencies)=> ICheckTheaterEmailUseCase;
  verifyTheaterOtpUseCase: (dependencies: ITheaterDependencies) =>IVerifyTheaterOtpUseCase ;
  loginTheaterUseCase: (dependencies: ITheaterDependencies) => ILoginTheaterUseCase;
  findTheaterByIdUseCase:(dependencies: ITheaterDependencies) => IFindTheaterByIdUseCase;
  findTheaterByEmailUseCase:(dependencies:ITheaterDependencies)=>IFindTheaterByEmailUseCase;
  updateTheaterPasswordUseCase: (dependencies: any) =>IUpdateTheaterPasswordUseCase;
  theaterGetAllMoviesUseCase:(dependencies: ITheaterDependencies)=>ITheaterGetAllMoviesUseCase;
  AddShowTheaterUseCase:(dependencies: ITheaterDependencies)=>IAddShowTheaterUseCase;
  theaterGetAllShowsUseCase:(dependencies: ITheaterDependencies)=>ITheaterGetAllShowsUseCase;
  AddScreenTheaterUseCase:(dependencies: ITheaterDependencies)=>IAddScreenTheaterUseCase;
  theaterGetAllScreensUseCase:(dependencies: ITheaterDependencies)=>ITheaterGetAllScreensUseCase;
  updateScreenTheaterUseCase: (dependencies: ITheaterDependencies) =>IUpdateScreenTheaterUseCase;
  getScreenLayoutUseCase:(dependencies: ITheaterDependencies)=>IGetScreenLayoutUseCase;
  theaterUpdateScreenLayoutUseCase:(dependencies: ITheaterDependencies)=>ITheaterUpdateScreenLayoutUseCase;
}

