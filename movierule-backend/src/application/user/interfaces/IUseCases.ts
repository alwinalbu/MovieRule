import { ICreateUserUseCase, ICheckUserEmailUseCase,IVerifyOtpUseCase, IFindUserByIdUseCase, IUpdateUserPasswordUseCase, IUserGetMoviesUseCase, IGetAllShowUseCase, IGetShowsByMovieUseCase } from "@/domain/user/useCases";
import { IDependencies } from "./IDependencies";
import { ILoginUserUseCase } from "@/domain/user/useCases/ILoginUserUseCase";
import { IFindUserByEmailUseCase } from "@/domain/user/useCases/IFindUserByEmailUseCase";

export interface IUseCases {
  createUserUseCase: (dependencies: IDependencies) => ICreateUserUseCase;
  checkUserEmailUseCase: (dependecies: IDependencies) => ICheckUserEmailUseCase;
  verifyOtpUseCase: (dependencies: IDependencies) => IVerifyOtpUseCase;
  loginUserUseCase: (dependencies: any) => ILoginUserUseCase;
  findUserByEmailUseCase: (dependencies: any) => IFindUserByEmailUseCase;
  findUserByIdUseCase: (dependencies: any) => IFindUserByIdUseCase;
  updateUserPasswordUseCase: (dependencies: any) => IUpdateUserPasswordUseCase;
  userGetMoviesUseCase: (dependencies: IDependencies) => IUserGetMoviesUseCase;
  getAllShowsUseCase: (dependencies: IDependencies) => IGetAllShowUseCase;
  getShowsByMovieUseCase:(dependencies: IDependencies) =>IGetShowsByMovieUseCase;
}
