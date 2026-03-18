"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_day = require("../../cool/utils/day.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
const uni_modules_coolUnix_config = require("../../config.js");
const uni_modules_coolUnix_locale_index = require("../../locale/index.js");
const uni_modules_coolUnix_hooks_ui = require("../../hooks/ui.js");
if (!Array) {
  const _easycom_cl_select_trigger_1 = common_vendor.resolveComponent("cl-select-trigger");
  const _easycom_cl_tag_1 = common_vendor.resolveComponent("cl-tag");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_picker_view_1 = common_vendor.resolveComponent("cl-picker-view");
  const _easycom_cl_button_1 = common_vendor.resolveComponent("cl-button");
  const _easycom_cl_popup_1 = common_vendor.resolveComponent("cl-popup");
  (_easycom_cl_select_trigger_1 + _easycom_cl_tag_1 + _easycom_cl_text_1 + _easycom_cl_picker_view_1 + _easycom_cl_button_1 + _easycom_cl_popup_1)();
}
const _easycom_cl_select_trigger = () => "../cl-select-trigger/cl-select-trigger.js";
const _easycom_cl_tag = () => "../cl-tag/cl-tag.js";
const _easycom_cl_text = () => "../cl-text/cl-text.js";
const _easycom_cl_picker_view = () => "../cl-picker-view/cl-picker-view.js";
const _easycom_cl_button = () => "../cl-button/cl-button.js";
const _easycom_cl_popup = () => "../cl-popup/cl-popup.js";
if (!Math) {
  (_easycom_cl_select_trigger + _easycom_cl_tag + _easycom_cl_text + _easycom_cl_picker_view + _easycom_cl_button + _easycom_cl_popup)();
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
  name: "cl-select-date"
}, { __name: "cl-select-date", props: {
  // 透传样式配置，支持外部自定义样式
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 选择器的值，外部v-model绑定
  modelValue: {
    type: String,
    default: ""
  },
  // 选择器的范围值，外部v-model:values绑定
  values: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 表头
  headers: {
    type: Array,
    default: () => {
      return [uni_modules_coolUnix_locale_index.t("年"), uni_modules_coolUnix_locale_index.t("月"), uni_modules_coolUnix_locale_index.t("日"), uni_modules_coolUnix_locale_index.t("时"), uni_modules_coolUnix_locale_index.t("分"), uni_modules_coolUnix_locale_index.t("秒")];
    }
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
  },
  // 标签格式化
  labelFormat: {
    type: String,
    default: ""
  },
  // 值格式化
  valueFormat: {
    type: String,
    default: ""
  },
  // 开始日期
  start: {
    type: String,
    default: uni_modules_coolUnix_config.config.startDate
  },
  // 结束日期
  end: {
    type: String,
    default: uni_modules_coolUnix_config.config.endDate
  },
  // 类型，控制选择的粒度
  type: {
    type: String,
    default: "second"
  },
  // 是否范围选择
  rangeable: {
    type: Boolean,
    default: false
  },
  // 开始日期占位符
  startPlaceholder: {
    type: String,
    default: () => {
      return uni_modules_coolUnix_locale_index.t("开始日期");
    }
  },
  // 结束日期占位符
  endPlaceholder: {
    type: String,
    default: () => {
      return uni_modules_coolUnix_locale_index.t("结束日期");
    }
  },
  // 范围分隔符
  rangeSeparator: {
    type: String,
    default: () => {
      return uni_modules_coolUnix_locale_index.t(" 至 ");
    }
  },
  // 是否显示快捷选项
  showShortcuts: {
    type: Boolean,
    default: true
  },
  // 快捷选项
  shortcuts: {
    type: Array,
    default: () => {
      return [];
    }
  }
}, emits: ["update:modelValue", "change", "update:values", "range-change"], setup(__props, _a) {
  var __expose = _a.expose, __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const ui = uni_modules_coolUnix_hooks_ui.useUi();
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
  const formatType = common_vendor.computed(() => {
    switch (props.type) {
      case "year":
        return "YYYY";
      case "month":
        return "YYYY-MM";
      case "date":
        return "YYYY-MM-DD";
      case "hour":
      case "minute":
      case "second":
        return "YYYY-MM-DD HH:mm:ss";
      default:
        return "YYYY-MM-DD HH:mm:ss";
    }
  });
  const labelFormat = common_vendor.computed(() => {
    if (uni_modules_coolUnix_cool_utils_comm.isNull(props.labelFormat) || uni_modules_coolUnix_cool_utils_comm.isEmpty(props.labelFormat)) {
      return formatType.value;
    }
    return props.labelFormat;
  });
  const valueFormat = common_vendor.computed(() => {
    if (uni_modules_coolUnix_cool_utils_comm.isNull(props.valueFormat) || uni_modules_coolUnix_cool_utils_comm.isEmpty(props.valueFormat)) {
      return formatType.value;
    }
    return props.valueFormat;
  });
  const shortcutsIndex = common_vendor.ref(-1);
  const shortcuts = common_vendor.computed(() => {
    if (!uni_modules_coolUnix_cool_utils_comm.isEmpty(props.shortcuts)) {
      return props.shortcuts;
    }
    return [
      {
        label: uni_modules_coolUnix_locale_index.t("今天"),
        value: [uni_modules_coolUnix_cool_utils_day.dayUts().format(valueFormat.value), uni_modules_coolUnix_cool_utils_day.dayUts().format(valueFormat.value)]
      },
      {
        label: uni_modules_coolUnix_locale_index.t("近7天"),
        value: [
          uni_modules_coolUnix_cool_utils_day.dayUts().subtract(7, "day").format(valueFormat.value),
          uni_modules_coolUnix_cool_utils_day.dayUts().format(valueFormat.value)
        ]
      },
      {
        label: uni_modules_coolUnix_locale_index.t("近30天"),
        value: [
          uni_modules_coolUnix_cool_utils_day.dayUts().subtract(30, "day").format(valueFormat.value),
          uni_modules_coolUnix_cool_utils_day.dayUts().format(valueFormat.value)
        ]
      },
      {
        label: uni_modules_coolUnix_locale_index.t("近90天"),
        value: [
          uni_modules_coolUnix_cool_utils_day.dayUts().subtract(90, "day").format(valueFormat.value),
          uni_modules_coolUnix_cool_utils_day.dayUts().format(valueFormat.value)
        ]
      },
      {
        label: uni_modules_coolUnix_locale_index.t("近一年"),
        value: [
          uni_modules_coolUnix_cool_utils_day.dayUts().subtract(1, "year").format(valueFormat.value),
          uni_modules_coolUnix_cool_utils_day.dayUts().format(valueFormat.value)
        ]
      }
    ];
  });
  const rangeIndex = common_vendor.ref(0);
  const values = common_vendor.ref(["", ""]);
  const value = common_vendor.ref([]);
  const start = common_vendor.computed(() => {
    if (props.rangeable) {
      if (rangeIndex.value == 0) {
        return props.start;
      } else {
        return values.value[0];
      }
    } else {
      return props.start;
    }
  });
  const list = common_vendor.computed(() => {
    const _a2 = common_vendor.__read(uni_modules_coolUnix_cool_utils_day.dayUts(start.value).toArray(), 6), startYear = _a2[0], startMonth = _a2[1], startDate = _a2[2], startHour = _a2[3], startMinute = _a2[4], startSecond = _a2[5];
    const _b = common_vendor.__read(uni_modules_coolUnix_cool_utils_day.dayUts(props.end).toArray(), 6), endYear = _b[0], endMonth = _b[1], endDate = _b[2], endHour = _b[3], endMinute = _b[4], endSecond = _b[5];
    const arr = [[], [], [], [], [], []];
    if (uni_modules_coolUnix_cool_utils_comm.isEmpty(value.value)) {
      return arr;
    }
    const _c = common_vendor.__read(value.value, 5), year = _c[0], month = _c[1], date = _c[2], hour = _c[3], minute = _c[4];
    const isLeapYear = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
    const days = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month > 0 ? month - 1 : 0];
    const yearRange = Math.max(60, endYear - startYear + 1);
    for (let i = 0; i < yearRange; i++) {
      const yearNum = startYear + i;
      if (yearNum <= endYear) {
        arr[0].push({
          label: yearNum.toString(),
          value: yearNum
        });
      }
      let monthNum = startYear == year ? startMonth + i : i + 1;
      let endMonthNum = endYear == year ? endMonth : 12;
      if (monthNum <= endMonthNum) {
        arr[1].push({
          label: monthNum.toString().padStart(2, "0"),
          value: monthNum
        });
      }
      let dateNum = startYear == year && startMonth == month ? startDate + i : i + 1;
      let endDateNum = endYear == year && endMonth == month ? endDate : days;
      if (dateNum <= endDateNum) {
        arr[2].push({
          label: dateNum.toString().padStart(2, "0"),
          value: dateNum
        });
      }
      let hourNum = startYear == year && startMonth == month && startDate == date ? startHour + i : i;
      let endHourNum = endYear == year && endMonth == month && endDate == date ? endHour : 24;
      if (hourNum < endHourNum) {
        arr[3].push({
          label: hourNum.toString().padStart(2, "0"),
          value: hourNum
        });
      }
      let minuteNum = startYear == year && startMonth == month && startDate == date && startHour == hour ? startMinute + i : i;
      let endMinuteNum = endYear == year && endMonth == month && endDate == date && endHour == hour ? endMinute : 60;
      if (minuteNum < endMinuteNum) {
        arr[4].push({
          label: minuteNum.toString().padStart(2, "0"),
          value: minuteNum
        });
      }
      let secondNum = startYear == year && startMonth == month && startDate == date && startHour == hour && startMinute == minute ? startSecond + i : i;
      let endSecondNum = endYear == year && endMonth == month && endDate == date && endHour == hour && endMinute == minute ? endSecond : 60;
      if (secondNum < endSecondNum) {
        arr[5].push({
          label: secondNum.toString().padStart(2, "0"),
          value: secondNum
        });
      }
    }
    return arr;
  });
  const columnNum = common_vendor.computed(() => {
    return ["year", "month", "date", "hour", "minute", "second"].findIndex((e) => {
      return e == props.type;
    }) + 1;
  });
  const columns = common_vendor.computed(() => {
    return list.value.slice(0, columnNum.value);
  });
  const indexes = common_vendor.computed(() => {
    if (uni_modules_coolUnix_cool_utils_comm.isEmpty(value.value)) {
      return [];
    }
    return value.value.map((e, i) => {
      let index = list.value[i].findIndex((a) => {
        return a.value == e;
      });
      if (index == -1) {
        index = list.value[i].length - 1;
      }
      if (index < 0) {
        index = 0;
      }
      return index;
    });
  });
  function toDate() {
    const parts = [];
    const units = ["", "-", "-", " ", ":", ":"];
    const defaultValue = [2e3, 1, 1, 0, 0, 0];
    units.forEach((key, i) => {
      let val = value.value[i];
      if (i >= columnNum.value) {
        val = defaultValue[i];
      }
      parts.push(key + val.toString().padStart(2, "0"));
    });
    return parts.join("");
  }
  function checkDate(values2) {
    if (values2.length == 0) {
      return values2;
    }
    const checkedValues = [...values2];
    const defaultValues = [2e3, 1, 1, 0, 0, 0];
    for (let i = checkedValues.length; i < 6; i++) {
      checkedValues.push(defaultValues[i]);
    }
    let _a2 = common_vendor.__read(checkedValues, 6), year = _a2[0], month = _a2[1], date = _a2[2], hour = _a2[3], minute = _a2[4], second = _a2[5];
    const isLeapYear = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maxDay = daysInMonth[month - 1];
    if (date < 1) {
      date = 1;
    } else if (date > maxDay) {
      date = maxDay;
    }
    if (hour < 0) {
      hour = 0;
    } else if (hour > 23) {
      hour = 23;
    }
    if (minute < 0) {
      minute = 0;
    } else if (minute > 59) {
      minute = 59;
    }
    if (second < 0) {
      second = 0;
    } else if (second > 59) {
      second = 59;
    }
    return [year, month, date, hour, minute, second];
  }
  const text = common_vendor.ref("");
  function updateText() {
    if (props.rangeable) {
      text.value = values.value.map((e) => {
        return uni_modules_coolUnix_cool_utils_day.dayUts(e).format(labelFormat.value);
      }).join(` ${props.rangeSeparator} `);
    } else {
      text.value = uni_modules_coolUnix_cool_utils_day.dayUts(toDate()).format(labelFormat.value);
    }
  }
  function onChange(data) {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      value.value = checkDate(data);
      if (uni_modules_coolUnix_cool_utils_day.dayUts(toDate()).isAfter(uni_modules_coolUnix_cool_utils_day.dayUts(props.end))) {
        value.value = uni_modules_coolUnix_cool_utils_day.dayUts(props.end).toArray();
      }
      if (uni_modules_coolUnix_cool_utils_day.dayUts(toDate()).isBefore(uni_modules_coolUnix_cool_utils_day.dayUts(props.start))) {
        value.value = uni_modules_coolUnix_cool_utils_day.dayUts(props.start).toArray();
      }
      if (props.rangeable) {
        values.value[rangeIndex.value] = uni_modules_coolUnix_cool_utils_day.dayUts(toDate()).format(valueFormat.value);
        if (uni_modules_coolUnix_cool_utils_day.dayUts(values.value[0]).isAfter(uni_modules_coolUnix_cool_utils_day.dayUts(values.value[1])) && values.value[1] != "") {
          values.value[1] = values.value[0];
        }
        shortcutsIndex.value = -1;
      }
    });
  }
  function setValue(val) {
    if (uni_modules_coolUnix_cool_utils_comm.isNull(val) || uni_modules_coolUnix_cool_utils_comm.isEmpty(val)) {
      value.value = checkDate(uni_modules_coolUnix_cool_utils_day.dayUts().toArray());
      text.value = "";
    } else {
      value.value = checkDate(uni_modules_coolUnix_cool_utils_day.dayUts(val).toArray());
      updateText();
    }
  }
  function setValues(val) {
    if (uni_modules_coolUnix_cool_utils_comm.isEmpty(val)) {
      values.value = ["", ""];
      text.value = "";
    } else {
      values.value = val;
      updateText();
    }
  }
  function setRange(index) {
    rangeIndex.value = index;
    setValue(values.value[index]);
  }
  function setRangeValue(val, index) {
    shortcutsIndex.value = index;
    values.value = [...val];
    setValue(val[rangeIndex.value]);
  }
  const visible = common_vendor.ref(false);
  let callback = null;
  function open(cb = null) {
    if (props.disabled) {
      return null;
    }
    visible.value = true;
    callback = cb;
    common_vendor.nextTick$1(() => {
      if (props.rangeable) {
        rangeIndex.value = 0;
        setValues(props.values);
        setValue(values.value[0]);
      } else {
        setValue(props.modelValue);
      }
    });
  }
  function close() {
    visible.value = false;
  }
  function onClosed() {
    values.value = ["", ""];
  }
  function clear() {
    text.value = "";
    if (props.rangeable) {
      emit("update:values", []);
      emit("range-change", []);
    } else {
      emit("update:modelValue", "");
      emit("change", "");
    }
  }
  function confirm() {
    if (props.rangeable) {
      const _a2 = common_vendor.__read(values.value, 2), a = _a2[0], b = _a2[1];
      if (a == "" || b == "") {
        ui.showToast({
          message: uni_modules_coolUnix_locale_index.t("请选择完整时间范围")
        });
        if (a != "") {
          rangeIndex.value = 1;
        }
        return null;
      }
      if (uni_modules_coolUnix_cool_utils_day.dayUts(a).isAfter(uni_modules_coolUnix_cool_utils_day.dayUts(b))) {
        ui.showToast({
          message: uni_modules_coolUnix_locale_index.t("开始日期不能大于结束日期")
        });
        return null;
      }
      emit("update:values", values.value);
      emit("range-change", values.value);
      if (callback != null) {
        callback(values.value);
      }
    } else {
      const val = uni_modules_coolUnix_cool_utils_day.dayUts(toDate()).format(valueFormat.value);
      emit("update:modelValue", val);
      emit("change", val);
      if (callback != null) {
        callback(val);
      }
    }
    updateText();
    close();
  }
  common_vendor.watch(common_vendor.computed(() => {
    return props.modelValue;
  }), (val) => {
    if (!props.rangeable) {
      setValue(val);
    }
  }, {
    immediate: true
  });
  common_vendor.watch(common_vendor.computed(() => {
    return props.values;
  }), (val) => {
    if (props.rangeable) {
      setValues(val);
    }
  }, {
    immediate: true
  });
  common_vendor.watch(common_vendor.computed(() => {
    return props.labelFormat;
  }), () => {
    updateText();
  });
  __expose({
    open,
    close,
    clear,
    confirm,
    setValue,
    setValues,
    setRange
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
        text: text.value,
        ["arrow-icon"]: "calendar-line"
      })
    } : {}, {
      e: __props.rangeable
    }, __props.rangeable ? common_vendor.e({
      f: __props.showShortcuts
    }, __props.showShortcuts ? {
      g: common_vendor.f(shortcuts.value, (item, index, i0) => {
        return {
          a: common_vendor.t(item.label),
          b: index,
          c: common_vendor.o(($event) => {
            return setRangeValue(item.value, index);
          }, index),
          d: "b3a3a038-2-" + i0 + ",b3a3a038-1",
          e: common_vendor.p({
            plain: true,
            type: shortcutsIndex.value == index ? "primary" : "info"
          })
        };
      })
    } : {}, {
      h: values.value.length > 0 && values.value[0] != ""
    }, values.value.length > 0 && values.value[0] != "" ? {
      i: common_vendor.t(values.value[0]),
      j: common_vendor.p({
        pt: {
          className: "text-center"
        }
      })
    } : {
      k: common_vendor.t(__props.startPlaceholder),
      l: common_vendor.p({
        pt: {
          className: "text-center text-surface-400"
        }
      })
    }, {
      m: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? 1 : "",
      n: rangeIndex.value == 0 ? 1 : "",
      o: common_vendor.o(($event) => {
        return setRange(0);
      }),
      p: common_vendor.t(__props.rangeSeparator),
      q: common_vendor.p({
        pt: {
          className: "mx-3"
        }
      }),
      r: values.value.length > 1 && values.value[1] != ""
    }, values.value.length > 1 && values.value[1] != "" ? {
      s: common_vendor.t(values.value[1]),
      t: common_vendor.p({
        pt: {
          className: "text-center"
        }
      })
    } : {
      v: common_vendor.t(__props.endPlaceholder),
      w: common_vendor.p({
        pt: {
          className: "text-center text-surface-400"
        }
      })
    }, {
      x: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? 1 : "",
      y: rangeIndex.value == 1 ? 1 : "",
      z: common_vendor.o(($event) => {
        return setRange(1);
      })
    }) : {}, {
      A: common_vendor.o(onChange),
      B: common_vendor.p({
        headers: __props.headers,
        value: indexes.value,
        columns: columns.value,
        ["reset-on-change"]: false
      }),
      C: __props.showCancel
    }, __props.showCancel ? {
      D: common_vendor.t(__props.cancelText),
      E: common_vendor.o(close),
      F: common_vendor.p({
        size: "large",
        text: true,
        border: true,
        type: "light",
        pt: {
          className: "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
        }
      })
    } : {}, {
      G: __props.showConfirm
    }, __props.showConfirm ? {
      H: common_vendor.t(__props.confirmText),
      I: common_vendor.o(confirm),
      J: common_vendor.p({
        size: "large",
        pt: {
          className: "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
        }
      })
    } : {}, {
      K: common_vendor.o(() => {
      }),
      L: common_vendor.sr(popupRef, "b3a3a038-1", {
        "k": "popupRef"
      }),
      M: common_vendor.o(onClosed),
      N: common_vendor.o(($event) => {
        return visible.value = $event;
      }),
      O: common_vendor.p({
        title: __props.title,
        pt: ptPopup.value,
        modelValue: visible.value
      })
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b3a3a038"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-select-date/cl-select-date.js.map
