import { isArray } from "lodash";
import {
  getAllCssVariables,
  getAllUseCustom,
  redefineCssVarForEveryNode,
} from "./utils";

export interface CustomFnType {
  (amount: string | number, color: string): string;
}

export function convertCustomCssFn(customFns: CustomFnType | CustomFnType[]) {
  // 获取当前页面所有的自定义CSS变量定义（style标签内的，内联形式的定义不被统计在内）
  const allCssVar = getAllCssVariables();

  // 检查哪些变量使用了自定义函数，筛选出来，形成暂存表，记录包含了自定义函数的CSS变量表
  const fnNames = isArray(customFns)
    ? customFns.map((f) => f.name)
    : [customFns.name];
  const usedCustomFnVars = getAllUseCustom(allCssVar, fnNames);

  // 检查所有文档元素，如果使用了上面暂存表中记录的自定义变量且变量值包含自定义CSS函数，
  // 则对变量定义进行求值并在该元素上覆盖定义，并将原始定义记录在dataset上，如果有多个
  // 则使用';'进行拼接，如果目标元素包含预设的dataset，则表示为更新，解析dataset上的
  // 原始表达式进行CSS变量更新
  redefineCssVarForEveryNode(usedCustomFnVars, customFns);
}
