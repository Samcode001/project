import { GAME_HEIGHT, GAME_WIDTH } from "../constants/game-world";

export const calcluateDimesions = () => {
  const windowWidth = window.innerWidth * 0.97;
  const windowHeight = window.innerHeight * 0.97;

  const scale = Math.min(windowHeight / GAME_HEIGHT, windowWidth / GAME_WIDTH);
  const height = GAME_HEIGHT * scale;
  const width = GAME_WIDTH * scale;

  return { height, width, scale };
};
