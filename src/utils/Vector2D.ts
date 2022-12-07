export class Vector2D extends Array {
  constructor(x = 1, y = 0) {
    super(...[x, y]);
  }

  set x(v) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  /** 模长 */
  get length() {
    return Math.hypot(this.x, this.y);
  }

  /** 与X轴方向夹角（弧度） */
  get dir() {
    return Math.atan2(this.y, this.x);
  }

  /** 复制 */
  copy() {
    return new Vector2D(this.x, this.y);
  }

  /** 加法 */
  add(v: Vector2D) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /** 减法 */
  sub(v: Vector2D) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /** 缩放 */
  scale(a: number) {
    this.x *= a;
    this.y *= a;
    return this;
  }

  /** 叉乘 */
  cross(v: Vector2D) {
    return this.x * v.y - v.x * this.y;
  }

  /** 点乘 */
  dot(v: Vector2D) {
    return this.x * v.x + v.y * this.y;
  }

  /** 取得单位向量 */
  normalize() {
    return this.scale(1 / this.length);
  }

  /** 旋转 */
  rotate(rad: number) {
    const c = Math.cos(rad),
      s = Math.sin(rad);
    const [x, y] = this;

    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }
}
