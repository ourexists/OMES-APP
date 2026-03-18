"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../cool/router/index.js");
require("../cool/ctx/index.js");
require("../theme/index.js");
require("../config.js");
const uni_modules_coolUnix_locale_index = require("../locale/index.js");
const list = /* @__PURE__ */ new Map();
class Ui {
  /**
   * 获取当前页面的 UiInstance 实例
   * @returns UiInstance | undefined
   */
  getInstance() {
    return list.get(uni_modules_coolUnix_cool_router_index.router.path());
  }
  /**
   * 显示确认弹窗
   * @param options ClConfirmOptions 弹窗配置项
   */
  showConfirm(options) {
    const instance = this.getInstance();
    if (instance != null) {
      instance.showConfirm(options);
    }
  }
  /**
   * 显示提示弹窗
   * @param message 提示消息
   * @param callback 回调函数
   */
  showTips(message, callback) {
    const instance = this.getInstance();
    if (instance != null) {
      instance.showTips(message, callback);
    }
  }
  /**
   * 显示提示弹窗
   * @param options ClToastOptions 弹窗配置项
   */
  showToast(options) {
    const instance = this.getInstance();
    if (instance != null) {
      instance.showToast(options);
    }
  }
  /**
   * 显示加载中弹窗
   * @param title 提示内容
   * @param mask 是否显示蒙层
   */
  showLoading(title = null, mask = null) {
    common_vendor.index.showLoading({
      title: title !== null && title !== void 0 ? title : uni_modules_coolUnix_locale_index.t("加载中"),
      mask: mask !== null && mask !== void 0 ? mask : true
    });
  }
  /**
   * 隐藏加载中弹窗
   */
  hideLoading() {
    common_vendor.index.hideLoading();
  }
}
const ui = new Ui();
function useUi() {
  return ui;
}
function createUi(instance) {
  list.set(uni_modules_coolUnix_cool_router_index.router.path(), instance);
}
exports.createUi = createUi;
exports.useUi = useUi;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/hooks/ui.js.map
