"use strict";
const common_vendor = require("../../common/vendor.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../uni_modules/cool-unix/theme/index.js");
require("../../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_hooks_ui = require("../../uni_modules/cool-unix/hooks/ui.js");
const core_utils_parse = require("../../core/utils/parse.js");
const locale_index = require("../../locale/index.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_text_1 + _easycom_cl_topbar_1 + _easycom_cl_icon_1 + _easycom_cl_page_1)();
}
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_icon = () => "../../uni_modules/cool-unix/components/cl-icon/cl-icon.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_topbar + _easycom_cl_icon + _easycom_cl_page)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "task_detail",
  setup(__props) {
    const ui = uni_modules_coolUnix_hooks_ui.useUi();
    const taskId = common_vendor.ref("");
    const task = common_vendor.ref(null);
    const template = common_vendor.ref(null);
    const templateLoading = common_vendor.ref(false);
    const deviceList = common_vendor.ref([]);
    const devicesLoading = common_vendor.ref(false);
    const taskRecords = common_vendor.ref([]);
    const confirmExecuting = common_vendor.ref(false);
    const completeExecuting = common_vendor.ref(false);
    const inspectedEquipIds = common_vendor.computed(() => {
      var e_1, _a;
      const set = /* @__PURE__ */ new Set();
      try {
        for (var _b = common_vendor.__values(taskRecords.value), _c = _b.next(); !_c.done; _c = _b.next()) {
          var r = _c.value;
          if (r.equipId)
            set.add(r.equipId);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      return set;
    });
    const allInspected = common_vendor.computed(() => {
      const list = deviceList.value;
      const ids = inspectedEquipIds.value;
      return list.length > 0 && list.every((d) => {
        return ids.has(d.id);
      });
    });
    common_vendor.onLoad((opts = null) => {
      var _a;
      taskId.value = (_a = opts === null || opts === void 0 ? null : opts.id) !== null && _a !== void 0 ? _a : "";
    });
    common_vendor.onShow(() => {
      if (taskId.value) {
        loadTask();
        loadTaskRecords();
      }
    });
    function loadTask() {
      var _a;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!taskId.value)
          return Promise.resolve(null);
        try {
          const res = yield core_service_index.request({
            url: core_apiRouter_path.apiPath.inspect_task_by_id + "?id=" + encodeURIComponent(taskId.value),
            method: "GET"
          });
          task.value = res ? (_a = core_utils_parse.parseData(res)) !== null && _a !== void 0 ? _a : null : null;
        } catch (_b) {
          task.value = null;
        }
      });
    }
    function loadTemplate() {
      var _a, _b;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const tid = (_a = task.value) === null || _a === void 0 ? null : _a.templateId;
        if (!tid) {
          template.value = null;
          return Promise.resolve(null);
        }
        templateLoading.value = true;
        try {
          const res = yield core_service_index.request({
            url: core_apiRouter_path.apiPath.inspect_template_with_items + "?templateId=" + encodeURIComponent(tid),
            method: "GET"
          });
          template.value = res ? (_b = core_utils_parse.parseData(res)) !== null && _b !== void 0 ? _b : null : null;
        } catch (_c) {
          template.value = null;
        } finally {
          templateLoading.value = false;
        }
      });
    }
    function loadTaskRecords() {
      var _a;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!taskId.value)
          return Promise.resolve(null);
        try {
          const res = yield core_service_index.request({
            url: core_apiRouter_path.apiPath.inspect_record_listByTaskId + "?taskId=" + encodeURIComponent(taskId.value),
            method: "GET"
          });
          taskRecords.value = res ? (_a = core_utils_parse.parseData(res)) !== null && _a !== void 0 ? _a : [] : [];
        } catch (_b) {
          taskRecords.value = [];
        }
      });
    }
    function loadDevices() {
      var _a, _b, _c;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const taskData = task.value;
        if (!(taskData === null || taskData === void 0 ? null : taskData.workshopCode)) {
          deviceList.value = [];
          return Promise.resolve(null);
        }
        devicesLoading.value = true;
        try {
          const res = yield core_service_index.request({
            url: core_apiRouter_path.apiPath.equip_page,
            method: "POST",
            data: new UTSJSONObject({
              workshopCode: taskData.workshopCode,
              needRealtime: true,
              needWorkshopCascade: true,
              queryWorkshop: false,
              queryAttrs: false,
              limitUserWorkshop: true,
              requirePage: false
            })
          });
          if (res == null) {
            deviceList.value = [];
            return Promise.resolve(null);
          }
          const list = Array.isArray(res) ? res : (_b = (_a = res.list) !== null && _a !== void 0 ? _a : res.data) !== null && _b !== void 0 ? _b : [];
          deviceList.value = (_c = core_utils_parse.parseData(list)) !== null && _c !== void 0 ? _c : [];
        } catch (_d) {
          deviceList.value = [];
        } finally {
          devicesLoading.value = false;
        }
      });
    }
    function formatTime(s) {
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
    function statusClass(status = null) {
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
    function statusText(status = null) {
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
    function onDeviceTap(equip) {
      var _a;
      const st = (_a = task.value) === null || _a === void 0 ? null : _a.status;
      if (st !== 1 && st !== 2) {
        ui.showToast({ message: locale_index.t("请先确认执行任务后再进行设备巡检"), msgNotifier: locale_index.t("请先确认执行任务后再进行设备巡检") });
        return null;
      }
      uni_modules_coolUnix_cool_router_index.router.to("/pages/inspect/device_inspect?taskId=" + encodeURIComponent(taskId.value) + "&deviceId=" + encodeURIComponent(equip.id));
    }
    function confirmExecute() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const tsk = task.value;
        if (!(tsk === null || tsk === void 0 ? null : tsk.id) || tsk.status !== 0 || confirmExecuting.value)
          return Promise.resolve(null);
        confirmExecuting.value = true;
        try {
          yield core_service_index.request({
            url: core_apiRouter_path.apiPath.inspect_task_addOrUpdate,
            method: "POST",
            data: new UTSJSONObject(Object.assign(Object.assign({}, tsk), { status: 1 }))
          });
          ui.showToast({ message: locale_index.t("已开始执行"), msgNotifier: locale_index.t("已开始执行") });
          yield loadTask();
        } catch (_a) {
          ui.showToast({ message: locale_index.t("操作失败，请重试"), msgNotifier: locale_index.t("操作失败，请重试") });
        } finally {
          confirmExecuting.value = false;
        }
      });
    }
    function completeInspect() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const tsk = task.value;
        if (!(tsk === null || tsk === void 0 ? null : tsk.id) || tsk.status !== 1 || completeExecuting.value || !allInspected.value)
          return Promise.resolve(null);
        completeExecuting.value = true;
        try {
          yield core_service_index.request({
            url: core_apiRouter_path.apiPath.inspect_task_addOrUpdate,
            method: "POST",
            data: new UTSJSONObject(Object.assign(Object.assign({}, tsk), { status: 2 }))
          });
          ui.showToast({ message: locale_index.t("巡检任务已完成"), msgNotifier: locale_index.t("巡检任务已完成") });
          yield loadTask();
        } catch (_a) {
          ui.showToast({ message: locale_index.t("操作失败，请重试"), msgNotifier: locale_index.t("操作失败，请重试") });
        } finally {
          completeExecuting.value = false;
        }
      });
    }
    common_vendor.onMounted(() => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        yield loadTask();
        yield loadTemplate();
        yield loadDevices();
        yield loadTaskRecords();
      });
    });
    return (_ctx, _cache) => {
      "raw js";
      var _a, _b, _c, _d;
      const __returned__ = common_vendor.e({
        a: common_vendor.t(common_vendor.unref(locale_index.t)("巡检任务详情")),
        b: common_vendor.p({
          pt: {
            className: "-important-text-xl font-bold"
          }
        }),
        c: common_vendor.p({
          fixed: true,
          ["show-back"]: true,
          ["safe-area-top"]: true,
          ["background-color"]: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "black" : "white",
          pt: {
            className: "detail-topbar"
          }
        }),
        d: task.value
      }, task.value ? common_vendor.e({
        e: common_vendor.p({
          name: "clipboard-line",
          pt: {
            className: "-important-text-lg"
          }
        }),
        f: common_vendor.t(common_vendor.unref(locale_index.t)("任务信息")),
        g: common_vendor.t(task.value.planName || common_vendor.unref(locale_index.t)("未命名计划")),
        h: common_vendor.t(statusText(task.value.status)),
        i: common_vendor.n(statusClass(task.value.status)),
        j: common_vendor.n(statusClass(task.value.status)),
        k: common_vendor.p({
          name: "jiudian",
          color: "secondary",
          pt: {
            className: "-important-text-base"
          }
        }),
        l: common_vendor.t(common_vendor.unref(locale_index.t)("场景")),
        m: common_vendor.t(task.value.workshopName || task.value.workshopCode || "—"),
        n: common_vendor.p({
          name: "time-line",
          color: "secondary",
          pt: {
            className: "-important-text-base"
          }
        }),
        o: common_vendor.t(common_vendor.unref(locale_index.t)("计划执行时间")),
        p: common_vendor.t(task.value.scheduledTime ? formatTime(task.value.scheduledTime) : "—"),
        q: task.value.executorName
      }, task.value.executorName ? {
        r: common_vendor.p({
          name: "user-line",
          color: "secondary",
          pt: {
            className: "-important-text-base"
          }
        }),
        s: common_vendor.t(common_vendor.unref(locale_index.t)("执行人")),
        t: common_vendor.t(task.value.executorName)
      } : {}, {
        v: task.value.status === 0
      }, task.value.status === 0 ? {
        w: common_vendor.t(confirmExecuting.value ? common_vendor.unref(locale_index.t)("处理中...") : common_vendor.unref(locale_index.t)("确认执行")),
        x: confirmExecuting.value,
        y: common_vendor.o(confirmExecute)
      } : {}) : {}, {
        z: common_vendor.p({
          name: "qiche",
          pt: {
            className: "-important-text-lg"
          }
        }),
        A: common_vendor.t(common_vendor.unref(locale_index.t)("场景设备")),
        B: common_vendor.t(common_vendor.unref(locale_index.t)("当前场景下所有设备，可在此进行巡检并生成设备巡检记录。")),
        C: common_vendor.p({
          color: "secondary",
          pt: {
            className: "-important-text-sm"
          }
        }),
        D: devicesLoading.value
      }, devicesLoading.value ? {
        E: common_vendor.p({
          name: "loader-4-line",
          color: "secondary",
          pt: {
            className: "-important-text-2xl animate-spin mb-2"
          }
        }),
        F: common_vendor.t(common_vendor.unref(locale_index.t)("加载中...")),
        G: common_vendor.p({
          color: "secondary"
        })
      } : deviceList.value.length === 0 ? {
        I: common_vendor.p({
          name: "dingwei",
          color: "secondary",
          pt: {
            className: "-important-text-4xl mb-2 opacity-60"
          }
        }),
        J: common_vendor.t(common_vendor.unref(locale_index.t)("该场景下暂无设备")),
        K: common_vendor.p({
          color: "secondary"
        })
      } : {
        L: common_vendor.f(deviceList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: "b0fd5180-13-" + i0 + ",b0fd5180-0",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.selfCode),
            d: common_vendor.t(item.onlineState === 1 ? item.runState === 1 ? common_vendor.unref(locale_index.t)("运行") : common_vendor.unref(locale_index.t)("停止") : common_vendor.unref(locale_index.t)("离线")),
            e: inspectedEquipIds.value.has(item.id)
          }, inspectedEquipIds.value.has(item.id) ? {
            f: common_vendor.t(common_vendor.unref(locale_index.t)("已检"))
          } : {
            g: common_vendor.t(common_vendor.unref(locale_index.t)("未检"))
          }, {
            h: "b0fd5180-14-" + i0 + ",b0fd5180-0",
            i: item.id,
            j: item.runState == 1 && item.alarmState == 0 ? 1 : "",
            k: item.alarmState == 1 ? 1 : "",
            l: item.onlineState == 0 ? 1 : "",
            m: common_vendor.o(($event) => {
              return onDeviceTap(item);
            }, item.id)
          });
        }),
        M: common_vendor.p({
          name: "qiche",
          color: "secondary",
          pt: {
            className: "-important-text-xl"
          }
        }),
        N: common_vendor.p({
          name: "arrow-right-s-line",
          color: "secondary",
          pt: {
            className: "-important-text-base"
          }
        }),
        O: task.value != null && task.value.status !== 1 && task.value.status !== 2 ? 1 : ""
      }, {
        H: deviceList.value.length === 0,
        P: common_vendor.p({
          name: "edit-line",
          color: "secondary",
          pt: {
            className: "-important-text-sm mr-1"
          }
        }),
        Q: common_vendor.t(((_a = task.value) == null ? void 0 : _a.status) === 1 ? common_vendor.unref(locale_index.t)("点击上方设备进入巡检页，填写检测项后可生成并提交巡检记录") : ((_b = task.value) == null ? void 0 : _b.status) === 2 ? common_vendor.unref(locale_index.t)("任务已完成，可点击设备查看巡检记录（只读）") : common_vendor.unref(locale_index.t)("请先确认执行任务后再进行设备巡检")),
        R: common_vendor.p({
          color: "secondary",
          pt: {
            className: "-important-text-sm"
          }
        }),
        S: ((_c = task.value) == null ? void 0 : _c.status) === 1 && allInspected.value && deviceList.value.length > 0
      }, ((_d = task.value) == null ? void 0 : _d.status) === 1 && allInspected.value && deviceList.value.length > 0 ? {
        T: common_vendor.t(completeExecuting.value ? common_vendor.unref(locale_index.t)("处理中...") : common_vendor.unref(locale_index.t)("完成巡检")),
        U: completeExecuting.value,
        V: common_vendor.o(completeInspect)
      } : {}, {
        W: common_vendor.gei(_ctx, ""),
        X: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b0fd5180"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/inspect/task_detail.js.map
