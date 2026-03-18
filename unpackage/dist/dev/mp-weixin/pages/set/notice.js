"use strict";
const common_vendor = require("../../common/vendor.js");
const locale_index = require("../../locale/index.js");
const core_store_user = require("../../core/store/user.js");
if (!Array) {
  const _easycom_cl_switch_1 = common_vendor.resolveComponent("cl-switch");
  const _easycom_cl_list_item_1 = common_vendor.resolveComponent("cl-list-item");
  const _easycom_cl_list_1 = common_vendor.resolveComponent("cl-list");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_switch_1 + _easycom_cl_list_item_1 + _easycom_cl_list_1 + _easycom_cl_page_1)();
}
const _easycom_cl_switch = () => "../../uni_modules/cool-unix/components/cl-switch/cl-switch.js";
const _easycom_cl_list_item = () => "../../uni_modules/cool-unix/components/cl-list-item/cl-list-item.js";
const _easycom_cl_list = () => "../../uni_modules/cool-unix/components/cl-list/cl-list.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_switch + _easycom_cl_list_item + _easycom_cl_list + _easycom_cl_page)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "notice",
  setup(__props) {
    function onNotifyChange(val) {
      core_store_user.changeNotify(val);
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.o(onNotifyChange),
        b: common_vendor.o(($event) => {
          return common_vendor.isRef(core_store_user.notify_enable) ? core_store_user.notify_enable.value = $event : null;
        }),
        c: common_vendor.p({
          modelValue: common_vendor.unref(core_store_user.notify_enable)
        }),
        d: common_vendor.p({
          label: common_vendor.unref(locale_index.t)("开启通知")
        }),
        e: common_vendor.gei(_ctx, ""),
        f: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/set/notice.js.map
