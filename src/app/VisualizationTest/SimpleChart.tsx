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
  transition: 0.75s;
  --percentage: gray;
  transition: 0.75s;
  /* #e9e9e9 calc(calc(100 - var(--percentage)) + "%"), */
  /* background-image: linear-gradient(to bottom, var(--percentage), #37c); */
  --start-stop: olive;
  --end-stop: green;
  background: linear-gradient(to bottom, var(--start-stop), var(--end-stop));
  /* transition: --start-stop 0.5s, --end-stop 0.5s; */
  &:hover {
    --start-stop: green;
    --end-stop: purple;
  }

  /* 
  #37c calc(calc(100 - var(--percentage)) + calc(var(--percentage) / 2) + "%"),
    #3c7 0
  */
  /* #37c ${(props) => 100 - props.val + props.val / 2}%, */
  /* background-image: linear-gradient(
    to bottom,
    #e9e9e9 ${(props) => 100 - props.val}%,
    #37c 0,
    #37c ${(props) => 100 - props.val + props.val / 2}%,
    #3c7 0
  ); */
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
