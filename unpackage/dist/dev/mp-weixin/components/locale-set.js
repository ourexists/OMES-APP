"use strict";
const common_vendor = require("../common/vendor.js");
require("../uni_modules/cool-unix/cool/router/index.js");
require("../uni_modules/cool-unix/cool/ctx/index.js");
require("../uni_modules/cool-unix/theme/index.js");
require("../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_hooks_ui = require("../uni_modules/cool-unix/hooks/ui.js");
const locale_index = require("../locale/index.js");
if (!Array) {
  const _easycom_cl_select_1 = common_vendor.resolveComponent("cl-select");
  _easycom_cl_select_1();
}
const _easycom_cl_select = () => "../uni_modules/cool-unix/components/cl-select/cl-select.js";
if (!Math) {
  _easycom_cl_select();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "locale-set",
  setup(__props, _a) {
    var __expose = _a.expose;
    const ui = uni_modules_coolUnix_hooks_ui.useUi();
    const options = [
      {
        label: "简体中文",
        value: "zh-cn"
      },
      {
        label: "繁体中文",
        value: "zh-tw"
      },
      {
        label: "English",
        value: "en"
      },
      {
        label: "Español",
        value: "es"
      },
      {
        label: "日本語",
        value: "ja"
      },
      {
        label: "한국어",
        value: "ko"
      },
      {
        label: "Français",
        value: "fr"
      }
    ];
    const selectRef = common_vendor.ref(null);
    const active = common_vendor.ref(locale_index.locale.value);
    function open() {
      active.value = locale_index.locale.value;
      if (["zh-Hans", "zh"].some((e) => {
        return e == locale_index.locale.value;
      })) {
        active.value = "zh-cn";
      }
      selectRef.value.open((value = null) => {
        ui.showLoading(locale_index.t("切换中"));
        setTimeout(() => {
          locale_index.setLocale(value);
          ui.hideLoading();
        }, 500);
      });
    }
    function close() {
      selectRef.value.close();
    }
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.sr(selectRef, "756b3284-0", {
          "k": "selectRef"
        }),
        b: common_vendor.gei(_ctx, ""),
        c: common_vendor.o(($event) => {
          return active.value = $event;
        }),
        d: common_vendor.p({
          options,
          ["show-trigger"]: false,
          title: common_vendor.unref(locale_index.t)("切换语言"),
          ["cancel-text"]: common_vendor.unref(locale_index.t)("取消"),
          ["confirm-text"]: common_vendor.unref(locale_index.t)("确定"),
          modelValue: active.value,
          id: common_vendor.gei(_ctx, "")
        })
      };
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/locale-set.js.map
