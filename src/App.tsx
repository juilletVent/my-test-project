import { Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./App.css";
import Home from "./app/Home/Home";

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
