"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../uni_modules/cool-unix/cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../uni_modules/cool-unix/cool/utils/parse.js");
require("../../uni_modules/cool-unix/config.js");
const uni_modules_coolUnix_cool_utils_storage = require("../../uni_modules/cool-unix/cool/utils/storage.js");
const core_service_index = require("../service/index.js");
const core_apiRouter_path = require("../apiRouter/path.js");
const config_index = require("../../config/index.js");
require("./dict.js");
const core_utils_parse = require("../utils/parse.js");
let isStop = false;
let isConnected = false;
let isConnecting = false;
const notifyQueue = common_vendor.ref([]);
const notify_message = common_vendor.ref("");
const notify_visible = common_vendor.ref(false);
const notify_enable = common_vendor.ref(true);
const unread_count = common_vendor.ref(0);
function initNotifyEnable() {
  const saved = uni_modules_coolUnix_cool_utils_storage.storage.get("notify_enable");
  if (saved == null) {
    notify_enable.value = true;
  } else if (typeof saved === "boolean") {
    notify_enable.value = saved;
  } else if (typeof saved === "number") {
    notify_enable.value = saved !== 0;
  } else if (typeof saved === "string") {
    notify_enable.value = saved === "true" || saved === "1";
  } else {
    notify_enable.value = true;
  }
}
initNotifyEnable();
function connectMessage() {
  return common_vendor.__awaiter(this, void 0, void 0, function* () {
    common_vendor.index.__f__("log", "at components/msg-notifier.ts:44", "sse connect start");
    if (isConnected || isConnecting) {
      common_vendor.index.__f__("log", "at components/msg-notifier.ts:46", "sse connect is connecting");
      return;
    }
    isStop = false;
    isConnecting = true;
    function poll() {
      var _a;
      if (isStop)
        return;
      try {
        const now = Date.now();
        core_service_index.request({
          url: core_apiRouter_path.apiPath.message_page,
          method: "POST",
          data: {
            page: 1,
            pageSize: 10,
            accId: (_a = userInfo.value) === null || _a === void 0 ? void 0 : _a.id,
            platform: config_index.config.platform,
            createdTimeStart: formatDateTime(now - 3e3),
            createdTimeEnd: formatDateTime(now)
          }
        }).then((res) => {
          if (res !== null) {
            const r = core_utils_parse.parseData(res);
            if (r == null) {
              return;
            }
            r.forEach((msg) => {
              return pushNotifyQueue(msg);
            });
          }
        }).catch((err) => {
          common_vendor.index.__f__("error", "at components/msg-notifier.ts:78", err);
        });
        core_service_index.request({
          url: core_apiRouter_path.apiPath.message_unread_count,
          method: "GET"
        }).then((res) => {
          if (res !== null) {
            unread_count.value = res;
          }
        }).catch((err) => {
          common_vendor.index.__f__("error", "at components/msg-notifier.ts:91", err);
        });
      } catch (err) {
        common_vendor.index.__f__("warn", "at components/msg-notifier.ts:94", "poll error", err);
      } finally {
        setTimeout(() => {
          poll();
        }, 3e3);
      }
    }
    poll();
  });
}
function formatDateTime(ts) {
  const d = new Date(ts);
  const p = (n) => {
    return n < 10 ? "0" + n : "" + n;
  };
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
function disconnectMessage() {
  common_vendor.index.__f__("log", "at components/msg-notifier.ts:113", "sse client disconnect=======");
  isStop = true;
  isConnected = false;
  isConnecting = false;
}
function pushNotifyQueue(msg) {
  notifyQueue.value.push(msg);
  if (notifyQueue.value.length > 10) {
    notifyQueue.value.shift();
  }
}
function onNotify() {
  var _a;
  if (notifyQueue.value.length <= 0) {
    notify_visible.value = false;
  } else {
    const msg = notifyQueue.value.shift();
    if (msg == null) {
      return;
    }
    notify_visible.value = (_a = notify_enable.value) !== null && _a !== void 0 ? _a : true;
    {
      common_vendor.index.__f__("log", "at components/msg-notifier.ts:144", JSON.stringify(msg) + "-" + notify_visible.value + "-" + notify_enable.value);
    }
    notify_message.value = msg.context;
  }
}
setInterval(() => {
  onNotify();
}, 8e3);
function changeNotify(val) {
  uni_modules_coolUnix_cool_utils_storage.storage.set("notify_enable", val, 0);
  notify_enable.value = val;
}
class User {
  constructor() {
    this.info = common_vendor.ref(null);
    this.token = null;
    const userInfo2 = uni_modules_coolUnix_cool_utils_storage.storage.get("userInfo");
    const token = uni_modules_coolUnix_cool_utils_storage.storage.get("token");
    this.token = token == "" ? null : token;
    if (userInfo2 != null && uni_modules_coolUnix_cool_utils_comm.isObject(userInfo2)) {
      this.set(userInfo2);
    }
  }
  /**
   * 获取用户信息（从服务端拉取最新信息并更新本地）
   * @returns Promise<void>
   */
  get() {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      if (this.token != null) {
        yield core_service_index.request({
          url: core_apiRouter_path.apiPath.current_user
        }).then((res) => {
          this.set(res);
        }).catch(() => {
        });
      }
    });
  }
  getSync() {
    if (this.token != null) {
      core_service_index.request({
        url: core_apiRouter_path.apiPath.current_user
      }).then((res) => {
        this.set(res);
      }).catch(() => {
      });
    }
  }
  /**
   * 设置用户信息并存储到本地
   * @param data 用户信息对象
   */
  set(data) {
    if (data == null) {
      return;
    }
    const user2 = uni_modules_coolUnix_cool_utils_parse.parse(data);
    if (user2 == null) {
      return;
    }
    this.info.value = user2;
    uni_modules_coolUnix_cool_utils_storage.storage.set("userInfo", user2, 0);
  }
  // /**
  //  * 更新用户信息（本地与服务端同步）
  //  * @param data 新的用户信息
  //  */
  // async update(data: any) {
  //     if (isNull(data) || isNull(this.info.value)) {
  //         return;
  //     }
  //
  //     // 本地同步更新
  //     forInObject(data, (value, key) => {
  //         this.info.value![key] = value;
  //     });
  //
  //     // 同步到服务端
  //     await request({
  //         url: "/app/user/info/updatePerson",
  //         method: "POST",
  //         data
  //     });
  // }
  /**
   * 移除用户信息
   */
  remove() {
    this.info.value = null;
    uni_modules_coolUnix_cool_utils_storage.storage.remove("userInfo");
  }
  /**
   * 判断用户信息是否为空
   * @returns boolean
   */
  isNull() {
    return this.info.value == null;
  }
  isUnLogin() {
    return user.info.value == null || user.token == null;
  }
  /**
   * 清除本地所有用户信息和token
   */
  clear() {
    uni_modules_coolUnix_cool_utils_storage.storage.remove("userInfo");
    uni_modules_coolUnix_cool_utils_storage.storage.remove("token");
    uni_modules_coolUnix_cool_utils_storage.storage.remove("refreshToken");
    this.token = null;
    this.remove();
  }
  /**
   * 退出登录，清除所有信息并跳转到登录页
   */
  logout() {
    this.clear();
    uni_modules_coolUnix_cool_router_index.router.login();
    disconnectMessage();
  }
  /**
   * 设置token并存储到本地
   * @param data Token对象
   */
  setToken(data) {
    this.token = data.token;
    uni_modules_coolUnix_cool_utils_storage.storage.set("token", data.token, data.expire - 5);
    uni_modules_coolUnix_cool_utils_storage.storage.set("refreshToken", data.refreshToken, data.refreshExpire - 5);
  }
}
const user = new User();
const userInfo = common_vendor.computed(() => {
  return user.info.value;
});
exports.changeNotify = changeNotify;
exports.connectMessage = connectMessage;
exports.disconnectMessage = disconnectMessage;
exports.notify_enable = notify_enable;
exports.notify_message = notify_message;
exports.notify_visible = notify_visible;
exports.unread_count = unread_count;
exports.user = user;
exports.userInfo = userInfo;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/core/store/user.js.map
