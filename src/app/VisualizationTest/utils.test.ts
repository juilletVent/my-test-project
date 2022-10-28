import {
  getConicGradient,
  getCurrentPercentage,
  luminancePercentage,
  saturationPercentage,
} from "./utils";

test("getCurrentPercentage test group", () => {
  expect(getCurrentPercentage(0, [5, 5, 5], 15)).toBe(120);
  expect(getCurrentPercentage(1, [5, 5, 5], 15)).toBe(240);
  expect(getCurrentPercentage(2, [5, 5, 5], 15)).toBe(360);
});

test("getConicGradient test group", () => {
  expect(getConicGradient([5, 5])).toBe(
    `conic-gradient(hsl(0,${saturationPercentage},${luminancePercentage}) 0deg,hsl(0,${saturationPercentage},${luminancePercentage}) 180deg,hsl(180,${saturationPercentage},${luminancePercentage}) 180.5deg,hsl(180,${saturationPercentage},${luminancePercentage}) 360deg)`
  );
  expect(getConicGradient([5, 5, 5])).toBe(
    `conic-gradient(hsl(0,${saturationPercentage},${luminancePercentage}) 0deg,hsl(0,${saturationPercentage},${luminancePercentage}) 120deg,hsl(120,${saturationPercentage},${luminancePercentage}) 120.5deg,hsl(120,${saturationPercentage},${luminancePercentage}) 240deg,hsl(240,${saturationPercentage},${luminancePercentage}) 240.5deg,hsl(240,${saturationPercentage},${luminancePercentage}) 360deg)`
  );
});
