"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../uni_modules/cool-unix/cool/hooks/refs.js");
const uni_modules_coolUnix_cool_utils_device = require("../../uni_modules/cool-unix/cool/utils/device.js");
require("../../uni_modules/cool-unix/config.js");
const locale_index = require("../../locale/index.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
const core_utils_parse = require("../../core/utils/parse.js");
const core_utils_equipParser = require("../../core/utils/equipParser.js");
const components_workshop_workshopTree = require("../../components/workshop/workshopTree.js");
const config_index = require("../../config/index.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_text_1 + _easycom_cl_icon_1 + _easycom_cl_topbar_1 + _easycom_cl_page_1)();
}
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_icon = () => "../../uni_modules/cool-unix/components/cl-icon/cl-icon.js";
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_icon + _easycom_cl_topbar + common_vendor.unref(equipBadge) + common_vendor.unref(CustomTabbar) + _easycom_cl_page)();
}
const CustomTabbar = () => "../../components/tabbar.js";
const equipBadge = () => "./components/equip-badge.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "equip",
  setup(__props) {
    uni_modules_coolUnix_cool_hooks_refs.useRefs();
    common_vendor.ref(false);
    const equipList = common_vendor.ref([]);
    const sourceList = common_vendor.ref([]);
    const equipCount = common_vendor.ref({
      total: 0,
      alarm: 0,
      online: 0,
      offline: 0,
      run: 0,
      stopped: 0
    });
    let currentPage = 1;
    let pageSize = 20;
    let timer = null;
    const loading = common_vendor.ref(false);
    const pageloading = common_vendor.ref(false);
    const viewMode = common_vendor.ref("card");
    const statusFilter = common_vendor.ref(null);
    function getFilteredSourceList() {
      const list = sourceList.value;
      const f = statusFilter.value;
      if (f === null)
        return list;
      return list.filter(function(item) {
        if (f === "online")
          return item.onlineState === 1;
        if (f === "offline")
          return item.onlineState === 0;
        if (f === "run")
          return item.onlineState === 1 && item.runState === 1;
        if (f === "stopped")
          return item.onlineState === 1 && item.runState === 0;
        if (f === "alarm")
          return item.alarmState === 1;
        return true;
      });
    }
    function setWorkshop() {
      uni_modules_coolUnix_cool_router_index.router.to("/pages/equip/workshop_tree");
    }
    function typeImage(equip) {
      return core_utils_equipParser.equipImage(equip);
    }
    function getAlarmTexts(item) {
      var _a;
      return (_a = item.alarmTexts) !== null && _a !== void 0 ? _a : [];
    }
    function getAttrs(item) {
      var _a;
      return (_a = item.attrs) !== null && _a !== void 0 ? _a : [];
    }
    function loadPage(page, isReStart) {
      if (pageloading.value) {
        return null;
      }
      pageloading.value = true;
      function push() {
        let start = 0;
        if (!isReStart) {
          start = (page - 1) * pageSize;
        }
        const end = page * pageSize;
        const list = getFilteredSourceList();
        const nextPage = list.slice(start, end);
        if (nextPage.length > 0) {
          if (isReStart) {
            equipList.value = nextPage;
          } else {
            equipList.value.push(...nextPage);
          }
        } else {
          if (isReStart) {
            equipList.value = [];
          }
        }
        pageloading.value = false;
      }
      setTimeout(() => {
        push();
      }, 16);
    }
    function loadMore() {
      if (loading.value) {
        return null;
      }
      const nextPage = currentPage + 1;
      const start = (nextPage - 1) * pageSize;
      if (start >= getFilteredSourceList().length) {
        return null;
      }
      currentPage = nextPage;
      loadPage(currentPage, false);
    }
    function setStatusFilter(key = null) {
      statusFilter.value = statusFilter.value === key ? null : key;
      currentPage = 1;
      loadPage(1, true);
    }
    const reloadData = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (loading.value) {
          return Promise.resolve(null);
        }
        loading.value = true;
        try {
          yield core_service_index.request({
            url: core_apiRouter_path.apiPath.equip_page,
            method: "POST",
            data: new UTSJSONObject({
              workshopCode: components_workshop_workshopTree.workshopTree.selectNode.value.id == -1 ? null : components_workshop_workshopTree.workshopTree.selectNode.value.id,
              needRealtime: true,
              needWorkshopCascade: true,
              queryWorkshop: true,
              queryAttrs: true,
              limitUserWorkshop: true,
              requirePage: false
            })
          }).then((res = null) => {
            const c = {
              total: 0,
              alarm: 0,
              online: 0,
              offline: 0,
              run: 0,
              stopped: 0
            };
            if (res === null) {
              sourceList.value = [];
            } else {
              let r = core_utils_parse.parseData(res);
              if (r === null) {
                sourceList.value = [];
              } else {
                sourceList.value = r;
              }
            }
            if (sourceList.value.length > 0) {
              sourceList.value.forEach((item) => {
                if (item.onlineState == 0) {
                  c.offline++;
                } else {
                  c.online++;
                  if (item.runState == 1) {
                    c.run++;
                  } else {
                    c.stopped++;
                  }
                  if (item.alarmState == 1) {
                    c.alarm++;
                  }
                }
              });
            }
            equipCount.value = c;
            loadPage(currentPage, true);
          });
        } finally {
          loading.value = false;
        }
      });
    };
    const reloadAll = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        currentPage = 1;
        yield reloadData();
      });
    };
    common_vendor.onReachBottom(() => {
      loadMore();
    });
    common_vendor.onLoad(() => {
      if (timer != null) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        reloadData();
      }, config_index.config.equipRefreshTime);
    });
    common_vendor.onShow(() => {
      reloadAll();
    });
    common_vendor.onHide(() => {
      if (timer != null) {
        clearInterval(timer);
        timer = null;
      }
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.t(common_vendor.unref(locale_index.t)("设备")),
        b: common_vendor.p({
          color: "primary",
          pt: {
            className: "-important-text-2xl"
          }
        }),
        c: common_vendor.p({
          name: viewMode.value === "card" ? "list-view" : "apps-line",
          color: "primary",
          pt: {
            className: "-important-text-lg"
          }
        }),
        d: common_vendor.n(common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "bg-gray-700" : "bg-gray-200"),
        e: common_vendor.o(($event) => {
          return viewMode.value = viewMode.value === "card" ? "list" : "card";
        }),
        f: common_vendor.t(common_vendor.unref(components_workshop_workshopTree.workshopTree).selectNode.value.label),
        g: common_vendor.p({
          color: "primary",
          pt: {
            className: "-important-text-base ml-2"
          }
        }),
        h: common_vendor.p({
          name: "arrow-right-s-line",
          color: "primary",
          pt: {
            className: "-important-text-base mb-1"
          }
        }),
        i: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        j: !common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        k: common_vendor.o(setWorkshop),
        l: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        m: common_vendor.p({
          fixed: true,
          ["background-color"]: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "black" : "white",
          ["show-back"]: false,
          ["safe-area-top"]: true,
          height: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? null : 100,
          pt: {
            className: "-important-z-50"
          }
        }),
        n: common_vendor.t(common_vendor.unref(locale_index.t)("在线")),
        o: common_vendor.t(equipCount.value.online),
        p: statusFilter.value === "online" ? 1 : "",
        q: common_vendor.o(($event) => {
          return setStatusFilter("online");
        }),
        r: common_vendor.t(common_vendor.unref(locale_index.t)("离线")),
        s: common_vendor.t(equipCount.value.offline),
        t: statusFilter.value === "offline" ? 1 : "",
        v: common_vendor.o(($event) => {
          return setStatusFilter("offline");
        }),
        w: common_vendor.t(common_vendor.unref(locale_index.t)("运行")),
        x: common_vendor.t(equipCount.value.run),
        y: statusFilter.value === "run" ? 1 : "",
        z: common_vendor.o(($event) => {
          return setStatusFilter("run");
        }),
        A: common_vendor.t(common_vendor.unref(locale_index.t)("停止")),
        B: common_vendor.t(equipCount.value.stopped),
        C: statusFilter.value === "stopped" ? 1 : "",
        D: common_vendor.o(($event) => {
          return setStatusFilter("stopped");
        }),
        E: common_vendor.t(common_vendor.unref(locale_index.t)("报警")),
        F: common_vendor.t(equipCount.value.alarm),
        G: statusFilter.value === "alarm" ? 1 : "",
        H: common_vendor.o(($event) => {
          return setStatusFilter("alarm");
        }),
        I: viewMode.value === "card"
      }, viewMode.value === "card" ? {
        J: common_vendor.f(equipList.value, (item, index, i0) => {
          var _a;
          return common_vendor.e({
            a: typeImage(item),
            b: "310265e9-6-" + i0 + ",310265e9-0",
            c: common_vendor.p({
              equip: item
            }),
            d: common_vendor.t(item.name),
            e: common_vendor.t((_a = item.workshop) == null ? void 0 : _a.name),
            f: common_vendor.t(item.selfCode),
            g: common_vendor.n(item.onlineState == 1 ? "online" : "offline"),
            h: common_vendor.t(item.onlineState == 1 ? common_vendor.unref(locale_index.t)("在线") : common_vendor.unref(locale_index.t)("离线")),
            i: common_vendor.n(item.onlineState == 0 ? "offline" : item.runState == 1 ? "run" : "stopped"),
            j: common_vendor.t(item.onlineState == 0 ? "-" : item.runState == 1 ? common_vendor.unref(locale_index.t)("运行") : common_vendor.unref(locale_index.t)("停止")),
            k: item.alarmState == 1
          }, item.alarmState == 1 ? {
            l: common_vendor.t(common_vendor.unref(locale_index.t)("报警"))
          } : {}, {
            m: getAlarmTexts(item).length > 0 || getAttrs(item).length > 0
          }, getAlarmTexts(item).length > 0 || getAttrs(item).length > 0 ? {
            n: common_vendor.f(getAlarmTexts(item), (i2, idx2, i1) => {
              return {
                a: common_vendor.t(i2),
                b: "alarm-" + idx2
              };
            }),
            o: common_vendor.f(getAttrs(item), (i, idx, i1) => {
              return {
                a: common_vendor.t(i.name),
                b: common_vendor.t(i.value == null ? common_vendor.unref(locale_index.t)("暂未获取") : i.value),
                c: common_vendor.t(i.unit != null && i.unit !== "" ? " " + i.unit : ""),
                d: "attr-" + idx
              };
            })
          } : {}, {
            p: index,
            q: item.runState == 1 && item.alarmState == 0 ? 1 : "",
            r: item.alarmState == 1 ? 1 : "",
            s: item.onlineState == 0 ? 1 : "",
            t: common_vendor.o(($event) => {
              return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/equip/equip_detail?id=" + item.id);
            }, index)
          });
        })
      } : {
        K: common_vendor.f(equipList.value, (item, index, i0) => {
          var _a;
          return {
            a: typeImage(item),
            b: "310265e9-7-" + i0 + ",310265e9-0",
            c: common_vendor.p({
              equip: item
            }),
            d: common_vendor.t(item.name),
            e: common_vendor.t((_a = item.workshop) == null ? void 0 : _a.name),
            f: common_vendor.t(item.selfCode),
            g: common_vendor.n(item.onlineState == 1 ? "online" : "offline"),
            h: common_vendor.t(item.onlineState == 1 ? common_vendor.unref(locale_index.t)("在线") : common_vendor.unref(locale_index.t)("离线")),
            i: common_vendor.n(item.onlineState == 0 ? "offline" : item.runState == 1 ? "run" : "stopped"),
            j: common_vendor.t(item.onlineState == 0 ? "-" : item.runState == 1 ? common_vendor.unref(locale_index.t)("运行") : common_vendor.unref(locale_index.t)("停止")),
            k: "310265e9-8-" + i0 + ",310265e9-0",
            l: index,
            m: item.runState == 1 && item.alarmState == 0 ? 1 : "",
            n: item.alarmState == 1 ? 1 : "",
            o: item.onlineState == 0 ? 1 : "",
            p: common_vendor.o(($event) => {
              return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/equip/equip_detail?id=" + item.id);
            }, index)
          };
        }),
        L: common_vendor.p({
          name: "arrow-right-s-line",
          color: "primary",
          pt: {
            className: "-important-text-lg flex-shrink-0"
          }
        })
      }, {
        M: pageloading.value
      }, pageloading.value ? {} : {}, {
        N: common_vendor.gei(_ctx, ""),
        O: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-310265e9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/equip.js.map
