import { io } from "socket.io-client";

export function connectWS() {
  const socket = io("http://localhost:4600", {
    transports: ["websocket"], // IMPORTANT for Expo Web
  });

  socket.on("connect", () => {
    console.log("Connected to socket:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log("❌ Socket connection error:", err.message);
  });

  return socket;
}

