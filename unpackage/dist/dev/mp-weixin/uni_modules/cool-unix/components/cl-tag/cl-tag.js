"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-tag"
}, { __name: "cl-tag", props: {
  // 透传样式
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 类型
  type: {
    type: String,
    default: "primary"
  },
  // 图标
  icon: {
    type: String,
    default: ""
  },
  // 圆角
  rounded: {
    type: Boolean,
    default: false
  },
  // 可关闭
  closable: {
    type: Boolean,
    default: false
  },
  // 镂空
  plain: {
    type: Boolean,
    default: false
  }
}, emits: ["close"], setup(__props, _a) {
  var __emit = _a.emit;
  const props = __props;
  const emits = __emit;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const isHide = common_vendor.ref(false);
  function close() {
    isHide.value = true;
    emits("close");
  }
  const color = common_vendor.computed(() => {
    if (uni_modules_coolUnix_theme_index.isDark.value && props.type == "info") {
      return "white";
    }
    if (props.plain) {
      return props.type;
    } else {
      return "white";
    }
  });
  return (_ctx, _cache) => {
    "raw js";
    var _a2;
    const __returned__ = common_vendor.e({
      a: !isHide.value
    }, !isHide.value ? common_vendor.e({
      b: __props.icon != ""
    }, __props.icon != "" ? {
      c: common_vendor.p({
        name: __props.icon,
        size: 28,
        color: "white",
        pt: {
          className: "mr-1 ml--bracket-start--4rpx-bracket-end-"
        }
      })
    } : {}, {
      d: common_vendor.p({
        color: color.value,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["cl-tag__text text-sm", (_a2 = pt.value.text) == null ? void 0 : _a2.className])
        }
      }),
      e: __props.closable
    }, __props.closable ? {
      f: common_vendor.o(close),
      g: common_vendor.p({
        name: "close-circle-line",
        size: 28,
        color: "white",
        pt: {
          className: "ml-1 mr--bracket-start--4rpx-bracket-end-"
        }
      })
    } : {}, {
      h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      i: common_vendor.n({}),
      j: common_vendor.n(`cl-tag--${__props.type}`),
      k: common_vendor.n({
        "cl-tag--rounded": __props.rounded,
        "cl-tag--plain": __props.plain,
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark)
      }),
      l: common_vendor.n(pt.value.className)
    }) : {});
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fd1605fc"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-tag/cl-tag.js.map
