import cron from "node-cron";
import { Show } from "../mogodb/models/showSchema";
import { Screen } from "../mogodb/models/screenSchema";

const createDateTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
};

// Cron job to run every minute
  cron.schedule("* * * * *", async () => {

   try {
    const now = new Date();

    console.log("Cron job triggered at", new Date());

    const shows = await Show.find({});

   
    const endedShows = shows.filter((show) => {
      const showEndTime = createDateTime(show.date, show.end_time);
      return showEndTime <= now;
    });

    for (const show of endedShows) {
      const screen = await Screen.findById(show.screen);

      if (screen && screen.layout) {
        screen.layout.forEach((row) => {
          row.forEach((seat) => {
            if (seat) {
              seat.status = "available";
            }
          });
        });

        await screen.save();
      }

      await Show.findByIdAndDelete(show._id);
    }

    console.log("Seat statuses reset for ended shows");
  } catch (error) {
    console.error("Error resetting seat statuses:", error);
  }
});
