import styled, { keyframes } from "styled-components";
import headerBg from "@/img/heart-animation.png";

export const Layout = styled.div`
  .lightTestColor {
    color: var(--lightTestColor);
  }
  padding: 10px;
  .firstLetter::first-letter {
    color: #1890ff;
    font-size: 1.5em;
    font-weight: bold;
  }
  .firstLine::first-line {
    color: #ca24bc;
  }
  .money {
    color: #d64b20;
    font-size: 16px;
    &::first-letter {
      font-size: 1.5em;
    }
  }
  .input-fill-x,
  .input-outline-x,
  .textarea-outline-x {
    width: fit-content;
    position: relative;
  }
  .input-fill-x {
    border-bottom: 1px solid #d0d0d5;
  }
  .input-fill-x::after {
    content: "";
    position: absolute;
    border-bottom: 2px solid #2486ff;
    left: 0;
    right: 0;
    bottom: -1px;
    transform: scaleX(0);
    transition: transform 0.25s;
  }
  .input-fill-x:focus-within::after {
    transform: scaleX(1);
  }
  .input-control {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
    outline: none;
  }
  .input-fill {
    padding: 20px 16px 6px;
    border: 1px solid transparent;
    background: #f5f5f5;
  }
  .input-outline,
  .textarea-outline {
    padding: 13px 16px 13px;
    border: 1px solid #d0d0d5;
    border-radius: 4px;
    transition: border-color 0.25s;
  }
  .input-outline:focus,
  .textarea-outline:focus {
    border-color: #2486ff;
  }
  /* 默认placeholder颜色透明不可见 */
  .input-control:placeholder-shown::placeholder {
    color: transparent;
  }
  .input-label {
    position: absolute;
    font-size: 16px;
    line-height: 1.5;
    left: 16px;
    top: 14px;
    color: #a2a9b6;
    padding: 0 2px;
    transform-origin: 0 0;
    pointer-events: none;
    transition: all 0.25s;
  }
  /* 线框样式label定位 */
  .input-control:not(:placeholder-shown) ~ .input-label,
  .input-control:focus ~ .input-label {
    color: #2486ff;
    transform: scale(0.75) translate(-2px, -32px);
  }
  /* 填充样式下label定位 */
  .input-fill:not(:placeholder-shown) ~ .input-label,
  .input-fill:focus ~ .input-label {
    transform: scale(0.75) translateY(-14px);
  }
  /* 线框交互下有个白色背景 */
  .input-outline ~ .input-label,
  .textarea-outline ~ .input-label {
    background-color: #fff;
  }
`;
/** 点赞动画实现 */
export const heartAnim = keyframes`
  from {
    background-position-x: 0%;
  }
  to {
    background-position-x: 100%;
  }
`;
export const Like = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${headerBg});
  background-size: 2900%;
  /* 阶跃函数在当前阶段 [n,n+1) 中取值为 n，应用变换 */
  /* animation: ${heartAnim} 1s steps(28,start) 1 both paused; */
  /* 阶跃函数在当前阶段中取值为 [n,n+1) 中取值为 n-a，在下一阶段取值为 a */
  animation: ${heartAnim} 1s steps(28) 1 both paused;
  cursor: pointer;
`;

/** 蚂蚁线实现-1 */
const lineColor = "#666";
const lineLen = "8px";
const lineAnim = keyframes`
  0% {
      background-position: 0 0;
  }
  100% {
      background-position: ${lineLen} 0;
  }
`;
export const SelectArea = styled.div`
  width: 500px;
  height: 100px;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(
      134deg,
      ${lineColor} 0%,
      ${lineColor} 24%,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 1) 49%,
      ${lineColor} 50%,
      ${lineColor} 74%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 1) 100%
    );
  background-size: 100% 100%, ${lineLen} ${lineLen};
  animation: ${lineAnim} 0.5s linear infinite;
`;

/** 蚂蚁线实现-2 */
const corpAntsColor = "#666";
const antsLen = 4;
const antdWidth = 1;
const antsLineAnim = keyframes`
  0% {
    background-position: 0 0, 100% 0, 0 100%, 0 0;
  }
  100% {
    background-position: ${antsLen * 2}px 0, 100% ${antsLen * 2}px, ${
  antsLen * -2
}px 100%, 0 ${antsLen * -2}px;
  }
`;
export const SelectArea2 = styled.div`
  width: 500px;
  height: 100px;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  margin: 10px 0;

  border: none;
  background: linear-gradient(90deg, ${corpAntsColor} 50%, transparent 0)
      repeat-x,
    linear-gradient(180deg, ${corpAntsColor} 50%, transparent 0) repeat-y,
    linear-gradient(-90deg, ${corpAntsColor} 50%, transparent 0) repeat-x,
    linear-gradient(0deg, ${corpAntsColor} 50%, transparent 0) repeat-y;
  background-size: ${antsLen * 2}px ${antdWidth}px,
    ${antdWidth}px ${antsLen * 2}px, ${antsLen * 2}px ${antdWidth}px,
    ${antdWidth}px ${antsLen * 2}px;
  background-position: 0 0, 100% 0, 0 100%, 0 0;
  animation: ${antsLineAnim} 1s linear infinite;
`;

export const TextStrock = styled.div`
  font-size: 60px;
  -webkit-text-stroke: 4px deeppink;
  letter-spacing: 4px;

  &[data-content]::before {
    content: attr(data-content);
    position: absolute;
    -webkit-text-stroke: 0;
    color: deepskyblue;
  }
`;

export const TextEmpgasisHeart = styled.span`
  font-size: 24px;
  text-emphasis: red "❤";
  text-emphasis-position: under right;
`;
export const TextOrientation = styled.p`
  font-size: 22px;
  /* 修改文字方向 */
  writing-mode: vertical-rl;
  /* 修改英文字符方向 */
  /* text-orientation: sideways;
  text-orientation: mixed;
  text-orientation: upright; */
  /* text-combine-upright: digits 4; */
  span {
    text-combine-upright: all;
  }
`;
export const CalcColor = styled.div`
  --useCustomFnColor: mydarken222(0.2, var(--testColor));
  color: var(--useCustomFnColor);
`;

export const CssPainTest = styled.div`
  --color1: #fff;
  --color2: #eee;
  --units: 16;
  margin: 15px 0;
  width: 400px;
  height: 400px;
  background-image: paint(transparent-grid);
  background-size: calc(var(--units) * 2px) calc(var(--units) * 2px);
  background-repeat: repeat repeat;
`;
