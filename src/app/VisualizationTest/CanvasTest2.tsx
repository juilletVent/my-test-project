import { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  hierarchy,
  HierarchyCircularNode,
  HierarchyPointNode,
  tree,
} from "d3-hierarchy";
import { ContentPadding, GroupHeader } from "../../style/common.style";
import {
  canvasHeight,
  canvasWidth,
  getHierarchyData,
  regionData,
} from "./utils";

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
    const fontSize = 50;
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(node.data.name, x, y + fontSize * 0.35 - r * 0.7);
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
  const root = getHierarchyData(regionData);
  drawNode(ctx, root);
}

function drawTreeNode(
  ctx: CanvasRenderingContext2D,
  node: HierarchyPointNode<any>
) {
  const { x, y, data, children } = node;
  ctx.save();
  ctx.fillStyle = "deeppink";
  ctx.font = `32px Arial`;
  ctx.fillText(data.name, y + 50, x);
  ctx.restore();
  if (children) {
    children.forEach((child) => {
      const { x: cx, y: cy } = child;
      ctx.moveTo(y, x);
      ctx.lineTo(cy, cx);
      ctx.stroke();
      drawTreeNode(ctx, child);
    });
  }
}

function renderTree(canvasNode: HTMLCanvasElement) {
  const ctx = canvasNode.getContext("2d")!;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.save();
  ctx.translate(canvasWidth * 0.5, canvasHeight * 0.5);

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#ccc";
  ctx.setLineDash([4, 4, 8, 4]);
  ctx.moveTo(0, canvasHeight * -0.5);
  ctx.lineTo(0, canvasHeight * 0.5);
  ctx.moveTo(canvasWidth * -0.5, 0);
  ctx.lineTo(canvasWidth * 0.5, 0);
  ctx.stroke();
  ctx.restore();

  const regions = hierarchy(regionData)
    .sum((d) => 1)
    .sort((a, b) => b?.value! - a?.value!);
  const root = tree().size([canvasWidth, canvasHeight])(regions);
  console.log("root: ", root);

  drawTreeNode(ctx, root);
  // ctx.fillStyle = "deeppink";
  // ctx.font = `${fontSize}px Arial`;
  // const fontSize = 50;
  // ctx.textAlign = "center";
  // ctx.fillText("Hello World", 0, fontSize * 0.35);
}

function CanvasTest2() {
  const canvasNodeRef = useRef<HTMLCanvasElement>(null);
  const treeNodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasNodeRef.current) {
      renderBox(canvasNodeRef.current);
    }
    if (treeNodeRef.current) {
      renderTree(treeNodeRef.current);
    }
  }, []);

  return (
    <ContentPadding>
      <GroupHeader>Canvas 测试页2</GroupHeader>
      <Canvas ref={canvasNodeRef} />
      <Canvas ref={treeNodeRef} />
    </ContentPadding>
  );
}

export default CanvasTest2;
