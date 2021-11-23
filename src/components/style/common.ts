import styled from "styled-components";

const menuWidth = 300;

export const LeftMenu = styled.div`
  width: ${menuWidth}px;
  height: 100%;
  ul {
    height: 100%;
  }
`;
export const ContentContainer = styled.div`
  width: calc(100vw - ${menuWidth}px);
  height: 100vh;
  padding: 15px;
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
