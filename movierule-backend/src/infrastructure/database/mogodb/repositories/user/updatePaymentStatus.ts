import { Booking, IBooking } from "../../models/BookingSchema";

   export const updatePaymentStatus=async (sessionId: string,paymentStatus: string): Promise<IBooking | null> => {
    try {
      const booking = await Booking.findOneAndUpdate(
        { sessionId },
        { paymentStatus },
        { new: true }
      );
      return booking;
    } catch (error:any) {
      console.error("Error updating payment status:", error);
      throw new Error("Failed to update payment status.");
    }
  }

