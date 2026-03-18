"use strict";
const common_vendor = require("../../common/vendor.js");
const locale_index = require("../../locale/index.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
const core_utils_parse = require("../../core/utils/parse.js");
const core_utils_equipParser = require("../../core/utils/equipParser.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../uni_modules/cool-unix/cool/hooks/refs.js");
const uni_modules_coolUnix_cool_utils_device = require("../../uni_modules/cool-unix/cool/utils/device.js");
require("../../uni_modules/cool-unix/config.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_input_1 = common_vendor.resolveComponent("cl-input");
  const _easycom_cl_popup_1 = common_vendor.resolveComponent("cl-popup");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_text_1 + _easycom_cl_topbar_1 + _easycom_cl_icon_1 + _easycom_cl_input_1 + _easycom_cl_popup_1 + _easycom_cl_page_1)();
}
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_icon = () => "../../uni_modules/cool-unix/components/cl-icon/cl-icon.js";
const _easycom_cl_input = () => "../../uni_modules/cool-unix/components/cl-input/cl-input.js";
const _easycom_cl_popup = () => "../../uni_modules/cool-unix/components/cl-popup/cl-popup.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_topbar + common_vendor.unref(EquipBadge) + _easycom_cl_icon + _easycom_cl_input + _easycom_cl_popup + common_vendor.unref(EchartEquipRun) + _easycom_cl_page)();
}
const EquipBadge = () => "../index/components/equip-badge.js";
const EchartEquipRun = () => "./components/echart-equip-run.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "equip_detail",
  setup(__props) {
    uni_modules_coolUnix_cool_hooks_refs.useRefs();
    const controlPopupRef = common_vendor.ref(null);
    const editingControl = common_vendor.ref(null);
    const controlInputValue = common_vendor.ref("");
    const controlSubmitting = common_vendor.ref(false);
    const controlWritingMap = common_vendor.ref(null);
    let equipId = "";
    const equip = common_vendor.ref({
      id: "-1",
      selfCode: "-1",
      name: locale_index.t("无法识别"),
      type: 0,
      runState: 0,
      alarmState: 0,
      onlineState: 0
    });
    function attrValueWithUnit(attr) {
      const val = attr.value == null ? locale_index.t("暂未获取") : attr.value;
      const u = attr.unit;
      if (u != null && u !== "")
        return val + " " + u;
      return val;
    }
    function controlValueWithUnit(ctrl) {
      const val = ctrl.value == null ? locale_index.t("暂未获取") : ctrl.value;
      const u = ctrl.unit;
      if (u != null && u !== "")
        return val + " " + u;
      return val;
    }
    function isControlOn(ctrl) {
      const v = ctrl.value;
      return v === "1" || v === "true";
    }
    function onSwitchChange(ctrl, checked) {
      var _a;
      if (((_a = equip.value) === null || _a === void 0 ? null : _a.id) == null)
        return null;
      controlWritingMap.value = ctrl.map;
      writeControl(ctrl, checked ? 1 : 0).then(() => {
        controlWritingMap.value = null;
      }).catch(() => {
        controlWritingMap.value = null;
      });
    }
    function onSwitchChangeNative(ctrl, ev = null) {
      const checked = ev && ev.detail && ev.detail.value;
      if (checked !== void 0) {
        onSwitchChange(ctrl, !!checked);
      }
    }
    function loadDetail() {
      core_service_index.request({
        url: core_apiRouter_path.apiPath.equip_realtime,
        method: "GET",
        data: new UTSJSONObject({
          id: equipId
        })
      }).then((res = null) => {
        if (res === null) {
          return null;
        }
        let r = core_utils_parse.parseData(res);
        if (r != null) {
          equip.value = r;
        }
      }).catch(() => {
      });
    }
    function copySn() {
      var _a;
      if (((_a = equip.value) === null || _a === void 0 ? null : _a.selfCode) == null) {
        return null;
      }
      common_vendor.index.setClipboardData({
        data: equip.value.selfCode,
        success() {
          common_vendor.index.showToast({
            title: locale_index.t("已复制"),
            icon: "success",
            duration: 1200
          });
        }
      });
    }
    function typeImage(equip2 = null) {
      return core_utils_equipParser.equipImage(equip2);
    }
    common_vendor.onLoad((options) => {
      if (options == null) {
        return null;
      }
      equipId = options.id;
      loadDetail();
    });
    function toEquipHistory() {
      if (equip.value.attrs == null || equip.value.attrs.length <= 0) {
        return null;
      }
      uni_modules_coolUnix_cool_router_index.router.to("/pages/equip/equip_collect?sn=" + equip.value.selfCode);
    }
    function openAttrChart(attr) {
      var _a;
      if (((_a = equip.value) === null || _a === void 0 ? null : _a.selfCode) == null || (attr === null || attr === void 0 ? null : attr.name) == null)
        return null;
      const url = "/pages/equip/equip_collect?sn=" + encodeURIComponent(equip.value.selfCode) + "&attr=" + encodeURIComponent(attr.name);
      uni_modules_coolUnix_cool_router_index.router.to(url);
    }
    function onControlTap(ctrl) {
      var _a, _b, _c, _d;
      if (Number(ctrl.type) === 0)
        return null;
      if (((_a = equip.value) === null || _a === void 0 ? null : _a.id) == null)
        return null;
      if (Number(ctrl.type) === 1) {
        editingControl.value = ctrl;
        controlInputValue.value = (_b = ctrl.value) !== null && _b !== void 0 ? _b : "";
        (_d = (_c = controlPopupRef.value) === null || _c === void 0 ? null : _c.open) === null || _d === void 0 ? null : _d.call(_c);
      }
    }
    function closeControlPopup() {
      var _a, _b;
      (_b = (_a = controlPopupRef.value) === null || _a === void 0 ? null : _a.close) === null || _b === void 0 ? null : _b.call(_a);
      editingControl.value = null;
      controlInputValue.value = "";
    }
    function submitControlValue() {
      var _a;
      const ctrl = editingControl.value;
      if (ctrl == null || ((_a = equip.value) === null || _a === void 0 ? null : _a.id) == null) {
        closeControlPopup();
        return null;
      }
      const val = controlInputValue.value.trim();
      if (val === "") {
        common_vendor.index.showToast({ title: locale_index.t("请输入数值"), icon: "none" });
        return null;
      }
      const num = Number(val);
      if (isNaN(num)) {
        common_vendor.index.showToast({ title: locale_index.t("请输入有效数值"), icon: "none" });
        return null;
      }
      const min = ctrl.min != null && ctrl.min !== "" ? Number(ctrl.min) : null;
      const max = ctrl.max != null && ctrl.max !== "" ? Number(ctrl.max) : null;
      if (min != null && num < min) {
        common_vendor.index.showToast({ title: locale_index.t("不能小于") + " " + min, icon: "none" });
        return null;
      }
      if (max != null && num > max) {
        common_vendor.index.showToast({ title: locale_index.t("不能大于") + " " + max, icon: "none" });
        return null;
      }
      controlSubmitting.value = true;
      writeControl(ctrl, num).then(() => {
        controlSubmitting.value = false;
        closeControlPopup();
      }).catch(() => {
        controlSubmitting.value = false;
      });
    }
    function writeControl(ctrl, value) {
      return core_service_index.request({
        url: core_apiRouter_path.apiPath.equip_write_control,
        method: "POST",
        data: new UTSJSONObject({
          equipId: equip.value.id,
          address: ctrl.map,
          value
        })
      }).then(() => {
        setTimeout(() => {
          loadDetail();
        }, 1e3);
      }).catch((err = null) => {
        common_vendor.index.showToast({ title: (err === null || err === void 0 ? null : err.msg) || locale_index.t("操作失败"), icon: "none" });
      }).then(() => {
        return void 0;
      });
    }
    return (_ctx, _cache) => {
      "raw js";
      var _a, _b;
      const __returned__ = common_vendor.e({
        a: common_vendor.t(equip.value.name),
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
        e: typeImage(equip.value),
        f: common_vendor.p({
          equip: equip.value
        }),
        g: common_vendor.t(equip.value.name),
        h: common_vendor.t(common_vendor.unref(locale_index.t)("编号")),
        i: common_vendor.t(equip.value.selfCode),
        j: common_vendor.t(common_vendor.unref(locale_index.t)("复制")),
        k: common_vendor.o(copySn),
        l: common_vendor.t(common_vendor.unref(locale_index.t)("场景")),
        m: common_vendor.t((_a = equip.value.workshop) == null ? void 0 : _a.name),
        n: common_vendor.t(common_vendor.unref(locale_index.t)("在线状态")),
        o: common_vendor.n(equip.value.onlineState == 1 ? "online" : "offline"),
        p: common_vendor.t(common_vendor.unref(locale_index.t)("运行状态")),
        q: common_vendor.n(equip.value.onlineState == 0 ? "offline" : equip.value.runState == 1 ? "run" : "stopped"),
        r: common_vendor.t(common_vendor.unref(locale_index.t)("报警状态")),
        s: common_vendor.n(equip.value.onlineState == 0 ? "offline" : equip.value.alarmState == 1 ? "alarm" : "offline"),
        t: equip.value.alarmTexts != null && equip.value.alarmTexts.length > 0
      }, equip.value.alarmTexts != null && equip.value.alarmTexts.length > 0 ? {
        v: common_vendor.t(common_vendor.unref(locale_index.t)("实时报警")),
        w: common_vendor.f(equip.value.alarmTexts, (i2, idx2, i0) => {
          return {
            a: common_vendor.t(i2),
            b: idx2
          };
        })
      } : {}, {
        x: common_vendor.p({
          name: "hospital-line"
        }),
        y: common_vendor.t(common_vendor.unref(locale_index.t)("历史")),
        z: equip.value.attrs == null || equip.value.attrs.length <= 0 ? 1 : "",
        A: common_vendor.o(toEquipHistory),
        B: equip.value.attrs != null && equip.value.attrs.length > 0
      }, equip.value.attrs != null && equip.value.attrs.length > 0 ? {
        C: common_vendor.t(common_vendor.unref(locale_index.t)("实时数据")),
        D: common_vendor.f(equip.value.attrs, (i, idx, i0) => {
          return {
            a: "6abea111-5-" + i0 + ",6abea111-0",
            b: common_vendor.t(attrValueWithUnit(i)),
            c: common_vendor.t(i.name),
            d: idx,
            e: common_vendor.o(($event) => {
              return openAttrChart(i);
            }, idx)
          };
        }),
        E: common_vendor.p({
          name: "pushpin-line",
          color: "primary",
          pt: {
            className: "-important-text-base"
          }
        })
      } : {}, {
        F: equip.value.controls != null && equip.value.controls.length > 0
      }, equip.value.controls != null && equip.value.controls.length > 0 ? {
        G: common_vendor.t(common_vendor.unref(locale_index.t)("远程控制")),
        H: common_vendor.f(equip.value.controls, (i, idx, i0) => {
          return common_vendor.e({
            a: common_vendor.t(i.name),
            b: Number(i.type) === 0
          }, Number(i.type) === 0 ? {
            c: isControlOn(i),
            d: controlWritingMap.value === i.map,
            e: common_vendor.o(($event) => {
              return onSwitchChangeNative(i, $event);
            }, "ctrl-" + idx),
            f: common_vendor.o(() => {
            }, "ctrl-" + idx)
          } : {
            g: common_vendor.t(controlValueWithUnit(i))
          }, {
            h: "ctrl-" + idx,
            i: Number(i.type) === 1 ? 1 : "",
            j: common_vendor.o(($event) => {
              return onControlTap(i);
            }, "ctrl-" + idx)
          });
        })
      } : {}, {
        I: common_vendor.t((_b = editingControl.value) == null ? void 0 : _b.name),
        J: editingControl.value
      }, editingControl.value ? {
        K: common_vendor.t(common_vendor.unref(locale_index.t)("请输入数值")),
        L: common_vendor.t(editingControl.value.min != null && editingControl.value.max != null ? ` (${editingControl.value.min} ~ ${editingControl.value.max})` : "")
      } : {}, {
        M: editingControl.value
      }, editingControl.value ? {
        N: common_vendor.o(($event) => {
          return controlInputValue.value = $event;
        }),
        O: common_vendor.p({
          type: "digit",
          placeholder: editingControl.value.value || "",
          pt: {
            className: "control-popup-input"
          },
          modelValue: controlInputValue.value
        })
      } : {}, {
        P: common_vendor.t(common_vendor.unref(locale_index.t)("取消")),
        Q: common_vendor.o(closeControlPopup),
        R: common_vendor.t(common_vendor.unref(locale_index.t)("确定")),
        S: controlSubmitting.value,
        T: common_vendor.o(submitControlValue),
        U: common_vendor.sr(controlPopupRef, "6abea111-6,6abea111-0", {
          "k": "controlPopupRef"
        }),
        V: common_vendor.o(closeControlPopup),
        W: common_vendor.p({
          direction: "center",
          ["show-header"]: true,
          ["show-close"]: true,
          ["show-mask"]: true,
          pt: {
            className: "control-popup-wrap"
          }
        }),
        X: common_vendor.p({
          equip: equip.value
        }),
        Y: common_vendor.sei(common_vendor.gei(_ctx, ""), "scroll-view")
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6abea111"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/equip/equip_detail.js.map
