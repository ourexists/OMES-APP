"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
const uni_modules_coolUnix_cool_ctx_index = require("../../cool/ctx/index.js");
const uni_modules_coolUnix_cool_hooks_cache = require("../../cool/hooks/cache.js");
const uni_modules_coolUnix_cool_utils_tailwind = require("../../cool/utils/tailwind.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
const uni_modules_coolUnix_hooks_size = require("../../hooks/size.js");
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-text"
}, { __name: "cl-text", props: {
  // 透传样式
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 显示的值
  value: {
    type: [String, Number],
    default: null
  },
  // 文本颜色
  color: {
    type: String,
    default: ""
  },
  // 字体大小
  size: {
    type: [Number, String],
    default: null
  },
  // 文本类型
  type: {
    type: String,
    default: "default"
  },
  // 是否开启脱敏/加密
  mask: {
    type: Boolean,
    default: false
  },
  // 金额货币符号
  currency: {
    type: String,
    default: "¥"
  },
  // 金额小数位数
  precision: {
    type: Number,
    default: 2
  },
  // 脱敏起始位置
  maskStart: {
    type: Number,
    default: 3
  },
  // 脱敏结束位置
  maskEnd: {
    type: Number,
    default: 4
  },
  // 脱敏替换字符
  maskChar: {
    type: String,
    default: "*"
  },
  // 是否省略号
  ellipsis: {
    type: Boolean,
    default: false
  },
  // 最大行数，仅在ellipsis时生效
  lines: {
    type: Number,
    default: 1
  },
  // 是否可选择
  selectable: {
    type: Boolean,
    default: false
  },
  // 显示连续空格
  space: {
    type: String,
    default: ""
  },
  // 是否解码 (app平台如需解析字符实体，需要配置为 true)
  decode: {
    type: Boolean,
    default: false
  },
  // 是否保留单词
  preWrap: {
    type: Boolean,
    default: false
  }
}, setup(__props) {
  common_vendor.useCssVars((_ctx = null) => {
    return new UTSJSONObject({
      "4505c7ee": __props.lines
    });
  });
  const props = __props;
  const cache = uni_modules_coolUnix_cool_hooks_cache.useCache(() => {
    return [props.color, props];
  }).cache;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const _a = uni_modules_coolUnix_hooks_size.useSize(() => {
    var _a2;
    return (_a2 = pt.value.className) !== null && _a2 !== void 0 ? _a2 : "";
  }), getSize = _a.getSize, getLineHeight = _a.getLineHeight, ptClassName = _a.ptClassName;
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
          return uni_modules_coolUnix_theme_index.isDark.value ? uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-300"] : uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-500"];
        case "dark":
          return uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-700"];
        case "light":
          return uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-50"];
        case "disabled":
          return uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-400"];
        default:
          return props.color;
      }
    }
    return uni_modules_coolUnix_theme_index.isDark.value ? "white" : uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-700"];
  });
  const isDefaultSize = common_vendor.computed(() => {
    var _a2;
    return !uni_modules_coolUnix_cool_utils_tailwind.hasTextSize((_a2 = pt.value.className) !== null && _a2 !== void 0 ? _a2 : "");
  });
  const textStyle = common_vendor.computed(() => {
    const style = new UTSJSONObject({});
    if (props.ellipsis) {
      style["lines"] = props.lines;
    }
    if (!uni_modules_coolUnix_cool_utils_tailwind.hasTextColor(ptClassName.value)) {
      style["color"] = color.value;
    }
    const fontSize = getSize(props.size);
    if (fontSize != null) {
      style["fontSize"] = fontSize;
    }
    const isMultiLine = props.preWrap || !props.ellipsis || props.lines > 1;
    if (isMultiLine) {
      style["lineHeight"] = "normal";
    } else {
      const lineHeight = getLineHeight();
      if (lineHeight != null) {
        style["lineHeight"] = lineHeight;
      }
    }
    return style;
  });
  function formatPhone(phone) {
    if (phone.length != 11 || !props.mask)
      return phone;
    return phone.replace(/(\d{3})\d{4}(\d{4})/, `$1${props.maskChar.repeat(4)}$2`);
  }
  function formatName(name) {
    if (name.length <= 1 || !props.mask)
      return name;
    if (name.length == 2) {
      return name[0] + props.maskChar;
    }
    return name[0] + props.maskChar.repeat(name.length - 2) + name[name.length - 1];
  }
  function formatAmount(amount) {
    let num;
    if (typeof amount == "number") {
      num = amount;
    } else {
      num = parseFloat(amount);
    }
    const formatted = num.toFixed(props.precision);
    const parts = formatted.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return props.currency + parts.join(".");
  }
  function formatCard(card) {
    if (card.length < 8 || !props.mask)
      return card;
    const start = card.substring(0, props.maskStart);
    const end = card.substring(card.length - props.maskEnd);
    const middle = props.maskChar.repeat(card.length - props.maskStart - props.maskEnd);
    return start + middle + end;
  }
  function formatEmail(email) {
    if (!props.mask)
      return email;
    const atIndex = email.indexOf("@");
    if (atIndex == -1)
      return email;
    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex);
    if (username.length <= 2)
      return email;
    const maskedUsername = username[0] + props.maskChar.repeat(username.length - 2) + username[username.length - 1];
    return maskedUsername + domain;
  }
  const content = common_vendor.computed(() => {
    var _a2;
    const val = (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : "";
    switch (props.type) {
      case "phone":
        return formatPhone(val);
      case "name":
        return formatName(val);
      case "amount":
        return formatAmount(val);
      case "card":
        return formatCard(val);
      case "email":
        return formatEmail(val);
      default:
        return val;
    }
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.t(content.value),
      b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      c: common_vendor.n({}),
      d: common_vendor.n({
        "cl-text--pre-wrap": __props.preWrap,
        "cl-text--ellipsis": __props.ellipsis,
        "cl-text--default-size": isDefaultSize.value
      }),
      e: common_vendor.n(common_vendor.unref(ptClassName)),
      f: common_vendor.s(textStyle.value),
      g: common_vendor.s(_ctx.__cssVars()),
      h: __props.selectable,
      i: __props.space,
      j: __props.decode,
      k: common_vendor.unref(cache).key
    };
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6529d47"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-text/cl-text.js.map
