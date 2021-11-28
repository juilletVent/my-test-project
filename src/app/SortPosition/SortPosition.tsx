import { List } from "antd";
import { ContentContainer } from "../../components/style/common";
import { useCallback, useMemo, useState } from "react";
import ListItem from "./ListItem";
import { arrayMove } from "../../utils/arrayMove";

function SortBasic() {
  const [listData, setData] = useState([
    { key: "aaa", content: "Racing car sprays burning fuel into crowd." },
    { key: "bbb", content: "Japanese princess to wed commoner." },
    { key: "ccc", content: "Australian walks 100km after outback crash." },
    {
      key: "ddd",
      content: (
        <div>
          <p>Man charged over missing wedding girl.</p>
          <p>Man charged over missing wedding girl.</p>
        </div>
      ),
    },
    { key: "eee", content: "Los Angeles battles huge wildfires." },
  ]);

  return (
    <ContentContainer>
      <List
        header={<div>拖曳排序列</div>}
        bordered
        dataSource={listData}
        renderItem={(item, index) => (
          <ListItem key={item.key} content={item.content} index={index} />
        )}
      />
    </ContentContainer>
  );
}

export default SortBasic;
