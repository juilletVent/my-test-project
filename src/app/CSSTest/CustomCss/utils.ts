import { isArray } from "lodash";
import { CustomFnType } from "./convertCustomCssFn";

/** 用于存放预设表达式的的dataset键名 */
const DATASET_NAME = "customCssExpression";

/** 是否是样式规则 */
export function isStyleRule(rule: CSSStyleRule) {
  return rule.type === 1;
}

/** 是否是当前页面的样式 */
export function isSameDomain(styleSheet: CSSStyleSheet) {
  if (!styleSheet.href) {
    return true;
  }
  return styleSheet.href.indexOf(window.location.origin) === 0;
}

/** 获取当前页面所有的CSS变量定义 */
export function getAllCssVariables() {
  const arrCSSCustomProps: [string, string][] = Array.from(document.styleSheets)
    .filter(isSameDomain)
    .reduce(function (finalArr, sheet) {
      return finalArr.concat(
        Array.from<any>(sheet.cssRules)
          .filter(isStyleRule)
          .reduce(function (propValArr, rule) {
            var props = Array.from<any>(rule.style)
              .map(function (propName) {
                return [
                  propName.trim(),
                  rule.style.getPropertyValue(propName).trim(),
                ];
              })
              .filter(function ([propName]) {
                return propName.indexOf("--") === 0;
              });
            return ([] as any[]).concat(propValArr, props);
          }, [])
      );
    }, []);
  return arrCSSCustomProps;
}

/**
 * 获取当前页面哪些CSS变量使用了自定义函数
 * @param allVars 所有CSS变量定义
 * @param targetFnName 自定义函数名称组
 * @returns
 */
export function getAllUseCustom(
  allVars: [string, string][],
  targetFnName: string | string[]
) {
  const allFnName =
    typeof targetFnName === "string" ? targetFnName : targetFnName.join("|");
  const fnNamePattern = new RegExp(`(${allFnName})\\(.*\\)`);
  return allVars.filter((ruleItem) => ruleItem[1].match(fnNamePattern));
}

/**
 * 根据实际场景计算运行时CSS变量的值
 * @param objStyle 节点当前的样式计算值
 * @param cssValStr CSS变量定义值
 *
 */
export function calcColorVar(objStyle: CSSStyleDeclaration, cssValStr: string) {
  // css变量引用匹配模式
  const varReferencePattern = /var\((--[\w\d]+)\)/;
  let tempValStr = cssValStr;
  let matched: any = null;

  do {
    const matched = tempValStr.match(varReferencePattern);
    if (matched) {
      // 发现存在var变量引用，取得运行时CSS变量进行替换
      const varName = matched[1];
      tempValStr = tempValStr.replace(
        varReferencePattern,
        objStyle.getPropertyValue(varName)
      );
    }
  } while (matched);

  return tempValStr;
}

/**
 * 计算包含自定义CSS函数的CSS色值表达式
 * @param cssVarValForCurrentItem 色值字符串
 * @param fnNames 自定义函数名称组
 * @param customFnMap 自定义CSS函数-名称映射表
 */
export function calcColorCustomFn(
  cssVarValForCurrentItem: string,
  execPattern: RegExp,
  customFnMap: Map<string, CustomFnType>
) {
  const matched = cssVarValForCurrentItem.match(execPattern);
  if (matched) {
    const [all, fnName, paramsStr] = matched;
    if (!paramsStr.match(execPattern)) {
      // 未匹配到参数表存在嵌套调用，直接调用求值
      const params = paramsStr.split(",").map((i) => i.trim());
      return customFnMap.get(fnName)?.apply(null, params as any);
    }
  }
  return cssVarValForCurrentItem;
}

/**
 * 将CSS变量定义原始表达式写到DOM元素的dataset上
 * @param domNode
 * @param cssVarRule
 */
export function writeOriginalEexpression2Dataset(
  domNode: HTMLElement,
  cssVarRule: [string, string]
) {
  // 如果预设的dataset为空，直接写入即可
  if (!domNode.dataset[DATASET_NAME]) {
    domNode.dataset[DATASET_NAME] = cssVarRule.join(":");
    return;
  }
  // 如果存在，则判断是否已经存入原始表达式，如果没有则拼接上去
  if (!domNode.dataset[DATASET_NAME]!.includes(cssVarRule[0])) {
    domNode.dataset[DATASET_NAME] += `;${cssVarRule.join(":")}`;
  }
}

export function getVarValFromDataset(
  varName: string,
  domNode: HTMLElement
): string | null {
  const matchPattern = new RegExp(`${varName}:(.*?)(;|$)`);
  const matched = domNode.dataset[DATASET_NAME]?.match(matchPattern);
  if (matched) {
    return matched[1];
  }
  return null;
}

/**
 * 遍历所有潜在使用了自定义CSS函数的目标元素，在目标元素上进行CSS变量重定义（对自定义CSS函数求值）
 * @param useCustomFnVars 使用了自定义函数的CSS变量集合
 * @param customFnNames 自定义CSS函数集合
 */
export function redefineCssVarForEveryNode(
  useCustomFnCssVars: [string, string][],
  customCssFns: CustomFnType | CustomFnType[]
) {
  const fnNames = isArray(customCssFns)
    ? customCssFns.map((fn) => fn.name)
    : [customCssFns.name];
  // 自定义CSS函数名称-实现映射表
  const customFnMap = new Map<string, CustomFnType>(
    isArray(customCssFns)
      ? customCssFns.map((fn) => [fn.name, fn])
      : [[customCssFns.name, customCssFns]]
  );
  // 自定义CSS函数匹配模式
  const cssFnNamePattern = new RegExp(`(${fnNames.join("|")})`);
  const cssFnExecPattern = new RegExp(`(${fnNames.join("|")})\\((.*)\\)`);
  const allDocumentNodes = document.querySelectorAll<HTMLElement>("*");

  allDocumentNodes.forEach((domNode) => {
    // 跳过不需要处理的节点
    if (
      domNode.nodeType !== 1 ||
      ["script", "style", "meta", "title", "head"].includes(
        domNode.nodeName.toLowerCase()
      )
    ) {
      return;
    }

    // 遍历，判断传入的CSS变量在当前元素上是否有计算属性，并且使用了自定义CSS函数
    useCustomFnCssVars.forEach((cssVarRule) => {
      const [varName, varVal] = cssVarRule;
      // 取得CSS变量在当前元素的定义值
      const objStyle = window.getComputedStyle(domNode);

      // 如果有dataset相关记录则使用dataset记录的原始表达式，否则在运行时计算属性上取得原始表达式
      let cssVarValForCurrentItem =
        getVarValFromDataset(varName, domNode) ||
        objStyle.getPropertyValue(varName);

      // 检查定义值是否包含自定义CSS函数，如果不包含则该属性无需处理
      if (
        !cssVarValForCurrentItem ||
        !cssVarValForCurrentItem.trim() ||
        !cssFnNamePattern.test(cssVarValForCurrentItem)
      ) {
        return;
      }

      // mydarken222(0.05, var(--testColor))
      // 检查是否存在颜色引用，如果存在颜色引用，则对颜色引用进行求值替换
      // 颜色值已经被替换为了实际的运行时值，不需要再次对var函数进行处理了
      // const calcedVal = calcColorVal(objStyle, cssVarValForCurrentItem);

      // mydarken222(0.05, #1890ff)
      // 提取函数名、参数表，执行对应的函数进行求值
      const finalColor = calcColorCustomFn(
        cssVarValForCurrentItem,
        cssFnExecPattern,
        customFnMap
      );

      // 将原始表达式存放到dataset上
      writeOriginalEexpression2Dataset(domNode, cssVarRule);

      // 将已经计算好的CSS变量值，覆盖写回当前元素上
      domNode.style.setProperty(varName, finalColor!);
    });
  });
}
