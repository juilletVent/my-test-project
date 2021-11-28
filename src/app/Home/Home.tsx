import { Routes, Route, Navigate } from "react-router";
import styled from "styled-components";
import ScrollHorizontal from "../ScrollHorizontal/ScrollHorizontal";
import ScrollOffset from "../ScrollOffset/ScrollOffset";
import SortBasic from "../SortBasic/SortBasic";
import SortPosition from "../SortPosition/SortPosition";
import SortTree from "../SortTree/SortTree";
import SortTwoDimension from "../SortTwoDimension/SortTwoDimension";
import LocalMenu, { menuPath } from "./Menu";

const HomeLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
`;

function Home() {
  return (
    <HomeLayout>
      <LocalMenu />
      <Routes>
        <Route path={menuPath.PATH_SORT_BASIC} element={<SortBasic />} />
        <Route path={menuPath.PATH_SORT_POSITION} element={<SortPosition />} />
        <Route
          path={menuPath.PATH_SORT_TWO_DIMENSION}
          element={<SortTwoDimension />}
        />
        <Route path={menuPath.PATH_SORT_TREE} element={<SortTree />} />
        <Route path={menuPath.PATH_SCROLL_OFFSET} element={<ScrollOffset />} />
        <Route
          path={menuPath.PATH_SCROLL_HORIZONTAL}
          element={<ScrollHorizontal />}
        />
        {/* 重定向 */}
        <Route path="*" element={<Navigate to={menuPath.PATH_SORT_BASIC} />} />
      </Routes>
    </HomeLayout>
  );
}

export default Home;
