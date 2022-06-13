import { Button, Input, List } from "antd";
import { ChangeEvent, useCallback, useEffect, useRef, MouseEvent } from "react";
import { useMyCSSFn } from "./CustomCssFn/useMyCSSFn";
import { darken, lighten, transparentize } from "./CustomCssFn/utils";
import { Layout, Like, SelectArea, SelectArea2, TextStrock } from "./style";

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
  const switchColor = useCallback((e: MouseEvent) => {
    const currentColor = window
      .getComputedStyle(document.body)
      .getPropertyValue("--testColor");
    if (currentColor === "deepskyblue") {
      document.body.style.setProperty("--testColor", "deeppink");
      return;
    }
    document.body.style.setProperty("--testColor", "deepskyblue");
  }, []);

  useEffect(() => {
    document.body.style.setProperty("--testColor", "deeppink");
  }, []);

  useMyCSSFn(transparentize);
  useMyCSSFn(lighten);
  useMyCSSFn(darken);

  return (
    <Layout>
      <TextStrock data-content="Hello">Hello</TextStrock>
      <Button onClick={switchColor}>Switch Color</Button>
      <h3 style={{ color: "var(--transparentizeTestColor)" }}>
        --transparentizeTestColor
      </h3>
      <h3 style={{ color: "var(--lightTestColor)" }}>--lightTestColor</h3>
      <h3 style={{ color: "var(--darkenTestColor)" }}>--darkenTestColor</h3>
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
