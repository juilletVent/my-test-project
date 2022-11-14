import { Menu } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  SortAscendingOutlined,
  StarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
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
  PATH_VISUALIZATION_TEST_SIMPLE_CHART: "visualization-test-simple-chart",
  PATH_VISUALIZATION_TEST_CANVAS1: "visualization-test-canvas1",
  PATH_VISUALIZATION_TEST_CANVAS2: "visualization-test-canvas2",
  PATH_VISUALIZATION_TEST_SVG1: "visualization-test-svg1",
  PATH_VISUALIZATION_TEST_WEBGL1: "visualization-test-webgl-1",
  PATH_LINKED_FORM: "linked-form",
  PATH_LARGE_FORM: "large-form",
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
        label: "拖拽排序",
        key: "sort",
        icon: <SortAscendingOutlined />,
        children: [
          {
            label: "拖拽排序列表（elementFromPoint）",
            key: menuPath.PATH_SORT_BASIC,
          },
          {
            label: "拖拽排序列表（基于位置）",
            key: menuPath.PATH_SORT_POSITION,
          },
          {
            label: "拖拽排序列表（react-use-gesture）",
            key: menuPath.PATH_SORT_REACT_USE_GESTURE,
          },
          {
            label: "拖拽排序二维表（粗略实现）",
            key: menuPath.PATH_SORT_TWO_DIMENSION,
          },
          {
            label: "拖拽排序树（TODO）",
            key: menuPath.PATH_SORT_TREE,
          },
        ],
      },
      {
        label: "特效实现",
        key: "effects",
        icon: <StarOutlined />,
        children: [
          {
            label: "CSS样式",
            key: menuPath.PATH_EFFECT_DEMO,
          },
          {
            label: "JS样式",
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
      {
        label: "可视化",
        key: "visualization",
        icon: <StarOutlined />,
        children: [
          {
            label: "基础图表绘制",
            key: menuPath.PATH_VISUALIZATION_TEST_SIMPLE_CHART,
          },
          {
            label: "Canvas测试-1",
            key: menuPath.PATH_VISUALIZATION_TEST_CANVAS1,
          },
          {
            label: "Canvas测试-2",
            key: menuPath.PATH_VISUALIZATION_TEST_CANVAS2,
          },
          {
            label: "SVG测试-1",
            key: menuPath.PATH_VISUALIZATION_TEST_SVG1,
          },
          {
            label: "WebGL测试-1",
            key: menuPath.PATH_VISUALIZATION_TEST_WEBGL1,
          },
        ],
      },
      {
        label: "框架/工具测试",
        key: "framework",
        icon: <SettingOutlined />,
        children: [
          {
            label: "Antd联动表单",
            key: menuPath.PATH_LINKED_FORM,
          },
          {
            label: "Antd大型表单",
            key: menuPath.PATH_LARGE_FORM,
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
        defaultOpenKeys={["visualization"]}
        selectedKeys={selectedKeys}
        mode="inline"
        items={items}
      />
    </LeftMenu>
  );
}

export default LocalMenu;
