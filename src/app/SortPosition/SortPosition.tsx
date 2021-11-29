import { List } from "antd";
import { ContentContainer } from "../../components/style/common";
import { useCallback, useMemo, useRef, useState } from "react";
import ListItem from "./ListItem";
import { arrayMove } from "../../utils/arrayMove";
import { clamp, range } from "lodash";

function SortBasic() {
  const [listData, setData] = useState([
    {
      key: "aaa",
      content: "Racing car sprays burning fuel into crowd.",
    },
    { key: "bbb", content: "Japanese princess to wed commoner." },
    {
      key: "ccc",
      content: "Australian walks 100km after outback crash.",
    },
    {
      key: "ddd",
      content: "Man charged over missing wedding girl.",
    },
    { key: "eee", content: "Los Angeles battles huge wildfires." },
  ]);
  const defaultIndex = useMemo(() => range(listData.length), [listData]);
  const [renderIndexs, setRenderIndexs] = useState(defaultIndex);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [targetIndex, setTargetIndex] = useState<number>();

  const listRef = useRef<HTMLDivElement>(null);
  const onItemMove = useCallback(
    (startY: number, endY: number) => {
      const containerPageY =
        listRef.current
          ?.querySelector(".ant-list-items")!
          .getBoundingClientRect()!?.y + window.scrollY;
      const baseOffset = startY - containerPageY;
      const targetIndex = Math.floor(
        clamp(endY - startY + baseOffset, 0, 279) / 56
      );
      setRenderIndexs(arrayMove(defaultIndex, activeIndex!, targetIndex));
      setTargetIndex(targetIndex);
    },
    [activeIndex, defaultIndex]
  );

  const onDragEndParent = useCallback(() => {
    // 清除激活的项目
    setActiveIndex(undefined);
    setTargetIndex(undefined);
    // 重设排序数组
    setRenderIndexs(defaultIndex);
    // 刷新数据
    setData(arrayMove(listData, activeIndex!, targetIndex!));
  }, [activeIndex, defaultIndex, listData, targetIndex]);

  return (
    <ContentContainer ref={listRef}>
      <List
        header={<div>拖曳排序列</div>}
        bordered
        dataSource={listData}
        renderItem={(item, index) => (
          <ListItem
            key={item.key}
            content={item.content}
            index={index}
            renderIndex={renderIndexs.findIndex((i) => i === index)}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onItemMove={onItemMove}
            onDragEndParent={onDragEndParent}
          />
        )}
      />
    </ContentContainer>
  );
}

export default SortBasic;
