import { IScreen, Screen } from "../../models/screenSchema";
import { Show } from "../../models/showSchema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import { Reservation } from "../../models/Reservation";
import { Booking } from "../../models/BookingSchema";

export const theaterGetAllScreens = async (
  theaterId: string
): Promise<any[]> => {
  try {
    const screens = await Screen.find({ theaterId }).lean();
    if (!screens.length) return [];

    const now = dayjs().tz("Asia/Kolkata");

    const enhancedScreens = await Promise.all(
      screens.map(async (screen) => {
        const shows = await Show.find({ screen: screen._id })
          .populate("movie")
          .lean();

        let status = "no-shows";
        let currentShow = null;
        let hasBookings = false; // 🆕 Default

        for (const show of shows) {
          const showDate = dayjs(show.date).tz("Asia/Kolkata");
          const startTime = dayjs(
            `${showDate.format("YYYY-MM-DD")}T${show.start_time}`
          ).tz("Asia/Kolkata");
          const endTime = dayjs(
            `${showDate.format("YYYY-MM-DD")}T${show.end_time}`
          ).tz("Asia/Kolkata");

          if (now.isAfter(startTime) && now.isBefore(endTime)) {
            status = "ongoing";
            currentShow = {
              title: (show.movie as any)?.title || "Unknown",
              show_name: show.show_name,
              start_time: show.start_time,
              end_time: show.end_time,
            };
            hasBookings = true;
            break;
          } else if (now.isBefore(startTime)) {
            // ⏰ Upcoming show
            const reservation = await Reservation.findOne({ showId: show._id });
            const booking = await Booking.findOne({ showId: show._id });

            if (reservation || booking) {
              hasBookings = true; // 🆕 Found active bookings
            }

            if (!currentShow) {
              status = "upcoming";
              currentShow = {
                title: (show.movie as any)?.title || "Unknown",
                show_name: show.show_name,
                start_time: show.start_time,
                end_time: show.end_time,
              };
            }
          }
        }

        return {
          ...screen,
          status,
          currentShow,
          hasBookings, // 🆕 Send to frontend
        };
      })
    );

    return enhancedScreens;
  } catch (error) {
    console.error("Error fetching screens:", error);
    throw new Error("Failed to fetch screens with show info");
  }
};
