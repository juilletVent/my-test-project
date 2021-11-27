import { List } from "antd";
import { clamp } from "lodash";
import { useCallback, useRef, useState } from "react";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import { useSpring } from "@react-spring/core";
import { DragBtn, ItemLayout } from "../../components/style/common";
import { useToggle } from "ahooks";

interface Props {
  actived: boolean;
  content: string;
  setActiveKey: (key?: string) => void;
  setMoveCurrentIndex: (key?: number) => void;
  index: number;
  moveCurrentIndex?: number;
}

function ListItem(props: Props) {
  const { actived, content, setActiveKey, index } = props;
  const [dragIng, { toggle: switchDraging }] = useToggle();
  const [startPoitionState, setStartPoitionState] = useState({
    startX: 0,
    startY: 0,
  });
  const [endPositionState, setEndPositionState] = useState({
    startX: 0,
    startY: 0,
  });
  const itemRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const updateZIndex = useCallback(() => {
    if (itemRef.current) {
      itemRef.current.style.zIndex = actived ? "1" : "0";
    }
  }, [actived]);

  const onDrageAnimEnd = useCallback(() => {
    updateZIndex();
    if (!dragIng) {
      // TODO 通知上层，动画结束，同步数据
    }
  }, [dragIng, updateZIndex]);

  const activeAnimProps = useSpring({
    config: { tension: 250 },
    to: {
      transform: `translate3d(0px, ${index * 56}px, 0px) scale(1)`,
      boxShadow: "0 0 5px rgba(0,0,0,0)",
    },
    from: {
      transform: `translate3d(0px, ${clamp(
        index * 56 + endPositionState.startY - startPoitionState.startY,
        0,
        280 - 56
      )}px, 0px) scale(1.01)`,
      boxShadow: "0 0 5px rgba(0,0,0,0.25)",
    },
    onStart: updateZIndex,
    onRest: onDrageAnimEnd,
    reverse: actived,
  });

  const onDrageStart = useCallback(
    (activeKey: string) => (e: any) => {
      if (btnRef.current) {
        btnRef.current.setPointerCapture(e.pointerId);
        setActiveKey(activeKey);
      }
      switchDraging(true);
      // 记录点击的页面位置
      setStartPoitionState({
        startX: e.pageX,
        startY: e.pageY,
      });
      setEndPositionState({
        startX: e.pageX,
        startY: e.pageY,
      });
    },
    [setActiveKey, switchDraging]
  );
  const onDrageEnd = useCallback(
    (e: any) => {
      if (btnRef.current) {
        btnRef.current.releasePointerCapture(e.pointerId);
        setActiveKey();
      }
      switchDraging(false);
      setStartPoitionState({
        startX: e.pageX,
        startY: e.pageY,
      });
    },
    [setActiveKey, switchDraging]
  );
  const onDrageMove = useCallback(
    (e: any) => {
      if (!dragIng) {
        return;
      }
      // TODO 通知被压住的项目进行位置变换
      setEndPositionState({
        startX: e.pageX,
        startY: e.pageY,
      });
    },
    [dragIng]
  );

  return (
    <ItemLayout ref={itemRef} style={activeAnimProps}>
      <List.Item data-index={content}>
        {content}
        <DragBtn
          ref={btnRef}
          onPointerDown={onDrageStart(content)}
          onPointerUp={onDrageEnd}
          onPointerMove={onDrageMove}
        >
          <UnorderedListOutlined />
        </DragBtn>
      </List.Item>
    </ItemLayout>
  );
}

export default ListItem;
