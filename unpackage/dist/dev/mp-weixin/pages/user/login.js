"use strict";
const common_vendor = require("../../common/vendor.js");
const config_index = require("../../config/index.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../uni_modules/cool-unix/theme/index.js");
require("../../uni_modules/cool-unix/config.js");
const core_store_index = require("../../core/store/index.js");
require("../../locale/index.js");
if (!Array) {
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_topbar_1 + _easycom_cl_image_1 + _easycom_cl_text_1 + _easycom_cl_page_1)();
}
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_image = () => "../../uni_modules/cool-unix/components/cl-image/cl-image.js";
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_topbar + _easycom_cl_image + _easycom_cl_text + common_vendor.unref(LoginAccount) + _easycom_cl_page)();
}
const LoginAccount = () => "./login/account.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const user = core_store_index.useStore().user;
    const form = common_vendor.reactive({
      username: "",
      password: "",
      captcha: ""
    });
    function toLogin(res) {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        let token = {
          token: res.token_type + " " + res.access_token,
          expire: res.expires_in,
          refreshToken: "",
          refreshExpire: 0
        };
        user.setToken(token);
        user.get().then((r = null) => {
          uni_modules_coolUnix_cool_router_index.router.nextLogin();
        });
      });
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          ["safe-area-top"]: true,
          ["background-color"]: "transparent"
        }),
        b: common_vendor.p({
          src: "/static/logo.png",
          mode: "widthFix",
          width: 120,
          height: 120
        }),
        c: common_vendor.t(common_vendor.unref(config_index.config).name),
        d: common_vendor.p({
          pt: {
            className: "text-xl font-bold mt-3"
          }
        }),
        e: common_vendor.o(toLogin),
        f: common_vendor.p({
          form
        }),
        g: common_vendor.gei(_ctx, ""),
        h: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bfb26fec"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/login.js.map
