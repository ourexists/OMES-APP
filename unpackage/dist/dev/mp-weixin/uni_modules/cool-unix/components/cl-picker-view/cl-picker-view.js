"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  _easycom_cl_text_1();
}
const _easycom_cl_text = () => "../cl-text/cl-text.js";
if (!Math) {
  _easycom_cl_text();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-select-picker-view"
}, { __name: "cl-picker-view", props: {
  // 选择器表头
  headers: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 选择器值
  value: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 选择器选项
  columns: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 选择器选项高度
  itemHeight: {
    type: Number,
    default: 42
  },
  // 选择器高度
  height: {
    type: Number,
    default: 600
  }
}, emits: ["change-value", "change-index"], setup(__props, _a) {
  var __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const windowWidth = common_vendor.index.getWindowInfo().windowWidth;
  const headers = common_vendor.computed(() => {
    return props.headers.slice(0, props.columns.length);
  });
  const maskStyle = common_vendor.computed(() => {
    if (uni_modules_coolUnix_theme_index.isDark.value) {
      return `background-image: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0)
		)`;
    }
    return "";
  });
  const indicatorStyle = common_vendor.computed(() => {
    const width = ((windowWidth - uni_modules_coolUnix_cool_utils_parse.rpx2px(20)) / props.columns.length - uni_modules_coolUnix_cool_utils_parse.rpx2px(2) - 8).toFixed(0);
    let str = "";
    const style = new UTSJSONObject({
      height: `${props.itemHeight}px`,
      width: `${width}px`,
      left: "4px",
      backgroundColor: "rgba(10, 10, 10, 0.04)",
      borderRadius: "10px",
      border: "1rpx solid rgba(10, 10, 10, 0.2)"
    });
    if (uni_modules_coolUnix_theme_index.isDark.value) {
      style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      style.border = "1rpx solid rgba(255, 255, 255, 0.3)";
    }
    uni_modules_coolUnix_cool_utils_comm.forInObject(style, (value = null, key) => {
      str += `${key}: ${value};`;
    });
    return str;
  });
  function onChange(e) {
    const indexs = e.detail.value;
    indexs.forEach((v, i, arr) => {
      if (i < props.columns.length) {
        const n = props.columns[i].length;
        if (v >= n) {
          arr[i] = n - 1;
        }
      }
    });
    if (uni_modules_coolUnix_cool_utils_comm.isEqual(indexs, props.value)) {
      return null;
    }
    const values = props.columns.map((c, i) => {
      return uni_modules_coolUnix_cool_utils_comm.isNull(c[indexs[i]]) ? 0 : c[indexs[i]].value;
    });
    emit("change-value", values);
    emit("change-index", indexs);
  }
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = common_vendor.e({
      a: headers.value.length > 0
    }, headers.value.length > 0 ? {
      b: common_vendor.f(headers.value, (label, index, i0) => {
        return {
          a: common_vendor.t(label),
          b: index,
          c: "4bc0ee7f-0-" + i0
        };
      }),
      c: common_vendor.p({
        pt: {
          className: "flex-1 text-sm text-center"
        }
      })
    } : {}, {
      d: common_vendor.f(__props.columns, (column, columnIndex, i0) => {
        return {
          a: common_vendor.f(column, (item, index, i1) => {
            return {
              a: common_vendor.t(item.label),
              b: "4bc0ee7f-1-" + i0 + "-" + i1,
              c: common_vendor.p({
                pt: {
                  className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)([[common_vendor.unref(uni_modules_coolUnix_theme_index.isDark), "text-surface-500"], [common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) && index == __props.value[columnIndex], "text-white"]])
                }
              }),
              d: index
            };
          }),
          b: columnIndex
        };
      }),
      e: `${__props.itemHeight}px`,
      f: __props.value,
      g: maskStyle.value,
      h: maskStyle.value,
      i: maskStyle.value,
      j: indicatorStyle.value,
      k: common_vendor.o(onChange),
      l: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseRpx)(__props.height),
      m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4bc0ee7f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-picker-view/cl-picker-view.js.map
