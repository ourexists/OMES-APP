"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
const uni_modules_coolUnix_cool_utils_rect = require("../../cool/utils/rect.js");
const uni_modules_coolUnix_config = require("../../config.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  (_easycom_cl_text_1 + _easycom_cl_icon_1)();
}
const _easycom_cl_text = () => "../cl-text/cl-text.js";
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_icon)();
}
class HeaderPassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          text: { type: "Unknown", optional: true }
        };
      },
      name: "HeaderPassThrough"
    };
  }
  constructor(options, metadata = HeaderPassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.text = this.__props__.text;
    delete this.__props__;
  }
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          inner: { type: "Unknown", optional: true },
          header: { type: HeaderPassThrough, optional: true },
          container: { type: "Unknown", optional: true },
          mask: { type: "Unknown", optional: true },
          draw: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.inner = this.__props__.inner;
    this.header = this.__props__.header;
    this.container = this.__props__.container;
    this.mask = this.__props__.mask;
    this.draw = this.__props__.draw;
    delete this.__props__;
  }
}
class Swipe extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          isMove: { type: Boolean, optional: false },
          isTouch: { type: Boolean, optional: false },
          startY: { type: Number, optional: false },
          offsetY: { type: Number, optional: false }
        };
      },
      name: "Swipe"
    };
  }
  constructor(options, metadata = Swipe.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.isMove = this.__props__.isMove;
    this.isTouch = this.__props__.isTouch;
    this.startY = this.__props__.startY;
    this.offsetY = this.__props__.offsetY;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-popup"
}, { __name: "cl-popup", props: {
  // 透传样式配置
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 是否可见
  modelValue: {
    type: Boolean,
    default: false
  },
  // 标题
  title: {
    type: String,
    default: null
  },
  // 弹出方向
  direction: {
    type: String,
    default: "bottom"
  },
  // 弹出框宽度
  size: {
    type: [String, Number],
    default: ""
  },
  // 是否显示头部
  showHeader: {
    type: Boolean,
    default: true
  },
  // 显示关闭按钮
  showClose: {
    type: Boolean,
    default: true
  },
  // 是否显示遮罩层
  showMask: {
    type: Boolean,
    default: true
  },
  // 是否点击遮罩层关闭弹窗
  maskClosable: {
    type: Boolean,
    default: true
  },
  // 是否开启拖拽关闭
  swipeClose: {
    type: Boolean,
    default: true
  },
  // 拖拽关闭的阈值
  swipeCloseThreshold: {
    type: Number,
    default: 150
  },
  // 触摸事件响应方式
  pointerEvents: {
    type: String,
    default: "auto"
  },
  // 是否开启缓存
  keepAlive: {
    type: Boolean,
    default: false
  },
  // 是否启用 portal
  enablePortal: {
    type: Boolean,
    default: true
  }
}, emits: ["update:modelValue", "open", "opened", "close", "closed", "maskClose"], setup(__props, _a) {
  var __expose = _a.expose, __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const visible = common_vendor.ref(false);
  const status = common_vendor.ref(0);
  const isOpen = common_vendor.ref(false);
  const isOpened = common_vendor.ref(false);
  const zIndex = common_vendor.ref(uni_modules_coolUnix_config.config.zIndex);
  const height = common_vendor.computed(() => {
    switch (props.direction) {
      case "top":
      case "bottom":
        return uni_modules_coolUnix_cool_utils_parse.parseRpx(props.size);
      case "left":
      case "right":
        return "100%";
      default:
        return "";
    }
  });
  const width = common_vendor.computed(() => {
    switch (props.direction) {
      case "top":
      case "bottom":
        return "100%";
      case "left":
      case "right":
      case "center":
        return uni_modules_coolUnix_cool_utils_parse.parseRpx(props.size);
      default:
        return "";
    }
  });
  const paddingBottom = common_vendor.computed(() => {
    let h = 0;
    if (props.direction == "bottom") {
      h += uni_modules_coolUnix_cool_utils_rect.getSafeAreaHeight("bottom");
    }
    return h + "px";
  });
  const isSwipeClose = common_vendor.computed(() => {
    return props.direction == "bottom" && props.swipeClose;
  });
  let timer = 0;
  function open() {
    zIndex.value = uni_modules_coolUnix_config.config.zIndex++;
    if (!visible.value) {
      visible.value = true;
      emit("update:modelValue", true);
      emit("open");
      setTimeout(() => {
        status.value = 1;
        timer = setTimeout(() => {
          isOpened.value = true;
          emit("opened");
        }, 350);
      }, 50);
    }
  }
  function close() {
    if (status.value == 1) {
      isOpened.value = false;
      status.value = 2;
      emit("close");
      if (timer != 0) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        visible.value = false;
        status.value = 0;
        emit("update:modelValue", false);
        emit("closed");
      }, 350);
    }
  }
  function maskClose() {
    if (props.maskClosable) {
      close();
    }
    emit("maskClose");
  }
  const swipe = common_vendor.reactive(new Swipe({
    isMove: false,
    isTouch: false,
    startY: 0,
    offsetY: 0
    // 初始偏移量为0
  }));
  function onTouchStart(e) {
    if (props.direction != "bottom") {
      return null;
    }
    if (isOpened.value && isSwipeClose.value) {
      swipe.isTouch = true;
      swipe.startY = e.touches[0].clientY;
    }
  }
  function onTouchMove(e) {
    if (swipe.isTouch) {
      swipe.isMove = true;
      const offsetY = e.touches[0].pageY - swipe.startY;
      if (offsetY > 0) {
        swipe.offsetY = offsetY;
      }
    }
  }
  function onTouchEnd() {
    if (swipe.isTouch) {
      swipe.isTouch = false;
      swipe.isMove = false;
      if (swipe.offsetY > props.swipeCloseThreshold) {
        close();
      }
      swipe.offsetY = 0;
    }
  }
  const popupStyle = common_vendor.computed(() => {
    const style = new UTSJSONObject({});
    style["height"] = height.value;
    style["width"] = width.value;
    if (swipe.isTouch) {
      style["transform"] = `translateY(${swipe.offsetY}px)`;
    }
    return style;
  });
  common_vendor.watch(common_vendor.computed(() => {
    return props.modelValue;
  }), (val) => {
    if (val) {
      open();
    } else {
      close();
    }
  }, {
    immediate: true
  });
  common_vendor.watch(status, (val) => {
    isOpen.value = val == 1;
  });
  __expose({
    isOpened,
    isOpen,
    open,
    close
  });
  return (_ctx, _cache) => {
    "raw js";
    var _a2, _b, _c, _d, _e, _f, _g;
    const __returned__ = common_vendor.e({
      a: __props.keepAlive ? true : visible.value
    }, (__props.keepAlive ? true : visible.value) ? common_vendor.e({
      b: __props.showMask
    }, __props.showMask ? {
      c: common_vendor.n({}),
      d: common_vendor.n({
        "is-open": status.value == 1,
        "is-close": status.value == 2
      }),
      e: common_vendor.n((_a2 = pt.value.mask) == null ? void 0 : _a2.className),
      f: common_vendor.o(maskClose)
    } : {}, {
      g: isSwipeClose.value
    }, isSwipeClose.value ? {
      h: common_vendor.n({}),
      i: common_vendor.n({
        "-important-bg-surface-400": swipe.isMove
      }),
      j: common_vendor.n((_b = pt.value.draw) == null ? void 0 : _b.className)
    } : {}, {
      k: __props.showHeader
    }, __props.showHeader ? common_vendor.e({
      l: common_vendor.t(__props.title),
      m: common_vendor.p({
        ellipsis: true,
        pt: {
          className: `text-lg font-bold ${(_d = (_c = pt.value.header) == null ? void 0 : _c.text) == null ? void 0 : _d.className}`
        }
      }),
      n: isOpen.value && __props.showClose
    }, isOpen.value && __props.showClose ? {
      o: common_vendor.o(close),
      p: common_vendor.o(() => {
      }),
      q: common_vendor.p({
        name: "close-circle-fill",
        size: 40,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["absolute right--bracket-start-24rpx-bracket-end- text-surface-400", [common_vendor.unref(uni_modules_coolUnix_theme_index.isDark), "text-surface-50"]])
        }
      })
    } : {}, {
      r: common_vendor.n({}),
      s: common_vendor.n((_e = pt.value.header) == null ? void 0 : _e.className)
    }) : {}, {
      t: common_vendor.n({}),
      v: common_vendor.n((_f = pt.value.container) == null ? void 0 : _f.className),
      w: common_vendor.o(() => {
      }),
      x: common_vendor.n({}),
      y: common_vendor.n({
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark)
      }),
      z: common_vendor.n((_g = pt.value.inner) == null ? void 0 : _g.className),
      A: paddingBottom.value,
      B: common_vendor.n({}),
      C: common_vendor.n({
        "is-open": status.value == 1,
        "is-close": status.value == 2,
        "is-custom-navbar": common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).isCustomNavbarPage(),
        "stop-transition": swipe.isTouch
      }),
      D: common_vendor.n(pt.value.className),
      E: common_vendor.s(popupStyle.value),
      F: common_vendor.o(onTouchStart),
      G: common_vendor.o(onTouchMove),
      H: common_vendor.o(onTouchEnd),
      I: common_vendor.o(onTouchEnd),
      J: common_vendor.n({}),
      K: common_vendor.n(`cl-popup-wrapper--${__props.direction}`),
      L: zIndex.value,
      M: __props.pointerEvents,
      N: visible.value,
      O: common_vendor.o(() => {
      })
    }) : {}, {
      P: common_vendor.sei(common_vendor.gei(_ctx, ""), "root-portal"),
      Q: __props.enablePortal
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09d8aefc"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-popup/cl-popup.js.map
