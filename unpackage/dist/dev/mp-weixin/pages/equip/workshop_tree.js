"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../uni_modules/cool-unix/cool/hooks/refs.js");
const uni_modules_coolUnix_cool_utils_device = require("../../uni_modules/cool-unix/cool/utils/device.js");
require("../../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_hooks_ui = require("../../uni_modules/cool-unix/hooks/ui.js");
const locale_index = require("../../locale/index.js");
const components_workshop_workshopTree = require("../../components/workshop/workshopTree.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_tree_1 = common_vendor.resolveComponent("cl-tree");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_text_1 + _easycom_cl_topbar_1 + _easycom_cl_tree_1 + _easycom_cl_page_1)();
}
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_tree = () => "../../uni_modules/cool-unix/components/cl-tree/cl-tree.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_topbar + _easycom_cl_tree + _easycom_cl_page)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "workshop_tree",
  setup(__props) {
    const ui = uni_modules_coolUnix_hooks_ui.useUi();
    uni_modules_coolUnix_cool_hooks_refs.useRefs();
    const treeRef = common_vendor.ref(null);
    function confirmSelect() {
      ui.showLoading(locale_index.t("切换中"));
      components_workshop_workshopTree.workshopTree.selectConfirm();
      setTimeout(() => {
        uni_modules_coolUnix_cool_router_index.router.back();
        ui.hideLoading();
      }, 300);
    }
    common_vendor.onLoad(() => {
      components_workshop_workshopTree.workshopTree.loadWorkshopTree();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.t(common_vendor.unref(locale_index.t)("选择场景")),
        b: common_vendor.p({
          color: "primary",
          pt: {
            className: "-important-text-xl ml-2"
          }
        }),
        c: common_vendor.t(common_vendor.unref(locale_index.t)("确定")),
        d: common_vendor.p({
          color: "primary",
          pt: {
            className: "-important-text-base ml-2"
          }
        }),
        e: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        f: !common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        g: common_vendor.o(confirmSelect),
        h: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        i: common_vendor.p({
          fixed: true,
          ["background-color"]: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "black" : "white",
          ["show-back"]: true,
          ["safe-area-top"]: true,
          height: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? null : 100,
          pt: {
            className: "-important-z-50"
          }
        }),
        j: common_vendor.sr(treeRef, "e3dd9e92-4,e3dd9e92-0", {
          "k": "treeRef"
        }),
        k: common_vendor.p({
          list: common_vendor.unref(components_workshop_workshopTree.workshopTree).tree.value,
          icon: "hospital-line",
          expandIcon: "hospital-line",
          pt: {
            className: "overflow-y-auto"
          }
        }),
        l: common_vendor.gei(_ctx, ""),
        m: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e3dd9e92"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/equip/workshop_tree.js.map
