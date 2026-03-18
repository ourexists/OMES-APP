"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_cool_utils_comm = require("../utils/comm.js");
require("../router/index.js");
require("../ctx/index.js");
require("../../config.js");
class Refs {
  constructor() {
    this.data = common_vendor.reactive({});
  }
  /**
   * 生成 ref 绑定函数，用于在模板中设置 ref。
   * @param name ref 名称
   * @returns 绑定函数 (el: Instance) => void
   */
  set(name) {
    return (el) => {
      this.data[name] = el;
    };
  }
  /**
   * 获取指定名称的组件实例
   * @param name ref 名称
   * @returns 组件实例或 null
   */
  get(name) {
    const d = this.data[name];
    if (uni_modules_coolUnix_cool_utils_comm.isNull(d)) {
      return null;
    }
    return d;
  }
  /**
   * 获取组件实例暴露的属性或方法（兼容不同平台）
   * @param name ref 名称
   * @param key 暴露的属性名
   * @returns 属性值或 null
   */
  getExposed(name, key) {
    var _a;
    return (_a = this.get(name)) === null || _a === void 0 ? void 0 : _a[key];
  }
  /**
   * 调用组件实例暴露的方法，并返回结果
   * @param name ref 名称
   * @param method 方法名
   * @param data 传递的数据
   * @returns 方法返回值
   */
  call(name, method, data = null) {
    return this.get(name).$callMethod(method, data);
  }
  /**
   * 调用组件实例暴露的方法，无返回值
   * @param name ref 名称
   * @param method 方法名
   * @param data 传递的数据
   */
  callMethod(name, method, data = null) {
    this.get(name).$callMethod(method, data);
  }
  /**
   * 调用组件的 open 方法，常用于弹窗、抽屉等组件
   * @param name ref 名称
   * @param data 传递的数据
   */
  open(name, data = null) {
    this.callMethod(name, "open", data);
  }
  /**
   * 调用组件的 close 方法，常用于弹窗、抽屉等组件
   * @param name ref 名称
   */
  close(name) {
    return this.callMethod(name, "close");
  }
}
function useRefs() {
  return new Refs();
}
exports.useRefs = useRefs;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/hooks/refs.js.map
