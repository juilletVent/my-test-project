import { Button, PageHeader } from "antd";
import { useCallback, useRef, useState } from "react";
import { SwapOutlined } from "@ant-design/icons";
import { useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { clamp, omit, range, shuffle } from "lodash";
import { ContentContainer } from "../../components/style/common";
import { SortItem, SortLayout } from "./style";
import imgs from "./imgImport";
import { getSpringConf } from "./dataHandle";

function SortTwoDimension() {
  const itemRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState(range(imgs.length));
  const [springs, api] = useSprings(order.length, getSpringConf({ order }));
  const bind = useDrag(
    ({ args: [activeOriginalIndex], active, movement: [x, y] }) => {
      /** 激活元素当前所在的位置索引 */
      const currentIndex = order.indexOf(activeOriginalIndex);
      const itemRectInfo = itemRef.current!.getBoundingClientRect();
      const [itemWidth, itemHeight] = [itemRectInfo.width, itemRectInfo.height];
      const nextIndex = clamp(
        currentIndex +
          Math.round((x + (itemWidth + 20) * 0.5) / itemWidth + 20),
        0,
        order.length - 1
      );
      api.start(
        getSpringConf({
          order,
          activeOriginalIndex,
          x,
          y,
          active,
          itemWidth: itemWidth + 20,
          itemHeight: itemHeight + 20,
        })
      );
      if (!active) {
        // orderRef.current = newOrder;
      }
    }
  );

  const onRandom = useCallback(() => {
    const nextOrder = shuffle(order);
    setOrder(nextOrder);
    api.start(
      getSpringConf({
        order: nextOrder,
      })
    );
  }, [api, order]);

  return (
    <ContentContainer>
      <PageHeader className="site-page-header" title="拖拽排序（二维）" />
      <SortLayout>
        {imgs.map((img, index) => (
          <SortItem
            ref={index === 0 ? itemRef : null}
            key={img}
            style={{
              ...omit(springs[index], ["shadow"]),
              boxShadow: springs[index].shadow.to(
                (s: number) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
            }}
            {...bind(index)}
          >
            <img src={img} alt={`alt_${img}`} />
          </SortItem>
        ))}
      </SortLayout>
      <Button onClick={onRandom}>
        <SwapOutlined />
        打乱
      </Button>
    </ContentContainer>
  );
}

export default SortTwoDimension;
