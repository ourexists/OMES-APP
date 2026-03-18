"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  _easycom_cl_text_1();
}
const _easycom_cl_text = () => "../cl-text/cl-text.js";
if (!Math) {
  _easycom_cl_text();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          text: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.text = this.__props__.text;
    delete this.__props__;
  }
}
class Scroll extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          left: { type: Number, optional: false },
          top: { type: Number, optional: false },
          translateX: { type: Number, optional: false },
          duration: { type: Number, optional: false }
        };
      },
      name: "Scroll"
    };
  }
  constructor(options, metadata = Scroll.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.left = this.__props__.left;
    this.top = this.__props__.top;
    this.translateX = this.__props__.translateX;
    this.duration = this.__props__.duration;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-noticebar"
}, { __name: "cl-noticebar", props: {
  // 样式穿透对象，允许外部自定义样式
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 公告文本内容，支持字符串或字符串数组
  text: {
    type: [String, Array],
    default: ""
  },
  // 滚动方向，支持 horizontal（水平）或 vertical（垂直）
  direction: {
    type: String,
    default: "horizontal"
  },
  // 垂直滚动时的切换间隔，单位：毫秒
  duration: {
    type: Number,
    default: 3e3
  },
  // 水平滚动时的速度，单位：px/s
  speed: {
    type: Number,
    default: 100
  },
  // 公告栏高度，支持字符串或数字
  height: {
    type: [String, Number],
    default: 40
  }
}, emits: ["close"], setup(__props, _a) {
  _a.emit;
  const props = __props;
  const proxy = common_vendor.getCurrentInstance().proxy;
  const windowWidth = common_vendor.index.getWindowInfo().windowWidth;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const scroll = common_vendor.reactive(new Scroll({
    left: windowWidth,
    top: 0,
    translateX: 0,
    duration: 0
  }));
  let timer = 0;
  const list = common_vendor.computed(() => {
    return Array.isArray(props.text) ? props.text : [props.text];
  });
  const scrollerStyle = common_vendor.computed(() => {
    const style = new UTSJSONObject({});
    if (props.direction == "horizontal") {
      style["left"] = `${scroll.left}px`;
      style["transform"] = `translateX(-${scroll.translateX}px)`;
      style["transition-duration"] = `${scroll.duration}ms`;
    } else {
      style["transform"] = `translateY(${scroll.top}px)`;
    }
    return style;
  });
  function clear() {
    if (timer != 0) {
      clearInterval(timer);
      clearTimeout(timer);
      timer = 0;
    }
  }
  function refresh() {
    clear();
    common_vendor.index.createSelectorQuery().in(proxy).select(".cl-noticebar").boundingClientRect((box = null) => {
      var _a2, _b;
      const boxHeight = (_a2 = box.height) !== null && _a2 !== void 0 ? _a2 : 0;
      const boxWidth = (_b = box.width) !== null && _b !== void 0 ? _b : 0;
      common_vendor.index.createSelectorQuery().in(proxy).select(".cl-noticebar__text").boundingClientRect((text = null) => {
        var _a3;
        if (props.direction == "horizontal") {
          let next = function() {
            scroll.translateX = textWidth + boxWidth;
            scroll.duration = Math.ceil(scroll.translateX / props.speed * 1e3);
            scroll.left = boxWidth;
            timer = setTimeout(() => {
              scroll.translateX = 0;
              scroll.duration = 0;
              setTimeout(() => {
                next();
              }, 100);
            }, scroll.duration);
          };
          const textWidth = (_a3 = text.width) !== null && _a3 !== void 0 ? _a3 : 0;
          next();
        } else {
          timer = setInterval(() => {
            if (Math.abs(scroll.top) >= boxHeight * (list.value.length - 1)) {
              scroll.top = 0;
            } else {
              scroll.top -= boxHeight;
            }
          }, props.duration);
        }
      }).exec();
    }).exec();
  }
  common_vendor.onMounted(() => {
    common_vendor.watch(common_vendor.computed(() => {
      return props.text;
    }), () => {
      refresh();
    }, {
      immediate: true
    });
  });
  common_vendor.onUnmounted(() => {
    clear();
  });
  return (_ctx, _cache) => {
    "raw js";
    var _a2;
    const __returned__ = {
      a: common_vendor.f(list.value, (item, index, i0) => {
        return {
          a: common_vendor.t(item),
          b: "5cb826b1-0-" + i0,
          c: "text-" + i0,
          d: common_vendor.r("text", {
            item
          }, i0),
          e: index
        };
      }),
      b: common_vendor.p({
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["whitespace-nowrap", (_a2 = pt.value.text) == null ? void 0 : _a2.className])
        }
      }),
      c: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseRpx)(__props.height),
      d: common_vendor.n({}),
      e: common_vendor.n(`is-${__props.direction}`),
      f: common_vendor.s(scrollerStyle.value),
      g: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      h: common_vendor.n({}),
      i: common_vendor.n(pt.value.className),
      j: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseRpx)(__props.height)
    };
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5cb826b1"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-noticebar/cl-noticebar.js.map
