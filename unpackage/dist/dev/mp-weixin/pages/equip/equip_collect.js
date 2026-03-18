"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../uni_modules/cool-unix/cool/hooks/refs.js");
const uni_modules_coolUnix_cool_utils_day = require("../../uni_modules/cool-unix/cool/utils/day.js");
const uni_modules_coolUnix_cool_utils_device = require("../../uni_modules/cool-unix/cool/utils/device.js");
require("../../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_hooks_page = require("../../uni_modules/cool-unix/hooks/page.js");
const locale_index = require("../../locale/index.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
const core_utils_parse = require("../../core/utils/parse.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_select_date_1 = common_vendor.resolveComponent("cl-select-date");
  const _easycom_cl_loading_1 = common_vendor.resolveComponent("cl-loading");
  const _easycom_l_echart_1 = common_vendor.resolveComponent("l-echart");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_text_1 + _easycom_cl_topbar_1 + _easycom_cl_select_date_1 + _easycom_cl_loading_1 + _easycom_l_echart_1 + _easycom_cl_page_1)();
}
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_select_date = () => "../../uni_modules/cool-unix/components/cl-select-date/cl-select-date.js";
const _easycom_cl_loading = () => "../../uni_modules/cool-unix/components/cl-loading/cl-loading.js";
const _easycom_l_echart = () => "../../uni_modules/lime-echart/components/l-echart/l-echart.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_topbar + _easycom_cl_select_date + _easycom_cl_loading + _easycom_l_echart + _easycom_cl_page)();
}
const MAX_CHART_POINTS = 400;
const LARGE_RANGE_DAYS = 90;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "equip_collect",
  setup(__props) {
    uni_modules_coolUnix_hooks_page.usePage();
    uni_modules_coolUnix_cool_hooks_refs.useRefs();
    const attrConfig = common_vendor.ref([]);
    const data = common_vendor.ref([]);
    const chartRef = common_vendor.ref(null);
    const containerSize = common_vendor.ref(800);
    const selectDateRef = common_vendor.ref(null);
    const customDate = common_vendor.ref(["", ""]);
    const loading = common_vendor.ref(false);
    const dataDownsampled = common_vendor.ref(false);
    let equipSn = "";
    let singleAttrName = "";
    const pageTitle = common_vendor.ref(locale_index.t("历史曲线"));
    let singleHeight = 600;
    function downsampleSeriesData(arr, maxPoints) {
      if (arr.length <= maxPoints)
        return arr;
      const result = [];
      result.push(arr[0]);
      const step = (arr.length - 1) / (maxPoints - 1);
      for (let i = 1; i < maxPoints - 1; i++) {
        const idx = Math.min(Math.round(i * step), arr.length - 1);
        result.push(arr[idx]);
      }
      result.push(arr[arr.length - 1]);
      return result;
    }
    const shortcuts = common_vendor.ref([
      {
        label: locale_index.t("今天"),
        value: [
          uni_modules_coolUnix_cool_utils_day.dayUts().format("YYYY-MM-DD"),
          uni_modules_coolUnix_cool_utils_day.dayUts().format("YYYY-MM-DD")
        ]
      },
      {
        label: locale_index.t("昨日"),
        value: [
          uni_modules_coolUnix_cool_utils_day.dayUts().subtract(1, "day").format("YYYY-MM-DD"),
          uni_modules_coolUnix_cool_utils_day.dayUts().subtract(1, "day").format("YYYY-MM-DD")
        ]
      },
      {
        label: locale_index.t("本周"),
        value: [
          uni_modules_coolUnix_cool_utils_day.dayUts().startOf("week").format("YYYY-MM-DD"),
          uni_modules_coolUnix_cool_utils_day.dayUts().endOf("week").format("YYYY-MM-DD")
        ]
      },
      {
        label: locale_index.t("本月"),
        value: [
          uni_modules_coolUnix_cool_utils_day.dayUts().startOf("month").format("YYYY-MM-DD"),
          uni_modules_coolUnix_cool_utils_day.dayUts().endOf("month").format("YYYY-MM-DD")
        ]
      }
    ]);
    const INDUSTRY_THEME = new UTSJSONObject({
      textPrimary: "#1f2937",
      textSecondary: "#6b7280",
      axisLine: "#d1d5db",
      splitLine: "#e5e7eb",
      line: "#3b82f6",
      areaFrom: "rgba(59,130,246,0.25)",
      areaTo: "rgba(59,130,246,0.02)",
      tooltipBg: "rgba(15,23,42,0.9)",
      tooltipBorder: "#334155"
    });
    function generateOption() {
      let visualMap = [];
      let xAxis = [];
      let yAxis = [];
      let grid = [];
      let series = [];
      let title = [];
      let single = 100 / attrConfig.value.length;
      attrConfig.value.forEach((item, index) => {
        visualMap.push(new UTSJSONObject({
          show: false,
          type: "continuous",
          seriesIndex: index
        }));
        title.push(new UTSJSONObject({
          top: `${single / 15 + single * index}%`,
          left: "center",
          text: item.name,
          textStyle: new UTSJSONObject({
            fontSize: 12,
            fontWeight: 500,
            color: INDUSTRY_THEME.textPrimary
          })
        }));
        xAxis.push(new UTSJSONObject({
          gridIndex: index,
          type: "time",
          axisLine: new UTSJSONObject({
            lineStyle: new UTSJSONObject({
              color: INDUSTRY_THEME.axisLine
            })
          }),
          axisTick: new UTSJSONObject({ show: false }),
          splitLine: new UTSJSONObject({
            show: false
          }),
          axisLabel: new UTSJSONObject({
            color: INDUSTRY_THEME.textSecondary,
            fontSize: 11,
            rotate: 30
          })
        }));
        yAxis.push(new UTSJSONObject({
          type: "value",
          axisLine: new UTSJSONObject({
            lineStyle: new UTSJSONObject({
              color: INDUSTRY_THEME.axisLine
            })
          }),
          axisTick: new UTSJSONObject({ show: false }),
          axisLabel: new UTSJSONObject({
            color: INDUSTRY_THEME.textSecondary,
            fontSize: 11
          }),
          splitLine: new UTSJSONObject({
            show: true,
            lineStyle: new UTSJSONObject({
              color: INDUSTRY_THEME.splitLine,
              type: "dashed"
            })
          }),
          gridIndex: index
        }));
        grid.push(new UTSJSONObject({
          top: `${single / 5 + single * index}%`,
          height: `${single * 3 / 5}%`
        }));
        let vList = [];
        data.value.forEach((item2) => {
          let d = item2.data[item.name];
          if (d != null) {
            vList.push([item2.time, d]);
          } else {
            vList.push([item2.time, ""]);
          }
        });
        vList = downsampleSeriesData(vList, MAX_CHART_POINTS);
        series.push(new UTSJSONObject({
          type: "line",
          smooth: true,
          showSymbol: false,
          sampling: "lttb",
          lineStyle: new UTSJSONObject({
            width: 1.5,
            color: INDUSTRY_THEME.line
          }),
          areaStyle: new UTSJSONObject({
            color: INDUSTRY_THEME.line,
            opacity: 0.12
          }),
          data: vList,
          xAxisIndex: index,
          yAxisIndex: index
        }));
      });
      return new UTSJSONObject({
        visualMap,
        title,
        tooltip: new UTSJSONObject({
          trigger: "axis"
        }),
        xAxis,
        yAxis,
        grid,
        series
      });
    }
    const loadConfig = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        yield core_service_index.request({
          url: core_apiRouter_path.apiPath.equip_config,
          method: "GET",
          data: new UTSJSONObject({
            equipSn
          })
        }).then((res = null) => {
          if (res === null) {
            return null;
          }
          let r = core_utils_parse.parseData(res);
          if (r == null || r.config == null) {
            return null;
          }
          if (r.config.attrs == null || r.config.attrs.length <= 0) {
            return null;
          }
          let rr = [];
          r.config.attrs.forEach((item) => {
            if (item.needCollect != null && item.needCollect) {
              rr.push(item);
            }
          });
          if (singleAttrName !== "") {
            rr = rr.filter((item) => {
              return item.name === singleAttrName;
            });
            pageTitle.value = singleAttrName;
          } else {
            pageTitle.value = locale_index.t("历史曲线");
          }
          containerSize.value = rr.length * singleHeight;
          attrConfig.value = rr;
          loadHistory();
        });
      });
    };
    const loadHistory = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (attrConfig.value == null || attrConfig.value.length <= 0) {
          return Promise.resolve(null);
        }
        loading.value = true;
        dataDownsampled.value = false;
        try {
          yield core_service_index.request({
            url: core_apiRouter_path.apiPath.equip_collect_page,
            method: "POST",
            data: new UTSJSONObject({
              sn: equipSn,
              startDate: customDate.value[0] == null ? null : customDate.value[0] + "  00:00:00",
              endDate: customDate.value[1] == null ? null : customDate.value[1] + " 23:59:59",
              requirePage: false
            })
          }).then((res = null) => {
            if (res === null) {
              return null;
            }
            let r = core_utils_parse.parseData(res);
            if (r == null) {
              return null;
            }
            data.value = r;
            dataDownsampled.value = r.length > MAX_CHART_POINTS;
          });
        } finally {
          loading.value = false;
        }
      });
    };
    function reloadHistory(s) {
      if (s != null && s.length >= 2 && s[0] && s[1]) {
        const start = new Date(s[0]).getTime();
        const end = new Date(s[1]).getTime();
        const days = (end - start) / (24 * 3600 * 1e3);
        if (days > LARGE_RANGE_DAYS) {
          common_vendor.index.showToast({
            title: locale_index.t("时间跨度较大，已做采样展示"),
            icon: "none",
            duration: 2500
          });
        }
      }
      loadHistory();
    }
    function formatDate(date = null) {
      if (date == null) {
        return "";
      }
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    const init = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (chartRef.value == null)
          return Promise.resolve(null);
        yield chartRef.value.init(null);
        reloadEChart();
      });
    };
    const reloadEChart = () => {
      if (chartRef.value == null)
        return null;
      const option = generateOption();
      common_vendor.nextTick$1(() => {
        if (chartRef.value == null)
          return null;
        chartRef.value.setOption(option);
      });
    };
    common_vendor.watch(data, () => {
      reloadEChart();
    }, { deep: true });
    common_vendor.onLoad((options) => {
      var _a, _b;
      equipSn = (_a = options === null || options === void 0 ? null : options.sn) !== null && _a !== void 0 ? _a : "";
      singleAttrName = (_b = options === null || options === void 0 ? null : options.attr) !== null && _b !== void 0 ? _b : "";
      if (singleAttrName) {
        try {
          singleAttrName = decodeURIComponent(singleAttrName);
        } catch (_) {
        }
      }
      let current = /* @__PURE__ */ new Date();
      customDate.value = [formatDate(current), formatDate(current)];
      loadConfig();
    });
    common_vendor.onShow(() => {
      if (attrConfig.value.length > 0) {
        loadHistory();
      }
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.t(pageTitle.value),
        b: common_vendor.p({
          color: "primary",
          pt: {
            className: "-important-text-xl ml-2"
          }
        }),
        c: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        d: common_vendor.p({
          fixed: true,
          ["background-color"]: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "black" : "white",
          ["show-back"]: true,
          ["safe-area-top"]: true,
          height: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? null : 100,
          pt: {
            className: "-important-z-50"
          }
        }),
        e: attrConfig.value.length > 0
      }, attrConfig.value.length > 0 ? common_vendor.e({
        f: common_vendor.sr(selectDateRef.value, "6aba654d-3,6aba654d-0"),
        g: selectDateRef.value,
        h: common_vendor.o(reloadHistory),
        i: common_vendor.o(($event) => {
          return customDate.value = $event;
        }),
        j: common_vendor.p({
          type: "date",
          title: "",
          shortcuts: shortcuts.value,
          ["label-format"]: "YYYY-MM-DD",
          ["value-format"]: "YYYY-MM-DD",
          pt: {
            className: "text-2xl h-16"
          },
          rangeable: true,
          values: customDate.value
        }),
        k: loading.value
      }, loading.value ? {
        l: common_vendor.p({
          pt: {
            className: "-important-text-primary"
          }
        }),
        m: common_vendor.t(common_vendor.unref(locale_index.t)("加载中..."))
      } : {}, {
        n: dataDownsampled.value
      }, dataDownsampled.value ? {
        o: common_vendor.t(common_vendor.unref(locale_index.t)("数据较多已采样展示"))
      } : {}, {
        p: common_vendor.sr(chartRef, "6aba654d-5,6aba654d-0", {
          "k": "chartRef"
        }),
        q: common_vendor.o(init),
        r: common_vendor.s("height: " + containerSize.value + "rpx")
      }) : {}, {
        s: attrConfig.value.length <= 0
      }, attrConfig.value.length <= 0 ? {
        t: common_vendor.t(common_vendor.unref(singleAttrName) ? common_vendor.unref(locale_index.t)("该属性暂无历史采集") : common_vendor.unref(locale_index.t)("未对该设备进行数据采集配置"))
      } : {}, {
        v: common_vendor.sei(common_vendor.gei(_ctx, ""), "scroll-view")
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6aba654d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/equip/equip_collect.js.map
