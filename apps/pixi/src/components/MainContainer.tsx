import { Texture } from "pixi.js";
import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { Container, Sprite } from "@pixi/react";
import HeroGrid from "./HeroGrid";
import map from "../assets/tilemap.png";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  OFFSET_X,
  OFFSET_Y,
  TILE_SIZE,
} from "../constants/game-world";
import HeroSprite from "../assets/hero_sprite.png";
import Camera from "./Camera";

interface IMainContainerProps {
  canvasSize: {
    height: number;
    width: number;
    scale: number;
  };
}

const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 });

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
        <Camera heroPosition={heroPosition} canvasSize={canvasSize}>
        <Sprite
          image={map}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          scale={1} 
          // x={OFFSET_X}
          // y={OFFSET_Y}
        />
        {children}
        <HeroGrid
          texture={heroTexture}
          updateHeroPosition={updateHeroPosition}
        />
        </Camera>
      </Container>
    </>
  );
};

export default MainContainer;
