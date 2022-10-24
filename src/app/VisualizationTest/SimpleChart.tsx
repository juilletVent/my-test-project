import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { shuffle } from "lodash";

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
`;
const Panel = styled.div``;
const PanelHeader = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;
const PanelTableLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(20px, 40px));
  gap: 6%;
`;
const TableItem = styled.div<{ val: number }>`
  position: relative;
  height: 200px;
  background-color: #e9e9e9;
  border-radius: 4px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: ${(props) => props.val}%;
    background: linear-gradient(#37c 50%, #3c7 0);
    border-radius: 4px;
    transition: 0.75s;
  }
`;
const TableItem2 = styled.div<{ val: number }>`
  position: relative;
  height: 200px;
  transition: --start-color 0.75s, --end-color 0.75s;
  --start-color: deepskyblue;
  --end-color: deeppink;
  background-image: linear-gradient(
    to bottom,
    var(--start-color),
    var(--end-color)
  );
  &:hover {
    --start-color: deeppink;
    --end-color: deepskyblue;
  }
  border-radius: 4px;
`;

function SimpleChart() {
  const [val, setVal] = useState([75, 55, 45, 88, 78]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVal(shuffle(val));
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Panel>
        <PanelHeader>CSS+渐变实现</PanelHeader>
        <PanelTableLayout>
          {val.map((v, index) => (
            <TableItem val={v} key={index} />
          ))}
        </PanelTableLayout>
      </Panel>
      <Panel>
        <PanelHeader>纯渐变实现</PanelHeader>
        <PanelTableLayout>
          {val.map((v, index) => (
            <TableItem2 val={v} key={index} />
          ))}
        </PanelTableLayout>
      </Panel>
    </Layout>
  );
}

export default SimpleChart;
