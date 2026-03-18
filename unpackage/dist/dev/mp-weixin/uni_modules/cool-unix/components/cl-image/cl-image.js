"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_loading_1 = common_vendor.resolveComponent("cl-loading");
  (_easycom_cl_icon_1 + _easycom_cl_loading_1)();
}
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
const _easycom_cl_loading = () => "../cl-loading/cl-loading.js";
if (!Math) {
  (_easycom_cl_icon + _easycom_cl_loading)();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          inner: { type: "Unknown", optional: true },
          error: { type: "Unknown", optional: true },
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
    this.inner = this.__props__.inner;
    this.error = this.__props__.error;
    this.loading = this.__props__.loading;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-image"
}, { __name: "cl-image", props: {
  // 透传样式
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 图片源
  src: {
    type: String,
    default: ""
  },
  // 图片裁剪、缩放的模式
  mode: {
    type: String,
    default: "aspectFill"
  },
  // 是否显示边框
  border: {
    type: Boolean,
    default: false
  },
  // 是否预览
  preview: {
    type: Boolean,
    default: false
  },
  // 预览图片列表
  previewList: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 图片高度
  height: {
    type: [String, Number],
    default: 120
  },
  // 图片宽度
  width: {
    type: [String, Number],
    default: 120
  },
  // 是否显示加载状态
  showLoading: {
    type: Boolean,
    default: true
  },
  // 是否懒加载
  lazyLoad: {
    type: Boolean,
    default: false
  },
  // 图片显示动画效果
  fadeShow: {
    type: Boolean,
    default: false
  },
  // 是否解码webp格式
  webp: {
    type: Boolean,
    default: false
  },
  // 是否长按显示菜单
  showMenuByLongpress: {
    type: Boolean,
    default: false
  }
}, emits: ["load", "error"], setup(__props, _a) {
  var __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const isLoading = common_vendor.ref(true);
  const isError = common_vendor.ref(false);
  function onLoad(e) {
    isLoading.value = false;
    isError.value = false;
    emit("load", e);
  }
  function onError(e) {
    isLoading.value = false;
    isError.value = true;
    emit("error", e);
  }
  function onTap() {
    if (props.preview) {
      const urls = uni_modules_coolUnix_cool_utils_comm.isEmpty(props.previewList) ? [props.src] : props.previewList;
      common_vendor.index.previewImage({
        urls,
        current: props.src
      });
    }
  }
  return (_ctx, _cache) => {
    "raw js";
    var _a2, _b, _c, _d, _e, _f;
    const __returned__ = common_vendor.e({
      a: isError.value
    }, isError.value ? {
      b: common_vendor.p({
        name: ((_a2 = pt.value.error) == null ? void 0 : _a2.name) ?? "close-line",
        size: ((_b = pt.value.error) == null ? void 0 : _b.size) ?? 40,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["-important-text-surface-400", (_c = pt.value.error) == null ? void 0 : _c.className])
        }
      }),
      c: common_vendor.n({}),
      d: common_vendor.n({
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark)
      }),
      e: common_vendor.n((_d = pt.value.error) == null ? void 0 : _d.className)
    } : isLoading.value && __props.showLoading ? {
      g: common_vendor.p({
        loading: true
      }),
      h: common_vendor.n({}),
      i: common_vendor.n({
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark)
      }),
      j: common_vendor.n((_e = pt.value.loading) == null ? void 0 : _e.className)
    } : {}, {
      f: isLoading.value && __props.showLoading,
      k: common_vendor.n({}),
      l: common_vendor.n((_f = pt.value.inner) == null ? void 0 : _f.className),
      m: __props.src,
      n: __props.mode,
      o: __props.lazyLoad,
      p: __props.webp,
      q: __props.showMenuByLongpress,
      r: common_vendor.o(onLoad),
      s: common_vendor.o(onError),
      t: common_vendor.o(onTap),
      v: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      w: common_vendor.n({}),
      x: common_vendor.n(pt.value.className),
      y: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseRpx)(__props.width),
      z: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseRpx)(__props.height)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-45a98170"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-image/cl-image.js.map
