import styled, { keyframes } from "styled-components";
import { Input, List } from "antd";
import { ChangeEvent, useCallback, useEffect, useRef, MouseEvent } from "react";
import headerBg from "@/img/heart-animation.png";

const Layout = styled.div`
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
const heartAnim = keyframes`
  from {
    background-position-x: 0%;
  }
  to {
    background-position-x: 100%;
  }
`;
const Like = styled.div`
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
const SelectArea = styled.div`
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
const SelectArea2 = styled.div`
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

// export const AntsLineStyle = createGlobalStyle`
// .ants-line{
//   border:none;
//   background: linear-gradient(90deg, ${corpAntsColor} 50%, transparent 0) repeat-x,
//     linear-gradient(180deg, ${corpAntsColor} 50%, transparent 0) repeat-y,
//     linear-gradient(-90deg, ${corpAntsColor} 50%, transparent 0) repeat-x,
//     linear-gradient(0deg, ${corpAntsColor} 50%, transparent 0) repeat-y;
//   background-size: ${antsLen * 2}px ${antdWidth}px, ${antdWidth}px ${
//   antsLen * 2
// }px,
//     ${antsLen * 2}px ${antdWidth}px, ${antdWidth}px ${antsLen * 2}px;
//   background-position: 0 0, 100% 0, 0 100%, 0 0;
//   animation: ${antsLineAnim} 1s linear infinite;
// }
// `;

const data = [
  { key: "重庆 cq chongqing", title: "重庆" },
  { key: "北京 bj beijing", title: "北京" },
  { key: "莫斯科 msk mosike", title: "莫斯科" },
  { key: "伦敦 ld lundun", title: "伦敦" },
  { key: "华盛顿 hsd huashengdun", title: "华盛顿" },
];

function CSSTest() {
  const styleRef = useRef<HTMLStyleElement>();

  useEffect(() => {
    const styleNode = document.createElement("style");
    document.head.appendChild(styleNode);
    styleRef.current = styleNode;
  }, []);

  // 借助CSS选择器完成搜索：先匹配所有被选元素，然后则范围内反向选择搜索命中的元素，讲这些元素隐藏即可，关键在于:not的运用
  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (styleRef.current) {
      const val = e.target.value.trim();
      styleRef.current.innerHTML = !!val
        ? `[data-search]:not([data-search*="${e.target.value}"]){
        display:none;
      }`
        : "";
    }
  }, []);

  const onLick = useCallback((e: MouseEvent) => {
    // @ts-ignore
    e.target.style.animationPlayState = "running";
  }, []);

  return (
    <Layout>
      <h3 className="firstLetter">First-letter 演示选取第一个字符</h3>
      <h3 className="money">$ 89.9</h3>
      <h3 className="firstLine">
        First-line
        演示选取第一行;撑着油纸伞，独自彷徨在悠长，悠长又寂寥的雨巷，我希望逢着一个丁香一样地结着愁怨的姑娘。她是有丁香一样的颜色，丁香一样的芬芳，丁香一样的忧愁，在雨中哀怨，哀怨又彷徨；
      </h3>
      <div className="search">
        <Input placeholder="请输入区域名称" onChange={onSearch} />
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item data-search={item.key}>{item.title}</List.Item>
          )}
        />
      </div>
      <h4>填充风格</h4>
      <div className="input-fill-x">
        <input className="input-control input-fill" placeholder="邮箱" />
        <label className="input-label">邮箱</label>
      </div>
      <h4>轮廓风格</h4>
      <div className="input-outline-x">
        <input className="input-control input-outline" placeholder="邮箱" />
        <label className="input-label">邮箱</label>
      </div>
      <h4>文本域</h4>
      <div className="textarea-outline-x">
        <textarea
          className="input-control textarea-outline"
          cols={25}
          rows={3}
          placeholder="评论"
        ></textarea>
        <label className="input-label">评论</label>
      </div>
      <SelectArea>蚂蚁线</SelectArea>
      <SelectArea2 className="ants-line">蚂蚁线完美实现-可用于遮罩</SelectArea2>
      <Like onClick={onLick} />
    </Layout>
  );
}

export default CSSTest;
