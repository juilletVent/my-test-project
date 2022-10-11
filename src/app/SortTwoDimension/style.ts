import { animated } from "react-spring";
import styled from "styled-components";

export const SortLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  align-items: stretch;
  padding: 20px;
  width: 850px;
  overflow: hidden;
  outline: 2px dashed #e9e9e9;
  border-radius: 3px;
`;

export const SortItem = styled(animated.div)`
  outline: 1px solid #e9e9e9;
  padding: 5px;
  user-select: none;
  touch-action: none;
  cursor: grab;
  background: white;

  img {
    width: 100%;
    height: 200px;
    pointer-events: none;
    object-fit: cover;
    /* filter: grayscale(100%) blur(5px); */
  }
`;
