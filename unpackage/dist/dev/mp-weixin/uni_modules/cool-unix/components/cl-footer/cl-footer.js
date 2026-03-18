"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
const uni_modules_coolUnix_cool_utils_rect = require("../../cool/utils/rect.js");
const uni_modules_coolUnix_components_clFooter_offset = require("./offset.js");
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          content: { type: "Unknown", optional: true },
          wrapper: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.content = this.__props__.content;
    this.wrapper = this.__props__.wrapper;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-footer"
}, { __name: "cl-footer", props: {
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 最小高度，小于该高度时，不显示
  minHeight: {
    type: Number,
    default: 30
  },
  // 监听值，触发更新
  vt: {
    type: Number,
    default: 0
  }
}, setup(__props) {
  const props = __props;
  const proxy = common_vendor.getCurrentInstance().proxy;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const height = common_vendor.ref(0);
  const visible = common_vendor.ref(true);
  function getHeight() {
    common_vendor.nextTick$1(() => {
      setTimeout(() => {
        common_vendor.index.createSelectorQuery().in(proxy).select(".cl-footer").boundingClientRect((res = null) => {
          var _a;
          const h = Math.floor((_a = res.height) !== null && _a !== void 0 ? _a : 0);
          height.value = h;
          visible.value = h > props.minHeight + uni_modules_coolUnix_cool_utils_rect.getSafeAreaHeight("bottom");
          uni_modules_coolUnix_components_clFooter_offset.clFooterOffset.set(visible.value ? h : 0);
        }).exec();
      }, 0);
    });
  }
  common_vendor.onMounted(() => {
    common_vendor.watch(common_vendor.computed(() => {
      return props.vt;
    }), () => {
      visible.value = true;
      getHeight();
    }, {
      immediate: true
    });
  });
  return (_ctx, _cache) => {
    "raw js";
    var _a, _b;
    const __returned__ = common_vendor.e({
      a: visible.value
    }, visible.value ? {
      b: height.value + "px"
    } : {}, {
      c: visible.value
    }, visible.value ? {
      d: common_vendor.n({}),
      e: common_vendor.n((_a = pt.value.content) == null ? void 0 : _a.className),
      f: common_vendor.n({}),
      g: common_vendor.n({
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark)
      }),
      h: common_vendor.n(pt.value.className)
    } : {}, {
      i: common_vendor.n({}),
      j: common_vendor.n((_b = pt.value.wrapper) == null ? void 0 : _b.className)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0732dd2c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-footer/cl-footer.js.map
