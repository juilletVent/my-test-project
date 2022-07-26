/* eslint-disable */
import { useInterval } from "./useInterval.hooks";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const borderRadius = "10px";
const perspectiveDepth = "160px";
const frontBeforeFlipDown = keyframes`
  0% {
    transform: perspective(${perspectiveDepth}) rotateX(0deg);
  }
  100% {
    transform: perspective(${perspectiveDepth}) rotateX(-180deg);
  }
  `;
const backAfterFlipDown = keyframes`
  0% {
    transform: perspective(${perspectiveDepth}) rotateX(180deg);
  }
  100% {
    transform: perspective(${perspectiveDepth}) rotateX(0deg);
  }
`;

const CenterLayout = styled.div`
  width: 100vw;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PlateItem = styled.div`
  position: relative;
  width: 60px;
  height: 100px;
  line-height: 100px;
  border: solid 1px #000;
  border-radius: ${borderRadius};
  background: #fff;
  font-size: 66px;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;

  .digital {
    &::before,
    &::after {
      content: attr(data-num) "";
      position: absolute;
      left: 0;
      right: 0;
      background: #000;
      overflow: hidden;
      box-sizing: border-box;
    }
    &::before {
      top: 0;
      bottom: 50%;
      border-radius: ${borderRadius} ${borderRadius} 0 0;
      border-bottom: solid 1px #666;
    }
    &::after {
      top: 50%;
      bottom: 0;
      border-radius: 0 0 ${borderRadius} ${borderRadius};
      line-height: 0;
    }
  }
  .front.digital::before,
  .back.digital::after {
    z-index: 2;
  }
  .back.digital::after {
    transform-origin: 50% 0;
    transform: perspective(${perspectiveDepth}) rotateX(180deg);
  }
  .front.digital::before {
    transform-origin: 50% 100%;
    animation: ${frontBeforeFlipDown} 0.7s ease-in-out both;
    backface-visibility: hidden;
  }
  .back.digital::after {
    animation: ${backAfterFlipDown} 0.7s ease-in-out both;
    backface-visibility: hidden;
  }
`;

function Test() {
  const [count, setCount] = useState(8);

  useInterval(() => {
    setCount(count - 1 > 0 ? count - 1 : 8);
  }, 1000);

  return (
    <CenterLayout>
      <PlateItem>
        <div key={`back${count}`} className="digital back" data-num={count} />
        <div
          key={`front${count}`}
          className="digital front"
          data-num={count + 1}
        />
      </PlateItem>
    </CenterLayout>
  );
}

export default Test;
