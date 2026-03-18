"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
const uni_modules_coolUnix_cool_animation_index = require("../../cool/animation/index.js");
const uni_modules_coolUnix_cool_ctx_index = require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
const uni_modules_coolUnix_hooks_size = require("../../hooks/size.js");
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          icon: { type: "Unknown", optional: true }
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
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-loading"
}, { __name: "cl-loading", props: {
  // 透传样式
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 是否加载中
  loading: {
    type: Boolean,
    default: true
  },
  // 图标大小
  size: {
    type: [Number, String],
    default: 24
  },
  // 图标颜色
  color: {
    type: String,
    default: ""
  }
}, setup(__props) {
  const props = __props;
  const getPx = uni_modules_coolUnix_hooks_size.useSize().getPx;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const loadingRef = common_vendor.shallowRef(null);
  const color = common_vendor.computed(() => {
    if (props.color == "") {
      return uni_modules_coolUnix_theme_index.isDark.value ? "#ffffff" : uni_modules_coolUnix_cool_ctx_index.ctx.color["surface-700"];
    }
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
        return "#71717a";
      case "dark":
        return "#3f3f46";
      case "light":
        return "#ffffff";
      case "disabled":
        return "#d4d4d8";
      default:
        return props.color;
    }
  });
  function start() {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      uni_modules_coolUnix_cool_animation_index.createAnimation(loadingRef.value, {
        duration: 2500,
        loop: -1,
        timingFunction: "linear"
      }).rotate("0deg", "360deg").play();
    });
  }
  common_vendor.onMounted(() => {
    common_vendor.watch(common_vendor.computed(() => {
      return props.loading;
    }), (val) => {
      if (val) {
        start();
      }
    }, {
      immediate: true
    });
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = common_vendor.e({
      a: __props.loading
    }, __props.loading ? {
      b: common_vendor.sei(common_vendor.gei(_ctx, "", "r0-d7bed2ee"), "view", loadingRef, {
        "k": "loadingRef"
      }),
      c: common_vendor.n({}),
      d: common_vendor.n({
        "cl-loading--dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) && color.value == "",
        "-important-border-r-transparent": true
      }),
      e: common_vendor.n(pt.value.className),
      f: common_vendor.unref(getPx)(__props.size),
      g: common_vendor.unref(getPx)(__props.size),
      h: color.value,
      i: color.value,
      j: color.value
    } : {});
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d7bed2ee"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-loading/cl-loading.js.map
