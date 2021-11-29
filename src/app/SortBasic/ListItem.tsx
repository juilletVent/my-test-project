import { List } from "antd";
import { clamp } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import { useSpring } from "@react-spring/core";
import { DragBtn, AbsoluteItemLayout } from "../../components/style/common";
import { useToggle } from "ahooks";

interface Props {
  content: string;
  modifyIndex: number;
  activeIndex: number;
  setActiveKey: (key?: string) => void;
  setModifyKey: (key?: string | number) => void;
  modifyKey?: string;
  index: number;
  onDragEnd: () => void;
}

function ListItem(props: Props) {
  const { modifyIndex, activeIndex, modifyKey } = props;
  const { content, setActiveKey, setModifyKey, index, onDragEnd } = props;
  const [dragIng, { toggle: switchDraging }] = useToggle();
  const [startPoitionState, setStartPoitionState] = useState({
    startX: 0,
    startY: 0,
  });
  const [endPositionState, setEndPositionState] = useState({
    startX: 0,
    startY: 0,
  });
  const actived = useMemo(() => activeIndex === index, [activeIndex, index]);
  const yOffset = useMemo(() => {
    if (modifyIndex === -1 || activeIndex === -1) {
      return 0;
    }
    if (activeIndex < index && modifyIndex >= index) {
      return -56;
    }
    if (activeIndex > index && modifyIndex <= index) {
      return 56;
    }
    return 0;
  }, [activeIndex, index, modifyIndex]);
  const yActiveOffset = useMemo(() => {
    if (modifyIndex === -1) {
      return 0;
    }
    return 56 * (modifyIndex - activeIndex);
  }, [activeIndex, modifyIndex]);
  const itemRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const updateZIndex = useCallback(() => {
    if (itemRef.current) {
      itemRef.current.style.zIndex = actived ? "1" : "0";
    }
  }, [actived]);

  const onDrageAnimStart = useCallback(() => {
    updateZIndex();
    if (itemRef.current) {
      itemRef.current.dataset.animing = "true";
    }
  }, [updateZIndex]);
  const onDrageAnimEnd = useCallback(() => {
    updateZIndex();
    if (itemRef.current) {
      itemRef.current.dataset.animing = "false";
    }

    if (!dragIng && actived) {
      // 通知上层，动画结束，同步数据
      onDragEnd();
    }
  }, [actived, dragIng, onDragEnd, updateZIndex]);

  const activeAnimProps = useSpring({
    config: { tension: actived ? 400 : 250 },
    to: {
      transform: `translate3d(0px, ${index * 56 + yOffset}px, 0px) scale(1)`,
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
    onStart: onDrageAnimStart,
    onRest: onDrageAnimEnd,
    reverse: actived,
  });

  const onDrageStart = useCallback(
    (activeKey: string) => (e: any) => {
      if (btnRef.current) {
        btnRef.current.setPointerCapture(e.pointerId);
        setActiveKey(activeKey);
        setModifyKey(activeKey);
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
    [setActiveKey, setModifyKey, switchDraging]
  );
  const onDrageEnd = useCallback(
    (e: any) => {
      if (btnRef.current) {
        btnRef.current.releasePointerCapture(e.pointerId);
      }
      switchDraging(false);
      setStartPoitionState({
        startX: 0,
        startY: 0,
      });
      setEndPositionState({
        startX: 0,
        startY: yActiveOffset,
      });
      if (itemRef.current && itemRef.current.dataset.animing !== "true") {
        onDragEnd();
      }
    },
    [onDragEnd, switchDraging, yActiveOffset]
  );

  const onDrageMove = useCallback(
    (e: any) => {
      if (!dragIng) {
        return;
      }
      // 隐藏当前元素
      const itemNode = e.target.closest(".list-item-tag");
      itemNode.style.pointerEvents = "none";
      // 尝试获取被压住的下层元素
      const targetNode = document.elementFromPoint(e.pageX, e.pageY);
      if (targetNode) {
        const targetItem = targetNode.closest(".list-item-tag") as HTMLElement;
        // 取得目标key,反馈给父级元素
        if (targetItem && targetItem.dataset.animing !== "true") {
          if (modifyKey === targetItem.dataset.key) {
            if (modifyIndex > activeIndex && modifyIndex - activeIndex >= 2) {
              // 应设置modifyKey为[modifyIndex-1]的值
              setModifyKey(modifyIndex - 1);
              // 恢复显示
              itemNode.style.pointerEvents = "auto";
              setEndPositionState({
                startX: e.pageX,
                startY: e.pageY,
              });
              return;
            }
            if (modifyIndex < activeIndex && activeIndex - modifyIndex >= 2) {
              // 应设置modifyKey为[modifyIndex+1]的值
              setModifyKey(modifyIndex + 1);
              // 恢复显示
              itemNode.style.pointerEvents = "auto";
              setEndPositionState({
                startX: e.pageX,
                startY: e.pageY,
              });
              return;
            }
            setModifyKey();
          } else {
            setModifyKey(targetItem.dataset.key);
          }
        }
      }
      // 恢复显示
      itemNode.style.pointerEvents = "auto";
      setEndPositionState({
        startX: e.pageX,
        startY: e.pageY,
      });
    },
    [activeIndex, dragIng, modifyIndex, modifyKey, setModifyKey]
  );

  return (
    <AbsoluteItemLayout
      ref={itemRef}
      style={activeAnimProps}
      className="list-item-tag"
      data-key={content}
    >
      <List.Item>
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
    </AbsoluteItemLayout>
  );
}

export default ListItem;
