import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 50px;
  padding: 50px;
`;

export const Card = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  transition: 0.3s;
  transform-origin: center;
  transform-style: preserve-3d;
  box-shadow: 0px 0px 5px #e9e9e9;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
`;
