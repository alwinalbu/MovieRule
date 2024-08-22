import { Booking, IBooking } from "../../models/BookingSchema";

export const getBookingById = async (
  bookingId: string
): Promise<IBooking | null> => {
  try {
    console.log(bookingId, "bookingid inside backend repo");

    // Fetch the booking details from the database with populated fields
    const bookingDetails = await Booking.findById(bookingId)
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

    if (!bookingDetails) {
      throw new Error("Booking not found");
    }

    // Convert to plain object and return
    return bookingDetails.toObject() as IBooking;
  } catch (error: any) {
    console.error("Failed to get booking details:", error);
    throw new Error("Failed to get booking details");
  }
};
