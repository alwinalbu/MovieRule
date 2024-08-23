import { ICreateUserUseCase, ICheckUserEmailUseCase,IVerifyOtpUseCase, IFindUserByIdUseCase, IUpdateUserPasswordUseCase, IUserGetMoviesUseCase, IGetAllShowUseCase, IGetShowsByMovieUseCase, IUserGetScreenLayoutUseCase, IFindMainUserUseCase, ICreateBookingUseCase, IUpdatePaymentStatusUseCase, IGetAllBookingsUseCase, IUserUpdateSeatStatusUseCase, IUserGetOTTMoviesUseCase, IGetBookingByIdUseCase, IGetQRBookingByIdUseCase, ICreateUserSubscriptionUseCase, IUpdateUserSubscriptionUseCase, IGetUserWalletDetailsUseCase } from "@/domain/user/useCases";
import { IDependencies } from "./IDependencies";
import { ILoginUserUseCase } from "../../../domain/user/useCases/ILoginUserUseCase";
import { IFindUserByEmailUseCase } from "../../../domain/user/useCases/IFindUserByEmailUseCase";

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
  userGetScreenLayoutUseCase:(dependencies: IDependencies)=>IUserGetScreenLayoutUseCase;
  findMainUserUseCase:(dependencies: IDependencies)=>IFindMainUserUseCase;
  createBookingUseCase:(dependencies: IDependencies)=>ICreateBookingUseCase;
  updatePaymentStatusUseCase:(dependencies: IDependencies)=>IUpdatePaymentStatusUseCase;
  // getBookingBySessionIdUseCase:(dependencies: IDependencies)=>IGetBookingBySessionIdUseCase;
  getQRBookingByIdUseCase:(dependencies: IDependencies)=>IGetQRBookingByIdUseCase;
  getAllBookingsUseCase:(dependencies: IDependencies)=>IGetAllBookingsUseCase;
  userUpdateSeatStatusUseCase:(dependencies: IDependencies)=>IUserUpdateSeatStatusUseCase;
  userGetOTTMoviesUseCase:(dependencies: IDependencies)=>IUserGetOTTMoviesUseCase;
  getBookingByIdUseCase:(dependencies: IDependencies)=>IGetBookingByIdUseCase;
  createUserSubscriptionUseCase:(dependencies: IDependencies)=>ICreateUserSubscriptionUseCase;
  updateUserSubscriptionUseCase:(dependencies: IDependencies)=>IUpdateUserSubscriptionUseCase;
  getUserWalletDetailsUseCase:(dependencies: IDependencies)=>IGetUserWalletDetailsUseCase;
}
