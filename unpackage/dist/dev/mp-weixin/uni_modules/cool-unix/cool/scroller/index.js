"use strict";
const uni_modules_coolUnix_cool_router_index = require("../router/index.js");
class Scroller {
  constructor() {
    this.list = /* @__PURE__ */ new Map();
    this.off = (callback) => {
      var _a;
      const path = uni_modules_coolUnix_cool_router_index.router.path();
      const cbs = (_a = this.list.get(path)) !== null && _a !== void 0 ? _a : [];
      this.list.set(path, cbs.filter((cb) => {
        return cb != callback;
      }));
    };
  }
  // 触发滚动
  emit(top) {
    var _a;
    const cbs = (_a = this.list.get(uni_modules_coolUnix_cool_router_index.router.path())) !== null && _a !== void 0 ? _a : [];
    cbs.forEach((cb) => {
      cb(top);
    });
  }
  // 监听页面滚动
  on(callback) {
    var _a;
    const path = uni_modules_coolUnix_cool_router_index.router.path();
    const cbs = (_a = this.list.get(path)) !== null && _a !== void 0 ? _a : [];
    cbs.push(callback);
    this.list.set(path, cbs);
  }
}
const scroller = new Scroller();
exports.scroller = scroller;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/scroller/index.js.map
