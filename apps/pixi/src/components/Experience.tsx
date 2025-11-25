import { Stage } from "@pixi/react";
import useDimensions from "../hook/useDimensions";

import MainContainer from "./MainContainer";

const Experience = () => {
  const canvasSize = useDimensions();

  return (
    <>
      <Stage height={canvasSize.height} width={canvasSize.width}>
        <MainContainer canvasSize={canvasSize} />
      </Stage>
    </>
  );
};

export default Experience;
