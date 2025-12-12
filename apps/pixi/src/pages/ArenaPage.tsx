// import React from "react";
import { useEffect } from "react";
// import { useAxiosAuth } from "../api/axiosClient";
import Arena from "../components/Arena";
// import { io, type Socket } from "socket.io-client";
// import { socket } from "../redux/socket/socket";
import { useAppDispatch } from "../redux/hook";
// import { initSocket } from "../redux/socket/socketThunk";
import { useAxiosAuth } from "../api/axiosClient";
import { io } from "socket.io-client";
import { setSocketData } from "../redux/socket/socketSlice";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import GameNavbar from "../components/GameNavbar";

const API = import.meta.env.VITE_USER_API_URL;
const SOCKET_API = import.meta.env.VITE_SOCKET_API_URL;

const ArenaPage = () => {
  //   const axiosAuth = useAxiosAuth();
  const socket = useSelector((state: RootState) => state.socket.socket);

  const axiosAuth = useAxiosAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initSocket() {
      const res = await axiosAuth.post(`${API}/socket`, {
        credentials: "include",
      });

      const { token, userId, avatarId, username } = res.data;

      const socket = io(SOCKET_API, {
        transports: ["websocket"],
        auth: { token },
      });

      dispatch(
        setSocketData({
          socket,
          token,
          userId,
          avatarId,
          username,
        })
      );
    }

    initSocket();
  }, []);

  return (
    <>
      <GameNavbar />
      <Arena socket={socket} />
    </>
  );
};

export default ArenaPage;
