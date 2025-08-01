import { useCallback, useRef } from "react";
import {
  ANIMATION_SPEED,
  DEFAULT_X_POS,
  DEFAULT_Y_POS,
  MOVE_SPEED,
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
import { useControls } from "../hook/useControls";

interface IHeroProps {
  texture: Texture;
}

const HeroGrid = ({ texture }: IHeroProps) => {
  const position = useRef({ x: DEFAULT_X_POS, y: DEFAULT_Y_POS });
  const targetPosition = useRef<{ x: number; y: number } | null>(null);
  const currentDirection = useRef<Direction | null>(null);
  const isMoving = useRef(false);

  const { getControlsDirection } = useControls();

  const { sprite, updateSprite } = useHeroAnimation({
    texture,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 9,
    animationSpeed: ANIMATION_SPEED,
  });

  const setNextTarget = useCallback((direction: Direction) => {
    if (targetPosition.current) return;
    const { x, y } = position.current;
    currentDirection.current = direction;
    const newTarget = calculateNewTarget(x, y, direction);
    console.log(position.current);
    if (checkCanMove(newTarget)) targetPosition.current = newTarget;
  }, []);

  useTick((delta) => {
    const { currentKey } = getControlsDirection();
    if (currentKey) {
      setNextTarget(currentKey);
    }

    if (targetPosition.current) {
      const { position: newPosition, completed } = handleMovement(
        position.current,
        targetPosition.current,
        MOVE_SPEED,
        delta
      );

      position.current = newPosition;
      isMoving.current = true;

      if (completed) {
        //   const { x, y } = position.current
        //   onMove(x, y)

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
            x={position.current.x}
            y={position.current.y}
            scale={0.5}
            anchor={[0, 0.4]}
          />
        )}
      </Container>
    </>
  );
};

export default HeroGrid;
