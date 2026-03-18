"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../uni_modules/cool-unix/theme/index.js");
require("../../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_hooks_ui = require("../../uni_modules/cool-unix/hooks/ui.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_button_1 = common_vendor.resolveComponent("cl-button");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_text_1 + _easycom_cl_image_1 + _easycom_cl_button_1 + _easycom_cl_page_1)();
}
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_image = () => "../../uni_modules/cool-unix/components/cl-image/cl-image.js";
const _easycom_cl_button = () => "../../uni_modules/cool-unix/components/cl-button/cl-button.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_image + _easycom_cl_button + _easycom_cl_page)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cs",
  setup(__props) {
    const ui = uni_modules_coolUnix_hooks_ui.useUi();
    function saveImage() {
      common_vendor.index.saveImageToPhotosAlbum({
        filePath: "/static/cs.png",
        success: () => {
          ui.showToast({
            message: "保存成功"
          });
        }
      });
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          pt: {
            className: "text-center mb-5"
          }
        }),
        b: common_vendor.p({
          src: "/static/cs.png",
          height: 320,
          width: 320,
          ["show-menu-by-longpress"]: true
        }),
        c: common_vendor.o(saveImage),
        d: common_vendor.p({
          type: "light",
          icon: "download-line"
        }),
        e: common_vendor.gei(_ctx, ""),
        f: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/set/cs.js.map
