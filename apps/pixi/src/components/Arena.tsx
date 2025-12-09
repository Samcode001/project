import { Stage } from "@pixi/react";
import useDimensions from "../hook/useDimensions";
import { useEffect, useState } from "react";
// import { io, type Socket } from "socket.io-client";
import { useAxiosAuth } from "../api/axiosClient";
import MainContainer from "./MainContainer";
import { Box, Button, Container, TextField } from "@mui/material";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Arena = ({ socket }: any) => {
  const canvasSize = useDimensions();
  const [userSprite, setUserSprite] = useState<string>("");

  const socketAvatarId = useSelector(
    (state: RootState) => state.socket.avatarId
  )!;
  const socketUserId = useSelector((state: RootState) => state.socket.userId)!;
  const axiosAuth = useAxiosAuth();

  // console.log(socketToken, socketUserId);

  const getuserAvatar = async () => {
    const res = await axiosAuth.get("/avatar");
    if (res.status === 200) {
      let avatar = `/avatars/${res.data.avatarId}.png`;
      setUserSprite(avatar);
    }
  };

  // const { socket, socketUserId, socketAvatarId } = Socket();
  useEffect(() => {
    getuserAvatar();
  }, []);

  useEffect(() => {
    const handleChatToggle = (e: KeyboardEvent) => {
      const isTyping =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        document.activeElement?.getAttribute("contenteditable") === "true";

      if (isTyping) return;

      if (e.key === "c") {
        setChatOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleChatToggle);

    return () => {
      window.removeEventListener("keydown", handleChatToggle);
    };
  }, []);

  // ------ Chat States
  const [chatInput, setChatInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Container sx={{ position: "relative", top: 0, left: 0 }}>
        <Stage
          height={canvasSize.height}
          width={canvasSize.width}
          options={{ backgroundAlpha: 0 }}
          style={{ pointerEvents: "none" }}
        >
          <MainContainer
            canvasSize={canvasSize}
            userSprite={userSprite}
            socket={socket}
            socketAvatarId={socketAvatarId}
            socketUserId={socketUserId}
          />
        </Stage>
        <ChatInput
          chatInput={chatInput}
          setChatInput={setChatInput}
          chatOpen={chatOpen}
          // handleSubmit={handleSubmit}
          // socket={socket}
        />
      </Container>
    </>
  );
};

export default Arena;
