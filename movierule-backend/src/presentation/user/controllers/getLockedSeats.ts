import { Request, Response } from "express";
import { SeatLock } from "../../../infrastructure/database/mogodb/models/SeatLock";

export const getLockedSeatsController = async (req: Request, res: Response) => {
  const { showId } = req.params;
  if (!showId) {
    return res.status(400).json({ message: "showId required" });
  }

  const now = new Date();
  const activeLocks = await SeatLock.find({
    showId,
    expiresAt: { $gt: now },
  }).select("seatId -_id");

  const lockedSeats = activeLocks.map((l) => l.seatId);
  res.status(200).json({ success: true, lockedSeats });
};
