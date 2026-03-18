"use strict";
const uni_modules_coolUnix_cool_scroller_index = require("../cool/scroller/index.js");
require("../../../common/vendor.js");
require("../cool/ctx/index.js");
require("../theme/index.js");
const uni_modules_coolUnix_cool_hooks_parent = require("../cool/hooks/parent.js");
const uni_modules_coolUnix_cool_router_index = require("../cool/router/index.js");
require("../config.js");
class Page {
  constructor() {
    this.pageRef = null;
    this.path = () => {
      return uni_modules_coolUnix_cool_router_index.router.path();
    };
    this.getScrollTop = () => {
      return this.pageRef.scrollTop;
    };
    this.scrollTo = (top) => {
      this.pageRef.scrollTo(top);
    };
    this.scrollToTop = () => {
      this.pageRef.scrollToTop();
    };
    this.onScroll = (callback) => {
      uni_modules_coolUnix_cool_scroller_index.scroller.on(callback);
    };
    this.offScroll = (callback) => {
      uni_modules_coolUnix_cool_scroller_index.scroller.off(callback);
    };
    this.pageRef = uni_modules_coolUnix_cool_hooks_parent.useParent("cl-page");
  }
}
function usePage() {
  return new Page();
}
exports.usePage = usePage;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/hooks/page.js.map
