import { Routes, Route, Navigate } from "react-router";
import styled from "styled-components";
import CSSTest from "../CSSTest/CSSTest";
import JSTest from "../JSTest/JSTest";
import LargeForm from "../LargeForm/LargeForm";
import LinkedForm from "../LinkedForm/LinkedForm";
import ScrollHorizontal from "../ScrollHorizontal/ScrollHorizontal";
import ScrollOffset from "../ScrollOffset/ScrollOffset";
import SortBasic from "../SortBasic/SortBasic";
import SortPosition from "../SortPosition/SortPosition";
import SortTree from "../SortTree/SortTree";
import SortTwoDimension from "../SortTwoDimension/SortTwoDimension";
import SortUseGesture from "../SortUseGesture/SortUseGesture";
import CanvasTest1 from "../VisualizationTest/CanvasTest1";
import CanvasTest2 from "../VisualizationTest/CanvasTest2";
import CanvasTest3 from "../VisualizationTest/CanvasTest3";
import CanvasTest4 from "../VisualizationTest/CanvasTest4";
import SimpleChart from "../VisualizationTest/SimpleChart";
import SvgTest1 from "../VisualizationTest/SvgTest1";
import WebGLTest1 from "../VisualizationTest/WebGLTest1";
import LocalMenu, { menuPath } from "./Menu";

const HomeLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 100vh;
`;

function Home() {
  return (
    <HomeLayout>
      <LocalMenu />
      <Routes>
        <Route path={menuPath.PATH_SORT_BASIC} element={<SortBasic />} />
        <Route path={menuPath.PATH_SORT_POSITION} element={<SortPosition />} />
        <Route
          path={menuPath.PATH_SORT_REACT_USE_GESTURE}
          element={<SortUseGesture />}
        />
        <Route
          path={menuPath.PATH_SORT_TWO_DIMENSION}
          element={<SortTwoDimension />}
        />
        <Route path={menuPath.PATH_SORT_TREE} element={<SortTree />} />
        <Route path={menuPath.PATH_EFFECT_DEMO} element={<CSSTest />} />
        <Route path={menuPath.PATH_JS_DEMO} element={<JSTest />} />
        <Route
          path={menuPath.PATH_EFFECT_SCROLL_OFFSET}
          element={<ScrollOffset />}
        />
        <Route
          path={menuPath.PATH_EFFECT_SCROLL_HORIZONTAL}
          element={<ScrollHorizontal />}
        />
        <Route
          path={menuPath.PATH_VISUALIZATION_TEST_SIMPLE_CHART}
          element={<SimpleChart />}
        />
        <Route
          path={menuPath.PATH_VISUALIZATION_TEST_CANVAS1}
          element={<CanvasTest1 />}
        />
        <Route
          path={menuPath.PATH_VISUALIZATION_TEST_CANVAS2}
          element={<CanvasTest2 />}
        />
        <Route
          path={menuPath.PATH_VISUALIZATION_TEST_CANVAS3}
          element={<CanvasTest3 />}
        />
        <Route
          path={menuPath.PATH_VISUALIZATION_TEST_CANVAS4}
          element={<CanvasTest4 />}
        />
        <Route
          path={menuPath.PATH_VISUALIZATION_TEST_SVG1}
          element={<SvgTest1 />}
        />
        <Route path={menuPath.PATH_LINKED_FORM} element={<LinkedForm />} />
        <Route path={menuPath.PATH_LARGE_FORM} element={<LargeForm />} />
        <Route
          path={menuPath.PATH_VISUALIZATION_TEST_WEBGL1}
          element={<WebGLTest1 />}
        />
        {/* 重定向 */}
        <Route path="*" element={<Navigate to={menuPath.PATH_SORT_BASIC} />} />
      </Routes>
    </HomeLayout>
  );
}

export default Home;
