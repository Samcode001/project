import { Texture } from "pixi.js";
import {
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { Container, Sprite } from "@pixi/react";
import HeroGrid from "./HeroGrid";
import map from "../assets/tilemap.png";
import { GAME_HEIGHT, GAME_WIDTH, TILE_SIZE } from "../constants/game-world";
import HeroSprite from "../assets/hero_sprite.png";
// import Camera from "./Camera";
import socket from "../helper/socket";
import OtherAvatars from "./OtherAvatars";

interface IMainContainerProps {
  canvasSize: {
    height: number;
    width: number;
    scale: number;
  };
}

interface IAvatar {
  id: string;
  x: number;
  y: number;
}

const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 });
  const [usersAvatars, setUsersAvatars] = useState<IAvatar[]>([]);

  useEffect(() => {
    socket.emit("move-avatar", {
      id: socket.id,
      x: heroPosition.x,
      y: heroPosition.y,
    });
  }, [heroPosition]);

  useEffect(() => {
    const handleAvatarMove = (data: IAvatar) => {
      console.log("Received movement for avatar", data, usersAvatars);
      setUsersAvatars((prev) => {
        const index = prev.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          let updated = [...prev];
          updated[index] = { id: data.id, x: data.x, y: data.y };
          return updated;
        } else return [...prev, { id: data.id, x: data.x, y: data.y }];
      });
    };
    socket.on("avatar-move", handleAvatarMove);

    return () => {
      socket.off("avatar-move", handleAvatarMove);
    };
  }, [usersAvatars]);

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    });
  }, []);

  const heroTexture = useMemo(() => Texture.from(HeroSprite), []);

  return (
    <>
      <Container scale={canvasSize.scale}>
        {/* <Sprite image={map} width={GAME_WIDTH} height={GAME_HEIGHT} /> */}

        {usersAvatars.map((avatar, index) => {
          return (
            <OtherAvatars
              key={index}
              texture={heroTexture}
              AVATAR_X_POS={avatar.x}
              AVATAR_Y_POS={avatar.y}
              avatarId={avatar.id}
            />
          );
        })}

        {/* <Camera heroPosition={heroPosition} canvasSize={canvasSize}> */}
        <Sprite
          image={map}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          // scale={1}
          // x={OFFSET_X}
          // y={OFFSET_Y}
        />
        {children}
        <HeroGrid
          texture={heroTexture}
          updateHeroPosition={updateHeroPosition}
        />

        {/* <OtherAvatars
          texture={heroTexture}
          AVATAR_X_POS={10}
          AVATAR_Y_POS={18}
        /> */}
        {/* </Camera> */}
      </Container>
    </>
  );
};

export default MainContainer;
