import { PageHeader, Tabs } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import HoverCard from "./HoverCard/HoverCard";
import { runTest, sleep } from "./testTask";
import { compileTemplete, getSearch, parseSearch } from "./testUtils";

const Layout = styled.div`
  padding: 50px;
  flex: auto;
`;

const { TabPane } = Tabs;

function JSTest() {
  useEffect(() => {
    runTest();
    sleep(2000).then(() => {
      console.log("logged after 2 seconds.");
    });
    console.log("parseSearch：", parseSearch("?a=1&b=45425145"));
    console.log("getSearch：%s", getSearch({ a: 1, b: "45425145" }));
    console.log(
      "compileTemplete：%s",
      compileTemplete("name:{{ name }}, title: {{ title }}", {
        name: "Jack",
        title: "Title",
      })
    );
  }, []);

  const [active, setActive] = useState("hoverCard");

  return (
    <Layout>
      <PageHeader className="site-page-header" title="Title" />
      <Tabs key={active} onChange={setActive}>
        <TabPane tab="hoverCard" key="hoverCard">
          <HoverCard />
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default JSTest;
