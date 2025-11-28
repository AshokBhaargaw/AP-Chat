import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 4600;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });
});

server.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
