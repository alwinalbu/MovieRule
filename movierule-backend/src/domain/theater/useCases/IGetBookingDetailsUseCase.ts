import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";


export interface IGetBookingDetailsUseCase {
  execute(bookingId: string): Promise<IBooking | null>;
}
