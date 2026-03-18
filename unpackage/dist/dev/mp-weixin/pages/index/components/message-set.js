"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../uni_modules/cool-unix/cool/router/index.js");
require("../../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../../uni_modules/cool-unix/theme/index.js");
require("../../../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_hooks_ui = require("../../../uni_modules/cool-unix/hooks/ui.js");
const locale_index = require("../../../locale/index.js");
if (!Array) {
  const _easycom_cl_select_1 = common_vendor.resolveComponent("cl-select");
  _easycom_cl_select_1();
}
const _easycom_cl_select = () => "../../../uni_modules/cool-unix/components/cl-select/cl-select.js";
if (!Math) {
  _easycom_cl_select();
}
class MessageSetPayload extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          status: { type: Number, optional: true }
        };
      },
      name: "MessageSetPayload"
    };
  }
  constructor(options, metadata = MessageSetPayload.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.status = this.__props__.status;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message-set",
  props: {
    status: {}
  },
  emits: ["change"],
  setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const ui = uni_modules_coolUnix_hooks_ui.useUi();
    const statusOptions = [
      { label: "全部", value: -1 },
      { label: "未读", value: 0 },
      { label: "已读", value: 1 }
    ];
    const selectRef = common_vendor.ref(null);
    const selectStatus = common_vendor.ref(-1);
    const props = __props;
    const emit = __emit;
    function emitFilter() {
      const status = selectStatus.value == -1 ? null : selectStatus.value;
      emit("change", new MessageSetPayload({ status }));
    }
    function open() {
      selectStatus.value = props.status == null ? -1 : props.status;
      selectRef.value.open((value = null) => {
        ui.showLoading(locale_index.t("切换中"));
        setTimeout(() => {
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
        a: common_vendor.sr(selectRef, "27a0914d-0", {
          "k": "selectRef"
        }),
        b: common_vendor.o(emitFilter),
        c: common_vendor.o(($event) => {
          return selectStatus.value = $event;
        }),
        d: common_vendor.p({
          options: statusOptions,
          ["show-trigger"]: false,
          title: common_vendor.unref(locale_index.t)("已读状态"),
          ["cancel-text"]: common_vendor.unref(locale_index.t)("取消"),
          ["confirm-text"]: common_vendor.unref(locale_index.t)("确定"),
          modelValue: selectStatus.value
        }),
        e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        f: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? 1 : ""
      };
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/message-set.js.map
