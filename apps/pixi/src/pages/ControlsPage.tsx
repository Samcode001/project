import { Box, Typography } from "@mui/material";
import React from "react";

const AvatarControlsInstructions: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 10, // Adjust position as needed
        left: 10, // Adjust position as needed

        width: "fit-content",
        maxWidth: 250,

        backgroundColor: "#0a0a0a",
        border: "3px solid #d9ff00", // Using your chat window highlight color
        boxShadow: "0 0 10px #d9ff00",
        padding: 2,
        borderRadius: "4px",

        display: "flex",
        flexDirection: "column",
        gap: 1.5,

        fontFamily: "'Press Start 2P', monospace",
        zIndex: 10, // Ensure it sits on top of the stage
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#d9ff00",
          textAlign: "center",
          fontSize: "10px",
          textShadow: "0px 0px 3px #d9ff00",
          mb: 0.5,
        }}
      >
        MOVEMENT CONTROLS
      </Typography>

      {/* Instructions List */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: "8px",
            textAlign: "right",
            pr: 1,
          }}
        >
          MOVE UP:
        </Typography>
        <Typography
          sx={{
            color: "#7b2ff7",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          ↑
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "8px",
            textAlign: "right",
            pr: 1,
          }}
        >
          MOVE DOWN:
        </Typography>
        <Typography
          sx={{
            color: "#7b2ff7",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          ↓
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "8px",
            textAlign: "right",
            pr: 1,
          }}
        >
          MOVE LEFT:
        </Typography>
        <Typography
          sx={{
            color: "#7b2ff7",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          ←
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "8px",
            textAlign: "right",
            pr: 1,
          }}
        >
          MOVE RIGHT:
        </Typography>
        <Typography
          sx={{
            color: "#7b2ff7",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          →
        </Typography>
      </Box>

      {/* Optional: Add Chat Toggle Instruction */}
      <Box
        sx={{
          borderTop: "1px dashed #7b2ff7",
          pt: 1,
          mt: 0.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#fff", fontSize: "8px" }}>
          TOGGLE CHAT:
        </Typography>
        <Typography
          sx={{ color: "#d9ff00", fontSize: "8px", fontWeight: "bold" }}
        >
          [ C ]
        </Typography>
      </Box>
    </Box>
  );
};

export default AvatarControlsInstructions;
