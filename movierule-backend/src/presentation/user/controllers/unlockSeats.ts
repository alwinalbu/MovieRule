import { Request, Response } from "express";
import { SeatLock } from "../../../infrastructure/database/mogodb/models/SeatLock";
import { io } from "../../../presentation/server";

export const unlockSeatsController = async (req: Request, res: Response) => {
  const { showId, seatIds } = req.body;
  const userId = req.user?._id;

  if (!showId || !seatIds?.length) {
    return res.status(400).json({ message: "showId and seatIds required" });
  }

  try {
    await SeatLock.deleteMany({ showId, seatId: { $in: seatIds }, userId });
    io.to(showId.toString()).emit("seat:unlocked", { showId, seatIds });
    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Unlock seats error:", error);
    res.status(500).json({ message: "Failed to unlock seats" });
  }
};

