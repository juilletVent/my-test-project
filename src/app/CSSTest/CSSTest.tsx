import React from "react";
import styled from "styled-components";

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
`;

function CSSTest() {
  return (
    <Layout>
      <h3 className="firstLetter">First-letter 演示选取第一个字符</h3>
      <h3 className="money">$ 89.9</h3>
      <h3 className="firstLine">
        First-line
        演示选取第一行;撑着油纸伞，独自彷徨在悠长，悠长又寂寥的雨巷，我希望逢着一个丁香一样地结着愁怨的姑娘。她是有丁香一样的颜色，丁香一样的芬芳，丁香一样的忧愁，在雨中哀怨，哀怨又彷徨；
      </h3>
    </Layout>
  );
}

export default CSSTest;
