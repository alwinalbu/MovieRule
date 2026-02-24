import { ITheaterDependencies } from "../interfaces/ITheaterDependencies";

export const getBookingDetailsUseCase = (dependencies: ITheaterDependencies) => {
  const {
    repositories: { getBookingById },
  } = dependencies;

  return {
    execute: async (bookingId: string) => {
      try {

        const details = await getBookingById(bookingId);

        console.log(details, "after fetching the booking in backend");
        
        return details;
      } catch (error: any) {
        console.error("Failed to fetch booking details:", error);
        throw new Error("Failed to fetch booking details");
      }
    },
  };
};
