// 反序列化Search
export function parseSearch<T = any>(url: string): T {
  const paramsReg = /(?:[^?&=]+)=(?:[^?&=#]+)/g;
  const matches = url.match(paramsReg);
  const obj: any = {};

  if (!matches) {
    return obj as T;
  }

  for (const item of matches) {
    const [key, val] = item.split("=");
    obj[key] = val;
  }

  return obj as T;
}

// 序列化Search
export function getSearch<T extends Object>(payload: T) {
  const mapKeyVal = Object.entries(payload);
  return `?${mapKeyVal.map((item) => item.join("=")).join("&")}`;
}

// 双花括号模板替换
export function compileTemplete(tpl: string, data: Object) {
  const mapKeyVal = Object.entries(data);
  let targetTpl = tpl;
  mapKeyVal.forEach(([key, val]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    targetTpl = targetTpl.replace(regex, val);
  });

  return targetTpl;
}
