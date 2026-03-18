"use strict";
const common_vendor = require("../../common/vendor.js");
const config_index = require("../../config/index.js");
const locale_index = require("../../locale/index.js");
require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../uni_modules/cool-unix/cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../uni_modules/cool-unix/cool/utils/parse.js");
require("../../uni_modules/cool-unix/config.js");
const core_store_index = require("../store/index.js");
const isIgnoreToken = (url) => {
  return config_index.ignoreTokens.some((e) => {
    const pattern = e.replace(/\*/g, ".*");
    return new RegExp(pattern).test(url);
  });
};
function request(options) {
  let url = options.url, _a = options.method, method = _a == void 0 ? "GET" : _a, _b = options.data, data = _b == void 0 ? {} : _b;
  options.params;
  let _d = options.header, header = _d == void 0 ? {} : _d, _e = options.timeout, timeout = _e == void 0 ? 6e4 : _e;
  const user = core_store_index.useStore().user;
  if (!url.startsWith("http")) {
    url = config_index.config.baseUrl + url;
  }
  let Authorization = user.token;
  if (isIgnoreToken(url)) {
    Authorization = null;
  }
  return new Promise((resolve, reject) => {
    if (url.includes("?")) {
      url = url + "&locale=" + locale_index.locale.value;
    } else {
      url = url + "?locale=" + locale_index.locale.value;
    }
    const next = () => {
      common_vendor.index.request({
        url,
        method,
        data,
        header: Object.assign({ Authorization, language: locale_index.locale.value, "x-era-platform": config_index.config.platform, "x-route-tenant": 0 }, header),
        timeout,
        success(res) {
          if (res.statusCode == 401 || res.statusCode == 403) {
            user.logout();
            reject({ msg: res.statusCode == 403 ? locale_index.t("无访问权限") : locale_index.t("无权限") });
            return;
          } else if (res.statusCode == 502) {
            reject({
              msg: locale_index.t("服务异常")
            });
          } else if (res.statusCode == 404) {
            return reject({
              msg: `[404] ${url}`
            });
          } else if (res.statusCode == 200) {
            if (res.data == null) {
              resolve(null);
            } else if (!uni_modules_coolUnix_cool_utils_comm.isObject(res.data)) {
              resolve(res.data);
            } else {
              const raw = res.data;
              const parsed = uni_modules_coolUnix_cool_utils_parse.parse(raw);
              const code = parsed.code;
              const msg = parsed.msg;
              const data_1 = parsed.data;
              switch (code) {
                case 200:
                  resolve(data_1);
                  break;
                case 500:
                  reject({ msg, code });
                  break;
                case 401:
                case 403:
                  user.logout();
                  reject({ msg: code === 403 ? locale_index.t("无访问权限") : locale_index.t("无权限") });
                  break;
                default:
                  if (options.url.includes("/oauth2/token")) {
                    resolve(res.data);
                  } else {
                    reject({ msg, code });
                  }
              }
            }
          } else {
            reject({ msg: locale_index.t("服务异常") });
          }
        },
        // 网络请求失败
        fail(err) {
          reject({ msg: err.errMsg });
        }
      });
    };
    next();
  });
}
exports.request = request;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/core/service/index.js.map
