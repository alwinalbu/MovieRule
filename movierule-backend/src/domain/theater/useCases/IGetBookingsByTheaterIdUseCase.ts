import { IBooking } from "../../../infrastructure/database/mogodb/models/BookingSchema";

export interface IGetBookingsByTheaterIdUseCase {
  execute(theaterId: string): Promise<IBooking[]>;
}
