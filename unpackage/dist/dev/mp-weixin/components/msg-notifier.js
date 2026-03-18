"use strict";
const common_vendor = require("../common/vendor.js");
const core_store_user = require("../core/store/user.js");
if (!Array) {
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_noticebar_1 = common_vendor.resolveComponent("cl-noticebar");
  (_easycom_cl_icon_1 + _easycom_cl_noticebar_1)();
}
const _easycom_cl_icon = () => "../uni_modules/cool-unix/components/cl-icon/cl-icon.js";
const _easycom_cl_noticebar = () => "../uni_modules/cool-unix/components/cl-noticebar/cl-noticebar.js";
if (!Math) {
  (_easycom_cl_icon + _easycom_cl_noticebar)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "msg-notifier"
}, { __name: "msg-notifier", setup(__props) {
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = common_vendor.e({
      a: common_vendor.unref(core_store_user.notify_visible)
    }, common_vendor.unref(core_store_user.notify_visible) ? {
      b: common_vendor.p({
        name: "notification-4-line",
        color: "primary"
      }),
      c: common_vendor.p({
        speed: 30,
        text: common_vendor.unref(core_store_user.notify_message)
      }),
      d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
    } : {});
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-940c50d6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/msg-notifier.js.map
