import {
  Booking,
  IBooking,
} from "../../../../../infrastructure/database/mogodb/models/BookingSchema";

export const getQRBookingById = async (
  bookingId: string
): Promise<IBooking | null> => {
  try {
    const booking = await Booking.findOne({ _id: bookingId })
      .populate({
        path: "userId",
        select: "username email",
      })
      .populate({
        path: "showId",
        select: "start_time date show_name movieId",
        populate: {
          path: "movie",
          model: "Movie",
          select: "title posterPath backdrop_path language rating",
        },
      })
      .populate({
        path: "theaterId",
        select: "username city",
      })
      .populate({
        path: "screenId",
        select: "name quality",
      })
      .exec();

    return booking;
  } catch (error: any) {
    console.error("Error fetching booking:", error);
    throw new Error("Failed to fetch booking.");
  }
};
