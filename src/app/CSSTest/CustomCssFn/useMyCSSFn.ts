import { useEffect } from "react";

interface CustomFnType {
  (amount: number | string, color: string): string;
}

// 设置自定义属性值的方法
function funKeywordColor2Rgba(
  node: HTMLElement,
  arrCssPropsValueIsKeyword: [string, string][],
  customFn: CustomFnType
) {
  if (
    node.nodeType !== 1 ||
    ["script", "style", "meta", "title", "head"].includes(
      node.nodeName.toLowerCase()
    )
  ) {
    return;
  }
  // 当前节点的所有样式对象
  var objStyle = window.getComputedStyle(node);

  if (node.dataset.cssfn) {
    const cssVars = node.dataset.cssfn.split(";");
    cssVars.forEach((cssVar) => {
      const cssVarItem = cssVar.split(":");
      const reg = new RegExp(`${customFn.name}\\(([\\w\\W]+)\\)`, "i");
      const matchs = cssVarItem[1].match(reg);
      if (!matchs) {
        return;
      }
      let [opacity, keyColor] = matchs[1].split(",");
      const varReg = /^var\((--\w+)\)$/;
      const matchs2 = keyColor.trim().match(varReg);
      if (matchs2) {
        keyColor = objStyle.getPropertyValue(matchs2[1]);
      }
      try {
        const applyColor = customFn(opacity, keyColor.trim());
        const oriColor = objStyle.getPropertyValue(`--${cssVarItem[0]}`);
        if (oriColor !== applyColor) {
          node.style.setProperty(`--${cssVarItem[0]}`, applyColor);
        }
      } catch (error) {
        // 静默失败
        console.error("静默失败");
      }
    });
    return;
  }

  // 所有设置了keyword()的自定义属性的遍历处理
  arrCssPropsValueIsKeyword.forEach(function (arr) {
    const cssProp = arr[0];

    // 判断当前元素是否设置了当前自定义属性
    let cssVarValueKeyword = objStyle.getPropertyValue(cssProp);

    if (
      !cssVarValueKeyword ||
      !cssVarValueKeyword.trim() ||
      !new RegExp(`${customFn.name}\\([\\w\\W]+\\)`, "i").test(
        cssVarValueKeyword
      )
    ) {
      return;
    }

    // 在dataset中存放原始表达式，后续更新时会使用到
    if (node.dataset.cssfn) {
      node.dataset.cssfn += `;${cssProp.substring(2)}:${arr[1]}`;
    } else {
      node.dataset.cssfn = `${cssProp.substring(2)}:${arr[1]}`;
    }

    cssVarValueKeyword = arr[1];

    // 解析与处理
    var keyColorAndOpacity = cssVarValueKeyword.replace(
      /\w+\(([\w\W]+)\)/,
      "$1"
    );
    var arrKeyColorAndOpacity = keyColorAndOpacity.split(/\s+/);

    if (/,/.test(keyColorAndOpacity)) {
      arrKeyColorAndOpacity = keyColorAndOpacity.split(",");
    } else if (/\//.test(keyColorAndOpacity)) {
      arrKeyColorAndOpacity = keyColorAndOpacity.split(",");
    }

    if (arrKeyColorAndOpacity.length !== 2) {
      return;
    }

    // 分出颜色和透明度
    var fnVal = (arrKeyColorAndOpacity[0] || "1").trim();
    var keyColor = arrKeyColorAndOpacity[1].trim();
    const varReg = /^var\((--\w+)\)$/;
    const matchs = keyColor.match(varReg);
    if (matchs) {
      keyColor = objStyle.getPropertyValue(matchs[1]);
    }
    const applyColor = customFn(fnVal, keyColor);
    node.style.setProperty(cssProp, applyColor);
  });
}

function updateStyle(
  currentList: NodeListOf<HTMLElement>,
  arrCssPropsValueIsKeyword: [string, string][],
  customFn: CustomFnType
) {
  currentList.forEach((item) => {
    funKeywordColor2Rgba(item, arrCssPropsValueIsKeyword, customFn);
  });
}

function funAutoInitAndWatching(
  monitorTarget: HTMLElement,
  arrCssPropsValueIsKeyword: [string, string][],
  customFn: CustomFnType
) {
  // 如果没有开启自动初始化，则返回
  document.querySelectorAll("*").forEach(function (ele) {
    funKeywordColor2Rgba(
      ele as HTMLElement,
      arrCssPropsValueIsKeyword,
      customFn
    );
  });
  // DOM Insert自动初始化
  if (window.MutationObserver) {
    var observerSelect = new MutationObserver(function (mutationsList) {
      mutationsList.forEach(function (mutation) {
        var nodeAdded = mutation.addedNodes;
        // 新增元素
        nodeAdded.forEach(function (eleAdd) {
          funKeywordColor2Rgba(
            eleAdd as HTMLElement,
            arrCssPropsValueIsKeyword,
            customFn
          );
        });
        // 现有元素的更新
        const currentItems =
          document.querySelectorAll<HTMLElement>("[data-cssfn]");
        updateStyle(currentItems, arrCssPropsValueIsKeyword, customFn);

        // 当前元素的更新
        funKeywordColor2Rgba(
          mutationsList[0].target as HTMLElement,
          arrCssPropsValueIsKeyword,
          customFn
        );
      });
    });

    observerSelect.observe(monitorTarget, {
      subtree: true,
      attributes: true,
    });

    return observerSelect;
  }
}

/**
 * 自定义CSS函数实现，可用以全局CSS函数注册，且响应Body CSS变量的动态更新
 * @param customFn 自定义CSS函数实现，必须是具名函数，函数名称将作为全局CSS函数注册
 */
export function useMyCSSFn(
  customFn: CustomFnType,
  monitorTarget = document.body
) {
  useEffect(() => {
    if (!window.CSS) {
      return;
    }
    if (!NodeList.prototype.forEach) {
      // @ts-ignore
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
    // 获取页面中所有的CSS自定义属性
    const isSameDomain = function (styleSheet: CSSStyleSheet) {
      if (!styleSheet.href) {
        return true;
      }
      return styleSheet.href.indexOf(window.location.origin) === 0;
    };
    const isStyleRule = function (rule: CSSStyleRule) {
      return rule.type === 1;
    };
    const arrCSSCustomProps: [string, string][] = (function () {
      return Array.from(document.styleSheets)
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
    })();

    // 使用了keyword()语法的CSS自定义属性名
    var arrCssPropsValueIsKeyword = arrCSSCustomProps.filter(function (
      arrPropVal
    ) {
      return new RegExp(`${customFn.name}\\([\\w\\W]+\\)`, "i").test(
        arrPropVal[1]
      );
    });

    let observer: MutationObserver | undefined;

    if (document.readyState !== "loading") {
      observer = funAutoInitAndWatching(
        monitorTarget,
        arrCssPropsValueIsKeyword,
        customFn
      );
    } else {
      window.addEventListener(
        "DOMContentLoaded",
        () =>
          (observer = funAutoInitAndWatching(
            monitorTarget,
            arrCssPropsValueIsKeyword,
            customFn
          ))
      );
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [customFn, monitorTarget]);
}
