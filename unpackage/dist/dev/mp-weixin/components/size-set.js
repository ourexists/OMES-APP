"use strict";
const common_vendor = require("../common/vendor.js");
require("../uni_modules/cool-unix/cool/router/index.js");
require("../uni_modules/cool-unix/cool/ctx/index.js");
require("../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_config = require("../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_locale_index = require("../uni_modules/cool-unix/locale/index.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_select_1 = common_vendor.resolveComponent("cl-select");
  (_easycom_cl_text_1 + _easycom_cl_select_1)();
}
const _easycom_cl_text = () => "../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_select = () => "../uni_modules/cool-unix/components/cl-select/cl-select.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_select)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "size-set"
}, { __name: "size-set", setup(__props, _a) {
  var __expose = _a.expose;
  const selectRef = common_vendor.ref(null);
  const list = [
    {
      label: "0.9",
      value: 0.9
    },
    {
      label: uni_modules_coolUnix_locale_index.t("默认 1.0"),
      value: 1
    },
    {
      label: "1.1",
      value: 1.1
    },
    {
      label: "1.2",
      value: 1.2
    },
    {
      label: "1.3",
      value: 1.3
    },
    {
      label: "1.4",
      value: 1.4
    }
  ];
  const size = common_vendor.ref(1);
  const visible = common_vendor.ref(false);
  function open() {
    var _a2;
    visible.value = true;
    size.value = (_a2 = uni_modules_coolUnix_config.config.fontSize) !== null && _a2 !== void 0 ? _a2 : 1;
    selectRef.value.open((value = null) => {
      uni_modules_coolUnix_config.config.fontSize = value == 1 ? null : value;
    });
  }
  function close() {
    visible.value = false;
  }
  function onChanging(value) {
    size.value = value;
  }
  __expose({
    visible,
    open,
    close
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.t(common_vendor.unref(uni_modules_coolUnix_locale_index.t)("这是一段示例文字，用于预览不同字号的效果。")),
      b: 28 * size.value + "rpx",
      c: common_vendor.sr(selectRef, "733dd712-0", {
        "k": "selectRef"
      }),
      d: common_vendor.gei(_ctx, ""),
      e: common_vendor.o(onChanging),
      f: common_vendor.o(($event) => {
        return size.value = $event;
      }),
      g: common_vendor.p({
        title: common_vendor.unref(uni_modules_coolUnix_locale_index.t)("全局字号"),
        options: list,
        ["show-trigger"]: false,
        modelValue: size.value,
        id: common_vendor.gei(_ctx, "")
      })
    };
    return __returned__;
  };
} }));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/size-set.js.map
