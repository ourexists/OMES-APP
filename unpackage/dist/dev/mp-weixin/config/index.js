"use strict";
require("../uni_modules/cool-unix/cool/router/index.js");
require("../common/vendor.js");
require("../uni_modules/cool-unix/cool/ctx/index.js");
require("../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../uni_modules/cool-unix/cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_device = require("../uni_modules/cool-unix/cool/utils/device.js");
require("../uni_modules/cool-unix/config.js");
const config_proxy = require("./proxy.js");
const ignoreTokens = [];
const config = Object.assign({ name: "OMES", version: "1.0.0", locale: "zh", website: "", showDarkButton: uni_modules_coolUnix_cool_utils_device.isMp() ? false : true, isCustomTabBar: true, backTop: true, platform: "mes-app", wx: {
  debug: false
}, equipRefreshTime: 10 * 1e3 }, getPath("dev"));
function getPath(env) {
  const host = uni_modules_coolUnix_cool_utils_comm.get(config_proxy.proxy, env + `.target`);
  let baseUrl = host;
  return {
    host,
    baseUrl
  };
}
exports.config = config;
exports.ignoreTokens = ignoreTokens;
//# sourceMappingURL=../../.sourcemap/mp-weixin/config/index.js.map
