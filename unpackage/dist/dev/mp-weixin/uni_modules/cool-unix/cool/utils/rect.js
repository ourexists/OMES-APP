"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../router/index.js");
const uni_modules_coolUnix_cool_utils_device = require("./device.js");
const uni_modules_coolUnix_cool_ctx_index = require("../ctx/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("./parse.js");
const uni_modules_coolUnix_config = require("../../config.js");
function hasCustomTabBar() {
  if (uni_modules_coolUnix_cool_router_index.router.isTabPage()) {
    return uni_modules_coolUnix_config.config.isCustomTabBar || uni_modules_coolUnix_cool_utils_device.isH5();
  }
  return false;
}
function getSafeAreaHeight(type) {
  const safeAreaInsets = common_vendor.index.getWindowInfo().safeAreaInsets;
  let h;
  if (type == "top") {
    h = safeAreaInsets.top;
  } else {
    h = safeAreaInsets.bottom;
  }
  return h;
}
function getTabBarHeight() {
  let h = uni_modules_coolUnix_cool_ctx_index.ctx.tabBar.height == null ? 50 : uni_modules_coolUnix_cool_utils_parse.getPx(uni_modules_coolUnix_cool_ctx_index.ctx.tabBar.height);
  if (hasCustomTabBar()) {
    h += getSafeAreaHeight("bottom");
  }
  return h;
}
exports.getSafeAreaHeight = getSafeAreaHeight;
exports.getTabBarHeight = getTabBarHeight;
exports.hasCustomTabBar = hasCustomTabBar;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/utils/rect.js.map
