import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { ContentPadding, GroupHeader } from "../../style/common.style";

const canvasWidth = 500;
const canvasHeight = 500;

const Canvas = styled.canvas.attrs({
  width: canvasWidth,
  height: canvasHeight,
})`
  width: ${canvasWidth}px;
  height: ${canvasHeight}px;
  outline: 1px solid #d9d9d9;
`;

// 顶点着色器
const vertex = `
  attribute vec2 position;
  varying vec3 color;

  void main() {
    gl_PointSize = 1.0;
    color = vec3(0.5 + position * 0.5, 0.0);
    gl_Position = vec4(position * 0.5, 1.0, 1.0);
  }
`;
// 片段着色器
const fragment = `
  precision mediump float;
  varying vec3 color;

  void main()
  {
    gl_FragColor = vec4(color, 1.0);
  }     
`;

function createCircleVertex(x: number, y: number, r: number, n: number) {
  const sin = Math.sin;
  const cos = Math.cos;
  const perAngel = (2 * Math.PI) / n;
  const positionArray = [];
  for (let i = 0; i < n; i++) {
    const angel = i * perAngel;
    const nx = x + r * cos(angel);
    const ny = y + r * sin(angel);
    positionArray.push(nx, ny);
  }
  return new Float32Array(positionArray);
}

function renderWebGL(gl: WebGLRenderingContext) {
  // 创建顶点着色器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);
  // 创建片段着色器
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragmentShader, fragment);
  gl.compileShader(fragmentShader);

  // 创建gl主体程序
  const program = gl.createProgram()!;
  // 绑定着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 链接&使用主体程序
  gl.linkProgram(program);
  gl.useProgram(program);

  // 顶点数据
  const points = new Float32Array(createCircleVertex(0, 0, 1, 6));
  // 将定点数据写入缓冲区
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

  // 获取顶点着色器中的position变量的地址;
  const vPosition = gl.getAttribLocation(program, "position");
  // 给变量设置长度和类型;
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  // 激活这个变量;
  gl.enableVertexAttribArray(vPosition);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINE_LOOP, 0, points.length / 2);
}

function WebGLTest1() {
  const canvasNodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasNodeRef.current) {
      const gl = canvasNodeRef.current.getContext("webgl")!;
      renderWebGL(gl);
    }
  }, []);

  return (
    <ContentPadding>
      <GroupHeader>Canvas 测试页1</GroupHeader>
      <Canvas ref={canvasNodeRef} />
    </ContentPadding>
  );
}

export default WebGLTest1;
