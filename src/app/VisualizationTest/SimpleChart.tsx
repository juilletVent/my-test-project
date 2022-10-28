import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { shuffle, sum } from "lodash";
import { getConicGradient } from "./utils";

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(250px, 1fr));
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
  grid-template-columns: repeat(auto-fill, minmax(10px, 30px));
  gap: 3%;
  svg {
    transform: rotateX(180deg);
    rect {
      transition: 1s;
    }
  }
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
const TableItem2 = styled.div.attrs<{ val: number }>((props) => ({
  style: {
    "--progress": `${100 - props.val}%`,
  },
}))<{ val: number }>`
  position: relative;
  height: 200px;
  transition: --start-color 0.75s, --end-color 0.75s, --progress 0.75s;
  --start-color: #37c;
  --end-color: #3c7;
  background-image: linear-gradient(
    to bottom,
    #e9e9e9 var(--progress),
    var(--start-color) 0,
    var(--start-color)
      calc(var(--progress) + calc(calc(100% - var(--progress)) / 2)),
    var(--end-color) 0
  );
  &:hover {
    --start-color: #3c7;
    --end-color: #37c;
  }
  border-radius: 4px;
`;
const pieDiameter = "220px";
const PieLayout = styled.div.attrs<{ itemPercentages: number[] }>((props) => ({
  style: {
    background: getConicGradient(props.itemPercentages),
  },
}))<{ itemPercentages: number[] }>`
  width: ${pieDiameter};
  height: ${pieDiameter};
  border-radius: ${pieDiameter};
  transform: rotate(1deg) translateZ(0);
`;

function SimpleChart() {
  const [val, setVal] = useState([75, 55, 45, 88, 78, 15, 29, 33]);
  const allCount = useMemo(() => sum(val), [val]);
  const itemPercentages = useMemo(
    () => val.map((i) => i / allCount),
    [allCount, val]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setVal(shuffle(val));
    }, 2000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Panel>
        <PanelHeader>DOM+渐变实现</PanelHeader>
        <PanelTableLayout>
          {val.map((v, index) => (
            <TableItem val={v} key={index} />
          ))}
        </PanelTableLayout>
      </Panel>
      <Panel>
        <PanelHeader>Css Houdini+渐变实现</PanelHeader>
        <PanelTableLayout>
          {val.map((v, index) => (
            <TableItem2 val={v} key={index} />
          ))}
        </PanelTableLayout>
      </Panel>
      <Panel>
        <PanelHeader>SVG 实现</PanelHeader>
        <PanelTableLayout>
          {val.map((v, index) => (
            <svg
              width="30"
              height="200"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              key={index}
            >
              {/* 背景层 */}
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="#d9d9d9"
                rx="5"
                ry="5"
              />
              {/* 第一层 */}
              <rect
                x="0"
                y="0"
                width="100%"
                height={`${v}%`}
                fill="#37c"
                rx="5"
                ry="5"
              />
              {/* 第二层 */}
              <rect
                x="0"
                y="0"
                width="100%"
                height={`${v / 2}%`}
                fill="#3c7"
                rx="5"
                ry="5"
              />
            </svg>
          ))}
        </PanelTableLayout>
      </Panel>
      <Panel>
        <PanelHeader>Css 径向渐变实现</PanelHeader>
        <PieLayout itemPercentages={itemPercentages} />
      </Panel>
    </Layout>
  );
}

export default SimpleChart;
