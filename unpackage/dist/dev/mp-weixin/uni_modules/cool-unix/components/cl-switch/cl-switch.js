"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
const uni_modules_coolUnix_hooks_form = require("../../hooks/form.js");
if (!Array) {
  const _easycom_cl_loading_1 = common_vendor.resolveComponent("cl-loading");
  _easycom_cl_loading_1();
}
const _easycom_cl_loading = () => "../cl-loading/cl-loading.js";
if (!Math) {
  _easycom_cl_loading();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          track: { type: "Unknown", optional: true },
          thumb: { type: "Unknown", optional: true },
          label: { type: "Unknown", optional: true },
          loading: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.track = this.__props__.track;
    this.thumb = this.__props__.thumb;
    this.label = this.__props__.label;
    this.loading = this.__props__.loading;
    delete this.__props__;
  }
}
class Rect extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          height: { type: String, optional: false },
          width: { type: String, optional: false },
          size: { type: String, optional: false },
          left: { type: String, optional: false },
          translateX: { type: String, optional: false }
        };
      },
      name: "Rect"
    };
  }
  constructor(options, metadata = Rect.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.height = this.__props__.height;
    this.width = this.__props__.width;
    this.size = this.__props__.size;
    this.left = this.__props__.left;
    this.translateX = this.__props__.translateX;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-switch"
}, { __name: "cl-switch", props: {
  // 透传样式配置
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 绑定值 - 开关状态
  modelValue: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 高度
  height: {
    type: Number,
    default: 48
  },
  // 宽度
  width: {
    type: Number,
    default: 80
  }
}, emits: ["update:modelValue", "change"], setup(__props, _a) {
  var __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const disabled = uni_modules_coolUnix_hooks_form.useForm().disabled;
  const isDisabled = common_vendor.computed(() => {
    return props.disabled || disabled.value;
  });
  const value = common_vendor.ref(props.modelValue);
  const isChecked = common_vendor.computed(() => {
    return value.value;
  });
  const rect = common_vendor.computed(() => {
    const height = props.height;
    const width = props.width;
    const size = height - 8;
    const left = 4;
    const translateX = width - height;
    return new Rect({
      height: height + "rpx",
      width: width + "rpx",
      size: size + "rpx",
      left: left + "rpx",
      translateX: `${translateX}rpx`
    });
  });
  function onTap() {
    if (!isDisabled.value && !props.loading) {
      const val = !value.value;
      value.value = val;
      emit("update:modelValue", val);
      emit("change", val);
    }
  }
  common_vendor.watch(common_vendor.computed(() => {
    return props.modelValue;
  }), (val) => {
    value.value = val;
  });
  return (_ctx, _cache) => {
    "raw js";
    var _a2, _b, _c;
    const __returned__ = common_vendor.e({
      a: __props.loading
    }, __props.loading ? {
      b: common_vendor.p({
        size: 24,
        color: "primary",
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)([(_a2 = pt.value.loading) == null ? void 0 : _a2.className])
        }
      })
    } : {}, {
      c: common_vendor.n({}),
      d: common_vendor.n((_b = pt.value.thumb) == null ? void 0 : _b.className),
      e: rect.value.size,
      f: rect.value.size,
      g: rect.value.left,
      h: `translateX(${isChecked.value ? rect.value.translateX : 0})`,
      i: common_vendor.n({}),
      j: common_vendor.n({
        "is-checked": isChecked.value,
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark)
      }),
      k: common_vendor.n((_c = pt.value.track) == null ? void 0 : _c.className),
      l: rect.value.height,
      m: rect.value.width,
      n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      o: common_vendor.n({}),
      p: common_vendor.n({
        "cl-switch--disabled": isDisabled.value,
        "cl-switch--checked": isChecked.value
      }),
      q: common_vendor.n(pt.value.className),
      r: common_vendor.o(onTap)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-64ddab0a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-switch/cl-switch.js.map
