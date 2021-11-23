import { List } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { ContentContainer, DragBtn } from "../../components/style/common";
import { useCallback } from "react";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

function SortBasic() {
  const onDrag = useCallback(() => {
    console.log("onDrag");
  }, []);
  const onDragEnter = useCallback((v) => {
    console.log("onDragEnter", v);
  }, []);
  const onDragEnd = useCallback((v) => {
    console.log("onDragEnd", v);
  }, []);

  return (
    <ContentContainer>
      <List
        header={<div>拖曳排序列表</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            draggable
            onDrag={onDrag}
            onDragEnter={() => onDragEnter(item)}
            onDragEnd={() => onDragEnd(item)}
          >
            {item}
            <DragBtn>
              <UnorderedListOutlined />
            </DragBtn>
          </List.Item>
        )}
      />
    </ContentContainer>
  );
}

export default SortBasic;
