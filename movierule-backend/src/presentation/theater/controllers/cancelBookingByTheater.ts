import { Request, Response } from "express";
import { Booking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
import { User } from "../../../infrastructure/database/mogodb/models/userSchema";
import { Show } from "../../../infrastructure/database/mogodb/models/showSchema";
import { Theater } from "../../../infrastructure/database/mogodb/models/theaterSchema";
import { Screen } from "../../../infrastructure/database/mogodb/models/screenSchema";
import { Reservation } from "../../../infrastructure/database/mogodb/models/Reservation"; 

export const cancelBookingByTheaterController = async (
  req: Request,
  res: Response
) => {
  try {
    const theaterId = req.user?._id;
    const { bookingId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res
        .status(400)
        .json({ success: false, message: "Reason is required" });
    }

    // 🔹 Step 1: Find booking + populate related show data
    const booking = await Booking.findById(bookingId).populate("showId");
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    // 🔹 Step 2: Ensure the theater owns this booking
    if (String(booking.theaterId) !== String(theaterId)) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    // 🔹 Step 3: Check if the show already happened
    const show = await Show.findById(booking.showId);
    if (!show)
      return res
        .status(404)
        .json({ success: false, message: "Show not found" });

    const now = new Date();
    const showDate = new Date(show.date);
    const [startHour, startMinute] = show.start_time.split(":").map(Number);
    const showStartTime = new Date(showDate);
    showStartTime.setHours(startHour, startMinute, 0, 0);

    if (now >= showStartTime) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel — show already started or completed",
      });
    }

    // 🔹 Step 4: If payment was successful, refund to wallet
    if (booking.paymentStatus === "paid") {
      const user = await User.findById(booking.userId);
      const theater = await Theater.findById(booking.theaterId);
      const screen = await Screen.findById(booking.screenId);

      if (user) {
        user.walletBalance = (user.walletBalance ?? 0) + booking.totalAmount;
        if (!user.refunds) user.refunds = [];

        user.refunds.push({
          refundAmount: booking.totalAmount,
          refundDate: new Date(),
          movieTitle: show.show_name || "Unknown Movie",
          theaterName: theater?.username || "Unknown Theater",
          screenName: screen?.name || "Unknown Screen",
          showDate: show.date,
          showTime: `${show.start_time} - ${show.end_time}`,
          selectedSeats: booking.selectedSeats,
        });

        await user.save();
      }

      booking.paymentStatus = "refunded";
      booking.refundAmount = booking.totalAmount;
      booking.refundDate = new Date();
      booking.refundId = `wallet_refund_${Date.now()}`;
    } else {
      booking.paymentStatus = "failed";
    }

    // 🔹 Step 5: Mark booking cancelled
    (booking as any).status = "cancelled";
    (booking as any).cancelledBy = "theater";
    (booking as any).cancelReason = reason;

    await booking.save();

    // 🔹 🆕 Step 6: Release seats from Reservation
    const reservations = await Reservation.find({ showId: booking.showId });

    console.log(reservations,"reservations of show ...");
    

    for (const reservation of reservations) {
      reservation.reservedSeats = reservation.reservedSeats.filter(
        (seat) => !booking.selectedSeats.includes(seat)
      );

      if (reservation.reservedSeats.length === 0) {
        await Reservation.deleteOne({ _id: reservation._id });
      } else {
        await reservation.save();
      }
    }


    console.log(reservations,"after reslesae if seats........");
    
    return res.status(200).json({
      success: true,
      message:
        "Booking cancelled successfully, refund processed, and seats unblocked.",
    });
  } catch (error) {
    console.error("❌ Error cancelling booking:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
