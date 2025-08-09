import { COLLISION_MAP } from "../constants/new_collision_map";
import {
  COLS,
  GAME_HEIGHT,
  GAME_WIDTH,
  TILE_SIZE,
} from "../constants/game-world";
import type { Direction, IPosition } from "../types/common";

export const calcluateDimesions = () => {
  const windowWidth = window.innerWidth * 0.97;
  const windowHeight = window.innerHeight * 0.97;

  const scale = Math.min(windowHeight / GAME_HEIGHT, windowWidth / GAME_WIDTH); // its for how zoomed the image should be
  const height = GAME_HEIGHT * scale;
  const width = GAME_WIDTH * scale;

  // const height = windowHeight
  // const width = windowWidth
  // console.log(windowHeight, windowWidth);
  // console.log(height, width, scale);
  return { height, width, scale };
};

export const calculateNewTarget = (
  // Calculates next cell based on current position and direction
  x: number,
  y: number,
  direction: Direction
): IPosition => {
  return {
    x:
      (x / TILE_SIZE) * TILE_SIZE +
      (direction === "LEFT"
        ? -TILE_SIZE
        : direction === "RIGHT"
          ? TILE_SIZE
          : 0),
    y:
      (y / TILE_SIZE) * TILE_SIZE +
      (direction === "UP" ? -TILE_SIZE : direction === "DOWN" ? TILE_SIZE : 0),
  };
};

export const checkCanMove = (target: IPosition) => {
  // check for obstacle or map Boundries
  const row = Math.floor(target.y / TILE_SIZE);
  const col = Math.floor(target.x / TILE_SIZE);
  const index = COLS * row + col;

  if (index < 0 || index >= COLLISION_MAP.length) {
    return false;
  }

  return COLLISION_MAP[index] !== 1;
};

export const moveTowards = (
  current: number,
  target: number,
  maxStep: number
) => {
  return (
    current +
    Math.sign(target - current) * Math.min(Math.abs(target - current), maxStep)
  );
};

export const continueMovement = (
  currentPosition: IPosition,
  targetPosition: IPosition,
  step: number
): IPosition => {
  return {
    x: moveTowards(currentPosition.x, targetPosition.x, step),
    y: moveTowards(currentPosition.y, targetPosition.y, step),
  };
};

export const handleMovement = (
  currentPosition: IPosition,
  targetPosition: IPosition,
  moveSpeed: number,
  delta: number
) => {
  const step = moveSpeed * TILE_SIZE * delta;
  const distance = Math.hypot(
    targetPosition.x - currentPosition.x,
    targetPosition.y - currentPosition.y
  );

  if (distance <= step) {
    return {
      position: targetPosition,
      completed: true,
    };
  }

  return {
    position: continueMovement(currentPosition, targetPosition, step),
    completed: false,
  };
};
