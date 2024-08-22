
import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";
import { IDependencies } from "../interfaces/IDependencies";

export const getQRBookingByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getQRBookingById },
  } = dependencies;

  return {
    execute: async (bookingId: string): Promise<IBooking | null> => {
      try {
        return await getQRBookingById(bookingId);
      } catch (error: any) {
        throw new Error(error.message || "Fetching booking failed");
      }
    },
  };
};
