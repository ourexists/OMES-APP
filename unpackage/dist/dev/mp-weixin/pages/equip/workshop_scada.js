"use strict";
const common_vendor = require("../../common/vendor.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
const core_utils_parse = require("../../core/utils/parse.js");
if (!Array) {
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  _easycom_cl_page_1();
}
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  _easycom_cl_page();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "workshop_scada",
  setup(__props) {
    const currentWorkshop = common_vendor.ref(null);
    const iframeUrl = common_vendor.ref(null);
    let timer = null;
    const timerInterval = common_vendor.ref(0);
    function loadIframeUrl(workshopCode = null) {
      if (workshopCode == null || workshopCode == "-1" || workshopCode == -1) {
        iframeUrl.value = null;
        timerInterval.value = 0;
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
          iframeUrl.value = null;
          timerInterval.value = 0;
          return null;
        }
        const r = core_utils_parse.parseData(res);
        if (r == null || r.url == null || r.url == "") {
          iframeUrl.value = null;
          timerInterval.value = 0;
          return null;
        }
        iframeUrl.value = r.url;
        if (r.interval == null) {
          timerInterval.value = 0;
        } else {
          timerInterval.value = r.interval;
        }
      });
    }
    common_vendor.onLoad((query) => {
      currentWorkshop.value = query.workshopCode;
      loadIframeUrl(currentWorkshop.value);
    });
    common_vendor.onShow(() => {
      if (timer != null) {
        clearInterval(timer);
      }
      if (timerInterval.value > 0) {
        timer = setInterval(() => {
          loadIframeUrl(currentWorkshop.value);
        }, timerInterval.value * 6e4);
      }
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
        a: iframeUrl.value,
        b: common_vendor.gei(_ctx, ""),
        c: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/equip/workshop_scada.js.map
