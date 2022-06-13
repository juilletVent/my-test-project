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

/** 获取当前页面哪些CSS变量使用了自定义函数 */
export function getAllUseCustom() {
  // TODO
}
