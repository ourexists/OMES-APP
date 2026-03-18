"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
const uni_modules_coolUnix_locale_index = require("../../locale/index.js");
const uni_modules_coolUnix_hooks_form = require("../../hooks/form.js");
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
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          icon: { type: "Unknown", optional: true },
          placeholder: { type: "Unknown", optional: true },
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
    this.icon = this.__props__.icon;
    this.placeholder = this.__props__.placeholder;
    this.text = this.__props__.text;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-select-trigger"
}, { __name: "cl-select-trigger", props: {
  // 透传样式配置
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 显示文本
  text: {
    type: String,
    default: ""
  },
  // 占位符文本
  placeholder: {
    type: String,
    default: () => {
      return uni_modules_coolUnix_locale_index.t("请选择");
    }
  },
  // 箭头图标名称
  arrowIcon: {
    type: String,
    default: "arrow-down-s-line"
  },
  // 是否禁用选择器
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否聚焦
  focus: {
    type: Boolean,
    default: false
  }
}, emits: ["open", "clear"], setup(__props, _a) {
  var __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const disabled = uni_modules_coolUnix_hooks_form.useForm().disabled;
  const isError = uni_modules_coolUnix_hooks_form.useFormItem().isError;
  const isDisabled = common_vendor.computed(() => {
    return disabled.value || props.disabled;
  });
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const showText = common_vendor.computed(() => {
    return props.text != "";
  });
  function clear() {
    emit("clear");
  }
  function open() {
    if (isDisabled.value) {
      return null;
    }
    emit("open");
  }
  return (_ctx, _cache) => {
    "raw js";
    var _a2, _b, _c, _d, _e;
    const __returned__ = common_vendor.e({
      a: showText.value
    }, showText.value ? {
      b: common_vendor.t(__props.text),
      c: common_vendor.p({
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)([{
            "text-surface-400": isDisabled.value
          }, (_a2 = pt.value.text) == null ? void 0 : _a2.className])
        },
        ellipsis: true
      })
    } : {
      d: common_vendor.t(__props.placeholder),
      e: common_vendor.p({
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["text-surface-400", (_b = pt.value.placeholder) == null ? void 0 : _b.className])
        }
      })
    }, {
      f: showText.value && !isDisabled.value
    }, showText.value && !isDisabled.value ? {
      g: common_vendor.p({
        name: "close-circle-fill",
        size: 32,
        pt: {
          className: "text-surface-400"
        }
      }),
      h: common_vendor.o(clear)
    } : {}, {
      i: !isDisabled.value && !showText.value
    }, !isDisabled.value && !showText.value ? {
      j: common_vendor.p({
        name: ((_c = pt.value.icon) == null ? void 0 : _c.name) ?? __props.arrowIcon,
        size: ((_d = pt.value.icon) == null ? void 0 : _d.size) ?? 32,
        pt: {
          className: `text-surface-400 ${(_e = pt.value.icon) == null ? void 0 : _e.className}`
        }
      })
    } : {}, {
      k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      l: common_vendor.n({}),
      m: common_vendor.n({
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark),
        "cl-select-trigger--disabled": isDisabled.value,
        "cl-select-trigger--focus": __props.focus,
        "cl-select-trigger--error": common_vendor.unref(isError)
      }),
      n: common_vendor.n(pt.value.className),
      o: common_vendor.o(open)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-201d67bf"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-select-trigger/cl-select-trigger.js.map
