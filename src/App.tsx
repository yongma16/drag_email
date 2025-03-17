// @ts-ignore
import "./style/index.scss";

import { useEffect, useRef, useMemo } from "react";
import { Button } from "tdesign-react";
import { DragOption, DropOption } from "./config/const";

function App() {
  const sourceRef = useRef(null);
  const targetRef = useRef(null);

  const bodyComponentsAttr = useRef({
    id: 1,
    name: "body",
    type: "body",
    content: "body",
    children: [],
    attributes: {
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundRepeat: "repeat",
      backgroundPosition: "left top",
      backgroundSize: "auto",
      backgroundAttachment: "scroll",
      backgroundClip: "border-box",
      backgroundOrigin: "padding-box",
      backgroundBlendMode: "normal",
      background: "#ffffff",
      //
      paddingLeft: "10px",
      paddingTop: "10px",
      paddingRight: "10px",
      paddingBottom: "10px",
    },
  });
  const componentOptions = [
    {
      name: "文字",
      type: "text",
      content: "输入文字",
      id: "1",
    },
    {
      name: "图片",
      type: "image",
      content: "图片",
      id: "2",
    },
    // {
    //   name: "列",
    //   type: "column",
    //   content: "",
    //   id: "3",
    // },
    // {
    //   name: "分割线",
    //   type: "line",
    //   content: "",
    //   id: "4",
    // },
    // {
    //   name: "按钮",
    //   type: "button",
    //   content: "按钮",
    //   id: "5",
    // },
  ];
  const onClear = () => {
    if (targetRef.current) {
      // @ts-ignore
      targetRef.current.innerHTML = "";
    }
  };

  useMemo(() => {
    console.log("componentOptions", componentOptions);
  }, [componentOptions]);

  useEffect(() => {
    let sourceClassArr: any = [];
    if (sourceRef.current) {
      componentOptions.map((item) => {
        const source = document.getElementById(item.id);
        const dragOption = {
          source,
        };
        const DragClass = new DragOption(dragOption);
        console.log(DragClass);
        sourceClassArr.push(DragClass);
      });
    }

    return () => {
      sourceClassArr.forEach((item: any) => {
        item.removeListen();
        item = null;
      });
      console.log("卸载 sourceRef");
    };
  }, [sourceRef]);

  useEffect(() => {
    let dropClass: any = null;
    if (targetRef.current) {
      dropClass = new DropOption({
        target: targetRef.current,
      });
      console.log("dropClass");
    }
    return () => {
      dropClass?.removeListen();
      dropClass = null;
      console.log("卸载 targetRef");
    };
  }, [targetRef]);

  // @ts-ignore
  return (
    <div className="container">
      <div className="container-header">
        <Button className="base-button">导出 邮件html</Button>
        <Button className="base-button" onClick={onClear}>
          清空
        </Button>
      </div>
      <div className="container-box">
        <div className="container-box-left" ref={sourceRef}>
          {componentOptions.map((item) => {
            return (
              <div
                className="container-box-left-component basic-component"
                draggable="true"
                id={item.id}
                key={item.id}
                data-type={item.type}
                data-content={item.content}
                data-id={item.id}
                data-name={item.name}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <div
          className="container-box-right"
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor:
              bodyComponentsAttr.current.attributes.backgroundColor,
            paddingLeft: bodyComponentsAttr.current.attributes.paddingLeft,
            paddingTop: bodyComponentsAttr.current.attributes.paddingTop,
            paddingRight: bodyComponentsAttr.current.attributes.paddingRight,
            paddingBottom: bodyComponentsAttr.current.attributes.paddingBottom,
          }}
        >
          <div
            className="container-box-right-box dropzone"
            id="droptarget"
            ref={targetRef}
          >
            {/* 可以拖到这里 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
