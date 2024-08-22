import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";

export interface IGetALLBookingsUseCase {
  execute(): Promise<IBooking[]>;
}
