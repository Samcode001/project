import { Stage } from "@pixi/react";
import useDimensions from "../hook/useDimensions";

import MainContainer from "./MainContainer";
import { useAxiosAuth } from "../api/axiosClient";
import { useEffect, useState } from "react";

const Experience = () => {
  const canvasSize = useDimensions();
  const [userSprite, setUserSprite] = useState<string>("");

  const axiosAuth = useAxiosAuth();

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
        <MainContainer canvasSize={canvasSize} userSprite={userSprite} />
      </Stage>
    </>
  );
};

export default Experience;
