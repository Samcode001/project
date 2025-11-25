import express from "express";
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//This sets up an event listener for when any client connects to the Socket.io server.
//Each connected client gets a unique socket.
io.on("connection", (socket) => {
  let date = new Date(Date.now());
  console.log("A new user connected", socket.id, date.toISOString());
  //Listens for a "move-avatar" event sent from this client. The event includes some data — typically the avatar's position or state.
  socket.on("move-avatar", (data) => {
    socket.broadcast.emit("other-avatar-move", data); //Takes the received data and sends an "avatar-move" event to all other clients except the one who sent the original event.
  });
});

server.listen(5000, () => {
  console.log("server runnig on 5000");
});
