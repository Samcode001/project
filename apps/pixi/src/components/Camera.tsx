import { useRef, type PropsWithChildren } from "react";
import { Container, useTick } from "@pixi/react";
import { Graphics as PIXIGraphics } from "pixi.js";
import { TILE_SIZE, ZOOM } from "../constants/game-world";

interface ICameraProps {
  heroPosition: { x: number; y: number };
  canvasSize: { width: number; height: number };
}

const lerp = (start: number, end: number) => {     // Smooths the movement from one value to another, progressing only 3% of the way each frame. Creates a smooth, gliding camera rather than a jerky hard cut.
  return start + (end - start) * 0.03;
};

const Camera = ({
  heroPosition,   // the hero's current tile/grid position (not pixel position).
  canvasSize,   //the visible width and height of the game viewport.
  children,
}: PropsWithChildren<ICameraProps>) => {
  const containerRef = useRef<PIXIGraphics>(null);  //: points to the PixiJS container that holds everything in your camera's view.

  const cameraPosition = useRef<{ x: number; y: number }>({    // The current pixel location of the camera's top-left (starts centered).
    x: canvasSize.width / 2,
    y: canvasSize.height / 2,
  });

  useTick(() => {
    if (containerRef.current) {
      // Find the camera's new target (puts hero at screen center)
      const targetX =
        canvasSize.width / 2 - heroPosition.x * TILE_SIZE * ZOOM - TILE_SIZE;
      const targetY =
        canvasSize.height / 2 - heroPosition.y * TILE_SIZE * ZOOM - TILE_SIZE;

      // Smoothly lerp the camera's x and y toward the target
      cameraPosition.current.x = lerp(cameraPosition.current.x, targetX);
      cameraPosition.current.y = lerp(cameraPosition.current.y, targetY);

      // Actually apply the movement to the Pixi container
      containerRef.current.x = cameraPosition.current.x;
      containerRef.current.y = cameraPosition.current.y;
    }
  });

  return (
    <Container ref={containerRef} scale={ZOOM}>
      {children}
    </Container>
  );
};

export default Camera;
