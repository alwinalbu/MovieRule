
import { IBooking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllBookingsUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getAllBookings },
  } = dependencies;

  return {
    execute: async (userId: string): Promise<IBooking[]> => {
      try {
        console.log(userId,"user id inside usecase");
        
        return await getAllBookings(userId);
      } catch (error: any) {
        throw new Error(error.message || "Fetching bookings failed");
      }
    },
  };
};
