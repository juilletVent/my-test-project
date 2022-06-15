import { useEffect } from "react";
import { convertCustomCssFn, CustomFnType } from "./convertCustomCssFn";

/**
 * 自定义CSS函数实现，可用以全局CSS函数注册，且响应Body CSS变量的动态更新
 * @param customFn 自定义CSS函数实现，必须是具名函数，函数名称将作为全局CSS函数注册
 * @param monitorTarget 响应动态变化监听的节点
 */
export function useMyCSSFn2(
  customFn: CustomFnType[] | CustomFnType
  // monitorTarget = document.body
) {
  useEffect(() => {
    // 自定义函数处理流程
    // 1、获取当前页面所有CSS变量定义
    // 2、检查哪些变量使用了自定义函数，筛选出来，形成暂存表，记录包含了自定义函数的CSS变量表
    // 3、检查所有文档元素，如果使用了上面暂存表中记录的自定义变量且变量值包含自定义CSS函数，则对变量定义进行求值并在该元素上覆盖定义，并将原始定义记录在dataset上，如果有多个则使用';'进行拼接，如果目标元素包含预设的dataset，则表示为更新，解析dataset上的原始表达式进行CSS变量更新
    // 注册MutationObserve监听目标变化，执行CSS变量计算刷新
    convertCustomCssFn(customFn);
  }, [customFn]);
}
