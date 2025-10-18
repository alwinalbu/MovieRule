// import { io } from "socket.io-client";
// import { URL } from "./config/constants";


// export const socket = io(URL, {
//   withCredentials: true,
//   transports: ["websocket"], 
// });

// import { io } from "socket.io-client";
// import { URL } from "./config/constants";

// export const socket = io(URL, {
//   path: "/socket.io/", 
//   withCredentials: true,
//   transports: ["websocket"],
// });

import { io } from "socket.io-client";
import { URL } from "./config/constants";

// ✅ Choose correct path and options
export const socket = io(URL, {
  path: "/socket.io/", // must match server path
  withCredentials: true, // send cookies (important for JWT auth)
  transports: ["websocket"], // prefer pure WS (no polling fallback)
  reconnection: true, // auto-reconnect on mobile network switch
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

