import { IBooking } from "../../../infrastructure/database/mogodb/models/BookingSchema";

export interface IGetAllBookingsUseCase {
  execute(userId: string): Promise<IBooking[]>;
}
