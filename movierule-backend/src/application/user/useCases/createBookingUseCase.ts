import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";
import { IDependencies } from "../interfaces/IDependencies";


export const createBookingUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createBooking },
  } = dependencies;

  return {
    execute: async (data: IBooking): Promise<IBooking |null> => {
      try {
        return await createBooking(data);
      } catch (error: any) {
        throw new Error(error.message || "Booking creation failed");
      }
    },
  };
};
