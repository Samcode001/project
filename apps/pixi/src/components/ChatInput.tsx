import { Box, Button, TextField } from "@mui/material";
import { type PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface IChatInput {
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  chatOpen: boolean;
}

const ChatInput = ({
  chatInput,
  setChatInput,
  chatOpen,
}: PropsWithChildren<IChatInput>) => {
  //   const { socket } = Socket();

  const socket = useSelector((state: RootState) => state.socket.socket);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket) return;
    console.log(chatInput);
    // const res = await axiosAuth.post("/chat", {
    //   message: chatInput,
    // });
    // if (res.status === 200) {
    setChatInput("");
    socket.emit("chat-message", chatInput);
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,

            width: "22vw",
            minWidth: 250,

            backgroundColor: "#0a0a0a",
            border: "3px solid #7b2ff7",
            boxShadow: "0 0 12px #7b2ff7",
            padding: 2,
            borderRadius: "4px",

            display: "flex",
            flexDirection: "column",
            gap: 1,

            fontFamily: "'Press Start 2P', monospace",

            // --- Animation ---
            transform: chatOpen ? "translateY(0)" : "translateX(-120%)",
            opacity: chatOpen ? 1 : 0,
            transition:
              "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease-in-out",
            pointerEvents: chatOpen ? "auto" : "none", // prevents clicking while hidden
          }}
        >
          <Box
            sx={{
              color: "#d9ff00",
              textAlign: "center",
              mb: 1,
              fontSize: "10px",
              textShadow: "0px 0px 4px #d9ff00",
            }}
          >
            CHAT WINDOW
          </Box>

          {/* <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        /> */}
          <TextField
            variant="outlined"
            placeholder="Type message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            InputProps={{
              sx: {
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "10px",
                color: "#fff",
                background: "#0f0f0f",
                borderRadius: "3px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7b2ff7",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d9ff00",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d9ff00",
                },
              },
            }}
          />

          <Button
            variant="contained"
            type="submit"
            //   onClick={handleSend}
            sx={{
              mt: 1,
              backgroundColor: "#d9ff00",
              color: "#000",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "10px",
              border: "2px solid #7b2ff7",
              boxShadow: "3px 3px 0px #7b2ff7",
              "&:hover": {
                backgroundColor: "#e5ff33",
                boxShadow: "1px 1px 0px #7b2ff7",
              },
            }}
          >
            SEND
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ChatInput;
