"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
require("../../config.js");
const uni_modules_coolUnix_hooks_ui = require("../../hooks/ui.js");
const uni_modules_coolUnix_locale_index = require("../../locale/index.js");
if (!Array) {
  const _easycom_cl_confirm_1 = common_vendor.resolveComponent("cl-confirm");
  const _easycom_cl_toast_1 = common_vendor.resolveComponent("cl-toast");
  (_easycom_cl_confirm_1 + _easycom_cl_toast_1)();
}
const _easycom_cl_confirm = () => "../cl-confirm/cl-confirm.js";
const _easycom_cl_toast = () => "../cl-toast/cl-toast.js";
if (!Math) {
  (_easycom_cl_confirm + _easycom_cl_toast)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-page-ui"
}, { __name: "ui", setup(__props) {
  const confirmRef = common_vendor.ref(null);
  const tipsRef = common_vendor.ref(null);
  const toastRef = common_vendor.ref(null);
  function showConfirm(options) {
    if (confirmRef.value != null) {
      confirmRef.value.open(options);
    }
  }
  function showTips(msgNotifier, callback) {
    if (tipsRef.value != null) {
      tipsRef.value.open({
        title: uni_modules_coolUnix_locale_index.t("提示"),
        msgNotifier,
        callback,
        showCancel: false
      });
    }
  }
  function showToast(options) {
    if (toastRef.value != null) {
      toastRef.value.open(options);
    }
  }
  uni_modules_coolUnix_hooks_ui.createUi({
    showConfirm,
    showTips,
    showToast
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.sr(confirmRef, "26492692-0", {
        "k": "confirmRef"
      }),
      b: common_vendor.sr(tipsRef, "26492692-1", {
        "k": "tipsRef"
      }),
      c: common_vendor.sr(toastRef, "26492692-2", {
        "k": "toastRef"
      })
    };
    return __returned__;
  };
} }));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-page/ui.js.map
