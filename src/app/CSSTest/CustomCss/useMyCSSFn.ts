import { useEffect } from "react";

interface CustomFnType {
  (amount: string | number, color: string): string;
}

/**
 * 自定义CSS函数实现，可用以全局CSS函数注册，且响应Body CSS变量的动态更新
 * @param customFn 自定义CSS函数实现，必须是具名函数，函数名称将作为全局CSS函数注册
 * @param monitorTarget 响应动态变化监听的节点
 */
export function useMyCSSFn(
  customFn: CustomFnType[] | CustomFnType,
  monitorTarget = document.body
) {
  useEffect(() => {
    // 绑定监听变化、初始化
  }, [customFn, monitorTarget]);
}
