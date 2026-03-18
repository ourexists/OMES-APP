"use strict";
const common_vendor = require("../../common/vendor.js");
const config_index = require("../../config/index.js");
const locale_index = require("../../locale/index.js");
if (!Array) {
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_image_1 + _easycom_cl_text_1 + _easycom_cl_page_1)();
}
const _easycom_cl_image = () => "../../uni_modules/cool-unix/components/cl-image/cl-image.js";
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_image + _easycom_cl_text + _easycom_cl_page)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "about",
  setup(__props) {
    common_vendor.onReady(() => {
      common_vendor.index.setNavigationBarTitle({
        title: locale_index.$t("关于{name}", new UTSJSONObject({ name: config_index.config.name }))
      });
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          src: "/static/logo.png",
          height: 120,
          width: 120
        }),
        b: common_vendor.t(common_vendor.unref(config_index.config).name),
        c: common_vendor.p({
          pt: {
            className: "mt-3 mb-1"
          }
        }),
        d: common_vendor.t(common_vendor.unref(config_index.config).version),
        e: common_vendor.p({
          color: "info",
          pt: {
            className: "-important-text-xs"
          }
        }),
        f: common_vendor.gei(_ctx, ""),
        g: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/set/about.js.map
