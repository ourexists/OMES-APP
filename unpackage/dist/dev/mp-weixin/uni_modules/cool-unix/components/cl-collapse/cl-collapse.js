"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
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
  name: "cl-collapse"
}, { __name: "cl-collapse", props: {
  // 透传样式配置
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 折叠状态值
  modelValue: {
    type: Boolean,
    default: false
  }
}, setup(__props, _a) {
  var __expose = _a.expose;
  const props = __props;
  const proxy = common_vendor.getCurrentInstance().proxy;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const isOpened = common_vendor.ref(false);
  const height = common_vendor.ref(0);
  function show() {
    isOpened.value = true;
    common_vendor.index.createSelectorQuery().in(proxy).select(".cl-collapse__content").boundingClientRect((node = null) => {
      var _a2;
      height.value = (_a2 = node.height) !== null && _a2 !== void 0 ? _a2 : 0;
    }).exec();
  }
  function hide() {
    isOpened.value = false;
    height.value = 0;
  }
  function toggle() {
    if (isOpened.value) {
      hide();
    } else {
      show();
    }
  }
  common_vendor.watch(common_vendor.computed(() => {
    return props.modelValue;
  }), (val) => {
    if (val) {
      show();
    } else {
      hide();
    }
  });
  __expose({
    show,
    hide,
    toggle
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.n({}),
      b: common_vendor.n(pt.value.className),
      c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      d: `${height.value}px`
    };
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b2ba8191"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-collapse/cl-collapse.js.map
