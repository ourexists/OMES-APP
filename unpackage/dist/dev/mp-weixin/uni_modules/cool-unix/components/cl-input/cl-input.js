"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
const uni_modules_coolUnix_locale_index = require("../../locale/index.js");
const uni_modules_coolUnix_hooks_form = require("../../hooks/form.js");
const uni_modules_coolUnix_hooks_size = require("../../hooks/size.js");
if (!Array) {
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  _easycom_cl_icon_1();
}
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
if (!Math) {
  _easycom_cl_icon();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          inner: { type: "Unknown", optional: true },
          prefixIcon: { type: "Unknown", optional: true },
          suffixIcon: { type: "Unknown", optional: true }
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
    this.prefixIcon = this.__props__.prefixIcon;
    this.suffixIcon = this.__props__.suffixIcon;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-input"
}, { __name: "cl-input", props: {
  // 透传样式
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 绑定值
  modelValue: {
    type: String,
    default: ""
  },
  // 输入框类型
  type: {
    type: String,
    default: "text"
  },
  // 前缀图标
  prefixIcon: {
    type: String,
    default: ""
  },
  // 后缀图标
  suffixIcon: {
    type: String,
    default: ""
  },
  // 是否密码框
  password: {
    type: Boolean,
    default: false
  },
  // 是否自动聚焦
  autofocus: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: null
  },
  // 占位符
  placeholder: {
    type: String,
    default: () => {
      return uni_modules_coolUnix_locale_index.t("请输入");
    }
  },
  // 占位符样式类
  placeholderClass: {
    type: String,
    default: ""
  },
  // 是否显示边框
  border: {
    type: Boolean,
    default: true
  },
  // 是否可清除
  clearable: {
    type: Boolean,
    default: false
  },
  // 光标与键盘的距离
  cursorSpacing: {
    type: Number,
    default: 5
  },
  // 点击键盘确认按钮时是否保持键盘不收起
  confirmHold: {
    type: Boolean,
    default: false
  },
  // 设置键盘右下角按钮的文字
  confirmType: {
    type: String,
    default: "done"
  },
  // 键盘弹起时，是否自动上推页面
  adjustPosition: {
    type: Boolean,
    default: true
  },
  // 最大输入长度
  maxlength: {
    type: Number,
    default: 140
  },
  // 是否保持键盘不收起
  holdKeyboard: {
    type: Boolean,
    default: false
  },
  // 保留精度
  precision: {
    type: Number,
    default: 0
  }
}, emits: [
  "update:modelValue",
  "input",
  "change",
  "focus",
  "blur",
  "confirm",
  "clear",
  "keyboardheightchange"
], setup(__props, _a) {
  var __expose = _a.expose, __emit = _a.emit;
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
  const _b = uni_modules_coolUnix_hooks_size.useSize(() => {
    var _a2, _b2;
    return (_b2 = (_a2 = pt.value.inner) === null || _a2 === void 0 ? null : _a2.className) !== null && _b2 !== void 0 ? _b2 : "";
  }), ptClassName = _b.ptClassName, getSize = _b.getSize;
  const inputStyle = common_vendor.computed(() => {
    const style = new UTSJSONObject({});
    const fontSize = getSize(null);
    if (fontSize != null) {
      style["fontSize"] = fontSize;
    }
    return style;
  });
  const value = common_vendor.ref("");
  const isFocus = common_vendor.ref(props.autofocus);
  const showClear = common_vendor.computed(() => {
    return isFocus.value && props.clearable && value.value != "";
  });
  const isPassword = common_vendor.ref(props.password);
  const isExceed = common_vendor.computed(() => {
    if (props.type == "digit" && props.precision >= 0 && value.value != "") {
      const parts = value.value.split(".");
      return parts.length > 1 && parts[1].length > props.precision;
    } else {
      return false;
    }
  });
  function showPassword() {
    isPassword.value = !isPassword.value;
  }
  function onFocus(e) {
    isFocus.value = true;
    emit("focus", e);
  }
  function onBlur(e) {
    emit("blur", e);
    if (props.type == "digit" && props.precision > 0 && value.value != "") {
      const numValue = parseFloat(value.value);
      if (!isNaN(numValue)) {
        const formattedValue = numValue.toFixed(props.precision);
        value.value = formattedValue;
        emit("update:modelValue", formattedValue);
        emit("change", formattedValue);
      }
    }
    setTimeout(() => {
      isFocus.value = false;
    }, 0);
  }
  function onInput(e) {
    const v1 = e.detail.value;
    const v2 = value.value;
    value.value = v1;
    emit("update:modelValue", v1);
    emit("input", e);
    if (v1 != v2) {
      emit("change", v1);
    }
  }
  function onConfirm(e) {
    emit("confirm", e);
  }
  function onKeyboardheightchange(e) {
    emit("keyboardheightchange", e);
  }
  function onTap() {
    if (isDisabled.value) {
      return null;
    }
    isFocus.value = true;
  }
  function focus() {
    setTimeout(() => {
      isFocus.value = false;
      common_vendor.nextTick$1(() => {
        isFocus.value = true;
      });
    }, 0);
  }
  function clear() {
    value.value = "";
    emit("update:modelValue", "");
    emit("change", "");
    emit("clear");
  }
  common_vendor.watch(common_vendor.computed(() => {
    return props.modelValue;
  }), (val) => {
    value.value = val;
  }, {
    immediate: true
  });
  __expose({
    isFocus,
    focus,
    clear
  });
  return (_ctx, _cache) => {
    "raw js";
    var _a2, _b2, _c, _d;
    const __returned__ = common_vendor.e({
      a: __props.prefixIcon
    }, __props.prefixIcon ? {
      b: common_vendor.p({
        name: __props.prefixIcon,
        size: ((_a2 = pt.value.prefixIcon) == null ? void 0 : _a2.size) ?? 32,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)([(_b2 = pt.value.prefixIcon) == null ? void 0 : _b2.className])
        }
      })
    } : {}, {
      c: common_vendor.n({}),
      d: common_vendor.n({
        "is-disabled": isDisabled.value,
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark),
        "is-exceed": isExceed.value
      }),
      e: common_vendor.n(common_vendor.unref(ptClassName)),
      f: common_vendor.s(inputStyle.value),
      g: value.value,
      h: __props.readonly ?? isDisabled.value,
      i: __props.type,
      j: isPassword.value,
      k: isFocus.value,
      l: __props.placeholder,
      m: `text-surface-400 ${__props.placeholderClass}`,
      n: __props.maxlength,
      o: __props.cursorSpacing,
      p: __props.confirmType,
      q: __props.confirmHold,
      r: __props.adjustPosition,
      s: __props.holdKeyboard,
      t: common_vendor.o(onInput),
      v: common_vendor.o(onFocus),
      w: common_vendor.o(onBlur),
      x: common_vendor.o(onConfirm),
      y: common_vendor.o(onKeyboardheightchange),
      z: __props.suffixIcon
    }, __props.suffixIcon ? {
      A: common_vendor.p({
        name: __props.suffixIcon,
        size: ((_c = pt.value.suffixIcon) == null ? void 0 : _c.size) ?? 32,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)([(_d = pt.value.prefixIcon) == null ? void 0 : _d.className])
        }
      })
    } : {}, {
      B: showClear.value
    }, showClear.value ? {
      C: common_vendor.p({
        name: "close-circle-fill",
        size: 32,
        pt: {
          className: "-important-text-surface-400"
        }
      }),
      D: common_vendor.o(clear)
    } : {}, {
      E: __props.password
    }, __props.password ? {
      F: common_vendor.p({
        name: isPassword.value ? "eye-line" : "eye-off-line",
        size: 32,
        pt: {
          className: "-important-text-surface-300"
        }
      }),
      G: common_vendor.o(showPassword)
    } : {}, {
      H: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      I: common_vendor.n({}),
      J: common_vendor.n(pt.value.className),
      K: common_vendor.n({
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark),
        "cl-input--border": __props.border,
        "cl-input--focus": isFocus.value,
        "cl-input--disabled": isDisabled.value,
        "cl-input--error": common_vendor.unref(isError)
      }),
      L: common_vendor.o(onTap)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-05300e24"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-input/cl-input.js.map
