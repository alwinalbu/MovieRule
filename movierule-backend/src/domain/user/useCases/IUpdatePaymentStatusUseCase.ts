import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";


export interface IUpdatePaymentStatusUseCase {
  execute(sessionId: string, paymentStatus: string): Promise<IBooking | null>;
}
