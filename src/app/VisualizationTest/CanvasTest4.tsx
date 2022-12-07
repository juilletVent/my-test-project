import { useEffect, useRef } from "react";
import styled from "styled-components";
// @ts-ignore
import rough from "roughjs/bundled/rough.esm";
import { ContentPadding, GroupHeader } from "../../style/common.style";
import { Vector2D } from "../../utils/Vector2D";

const canvasWidth = 500;
const canvasHeight = 256;

const Canvas = styled.canvas.attrs({
  width: canvasWidth,
  height: canvasHeight,
})`
  width: ${canvasWidth}px;
  height: ${canvasHeight}px;
  outline: 1px solid #d9d9d9;
`;

function renderFPS(ctx: CanvasRenderingContext2D, fsp: number) {
  ctx.save();
  ctx.font = "bold 16px Arial";
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "white";
  ctx.fillText(`FSP:${fsp}`, 5, 20);
  ctx.strokeText(`FSP:${fsp}`, 5, 20);
  ctx.restore();
}

function drawBranch(ctx: CanvasRenderingContext2D, v0: Vector2D) {}

function renderEffect(canvasNode: HTMLCanvasElement) {
  const rc = rough.canvas(canvasNode);
  // 线条样式配置：粗糙度、线宽、填充颜色
  const hillOpts = { roughness: 2.8, strokeWidth: 2, fill: "blue" };

  // 变换坐标轴，以符合平常习惯的逻辑坐标进行绘制
  const { ctx }: { ctx: CanvasRenderingContext2D } = rc;
  ctx.save();
  // 移动坐标原点
  ctx.translate(256, 256);
  // 变换Y轴方向
  ctx.scale(1, -1);
  // 线段端点变为圆头
  ctx.lineCap = "round";
  rc.path("M-180 0L-80 100L20 0", hillOpts);
  rc.path("M-20 0L80 100L180 0", hillOpts);
  rc.circle(0, 150, 105, {
    stroke: "red",
    strokeWidth: 4,
    fill: "rgba(255,255, 0, 0.4)",
    fillStyle: "solid",
  });
  ctx.restore();
}

function canvasRender(canvasNode: HTMLCanvasElement) {
  const renderController = new AbortController();
  const ctx = canvasNode.getContext("2d")!;
  let timeLine = 0;
  let prevRenderTime = performance.now();
  let fspTimeLineCursor = 0;
  let fsp = 0;
  const render = () => {
    if (renderController.signal.aborted) {
      return;
    }
    // 高精度时间的单位是毫秒（ms）
    const nowTime = performance.now();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    timeLine = (timeLine + 1) % (Number.MAX_SAFE_INTEGER - 1);

    // 绘制图形效果
    renderEffect(canvasNode);

    // 绘制FPS
    if (nowTime - prevRenderTime >= 500) {
      prevRenderTime = nowTime;
      fsp = Math.floor(timeLine - fspTimeLineCursor) * 2;
      fspTimeLineCursor = timeLine;
    }
    renderFPS(ctx, fsp);
    // window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);
  return () => renderController.abort();
}

function CanvasTest4() {
  const canvasNodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasNodeRef.current) {
      return canvasRender(canvasNodeRef.current);
    }
  }, []);

  return (
    <ContentPadding>
      <GroupHeader>Canvas 测试页4</GroupHeader>
      <Canvas ref={canvasNodeRef} />
    </ContentPadding>
  );
}

export default CanvasTest4;
