import { Stage } from "@pixi/react";
import useDimensions from "../hook/useDimensions";
import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useAxiosAuth } from "../api/axiosClient";
import MainContainer from "./MainContainer";

const API = import.meta.env.VITE_USER_API_URL;
const SOCKET_API = import.meta.env.VITE_SOCKET_API_URL;

const Experience = () => {
  const canvasSize = useDimensions();
  const [userSprite, setUserSprite] = useState<string>("");

  const axiosAuth = useAxiosAuth();

  function Socket() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [socketToken, setSocketToken] = useState<string | null>(null);
    const [socketUserId, setSocketUserId] = useState<string | null>(null);
    const [socketAvatarId, setSocketAvatarId] = useState<string | null>(null);

    useEffect(() => {
      async function init() {
        // STEP 1 — request a socket token using secure cookie auth
        const res = await axiosAuth.post(`${API}/socket`, {
          credentials: "include",
        });

        const { token, userId, avatarId } = res.data;
        setSocketToken(token);
        setSocketUserId(userId);
        setSocketAvatarId(avatarId);

        // STEP 2 — connect using that token
        const newSocket = io(SOCKET_API, {
          transports: ["websocket"],
          auth: { token },
        });

        setSocket(newSocket);
      }

      init();
    }, []);
    return { socket, socketToken, socketUserId, socketAvatarId };
  }
  // console.log(socketToken, socketUserId);

  const getuserAvatar = async () => {
    const res = await axiosAuth.get("/avatar");
    if (res.status === 200) {
      setUserSprite(`/avatars/${res.data.avatarId}.png`);
    }
  };

  useEffect(() => {
    getuserAvatar();
  }, []);

  return (
    <>
      <Stage height={canvasSize.height} width={canvasSize.width}>
        <MainContainer
          canvasSize={canvasSize}
          userSprite={userSprite}
          Socket={Socket}
        />
      </Stage>
    </>
  );
};

export default Experience;
