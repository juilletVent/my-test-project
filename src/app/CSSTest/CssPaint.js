/* eslint-disable */
registerPaint(
  "transparent-grid",
  class {
    // 必须声明，不声明的话，paint中获取不到对应的变量
    static get inputProperties() {
      return [
        '--color1',
        '--color2',
        '--units',
      ]
    }
    paint(context, size, properties) {
      // 两个格子颜色
      var color1 = properties.get('--color1').toString();
      var color2 = properties.get('--color2').toString();
      // 格子尺寸
      var units = Number(properties.get('--units'));

      context.fillStyle = color1;
      context.fillRect(0, 0, units, units);
      context.fillRect(units, units, units, units);
      // 两个灰色格子
      context.fillStyle = color2;
      context.fillRect(0, units, units, units);
      context.fillRect(units, 0, units, units);
    }
  }
);
