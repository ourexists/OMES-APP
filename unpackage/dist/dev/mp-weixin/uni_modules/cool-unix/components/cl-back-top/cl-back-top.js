"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_rect = require("../../cool/utils/rect.js");
const uni_modules_coolUnix_hooks_page = require("../../hooks/page.js");
require("../../config.js");
const uni_modules_coolUnix_components_clFooter_offset = require("../cl-footer/offset.js");
if (!Array) {
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  _easycom_cl_icon_1();
}
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
if (!Math) {
  _easycom_cl_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-back-top"
}, { __name: "cl-back-top", props: {
  top: {
    type: Number,
    default: null
  }
}, emits: ["backTop"], setup(__props, _a) {
  var __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const screenHeight = common_vendor.index.getWindowInfo().screenHeight;
  const _b = uni_modules_coolUnix_hooks_page.usePage(), scrollToTop = _b.scrollToTop, onScroll = _b.onScroll, offScroll = _b.offScroll;
  const visible = common_vendor.ref(false);
  const bottom = common_vendor.computed(() => {
    let h = 20;
    if (uni_modules_coolUnix_cool_utils_rect.hasCustomTabBar()) {
      h += uni_modules_coolUnix_cool_utils_rect.getTabBarHeight();
    } else {
      h += uni_modules_coolUnix_components_clFooter_offset.clFooterOffset.get();
    }
    return h + "px";
  });
  const isPage = common_vendor.computed(() => {
    return props.top == null;
  });
  function onVisible(top) {
    visible.value = top > screenHeight - 100;
  }
  function toTop() {
    if (isPage.value) {
      scrollToTop();
    }
    emit("backTop");
  }
  common_vendor.onMounted(() => {
    if (isPage.value) {
      onScroll(onVisible);
    } else {
      common_vendor.watch(common_vendor.computed(() => {
        return props.top;
      }), (top) => {
        onVisible(top);
      }, {
        immediate: true
      });
    }
  });
  common_vendor.onUnmounted(() => {
    if (isPage.value) {
      offScroll(onVisible);
    }
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.p({
        name: "skip-up-line",
        color: "white",
        size: "25px"
      }),
      b: visible.value ? 1 : "",
      c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      d: bottom.value,
      e: common_vendor.o(toTop)
    };
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3a548358"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-back-top/cl-back-top.js.map
