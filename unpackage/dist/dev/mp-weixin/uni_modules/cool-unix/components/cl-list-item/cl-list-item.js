"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
const uni_modules_coolUnix_hooks_touch = require("../../hooks/touch.js");
if (!Array) {
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_collapse_1 = common_vendor.resolveComponent("cl-collapse");
  (_easycom_cl_icon_1 + _easycom_cl_image_1 + _easycom_cl_text_1 + _easycom_cl_collapse_1)();
}
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
const _easycom_cl_image = () => "../cl-image/cl-image.js";
const _easycom_cl_text = () => "../cl-text/cl-text.js";
const _easycom_cl_collapse = () => "../cl-collapse/cl-collapse.js";
if (!Math) {
  (_easycom_cl_icon + _easycom_cl_image + _easycom_cl_text + _easycom_cl_collapse)();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          wrapper: { type: "Unknown", optional: true },
          inner: { type: "Unknown", optional: true },
          label: { type: "Unknown", optional: true },
          content: { type: "Unknown", optional: true },
          icon: { type: "Unknown", optional: true },
          image: { type: "Unknown", optional: true },
          collapse: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.wrapper = this.__props__.wrapper;
    this.inner = this.__props__.inner;
    this.label = this.__props__.label;
    this.content = this.__props__.content;
    this.icon = this.__props__.icon;
    this.image = this.__props__.image;
    this.collapse = this.__props__.collapse;
    delete this.__props__;
  }
}
class Swipe extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          width: { type: Number, optional: false },
          maxX: { type: Number, optional: false },
          startX: { type: Number, optional: false },
          endX: { type: Number, optional: false },
          offsetX: { type: Number, optional: false },
          direction: { type: "Unknown", optional: false },
          moveDirection: { type: "Unknown", optional: false }
        };
      },
      name: "Swipe"
    };
  }
  constructor(options, metadata = Swipe.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.width = this.__props__.width;
    this.maxX = this.__props__.maxX;
    this.startX = this.__props__.startX;
    this.endX = this.__props__.endX;
    this.offsetX = this.__props__.offsetX;
    this.direction = this.__props__.direction;
    this.moveDirection = this.__props__.moveDirection;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-list-item"
}, { __name: "cl-list-item", props: {
  // 透传样式配置
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 图标名称
  icon: {
    type: String,
    default: ""
  },
  // 图标名称
  image: {
    type: String,
    default: ""
  },
  // 标签文本
  label: {
    type: String,
    default: ""
  },
  // 内容对齐方式
  justify: {
    type: String,
    default: "end"
  },
  // 是否显示箭头
  arrow: {
    type: Boolean,
    default: false
  },
  // 是否可滑动
  swipeable: {
    type: Boolean,
    default: false
  },
  // 是否显示点击态
  hoverable: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否显示折叠
  collapse: {
    type: Boolean,
    default: false
  }
}, setup(__props, _a) {
  var __expose = _a.expose;
  const props = __props;
  const proxy = common_vendor.getCurrentInstance().proxy;
  const slots = common_vendor.useSlots();
  const touch = uni_modules_coolUnix_hooks_touch.useTouch();
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const swipe = common_vendor.reactive(new Swipe({
    width: 0,
    maxX: 0,
    startX: 0,
    endX: 0,
    offsetX: 0,
    direction: "left",
    moveDirection: "left"
    // 默认向左移动
  }));
  function initSwipe() {
    if (!props.swipeable)
      return null;
    swipe.direction = slots["swipe-left"] != null ? "right" : "left";
    common_vendor.index.createSelectorQuery().in(proxy).select(".cl-list-item__swipe").boundingClientRect((node = null) => {
      var _a2;
      swipe.width = (_a2 = node.width) !== null && _a2 !== void 0 ? _a2 : 0;
      swipe.maxX = swipe.width * (swipe.direction == "left" ? -1 : 1);
    }).exec();
  }
  function resetSwipe() {
    swipe.startX = 0;
    swipe.endX = 0;
    swipe.offsetX = 0;
  }
  function swipeTo(num) {
    swipe.offsetX = num;
    swipe.endX = num;
  }
  const isHover = common_vendor.ref(false);
  function onTouchStart(e) {
    touch.start(e);
    isHover.value = true;
    if (props.swipeable) {
      swipe.startX = e.touches[0].pageX;
    }
  }
  function onTouchEnd() {
    if (isHover.value) {
      touch.end();
      const threshold = swipe.width / 2 > 50 ? 50 : swipe.width / 2;
      const offset = Math.abs(swipe.offsetX - swipe.endX);
      isHover.value = false;
      if (offset > threshold) {
        if (swipe.direction == swipe.moveDirection) {
          swipeTo(swipe.maxX);
        } else {
          swipeTo(0);
        }
      } else {
        swipeTo(swipe.endX == 0 ? 0 : swipe.maxX);
      }
    }
  }
  function onTouchCancel() {
    onTouchEnd();
    isHover.value = false;
  }
  function onTouchMove(e) {
    if (isHover.value) {
      touch.move(e);
      if (touch.horizontal != 1) {
        return null;
      }
      const offsetX = e.touches[0].pageX - swipe.startX;
      swipe.moveDirection = offsetX > 0 ? "right" : "left";
      let x = offsetX + swipe.endX;
      if (swipe.direction == "right") {
        if (x > swipe.maxX) {
          x = swipe.maxX;
        }
        if (x < 0) {
          x = 0;
        }
      }
      if (swipe.direction == "left") {
        if (x < swipe.maxX) {
          x = swipe.maxX;
        }
        if (x > 0) {
          x = 0;
        }
      }
      swipe.offsetX = x;
    }
  }
  const isCollapse = common_vendor.ref(false);
  function onTap() {
    if (props.collapse) {
      isCollapse.value = !isCollapse.value;
    }
  }
  common_vendor.onMounted(() => {
    setTimeout(() => {
      initSwipe();
    }, 0);
  });
  __expose({
    initSwipe,
    resetSwipe
  });
  return (_ctx, _cache) => {
    "raw js";
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const __returned__ = common_vendor.e({
      a: __props.icon != ""
    }, __props.icon != "" ? {
      b: common_vendor.p({
        name: __props.icon,
        size: ((_a2 = pt.value.icon) == null ? void 0 : _a2.size) ?? 36,
        color: (_b = pt.value.icon) == null ? void 0 : _b.color,
        pt: {
          className: `mr-3 ${(_c = pt.value.icon) == null ? void 0 : _c.className}`
        }
      })
    } : {}, {
      c: __props.image != ""
    }, __props.image != "" ? {
      d: common_vendor.p({
        width: ((_d = pt.value.image) == null ? void 0 : _d.width) ?? 36,
        height: ((_e = pt.value.image) == null ? void 0 : _e.height) ?? 36,
        src: __props.image,
        pt: {
          className: `mr-3 rounded-full ${(_f = pt.value.image) == null ? void 0 : _f.className}`
        }
      })
    } : {}, {
      e: __props.label != ""
    }, __props.label != "" ? {
      f: common_vendor.t(__props.label),
      g: common_vendor.p({
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["cl-list-item__label whitespace-nowrap overflow-visible", [__props.justify == "start", "w-24"], (_g = pt.value.label) == null ? void 0 : _g.className])
        }
      })
    } : {}, {
      h: common_vendor.n({}),
      i: common_vendor.n({
        "justify-start": __props.justify == "start",
        "justify-center": __props.justify == "center",
        "justify-end": __props.justify == "end"
      }),
      j: common_vendor.n((_h = pt.value.content) == null ? void 0 : _h.className),
      k: __props.arrow
    }, __props.arrow ? {
      l: common_vendor.p({
        name: "arrow-right-s-line",
        size: 36,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["text-surface-400 ml-1 duration-200", {
            "rotate-90": isCollapse.value
          }])
        }
      })
    } : {}, {
      m: common_vendor.n({}),
      n: common_vendor.n((_i = pt.value.inner) == null ? void 0 : _i.className),
      o: __props.swipeable
    }, __props.swipeable ? {
      p: common_vendor.n({}),
      q: common_vendor.n(`cl-list-item__swipe-${swipe.direction}`)
    } : {}, {
      r: common_vendor.n({}),
      s: common_vendor.n({
        "is-transition": !isHover.value,
        [common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "bg-surface-800" : "bg-white"]: true,
        [common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "-important-bg-surface-700" : "-important-bg-surface-50"]: __props.hoverable && isHover.value
      }),
      t: common_vendor.n((_j = pt.value.wrapper) == null ? void 0 : _j.className),
      v: `translateX(${swipe.offsetX}px)`,
      w: common_vendor.o(onTap),
      x: common_vendor.o(($event) => {
        return isCollapse.value = $event;
      }),
      y: common_vendor.p({
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["p--bracket-start-24rpx-bracket-end-", (_k = pt.value.collapse) == null ? void 0 : _k.className])
        },
        modelValue: isCollapse.value
      }),
      z: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      A: common_vendor.n({}),
      B: common_vendor.n({
        "cl-list-item--disabled": __props.disabled
      }),
      C: common_vendor.n(pt.value.className),
      D: common_vendor.o(onTouchStart),
      E: common_vendor.o(onTouchEnd),
      F: common_vendor.o(onTouchMove),
      G: common_vendor.o(onTouchCancel)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6cae163e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-list-item/cl-list-item.js.map
