"use strict";
const uni_modules_coolUnix_cool_router_index = require("../../cool/router/index.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
require("../../config.js");
class ClFooterOffset {
  constructor() {
    this.data = common_vendor.reactive({});
  }
  set(value) {
    this.data[uni_modules_coolUnix_cool_router_index.router.path()] = value;
  }
  get() {
    var _a;
    return (_a = this.data[uni_modules_coolUnix_cool_router_index.router.path()]) !== null && _a !== void 0 ? _a : 0;
  }
}
const clFooterOffset = new ClFooterOffset();
exports.clFooterOffset = clFooterOffset;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-footer/offset.js.map
