import styled from "styled-components";
import { animated } from "react-spring";

export const UseGestureLayout = styled.div`
  border: 2px dashed #dfdfdf;
  min-height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;
export const DragImg = styled(animated.img)`
  width: 200px;
  height: 250px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  transition: 0.3s;
  transform-origin: center;
  transform-style: preserve-3d;
  box-shadow: 0px 0px 5px #e9e9e9;
  object-fit: cover;
  touch-action: none;
  user-select: none;
  pointer-events: none;
  &:hover {
    border: 1px solid #68c4f0;
  }
`;

export const DragImgContainer = styled(animated.div)`
  display: inline-block;
  border-radius: 16px;
  cursor: grab;
  position: relative;
  touch-action: none;
  user-select: none;
  z-index: 10000;
`;
