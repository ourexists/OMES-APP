"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../uni_modules/cool-unix/cool/hooks/refs.js");
const uni_modules_coolUnix_cool_utils_device = require("../../uni_modules/cool-unix/cool/utils/device.js");
require("../../uni_modules/cool-unix/config.js");
const locale_index = require("../../locale/index.js");
const components_workshop_workshopTree = require("../../components/workshop/workshopTree.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
const core_utils_parse = require("../../core/utils/parse.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_button_1 = common_vendor.resolveComponent("cl-button");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_text_1 + _easycom_cl_icon_1 + _easycom_cl_topbar_1 + _easycom_cl_image_1 + _easycom_cl_button_1 + _easycom_cl_page_1)();
}
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_icon = () => "../../uni_modules/cool-unix/components/cl-icon/cl-icon.js";
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_image = () => "../../uni_modules/cool-unix/components/cl-image/cl-image.js";
const _easycom_cl_button = () => "../../uni_modules/cool-unix/components/cl-button/cl-button.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_icon + _easycom_cl_topbar + _easycom_cl_image + _easycom_cl_button + common_vendor.unref(EchartEquipCard) + common_vendor.unref(CustomTabbar) + _easycom_cl_page)();
}
const CustomTabbar = () => "../../components/tabbar.js";
const EchartEquipCard = () => "./components/echart-equip-card.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "work",
  setup(__props) {
    uni_modules_coolUnix_cool_hooks_refs.useRefs();
    const workshopScada = common_vendor.ref(null);
    const realtimes = common_vendor.ref([]);
    function setWorkshop() {
      uni_modules_coolUnix_cool_router_index.router.to("/pages/equip/workshop_tree");
    }
    function toScada() {
      if (workshopScada.value == null) {
        return null;
      }
      uni_modules_coolUnix_cool_router_index.router.to(`/pages/equip/workshop_scada?workshopCode=${components_workshop_workshopTree.workshopTree.selectNode.value.id}`);
    }
    function loadIframeUrl(workshopCode = null) {
      if (workshopCode == null || workshopCode == "-1" || workshopCode == -1) {
        workshopScada.value = null;
        return null;
      }
      core_service_index.request({
        url: core_apiRouter_path.apiPath.workshop_scada,
        method: "GET",
        data: new UTSJSONObject({
          workshopCode,
          platform: 2
        })
      }).then((res = null) => {
        if (res === null) {
          workshopScada.value = null;
          return null;
        }
        const r = core_utils_parse.parseData(res);
        if (r == null || r.url == null || r.url == "") {
          workshopScada.value = null;
          return null;
        }
        workshopScada.value = r;
      });
    }
    function loadRealtime(workshopCode = null) {
      if (workshopCode == null || workshopCode == "-1" || workshopCode == -1) {
        realtimes.value = [];
        return null;
      }
      core_service_index.request({
        url: core_apiRouter_path.apiPath.workshop_realtime,
        method: "GET",
        data: new UTSJSONObject({
          workshopCode
        })
      }).then((res = null) => {
        if (res === null) {
          realtimes.value = [];
          return null;
        }
        let r = core_utils_parse.parseData(res);
        if (r == null) {
          realtimes.value = [];
          return null;
        }
        realtimes.value = r;
      });
    }
    common_vendor.watch(components_workshop_workshopTree.workshopTree.selectNode, (val = null) => {
      if (val != null) {
        loadIframeUrl(val.id);
        loadRealtime(val.id);
      } else {
        loadIframeUrl(null);
        loadRealtime(null);
      }
    });
    common_vendor.onLoad(() => {
      loadIframeUrl(components_workshop_workshopTree.workshopTree.selectNode.value.id);
      loadRealtime(components_workshop_workshopTree.workshopTree.selectNode.value.id);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.t(common_vendor.unref(locale_index.t)("场景")),
        b: common_vendor.p({
          color: "primary",
          pt: {
            className: "-important-text-2xl"
          }
        }),
        c: common_vendor.t(common_vendor.unref(components_workshop_workshopTree.workshopTree).selectNode.value.label),
        d: common_vendor.p({
          color: "primary",
          pt: {
            className: "-important-text-base ml-2"
          }
        }),
        e: common_vendor.p({
          name: "arrow-right-s-line",
          color: "primary",
          pt: {
            className: "-important-text-base mb-1"
          }
        }),
        f: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        g: !common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        h: common_vendor.o(setWorkshop),
        i: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        j: common_vendor.p({
          fixed: true,
          ["background-color"]: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "black" : "white",
          ["show-back"]: false,
          ["safe-area-top"]: true,
          height: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? null : 100,
          pt: {
            className: "-important-z-50"
          }
        }),
        k: common_vendor.p({
          src: `/static/icon/workshop.svg`
        }),
        l: common_vendor.t(common_vendor.unref(components_workshop_workshopTree.workshopTree).selectNode.value.label),
        m: common_vendor.o(setWorkshop),
        n: common_vendor.p({
          icon: "arrow-left-right-line"
        }),
        o: common_vendor.t(common_vendor.unref(locale_index.t)("编号")),
        p: common_vendor.t(common_vendor.unref(components_workshop_workshopTree.workshopTree).selectNode.value.id),
        q: common_vendor.p({
          name: "hospital-line"
        }),
        r: common_vendor.t(common_vendor.unref(locale_index.t)("工艺")),
        s: workshopScada.value == null ? 1 : "",
        t: common_vendor.o(toScada),
        v: realtimes.value != null && realtimes.value.length > 0
      }, realtimes.value != null && realtimes.value.length > 0 ? {
        w: common_vendor.t(common_vendor.unref(locale_index.t)("场景属性")),
        x: common_vendor.f(realtimes.value, (i, idx, i0) => {
          return {
            a: "900544b3-8-" + i0 + ",900544b3-0",
            b: common_vendor.t(i.value == null ? common_vendor.unref(locale_index.t)("暂未获取") : i.value),
            c: common_vendor.t(i.unit != null && i.unit !== "" ? " " + i.unit : ""),
            d: common_vendor.t(i.name),
            e: idx
          };
        }),
        y: common_vendor.p({
          name: "pushpin-line",
          color: "primary",
          pt: {
            className: "-important-text-base"
          }
        })
      } : {}, {
        z: common_vendor.gei(_ctx, ""),
        A: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-900544b3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/work.js.map
