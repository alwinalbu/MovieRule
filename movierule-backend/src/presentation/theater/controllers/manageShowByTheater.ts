import { Request, Response } from "express";
import { Show } from "../../../infrastructure/database/mogodb/models/showSchema";
import { Booking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
import { Screen } from "../../../infrastructure/database/mogodb/models/screenSchema";
import { Reservation } from "../../../infrastructure/database/mogodb/models/Reservation";

export const manageShowController = async (req: Request, res: Response) => {
  try {
    const { showId } = req.params;

    if (!showId) {
      return res
        .status(400)
        .json({ success: false, message: "Show ID is required" });
    }

    // 1️⃣ Fetch Show with related info
    const show = await Show.findById(showId)
      .populate("movie")
      .populate("screen")
      .populate("theater_id");

    if (!show) {
      return res
        .status(404)
        .json({ success: false, message: "Show not found" });
    }

    // 2️⃣ Fetch all bookings for this show
    const bookings = await Booking.find({ showId })
      .populate("userId", "username email")
      .lean();

    // 3️⃣ Fetch screen layout
    const screen = await Screen.findById(show.screen).lean();
    if (!screen) {
      return res
        .status(404)
        .json({ success: false, message: "Screen not found" });
    }

    // 4️⃣ Fetch temporary reservations (for locked seats)
    const reservations = await Reservation.find({ showId }).lean();

    // 5️⃣ ✅ Seat stats (accurate + duplicate-safe)
    const totalSeats = screen.rows * screen.cols;

    // Filter out cancelled/refunded bookings
    const activeBookings = bookings.filter(
      (b) => b.status !== "cancelled" && b.paymentStatus !== "refunded"
    );

    const bookedSeats = new Set(activeBookings.flatMap((b) => b.selectedSeats));
    const reservedSeats = new Set(reservations.flatMap((r) => r.reservedSeats));

    const totalTakenSeats = new Set([...bookedSeats, ...reservedSeats]);

    const availableSeats = totalSeats - totalTakenSeats.size;

    // 6️⃣ Revenue
    const revenue = activeBookings.reduce(
      (sum, b) => sum + (b.totalAmount || 0),
      0
    );

    // 7️⃣ Snack stats
    const snackStats = activeBookings.flatMap((b) => b.selectedItems || []);
    const totalSnacks = snackStats.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    // 8️⃣ 🕒 Time and show status
    const now = new Date();
    const showDate = new Date(show.date);

    const [startHour, startMinute] = show.start_time.split(":").map(Number);
    const [endHour, endMinute] = show.end_time.split(":").map(Number);

    const showStartTime = new Date(showDate);
    showStartTime.setHours(startHour, startMinute, 0, 0);

    const showEndTime = new Date(showDate);
    showEndTime.setHours(endHour, endMinute, 0, 0);

    let showStatus = "";
    let timeLeft = "";

    if (now < showStartTime) {
      // Show is upcoming
      const diffMs = showStartTime.getTime() - now.getTime();
      const hours = Math.floor(diffMs / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);
      showStatus = "Upcoming";
      timeLeft = `${hours}h ${minutes}m`;
    } else if (now >= showStartTime && now < showEndTime) {
      // Show is currently running
      showStatus = "Running";
      timeLeft = "Now Showing";
    } else {
      // Show already ended
      showStatus = "Completed";
      timeLeft = "Show Ended";
    }

    // ✅ Final response
    return res.status(200).json({
      success: true,
      show,
      screen,
      bookings,
      stats: {
        totalSeats,
        bookedSeats: bookedSeats.size,
        reservedSeats: reservedSeats.size,
        availableSeats,
        revenue,
        totalSnacks,
        timeLeft,
        showStatus, // 👈 New status value
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching Manage Show data:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
