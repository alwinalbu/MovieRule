import { SubscriptionData, UserEntity } from "@/domain/user/entities";
import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";
import { IMovie } from "@/infrastructure/database/mogodb/models/movieSchema";
import { IScreen } from "@/infrastructure/database/mogodb/models/screenSchema";
import { IShow } from "@/infrastructure/database/mogodb/models/showSchema";

export interface IRepositories {
  create: (data: UserEntity) => Promise<UserEntity | null>;
  checkEmail: (email: string) => Promise<boolean>;
  verifyOtpRepo: (email: string, otp: string[]) => Promise<boolean>;
  findByEmail: (email: string) => Promise<UserEntity | null>;
  findById: (id: string) => Promise<UserEntity | null>;
  updateUserPassword: (data: {email: string, password: string}) => Promise<UserEntity | null>;
   userGetMovies:()=>Promise<boolean | IMovie[]>;
   getAllShows:()=>Promise<boolean|IShow[]>;
   getShowsByMovie:(movie_id:string)=>Promise<boolean| IShow[]>
   userGetScreenById:(id: string)=>Promise<IScreen | null>;
   findByRole:(id:string,role:string)=>Promise<any|null>;
   createBooking:(data:IBooking)=>Promise<IBooking|null>;
   updatePaymentStatus:(sessionId: string,paymentStatus: string)=>Promise<IBooking | null>;
  //  getBookingBySessionId:(sessionId: string)=>Promise<IBooking | null>;
   getQRBookingById:(bookingId: string)=>Promise<IBooking | null>;
   getAllBookings:(userId: string)=>Promise<IBooking[]> 
   userUpdateSeatStatus:(screenId: string,selectedSeats: string[])=> Promise<boolean>;
   userGetOTTMovies:()=> Promise<boolean | IMovie[]>;
   getBookingByIdCancel:(id: string)=>Promise<IBooking | null>;
   createUserSubscription:(userId: string,subscriptionData:SubscriptionData)=> Promise<UserEntity | null>;
   updateUserSubscription:(userId: string,subscriptionData: Partial<any> )=>Promise<UserEntity | null>
}
