import { Sprite, useTick } from "@pixi/react";
import { useState } from "react";
import { useControls } from "../hook/useControls";
import heroImage from "../assets/hero.png";

const Hero = () => {
  const [postions, setPostions] = useState({ x: 0, y: 0 });
  const { getControlsDirection } = useControls();

  useTick(() => {
    const { pressedKeys } = getControlsDirection();
    setPostions((prev) => {
      const { x, y } = prev;

      let dx = 0;
      let dy = 0;

      if (pressedKeys.includes("UP")) dy -= 1;
      if (pressedKeys.includes("DOWN")) dy += 1;
      if (pressedKeys.includes("RIGHT")) dx += 1;
      if (pressedKeys.includes("LEFT")) dx -= 1;

      const magnitude = Math.sqrt(dx * dx + dy * dy);
      if (magnitude > 0) {
        dx = dx / magnitude;
        dy = dy / magnitude;
      }

      return { x: x + dx, y: y + dy };
    });
  });
  return (
    <>
      <Sprite image={heroImage} x={postions.x} y={postions.y} />
    </>
  );
};

export default Hero;
