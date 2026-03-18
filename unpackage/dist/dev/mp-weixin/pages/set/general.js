"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../uni_modules/cool-unix/cool/hooks/refs.js");
require("../../uni_modules/cool-unix/config.js");
const locale_index = require("../../locale/index.js");
if (!Array) {
  const _easycom_cl_list_item_1 = common_vendor.resolveComponent("cl-list-item");
  const _easycom_cl_list_1 = common_vendor.resolveComponent("cl-list");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_list_item_1 + _easycom_cl_list_1 + _easycom_cl_page_1)();
}
const _easycom_cl_list_item = () => "../../uni_modules/cool-unix/components/cl-list-item/cl-list-item.js";
const _easycom_cl_list = () => "../../uni_modules/cool-unix/components/cl-list/cl-list.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_list_item + _easycom_cl_list + common_vendor.unref(LocaleSet) + common_vendor.unref(SizeSet) + _easycom_cl_page)();
}
const LocaleSet = () => "../../components/locale-set.js";
const SizeSet = () => "../../components/size-set.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "general",
  setup(__props) {
    const refs = uni_modules_coolUnix_cool_hooks_refs.useRefs();
    function setLocale() {
      refs.open("localeSet");
    }
    function setSize() {
      refs.open("sizeSet");
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.o(setLocale),
        b: common_vendor.p({
          label: common_vendor.unref(locale_index.t)("多语言"),
          arrow: true,
          hoverable: true
        }),
        c: common_vendor.o(setSize),
        d: common_vendor.p({
          label: common_vendor.unref(locale_index.t)("字体大小"),
          arrow: true,
          hoverable: true
        }),
        e: common_vendor.sr(common_vendor.unref(refs).set("localeSet"), "2ae1d854-4,2ae1d854-0"),
        f: common_vendor.unref(refs).set("localeSet"),
        g: common_vendor.sr(common_vendor.unref(refs).set("sizeSet"), "2ae1d854-5,2ae1d854-0"),
        h: common_vendor.unref(refs).set("sizeSet"),
        i: common_vendor.gei(_ctx, ""),
        j: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/set/general.js.map
