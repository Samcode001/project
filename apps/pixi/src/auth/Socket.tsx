// import { io } from "socket.io-client";
// import { useAxiosAuth } from "../api/axiosClient";

// const API = import.meta.env.VITE_USER_API_URL;
// const SOCKET_API = import.meta.env.VITE_SOCKET_API_URL;
// console.log(API, SOCKET_API);
// // Axios instance which automatically sends HTTP-only cookie
// const axiosAuth = useAxiosAuth();

// async function initSocket() {
//   /**
//    * STEP 1 — Request a short-lived socketToken from the backend.
//    * Your backend will read the HTTP-only cookie -> validate JWT ->
//    * then issue a new signed token (socketToken) only for WebSocket auth.
//    *
//    * This keeps the real access token safe (never exposed to frontend JS).
//    */
//   const res = await axiosAuth.post(`${API}/socket`, {
//     credentials: "include",
//   });

//   const { socketToken } = res.data;

//   /**
//    * STEP 2 — Initialize the WebSocket connection.
//    * Pass socketToken via `auth` — NOT localStorage — secure + recommended.
//    * Adding `transports: ["websocket"]` ensures a clean WebSocket-only connection.
//    */
//   return io(SOCKET_API, {
//     auth: { token: socketToken },
//     transports: ["websocket"],
//   });
// }

// /**
//  * Export the connected socket instance.
//  * NOTE: Top-level await is supported in Vite, so this works cleanly.
//  */
// export const socket = await initSocket();
