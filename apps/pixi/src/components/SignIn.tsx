import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const pixelTheme = createTheme({
  typography: {
    fontFamily: "monospace",
  },

  palette: {
    error: {
      main: "#ff0033",
      dark: "#b80026",
      light: "#ff3359",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#1a1a1a",
            color: "white",
            borderRadius: "0px",
            border: "3px solid #6a00ff",
            boxShadow: "4px 4px 0 #4b00b3",
            "& fieldset": { border: "none" },
            "&:hover": {
              boxShadow: "6px 6px 0 #4b00b3",
            },
            "&.Mui-focused": {
              boxShadow: "6px 6px 0 #250059",
              border: "3px solid #d6ff00",
            },
            "& input": {
              fontWeight: "bold",
              fontSize: "16px",
            },
          },
          "& label": {
            color: "#d6ff00",
            fontWeight: "bold",
            fontSize: "14px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#d6ff00",
          color: "#1a1a1a",
          borderRadius: 0,
          padding: "12px 32px",
          border: "4px solid #6a00ff",
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: "20px",
          textTransform: "uppercase",
          boxShadow: "4px 4px 0 #4b00b3, 6px 6px 0 #250059",
          "&:hover": {
            background: "#e4ff4e",
            transform: "translate(-2px, -2px)",
            boxShadow: "6px 6px 0 #4b00b3, 8px 8px 0 #250059",
          },
          "&:active": {
            transform: "translate(2px, 2px)",
            boxShadow: "2px 2px 0 #4b00b3, 4px 4px 0 #250059",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "#ff0033",
          color: "white",
          fontFamily: "monospace",
          padding: "16px",
          border: "4px solid #b80026",
          boxShadow: "6px 6px 0 #70001a",
          borderRadius: 0,
          fontSize: "18px",
          fontWeight: 800,
          textTransform: "uppercase",
        },
        icon: {
          display: "none", // pixel style: no icon
        },
      },
    },
  },
});

interface IUserData {
  username: string;
  password: string;
}

const SignIn = () => {
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
  });

  const [invalidError, setInvalidError] = useState("");
  const [error, setError] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(userData.username, userData.password);

      if (success) {
        setInvalidError(""); // reset error
        navigate("/arena");
      }
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
        setLoading(false);
      }
      if (err.response?.data?.message) {
        setInvalidError(err.response.data.message);
        setLoading(false);
      }
    }

    setUserData({ username: "", password: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ThemeProvider theme={pixelTheme}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            backgroundImage: 'url("/avatars/signin-bg.gif")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Paper
            className={error ? "shake" : ""}
            elevation={0}
            sx={{
              background: "transparent",
              padding: "40px",
              border: "4px solid #6a00ff",
              boxShadow: "8px 8px 0 #4b00b3",
              width: 420,
              borderRadius: 0,
            }}
          >
            {invalidError && (
              <Box
                sx={{
                  background: "#ff0033",
                  color: "white",
                  padding: "12px",
                  border: "4px solid #b80026",
                  boxShadow: "6px 6px 0 #70001a",
                  fontFamily: "monospace",
                  fontSize: "18px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                {invalidError}
              </Box>
            )}

            {error &&
              Object.entries(error).map(([field, messages]) => {
                return (
                  <Box
                    key={field}
                    sx={{
                      background: "#ff0033",
                      color: "white",
                      padding: "12px",
                      border: "4px solid #b80026",
                      boxShadow: "6px 6px 0 #70001a",
                      fontFamily: "monospace",
                      fontSize: "16px",
                      marginBottom: "10px",
                      textTransform: "uppercase",
                    }}
                  >
                    <strong>{field}:</strong>
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {messages.map((msg, i) => (
                        <li key={i}>{msg}</li>
                      ))}
                    </ul>
                  </Box>
                );
              })}

            <Typography
              variant="h4"
              sx={{
                fontFamily: "monospace",
                fontWeight: 900,
                textAlign: "center",
                color: "#d6ff00",
                marginBottom: 3,
                textShadow: "2px 2px #6a00ff",
              }}
            >
              CREATE ACCOUNT
            </Typography>

            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              error={!!error}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              error={!!error}
            />

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button type="submit">
                {loading ? "Processing..." : "Sign In"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </ThemeProvider>
    </form>
  );
};

export default SignIn;
