import { IBooking } from "../../..//infrastructure/database/mogodb/models/BookingSchema";

export interface IGetQRBookingByIdUseCase {
  execute(bookingId: string): Promise<IBooking | null>;
}
