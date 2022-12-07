import { random } from "lodash";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ContentPadding, GroupHeader } from "../../style/common.style";
import { Vector2D } from "../../utils/Vector2D";

const canvasWidth = 1500;
const canvasHeight = 800;
const [centerX, centerY] = [canvasWidth / 2, canvasHeight];

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

type DrawBranchOpt = {
  ctx: CanvasRenderingContext2D;
  /** 当前树枝基准向量 */
  baseVector: Vector2D;
  /** 当前树枝长度 */
  len: number;
  /** 当前树枝粗细 */
  thickness: number;
  /** 当前树枝偏转角度（相对于X轴，单位：弧度） */
  dir: number;
  /** 随机偏向因子，随机影响实际绘制偏转角度，越靠近根部这个值应该越大，越靠近树枝顶部这个值应该越小 */
  bias: number;
};

function drawBranch(opt: DrawBranchOpt) {
  const { ctx, baseVector, len, thickness, dir, bias } = opt;
  const nextVector = baseVector
    .copy()
    .rotate(dir)
    .normalize()
    .scale(len)
    .add(baseVector);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = thickness;
  ctx.beginPath();

  ctx.moveTo(baseVector.x, baseVector.y);
  ctx.lineTo(nextVector.x, nextVector.y);
  ctx.stroke();

  if (thickness < 5 && Math.random() < 0.3) {
    const th = Math.random() * 6 + 3;
    ctx.save();
    ctx.strokeStyle = "#c72c35";
    ctx.lineWidth = th;
    ctx.beginPath();
    ctx.moveTo(nextVector.x, nextVector.y);
    ctx.lineTo(nextVector.x, nextVector.y - 2);
    ctx.stroke();
    ctx.restore();
  }

  if (thickness > 3) {
    // 角度扩散比例
    const dirSpreadPercentage = random(0, bias, true);
    // 粗细收缩比例
    const thicknessShrinkPercentage = random(0.6, 0.8, true);
    // 长度收缩比例
    const lenShrinkPercentage = random(0.85, 0.9, true);

    const leftDir = Math.PI * dirSpreadPercentage;
    const rightDir = Math.PI * -dirSpreadPercentage;
    const nextThickness = thickness * thicknessShrinkPercentage;
    const nextLen = len * lenShrinkPercentage;

    drawBranch({
      ...opt,
      baseVector: nextVector,
      len: nextLen,
      thickness: nextThickness,
      dir: leftDir,
    });
    drawBranch({
      ...opt,
      baseVector: nextVector,
      len: nextLen,
      thickness: nextThickness,
      dir: rightDir,
    });
    drawBranch({
      ...opt,
      baseVector: nextVector,
      len: nextLen,
      thickness: nextThickness,
      dir: rightDir,
    });
  }
}

function renderEffect(canvasNode: HTMLCanvasElement) {
  // 变换坐标轴，以符合平常习惯的逻辑坐标进行绘制
  const ctx = canvasNode.getContext("2d")!;
  ctx.save();
  // 移动坐标原点
  ctx.translate(centerX, centerY);
  // 变换Y轴方向
  ctx.scale(1, -1);
  // 线段端点变为圆头
  ctx.lineCap = "round";

  // 绘制随机树
  drawBranch({
    ctx,
    baseVector: new Vector2D(1, 0),
    len: 120,
    thickness: 20,
    dir: Math.PI * 0.5,
    bias: 0.35,
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
