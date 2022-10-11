import { Menu } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SortAscendingOutlined, StarOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftMenu } from "../../components/style/common";

export const menuPath = {
  PATH_SORT_BASIC: "sort-basic",
  PATH_SORT_POSITION: "sort-position",
  PATH_SORT_REACT_USE_GESTURE: "react-use-gesture",
  PATH_SORT_TWO_DIMENSION: "sort-two-dimension",
  PATH_SORT_TREE: "sort-tree",
  PATH_EFFECT_DEMO: "effect-demo",
  PATH_JS_DEMO: "js-demo",
  PATH_EFFECT_SCROLL_OFFSET: "scroll-offset",
  PATH_EFFECT_SCROLL_HORIZONTAL: "scroll-horizontal",
};

function LocalMenu() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const onMenuChange = useCallback(
    ({ key }: any) => {
      navigate(key);
    },
    [navigate]
  );
  const matchInfo = useLocation();
  const items = useMemo(
    () => [
      {
        label: "拖曳排序",
        key: "sort",
        icon: <SortAscendingOutlined />,
        children: [
          {
            label: "拖曳排序列表（elementFromPoint）",
            key: menuPath.PATH_SORT_BASIC,
          },
          {
            label: "拖曳排序列表（基于位置）",
            key: menuPath.PATH_SORT_POSITION,
          },
          {
            label: "拖曳排序列表（react-use-gesture）",
            key: menuPath.PATH_SORT_REACT_USE_GESTURE,
          },
          {
            label: "拖曳排序二维表（粗略实现）",
            key: menuPath.PATH_SORT_TWO_DIMENSION,
          },
          {
            label: "拖曳排序树（TODO）",
            key: menuPath.PATH_SORT_TREE,
          },
        ],
      },
      {
        label: "特效实现/测试页",
        key: "effects",
        icon: <StarOutlined />,
        children: [
          {
            label: "CSS样式测试页",
            key: menuPath.PATH_EFFECT_DEMO,
          },
          {
            label: "JS样式测试页",
            key: menuPath.PATH_JS_DEMO,
          },
          {
            label: "贴合滚动-基础（TODO）",
            key: menuPath.PATH_EFFECT_SCROLL_OFFSET,
          },
          {
            label: "贴合滚动-横向（TODO）",
            key: menuPath.PATH_EFFECT_SCROLL_HORIZONTAL,
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    setSelectedKeys([matchInfo.pathname.substr(1)]);
  }, [matchInfo.pathname]);

  return (
    <LeftMenu>
      <Menu
        onClick={onMenuChange}
        defaultOpenKeys={["sort", "effects"]}
        selectedKeys={selectedKeys}
        mode="inline"
        items={items}
      />
    </LeftMenu>
  );
}

export default LocalMenu;
