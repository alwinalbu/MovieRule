import { Booking, IBooking } from "../../models/BookingSchema";
import { IUserWalletDetails, User } from "../../models/userSchema";

// Interface for formatted refunds
interface IFormattedRefund {
  refundAmount: number;
  refundDate: Date;
  movieTitle: string;
  theaterName: string;
  screenName: string;
  showDate: Date;
  showTime: string;
  selectedSeats: string[];
}

export const userWalletDetails = async (
  userId: string
): Promise<IUserWalletDetails> => {
  // Fetch user details to get wallet balance
  const user = await User.findById(userId).select("walletBalance");

  if (!user) {
    throw new Error("User not found");
  }

  // Fetch refunds with associated movie, theater, and screen details
  const refunds: IBooking[] = await Booking.find({
    userId,
    paymentStatus: "refunded",
  })
    .populate({
      path: "showId",
      populate: [
        { path: "movie", select: "title" },
        { path: "theater_id", select: "username" },
        { path: "screen", select: "name" },
      ],
    })
    .select("refundAmount refundDate showId selectedSeats")
    .exec();

  // Format the refund details
  const formattedRefunds: IFormattedRefund[] =
    refunds.length > 0
      ? refunds.map((refund) => {
          const show = refund.showId as any;
          const theater = show?.theater_id as any;
          const screen = show?.screen as any;
          const movie = show?.movie as any;

          return {
            refundAmount: refund.refundAmount ?? 0,
            refundDate: refund.refundDate ?? new Date(0),
            movieTitle: movie?.title ?? "Unknown",
            theaterName: theater?.username ?? "Unknown",
            screenName: screen?.name ?? "Unknown",
            showDate: show?.date ?? new Date(0),
            showTime: show?.start_time ?? "00:00",
            selectedSeats: refund.selectedSeats ?? [],
          };
        })
      : [];

  return {
    walletBalance: user.walletBalance ?? 0,
    refunds: formattedRefunds,
  };
};
