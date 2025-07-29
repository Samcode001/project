import { Container, Sprite, Stage } from "@pixi/react";
import useDimensions from "../hook/useDimensions";
import map from "../assets/tilemap.png";
import { GAME_HEIGHT, GAME_WIDTH } from "../constants/game-world";
import { useEffect } from "react";

const Experience = () => {
  const { height, width, scale } = useDimensions();
  
  useEffect(() => {
    console.log(width, height, scale);
  }, []);

  return (
    <Stage height={height} width={width}>
      <Container scale={scale}>
        <Sprite image={map} width={GAME_WIDTH} height={GAME_HEIGHT} />
      </Container>
    </Stage>
  );
};

export default Experience;
