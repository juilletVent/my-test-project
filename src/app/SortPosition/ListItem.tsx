import { List } from "antd";
import { clamp } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import { useSpring } from "@react-spring/core";
import { DragBtn, AbsoluteItemLayout } from "../../components/style/common";
import { useToggle } from "ahooks";

interface Props {
  content: React.ReactChild;
  index: number;
}

function ListItem(props: Props) {
  const { content, index } = props;
  const itemRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const activeAnimProps = useSpring({
    config: { tension: 400 },
    transform: `translate3d(0px, ${index * 56}px, 0px) scale(1)`,
    // boxShadow: "0 0 5px rgba(0,0,0,0)",
  });

  return (
    <AbsoluteItemLayout
      style={activeAnimProps}
      ref={itemRef}
      className="list-item-tag"
    >
      <List.Item>
        {content}
        <DragBtn ref={btnRef}>
          <UnorderedListOutlined />
        </DragBtn>
      </List.Item>
    </AbsoluteItemLayout>
  );
}

export default ListItem;
