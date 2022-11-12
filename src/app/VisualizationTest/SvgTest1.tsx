import { HierarchyCircularNode } from "d3-hierarchy";
import React, { useCallback, useEffect, useRef } from "react";
import { ContentPadding, GroupHeader } from "../../style/common.style";
import {
  canvasHeight,
  canvasWidth,
  getHierarchyData,
  regionData,
} from "./utils";

const NS = "http://www.w3.org/2000/svg";

function renderCircle(nodeData: HierarchyCircularNode<any>) {
  const { x, y, r } = nodeData;
  const circleNode = document.createElementNS(NS, "circle");
  circleNode.setAttribute("cx", x.toString());
  circleNode.setAttribute("cy", y.toString());
  circleNode.setAttribute("r", r.toString());
  // circleNode.setAttribute("fill", "rgba(0,0,0,0.2)");
  return circleNode;
}

function renderText(nodeData: HierarchyCircularNode<any>, toTop?: boolean) {
  const { x, y, r, data } = nodeData;
  // 添加文字
  const textNode = document.createElementNS(NS, "text");
  textNode.setAttribute("fill", "white");
  textNode.setAttribute("font-family", "Arial");
  textNode.setAttribute("font-size", toTop ? "26px" : "18px");
  textNode.setAttribute("text-anchor", "middle");
  textNode.setAttribute("x", x.toString());
  textNode.setAttribute("y", toTop ? (y - r * 0.75).toString() : y.toString());
  textNode.textContent = data.name;

  return textNode;
}

function renderNode(nodeData?: HierarchyCircularNode<any>) {
  const rootNode = nodeData ? nodeData : getHierarchyData(regionData);
  const children = rootNode.children;
  const group = document.createElementNS(NS, "g");
  group.setAttribute("fill", "rgba(0,0,0,0.2)");
  const circleNode = renderCircle(rootNode);
  group.appendChild(circleNode);
  if (!children) {
    const textNode = renderText(rootNode);
    group.appendChild(textNode);
    return group;
  } else {
    group.appendChild(renderText(rootNode, true));
  }

  children.forEach((child) => {
    const childCircle = renderNode(child);
    group.appendChild(childCircle);
  });

  return group;
}

function SvgTest1() {
  const rootRef = useRef<SVGSVGElement>(null);
  const activeSvgNodeRef = useRef<any>(null);
  const onMouseMove = useCallback((event: any) => {
    let target = event.target!;
    console.log("target: ", target);
    if (["circle", "text"].includes(target.nodeName)) {
      target = target.parentNode;
    }
    target.setAttribute("fill", "deeppink");
    if (activeSvgNodeRef.current && activeSvgNodeRef.current !== target) {
      activeSvgNodeRef.current.setAttribute("fill", "rgba(0,0,0,0.2)");
    }
    activeSvgNodeRef.current = target;
  }, []);

  useEffect(() => {
    if (rootRef.current) {
      const svgRoot = rootRef.current;
      const svgNode = renderNode();
      svgRoot.appendChild(svgNode);
      return () => {
        svgRoot.removeChild(svgNode);
      };
    }
  }, []);

  return (
    <ContentPadding>
      <GroupHeader>SVG 测试页面</GroupHeader>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="200"
        viewBox="0 0 300 100"
        style={{
          border: "3px solid #ccc",
          borderRadius: 15,
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#ccc"
          stroke-width="2"
          fill="red"
        />
        <circle
          cx="150"
          cy="50"
          r="40"
          stroke="#ccc"
          stroke-width="2"
          fill="yellow"
        />
        <circle
          cx="250"
          cy="50"
          r="40"
          stroke="#ccc"
          stroke-width="2"
          fill="green"
        />
      </svg>
      <svg
        onMouseMove={onMouseMove}
        ref={rootRef}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={canvasWidth}
        height={canvasHeight}
      ></svg>
    </ContentPadding>
  );
}

export default SvgTest1;
