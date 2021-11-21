import { Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import Home from "./app/Home/Home";
// import DragList from "./app/DragList/DragList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
