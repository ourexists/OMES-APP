"use strict";
const common_vendor = require("../../../../common/vendor.js");
const EXPIRES_SUFFIX = "_deadtime";
class Storage {
  /**
   * 获取存储数据
   *
   * @param key 存储键名
   * @returns 存储的数据，如果不存在则返回 null
   *
   * @example
   * const userData = storage.get('user');
   * if (userData != null) {
   *   uni.__f__('log','at uni_modules/cool-unix/cool/utils/storage.ts:20',userData);
   * }
   */
  get(key) {
    return common_vendor.index.getStorageSync(key);
  }
  /**
   * 获取所有存储数据的信息
   *
   * 遍历所有存储键，返回包含所有键值对的对象
   * 注意：此方法会读取所有存储数据，大量数据时需注意性能
   *
   * @returns 包含所有存储数据的对象
   *
   * @example
   * const allData = storage.info();
   * uni.__f__('log','at uni_modules/cool-unix/cool/utils/storage.ts:37','所有存储数据：', allData);
   */
  info() {
    const info = common_vendor.index.getStorageInfoSync();
    const d = {};
    info.keys.forEach((e) => {
      d[e] = this.get(e);
    });
    return d;
  }
  /**
   * 设置存储数据
   *
   * @param key 存储键名
   * @param value 要存储的数据，支持任意类型
   * @param expires 过期时间（秒），默认为0表示永不过期
   *
   * @example
   * // 存储永久数据
   * storage.set('user', { name: '张三', age: 25 }, 0);
   *
   * // 存储5分钟后过期的数据
   * storage.set('token', 'abc123', 300);
   */
  set(key, value, expires) {
    common_vendor.index.setStorageSync(key, value);
    if (expires > 0) {
      const expireTime = (/* @__PURE__ */ new Date()).getTime() + expires * 1e3;
      common_vendor.index.setStorageSync(`${key}${EXPIRES_SUFFIX}`, expireTime);
    }
  }
  /**
   * 检查数据是否已过期
   *
   * @param key 存储键名
   * @returns true表示已过期或无过期时间设置，false表示未过期
   *
   * @example
   * if (storage.isExpired('token')) {
   *   uni.__f__('log','at uni_modules/cool-unix/cool/utils/storage.ts:88','token已过期');
   * }
   */
  isExpired(key) {
    const value = common_vendor.index.getStorageSync(`${key}${EXPIRES_SUFFIX}`);
    if (value == null) {
      return true;
    }
    return value - (/* @__PURE__ */ new Date()).getTime() <= 0;
  }
  /**
   * 删除存储数据
   *
   * 会同时删除数据本身和对应的过期时间
   *
   * @param key 存储键名
   *
   * @example
   * storage.remove('user');
   * storage.remove('token');
   */
  remove(key) {
    common_vendor.index.removeStorageSync(key);
    common_vendor.index.removeStorageSync(`${key}${EXPIRES_SUFFIX}`);
  }
  /**
   * 清空所有存储数据
   *
   * 警告：此操作会删除所有本地存储数据，请谨慎使用
   *
   * @example
   * storage.clear(); // 清空所有数据
   */
  clear() {
    common_vendor.index.clearStorageSync();
  }
  /**
   * 获取数据后立即删除（一次性读取）
   *
   * 适用于临时数据、一次性令牌等场景
   * 读取后数据会被自动删除，确保数据的一次性使用
   *
   * @param key 存储键名
   * @returns 存储的数据，如果不存在则返回 null
   *
   * @example
   * const tempToken = storage.once('temp_token');
   * // tempToken 使用后，存储中的 temp_token 已被删除
   */
  once(key) {
    const value = this.get(key);
    this.remove(key);
    return value;
  }
}
const storage = new Storage();
exports.storage = storage;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/utils/storage.js.map
