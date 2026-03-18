"use strict";
const common_vendor = require("../../../common/vendor.js");
const locale_index = require("../../../locale/index.js");
require("../../../uni_modules/cool-unix/cool/router/index.js");
require("../../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../../uni_modules/cool-unix/cool/hooks/refs.js");
require("../../../uni_modules/cool-unix/config.js");
const core_service_index = require("../../../core/service/index.js");
const core_apiRouter_path = require("../../../core/apiRouter/path.js");
const core_utils_parse = require("../../../core/utils/parse.js");
const config_index = require("../../../config/index.js");
const components_workshop_workshopTree = require("../../../components/workshop/workshopTree.js");
if (!Array) {
  const _easycom_l_echart_1 = common_vendor.resolveComponent("l-echart");
  _easycom_l_echart_1();
}
const _easycom_l_echart = () => "../../../uni_modules/lime-echart/components/l-echart/l-echart.js";
if (!Math) {
  _easycom_l_echart();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "chart-equip-runtime"
}, { __name: "echart-equip-card", setup(__props) {
  uni_modules_coolUnix_cool_hooks_refs.useRefs();
  const chartRef = common_vendor.ref(null);
  const loading = common_vendor.ref(false);
  const equipCount = common_vendor.ref({
    total: 0,
    alarm: 0,
    online: 0,
    offline: 0,
    run: 0,
    stopped: 0
  });
  let timer = null;
  const init = () => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      if (chartRef.value == null)
        return Promise.resolve(null);
      const chart = yield chartRef.value.init(null);
      chart.setOption(new UTSJSONObject({
        tooltip: new UTSJSONObject({
          trigger: "item"
        }),
        legend: new UTSJSONObject({
          orient: "vertical",
          right: "5%",
          top: "15%"
        }),
        color: [
          "#bfbfbf",
          "#1890ff",
          "#FAAD14",
          "#52c41a"
        ],
        series: [
          new UTSJSONObject({
            name: locale_index.t("设备在线统计"),
            type: "pie",
            radius: ["30%", "45%"],
            center: ["25%", "50%"],
            itemStyle: new UTSJSONObject({
              borderColor: "#fff",
              borderWidth: 1
            }),
            emphasis: new UTSJSONObject({
              itemStyle: new UTSJSONObject({
                shadowBlur: 10,
                shadowColor: "rgba(0,0,0,0.3)"
              })
            }),
            label: new UTSJSONObject({
              show: true,
              formatter: "{d}%",
              position: "inside"
              // 内部显示
            }),
            data: [
              new UTSJSONObject({ value: equipCount.value.offline, name: locale_index.t("离线") }),
              new UTSJSONObject({ value: equipCount.value.online, name: locale_index.t("在线") })
            ]
          }),
          new UTSJSONObject({
            name: locale_index.t("设备运行状态"),
            type: "pie",
            radius: ["30%", "45%"],
            center: ["55%", "50%"],
            itemStyle: new UTSJSONObject({
              borderColor: "#fff",
              borderWidth: 1
            }),
            emphasis: new UTSJSONObject({
              itemStyle: new UTSJSONObject({
                shadowBlur: 10,
                shadowColor: "rgba(0,0,0,0.3)"
              })
            }),
            label: new UTSJSONObject({
              show: true,
              formatter: "{d}%",
              position: "inside"
              // 内部显示
            }),
            data: [
              new UTSJSONObject({ value: equipCount.value.stopped, name: locale_index.t("停止") }),
              new UTSJSONObject({ value: equipCount.value.run, name: locale_index.t("运行") })
            ]
          })
        ]
      }));
    });
  };
  function reloadEChart() {
    chartRef.value.setOption(new UTSJSONObject({
      series: [
        new UTSJSONObject({
          data: [
            new UTSJSONObject({ value: equipCount.value.offline, name: locale_index.t("离线") }),
            new UTSJSONObject({ value: equipCount.value.online, name: locale_index.t("在线") })
          ]
        }),
        new UTSJSONObject({
          data: [
            new UTSJSONObject({ value: equipCount.value.stopped, name: locale_index.t("停止") }),
            new UTSJSONObject({ value: equipCount.value.run, name: locale_index.t("运行") })
          ]
        })
      ]
    }));
  }
  function reloadData() {
    if (loading.value) {
      return null;
    }
    loading.value = true;
    try {
      core_service_index.request({
        url: core_apiRouter_path.apiPath.equip_count,
        method: "POST",
        data: new UTSJSONObject({
          needWorkshopCascade: false,
          limitUserWorkshop: true,
          workshopCode: components_workshop_workshopTree.workshopTree.selectNode.value.id == -1 ? null : components_workshop_workshopTree.workshopTree.selectNode.value.id
        })
      }).then((res = null) => {
        if (res === null) {
          return null;
        }
        let t = core_utils_parse.parseData(res);
        if (t === null) {
          return null;
        }
        equipCount.value = t;
      });
    } finally {
      loading.value = false;
    }
  }
  common_vendor.watch(equipCount, () => {
    reloadEChart();
  }, { deep: true });
  common_vendor.onMounted(() => {
    timer = setInterval(() => {
      reloadData();
    }, config_index.config.equipRefreshTime);
  });
  common_vendor.onUnmounted(() => {
    if (timer != null) {
      clearInterval(timer);
      timer = null;
    }
  });
  common_vendor.onShow(() => {
    setTimeout(() => {
      reloadData();
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
      a: common_vendor.sr(chartRef, "96027d13-0", {
        "k": "chartRef"
      }),
      b: common_vendor.o(init),
      c: common_vendor.t(common_vendor.unref(locale_index.t)("设备总计")),
      d: common_vendor.t(equipCount.value.total),
      e: common_vendor.t(common_vendor.unref(locale_index.t)("报警设备")),
      f: common_vendor.t(equipCount.value.alarm),
      g: common_vendor.t(common_vendor.unref(locale_index.t)("在线设备")),
      h: common_vendor.t(equipCount.value.online),
      i: common_vendor.t(common_vendor.unref(locale_index.t)("离线设备")),
      j: common_vendor.t(equipCount.value.offline),
      k: common_vendor.t(common_vendor.unref(locale_index.t)("运行设备")),
      l: common_vendor.t(equipCount.value.run),
      m: common_vendor.t(common_vendor.unref(locale_index.t)("停止设备")),
      n: common_vendor.t(equipCount.value.stopped),
      o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
    };
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-96027d13"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/echart-equip-card.js.map
