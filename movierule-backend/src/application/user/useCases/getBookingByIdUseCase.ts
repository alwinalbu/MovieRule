import { IBooking } from "@/infrastructure/database/mogodb/models/BookingSchema";
import { IDependencies } from "../interfaces/IDependencies";

export const getBookingByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getBookingByIdCancel },
  } = dependencies;

  return {
    execute: async (id: string): Promise<IBooking | null> => {
      try {
        return await getBookingByIdCancel(id);
      } catch (error: any) {
        throw new Error(error.message || "Fetching booking by ID failed");
      }
    },
  };
};
