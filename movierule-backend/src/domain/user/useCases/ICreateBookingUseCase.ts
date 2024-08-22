import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";


export interface ICreateBookingUseCase {
  execute(data:IBooking): Promise<IBooking | null>;
}
