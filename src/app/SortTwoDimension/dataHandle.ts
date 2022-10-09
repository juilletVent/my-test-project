import { config } from "@react-spring/web";

type Opt = {
  order: number[];
  active?: boolean;
  curIndex?: number;
  activeOriginalIndex?: number;
  x?: number;
  y?: number;
};

export function getSpringConf(opt: Opt) {
  const {
    order,
    active = false,
    curIndex = 0,
    activeOriginalIndex = 0,
    x = 0,
    y = 0,
  } = opt;
  return (index: number) => {
    const springConf: any = {
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 0,
      shadow: 0,
      immediate: false,
    };

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
