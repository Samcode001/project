import { Texture } from "pixi.js";
import {
  // use,
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
import OtherAvatarSprite from "../assets/other_avatars.png";
// import Camera from "./Camera";
import socket from "../helper/socket";
import OtherAvatars from "./OtherAvatars";
import type { Direction } from "../types/common";
import Camera from "./Camera";

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
  direction: Direction;
}

const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const [usersAvatars, setUsersAvatars] = useState<IAvatar[]>([]);
  const [currentDirection, setCurrentDirection] = useState<Direction | null>(
    null
  );

  const [heroPosition, setHeroPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    socket.emit("move-avatar", {
      id: socket.id,
      x: heroPosition.x * TILE_SIZE,
      y: heroPosition.y * TILE_SIZE,
      direction: currentDirection,
    });
  }, [heroPosition]);

  useEffect(() => {
    const handleOthersAvatarMove = (data: IAvatar) => {
      setUsersAvatars((prev) => {
        const index = prev.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          let updated = [...prev];
          updated[index] = {
            id: data.id,
            x: data.x,
            y: data.y,
            direction: data.direction,
          };
          console.log(
            "Received movement from other avatars",
            data
            // usersAvatars
          );
          return updated;
        } else
          return [
            ...prev,
            { id: data.id, x: data.x, y: data.y, direction: data.direction },
          ];
      });
    };
    socket.on("other-avatar-move", handleOthersAvatarMove);

    return () => {
      socket.off("other-avatar-move", handleOthersAvatarMove);
    };
  }, [usersAvatars]);

  useEffect(() => {
    console.log("usersAvatars", usersAvatars);
  }, [usersAvatars]);

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    });
  }, []);

  const heroTexture = useMemo(() => Texture.from(HeroSprite), []);
  const othersAvatarsTexture = useMemo(
    () => Texture.from(OtherAvatarSprite),
    []
  );

  return (
    <>
      <Container scale={canvasSize.scale}>
        {/* <Sprite image={map} width={GAME_WIDTH} height={GAME_HEIGHT} /> */}

        <Camera heroPosition={heroPosition} canvasSize={canvasSize}>
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
            setCurrentDirection={setCurrentDirection}
          />

          {usersAvatars
            .filter((avatar) => Boolean(avatar.id))
            .map((avatar, index) => {
              // console.log("other avatrs id ", index, avatar.id, avatar.x, avatar.y);
              return (
                <OtherAvatars
                  key={index}
                  texture={othersAvatarsTexture}
                  AVATAR_X_POS={avatar.x}
                  AVATAR_Y_POS={avatar.y}
                  AVATAR_DIRECTION={avatar.direction}
                  avatarId={avatar.id}
                />
              );
            })}

          {/* <OtherAvatars
          texture={heroTexture}
          AVATAR_X_POS={10}
          AVATAR_Y_POS={18}
        /> */}
        </Camera>
      </Container>
    </>
  );
};

export default MainContainer;
