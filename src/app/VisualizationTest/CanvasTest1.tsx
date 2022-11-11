import { useEffect, useRef } from "react";
import styled from "styled-components";
import { random, memoize } from "lodash";
import { ContentPadding, GroupHeader } from "../../style/common.style";

const canvasWidth = 500;
const canvasHeight = 500;

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
function renderRotateRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  timeLine: number,
  offsetAngle: number,
  speed: number,
  color: string
) {
  const drawX = x * -0.5,
    drawY = y * -0.5;
  const currentAngle =
    (((speed * 0.5 * timeLine + offsetAngle) % 360) * Math.PI) / 180;

  // 创建绘制上下文快照
  ctx.save();
  // 将当前绘制坐标原点移动到画布中心
  ctx.translate(canvasWidth * 0.5, canvasHeight * 0.5);
  // 根据当前时间线对坐标轴进行旋转
  ctx.rotate(currentAngle);
  // ============== 开始绘制 ==============
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(drawX, drawY, size, size);
  ctx.fill();
  // ============== 绘制结束 ==============
  // 恢复绘制上下文快照
  ctx.restore();
}

const getRandomPosition = memoize((i: number) => [
  random(10, canvasWidth + 100),
  random(10, canvasHeight + 100),
]);
const getSize = memoize((i: number) => random(20, 80));
const getOffsetAngle = memoize((i: number) => random(0, 360));
const getSpeed = memoize((i: number) => random(0.01, 0.15, true));
const getColor = memoize(
  (i: number) =>
    `rgba(${random(0, 255)},${random(0, 255)},${random(200, 255)},${random(
      0,
      1,
      true
    )})`
);

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
    for (let i = 0; i < 100; i++) {
      const [x, y] = getRandomPosition(i);
      const size = getSize(i);
      const offsetAngle = getOffsetAngle(i);
      const speed = getSpeed(i);
      const color = getColor(i);
      renderRotateRect(ctx, x, y, size, timeLine, offsetAngle, speed, color);
    }
    if (nowTime - prevRenderTime >= 1000) {
      prevRenderTime = nowTime;
      fsp = timeLine - fspTimeLineCursor;
      fspTimeLineCursor = timeLine;
    }
    renderFPS(ctx, fsp);
    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);
  return () => renderController.abort();
}

function CanvasTest1() {
  const canvasNodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasNodeRef.current) {
      return canvasRender(canvasNodeRef.current);
    }
  }, []);

  return (
    <ContentPadding>
      <GroupHeader>Canvas 测试页1</GroupHeader>
      <Canvas ref={canvasNodeRef} />
    </ContentPadding>
  );
}

export default CanvasTest1;
