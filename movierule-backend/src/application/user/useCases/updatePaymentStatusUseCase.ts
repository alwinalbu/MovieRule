import { IBooking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
import { IDependencies } from "../interfaces/IDependencies";


export const updatePaymentStatusUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { updatePaymentStatus },
  } = dependencies;

  return {
    execute: async (
      sessionId: string,
      paymentStatus: string
    ): Promise<IBooking | null> => {
      try {
        return await updatePaymentStatus(sessionId, paymentStatus);
      } catch (error: any) {
        throw new Error(error.message || "Failed to update payment status");
      }
    },
  };
};
