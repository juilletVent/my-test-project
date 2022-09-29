import { Button, List } from "antd";
import { ContentContainer } from "../../components/style/common";
import { useCallback, useState } from "react";
import { RetweetOutlined } from "@ant-design/icons";
import { useSprings, config } from "@react-spring/web";
import { omit, shuffle } from "lodash";
import ListItem from "./ListItem";
import { arrayMove } from "../../utils/arrayMove";
import { clamp } from "lodash";
import { useDrag } from "@use-gesture/react";
import { ListItemLayout } from "./style";

const itemHeight = 56;

const fn =
  (
    order: number[],
    active = false,
    activeOriginalIndex = 0,
    curIndex = 0,
    y = 0
  ) =>
  (index: number) => {
    // 仅命中的元素响应拖拽变化，其他元素根据排序列表进行响应
    return active && index === activeOriginalIndex
      ? {
          y: (curIndex - activeOriginalIndex) * itemHeight + y,
          scale: 1.005,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === "zIndex",
          config: (key: string) =>
            key === "y" ? config.stiff : config.default,
          onRest: () => console.log("onRest active"),
        }
      : {
          y: (order.indexOf(index) - index) * itemHeight,
          scale: 1,
          zIndex: 0,
          shadow: 0,
          immediate: false,
          onRest: () => console.log("onRest"),
        };
  };

function SortUseGesture() {
  const [listData] = useState([
    {
      key: "aaa",
      content: "const [order, setOrder] = useState(listData.map((_, i) => i));",
    },
    {
      key: "bbb",
      content: "const [springs, api] = useSprings(listData.length, fn(order));",
    },
    {
      key: "ccc",
      content:
        "Math.round((activeCurrentIndex * itemHeight + y) / itemHeight),",
    },
    {
      key: "ddd",
      content:
        "const newOrder = arrayMove(order, activeCurrentIndex, nextActiveIndex);",
    },
    {
      key: "eee",
      content: "<ListItem key={item.key} content={item.content} />",
    },
  ]);

  const [order, setOrder] = useState(shuffle(listData.map((_, i) => i)));
  const [springs, api] = useSprings(listData.length, fn(order));
  const bind = useDrag(
    ({ args: [activeOriginalIndex], active, movement: [, y] }) => {
      // 在列表中使用原始序号寻找当前项目的实际序号
      const activeCurrentIndex = order.indexOf(activeOriginalIndex);
      // 根据Y计算当前项目应该处于哪个位置
      const nextActiveIndex = clamp(
        Math.round((activeCurrentIndex * itemHeight + y) / itemHeight),
        0,
        order.length - 1
      );
      const newOrder = arrayMove(order, activeCurrentIndex, nextActiveIndex);
      api.start(
        fn(newOrder, active, activeOriginalIndex, activeCurrentIndex, y)
      );
      if (!active) {
        setOrder(newOrder);
      }
    }
  );
  const shuffleOrder = useCallback(() => {
    const nextOrder = shuffle(order);
    setOrder(nextOrder);
    api.start(fn(nextOrder, false));
  }, [api, order]);

  return (
    <ContentContainer>
      <List
        header={<div>拖曳排序列表（react-use-gesture）</div>}
        bordered
        dataSource={listData}
        renderItem={(item, index) => (
          <ListItemLayout
            className="ant-list-item"
            key={item.key}
            {...bind(index)}
            style={{
              ...omit(springs[index], ["shadow"]),
              boxShadow: springs[index].shadow.to(
                (s: number) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
              position: "relative",
            }}
          >
            <ListItem key={item.key} content={item.content} />
          </ListItemLayout>
        )}
      />
      <Button onClick={shuffleOrder} icon={<RetweetOutlined />} type="primary">
        打乱数组
      </Button>
    </ContentContainer>
  );
}

export default SortUseGesture;
