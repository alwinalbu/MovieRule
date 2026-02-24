import { Schema, model, Types } from "mongoose";


export interface ISeatLock {
  showId: Types.ObjectId;
  seatId: string;
  userId: Types.ObjectId;
  expiresAt: Date;
}

const seatLockSchema = new Schema<ISeatLock>(
  {
    showId: { type: Schema.Types.ObjectId, ref: "Show", required: true },
    seatId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// 🔒 Prevent multiple locks on same seat for same show
seatLockSchema.index({ showId: 1, seatId: 1 }, { unique: true });

// ⏳ Auto-expire after 2 minutes
seatLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const SeatLock = model<ISeatLock>("SeatLock", seatLockSchema);
