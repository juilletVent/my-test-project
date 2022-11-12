import { hierarchy, pack } from "d3-hierarchy";
import { sum } from "lodash";

export const canvasWidth = 1024;
export const canvasHeight = 1024;
export const luminancePercentage = "50%";
export const saturationPercentage = "83%";

export function getCurrentPercentage(
  index: number,
  percentages: number[],
  allCount: number
) {
  return (sum(percentages.slice(0, index + 1)) / allCount) * 360;
}
export function getConicGradient(percentages: number[]) {
  const itemCount = percentages.length;
  const allCount = sum(percentages);

  const colorTags: string[] = percentages.reduce(
    (prev, _, index) => [
      ...prev,
      `hsl(${
        (index / itemCount) * 360
      },${saturationPercentage},${luminancePercentage}) ${
        index - 1 < 0
          ? 0
          : getCurrentPercentage(index - 1, percentages, allCount) + 0.5
      }deg,hsl(${
        (index / itemCount) * 360
      },${saturationPercentage},${luminancePercentage}) ${getCurrentPercentage(
        index,
        percentages,
        allCount
      )}deg`,
    ],
    [] as string[]
  );
  let gradientTpl = `conic-gradient(${colorTags})`;
  return gradientTpl;
}

export const regionData = {
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
    {
      name: "广西",
      children: [
        { name: "桂林" },
        { name: "南宁" },
        { name: "柳州" },
        { name: "防城港" },
      ],
    },
    {
      name: "黑龙江",
      children: [
        { name: "哈尔滨" },
        { name: "齐齐哈尔" },
        { name: "牡丹江" },
        { name: "大庆" },
      ],
    },
    {
      name: "新疆",
      children: [
        { name: "乌鲁木齐" },
        { name: "克拉玛依" },
        { name: "吐鲁番" },
        { name: "哈密" },
      ],
    },
    {
      name: "河北",
      children: [
        { name: "石家庄" },
        { name: "唐山" },
        { name: "邯郸" },
        { name: "秦皇岛" },
      ],
    },
    {
      name: "西藏",
      children: [{ name: "拉萨" }, { name: "昌都" }, { name: "林芝" }],
    },
    {
      name: "江苏",
      children: [
        { name: "南京" },
        { name: "无锡" },
        { name: "徐州" },
        { name: "常州" },
        { name: "连云港" },
        { name: "淮安" },
      ],
    },
    {
      name: "江苏",
      children: [
        { name: "南京" },
        { name: "无锡" },
        { name: "徐州" },
        { name: "常州" },
        { name: "连云港" },
        { name: "淮安" },
      ],
    },
    {
      name: "湖南",
      children: [
        { name: "长沙" },
        { name: "株洲" },
        { name: "湘潭" },
        { name: "衡阳" },
        { name: "邵阳" },
        { name: "岳阳" },
      ],
    },
    {
      name: "海南",
      children: [{ name: "海口" }, { name: "三亚" }, { name: "三沙" }],
    },
    {
      name: "陕西",
      children: [
        { name: "西安" },
        { name: "咸阳" },
        { name: "汉中" },
        { name: "安康" },
        { name: "榆林" },
        { name: "延安" },
      ],
    },
    {
      name: "甘肃",
      children: [
        { name: "兰州" },
        { name: "酒泉" },
        { name: "金昌" },
        { name: "天水" },
        { name: "嘉峪关" },
        { name: "武威" },
      ],
    },
  ],
};

// 使用D3计算层次图数据
export function getHierarchyData(data: any) {
  const regions = hierarchy(data)
    .sum((d) => 1)
    .sort((a, b) => b?.value! - a?.value!);
  const myPack = pack().size([canvasWidth, canvasHeight]).padding(3);
  return myPack(regions);
}
