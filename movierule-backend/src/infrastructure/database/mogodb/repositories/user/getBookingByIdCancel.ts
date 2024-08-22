import {
  Booking,
  IBooking,
} from "@/infrastructure/database/mogodb/models/BookingSchema";

export const getBookingByIdCancel = async (id: string): Promise<IBooking | null> => {
  try {
    const booking = await Booking.findById(id);
    return booking;
  } catch (error: any) {
    console.error("Error fetching booking:", error);
    throw new Error("Failed to fetch booking by ID.");
  }
};
