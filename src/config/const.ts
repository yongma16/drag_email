// interface ConfigType {
//   source: any;
//   target: any;
// }
class DragOption {
  public sourceDom = null;
  public targetDom = null;
  public dragConfig = {
    curentDrag: null,
  };

  constructor(config: { source: any }) {
    const { source } = config;
    this.sourceDom = source;
    this.addListen();
  }
  // 初始化
  public addListen() {
    this.dragStart();
    this.drag();
    this.dragend();
  }

  public removeListen() {
    this.removeDragStart();
    this.removeDrag();
    this.removeDragend();
  }
  /* 在可拖动的目标上触发的事件 */
  public dragStart() {
    // @ts-ignore
    this.sourceDom.addEventListener("dragstart", (event: any) => {
      // 保存被拖动元素的引用 dragging
      this.dragConfig.curentDrag = event.target;
      // 拖拽 样式  dragging
      event.target.classList.add("dragging");
    });
  }

  public removeDragStart() {
    // @ts-ignore
    this.sourceDom.removeEventListener("dragstart", (event: any) => {
      // 保存被拖动元素的引用 dragging
      this.dragConfig.curentDrag = event.target;
      // 拖拽 样式  dragging
      event.target.classList.add("dragging");
    });
  }

  public drag() {
    // @ts-ignore
    this.sourceDom.addEventListener("drag", (event: any) => {
      // 拖拽中
      console.log("dragging");
    });
  }

  public removeDrag() {
    // @ts-ignore
    this.sourceDom.removeEventListener("drag", (event: any) => {
      // 拖拽中
      console.log("dragging");
    });
  }

  public dragend() {
    // @ts-ignore
    this.sourceDom.addEventListener("dragend", (event: any) => {
      // 在可拖动元素进入潜在的放置目标时高亮显示该目标
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.add("dragover");
      }
    });
  }

  public removeDragend() {
    // @ts-ignore
    this.sourceDom.removeEventListener("dragend", (event: any) => {
      // 在可拖动元素进入潜在的放置目标时高亮显示该目标
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.add("dragover");
      }
    });
  }
}

class DropOption {
  public targetDom = null;
  public dragConfig = {
    curentDrag: null,
  };

  constructor(config: { target: any }) {
    const { target } = config;
    this.targetDom = target;
    this.addListen();
  }
  // 初始化
  public addListen() {
    this.dragOver();
    this.dragenter();
    this.dragleave();
    this.drop();
  }

  // 去掉监听
  public removeListen() {
    this.removeDragOver();
    this.removeDragenter();
    this.removeDragleave();
    this.removeDrop();
  }

  /* 在放置目标上触发的事件 */
  public dragOver() {
    // @ts-ignore
    this.targetDom.addEventListener(
      "dragover",
      (event: any) => {
        // 阻止默认行为以允许放置
        event.preventDefault();
      },
      false
    );
  }

  public removeDragOver() {
    // @ts-ignore
    this.targetDom.removeEventListener(
      "dragover",
      (event: any) => {
        // 阻止默认行为以允许放置
        event.preventDefault();
      },
      false
    );
  }
  public dragenter() {
    // @ts-ignore
    this.targetDom.addEventListener("dragenter", (event: any) => {
      // 拖动结束，去掉dragging
      event.target.classList.remove("dragging");
    });
  }

  public removeDragenter() {
    // @ts-ignore
    this.targetDom.removeEventListener("dragenter", (event: any) => {
      // 拖动结束，去掉dragging
      event.target.classList.remove("dragging");
    });
  }

  public dragleave() {
    // @ts-ignore
    this.targetDom.addEventListener("dragleave", (event: any) => {
      // 在可拖动元素离开潜在放置目标元素时重置该目标的背景
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.remove("dragover");
      }
    });
  }

  public removeDragleave() {
    // @ts-ignore
    this.targetDom.removeEventListener("dragleave", (event: any) => {
      // 在可拖动元素离开潜在放置目标元素时重置该目标的背景
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.remove("dragover");
      }
    });
  }

  public dropEvent(event: any) {
    // 阻止默认行为（会作为某些元素的链接打开）
    event.preventDefault();
    console.log("add before");
    // 将被拖动元素移动到选定的目标元素中
    if (event.target.classList.contains("dropzone")) {
      event.target.classList.remove("dragover");
      // 删除自身
      // config.draged.parentNode.removeChild(config.draged);
      // event.target.appendChild(config.draged);
      // 创建虚拟dom  组件自定义的地方
      const vDom = document.createElement("div");
      console.log(vDom, "vDom");
      vDom.classList.add("container-box-left-component");
      event.target.appendChild(vDom);
      console.log("add component");
    }
  }

  public drop() {
    console.log("add drop listen");
    //@ts-ignore
    this.targetDom.addEventListener("drop", this.dropEvent);
  }

  public removeDrop() {
    console.log("removeEventListener drop listen");
    //@ts-ignore
    this.targetDom.removeEventListener("drop", this.dropEvent);
  }
}

export { DragOption, DropOption };
