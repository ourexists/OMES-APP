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
  __name: "device_inspect",
  setup(__props) {
    const ui = uni_modules_coolUnix_hooks_ui.useUi();
    const taskId = common_vendor.ref("");
    const deviceId = common_vendor.ref("");
    const task = common_vendor.ref(null);
    const device = common_vendor.ref(null);
    const deviceLoading = common_vendor.ref(false);
    const template = common_vendor.ref(null);
    const templateLoading = common_vendor.ref(false);
    const recordResults = common_vendor.reactive({});
    const existingRecordId = common_vendor.ref(null);
    const submitting = common_vendor.ref(false);
    const isReadonly = common_vendor.computed(() => {
      var _a;
      return ((_a = task.value) === null || _a === void 0 ? null : _a.status) === 2;
    });
    const displayItems = common_vendor.computed(() => {
      var _a, _b;
      const items = (_a = template.value) === null || _a === void 0 ? null : _a.items;
      const deviceType = (_b = device.value) === null || _b === void 0 ? null : _b.type;
      if (!(items === null || items === void 0 ? null : items.length))
        return [];
      if (deviceType == null)
        return items;
      const typeStr = String(deviceType);
      return items.filter((item) => {
        return !item.productCode || String(item.productCode) === typeStr;
      });
    });
    common_vendor.onLoad((opts = null) => {
      var _a, _b, _c;
      taskId.value = (_a = opts === null || opts === void 0 ? null : opts.taskId) !== null && _a !== void 0 ? _a : "";
      deviceId.value = (_c = (_b = opts === null || opts === void 0 ? null : opts.deviceId) !== null && _b !== void 0 ? _b : opts === null || opts === void 0 ? null : opts.id) !== null && _c !== void 0 ? _c : "";
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
    function loadDevice() {
      var _a;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!deviceId.value)
          return Promise.resolve(null);
        deviceLoading.value = true;
        try {
          const res = yield core_service_index.request({
            url: core_apiRouter_path.apiPath.equip_realtime,
            method: "GET",
            data: new UTSJSONObject({ id: deviceId.value })
          });
          device.value = res ? (_a = core_utils_parse.parseData(res)) !== null && _a !== void 0 ? _a : null : null;
        } catch (_b) {
          device.value = null;
        } finally {
          deviceLoading.value = false;
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
    function loadExistingRecord() {
      var _a, _b, _c;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var e_1, _d;
        if (!taskId.value || !deviceId.value)
          return Promise.resolve(null);
        existingRecordId.value = null;
        try {
          const res = yield core_service_index.request({
            url: core_apiRouter_path.apiPath.inspect_record_listByTaskId + "?taskId=" + encodeURIComponent(taskId.value),
            method: "GET"
          });
          const list = res ? (_a = core_utils_parse.parseData(res)) !== null && _a !== void 0 ? _a : [] : [];
          const record = UTS.arrayFind(list, (r) => {
            return r.equipId === deviceId.value;
          });
          if (record === null || record === void 0 ? null : record.id) {
            existingRecordId.value = record.id;
          }
          if ((_b = record === null || record === void 0 ? null : record.items) === null || _b === void 0 ? null : _b.length) {
            try {
              for (var _g = common_vendor.__values(record.items), _h = _g.next(); !_h.done; _h = _g.next()) {
                var it = _h.value;
                if (it.itemId != null) {
                  recordResults[it.itemId] = (_c = it.content) !== null && _c !== void 0 ? _c : "";
                }
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_h && !_h.done && (_d = _g.return))
                  _d.call(_g);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          }
        } catch (_j) {
        }
      });
    }
    function attrValue(attr) {
      var _a;
      const v = (_a = attr.value) !== null && _a !== void 0 ? _a : locale_index.t("暂未获取");
      const u = attr.unit;
      if (u != null && u !== "")
        return v + " " + u;
      return v;
    }
    function controlValue(ctrl) {
      var _a;
      const v = (_a = ctrl.value) !== null && _a !== void 0 ? _a : locale_index.t("暂未获取");
      const u = ctrl.unit;
      if (u != null && u !== "")
        return v + " " + u;
      return v;
    }
    function itemOptions(item) {
      const u = item.unit;
      if (!u || !u.trim())
        return [locale_index.t("正常"), locale_index.t("异常")];
      return u.split(/[,，、\/／|｜]/).map((s) => {
        return s.trim();
      }).filter(Boolean);
    }
    function setResult(itemId, value) {
      if (isReadonly.value)
        return null;
      recordResults[itemId] = value;
    }
    function onInputResult(itemId, ev = null) {
      var _a, _b;
      if (isReadonly.value)
        return null;
      const v = (_b = (_a = ev === null || ev === void 0 ? null : ev.detail) === null || _a === void 0 ? null : _a.value) !== null && _b !== void 0 ? _b : "";
      recordResults[itemId] = v;
    }
    const submitDisabled = common_vendor.computed(() => {
      var e_2, _a;
      if (submitting.value || !taskId.value || !deviceId.value)
        return true;
      const items = displayItems.value;
      if (!items.length)
        return true;
      try {
        for (var items_1 = common_vendor.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
          var item = items_1_1.value;
          const val = recordResults[item.id];
          if (val === void 0 || typeof val === "string" && val.trim() === "")
            return true;
        }
      } catch (e_2_1) {
        e_2 = { error: e_2_1 };
      } finally {
        try {
          if (items_1_1 && !items_1_1.done && (_a = items_1.return))
            _a.call(items_1);
        } finally {
          if (e_2)
            throw e_2.error;
        }
      }
      return false;
    });
    function saveInspectRecord() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const items = displayItems.value;
        if (!items.length) {
          ui.showToast({ message: locale_index.t("暂无检测项"), msgNotifier: locale_index.t("暂无检测项") });
          return false;
        }
        const id = existingRecordId.value;
        try {
          if (id) {
            const dto = {
              id,
              taskId: taskId.value,
              equipId: deviceId.value,
              items: items.map((item) => {
                var _a;
                return new UTSJSONObject({
                  itemId: item.id,
                  content: ((_a = recordResults[item.id]) !== null && _a !== void 0 ? _a : "").trim()
                });
              })
            };
            yield core_service_index.request({
              url: core_apiRouter_path.apiPath.inspect_record_addOrUpdate,
              method: "POST",
              data: dto
            });
          } else {
            const body = {
              taskId: taskId.value,
              equipId: deviceId.value,
              results: items.map((item) => {
                var _a;
                return new UTSJSONObject({
                  itemId: item.id,
                  value: ((_a = recordResults[item.id]) !== null && _a !== void 0 ? _a : "").trim()
                });
              })
            };
            yield core_service_index.request({
              url: core_apiRouter_path.apiPath.inspect_record_save,
              method: "POST",
              data: body
            });
          }
          return true;
        } catch (_a) {
          return false;
        }
      });
    }
    function submitRecord() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (isReadonly.value || submitDisabled.value)
          return Promise.resolve(null);
        submitting.value = true;
        try {
          const ok = yield saveInspectRecord();
          if (ok) {
            ui.showToast({ message: existingRecordId.value ? locale_index.t("巡检记录已更新") : locale_index.t("巡检记录已提交"), msgNotifier: existingRecordId.value ? locale_index.t("巡检记录已更新") : locale_index.t("巡检记录已提交") });
            setTimeout(() => {
              return uni_modules_coolUnix_cool_router_index.router.back();
            }, 800);
          } else {
            ui.showToast({ message: locale_index.t("提交失败，请重试"), msgNotifier: locale_index.t("提交失败，请重试") });
          }
        } finally {
          submitting.value = false;
        }
      });
    }
    common_vendor.onMounted(() => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        yield loadTask();
        yield loadDevice();
        yield loadTemplate();
        yield loadExistingRecord();
      });
    });
    return (_ctx, _cache) => {
      "raw js";
      var _a, _b, _c, _d;
      const __returned__ = common_vendor.e({
        a: common_vendor.t(common_vendor.unref(locale_index.t)("设备巡检")),
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
        d: isReadonly.value
      }, isReadonly.value ? {
        e: common_vendor.p({
          name: "eye-line",
          pt: {
            className: "-important-text-sm mr-1"
          }
        }),
        f: common_vendor.t(common_vendor.unref(locale_index.t)("当前为查看模式，不可编辑"))
      } : {}, {
        g: common_vendor.p({
          name: "qiche",
          pt: {
            className: "-important-text-lg"
          }
        }),
        h: common_vendor.t(common_vendor.unref(locale_index.t)("设备信息")),
        i: deviceLoading.value
      }, deviceLoading.value ? {
        j: common_vendor.p({
          name: "qiche",
          color: "secondary",
          pt: {
            className: "-important-text-2xl animate-spin mb-2"
          }
        }),
        k: common_vendor.t(common_vendor.unref(locale_index.t)("加载中...")),
        l: common_vendor.p({
          color: "secondary"
        })
      } : device.value ? common_vendor.e({
        n: common_vendor.t(device.value.name),
        o: common_vendor.t(device.value.selfCode),
        p: (_a = device.value.workshop) == null ? void 0 : _a.name
      }, ((_b = device.value.workshop) == null ? void 0 : _b.name) ? {
        q: common_vendor.p({
          name: "jiudian",
          color: "secondary",
          pt: {
            className: "-important-text-base"
          }
        }),
        r: common_vendor.t(common_vendor.unref(locale_index.t)("场景")),
        s: common_vendor.t(device.value.workshop.name)
      } : {}, {
        t: common_vendor.p({
          name: "bubble-chart-line",
          color: "secondary",
          pt: {
            className: "-important-text-base"
          }
        }),
        v: common_vendor.t(common_vendor.unref(locale_index.t)("在线状态")),
        w: common_vendor.n(device.value.onlineState === 1 ? "online" : "offline"),
        x: common_vendor.t(device.value.onlineState === 1 ? common_vendor.unref(locale_index.t)("在线") : common_vendor.unref(locale_index.t)("离线")),
        y: common_vendor.p({
          name: "play-circle-line",
          color: "secondary",
          pt: {
            className: "-important-text-base"
          }
        }),
        z: common_vendor.t(common_vendor.unref(locale_index.t)("运行状态")),
        A: common_vendor.t(device.value.onlineState === 1 ? device.value.runState === 1 ? common_vendor.unref(locale_index.t)("运行") : common_vendor.unref(locale_index.t)("停止") : "—"),
        B: common_vendor.p({
          name: "naozhong",
          color: "secondary",
          pt: {
            className: "-important-text-base"
          }
        }),
        C: common_vendor.t(common_vendor.unref(locale_index.t)("报警状态")),
        D: common_vendor.t(device.value.onlineState === 1 ? device.value.alarmState === 1 ? common_vendor.unref(locale_index.t)("报警") : common_vendor.unref(locale_index.t)("正常") : "—"),
        E: device.value.alarmState === 1 ? 1 : "",
        F: device.value.alarmTexts && device.value.alarmTexts.length > 0
      }, device.value.alarmTexts && device.value.alarmTexts.length > 0 ? {
        G: common_vendor.p({
          name: "alarm-warning-fill",
          pt: {
            className: "-important-text-sm mr-1"
          }
        }),
        H: common_vendor.t(common_vendor.unref(locale_index.t)("实时报警")),
        I: common_vendor.f(device.value.alarmTexts, (txt, idx, i0) => {
          return {
            a: common_vendor.t(txt),
            b: idx
          };
        })
      } : {}, {
        J: device.value.attrs && device.value.attrs.length > 0
      }, device.value.attrs && device.value.attrs.length > 0 ? {
        K: common_vendor.p({
          name: "bar-chart-line",
          pt: {
            className: "-important-text-sm mr-1"
          }
        }),
        L: common_vendor.t(common_vendor.unref(locale_index.t)("设备属性")),
        M: common_vendor.t(common_vendor.unref(locale_index.t)("实时数据")),
        N: common_vendor.f(device.value.attrs, (attr, idx, i0) => {
          return {
            a: common_vendor.t(attr.name),
            b: common_vendor.t(attrValue(attr)),
            c: idx
          };
        })
      } : {}, {
        O: device.value.controls && device.value.controls.length > 0
      }, device.value.controls && device.value.controls.length > 0 ? {
        P: common_vendor.p({
          name: "sliders-line",
          pt: {
            className: "-important-text-sm mr-1"
          }
        }),
        Q: common_vendor.t(common_vendor.unref(locale_index.t)("控制点当前值")),
        R: common_vendor.f(device.value.controls, (ctrl, idx, i0) => {
          return {
            a: common_vendor.t(ctrl.name),
            b: common_vendor.t(controlValue(ctrl)),
            c: idx
          };
        })
      } : {}) : {
        S: common_vendor.t(common_vendor.unref(locale_index.t)("未获取到设备信息")),
        T: common_vendor.p({
          color: "secondary"
        })
      }, {
        m: device.value,
        U: common_vendor.p({
          name: "qianbao",
          pt: {
            className: "-important-text-lg"
          }
        }),
        V: common_vendor.t(common_vendor.unref(locale_index.t)("检测项")),
        W: common_vendor.t(common_vendor.unref(locale_index.t)("请逐项填写或选择，完成后可生成并提交巡检记录。")),
        X: common_vendor.p({
          color: "secondary",
          pt: {
            className: "-important-text-sm"
          }
        }),
        Y: templateLoading.value
      }, templateLoading.value ? {
        Z: common_vendor.p({
          name: "loader-4-line",
          color: "secondary",
          pt: {
            className: "-important-text-2xl animate-spin mb-2"
          }
        }),
        aa: common_vendor.t(common_vendor.unref(locale_index.t)("加载中...")),
        ab: common_vendor.p({
          color: "secondary"
        })
      } : !displayItems.value.length ? {
        ad: common_vendor.p({
          name: "file-list-2-line",
          color: "secondary",
          pt: {
            className: "-important-text-4xl mb-2 opacity-60"
          }
        }),
        ae: common_vendor.t(isReadonly.value ? common_vendor.unref(locale_index.t)("以下为已保存的巡检记录，仅可查看。") : ((_d = (_c = template.value) == null ? void 0 : _c.items) == null ? void 0 : _d.length) ? common_vendor.unref(locale_index.t)("当前设备产品类型暂无对应检测项。") : common_vendor.unref(locale_index.t)("该任务暂无检测项，请先在巡检模板中配置。")),
        af: common_vendor.p({
          color: "secondary"
        })
      } : {
        ag: common_vendor.f(displayItems.value, (item, idx, i0) => {
          return common_vendor.e({
            a: common_vendor.t(idx + 1),
            b: common_vendor.t(item.itemName || "—"),
            c: item.itemType === 1
          }, item.itemType === 1 ? {
            d: common_vendor.f(itemOptions(item), (opt, k1, i1) => {
              return {
                a: common_vendor.t(opt),
                b: opt,
                c: recordResults[item.id] === opt ? 1 : "",
                d: common_vendor.o(($event) => {
                  return setResult(item.id, opt);
                }, opt)
              };
            }),
            e: isReadonly.value ? 1 : ""
          } : item.itemType === 2 ? common_vendor.e({
            g: common_vendor.unref(locale_index.t)("请输入数值") + (item.unit ? " (" + item.unit + ")" : ""),
            h: recordResults[item.id],
            i: isReadonly.value,
            j: common_vendor.o(($event) => {
              return onInputResult(item.id, $event);
            }, item.id),
            k: item.unit
          }, item.unit ? {
            l: common_vendor.t(item.unit)
          } : {}) : item.itemType === 3 ? {
            n: common_vendor.t(common_vendor.unref(locale_index.t)("是")),
            o: recordResults[item.id] === "是" ? 1 : "",
            p: common_vendor.o(($event) => {
              return setResult(item.id, "是");
            }, item.id),
            q: common_vendor.t(common_vendor.unref(locale_index.t)("否")),
            r: recordResults[item.id] === "否" ? 1 : "",
            s: common_vendor.o(($event) => {
              return setResult(item.id, "否");
            }, item.id),
            t: isReadonly.value ? 1 : ""
          } : {
            v: common_vendor.t(common_vendor.unref(locale_index.t)("未知类型")),
            w: "242971a9-21-" + i0 + ",242971a9-0",
            x: common_vendor.p({
              color: "secondary",
              pt: {
                className: "-important-text-sm"
              }
            })
          }, {
            f: item.itemType === 2,
            m: item.itemType === 3,
            y: item.id,
            z: idx % 2 === 1 ? 1 : ""
          });
        })
      }, {
        ac: !displayItems.value.length,
        ah: !isReadonly.value
      }, !isReadonly.value ? common_vendor.e({
        ai: submitting.value
      }, submitting.value ? {
        aj: common_vendor.p({
          name: "loader-4-line",
          pt: {
            className: "-important-text-lg animate-spin mr-2"
          }
        })
      } : {}, {
        ak: common_vendor.t(submitting.value ? common_vendor.unref(locale_index.t)("提交中...") : common_vendor.unref(locale_index.t)("生成巡检记录")),
        al: submitDisabled.value,
        am: submitDisabled.value ? 1 : "",
        an: common_vendor.o(submitRecord)
      }) : {}, {
        ao: common_vendor.gei(_ctx, ""),
        ap: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-242971a9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/inspect/device_inspect.js.map
