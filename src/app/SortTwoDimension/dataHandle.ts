import { config } from "@react-spring/web";

type Opt = {
  order: number[];
  active?: boolean;
  activeOriginalIndex?: number;
  x?: number;
  y?: number;
  itemWidth?: number;
  itemHeight?: number;
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
  } = opt;
  return (index: number) => {
    const springConf: any = {
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 0,
      shadow: 0,
      immediate: active,
    };

    const currentIndex = order.indexOf(index);
    console.log("currentIndex: ", currentIndex);
    console.log(order);
    if (index !== currentIndex) {
      // 当前位置与原始位置不同，需要进行定位
      if (currentIndex > index) {
        const offsetX = ((currentIndex % 3) - index) * itemWidth;
        // const offsetY = (currentIndex - index - (currentIndex % 3)) * itemHeight;
        springConf.x = offsetX;
      }
      // springConf.y = 0;
    }
    if (active && activeOriginalIndex === index) {
      springConf.x = x;
      springConf.y = y;
      springConf.scale = 1.005;
      springConf.zIndex = 1;
      springConf.shadow = 15;
      springConf.immediate = (key: string) => key === "zIndex";
      springConf.config = (key: string) =>
        key === "y" ? config.stiff : config.default;
    }

    return springConf;
  };
}
