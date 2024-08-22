import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";

export interface IGetBookingByIdUseCase {
  execute(id: string): Promise<IBooking | null>;
}
