import { sum } from "lodash";

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
