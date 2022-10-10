import { animated } from "react-spring";
import styled from "styled-components";

export const SortLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  align-items: stretch;
`;

export const SortItem = styled(animated.div)`
  outline: 1px solid #e9e9e9;
  padding: 5px;
  user-select: none;
  cursor: grab;
  background: white;
  img {
    width: 100%;
    height: 200px;
    pointer-events: none;
    object-fit: cover;
  }
`;
