import { Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./App.css";
import Home from "./app/Home/Home";
import { useEffect, useRef } from "react";

function App() {
  const initRef = useRef({ inited: false });

  useEffect(() => {
    if (window.CSS && window.CSS.registerProperty && !initRef.current.inited) {
      initRef.current.inited = true;
      // Chrome 78+ 才可以使用，CSS中对应的@property规则 Chrome 85+才能用，因此如果想尽可能保证兼容性的话，应使用JS进行定义
      // 但是从代码维护层面，应使用CSS进行定义，具体看场景，是否对兼容性要求更高
      window.CSS.registerProperty({
        name: "--start-color",
        syntax: "<color>",
        inherits: false,
        initialValue: "transparent",
      });
      window.CSS.registerProperty({
        name: "--end-color",
        syntax: "<color>",
        inherits: false,
        initialValue: "transparent",
      });
      window.CSS.registerProperty({
        name: "--progress",
        syntax: "<percentage> | <number> | <length>",
        inherits: false,
        initialValue: 0,
      });
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
