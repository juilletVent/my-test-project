import { PageHeader, Tabs } from "antd";
import { useMemo, useState } from "react";
import styled from "styled-components";
import HoverCard from "./HoverCard/HoverCard";
import UseGesture from "./UseGesture/UseGesture";

const Layout = styled.div`
  padding: 50px;
  flex: auto;
  .ant-page-header {
    padding: 16px 0;
  }
`;

function JSTest() {
  const [active, setActive] = useState("b");

  const items = useMemo(
    () => [
      { label: "卡片跟随", key: "a", children: <HoverCard /> }, // 务必填写 key
      {
        label: "拖拽测试（@use-gesture/react）",
        key: "b",
        children: <UseGesture />,
      },
    ],
    []
  );

  return (
    <Layout>
      <PageHeader className="site-page-header" title="JS/库测试" />
      <Tabs activeKey={active} onChange={setActive} items={items} />
    </Layout>
  );
}

export default JSTest;
