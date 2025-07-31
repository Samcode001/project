import { useState, useRef } from "react";
import { Rectangle, Sprite, Texture } from "pixi.js";
import type { Direction } from "../types/common";
import { TILE_SIZE } from "../constants/game-world";

interface UseSpriteAnimationProps {
  texture: Texture;
  frameWidth: number;
  frameHeight: number;
  totalFrames: number;
  animationSpeed: number;
}

export const useHeroAnimation = ({
  texture,
  frameWidth,
  frameHeight,
  totalFrames,
  animationSpeed,
}: UseSpriteAnimationProps) => {
  const [sprite, setSprite] = useState<Sprite | null>(null);
  const frameRef = useRef(0);
  const elapsedTimeRef = useRef(0);

  const getRowByDirection = (direction: Direction | null) => {
    // this the number of row bu which we need to generate sprite from here spites collection
    switch (direction) {
      case "UP":
        return 8;
      case "LEFT":
        return 9;
      case "DOWN":
        return 10;
      case "RIGHT":
        return 11;
      default:
        return 10;
    }
  };

  // Produces a Sprite object displaying the correct frame.
  const createSprite = (row: number, column: number) => {
    const frame = new Texture(
      texture.baseTexture,
      new Rectangle(
        column * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight
      )
    );

    const newSprite = new Sprite(frame);
    newSprite.width = TILE_SIZE;
    newSprite.height = TILE_SIZE;

    return newSprite;
  };

  // Determines which frame should be visible and updates sprite.
  const updateSprite = (direction: Direction | null, isMoving: boolean) => {
    const row = getRowByDirection(direction); //Gets the row corresponding to the direction.
    let column = 0;

    if (isMoving) {
      elapsedTimeRef.current += animationSpeed; //Increments elapsed time accumulator by animationSpeed.

      if (elapsedTimeRef.current >= 1) {
        //If enough time has passed (elapsedTimeRef >= 1), moves to next animation frame (frameRef), looping via modulo.
        elapsedTimeRef.current = 0;
        frameRef.current = (frameRef.current + 1) % totalFrames;
      }

      column = frameRef.current; // Uses the new frame index as column.
    }

    const newSprite = createSprite(row, column); //If not moving: always use the first frame (column 0).
    setSprite(newSprite);
  };

  return { sprite, updateSprite };
};
