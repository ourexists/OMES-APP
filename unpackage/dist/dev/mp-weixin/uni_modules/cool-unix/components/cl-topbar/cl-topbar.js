"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
const uni_modules_coolUnix_cool_utils_rect = require("../../cool/utils/rect.js");
if (!Array) {
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  (_easycom_cl_icon_1 + _easycom_cl_text_1)();
}
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
const _easycom_cl_text = () => "../cl-text/cl-text.js";
if (!Math) {
  (_easycom_cl_icon + _easycom_cl_text)();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          title: { type: "Unknown", optional: true },
          back: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.title = this.__props__.title;
    this.back = this.__props__.back;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-topbar"
}, { __name: "cl-topbar", props: {
  // 样式透传对象，
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 顶部栏标题文本
  title: {
    type: String,
    default: ""
  },
  // 文字颜色，优先级最高
  color: {
    type: String,
    default: ""
  },
  // 背景颜色，优先级最高
  backgroundColor: {
    type: String,
    default: ""
  },
  // 是否显示返回按钮
  showBack: {
    type: Boolean,
    default: true
  },
  // 是否可以返回
  backable: {
    type: Boolean,
    default: true
  },
  // 返回按钮的跳转路径
  backPath: {
    type: String,
    default: ""
  },
  // 返回按钮的图标
  backIcon: {
    type: String,
    default: "back"
  },
  // 是否使用安全区域顶部边距
  safeAreaTop: {
    type: Boolean,
    default: false
  },
  // 是否固定在顶部
  fixed: {
    type: Boolean,
    default: false
  },
  // 内容高度
  height: {
    type: [Number, String],
    default: null
  }
}, setup(__props) {
  const props = __props;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const offsetTop = common_vendor.computed(() => {
    if (props.safeAreaTop) {
      return uni_modules_coolUnix_cool_utils_rect.getSafeAreaHeight("top") + "px";
    }
    return "0px";
  });
  const height = common_vendor.computed(() => {
    if (props.height == null) {
      return "44px";
    }
    return uni_modules_coolUnix_cool_utils_parse.parseRpx(props.height);
  });
  const backgroundColor = common_vendor.computed(() => {
    if (props.backgroundColor != "") {
      return props.backgroundColor;
    }
    const style = uni_modules_coolUnix_cool_router_index.router.route().style;
    if (style != null) {
      if (style.navigationBarBackgroundColor != null) {
        return style.navigationBarBackgroundColor;
      }
    }
    return "";
  });
  const color = common_vendor.computed(() => {
    if (props.color != "") {
      return props.color;
    }
    const style = uni_modules_coolUnix_cool_router_index.router.route().style;
    if (style != null) {
      if (style.navigationBarTextStyle != null) {
        return style.navigationBarTextStyle;
      }
    }
    return "";
  });
  const topbarStyle = common_vendor.computed(() => {
    const style = new UTSJSONObject({
      paddingTop: offsetTop.value
    });
    if (pt.value.className == null || !pt.value.className.includes("bg-")) {
      style["backgroundColor"] = backgroundColor.value;
    }
    return style;
  });
  function back() {
    if (props.backable) {
      if (props.backPath != "") {
        uni_modules_coolUnix_cool_router_index.router.to(props.backPath);
      } else {
        if (uni_modules_coolUnix_cool_router_index.router.isFirstPage()) {
          uni_modules_coolUnix_cool_router_index.router.home();
        } else {
          uni_modules_coolUnix_cool_router_index.router.back();
        }
      }
    }
  }
  return (_ctx, _cache) => {
    "raw js";
    var _a, _b, _c, _d;
    const __returned__ = common_vendor.e({
      a: __props.fixed
    }, __props.fixed ? {
      b: offsetTop.value,
      c: height.value
    } : {}, {
      d: __props.showBack
    }, __props.showBack ? {
      e: common_vendor.p({
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)([[!__props.backable, "opacity-50"], (_a = pt.value.back) == null ? void 0 : _a.className])
        },
        name: __props.backIcon,
        size: ((_b = pt.value.back) == null ? void 0 : _b.size) ?? 48,
        color: ((_c = pt.value.back) == null ? void 0 : _c.color) ?? color.value
      }),
      f: common_vendor.o(($event) => {
        return back();
      })
    } : {}, {
      g: common_vendor.t(__props.title),
      h: common_vendor.p({
        color: color.value,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["text-md", (_d = pt.value.title) == null ? void 0 : _d.className])
        }
      }),
      i: height.value,
      j: common_vendor.n({}),
      k: common_vendor.n({
        "cl-topbar--fixed": __props.fixed
      }),
      l: common_vendor.n(pt.value.className),
      m: common_vendor.s(topbarStyle.value)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f35d7595"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-topbar/cl-topbar.js.map
