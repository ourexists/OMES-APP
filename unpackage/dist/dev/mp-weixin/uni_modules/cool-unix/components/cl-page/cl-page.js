"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_config = require("../../config.js");
const uni_modules_coolUnix_cool_scroller_index = require("../../cool/scroller/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
require("../../cool/router/index.js");
if (!Array) {
  const _easycom_cl_back_top_1 = common_vendor.resolveComponent("cl-back-top");
  _easycom_cl_back_top_1();
}
const _easycom_cl_back_top = () => "../cl-back-top/cl-back-top.js";
if (!Math) {
  (_easycom_cl_back_top + common_vendor.unref(Ui))();
}
const Ui = () => "./ui.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-page"
}, { __name: "cl-page", props: {
  // 是否显示回到顶部按钮
  backTop: {
    type: Boolean,
    default: uni_modules_coolUnix_config.config.backTop
  }
}, setup(__props, _a) {
  var __expose = _a.expose;
  const scrollTop = common_vendor.ref(0);
  common_vendor.ref(0);
  uni_modules_coolUnix_cool_scroller_index.scroller.on((top) => {
    scrollTop.value = top;
  });
  function scrollTo(top) {
    common_vendor.index.pageScrollTo(new UTSJSONObject({
      scrollTop: top,
      duration: 300
    }));
  }
  function scrollToTop() {
    scrollTo(0 + Math.random() / 1e3);
  }
  __expose({
    scrollTop,
    scrollTo,
    scrollToTop
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = common_vendor.e({
      a: __props.backTop
    }, __props.backTop ? {} : {});
    return __returned__;
  };
} }));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-page/cl-page.js.map
