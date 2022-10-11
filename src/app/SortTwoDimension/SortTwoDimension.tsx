import { Button, PageHeader } from "antd";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { SwapOutlined } from "@ant-design/icons";
import { useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { clamp, omit, range, shuffle, throttle } from "lodash";
import { ContentContainer } from "../../components/style/common";
import { SortItem, SortLayout } from "./style";
import imgs from "./imgImport";
import { calcBounds, calcOrder, getSpringConf } from "./dataHandle";

/* 网格布局间隙宽度 */
const gridGap = 20;

function SortTwoDimension() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef(range(imgs.length));
  const getItemSize = useCallback(() => {
    if (containerRef.current) {
      const children = containerRef.current.children[0];
      if (children) {
        const itemRectInfo = children.getBoundingClientRect();
        return [itemRectInfo.width + gridGap, itemRectInfo.height + gridGap];
      }
    }
    return [0, 0];
  }, []);

  const getRowItemCount = useCallback(() => {
    const [itemWidth] = getItemSize();
    if (containerRef.current) {
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const count = Math.floor((containerWidth + gridGap) / itemWidth);
      return count;
    }
    return 3;
  }, [getItemSize]);

  const [springs, api] = useSprings(
    orderRef.current.length,
    getSpringConf({
      order: orderRef.current,
      rowItemCount: getRowItemCount(),
      itemWidth: getItemSize()[0],
      itemHeight: getItemSize()[1],
    })
  );

  const bind = useDrag(
    ({ args: [activeOriginalIndex], active, movement: [x, y], target }) => {
      const [itemWidth, itemHeight] = getItemSize();
      const rowItemCount = getRowItemCount();

      const cIndex = orderRef.current.indexOf(activeOriginalIndex);

      const [minX, maxX, minY, maxY] = calcBounds(
        rowItemCount,
        cIndex,
        itemWidth,
        itemHeight,
        orderRef.current.length
      );
      const realX = clamp(x, minX, maxX);
      const realY = clamp(y, minY, maxY);

      // 根据当前坐标计算当前位置
      const offsetXIndex = Math.round(realX / itemWidth);
      const offsetYIndex = Math.round(realY / itemHeight);
      // 当前拖动的元素应该应用的偏移索引量
      const offsetIndex = clamp(
        offsetXIndex + offsetYIndex * rowItemCount,
        -cIndex,
        orderRef.current.length - cIndex - 1
      );
      const nextOrder = calcOrder(orderRef.current, cIndex, offsetIndex);

      api.start(
        getSpringConf({
          order: nextOrder,
          activeOriginalIndex,
          x: realX,
          y: realY,
          active,
          itemWidth,
          itemHeight,
          rowItemCount,
          cIndex,
          offsetIndex,
        })
      );
      if (!active) {
        orderRef.current = nextOrder;
      }
    }
  );

  const forceRender = useCallback(() => {
    const [itemWidth, itemHeight] = getItemSize();
    const rowItemCount = getRowItemCount();
    api.start(
      getSpringConf({
        order: orderRef.current,
        itemWidth,
        itemHeight,
        rowItemCount,
      })
    );
  }, [api, getItemSize, getRowItemCount]);
  const onResize = useMemo(() => throttle(forceRender, 32), [forceRender]);

  const onRandom = useCallback(() => {
    orderRef.current = shuffle(orderRef.current);
    forceRender();
  }, [forceRender]);
  const onLog = useCallback(() => {}, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return (
    <ContentContainer>
      <PageHeader className="site-page-header" title="拖拽排序（二维）" />
      <SortLayout ref={containerRef}>
        {imgs.map((img, index) => (
          <SortItem
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
      <Button onClick={onLog}>当前序列</Button>
    </ContentContainer>
  );
}

export default SortTwoDimension;
