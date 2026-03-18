"use strict";
const common_vendor = require("../../common/vendor.js");
const core_service_index = require("../service/index.js");
require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../uni_modules/cool-unix/cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../uni_modules/cool-unix/cool/utils/parse.js");
require("../../uni_modules/cool-unix/config.js");
class Dict {
  constructor() {
    this.data = common_vendor.reactive([]);
  }
  /**
   * 获取指定key的字典数据
   * @param key 字典key
   * @returns 字典数据
   */
  find(key) {
    return this.data.find((e) => {
      return e.key == key;
    });
  }
  /**
   * 获取指定key的字典项列表
   * @param key 字典key
   * @returns 字典项数组
   */
  get(key) {
    var _a, _b;
    return (_b = (_a = this.find(key)) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : new Array();
  }
  /**
   * 获取指定key和value的字典项
   * @param key 字典key
   * @param value 字典项值
   * @returns 字典项或null
   */
  getItem(key, value) {
    const item = this.get(key).find((e) => {
      return e.value == value;
    });
    if (uni_modules_coolUnix_cool_utils_comm.isNull(item)) {
      return null;
    }
    return item;
  }
  /**
   * 获取指定key和多个value的字典项数组
   * @param key 字典key
   * @param values 字典项值数组
   * @returns 字典项数组
   */
  getItems(key, values) {
    return values.map((e) => {
      return this.getItem(key, e);
    }).filter((e) => {
      return !uni_modules_coolUnix_cool_utils_comm.isNull(e);
    });
  }
  /**
   * 获取指定key和value的字典项的label
   * @param key 字典key
   * @param value 字典项值
   * @returns 字典项label字符串
   */
  getItemLabel(key, value) {
    const item = this.getItem(key, value);
    if (uni_modules_coolUnix_cool_utils_comm.isNull(item) || uni_modules_coolUnix_cool_utils_comm.isNull(item === null || item === void 0 ? void 0 : item.label)) {
      return "";
    }
    return item.label;
  }
  /**
   * 刷新字典数据
   * @param types 可选，指定需要刷新的字典key数组
   */
  refresh(types) {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      const res = yield core_service_index.request({
        url: "/app/dict/info/data",
        method: "POST",
        data: { types }
      });
      if (res == null) {
        return;
      }
      uni_modules_coolUnix_cool_utils_comm.forInObject(res, (arr, key) => {
        let list = [];
        arr.forEach((e) => {
          e["label"] = e["name"];
          const d = uni_modules_coolUnix_cool_utils_parse.parse(e);
          if (d != null) {
            list.push(d);
          }
        });
        const item = this.find(key);
        if (uni_modules_coolUnix_cool_utils_comm.isNull(item)) {
          this.data.push({
            key,
            list
          });
        } else {
          item.list = list;
        }
      });
    });
  }
}
const dict = new Dict();
exports.dict = dict;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/core/store/dict.js.map
