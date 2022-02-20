import { Menu } from "antd";
import { useCallback, useEffect, useState } from "react";
import { SortAscendingOutlined, StarOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftMenu } from "../../components/style/common";

const { SubMenu } = Menu;

export const menuPath = {
  PATH_SORT_BASIC: "sort-basic",
  PATH_SORT_POSITION: "sort-position",
  PATH_SORT_REACT_USE_GESTURE: "react-use-gesture",
  PATH_SORT_TWO_DIMENSION: "sort-two-dimension",
  PATH_SORT_TREE: "sort-tree",
  PATH_EFFECT_DEMO: "effect-demo",
  PATH_EFFECT_SCROLL_OFFSET: "scroll-offset",
  PATH_EFFECT_SCROLL_HORIZONTAL: "scroll-horizontal",
};

function LocalMenu() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const onMenuChange = useCallback(
    ({ key }) => {
      navigate(key);
    },
    [navigate]
  );
  const matchInfo = useLocation();

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
      >
        <SubMenu key="sort" icon={<SortAscendingOutlined />} title="拖曳排序">
          <Menu.Item key={menuPath.PATH_SORT_BASIC}>
            拖曳排序列表（elementFromPoint）
          </Menu.Item>
          <Menu.Item key={menuPath.PATH_SORT_POSITION}>
            拖曳排序列表（基于位置）
          </Menu.Item>
          <Menu.Item key={menuPath.PATH_SORT_REACT_USE_GESTURE}>
            拖曳排序列表（react-use-gesture）
          </Menu.Item>
          <Menu.Item key={menuPath.PATH_SORT_TWO_DIMENSION}>
            拖曳排序二维表（TODO）
          </Menu.Item>
          <Menu.Item key={menuPath.PATH_SORT_TREE}>
            拖曳排序树（TODO）
          </Menu.Item>
        </SubMenu>
        <SubMenu key="effects" icon={<StarOutlined />} title="特效实现">
          <Menu.Item key={menuPath.PATH_EFFECT_DEMO}>CSS样式测试页</Menu.Item>
          <Menu.Item key={menuPath.PATH_EFFECT_SCROLL_OFFSET}>
            贴合滚动-基础（TODO）
          </Menu.Item>
          <Menu.Item key={menuPath.PATH_EFFECT_SCROLL_HORIZONTAL}>
            贴合滚动-横向（TODO）
          </Menu.Item>
        </SubMenu>
      </Menu>
    </LeftMenu>
  );
}

export default LocalMenu;
