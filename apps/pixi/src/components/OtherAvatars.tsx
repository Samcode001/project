import { useCallback, useEffect, useRef } from "react";
import {
  ANIMATION_SPEED,
  MOVE_SPEED,
  TILE_SIZE,
} from "../constants/game-world";
import type { Direction } from "../types/common";
import { useHeroAnimation } from "../hook/useHeroAnimation";
import type { Texture } from "pixi.js";
import {
  calculateNewTarget,
  checkCanMove,
  handleMovement,
} from "../helper/common";
import { Container, Sprite, useTick } from "@pixi/react";
// import { useControls } from "../hook/useControls";

interface IHeroProps {
  texture: Texture;
  AVATAR_Y_POS: number;
  AVATAR_X_POS: number;
  avatarId: string;
  //   updateHeroPosition: (x: number, y: number) => void;
}

const OtherAvatars = ({
  texture,
  AVATAR_X_POS,
  AVATAR_Y_POS,
  avatarId,
}: IHeroProps) => {
  const avatar_position = useRef({
    x: AVATAR_X_POS * TILE_SIZE,
    y: AVATAR_Y_POS * TILE_SIZE,
  }); // Tracks the current pixel coordinates of the hero on the map.
  const targetPosition = useRef<{ x: number; y: number } | null>(null); //If the hero is moving, this is the destination cell’s pixel coordinates. If null, the hero is idle.
  const currentDirection = useRef<Direction | null>(null); // Current facing/moving direction, e.g., "UP", "DOWN".
  const isMoving = useRef(false);

  //   const { getControlsDirection } = useControls();

  const { sprite, updateSprite } = useHeroAnimation({
    texture,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 9,
    animationSpeed: ANIMATION_SPEED,
  });

  //   useEffect(() => {
  //     updateHeroPosition(position.current.x, position.current.y);
  //   }, [updateHeroPosition]);

  //When an arrow key is pressed, this decides if a move should start and which cell to move toward.
  //   const setNextTarget = useCallback((direction: Direction) => {
  //     if (targetPosition.current) return; // If already moving, ignores new inputs until arrived.
  //     const { x, y } = avatar_position.current;
  //     currentDirection.current = direction;
  //     const newTarget = calculateNewTarget(x, y, direction);
  //     if (checkCanMove(newTarget)) targetPosition.current = newTarget;
  //   }, []);

  useEffect(() => {
    const newTarget = {
      x: AVATAR_X_POS * TILE_SIZE,
      y: AVATAR_Y_POS * TILE_SIZE,
    };
    if (checkCanMove(newTarget)) {
      targetPosition.current = newTarget;
      console.log(avatar_position.current, targetPosition.current, avatarId);
    }
  }, [AVATAR_X_POS, AVATAR_Y_POS]);

  useTick((delta) => {
    // const { currentKey } = getControlsDirection();
    // if (currentKey) {
    //   setNextTarget(currentKey);
    // }

    if (targetPosition.current) {
      const { position: newPosition, completed } = handleMovement(
        avatar_position.current,
        targetPosition.current,
        MOVE_SPEED,
        delta
      );

      avatar_position.current = newPosition;
      isMoving.current = true;

      if (completed) {
        // const { x, y } = position.current;
        // updateHeroPosition(x, y);

        targetPosition.current = null;
        isMoving.current = false;
      }
    }

    updateSprite(currentDirection.current!, isMoving.current);
  });

  return (
    <>
      <Container>
        {sprite && (
          <Sprite
            texture={sprite.texture}
            y={avatar_position.current.y}
            x={avatar_position.current.x}
            scale={0.8}
            anchor={[0, 0.3]}
          />
        )}
      </Container>
    </>
  );
};

export default OtherAvatars;
