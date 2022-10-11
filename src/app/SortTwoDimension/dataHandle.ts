import { config } from "@react-spring/web";
import { arrayMove } from "../../utils/arrayMove";

type Opt = {
  order: number[];
  active?: boolean;
  activeOriginalIndex?: number;
  x?: number;
  y?: number;
  itemWidth: number;
  itemHeight: number;
  rowItemCount: number;
  cIndex?: number;
  offsetIndex?: number;
};

export function getSpringConf(opt: Opt) {
  const {
    order,
    active = false,
    activeOriginalIndex = 0,
    x = 0,
    y = 0,
    itemWidth = 0,
    itemHeight = 0,
    rowItemCount,
    cIndex,
    offsetIndex,
  } = opt;

  return (index: number) => {
    const springConf: any = {
      x: 0,
      y: 0,
      // scale: 1,
      zIndex: 0,
      shadow: 0,
    };

    const currentIndex = order.indexOf(index);
    /* 计算项目的原始网格坐标 */
    const ox = index % rowItemCount;
    const oy = Math.floor(index / rowItemCount);
    /* 计算项目当前网格坐标 */
    const cx = currentIndex % rowItemCount;
    const cy = Math.floor(currentIndex / rowItemCount);
    /* 原始坐标与当前坐标差 */
    const offsetX = (cx - ox) * itemWidth;
    const offsetY = (cy - oy) * itemHeight;

    springConf.x = offsetX;
    springConf.y = offsetY;

    if (active && activeOriginalIndex === index) {
      let calibrationX = 0,
        calibrationY = 0;
      // 根据偏移量减去数组重排造成的多余偏移
      if (cIndex !== undefined && offsetIndex !== undefined) {
        const targetOffsetX =
          ((cIndex + offsetIndex) % rowItemCount) - (cIndex % rowItemCount);
        const targetOffsetY =
          Math.floor((cIndex + offsetIndex) / rowItemCount) -
          Math.floor(cIndex / rowItemCount);
        calibrationX = targetOffsetX * itemWidth;
        calibrationY = targetOffsetY * itemHeight;
      }
      springConf.x += x - calibrationX;
      springConf.y += y - calibrationY;
      // springConf.scale = 1.005;
      springConf.zIndex = 1;
      springConf.shadow = 15;
      // springConf.immediate = (key: string) => key === "zIndex";
      springConf.immediate = true;
      springConf.config = (key: string) =>
        key === "y" ? config.stiff : config.default;
    }

    return springConf;
  };
}

export function calcOrder(
  order: number[],
  origionalIndex: number,
  offset: number,
  swap?: boolean
) {
  if (swap) {
    const nextArr = [...order];
    [nextArr[origionalIndex], nextArr[origionalIndex + offset]] = [
      nextArr[origionalIndex + offset],
      nextArr[origionalIndex],
    ];
    return nextArr;
  }
  return arrayMove(order, origionalIndex, origionalIndex + offset);
}

export function calcBounds(
  rowItemCount: number,
  cIndex: number,
  itemWidth: number,
  itemHeight: number,
  itemCount: number
) {
  const minX = (cIndex % rowItemCount) * -itemWidth - 20;
  const maxX = (rowItemCount - (cIndex % rowItemCount) - 1) * itemWidth + 20;
  const cRowIndex = Math.floor(cIndex / rowItemCount);
  const rowCount = Math.ceil(itemCount / rowItemCount);
  const minY = cRowIndex * -itemHeight - 20;
  const maxY = (rowCount - cRowIndex - 1) * itemHeight + 20;
  return [minX, maxX, minY, maxY];
}
