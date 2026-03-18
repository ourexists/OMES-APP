"use strict";
const uni_modules_coolUnix_cool_router_index = require("../uni_modules/cool-unix/cool/router/index.js");
require("../common/vendor.js");
require("../uni_modules/cool-unix/cool/ctx/index.js");
require("../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../uni_modules/cool-unix/cool/utils/comm.js");
require("../uni_modules/cool-unix/config.js");
const core_store_index = require("../core/store/index.js");
uni_modules_coolUnix_cool_router_index.router.beforeEach((to, from, next) => {
  const user = core_store_index.useStore().user;
  if (to.isAuth == true || (uni_modules_coolUnix_cool_utils_comm.isNull(to.meta) ? true : to.meta.isAuth == true)) {
    if (!user.isNull()) {
      next();
    } else {
      uni_modules_coolUnix_cool_router_index.router.login();
    }
  } else {
    next();
  }
});
//# sourceMappingURL=../../.sourcemap/mp-weixin/router/index.js.map
