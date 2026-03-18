"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
const uni_modules_coolUnix_locale_index = require("../../locale/index.js");
if (!Array) {
  const _easycom_cl_select_trigger_1 = common_vendor.resolveComponent("cl-select-trigger");
  const _easycom_cl_empty_1 = common_vendor.resolveComponent("cl-empty");
  const _easycom_cl_picker_view_1 = common_vendor.resolveComponent("cl-picker-view");
  const _easycom_cl_button_1 = common_vendor.resolveComponent("cl-button");
  const _easycom_cl_popup_1 = common_vendor.resolveComponent("cl-popup");
  (_easycom_cl_select_trigger_1 + _easycom_cl_empty_1 + _easycom_cl_picker_view_1 + _easycom_cl_button_1 + _easycom_cl_popup_1)();
}
const _easycom_cl_select_trigger = () => "../cl-select-trigger/cl-select-trigger.js";
const _easycom_cl_empty = () => "../cl-empty/cl-empty.js";
const _easycom_cl_picker_view = () => "../cl-picker-view/cl-picker-view.js";
const _easycom_cl_button = () => "../cl-button/cl-button.js";
const _easycom_cl_popup = () => "../cl-popup/cl-popup.js";
if (!Math) {
  (_easycom_cl_select_trigger + _easycom_cl_empty + _easycom_cl_picker_view + _easycom_cl_button + _easycom_cl_popup)();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          trigger: { type: "Unknown", optional: true },
          popup: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.trigger = this.__props__.trigger;
    this.popup = this.__props__.popup;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-select"
}, { __name: "cl-select", props: {
  // 透传样式配置
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 选择器的值
  modelValue: {
    type: [Array, Number, String],
    default: null
  },
  // 选择器标题
  title: {
    type: String,
    default: () => {
      return uni_modules_coolUnix_locale_index.t("请选择");
    }
  },
  // 选择器占位符
  placeholder: {
    type: String,
    default: () => {
      return uni_modules_coolUnix_locale_index.t("请选择");
    }
  },
  // 选项数据
  options: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 是否显示选择器触发器
  showTrigger: {
    type: Boolean,
    default: true
  },
  // 是否禁用选择器
  disabled: {
    type: Boolean,
    default: false
  },
  // 列数
  columnCount: {
    type: Number,
    default: 1
  },
  // 分隔符
  splitor: {
    type: String,
    default: " - "
  },
  // 确认按钮文本
  confirmText: {
    type: String,
    default: () => {
      return uni_modules_coolUnix_locale_index.t("确定");
    }
  },
  // 是否显示确认按钮
  showConfirm: {
    type: Boolean,
    default: true
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: () => {
      return uni_modules_coolUnix_locale_index.t("取消");
    }
  },
  // 是否显示取消按钮
  showCancel: {
    type: Boolean,
    default: true
  }
}, emits: ["update:modelValue", "change", "changing"], setup(__props, _a) {
  var __expose = _a.expose, __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const popupRef = common_vendor.ref(null);
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const ptTrigger = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parseToObject(pt.value.trigger);
  });
  const ptPopup = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parseToObject(pt.value.popup);
  });
  const noOptions = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_comm.isEmpty(props.options);
  });
  const value = common_vendor.ref([]);
  const indexes = common_vendor.ref([]);
  const columns = common_vendor.computed(() => {
    let options = props.options;
    let columns2 = [];
    for (let i = 0; i < props.columnCount; i++) {
      const column = [...options];
      const val = i >= value.value.length ? null : value.value[i];
      let item = UTS.arrayFind(options, (item2) => {
        return item2.value == val;
      });
      if (item == null && !uni_modules_coolUnix_cool_utils_comm.isEmpty(options)) {
        item = options[0];
      }
      if ((item === null || item === void 0 ? null : item.children) != null) {
        options = item.children;
      }
      columns2.push(column);
    }
    return columns2;
  });
  const text = common_vendor.ref("");
  function updateText() {
    const val = props.modelValue;
    if (val == null || uni_modules_coolUnix_cool_utils_comm.isEmpty(val)) {
      text.value = "";
    } else {
      let arr;
      if (props.columnCount == 1) {
        arr = [val];
      } else {
        arr = val;
      }
      text.value = arr.map((e = null, i) => {
        var _a2, _b;
        return (_b = (_a2 = UTS.arrayFind(columns.value[i], (a) => {
          return a.value == e;
        })) === null || _a2 === void 0 ? null : _a2.label) !== null && _b !== void 0 ? _b : "";
      }).join(props.splitor);
    }
  }
  function getValue() {
    return props.columnCount == 1 ? value.value[0] : value.value;
  }
  function setValue(val = null) {
    let _value;
    if (val == null) {
      _value = [];
    } else if (Array.isArray(val)) {
      _value = [...val];
    } else {
      _value = [val];
    }
    let _indexes = [];
    for (let i = 0; i < props.columnCount; i++) {
      const column = columns.value[i];
      if (i >= _value.length) {
        _indexes.push(0);
        if (!uni_modules_coolUnix_cool_utils_comm.isNull(column) && column.length > 0 && !uni_modules_coolUnix_cool_utils_comm.isNull(column[0])) {
          _value.push(column[0].value);
        }
      } else {
        let index = column.findIndex((e) => {
          return e.value == _value[i];
        });
        if (index < 0) {
          index = 0;
        }
        _indexes.push(index);
      }
    }
    value.value = _value;
    indexes.value = _indexes;
    updateText();
  }
  function onChange(a) {
    const b = [...indexes.value];
    let changed = false;
    for (let i = 0; i < a.length; i++) {
      if (changed) {
        b[i] = 0;
      } else {
        if (b[i] != a[i]) {
          b[i] = a[i];
          changed = true;
        }
      }
    }
    indexes.value = b;
    value.value = b.map((e, i) => {
      return uni_modules_coolUnix_cool_utils_comm.isNull(columns.value[i][e]) ? 0 : columns.value[i][e].value;
    });
    emit("changing", getValue());
  }
  const visible = common_vendor.ref(false);
  let callback = null;
  function open(cb = null) {
    visible.value = true;
    setValue(props.modelValue);
    callback = cb;
  }
  function close() {
    visible.value = false;
  }
  function clear() {
    text.value = "";
    if (props.columnCount == 1) {
      emit("update:modelValue", null);
      emit("change", null);
    } else {
      emit("update:modelValue", []);
      emit("change", []);
    }
  }
  function confirm() {
    const val = getValue();
    emit("update:modelValue", val);
    emit("change", val);
    if (callback != null) {
      callback(val);
    }
    close();
  }
  common_vendor.watch(common_vendor.computed(() => {
    return props.modelValue;
  }), (val = null) => {
    setValue(val);
  }, {
    immediate: true
  });
  __expose({
    open,
    close
  });
  return (_ctx, _cache) => {
    "raw js";
    var _a2;
    const __returned__ = common_vendor.e({
      a: __props.showTrigger
    }, __props.showTrigger ? {
      b: common_vendor.o(($event) => {
        return open();
      }),
      c: common_vendor.o(clear),
      d: common_vendor.p({
        pt: ptTrigger.value,
        placeholder: __props.placeholder,
        disabled: __props.disabled,
        focus: (_a2 = popupRef.value) == null ? void 0 : _a2.isOpen,
        text: text.value
      })
    } : {}, {
      e: noOptions.value
    }, noOptions.value ? {
      f: common_vendor.p({
        fixed: false,
        pt: {
          className: "-important-h--bracket-start-600rpx-bracket-end-"
        }
      })
    } : {
      g: common_vendor.o(onChange),
      h: common_vendor.p({
        value: indexes.value,
        columns: columns.value
      })
    }, {
      i: __props.showCancel
    }, __props.showCancel ? {
      j: common_vendor.t(__props.cancelText),
      k: common_vendor.o(close),
      l: common_vendor.p({
        size: "large",
        text: true,
        border: true,
        type: "light",
        pt: {
          className: "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
        }
      })
    } : {}, {
      m: __props.showConfirm && !noOptions.value
    }, __props.showConfirm && !noOptions.value ? {
      n: common_vendor.t(__props.confirmText),
      o: common_vendor.o(confirm),
      p: common_vendor.p({
        size: "large",
        pt: {
          className: "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
        }
      })
    } : {}, {
      q: common_vendor.o(() => {
      }),
      r: common_vendor.sr(popupRef, "20508305-1", {
        "k": "popupRef"
      }),
      s: common_vendor.o(($event) => {
        return visible.value = $event;
      }),
      t: common_vendor.p({
        title: __props.title,
        pt: ptPopup.value,
        modelValue: visible.value
      })
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-20508305"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-select/cl-select.js.map
