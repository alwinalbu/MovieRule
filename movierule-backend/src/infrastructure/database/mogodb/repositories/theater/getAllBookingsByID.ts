import { Booking, IBooking } from "../../models/BookingSchema";

export const getAllBookingsByID = async (
  theaterId: string
): Promise<IBooking[]> => {
  try {
    const bookings = await Booking.find({ theaterId })
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

    if (!bookings.length) {
      throw new Error(`No bookings found for theater with ID: ${theaterId}`);
    }

    return bookings;
  } catch (error: any) {
    console.error(
      `Error Fetching Bookings for theater ID ${theaterId}:`,
      error
    );
    throw new Error(`Failed to Fetch Bookings: ${error.message}`);
  }
};
