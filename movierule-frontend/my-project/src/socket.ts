import { io } from "socket.io-client";
import { URL } from "./config/constants";


export const socket = io(URL, {
  withCredentials: true,
  transports: ["websocket"], 
});
