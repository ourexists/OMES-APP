"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../uni_modules/cool-unix/cool/router/index.js");
require("../../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../../uni_modules/cool-unix/cool/hooks/refs.js");
require("../../../uni_modules/cool-unix/config.js");
const uni_modules_limeEchart_static_web_echarts_esm_min = require("../../../uni_modules/lime-echart/static/web/echarts.esm.min.js");
const core_service_index = require("../../../core/service/index.js");
const core_apiRouter_path = require("../../../core/apiRouter/path.js");
const core_utils_parse = require("../../../core/utils/parse.js");
const locale_index = require("../../../locale/index.js");
const config_index = require("../../../config/index.js");
if (!Array) {
  const _easycom_l_echart_1 = common_vendor.resolveComponent("l-echart");
  _easycom_l_echart_1();
}
const _easycom_l_echart = () => "../../../uni_modules/lime-echart/components/l-echart/l-echart.js";
if (!Math) {
  _easycom_l_echart();
}
class Payload extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          equip: { type: "Unknown", optional: false }
        };
      },
      name: "Payload"
    };
  }
  constructor(options, metadata = Payload.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.equip = this.__props__.equip;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "echart-equip-run"
}, { __name: "echart-equip-run", props: {
  equip: {}
}, setup(__props) {
  uni_modules_coolUnix_cool_hooks_refs.useRefs();
  const chartRef = common_vendor.ref(null);
  const data = common_vendor.ref([]);
  const startDateX = common_vendor.ref(null);
  const endDateX = common_vendor.ref(null);
  let loading = false;
  const props = __props;
  let timer = null;
  function parseColor(api = null) {
    let type = api.value(0);
    let state = api.value(3);
    if (type == 0) {
      return state == 1 ? "#1890ff" : "#bfbfbf";
    }
    if (type == 1) {
      return state == 1 ? "#52c41a" : "#FAAD14";
    }
    if (type == 2) {
      return state == 1 ? "#ff4d4f" : "#bfbfbf";
    }
  }
  const mergeRecords = (data2 = null) => {
    data2.sort((a = null, b = null) => {
      if (a[3] === b[3]) {
        return a[1] - b[1];
      }
      return a[3] - b[3];
    });
    const mergedData = [];
    for (let i = 0; i < data2.length; i++) {
      const current = data2[i];
      if (mergedData.length === 0) {
        mergedData.push(current);
        continue;
      }
      const last = mergedData[mergedData.length - 1];
      if (last[3] === current[3] && last[2] >= current[1]) {
        last[2] = last[2] > current[2] ? last[2] : current[2];
      } else {
        mergedData.push(current);
      }
    }
    return mergedData;
  };
  const calcRecord = (type, startDate, endDate) => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      let r = [];
      let url = null;
      if (type == 1) {
        url = core_apiRouter_path.apiPath.equip_run_count;
      } else if (type == 0) {
        url = core_apiRouter_path.apiPath.equip_online_count;
      } else if (type == 2) {
        url = core_apiRouter_path.apiPath.equip_alarm_count;
      }
      yield core_service_index.request({
        url,
        method: "POST",
        data: new UTSJSONObject({
          sn: props.equip.selfCode,
          startDate: core_utils_parse.formatDate(startDate),
          endDate: core_utils_parse.formatDate(endDate),
          requirePage: false
        })
      }).then((res = null) => {
        if (res === null) {
          return null;
        }
        let d = core_utils_parse.parseData(res);
        if (d == null || d.length <= 0) {
          return null;
        }
        d.forEach((item) => {
          r.push([type, core_utils_parse.parseDate(item.startTime), core_utils_parse.parseDate(item.endTime), item.state]);
        });
        r = mergeRecords(r);
      });
      return r;
    });
  };
  const reloadData = (startDate, endDate) => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      if (loading) {
        return Promise.resolve(null);
      }
      loading = true;
      try {
        let r = [];
        let r1 = yield calcRecord(1, startDate, endDate);
        let r0 = yield calcRecord(0, startDate, endDate);
        let r2 = yield calcRecord(2, startDate, endDate);
        if (r0.length > 0) {
          r.push(...r0);
        }
        if (r1.length > 0) {
          r.push(...r1);
        }
        if (r2.length > 0) {
          r.push(...r2);
        }
        startDateX.value = startDate;
        endDateX.value = endDate;
        data.value = r;
      } finally {
        loading = false;
      }
    });
  };
  let option = new UTSJSONObject({
    title: new UTSJSONObject({
      text: locale_index.t("近一小时内设备运行趋势")
    }),
    tooltip: new UTSJSONObject({
      confine: true,
      formatter: (params = null) => {
        const type = params.data[0];
        const state = params.data[3];
        let desc = "";
        if (type == 0) {
          if (state == 1) {
            desc = locale_index.t("在线");
          } else {
            desc = locale_index.t("离线");
          }
        } else if (type == 1) {
          if (state == 1) {
            desc = locale_index.t("运行");
          } else {
            desc = locale_index.t("停止");
          }
        } else if (type == 2) {
          if (state == 1) {
            desc = locale_index.t("报警");
          } else {
            desc = locale_index.t("正常");
          }
        }
        const start = core_utils_parse.formatDate(params.data[1]);
        const end = core_utils_parse.formatDate(params.data[2]);
        return `${desc}\r
${start}~${end}`;
      }
    }),
    xAxis: new UTSJSONObject({
      type: "time",
      axisLabel: new UTSJSONObject({
        fontSize: 6
        // Set the desired font size here
      })
    }),
    yAxis: new UTSJSONObject({ type: "category", data: [locale_index.t("在线"), locale_index.t("运行"), locale_index.t("报警")] }),
    series: [new UTSJSONObject({
      type: "custom",
      renderItem: (params = null, api = null) => {
        const yIndex = api.value(0);
        const start = api.coord([api.value(1), yIndex]);
        const end = api.coord([api.value(2), yIndex]);
        return new UTSJSONObject({
          type: "rect",
          shape: new UTSJSONObject({
            x: start[0],
            y: start[1] - 10,
            width: end[0] - start[0],
            height: 20
          }),
          style: new UTSJSONObject({
            fill: parseColor(api)
          })
        });
      },
      encode: new UTSJSONObject({ x: [1, 2], y: 0 }),
      data: []
    })]
  });
  const init = () => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      if (chartRef.value == null) {
        return Promise.resolve(null);
      }
      yield chartRef.value.init(uni_modules_limeEchart_static_web_echarts_esm_min.echartsLibrary, null);
    });
  };
  const reloadEChart = () => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      option.series[0].data = data.value;
      option.xAxis.min = startDateX.value;
      option.xAxis.max = endDateX.value;
      chartRef.value.setOption(option);
      chartRef.value.resize();
    });
  };
  common_vendor.watch(data, () => {
    reloadEChart();
  }, { deep: true });
  common_vendor.onMounted(() => {
    timer = setInterval(() => {
      const end = /* @__PURE__ */ new Date();
      const start = new Date(end);
      start.setHours(end.getHours() - 1);
      reloadData(start, end);
    }, config_index.config.equipRefreshTime * 6);
  });
  common_vendor.onShow(() => {
    setTimeout(() => {
      const end = /* @__PURE__ */ new Date();
      const start = new Date(end);
      start.setHours(end.getHours() - 1);
      reloadData(start, end);
    }, 500);
  });
  common_vendor.onHide(() => {
    if (timer != null) {
      clearInterval(timer);
      timer = null;
    }
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.sr(chartRef, "176f8c67-0", {
        "k": "chartRef"
      }),
      b: common_vendor.o(init),
      c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
    };
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-176f8c67"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/equip/components/echart-equip-run.js.map
