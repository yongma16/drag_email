import './App.css';
import { useState,useEffect,useRef } from 'react';


function App() {
    // 配置项
    const config = {
        draged: null
    }

    function init() {
        console.log('window onload');
        /* 在可拖动的目标上触发的事件 */
        const source:any = document.getElementById("source");
        source.addEventListener("drag", (event:any) => {
            console.log("dragging");
        });

        source.addEventListener("dragstart", (event:any) => {
            // 保存被拖动元素的引用
            config.draged = event.target;
            // 设置为半透明
            event.target.classList.add("dragging");
        });

        source.addEventListener("dragend", (event:any) => {
            // 拖动结束，重置透明度
            event.target.classList.remove("dragging");
        });

        /* 在放置目标上触发的事件 */
        const target:any = document.getElementById("droptarget");
        target.addEventListener(
            "dragover",
            (event:any) => {
                // 阻止默认行为以允许放置
                event.preventDefault();
            },
            false,
        );

        target.addEventListener("dragenter", (event:any) => {
            // 在可拖动元素进入潜在的放置目标时高亮显示该目标
            if (event.target.classList.contains("dropzone")) {
                event.target.classList.add("dragover");
            }
        });

        target.addEventListener("dragleave", (event:any) => {
            // 在可拖动元素离开潜在放置目标元素时重置该目标的背景
            if (event.target.classList.contains("dropzone")) {
                event.target.classList.remove("dragover");
            }
        });

        target.addEventListener("drop", (event:any) => {
            // 阻止默认行为（会作为某些元素的链接打开）
            event.preventDefault();
            // 将被拖动元素移动到选定的目标元素中
            if (event.target.classList.contains("dropzone")) {
                event.target.classList.remove("dragover");
                // 删除自身
                // config.draged.parentNode.removeChild(config.draged);
                // event.target.appendChild(config.draged);
                const vDom=document.createElement('div')
                vDom.classList.add('container-box-left-component')
                event.target.appendChild(vDom);
            }
        });
    }

  useEffect(()=>{
      init()
      console.log('drag_email')
  },[]);

  // @ts-ignore
    return (
      <div className='container'>
          <div className='container-box'>
              <div className='container-box-left'>
                  <div className="container-box-left-component" draggable="true" id="source">
                     我是组件
                  </div>
              </div>
              <div className='container-box-right'>
                  <div className="container-box-right-box dropzone" id="droptarget">
                      可以拖到这里
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
