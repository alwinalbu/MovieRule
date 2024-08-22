import { Booking, IBooking } from "../../models/BookingSchema";
import { ObjectId } from "mongoose";
import { Movie } from "../../models/movieSchema";

export const getAllBookingsBestMovie = async (): Promise<any[]> => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "showId",
        select: "movie",
      })
      .exec();

    if (!bookings.length) {
      throw new Error(`No bookings found`);
    }

    const movieBookingCounts: { [key: string]: number } = {};

    bookings.forEach((booking) => {
      const show = booking.showId;

      // Type guard to check if `showId` is an object and has the `movie` field
      if (typeof show === "object" && "movie" in show) {
        const movieId = (show.movie as ObjectId).toString();

        if (!movieBookingCounts[movieId]) {
          movieBookingCounts[movieId] = 0;
        }
        movieBookingCounts[movieId] += 1;
      }
    });

    const movieIds = Object.keys(movieBookingCounts);
    const movies = await Movie.find({ _id: { $in: movieIds } })
      .select("title posterPath backdrop_path language rating")
      .exec();

    const movieBookings = movies.map((movie) => ({
      title: movie.title,
      posterPath: movie.posterPath,
      backdropPath: movie.backdrop_path,
      rating: movie.rating,
      totalBookings: movieBookingCounts[movie._id.toString()] || 0,
    }));

    movieBookings.sort((a, b) => b.totalBookings - a.totalBookings);

    return movieBookings;
  } catch (error: any) {
    throw new Error(`Failed to Fetch Bookings: ${error.message}`);
  }
};
