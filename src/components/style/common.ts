import styled from "styled-components";
import { animated } from "react-spring";

const menuWidth = 300;

export const LeftMenu = styled.div`
  width: ${menuWidth}px;
  flex: none;
  ul {
    height: 100%;
  }
`;
export const ContentContainer = styled.div`
  width: calc(100% - ${menuWidth}px);
  min-height: 100vh;
  padding: 15px;
  .ant-list-items {
    position: relative;
    height: 285px;
  }
  .ant-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const DragBtn = styled.div`
  display: inline-block;
  padding: 5px;
  margin-left: 20px;
  cursor: move;
`;

export const AbsoluteItemLayout = styled(animated.div)`
  position: absolute;
  width: 100%;
  background-color: white;
`;
export const RelativeItemLayout = styled(animated.div)`
  position: relative;
  background-color: white;
`;

export const ContentLayout = styled.div`
  padding: 20px;
`;
