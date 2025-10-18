import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import { dependencies } from "../_boot/dependencies";
import { theaterDependencies } from "../_boot/theaterDependencies";
import { adminDependencies } from "../_boot/adminDependencies";
import { theaterRoutes, routes, adminRoutes } from "../infrastructure/routes";
import authRouter from "../infrastructure/routes/authRoutes";
import contactRoutes from "../infrastructure/routes/contactRoutes";

import { SeatLock } from "../infrastructure/database/mogodb/models/SeatLock";
import movieRoutes from "../infrastructure/routes/movieRoutes";

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

// ✅ SOCKET.IO setup
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// ✅ ROUTES
app.use("/", routes(dependencies));
app.use("/theater", theaterRoutes(theaterDependencies));
app.use("/admin", adminRoutes(adminDependencies));
app.use("/auth", authRouter);
app.use("/contact", contactRoutes);
app.use("/ott", movieRoutes);

// ✅ 404 fallback
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "API Not Found" });
});

// ✅ SOCKET.IO events
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("joinRoom", (showId: string) => {
    socket.join(showId);
    console.log(`📺 ${socket.id} joined room ${showId}`);
  });

  socket.on("leaveRoom", (showId: string) => {
    socket.leave(showId);
    console.log(`👋 ${socket.id} left room ${showId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// ✅ Auto-cleanup expired seat locks every 30s
setInterval(async () => {
  const now = new Date();
  const expiredLocks = await SeatLock.find({ expiresAt: { $lt: now } });

  for (const lock of expiredLocks) {
    await SeatLock.deleteOne({ _id: lock._id });
    io.to(lock.showId.toString()).emit("seat:unlocked", {
      showId: lock.showId,
      seatIds: [lock.seatId],
    });
  }
}, 30000);

export { io };
export default server;
