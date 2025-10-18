import { TheaterEntity } from "../../../domain/theater/entities";
import { IBooking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
import { IMovie } from "../../../infrastructure/database/mogodb/models/movieSchema";
import { IScreen } from "../../../infrastructure/database/mogodb/models/screenSchema";
import { IShow } from "../../../infrastructure/database/mogodb/models/showSchema";
import { ISnack } from "../../../infrastructure/database/mogodb/models/snackSchema";



export interface ITheaterRepositories {
  theaterCreate: (data: TheaterEntity) => Promise<TheaterEntity | null>;
  theaterCheckEmail: (email: string) => Promise<boolean>;
  theaterVerifyOtpRepo: (email: string, otp: string[]) => Promise<boolean>;
  theaterFindByEmail: (email: string) => Promise<TheaterEntity | null>;
  theaterFindById: (id: string) => Promise<TheaterEntity | null>;
  updateTheaterPassword: (data: {email: string;password: string;}) => Promise<TheaterEntity | null>;
  theaterGetAllMovies:()=>Promise<boolean | IMovie[]>;
  theaterSaveShow:(data:IShow)=> Promise<IShow | null>
  theaterGetAllShows:(theaterId:string)=>Promise<boolean | IShow[]>;
  theaterSaveScreen:(data: IScreen)=>Promise<IScreen|null>;
  theaterGetAllScreens: (theaterId:string) => Promise<boolean | IScreen[]>;
  updateScreenById: (id: any, updateData: Partial<IScreen>) => Promise<IScreen | null>;
  getScreenById:(id: string)=>Promise<IScreen | null>;
  updateTheaterScreenLayout:(screenId:string,layout:number[][])=>Promise<IScreen|null>;
  theaterSaveSnack:(data: ISnack)=> Promise<ISnack | null>;
  fetchSnacks:(theaterId: string)=>Promise<ISnack[]>
  getAllBookingsByID:(theaterId: string)=>Promise<IBooking[]>
  getBookingById:(bookingId: string)=>Promise<IBooking | null>
  getAllBookingsBestMovie:()=>Promise<any[]>;
}
