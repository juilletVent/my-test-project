import { Form, Switch } from "antd";
import { useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { DragImgContainer, DragImg, UseGestureLayout } from "./style";
import img from "@/img/93299460_p0.png";
import { useCallback, useEffect, useRef, useState } from "react";
import { clamp } from "lodash";

function UseGesture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPos = useRef({
    x: 0,
    y: 0,
    containerWidth: 0,
    containerHeight: 0,
  });
  const [dragIng, setDragIng] = useState(false);
  const [restore, setRestore] = useState(true);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    const horizontalMaxOffset = (currentPos.current.containerWidth - 200) / 2;
    const verticalMaxOffset = (currentPos.current.containerHeight - 250) / 2;
    const [nextX, nextY] = [
      clamp(
        mx + currentPos.current.x,
        -horizontalMaxOffset,
        horizontalMaxOffset
      ),
      clamp(my + currentPos.current.y, -verticalMaxOffset, verticalMaxOffset),
    ];
    api.start({
      x: down || !restore ? nextX : 0,
      y: down || !restore ? nextY : 0,
      immediate: down,
    });
    if (!down) {
      currentPos.current.x = restore ? 0 : nextX;
      currentPos.current.y = restore ? 0 : nextY;
    }
  });
  const onValuesChange = useCallback((vals: any) => {
    console.log("vals: ", vals);
  }, []);

  useEffect(() => {
    if (restore) {
      api.start({
        x: 0,
        y: 0,
      });
      currentPos.current.x = 0;
      currentPos.current.y = 0;
    }
  }, [restore, api]);

  useEffect(() => {
    if (containerRef.current) {
      const containerNode = containerRef.current;
      var ro = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const cr = entry.contentRect;
          currentPos.current.containerWidth = cr.width;
          currentPos.current.containerHeight = cr.height;
        }
      });
      ro.observe(containerNode);
      return () => {
        ro.unobserve(containerNode);
      };
    }
  }, []);

  return (
    <>
      <Form onValuesChange={onValuesChange}>
        <Form.Item label="归中" valuePropName="restore">
          <Switch onChange={setRestore} checked={restore} />
        </Form.Item>
      </Form>
      <UseGestureLayout ref={containerRef}>
        <DragImgContainer
          {...bind()}
          style={{ x, y, cursor: dragIng ? "grabbing" : "grab" }}
          onMouseDown={() => setDragIng(true)}
          onMouseUp={() => setDragIng(false)}
        >
          <DragImg src={img} alt="img" />
        </DragImgContainer>
      </UseGestureLayout>
    </>
  );
}

export default UseGesture;
