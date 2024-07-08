import { ICreateTheaterUseCase, ILoginTheaterUseCase ,ICheckTheaterEmailUseCase,IVerifyTheaterOtpUseCase, IFindTheaterByIdUseCase, IFindTheaterByEmailUseCase, IUpdateTheaterPasswordUseCase} from "@/domain/theater/useCases";
import { ITheaterDependencies } from "./ITheaterDependencies";



export interface ITheaterUseCases {
  createTheaterUseCase: (dependencies: ITheaterDependencies) =>ICreateTheaterUseCase;
  checkTheaterEmailUseCase:(dependecies:ITheaterDependencies)=> ICheckTheaterEmailUseCase;
  verifyTheaterOtpUseCase: (dependencies: ITheaterDependencies) =>IVerifyTheaterOtpUseCase ;
  loginTheaterUseCase: (dependencies: ITheaterDependencies) => ILoginTheaterUseCase;
  findTheaterByIdUseCase:(dependencies: ITheaterDependencies) => IFindTheaterByIdUseCase;
  findTheaterByEmailUseCase:(dependencies:ITheaterDependencies)=>IFindTheaterByEmailUseCase;
  updateTheaterPasswordUseCase: (dependencies: any) =>IUpdateTheaterPasswordUseCase;
}

