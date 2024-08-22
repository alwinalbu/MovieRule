import { ICreateTheaterUseCase, ILoginTheaterUseCase ,ICheckTheaterEmailUseCase,IVerifyTheaterOtpUseCase, IFindTheaterByIdUseCase, IFindTheaterByEmailUseCase, IUpdateTheaterPasswordUseCase, ITheaterGetAllMoviesUseCase, IAddShowTheaterUseCase, ITheaterGetAllShowsUseCase, IAddScreenTheaterUseCase, ITheaterGetAllScreensUseCase, IUpdateScreenTheaterUseCase, IGetScreenLayoutUseCase, ITheaterUpdateScreenLayoutUseCase, IFetchSnacksUseCase, IGetBookingsByTheaterIdUseCase, IGetBookingDetailsUseCase, IGetALLBookingsUseCase} from "@/domain/theater/useCases";
import { ITheaterDependencies } from "./ITheaterDependencies";
import { IAddSnackTheaterUseCase } from "@/domain/theater/useCases/IAddSnackTheaterUseCase";
import { IGetAllBookingsUseCase } from "@/domain/user/useCases";



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
  AddSnackTheaterUseCase:(dependencies: ITheaterDependencies)=>IAddSnackTheaterUseCase;
  FetchSnacksUseCase:(dependencies: ITheaterDependencies)=>IFetchSnacksUseCase;
  getBookingsByTheaterIdUseCase:(dependencies: ITheaterDependencies)=>IGetBookingsByTheaterIdUseCase;
  getBookingDetailsUseCase:(dependencies: ITheaterDependencies)=>IGetBookingDetailsUseCase;
  getALLBookingsUseCase:(dependencies: ITheaterDependencies)=>IGetALLBookingsUseCase;
}

