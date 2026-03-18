"use strict";
const common_vendor = require("../../common/vendor.js");
const config_index = require("../../config/index.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../uni_modules/cool-unix/cool/hooks/refs.js");
const uni_modules_coolUnix_cool_utils_device = require("../../uni_modules/cool-unix/cool/utils/device.js");
require("../../uni_modules/cool-unix/config.js");
const locale_index = require("../../locale/index.js");
const core_store_index = require("../../core/store/index.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
const core_utils_parse = require("../../core/utils/parse.js");
if (!Array) {
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_image_1 + _easycom_cl_text_1 + _easycom_cl_topbar_1 + _easycom_cl_icon_1 + _easycom_cl_page_1)();
}
const _easycom_cl_image = () => "../../uni_modules/cool-unix/components/cl-image/cl-image.js";
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_icon = () => "../../uni_modules/cool-unix/components/cl-icon/cl-icon.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_image + _easycom_cl_text + _easycom_cl_topbar + common_vendor.unref(MsgNotifier) + _easycom_cl_icon + common_vendor.unref(CustomTabbar) + common_vendor.unref(LocaleSet) + _easycom_cl_page)();
}
const LocaleSet = () => "../../components/locale-set.js";
const CustomTabbar = () => "../../components/tabbar.js";
const MsgNotifier = () => "../../components/msg-notifier.js";
const inspectPageSize = 50;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "inspect",
  setup(__props) {
    const refs = uni_modules_coolUnix_cool_hooks_refs.useRefs();
    const user = core_store_index.useStore().user;
    const inspectTasks = common_vendor.ref([]);
    const inspectLoading = common_vendor.ref(false);
    const inspectPage = common_vendor.ref(1);
    const inspectHasMore = common_vendor.ref(true);
    const inspectLoadingMore = common_vendor.ref(false);
    function loadInspectTasks() {
      var _a, _b, _c, _d, _g, _h;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const accountId = (_a = user.info.value) === null || _a === void 0 ? null : _a.id;
        if (!accountId) {
          inspectTasks.value = [];
          return Promise.resolve(null);
        }
        inspectLoading.value = true;
        inspectPage.value = 1;
        inspectHasMore.value = true;
        try {
          const res = yield core_service_index.request({
            url: core_apiRouter_path.apiPath.inspect_task_page,
            method: "POST",
            data: new UTSJSONObject({
              executorId: accountId,
              page: 1,
              pageSize: inspectPageSize
            })
          });
          if (res == null) {
            inspectTasks.value = [];
            return Promise.resolve(null);
          }
          const list = Array.isArray(res) ? res : (_c = (_b = res.list) !== null && _b !== void 0 ? _b : res.data) !== null && _c !== void 0 ? _c : [];
          inspectTasks.value = (_d = core_utils_parse.parseData(list)) !== null && _d !== void 0 ? _d : [];
          if (((_h = (_g = inspectTasks.value) === null || _g === void 0 ? null : _g.length) !== null && _h !== void 0 ? _h : 0) < inspectPageSize)
            inspectHasMore.value = false;
        } catch (_) {
          inspectTasks.value = [];
        } finally {
          inspectLoading.value = false;
        }
      });
    }
    function loadMoreInspectTasks() {
      var _a, _b, _c, _d, _g;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const accountId = (_a = user.info.value) === null || _a === void 0 ? null : _a.id;
        if (!accountId || inspectLoadingMore.value || !inspectHasMore.value || inspectLoading.value)
          return Promise.resolve(null);
        inspectLoadingMore.value = true;
        const nextPage = inspectPage.value + 1;
        try {
          const res = yield core_service_index.request({
            url: core_apiRouter_path.apiPath.inspect_task_page,
            method: "POST",
            data: new UTSJSONObject({
              executorId: accountId,
              page: nextPage,
              pageSize: inspectPageSize
            })
          });
          if (res == null) {
            inspectLoadingMore.value = false;
            return Promise.resolve(null);
          }
          const list = Array.isArray(res) ? res : (_c = (_b = res.list) !== null && _b !== void 0 ? _b : res.data) !== null && _c !== void 0 ? _c : [];
          const nextList = (_d = core_utils_parse.parseData(list)) !== null && _d !== void 0 ? _d : [];
          if (nextList.length > 0) {
            inspectTasks.value = ((_g = inspectTasks.value) !== null && _g !== void 0 ? _g : []).concat(nextList);
            inspectPage.value = nextPage;
          }
          if (nextList.length < inspectPageSize)
            inspectHasMore.value = false;
        } catch (_) {
          inspectHasMore.value = false;
        } finally {
          inspectLoadingMore.value = false;
        }
      });
    }
    function openInspectTask(task) {
      uni_modules_coolUnix_cool_router_index.router.to("/pages/inspect/task_detail?id=" + encodeURIComponent(task.id));
    }
    function inspectStatusClass(status = null) {
      if (status === 0)
        return "status-pending";
      if (status === 1)
        return "status-progress";
      if (status === 2)
        return "status-completed";
      if (status === 3)
        return "status-overdue";
      return "";
    }
    function inspectStatusText(status = null) {
      if (status === 0)
        return locale_index.t("待执行");
      if (status === 1)
        return locale_index.t("执行中");
      if (status === 2)
        return locale_index.t("已完成");
      if (status === 3)
        return locale_index.t("已逾期");
      return "";
    }
    function formatInspectTime(s) {
      if (!s)
        return "";
      try {
        const d = new Date(s.replace(" ", "T"));
        const y = d.getFullYear();
        const m = (d.getMonth() + 1).toString().padStart(2, "0");
        const day = d.getDate().toString().padStart(2, "0");
        const h_1 = d.getHours().toString().padStart(2, "0");
        const min = d.getMinutes().toString().padStart(2, "0");
        return `${y}-${m}-${day} ${h_1}:${min}`;
      } catch (_a) {
        return s;
      }
    }
    common_vendor.onMounted(() => {
      loadInspectTasks();
    });
    common_vendor.onShow(() => {
      var _a;
      if ((_a = user.info.value) === null || _a === void 0 ? null : _a.id)
        loadInspectTasks();
    });
    common_vendor.onPullDownRefresh(() => {
      loadInspectTasks().finally(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      loadMoreInspectTasks();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.p({
          src: "/static/logo.png",
          width: 60,
          height: 60,
          ["show-loading"]: false,
          pt: {
            className: "rounded-sm items-center"
          }
        }),
        b: common_vendor.t(common_vendor.unref(config_index.config).name),
        c: common_vendor.p({
          color: "primary",
          pt: {
            className: "-important-text-2xl mr-auto ml-2 items-end"
          }
        }),
        d: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        e: common_vendor.p({
          fixed: true,
          ["background-color"]: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "black" : "white",
          ["show-back"]: false,
          ["safe-area-top"]: true,
          height: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? null : 100,
          pt: {
            className: "-important-z-50"
          }
        }),
        f: inspectLoading.value
      }, inspectLoading.value ? {
        g: common_vendor.p({
          name: "loader-4-line",
          color: "secondary",
          pt: {
            className: "animate-spin"
          }
        }),
        h: common_vendor.t(common_vendor.unref(locale_index.t)("加载中...")),
        i: common_vendor.p({
          color: "secondary",
          pt: {
            className: "-important-text-sm mt-2"
          }
        })
      } : inspectTasks.value.length === 0 ? {
        k: common_vendor.p({
          name: "clipboard-line",
          color: "secondary"
        }),
        l: common_vendor.t(common_vendor.unref(locale_index.t)("暂无巡检任务")),
        m: common_vendor.p({
          color: "secondary",
          pt: {
            className: "-important-text-sm mt-3"
          }
        })
      } : common_vendor.e({
        n: common_vendor.f(inspectTasks.value, (task, index, i0) => {
          return {
            a: common_vendor.t(task.planName || common_vendor.unref(locale_index.t)("未命名计划")),
            b: common_vendor.t(inspectStatusText(task.status)),
            c: common_vendor.n(inspectStatusClass(task.status)),
            d: "caaf3101-9-" + i0 + ",caaf3101-0",
            e: common_vendor.t(task.workshopName || task.workshopCode || "—"),
            f: "caaf3101-10-" + i0 + ",caaf3101-0",
            g: common_vendor.t(task.scheduledTime ? formatInspectTime(task.scheduledTime) : "—"),
            h: "caaf3101-11-" + i0 + ",caaf3101-0",
            i: task.id,
            j: common_vendor.n(inspectStatusClass(task.status)),
            k: common_vendor.n({
              "inspect-item-overdue": task.status === 3
            }),
            l: common_vendor.o(($event) => {
              return openInspectTask(task);
            }, task.id)
          };
        }),
        o: common_vendor.p({
          name: "jiudian",
          color: "secondary",
          pt: {
            className: "-important-text-sm"
          }
        }),
        p: common_vendor.p({
          name: "time-line",
          color: "secondary",
          pt: {
            className: "-important-text-sm"
          }
        }),
        q: common_vendor.p({
          name: "arrow-right-s-line",
          color: "secondary",
          pt: {
            className: "-important-text-xl flex-shrink-0"
          }
        }),
        r: common_vendor.n({}),
        s: inspectTasks.value.length > 0
      }, inspectTasks.value.length > 0 ? common_vendor.e({
        t: inspectLoadingMore.value
      }, inspectLoadingMore.value ? {
        v: common_vendor.p({
          name: "loader-4-line",
          color: "secondary",
          pt: {
            className: "-important-text-base animate-spin mr-2"
          }
        }),
        w: common_vendor.t(common_vendor.unref(locale_index.t)("加载中..."))
      } : !inspectHasMore.value ? {
        y: common_vendor.t(common_vendor.unref(locale_index.t)("没有更多了"))
      } : {}, {
        x: !inspectHasMore.value
      }) : {}), {
        j: inspectTasks.value.length === 0,
        z: common_vendor.sr(common_vendor.unref(refs).set("localeSet"), "caaf3101-14,caaf3101-0"),
        A: common_vendor.unref(refs).set("localeSet"),
        B: common_vendor.gei(_ctx, ""),
        C: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-caaf3101"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/inspect.js.map
