import { useEffect } from "react";
import styled from "styled-components";
import { runTest, sleep } from "./testTask";
import { compileTemplete, getSearch, parseSearch } from "./testUtils";

const Layout = styled.div`
  padding: 10px;
`;

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

  return (
    <Layout>
      <h3 className="firstLetter">JS Test Page</h3>
    </Layout>
  );
}

export default JSTest;
