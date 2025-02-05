import "./App.css";
import { useEffect } from "react";

import { DragOption } from "./config/const";

function App() {
  const componentOptions = [
    {
      name: "文字",
      id: "1",
    },
    {
      name: "图片",
      id: "2",
    },
    {
      name: "列",
      id: "3",
    },
    {
      name: "分割线",
      id: "4",
    },
    {
      name: "按钮",
      id: "5",
    },
  ];

  const init = () => {
    componentOptions.map((item) => {
      const source = document.getElementById(item.id);
      const target = document.getElementById("droptarget");
      const dragOption = {
        source,
        target,
      };
      const DragClass = new DragOption(dragOption);
      console.log(DragClass);
    });
  };
  useEffect(() => {
    init();
    console.log("drag_email");
  }, []);

  // @ts-ignore
  return (
    <div className="container">
      <div className="container-box">
        <div className="container-box-left">
          {/* <div
            className="container-box-left-component"
            draggable="true"
            id="source"
          >
            我是组件
          </div> */}
          {componentOptions.map((item) => {
            return (
              <div
                className="container-box-left-component"
                draggable="true"
                id={item.id}
                key={item.id}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <div className="container-box-right">
          <div className="container-box-right-box dropzone" id="droptarget">
            可以拖到这里
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
