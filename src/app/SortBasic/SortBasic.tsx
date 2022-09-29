import { List } from "antd";
import { ContentContainer } from "../../components/style/common";
import { useCallback, useMemo, useState } from "react";
import ListItem from "./ListItem";
import { arrayMove } from "../../utils/arrayMove";

function SortBasic() {
  const [listData, setData] = useState([
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ]);
  const [actvieKey, setActiveKey] = useState<string>();
  const [modifyKey, setModifyKey] = useState<string>();

  const modifyIndex = useMemo(
    () => listData.findIndex((i) => i === modifyKey),
    [listData, modifyKey]
  );
  const activeIndex = useMemo(
    () => listData.findIndex((i) => i === actvieKey),
    [actvieKey, listData]
  );

  const changeModifyKey = useCallback(
    (keyVal?: string | number) => {
      if (typeof keyVal === "number") {
        setModifyKey(listData[keyVal]);
        return;
      }
      setModifyKey(keyVal);
    },
    [listData]
  );
  const onDragEnd = useCallback(() => {
    // 更新列表
    // 拖动元素索引，目标索引，
    setData(arrayMove(listData, activeIndex, modifyIndex));
    // 清空
    setActiveKey(undefined);
    setModifyKey(undefined);
  }, [activeIndex, listData, modifyIndex]);

  return (
    <ContentContainer>
      <List
        header={<div>拖曳排序列表（elementFromPoint）</div>}
        bordered
        dataSource={listData}
        renderItem={(item, index) => (
          <ListItem
            key={item}
            index={index}
            content={item}
            modifyIndex={modifyIndex}
            activeIndex={activeIndex}
            setActiveKey={setActiveKey}
            setModifyKey={changeModifyKey}
            modifyKey={modifyKey}
            onDragEnd={onDragEnd}
          />
        )}
      />
    </ContentContainer>
  );
}

export default SortBasic;
