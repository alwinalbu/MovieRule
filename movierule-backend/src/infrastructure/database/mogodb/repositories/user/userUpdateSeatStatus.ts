import { IScreen, Screen } from "../../models/screenSchema";

export const userUpdateSeatStatus = async (screenId: string,selectedSeats: string[]): Promise<boolean> => {
  try {
    // Find the screen by its ID
    const screen = await Screen.findById(screenId);

    if (!screen) {
      throw new Error("Screen not found");
    }

    if (!screen.layout) {
      throw new Error("Screen layout is not defined");
    }

    // Flag to track if any seats were updated
    let seatsUpdated = false;

    // Iterate over the rows and seats in the layout
    screen.layout.forEach((row) => {
      row.forEach((seat) => {
        if (seat && selectedSeats.includes(seat.seatId)) {
          if (seat.status !== "sold") {
            seat.status = "sold";
            seatsUpdated = true;
          }
        }
      });
    });

    // Save changes if any seats were updated
    if (seatsUpdated) {
      await screen.save();
    }

    return seatsUpdated;
  } catch (error: any) {
    console.error("Error updating seat status:", error);
    return false; // Return false on error
  }
};
