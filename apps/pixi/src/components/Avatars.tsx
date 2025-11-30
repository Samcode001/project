import { useState } from "react";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  Button,
  Box,
} from "@mui/material";
import { useAxiosAuth } from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const Avatars = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const axiosAuth = useAxiosAuth();
  const navigate = useNavigate();

  const avatars = [
    { id: "dala", src: "/avatars/dala_the_saviour.png" },
    { id: "frank", src: "/avatars/frank_the_hood.png" },
    { id: "monk", src: "/avatars/franky_monk.png" },
    { id: "hero", src: "/avatars/hero_sprite.png" },
    { id: "mink", src: "/avatars/muscle_mink.png" },
    { id: "laila", src: "/avatars/princess_laila.png" },
  ];

  const handleSubmit = async () => {
    console.log("Selected Avatar ID:", selectedAvatar);
    try {
      const res = await axiosAuth.put("/set-avatar", {
        avatar: selectedAvatar,
      });
      if (res.status === 200) {
        console.log("Avatar set succesfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <RadioGroup
        value={selectedAvatar}
        onChange={(e) => setSelectedAvatar(e.target.value)}
        row
        sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
      >
        {avatars.map((avatar) => (
          <FormControlLabel
            key={avatar.id}
            value={avatar.id}
            control={<Radio sx={{ display: "none" }} />} // hide circle
            label={
              <img
                src={avatar.src}
                alt={avatar.id}
                width={100}
                height={100}
                style={{
                  borderRadius: "10px",
                  border:
                    selectedAvatar === avatar.id
                      ? "3px solid #1976d2"
                      : "3px solid transparent",
                  cursor: "pointer",
                }}
              />
            }
            sx={{ margin: 0 }}
          />
        ))}
      </RadioGroup>

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default Avatars;
