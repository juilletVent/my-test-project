import { Routes, Route, Navigate } from "react-router";
import styled from "styled-components";
import CSSTest from "../CSSTest/CSSTest";
import JSTest from "../JSTest/JSTest";
import ScrollHorizontal from "../ScrollHorizontal/ScrollHorizontal";
import ScrollOffset from "../ScrollOffset/ScrollOffset";
import SortBasic from "../SortBasic/SortBasic";
import SortPosition from "../SortPosition/SortPosition";
import SortTree from "../SortTree/SortTree";
import SortTwoDimension from "../SortTwoDimension/SortTwoDimension";
import SortUseGesture from "../SortUseGesture/SortUseGesture";
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
        {/* 重定向 */}
        <Route path="*" element={<Navigate to={menuPath.PATH_SORT_BASIC} />} />
      </Routes>
    </HomeLayout>
  );
}

export default Home;
