import { PageHeader } from "antd";
import { useRef } from "react";
import { useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { omit } from "lodash";
import { ContentContainer } from "../../components/style/common";
import { SortItem, SortLayout } from "./style";
import imgs from "./imgImport";
import { getSpringConf } from "./dataHandle";

function SortTwoDimension() {
  const orderRefs = useRef(imgs.map((_, i) => i));
  const [springs, api] = useSprings(
    orderRefs.current.length,
    getSpringConf({ order: orderRefs.current })
  );
  const bind = useDrag(
    ({ args: [activeOriginalIndex], active, movement: [x, y] }) => {
      api.start(
        getSpringConf({
          order: orderRefs.current,
          activeOriginalIndex,
          x,
          y,
          active,
        })
      );
      if (!active) {
        // orderRef.current = newOrder;
      }
    }
  );

  return (
    <ContentContainer>
      <PageHeader className="site-page-header" title="拖拽排序（二维）" />
      <SortLayout>
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
    </ContentContainer>
  );
}

export default SortTwoDimension;
