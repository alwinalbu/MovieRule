
import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";
import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";


export const getBookingsByTheaterIdUseCase = (dependencies:ITheaterDependencies ) => {
  const {
    repositories: { getAllBookingsByID }, 
  } = dependencies;

  return {
    execute: async (theaterId: string): Promise<IBooking[]> => {
      try {
        return await getAllBookingsByID(theaterId); 
      } catch (error: any) {
        throw new Error(error.message || "Fetching bookings failed");
      }
    },
  };
};
