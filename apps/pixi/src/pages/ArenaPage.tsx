// import React from "react";
import { useEffect, useState } from "react";
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
import { useBootStore } from "../store/bootstore";
import { Box } from "@mui/material";
import PlanetOverlay from "./ArenaOverlay";

const API = import.meta.env.VITE_USER_API_URL;
const SOCKET_API = import.meta.env.VITE_SOCKET_API_URL;

const ArenaPage = () => {
  //   const axiosAuth = useAxiosAuth();
  const [avatarLaoding, setAvatarLoading] = useState(false);
  const socket = useSelector((state: RootState) => state.socket.socket);

  const axiosAuth = useAxiosAuth();
  const dispatch = useAppDispatch();

  const avatarReady = useBootStore((state) => state.ready.AVATARS);

  useEffect(() => {
    async function initSocket() {
      const res = await axiosAuth.post(`${API}/socket`, {
        credentials: "include",
      });

      const { token, userId, avatarId, username } = res.data;

      const socket = io(SOCKET_API, {
        // path: "/socket",
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

  useEffect(() => {
    if (avatarReady) {
      setAvatarLoading(true);
    }
    // console.log(useBootStore.getState().ready.AVATARS);
  }, [avatarReady]);

  return (
    <>
      <GameNavbar />
      <Box>
        <PlanetOverlay visible={!avatarLaoding} />
        <Arena socket={socket} />
      </Box>
    </>
  );
};

export default ArenaPage;
