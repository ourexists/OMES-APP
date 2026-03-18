"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../uni_modules/cool-unix/theme/index.js");
require("../../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_hooks_ui = require("../../uni_modules/cool-unix/hooks/ui.js");
const core_store_index = require("../../core/store/index.js");
const locale_index = require("../../locale/index.js");
const config_index = require("../../config/index.js");
const core_store_user = require("../../core/store/user.js");
if (!Array) {
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_avatar_1 = common_vendor.resolveComponent("cl-avatar");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_list_item_1 = common_vendor.resolveComponent("cl-list-item");
  const _easycom_cl_list_1 = common_vendor.resolveComponent("cl-list");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_topbar_1 + _easycom_cl_avatar_1 + _easycom_cl_text_1 + _easycom_cl_list_item_1 + _easycom_cl_list_1 + _easycom_cl_page_1)();
}
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_avatar = () => "../../uni_modules/cool-unix/components/cl-avatar/cl-avatar.js";
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_list_item = () => "../../uni_modules/cool-unix/components/cl-list-item/cl-list-item.js";
const _easycom_cl_list = () => "../../uni_modules/cool-unix/components/cl-list/cl-list.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_topbar + _easycom_cl_avatar + _easycom_cl_text + _easycom_cl_list_item + _easycom_cl_list + common_vendor.unref(CustomTabbar) + _easycom_cl_page)();
}
const CustomTabbar = () => "../../components/tabbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    const user = core_store_index.useStore().user;
    const ui = uni_modules_coolUnix_hooks_ui.useUi();
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
    common_vendor.onReady(() => {
      user.get();
    });
    return (_ctx, _cache) => {
      "raw js";
      var _a, _b, _c;
      const __returned__ = common_vendor.e({
        a: common_vendor.p({
          fixed: true,
          height: 100,
          ["show-back"]: false,
          ["safe-area-top"]: true,
          ["background-color"]: "transparent"
        }),
        b: common_vendor.p({
          src: (_a = common_vendor.unref(core_store_user.userInfo)) == null ? void 0 : _a.avatarUrl,
          size: 150,
          pt: {
            className: "-important-rounded-3xl",
            icon: {
              size: 60
            }
          }
        }),
        c: common_vendor.t(((_b = common_vendor.unref(core_store_user.userInfo)) == null ? void 0 : _b.nickName) ?? common_vendor.unref(locale_index.t)("未登录")),
        d: common_vendor.p({
          pt: {
            className: "-important-text-xl mt-5 mb-1 font-bold"
          }
        }),
        e: !common_vendor.unref(user).isNull()
      }, !common_vendor.unref(user).isNull() ? {
        f: common_vendor.t((_c = common_vendor.unref(core_store_user.userInfo)) == null ? void 0 : _c.mobile),
        g: common_vendor.p({
          color: "info"
        })
      } : {}, {
        h: common_vendor.o(($event) => {
          return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/set/general");
        }),
        i: common_vendor.p({
          label: common_vendor.unref(locale_index.t)("通用设置"),
          icon: "settings-line",
          arrow: true,
          hoverable: true
        }),
        j: common_vendor.o(($event) => {
          return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/set/notice");
        }),
        k: common_vendor.p({
          label: common_vendor.unref(locale_index.t)("通知设置"),
          icon: "notification-4-line",
          arrow: true,
          hoverable: true
        }),
        l: common_vendor.p({
          pt: {
            className: "mb-3"
          }
        }),
        m: common_vendor.o(($event) => {
          return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/set/about");
        }),
        n: common_vendor.p({
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
        o: common_vendor.o(($event) => {
          return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/set/cs");
        }),
        p: common_vendor.p({
          label: common_vendor.unref(locale_index.t)("联系客服"),
          icon: "customer-service-line",
          arrow: true,
          hoverable: true
        }),
        q: common_vendor.p({
          pt: {
            className: "mb-3"
          }
        }),
        r: common_vendor.t(common_vendor.unref(locale_index.t)("退出登录")),
        s: common_vendor.p({
          color: "error"
        }),
        t: common_vendor.o(toLogout),
        v: common_vendor.p({
          hoverable: true,
          justify: "center"
        }),
        w: common_vendor.p({
          pt: {
            className: "mb-3"
          }
        }),
        x: common_vendor.gei(_ctx, ""),
        y: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32e8af54"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/my.js.map
