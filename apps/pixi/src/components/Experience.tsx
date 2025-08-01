import { Container, Sprite, Stage } from "@pixi/react";
import useDimensions from "../hook/useDimensions";
import map from "../assets/tilemap.png";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  OFFSET_X,
  OFFSET_Y,
} from "../constants/game-world";
import { useEffect, useMemo } from "react";
// import Hero from "./HeroFree";
import { Texture } from "pixi.js";
import HeroSprite from "../assets/hero_sprite.png";
import HeroGrid from "./HeroGrid";

const Experience = () => {
  const { height, width, scale } = useDimensions();

  useEffect(() => {
    // console.log(width, height, scale);
  }, [width]);

  const heroTexture = useMemo(() => Texture.from(HeroSprite), []);

  return (
    <Stage height={height} width={width}>
      <Container scale={scale}>
        {/* <Sprite image={map} width={GAME_WIDTH} height={GAME_HEIGHT} /> */}
        <Sprite
          image={map}
          width={GAME_WIDTH}
          height={GAME_HEIGHT + OFFSET_Y}
          scale={1}
          x={OFFSET_X}
          y={OFFSET_Y}
        />
        <HeroGrid texture={heroTexture} />
      </Container>
    </Stage>
  );
};

export default Experience;
