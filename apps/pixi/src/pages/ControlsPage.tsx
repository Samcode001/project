import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ControlsPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          height: "auto",
          maxHeight: "90vh",
          backgroundColor: "#9badb7",
          border: "6px solid #323c39",
          boxShadow:
            "inset -6px -6px 0px #52606d, inset 6px 6px 0px #e3eef0, 0px 0px 20px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, md: 4 },
          overflowY: "auto",
          fontFamily: "'Press Start 2P', cursive",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#1a1c2c",
            textAlign: "center",
            mb: 4,
            fontSize: { xs: "18px", md: "24px" },
            textShadow: "2px 1px #e3eef0",
            fontWeight:700
          }}
        >
          ADVENTURER'S GUIDE
        </Typography>

        {/* Content Wrapper (Replacing Grid with Flex for better compatibility) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          {/* Section 1: Movement */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              border: "4px solid #3e8948",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <Typography
              sx={{
                color: "#3e8948",
                fontSize: "12px",
                mb: 2,
                fontWeight: "bold",
              }}
            >
              HOW TO MOVE
            </Typography>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              {[
                { label: "⬆", action: "UP" },
                { label: "⬇", action: "DOWN" },
                { label: "⬅", action: "LEFT" },
                { label: "➡", action: "RIGHT" },
              ].map((item) => (
                <Box key={item.action} sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      border: "2px solid #000",
                      p: 0.2,
                      fontSize: "30px",
                      color: "black",
                    }}
                  >
                    {item.label}
                  </Box>
                  <Typography sx={{ fontSize: "8px", mt: 0.5, color: "black" }}>
                    {item.action}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Section 2: Interaction (Using your screenshot as reference) */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              border: "4px solid #7b2ff7",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <Typography
              sx={{
                color: "#7b2ff7",
                fontSize: "12px",
                mb: 2,
                fontWeight: "bold",
              }}
            >
              INTERACTING
            </Typography>

            {/* Visual Chat Demo */}
            <Box
              component="img"
              src="/avatars/control-interaction.png"
              sx={{
                width: "50%",
                height: "auto",
                // imageRendering: "pixelated",
                border: "2px solid #323c39",
              }}
            ></Box>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#1a1c2c",
                lineHeight: 1.6,
              }}
            >
              1. Walk near another player and wait for the speech bubble to
              appear above your avatar.
              <br />
              2. Press{" "}
              {/* <span style={{ color: "#7b2ff7" }}>[ ENTER ]</span>{" "} */}
              <span style={{ color: "#7b2ff7", fontWeight: 700 }}>"C" </span>.
              <br />
              3. Type your message and press Enter to shout!
            </Typography>
          </Box>
        </Box>

        {/* Action Button: Styled like your Pixel PLAY button */}
        <Button
          sx={{
            mt: 4,
            backgroundColor: "#3e8948",
            color: "#fff",
            border: "4px solid #1a1c2c",
            borderRadius: 0,
            py: 2,
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "14px",
            boxShadow: "inset -4px -4px 0px #1a5e20",
            "&:hover": {
              backgroundColor: "#4caf50",
              boxShadow: "inset -2px -2px 0px #1a5e20",
              transform: "translateY(2px)",
            },
          }}
          onClick={() => navigate("/arena")}
        >
          START JOURNEY
        </Button>
      </Box>
    </Box>
  );
};

export default ControlsPage;
