"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_cool_ctx_index = require("../ctx/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../utils/comm.js");
require("../../config.js");
const uni_modules_coolUnix_cool_utils_storage = require("../utils/storage.js");
class Router {
  constructor() {
    this.eventsMap = {};
    this.login = uni_modules_coolUnix_cool_utils_comm.debounce(() => {
      if (!this.isLoginPage(this.path())) {
        this.push({
          path: "/pages/user/login",
          mode: "reLaunch"
        });
      }
    }, 300);
  }
  // 获取传递的 params 参数
  params() {
    var _a;
    return (_a = uni_modules_coolUnix_cool_utils_storage.storage.get("router-params")) !== null && _a !== void 0 ? _a : {};
  }
  // 获取传递的 query 参数
  query() {
    var _a, _b;
    return (_b = (_a = this.route()) === null || _a === void 0 ? void 0 : _a.query) !== null && _b !== void 0 ? _b : {};
  }
  // 获取默认路径，支持 home 和 login
  defaultPath(name) {
    const paths = {
      home: uni_modules_coolUnix_cool_ctx_index.PAGES[0].path,
      login: "/pages/user/login"
    };
    return uni_modules_coolUnix_cool_utils_comm.get(paths, name);
  }
  // 获取当前页面栈的所有页面实例
  getPages() {
    return uni_modules_coolUnix_cool_utils_comm.map(getCurrentPages(), (e) => {
      let path = e.route;
      if (path == "/") {
        path = this.defaultPath("home");
      }
      if (!path.startsWith("/")) {
        path = "/" + path;
      }
      const page = uni_modules_coolUnix_cool_ctx_index.PAGES.find((e2) => {
        return e2.path == path;
      });
      const style = page === null || page === void 0 ? void 0 : page.style;
      const meta = page === null || page === void 0 ? void 0 : page.meta;
      const vm = e.vm;
      let exposed = vm;
      const query = e.options;
      return {
        path,
        vm,
        exposed,
        style,
        meta,
        query,
        isCustomNavbar: (style === null || style === void 0 ? void 0 : style.navigationStyle) == "custom"
      };
    });
  }
  // 获取指定路径的页面实例
  getPage(path) {
    return this.getPages().find((e) => {
      return e.path == path;
    });
  }
  // 获取当前路由页面实例
  route() {
    return uni_modules_coolUnix_cool_utils_comm.last(this.getPages());
  }
  // 获取当前页面路径
  path() {
    var _a, _b;
    return (_b = (_a = this.route()) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : "";
  }
  // 简单跳转页面（默认 navigateTo）
  to(path) {
    this.push({
      path
    });
  }
  // 路由跳转，支持多种模式和参数
  push(options) {
    let _a = options.query, query = _a == void 0 ? {} : _a, _b = options.params, params = _b == void 0 ? {} : _b, _c = options.mode, mode = _c == void 0 ? "navigateTo" : _c, path = options.path, success = options.success, fail = options.fail, complete = options.complete, animationType = options.animationType, animationDuration = options.animationDuration, events = options.events, isAuth = options.isAuth;
    if (!uni_modules_coolUnix_cool_utils_comm.isEmpty(query)) {
      const arr = uni_modules_coolUnix_cool_utils_comm.toArray(query, (v, k) => {
        return `${k}=${v}`;
      });
      path += "?" + arr.join("&");
    }
    if (!uni_modules_coolUnix_cool_utils_comm.isEmpty(params)) {
      uni_modules_coolUnix_cool_utils_storage.storage.set("router-params", params, 0);
    }
    if (this.isTabPage(path)) {
      mode = "switchTab";
    }
    const next = () => {
      switch (mode) {
        case "navigateTo":
          common_vendor.index.navigateTo({
            url: path,
            success,
            events,
            fail,
            complete,
            animationType,
            animationDuration
          });
          break;
        case "redirectTo":
          common_vendor.index.redirectTo({
            url: path,
            success,
            fail,
            complete
          });
          break;
        case "reLaunch":
          common_vendor.index.reLaunch({
            url: path,
            success,
            fail,
            complete
          });
          break;
        case "switchTab":
          common_vendor.index.switchTab({
            url: path,
            success,
            fail,
            complete
          });
          break;
      }
    };
    if (this.eventsMap.beforeEach != null) {
      const from = uni_modules_coolUnix_cool_utils_comm.last(this.getPages());
      const to = { path, meta: this.getMeta(path), query, isAuth };
      this.eventsMap.beforeEach(to, from, next);
    } else {
      next();
    }
  }
  // 回到首页
  home() {
    this.push({
      path: this.defaultPath("home")
    });
  }
  // 返回上一页
  back(options = null) {
    var _a, _b;
    if (this.isFirstPage()) {
      this.home();
    } else {
      const delta = (_a = options === null || options === void 0 ? void 0 : options.delta) !== null && _a !== void 0 ? _a : 1;
      const next = () => {
        common_vendor.index.navigateBack(Object.assign({}, options !== null && options !== void 0 ? options : {}));
      };
      if (this.eventsMap.beforeEach != null) {
        const from = uni_modules_coolUnix_cool_utils_comm.last(this.getPages());
        const to = uni_modules_coolUnix_cool_utils_comm.nth(this.getPages(), -delta - 1);
        if (to != null) {
          this.eventsMap.beforeEach({
            path: to.path,
            query: to.query,
            meta: (_b = to.meta) !== null && _b !== void 0 ? _b : {}
          }, from, next);
        } else {
          common_vendor.index.__f__("error", "at uni_modules/cool-unix/cool/router/index.ts:244", "[router] found to page is null");
        }
      } else {
        next();
      }
    }
  }
  // 获取页面元数据
  getMeta(path) {
    var _a, _b;
    return (_b = (_a = uni_modules_coolUnix_cool_ctx_index.PAGES.find((e) => {
      return e.path.includes(path);
    })) === null || _a === void 0 ? void 0 : _a.meta) !== null && _b !== void 0 ? _b : {};
  }
  // 执行当前页面暴露的方法
  callMethod(name, data) {
    const fn = uni_modules_coolUnix_cool_utils_comm.get(this.route(), `$vm.$.exposed.${name}`);
    if (uni_modules_coolUnix_cool_utils_comm.isFunction(fn)) {
      return fn(data);
    }
    return null;
  }
  // 判断页面栈是否只有一个页面
  isFirstPage() {
    return getCurrentPages().length == 1;
  }
  // 判断是否为首页
  isHomePage() {
    return this.path() == this.defaultPath("home");
  }
  // 判断是否为自定义导航栏页面
  isCustomNavbarPage() {
    var _a, _b;
    return (_b = (_a = this.route()) === null || _a === void 0 ? void 0 : _a.isCustomNavbar) !== null && _b !== void 0 ? _b : false;
  }
  // 判断是否为当前页面
  isCurrentPage(path) {
    return this.path() == path;
  }
  // 判断是否为 tab 页面
  isTabPage(path = null) {
    if (path == null) {
      path = this.path();
    }
    if (path == "/") {
      path = this.defaultPath("home");
    }
    return !uni_modules_coolUnix_cool_utils_comm.isNull(uni_modules_coolUnix_cool_ctx_index.TABS.find((e) => {
      return path == e.pagePath;
    }));
  }
  // 判断是否为登录页
  isLoginPage(path) {
    return path == this.defaultPath("login");
  }
  // 登录成功后跳转逻辑
  nextLogin() {
    const pages = this.getPages();
    const index = pages.findIndex((e) => {
      return this.defaultPath("login").includes(e.path);
    });
    if (index < 0) {
      this.home();
    } else {
      this.back({
        delta: pages.length - index
      });
    }
    if (this.eventsMap.afterLogin != null) {
      this.eventsMap.afterLogin();
    }
    common_vendor.index.$emit("afterLogin");
  }
  // 注册跳转前钩子
  beforeEach(cb) {
    this.eventsMap.beforeEach = cb;
  }
  // 注册登录后回调
  afterLogin(cb) {
    this.eventsMap.afterLogin = cb;
  }
}
const router = new Router();
exports.router = router;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/router/index.js.map
