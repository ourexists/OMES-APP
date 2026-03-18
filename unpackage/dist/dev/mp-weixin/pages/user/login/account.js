"use strict";
const common_vendor = require("../../../common/vendor.js");
const locale_index = require("../../../locale/index.js");
require("../../../uni_modules/cool-unix/cool/router/index.js");
require("../../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../../uni_modules/cool-unix/cool/utils/parse.js");
require("../../../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_hooks_ui = require("../../../uni_modules/cool-unix/hooks/ui.js");
const core_service_index = require("../../../core/service/index.js");
const core_apiRouter_path = require("../../../core/apiRouter/path.js");
const pages_user_login_base64 = require("./base64.js");
if (!Array) {
  const _easycom_cl_input_1 = common_vendor.resolveComponent("cl-input");
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_button_1 = common_vendor.resolveComponent("cl-button");
  (_easycom_cl_input_1 + _easycom_cl_image_1 + _easycom_cl_button_1)();
}
const _easycom_cl_input = () => "../../../uni_modules/cool-unix/components/cl-input/cl-input.js";
const _easycom_cl_image = () => "../../../uni_modules/cool-unix/components/cl-image/cl-image.js";
const _easycom_cl_button = () => "../../../uni_modules/cool-unix/components/cl-button/cl-button.js";
if (!Math) {
  (_easycom_cl_input + _easycom_cl_image + _easycom_cl_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "account",
  props: {
    form: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    }
  },
  emits: ["success"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const captchaUrl = common_vendor.ref("");
    const captchaKey = common_vendor.ref("");
    const emit = __emit;
    const ui = uni_modules_coolUnix_hooks_ui.useUi();
    const loading = common_vendor.ref(false);
    const disabled = common_vendor.computed(() => {
      return props.form.username == "" || props.form.password == "" || props.form.captcha == "";
    });
    function loadCaptcha() {
      let uuid = Date.now().toString();
      captchaKey.value = uuid;
      core_service_index.request({
        url: `${core_apiRouter_path.apiPath.captcha}?uuid=${uuid}`,
        method: "GET"
      }).then((res = null) => {
        captchaUrl.value = res;
      });
    }
    loadCaptcha();
    function toLogin() {
      const _a2 = props.form, username = _a2.username, password = _a2.password, captcha = _a2.captcha;
      loading.value = true;
      const basicAuth = pages_user_login_base64.base64Encode(`${core_apiRouter_path.authParam.client_id}:${core_apiRouter_path.authParam.client_sc}`);
      core_service_index.request({
        url: core_apiRouter_path.apiPath.auth_token,
        method: "POST",
        header: new UTSJSONObject({
          "content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": true,
          "Authorization": `Basic ${basicAuth}`
        }),
        data: new UTSJSONObject({
          client_id: core_apiRouter_path.authParam.client_id,
          grant_type: "captcha",
          username,
          password,
          captcha: captchaKey.value + "-" + captcha
        })
      }).then((res = null) => {
        if (res != null) {
          const r = uni_modules_coolUnix_cool_utils_parse.parse(res);
          if (r != null) {
            emit("success", r);
          }
        }
      }).catch((err = null) => {
        loadCaptcha();
        if (err == null) {
          return null;
        }
        const e = uni_modules_coolUnix_cool_utils_parse.parse(err);
        if (e == null) {
          return null;
        }
        ui.showToast({
          message: e.msg,
          msgNotifier: e.msg
        });
      });
      loading.value = false;
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.o(($event) => {
          return __props.form.username = $event;
        }),
        b: common_vendor.p({
          ["prefix-icon"]: "device-fill",
          placeholder: common_vendor.unref(locale_index.t)("请输入账户"),
          border: false,
          pt: {
            className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4", [common_vendor.unref(uni_modules_coolUnix_theme_index.isDark), "-important-bg-surface-70", "-important-bg-white"]]),
            prefixIcon: {
              className: "mr-1"
            }
          },
          modelValue: __props.form.username
        }),
        c: common_vendor.o(($event) => {
          return __props.form.password = $event;
        }),
        d: common_vendor.p({
          password: true,
          clearable: false,
          ["prefix-icon"]: "shield-check-fill",
          placeholder: common_vendor.unref(locale_index.t)("请输入密码"),
          border: false,
          pt: {
            className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4", [common_vendor.unref(uni_modules_coolUnix_theme_index.isDark), "-important-bg-surface-70", "-important-bg-white"]]),
            prefixIcon: {
              className: "mr-1"
            }
          },
          modelValue: __props.form.password
        }),
        e: common_vendor.o(($event) => {
          return __props.form.captcha = $event;
        }),
        f: common_vendor.p({
          clearable: false,
          ["prefix-icon"]: "profile-fill",
          placeholder: common_vendor.unref(locale_index.t)("请输入验证码"),
          maxlength: 5,
          border: false,
          pt: {
            className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4", [common_vendor.unref(uni_modules_coolUnix_theme_index.isDark), "-important-bg-surface-70", "-important-bg-white"]]),
            prefixIcon: {
              className: "mr-1"
            }
          },
          modelValue: __props.form.captcha
        }),
        g: common_vendor.o(loadCaptcha),
        h: common_vendor.p({
          src: captchaUrl.value,
          mode: "aspectFit"
        }),
        i: common_vendor.t(common_vendor.unref(locale_index.t)("登录")),
        j: common_vendor.o(toLogin),
        k: common_vendor.p({
          pt: {
            className: "-important-h--bracket-start-90rpx-bracket-end- -important-rounded-xl"
          },
          loading: loading.value,
          disabled: disabled.value
        }),
        l: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/login/account.js.map
