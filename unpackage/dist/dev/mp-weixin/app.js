"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const core_store_index = require("./core/store/index.js");
const uni_modules_coolUnix_cool_router_index = require("./uni_modules/cool-unix/cool/router/index.js");
require("./uni_modules/cool-unix/cool/ctx/index.js");
require("./uni_modules/cool-unix/theme/index.js");
require("./uni_modules/cool-unix/config.js");
const core_store_user = require("./core/store/user.js");
const uni_modules_coolUnix_cool_index = require("./uni_modules/cool-unix/cool/index.js");
require("./router/index.js");
if (!Math) {
  "./pages/index/work.js";
  "./pages/index/inspect.js";
  "./pages/index/equip.js";
  "./pages/index/message.js";
  "./pages/index/my.js";
  "./pages/inspect/task_detail.js";
  "./pages/inspect/device_inspect.js";
  "./pages/set/index.js";
  "./pages/set/general.js";
  "./pages/set/notice.js";
  "./pages/set/about.js";
  "./pages/set/cs.js";
  "./pages/user/login.js";
  "./pages/equip/equip_detail.js";
  "./pages/equip/workshop_tree.js";
  "./pages/equip/equip_collect.js";
  "./pages/equip/workshop_scada.js";
  "./pages/message/message_detail.js";
}
const _sfc_main = common_vendor.defineComponent({
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.uvue:15", "App Launch");
    if (uni_modules_coolUnix_cool_router_index.router.isLoginPage(uni_modules_coolUnix_cool_router_index.router.path()))
      return null;
    const user = core_store_index.useStore().user;
    if (user.isUnLogin()) {
      common_vendor.index.__f__("log", "at App.uvue:20", "未登陆");
      user.logout();
      return null;
    }
    core_store_user.connectMessage();
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.uvue:27", "App Show");
    if (uni_modules_coolUnix_cool_router_index.router.isLoginPage(uni_modules_coolUnix_cool_router_index.router.path()))
      return null;
    const user = core_store_index.useStore().user;
    if (user.isUnLogin()) {
      common_vendor.index.__f__("log", "at App.uvue:33", "未登陆");
      user.logout();
      return null;
    }
    user.get();
    core_store_user.connectMessage();
  },
  onHide: function() {
    core_store_user.disconnectMessage();
  },
  onExit: function() {
    core_store_user.disconnectMessage();
  }
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(uni_modules_coolUnix_cool_index.cool);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
