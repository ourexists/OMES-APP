"use strict";
const common_vendor = require("../../common/vendor.js");
const config_index = require("../../config/index.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../uni_modules/cool-unix/theme/index.js");
require("../../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_hooks_ui = require("../../uni_modules/cool-unix/hooks/ui.js");
const locale_index = require("../../locale/index.js");
const core_store_index = require("../../core/store/index.js");
if (!Array) {
  const _easycom_cl_list_item_1 = common_vendor.resolveComponent("cl-list-item");
  const _easycom_cl_list_1 = common_vendor.resolveComponent("cl-list");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_list_item_1 + _easycom_cl_list_1 + _easycom_cl_text_1 + _easycom_cl_page_1)();
}
const _easycom_cl_list_item = () => "../../uni_modules/cool-unix/components/cl-list-item/cl-list-item.js";
const _easycom_cl_list = () => "../../uni_modules/cool-unix/components/cl-list/cl-list.js";
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_list_item + _easycom_cl_list + _easycom_cl_text + _easycom_cl_page)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const ui = uni_modules_coolUnix_hooks_ui.useUi();
    const user = core_store_index.useStore().user;
    function toLogout() {
      ui.showConfirm({
        title: locale_index.t("提示"),
        message: locale_index.t("确定退出登录吗？"),
        callback(action) {
          if (action == "confirm") {
            user.logout();
          }
        }
      });
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.o(($event) => {
          return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/set/general");
        }),
        b: common_vendor.p({
          label: common_vendor.unref(locale_index.t)("通用设置"),
          icon: "settings-line",
          arrow: true,
          hoverable: true
        }),
        c: common_vendor.o(($event) => {
          return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/set/notice");
        }),
        d: common_vendor.p({
          label: common_vendor.unref(locale_index.t)("通知设置"),
          icon: "notification-4-line",
          arrow: true,
          hoverable: true
        }),
        e: common_vendor.p({
          pt: {
            className: "mb-3"
          }
        }),
        f: common_vendor.o(($event) => {
          return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/set/about");
        }),
        g: common_vendor.p({
          label: common_vendor.unref(locale_index.$t)("关于{name}", {
            name: common_vendor.unref(config_index.config).name
          }),
          icon: "error-warning-line",
          arrow: true,
          hoverable: true,
          pt: {
            label: {
              className: "flex-1"
            }
          }
        }),
        h: common_vendor.o(($event) => {
          return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/set/cs");
        }),
        i: common_vendor.p({
          label: common_vendor.unref(locale_index.t)("联系客服"),
          icon: "customer-service-line",
          arrow: true,
          hoverable: true
        }),
        j: common_vendor.p({
          pt: {
            className: "mb-3"
          }
        }),
        k: common_vendor.t(common_vendor.unref(locale_index.t)("退出登录")),
        l: common_vendor.p({
          color: "error"
        }),
        m: common_vendor.o(toLogout),
        n: common_vendor.p({
          hoverable: true,
          justify: "center"
        }),
        o: common_vendor.p({
          pt: {
            className: "mb-3"
          }
        }),
        p: common_vendor.gei(_ctx, ""),
        q: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/set/index.js.map
