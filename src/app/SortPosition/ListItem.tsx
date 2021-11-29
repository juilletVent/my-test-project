import { List } from "antd";
import { clamp, isNil } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import { useSpring } from "@react-spring/core";
import { DragBtn, AbsoluteItemLayout } from "../../components/style/common";
import { useToggle } from "ahooks";

interface Props {
  content: React.ReactChild;
  index: number;
  renderIndex: number;
  activeIndex?: number;
  setActiveIndex: (val?: number) => void;
  onItemMove: (startY: number, endY: number) => void;
  onDragEndParent: () => void;
}

function ListItem(props: Props) {
  const { onItemMove, onDragEndParent } = props;
  const { content, index, renderIndex, activeIndex, setActiveIndex } = props;
  const itemRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [draging, { toggle: switchDragin }] = useToggle();
  const [startPoitionState, setStartPoitionState] = useState({
    pageX: 0,
    pageY: 0,
  });
  const [endPositionState, setEndPositionState] = useState({
    pageX: 0,
    pageY: 0,
  });
  const normalOffset = useMemo(() => {
    if (renderIndex !== index) {
      return (renderIndex - index) * 56;
    }
    return 0;
  }, [index, renderIndex]);

  const updateZIndex = useCallback(() => {
    if (itemRef.current) {
      itemRef.current.style.zIndex = draging ? "1" : "0";
    }
  }, [draging]);
  const onDragAnimEnd = useCallback(() => {
    updateZIndex();
    if (!draging && activeIndex === index) {
      onDragEndParent();
    }
  }, [activeIndex, draging, index, onDragEndParent, updateZIndex]);
  const onDrageStart = useCallback(
    (e: any) => {
      if (btnRef.current) {
        btnRef.current.setPointerCapture(e.pointerId);
      }
      switchDragin(true);
      setActiveIndex(index);
      // 记录点击的页面位置
      setStartPoitionState({
        pageX: e.pageX,
        pageY: e.pageY,
      });
      setEndPositionState({
        pageX: e.pageX,
        pageY: e.pageY,
      });
    },
    [index, setActiveIndex, switchDragin]
  );
  const onDrageEnd = useCallback(
    (e: any) => {
      if (btnRef.current) {
        btnRef.current.releasePointerCapture(e.pointerId);
      }
      switchDragin(false);
      setStartPoitionState({ pageX: 0, pageY: 0 });
      setEndPositionState({ pageX: 0, pageY: 0 });
    },
    [switchDragin]
  );
  const onDrageMove = useCallback(
    (e: any) => {
      if (!draging) {
        return;
      }
      setEndPositionState({
        pageX: e.pageX,
        pageY: e.pageY,
      });
      // 通知上层当前元素的相对偏移
      onItemMove(startPoitionState.pageY, endPositionState.pageY);
    },
    [draging, endPositionState.pageY, onItemMove, startPoitionState.pageY]
  );

  const activeAnimProps = useSpring({
    config: { tension: 400 },
    transform: draging
      ? `translate3d(0px, ${clamp(
          index * 56 + endPositionState.pageY - startPoitionState.pageY,
          0,
          280 - 56
        )}px, 0px) scale(1.006)`
      : `translate3d(0px, ${index * 56 + normalOffset}px, 0px) scale(1)`,
    boxShadow: draging ? "0 0 5px rgba(0,0,0,0.25)" : "0 0 5px rgba(0,0,0,0)",
    onRest: onDragAnimEnd,
    onStart: updateZIndex,
  });

  return (
    <AbsoluteItemLayout
      style={activeAnimProps}
      ref={itemRef}
      className="list-item-tag"
    >
      <List.Item>
        {content}
        <DragBtn
          ref={btnRef}
          onPointerDown={onDrageStart}
          onPointerUp={onDrageEnd}
          onPointerMove={onDrageMove}
        >
          <UnorderedListOutlined />
        </DragBtn>
      </List.Item>
    </AbsoluteItemLayout>
  );
}

export default ListItem;
