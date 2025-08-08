import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
}); // implemention the socket file alone ,because at this time the

export default socket;
