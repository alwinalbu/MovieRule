
import { Booking, IBooking } from "../../models/BookingSchema";

export const getAllBookings = async (userId: string): Promise<IBooking[]> => {

  try {
    const bookings = await Booking.find({ userId })
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

    if (!bookings || bookings.length === 0) {
      console.log("No bookings found for the given user.");
      throw new Error("No bookings found for the given user.");
    }

    
    return bookings;
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    throw new Error(error.message || "Failed to fetch bookings.");
  }
};

