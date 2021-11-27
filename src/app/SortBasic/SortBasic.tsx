import { List } from "antd";
import { ContentContainer } from "../../components/style/common";
import { useCallback, useState } from "react";
import ListItem from "./ListItem";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

function SortBasic() {
  const [actvieKey, setActiveItem] = useState<string>();
  const [moveCurrentIndex, setMoveCurrentIndex] = useState<number>();

  const setActiveKey = useCallback((_actvieKey?: string) => {
    setActiveItem(_actvieKey);
  }, []);

  return (
    <ContentContainer>
      <List
        header={<div>拖曳排序列表</div>}
        bordered
        dataSource={data}
        renderItem={(item, index) => (
          <ListItem
            actived={item === actvieKey}
            content={item}
            index={index}
            setActiveKey={setActiveKey}
            moveCurrentIndex={moveCurrentIndex}
            setMoveCurrentIndex={setMoveCurrentIndex}
          />
        )}
      />
    </ContentContainer>
  );
}

export default SortBasic;
