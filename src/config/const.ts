interface ConfigType {
  source: any;
  target: any;
}
class DragOption {
  public sourceDom = null;
  public targetDom = null;
  public dragConfig = {
    curentDrag: null,
  };

  constructor(config: ConfigType) {
    const { source, target } = config;
    this.sourceDom = source;
    this.targetDom = target;
    this.init();
  }
  // 初始化
  public init() {
    this.dragStart();
    this.drag();
    this.dragend();
    this.dragOver();
    this.dragenter();
    this.dragleave();
    this.drop();
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

  public drag() {
    // @ts-ignore
    this.sourceDom.addEventListener("drag", (event: any) => {
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

  public dragenter() {
    // @ts-ignore
    this.targetDom.addEventListener("dragenter", (event: any) => {
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

  public drop() {
    //@ts-ignore
    this.targetDom.addEventListener("drop", (event: any) => {
      // 阻止默认行为（会作为某些元素的链接打开）
      event.preventDefault();
      // 将被拖动元素移动到选定的目标元素中
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.remove("dragover");
        // 删除自身
        // config.draged.parentNode.removeChild(config.draged);
        // event.target.appendChild(config.draged);
        // 创建虚拟dom  组件自定义的地方
        const vDom = document.createElement("div");
        vDom.classList.add("container-box-left-component");
        event.target.appendChild(vDom);
      }
    });
  }
}

export { DragOption };
