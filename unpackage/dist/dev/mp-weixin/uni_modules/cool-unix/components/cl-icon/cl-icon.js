"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
const uni_modules_coolUnix_cool_ctx_index = require("../../cool/ctx/index.js");
const uni_modules_coolUnix_cool_hooks_cache = require("../../cool/hooks/cache.js");
const uni_modules_coolUnix_cool_utils_tailwind = require("../../cool/utils/tailwind.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
const uni_modules_coolUnix_hooks_size = require("../../hooks/size.js");
const uni_modules_coolUnix_icons_index = require("../../icons/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    delete this.__props__;
  }
}
class Icon extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          font: { type: String, optional: false },
          text: { type: String, optional: false }
        };
      },
      name: "Icon"
    };
  }
  constructor(options, metadata = Icon.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.font = this.__props__.font;
    this.text = this.__props__.text;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-icon"
}, { __name: "cl-icon", props: {
  // 透传样式
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 图标名称
  name: {
    type: String,
    default: ""
  },
  // 图标大小
  size: {
    type: [String, Number],
    default: 32
  },
  // 图标高度
  height: {
    type: [String, Number],
    default: null
  },
  // 图标宽度
  width: {
    type: [String, Number],
    default: null
  },
  // 图标颜色
  color: {
    type: String,
    default: ""
  }
}, setup(__props) {
  const props = __props;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const cache = uni_modules_coolUnix_cool_hooks_cache.useCache(() => {
    return [props.color];
  }).cache;
  const _a = uni_modules_coolUnix_hooks_size.useSize(() => {
    var _a2;
    return (_a2 = pt.value.className) !== null && _a2 !== void 0 ? _a2 : "";
  }), getRpx = _a.getRpx, ptClassName = _a.ptClassName;
  const icon = common_vendor.computed(() => {
    let font = "";
    let text = "";
    try {
      let code = "";
      uni_modules_coolUnix_cool_utils_comm.forInObject(uni_modules_coolUnix_icons_index.icons, (value = null, key) => {
        if (uni_modules_coolUnix_cool_utils_comm.has(value, props.name)) {
          font = key;
          code = uni_modules_coolUnix_cool_utils_comm.get(value, props.name);
        }
      });
      text = String.fromCharCode(parseInt(code, 16));
    } catch (e) {
      common_vendor.index.__f__("error", "at uni_modules/cool-unix/components/cl-icon/cl-icon.uvue:90", `图标 ${props.name} 不存在`, e);
    }
    return new Icon({
      font,
      text
    });
  });
  const color = common_vendor.computed(() => {
    if (props.color != "") {
      switch (props.color) {
        case "primary":
          return uni_modules_coolUnix_cool_ctx_index.ctx.color["primary-500"];
        case "success":
          return "#22c55e";
        case "warn":
          return "#eab308";
        case "error":
          return "#ef4444";
        case "info":
          return uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-500"];
        case "dark":
          return uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-700"];
        case "light":
          return uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-50"];
        case "disabled":
          return uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-300"];
        default:
          return props.color;
      }
    }
    return uni_modules_coolUnix_theme_index.isDark.value ? "white" : uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-700"];
  });
  const iconStyle = common_vendor.computed(() => {
    var _a2, _b;
    const style = new UTSJSONObject({});
    if (!uni_modules_coolUnix_cool_utils_tailwind.hasTextColor(ptClassName.value)) {
      style["color"] = color.value;
    }
    if (icon.value.font != "") {
      style["fontFamily"] = icon.value.font;
    }
    style["fontSize"] = getRpx(props.size);
    style["height"] = getRpx((_a2 = props.height) !== null && _a2 !== void 0 ? _a2 : props.size);
    style["lineHeight"] = getRpx(props.size);
    style["width"] = getRpx((_b = props.width) !== null && _b !== void 0 ? _b : props.size);
    return style;
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.t(icon.value.text),
      b: common_vendor.sei(common_vendor.gei(_ctx, ""), "text"),
      c: common_vendor.n({}),
      d: common_vendor.n(common_vendor.unref(ptClassName)),
      e: common_vendor.s(iconStyle.value),
      f: common_vendor.unref(cache).key
    };
    return __returned__;
  };
} }));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-icon/cl-icon.js.map
