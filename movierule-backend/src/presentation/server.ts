// import express, { Application, Request, Response } from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import http from "http";
// import { Server as SocketIOServer } from "socket.io";

// import { dependencies } from "../_boot/dependencies";
// import { theaterDependencies } from "../_boot/theaterDependencies";
// import { adminDependencies } from "../_boot/adminDependencies";
// import { theaterRoutes, routes, adminRoutes } from "../infrastructure/routes";
// import authRouter from "../infrastructure/routes/authRoutes";
// import contactRoutes from "../infrastructure/routes/contactRoutes";
// import { SeatLock } from "../infrastructure/database/mogodb/models/SeatLock";
// import movieRoutes from "../infrastructure/routes/movieRoutes";

// dotenv.config();

// const app: Application = express();
// app.set("trust proxy", 1);
// const server = http.createServer(app);

// // ✅ Socket.IO setup — with explicit path
// const io = new SocketIOServer(server, {
//   path: "/socket.io/",
//   cors: {
//     origin: [
//       "https://movie-rule.vercel.app",
//       "https://www.movie-rule.vercel.app",
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // ✅ Socket.IO event handlers (put this BEFORE routes)
// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);

//   socket.on("joinRoom", (showId: string) => {
//     socket.join(showId);
//     console.log(`📺 ${socket.id} joined room ${showId}`);
//   });

//   socket.on("leaveRoom", (showId: string) => {
//     socket.leave(showId);
//     console.log(`👋 ${socket.id} left room ${showId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 Socket disconnected:", socket.id);
//   });
// });

// // ✅ Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: [
//       "https://movie-rule.vercel.app",
//       "https://www.movie-rule.vercel.app",
//     ],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );

// // ✅ Routes
// app.use("/", routes(dependencies));
// app.use("/theater", theaterRoutes(theaterDependencies));
// app.use("/admin", adminRoutes(adminDependencies));
// app.use("/auth", authRouter);
// app.use("/contact", contactRoutes);
// app.use("/ott", movieRoutes);

// // ✅ 404 Fallback (keep this at the very end)
// app.use((req: Request, res: Response, next) => {
//   // If this is a Socket.IO polling request, skip the 404 handler completely
//   if (req.path.startsWith("/socket.io")) {
//     return next(); // Let Socket.IO handle it
//   }
//   return res.status(404).json({ success: false, message: "API Not Found" });
// });



// // ✅ Auto cleanup expired seat locks
// setInterval(async () => {
//   const now = new Date();
//   const expiredLocks = await SeatLock.find({ expiresAt: { $lt: now } });

//   for (const lock of expiredLocks) {
//     await SeatLock.deleteOne({ _id: lock._id });
//     io.to(lock.showId.toString()).emit("seat:unlocked", {
//       showId: lock.showId,
//       seatIds: [lock.seatId],
//     });
//   }
// }, 30000);

// export { io };
// export default server;

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
import movieRoutes from "../infrastructure/routes/movieRoutes";
import { SeatLock } from "../infrastructure/database/mogodb/models/SeatLock";

dotenv.config();

const app: Application = express();
app.set("trust proxy", 1); // ✅ Required for secure cookies behind proxy (AWS/NGINX)

// Create HTTP server
const server = http.createServer(app);

// ✅ Determine environment
const isProduction = process.env.NODE_ENV === "production";

// ✅ Allowed origins
const allowedOrigins = isProduction
  ? ["https://movie-rule.vercel.app", "https://www.movie-rule.vercel.app"]
  : ["http://localhost:5173"];

// ✅ Setup Socket.IO
const io = new SocketIOServer(server, {
  path: "/socket.io/",
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Socket.IO Events
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

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        console.log("✅ Allowed CORS Origin:", origin);
        callback(null, true);
      } else {
        console.warn("❌ Blocked CORS Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// ✅ Routes
app.use("/", routes(dependencies));
app.use("/theater", theaterRoutes(theaterDependencies));
app.use("/admin", adminRoutes(adminDependencies));
app.use("/auth", authRouter);
app.use("/contact", contactRoutes);
app.use("/ott", movieRoutes);

// check route 
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "✅ Backend is alive and reachable!",
    env: process.env.NODE_ENV,
  });
});

app.get("/debug-cookies", (req: Request, res: Response) => {
  res.json({ cookies: req.cookies });
});

// ✅ 404 fallback 
app.use((req: Request, res: Response, next) => {
  // Allow socket polling to bypass 404
  if (req.path.startsWith("/socket.io")) return next();
  return res.status(404).json({ success: false, message: "API Not Found" });
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

// ✅ Export
export { io };
export default server;

