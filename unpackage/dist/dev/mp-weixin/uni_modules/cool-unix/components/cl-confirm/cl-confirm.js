"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_locale_index = require("../../locale/index.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_button_1 = common_vendor.resolveComponent("cl-button");
  const _easycom_cl_popup_1 = common_vendor.resolveComponent("cl-popup");
  (_easycom_cl_text_1 + _easycom_cl_button_1 + _easycom_cl_popup_1)();
}
const _easycom_cl_text = () => "../cl-text/cl-text.js";
const _easycom_cl_button = () => "../cl-button/cl-button.js";
const _easycom_cl_popup = () => "../cl-popup/cl-popup.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_button + _easycom_cl_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cl-confirm",
  setup(__props, _a) {
    var __expose = _a.expose;
    const visible = common_vendor.ref(false);
    const closed = common_vendor.ref(true);
    const config = common_vendor.reactive({
      title: "",
      msgNotifier: ""
    });
    const loading = common_vendor.ref(false);
    function showLoading() {
      loading.value = true;
    }
    function hideLoading() {
      loading.value = false;
    }
    function close() {
      visible.value = false;
    }
    let timer = 0;
    function open(options) {
      const next = () => {
        var _a2, _b, _c, _d, _f;
        clearTimeout(timer);
        closed.value = false;
        visible.value = true;
        config.title = options.title;
        config.msgNotifier = options.msgNotifier;
        config.showCancel = (_a2 = options.showCancel) !== null && _a2 !== void 0 ? _a2 : true;
        config.showConfirm = (_b = options.showConfirm) !== null && _b !== void 0 ? _b : true;
        config.cancelText = (_c = options.cancelText) !== null && _c !== void 0 ? _c : uni_modules_coolUnix_locale_index.t("取消");
        config.confirmText = (_d = options.confirmText) !== null && _d !== void 0 ? _d : uni_modules_coolUnix_locale_index.t("确定");
        config.duration = (_f = options.duration) !== null && _f !== void 0 ? _f : 0;
        config.callback = options.callback;
        config.beforeClose = options.beforeClose;
        if (config.duration != 0) {
          timer = setTimeout(() => {
            close();
          }, config.duration);
        }
      };
      if (closed.value) {
        next();
      } else {
        setTimeout(() => {
          next();
        }, 360);
      }
    }
    function onClosed() {
      hideLoading();
      closed.value = true;
    }
    function onAction(action) {
      if (config.beforeClose == null) {
        visible.value = false;
        if (config.callback != null) {
          config.callback(action);
        }
      } else {
        config.beforeClose(action, {
          close,
          showLoading,
          hideLoading
        });
      }
    }
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.t(config.title),
        b: common_vendor.p({
          pt: {
            className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["cl-confirm__title text-lg text-center font-bold mb-2"])
          }
        }),
        c: common_vendor.t(config.msgNotifier),
        d: common_vendor.p({
          pt: {
            className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["cl-confirm__message text-md text-center mb-8"])
          }
        }),
        e: config.showCancel
      }, config.showCancel ? {
        f: common_vendor.t(config.cancelText),
        g: common_vendor.o(($event) => {
          return onAction("cancel");
        }),
        h: common_vendor.p({
          size: "large",
          text: true,
          rounded: true,
          border: true,
          type: "info",
          pt: {
            className: "flex-1 h--bracket-start-80rpx-bracket-end-"
          }
        })
      } : {}, {
        i: config.showConfirm
      }, config.showConfirm ? {
        j: common_vendor.t(config.confirmText),
        k: common_vendor.o(($event) => {
          return onAction("confirm");
        }),
        l: common_vendor.p({
          size: "large",
          rounded: true,
          loading: loading.value,
          pt: {
            className: "flex-1 h--bracket-start-80rpx-bracket-end-"
          }
        })
      } : {}, {
        m: common_vendor.gei(_ctx, ""),
        n: common_vendor.o(($event) => {
          return onAction("close");
        }),
        o: common_vendor.o(onClosed),
        p: common_vendor.o(($event) => {
          return visible.value = $event;
        }),
        q: common_vendor.p({
          pt: {
            className: "-important-rounded--bracket-start-60rpx-bracket-end-"
          },
          size: "70%",
          ["show-close"]: false,
          ["show-header"]: false,
          ["mask-closable"]: false,
          direction: "center",
          modelValue: visible.value,
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-664d4d97"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-confirm/cl-confirm.js.map
