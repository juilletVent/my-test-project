import { useEffect, useRef } from "react";
import styled from "styled-components";
import { hierarchy, HierarchyCircularNode, pack } from "d3-hierarchy";
import { ContentPadding, GroupHeader } from "../../style/common.style";

const canvasWidth = 512;
const canvasHeight = 512;

const data = {
  name: "中国",
  children: [
    {
      name: "浙江",
      children: [
        { name: "杭州" },
        { name: "宁波" },
        { name: "温州" },
        { name: "绍兴" },
      ],
    },
    { name: "广西", children: [{ name: "桂林" }, { name: "南宁" }] },
  ],
};

const Canvas = styled.canvas.attrs({
  width: canvasWidth,
  height: canvasHeight,
})`
  width: ${canvasWidth}px;
  height: ${canvasHeight}px;
  outline: 1px solid #d9d9d9;
`;

const TAU = 2 * Math.PI;
function drawNode(
  ctx: CanvasRenderingContext2D,
  node: HierarchyCircularNode<any>,
  style = { fillStyle: "rgba(0, 0, 0, 0.2)", textColor: "white" }
) {
  const { fillStyle, textColor } = style;
  const children = node.children;
  const { x, y, r } = node;
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
  if (children) {
    children.forEach((subNode) => {
      drawNode(ctx, subNode);
    });
  } else {
    const name = node.data.name;
    ctx.fillStyle = textColor;
    ctx.font = "1.5rem Arial";
    ctx.textAlign = "center";
    ctx.fillText(name, x, y);
  }
}

function renderBox(canvasNode: HTMLCanvasElement) {
  const ctx = canvasNode.getContext("2d")!;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const regions = hierarchy(data)
    .sum((d) => 1)
    .sort((a, b) => b?.value! - a?.value!);
  const myPack = pack().size([canvasWidth, canvasHeight]).padding(3);
  const root = myPack(regions);
  drawNode(ctx, root);
}

function CanvasTest2() {
  const canvasNodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasNodeRef.current) {
      renderBox(canvasNodeRef.current);
    }
  }, []);

  return (
    <ContentPadding>
      <GroupHeader>Canvas 测试页2</GroupHeader>
      <Canvas ref={canvasNodeRef} />
    </ContentPadding>
  );
}

export default CanvasTest2;
