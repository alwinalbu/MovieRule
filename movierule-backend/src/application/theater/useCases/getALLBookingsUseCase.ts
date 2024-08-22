import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const getALLBookingsUseCase = (dependencies: ITheaterDependencies) => {
  const {
    repositories: {getAllBookingsBestMovie},
  } = dependencies;

  return {
    execute: async (): Promise<IBooking[]> => {
      try {
        return await getAllBookingsBestMovie();
      } catch (error: any) {
        throw new Error(error.message || "Fetching bookings failed");
      }
    },
  };
};
