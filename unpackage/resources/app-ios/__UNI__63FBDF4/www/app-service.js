(function(vue) {
  "use strict";
  function hasTextColor(className) {
    if (className == "")
      return false;
    const regex = /\btext-(primary|surface|red|blue|green|yellow|purple|pink|indigo|gray|grey|black|white|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose|slate|zinc|neutral|stone)(?:-\d+)?\b/;
    return regex.test(className);
  }
  function hasTextSize(className) {
    if (className == "")
      return false;
    const regex = /\btext-(xs|sm|md|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[\d+[a-zA-Z%]*\])\b/;
    return regex.test(className);
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function isObject(value) {
    return typeof value == "object" && !Array.isArray(value) && !isNull(value);
  }
  function isString(value) {
    return typeof value == "string";
  }
  function isFunction(value) {
    return typeof value == "function";
  }
  function isNull(value) {
    return value == null;
  }
  function isEmpty(value) {
    if (isArray(value)) {
      return value.length == 0;
    }
    if (isString(value)) {
      return value == "";
    }
    if (isObject(value)) {
      return keys(value).length == 0;
    }
    return false;
  }
  function keys(value) {
    return UTSJSONObject.keys(value);
  }
  function first(array) {
    return isArray(array) && array.length > 0 ? array[0] : null;
  }
  function last(array) {
    return isArray(array) && array.length > 0 ? array[array.length - 1] : null;
  }
  function has(object, key) {
    return keys(object).includes(key);
  }
  function get(object, path, defaultValue = null) {
    if (isNull(object)) {
      return defaultValue;
    }
    const value = new UTSJSONObject(object).getAny(path);
    if (isNull(value)) {
      return defaultValue;
    }
    return value;
  }
  function map(array, iteratee) {
    const result = [];
    if (!isArray(array))
      return result;
    for (let i = 0; i < array.length; i++) {
      result.push(iteratee(array[i], i));
    }
    return result;
  }
  function nth(array, index) {
    if (index >= 0) {
      return array[index];
    }
    return array[array.length + index];
  }
  function forEach(data, iteratee) {
    if (isArray(data)) {
      const array = data;
      for (let i = 0; i < array.length; i++) {
        if (array[i] != null) {
          iteratee(array[i], i);
        }
      }
    }
  }
  function forInObject(data, iteratee) {
    if (isObject(data)) {
      const objKeys = keys(data);
      for (let i = 0; i < objKeys.length; i++) {
        const key = objKeys[i];
        iteratee(get(data, key), key);
      }
    }
  }
  function toArray(data, iteratee) {
    const result = [];
    if (isObject(data)) {
      forInObject(data, (value, key) => {
        result.push(iteratee(value, key));
      });
    }
    return result;
  }
  function debounce(func, delay) {
    let timeoutId = 0;
    return function() {
      if (timeoutId != 0) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func();
        timeoutId = 0;
      }, delay);
      return timeoutId;
    };
  }
  function isEqual(a, b) {
    if (isObject(a) && isObject(b)) {
      return isEqual(JSON.stringify(a), JSON.stringify(b));
    } else if (isArray(a) && isArray(b)) {
      return isEqual(JSON.stringify(a), JSON.stringify(b));
    }
    return a == b;
  }
  class DayUts {
    constructor(date) {
      if (date == null || date == "") {
        this._date = /* @__PURE__ */ new Date();
      } else if (typeof date == "string") {
        this._date = new Date(date);
      } else if (typeof date == "number") {
        this._date = new Date(date);
      } else if (date instanceof Date) {
        this._date = new Date(date.getTime());
      } else {
        this._date = /* @__PURE__ */ new Date();
      }
    }
    /**
     * 格式化日期
     * @param template 格式模板，支持 YYYY-MM-DD HH:mm:ss 等
     */
    format(template) {
      let actualTemplate = template;
      const year = this._date.getFullYear();
      const month = this._date.getMonth() + 1;
      const date = this._date.getDate();
      const hours = this._date.getHours();
      const minutes = this._date.getMinutes();
      const seconds = this._date.getSeconds();
      const milliseconds = this._date.getMilliseconds();
      let result = actualTemplate;
      result = result.replace("YYYY", year.toString());
      result = result.replace("YY", year.toString().slice(-2));
      result = result.replace("MM", month.toString().padStart(2, "0"));
      result = result.replace("M", month.toString());
      result = result.replace("DD", date.toString().padStart(2, "0"));
      result = result.replace("D", date.toString());
      result = result.replace("HH", hours.toString().padStart(2, "0"));
      result = result.replace("H", hours.toString());
      result = result.replace("mm", minutes.toString().padStart(2, "0"));
      result = result.replace("m", minutes.toString());
      result = result.replace("ss", seconds.toString().padStart(2, "0"));
      result = result.replace("s", seconds.toString());
      result = result.replace("SSS", milliseconds.toString().padStart(3, "0"));
      return result;
    }
    /**
     * 本月多少天
     */
    getDays() {
      return new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDate();
    }
    /**
     * 是否为闰年
     */
    isLeapYear() {
      return this._date.getFullYear() % 4 == 0 && this._date.getFullYear() % 100 != 0;
    }
    /**
     * 星期几
     */
    getDay() {
      return this._date.getDay();
    }
    /**
     * 获取某个单位的开始时间
     */
    startOf(unit) {
      const newDate = new Date(this._date.getTime());
      switch (unit) {
        case "year":
          newDate.setMonth(0);
          newDate.setDate(1);
          newDate.setHours(0);
          newDate.setMinutes(0);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);
          break;
        case "month":
          newDate.setDate(1);
          newDate.setHours(0);
          newDate.setMinutes(0);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);
          break;
        case "week":
          newDate.setDate(newDate.getDate() - newDate.getDay());
          newDate.setHours(0);
          newDate.setMinutes(0);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);
          break;
        case "day":
          newDate.setHours(0);
          newDate.setMinutes(0);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);
          break;
      }
      return new DayUts(newDate);
    }
    /**
     * 获取某个单位的结束时间
     */
    endOf(unit) {
      const newDate = new Date(this._date.getTime());
      switch (unit) {
        case "year":
          newDate.setMonth(11);
          newDate.setDate(31);
          newDate.setHours(23);
          newDate.setMinutes(59);
          newDate.setSeconds(59);
          newDate.setMilliseconds(999);
          break;
        case "month":
          newDate.setMonth(newDate.getMonth() + 1);
          newDate.setDate(0);
          newDate.setHours(23);
          newDate.setMinutes(59);
          newDate.setSeconds(59);
          newDate.setMilliseconds(999);
          break;
        case "week":
          const day = newDate.getDay();
          const diff = 6 - day;
          newDate.setDate(newDate.getDate() + diff);
          newDate.setHours(23);
          newDate.setMinutes(59);
          newDate.setSeconds(59);
          newDate.setMilliseconds(999);
          break;
        case "day":
          newDate.setHours(23);
          newDate.setMinutes(59);
          newDate.setSeconds(59);
          newDate.setMilliseconds(999);
          break;
      }
      return new DayUts(newDate);
    }
    /**
     * 判断是否早于另一个日期
     */
    isBefore(date) {
      const compareDate = this._parseDate(date);
      return this._date.getTime() < compareDate.getTime();
    }
    /**
     * 判断是否晚于另一个日期
     */
    isAfter(date) {
      const compareDate = this._parseDate(date);
      return this._date.getTime() > compareDate.getTime();
    }
    /**
     * 判断是否与另一个日期相同
     */
    isSame(date) {
      const compareDate = this._parseDate(date);
      return this._date.getTime() == compareDate.getTime();
    }
    /**
     * 计算与另一个日期的差值（毫秒）
     */
    diff(date) {
      const compareDate = this._parseDate(date);
      return this._date.getTime() - compareDate.getTime();
    }
    /**
     * 计算与另一个日期的差值（指定单位）
     */
    diffUnit(date, unit) {
      const compareDate = this._parseDate(date);
      const diffMs = this._date.getTime() - compareDate.getTime();
      switch (unit) {
        case "day":
          return Math.floor(diffMs / (1e3 * 60 * 60 * 24));
        case "hour":
          return Math.floor(diffMs / (1e3 * 60 * 60));
        case "minute":
          return Math.floor(diffMs / (1e3 * 60));
        case "second":
          return Math.floor(diffMs / 1e3);
        case "millisecond":
        default:
          return diffMs;
      }
    }
    /**
     * 添加时间
     */
    add(value, unit) {
      const newDate = new Date(this._date.getTime());
      switch (unit) {
        case "year":
          newDate.setFullYear(newDate.getFullYear() + value);
          break;
        case "month":
          newDate.setMonth(newDate.getMonth() + value);
          break;
        case "day":
          newDate.setDate(newDate.getDate() + value);
          break;
        case "hour":
          newDate.setHours(newDate.getHours() + value);
          break;
        case "minute":
          newDate.setMinutes(newDate.getMinutes() + value);
          break;
        case "second":
          newDate.setSeconds(newDate.getSeconds() + value);
          break;
      }
      return new DayUts(newDate);
    }
    /**
     * 减少时间
     */
    subtract(value, unit) {
      return this.add(-value, unit);
    }
    /**
     * 获取时间戳
     */
    valueOf() {
      return this._date.getTime();
    }
    /**
     * 获取原生Date对象
     */
    toDate() {
      return new Date(this._date.getTime());
    }
    /**
     * 获取日期数组
     */
    toArray() {
      return [
        this._date.getFullYear(),
        this._date.getMonth() + 1,
        this._date.getDate(),
        this._date.getHours(),
        this._date.getMinutes(),
        this._date.getSeconds()
      ];
    }
    /**
     * 私有方法：解析不同类型的日期参数
     */
    _parseDate(date) {
      if (date instanceof DayUts) {
        return date.toDate();
      } else if (date instanceof Date) {
        return date;
      } else if (typeof date == "string") {
        return new Date(date);
      } else if (typeof date == "number") {
        return new Date(date);
      } else {
        return /* @__PURE__ */ new Date();
      }
    }
  }
  function dayUts(date = /* @__PURE__ */ new Date()) {
    return new DayUts(date);
  }
  const isMp = () => {
    return false;
  };
  const isAppIOS = () => {
    return true;
  };
  const isH5 = () => {
    return false;
  };
  /*! *****************************************************************************
  	Copyright (c) Microsoft Corporation.
  
  	Permission to use, copy, modify, and/or distribute this software for any
  	purpose with or without fee is hereby granted.
  
  	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  	PERFORMANCE OF THIS SOFTWARE.
  	***************************************************************************** */
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function parse$1(data) {
    return data;
  }
  function parsePt(data) {
    return data;
  }
  const parseClass = (data) => {
    const names = [];
    function deep(d) {
      if (isArray(d)) {
        forEach(d, (value) => {
          if (isString(value)) {
            names.push(value);
          } else if (isArray(value)) {
            const _a = __read(value, 2), a = _a[0], b = _a[1];
            if (a) {
              names.push(b);
            } else {
              if (value.length > 2) {
                names.push(value[2]);
              }
            }
          } else if (isObject(value)) {
            deep(value);
          }
        });
      }
      if (isObject(d)) {
        forInObject(d, (value, key) => {
          if (value == true && key != "") {
            names.push(key.trim());
          }
        });
      }
    }
    deep(data);
    return names.join(" ");
  };
  function parseToObject(data) {
    return JSON.parse(JSON.stringify(data || {}));
  }
  const rpx2px = (rpx) => {
    let px;
    px = uni.rpx2px(rpx);
    return px;
  };
  const parseRpx = (val) => {
    if (typeof val == "number") {
      return val + "rpx";
    }
    return val;
  };
  const getNum = (val) => {
    var _a;
    const match = val.match(/-?\d+(\.\d+)?/);
    return match != null ? parseFloat((_a = match[0]) !== null && _a !== void 0 ? _a : "0") : 0;
  };
  const getUnit = (val) => {
    const num = getNum(val);
    return val.replace("".concat(num), "");
  };
  const getPx = (val) => {
    if (typeof val == "number") {
      return rpx2px(val);
    }
    const num = getNum(val);
    const unit = getUnit(val);
    if (unit == "rpx") {
      return rpx2px(num);
    }
    return num;
  };
  const config$1 = vue.reactive({
    fontSize: null,
    zIndex: 600,
    startDate: "2000-01-01 00:00:00",
    endDate: "2050-12-31 23:59:59",
    isCustomTabBar: false,
    backTop: true
  });
  function hasCustomTabBar() {
    if (router.isTabPage()) {
      return config$1.isCustomTabBar || isH5();
    }
    return false;
  }
  function getSafeAreaHeight(type) {
    const safeAreaInsets = uni.getWindowInfo().safeAreaInsets;
    let h;
    if (type == "top") {
      h = safeAreaInsets.top;
    } else {
      h = safeAreaInsets.bottom;
    }
    return h;
  }
  function getTabBarHeight() {
    let h = ctx.tabBar.height == null ? 50 : getPx(ctx.tabBar.height);
    if (hasCustomTabBar()) {
      h += getSafeAreaHeight("bottom");
    }
    return h;
  }
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
     *   uni.__log__('log','at uni_modules/cool-unix/cool/utils/storage.ts:20',userData);
     * }
     */
    get(key) {
      return uni.getStorageSync(key);
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
     * uni.__log__('log','at uni_modules/cool-unix/cool/utils/storage.ts:37','所有存储数据：', allData);
     */
    info() {
      const info = uni.getStorageInfoSync();
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
      uni.setStorageSync(key, value);
      if (expires > 0) {
        const expireTime = (/* @__PURE__ */ new Date()).getTime() + expires * 1e3;
        uni.setStorageSync("".concat(key).concat(EXPIRES_SUFFIX), expireTime);
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
     *   uni.__log__('log','at uni_modules/cool-unix/cool/utils/storage.ts:88','token已过期');
     * }
     */
    isExpired(key) {
      const value = uni.getStorageSync("".concat(key).concat(EXPIRES_SUFFIX));
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
      uni.removeStorageSync(key);
      uni.removeStorageSync("".concat(key).concat(EXPIRES_SUFFIX));
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
      uni.clearStorageSync();
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
  const ctx = parse$1({
    "pages": [
      {
        "path": "pages/index/home",
        "style": {
          "navigationStyle": "custom"
        },
        "meta": {
          "isAuth": true
        }
      },
      {
        "path": "pages/index/equip",
        "style": {
          "navigationStyle": "custom"
        },
        "meta": {
          "isAuth": true
        }
      },
      {
        "path": "pages/index/work",
        "style": {
          "navigationStyle": "custom"
        },
        "meta": {
          "isAuth": true
        }
      },
      {
        "path": "pages/index/message",
        "style": {
          "navigationStyle": "custom",
          "enablePullDownRefresh": true
        },
        "meta": {
          "isAuth": true
        }
      },
      {
        "path": "pages/index/my",
        "style": {
          "navigationStyle": "custom"
        },
        "meta": {
          "isAuth": true
        }
      }
    ],
    "subPackages": [
      {
        "root": "pages/set",
        "pages": [
          {
            "path": "index",
            "style": {
              "navigationBarTitleText": "设置"
            },
            "meta": {
              "isAuth": true
            }
          },
          {
            "path": "general",
            "style": {
              "navigationBarTitleText": "通用设置"
            },
            "meta": {
              "isAuth": true
            }
          },
          {
            "path": "notice",
            "style": {
              "navigationBarTitleText": "通知设置"
            },
            "meta": {
              "isAuth": true
            }
          },
          {
            "path": "about",
            "style": {
              "navigationBarTitleText": ""
            },
            "meta": {
              "isAuth": true
            }
          },
          {
            "path": "cs",
            "style": {
              "navigationBarTitleText": "联系技术"
            },
            "meta": {
              "isAuth": true
            }
          }
        ]
      },
      {
        "root": "pages/user",
        "pages": [
          {
            "path": "login",
            "style": {
              "navigationStyle": "custom",
              "disableScroll": true
            }
          }
        ]
      },
      {
        "root": "pages/equip",
        "pages": [
          {
            "path": "equip_detail",
            "style": {
              "navigationStyle": "custom",
              "disableScroll": true
            }
          },
          {
            "path": "workshop_tree",
            "style": {
              "navigationStyle": "custom",
              "disableScroll": true
            }
          },
          {
            "path": "equip_collect",
            "style": {
              "navigationStyle": "custom",
              "disableScroll": true
            }
          },
          {
            "path": "workshop_scada",
            "style": {
              "navigationStyle": "default",
              "navigationBarTitleText": "工艺组态",
              "disableScroll": true
            }
          }
        ]
      },
      {
        "root": "pages/message",
        "pages": [
          {
            "path": "message_detail",
            "style": {
              "navigationStyle": "custom",
              "disableScroll": true
            }
          }
        ]
      }
    ],
    "globalStyle": {
      "navigationBarTitleText": "OEMES",
      "navigationBarTextStyle": "@navTextStyle",
      "backgroundColorContent": "@bgContentColor",
      "backgroundColor": "@bgColor",
      "navigationBarBackgroundColor": "@navBgColor"
    },
    "tabBar": {
      "custom": true,
      "color": "@tabColor",
      "selectedColor": "@tabSelectedColor",
      "backgroundColor": "@tabBgColor",
      "borderStyle": "@tabBorderStyle",
      "height": "60px",
      "list": [
        {
          "pagePath": "pages/index/home",
          "iconPath": "/static/icon/tabbar/home.png",
          "selectedIconPath": "/static/icon/tabbar/home2.png",
          "text": "首页"
        },
        {
          "pagePath": "pages/index/equip",
          "iconPath": "/static/icon/tabbar/equip.png",
          "selectedIconPath": "/static/icon/tabbar/equip2.png",
          "text": "设备"
        },
        {
          "pagePath": "pages/index/work",
          "iconPath": "/static/icon/tabbar/work.png",
          "selectedIconPath": "/static/icon/tabbar/work2.png",
          "text": "场景"
        },
        {
          "pagePath": "pages/index/message",
          "iconPath": "/static/icon/tabbar/message.png",
          "selectedIconPath": "/static/icon/tabbar/message2.png",
          "text": "消息"
        },
        {
          "pagePath": "pages/index/my",
          "iconPath": "/static/icon/tabbar/my.png",
          "selectedIconPath": "/static/icon/tabbar/my2.png",
          "text": "我的"
        }
      ]
    },
    "uniIdRouter": {},
    "appid": "__UNI__63FBDF4",
    "theme": {
      "light": {
        "bgColor": "#f8f8f8",
        "bgContentColor": "#f8f8f8",
        "navBgColor": "#ffffff",
        "navTextStyle": "black",
        "tabColor": "#999999",
        "tabSelectedColor": "#14b8a6",
        "tabBorderStyle": "white",
        "tabBgColor": "#ffffff"
      },
      "dark": {
        "bgColor": "#191919",
        "bgContentColor": "#191919",
        "navBgColor": "#191919",
        "navTextStyle": "white",
        "tabColor": "#cccccc",
        "tabSelectedColor": "#ffffff",
        "tabBorderStyle": "black",
        "tabBgColor": "#191919"
      }
    },
    "color": {
      "primary-50": "#f0fdfa",
      "primary-100": "#ccfbf1",
      "primary-200": "#99f6e4",
      "primary-300": "#5eead4",
      "primary-400": "#2dd4bf",
      "primary-500": "#14b8a6",
      "primary-600": "#0d9488",
      "primary-700": "#0f766e",
      "primary-800": "#115e59",
      "primary-900": "#134e4a",
      "primary-950": "#042f2e",
      "surface": "#ffffff",
      "surface-50": "#fafafa",
      "surface-100": "#f4f4f5",
      "surface-200": "#e4e4e7",
      "surface-300": "#d4d4d8",
      "surface-400": "#a1a1aa",
      "surface-500": "#71717a",
      "surface-600": "#52525b",
      "surface-700": "#3f3f46",
      "surface-800": "#27272a",
      "surface-900": "#18181b",
      "surface-950": "#09090b"
    },
    "SAFE_CHAR_MAP_LOCALE": [
      [
        "[",
        "-bracket-start-"
      ],
      [
        "]",
        "-bracket-end-"
      ],
      [
        "(",
        "-paren-start-"
      ],
      [
        ")",
        "-paren-end-"
      ],
      [
        "{",
        "-brace-start-"
      ],
      [
        "}",
        "-brace-end-"
      ],
      [
        "$",
        "-dollar-"
      ],
      [
        "#",
        "-hash-"
      ],
      [
        "!",
        "-important-"
      ],
      [
        "/",
        "-slash-"
      ],
      [
        ":",
        "-colon-"
      ],
      [
        " ",
        "-space-"
      ],
      [
        "<",
        "-lt-"
      ],
      [
        ">",
        "-gt-"
      ],
      [
        "&",
        "-amp-"
      ],
      [
        "|",
        "-pipe-"
      ],
      [
        "^",
        "-caret-"
      ],
      [
        "~",
        "-tilde-"
      ],
      [
        "`",
        "-backtick-"
      ],
      [
        "'",
        "-single-quote-"
      ],
      [
        ".",
        "-dot-"
      ],
      [
        "?",
        "-question-"
      ],
      [
        "*",
        "-star-"
      ],
      [
        "+",
        "-plus-"
      ],
      [
        "-",
        "-dash-"
      ],
      [
        "_",
        "-underscore-"
      ],
      [
        "=",
        "-equal-"
      ],
      [
        "%",
        "-percent-"
      ],
      [
        "@",
        "-at-"
      ]
    ]
  });
  let PAGES = [...ctx.pages];
  if (isArray(ctx.subPackages)) {
    ctx.subPackages.forEach((a) => {
      a.pages.forEach((b) => {
        PAGES.push({
          path: a.root + "/" + b.path,
          style: b.style,
          meta: b.meta
        });
      });
    });
  }
  PAGES.forEach((e) => {
    if (!e.path.startsWith("/")) {
      e.path = "/" + e.path;
    }
  });
  let TABS = [];
  if (ctx.tabBar.list != null) {
    TABS = ctx.tabBar.list;
    TABS.forEach((e) => {
      if (!e.pagePath.startsWith("/")) {
        e.pagePath = "/" + e.pagePath;
      }
    });
  }
  class Router {
    constructor() {
      this.eventsMap = {};
      this.login = debounce(() => {
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
      return (_a = storage.get("router-params")) !== null && _a !== void 0 ? _a : {};
    }
    // 获取传递的 query 参数
    query() {
      var _a, _b;
      return (_b = (_a = this.route()) === null || _a === void 0 ? void 0 : _a.query) !== null && _b !== void 0 ? _b : {};
    }
    // 获取默认路径，支持 home 和 login
    defaultPath(name) {
      const paths = {
        home: PAGES[0].path,
        login: "/pages/user/login"
      };
      return get(paths, name);
    }
    // 获取当前页面栈的所有页面实例
    getPages() {
      return map(getCurrentPages(), (e) => {
        let path = e.route;
        if (path == "/") {
          path = this.defaultPath("home");
        }
        if (!path.startsWith("/")) {
          path = "/" + path;
        }
        const page = PAGES.find((e2) => {
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
      return last(this.getPages());
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
      if (!isEmpty(query)) {
        const arr = toArray(query, (v, k) => {
          return "".concat(k, "=").concat(v);
        });
        path += "?" + arr.join("&");
      }
      if (!isEmpty(params)) {
        storage.set("router-params", params, 0);
      }
      if (this.isTabPage(path)) {
        mode = "switchTab";
      }
      const next = () => {
        switch (mode) {
          case "navigateTo":
            uni.navigateTo({
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
            uni.redirectTo({
              url: path,
              success,
              fail,
              complete
            });
            break;
          case "reLaunch":
            uni.reLaunch({
              url: path,
              success,
              fail,
              complete
            });
            break;
          case "switchTab":
            uni.switchTab({
              url: path,
              success,
              fail,
              complete
            });
            break;
        }
      };
      if (this.eventsMap.beforeEach != null) {
        const from = last(this.getPages());
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
          uni.navigateBack(Object.assign({}, options !== null && options !== void 0 ? options : {}));
        };
        if (this.eventsMap.beforeEach != null) {
          const from = last(this.getPages());
          const to = nth(this.getPages(), -delta - 1);
          if (to != null) {
            this.eventsMap.beforeEach({
              path: to.path,
              query: to.query,
              meta: (_b = to.meta) !== null && _b !== void 0 ? _b : {}
            }, from, next);
          } else {
            uni.__log__("error", "at uni_modules/cool-unix/cool/router/index.ts:244", "[router] found to page is null");
          }
        } else {
          next();
        }
      }
    }
    // 获取页面元数据
    getMeta(path) {
      var _a, _b;
      return (_b = (_a = PAGES.find((e) => {
        return e.path.includes(path);
      })) === null || _a === void 0 ? void 0 : _a.meta) !== null && _b !== void 0 ? _b : {};
    }
    // 执行当前页面暴露的方法
    callMethod(name, data) {
      const fn = get(this.route(), "$vm.$.exposed.".concat(name));
      if (isFunction(fn)) {
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
      return !isNull(TABS.find((e) => {
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
      uni.$emit("afterLogin");
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
  class Scroller {
    constructor() {
      this.list = /* @__PURE__ */ new Map();
      this.off = (callback) => {
        var _a;
        const path = router.path();
        const cbs = (_a = this.list.get(path)) !== null && _a !== void 0 ? _a : [];
        this.list.set(path, cbs.filter((cb) => {
          return cb != callback;
        }));
      };
    }
    // 触发滚动
    emit(top) {
      var _a;
      const cbs = (_a = this.list.get(router.path())) !== null && _a !== void 0 ? _a : [];
      cbs.forEach((cb) => {
        cb(top);
      });
    }
    // 监听页面滚动
    on(callback) {
      var _a;
      const path = router.path();
      const cbs = (_a = this.list.get(path)) !== null && _a !== void 0 ? _a : [];
      cbs.push(callback);
      this.list.set(path, cbs);
    }
  }
  const scroller = new Scroller();
  const BEZIER_SPLINE_SIZE = 11;
  const BEZIER_SAMPLE_STEP = 1 / (BEZIER_SPLINE_SIZE - 1);
  function getBezierCoefficientA(x1, x2) {
    return 1 - 3 * x2 + 3 * x1;
  }
  function getBezierCoefficientB(x1, x2) {
    return 3 * x2 - 6 * x1;
  }
  function getBezierCoefficientC(x1) {
    return 3 * x1;
  }
  function calculateBezierValue(t2, x1, x2) {
    const a = getBezierCoefficientA(x1, x2);
    const b = getBezierCoefficientB(x1, x2);
    const c = getBezierCoefficientC(x1);
    return ((a * t2 + b) * t2 + c) * t2;
  }
  function getBezierSlope(t2, x1, x2) {
    const a = getBezierCoefficientA(x1, x2);
    const b = getBezierCoefficientB(x1, x2);
    const c = getBezierCoefficientC(x1);
    return 3 * a * t2 * t2 + 2 * b * t2 + c;
  }
  function binarySearchBezierT(targetX, startT, endT, x1, x2) {
    let currentX;
    let currentT;
    let iterations = 0;
    const maxIterations = 10;
    const precision = 1e-7;
    do {
      currentT = startT + (endT - startT) / 2;
      currentX = calculateBezierValue(currentT, x1, x2) - targetX;
      if (currentX > 0) {
        endT = currentT;
      } else {
        startT = currentT;
      }
      iterations++;
    } while (Math.abs(currentX) > precision && iterations < maxIterations);
    return currentT;
  }
  function newtonRaphsonBezierT(targetX, initialGuess, x1, x2) {
    let t2 = initialGuess;
    const maxIterations = 4;
    for (let i = 0; i < maxIterations; i++) {
      const slope = getBezierSlope(t2, x1, x2);
      if (slope == 0) {
        return t2;
      }
      const currentX = calculateBezierValue(t2, x1, x2) - targetX;
      t2 = t2 - currentX / slope;
    }
    return t2;
  }
  function createBezierEasing(x1, y1, x2, y2) {
    if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) {
      return null;
    }
    const sampleValues = [];
    if (x1 != y1 || x2 != y2) {
      for (let i = 0; i < BEZIER_SPLINE_SIZE; i++) {
        sampleValues.push(calculateBezierValue(i * BEZIER_SAMPLE_STEP, x1, x2));
      }
    }
    function getTParameterForX(x) {
      let intervalStart = 0;
      let currentSample = 1;
      const lastSample = BEZIER_SPLINE_SIZE - 1;
      for (; currentSample != lastSample && sampleValues[currentSample] <= x; currentSample++) {
        intervalStart += BEZIER_SAMPLE_STEP;
      }
      currentSample--;
      const dist = (x - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      const initialGuess = intervalStart + dist * BEZIER_SAMPLE_STEP;
      const initialSlope = getBezierSlope(initialGuess, x1, x2);
      if (initialSlope >= 1e-3) {
        return newtonRaphsonBezierT(x, initialGuess, x1, x2);
      } else if (initialSlope == 0) {
        return initialGuess;
      }
      return binarySearchBezierT(x, intervalStart, intervalStart + BEZIER_SAMPLE_STEP, x1, x2);
    }
    return function(progress) {
      if (x1 == y1 && x2 == y2) {
        return progress;
      }
      if (progress == 0 || progress == 1) {
        return progress;
      }
      return calculateBezierValue(getTParameterForX(progress), y1, y2);
    };
  }
  function getDefaultColor(colorValue) {
    if (colorValue.startsWith("#")) {
      return colorValue;
    }
    if (colorValue.startsWith("rgb")) {
      return colorValue;
    }
    return "#000000";
  }
  function hexToRgb(hex) {
    var _a, _b, _c;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result != null) {
      return {
        r: parseInt((_a = result[1]) !== null && _a !== void 0 ? _a : "0", 16),
        g: parseInt((_b = result[2]) !== null && _b !== void 0 ? _b : "0", 16),
        b: parseInt((_c = result[3]) !== null && _c !== void 0 ? _c : "0", 16),
        a: 1
        // 透明度，默认不透明
      };
    }
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  }
  class AnimationEngine {
    /**
     * 创建动画引擎实例
     * 初始化动画引擎，设置目标元素和动画配置
     * @param element 目标DOM元素，null时仅做计算不应用样式
     * @param options 动画配置选项，包含持续时间、缓动函数等
     */
    constructor(element, options) {
      this.easingPresets = /* @__PURE__ */ new Map([
        ["linear", [0, 0, 1, 1]],
        ["ease", [0.25, 0.1, 0.25, 1]],
        ["easeIn", [0.42, 0, 1, 1]],
        ["easeOut", [0, 0, 0.58, 1]],
        ["easeInOut", [0.42, 0, 0.58, 1]],
        ["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
        ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
        ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
        ["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
        ["easeOutCubic", [0.215, 0.61, 0.355, 1]],
        ["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
        ["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
        ["easeOutQuart", [0.165, 0.84, 0.44, 1]],
        ["easeInOutQuart", [0.77, 0, 0.175, 1]],
        ["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
        ["easeOutQuint", [0.23, 1, 0.32, 1]],
        ["easeInOutQuint", [0.86, 0, 0.07, 1]],
        ["easeInSine", [0.47, 0, 0.745, 0.715]],
        ["easeOutSine", [0.39, 0.575, 0.565, 1]],
        ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
        ["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
        ["easeOutExpo", [0.19, 1, 0.22, 1]],
        ["easeInOutExpo", [1, 0, 0, 1]],
        ["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
        ["easeOutCirc", [0.075, 0.82, 0.165, 1]],
        ["easeInOutBack", [0.68, -0.55, 0.265, 1.55]]
        // 回弹效果
      ]);
      this.targetElement = null;
      this.animationDuration = 500;
      this.isRunning = false;
      this.isPaused = false;
      this.currentProgress = 0;
      this.isReversed = false;
      this.isAlternate = false;
      this.isAlternateReversed = false;
      this.loopCount = 1;
      this.currentLoop = 0;
      this.isStopping = true;
      this.currentAttributeIndex = 0;
      this.onComplete = () => {
      };
      this.onStart = () => {
      };
      this.onFrame = () => {
      };
      this.animationAttributes = [];
      this.startTimestamp = 0;
      this.currentEasingFunction = null;
      this.isSequentialMode = false;
      this.displayLinkTimer = 0;
      this.animationFrameId = null;
      this.targetElement = element;
      this.animationDuration = options.duration != null ? options.duration : this.animationDuration;
      this.loopCount = options.loop != null ? options.loop : this.loopCount;
      this.isAlternate = options.alternate != null ? options.alternate : this.isAlternate;
      this.isSequentialMode = options.sequential != null ? options.sequential : this.isSequentialMode;
      if (options.timingFunction != null) {
        const easingParams = this.easingPresets.get(options.timingFunction);
        if (easingParams != null) {
          this.currentEasingFunction = createBezierEasing(
            easingParams[0],
            // x1坐标
            easingParams[1],
            // y1坐标
            easingParams[2],
            // x2坐标
            easingParams[3]
            // y2坐标
          );
        }
      }
      if (options.bezier != null && options.bezier.length == 4) {
        this.currentEasingFunction = createBezierEasing(
          options.bezier[0],
          // 自定义x1坐标
          options.bezier[1],
          // 自定义y1坐标
          options.bezier[2],
          // 自定义x2坐标
          options.bezier[3]
          // 自定义y2坐标
        );
      }
      if (options.complete != null) {
        this.onComplete = options.complete;
      }
      if (options.start != null) {
        this.onStart = options.start;
      }
      if (options.frame != null) {
        this.onFrame = options.frame;
      }
    }
    /**
     * 从样式值中提取单位
     * 解析CSS值中的单位部分，用于动画计算
     * @param value 样式值，如 "100px", "50%"
     * @param propertyName CSS属性名称，用于判断是否需要默认单位
     * @returns 单位字符串
     */
    extractUnit(value, propertyName) {
      if (value == null)
        return "px";
      const unit = value.replace(/[\d|\-|\+|\.]/g, "");
      if (propertyName == "opacity" || propertyName == "z-index") {
        return "";
      }
      return unit == "" ? "px" : unit;
    }
    /**
     * 添加自定义缓动函数
     * 向引擎注册新的缓动函数，可在后续动画中使用
     * @param name 缓动函数名称
     * @param bezierParams 贝塞尔曲线参数 [x1, y1, x2, y2]
     */
    addCustomEasing(name, bezierParams) {
      if (bezierParams.length == 4) {
        this.easingPresets.set(name, bezierParams);
      }
      return this;
    }
    /**
     * 设置动画反向播放
     * 控制动画从结束值向起始值播放
     * @param reverse 是否反向播放，null表示切换当前状态
     */
    setReverse(reverse = null) {
      if (reverse != null) {
        this.isReversed = reverse;
      } else {
        this.isReversed = !this.isReversed;
      }
      return this;
    }
    /**
     * 设置循环播放次数
     * 控制动画重复执行的次数
     * @param count 循环次数，-1表示无限循环
     */
    setLoopCount(count) {
      this.loopCount = count;
      return this;
    }
    /**
     * 设置动画持续时间
     * 控制动画从开始到结束的总时长
     * @param duration 持续时间(毫秒)
     */
    setDuration(duration) {
      this.animationDuration = duration;
      return this;
    }
    /**
     * 设置往返播放模式
     * 控制动画是否在每次循环时反向播放
     * @param alternate 是否往返播放
     */
    setAlternate(alternate) {
      this.isAlternate = alternate;
      return this;
    }
    /**
     * 设置顺序执行模式
     * 控制多个属性是同时动画还是依次动画
     * @param sequential 是否按属性顺序依次执行
     */
    setSequential(sequential) {
      this.isSequentialMode = sequential;
      return this;
    }
    /**
     * 添加动画属性
     * 向动画引擎添加一个CSS属性的动画配置
     * @param propertyName CSS属性名称
     * @param fromValue 起始值(支持数字+单位，如"100px"、"50%")
     * @param toValue 结束值(单位必须与起始值一致)
     * @param unique 是否唯一，true时同名属性会被替换
     */
    addAttribute(propertyName, fromValue, toValue, unique = true) {
      const isColor = this.isColorProperty(propertyName);
      const unit = isColor ? "" : this.extractUnit(fromValue, propertyName);
      const processedFromValue = isColor ? getDefaultColor(fromValue) : parseFloat(fromValue).toString();
      const processedToValue = isColor ? getDefaultColor(toValue) : parseFloat(toValue).toString();
      let existingIndex = this.animationAttributes.findIndex((attr) => {
        return attr.propertyName == propertyName;
      });
      if (!unique) {
        existingIndex = -1;
      }
      const newAttribute = {
        fromValue: processedFromValue,
        toValue: processedToValue,
        unit,
        progress: 0,
        currentValue: processedFromValue,
        propertyName
        // 属性名称
      };
      if (existingIndex == -1) {
        this.animationAttributes.push(newAttribute);
      } else {
        this.animationAttributes[existingIndex] = newAttribute;
      }
      return this;
    }
    /**
     * 快捷方法：添加变换属性
     */
    transform(property, fromValue, toValue) {
      return this.addAttribute(property, fromValue, toValue);
    }
    /**
     * 快捷方法：添加位移动画
     */
    translate(fromX, fromY, toX, toY) {
      this.addAttribute("translateX", fromX, toX);
      this.addAttribute("translateY", fromY, toY);
      return this;
    }
    /**
     * 添加X轴位移动画
     * @param fromX 起始X位置，可以使用"current"表示当前位置
     * @param toX 结束X位置
     * @returns
     */
    translateX(fromX, toX) {
      return this.addAttribute("translateX", fromX, toX);
    }
    /**
     * 添加Y轴位移动画
     * @param fromY 起始Y位置，可以使用"current"表示当前位置
     * @param toY 结束Y位置
     * @returns
     */
    translateY(fromY, toY) {
      return this.addAttribute("translateY", fromY, toY);
    }
    /**
     * 快捷方法：添加缩放动画
     */
    scale(fromScale, toScale) {
      return this.addAttribute("scale", fromScale, toScale);
    }
    /**
     * 快捷方法：添加旋转动画
     */
    rotate(fromDegree, toDegree) {
      return this.addAttribute("rotate", fromDegree, toDegree);
    }
    /**
     * 快捷方法：添加透明度动画
     */
    opacity(fromOpacity, toOpacity) {
      return this.addAttribute("opacity", fromOpacity, toOpacity);
    }
    /**
     * 线性插值计算
     * 根据进度在两个数值之间进行插值，用于计算动画中间值
     * @param startValue 起始值
     * @param endValue 结束值
     * @param progress 进度 (0-1)
     */
    interpolateValue(startValue, endValue, progress) {
      return startValue + (endValue - startValue) * progress;
    }
    /**
     * 判断是否为颜色相关属性
     * 检测CSS属性名是否与颜色相关，用于特殊的颜色动画处理
     * @param propertyName 属性名称
     */
    isColorProperty(propertyName) {
      return propertyName.indexOf("background") > -1 || // 背景颜色相关
      propertyName.indexOf("color") > -1 || // 文字颜色相关
      propertyName.indexOf("border-color") > -1 || // 边框颜色相关
      propertyName.indexOf("shadow") > -1;
    }
    /**
     * 判断是否为Transform相关属性
     * 检测属性名是否为transform相关的CSS属性
     * @param propertyName CSS属性名称
     * @returns 是否为transform属性
     */
    isTransformProperty(propertyName) {
      return propertyName == "scaleX" || // X轴缩放
      propertyName == "scaleY" || // Y轴缩放
      propertyName == "scale" || // 等比缩放
      propertyName == "rotateX" || // X轴旋转
      propertyName == "rotateY" || // Y轴旋转
      propertyName == "rotate" || // Z轴旋转
      propertyName == "translateX" || // X轴位移
      propertyName == "translateY" || // Y轴位移
      propertyName == "translate";
    }
    /**
     * 设置元素样式属性
     * 根据属性类型应用相应的样式值，支持transform、颜色、普通数值属性
     * @param propertyName 属性名称
     * @param currentValue 当前值
     * @param unit 单位
     * @param progress 动画进度
     * @param attribute 动画属性对象
     */
    setElementProperty(propertyName, currentValue, unit, progress, attribute) {
      if (this.targetElement == null)
        return;
      const element = this.targetElement;
      const valueStr = currentValue.toFixed(2);
      switch (propertyName) {
        case "scaleX":
          element.style.setProperty("transform", "scaleX(".concat(currentValue, ")"));
          break;
        case "scaleY":
          element.style.setProperty("transform", "scaleY(".concat(currentValue, ")"));
          break;
        case "scale":
          element.style.setProperty("transform", "scale(".concat(currentValue, ")"));
          break;
        case "rotateX":
          element.style.setProperty("transform", "rotateX(".concat(valueStr + unit, ")"));
          break;
        case "rotateY":
          element.style.setProperty("transform", "rotateY(".concat(valueStr + unit, ")"));
          break;
        case "rotate":
          element.style.setProperty("transform", "rotate(".concat(valueStr + unit, ")"));
          break;
        case "translateX":
          element.style.setProperty("transform", "translateX(".concat(valueStr + unit, ")"));
          break;
        case "translateY":
          element.style.setProperty("transform", "translateY(".concat(valueStr + unit, ")"));
          break;
        case "translate":
          element.style.setProperty("transform", "translate(".concat(valueStr + unit, ",").concat(valueStr + unit, ")"));
          break;
        default:
          if (this.isColorProperty(propertyName)) {
            const startColor = hexToRgb(attribute.fromValue);
            const endColor = hexToRgb(attribute.toValue);
            const startR = startColor.getNumber != null ? startColor.getNumber("r") : startColor["r"];
            const startG = startColor.getNumber != null ? startColor.getNumber("g") : startColor["g"];
            const startB = startColor.getNumber != null ? startColor.getNumber("b") : startColor["b"];
            const startA = startColor.getNumber != null ? startColor.getNumber("a") : startColor["a"];
            const endR = endColor.getNumber != null ? endColor.getNumber("r") : endColor["r"];
            const endG = endColor.getNumber != null ? endColor.getNumber("g") : endColor["g"];
            const endB = endColor.getNumber != null ? endColor.getNumber("b") : endColor["b"];
            const endA = endColor.getNumber != null ? endColor.getNumber("a") : endColor["a"];
            const r = this.interpolateValue(startR != null ? startR : 0, endR != null ? endR : 0, progress);
            const g = this.interpolateValue(startG != null ? startG : 0, endG != null ? endG : 0, progress);
            const b = this.interpolateValue(startB != null ? startB : 0, endB != null ? endB : 0, progress);
            const a = this.interpolateValue(startA != null ? startA : 1, endA != null ? endA : 1, progress);
            element.style.setProperty(propertyName, "rgba(".concat(r.toFixed(0), ",").concat(g.toFixed(0), ",").concat(b.toFixed(0), ",").concat(a.toFixed(1), ")"));
          } else {
            element.style.setProperty(propertyName, valueStr + unit);
          }
          break;
      }
    }
    /**
     * Web平台动画运行方法 (H5/iOS/Harmony)
     * 使用requestAnimationFrame实现流畅的动画循环
     */
    runWebAnimation() {
      const self = this;
      self.startTimestamp = 0;
      if (self.animationFrameId != null) {
        cancelAnimationFrame(self.animationFrameId);
      }
      function animationLoop() {
        if (self.startTimestamp <= 0) {
          self.startTimestamp = Date.now();
        }
        const elapsed = Date.now() - self.startTimestamp;
        const progress = Math.min(elapsed / self.animationDuration + self.currentProgress, 1);
        self.updateAnimationFrame(progress);
        if (self.isPaused) {
          self.isRunning = false;
          self.currentProgress = progress;
          uni.__log__("log", "at uni_modules/cool-unix/cool/animation/index.ts:860", "动画已暂停");
          return;
        }
        if (progress >= 1 || self.isStopping) {
          self.handleAnimationComplete();
          return;
        }
        if (progress < 1 && self.isRunning) {
          self.onFrame(progress);
          self.animationFrameId = requestAnimationFrame(animationLoop);
        }
      }
      self.onStart();
      animationLoop();
    }
    /**
     * 更新动画帧
     * 根据执行模式更新所有或当前属性的动画值
     * @param progress 当前进度 (0-1)
     */
    updateAnimationFrame(progress) {
      if (this.targetElement == null)
        return;
      if (!this.isSequentialMode) {
        for (let i = 0; i < this.animationAttributes.length; i++) {
          this.updateSingleAttribute(this.animationAttributes[i], progress);
        }
      } else {
        if (this.currentAttributeIndex < this.animationAttributes.length) {
          this.updateSingleAttribute(this.animationAttributes[this.currentAttributeIndex], progress);
        }
      }
    }
    /**
     * 更新单个属性的动画
     * 计算属性的当前值并应用到元素上
     * @param attribute 动画属性
     * @param progress 进度
     */
    updateSingleAttribute(attribute, progress) {
      attribute.progress = progress;
      if (!this.isColorProperty(attribute.propertyName)) {
        const fromValue = parseFloat(attribute.fromValue);
        const toValue_1 = parseFloat(attribute.toValue);
        let easedProgress = progress;
        if (this.currentEasingFunction != null) {
          easedProgress = this.currentEasingFunction(progress);
        }
        let currentValue = this.interpolateValue(fromValue, toValue_1, easedProgress);
        if (this.isReversed || this.isAlternateReversed) {
          currentValue = this.interpolateValue(toValue_1, fromValue, easedProgress);
        }
        this.setElementProperty(attribute.propertyName, currentValue, attribute.unit, progress, attribute);
      } else {
        this.setElementProperty(attribute.propertyName, 0, attribute.unit, progress, attribute);
      }
    }
    /**
     * 处理动画完成
     */
    handleAnimationComplete() {
      if (this.isSequentialMode && this.currentAttributeIndex < this.animationAttributes.length - 1) {
        this.currentAttributeIndex++;
        this.currentProgress = 0;
        this.restartAnimation();
        return;
      }
      if (this.animationFrameId != null) {
        cancelAnimationFrame(this.animationFrameId);
      }
      this.currentAttributeIndex = 0;
      this.currentProgress = 0;
      if (this.isAlternate) {
        this.isAlternateReversed = !this.isAlternateReversed;
      }
      if (this.loopCount == -1) {
        this.restartAnimation();
        return;
      } else {
        this.currentLoop++;
        if (this.currentLoop < this.loopCount) {
          this.restartAnimation();
          return;
        }
      }
      this.isRunning = false;
      this.onComplete();
    }
    /**
     * 根据平台重新启动动画
     */
    restartAnimation() {
      this.startTimestamp = 0;
      this.runWebAnimation();
    }
    /**
     * Android平台动画运行方法
     */
    runAndroidAnimation() {
    }
    /**
     * 小程序平台动画运行方法
     */
    runMPAnimation() {
    }
    /**
     * 开始播放动画
     */
    play() {
      if (this.isRunning)
        return this;
      this.isRunning = true;
      this.isStopping = false;
      this.isPaused = false;
      this.currentLoop = 0;
      this.currentAttributeIndex = 0;
      this.runWebAnimation();
      return this;
    }
    /**
     * 异步播放动画，支持await
     * @returns Promise，动画完成时resolve
     */
    playAsync() {
      return new Promise((resolve) => {
        const originalComplete = this.onComplete;
        this.onComplete = () => {
          originalComplete();
          resolve();
        };
        this.play();
      });
    }
    /**
     * 停止动画
     * 会立即停止动画并跳转到结束状态
     */
    stop() {
      this.isStopping = true;
      this.currentProgress = 0;
      this.currentAttributeIndex = this.animationAttributes.length;
      if (this.animationFrameId != null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      this.isRunning = false;
      return this;
    }
    /**
     * 暂停动画
     * 保留当前状态，可以通过play()恢复
     */
    pause() {
      this.isPaused = true;
      return this;
    }
    /**
     * 恢复暂停的动画
     */
    resume() {
      if (this.isPaused) {
        this.isPaused = false;
        this.play();
      }
      return this;
    }
    /**
     * 清空应用到元素上的动画样式
     * 只清空实际被动画引擎设置过的CSS属性
     */
    clearElementStyles() {
      var e_1, _a;
      if (this.targetElement == null)
        return;
      const element = this.targetElement;
      try {
        for (var _b = __values(this.animationAttributes), _c = _b.next(); !_c.done; _c = _b.next()) {
          var attr = _c.value;
          const propertyName = attr.propertyName;
          if (this.isTransformProperty(propertyName)) {
            element.style.setProperty("transform", "");
          } else {
            element.style.setProperty(propertyName, "");
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    }
    /**
     * 重置动画到初始状态，清空所有内容
     */
    reset() {
      this.stop();
      this.clearElementStyles();
      this.currentProgress = 0;
      this.currentLoop = 0;
      this.currentAttributeIndex = 0;
      this.isAlternateReversed = false;
      this.isReversed = false;
      this.isPaused = false;
      this.isStopping = true;
      this.startTimestamp = 0;
      this.animationAttributes = [];
      this.currentEasingFunction = null;
      this.onComplete = () => {
      };
      this.onStart = () => {
      };
      this.onFrame = () => {
      };
      if (this.animationFrameId != null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      return this;
    }
    /**
     * 获取当前动画进度
     */
    getProgress() {
      return this.currentProgress;
    }
    /**
     * 获取动画是否正在运行
     */
    isAnimating() {
      return this.isRunning;
    }
    /**
     * 获取当前循环次数
     */
    getCurrentLoop() {
      return this.currentLoop;
    }
    /**
     * 清除所有动画属性
     */
    clearAttributes() {
      this.animationAttributes = [];
      return this;
    }
    /**
     * 获取动画属性数量
     */
    getAttributeCount() {
      return this.animationAttributes.length;
    }
    /**
     * 淡入动画
     * @param duration 持续时间
     */
    fadeIn(duration = 300) {
      return this.setDuration(duration).opacity("0", "1");
    }
    /**
     * 淡出动画
     * @param duration 持续时间
     */
    fadeOut(duration = 300) {
      return this.setDuration(duration).opacity("1", "0");
    }
    /**
     * 滑入动画(从左)
     * @param duration 持续时间
     */
    slideInLeft(duration = 300) {
      return this.setDuration(duration).translateX("-100%", "0%").opacity("0", "1");
    }
    /**
     * 滑入动画(从右)
     * @param duration 持续时间
     */
    slideInRight(duration = 300) {
      return this.setDuration(duration).translateX("100%", "0%").opacity("0", "1");
    }
    /**
     * 滑入动画(从上)
     * @param duration 持续时间
     */
    slideInUp(duration = 300) {
      return this.setDuration(duration).addAttribute("translateY", "-100%", "0%").opacity("0", "1");
    }
    /**
     * 滑入动画(从下)
     * @param duration 持续时间
     */
    slideInDown(duration = 300) {
      return this.setDuration(duration).addAttribute("translateY", "100%", "0%").opacity("0", "1");
    }
    /**
     * 缩放动画(放大)
     * @param duration 持续时间
     */
    zoomIn(duration = 300) {
      return this.setDuration(duration).scale("0", "1").opacity("0", "1");
    }
    /**
     * 缩放动画(缩小)
     * @param duration 持续时间
     */
    zoomOut(duration = 300) {
      return this.setDuration(duration).scale("1", "0").opacity("1", "0");
    }
    /**
     * 旋转动画
     * @param duration 持续时间
     * @param degrees 旋转角度
     */
    rotateIn(duration = 500, degrees = 360) {
      return this.setDuration(duration).rotate("0deg", "".concat(degrees, "deg")).opacity("0", "1");
    }
    /**
     * 旋转退出动画
     * @param duration 持续时间
     * @param degrees 旋转角度
     */
    rotateOut(duration = 500, degrees = 360) {
      return this.setDuration(duration).rotate("0deg", "".concat(degrees, "deg")).opacity("1", "0");
    }
    /**
     * 弹跳动画
     * @param duration 持续时间
     */
    bounce(duration = 600) {
      return this.setDuration(duration).addCustomEasing("bounce", [0.68, -0.55, 0.265, 1.55]).scale("1", "1.1").setAlternate(true).setLoopCount(2);
    }
    /**
     * 摇摆动画
     * @param duration 持续时间
     */
    shake(duration = 500) {
      return this.setDuration(duration).addAttribute("translateX", "0px", "10px").setAlternate(true).setLoopCount(6);
    }
    /**
     * 链式动画：支持多个动画依次执行
     * @param animations 动画配置函数数组
     */
    sequence(animations) {
      const self = this;
      if (animations.length == 0) {
        return this;
      }
      const firstEngine = animations[0](new AnimationEngine(this.targetElement, {}));
      if (animations.length == 1) {
        return firstEngine;
      }
      function setNextAnimation(currentEngine, remainingAnimations) {
        if (remainingAnimations.length == 0) {
          return;
        }
        const originalComplete = currentEngine.onComplete;
        currentEngine.onComplete = () => {
          originalComplete();
          const nextEngine = remainingAnimations[0](new AnimationEngine(self.targetElement, {}));
          if (remainingAnimations.length > 1) {
            setNextAnimation(nextEngine, remainingAnimations.slice(1));
          }
          nextEngine.play();
        };
      }
      setNextAnimation(firstEngine, animations.slice(1));
      return firstEngine;
    }
    /**
     * 滑出动画(向左)
     * @param duration 持续时间
     */
    slideOutLeft(duration = 300) {
      return this.setDuration(duration).translateX("0%", "-100%").opacity("1", "0");
    }
    /**
     * 滑出动画(向右)
     * @param duration 持续时间
     */
    slideOutRight(duration = 300) {
      return this.setDuration(duration).translateX("0%", "100%").opacity("1", "0");
    }
    /**
     * 滑出动画(向上)
     * @param duration 持续时间
     */
    slideOutUp(duration = 300) {
      return this.setDuration(duration).addAttribute("translateY", "0%", "-100%").opacity("1", "0");
    }
    /**
     * 滑出动画(向下)
     * @param duration 持续时间
     */
    slideOutDown(duration = 300) {
      return this.setDuration(duration).addAttribute("translateY", "0%", "100%").opacity("1", "0");
    }
    /**
     * 翻转动画(水平)
     * @param duration 持续时间
     */
    flipX(duration = 600) {
      return this.setDuration(duration).addAttribute("rotateX", "0deg", "180deg").addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
    }
    /**
     * 翻转动画(垂直)
     * @param duration 持续时间
     */
    flipY(duration = 600) {
      return this.setDuration(duration).addAttribute("rotateY", "0deg", "180deg").addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
    }
    /**
     * 弹性进入动画
     * @param duration 持续时间
     */
    elasticIn(duration = 600) {
      return this.setDuration(duration).scale("0", "1").opacity("0", "1").addCustomEasing("elastic", [0.175, 0.885, 0.32, 1.275]);
    }
    /**
     * 弹性退出动画
     * @param duration 持续时间
     */
    elasticOut(duration = 600) {
      return this.setDuration(duration).scale("1", "0").opacity("1", "0").addCustomEasing("elastic", [0.68, -0.55, 0.265, 1.55]);
    }
    /**
     * 回弹动画
     * @param duration 持续时间
     */
    rubberBand(duration = 1e3) {
      return this.setDuration(duration).addAttribute("scaleX", "1", "1.25").addAttribute("scaleY", "1", "0.75").setAlternate(true).setLoopCount(2).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
    }
    /**
     * 摆动动画
     * @param duration 持续时间
     */
    swing(duration = 1e3) {
      return this.setDuration(duration).addAttribute("rotate", "0deg", "15deg").setAlternate(true).setLoopCount(4).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
    }
    /**
     * 抖动动画
     * @param duration 持续时间
     */
    wobble(duration = 1e3) {
      return this.setDuration(duration).addAttribute("translateX", "0px", "25px").addAttribute("rotate", "0deg", "5deg").setAlternate(true).setLoopCount(4);
    }
    /**
     * 滚动进入动画
     * @param duration 持续时间
     */
    rollIn(duration = 600) {
      return this.setDuration(duration).translateX("-100%", "0%").rotate("-120deg", "0deg").opacity("0", "1");
    }
    /**
     * 滚动退出动画
     * @param duration 持续时间
     */
    rollOut(duration = 600) {
      return this.setDuration(duration).translateX("0%", "100%").rotate("0deg", "120deg").opacity("1", "0");
    }
    /**
     * 灯光效果动画
     * @param duration 持续时间
     */
    lightSpeed(duration = 500) {
      return this.setDuration(duration).translateX("-100%", "0%").addAttribute("skewX", "-30deg", "0deg").opacity("0", "1").addCustomEasing("ease-out", [0.25, 0.46, 0.45, 0.94]);
    }
    /**
     * 浮动动画
     * @param duration 持续时间
     */
    float(duration = 3e3) {
      return this.setDuration(duration).translateY("0px", "-10px").setAlternate(true).setLoopCount(-1).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
    }
    /**
     * 呼吸动画
     * @param duration 持续时间
     */
    breathe(duration = 2e3) {
      return this.setDuration(duration).scale("1", "1.1").setAlternate(true).setLoopCount(-1).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
    }
    /**
     * 发光动画
     * @param duration 持续时间
     */
    glow(duration = 1500) {
      return this.setDuration(duration).addAttribute("boxShadow", "0 0 5px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,1)").setAlternate(true).setLoopCount(-1).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
    }
    /**
     * 进度条动画
     * @param duration 持续时间
     * @param progress 进度百分比 (0-100)
     */
    progressBar(duration = 1e3, progress = 100) {
      return this.setDuration(duration).addAttribute("width", "0%", "".concat(progress, "%")).addCustomEasing("ease-out", [0.25, 0.46, 0.45, 0.94]);
    }
    /**
     * 模态框进入动画
     * @param duration 持续时间
     */
    modalIn(duration = 300) {
      return this.setDuration(duration).scale("0.7", "1").opacity("0", "1").addCustomEasing("ease-out", [0.25, 0.46, 0.45, 0.94]);
    }
    /**
     * 模态框退出动画
     * @param duration 持续时间
     */
    modalOut(duration = 300) {
      return this.setDuration(duration).scale("1", "0.7").opacity("1", "0").addCustomEasing("ease-in", [0.42, 0, 1, 1]);
    }
    /**
     * 卡片翻转动画
     * @param duration 持续时间
     */
    cardFlip(duration = 600) {
      return this.setDuration(duration).addAttribute("rotateY", "0deg", "180deg").addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
    }
    /**
     * 波纹扩散动画
     * @param duration 持续时间
     */
    ripple(duration = 600) {
      return this.setDuration(duration).scale("0", "4").opacity("0.7", "0").addCustomEasing("ease-out", [0.25, 0.46, 0.45, 0.94]);
    }
  }
  function createAnimation(element, options = {}) {
    return new AnimationEngine(element, options);
  }
  const isDark = vue.ref(false);
  const useCache = (source) => {
    const cache = vue.reactive({
      key: 0
    });
    vue.watch(source, () => {
      cache.key++;
    });
    vue.watch(isDark, () => {
      cache.key++;
    });
    return {
      cache
    };
  };
  function useParent(name) {
    const proxy2 = vue.getCurrentInstance().proxy;
    let p = proxy2 === null || proxy2 === void 0 ? void 0 : proxy2.$parent;
    while (p != null) {
      if (p.$options.name == name) {
        return p;
      }
      p = p.$parent;
    }
    return p;
  }
  class Refs {
    constructor() {
      this.data = vue.reactive({});
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
      if (isNull(d)) {
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
  const cool = (app) => {
    app.mixin({
      onPageScroll(e) {
        scroller.emit(e.scrollTop);
      }
    });
  };
  class Form {
    constructor() {
      this.formRef = vue.ref(null);
      this.addField = (prop, rules) => {
        this.formRef.value.addField(prop, rules);
      };
      this.removeField = (prop) => {
        this.formRef.value.removeField(prop);
      };
      this.getValue = (prop) => {
        return this.formRef.value.getValue(prop);
      };
      this.setError = (prop, error) => {
        this.formRef.value.setError(prop, error);
      };
      this.getError = (prop) => {
        return this.formRef.value.getError(prop);
      };
      this.getErrors = () => {
        return __awaiter(this, void 0, void 0, function* () {
          return this.formRef.value.getErrors();
        });
      };
      this.removeError = (prop) => {
        this.formRef.value.removeError(prop);
      };
      this.clearErrors = () => {
        this.formRef.value.clearErrors();
      };
      this.getRule = (prop) => {
        return this.formRef.value.getRule(prop);
      };
      this.setRule = (prop, rules) => {
        this.formRef.value.setRule(prop, rules);
      };
      this.removeRule = (prop) => {
        this.formRef.value.removeRule(prop);
      };
      this.validateRule = (value, rule) => {
        return this.formRef.value.validateRule(value, rule);
      };
      this.clearValidate = () => {
        this.formRef.value.clearValidate();
      };
      this.validateField = (prop) => {
        return this.formRef.value.validateField(prop);
      };
      this.validate = (callback) => {
        this.formRef.value.validate(callback);
      };
      this.isError = (prop) => {
        return this.formRef.value.getError(prop) != "";
      };
      if (this.formRef.value == null) {
        const ClForm = useParent("cl-form");
        if (ClForm != null) {
          this.formRef.value = ClForm;
        }
      }
      this.disabled = vue.computed(() => {
        if (this.formRef.value == null) {
          return false;
        }
        return this.formRef.value.disabled;
      });
    }
  }
  class FormItem {
    constructor() {
      this.formItemRef = vue.ref(null);
      const isError = new Form().isError;
      if (this.formItemRef.value == null) {
        const ClFormItem = useParent("cl-form-item");
        if (ClFormItem != null) {
          this.formItemRef.value = ClFormItem;
        }
      }
      this.isError = vue.computed(() => {
        if (this.formItemRef.value == null) {
          return false;
        }
        return isError(this.formItemRef.value.prop);
      });
    }
  }
  const useForm = () => {
    return new Form();
  };
  const useFormItem = () => {
    return new FormItem();
  };
  class Page {
    constructor() {
      this.pageRef = null;
      this.path = () => {
        return router.path();
      };
      this.getScrollTop = () => {
        return this.pageRef.scrollTop;
      };
      this.scrollTo = (top) => {
        this.pageRef.scrollTo(top);
      };
      this.scrollToTop = () => {
        this.pageRef.scrollToTop();
      };
      this.onScroll = (callback) => {
        scroller.on(callback);
      };
      this.offScroll = (callback) => {
        scroller.off(callback);
      };
      this.pageRef = useParent("cl-page");
    }
  }
  function usePage() {
    return new Page();
  }
  class Size {
    constructor(cb) {
      this.names = [
        "text-xs",
        "text-sm",
        "text-md",
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-3xl",
        "text-4xl",
        "text-5xl",
        "text-6xl",
        "text-7xl",
        "text-8xl",
        "text-9xl"
      ];
      this.sizes = [20, 24, 28, 32, 36, 44, 52, 60, 72, 84, 96, 120, 152];
      this.lineHeights = [28, 36, 44, 52, 52, 1, 1, 1, 1, 1, 1, 1, 1];
      this.className = vue.computed(() => {
        return "";
      });
      this.getScale = () => {
        var _a;
        return (_a = config$1.fontSize) !== null && _a !== void 0 ? _a : 1;
      };
      this.getRpx = (val) => {
        const scale = this.getScale();
        if (typeof val == "number") {
          return val * scale + "rpx";
        } else {
          const num = parseFloat(val);
          const unit = val.replace("".concat(num), "");
          return num * scale + unit;
        }
      };
      this.getPxValue = (val) => {
        const scale = this.getScale();
        if (typeof val == "string") {
          const num = parseFloat(val);
          const unit = val.replace("".concat(num), "");
          if (unit == "px") {
            return num * scale;
          } else {
            return rpx2px(num * scale);
          }
        } else {
          return rpx2px(val * scale);
        }
      };
      this.getPx = (val) => {
        return this.getPxValue(val) + "px";
      };
      this.getIndex = () => {
        let index = this.names.findIndex((name) => {
          if (this.className.value.includes(name)) {
            return true;
          }
          return false;
        });
        if (index < 0) {
          index = 2;
        }
        return index;
      };
      this.getSize = (size) => {
        if (config$1.fontSize == null && size == null) {
          return null;
        }
        return this.getRpx(size !== null && size !== void 0 ? size : this.sizes[this.getIndex()]);
      };
      this.getLineHeight = () => {
        if (config$1.fontSize == null) {
          return null;
        }
        const lineHeight = this.lineHeights[this.getIndex()];
        return lineHeight == 1 ? "1" : this.getRpx(lineHeight);
      };
      this.className = vue.computed(cb !== null && cb !== void 0 ? cb : () => {
        return "";
      });
      this.ptClassName = vue.computed(() => {
        if (config$1.fontSize == null) {
          return this.className.value;
        }
        const name = this.names[this.getIndex()];
        return this.className.value.replace("-important-".concat(name), "").replace(name, "");
      });
    }
  }
  function useSize(cb = null) {
    return new Size(cb);
  }
  class Touch {
    constructor() {
      this.startY = 0;
      this.startX = 0;
      this.horizontal = 0;
    }
    start(e) {
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.horizontal = 0;
    }
    move(e) {
      const x = this.startX - e.touches[0].clientX;
      if (this.horizontal == 0) {
        const y = this.startY - e.touches[0].clientY;
        if (Math.abs(x) > Math.abs(y)) {
          this.horizontal = 1;
        }
        if (this.horizontal == 1) {
          e.preventDefault();
        }
      }
    }
    end() {
      this.startY = 0;
      this.horizontal = 0;
    }
  }
  function useTouch() {
    return new Touch();
  }
  const t$1 = (name) => {
    return name;
  };
  const list = /* @__PURE__ */ new Map();
  class Ui {
    /**
     * 获取当前页面的 UiInstance 实例
     * @returns UiInstance | undefined
     */
    getInstance() {
      return list.get(router.path());
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
      uni.showLoading({
        title: title !== null && title !== void 0 ? title : t$1("加载中"),
        mask: mask !== null && mask !== void 0 ? mask : true
      });
    }
    /**
     * 隐藏加载中弹窗
     */
    hideLoading() {
      uni.hideLoading();
    }
  }
  const ui = new Ui();
  function useUi() {
    return ui;
  }
  function createUi(instance) {
    list.set(router.path(), instance);
  }
  const iconfont = {
    "back": "e6db",
    "yue": "e6bb",
    "wancheng": "e6bc",
    "shibai": "e6bd",
    "bofang": "e6be",
    "pinglun": "e6bf",
    "huatong": "e6c0",
    "dianzan": "e6c1",
    "fuli": "e6c2",
    "jiudian": "e6c3",
    "tupian": "e6c5",
    "dingwei": "e6c6",
    "vip": "e6c8",
    "yunduan": "e6c9",
    "naozhong": "e6ca",
    "jiaoliu": "e6cb",
    "shouru": "e6cc",
    "zhichu": "e6cd",
    "shijian": "e6ce",
    "paizhao": "e6cf",
    "qiche": "e6d0",
    "shuipiao": "e6d1",
    "dingyue": "e6d2",
    "kefu_2": "e6d3",
    "tuichudenglu": "e6d4",
    "pinglun_2": "e6d5",
    "qianbao": "e6d6",
    "sousuo_2": "e6d7",
    "youhuiquan": "e6d8",
    "gouwudai": "e6ea",
    "guanli": "e6fd",
    "qianbi": "e70d",
    "huangguan": "e712"
  };
  const remixicon = {
    "arrow-left-up-line": "ea66",
    "arrow-up-line": "ea76",
    "arrow-right-up-line": "ea70",
    "arrow-right-line": "ea6c",
    "arrow-right-down-line": "ea6a",
    "arrow-down-line": "ea4c",
    "arrow-left-down-line": "ea5e",
    "arrow-left-line": "ea60",
    "arrow-up-circle-line": "ea72",
    "arrow-right-circle-line": "ea68",
    "arrow-down-circle-line": "ea4a",
    "arrow-left-circle-line": "ea5c",
    "arrow-up-circle-fill": "ea71",
    "arrow-right-circle-fill": "ea67",
    "arrow-down-circle-fill": "ea49",
    "arrow-left-circle-fill": "ea5b",
    "arrow-up-s-line": "ea78",
    "arrow-right-s-line": "ea6e",
    "arrow-down-s-line": "ea4e",
    "arrow-left-s-line": "ea64",
    "arrow-left-s-fill": "ea63",
    "arrow-down-s-fill": "ea4d",
    "arrow-right-s-fill": "ea6d",
    "arrow-up-s-fill": "ea77",
    "arrow-up-down-line": "ea74",
    "arrow-left-right-line": "ea62",
    "arrow-right-double-line": "f2e5",
    "arrow-up-double-line": "f2eb",
    "skip-up-line": "f367",
    "expand-up-down-line": "f327",
    "expand-left-right-line": "f323",
    "expand-left-line": "f321",
    "expand-right-line": "f325",
    "arrow-go-back-line": "ea58",
    "arrow-go-forward-line": "ea5a",
    "home-2-line": "ee19",
    "home-2-fill": "ee18",
    "store-2-line": "f1a5",
    "store-2-fill": "f1a4",
    "store-3-fill": "f1a6",
    "store-3-line": "f1a7",
    "ancient-pavilion-line": "ea34",
    "ancient-pavilion-fill": "ea33",
    "tent-line": "f3df",
    "tent-fill": "f3de",
    "hospital-fill": "ee36",
    "hospital-line": "ee37",
    "ancient-gate-line": "ea32",
    "ancient-gate-fill": "ea31",
    "mail-line": "eef6",
    "mail-fill": "eef3",
    "mail-send-line": "eefc",
    "mail-send-fill": "eefb",
    "mail-unread-fill": "ef01",
    "mail-unread-line": "ef02",
    "mail-add-fill": "eeeb",
    "mail-add-line": "eeec",
    "mail-ai-line": "f585",
    "mail-ai-fill": "f584",
    "inbox-line": "ee4f",
    "inbox-fill": "ee4e",
    "inbox-archive-line": "ee4d",
    "inbox-archive-fill": "ee4c",
    "inbox-unarchive-line": "ee51",
    "inbox-unarchive-fill": "ee50",
    "cloud-line": "eb9d",
    "cloud-fill": "eb9c",
    "cloud-off-line": "eb9f",
    "cloud-off-fill": "eb9e",
    "archive-line": "ea48",
    "archive-fill": "ea47",
    "profile-fill": "f02c",
    "profile-line": "f02d",
    "award-line": "ea8a",
    "award-fill": "ea89",
    "at-line": "ea83",
    "at-fill": "ea82",
    "medal-fill": "ef27",
    "medal-line": "ef28",
    "verified-badge-line": "f3e9",
    "verified-badge-fill": "f3e8",
    "bar-chart-line": "ea9e",
    "bar-chart-horizontal-line": "ea9d",
    "bar-chart-2-line": "ea96",
    "pie-chart-line": "effa",
    "bubble-chart-line": "eb03",
    "bar-chart-grouped-line": "ea9b",
    "donut-chart-line": "ec42",
    "line-chart-line": "eeab",
    "bookmark-fill": "eae4",
    "bookmark-line": "eae5",
    "briefcase-fill": "eaf4",
    "briefcase-line": "eaf5",
    "donut-chart-fill": "ec41",
    "line-chart-fill": "eeaa",
    "calendar-line": "eb27",
    "calendar-fill": "eb26",
    "calculator-fill": "eb1e",
    "calculator-line": "eb1f",
    "customer-service-line": "ec0e",
    "customer-service-fill": "ec0d",
    "flag-fill": "ed3a",
    "flag-line": "ed3b",
    "flag-off-line": "f577",
    "flag-off-fill": "f576",
    "global-line": "edcf",
    "global-fill": "edce",
    "links-fill": "eeb7",
    "links-line": "eeb8",
    "printer-line": "f029",
    "printer-fill": "f028",
    "reply-line": "f07a",
    "reply-fill": "f079",
    "send-plane-line": "f0da",
    "send-plane-fill": "f0d9",
    "slideshow-fill": "f157",
    "slideshow-line": "f158",
    "window-line": "f2c6",
    "window-fill": "f2c5",
    "stack-fill": "f180",
    "stack-line": "f181",
    "service-fill": "f0e1",
    "service-line": "f0e2",
    "registered-fill": "f069",
    "registered-line": "f06a",
    "trademark-fill": "f21e",
    "trademark-line": "f21f",
    "advertisement-fill": "ea16",
    "advertisement-line": "ea17",
    "copyright-line": "ebe2",
    "copyright-fill": "ebe1",
    "creative-commons-nd-line": "ebf8",
    "creative-commons-nd-fill": "ebf7",
    "id-card-line": "f4e9",
    "id-card-fill": "f4e8",
    "info-card-line": "f57f",
    "info-card-fill": "f57e",
    "pass-pending-fill": "f388",
    "pass-pending-line": "f389",
    "pass-expired-fill": "f386",
    "pass-expired-line": "f387",
    "pass-valid-fill": "f38a",
    "pass-valid-line": "f38b",
    "megaphone-fill": "f384",
    "megaphone-line": "f385",
    "creative-commons-by-fill": "ebf1",
    "creative-commons-by-line": "ebf2",
    "creative-commons-fill": "ebf3",
    "creative-commons-line": "ebf4",
    "creative-commons-nc-line": "ebf6",
    "creative-commons-nc-fill": "ebf5",
    "copyleft-fill": "ebdf",
    "copyleft-line": "ebe0",
    "message-2-line": "ef44",
    "message-2-fill": "ef43",
    "chat-check-line": "eb55",
    "chat-check-fill": "eb54",
    "chat-unread-fill": "f529",
    "chat-unread-line": "f52a",
    "chat-new-line": "eb63",
    "chat-new-fill": "eb62",
    "chat-delete-fill": "eb56",
    "chat-delete-line": "eb57",
    "message-fill": "ef47",
    "message-line": "ef48",
    "chat-4-line": "eb53",
    "chat-4-fill": "eb52",
    "chat-settings-fill": "eb6c",
    "chat-settings-line": "eb6d",
    "chat-download-fill": "eb58",
    "chat-download-line": "eb59",
    "chat-upload-line": "eb75",
    "chat-upload-fill": "eb74",
    "chat-forward-fill": "eb5c",
    "chat-forward-line": "eb5d",
    "chat-heart-line": "eb5f",
    "chat-heart-fill": "eb5e",
    "chat-off-line": "eb65",
    "chat-off-fill": "eb64",
    "feedback-line": "ecc1",
    "feedback-fill": "ecc0",
    "question-answer-line": "f043",
    "question-answer-fill": "f042",
    "questionnaire-line": "f048",
    "questionnaire-fill": "f047",
    "speak-fill": "f36e",
    "speak-line": "f36f",
    "chat-thread-line": "f473",
    "chat-thread-fill": "f472",
    "chat-history-fill": "eb60",
    "chat-history-line": "eb61",
    "chat-private-line": "eb69",
    "chat-private-fill": "eb68",
    "emoji-sticker-line": "f37f",
    "emoji-sticker-fill": "f37e",
    "edit-line": "ec86",
    "edit-fill": "ec85",
    "markup-line": "ef20",
    "markup-fill": "ef1f",
    "edit-box-fill": "ec81",
    "edit-box-line": "ec82",
    "computer-line": "ebca",
    "computer-fill": "ebc9",
    "tv-line": "f237",
    "tv-fill": "f236",
    "smartphone-line": "f15a",
    "smartphone-fill": "f159",
    "device-fill": "ec2d",
    "device-line": "ec2e",
    "phone-line": "efec",
    "phone-fill": "efe9",
    "instance-fill": "f382",
    "instance-line": "f383",
    "database-2-line": "ec16",
    "database-2-fill": "ec15",
    "keyboard-box-fill": "ee72",
    "keyboard-box-line": "ee73",
    "shut-down-line": "f126",
    "shut-down-fill": "f125",
    "fingerprint-line": "ed31",
    "fingerprint-fill": "ed30",
    "barcode-box-line": "eaa0",
    "barcode-box-fill": "ea9f",
    "qr-code-line": "f03d",
    "qr-code-fill": "f03c",
    "qr-scan-fill": "f040",
    "qr-scan-line": "f041",
    "draft-line": "ec5c",
    "draft-fill": "ec5b",
    "file-paper-line": "ecfb",
    "file-paper-fill": "ecfa",
    "file-line": "eceb",
    "file-fill": "ece0",
    "sticky-note-fill": "f19a",
    "sticky-note-line": "f19b",
    "file-edit-line": "ecdb",
    "file-edit-fill": "ecda",
    "file-copy-fill": "ecd4",
    "file-copy-line": "ecd5",
    "bill-fill": "eac1",
    "bill-line": "eac2",
    "article-fill": "ea7d",
    "article-line": "ea7e",
    "survey-fill": "f1c6",
    "survey-line": "f1c7",
    "clipboard-line": "eb91",
    "clipboard-fill": "eb90",
    "news-fill": "f417",
    "news-line": "f418",
    "file-zip-fill": "ed1e",
    "file-zip-line": "ed1f",
    "todo-fill": "f216",
    "todo-line": "f217",
    "book-marked-line": "ead9",
    "book-marked-fill": "ead8",
    "task-fill": "f1e7",
    "task-line": "f1e8",
    "double-quotes-l": "ec51",
    "double-quotes-r": "ec52",
    "single-quotes-l": "f13b",
    "single-quotes-r": "f13c",
    "list-check": "eeba",
    "list-ordered": "eebb",
    "list-radio": "f39b",
    "sort-asc": "f15f",
    "sort-desc": "f160",
    "send-backward": "f0d6",
    "bring-forward": "eaf6",
    "wallet-line": "f2ae",
    "wallet-fill": "f2ad",
    "bank-card-line": "ea92",
    "bank-card-fill": "ea91",
    "refund-line": "f068",
    "refund-fill": "f067",
    "safe-fill": "f0aa",
    "safe-line": "f0ab",
    "price-tag-line": "f025",
    "price-tag-fill": "f024",
    "ticket-line": "f20d",
    "ticket-fill": "f20c",
    "coupon-line": "ebee",
    "coupon-fill": "ebed",
    "shopping-bag-line": "f118",
    "shopping-bag-fill": "f117",
    "shopping-cart-line": "f120",
    "shopping-cart-fill": "f11f",
    "vip-line": "f292",
    "vip-fill": "f291",
    "vip-crown-2-line": "f28c",
    "vip-crown-2-fill": "f28b",
    "vip-diamond-fill": "f28f",
    "vip-diamond-line": "f290",
    "exchange-fill": "ecaa",
    "exchange-line": "ecad",
    "trophy-fill": "f22e",
    "trophy-line": "f22f",
    "swap-line": "f1cb",
    "swap-fill": "f1ca",
    "exchange-cny-line": "eca7",
    "exchange-dollar-line": "eca9",
    "exchange-funds-line": "ecac",
    "copper-coin-line": "ebdc",
    "copper-coin-fill": "ebdb",
    "money-cny-box-line": "ef5f",
    "money-cny-box-fill": "ef5e",
    "money-cny-circle-line": "ef61",
    "money-cny-circle-fill": "ef60",
    "money-dollar-circle-line": "ef65",
    "money-dollar-circle-fill": "ef64",
    "increase-decrease-fill": "ee52",
    "increase-decrease-line": "ee53",
    "red-packet-fill": "f05f",
    "red-packet-line": "f060",
    "auction-fill": "ea87",
    "auction-line": "ea88",
    "gift-line": "edbb",
    "gift-fill": "edba",
    "24-hours-line": "ea02",
    "nft-line": "f347",
    "nft-fill": "f346",
    "heart-fill": "ee0e",
    "heart-line": "ee0f",
    "heart-add-line": "ee0d",
    "heart-add-fill": "ee0c",
    "rest-time-fill": "f07d",
    "rest-time-line": "f07e",
    "apple-line": "ea40",
    "apple-fill": "ea3f",
    "alipay-fill": "ea2b",
    "alipay-line": "ea2c",
    "wechat-fill": "f2b5",
    "wechat-line": "f2b6",
    "wechat-pay-line": "f2b8",
    "wechat-pay-fill": "f2b7",
    "mini-program-fill": "ef5a",
    "mini-program-line": "ef5b",
    "android-line": "ea36",
    "android-fill": "ea35",
    "map-pin-line": "ef14",
    "map-pin-fill": "ef13",
    "map-pin-time-fill": "ef17",
    "map-pin-time-line": "ef18",
    "pushpin-fill": "f038",
    "pushpin-line": "f039",
    "unpin-line": "f377",
    "unpin-fill": "f376",
    "compass-fill": "ebc3",
    "compass-line": "ebc4",
    "earth-line": "ec7a",
    "earth-fill": "ec79",
    "parking-box-fill": "efcd",
    "parking-box-line": "efce",
    "navigation-fill": "ef88",
    "navigation-line": "ef89",
    "image-line": "ee4b",
    "image-fill": "ee4a",
    "multi-image-line": "f5ee",
    "multi-image-fill": "f5ed",
    "video-on-line": "f51e",
    "video-on-fill": "f51d",
    "clapperboard-line": "eb8f",
    "clapperboard-fill": "eb8e",
    "film-fill": "ed20",
    "film-line": "ed21",
    "movie-fill": "ef80",
    "movie-line": "ef81",
    "live-line": "eec0",
    "live-fill": "eebf",
    "vidicon-line": "f288",
    "vidicon-fill": "f287",
    "video-off-line": "f51c",
    "video-off-fill": "f51b",
    "camera-fill": "eb2e",
    "camera-line": "eb31",
    "camera-off-fill": "eb32",
    "camera-off-line": "eb33",
    "camera-lens-fill": "eb2f",
    "camera-lens-line": "eb30",
    "mv-line": "ef87",
    "mv-fill": "ef86",
    "music-2-fill": "ef82",
    "music-2-line": "ef83",
    "headphone-fill": "ee04",
    "headphone-line": "ee05",
    "mic-line": "ef50",
    "mic-fill": "ef4f",
    "mic-off-line": "ef52",
    "mic-off-fill": "ef51",
    "volume-down-fill": "f29b",
    "volume-down-line": "f29c",
    "volume-mute-line": "f29e",
    "volume-mute-fill": "f29d",
    "notification-4-line": "ef96",
    "notification-4-fill": "ef95",
    "notification-off-fill": "ef9b",
    "notification-off-line": "ef9c",
    "play-circle-line": "f009",
    "play-circle-fill": "f008",
    "pause-circle-line": "efd6",
    "pause-circle-fill": "efd5",
    "record-circle-line": "f05a",
    "record-circle-fill": "f059",
    "stop-circle-fill": "f19e",
    "stop-circle-line": "f19f",
    "fullscreen-line": "ed9c",
    "fullscreen-exit-line": "ed9a",
    "equalizer-2-line": "f405",
    "equalizer-2-fill": "f404",
    "apps-line": "ea44",
    "apps-fill": "ea43",
    "function-line": "ed9e",
    "function-fill": "ed9d",
    "dashboard-horizontal-line": "f4ce",
    "dashboard-horizontal-fill": "f4cd",
    "menu-line": "ef3e",
    "menu-add-line": "ef3a",
    "star-line": "f18b",
    "star-fill": "f186",
    "star-off-line": "f59b",
    "star-off-fill": "f59a",
    "more-line": "ef79",
    "more-fill": "ef78",
    "more-2-line": "ef77",
    "more-2-fill": "ef76",
    "settings-fill": "f0ed",
    "settings-line": "f0ee",
    "forbid-fill": "ed94",
    "forbid-line": "ed95",
    "prohibited-line": "f3a1",
    "prohibited-fill": "f3a0",
    "information-2-line": "f449",
    "information-2-fill": "f448",
    "error-warning-fill": "eca0",
    "error-warning-line": "eca1",
    "question-fill": "f044",
    "question-line": "f045",
    "checkbox-blank-circle-line": "eb7d",
    "checkbox-blank-circle-fill": "eb7c",
    "checkbox-circle-fill": "eb80",
    "checkbox-circle-line": "eb81",
    "checkbox-blank-line": "eb7f",
    "checkbox-blank-fill": "eb7e",
    "checkbox-line": "eb85",
    "checkbox-fill": "eb82",
    "add-circle-line": "ea11",
    "add-circle-fill": "ea10",
    "indeterminate-circle-fill": "ee56",
    "indeterminate-circle-line": "ee57",
    "close-circle-line": "eb97",
    "close-circle-fill": "eb96",
    "radio-button-line": "f050",
    "radio-button-fill": "f04f",
    "check-line": "eb7b",
    "close-line": "eb99",
    "add-line": "ea13",
    "subtract-line": "f1af",
    "divide-line": "ec40",
    "equal-line": "f31f",
    "upload-line": "f250",
    "download-line": "ec5a",
    "upload-cloud-2-line": "f24c",
    "upload-cloud-2-fill": "f24b",
    "download-cloud-2-line": "ec56",
    "download-cloud-2-fill": "ec55",
    "login-box-line": "eed4",
    "login-box-fill": "eed3",
    "shield-cross-line": "f102",
    "shield-cross-fill": "f101",
    "shield-check-fill": "f0ff",
    "shield-check-line": "f100",
    "delete-bin-fill": "ec29",
    "delete-bin-line": "ec2a",
    "lock-line": "eece",
    "lock-fill": "eecd",
    "lock-unlock-line": "eed2",
    "lock-unlock-fill": "eed1",
    "lock-password-line": "eed0",
    "lock-password-fill": "eecf",
    "eye-fill": "ecb4",
    "eye-line": "ecb5",
    "eye-off-line": "ecb7",
    "eye-off-fill": "ecb6",
    "search-line": "f0d1",
    "search-fill": "f0d0",
    "share-line": "f0fe",
    "share-fill": "f0f7",
    "share-box-line": "f0f4",
    "share-box-fill": "f0f3",
    "share-circle-line": "f0f6",
    "share-circle-fill": "f0f5",
    "time-fill": "f20e",
    "time-line": "f20f",
    "thumb-up-line": "f207",
    "thumb-up-fill": "f206",
    "notification-badge-fill": "ef97",
    "notification-badge-line": "ef98",
    "toggle-line": "f219",
    "toggle-fill": "f218",
    "filter-line": "ed27",
    "filter-fill": "ed26",
    "history-line": "ee17",
    "loop-left-line": "f33d",
    "loader-2-line": "eec2",
    "loader-4-line": "eec6",
    "reset-right-line": "f544",
    "loader-fill": "eec9",
    "user-3-line": "f256",
    "user-3-fill": "f255",
    "sun-fill": "f1bc",
    "sun-line": "f1bf",
    "moon-fill": "ef72",
    "moon-line": "ef75",
    "shining-line": "f35e",
    "shining-fill": "f35d",
    "fire-fill": "ed32",
    "fire-line": "ed33",
    "sparkling-line": "f36d",
    "sparkling-fill": "f36c",
    "box-1-line": "f2f1",
    "box-1-fill": "f2f0",
    "account-box-line": "ea07",
    "account-box-fill": "ea06",
    "account-circle-fill": "ea08",
    "account-circle-line": "ea09",
    "account-pin-box-fill": "ea0a",
    "account-pin-box-line": "ea0b",
    "skip-up-fill": "f366",
    "arrow-left-right-fill": "ea61",
    "arrow-up-down-fill": "ea73",
    "arrow-up-double-fill": "f2ea",
    "arrow-right-double-fill": "f2e4",
    "expand-left-fill": "f320",
    "expand-right-fill": "f324",
    "expand-up-down-fill": "f326",
    "expand-left-right-fill": "f322",
    "arrow-go-back-fill": "ea57",
    "arrow-go-forward-fill": "ea59",
    "contract-left-line": "f2fd",
    "contract-right-line": "f301",
    "contract-right-fill": "f300",
    "contract-left-fill": "f2fc",
    "drag-move-line": "ec62",
    "drag-move-fill": "ec61",
    "home-line": "ee2b",
    "home-fill": "ee26",
    "mail-open-line": "eefa",
    "mail-open-fill": "eef9",
    "attachment-line": "ea86",
    "attachment-fill": "ea85",
    "bar-chart-fill": "ea99",
    "bar-chart-horizontal-fill": "ea9c",
    "bar-chart-2-fill": "ea95",
    "bar-chart-grouped-fill": "ea9a",
    "bubble-chart-fill": "eb02",
    "pie-chart-fill": "eff9",
    "calendar-schedule-line": "f3f3",
    "calendar-schedule-fill": "f3f2",
    "calendar-todo-line": "eb29",
    "calendar-todo-fill": "eb28",
    "calendar-event-fill": "eb24",
    "calendar-event-line": "eb25",
    "calendar-close-fill": "f38d",
    "calendar-check-fill": "eb22",
    "calendar-check-line": "eb23",
    "calendar-close-line": "f38e",
    "message-3-line": "ef46",
    "message-3-fill": "ef45",
    "chat-3-fill": "eb50",
    "chat-3-line": "eb51",
    "chat-1-fill": "eb4c",
    "chat-1-line": "eb4d",
    "chat-2-fill": "eb4e",
    "chat-2-line": "eb4f",
    "crop-line": "ec02",
    "crop-fill": "ec01",
    "palette-line": "efc5",
    "palette-fill": "efc4",
    "anticlockwise-line": "ea3c",
    "anticlockwise-fill": "ea3b",
    "clockwise-line": "eb95",
    "clockwise-fill": "eb94",
    "code-s-slash-fill": "ebac",
    "code-s-slash-line": "ebad",
    "puzzle-fill": "f451",
    "puzzle-line": "f452",
    "server-fill": "f0df",
    "server-line": "f0e0",
    "qr-scan-2-fill": "f03e",
    "qr-scan-2-line": "f03f",
    "scan-line": "f0bd",
    "scan-fill": "f0bc",
    "phone-find-fill": "efea",
    "phone-find-line": "efeb",
    "barcode-line": "eaa2",
    "barcode-fill": "eaa1",
    "file-list-fill": "ecf0",
    "file-list-line": "ecf1",
    "file-text-line": "ed0f",
    "file-text-fill": "ed0e",
    "book-fill": "ead6",
    "book-line": "ead7",
    "text": "f201",
    "font-family": "f390",
    "link": "eeb2",
    "translate": "f227",
    "copper-diamond-fill": "ebdd",
    "copper-diamond-line": "ebde",
    "dislike-fill": "ec3b",
    "dislike-line": "ec3c",
    "heart-3-fill": "ee0a",
    "heart-3-line": "ee0b",
    "hearts-fill": "ee12",
    "hearts-line": "ee13",
    "map-line": "ef08",
    "map-fill": "ef07",
    "image-circle-fill": "f412",
    "image-circle-line": "f413",
    "image-edit-fill": "ee48",
    "image-edit-line": "ee49",
    "image-add-line": "ee47",
    "image-add-fill": "ee46",
    "landscape-line": "ee7d",
    "landscape-fill": "ee7c",
    "check-double-line": "eb79",
    "check-double-fill": "eb78",
    "close-fill": "eb98",
    "add-fill": "ea12",
    "subtract-fill": "f1ae",
    "divide-fill": "ec3f",
    "equal-fill": "f31e",
    "logout-circle-line": "eedc",
    "logout-circle-fill": "eedb",
    "shield-fill": "f103",
    "shield-line": "f108",
    "timer-line": "f215",
    "timer-fill": "f212",
    "delete-back-2-line": "ec1a",
    "delete-back-2-fill": "ec19",
    "volume-vibrate-line": "f2a4",
    "volume-vibrate-fill": "f2a3",
    "volume-off-vibrate-line": "f2a0",
    "volume-off-vibrate-fill": "f29f",
    "truck-line": "f231",
    "truck-fill": "f230",
    "flight-takeoff-line": "ed43",
    "flight-takeoff-fill": "ed42",
    "road-map-line": "f08e",
    "road-map-fill": "f08d",
    "pushpin-2-line": "f037",
    "pushpin-2-fill": "f036",
    "map-pin-2-line": "ef0a",
    "map-pin-2-fill": "ef09",
    "compass-discover-line": "ebc2",
    "compass-discover-fill": "ebc1",
    "signpost-fill": "f48d",
    "signpost-line": "f48e",
    "qq-line": "f03b",
    "qq-fill": "f03a",
    "tiktok-line": "f373",
    "tiktok-fill": "f372",
    "user-smile-line": "f274",
    "user-smile-fill": "f273",
    "user-line": "f264",
    "user-fill": "f25f",
    "user-add-fill": "f25d",
    "user-add-line": "f25e",
    "user-minus-line": "f54c",
    "user-minus-fill": "f54b",
    "user-follow-fill": "f260",
    "user-follow-line": "f261",
    "user-unfollow-line": "f278",
    "user-unfollow-fill": "f277",
    "user-shared-fill": "f271",
    "user-shared-line": "f272",
    "user-received-fill": "f269",
    "user-received-line": "f26a",
    "user-search-line": "f26c",
    "user-search-fill": "f26b",
    "user-location-line": "f266",
    "user-location-fill": "f265",
    "user-star-line": "f276",
    "user-star-fill": "f275",
    "user-settings-fill": "f26d",
    "user-settings-line": "f26e",
    "user-heart-line": "f263",
    "user-heart-fill": "f262",
    "user-forbid-line": "f3be",
    "user-forbid-fill": "f3bd",
    "group-fill": "ede2",
    "group-line": "ede3",
    "user-2-fill": "f253",
    "user-2-line": "f254",
    "shield-user-line": "f10c",
    "shield-user-fill": "f10b",
    "circle-line": "f3c2",
    "circle-fill": "f3c1",
    "sketching": "f35f",
    "align-bottom": "ea24",
    "restart-line": "f080",
    "restart-fill": "f07f",
    "refresh-line": "f064",
    "refresh-fill": "f063",
    "reset-left-line": "f542",
    "reset-left-fill": "f541",
    "skip-down-line": "f361",
    "skip-down-fill": "f360",
    "skip-right-line": "f365",
    "skip-right-fill": "f364",
    "skip-left-fill": "f362",
    "skip-left-line": "f363",
    "text-snippet": "f46e",
    "input-method-line": "ee60",
    "input-method-fill": "ee5f",
    "font-size": "ed8d",
    "font-size-2": "ed8c",
    "font-color": "ed8b",
    "node-tree": "ef90",
    "price-tag-3-line": "f023",
    "price-tag-3-fill": "f022",
    "input-field": "f47a",
    "timeline-view": "f46f",
    "progress-2-line": "f47e",
    "progress-2-fill": "f47d",
    "t-box-line": "f1d3",
    "t-box-fill": "f1d2",
    "edit-2-fill": "ec7f",
    "edit-2-line": "ec80",
    "layout-2-line": "ee7f",
    "layout-2-fill": "ee7e",
    "layout-column-fill": "ee8c",
    "layout-column-line": "ee8d",
    "mouse-line": "ef7d",
    "mouse-fill": "ef7c",
    "file-upload-line": "ed15",
    "file-upload-fill": "ed14",
    "page-separator": "efbd",
    "carousel-view": "f42c",
    "list-view": "f44c",
    "text-block": "f46d",
    "percent-line": "efe6",
    "percent-fill": "efe5",
    "upload-fill": "f24f",
    "t-shirt-line": "f1d9",
    "t-shirt-fill": "f1d8",
    "number-1": "efa0",
    "check-fill": "eb7a",
    "checkbox-multiple-line": "eb89",
    "checkbox-multiple-fill": "eb88",
    "collapse-vertical-line": "f52e",
    "align-top": "ea29",
    "window-2-line": "f2c4",
    "window-2-fill": "f2c3",
    "seo-line": "f3a4",
    "seo-fill": "f3a3",
    "shadow-line": "f45a",
    "shadow-fill": "f459",
    "puzzle-2-line": "f450",
    "puzzle-2-fill": "f44f",
    "markdown-line": "ef1e",
    "markdown-fill": "ef1d",
    "stacked-view": "f464",
    "dropdown-list": "f3c3",
    "timer-2-line": "f211",
    "timer-2-fill": "f210",
    "parent-line": "efca",
    "parent-fill": "efc9",
    "function-add-line": "f4df",
    "function-add-fill": "f4de",
    "arrow-up-box-line": "f562",
    "arrow-up-box-fill": "f561",
    "layout-bottom-fill": "ee8a",
    "layout-right-fill": "ee9a",
    "layout-right-line": "ee9b",
    "layout-top-fill": "eea0",
    "layout-top-line": "eea1",
    "layout-left-line": "ee94",
    "layout-left-fill": "ee93",
    "layout-top-2-line": "ee9f",
    "layout-top-2-fill": "ee9e",
    "layout-right-2-line": "ee99",
    "layout-right-2-fill": "ee98",
    "layout-bottom-2-line": "ee89",
    "layout-bottom-2-fill": "ee88",
    "layout-left-2-line": "ee92",
    "layout-left-2-fill": "ee91",
    "layout-row-fill": "ee9c",
    "layout-row-line": "ee9d",
    "table-fill": "f1dd",
    "table-line": "f1de",
    "layout-bottom-line": "ee8b",
    "picture-in-picture-line": "eff4",
    "picture-in-picture-fill": "eff3",
    "arrow-down-double-line": "f2e1",
    "arrow-down-double-fill": "f2e0",
    "arrow-left-double-fill": "f2e2",
    "arrow-left-double-line": "f2e3"
  };
  const icons = {
    iconfont,
    remixicon
  };
  let PassThrough$l = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      delete this.__props__;
    }
  };
  class Icon extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            font: { type: String, optional: false },
            text: { type: String, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Icon.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.font = this.__props__.font;
      this.text = this.__props__.text;
      delete this.__props__;
    }
  }
  const _sfc_main$R = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-icon"
  }, { __name: "cl-icon", props: {
    // 透传样式
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 图标名称
    name: {
      type: String,
      default: ""
    },
    // 图标大小
    size: {
      type: [String, Number],
      default: 32
    },
    // 图标高度
    height: {
      type: [String, Number],
      default: null
    },
    // 图标宽度
    width: {
      type: [String, Number],
      default: null
    },
    // 图标颜色
    color: {
      type: String,
      default: ""
    }
  }, setup(__props) {
    const props = __props;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const cache = useCache(() => {
      return [props.color];
    }).cache;
    const _a = useSize(() => {
      var _a2;
      return (_a2 = pt.value.className) !== null && _a2 !== void 0 ? _a2 : "";
    }), getRpx = _a.getRpx, ptClassName = _a.ptClassName;
    const icon = vue.computed(() => {
      let font = "";
      let text = "";
      try {
        let code = "";
        forInObject(icons, (value = null, key) => {
          if (has(value, props.name)) {
            font = key;
            code = get(value, props.name);
          }
        });
        text = String.fromCharCode(parseInt(code, 16));
      } catch (e) {
        uni.__log__("error", "at uni_modules/cool-unix/components/cl-icon/cl-icon.uvue:90", "图标 ".concat(props.name, " 不存在"), e);
      }
      return new Icon({
        font,
        text
      });
    });
    const color = vue.computed(() => {
      if (props.color != "") {
        switch (props.color) {
          case "primary":
            return ctx.color["primary-500"];
          case "success":
            return "#22c55e";
          case "warn":
            return "#eab308";
          case "error":
            return "#ef4444";
          case "info":
            return ctx.color["surface-500"];
          case "dark":
            return ctx.color["surface-700"];
          case "light":
            return ctx.color["surface-50"];
          case "disabled":
            return ctx.color["surface-300"];
          default:
            return props.color;
        }
      }
      return isDark.value ? "white" : ctx.color["surface-700"];
    });
    const iconStyle = vue.computed(() => {
      var _a2, _b;
      const style = new UTSJSONObject({});
      if (!hasTextColor(ptClassName.value)) {
        style["color"] = color.value;
      }
      if (icon.value.font != "") {
        style["fontFamily"] = icon.value.font;
      }
      style["fontSize"] = getRpx(props.size);
      style["height"] = getRpx((_a2 = props.height) !== null && _a2 !== void 0 ? _a2 : props.size);
      style["lineHeight"] = getRpx(props.size);
      style["width"] = getRpx((_b = props.width) !== null && _b !== void 0 ? _b : props.size);
      return style;
    });
    return (_ctx = null, _cache = null) => {
      return vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
        class: vue.normalizeClass(["cl-icon", [new UTSJSONObject({}), vue.unref(ptClassName)]]),
        style: vue.normalizeStyle(iconStyle.value),
        key: vue.unref(cache).key
      }), vue.toDisplayString(icon.value.text), 7);
    };
  } }));
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  let PassThrough$k = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            icon: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.icon = this.__props__.icon;
      delete this.__props__;
    }
  };
  const _sfc_main$Q = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-loading"
  }, { __name: "cl-loading", props: {
    // 透传样式
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: true
    },
    // 图标大小
    size: {
      type: [Number, String],
      default: 24
    },
    // 图标颜色
    color: {
      type: String,
      default: ""
    }
  }, setup(__props) {
    const props = __props;
    const getPx2 = useSize().getPx;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const loadingRef = vue.shallowRef(null);
    const color = vue.computed(() => {
      if (props.color == "") {
        return isDark.value ? "#ffffff" : ctx.color["surface-700"];
      }
      switch (props.color) {
        case "primary":
          return ctx.color["primary-500"];
        case "success":
          return "#22c55e";
        case "warn":
          return "#eab308";
        case "error":
          return "#ef4444";
        case "info":
          return "#71717a";
        case "dark":
          return "#3f3f46";
        case "light":
          return "#ffffff";
        case "disabled":
          return "#d4d4d8";
        default:
          return props.color;
      }
    });
    function start() {
      return __awaiter(this, void 0, void 0, function* () {
        createAnimation(loadingRef.value, {
          duration: 2500,
          loop: -1,
          timingFunction: "linear"
        }).rotate("0deg", "360deg").play();
      });
    }
    vue.onMounted(() => {
      vue.watch(vue.computed(() => {
        return props.loading;
      }), (val) => {
        if (val) {
          start();
        }
      }, {
        immediate: true
      });
    });
    return (_ctx = null, _cache = null) => {
      return __props.loading ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        key: 0,
        ref_key: "loadingRef",
        ref: loadingRef,
        class: vue.normalizeClass(["cl-loading", [new UTSJSONObject({}), new UTSJSONObject({
          "cl-loading--dark": vue.unref(isDark) && color.value == "",
          "-important-border-r-transparent": true
        }), pt.value.className]]),
        style: vue.normalizeStyle({
          height: vue.unref(getPx2)(__props.size),
          width: vue.unref(getPx2)(__props.size),
          borderWidth: "1px",
          borderTopColor: color.value,
          borderRightColor: "transparent",
          borderBottomColor: color.value,
          borderLeftColor: color.value
        })
      }), null, 6)) : vue.createCommentVNode("", true);
    };
  } }));
  const _style_0$D = { "cl-loading": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(63,63,70,1)", "borderRightColor": "rgba(63,63,70,1)", "borderBottomColor": "rgba(63,63,70,1)", "borderLeftColor": "rgba(63,63,70,1)" } }, "cl-loading--dark": { "": { "!borderTopColor": "#FFFFFF", "!borderRightColor": "rgba(0,0,0,0)", "!borderBottomColor": "#FFFFFF", "!borderLeftColor": "#FFFFFF" } } };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["styles", [_style_0$D]]]);
  let PassThrough$j = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            inner: { type: "Unknown", optional: true },
            error: { type: "Unknown", optional: true },
            loading: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.inner = this.__props__.inner;
      this.error = this.__props__.error;
      this.loading = this.__props__.loading;
      delete this.__props__;
    }
  };
  const _sfc_main$P = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-image"
  }, { __name: "cl-image", props: {
    // 透传样式
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 图片源
    src: {
      type: String,
      default: ""
    },
    // 图片裁剪、缩放的模式
    mode: {
      type: String,
      default: "aspectFill"
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: false
    },
    // 是否预览
    preview: {
      type: Boolean,
      default: false
    },
    // 预览图片列表
    previewList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 图片高度
    height: {
      type: [String, Number],
      default: 120
    },
    // 图片宽度
    width: {
      type: [String, Number],
      default: 120
    },
    // 是否显示加载状态
    showLoading: {
      type: Boolean,
      default: true
    },
    // 是否懒加载
    lazyLoad: {
      type: Boolean,
      default: false
    },
    // 图片显示动画效果
    fadeShow: {
      type: Boolean,
      default: false
    },
    // 是否解码webp格式
    webp: {
      type: Boolean,
      default: false
    },
    // 是否长按显示菜单
    showMenuByLongpress: {
      type: Boolean,
      default: false
    }
  }, emits: ["load", "error"], setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const isLoading = vue.ref(true);
    const isError = vue.ref(false);
    function onLoad(e) {
      isLoading.value = false;
      isError.value = false;
      emit("load", e);
    }
    function onError(e) {
      isLoading.value = false;
      isError.value = true;
      emit("error", e);
    }
    function onTap() {
      if (props.preview) {
        const urls = isEmpty(props.previewList) ? [props.src] : props.previewList;
        uni.previewImage({
          urls,
          current: props.src
        });
      }
    }
    return (_ctx = null, _cache = null) => {
      var _a2, _b, _c;
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      const _component_cl_loading = resolveEasycom(vue.resolveDynamicComponent("cl-loading"), __easycom_0$7);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-image", [new UTSJSONObject({}), pt.value.className]]),
        style: vue.normalizeStyle({
          width: vue.unref(parseRpx)(__props.width),
          height: vue.unref(parseRpx)(__props.height)
        })
      }), [
        isError.value ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 0,
          class: vue.normalizeClass(["cl-image__error", [
            new UTSJSONObject({}),
            new UTSJSONObject({
              "is-dark": vue.unref(isDark)
            }),
            (_a2 = pt.value.error) === null || _a2 === void 0 ? null : _a2.className
          ]])
        }), [
          vue.renderSlot(_ctx.$slots, "error", new UTSJSONObject({}), () => {
            var _a3, _b2, _c2, _d, _e;
            return [
              vue.createVNode(_component_cl_icon, new UTSJSONObject({
                name: (_b2 = (_a3 = pt.value.error) === null || _a3 === void 0 ? null : _a3.name) !== null && _b2 !== void 0 ? _b2 : "close-line",
                size: (_d = (_c2 = pt.value.error) === null || _c2 === void 0 ? null : _c2.size) !== null && _d !== void 0 ? _d : 40,
                pt: new UTSJSONObject({
                  className: vue.unref(parseClass)(["-important-text-surface-400", (_e = pt.value.error) === null || _e === void 0 ? null : _e.className])
                })
              }), null, 8, ["name", "size", "pt"])
            ];
          })
        ], 2)) : isLoading.value && __props.showLoading ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 1,
          class: vue.normalizeClass(["cl-image__loading", [
            new UTSJSONObject({}),
            new UTSJSONObject({
              "is-dark": vue.unref(isDark)
            }),
            (_b = pt.value.loading) === null || _b === void 0 ? null : _b.className
          ]])
        }), [
          vue.renderSlot(_ctx.$slots, "loading", new UTSJSONObject({}), () => {
            return [
              vue.createVNode(_component_cl_loading, new UTSJSONObject({ loading: true }))
            ];
          })
        ], 2)) : vue.createCommentVNode("", true),
        vue.createElementVNode("image", new UTSJSONObject({
          class: vue.normalizeClass(["cl-image__inner", [new UTSJSONObject({}), (_c = pt.value.inner) === null || _c === void 0 ? null : _c.className]]),
          src: __props.src,
          mode: __props.mode,
          "lazy-load": __props.lazyLoad,
          webp: __props.webp,
          "show-menu-by-longpress": __props.showMenuByLongpress,
          onLoad,
          onError,
          onClick: onTap
        }), null, 42, ["src", "mode", "lazy-load", "webp", "show-menu-by-longpress"]),
        vue.renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  } }));
  const _style_0$C = { "cl-image": { "": { "position": "relative", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center" } }, "cl-image__inner": { "": { "height": "100%", "width": "100%", "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx" } }, "cl-image__loading": { "": { "position": "absolute", "height": "100%", "width": "100%", "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx", "backgroundColor": "rgba(228,228,231,1)", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center" }, ".is-dark": { "backgroundColor": "rgba(63,63,70,1)" } }, "cl-image__error": { "": { "position": "absolute", "height": "100%", "width": "100%", "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx", "backgroundColor": "rgba(228,228,231,1)", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center" }, ".is-dark": { "backgroundColor": "rgba(63,63,70,1)" } } };
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["styles", [_style_0$C]]]);
  let PassThrough$i = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      delete this.__props__;
    }
  };
  const _sfc_main$O = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-text"
  }, { __name: "cl-text", props: {
    // 透传样式
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 显示的值
    value: {
      type: [String, Number],
      default: null
    },
    // 文本颜色
    color: {
      type: String,
      default: ""
    },
    // 字体大小
    size: {
      type: [Number, String],
      default: null
    },
    // 文本类型
    type: {
      type: String,
      default: "default"
    },
    // 是否开启脱敏/加密
    mask: {
      type: Boolean,
      default: false
    },
    // 金额货币符号
    currency: {
      type: String,
      default: "¥"
    },
    // 金额小数位数
    precision: {
      type: Number,
      default: 2
    },
    // 脱敏起始位置
    maskStart: {
      type: Number,
      default: 3
    },
    // 脱敏结束位置
    maskEnd: {
      type: Number,
      default: 4
    },
    // 脱敏替换字符
    maskChar: {
      type: String,
      default: "*"
    },
    // 是否省略号
    ellipsis: {
      type: Boolean,
      default: false
    },
    // 最大行数，仅在ellipsis时生效
    lines: {
      type: Number,
      default: 1
    },
    // 是否可选择
    selectable: {
      type: Boolean,
      default: false
    },
    // 显示连续空格
    space: {
      type: String,
      default: ""
    },
    // 是否解码 (app平台如需解析字符实体，需要配置为 true)
    decode: {
      type: Boolean,
      default: false
    },
    // 是否保留单词
    preWrap: {
      type: Boolean,
      default: false
    }
  }, setup(__props) {
    const props = __props;
    const cache = useCache(() => {
      return [props.color, props];
    }).cache;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const _a = useSize(() => {
      var _a2;
      return (_a2 = pt.value.className) !== null && _a2 !== void 0 ? _a2 : "";
    }), getSize = _a.getSize, getLineHeight = _a.getLineHeight, ptClassName = _a.ptClassName;
    const color = vue.computed(() => {
      if (props.color != "") {
        switch (props.color) {
          case "primary":
            return ctx.color["primary-500"];
          case "success":
            return "#22c55e";
          case "warn":
            return "#eab308";
          case "error":
            return "#ef4444";
          case "info":
            return isDark.value ? ctx.color["surface-300"] : ctx.color["surface-500"];
          case "dark":
            return ctx.color["surface-700"];
          case "light":
            return ctx.color["surface-50"];
          case "disabled":
            return ctx.color["surface-400"];
          default:
            return props.color;
        }
      }
      return isDark.value ? "white" : ctx.color["surface-700"];
    });
    const isDefaultSize = vue.computed(() => {
      var _a2;
      return !hasTextSize((_a2 = pt.value.className) !== null && _a2 !== void 0 ? _a2 : "");
    });
    const textStyle = vue.computed(() => {
      const style = new UTSJSONObject({});
      if (props.ellipsis) {
        style["lines"] = props.lines;
      }
      if (!hasTextColor(ptClassName.value)) {
        style["color"] = color.value;
      }
      const fontSize = getSize(props.size);
      if (fontSize != null) {
        style["fontSize"] = fontSize;
      }
      const isMultiLine = props.preWrap || !props.ellipsis || props.lines > 1;
      if (isMultiLine) {
        style["lineHeight"] = "normal";
      } else {
        const lineHeight = getLineHeight();
        if (lineHeight != null) {
          style["lineHeight"] = lineHeight;
        }
      }
      return style;
    });
    function formatPhone(phone) {
      if (phone.length != 11 || !props.mask)
        return phone;
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1".concat(props.maskChar.repeat(4), "$2"));
    }
    function formatName(name) {
      if (name.length <= 1 || !props.mask)
        return name;
      if (name.length == 2) {
        return name[0] + props.maskChar;
      }
      return name[0] + props.maskChar.repeat(name.length - 2) + name[name.length - 1];
    }
    function formatAmount(amount) {
      let num;
      if (typeof amount == "number") {
        num = amount;
      } else {
        num = parseFloat(amount);
      }
      const formatted = num.toFixed(props.precision);
      const parts = formatted.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return props.currency + parts.join(".");
    }
    function formatCard(card) {
      if (card.length < 8 || !props.mask)
        return card;
      const start = card.substring(0, props.maskStart);
      const end = card.substring(card.length - props.maskEnd);
      const middle = props.maskChar.repeat(card.length - props.maskStart - props.maskEnd);
      return start + middle + end;
    }
    function formatEmail(email) {
      if (!props.mask)
        return email;
      const atIndex = email.indexOf("@");
      if (atIndex == -1)
        return email;
      const username = email.substring(0, atIndex);
      const domain = email.substring(atIndex);
      if (username.length <= 2)
        return email;
      const maskedUsername = username[0] + props.maskChar.repeat(username.length - 2) + username[username.length - 1];
      return maskedUsername + domain;
    }
    const content = vue.computed(() => {
      var _a2;
      const val = (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : "";
      switch (props.type) {
        case "phone":
          return formatPhone(val);
        case "name":
          return formatName(val);
        case "amount":
          return formatAmount(val);
        case "card":
          return formatCard(val);
        case "email":
          return formatEmail(val);
        default:
          return val;
      }
    });
    return (_ctx = null, _cache = null) => {
      return vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
        class: vue.normalizeClass(["cl-text", [new UTSJSONObject({}), new UTSJSONObject({
          "cl-text--pre-wrap": __props.preWrap,
          "cl-text--ellipsis": __props.ellipsis,
          "cl-text--default-size": isDefaultSize.value
        }), vue.unref(ptClassName)]]),
        style: vue.normalizeStyle(textStyle.value),
        selectable: __props.selectable,
        space: __props.space,
        decode: __props.decode,
        key: vue.unref(cache).key
      }), [
        vue.renderSlot(_ctx.$slots, "default", new UTSJSONObject({}), () => {
          return [
            vue.createTextVNode(vue.toDisplayString(content.value), 1)
          ];
        })
      ], 14, ["selectable", "space", "decode"]);
    };
  } }));
  const _style_0$B = { "cl-text--ellipsis": { "": { "textOverflow": "ellipsis" } }, "cl-text--default-size": { "": { "fontSize": "28rpx", "lineHeight": "42rpx" } } };
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["styles", [_style_0$B]]]);
  let PassThrough$h = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            title: { type: "Unknown", optional: true },
            back: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.title = this.__props__.title;
      this.back = this.__props__.back;
      delete this.__props__;
    }
  };
  const _sfc_main$N = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-topbar"
  }, { __name: "cl-topbar", props: {
    // 样式透传对象，
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 顶部栏标题文本
    title: {
      type: String,
      default: ""
    },
    // 文字颜色，优先级最高
    color: {
      type: String,
      default: ""
    },
    // 背景颜色，优先级最高
    backgroundColor: {
      type: String,
      default: ""
    },
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      default: true
    },
    // 是否可以返回
    backable: {
      type: Boolean,
      default: true
    },
    // 返回按钮的跳转路径
    backPath: {
      type: String,
      default: ""
    },
    // 返回按钮的图标
    backIcon: {
      type: String,
      default: "back"
    },
    // 是否使用安全区域顶部边距
    safeAreaTop: {
      type: Boolean,
      default: false
    },
    // 是否固定在顶部
    fixed: {
      type: Boolean,
      default: false
    },
    // 内容高度
    height: {
      type: [Number, String],
      default: null
    }
  }, setup(__props) {
    const props = __props;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const offsetTop = vue.computed(() => {
      if (props.safeAreaTop) {
        return getSafeAreaHeight("top") + "px";
      }
      return "0px";
    });
    const height = vue.computed(() => {
      if (props.height == null) {
        return "44px";
      }
      return parseRpx(props.height);
    });
    const backgroundColor = vue.computed(() => {
      if (props.backgroundColor != "") {
        return props.backgroundColor;
      }
      const style = router.route().style;
      if (style != null) {
        if (style.navigationBarBackgroundColor != null) {
          return style.navigationBarBackgroundColor;
        }
      }
      return "";
    });
    const color = vue.computed(() => {
      if (props.color != "") {
        return props.color;
      }
      const style = router.route().style;
      if (style != null) {
        if (style.navigationBarTextStyle != null) {
          return style.navigationBarTextStyle;
        }
      }
      return "";
    });
    const topbarStyle = vue.computed(() => {
      const style = new UTSJSONObject({
        paddingTop: offsetTop.value
      });
      if (pt.value.className == null || !pt.value.className.includes("bg-")) {
        style["backgroundColor"] = backgroundColor.value;
      }
      return style;
    });
    function back() {
      if (props.backable) {
        if (props.backPath != "") {
          router.to(props.backPath);
        } else {
          if (router.isFirstPage()) {
            router.home();
          } else {
            router.back();
          }
        }
      }
    }
    return (_ctx = null, _cache = null) => {
      var _a, _b, _c, _d, _e;
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        __props.fixed ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 0,
          class: "cl-topbar-placeholder",
          style: vue.normalizeStyle({ marginTop: offsetTop.value, height: height.value })
        }), null, 4)) : vue.createCommentVNode("", true),
        vue.createElementVNode("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-topbar", [new UTSJSONObject({}), new UTSJSONObject({ "cl-topbar--fixed": __props.fixed }), pt.value.className]]),
          style: vue.normalizeStyle(topbarStyle.value)
        }), [
          vue.createElementVNode("view", new UTSJSONObject({
            class: "cl-topbar__inner",
            style: vue.normalizeStyle({ height: height.value })
          }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "cl-topbar__prepend" }), [
              __props.showBack ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                key: 0,
                class: "cl-topbar__icon",
                onClick: _cache[0] || (_cache[0] = ($event = null) => {
                  return back();
                })
              }), [
                vue.createVNode(_component_cl_icon, new UTSJSONObject({
                  pt: new UTSJSONObject({
                    className: vue.unref(parseClass)([[!__props.backable, "opacity-50"], (_a = pt.value.back) === null || _a === void 0 ? null : _a.className])
                  }),
                  name: __props.backIcon,
                  size: (_c = (_b = pt.value.back) === null || _b === void 0 ? null : _b.size) !== null && _c !== void 0 ? _c : 48,
                  color: (_e = (_d = pt.value.back) === null || _d === void 0 ? null : _d.color) !== null && _e !== void 0 ? _e : color.value
                }), null, 8, ["pt", "name", "size", "color"])
              ])) : vue.createCommentVNode("", true),
              vue.renderSlot(_ctx.$slots, "prepend")
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "cl-topbar__content" }), [
              vue.renderSlot(_ctx.$slots, "default", new UTSJSONObject({}), () => {
                var _a2;
                return [
                  vue.createVNode(_component_cl_text, new UTSJSONObject({
                    color: color.value,
                    pt: new UTSJSONObject({
                      className: vue.unref(parseClass)(["text-md", (_a2 = pt.value.title) === null || _a2 === void 0 ? null : _a2.className])
                    })
                  }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(__props.title), 1)
                      ];
                    }),
                    _: 1
                  }, 8, ["color", "pt"])
                ];
              })
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "cl-topbar__append" }), [
              vue.renderSlot(_ctx.$slots, "append")
            ])
          ], 4)
        ], 6)
      ], 64);
    };
  } }));
  const _style_0$A = { "cl-topbar__inner": { "": { "display": "flex", "width": "100%", "flexDirection": "row", "alignItems": "center" } }, "cl-topbar__icon": { "": { "display": "flex", "height": "100%", "alignItems": "center", "justifyContent": "center", "width": 30 } }, "cl-topbar__prepend": { "": { "position": "absolute", "left": 0, "top": 0, "zIndex": 10, "display": "flex", "height": "100%", "flexDirection": "row", "alignItems": "center", "marginLeft": 3 } }, "cl-topbar__content": { "": { "display": "flex", "height": "100%", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "cl-topbar__append": { "": { "position": "absolute", "right": 0, "top": 0, "zIndex": 10, "display": "flex", "height": "100%", "flexDirection": "row", "alignItems": "center", "marginRight": 3 } }, "cl-topbar--fixed": { "": { "position": "fixed", "top": 0, "left": 0, "right": 0, "width": "100%", "zIndex": 998 } } };
  const __easycom_1$6 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["styles", [_style_0$A]]]);
  class ClFooterOffset {
    constructor() {
      this.data = vue.reactive({});
    }
    set(value) {
      this.data[router.path()] = value;
    }
    get() {
      var _a;
      return (_a = this.data[router.path()]) !== null && _a !== void 0 ? _a : 0;
    }
  }
  const clFooterOffset = new ClFooterOffset();
  const _sfc_main$M = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-back-top"
  }, { __name: "cl-back-top", props: {
    top: {
      type: Number,
      default: null
    }
  }, emits: ["backTop"], setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const screenHeight = uni.getWindowInfo().screenHeight;
    const _b = usePage(), scrollToTop = _b.scrollToTop, onScroll = _b.onScroll, offScroll = _b.offScroll;
    const visible = vue.ref(false);
    const bottom = vue.computed(() => {
      let h = 20;
      if (hasCustomTabBar()) {
        h += getTabBarHeight();
      } else {
        h += clFooterOffset.get();
      }
      return h + "px";
    });
    const isPage = vue.computed(() => {
      return props.top == null;
    });
    function onVisible(top) {
      visible.value = top > screenHeight - 100;
    }
    function toTop() {
      if (isPage.value) {
        scrollToTop();
      }
      emit("backTop");
    }
    vue.onMounted(() => {
      if (isPage.value) {
        onScroll(onVisible);
      } else {
        vue.watch(vue.computed(() => {
          return props.top;
        }), (top) => {
          onVisible(top);
        }, {
          immediate: true
        });
      }
    });
    vue.onUnmounted(() => {
      if (isPage.value) {
        offScroll(onVisible);
      }
    });
    return (_ctx = null, _cache = null) => {
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: "cl-back-top-wrapper",
        style: vue.normalizeStyle({ bottom: bottom.value }),
        onClick: toTop
      }), [
        vue.createElementVNode("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-back-top", new UTSJSONObject({
            "is-show": visible.value
          })])
        }), [
          vue.createVNode(_component_cl_icon, new UTSJSONObject({
            name: "skip-up-line",
            color: "white",
            size: "25px"
          }))
        ], 2)
      ], 4);
    };
  } }));
  const _style_0$z = { "cl-back-top": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999, "backgroundColor": "rgba(20,184,166,1)", "transitionDuration": "300ms", "width": 40, "height": 40, "transitionProperty": "transform", "transform": "translateX(160rpx)" }, ".is-show": { "transform": "translateX(-20px)" } }, "cl-back-top-wrapper": { "": { "position": "fixed", "right": 0, "zIndex": 50, "overflow": "visible" } }, "@TRANSITION": { "cl-back-top": { "duration": "300ms", "property": "transform" } } };
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["styles", [_style_0$z]]]);
  let PassThrough$g = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            label: { type: "Unknown", optional: true },
            icon: { type: "Unknown", optional: true },
            loading: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.label = this.__props__.label;
      this.icon = this.__props__.icon;
      this.loading = this.__props__.loading;
      delete this.__props__;
    }
  };
  const _sfc_main$L = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-button"
  }, { __name: "cl-button", props: {
    // 样式穿透
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 按钮类型
    type: {
      type: String,
      default: "primary"
    },
    // 字体、图标颜色
    color: {
      type: String,
      default: ""
    },
    // 图标
    icon: {
      type: String,
      default: ""
    },
    // 文本按钮
    text: {
      type: Boolean,
      default: false
    },
    // 圆角按钮
    rounded: {
      type: Boolean,
      default: false
    },
    // 边框按钮
    border: {
      type: Boolean,
      default: false
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 按钮尺寸
    size: {
      type: String,
      default: "normal"
    },
    // 按钮点击态样式类
    hoverClass: {
      type: String,
      default: ""
    },
    // 是否阻止点击态冒泡
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    // 按住后多久出现点击态
    hoverStartTime: {
      type: Number,
      default: 20
    },
    // 手指松开后点击态保留时间
    hoverStayTime: {
      type: Number,
      default: 70
    },
    // 表单提交类型
    formType: {
      type: String,
      default: ""
    },
    // 开放能力类型
    openType: {
      type: String,
      default: ""
    },
    // 语言
    lang: {
      type: String,
      default: "zh_CN"
    },
    // 会话来源
    sessionFrom: {
      type: String,
      default: ""
    },
    // 会话标题
    sendMessageTitle: {
      type: String,
      default: ""
    },
    // 会话路径
    sendMessagePath: {
      type: String,
      default: ""
    },
    // 会话图片
    sendMessageImg: {
      type: String,
      default: ""
    },
    // 显示会话卡片
    showMessageCard: {
      type: Boolean,
      default: false
    },
    // 打开 APP 时，向 APP 传递的参数
    appParameter: {
      type: String,
      default: ""
    },
    // 群ID
    groupId: {
      type: String,
      default: ""
    },
    // 公会ID
    guildId: {
      type: String,
      default: ""
    },
    // 公众号ID
    publicId: {
      type: String,
      default: ""
    },
    // 手机号获取失败时是否弹出错误提示
    phoneNumberNoQuotaToast: {
      type: Boolean,
      default: false
    },
    // 是否创建直播活动
    createliveactivity: {
      type: Boolean,
      default: false
    }
  }, emits: [
    "click",
    "tap",
    "getuserinfo",
    "contact",
    "getphonenumber",
    "error",
    "opensetting",
    "launchapp",
    "chooseavatar",
    "chooseaddress",
    "chooseinvoicetitle",
    "addgroupapp",
    "subscribe",
    "login",
    "getrealtimephonenumber",
    "agreeprivacyauthorization"
  ], setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const slots = vue.useSlots();
    const cache = useCache(() => {
      return [
        props.type,
        props.text,
        props.disabled,
        props.loading,
        props.color
      ];
    }).cache;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const isIcon = vue.computed(() => {
      return get(slots, "default") == null && get(slots, "content") == null;
    });
    const textColor = vue.computed(() => {
      if (props.color != "") {
        return props.color;
      }
      let color = "light";
      if (props.text) {
        color = props.type;
        if (props.disabled) {
          color = "disabled";
        }
      }
      if (props.type == "light") {
        if (!isDark.value) {
          color = "dark";
        }
      }
      return color;
    });
    const leftIcon = vue.computed(() => {
      var _a2, _b;
      let color = textColor.value;
      let size;
      switch (props.size) {
        case "small":
          size = 26;
          break;
        default:
          size = 32;
          break;
      }
      const ptIcon = pt.value.icon;
      if (ptIcon != null) {
        color = (_a2 = ptIcon.color) !== null && _a2 !== void 0 ? _a2 : color;
        size = (_b = ptIcon.size) !== null && _b !== void 0 ? _b : size;
      }
      return {
        size,
        color
      };
    });
    const loadingIcon = vue.computed(() => {
      var _a2, _b;
      let color = textColor.value;
      let size;
      switch (props.size) {
        case "small":
          size = 22;
          break;
        default:
          size = 24;
          break;
      }
      const ptIcon = pt.value.loading;
      if (ptIcon != null) {
        color = (_a2 = ptIcon.color) !== null && _a2 !== void 0 ? _a2 : color;
        size = (_b = ptIcon.size) !== null && _b !== void 0 ? _b : size;
      }
      return {
        size,
        color
      };
    });
    const buttonStyle = vue.computed(() => {
      const style = new UTSJSONObject({});
      if (props.color != "") {
        style["border-color"] = props.color;
      }
      return style;
    });
    const isDisabled = vue.computed(() => {
      return props.disabled || props.loading;
    });
    function onTap(e) {
      if (isDisabled.value)
        return null;
      emit("click", e);
      emit("tap", e);
    }
    function onGetUserInfo(e) {
      emit("getuserinfo", e);
    }
    function onContact(e) {
      emit("contact", e);
    }
    function onGetPhoneNumber(e) {
      emit("getphonenumber", e);
    }
    function onError(e) {
      emit("error", e);
    }
    function onOpenSetting(e) {
      emit("opensetting", e);
    }
    function onLaunchApp(e) {
      emit("launchapp", e);
    }
    function onChooseAvatar(e) {
      emit("chooseavatar", e);
    }
    function onChooseAddress(e) {
      emit("chooseaddress", e);
    }
    function onChooseInvoiceTitle(e) {
      emit("chooseinvoicetitle", e);
    }
    function onAddGroupApp(e) {
      emit("addgroupapp", e);
    }
    function onSubscribe(e) {
      emit("subscribe", e);
    }
    function onLogin(e) {
      emit("login", e);
    }
    function onGetRealtimePhoneNumber(e) {
      emit("getrealtimephonenumber", e);
    }
    function onAgreePrivacyAuthorization(e) {
      emit("agreeprivacyauthorization", e);
    }
    const isHover = vue.ref(false);
    function onTouchStart() {
      if (!isDisabled.value) {
        isHover.value = true;
      }
    }
    function onTouchEnd() {
      isHover.value = false;
    }
    function onTouchCancel() {
      isHover.value = false;
    }
    return (_ctx = null, _cache = null) => {
      var _a2, _b, _c;
      const _component_cl_loading = resolveEasycom(vue.resolveDynamicComponent("cl-loading"), __easycom_0$7);
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-button", [
          new UTSJSONObject({}),
          "cl-button--".concat(__props.size),
          "cl-button--".concat(__props.type, " "),
          new UTSJSONObject({
            "cl-button--loading": __props.loading,
            "cl-button--disabled": __props.disabled,
            "cl-button--text": __props.text,
            "cl-button--border": __props.border,
            "cl-button--rounded": __props.rounded,
            "cl-button--icon": isIcon.value,
            "cl-button--hover": isHover.value,
            "is-dark": vue.unref(isDark)
          }),
          isHover.value ? __props.hoverClass : "",
          pt.value.className
        ]]),
        key: vue.unref(cache).key,
        style: vue.normalizeStyle(buttonStyle.value),
        onClick: vue.withModifiers(onTap, ["stop"])
      }), [
        vue.createElementVNode("button", new UTSJSONObject({
          class: "cl-button__clicker",
          disabled: isDisabled.value,
          "hover-class": __props.hoverClass,
          "hover-stop-propagation": __props.hoverStopPropagation,
          "hover-start-time": __props.hoverStartTime,
          "hover-stay-time": __props.hoverStayTime,
          "form-type": __props.formType,
          "open-type": __props.openType,
          lang: __props.lang,
          "session-from": __props.sessionFrom,
          "send-msgNotifier-title": __props.sendMessageTitle,
          "send-msgNotifier-path": __props.sendMessagePath,
          "send-msgNotifier-img": __props.sendMessageImg,
          "show-msgNotifier-card": __props.showMessageCard,
          "app-parameter": __props.appParameter,
          "group-id": __props.groupId,
          "guild-id": __props.guildId,
          "public-id": __props.publicId,
          "phone-number-no-quota-toast": __props.phoneNumberNoQuotaToast,
          createliveactivity: __props.createliveactivity,
          onGetuserinfo: onGetUserInfo,
          onContact,
          onGetphonenumber: onGetPhoneNumber,
          onError,
          onOpensetting: onOpenSetting,
          onLaunchapp: onLaunchApp,
          onChooseavatar: onChooseAvatar,
          onChooseaddress: onChooseAddress,
          onChooseinvoicetitle: onChooseInvoiceTitle,
          onAddgroupapp: onAddGroupApp,
          onSubscribe,
          onLogin,
          onGetrealtimephonenumber: onGetRealtimePhoneNumber,
          onAgreeprivacyauthorization: onAgreePrivacyAuthorization,
          onTouchstart: onTouchStart,
          onTouchend: onTouchEnd,
          onTouchcancel: onTouchCancel
        }), null, 40, ["disabled", "hover-class", "hover-stop-propagation", "hover-start-time", "hover-stay-time", "form-type", "open-type", "lang", "session-from", "send-msgNotifier-title", "send-msgNotifier-path", "send-msgNotifier-img", "show-msgNotifier-card", "app-parameter", "group-id", "guild-id", "public-id", "phone-number-no-quota-toast", "createliveactivity"]),
        __props.loading && !__props.disabled ? (vue.openBlock(), vue.createBlock(_component_cl_loading, new UTSJSONObject({
          key: 0,
          color: loadingIcon.value.color,
          size: loadingIcon.value.size,
          pt: new UTSJSONObject({
            className: vue.unref(parseClass)(["mr--bracket-start-10rpx-bracket-end-", (_a2 = pt.value.loading) === null || _a2 === void 0 ? null : _a2.className])
          })
        }), null, 8, ["color", "size", "pt"])) : vue.createCommentVNode("", true),
        __props.icon ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
          key: 1,
          name: __props.icon,
          color: leftIcon.value.color,
          size: leftIcon.value.size,
          pt: new UTSJSONObject({
            className: vue.unref(parseClass)([
              new UTSJSONObject({
                "mr--bracket-start-8rpx-bracket-end-": !isIcon.value
              }),
              (_b = pt.value.icon) === null || _b === void 0 ? null : _b.className
            ])
          })
        }), null, 8, ["name", "color", "size", "pt"])) : vue.createCommentVNode("", true),
        !isIcon.value ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, new UTSJSONObject({ key: 2 }), [
          vue.createVNode(_component_cl_text, new UTSJSONObject({
            color: textColor.value,
            pt: new UTSJSONObject({
              className: vue.unref(parseClass)([
                "cl-button__label",
                new UTSJSONObject({
                  "text-sm": __props.size == "small"
                }),
                (_c = pt.value.label) === null || _c === void 0 ? null : _c.className
              ])
            })
          }), {
            default: vue.withCtx(() => {
              return [
                vue.renderSlot(_ctx.$slots, "default")
              ];
            }),
            _: 3
          }, 8, ["color", "pt"]),
          vue.renderSlot(_ctx.$slots, "content")
        ], 64)) : vue.createCommentVNode("", true)
      ], 6);
    };
  } }));
  const _style_0$y = { "cl-button": { "": { "position": "relative", "boxSizing": "border-box", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(0,0,0,0)", "borderRightColor": "rgba(0,0,0,0)", "borderBottomColor": "rgba(0,0,0,0)", "borderLeftColor": "rgba(0,0,0,0)", "overflow": "visible", "transitionDuration": "0.3s", "transitionProperty": "backgroundColor,borderColor,opacity" }, ".is-dark.cl-button--disabled": { "backgroundColor": "rgba(161,161,170,1)" }, ".is-dark.cl-button--disabled.cl-button--border": { "borderTopColor": "rgba(113,113,122,1)", "borderRightColor": "rgba(113,113,122,1)", "borderBottomColor": "rgba(113,113,122,1)", "borderLeftColor": "rgba(113,113,122,1)" }, ".is-dark.cl-button--text": { "backgroundColor": "rgba(0,0,0,0)" }, ".is-dark.cl-button--light": { "borderTopColor": "rgba(113,113,122,1)", "borderRightColor": "rgba(113,113,122,1)", "borderBottomColor": "rgba(113,113,122,1)", "borderLeftColor": "rgba(113,113,122,1)" }, ".cl-button+": { "marginLeft": "14rpx" } }, "cl-button__clicker": { "": { "position": "absolute", "marginTop": 0, "marginRight": 0, "marginBottom": 0, "marginLeft": 0, "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "height": "100%", "width": "100%", "opacity": 0, "zIndex": 10 } }, "cl-button--small": { "": { "paddingTop": "6rpx", "paddingRight": "14rpx", "paddingBottom": "6rpx", "paddingLeft": "14rpx", "borderTopLeftRadius": "12rpx", "borderTopRightRadius": "12rpx", "borderBottomRightRadius": "12rpx", "borderBottomLeftRadius": "12rpx" }, ".cl-button--icon": { "paddingTop": "10rpx", "paddingRight": "10rpx", "paddingBottom": "10rpx", "paddingLeft": "10rpx" } }, "cl-button--normal": { "": { "paddingTop": "10rpx", "paddingRight": "28rpx", "paddingBottom": "10rpx", "paddingLeft": "28rpx", "borderTopLeftRadius": "16rpx", "borderTopRightRadius": "16rpx", "borderBottomRightRadius": "16rpx", "borderBottomLeftRadius": "16rpx" }, ".cl-button--icon": { "paddingTop": "14rpx", "paddingRight": "14rpx", "paddingBottom": "14rpx", "paddingLeft": "14rpx" } }, "cl-button--large": { "": { "paddingTop": "14rpx", "paddingRight": "32rpx", "paddingBottom": "14rpx", "paddingLeft": "32rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx" }, ".cl-button--icon": { "paddingTop": "18rpx", "paddingRight": "18rpx", "paddingBottom": "18rpx", "paddingLeft": "18rpx" } }, "cl-button--rounded": { "": { "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999 } }, "cl-button--primary": { "": { "backgroundColor": "rgba(20,184,166,1)" }, ".cl-button--hover": { "backgroundColor": "rgba(13,148,136,1)" }, ".cl-button--text": { "backgroundColor": "rgba(0,0,0,0)" }, ".cl-button--text.cl-button--hover": { "backgroundColor": "rgba(0,0,0,0)", "opacity": 0.5 }, ".cl-button--border": { "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)" } }, "cl-button--warn": { "": { "backgroundColor": "rgba(234,179,8,1)" }, ".cl-button--hover": { "backgroundColor": "rgba(202,138,4,1)" }, ".cl-button--text": { "backgroundColor": "rgba(0,0,0,0)" }, ".cl-button--text.cl-button--hover": { "backgroundColor": "rgba(0,0,0,0)", "opacity": 0.5 }, ".cl-button--border": { "borderTopColor": "rgba(234,179,8,1)", "borderRightColor": "rgba(234,179,8,1)", "borderBottomColor": "rgba(234,179,8,1)", "borderLeftColor": "rgba(234,179,8,1)" } }, "cl-button--error": { "": { "backgroundColor": "rgba(239,68,68,1)" }, ".cl-button--hover": { "backgroundColor": "rgba(220,38,38,1)" }, ".cl-button--text": { "backgroundColor": "rgba(0,0,0,0)" }, ".cl-button--text.cl-button--hover": { "backgroundColor": "rgba(0,0,0,0)", "opacity": 0.5 }, ".cl-button--border": { "borderTopColor": "rgba(239,68,68,1)", "borderRightColor": "rgba(239,68,68,1)", "borderBottomColor": "rgba(239,68,68,1)", "borderLeftColor": "rgba(239,68,68,1)" } }, "cl-button--info": { "": { "backgroundColor": "rgba(113,113,122,1)" }, ".cl-button--hover": { "backgroundColor": "rgba(82,82,91,1)" }, ".cl-button--text": { "backgroundColor": "rgba(0,0,0,0)" }, ".cl-button--text.cl-button--hover": { "backgroundColor": "rgba(0,0,0,0)", "opacity": 0.5 }, ".cl-button--border": { "borderTopColor": "rgba(113,113,122,1)", "borderRightColor": "rgba(113,113,122,1)", "borderBottomColor": "rgba(113,113,122,1)", "borderLeftColor": "rgba(113,113,122,1)" } }, "cl-button--success": { "": { "backgroundColor": "rgba(34,197,94,1)" }, ".cl-button--hover": { "backgroundColor": "rgba(22,163,74,1)" }, ".cl-button--text": { "backgroundColor": "rgba(0,0,0,0)" }, ".cl-button--text.cl-button--hover": { "backgroundColor": "rgba(0,0,0,0)", "opacity": 0.5 }, ".cl-button--border": { "borderTopColor": "rgba(34,197,94,1)", "borderRightColor": "rgba(34,197,94,1)", "borderBottomColor": "rgba(34,197,94,1)", "borderLeftColor": "rgba(34,197,94,1)" } }, "cl-button--light": { "": { "borderTopColor": "rgba(63,63,70,1)", "borderRightColor": "rgba(63,63,70,1)", "borderBottomColor": "rgba(63,63,70,1)", "borderLeftColor": "rgba(63,63,70,1)" }, ".cl-button--hover": { "backgroundColor": "rgba(244,244,245,1)" }, ".is-dark.cl-button--hover": { "backgroundColor": "rgba(63,63,70,1)" } }, "cl-button--dark": { "": { "backgroundColor": "rgba(63,63,70,1)" }, ".cl-button--hover": { "backgroundColor": "rgba(39,39,42,1)" } }, "cl-button--disabled": { "": { "backgroundColor": "rgba(212,212,216,1)" }, ".cl-button--border": { "borderTopColor": "rgba(212,212,216,1)", "borderRightColor": "rgba(212,212,216,1)", "borderBottomColor": "rgba(212,212,216,1)", "borderLeftColor": "rgba(212,212,216,1)" } }, "cl-button--loading": { "": { "opacity": 0.6 } }, "@TRANSITION": { "cl-button": { "duration": "0.3s", "property": "backgroundColor,borderColor,opacity" } } };
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["styles", [_style_0$y]]]);
  class HeaderPassThrough extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            text: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = HeaderPassThrough.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.text = this.__props__.text;
      delete this.__props__;
    }
  }
  let PassThrough$f = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            inner: { type: "Unknown", optional: true },
            header: { type: HeaderPassThrough, optional: true },
            container: { type: "Unknown", optional: true },
            mask: { type: "Unknown", optional: true },
            draw: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.inner = this.__props__.inner;
      this.header = this.__props__.header;
      this.container = this.__props__.container;
      this.mask = this.__props__.mask;
      this.draw = this.__props__.draw;
      delete this.__props__;
    }
  };
  let Swipe$1 = class Swipe2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            isMove: { type: Boolean, optional: false },
            isTouch: { type: Boolean, optional: false },
            startY: { type: Number, optional: false },
            offsetY: { type: Number, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Swipe2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.isMove = this.__props__.isMove;
      this.isTouch = this.__props__.isTouch;
      this.startY = this.__props__.startY;
      this.offsetY = this.__props__.offsetY;
      delete this.__props__;
    }
  };
  const _sfc_main$K = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-popup"
  }, { __name: "cl-popup", props: {
    // 透传样式配置
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 是否可见
    modelValue: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: null
    },
    // 弹出方向
    direction: {
      type: String,
      default: "bottom"
    },
    // 弹出框宽度
    size: {
      type: [String, Number],
      default: ""
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true
    },
    // 显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 是否显示遮罩层
    showMask: {
      type: Boolean,
      default: true
    },
    // 是否点击遮罩层关闭弹窗
    maskClosable: {
      type: Boolean,
      default: true
    },
    // 是否开启拖拽关闭
    swipeClose: {
      type: Boolean,
      default: true
    },
    // 拖拽关闭的阈值
    swipeCloseThreshold: {
      type: Number,
      default: 150
    },
    // 触摸事件响应方式
    pointerEvents: {
      type: String,
      default: "auto"
    },
    // 是否开启缓存
    keepAlive: {
      type: Boolean,
      default: false
    },
    // 是否启用 portal
    enablePortal: {
      type: Boolean,
      default: true
    }
  }, emits: ["update:modelValue", "open", "opened", "close", "closed", "maskClose"], setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const visible = vue.ref(false);
    const status = vue.ref(0);
    const isOpen = vue.ref(false);
    const isOpened = vue.ref(false);
    const zIndex = vue.ref(config$1.zIndex);
    const height = vue.computed(() => {
      switch (props.direction) {
        case "top":
        case "bottom":
          return parseRpx(props.size);
        case "left":
        case "right":
          return "100%";
        default:
          return "";
      }
    });
    const width = vue.computed(() => {
      switch (props.direction) {
        case "top":
        case "bottom":
          return "100%";
        case "left":
        case "right":
        case "center":
          return parseRpx(props.size);
        default:
          return "";
      }
    });
    const paddingBottom = vue.computed(() => {
      let h = 0;
      if (props.direction == "bottom") {
        h += getSafeAreaHeight("bottom");
      }
      return h + "px";
    });
    const isSwipeClose = vue.computed(() => {
      return props.direction == "bottom" && props.swipeClose;
    });
    let timer = 0;
    function open() {
      zIndex.value = config$1.zIndex++;
      if (!visible.value) {
        visible.value = true;
        emit("update:modelValue", true);
        emit("open");
        setTimeout(() => {
          status.value = 1;
          timer = setTimeout(() => {
            isOpened.value = true;
            emit("opened");
          }, 350);
        }, isAppIOS() ? 100 : 50);
      }
    }
    function close() {
      if (status.value == 1) {
        isOpened.value = false;
        status.value = 2;
        emit("close");
        if (timer != 0) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          visible.value = false;
          status.value = 0;
          emit("update:modelValue", false);
          emit("closed");
        }, 350);
      }
    }
    function maskClose() {
      if (props.maskClosable) {
        close();
      }
      emit("maskClose");
    }
    const swipe = vue.reactive(new Swipe$1({
      isMove: false,
      isTouch: false,
      startY: 0,
      offsetY: 0
      // 初始偏移量为0
    }));
    function onTouchStart(e) {
      if (props.direction != "bottom") {
        return null;
      }
      if (isOpened.value && isSwipeClose.value) {
        swipe.isTouch = true;
        swipe.startY = e.touches[0].clientY;
      }
    }
    function onTouchMove(e) {
      if (swipe.isTouch) {
        swipe.isMove = true;
        const offsetY = e.touches[0].pageY - swipe.startY;
        if (offsetY > 0) {
          swipe.offsetY = offsetY;
        }
      }
    }
    function onTouchEnd() {
      if (swipe.isTouch) {
        swipe.isTouch = false;
        swipe.isMove = false;
        if (swipe.offsetY > props.swipeCloseThreshold) {
          close();
        }
        swipe.offsetY = 0;
      }
    }
    const popupStyle = vue.computed(() => {
      const style = new UTSJSONObject({});
      style["height"] = height.value;
      style["width"] = width.value;
      if (swipe.isTouch) {
        style["transform"] = "translateY(".concat(swipe.offsetY, "px)");
      }
      return style;
    });
    vue.watch(vue.computed(() => {
      return props.modelValue;
    }), (val) => {
      if (val) {
        open();
      } else {
        close();
      }
    }, {
      immediate: true
    });
    vue.watch(status, (val) => {
      isOpen.value = val == 1;
    });
    __expose({
      isOpened,
      isOpen,
      open,
      close
    });
    return (_ctx = null, _cache = null) => {
      var _a2, _b, _c, _d, _e;
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      return (__props.keepAlive ? true : visible.value) ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        key: 0,
        class: vue.normalizeClass(["cl-popup-wrapper", [new UTSJSONObject({}), "cl-popup-wrapper--".concat(__props.direction)]]),
        style: vue.normalizeStyle({
          zIndex: zIndex.value,
          pointerEvents: __props.pointerEvents
        }),
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      }), [
        __props.showMask ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 0,
          class: vue.normalizeClass(["cl-popup-mask", [
            new UTSJSONObject({}),
            new UTSJSONObject({
              "is-open": status.value == 1,
              "is-close": status.value == 2
            }),
            (_a2 = pt.value.mask) === null || _a2 === void 0 ? null : _a2.className
          ]]),
          onClick: maskClose
        }), null, 2)) : vue.createCommentVNode("", true),
        vue.createElementVNode("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-popup", [new UTSJSONObject({}), new UTSJSONObject({
            "is-open": status.value == 1,
            "is-close": status.value == 2,
            "is-custom-navbar": vue.unref(router).isCustomNavbarPage(),
            "stop-transition": swipe.isTouch
          }), pt.value.className]]),
          style: vue.normalizeStyle(popupStyle.value),
          onTouchstart: onTouchStart,
          onTouchmove: onTouchMove,
          onTouchend: onTouchEnd,
          onTouchcancel: onTouchEnd
        }), [
          vue.createElementVNode("view", new UTSJSONObject({
            class: vue.normalizeClass(["cl-popup__inner", [
              new UTSJSONObject({}),
              new UTSJSONObject({
                "is-dark": vue.unref(isDark)
              }),
              (_b = pt.value.inner) === null || _b === void 0 ? null : _b.className
            ]]),
            style: vue.normalizeStyle({
              paddingBottom: paddingBottom.value
            })
          }), [
            isSwipeClose.value ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              key: 0,
              class: vue.normalizeClass(["cl-popup__draw", [
                new UTSJSONObject({}),
                new UTSJSONObject({
                  "-important-bg-surface-400": swipe.isMove
                }),
                (_c = pt.value.draw) === null || _c === void 0 ? null : _c.className
              ]])
            }), null, 2)) : vue.createCommentVNode("", true),
            __props.showHeader ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              key: 1,
              class: vue.normalizeClass(["cl-popup__header", [new UTSJSONObject({}), (_d = pt.value.header) === null || _d === void 0 ? null : _d.className]])
            }), [
              vue.renderSlot(_ctx.$slots, "header", new UTSJSONObject({}), () => {
                var _a3, _b2;
                return [
                  vue.createVNode(_component_cl_text, new UTSJSONObject({
                    ellipsis: "",
                    pt: new UTSJSONObject({
                      className: "text-lg font-bold ".concat((_b2 = (_a3 = pt.value.header) === null || _a3 === void 0 ? null : _a3.text) === null || _b2 === void 0 ? null : _b2.className)
                    })
                  }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(__props.title), 1)
                      ];
                    }),
                    _: 1
                  }, 8, ["pt"])
                ];
              }),
              isOpen.value && __props.showClose ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
                key: 0,
                name: "close-circle-fill",
                size: 40,
                pt: new UTSJSONObject({
                  className: vue.unref(parseClass)([
                    "absolute right--bracket-start-24rpx-bracket-end- text-surface-400",
                    [vue.unref(isDark), "text-surface-50"]
                  ])
                }),
                onClick: close,
                onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                }, ["stop"]))
              }), null, 8, ["pt"])) : vue.createCommentVNode("", true)
            ], 2)) : vue.createCommentVNode("", true),
            vue.createElementVNode("view", new UTSJSONObject({
              class: vue.normalizeClass(["cl-popup__container", [new UTSJSONObject({}), (_e = pt.value.container) === null || _e === void 0 ? null : _e.className]]),
              onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
              }, ["stop"]))
            }), [
              vue.renderSlot(_ctx.$slots, "default")
            ], 34)
          ], 6)
        ], 38)
      ], 38)), [
        [vue.vShow, visible.value]
      ]) : vue.createCommentVNode("", true);
    };
  } }));
  const _style_0$x = { "cl-popup-wrapper": { "": { "height": "100%", "width": "100%", "position": "fixed", "top": 0, "bottom": 0, "left": 0, "right": 0, "pointerEvents": "none" } }, "cl-popup-mask": { ".cl-popup-wrapper ": { "position": "absolute", "top": 0, "bottom": 0, "left": 0, "right": 0, "height": "100%", "width": "100%", "backgroundColor": "rgba(0,0,0,1)", "opacity": 0, "transitionProperty": "opacity" }, ".cl-popup-wrapper .is-open": { "opacity": 0.4, "transitionDuration": "0.3s" }, ".cl-popup-wrapper .is-close": { "transitionDuration": "0.3s" } }, "cl-popup": { ".cl-popup-wrapper ": { "position": "absolute", "transitionDuration": "300ms", "transitionProperty": "transform" }, ".cl-popup-wrapper .stop-transition": { "transitionProperty": "none" }, ".cl-popup-wrapper--left ": { "left": 0, "top": 0, "transform": "translateX(-100%)" }, ".cl-popup-wrapper--left .is-open": { "transform": "translateX(0)" }, ".cl-popup-wrapper--right ": { "right": 0, "top": 0, "transform": "translateX(100%)" }, ".cl-popup-wrapper--right .is-open": { "transform": "translateX(0)" }, ".cl-popup-wrapper--top ": { "left": 0, "top": 0, "transform": "translateY(-100%)" }, ".cl-popup-wrapper--top .is-open": { "transform": "translateY(0)" }, ".cl-popup-wrapper--left>.is-custom-navbar": { "top": 0 }, ".cl-popup-wrapper--right>.is-custom-navbar": { "top": 0 }, ".cl-popup-wrapper--top>.is-custom-navbar": { "top": 0 }, ".cl-popup-wrapper--bottom>": { "left": 0, "bottom": 0, "transform": "translateY(100%)" }, ".cl-popup-wrapper--bottom>.is-open": { "transform": "translateY(0)" }, ".cl-popup-wrapper--bottom>.is-close": { "transform": "translateY(100%)" }, ".cl-popup-wrapper--center>": { "transform": "scale(1.3)", "opacity": 0, "transitionProperty": "transform,opacity" }, ".cl-popup-wrapper--center>.is-open": { "transform": "translate(0, 0) scale(1)", "opacity": 1 } }, "cl-popup__inner": { ".cl-popup-wrapper ": { "display": "flex", "height": "100%", "width": "100%", "flexDirection": "column", "backgroundColor": "rgba(255,255,255,1)" }, ".cl-popup-wrapper .is-dark": { "backgroundColor": "rgba(63,63,70,1)" }, ".cl-popup-wrapper--top .cl-popup ": { "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx" }, ".cl-popup-wrapper--bottom>.cl-popup ": { "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx" }, ".cl-popup-wrapper--center>.cl-popup ": { "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx", "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx" } }, "cl-popup__draw": { ".cl-popup-wrapper ": { "borderTopLeftRadius": "10.5rpx", "borderTopRightRadius": "10.5rpx", "borderBottomRightRadius": "10.5rpx", "borderBottomLeftRadius": "10.5rpx", "backgroundColor": "rgba(228,228,231,1)", "position": "absolute", "top": "14rpx", "left": "50%", "height": "10rpx", "width": "70rpx", "transform": "translateX(-50%)", "transitionProperty": "backgroundColor", "transitionDuration": "0.2s" } }, "cl-popup__header": { ".cl-popup-wrapper ": { "display": "flex", "flexDirection": "row", "flexWrap": "wrap", "alignItems": "center", "height": "90rpx", "paddingTop": 0, "paddingRight": "80rpx", "paddingBottom": 0, "paddingLeft": "26rpx" } }, "cl-popup__container": { ".cl-popup-wrapper ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "cl-popup-wrapper--center": { "": { "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center" } }, "@TRANSITION": { "cl-popup-mask": { "property": "opacity", "duration": "0.3s" }, "cl-popup": { "duration": "300ms", "property": "transform,opacity" }, "cl-popup__draw": { "property": "backgroundColor", "duration": "0.2s" } } };
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["styles", [_style_0$x]]]);
  const _sfc_main$J = /* @__PURE__ */ vue.defineComponent({
    __name: "cl-confirm",
    setup(__props, _a) {
      var __expose = _a.expose;
      const visible = vue.ref(false);
      const closed = vue.ref(true);
      const config2 = vue.reactive({
        title: "",
        msgNotifier: ""
      });
      const loading = vue.ref(false);
      function showLoading() {
        loading.value = true;
      }
      function hideLoading() {
        loading.value = false;
      }
      function close() {
        visible.value = false;
      }
      let timer = 0;
      function open(options) {
        const next = () => {
          var _a2, _b, _c, _d, _e;
          clearTimeout(timer);
          closed.value = false;
          visible.value = true;
          config2.title = options.title;
          config2.msgNotifier = options.msgNotifier;
          config2.showCancel = (_a2 = options.showCancel) !== null && _a2 !== void 0 ? _a2 : true;
          config2.showConfirm = (_b = options.showConfirm) !== null && _b !== void 0 ? _b : true;
          config2.cancelText = (_c = options.cancelText) !== null && _c !== void 0 ? _c : t$1("取消");
          config2.confirmText = (_d = options.confirmText) !== null && _d !== void 0 ? _d : t$1("确定");
          config2.duration = (_e = options.duration) !== null && _e !== void 0 ? _e : 0;
          config2.callback = options.callback;
          config2.beforeClose = options.beforeClose;
          if (config2.duration != 0) {
            timer = setTimeout(() => {
              close();
            }, config2.duration);
          }
        };
        if (closed.value) {
          next();
        } else {
          setTimeout(() => {
            next();
          }, 360);
        }
      }
      function onClosed() {
        hideLoading();
        closed.value = true;
      }
      function onAction(action) {
        if (config2.beforeClose == null) {
          visible.value = false;
          if (config2.callback != null) {
            config2.callback(action);
          }
        } else {
          config2.beforeClose(action, {
            close,
            showLoading,
            hideLoading
          });
        }
      }
      __expose({
        open,
        close
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_button = resolveEasycom(vue.resolveDynamicComponent("cl-button"), __easycom_4);
        const _component_cl_popup = resolveEasycom(vue.resolveDynamicComponent("cl-popup"), __easycom_5);
        return vue.openBlock(), vue.createBlock(_component_cl_popup, new UTSJSONObject({
          modelValue: visible.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event = null) => {
            return visible.value = $event;
          }),
          pt: new UTSJSONObject({
            className: "-important-rounded--bracket-start-60rpx-bracket-end-"
          }),
          size: "70%",
          "show-close": false,
          "show-header": false,
          "mask-closable": false,
          direction: "center",
          onMaskClose: _cache[3] || (_cache[3] = ($event = null) => {
            return onAction("close");
          }),
          onClosed
        }), new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("view", new UTSJSONObject({ class: "cl-confirm" }), [
                vue.createVNode(_component_cl_text, new UTSJSONObject({
                  pt: new UTSJSONObject({
                    className: vue.unref(parseClass)(["cl-confirm__title text-lg text-center font-bold mb-2"])
                  })
                }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createTextVNode(vue.toDisplayString(config2.title), 1)
                    ];
                  }),
                  _: 1
                }, 8, ["pt"]),
                vue.createVNode(_component_cl_text, new UTSJSONObject({
                  pt: new UTSJSONObject({
                    className: vue.unref(parseClass)(["cl-confirm__message text-md text-center mb-8"])
                  })
                }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createTextVNode(vue.toDisplayString(config2.msgNotifier), 1)
                    ];
                  }),
                  _: 1
                }, 8, ["pt"]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "cl-confirm__actions" }), [
                  config2.showCancel ? (vue.openBlock(), vue.createBlock(_component_cl_button, new UTSJSONObject({
                    key: 0,
                    size: "large",
                    text: "",
                    rounded: "",
                    border: "",
                    type: "info",
                    pt: new UTSJSONObject({
                      className: "flex-1 h--bracket-start-80rpx-bracket-end-"
                    }),
                    onClick: _cache[0] || (_cache[0] = ($event = null) => {
                      return onAction("cancel");
                    })
                  }), new UTSJSONObject({
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(config2.cancelText), 1)
                      ];
                    }),
                    _: 1
                  }))) : vue.createCommentVNode("", true),
                  config2.showConfirm ? (vue.openBlock(), vue.createBlock(_component_cl_button, new UTSJSONObject({
                    key: 1,
                    size: "large",
                    rounded: "",
                    loading: loading.value,
                    pt: new UTSJSONObject({
                      className: "flex-1 h--bracket-start-80rpx-bracket-end-"
                    }),
                    onClick: _cache[1] || (_cache[1] = ($event = null) => {
                      return onAction("confirm");
                    })
                  }), new UTSJSONObject({
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(config2.confirmText), 1)
                      ];
                    }),
                    _: 1
                  }), 8, ["loading"])) : vue.createCommentVNode("", true)
                ])
              ])
            ];
          }),
          _: 1
        }), 8, ["modelValue"]);
      };
    }
  });
  const _style_0$w = { "cl-confirm": { "": { "paddingTop": "28rpx", "paddingRight": "28rpx", "paddingBottom": "28rpx", "paddingLeft": "28rpx" } }, "cl-confirm__actions": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center" } } };
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["styles", [_style_0$w]]]);
  class ToastItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            id: { type: Number, optional: false },
            visible: { type: Boolean, optional: false },
            isOpen: { type: Boolean, optional: false },
            icon: { type: String, optional: true },
            image: { type: String, optional: true },
            msgNotifier: { type: String, optional: false },
            position: { type: "Unknown", optional: false },
            duration: { type: Number, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = ToastItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.id = this.__props__.id;
      this.visible = this.__props__.visible;
      this.isOpen = this.__props__.isOpen;
      this.icon = this.__props__.icon;
      this.image = this.__props__.image;
      this.msgNotifier = this.__props__.msgNotifier;
      this.position = this.__props__.position;
      this.duration = this.__props__.duration;
      delete this.__props__;
    }
  }
  const _sfc_main$I = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-toast"
  }, { __name: "cl-toast", setup(__props, _a) {
    var __expose = _a.expose;
    const list2 = vue.ref([]);
    let id = 0;
    function close(id2) {
      const item = UTS.arrayFind(list2.value, (item2) => {
        return item2.id == id2;
      });
      if (item != null) {
        item.visible = false;
      }
    }
    function open(options) {
      var _a2, _b, _c;
      const item = vue.reactive(new ToastItem({
        id: id++,
        visible: true,
        isOpen: false,
        icon: options.icon,
        image: options.image,
        duration: (_a2 = options.duration) !== null && _a2 !== void 0 ? _a2 : 2e3,
        position: (_b = options.position) !== null && _b !== void 0 ? _b : "center",
        msgNotifier: (_c = options.msgNotifier) !== null && _c !== void 0 ? _c : ""
      }));
      if (!isNull(item.icon) || !isNull(item.image)) {
        item.position = "center";
      }
      switch (options.type) {
        case "success":
          item.icon = "checkbox-circle-line";
          break;
        case "warn":
          item.icon = "error-warning-line";
          break;
        case "error":
          item.icon = "close-circle-line";
          break;
        case "question":
          item.icon = "question-line";
          break;
        case "disabled":
          item.icon = "prohibited-line";
          break;
        case "stop":
          item.icon = "indeterminate-circle-line";
          break;
      }
      if (options.clear == true) {
        list2.value = [item];
      } else {
        list2.value.push(item);
      }
      setTimeout(() => {
        item.isOpen = true;
        if (item.duration != 0) {
          setTimeout(() => {
            close(item.id);
          }, item.duration);
        }
      }, 50);
    }
    __expose({
      open,
      close
    });
    return (_ctx = null, _cache = null) => {
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      const _component_cl_popup = resolveEasycom(vue.resolveDynamicComponent("cl-popup"), __easycom_5);
      return vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(list2.value, (item, id2) => {
        return vue.openBlock(), vue.createBlock(_component_cl_popup, new UTSJSONObject({
          key: id2,
          direction: item.position,
          "show-mask": false,
          "show-header": false,
          "swipe-close": false,
          pt: new UTSJSONObject({
            inner: new UTSJSONObject({
              className: "-important-bg-transparent"
            })
          }),
          "keep-alive": "",
          "pointer-events": "none",
          modelValue: item.visible,
          "onUpdate:modelValue": ($event = null) => {
            return item.visible = $event;
          }
        }), new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("view", new UTSJSONObject({ class: "cl-toast-wrapper" }), [
                vue.createElementVNode("view", new UTSJSONObject({
                  class: vue.normalizeClass(["cl-toast", [new UTSJSONObject({}), new UTSJSONObject({
                    "is-dark": vue.unref(isDark),
                    "is-open": item.isOpen
                  }), "cl-toast--".concat(item.position)]])
                }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "flex flex-row justify-center" }), [
                    item.icon != null ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
                      key: 0,
                      color: "white",
                      name: item.icon,
                      size: 56,
                      pt: new UTSJSONObject({
                        className: "mb-1"
                      })
                    }), null, 8, ["name"])) : vue.createCommentVNode("", true)
                  ]),
                  vue.createVNode(_component_cl_text, new UTSJSONObject({
                    color: "white",
                    pt: new UTSJSONObject({
                      className: "text-center"
                    })
                  }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(item.msgNotifier), 1)
                      ];
                    }),
                    _: 2
                  }, 1024)
                ], 2)
              ])
            ];
          }),
          _: 2
        }), 1032, ["direction", "modelValue", "onUpdate:modelValue"]);
      }), 128);
    };
  } }));
  const _style_0$v = { "cl-toast-wrapper": { "": { "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "paddingTop": "50rpx", "paddingRight": 0, "paddingBottom": "50rpx", "paddingLeft": 0 } }, "cl-toast": { "": { "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx", "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx", "paddingLeft": "32rpx", "paddingRight": "32rpx", "paddingTop": "24rpx", "paddingBottom": "24rpx", "backgroundColor": "rgba(50,50,50,0.9)", "maxWidth": "600rpx", "opacity": 0 }, ".is-open": { "opacity": 1 }, ".is-dark": { "backgroundColor": "rgba(70,70,70,0.9)" } } };
  const __easycom_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["styles", [_style_0$v]]]);
  const _sfc_main$H = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-page-ui"
  }, { __name: "ui", setup(__props) {
    const confirmRef = vue.ref(null);
    const tipsRef = vue.ref(null);
    const toastRef = vue.ref(null);
    function showConfirm(options) {
      if (confirmRef.value != null) {
        confirmRef.value.open(options);
      }
    }
    function showTips(msgNotifier, callback) {
      if (tipsRef.value != null) {
        tipsRef.value.open({
          title: t$1("提示"),
          msgNotifier,
          callback,
          showCancel: false
        });
      }
    }
    function showToast(options) {
      if (toastRef.value != null) {
        toastRef.value.open(options);
      }
    }
    createUi({
      showConfirm,
      showTips,
      showToast
    });
    return (_ctx = null, _cache = null) => {
      const _component_cl_confirm = resolveEasycom(vue.resolveDynamicComponent("cl-confirm"), __easycom_0$4);
      const _component_cl_toast = resolveEasycom(vue.resolveDynamicComponent("cl-toast"), __easycom_1$5);
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createVNode(_component_cl_confirm, new UTSJSONObject({
          ref_key: "confirmRef",
          ref: confirmRef
        }), null, 512),
        vue.createVNode(_component_cl_confirm, new UTSJSONObject({
          ref_key: "tipsRef",
          ref: tipsRef
        }), null, 512),
        vue.createVNode(_component_cl_toast, new UTSJSONObject({
          ref_key: "toastRef",
          ref: toastRef
        }), null, 512)
      ], 64);
    };
  } }));
  const _sfc_main$G = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-page"
  }, { __name: "cl-page", props: {
    // 是否显示回到顶部按钮
    backTop: {
      type: Boolean,
      default: config$1.backTop
    }
  }, setup(__props, _a) {
    var __expose = _a.expose;
    const scrollTop = vue.ref(0);
    const scrollViewTop = vue.ref(0);
    function onScroll(e) {
      scroller.emit(e.detail.scrollTop);
    }
    scroller.on((top) => {
      scrollTop.value = top;
    });
    function scrollTo(top) {
      scrollViewTop.value = top;
    }
    function scrollToTop() {
      scrollTo(0 + Math.random() / 1e3);
    }
    __expose({
      scrollTop,
      scrollTo,
      scrollToTop
    });
    return (_ctx = null, _cache = null) => {
      const _component_cl_back_top = resolveEasycom(vue.resolveDynamicComponent("cl-back-top"), __easycom_0$5);
      return vue.openBlock(), vue.createElementBlock("scroll-view", new UTSJSONObject({
        style: new UTSJSONObject({ flex: 1 }),
        "scroll-top": scrollViewTop.value,
        "scroll-with-animation": true,
        onScroll
      }), [
        __props.backTop ? (vue.openBlock(), vue.createBlock(_component_cl_back_top, new UTSJSONObject({ key: 0 }))) : vue.createCommentVNode("", true),
        vue.createVNode(vue.unref(_sfc_main$H)),
        vue.renderSlot(_ctx.$slots, "default")
      ], 40, ["scroll-top"]);
    };
  } }));
  const proxy = {
    // 开发环境配置
    dev: {
      // 官方测试地址
      // 本地地址
      target: "http://192.168.1.13:10010",
      changeOrigin: true,
      // target: "http://22x2097c96.imwork.net",
      rewrite: (path) => {
        return path.replace("/dev", "");
      }
    },
    // 生产环境配置
    prod: {
      // 官方测试地址
      target: "http://22x2097c96.imwork.net",
      changeOrigin: true,
      rewrite: (path) => {
        return path.replace("/prod", "/api");
      }
    }
  };
  const ignoreTokens = [];
  const config = Object.assign({ name: "OEMES", version: "1.0.0", locale: "zh", website: "", showDarkButton: true, isCustomTabBar: true, backTop: true, platform: "mes-app", wx: {
    debug: false
  }, equipRefreshTime: 10 * 1e3 }, getPath("prod"));
  function getPath(env) {
    const host = get(proxy, env + ".target");
    let baseUrl = host;
    return {
      host,
      baseUrl
    };
  }
  let PassThrough$e = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            icon: { type: "Unknown", optional: true },
            placeholder: { type: "Unknown", optional: true },
            text: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.icon = this.__props__.icon;
      this.placeholder = this.__props__.placeholder;
      this.text = this.__props__.text;
      delete this.__props__;
    }
  };
  const _sfc_main$F = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-select-trigger"
  }, { __name: "cl-select-trigger", props: {
    // 透传样式配置
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 显示文本
    text: {
      type: String,
      default: ""
    },
    // 占位符文本
    placeholder: {
      type: String,
      default: () => {
        return t$1("请选择");
      }
    },
    // 箭头图标名称
    arrowIcon: {
      type: String,
      default: "arrow-down-s-line"
    },
    // 是否禁用选择器
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否聚焦
    focus: {
      type: Boolean,
      default: false
    }
  }, emits: ["open", "clear"], setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const disabled = useForm().disabled;
    const isError = useFormItem().isError;
    const isDisabled = vue.computed(() => {
      return disabled.value || props.disabled;
    });
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const showText = vue.computed(() => {
      return props.text != "";
    });
    function clear() {
      emit("clear");
    }
    function open() {
      if (isDisabled.value) {
        return null;
      }
      emit("open");
    }
    return (_ctx = null, _cache = null) => {
      var _a2, _b, _c, _d, _e, _f, _g;
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-select-trigger", [new UTSJSONObject({}), new UTSJSONObject({
          "is-dark": vue.unref(isDark),
          "cl-select-trigger--disabled": isDisabled.value,
          "cl-select-trigger--focus": __props.focus,
          "cl-select-trigger--error": vue.unref(isError)
        }), pt.value.className]]),
        onClick: open
      }), [
        vue.createElementVNode("view", new UTSJSONObject({ class: "cl-select-trigger__content" }), [
          showText.value ? (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
            key: 0,
            pt: new UTSJSONObject({
              className: vue.unref(parseClass)([
                new UTSJSONObject({
                  "text-surface-400": isDisabled.value
                }),
                (_a2 = pt.value.text) === null || _a2 === void 0 ? null : _a2.className
              ])
            }),
            ellipsis: ""
          }), new UTSJSONObject({
            default: vue.withCtx(() => {
              return [
                vue.createTextVNode(vue.toDisplayString(__props.text), 1)
              ];
            }),
            _: 1
          }), 8, ["pt"])) : (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
            key: 1,
            pt: new UTSJSONObject({
              className: vue.unref(parseClass)(["text-surface-400", (_b = pt.value.placeholder) === null || _b === void 0 ? null : _b.className])
            })
          }), new UTSJSONObject({
            default: vue.withCtx(() => {
              return [
                vue.createTextVNode(vue.toDisplayString(__props.placeholder), 1)
              ];
            }),
            _: 1
          }), 8, ["pt"]))
        ]),
        showText.value && !isDisabled.value ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 0,
          class: "cl-select-trigger__icon",
          onClick: vue.withModifiers(clear, ["stop"])
        }), [
          vue.createVNode(_component_cl_icon, new UTSJSONObject({
            name: "close-circle-fill",
            size: 32,
            pt: new UTSJSONObject({ className: "text-surface-400" })
          }))
        ])) : vue.createCommentVNode("", true),
        !isDisabled.value && !showText.value ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 1,
          class: "cl-select-trigger__icon"
        }), [
          vue.createVNode(_component_cl_icon, new UTSJSONObject({
            name: (_d = (_c = pt.value.icon) === null || _c === void 0 ? null : _c.name) !== null && _d !== void 0 ? _d : __props.arrowIcon,
            size: (_f = (_e = pt.value.icon) === null || _e === void 0 ? null : _e.size) !== null && _f !== void 0 ? _f : 32,
            pt: new UTSJSONObject({
              className: "text-surface-400 ".concat((_g = pt.value.icon) === null || _g === void 0 ? null : _g.className)
            })
          }), null, 8, ["name", "size", "pt"])
        ])) : vue.createCommentVNode("", true)
      ], 2);
    };
  } }));
  const _style_0$u = { "cl-select-trigger": { "": { "boxSizing": "border-box", "display": "flex", "width": "100%", "flexDirection": "row", "alignItems": "center", "borderTopLeftRadius": "14rpx", "borderTopRightRadius": "14rpx", "borderBottomRightRadius": "14rpx", "borderBottomLeftRadius": "14rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(228,228,231,1)", "borderRightColor": "rgba(228,228,231,1)", "borderBottomColor": "rgba(228,228,231,1)", "borderLeftColor": "rgba(228,228,231,1)", "backgroundColor": "rgba(255,255,255,1)", "height": "66rpx", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" }, ".is-dark": { "borderTopColor": "rgba(63,63,70,1)", "borderRightColor": "rgba(63,63,70,1)", "borderBottomColor": "rgba(63,63,70,1)", "borderLeftColor": "rgba(63,63,70,1)", "backgroundColor": "rgba(39,39,42,1)" }, ".is-dark.cl-select-trigger--disabled": { "backgroundColor": "rgba(63,63,70,1)" } }, "cl-select-trigger__content": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "cl-select-trigger__icon": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "paddingLeft": "20rpx" } }, "cl-select-trigger--disabled": { "": { "backgroundColor": "rgba(244,244,245,1)", "opacity": 0.7 } }, "cl-select-trigger--focus": { "": { "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)" }, ".is-dark": { "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)" } }, "cl-select-trigger--error": { "": { "borderTopColor": "rgba(239,68,68,1)", "borderRightColor": "rgba(239,68,68,1)", "borderBottomColor": "rgba(239,68,68,1)", "borderLeftColor": "rgba(239,68,68,1)" } } };
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["styles", [_style_0$u]]]);
  let PassThrough$d = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      delete this.__props__;
    }
  };
  const _sfc_main$E = /* @__PURE__ */ vue.defineComponent({
    __name: "cl-empty",
    props: {
      // 透传样式配置
      pt: {
        type: Object,
        default: () => {
          return new UTSJSONObject({});
        }
      },
      // 空状态文本
      text: {
        type: String,
        default: () => {
          return t$1("暂无数据");
        }
      },
      // 空状态图标名称
      icon: {
        type: String,
        default: "comm"
      },
      // 图标尺寸
      iconSize: {
        type: [Number, String],
        default: 120
      },
      // 是否显示图标
      showIcon: {
        type: Boolean,
        default: true
      },
      // 是否固定定位
      fixed: {
        type: Boolean,
        default: true
      }
    },
    setup(__props) {
      const props = __props;
      const pt = vue.computed(() => {
        return parsePt(props.pt);
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-empty", [new UTSJSONObject({}), new UTSJSONObject({
            "cl-empty--fixed": __props.fixed
          }), pt.value.className]])
        }), [
          __props.showIcon ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
            key: 0,
            class: "cl-empty__icon",
            src: "/static/empty/".concat(__props.icon, ".png"),
            style: vue.normalizeStyle({
              height: vue.unref(parseRpx)(__props.iconSize)
            }),
            mode: "aspectFit"
          }), null, 12, ["src"])) : vue.createCommentVNode("", true),
          __props.text ? (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
            key: 1,
            pt: new UTSJSONObject({
              className: vue.unref(parseClass)([
                "cl-empty__text text-sm text-surface-400",
                new UTSJSONObject({
                  "text-surface-100": vue.unref(isDark)
                })
              ])
            })
          }), new UTSJSONObject({
            default: vue.withCtx(() => {
              return [
                vue.createTextVNode(vue.toDisplayString(__props.text), 1)
              ];
            }),
            _: 1
          }), 8, ["pt"])) : vue.createCommentVNode("", true)
        ], 2);
      };
    }
  });
  const _style_0$t = { "cl-empty": { "": { "display": "flex", "height": "100%", "width": "100%", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "pointerEvents": "none" } }, "cl-empty--fixed": { "": { "position": "fixed", "top": 0, "left": 0, "zIndex": -1 } }, "cl-empty__icon": { "": { "marginBottom": "20rpx" } } };
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["styles", [_style_0$t]]]);
  const _sfc_main$D = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-select-picker-view"
  }, { __name: "cl-picker-view", props: {
    // 选择器表头
    headers: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 选择器值
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 选择器选项
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 选择器选项高度
    itemHeight: {
      type: Number,
      default: isAppIOS() ? 50 : 42
    },
    // 选择器高度
    height: {
      type: Number,
      default: 600
    }
  }, emits: ["change-value", "change-index"], setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const windowWidth = uni.getWindowInfo().windowWidth;
    const headers = vue.computed(() => {
      return props.headers.slice(0, props.columns.length);
    });
    const maskStyle = vue.computed(() => {
      if (isDark.value) {
        if (isAppIOS()) {
          return "background-color: rgba(0, 0, 0, 0);";
        }
        return "background-image: linear-gradient(\n			180deg,\n			rgba(0, 0, 0, 0),\n			rgba(0, 0, 0, 0)\n		)";
      }
      return "";
    });
    const indicatorStyle = vue.computed(() => {
      const width = ((windowWidth - rpx2px(20)) / props.columns.length - rpx2px(2) - 8).toFixed(0);
      let str = "";
      const style = new UTSJSONObject({
        height: "".concat(props.itemHeight, "px"),
        width: "".concat(width, "px"),
        left: "4px",
        backgroundColor: "rgba(10, 10, 10, 0.04)",
        borderRadius: "10px",
        border: "1rpx solid rgba(10, 10, 10, 0.2)"
      });
      if (isDark.value) {
        style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        style.border = "1rpx solid rgba(255, 255, 255, 0.3)";
      }
      forInObject(style, (value = null, key) => {
        str += "".concat(key, ": ").concat(value, ";");
      });
      return str;
    });
    function onChange(e) {
      const indexs = e.detail.value;
      indexs.forEach((v, i, arr) => {
        if (i < props.columns.length) {
          const n = props.columns[i].length;
          if (v >= n) {
            arr[i] = n - 1;
          }
        }
      });
      if (isEqual(indexs, props.value)) {
        return null;
      }
      const values = props.columns.map((c, i) => {
        return isNull(c[indexs[i]]) ? 0 : c[indexs[i]].value;
      });
      emit("change-value", values);
      emit("change-index", indexs);
    }
    return (_ctx = null, _cache = null) => {
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "cl-picker-view" }), [
        headers.value.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 0,
          class: "cl-picker-view__header"
        }), [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(headers.value, (label, index) => {
            return vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
              pt: new UTSJSONObject({
                className: "flex-1 text-sm text-center"
              }),
              key: index
            }), new UTSJSONObject({
              default: vue.withCtx(() => {
                return [
                  vue.createTextVNode(vue.toDisplayString(label), 1)
                ];
              }),
              _: 2
            }), 1024);
          }), 128))
        ])) : vue.createCommentVNode("", true),
        vue.createElementVNode("view", new UTSJSONObject({
          class: "px--bracket-start-10rpx-bracket-end-",
          style: vue.normalizeStyle({
            height: vue.unref(parseRpx)(__props.height)
          })
        }), [
          vue.createElementVNode("picker-view", new UTSJSONObject({
            class: "h-full",
            value: __props.value,
            "mask-style": maskStyle.value,
            "mask-top-style": maskStyle.value,
            "mask-bottom-style": maskStyle.value,
            "indicator-style": indicatorStyle.value,
            onChange
          }), [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.columns, (column, columnIndex) => {
              return vue.openBlock(), vue.createElementBlock("picker-view-column", new UTSJSONObject({
                class: "cl-select-popup__column",
                key: columnIndex
              }), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(column, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    class: "cl-picker-view__item",
                    style: vue.normalizeStyle({
                      height: "".concat(__props.itemHeight, "px")
                    }),
                    key: index
                  }), [
                    vue.createVNode(_component_cl_text, new UTSJSONObject({
                      pt: new UTSJSONObject({
                        className: vue.unref(parseClass)([
                          [vue.unref(isDark), "text-surface-500"],
                          [vue.unref(isDark) && index == __props.value[columnIndex], "text-white"]
                        ])
                      })
                    }), {
                      default: vue.withCtx(() => {
                        return [
                          vue.createTextVNode(vue.toDisplayString(item.label), 1)
                        ];
                      }),
                      _: 2
                    }, 1032, ["pt"])
                  ], 4);
                }), 128))
              ]);
            }), 128))
          ], 40, ["value", "mask-style", "mask-top-style", "mask-bottom-style", "indicator-style"])
        ], 4)
      ]);
    };
  } }));
  const _style_0$s = { "cl-picker-view": { "": { "height": "100%", "width": "100%" } }, "cl-picker-view__header": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "paddingTop": "28rpx", "paddingBottom": "28rpx" } }, "cl-picker-view__item": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center" } } };
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["styles", [_style_0$s]]]);
  let PassThrough$c = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            trigger: { type: "Unknown", optional: true },
            popup: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.trigger = this.__props__.trigger;
      this.popup = this.__props__.popup;
      delete this.__props__;
    }
  };
  const _sfc_main$C = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-select"
  }, { __name: "cl-select", props: {
    // 透传样式配置
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 选择器的值
    modelValue: {
      type: [Array, Number, String],
      default: null
    },
    // 选择器标题
    title: {
      type: String,
      default: () => {
        return t$1("请选择");
      }
    },
    // 选择器占位符
    placeholder: {
      type: String,
      default: () => {
        return t$1("请选择");
      }
    },
    // 选项数据
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 是否显示选择器触发器
    showTrigger: {
      type: Boolean,
      default: true
    },
    // 是否禁用选择器
    disabled: {
      type: Boolean,
      default: false
    },
    // 列数
    columnCount: {
      type: Number,
      default: 1
    },
    // 分隔符
    splitor: {
      type: String,
      default: " - "
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      default: () => {
        return t$1("确定");
      }
    },
    // 是否显示确认按钮
    showConfirm: {
      type: Boolean,
      default: true
    },
    // 取消按钮文本
    cancelText: {
      type: String,
      default: () => {
        return t$1("取消");
      }
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    }
  }, emits: ["update:modelValue", "change", "changing"], setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const popupRef = vue.ref(null);
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const ptTrigger = vue.computed(() => {
      return parseToObject(pt.value.trigger);
    });
    const ptPopup = vue.computed(() => {
      return parseToObject(pt.value.popup);
    });
    const noOptions = vue.computed(() => {
      return isEmpty(props.options);
    });
    const value = vue.ref([]);
    const indexes = vue.ref([]);
    const columns = vue.computed(() => {
      let options = props.options;
      let columns2 = [];
      for (let i = 0; i < props.columnCount; i++) {
        const column = [...options];
        const val = i >= value.value.length ? null : value.value[i];
        let item = UTS.arrayFind(options, (item2) => {
          return item2.value == val;
        });
        if (item == null && !isEmpty(options)) {
          item = options[0];
        }
        if ((item === null || item === void 0 ? null : item.children) != null) {
          options = item.children;
        }
        columns2.push(column);
      }
      return columns2;
    });
    const text = vue.ref("");
    function updateText() {
      const val = props.modelValue;
      if (val == null || isEmpty(val)) {
        text.value = "";
      } else {
        let arr;
        if (props.columnCount == 1) {
          arr = [val];
        } else {
          arr = val;
        }
        text.value = arr.map((e = null, i) => {
          var _a2, _b;
          return (_b = (_a2 = UTS.arrayFind(columns.value[i], (a) => {
            return a.value == e;
          })) === null || _a2 === void 0 ? null : _a2.label) !== null && _b !== void 0 ? _b : "";
        }).join(props.splitor);
      }
    }
    function getValue() {
      return props.columnCount == 1 ? value.value[0] : value.value;
    }
    function setValue(val = null) {
      let _value;
      if (val == null) {
        _value = [];
      } else if (Array.isArray(val)) {
        _value = [...val];
      } else {
        _value = [val];
      }
      let _indexes = [];
      for (let i = 0; i < props.columnCount; i++) {
        const column = columns.value[i];
        if (i >= _value.length) {
          _indexes.push(0);
          if (!isNull(column) && column.length > 0 && !isNull(column[0])) {
            _value.push(column[0].value);
          }
        } else {
          let index = column.findIndex((e) => {
            return e.value == _value[i];
          });
          if (index < 0) {
            index = 0;
          }
          _indexes.push(index);
        }
      }
      value.value = _value;
      indexes.value = _indexes;
      updateText();
    }
    function onChange(a) {
      const b = [...indexes.value];
      let changed = false;
      for (let i = 0; i < a.length; i++) {
        if (changed) {
          b[i] = 0;
        } else {
          if (b[i] != a[i]) {
            b[i] = a[i];
            changed = true;
          }
        }
      }
      indexes.value = b;
      value.value = b.map((e, i) => {
        return isNull(columns.value[i][e]) ? 0 : columns.value[i][e].value;
      });
      emit("changing", getValue());
    }
    const visible = vue.ref(false);
    let callback = null;
    function open(cb = null) {
      visible.value = true;
      setValue(props.modelValue);
      callback = cb;
    }
    function close() {
      visible.value = false;
    }
    function clear() {
      text.value = "";
      if (props.columnCount == 1) {
        emit("update:modelValue", null);
        emit("change", null);
      } else {
        emit("update:modelValue", []);
        emit("change", []);
      }
    }
    function confirm() {
      const val = getValue();
      emit("update:modelValue", val);
      emit("change", val);
      if (callback != null) {
        callback(val);
      }
      close();
    }
    vue.watch(vue.computed(() => {
      return props.modelValue;
    }), (val = null) => {
      setValue(val);
    }, {
      immediate: true
    });
    __expose({
      open,
      close
    });
    return (_ctx = null, _cache = null) => {
      var _a2;
      const _component_cl_select_trigger = resolveEasycom(vue.resolveDynamicComponent("cl-select-trigger"), __easycom_0$3);
      const _component_cl_empty = resolveEasycom(vue.resolveDynamicComponent("cl-empty"), __easycom_1$4);
      const _component_cl_picker_view = resolveEasycom(vue.resolveDynamicComponent("cl-picker-view"), __easycom_3$2);
      const _component_cl_button = resolveEasycom(vue.resolveDynamicComponent("cl-button"), __easycom_4);
      const _component_cl_popup = resolveEasycom(vue.resolveDynamicComponent("cl-popup"), __easycom_5);
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        __props.showTrigger ? (vue.openBlock(), vue.createBlock(_component_cl_select_trigger, new UTSJSONObject({
          key: 0,
          pt: ptTrigger.value,
          placeholder: __props.placeholder,
          disabled: __props.disabled,
          focus: (_a2 = popupRef.value) === null || _a2 === void 0 ? null : _a2.isOpen,
          text: text.value,
          onOpen: _cache[0] || (_cache[0] = ($event = null) => {
            return open();
          }),
          onClear: clear
        }), null, 8, ["pt", "placeholder", "disabled", "focus", "text"])) : vue.createCommentVNode("", true),
        vue.createVNode(_component_cl_popup, new UTSJSONObject({
          ref_key: "popupRef",
          ref: popupRef,
          modelValue: visible.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event = null) => {
            return visible.value = $event;
          }),
          title: __props.title,
          pt: ptPopup.value
        }), {
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("view", new UTSJSONObject({
                class: "cl-select-popup",
                onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop"]))
              }), [
                vue.renderSlot(_ctx.$slots, "prepend"),
                vue.createElementVNode("view", new UTSJSONObject({ class: "cl-select-popup__picker" }), [
                  noOptions.value ? (vue.openBlock(), vue.createBlock(_component_cl_empty, new UTSJSONObject({
                    key: 0,
                    fixed: false,
                    pt: new UTSJSONObject({
                      className: "-important-h--bracket-start-600rpx-bracket-end-"
                    })
                  }))) : (vue.openBlock(), vue.createBlock(_component_cl_picker_view, new UTSJSONObject({
                    key: 1,
                    value: indexes.value,
                    columns: columns.value,
                    onChangeIndex: onChange
                  }), null, 8, ["value", "columns"]))
                ]),
                vue.renderSlot(_ctx.$slots, "append"),
                vue.createElementVNode("view", new UTSJSONObject({ class: "cl-select-popup__op" }), [
                  __props.showCancel ? (vue.openBlock(), vue.createBlock(_component_cl_button, new UTSJSONObject({
                    key: 0,
                    size: "large",
                    text: "",
                    border: "",
                    type: "light",
                    pt: new UTSJSONObject({
                      className: "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
                    }),
                    onClick: close
                  }), new UTSJSONObject({
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(__props.cancelText), 1)
                      ];
                    }),
                    _: 1
                  }))) : vue.createCommentVNode("", true),
                  __props.showConfirm && !noOptions.value ? (vue.openBlock(), vue.createBlock(_component_cl_button, new UTSJSONObject({
                    key: 1,
                    size: "large",
                    pt: new UTSJSONObject({
                      className: "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
                    }),
                    onClick: confirm
                  }), new UTSJSONObject({
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(__props.confirmText), 1)
                      ];
                    }),
                    _: 1
                  }))) : vue.createCommentVNode("", true)
                ])
              ], 32)
            ];
          }),
          _: 3
        }, 8, ["modelValue", "title", "pt"])
      ], 64);
    };
  } }));
  const _style_0$r = { "cl-select-popup__op": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "paddingTop": "24rpx", "paddingRight": "24rpx", "paddingBottom": "24rpx", "paddingLeft": "24rpx" } } };
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["styles", [_style_0$r]]]);
  const zhcn = [
    [
      "已阅读并同意<__=__><__&__>用户协议<__=__><__&__>隐私政策<__=__><__&__>请先阅读并同意《用户协议》和《隐私政策》<__=__><__&__>我的昵称<__=__><__&__>简介<__=__><__&__>介绍一下自己<__=__><__&__>性别<__=__><__&__>编辑性别<__=__><__&__>生日<__=__><__&__>选择生日<__=__><__&__>地区<__=__><__&__>选择所在的地区<__=__><__&__>选择性别<__=__><__&__>保密<__=__><__&__>男<__=__><__&__>女<__=__><__&__>性别设置成功<__=__><__&__>生日设置成功<__=__><__&__>地区设置成功<__=__><__&__>头像上传成功<__=__><__&__>编辑昵称<__=__><__&__>请输入昵称<__=__><__&__>请设置2-20个字符，不包括@<>/等无效字符<__=__><__&__>确认<__=__><__&__>昵称长度需在2-20个字符之间<__=__><__&__>昵称不能包含@<>/等特殊字符<__=__><__&__>编辑简介<__=__><__&__>简介不能为空<__=__><__&__>提示<__=__><__&__>为提供更好的服务，我们邀请您填写昵称、头像等公开信息<__=__><__&__>头像<__=__><__&__>昵称<__=__><__&__>点击输入昵称<__=__><__&__>取消<__=__><__&__>请上传头像<__=__><__&__>登录中<__=__><__&__>手机登录<__=__><__&__>未注册的手机号登录成功后将自动注册<__=__><__&__>请输入手机号<__=__><__&__>请输入验证码<__=__><__&__>登录<__=__><__&__>购物车 ({num})<__=__><__&__>完成<__=__><__&__>管理<__=__><__&__>删除<__=__><__&__>全选<__=__><__&__>合计<__=__><__&__>去结算<__=__><__&__>温馨提示<__=__><__&__>确定删除该商品吗？<__=__><__&__>删除成功<__=__><__&__>请先选择商品<__=__><__&__>确定删除选中的商品吗？<__=__><__&__>您需支付 {price} 元，请确认支付<__=__><__&__>支付成功<__=__><__&__>已设为默认<__=__><__&__>设为默认<__=__><__&__>修改<__=__><__&__>添加地址<__=__><__&__>删除地址后无法恢复，确认要删除该地址吗？<__=__><__&__>加载中<__=__><__&__>收货人<__=__><__&__>请输入收货人姓名<__=__><__&__>手机号<__=__><__&__>选择省市区<__=__><__&__>详细地址<__=__><__&__>小区楼栋、门牌号、村等<__=__><__&__>默认地址<__=__><__&__>保存<__=__><__&__>收货人不能为空<__=__><__&__>手机号不能为空<__=__><__&__>手机号格式不正确<__=__><__&__>详细地址不能为空<__=__><__&__>所在地区不能为空<__=__><__&__>保存中<__=__><__&__>开启通知<__=__><__&__>通用设置<__=__><__&__>通知设置<__=__><__&__>隐私设置<__=__><__&__>关于{name}<__=__><__&__>联系客服<__=__><__&__>退出登录<__=__><__&__>确定退出登录吗？<__=__><__&__>深色模式<__=__><__&__>多语言<__=__><__&__>字体大小<__=__><__&__>访问官网<__=__><__&__>商城<__=__><__&__>商品分类<__=__><__&__>商品详情<__=__><__&__>商品列表、筛选<__=__><__&__>购物车<__=__><__&__>订单列表、详情<__=__><__&__>收货地址<__=__><__&__>聊天<__=__><__&__>对话列表、历史记录<__=__><__&__>流式回复<__=__><__&__>语言合成<__=__><__&__>语音识别<__=__><__&__>其他<__=__><__&__>文件管理<__=__><__&__>该模板正在开发中<__=__><__&__>未登录<__=__><__&__>总点击<__=__><__&__>赞<__=__><__&__>收藏<__=__><__&__>粉丝<__=__><__&__>接单模式<__=__><__&__>已关闭<__=__><__&__>消息通知<__=__><__&__>待支付<__=__><__&__>未发货<__=__><__&__>已发货<__=__><__&__>售后 / 退款<__=__><__&__>我的钱包<__=__><__&__>数据看板<__=__><__&__>历史记录<__=__><__&__>邀请好友<__=__><__&__>设置<__=__><__&__>开发中，敬请期待<__=__><__&__>基础组件<__=__><__&__>文本<__=__><__&__>按钮<__=__><__&__>图片<__=__><__&__>图标<__=__><__&__>标签<__=__><__&__>表单组件<__=__><__&__>表单验证<__=__><__&__>输入框<__=__><__&__>文本域<__=__><__&__>计数器<__=__><__&__>口令输入<__=__><__&__>键盘<__=__><__&__>单选框<__=__><__&__>多选框<__=__><__&__>开关<__=__><__&__>评分<__=__><__&__>滑块<__=__><__&__>选择器<__=__><__&__>日期选择器<__=__><__&__>时间选择器<__=__><__&__>级联选择器<__=__><__&__>文件上传<__=__><__&__>日历<__=__><__&__>布局组件<__=__><__&__>弹性布局<__=__><__&__>标签页<__=__><__&__>折叠面板<__=__><__&__>吸顶<__=__><__&__>导航栏<__=__><__&__>底部视图<__=__><__&__>悬浮视图<__=__><__&__>数据展示<__=__><__&__>查看更多<__=__><__&__>列表<__=__><__&__>列表视图<__=__><__&__>列表刷新<__=__><__&__>瀑布流<__=__><__&__>轮播图<__=__><__&__>跑马灯<__=__><__&__>分页<__=__><__&__>时间轴<__=__><__&__>拖拽<__=__><__&__>筛选栏<__=__><__&__>树形结构<__=__><__&__>状态组件<__=__><__&__>角标<__=__><__&__>通知栏<__=__><__&__>倒计时<__=__><__&__>数字滚动<__=__><__&__>进度条<__=__><__&__>圆形进度条<__=__><__&__>骨架图<__=__><__&__>加载更多<__=__><__&__>反馈组件<__=__><__&__>操作菜单<__=__><__&__>弹窗<__=__><__&__>确认框<__=__><__&__>提示框<__=__><__&__>签名<__=__><__&__>水印<__=__><__&__>图片裁剪<__=__><__&__>Canvas<__=__><__&__>富文本<__=__><__&__>该功能正在开发中<__=__><__&__>圆形<__=__><__&__>组合<__=__><__&__>基础用法<__=__><__&__>自定义<__=__><__&__>加快滚动速度<__=__><__&__>显示小数位数<__=__><__&__>自定义样式<__=__><__&__>自定义颜色<__=__><__&__>自定义宽度<__=__><__&__>不显示文本<__=__><__&__>改个颜色<__=__><__&__>显示文本<__=__><__&__>快一些<__=__><__&__>带图标<__=__><__&__>设置速度<__=__><__&__>垂直方向<__=__><__&__>3秒后加载完成<__=__><__&__>隐藏为 00 的值<__=__><__&__>指定天数<__=__><__&__>自定义模板<__=__><__&__>指定小时<__=__><__&__>指定分钟<__=__><__&__>指定秒<__=__><__&__>完成后提示<__=__><__&__>3秒后开始倒计时<__=__><__&__>结合按钮<__=__><__&__>购买<__=__><__&__>消息<__=__><__&__>结合图片<__=__><__&__>结合图标<__=__><__&__>点击触发<__=__><__&__>不同大小<__=__><__&__>不同颜色<__=__><__&__>使用base64<__=__><__&__>没有错误提示<__=__><__&__>转动图片<__=__><__&__>验证通过<__=__><__&__>验证失败<__=__><__&__>操作<__=__><__&__>清空<__=__><__&__>预览<__=__><__&__>设置高度<__=__><__&__>毛笔效果<__=__><__&__>添加LOGO<__=__><__&__>圆角定位点<__=__><__&__>内间距<__=__><__&__>导出图片<__=__><__&__>矩形<__=__><__&__>点<__=__><__&__>线性<__=__><__&__>小方格<__=__><__&__>格式化<__=__><__&__>添加<__=__><__&__>减去<__=__><__&__>获取某个单位的开始时间<__=__><__&__>获取某个单位的结束时间<__=__><__&__>是否同一天<__=__><__&__>是否早于<__=__><__&__>是否晚于<__=__><__&__>差值<__=__><__&__>差值（单位）<__=__><__&__>选择图片<__=__><__&__>可调节裁剪框大小<__=__><__&__>预览图片<__=__><__&__>保存图片<__=__><__&__>本页面内容由 canvas 渲染生成，是否立即预览图片效果？<__=__><__&__>基础动画<__=__><__&__>淡入淡出<__=__><__&__>播放动画<__=__><__&__>滑入<__=__><__&__>旋转翻转<__=__><__&__>摇摆抖动<__=__><__&__>特殊效果<__=__><__&__>组合动画<__=__><__&__>标题<__=__><__&__>插槽<__=__><__&__>使用 PT 自定义颜色<__=__><__&__>自定义返回图标<__=__><__&__>自定义返回路径<__=__><__&__>自定义标题内容<__=__><__&__>显示滑块<__=__><__&__>添加间距<__=__><__&__>横向填充<__=__><__&__>适用于标签数量不多的情况<__=__><__&__>居中<__=__><__&__>单个禁用<__=__><__&__>显示下划线<__=__><__&__>禁用<__=__><__&__>取消订单<__=__><__&__>立即购买<__=__><__&__>确认收货<__=__><__&__>评价<__=__><__&__>禁用状态，无法拖拽<__=__><__&__>不吸附边缘，任意位置可拖拽<__=__><__&__>这是一个提示<__=__><__&__>左间隔<__=__><__&__>右移动<__=__><__&__>左移动<__=__><__&__>多个数据<__=__><__&__>点击收起<__=__><__&__>点击展开<__=__><__&__>ref 方式调用<__=__><__&__>自定义图标、文字、大小<__=__><__&__>上传证件照<__=__><__&__>多选<__=__><__&__>限制 3 个<__=__><__&__>边框<__=__><__&__>显示字数<__=__><__&__>自动增高<__=__><__&__>其他颜色<__=__><__&__>大一点<__=__><__&__>正方形<__=__><__&__>范围选择<__=__><__&__>显示值<__=__><__&__>步长10<__=__><__&__>滑块大点<__=__><__&__>换个颜色<__=__><__&__>最大50<__=__><__&__>自定义触发器<__=__><__&__>打开选择器<__=__><__&__>多列<__=__><__&__>通过 children 配置多级数据，并使用 column-count 参数指定显示的列数<__=__><__&__>弹窗中使用<__=__><__&__>打开<__=__><__&__>选择地区<__=__><__&__>绑定值<__=__><__&__>下一步<__=__><__&__>确定<__=__><__&__>关闭<__=__><__&__>显示取消按钮<__=__><__&__>修改按钮文案<__=__><__&__>显示绑定值<__=__><__&__>时<__=__><__&__>时:分<__=__><__&__>时:分:秒<__=__><__&__>标签格式化<__=__><__&__>固定开始、结束日期<__=__><__&__>自定义快捷选项<__=__><__&__>只读<__=__><__&__>显示分数<__=__><__&__>允许半星<__=__><__&__>换个图标<__=__><__&__>纵向排列<__=__><__&__>换个样式<__=__><__&__>不显示图标<__=__><__&__>其他样式<__=__><__&__>数字键盘<__=__><__&__>打开键盘<__=__><__&__>是否显示输入值<__=__><__&__>输入即绑定<__=__><__&__>身份证键盘<__=__><__&__>密码键盘<__=__><__&__>是否加密<__=__><__&__>车牌号键盘<__=__><__&__>数字输入<__=__><__&__>密码输入<__=__><__&__>可清除<__=__><__&__>左右插槽<__=__><__&__>左图标<__=__><__&__>右图标<__=__><__&__>自动聚焦<__=__><__&__>长度为6<__=__><__&__>步进为10<__=__><__&__>最小为10<__=__><__&__>最大为50<__=__><__&__>可以小数<__=__><__&__>可以输入<__=__><__&__>用户名<__=__><__&__>请输入用户名<__=__><__&__>邮箱<__=__><__&__>请输入邮箱地址<__=__><__&__>动态验证<__=__><__&__>联系人<__=__><__&__>添加联系人<__=__><__&__>身高<__=__><__&__>体重<__=__><__&__>所在地区<__=__><__&__>出生年月<__=__><__&__>个人简介<__=__><__&__>请输入个人简介<__=__><__&__>公开状态<__=__><__&__>重置<__=__><__&__>提交<__=__><__&__>未知<__=__><__&__>篮球<__=__><__&__>足球<__=__><__&__>羽毛球<__=__><__&__>乒乓球<__=__><__&__>游泳<__=__><__&__>用户名不能为空<__=__><__&__>用户名长度在3-20个字符之间<__=__><__&__>邮箱不能为空<__=__><__&__>邮箱格式不正确<__=__><__&__>身高不能为空<__=__><__&__>身高在160-190cm之间<__=__><__&__>体重不能为空<__=__><__&__>体重在40-100kg之间<__=__><__&__>标签不能为空<__=__><__&__>标签最多选择2个<__=__><__&__>性别不能为空<__=__><__&__>出生年月不能为空<__=__><__&__>出生年月不大于2010-01-01<__=__><__&__>联系人不能为空<__=__><__&__>提交成功<__=__><__&__>单个 true / false<__=__><__&__>带索引、地区选择<__=__><__&__>换个分隔符<__=__><__&__>列表高度小一点<__=__><__&__>范围选<__=__><__&__>禁用部分日期<__=__><__&__>日历长列表<__=__><__&__>打开日历长列表<__=__><__&__>日历面板<__=__><__&__>自定义文案和颜色<__=__><__&__>显示头<__=__><__&__>显示星期<__=__><__&__>显示其他月份<__=__><__&__>不同位置<__=__><__&__>顶部<__=__><__&__>中间<__=__><__&__>底部<__=__><__&__>不同类型<__=__><__&__>成功<__=__><__&__>失败<__=__><__&__>警告<__=__><__&__>问题<__=__><__&__>停止<__=__><__&__>自定义图标<__=__><__&__>只存在一个<__=__><__&__>不同位置提示<__=__><__&__>不同类型提示<__=__><__&__>带图标提示<__=__><__&__>移除其他已存在的提示<__=__><__&__>打开弹窗<__=__><__&__>设置宽度 80%<__=__><__&__>无头<__=__><__&__>左侧<__=__><__&__>右侧<__=__><__&__>隐藏取消按钮<__=__><__&__>自定义文本<__=__><__&__>关闭前钩子<__=__><__&__>显示时长<__=__><__&__>确定要删除吗？<__=__><__&__>确定要删除吗？3秒后自动关闭<__=__><__&__>带标题、描述<__=__><__&__>无法点击遮罩关闭<__=__><__&__>不需要取消按钮<__=__><__&__>插槽用法<__=__><__&__>反馈<__=__><__&__>删除好友会同时删除所有聊天记录<__=__><__&__>删除好友<__=__><__&__>确定要删除好友吗？<__=__><__&__>点我关闭<__=__><__&__>确定要关闭吗？<__=__><__&__>支付宝<__=__><__&__>微信<__=__><__&__>父子关联<__=__><__&__>选中值<__=__><__&__>选中操作<__=__><__&__>选中部分节点<__=__><__&__>获取选中节点<__=__><__&__>获取半选节点<__=__><__&__>清空选中<__=__><__&__>展开操作<__=__><__&__>展开部分节点<__=__><__&__>获取展开节点<__=__><__&__>展开所有<__=__><__&__>收起所有<__=__><__&__>开通账号<__=__><__&__>赠送500元<__=__><__&__>完成实名认证<__=__><__&__>通过身份证认证<__=__><__&__>绑定银行卡<__=__><__&__>绑定招商银行储蓄卡<__=__><__&__>首次充值<__=__><__&__>充值1000元<__=__><__&__>完成首笔交易<__=__><__&__>优选灵活配置混合A<__=__><__&__>1000元起<__=__><__&__>禁用切换按钮<__=__><__&__>自定义高度<__=__><__&__>多页数<__=__><__&__>上一页<__=__><__&__>下一页<__=__><__&__>横向滚动<__=__><__&__>纵向滚动<__=__><__&__>快一点<__=__><__&__>暂停<__=__><__&__>内容靠左<__=__><__&__>QQ<__=__><__&__>带箭头<__=__><__&__>余额<__=__><__&__>带图片<__=__><__&__>神仙都没用<__=__><__&__>折叠<__=__><__&__>可滑动<__=__><__&__>左滑编辑<__=__><__&__>编辑<__=__><__&__>右滑删除<__=__><__&__>账号<__=__><__&__>我的订单<__=__><__&__>我的收藏<__=__><__&__>筛选<__=__><__&__>长按项即可拖动排序<__=__><__&__>单列排序<__=__><__&__>不需要长按<__=__><__&__>结合列表使用<__=__><__&__>多列排序<__=__><__&__>结合图片使用<__=__><__&__>禁用手势<__=__><__&__>自定义样式2<__=__><__&__>无图片<__=__><__&__>圆角<__=__><__&__>自定义大小<__=__><__&__>省略号<__=__><__&__>多行省略号<__=__><__&__>金额<__=__><__&__>手机号脱敏<__=__><__&__>姓名脱敏<__=__><__&__>邮箱脱敏<__=__><__&__>银行卡脱敏<__=__><__&__>自定义脱敏字符<__=__><__&__>主要<__=__><__&__>危险<__=__><__&__>信息<__=__><__&__>邮件<__=__><__&__>文件<__=__><__&__>可关闭<__=__><__&__>镂空<__=__><__&__>自定义无圆角<__=__><__&__>不同裁剪<__=__><__&__>点击可预览<__=__><__&__>失败时显示<__=__><__&__>自定义圆角<__=__><__&__>设置颜色<__=__><__&__>设置大小<__=__><__&__>集成 iconfont 与 remixicon 图标库，展示部分示例<__=__><__&__>iconfont<__=__><__&__>remixicon<__=__><__&__>复制成功<__=__><__&__>普通<__=__><__&__>浅色<__=__><__&__>深色<__=__><__&__>只显示图标<__=__><__&__>文本模式<__=__><__&__>带边框<__=__><__&__>圆角按钮<__=__><__&__>带左侧图标<__=__><__&__>小<__=__><__&__>默认<__=__><__&__>大<__=__><__&__>无权限<__=__><__&__>服务异常<__=__><__&__>请在微信浏览器中打开<__=__><__&__>已取消支付<__=__><__&__>支付失败<__=__><__&__>授权信息仅用于用户登录<__=__><__&__>登录授权失败<__=__><__&__>获取短信验证码<__=__><__&__>验证码<__=__><__&__>发送短信<__=__><__&__>{n}s后重新获取<__=__><__&__>获取验证码<__=__><__&__>短信已发送，请查收<__=__><__&__>请填写验证码<__=__><__&__>请填写正确的手机号格式<__=__><__&__>全局字号<__=__><__&__>这是一段示例文字，用于预览不同字号的效果。<__=__><__&__>默认 1.0<__=__><__&__>切换语言<__=__><__&__>切换中<__=__><__&__>模板<__=__><__&__>编辑资料<__=__><__&__>Text 文本<__=__><__&__>Button 按钮<__=__><__&__>Image 图片<__=__><__&__>Icon 图标<__=__><__&__>Tag 标签<__=__><__&__>Form 表单验证<__=__><__&__>Input 输入框<__=__><__&__>Textarea 文本域<__=__><__&__>InputNumber 计数器<__=__><__&__>InputOtp 口令输入<__=__><__&__>Keyboard 键盘<__=__><__&__>Radio 单选框<__=__><__&__>Checkbox 多选框<__=__><__&__>Switch 开关<__=__><__&__>Rate 评分<__=__><__&__>Slider 滑块<__=__><__&__>Select 选择器<__=__><__&__>SelectDate 日期选择器<__=__><__&__>SelectTime 时间选择器<__=__><__&__>Cascader 级联选择器<__=__><__&__>Upload 文件上传<__=__><__&__>Calendar 日历<__=__><__&__>Flex 弹性布局<__=__><__&__>Tabs 标签页<__=__><__&__>Collapse 折叠面板<__=__><__&__>Sticky 吸顶<__=__><__&__>TopBar 导航栏<__=__><__&__>FloatView 悬浮视图<__=__><__&__>Footer 底部视图<__=__><__&__>List 列表<__=__><__&__>ListView 列表视图<__=__><__&__>ListViewRefresh 列表刷新<__=__><__&__>Waterfall 瀑布流<__=__><__&__>Banner 轮播图<__=__><__&__>Marquee 跑马灯<__=__><__&__>Pagination 分页<__=__><__&__>Timeline 时间轴<__=__><__&__>Avatar 头像<__=__><__&__>ReadMore 查看更多<__=__><__&__>Draggable 拖拽<__=__><__&__>FilterBar 筛选栏<__=__><__&__>Tree 树形结构<__=__><__&__>Badge 角标<__=__><__&__>NoticeBar 通知栏<__=__><__&__>Countdown 倒计时<__=__><__&__>Progress 进度条<__=__><__&__>ProgressCircle 圆形进度条<__=__><__&__>Skeleton 骨架图<__=__><__&__>LoadMore 加载更多<__=__><__&__>RollingNumber 数字滚动<__=__><__&__>ActionSheet 操作菜单<__=__><__&__>Popup 弹窗<__=__><__&__>Confirm 确认框<__=__><__&__>Toast 提示框<__=__><__&__>QRCode 二维码<__=__><__&__>Sign 签名<__=__><__&__>DayUts 日期<__=__><__&__>Vibrate 震动<__=__><__&__>Cropper 图片裁剪<__=__><__&__>Canvas 画布<__=__><__&__>SVG 图标<__=__><__&__>SlideVerify 滑动验证<__=__><__&__>Animation 动画<__=__><__&__>编辑地址<__=__><__&__>cool-unix<__=__><__&__>首页<__=__><__&__>我的<__=__><__&__>这是一段需要保护的内容<__=__><__&__>水印会覆盖在内容上方，防止内容被盗用<__=__><__&__>可自定义的水印内容区域<__=__><__&__>水印文本<__=__><__&__>字体大小<__=__><__&__>透明度<__=__><__&__>旋转角度<__=__><__&__>水印宽度<__=__><__&__>水印高度<__=__><__&__>水平间距<__=__><__&__>垂直间距<__=__><__&__>字体粗细<__=__><__&__>正常<__=__><__&__>加粗<__=__><__&__>多行文本水印<__=__><__&__>重要文档<__=__><__&__>这是一份重要的文档内容，需要添加水印保护。<__=__><__&__>水印可以防止内容被未授权的复制和传播。<__=__><__&__>图片保护<__=__>"
    ]
  ];
  const en = [
    [
      "其他<__=__>Other<__&__>文件管理<__=__>File Management<__&__>该模板正在开发中<__=__>This template is under development<__&__>未登录<__=__>Not logged in<__&__>总点击<__=__>Total clicks<__&__>赞<__=__>Like<__&__>收藏<__=__>Favorite<__&__>粉丝<__=__>Fans<__&__>接单模式<__=__>Order receiving mode<__&__>已关闭<__=__>Closed<__&__>消息通知<__=__>Message notification<__&__>待支付<__=__>Pending payment<__&__>未发货<__=__>Not shipped<__&__>已发货<__=__>Shipped<__&__>售后 / 退款<__=__>After-sales / Refund<__&__>我的钱包<__=__>My wallet<__&__>数据看板<__=__>Data dashboard<__&__>历史记录<__=__>History<__&__>邀请好友<__=__>Invite friends<__&__>设置<__=__>Settings<__&__>转动图片<__=__>Rotate Picture<__&__>验证通过<__=__>Verification Passed<__&__>验证失败<__=__>Verification Failed<__&__>操作<__=__>Operation<__&__>清空<__=__>Clear<__&__>预览<__=__>Preview<__&__>设置高度<__=__>Set Height<__&__>毛笔效果<__=__>Brush Effect<__&__>添加LOGO<__=__>Add LOGO<__&__>圆角定位点<__=__>Rounded Corner Anchor Point<__&__>内间距<__=__>Inner Spacing<__&__>导出图片<__=__>Export Picture<__&__>矩形<__=__>Rectangle<__&__>点<__=__>Point<__&__>线性<__=__>Linear<__&__>小方格<__=__>Small Square<__&__>格式化<__=__>Format<__&__>添加<__=__>Add<__&__>减去<__=__>Subtract<__&__>获取某个单位的开始时间<__=__>Get the Start Time of a Certain Unit<__&__>密码输入<__=__>Password input<__&__>可清除<__=__>Clearable<__&__>左右插槽<__=__>Left and right slots<__&__>左图标<__=__>Left icon<__&__>右图标<__=__>Right icon<__&__>自动聚焦<__=__>Auto focus<__&__>长度为6<__=__>Length is 6<__&__>步进为10<__=__>Step is 10<__&__>最小为10<__=__>Minimum is 10<__&__>最大为50<__=__>Maximum is 50<__&__>可以小数<__=__>Can be decimal<__&__>可以输入<__=__>Can be input<__&__>用户名<__=__>Username<__&__>请输入用户名<__=__>Please enter username<__&__>邮箱<__=__>Email<__&__>请输入邮箱地址<__=__>Please enter email address<__&__>动态验证<__=__>Dynamic verification<__&__>联系人<__=__>Contact<__&__>添加联系人<__=__>Add contact<__&__>身高<__=__>Height<__&__>跑马灯<__=__>Marquee<__&__>分页<__=__>Pagination<__&__>时间轴<__=__>Timeline<__&__>拖拽<__=__>Drag<__&__>筛选栏<__=__>Filter Bar<__&__>树形结构<__=__>Tree Structure<__&__>状态组件<__=__>Status Component<__&__>角标<__=__>Badge<__&__>通知栏<__=__>Notification Bar<__&__>倒计时<__=__>Countdown<__&__>数字滚动<__=__>Digital Scrolling<__&__>进度条<__=__>Progress Bar<__&__>圆形进度条<__=__>Circular Progress Bar<__&__>骨架图<__=__>Skeleton Screen<__&__>加载更多<__=__>Load More<__&__>反馈组件<__=__>Feedback Component<__&__>操作菜单<__=__>Operation Menu<__&__>弹窗<__=__>Pop-up Window<__&__>确认框<__=__>Confirmation Box<__&__>提示框<__=__>Prompt Box<__&__>签名<__=__>Signature<__&__>水印<__=__>Watermark<__&__>图片裁剪<__=__>Image Cropping<__&__>Canvas<__=__>Canvas<__&__>富文本<__=__>Rich Text<__&__>该功能正在开发中<__=__>This function is under development<__&__>圆形<__=__>Circle<__&__>组合<__=__>Combination<__&__>基础用法<__=__>Basic Usage<__&__>自定义<__=__>Customization<__&__>加快滚动速度<__=__>Speed up scrolling<__&__>显示小数位数<__=__>Display decimal places<__&__>自定义样式<__=__>Custom style<__&__>自定义颜色<__=__>Custom color<__&__>自定义宽度<__=__>Custom width<__&__>不显示文本<__=__>Do not display text<__&__>改个颜色<__=__>Change the color<__&__>显示文本<__=__>Display text<__&__>快一些<__=__>Faster<__&__>带图标<__=__>With icon<__&__>设置速度<__=__>Set speed<__&__>左间隔<__=__>Left interval<__&__>右移动<__=__>Right move<__&__>左移动<__=__>Left move<__&__>多个数据<__=__>Multiple data<__&__>点击收起<__=__>Click to collapse<__&__>点击展开<__=__>Click to expand<__&__>ref 方式调用<__=__>Call by ref method<__&__>自定义图标、文字、大小<__=__>Customize icon, text, size<__&__>上传证件照<__=__>Upload ID photo<__&__>多选<__=__>Multiple selection<__&__>限制 3 个<__=__>Limit 3<__&__>边框<__=__>Border<__&__>显示字数<__=__>Displayed characters<__&__>自动增高<__=__>Auto increase<__&__>其他颜色<__=__>Other colors<__&__>大一点<__=__>Bigger<__&__>正方形<__=__>Square<__&__>范围选择<__=__>Range selection<__&__>显示值<__=__>Display value<__&__>步长10<__=__>Step 10<__&__>开发中，敬请期待<__=__>Under development, please look forward to it<__&__>基础组件<__=__>Basic components<__&__>文本<__=__>Text<__&__>按钮<__=__>Button<__&__>图片<__=__>Image<__&__>图标<__=__>Icon<__&__>标签<__=__>Label<__&__>表单组件<__=__>Form components<__&__>表单验证<__=__>Form validation<__&__>输入框<__=__>Input box<__&__>文本域<__=__>Text area<__&__>计数器<__=__>Counter<__&__>口令输入<__=__>Password input<__&__>键盘<__=__>Keyboard<__&__>单选框<__=__>Radio box<__&__>多选框<__=__>Checkbox<__&__>开关<__=__>Switch<__&__>评分<__=__>Rating<__&__>滑块<__=__>Slider<__&__>选择器<__=__>Selector<__&__>可滑动<__=__>Swipeable<__&__>左滑编辑<__=__>Swipe left to edit<__&__>编辑<__=__>Edit<__&__>右滑删除<__=__>Swipe right to delete<__&__>账号<__=__>Account<__&__>我的订单<__=__>My Orders<__&__>我的收藏<__=__>My Favorites<__&__>筛选<__=__>Filter<__&__>长按项即可拖动排序<__=__>Long press on an item to drag and sort<__&__>单列排序<__=__>Single-column sorting<__&__>不需要长按<__=__>No long press required<__&__>结合列表使用<__=__>Use in combination with a list<__&__>多列排序<__=__>Multi-column sorting<__&__>结合图片使用<__=__>Use in combination with images<__&__>禁用手势<__=__>Disable gestures<__&__>自定义样式2<__=__>Custom style 2<__&__>无图片<__=__>No image<__&__>圆角<__=__>Rounded corners<__&__>自定义大小<__=__>Custom size<__&__>省略号<__=__>Ellipsis<__&__>多行省略号<__=__>Multi-line ellipsis<__&__>金额<__=__>Amount<__&__>手机号脱敏<__=__>Mobile number desensitization<__&__>姓名脱敏<__=__>Name desensitization<__&__>邮箱脱敏<__=__>Email desensitization<__&__>银行卡脱敏<__=__>Bank card desensitization<__&__>自定义脱敏字符<__=__>Custom desensitization character<__&__>主要<__=__>Main<__&__>危险<__=__>Dangerous<__&__>信息<__=__>Information<__&__>邮件<__=__>Mail<__&__>文件<__=__>File<__&__>可关闭<__=__>Closable<__&__>镂空<__=__>Hollowed out<__&__>自定义无圆角<__=__>Custom without rounded corners<__&__>不同裁剪<__=__>Different cropping<__&__>点击可预览<__=__>Click to preview<__&__>失败时显示<__=__>Display when failed<__&__>自定义圆角<__=__>Custom rounded corners<__&__>设置颜色<__=__>Set color<__&__>垂直方向<__=__>Vertical direction<__&__>3秒后加载完成<__=__>Load completed after 3 seconds<__&__>隐藏为 00 的值<__=__>Hide the value of 00<__&__>指定天数<__=__>Specify the number of days<__&__>自定义模板<__=__>Custom template<__&__>指定小时<__=__>Specify the hour<__&__>指定分钟<__=__>Specify the minute<__&__>指定秒<__=__>Specify the second<__&__>完成后提示<__=__>Prompt after completion<__&__>3秒后开始倒计时<__=__>Start the countdown after 3 seconds<__&__>结合按钮<__=__>Combine with button<__&__>购买<__=__>Purchase<__&__>消息<__=__>Message<__&__>结合图片<__=__>Combine with picture<__&__>结合图标<__=__>Combine with icon<__&__>点击触发<__=__>Click to trigger<__&__>不同大小<__=__>Different sizes<__&__>不同颜色<__=__>Different colors<__&__>使用base64<__=__>Use base64<__&__>没有错误提示<__=__>No error prompt<__&__>体重<__=__>Weight<__&__>所在地区<__=__>Location<__&__>出生年月<__=__>Date of Birth<__&__>个人简介<__=__>Personal Introduction<__&__>请输入个人简介<__=__>Please enter your personal introduction<__&__>公开状态<__=__>Public Status<__&__>重置<__=__>Reset<__&__>提交<__=__>Submit<__&__>未知<__=__>Unknown<__&__>篮球<__=__>Basketball<__&__>足球<__=__>Football<__&__>羽毛球<__=__>Badminton<__&__>乒乓球<__=__>Table Tennis<__&__>游泳<__=__>Swimming<__&__>用户名不能为空<__=__>Username cannot be empty<__&__>用户名长度在3-20个字符之间<__=__>Username length should be between 3 and 20 characters<__&__>邮箱不能为空<__=__>Email cannot be empty<__&__>邮箱格式不正确<__=__>Invalid email format<__&__>身高不能为空<__=__>Height cannot be empty<__&__>身高在160-190cm之间<__=__>Height should be between 160 and 190 cm<__&__>显示星期<__=__>Show week<__&__>显示其他月份<__=__>Show other months<__&__>不同位置<__=__>Different positions<__&__>顶部<__=__>Top<__&__>中间<__=__>Middle<__&__>底部<__=__>Bottom<__&__>不同类型<__=__>Different types<__&__>成功<__=__>Success<__&__>失败<__=__>Failure<__&__>警告<__=__>Warning<__&__>问题<__=__>Problem<__&__>停止<__=__>Stop<__&__>自定义图标<__=__>Custom icon<__&__>只存在一个<__=__>Only one exists<__&__>不同位置提示<__=__>Different position tips<__&__>不同类型提示<__=__>Different type tips<__&__>带图标提示<__=__>Tips with icon<__&__>移除其他已存在的提示<__=__>Remove other existing tips<__&__>打开弹窗<__=__>Open pop-up window<__&__>设置宽度 80%<__=__>Set width 80%<__&__>充值1000元<__=__>Recharge 1000 yuan<__&__>完成首笔交易<__=__>Complete the first transaction<__&__>优选灵活配置混合A<__=__>Preferred Flexible Allocation Hybrid A<__&__>1000元起<__=__>Starting from 1000 yuan<__&__>禁用切换按钮<__=__>Disable the switch button<__&__>自定义高度<__=__>Customize height<__&__>多页数<__=__>Multiple pages<__&__>上一页<__=__>Previous page<__&__>下一页<__=__>Next page<__&__>横向滚动<__=__>Horizontal scroll<__&__>纵向滚动<__=__>Vertical scroll<__&__>快一点<__=__>Faster<__&__>暂停<__=__>Pause<__&__>内容靠左<__=__>Content aligned to the left<__&__>QQ<__=__>QQ<__&__>带箭头<__=__>With arrow<__&__>余额<__=__>Balance<__&__>带图片<__=__>With picture<__&__>神仙都没用<__=__>Even the gods are useless<__&__>折叠<__=__>Fold<__&__>插槽<__=__>Slot<__&__>使用 PT 自定义颜色<__=__>Use PT to customize color<__&__>自定义返回图标<__=__>Customize back icon<__&__>自定义返回路径<__=__>Customize back path<__&__>自定义标题内容<__=__>Customize title content<__&__>显示滑块<__=__>Show slider<__&__>添加间距<__=__>Add spacing<__&__>横向填充<__=__>Horizontal fill<__&__>适用于标签数量不多的情况<__=__>Suitable for cases with few labels<__&__>居中<__=__>Center<__&__>单个禁用<__=__>Single disable<__&__>显示下划线<__=__>Show underline<__&__>禁用<__=__>Disable<__&__>取消订单<__=__>Cancel order<__&__>立即购买<__=__>Buy now<__&__>确认收货<__=__>Confirm receipt of goods<__&__>评价<__=__>Evaluate<__&__>禁用状态，无法拖拽<__=__>Disabled state, cannot be dragged<__&__>不吸附边缘，任意位置可拖拽<__=__>Does not adhere to the edge, can be dragged anywhere<__&__>这是一个提示<__=__>This is a tip<__&__>标签格式化<__=__>Label formatting<__&__>固定开始、结束日期<__=__>Fixed start and end dates<__&__>自定义快捷选项<__=__>Custom quick options<__&__>只读<__=__>Read-only<__&__>显示分数<__=__>Show scores<__&__>允许半星<__=__>Allow half stars<__&__>换个图标<__=__>Change the icon<__&__>纵向排列<__=__>Vertical arrangement<__&__>换个样式<__=__>Change the style<__&__>不显示图标<__=__>Do not show the icon<__&__>其他样式<__=__>Other styles<__&__>数字键盘<__=__>Numeric keypad<__&__>打开键盘<__=__>Open the keyboard<__&__>是否显示输入值<__=__>Whether to display the input value<__&__>输入即绑定<__=__>Bind on input<__&__>身份证键盘<__=__>ID card keypad<__&__>密码键盘<__=__>Password keypad<__&__>是否加密<__=__>Whether to encrypt<__&__>车牌号键盘<__=__>License plate number keypad<__&__>数字输入<__=__>Numeric input<__&__>请输入验证码<__=__>Please enter the verification code<__&__>登录<__=__>Login<__&__>购物车 ({num})<__=__>Shopping Cart ({num})<__&__>完成<__=__>Complete<__&__>管理<__=__>Manage<__&__>删除<__=__>Delete<__&__>全选<__=__>Select All<__&__>合计<__=__>Total<__&__>去结算<__=__>Go to Checkout<__&__>温馨提示<__=__>Warm Prompt<__&__>确定删除该商品吗？<__=__>Are you sure to delete this product?<__&__>删除成功<__=__>Delete successfully<__&__>请先选择商品<__=__>Please select a product first<__&__>确定删除选中的商品吗？<__=__>Are you sure to delete the selected products?<__&__>您需支付 {price} 元，请确认支付<__=__>You need to pay {price} yuan. Please confirm the payment<__&__>支付成功<__=__>Payment successful<__&__>已设为默认<__=__>Set as default<__&__>设为默认<__=__>Set as default<__&__>修改<__=__>Modify<__&__>添加地址<__=__>Add address<__&__>Flex 弹性布局<__=__>Flex Elastic Layout<__&__>Tabs 标签页<__=__>Tabs<__&__>Collapse 折叠面板<__=__>Collapse Panel<__&__>Sticky 吸顶<__=__>Sticky<__&__>TopBar 导航栏<__=__>TopBar Navigation Bar<__&__>FloatView 悬浮视图<__=__>FloatView Floating View<__&__>Footer 底部视图<__=__>Footer Bottom View<__&__>List 列表<__=__>List<__&__>ListView 列表视图<__=__>ListView List View<__&__>ListViewRefresh 列表刷新<__=__>ListViewRefresh List Refresh<__&__>Waterfall 瀑布流<__=__>Waterfall Flow<__&__>Banner 轮播图<__=__>Banner Carousel<__&__>Marquee 跑马灯<__=__>Marquee Moving Light<__&__>Pagination 分页<__=__>Pagination<__&__>Timeline 时间轴<__=__>Timeline Time Axis<__&__>Avatar 头像<__=__>Avatar<__&__>ReadMore 查看更多<__=__>ReadMore View More<__&__>Draggable 拖拽<__=__>Draggable Drag<__&__>FilterBar 筛选栏<__=__>FilterBar Filter Bar<__&__>Tree 树形结构<__=__>Tree Tree Structure<__&__>获取某个单位的结束时间<__=__>Get the end time of a certain unit<__&__>是否同一天<__=__>Is it the same day<__&__>是否早于<__=__>Is it earlier than<__&__>是否晚于<__=__>Is it later than<__&__>差值<__=__>Difference<__&__>差值（单位）<__=__>Difference (unit)<__&__>选择图片<__=__>Select a picture<__&__>可调节裁剪框大小<__=__>Adjust the size of the cropping frame<__&__>预览图片<__=__>Preview the picture<__&__>保存图片<__=__>Save the picture<__&__>本页面内容由 canvas 渲染生成，是否立即预览图片效果？<__=__>The content of this page is rendered by canvas. Do you want to preview the picture effect immediately?<__&__>基础动画<__=__>Basic animation<__&__>淡入淡出<__=__>Fade in and out<__&__>播放动画<__=__>Play animation<__&__>滑入<__=__>Slide in<__&__>旋转翻转<__=__>Rotate and flip<__&__>摇摆抖动<__=__>Sway and shake<__&__>特殊效果<__=__>Special effects<__&__>组合动画<__=__>Combined animation<__&__>标题<__=__>Title<__&__>已阅读并同意<__=__>Read and agreed<__&__>用户协议<__=__>User Agreement<__&__>隐私政策<__=__>Privacy Policy<__&__>请先阅读并同意《用户协议》和《隐私政策》<__=__>Please read and agree to the User Agreement and Privacy Policy first<__&__>我的昵称<__=__>My Nickname<__&__>简介<__=__>Profile<__&__>介绍一下自己<__=__>Introduce yourself<__&__>性别<__=__>Gender<__&__>编辑性别<__=__>Edit Gender<__&__>生日<__=__>Birthday<__&__>选择生日<__=__>Select Birthday<__&__>地区<__=__>Region<__&__>选择所在的地区<__=__>Select your region<__&__>选择性别<__=__>Select Gender<__&__>保密<__=__>Confidential<__&__>男<__=__>Male<__&__>女<__=__>Female<__&__>性别设置成功<__=__>Gender settings successful<__&__>生日设置成功<__=__>Birthday settings successful<__&__>地区设置成功<__=__>Region settings successful<__&__>关于{name}<__=__>About {name}<__&__>联系客服<__=__>Contact customer service<__&__>退出登录<__=__>Log out<__&__>确定退出登录吗？<__=__>Are you sure you want to log out?<__&__>深色模式<__=__>Dark mode<__&__>多语言<__=__>Multi-language<__&__>字体大小<__=__>Font size<__&__>访问官网<__=__>Visit official website<__&__>商城<__=__>Mall<__&__>商品分类<__=__>Product category<__&__>商品详情<__=__>Product details<__&__>商品列表、筛选<__=__>Product list, filtering<__&__>购物车<__=__>Shopping cart<__&__>订单列表、详情<__=__>Order list, details<__&__>收货地址<__=__>Delivery address<__&__>聊天<__=__>Chat<__&__>对话列表、历史记录<__=__>Conversation list, history<__&__>流式回复<__=__>Streaming reply<__&__>语言合成<__=__>Text-to-Speech<__&__>语音识别<__=__>Speech recognition<__&__>Animation 动画<__=__>Animation Animation<__&__>编辑地址<__=__>Edit Address<__&__>cool-unix<__=__>cool-unix<__&__>首页<__=__>Home Page<__&__>我的<__=__>Mine<__&__>删除地址后无法恢复，确认要删除该地址吗？<__=__>The address cannot be restored after deletion. Are you sure you want to delete this address?<__&__>加载中<__=__>Loading<__&__>收货人<__=__>Consignee<__&__>请输入收货人姓名<__=__>Please enter the consignee's name<__&__>手机号<__=__>Mobile phone number<__&__>选择省市区<__=__>Select province, city and district<__&__>详细地址<__=__>Detailed address<__&__>小区楼栋、门牌号、村等<__=__>Residential building number, house number, village, etc.<__&__>默认地址<__=__>Default address<__&__>保存<__=__>Save<__&__>收货人不能为空<__=__>The consignee cannot be empty<__&__>手机号不能为空<__=__>The mobile phone number cannot be empty<__&__>手机号格式不正确<__=__>The mobile phone number format is incorrect<__&__>详细地址不能为空<__=__>The detailed address cannot be empty<__&__>所在地区不能为空<__=__>The location cannot be empty<__&__>保存中<__=__>Saving<__&__>开启通知<__=__>Enable notifications<__&__>通用设置<__=__>General settings<__&__>通知设置<__=__>Notification settings<__&__>隐私设置<__=__>Privacy settings<__&__>支付失败<__=__>Payment failed<__&__>授权信息仅用于用户登录<__=__>Authorization information is only used for user login<__&__>登录授权失败<__=__>Login authorization failed<__&__>获取短信验证码<__=__>Get SMS verification code<__&__>验证码<__=__>Verification code<__&__>发送短信<__=__>Send SMS<__&__>{n}s后重新获取<__=__>Re-get after {n}s<__&__>获取验证码<__=__>Get verification code<__&__>短信已发送，请查收<__=__>SMS has been sent, please check<__&__>请填写验证码<__=__>Please fill in the verification code<__&__>请填写正确的手机号格式<__=__>Please fill in the correct mobile phone number format<__&__>全局字号<__=__>Global font size<__&__>这是一段示例文字，用于预览不同字号的效果。<__=__>This is a sample text for previewing the effects of different font sizes.<__&__>默认 1.0<__=__>Default 1.0<__&__>切换语言<__=__>Switch language<__&__>切换中<__=__>Switching<__&__>模板<__=__>Template<__&__>编辑资料<__=__>Edit profile<__&__>Text 文本<__=__>Text<__&__>Button 按钮<__=__>Button<__&__>滑块大点<__=__>Slider larger<__&__>换个颜色<__=__>Change color<__&__>最大50<__=__>Maximum 50<__&__>自定义触发器<__=__>Custom trigger<__&__>打开选择器<__=__>Open selector<__&__>多列<__=__>Multiple columns<__&__>通过 children 配置多级数据，并使用 column-count 参数指定显示的列数<__=__>Configure multi-level data through children and use the column-count parameter to specify the number of columns to display<__&__>弹窗中使用<__=__>Use in pop-up window<__&__>打开<__=__>Open<__&__>选择地区<__=__>Select region<__&__>绑定值<__=__>Bind value<__&__>下一步<__=__>Next<__&__>确定<__=__>OK<__&__>关闭<__=__>Close<__&__>显示取消按钮<__=__>Show cancel button<__&__>修改按钮文案<__=__>Modify button text<__&__>显示绑定值<__=__>Show bound value<__&__>时<__=__>When<__&__>时:分<__=__>HH:MM<__&__>时:分:秒<__=__>HH:MM:SS<__&__>设置大小<__=__>Set Size<__&__>集成 iconfont 与 remixicon 图标库，展示部分示例<__=__>Integrate iconfont and remixicon icon libraries and display some examples<__&__>iconfont<__=__>iconfont<__&__>remixicon<__=__>remixicon<__&__>复制成功<__=__>Copy Success<__&__>普通<__=__>Normal<__&__>浅色<__=__>Light Color<__&__>深色<__=__>Dark Color<__&__>只显示图标<__=__>Only Show Icons<__&__>文本模式<__=__>Text Mode<__&__>带边框<__=__>With Border<__&__>圆角按钮<__=__>Rounded Button<__&__>带左侧图标<__=__>With Left Icon<__&__>小<__=__>Small<__&__>默认<__=__>Default<__&__>大<__=__>Large<__&__>无权限<__=__>No Permission<__&__>服务异常<__=__>Service Exception<__&__>请在微信浏览器中打开<__=__>Please Open in WeChat Browser<__&__>已取消支付<__=__>Payment Cancelled<__&__>微信<__=__>WeChat<__&__>父子关联<__=__>Father-son association<__&__>选中值<__=__>Selected value<__&__>选中操作<__=__>Selection operation<__&__>选中部分节点<__=__>Select some nodes<__&__>获取选中节点<__=__>Get selected nodes<__&__>获取半选节点<__=__>Get half-selected nodes<__&__>清空选中<__=__>Clear selection<__&__>展开操作<__=__>Expand operation<__&__>展开部分节点<__=__>Expand some nodes<__&__>获取展开节点<__=__>Get expanded nodes<__&__>展开所有<__=__>Expand all<__&__>收起所有<__=__>Collapse all<__&__>开通账号<__=__>Open an account<__&__>赠送500元<__=__>Give 500 yuan<__&__>完成实名认证<__=__>Complete real-name authentication<__&__>通过身份证认证<__=__>Pass ID card authentication<__&__>绑定银行卡<__=__>Bind a bank card<__&__>绑定招商银行储蓄卡<__=__>Bind China Merchants Bank savings card<__&__>首次充值<__=__>First recharge<__&__>日期选择器<__=__>Date Picker<__&__>时间选择器<__=__>Time Picker<__&__>级联选择器<__=__>Cascading Selector<__&__>文件上传<__=__>File Upload<__&__>日历<__=__>Calendar<__&__>布局组件<__=__>Layout Component<__&__>弹性布局<__=__>Flexible Layout<__&__>标签页<__=__>Tab<__&__>折叠面板<__=__>Collapsible Panel<__&__>吸顶<__=__>Sticky<__&__>导航栏<__=__>Navigation Bar<__&__>底部视图<__=__>Bottom View<__&__>悬浮视图<__=__>Floating View<__&__>数据展示<__=__>Data Display<__&__>查看更多<__=__>View More<__&__>列表<__=__>List<__&__>列表视图<__=__>ListView<__&__>列表刷新<__=__>List Refresh<__&__>瀑布流<__=__>Waterfall Flow<__&__>轮播图<__=__>Carousel<__&__>无头<__=__>Headless<__&__>左侧<__=__>Left<__&__>右侧<__=__>Right<__&__>隐藏取消按钮<__=__>Hide Cancel Button<__&__>自定义文本<__=__>Custom Text<__&__>关闭前钩子<__=__>Pre-Close Hook<__&__>显示时长<__=__>Display Duration<__&__>确定要删除吗？<__=__>Are you sure you want to delete?<__&__>确定要删除吗？3秒后自动关闭<__=__>Automatically close in 3 seconds after asking if you are sure you want to delete<__&__>带标题、描述<__=__>With title and description<__&__>无法点击遮罩关闭<__=__>Cannot close by clicking on the mask<__&__>不需要取消按钮<__=__>Do not need Cancel Button<__&__>插槽用法<__=__>Slot Usage<__&__>反馈<__=__>Feedback<__&__>删除好友会同时删除所有聊天记录<__=__>Deleting a friend will also delete all chat records<__&__>删除好友<__=__>Delete Friend<__&__>确定要删除好友吗？<__=__>Are you sure you want to delete the friend?<__&__>点我关闭<__=__>Click me to close<__&__>确定要关闭吗？<__=__>Are you sure you want to close?<__&__>支付宝<__=__>Alipay<__&__>Badge 角标<__=__>Badge Corner Mark<__&__>NoticeBar 通知栏<__=__>NoticeBar Notification Bar<__&__>Countdown 倒计时<__=__>Countdown Countdown Timer<__&__>Progress 进度条<__=__>Progress Progress Bar<__&__>ProgressCircle 圆形进度条<__=__>ProgressCircle Circular Progress Bar<__&__>Skeleton 骨架图<__=__>Skeleton Skeleton Diagram<__&__>LoadMore 加载更多<__=__>LoadMore Load More<__&__>RollingNumber 数字滚动<__=__>RollingNumber Digital Scroll<__&__>ActionSheet 操作菜单<__=__>ActionSheet Operation Menu<__&__>Popup 弹窗<__=__>Popup Pop-up Window<__&__>Confirm 确认框<__=__>Confirm Confirmation Box<__&__>Toast 提示框<__=__>Toast Toast Message<__&__>QRCode 二维码<__=__>QRCode QR Code<__&__>Sign 签名<__=__>Sign Signature<__&__>DayUts 日期<__=__>DayUts Date<__&__>Vibrate 震动<__=__>Vibrate Vibration<__&__>Cropper 图片裁剪<__=__>Cropper Image Cropper<__&__>Canvas 画布<__=__>Canvas Canvas<__&__>SVG 图标<__=__>SVG SVG Icon<__&__>SlideVerify 滑动验证<__=__>SlideVerify Slide Verification<__&__>体重不能为空<__=__>Weight cannot be empty<__&__>体重在40-100kg之间<__=__>Weight should be between 40 - 100 kg<__&__>标签不能为空<__=__>Label cannot be empty<__&__>标签最多选择2个<__=__>At most 2 labels can be selected<__&__>性别不能为空<__=__>Gender cannot be empty<__&__>出生年月不能为空<__=__>Date of birth cannot be empty<__&__>出生年月不大于2010-01-01<__=__>Date of birth should not be later than 2010-01-01<__&__>联系人不能为空<__=__>Contact person cannot be empty<__&__>提交成功<__=__>Submission successful<__&__>单个 true / false<__=__>Single true / false<__&__>带索引、地区选择<__=__>With index, area selection<__&__>换个分隔符<__=__>Change the delimiter<__&__>列表高度小一点<__=__>Make the list height smaller<__&__>范围选<__=__>Range selection<__&__>禁用部分日期<__=__>Disable some dates<__&__>日历长列表<__=__>Calendar long list<__&__>打开日历长列表<__=__>Open the calendar long list<__&__>日历面板<__=__>Calendar panel<__&__>自定义文案和颜色<__=__>Customize text and color<__&__>显示头<__=__>Show the header<__&__>头像上传成功<__=__>Profile picture uploaded successfully<__&__>编辑昵称<__=__>Edit nickname<__&__>请输入昵称<__=__>Please enter a nickname<__&__>请设置2-20个字符，不包括@<>/等无效字符<__=__>Please set 2-20 characters, excluding invalid characters such as @<>/<__&__>确认<__=__>Confirm<__&__>昵称长度需在2-20个字符之间<__=__>Nickname length should be between 2-20 characters<__&__>昵称不能包含@<>/等特殊字符<__=__>Nickname cannot contain special characters such as @<>/<__&__>编辑简介<__=__>Edit profile<__&__>简介不能为空<__=__>Profile cannot be empty<__&__>提示<__=__>Tip<__&__>为提供更好的服务，我们邀请您填写昵称、头像等公开信息<__=__>To provide better service, we invite you to fill in public information such as nickname and profile picture<__&__>头像<__=__>Profile picture<__&__>昵称<__=__>Nickname<__&__>点击输入昵称<__=__>Click to enter nickname<__&__>取消<__=__>Cancel<__&__>请上传头像<__=__>Please upload a profile picture<__&__>登录中<__=__>Logging in<__&__>手机登录<__=__>Mobile login<__&__>未注册的手机号登录成功后将自动注册<__=__>Unregistered mobile numbers will be automatically registered after successful login<__&__>请输入手机号<__=__>Please enter a mobile number<__&__>Image 图片<__=__>Image Picture<__&__>Icon 图标<__=__>Icon Icon<__&__>Tag 标签<__=__>Tag Tag<__&__>Form 表单验证<__=__>Form Form Validation<__&__>Input 输入框<__=__>Input Input Box<__&__>Textarea 文本域<__=__>Textarea Text Area<__&__>InputNumber 计数器<__=__>InputNumber Counter<__&__>InputOtp 口令输入<__=__>InputOtp Password Input<__&__>Keyboard 键盘<__=__>Keyboard Keyboard<__&__>Radio 单选框<__=__>Radio Radio Button<__&__>Checkbox 多选框<__=__>Checkbox Checkbox<__&__>Switch 开关<__=__>Switch Switch<__&__>Rate 评分<__=__>Rate Rating<__&__>Slider 滑块<__=__>Slider Slider<__&__>Select 选择器<__=__>Select Selector<__&__>SelectDate 日期选择器<__=__>SelectDate Date Selector<__&__>SelectTime 时间选择器<__=__>SelectTime Time Selector<__&__>Cascader 级联选择器<__=__>Cascader Cascading Selector<__&__>Upload 文件上传<__=__>Upload File Upload<__&__>Calendar 日历<__=__>Calendar Calendar<__&__>这是一段需要保护的内容<__=__>This is content that needs to be protected<__&__>水印会覆盖在内容上方，防止内容被盗用<__=__>Watermarks will be overlaid on the content to prevent unauthorized use<__&__>可自定义的水印内容区域<__=__>Customizable watermark content area<__&__>水印文本<__=__>Watermark Text<__&__>字体大小<__=__>Font Size<__&__>透明度<__=__>Opacity<__&__>旋转角度<__=__>Rotation Angle<__&__>水印宽度<__=__>Watermark Width<__&__>水印高度<__=__>Watermark Height<__&__>水平间距<__=__>Horizontal Spacing<__&__>垂直间距<__=__>Vertical Spacing<__&__>字体粗细<__=__>Font Weight<__&__>正常<__=__>Normal<__&__>加粗<__=__>Bold<__&__>多行文本水印<__=__>Multi-line Text Watermark<__&__>重要文档<__=__>Important Document<__&__>这是一份重要的文档内容，需要添加水印保护。<__=__>This is an important document that requires watermark protection.<__&__>水印可以防止内容被未授权的复制和传播。<__=__>Watermarks can prevent unauthorized copying and distribution of content.<__&__>图片保护<__=__>Image Protection"
    ]
  ];
  function parse(val) {
    const isCustom = val.length == 1 && val[0].length == 1;
    if (!isCustom) {
      return val;
    }
    return val[0][0].split("<__&__>").map((e) => {
      return e.split("<__=__>");
    });
  }
  const messages = {
    "zh-cn": parse(zhcn),
    en: parse(en)
  };
  const locale = vue.ref("zh-cn");
  const setLocale = (value) => {
    locale.value = value;
    storage.set("locale", value, 0);
  };
  const t = (name) => {
    var _a;
    let data = messages[locale.value];
    if (data == null) {
      return name;
    }
    let text = (_a = data.find((e) => {
      return e[0] == name;
    })) === null || _a === void 0 ? void 0 : _a[1];
    if (text == null || text == "") {
      text = name;
    }
    return text;
  };
  const $t = (name, data) => {
    let text = t(name);
    if (!isNull(data)) {
      forInObject(data, (value, key) => {
        if (typeof value === "number") {
          value = value.toString();
        }
        text = text.replaceAll("{".concat(key, "}"), value);
      });
    }
    return text;
  };
  const _sfc_main$B = /* @__PURE__ */ vue.defineComponent({
    __name: "locale-set",
    setup(__props, _a) {
      var __expose = _a.expose;
      const ui2 = useUi();
      const options = [
        {
          label: "简体中文",
          value: "zh-cn"
        },
        {
          label: "繁体中文",
          value: "zh-tw"
        },
        {
          label: "English",
          value: "en"
        },
        {
          label: "Español",
          value: "es"
        },
        {
          label: "日本語",
          value: "ja"
        },
        {
          label: "한국어",
          value: "ko"
        },
        {
          label: "Français",
          value: "fr"
        }
      ];
      const selectRef = vue.ref(null);
      const active = vue.ref(locale.value);
      function open() {
        active.value = locale.value;
        if (["zh-Hans", "zh"].some((e) => {
          return e == locale.value;
        })) {
          active.value = "zh-cn";
        }
        selectRef.value.open((value = null) => {
          ui2.showLoading(t("切换中"));
          setTimeout(() => {
            setLocale(value);
            ui2.hideLoading();
          }, 500);
        });
      }
      function close() {
        selectRef.value.close();
      }
      __expose({
        open,
        close
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_select = resolveEasycom(vue.resolveDynamicComponent("cl-select"), __easycom_1$3);
        return vue.openBlock(), vue.createBlock(_component_cl_select, new UTSJSONObject({
          ref_key: "selectRef",
          ref: selectRef,
          modelValue: active.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event = null) => {
            return active.value = $event;
          }),
          options,
          "show-trigger": false,
          title: vue.unref(t)("切换语言"),
          "cancel-text": vue.unref(t)("取消"),
          "confirm-text": vue.unref(t)("确定")
        }), null, 8, ["modelValue", "title", "cancel-text", "confirm-text"]);
      };
    }
  });
  let PassThrough$b = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            content: { type: "Unknown", optional: true },
            wrapper: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.content = this.__props__.content;
      this.wrapper = this.__props__.wrapper;
      delete this.__props__;
    }
  };
  const _sfc_main$A = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-footer"
  }, { __name: "cl-footer", props: {
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 最小高度，小于该高度时，不显示
    minHeight: {
      type: Number,
      default: 30
    },
    // 监听值，触发更新
    vt: {
      type: Number,
      default: 0
    }
  }, setup(__props) {
    const props = __props;
    const proxy2 = vue.getCurrentInstance().proxy;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const height = vue.ref(0);
    const visible = vue.ref(true);
    function getHeight() {
      vue.nextTick(() => {
        setTimeout(() => {
          uni.createSelectorQuery().in(proxy2).select(".cl-footer").boundingClientRect((res = null) => {
            var _a;
            const h = Math.floor((_a = res.height) !== null && _a !== void 0 ? _a : 0);
            height.value = h;
            visible.value = h > props.minHeight + getSafeAreaHeight("bottom");
            clFooterOffset.set(visible.value ? h : 0);
          }).exec();
        }, 0);
      });
    }
    vue.onMounted(() => {
      vue.watch(vue.computed(() => {
        return props.vt;
      }), () => {
        visible.value = true;
        getHeight();
      }, {
        immediate: true
      });
    });
    return (_ctx = null, _cache = null) => {
      var _a, _b;
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        visible.value ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 0,
          class: "cl-footer-placeholder",
          style: vue.normalizeStyle({ height: height.value + "px" })
        }), null, 4)) : vue.createCommentVNode("", true),
        vue.createElementVNode("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-footer-wrapper", [new UTSJSONObject({}), (_a = pt.value.wrapper) === null || _a === void 0 ? null : _a.className]])
        }), [
          visible.value ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
            key: 0,
            class: vue.normalizeClass(["cl-footer", [new UTSJSONObject({}), new UTSJSONObject({
              "is-dark": vue.unref(isDark)
            }), pt.value.className]])
          }), [
            vue.createElementVNode("view", new UTSJSONObject({
              class: vue.normalizeClass(["cl-footer__content", [new UTSJSONObject({}), (_b = pt.value.content) === null || _b === void 0 ? null : _b.className]])
            }), [
              vue.renderSlot(_ctx.$slots, "default")
            ], 2)
          ], 2)) : vue.createCommentVNode("", true)
        ], 2)
      ], 64);
    };
  } }));
  const _style_0$q = { "cl-footer": { "": { "overflow": "visible", "backgroundColor": "rgba(255,255,255,1)", "paddingBottom": "env(safe-area-inset-bottom)" }, ".is-dark": { "backgroundColor": "rgba(24,24,27,1)" } }, "cl-footer__content": { "": { "overflow": "visible", "paddingLeft": "21rpx", "paddingRight": "21rpx", "paddingTop": "21rpx", "paddingBottom": "21rpx" } }, "cl-footer-wrapper": { "": { "position": "fixed", "bottom": 0, "left": 0, "width": "100%", "overflow": "visible" } } };
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["styles", [_style_0$q]]]);
  const apiPath = {
    captcha: "/open/captchaBase",
    auth_token: "/oauth2/token",
    current_user: "/acc/currentUser",
    message_listen: "/message/listen",
    message_page: "/message/selectByPage",
    message_detail: "/message/selectById",
    message_read: "/message/read",
    message_unread_count: "/message/countUnread",
    workshop_tree: "/workshop/selectUserAssignTree",
    equip_page: "/equip/selectByPage",
    equip_count: "/equip/countRealtime",
    equip_realtime: "/equip/selectRealtimeById",
    equip_id: "/equip/selectById",
    equip_run_history: "/equipRecordRun/selectByPage",
    equip_online_history: "/equipRecordOnline/selectByPage",
    equip_alarm_history: "/equipRecordAlarm/selectByPage",
    equip_config: "/equip/queryEquipConfigBySn",
    equip_collect_page: "/equip/collect/selectByPage",
    equip_run_count: "/equipRecordRun/countMerging",
    equip_online_count: "/equipRecordOnline/countMerging",
    equip_alarm_count: "/equipRecordAlarm/countMerging",
    workshop_scada: "/workshop/getScadaUrlByWorkshopCode"
  };
  const authParam = {
    client_id: "mes",
    client_sc: "admin123"
  };
  const isIgnoreToken = (url) => {
    return ignoreTokens.some((e) => {
      const pattern = e.replace(/\*/g, ".*");
      return new RegExp(pattern).test(url);
    });
  };
  function request(options) {
    let url = options.url, _a = options.method, method = _a == void 0 ? "GET" : _a, _b = options.data, data = _b == void 0 ? {} : _b;
    options.params;
    let _d = options.header, header = _d == void 0 ? {} : _d, _e = options.timeout, timeout = _e == void 0 ? 6e4 : _e;
    const user2 = useStore().user;
    if (!url.startsWith("http")) {
      url = config.baseUrl + url;
    }
    let Authorization = user2.token;
    if (isIgnoreToken(url)) {
      Authorization = null;
    }
    return new Promise((resolve, reject) => {
      if (url.includes("?")) {
        url = url + "&locale=" + locale.value;
      } else {
        url = url + "?locale=" + locale.value;
      }
      const next = () => {
        uni.request({
          url,
          method,
          data,
          header: Object.assign({ Authorization, language: locale.value, "x-era-platform": config.platform, "x-route-tenant": 0 }, header),
          timeout,
          success(res) {
            if (res.statusCode == 401) {
              user2.logout();
            } else if (res.statusCode == 502) {
              reject({
                msg: t("服务异常")
              });
            } else if (res.statusCode == 404) {
              return reject({
                msg: "[404] ".concat(url)
              });
            } else if (res.statusCode == 200) {
              if (res.data == null) {
                resolve(null);
              } else if (!isObject(res.data)) {
                resolve(res.data);
              } else {
                const raw = res.data;
                const parsed = parse$1(raw);
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
                    user2.logout();
                    reject({ msg: t("无权限") });
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
              reject({ msg: t("服务异常") });
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
  class Dict {
    constructor() {
      this.data = vue.reactive([]);
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
      if (isNull(item)) {
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
        return !isNull(e);
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
      if (isNull(item) || isNull(item === null || item === void 0 ? void 0 : item.label)) {
        return "";
      }
      return item.label;
    }
    /**
     * 刷新字典数据
     * @param types 可选，指定需要刷新的字典key数组
     */
    refresh(types) {
      return __awaiter(this, void 0, void 0, function* () {
        const res = yield request({
          url: "/app/dict/info/data",
          method: "POST",
          data: { types }
        });
        if (res == null) {
          return;
        }
        forInObject(res, (arr, key) => {
          let list2 = [];
          arr.forEach((e) => {
            e["label"] = e["name"];
            const d = parse$1(e);
            if (d != null) {
              list2.push(d);
            }
          });
          const item = this.find(key);
          if (isNull(item)) {
            this.data.push({
              key,
              list: list2
            });
          } else {
            item.list = list2;
          }
        });
      });
    }
  }
  const dict = new Dict();
  class User {
    constructor() {
      this.info = vue.ref(null);
      this.token = null;
      const userInfo2 = storage.get("userInfo");
      const token = storage.get("token");
      this.token = token == "" ? null : token;
      if (userInfo2 != null && isObject(userInfo2)) {
        this.set(userInfo2);
      }
    }
    /**
     * 获取用户信息（从服务端拉取最新信息并更新本地）
     * @returns Promise<void>
     */
    get() {
      return __awaiter(this, void 0, void 0, function* () {
        if (this.token != null) {
          yield request({
            url: apiPath.current_user
          }).then((res) => {
            this.set(res);
          }).catch(() => {
          });
        }
      });
    }
    getSync() {
      if (this.token != null) {
        request({
          url: apiPath.current_user
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
      const user2 = parse$1(data);
      if (user2 == null) {
        return;
      }
      this.info.value = user2;
      storage.set("userInfo", user2, 0);
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
      storage.remove("userInfo");
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
      storage.remove("userInfo");
      storage.remove("token");
      storage.remove("refreshToken");
      this.token = null;
      this.remove();
    }
    /**
     * 退出登录，清除所有信息并跳转到登录页
     */
    logout() {
      this.clear();
      router.login();
      disconnectMessage();
    }
    /**
     * 设置token并存储到本地
     * @param data Token对象
     */
    setToken(data) {
      this.token = data.token;
      storage.set("token", data.token, data.expire - 5);
      storage.set("refreshToken", data.refreshToken, data.refreshExpire - 5);
    }
  }
  const user = new User();
  const userInfo = vue.computed(() => {
    return user.info.value;
  });
  function useStore() {
    return {
      user,
      dict
    };
  }
  function parseData(data) {
    return data;
  }
  let isStop = false;
  let isConnected = false;
  let isConnecting = false;
  const notifyQueue = vue.ref([]);
  const notify_message = vue.ref("");
  const notify_visible = vue.ref(false);
  const notify_enable = vue.ref(true);
  const unread_count = vue.ref(0);
  function initNotifyEnable() {
    const saved = storage.get("notify_enable");
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
    return __awaiter(this, void 0, void 0, function* () {
      uni.__log__("log", "at components/msg-notifier.ts:44", "sse connect start");
      if (isConnected || isConnecting) {
        uni.__log__("log", "at components/msg-notifier.ts:46", "sse connect is connecting");
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
          request({
            url: apiPath.message_page,
            method: "POST",
            data: {
              page: 1,
              pageSize: 10,
              accId: (_a = userInfo.value) === null || _a === void 0 ? void 0 : _a.id,
              platform: config.platform,
              createdTimeStart: formatDateTime(now - 3e3),
              createdTimeEnd: formatDateTime(now)
            }
          }).then((res) => {
            if (res !== null) {
              const r = parseData(res);
              if (r == null) {
                return;
              }
              r.forEach((msg) => {
                return pushNotifyQueue(msg);
              });
            }
          }).catch((err) => {
            uni.__log__("error", "at components/msg-notifier.ts:78", err);
          });
          request({
            url: apiPath.message_unread_count,
            method: "GET"
          }).then((res) => {
            if (res !== null) {
              unread_count.value = res;
            }
          }).catch((err) => {
            uni.__log__("error", "at components/msg-notifier.ts:91", err);
          });
        } catch (err) {
          uni.__log__("warn", "at components/msg-notifier.ts:94", "poll error", err);
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
    return "".concat(d.getFullYear(), "-").concat(p(d.getMonth() + 1), "-").concat(p(d.getDate()), " ").concat(p(d.getHours()), ":").concat(p(d.getMinutes()), ":").concat(p(d.getSeconds()));
  }
  function disconnectMessage() {
    uni.__log__("log", "at components/msg-notifier.ts:113", "sse client disconnect=======");
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
      notify_message.value = msg.context;
    }
  }
  setInterval(() => {
    onNotify();
  }, 8e3);
  function changeNotify(val) {
    storage.set("notify_enable", val, 0);
    notify_enable.value = val;
  }
  class Item extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            icon: { type: String, optional: false },
            icon2: { type: String, optional: false },
            pagePath: { type: String, optional: false },
            text: { type: String, optional: true }
          };
        }
      };
    }
    constructor(options, metadata = Item.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.icon = this.__props__.icon;
      this.icon2 = this.__props__.icon2;
      this.pagePath = this.__props__.pagePath;
      this.text = this.__props__.text;
      delete this.__props__;
    }
  }
  const _sfc_main$z = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "custom-tabbar"
  }, { __name: "tabbar", setup(__props) {
    const path = vue.computed(() => {
      return router.path();
    });
    const list2 = vue.computed(() => {
      var _a;
      return ((_a = ctx.tabBar.list) !== null && _a !== void 0 ? _a : []).map((e) => {
        var _a2;
        return new Item({
          icon: e.iconPath,
          icon2: e.selectedIconPath,
          pagePath: e.pagePath,
          text: t((_a2 = e.text) === null || _a2 === void 0 ? null : _a2.replaceAll("%", ""))
        });
      });
    });
    if (ctx.tabBar.list != null) {
      uni.hideTabBar();
    }
    return (_ctx = null, _cache = null) => {
      const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      const _component_cl_footer = resolveEasycom(vue.resolveDynamicComponent("cl-footer"), __easycom_2$2);
      return vue.openBlock(), vue.createBlock(_component_cl_footer, new UTSJSONObject({ pt: new UTSJSONObject({
        content: new UTSJSONObject({
          className: "-important-p-0 h--bracket-start-60px-bracket-end-"
        })
      }) }), new UTSJSONObject({
        default: vue.withCtx(() => {
          return [
            vue.createElementVNode("view", new UTSJSONObject({
              class: vue.normalizeClass(["custom-tabbar", new UTSJSONObject({ "is-dark": vue.unref(isDark) })])
            }), [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(list2.value, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  class: "custom-tabbar-item",
                  key: item.pagePath,
                  onClick: ($event = null) => {
                    return vue.unref(router).to(item.pagePath);
                  }
                }), [
                  vue.createVNode(_component_cl_image, new UTSJSONObject({
                    src: path.value == item.pagePath ? item.icon2 : item.icon,
                    height: 56,
                    width: 56
                  }), null, 8, ["src"]),
                  item.pagePath.includes("message") && vue.unref(unread_count) > 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    key: 0,
                    class: "badge"
                  }), vue.toDisplayString(vue.unref(unread_count) > 99 ? "99+" : vue.unref(unread_count)), 1)) : vue.createCommentVNode("", true),
                  item.text != null ? (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
                    key: 1,
                    pt: new UTSJSONObject({
                      className: vue.unref(parseClass)([
                        "text-xs mt-1",
                        [path.value == item.pagePath, "text-primary-500", "text-surface-400"]
                      ])
                    })
                  }), new UTSJSONObject({
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(vue.unref(t)(item.text)), 1)
                      ];
                    }),
                    _: 2
                  }), 1032, ["pt"])) : vue.createCommentVNode("", true)
                ], 8, ["onClick"]);
              }), 128))
            ], 2)
          ];
        }),
        _: 1
      }));
    };
  } }));
  const _style_0$p = { "custom-tabbar": { "": { "display": "flex", "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "flexDirection": "row", "alignItems": "center" } }, "custom-tabbar-item": { "": { "display": "flex", "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "flexDirection": "column", "alignItems": "center", "justifyContent": "center" } }, "icon-wrapper": { "": { "position": "relative" } }, "badge": { "": { "position": "absolute", "top": "0rpx", "right": "40rpx", "minWidth": "32rpx", "height": "32rpx", "backgroundColor": "#f44336", "color": "#ffffff", "fontSize": "20rpx", "lineHeight": "32rpx", "textAlign": "center", "boxSizing": "border-box", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999 } } };
  const CustomTabbar = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["styles", [_style_0$p]]]);
  let PassThrough$a = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            text: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.text = this.__props__.text;
      delete this.__props__;
    }
  };
  class Scroll extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            left: { type: Number, optional: false },
            top: { type: Number, optional: false },
            translateX: { type: Number, optional: false },
            duration: { type: Number, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Scroll.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.left = this.__props__.left;
      this.top = this.__props__.top;
      this.translateX = this.__props__.translateX;
      this.duration = this.__props__.duration;
      delete this.__props__;
    }
  }
  const _sfc_main$y = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-noticebar"
  }, { __name: "cl-noticebar", props: {
    // 样式穿透对象，允许外部自定义样式
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 公告文本内容，支持字符串或字符串数组
    text: {
      type: [String, Array],
      default: ""
    },
    // 滚动方向，支持 horizontal（水平）或 vertical（垂直）
    direction: {
      type: String,
      default: "horizontal"
    },
    // 垂直滚动时的切换间隔，单位：毫秒
    duration: {
      type: Number,
      default: 3e3
    },
    // 水平滚动时的速度，单位：px/s
    speed: {
      type: Number,
      default: 100
    },
    // 公告栏高度，支持字符串或数字
    height: {
      type: [String, Number],
      default: 40
    }
  }, emits: ["close"], setup(__props, _a) {
    _a.emit;
    const props = __props;
    const proxy2 = vue.getCurrentInstance().proxy;
    const windowWidth = uni.getWindowInfo().windowWidth;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const scroll = vue.reactive(new Scroll({
      left: windowWidth,
      top: 0,
      translateX: 0,
      duration: 0
    }));
    let timer = 0;
    const list2 = vue.computed(() => {
      return Array.isArray(props.text) ? props.text : [props.text];
    });
    const scrollerStyle = vue.computed(() => {
      const style = new UTSJSONObject({});
      if (props.direction == "horizontal") {
        style["left"] = "".concat(scroll.left, "px");
        style["transform"] = "translateX(-".concat(scroll.translateX, "px)");
        style["transition-duration"] = "".concat(scroll.duration, "ms");
      } else {
        style["transform"] = "translateY(".concat(scroll.top, "px)");
      }
      return style;
    });
    function clear() {
      if (timer != 0) {
        clearInterval(timer);
        clearTimeout(timer);
        timer = 0;
      }
    }
    function refresh() {
      clear();
      uni.createSelectorQuery().in(proxy2).select(".cl-noticebar").boundingClientRect((box = null) => {
        var _a2, _b;
        const boxHeight = (_a2 = box.height) !== null && _a2 !== void 0 ? _a2 : 0;
        const boxWidth = (_b = box.width) !== null && _b !== void 0 ? _b : 0;
        uni.createSelectorQuery().in(proxy2).select(".cl-noticebar__text").boundingClientRect((text = null) => {
          var _a3;
          if (props.direction == "horizontal") {
            let next = function() {
              scroll.translateX = textWidth + boxWidth;
              scroll.duration = Math.ceil(scroll.translateX / props.speed * 1e3);
              scroll.left = boxWidth;
              timer = setTimeout(() => {
                scroll.translateX = 0;
                scroll.duration = 0;
                setTimeout(() => {
                  next();
                }, 100);
              }, scroll.duration);
            };
            const textWidth = (_a3 = text.width) !== null && _a3 !== void 0 ? _a3 : 0;
            next();
          } else {
            timer = setInterval(() => {
              if (Math.abs(scroll.top) >= boxHeight * (list2.value.length - 1)) {
                scroll.top = 0;
              } else {
                scroll.top -= boxHeight;
              }
            }, props.duration);
          }
        }).exec();
      }).exec();
    }
    vue.onMounted(() => {
      vue.watch(vue.computed(() => {
        return props.text;
      }), () => {
        refresh();
      }, {
        immediate: true
      });
    });
    vue.onUnmounted(() => {
      clear();
    });
    return (_ctx = null, _cache = null) => {
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-noticebar", [new UTSJSONObject({}), pt.value.className]]),
        style: vue.normalizeStyle({
          height: vue.unref(parseRpx)(__props.height)
        })
      }), [
        vue.createElementVNode("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-noticebar__scroller", [new UTSJSONObject({}), "is-".concat(__props.direction)]]),
          style: vue.normalizeStyle(scrollerStyle.value)
        }), [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(list2.value, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              key: index,
              class: "cl-noticebar__item",
              style: vue.normalizeStyle({
                height: vue.unref(parseRpx)(__props.height)
              })
            }), [
              vue.renderSlot(_ctx.$slots, "text", new UTSJSONObject({ item }), () => {
                var _a2;
                return [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "cl-noticebar__text" }), [
                    vue.createVNode(_component_cl_text, new UTSJSONObject({
                      pt: new UTSJSONObject({
                        className: vue.unref(parseClass)(["whitespace-nowrap", (_a2 = pt.value.text) === null || _a2 === void 0 ? null : _a2.className])
                      })
                    }), {
                      default: vue.withCtx(() => {
                        return [
                          vue.createTextVNode(vue.toDisplayString(item), 1)
                        ];
                      }),
                      _: 2
                    }, 1032, ["pt"])
                  ])
                ];
              })
            ], 4);
          }), 128))
        ], 6)
      ], 6);
    };
  } }));
  const _style_0$o = { "cl-noticebar": { "": { "flexShrink": 1 } }, "cl-noticebar__scroller": { "": { "display": "flex", "transitionProperty": "transform", "transitionTimingFunction": "linear" }, ".is-horizontal": { "flexDirection": "row", "overflow": "visible" }, ".is-vertical": { "flexDirection": "column", "transitionDuration": "0.5s" } }, "cl-noticebar__item": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "@TRANSITION": { "cl-noticebar__scroller": { "property": "transform", "timingFunction": "linear", "duration": "0.5s" } } };
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["styles", [_style_0$o]]]);
  const _sfc_main$x = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "msg-notifier"
  }, { __name: "msg-notifier", setup(__props) {
    return (_ctx = null, _cache = null) => {
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      const _component_cl_noticebar = resolveEasycom(vue.resolveDynamicComponent("cl-noticebar"), __easycom_1$2);
      return vue.unref(notify_visible) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        key: 0,
        class: "msgNotifier"
      }), [
        vue.createVNode(_component_cl_icon, new UTSJSONObject({
          name: "notification-4-line",
          color: "primary"
        })),
        vue.createVNode(_component_cl_noticebar, new UTSJSONObject({
          speed: 30,
          text: vue.unref(notify_message)
        }), null, 8, ["text"])
      ])) : vue.createCommentVNode("", true);
    };
  } }));
  const _style_0$n = { "msgNotifier": { "": { "width": "80%", "marginTop": 0, "marginRight": "10%", "marginBottom": 0, "marginLeft": "10%", "boxSizing": "border-box", "backgroundImage": "none", "backgroundColor": "rgba(134,239,172,0.2)", "zIndex": 50, "display": "flex", "flexDirection": "row", "alignItems": "center", "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx", "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(243,244,246,1)", "borderRightColor": "rgba(243,244,246,1)", "borderBottomColor": "rgba(243,244,246,1)", "borderLeftColor": "rgba(243,244,246,1)", "paddingTop": "21rpx", "paddingRight": "21rpx", "paddingBottom": "21rpx", "paddingLeft": "21rpx" } }, "cl-icon": { ".msgNotifier ": { "width": "20%", "flexGrow": 0, "flexShrink": 0, "flexBasis": "auto", "textAlign": "center", "fontWeight": "700" } }, "cl-noticebar": { ".msgNotifier ": { "marginLeft": "28rpx", "width": "80%", "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } } };
  const MsgNotifier = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["styles", [_style_0$n]]]);
  class Echarts {
    constructor(context) {
      this.options = new UTSJSONObject({});
      this.eventMap = /* @__PURE__ */ new Map();
      this.temp = [];
      this.context = context;
      this.init();
    }
    init() {
      this.context.evalJS("init(null, null, ".concat(UTS.JSON.stringify(new UTSJSONObject({})), ")"));
      this.context.addEventListener("message", (e) => {
        const detail = e.detail.data[0];
        const file = detail.getString("file");
        const data = detail.get("data");
        const key = detail.getString("event");
        const options = typeof data == "object" ? data.getJSON("options") : null;
        const event = typeof data == "object" ? data.getString("event") : null;
        if (key == "log" && data != null) {
          uni.__log__("log", "at uni_modules/lime-echart/components/l-echart/uvue.uts:29", data);
        }
        if (event != null && options != null) {
          this.dispatchAction(event.replace(/"/g, ""), options);
        }
        if (file != null) {
          while (this.temp.length > 0) {
            const opt = UTS.arrayPop(this.temp);
            const success = opt === null || opt === void 0 ? null : opt.get("success");
            if (typeof success == "function") {
              success(new UTSJSONObject({ tempFilePath: file }));
            }
          }
        }
      });
    }
    setOption(option) {
      this.options = option;
      this.context.evalJS("setOption(".concat(UTS.JSON.stringify([option]), ")"));
    }
    setOption(option, notMerge = false, lazyUpdate = false) {
      this.options = option;
      this.context.evalJS("setOption(".concat(UTS.JSON.stringify([option, notMerge, lazyUpdate]), ")"));
    }
    setOption(option, notMerge) {
      this.options = option;
      this.context.evalJS("setOption(".concat(UTS.JSON.stringify([option, notMerge]), ")"));
    }
    getOption() {
      return this.options;
    }
    showLoading() {
      this.context.evalJS("showLoading(".concat(UTS.JSON.stringify([]), ")"));
    }
    showLoading(type, opts) {
      this.context.evalJS("showLoading(".concat(UTS.JSON.stringify([type, opts]), ")"));
    }
    hideLoading() {
      this.context.evalJS("hideLoading()");
    }
    clear() {
      this.context.evalJS("clear()");
    }
    dispose() {
      this.context.evalJS("dispose()");
    }
    resize(size) {
      setTimeout(() => {
        this.context.evalJS("resize(".concat(UTS.JSON.stringify(size), ")"));
      }, 0);
    }
    resize() {
      setTimeout(() => {
        this.context.evalJS("resize()");
      }, 10);
    }
    on(type, query = null, callback) {
      const key = "".concat(type).concat(UTS.JSON.stringify(query));
      if (typeof callback == "function") {
        this.eventMap.set(key, callback);
      }
      this.context.evalJS("on(".concat(UTS.JSON.stringify([type, query]), ")"));
      uni.__log__("warn", "at uni_modules/lime-echart/components/l-echart/uvue.uts:94", "uvue 暂不支持事件");
    }
    on(type, callback) {
      const key = "".concat(type);
      if (typeof callback == "function") {
        this.eventMap.set(key, callback);
      }
      this.context.evalJS("on(".concat(UTS.JSON.stringify([type]), ")"));
      uni.__log__("warn", "at uni_modules/lime-echart/components/l-echart/uvue.uts:102", "uvue 暂不支持事件");
    }
    dispatchAction(type, options) {
      const handler = UTS.mapGet(this.eventMap, type);
      if (handler != null) {
        handler(options);
      }
    }
    canvasToTempFilePath(opt) {
      this.context.evalJS("canvasToTempFilePath(".concat(UTS.JSON.stringify(opt), ")"));
      this.temp.push(opt);
    }
    isDisposed() {
      return false;
    }
  }
  const _sfc_main$w = /* @__PURE__ */ vue.defineComponent({
    __name: "l-echart",
    props: {
      webviewStyles: { type: null },
      lStyle: { type: null },
      isDisableScroll: { type: Boolean, default: false },
      isClickable: { type: Boolean, default: true },
      enableHover: { type: Boolean, default: false },
      beforeDelay: { default: 30, type: Number },
      landscape: { type: Boolean, default: false },
      autoHideTooltip: { type: Boolean, default: false }
    },
    emits: ["finished"],
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      const emits = __emit;
      const instance = vue.getCurrentInstance();
      "lime-echart-".concat(instance.uid);
      const finished = vue.ref(false);
      const initializationQueue = [];
      const callbackQueue = [];
      let chartInstance = null;
      let chartRef = vue.ref(null);
      const processInitializationQueue = () => {
        if (finished.value) {
          if (chartInstance == null) {
            chartInstance = new Echarts(chartRef.value);
          }
          while (initializationQueue.length > 0) {
            const resolve = UTS.arrayPop(initializationQueue);
            resolve(chartInstance);
          }
        }
        if (chartInstance != null) {
          while (callbackQueue.length > 0) {
            const callback = UTS.arrayPop(callbackQueue);
            callback(chartInstance);
          }
        }
      };
      const loaded = (event) => {
        event.stopPropagation();
        event.preventDefault();
        vue.nextTick(() => {
          var _a2, _b;
          (_b = (_a2 = chartRef.value) === null || _a2 === void 0 ? null : _a2.getBoundingClientRectAsync()) === null || _b === void 0 ? null : _b.then((res) => {
            if (res.width > 0 && res.height > 0) {
              finished.value = true;
              processInitializationQueue();
              emits("finished");
            } else {
              uni.__log__("warn", "at uni_modules/lime-echart/components/l-echart/l-echart.uvue:89", "【lime-echart】获取尺寸失败，请检查代码样式");
            }
          });
        });
      };
      const checkInitialization = () => {
        if (chartInstance == null) {
          uni.__log__("warn", "at uni_modules/lime-echart/components/l-echart/l-echart.uvue:99", "组件还未初始化，请先使用 init");
          return true;
        }
        return false;
      };
      const setOption = (option) => {
        if (checkInitialization())
          return null;
        chartInstance.setOption(option);
      };
      const showLoading = () => {
        if (checkInitialization())
          return null;
        chartInstance.showLoading();
      };
      const hideLoading = () => {
        if (checkInitialization())
          return null;
        chartInstance.hideLoading();
      };
      const clear = () => {
        if (checkInitialization())
          return null;
        chartInstance.clear();
      };
      const dispose = () => {
        if (checkInitialization())
          return null;
        chartInstance.dispose();
      };
      const resize = (size) => {
        if (checkInitialization())
          return null;
        chartInstance.resize(size);
      };
      const canvasToTempFilePath = (opt) => {
        if (checkInitialization())
          return null;
        chartInstance.canvasToTempFilePath(opt);
      };
      function init(callback = null) {
        if (callback != null) {
          callbackQueue.push(callback);
        }
        return new Promise((resolve) => {
          initializationQueue.push(resolve);
          processInitializationQueue();
        });
      }
      __expose({
        init,
        setOption,
        showLoading,
        hideLoading,
        clear,
        dispose,
        resize,
        canvasToTempFilePath
      });
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("web-view", new UTSJSONObject({
          class: "lime-echart",
          ref_key: "chartRef",
          ref: chartRef,
          onLoad: loaded,
          style: vue.normalizeStyle([_ctx.lStyle]),
          "webview-styles": [_ctx.webviewStyles],
          src: "/uni_modules/lime-echart/static/app/uvue.html?v=10112"
        }), null, 44, ["webview-styles"]);
      };
    }
  });
  const _style_0$m = { "lime-echart": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "width": "100%" } } };
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["styles", [_style_0$m]]]);
  const defaultNode = {
    id: -1,
    label: t("全部场景"),
    isExpand: true
  };
  class WorkshopTree {
    constructor() {
      this.selectNode = vue.ref(defaultNode);
      this.tree = vue.ref([]);
      this.workshopLoading = false;
      this.isNeedLoading = true;
      this.workshopLoading = false;
      this.isNeedLoading = true;
    }
    loadWorkshopTree() {
      if (this.workshopLoading) {
        return;
      }
      this.workshopLoading = true;
      try {
        if (!this.isNeedLoading) {
          return;
        }
        request({
          url: apiPath.workshop_tree,
          method: "GET"
        }).then((res) => {
          this.isNeedLoading = false;
          const parent = defaultNode;
          if (res === null) {
            this.tree.value = [parent];
            return;
          }
          parent.isChecked = this.selectNode.value.id === -1;
          const r = parseData(res);
          if (r != null) {
            parent.children = this.convertWorkshopTree(r);
          }
          this.tree.value = [parent];
        });
      } finally {
        this.workshopLoading = false;
      }
    }
    convertWorkshopTree(nodes) {
      return nodes.map((node) => {
        return {
          id: node.selfCode,
          label: node.name,
          children: node.children == null ? null : this.convertWorkshopTree(node.children)
        };
      });
    }
    getCheckedNodes() {
      const result = [];
      function collectCheckedKeys(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.isChecked == true) {
            result.push(node);
          }
          if (node.children != null) {
            collectCheckedKeys(node.children);
          }
        }
      }
      collectCheckedKeys(this.tree.value);
      return result;
    }
    selectConfirm() {
      let nodes = this.getCheckedNodes();
      let node = null;
      if (nodes.length > 0) {
        node = nodes[0];
        if (node.id == -1) {
          node = null;
        }
      }
      if (node == null) {
        this.selectNode.value = defaultNode;
      } else {
        this.selectNode.value = node;
      }
    }
  }
  const workshopTree = new WorkshopTree();
  const _sfc_main$v = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "chart-equip-runtime"
  }, { __name: "echart-equip-card", setup(__props) {
    useRefs();
    const chartRef = vue.ref(null);
    const loading = vue.ref(false);
    const equipCount = vue.ref({
      total: 0,
      alarm: 0,
      online: 0,
      offline: 0,
      run: 0,
      stopped: 0
    });
    let timer = null;
    const init = () => {
      return __awaiter(this, void 0, void 0, function* () {
        if (chartRef.value == null)
          return Promise.resolve(null);
        const chart = yield chartRef.value.init(null);
        chart.setOption(new UTSJSONObject({
          tooltip: new UTSJSONObject({
            trigger: "item"
          }),
          legend: new UTSJSONObject({
            orient: "vertical",
            right: "5%",
            top: "15%"
          }),
          color: [
            "#bfbfbf",
            "#1890ff",
            "#FAAD14",
            "#52c41a"
          ],
          series: [
            new UTSJSONObject({
              name: t("设备在线统计"),
              type: "pie",
              radius: ["30%", "45%"],
              center: ["25%", "50%"],
              itemStyle: new UTSJSONObject({
                borderColor: "#fff",
                borderWidth: 1
              }),
              emphasis: new UTSJSONObject({
                itemStyle: new UTSJSONObject({
                  shadowBlur: 10,
                  shadowColor: "rgba(0,0,0,0.3)"
                })
              }),
              label: new UTSJSONObject({
                show: true,
                formatter: "{d}%",
                position: "inside"
                // 内部显示
              }),
              data: [
                new UTSJSONObject({ value: equipCount.value.offline, name: t("离线") }),
                new UTSJSONObject({ value: equipCount.value.online, name: t("在线") })
              ]
            }),
            new UTSJSONObject({
              name: t("设备运行状态"),
              type: "pie",
              radius: ["30%", "45%"],
              center: ["55%", "50%"],
              itemStyle: new UTSJSONObject({
                borderColor: "#fff",
                borderWidth: 1
              }),
              emphasis: new UTSJSONObject({
                itemStyle: new UTSJSONObject({
                  shadowBlur: 10,
                  shadowColor: "rgba(0,0,0,0.3)"
                })
              }),
              label: new UTSJSONObject({
                show: true,
                formatter: "{d}%",
                position: "inside"
                // 内部显示
              }),
              data: [
                new UTSJSONObject({ value: equipCount.value.stopped, name: t("停止") }),
                new UTSJSONObject({ value: equipCount.value.run, name: t("运行") })
              ]
            })
          ]
        }));
      });
    };
    function reloadEChart() {
      chartRef.value.setOption(new UTSJSONObject({
        series: [
          new UTSJSONObject({
            data: [
              new UTSJSONObject({ value: equipCount.value.offline, name: t("离线") }),
              new UTSJSONObject({ value: equipCount.value.online, name: t("在线") })
            ]
          }),
          new UTSJSONObject({
            data: [
              new UTSJSONObject({ value: equipCount.value.stopped, name: t("停止") }),
              new UTSJSONObject({ value: equipCount.value.run, name: t("运行") })
            ]
          })
        ]
      }));
    }
    function reloadData() {
      if (loading.value) {
        return null;
      }
      loading.value = true;
      try {
        request({
          url: apiPath.equip_count,
          method: "POST",
          data: new UTSJSONObject({
            needWorkshopCascade: false,
            limitUserWorkshop: true,
            workshopCode: workshopTree.selectNode.value.id == -1 ? null : workshopTree.selectNode.value.id
          })
        }).then((res = null) => {
          if (res === null) {
            return null;
          }
          let t2 = parseData(res);
          if (t2 === null) {
            return null;
          }
          equipCount.value = t2;
        });
      } finally {
        loading.value = false;
      }
    }
    vue.watch(equipCount, () => {
      reloadEChart();
    }, { deep: true });
    vue.onMounted(() => {
      timer = setInterval(() => {
        reloadData();
      }, config.equipRefreshTime);
    });
    vue.onShow(() => {
      setTimeout(() => {
        reloadData();
      }, 500);
    });
    vue.onHide(() => {
      if (timer != null) {
        clearInterval(timer);
        timer = null;
      }
    });
    return (_ctx = null, _cache = null) => {
      const _component_l_echart = resolveEasycom(vue.resolveDynamicComponent("l-echart"), __easycom_3$1);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "count-card" }), [
        vue.createElementVNode("view", new UTSJSONObject({ class: "w-full echart-equip" }), [
          vue.createVNode(_component_l_echart, new UTSJSONObject({
            ref_key: "chartRef",
            ref: chartRef,
            onFinished: init
          }), null, 512)
        ]),
        vue.createElementVNode("view", new UTSJSONObject({ class: "count-status-group" }), [
          vue.createElementVNode("view", new UTSJSONObject({ class: "count-status" }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-title total" }), vue.toDisplayString(vue.unref(t)("设备总计")), 1),
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-num" }), vue.toDisplayString(equipCount.value.total), 1)
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "count-status" }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-title alarm" }), vue.toDisplayString(vue.unref(t)("报警设备")), 1),
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-num" }), vue.toDisplayString(equipCount.value.alarm), 1)
          ])
        ]),
        vue.createElementVNode("view", new UTSJSONObject({ class: "count-status-group" }), [
          vue.createElementVNode("view", new UTSJSONObject({ class: "count-status items-center" }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-title online" }), vue.toDisplayString(vue.unref(t)("在线设备")), 1),
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-num" }), vue.toDisplayString(equipCount.value.online), 1)
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "count-status" }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-title offline" }), vue.toDisplayString(vue.unref(t)("离线设备")), 1),
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-num" }), vue.toDisplayString(equipCount.value.offline), 1)
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "count-status" }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-title run" }), vue.toDisplayString(vue.unref(t)("运行设备")), 1),
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-num" }), vue.toDisplayString(equipCount.value.run), 1)
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "count-status" }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-title stopped" }), vue.toDisplayString(vue.unref(t)("停止设备")), 1),
            vue.createElementVNode("text", new UTSJSONObject({ class: "count-num" }), vue.toDisplayString(equipCount.value.stopped), 1)
          ])
        ])
      ]);
    };
  } }));
  const _style_0$l = { "count-card": { "": { "height": "720rpx", "marginTop": "14rpx", "display": "flex", "width": "100%", "alignItems": "center", "borderTopLeftRadius": "42rpx", "borderTopRightRadius": "42rpx", "borderBottomRightRadius": "42rpx", "borderBottomLeftRadius": "42rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(243,244,246,1)", "borderRightColor": "rgba(243,244,246,1)", "borderBottomColor": "rgba(243,244,246,1)", "borderLeftColor": "rgba(243,244,246,1)", "backgroundColor": "rgba(255,255,255,1)" } }, "echart-equip": { ".count-card ": { "height": "50%" } }, "count-status": { "": { "display": "flex", "width": "168rpx", "flexDirection": "column", "alignItems": "center", "justifyContent": "space-between", "paddingTop": "7rpx", "paddingRight": "7rpx", "paddingBottom": "7rpx", "paddingLeft": "7rpx" } }, "count-title": { "": { "borderTopLeftRadius": "7rpx", "borderTopRightRadius": "7rpx", "borderBottomRightRadius": "7rpx", "borderBottomLeftRadius": "7rpx", "paddingTop": "14rpx", "paddingRight": "14rpx", "paddingBottom": "14rpx", "paddingLeft": "14rpx", "fontSize": "24.5rpx", "lineHeight": "35rpx", "color": "rgba(255,255,255,1)" }, ".total": { "backgroundColor": "#858484" }, ".online": { "backgroundColor": "rgba(59,130,246,1)" }, ".offline": { "backgroundImage": "none", "backgroundColor": "#bfbfbf" }, ".alarm": { "backgroundColor": "rgba(239,68,68,1)" }, ".run": { "backgroundColor": "rgba(34,197,94,1)" }, ".stopped": { "backgroundColor": "rgba(234,179,8,1)" } }, "count-num": { "": { "marginTop": "21rpx", "fontSize": "31.5rpx", "lineHeight": "49rpx" } }, "count-status-group": { "": { "display": "flex", "width": "100%", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "paddingTop": "14rpx", "paddingRight": "14rpx", "paddingBottom": "14rpx", "paddingLeft": "14rpx" } } };
  const EchartEquipCard = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["styles", [_style_0$l]]]);
  const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
    __name: "home",
    setup(__props) {
      const refs = useRefs();
      function setWorkshop() {
        router.to("/pages/equip/workshop_tree");
      }
      return (_ctx = null, _cache = null) => {
        const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                fixed: "",
                "background-color": vue.unref(isDark) ? "black" : "white",
                "show-back": false,
                "safe-area-top": "",
                height: vue.unref(isMp)() ? null : 100,
                pt: new UTSJSONObject({
                  className: "-important-z-50"
                })
              }), {
                default: vue.withCtx(() => {
                  return [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["flex flex-row items-end p-3 flex-1 w-full ml-5", new UTSJSONObject({
                        "pt-0": vue.unref(isMp)()
                      })])
                    }), [
                      vue.createVNode(_component_cl_image, new UTSJSONObject({
                        src: "/static/logo.png",
                        width: 60,
                        height: 60,
                        "show-loading": false,
                        pt: new UTSJSONObject({
                          className: "rounded-sm items-center"
                        })
                      })),
                      vue.createVNode(_component_cl_text, new UTSJSONObject({
                        color: "primary",
                        pt: new UTSJSONObject({
                          className: "-important-text-2xl mr-auto ml-2 items-end"
                        })
                      }), {
                        default: vue.withCtx(() => {
                          return [
                            vue.createTextVNode(vue.toDisplayString(vue.unref(config).name), 1)
                          ];
                        }),
                        _: 1
                      }),
                      vue.createElementVNode("view", new UTSJSONObject({
                        class: vue.normalizeClass(["flex flex-row justify-end ml-3", new UTSJSONObject({
                          "mr-32": vue.unref(isMp)(),
                          "mr-3": !vue.unref(isMp)()
                        })]),
                        onClick: setWorkshop
                      }), [
                        vue.createVNode(_component_cl_text, new UTSJSONObject({
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-base ml-2"
                          })
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(vue.unref(workshopTree).selectNode.value.label), 1)
                            ];
                          }),
                          _: 1
                        }),
                        vue.createVNode(_component_cl_icon, new UTSJSONObject({
                          name: "arrow-right-s-line",
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-base mb-1"
                          })
                        }))
                      ], 2)
                    ], 2)
                  ];
                }),
                _: 1
              }, 8, ["background-color", "height"]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "mainContainer" }), [
                vue.createVNode(vue.unref(MsgNotifier), new UTSJSONObject({ class: "msg-notifier" })),
                vue.createElementVNode("view", new UTSJSONObject({ class: "p-3 ml-2 mr-2 mt-2" }), [
                  vue.createVNode(_component_cl_text, new UTSJSONObject({
                    color: "primary",
                    pt: new UTSJSONObject({
                      className: "-important-text-xl mr-auto flex-1 w-full"
                    })
                  }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(vue.unref(t)("设备运行统计")), 1)
                      ];
                    }),
                    _: 1
                  }),
                  vue.createVNode(vue.unref(EchartEquipCard))
                ])
              ]),
              vue.createVNode(vue.unref(CustomTabbar)),
              vue.createVNode(vue.unref(_sfc_main$B), new UTSJSONObject({
                ref: vue.unref(refs).set("localeSet")
              }), null, 512)
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _style_0$k = { "mainContainer": { "": { "position": "relative", "width": "100%" } }, "msg-notifier": { "": { "position": "absolute", "top": "70rpx" } } };
  const PagesIndexHome = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["styles", [_style_0$k]]]);
  function parseType(e) {
    if (e != null) {
      if (e.onlineState == 0) {
        return { type: "offline", text: t("离线") };
      }
      if (e.onlineState == 1 && e.alarmState == 1) {
        return { type: "alarm", text: t("报警") };
      }
      if (e.onlineState == 1 && e.alarmState == 0 && e.runState == 1) {
        return { type: "run", text: t("运行") };
      }
      if (e.onlineState == 1 && e.alarmState == 0 && e.runState == 0) {
        return { type: "stopped", text: t("停止") };
      }
    }
    return { type: "offline", text: t("离线") };
  }
  function equipImage(equip) {
    return "/static/png/equip_type".concat(equip.type, ".png");
  }
  class EquipBadgePayload extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            equip: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = EquipBadgePayload.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.equip = this.__props__.equip;
      delete this.__props__;
    }
  }
  const _sfc_main$t = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "equip-badge"
  }, { __name: "equip-badge", props: {
    equip: { type: null }
  }, setup(__props) {
    useRefs();
    const props = __props;
    const badge = vue.computed(() => {
      return parseType(props.equip);
    });
    return (_ctx = null, _cache = null) => {
      return vue.unref(badge) ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
        key: 0,
        class: vue.normalizeClass(["badge", vue.unref(badge).type])
      }), vue.toDisplayString(vue.unref(badge).text), 3)) : vue.createCommentVNode("", true);
    };
  } }));
  const _style_0$j = { "badge": { "": { "position": "absolute", "top": "7rpx", "left": "7rpx", "borderTopLeftRadius": "10.5rpx", "borderTopRightRadius": "10.5rpx", "borderBottomRightRadius": "10.5rpx", "borderBottomLeftRadius": "10.5rpx", "paddingTop": "7rpx", "paddingBottom": "7rpx", "paddingLeft": "17.5rpx", "paddingRight": "17.5rpx", "fontSize": "21rpx", "lineHeight": "28rpx", "color": "rgba(255,255,255,1)" }, ".offline": { "backgroundImage": "none", "backgroundColor": "#bfbfbf" }, ".alarm": { "backgroundImage": "none", "backgroundColor": "#ff4d4f" }, ".run": { "backgroundImage": "none", "backgroundColor": "#52c41a" }, ".stopped": { "backgroundImage": "none", "backgroundColor": "#FAAD14" } } };
  const EquipBadge = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["styles", [_style_0$j]]]);
  const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
    __name: "equip",
    setup(__props) {
      useRefs();
      vue.ref(false);
      const equipList = vue.ref([]);
      const sourceList = vue.ref([]);
      const equipCount = vue.ref({
        total: 0,
        alarm: 0,
        online: 0,
        offline: 0,
        run: 0,
        stopped: 0
      });
      let currentPage = 1;
      let pageSize2 = 20;
      let timer = null;
      const loading = vue.ref(false);
      const pageloading = vue.ref(false);
      function setWorkshop() {
        router.to("/pages/equip/workshop_tree");
      }
      function typeImage(equip) {
        return equipImage(equip);
      }
      function loadPage(page, isReStart) {
        if (pageloading.value) {
          return null;
        }
        pageloading.value = true;
        function push() {
          let start = 0;
          if (!isReStart) {
            start = (page - 1) * pageSize2;
          }
          const end = page * pageSize2;
          const nextPage = sourceList.value.slice(start, end);
          if (nextPage.length > 0) {
            if (isReStart) {
              equipList.value = nextPage;
            } else {
              equipList.value.push(...nextPage);
            }
          } else {
            if (isReStart) {
              equipList.value = [];
            }
          }
          pageloading.value = false;
        }
        setTimeout(() => {
          push();
        }, 16);
      }
      function loadMore() {
        if (loading.value) {
          return null;
        }
        const nextPage = currentPage + 1;
        const start = (nextPage - 1) * pageSize2;
        if (start >= sourceList.value.length) {
          return null;
        }
        currentPage = nextPage;
        loadPage(currentPage, false);
      }
      const reloadData = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (loading.value) {
            return Promise.resolve(null);
          }
          loading.value = true;
          try {
            yield request({
              url: apiPath.equip_page,
              method: "POST",
              data: new UTSJSONObject({
                workshopCode: workshopTree.selectNode.value.id == -1 ? null : workshopTree.selectNode.value.id,
                needRealtime: true,
                needWorkshopCascade: true,
                queryWorkshop: true,
                queryAttrs: true,
                limitUserWorkshop: true,
                requirePage: false
              })
            }).then((res = null) => {
              const c = {
                total: 0,
                alarm: 0,
                online: 0,
                offline: 0,
                run: 0,
                stopped: 0
              };
              if (res === null) {
                sourceList.value = [];
              } else {
                let r = parseData(res);
                if (r === null) {
                  sourceList.value = [];
                } else {
                  sourceList.value = r;
                }
              }
              if (sourceList.value.length > 0) {
                sourceList.value.forEach((item) => {
                  if (item.onlineState == 0) {
                    c.offline++;
                  } else {
                    c.online++;
                    if (item.runState == 1) {
                      c.run++;
                    } else {
                      c.stopped++;
                    }
                    if (item.alarmState == 1) {
                      c.alarm++;
                    }
                  }
                });
              }
              equipCount.value = c;
              loadPage(currentPage, true);
            });
          } finally {
            loading.value = false;
          }
        });
      };
      const reloadAll = () => {
        return __awaiter(this, void 0, void 0, function* () {
          currentPage = 1;
          yield reloadData();
        });
      };
      vue.onReachBottom(() => {
        loadMore();
      });
      vue.onLoad(() => {
        timer = setInterval(() => {
          reloadData();
        }, config.equipRefreshTime);
      });
      vue.onShow(() => {
        reloadAll();
      });
      vue.onHide(() => {
        if (timer != null) {
          clearInterval(timer);
          timer = null;
        }
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                fixed: "",
                "background-color": vue.unref(isDark) ? "black" : "white",
                "show-back": false,
                "safe-area-top": "",
                height: vue.unref(isMp)() ? null : 100,
                pt: new UTSJSONObject({
                  className: "-important-z-50"
                })
              }), {
                default: vue.withCtx(() => {
                  return [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["flex flex-row items-end p-3 flex-1 w-full ml-5", new UTSJSONObject({
                        "pt-0": vue.unref(isMp)()
                      })])
                    }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "flex flex-row flex-1" }), [
                        vue.createVNode(_component_cl_text, new UTSJSONObject({
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-2xl"
                          })
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(vue.unref(t)("设备")), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      vue.createElementVNode("view", new UTSJSONObject({
                        class: vue.normalizeClass(["flex flex-row justify-end ml-3", new UTSJSONObject({
                          "mr-32": vue.unref(isMp)(),
                          "mr-3": !vue.unref(isMp)()
                        })]),
                        onClick: setWorkshop
                      }), [
                        vue.createVNode(_component_cl_text, new UTSJSONObject({
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-base ml-2"
                          })
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(vue.unref(workshopTree).selectNode.value.label), 1)
                            ];
                          }),
                          _: 1
                        }),
                        vue.createVNode(_component_cl_icon, new UTSJSONObject({
                          name: "arrow-right-s-line",
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-base mb-1"
                          })
                        }))
                      ], 2)
                    ], 2)
                  ];
                }),
                _: 1
              }, 8, ["background-color", "height"]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "flex flex-row p-3 status-summary" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "summary-item" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "status-dot online shadow" })),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(t)("在线")) + " " + vue.toDisplayString(equipCount.value.online), 1)
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "summary-item" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "status-dot offline shadow" })),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(t)("离线")) + " " + vue.toDisplayString(equipCount.value.offline), 1)
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "summary-item" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "status-dot run shadow" })),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(t)("运行")) + " " + vue.toDisplayString(equipCount.value.run), 1)
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "summary-item" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "status-dot stopped shadow" })),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(t)("停止")) + " " + vue.toDisplayString(equipCount.value.stopped), 1)
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "summary-item" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "status-dot alarm shadow" })),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(t)("报警")) + " " + vue.toDisplayString(equipCount.value.alarm), 1)
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "flex flex-row p-3 device-list-masonry" }), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(equipList.value, (item, index) => {
                  var _a;
                  return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    key: index,
                    class: vue.normalizeClass(["device-card", new UTSJSONObject({
                      "is-run": item.runState == 1 && item.alarmState == 0,
                      "is-alarm": item.alarmState == 1,
                      "is-offline": item.onlineState == 0
                    })]),
                    arrow: "",
                    hoverable: "",
                    onClick: ($event = null) => {
                      return vue.unref(router).to("/pages/equip/equip_detail?id=" + item.id);
                    }
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "image-wrap" }), [
                      vue.createElementVNode("image", new UTSJSONObject({
                        src: typeImage(item),
                        mode: "aspectFill",
                        class: "device-image"
                      }), null, 8, ["src"]),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "name-overlay" }), [
                        vue.createElementVNode("text", new UTSJSONObject({
                          class: "device-name",
                          bold: ""
                        }), vue.toDisplayString(item.name), 1),
                        vue.createElementVNode("text", new UTSJSONObject({
                          class: "workshop-name",
                          style: new UTSJSONObject({ "padding-top": "2%" })
                        }), vue.toDisplayString((_a = item.workshop) === null || _a === void 0 ? null : _a.name), 1)
                      ]),
                      vue.createVNode(vue.unref(EquipBadge), new UTSJSONObject({ equip: item }), null, 8, ["equip"])
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "card-footer" }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "status-item" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "desc" }), vue.toDisplayString(vue.unref(t)("在线状态")) + " :", 1),
                        vue.createElementVNode("view", new UTSJSONObject({
                          class: vue.normalizeClass(["status-dot", item.onlineState == 1 ? "online" : "offline"])
                        }), null, 2)
                      ]),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "status-item" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "desc" }), vue.toDisplayString(vue.unref(t)("运行状态")) + " :", 1),
                        vue.createElementVNode("view", new UTSJSONObject({
                          class: vue.normalizeClass(["status-dot", item.onlineState == 0 ? "offline" : item.runState == 1 ? "run" : "stopped"])
                        }), null, 2)
                      ]),
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.alarmTexts, (i2, idx2) => {
                        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ key: idx2 }), [
                          vue.createElementVNode("view", new UTSJSONObject({ class: "status-item" }), [
                            vue.createElementVNode("text", new UTSJSONObject({ class: "desc text-red-500" }), vue.toDisplayString(i2), 1)
                          ])
                        ]);
                      }), 128)),
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.attrs, (i, idx) => {
                        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ key: idx }), [
                          vue.createElementVNode("view", new UTSJSONObject({ class: "status-item" }), [
                            vue.createElementVNode("text", new UTSJSONObject({ class: "desc" }), vue.toDisplayString(i.name) + " :", 1),
                            vue.createElementVNode("text", new UTSJSONObject({ class: "desc" }), vue.toDisplayString(i.value == null ? vue.unref(t)("暂未获取") : i.value), 1)
                          ])
                        ]);
                      }), 128))
                    ])
                  ], 10, ["onClick"]);
                }), 128))
              ]),
              pageloading.value ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                key: 0,
                class: "text-center p-2 text-gray-300"
              }), "加载中…")) : vue.createCommentVNode("", true),
              vue.createVNode(vue.unref(CustomTabbar))
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _style_0$i = { "run": { "": { "backgroundImage": "none", "backgroundColor": "#52c41a" }, ".shadow": { "boxShadow": "0 0 6px rgba(82, 196, 26, 0.6)" } }, "stopped": { "": { "backgroundImage": "none", "backgroundColor": "#FAAD14" }, ".shadow": { "boxShadow": "0 0 6px rgba(250, 173, 20, 0.6)" } }, "online": { "": { "backgroundImage": "none", "backgroundColor": "#1890ff" }, ".shadow": { "boxShadow": "0 0 6px rgba(24, 144, 255, 0.6)" } }, "alarm": { "": { "backgroundImage": "none", "backgroundColor": "#ff4d4f" }, ".shadow": { "boxShadow": "0 0 6px rgba(255, 77, 79, 0.8)" } }, "offline": { "": { "backgroundImage": "none", "backgroundColor": "#bfbfbf" } }, "device-list-masonry": { "": { "marginBottom": "28rpx", "display": "flex", "flexWrap": "wrap", "justifyContent": "space-between" } }, "device-card": { "": { "width": "48%", "marginTop": "7rpx", "marginRight": "7rpx", "marginBottom": "7rpx", "marginLeft": "7rpx", "overflow": "hidden", "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx", "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(243,244,246,1)", "borderRightColor": "rgba(243,244,246,1)", "borderBottomColor": "rgba(243,244,246,1)", "borderLeftColor": "rgba(243,244,246,1)", "backgroundColor": "rgba(255,255,255,1)", "paddingTop": "7rpx", "paddingRight": "7rpx", "paddingBottom": "7rpx", "paddingLeft": "7rpx" }, ".is-offline": { "opacity": 0.6 }, ".is-alarm": { "borderTopColor": "#ff4d4f", "borderRightColor": "#ff4d4f", "borderBottomColor": "#ff4d4f", "borderLeftColor": "#ff4d4f", "boxShadow": "0 0 6px rgba(255, 77, 79, 0.8)" } }, "image-wrap": { "": { "height": "180rpx", "backgroundImage": "none", "backgroundColor": "#f0f2f5", "position": "relative", "width": "100%" } }, "device-image": { "": { "height": "100%", "width": "100%" } }, "name-overlay": { "": { "backgroundImage": "none", "backgroundColor": "rgba(220,220,220,0.8)", "position": "absolute", "bottom": 0, "left": 0, "width": "100%", "paddingTop": "14rpx", "paddingBottom": "14rpx", "paddingLeft": "21rpx", "paddingRight": "21rpx" } }, "device-name": { "": { "fontSize": "42rpx", "lineHeight": "56rpx", "color": "rgba(75,85,99,1)" } }, "workshop-name": { "": { "fontSize": "21rpx", "lineHeight": "28rpx", "color": "rgba(107,114,128,1)" } }, "card-footer": { "": { "paddingTop": "3%", "paddingRight": "10%", "paddingBottom": "5%", "paddingLeft": "10%" }, ".column": { "marginBottom": "35rpx", "display": "flex", "flexDirection": "column", "alignItems": "flex-start" } }, "status-item": { "": { "display": "flex", "width": "100%", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "desc": { ".status-item ": { "fontSize": "24.5rpx", "lineHeight": "35rpx" } }, "status-dot": { "": { "boxSizing": "border-box", "display": "flex", "height": "21rpx", "width": "21rpx", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999 }, ".summary-item ": { "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "none", "borderRightStyle": "none", "borderBottomStyle": "none", "borderLeftStyle": "none", "borderTopColor": "rgba(0,0,0,0.15)", "borderRightColor": "rgba(0,0,0,0.15)", "borderBottomColor": "rgba(0,0,0,0.15)", "borderLeftColor": "rgba(0,0,0,0.15)", "marginRight": "14rpx", "marginBottom": "17.5rpx", "boxSizing": "border-box", "height": "28rpx", "width": "28rpx", "alignItems": "center", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999 } }, "status-summary": { "": { "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,1)", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#ebedf0", "borderRightColor": "#ebedf0", "borderBottomColor": "#ebedf0", "borderLeftColor": "#ebedf0", "boxShadow": "0 2rpx 6rpx rgba(0, 0, 0, 0.1)", "marginTop": "14rpx", "marginRight": "14rpx", "marginBottom": "14rpx", "marginLeft": "14rpx", "display": "flex", "alignItems": "center", "justifyContent": "space-between", "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx" } }, "summary-item": { "": { "display": "flex", "alignItems": "center" } } };
  const PagesIndexEquip = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["styles", [_style_0$i]]]);
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
    __name: "work",
    setup(__props) {
      useRefs();
      const workshopScada = vue.ref(null);
      function setWorkshop() {
        router.to("/pages/equip/workshop_tree");
      }
      function toScada() {
        router.to("/pages/equip/workshop_scada?workshopCode=".concat(workshopTree.selectNode.value.id));
      }
      function loadIframeUrl(workshopCode = null) {
        if (workshopCode == null || workshopCode == "-1") {
          workshopScada.value = null;
          return null;
        }
        request({
          url: apiPath.workshop_scada,
          method: "GET",
          data: new UTSJSONObject({
            workshopCode,
            platform: 2
          })
        }).then((res = null) => {
          if (res === null) {
            workshopScada.value = null;
            return null;
          }
          const r = parseData(res);
          if (r == null || r.url == null || r.url == "") {
            workshopScada.value = null;
            return null;
          }
          workshopScada.value = r;
        });
      }
      vue.watch(workshopTree.selectNode, (val = null) => {
        if (val != null) {
          loadIframeUrl(val.id);
        } else {
          loadIframeUrl(null);
        }
      });
      vue.onLoad(() => {
        loadIframeUrl(workshopTree.selectNode.value.id);
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
        const _component_cl_button = resolveEasycom(vue.resolveDynamicComponent("cl-button"), __easycom_4);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                fixed: "",
                "background-color": vue.unref(isDark) ? "black" : "white",
                "show-back": false,
                "safe-area-top": "",
                height: vue.unref(isMp)() ? null : 100,
                pt: new UTSJSONObject({
                  className: "-important-z-50"
                })
              }), {
                default: vue.withCtx(() => {
                  return [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["flex flex-row items-end p-3 flex-1 w-full ml-5", new UTSJSONObject({
                        "pt-0": vue.unref(isMp)()
                      })])
                    }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "flex flex-row flex-1" }), [
                        vue.createVNode(_component_cl_text, new UTSJSONObject({
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-2xl"
                          })
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(vue.unref(t)("场景")), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      vue.createElementVNode("view", new UTSJSONObject({
                        class: vue.normalizeClass(["flex flex-row justify-end ml-3", new UTSJSONObject({
                          "mr-32": vue.unref(isMp)(),
                          "mr-3": !vue.unref(isMp)()
                        })]),
                        onClick: setWorkshop
                      }), [
                        vue.createVNode(_component_cl_text, new UTSJSONObject({
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-base ml-2"
                          })
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(vue.unref(workshopTree).selectNode.value.label), 1)
                            ];
                          }),
                          _: 1
                        }),
                        vue.createVNode(_component_cl_icon, new UTSJSONObject({
                          name: "arrow-right-s-line",
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-base mb-1"
                          })
                        }))
                      ], 2)
                    ], 2)
                  ];
                }),
                _: 1
              }, 8, ["background-color", "height"]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "p-4 pt-24 flex flex-col items-center" }), [
                vue.createVNode(_component_cl_image, new UTSJSONObject({
                  class: "image-wrap-1",
                  src: "/static/icon/workshop.svg"
                }), null, 8, ["src"]),
                vue.createVNode(_component_cl_text, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mt-4 text-xl font-semibold" }) }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createTextVNode(vue.toDisplayString(vue.unref(workshopTree).selectNode.value.label), 1)
                    ];
                  }),
                  _: 1
                }),
                vue.createVNode(_component_cl_text, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mt-2 text-gray-500" }) }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createTextVNode(vue.toDisplayString(vue.unref(t)("编号")) + ": " + vue.toDisplayString(vue.unref(workshopTree).selectNode.value.id), 1)
                    ];
                  }),
                  _: 1
                })
              ]),
              workshopScada.value != null ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                key: 0,
                class: "p-14 text-gray-300 pt-16"
              }), [
                vue.createVNode(_component_cl_button, new UTSJSONObject({
                  rounded: "",
                  onClick: toScada,
                  size: "large"
                }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createTextVNode(vue.toDisplayString(vue.unref(t)("查看工艺详情")), 1)
                    ];
                  }),
                  _: 1
                })
              ])) : vue.createCommentVNode("", true),
              workshopScada.value == null ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                key: 1,
                class: "text-center p-2 text-gray-300 pt-16"
              }), vue.toDisplayString(vue.unref(t)("当前场景未配置工艺组态")), 1)) : vue.createCommentVNode("", true),
              vue.createVNode(vue.unref(CustomTabbar))
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _style_0$h = { "image-wrap": { "": { "height": "180rpx", "backgroundImage": "none", "backgroundColor": "#f0f2f5", "position": "relative", "width": "100%" } }, "image-wrap-1": { "": { "flexGrow": 0, "flexShrink": 0, "flexBasis": "auto", "height": "100%", "width": "28rpx", "alignItems": "center", "justifyContent": "center", "paddingTop": "21rpx", "paddingRight": "21rpx", "paddingBottom": "21rpx", "paddingLeft": "21rpx" } }, "view-center": { "": { "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "flex-start", "paddingTop": "100rpx" } }, "workshop-name": { "": { "fontSize": "21rpx", "lineHeight": "28rpx", "color": "rgba(107,114,128,1)" } }, "fake-top": { "": { "position": "fixed", "top": 0, "left": 0, "height": 44, "width": "100%", "backgroundImage": "none", "backgroundColor": "#ffffff", "zIndex": 999 } }, "fake-tab": { "": { "position": "fixed", "bottom": 0, "width": "100%", "height": 50, "backgroundImage": "none", "backgroundColor": "#ffffff" } } };
  const PagesIndexWork = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["styles", [_style_0$h]]]);
  class MessageSetPayload extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            status: { type: Number, optional: true }
          };
        }
      };
    }
    constructor(options, metadata = MessageSetPayload.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.status = this.__props__.status;
      delete this.__props__;
    }
  }
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    __name: "message-set",
    props: {
      status: { type: [Number, null] }
    },
    emits: ["change"],
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      const ui2 = useUi();
      const statusOptions = [
        { label: "全部", value: -1 },
        { label: "未读", value: 0 },
        { label: "已读", value: 1 }
      ];
      const selectRef = vue.ref(null);
      const selectStatus = vue.ref(-1);
      const props = __props;
      const emit = __emit;
      function emitFilter() {
        const status = selectStatus.value == -1 ? null : selectStatus.value;
        emit("change", new MessageSetPayload({ status }));
      }
      function open() {
        selectStatus.value = props.status == null ? -1 : props.status;
        selectRef.value.open((value = null) => {
          ui2.showLoading(t("切换中"));
          setTimeout(() => {
            ui2.hideLoading();
          }, 500);
        });
      }
      function close() {
        selectRef.value.close();
      }
      __expose({
        open,
        close
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_select = resolveEasycom(vue.resolveDynamicComponent("cl-select"), __easycom_1$3);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          class: vue.normalizeClass(["message-set", new UTSJSONObject({ "is-dark": vue.unref(isDark) })])
        }), [
          vue.createVNode(_component_cl_select, new UTSJSONObject({
            ref_key: "selectRef",
            ref: selectRef,
            modelValue: selectStatus.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event = null) => {
              return selectStatus.value = $event;
            }),
            options: statusOptions,
            "show-trigger": false,
            title: vue.unref(t)("已读状态"),
            "cancel-text": vue.unref(t)("取消"),
            "confirm-text": vue.unref(t)("确定"),
            onChange: emitFilter
          }), null, 8, ["modelValue", "title", "cancel-text", "confirm-text"])
        ], 2);
      };
    }
  });
  const pageSize = 10;
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "message",
    setup(__props) {
      const refs = useRefs();
      const page = vue.ref(1);
      const list2 = vue.ref([]);
      const loading = vue.ref(false);
      const hasMore = vue.ref(true);
      const readStatus = vue.ref(null);
      function setMessage() {
        refs.open("messageSet");
      }
      const loadData = (isClear) => {
        return __awaiter(this, void 0, void 0, function* () {
          var _a;
          if (loading.value) {
            return Promise.resolve(null);
          }
          loading.value = true;
          try {
            yield request({
              url: apiPath.message_page,
              method: "POST",
              data: new UTSJSONObject({
                page: page.value,
                pageSize,
                accId: (_a = userInfo.value) === null || _a === void 0 ? null : _a.id,
                platform: config.platform,
                readStatus: readStatus.value == -1 ? null : readStatus.value
              })
            }).then((res = null) => {
              if (res === null) {
                if (isClear) {
                  list2.value = [];
                }
                return null;
              }
              const r = parseData(res);
              if (r === null) {
                if (isClear) {
                  list2.value = [];
                }
                return null;
              }
              if (isClear) {
                list2.value = r;
              } else {
                list2.value.push(...r);
              }
              if (r.length < pageSize) {
                hasMore.value = false;
              } else {
                hasMore.value = true;
                page.value++;
              }
            }).catch((err = null) => {
              hasMore.value = true;
              page.value = 1;
              list2.value = [];
            });
          } finally {
            loading.value = false;
          }
        });
      };
      const reloadData = () => {
        return __awaiter(this, void 0, void 0, function* () {
          page.value = 1;
          yield loadData(true);
        });
      };
      const loadMore = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (!hasMore.value) {
            return Promise.resolve(null);
          }
          yield loadData(false);
        });
      };
      vue.onLoad(() => {
        reloadData();
        uni.$on("maskAsRead", (id) => {
          const index = list2.value.findIndex((item) => {
            return item.id == id;
          });
          if (index !== -1) {
            list2.value[index].readStatus = 1;
            list2.value = [...list2.value];
          }
        });
      });
      vue.onReachBottom(() => {
        loadMore();
      });
      vue.onPullDownRefresh(() => {
        reloadData();
        uni.stopPullDownRefresh();
      });
      function onMessageChange(payload = null) {
        if (readStatus.value === payload.status) {
          return null;
        }
        readStatus.value = payload.status;
        reloadData();
      }
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                fixed: "",
                "background-color": vue.unref(isDark) ? "black" : "white",
                "show-back": false,
                "safe-area-top": "",
                height: vue.unref(isMp)() ? null : 100,
                pt: new UTSJSONObject({
                  className: "-important-z-50"
                })
              }), {
                default: vue.withCtx(() => {
                  return [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["flex flex-row items-center justify-center p-3 w-full", new UTSJSONObject({
                        "pt-0": vue.unref(isMp)()
                      })]),
                      onClick: setMessage
                    }), [
                      vue.createVNode(_component_cl_text, new UTSJSONObject({
                        color: "primary",
                        pt: new UTSJSONObject({
                          className: "-important-text-xl"
                        }),
                        title: vue.unref(t)("消息")
                      }), {
                        default: vue.withCtx(() => {
                          return [
                            vue.createTextVNode(vue.toDisplayString(vue.unref(t)("消息")), 1)
                          ];
                        }),
                        _: 1
                      }, 8, ["title"]),
                      vue.createVNode(_component_cl_icon, new UTSJSONObject({
                        name: "bar-chart-horizontal-line",
                        color: "primary"
                      }))
                    ], 2)
                  ];
                }),
                _: 1
              }, 8, ["background-color", "height"]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "p-3" }), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(list2.value, (item) => {
                  return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    key: item.id,
                    class: "swipe-wrapper",
                    onClick: ($event = null) => {
                      return vue.unref(router).to("/pages/message/message_detail?id=" + item.id);
                    }
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["card", new UTSJSONObject({ "card-type1": item.type == 1 })])
                    }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "message-icon" }), [
                        vue.createVNode(_component_cl_image, new UTSJSONObject({
                          src: "/static/icon/message/type_".concat(item === null || item === void 0 ? null : item.type, ".svg"),
                          class: "detail-icon"
                        }), null, 8, ["src"])
                      ]),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "message-content" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "card-title" }), vue.toDisplayString(item.title), 1),
                        vue.createElementVNode("text", new UTSJSONObject({ class: "card-time" }), vue.toDisplayString(item.createdTime), 1),
                        vue.createElementVNode("text", new UTSJSONObject({ class: "card-content" }), vue.toDisplayString(item.context), 1)
                      ]),
                      item.readStatus == 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                        key: 0,
                        class: "dot"
                      }))) : vue.createCommentVNode("", true)
                    ], 2)
                  ], 8, ["onClick"]);
                }), 128)),
                loading.value ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                  key: 0,
                  class: "text-center p-2 text-gray-300"
                }), "加载中…")) : vue.createCommentVNode("", true)
              ]),
              vue.createVNode(vue.unref(CustomTabbar)),
              vue.createVNode(vue.unref(_sfc_main$q), new UTSJSONObject({
                ref: vue.unref(refs).set("messageSet"),
                status: readStatus.value,
                onChange: onMessageChange
              }), null, 8, ["status"])
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _style_0$g = { "card": { "": { "height": "280rpx", "marginBottom": "28rpx", "display": "flex", "flexWrap": "wrap", "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx", "backgroundColor": "rgba(255,255,255,1)", "paddingTop": "28rpx", "paddingRight": "28rpx", "paddingBottom": "28rpx", "paddingLeft": "28rpx", "boxShadow": "rgba(0, 0, 0, 0.1)" } }, "message-icon": { "": { "width": "30%", "display": "flex", "height": "100%", "alignItems": "center", "justifyContent": "center" } }, "message-content": { "": { "width": "70%", "display": "flex", "height": "100%" } }, "card-title": { "": { "marginBottom": "14rpx", "fontSize": "42rpx", "lineHeight": "56rpx", "fontWeight": "700" } }, "card-time": { "": { "marginBottom": "28rpx", "fontSize": "24.5rpx", "lineHeight": "35rpx" } }, "card-content": { "": { "fontSize": "28rpx", "lineHeight": "42rpx", "fontWeight": "400" } }, "card-type1": { "": { "borderTopWidth": 2, "borderRightWidth": 2, "borderBottomWidth": 2, "borderLeftWidth": 2, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#ba0404", "borderRightColor": "#ba0404", "borderBottomColor": "#ba0404", "borderLeftColor": "#ba0404" } }, "card-icon": { "": { "marginRight": "28rpx", "width": "50%" } }, "swipe-wrapper": { "": { "position": "relative" } }, "dot": { "": { "position": "absolute", "right": "42rpx", "top": "42rpx", "height": "21rpx", "width": "21rpx", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999, "backgroundColor": "rgba(239,68,68,1)" } } };
  const PagesIndexMessage = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["styles", [_style_0$g]]]);
  let PassThrough$9 = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            icon: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.icon = this.__props__.icon;
      delete this.__props__;
    }
  };
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-avatar"
  }, { __name: "cl-avatar", props: {
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    src: {
      type: String,
      default: ""
    },
    size: {
      type: [String, Number],
      default: 80
    },
    rounded: {
      type: Boolean,
      default: false
    }
  }, setup(__props) {
    const props = __props;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    return (_ctx = null, _cache = null) => {
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
      return vue.openBlock(), vue.createBlock(_component_cl_image, new UTSJSONObject({
        src: __props.src,
        height: __props.size,
        width: __props.size,
        pt: new UTSJSONObject({
          className: vue.unref(parseClass)([
            "cl-avatar",
            new UTSJSONObject({
              "-important-rounded-full": __props.rounded
            }),
            pt.value.className
          ])
        })
      }), new UTSJSONObject({
        loading: vue.withCtx(() => {
          var _a, _b, _c, _d, _e;
          return [
            vue.createVNode(_component_cl_icon, new UTSJSONObject({
              name: (_b = (_a = pt.value.icon) === null || _a === void 0 ? null : _a.name) !== null && _b !== void 0 ? _b : "user-smile-fill",
              size: (_d = (_c = pt.value.icon) === null || _c === void 0 ? null : _c.size) !== null && _d !== void 0 ? _d : 40,
              pt: new UTSJSONObject({
                className: vue.unref(parseClass)([
                  [vue.unref(isDark), "-important-text-surface-50", "-important-text-surface-400"],
                  (_e = pt.value.icon) === null || _e === void 0 ? null : _e.className
                ])
              })
            }), null, 8, ["name", "size", "pt"])
          ];
        }),
        default: vue.withCtx(() => {
          return [
            vue.renderSlot(_ctx.$slots, "default")
          ];
        }),
        _: 3
      }), 8, ["src", "height", "width", "pt"]);
    };
  } }));
  let PassThrough$8 = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      delete this.__props__;
    }
  };
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-collapse"
  }, { __name: "cl-collapse", props: {
    // 透传样式配置
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 折叠状态值
    modelValue: {
      type: Boolean,
      default: false
    }
  }, setup(__props, _a) {
    var __expose = _a.expose;
    const props = __props;
    const proxy2 = vue.getCurrentInstance().proxy;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const isOpened = vue.ref(false);
    const height = vue.ref(0);
    function show() {
      isOpened.value = true;
      uni.createSelectorQuery().in(proxy2).select(".cl-collapse__content").boundingClientRect((node = null) => {
        var _a2;
        height.value = (_a2 = node.height) !== null && _a2 !== void 0 ? _a2 : 0;
      }).exec();
    }
    function hide() {
      isOpened.value = false;
      height.value = 0;
    }
    function toggle() {
      if (isOpened.value) {
        hide();
      } else {
        show();
      }
    }
    vue.watch(vue.computed(() => {
      return props.modelValue;
    }), (val) => {
      if (val) {
        show();
      } else {
        hide();
      }
    });
    __expose({
      show,
      hide,
      toggle
    });
    return (_ctx = null, _cache = null) => {
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: "cl-collapse",
        style: vue.normalizeStyle({ height: "".concat(height.value, "px") })
      }), [
        vue.createElementVNode("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-collapse__content", [new UTSJSONObject({}), pt.value.className]])
        }), [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2)
      ], 4);
    };
  } }));
  const _style_0$f = { "cl-collapse": { "": { "position": "relative", "transitionProperty": "height", "transitionDuration": "0.2s" } }, "cl-collapse__content": { "": { "position": "absolute", "top": 0, "left": 0, "width": "100%", "paddingTop": "21rpx" } }, "@TRANSITION": { "cl-collapse": { "property": "height", "duration": "0.2s" } } };
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["styles", [_style_0$f]]]);
  let PassThrough$7 = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            wrapper: { type: "Unknown", optional: true },
            inner: { type: "Unknown", optional: true },
            label: { type: "Unknown", optional: true },
            content: { type: "Unknown", optional: true },
            icon: { type: "Unknown", optional: true },
            image: { type: "Unknown", optional: true },
            collapse: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.wrapper = this.__props__.wrapper;
      this.inner = this.__props__.inner;
      this.label = this.__props__.label;
      this.content = this.__props__.content;
      this.icon = this.__props__.icon;
      this.image = this.__props__.image;
      this.collapse = this.__props__.collapse;
      delete this.__props__;
    }
  };
  class Swipe extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            width: { type: Number, optional: false },
            maxX: { type: Number, optional: false },
            startX: { type: Number, optional: false },
            endX: { type: Number, optional: false },
            offsetX: { type: Number, optional: false },
            direction: { type: "Unknown", optional: false },
            moveDirection: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Swipe.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.width = this.__props__.width;
      this.maxX = this.__props__.maxX;
      this.startX = this.__props__.startX;
      this.endX = this.__props__.endX;
      this.offsetX = this.__props__.offsetX;
      this.direction = this.__props__.direction;
      this.moveDirection = this.__props__.moveDirection;
      delete this.__props__;
    }
  }
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-list-item"
  }, { __name: "cl-list-item", props: {
    // 透传样式配置
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 图标名称
    icon: {
      type: String,
      default: ""
    },
    // 图标名称
    image: {
      type: String,
      default: ""
    },
    // 标签文本
    label: {
      type: String,
      default: ""
    },
    // 内容对齐方式
    justify: {
      type: String,
      default: "end"
    },
    // 是否显示箭头
    arrow: {
      type: Boolean,
      default: false
    },
    // 是否可滑动
    swipeable: {
      type: Boolean,
      default: false
    },
    // 是否显示点击态
    hoverable: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示折叠
    collapse: {
      type: Boolean,
      default: false
    }
  }, setup(__props, _a) {
    var __expose = _a.expose;
    const props = __props;
    const proxy2 = vue.getCurrentInstance().proxy;
    const slots = vue.useSlots();
    const touch = useTouch();
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const swipe = vue.reactive(new Swipe({
      width: 0,
      maxX: 0,
      startX: 0,
      endX: 0,
      offsetX: 0,
      direction: "left",
      moveDirection: "left"
      // 默认向左移动
    }));
    function initSwipe() {
      if (!props.swipeable)
        return null;
      swipe.direction = slots["swipe-left"] != null ? "right" : "left";
      uni.createSelectorQuery().in(proxy2).select(".cl-list-item__swipe").boundingClientRect((node = null) => {
        var _a2;
        swipe.width = (_a2 = node.width) !== null && _a2 !== void 0 ? _a2 : 0;
        swipe.maxX = swipe.width * (swipe.direction == "left" ? -1 : 1);
      }).exec();
    }
    function resetSwipe() {
      swipe.startX = 0;
      swipe.endX = 0;
      swipe.offsetX = 0;
    }
    function swipeTo(num) {
      swipe.offsetX = num;
      swipe.endX = num;
    }
    const isHover = vue.ref(false);
    function onTouchStart(e) {
      touch.start(e);
      isHover.value = true;
      if (props.swipeable) {
        swipe.startX = e.touches[0].pageX;
      }
    }
    function onTouchEnd() {
      if (isHover.value) {
        touch.end();
        const threshold = swipe.width / 2 > 50 ? 50 : swipe.width / 2;
        const offset = Math.abs(swipe.offsetX - swipe.endX);
        isHover.value = false;
        if (offset > threshold) {
          if (swipe.direction == swipe.moveDirection) {
            swipeTo(swipe.maxX);
          } else {
            swipeTo(0);
          }
        } else {
          swipeTo(swipe.endX == 0 ? 0 : swipe.maxX);
        }
      }
    }
    function onTouchCancel() {
      onTouchEnd();
      isHover.value = false;
    }
    function onTouchMove(e) {
      if (isHover.value) {
        touch.move(e);
        if (touch.horizontal != 1) {
          return null;
        }
        const offsetX = e.touches[0].pageX - swipe.startX;
        swipe.moveDirection = offsetX > 0 ? "right" : "left";
        let x = offsetX + swipe.endX;
        if (swipe.direction == "right") {
          if (x > swipe.maxX) {
            x = swipe.maxX;
          }
          if (x < 0) {
            x = 0;
          }
        }
        if (swipe.direction == "left") {
          if (x < swipe.maxX) {
            x = swipe.maxX;
          }
          if (x > 0) {
            x = 0;
          }
        }
        swipe.offsetX = x;
      }
    }
    const isCollapse = vue.ref(false);
    function onTap() {
      if (props.collapse) {
        isCollapse.value = !isCollapse.value;
      }
    }
    vue.onMounted(() => {
      setTimeout(() => {
        initSwipe();
      }, isAppIOS() ? 50 : 0);
    });
    __expose({
      initSwipe,
      resetSwipe
    });
    return (_ctx = null, _cache = null) => {
      var _a2, _b, _c, _d, _e;
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      const _component_cl_collapse = resolveEasycom(vue.resolveDynamicComponent("cl-collapse"), __easycom_3);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-list-item", [new UTSJSONObject({}), new UTSJSONObject({
          "cl-list-item--disabled": __props.disabled
        }), pt.value.className]]),
        onTouchstart: onTouchStart,
        onTouchend: onTouchEnd,
        onTouchmove: onTouchMove,
        onTouchcancel: onTouchCancel
      }), [
        vue.createElementVNode("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-list-item__wrapper", [
            new UTSJSONObject({}),
            new UTSJSONObject({
              "is-transition": !isHover.value,
              [vue.unref(isDark) ? "bg-surface-800" : "bg-white"]: true,
              [vue.unref(isDark) ? "-important-bg-surface-700" : "-important-bg-surface-50"]: __props.hoverable && isHover.value
            }),
            (_a2 = pt.value.wrapper) === null || _a2 === void 0 ? null : _a2.className
          ]]),
          style: vue.normalizeStyle({
            transform: "translateX(".concat(swipe.offsetX, "px)")
          }),
          onClick: onTap
        }), [
          vue.createElementVNode("view", new UTSJSONObject({
            class: vue.normalizeClass(["cl-list-item__inner", [new UTSJSONObject({}), (_b = pt.value.inner) === null || _b === void 0 ? null : _b.className]])
          }), [
            vue.renderSlot(_ctx.$slots, "icon", new UTSJSONObject({}), () => {
              var _a3, _b2, _c2, _d2;
              return [
                __props.icon != "" ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
                  key: 0,
                  name: __props.icon,
                  size: (_b2 = (_a3 = pt.value.icon) === null || _a3 === void 0 ? null : _a3.size) !== null && _b2 !== void 0 ? _b2 : 36,
                  color: (_c2 = pt.value.icon) === null || _c2 === void 0 ? null : _c2.color,
                  pt: new UTSJSONObject({
                    className: "mr-3 ".concat((_d2 = pt.value.icon) === null || _d2 === void 0 ? null : _d2.className)
                  })
                }), null, 8, ["name", "size", "color", "pt"])) : vue.createCommentVNode("", true)
              ];
            }),
            vue.renderSlot(_ctx.$slots, "image", new UTSJSONObject({}), () => {
              var _a3, _b2, _c2, _d2, _e2;
              return [
                __props.image != "" ? (vue.openBlock(), vue.createBlock(_component_cl_image, new UTSJSONObject({
                  key: 0,
                  width: (_b2 = (_a3 = pt.value.image) === null || _a3 === void 0 ? null : _a3.width) !== null && _b2 !== void 0 ? _b2 : 36,
                  height: (_d2 = (_c2 = pt.value.image) === null || _c2 === void 0 ? null : _c2.height) !== null && _d2 !== void 0 ? _d2 : 36,
                  src: __props.image,
                  pt: new UTSJSONObject({
                    className: "mr-3 rounded-full ".concat((_e2 = pt.value.image) === null || _e2 === void 0 ? null : _e2.className)
                  })
                }), null, 8, ["width", "height", "src", "pt"])) : vue.createCommentVNode("", true)
              ];
            }),
            __props.label != "" ? (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
              key: 0,
              pt: new UTSJSONObject({
                className: vue.unref(parseClass)([
                  "cl-list-item__label whitespace-nowrap overflow-visible",
                  [__props.justify == "start", "w-24"],
                  (_c = pt.value.label) === null || _c === void 0 ? null : _c.className
                ])
              })
            }), new UTSJSONObject({
              default: vue.withCtx(() => {
                return [
                  vue.createTextVNode(vue.toDisplayString(__props.label), 1)
                ];
              }),
              _: 1
            }), 8, ["pt"])) : vue.createCommentVNode("", true),
            vue.createElementVNode("view", new UTSJSONObject({
              class: vue.normalizeClass(["cl-list-item__content", [
                new UTSJSONObject({}),
                new UTSJSONObject({
                  "justify-start": __props.justify == "start",
                  "justify-center": __props.justify == "center",
                  "justify-end": __props.justify == "end"
                }),
                (_d = pt.value.content) === null || _d === void 0 ? null : _d.className
              ]])
            }), [
              vue.renderSlot(_ctx.$slots, "default")
            ], 2),
            __props.arrow ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
              key: 1,
              name: "arrow-right-s-line",
              size: 36,
              pt: new UTSJSONObject({
                className: vue.unref(parseClass)([
                  "text-surface-400 ml-1 duration-200",
                  new UTSJSONObject({
                    "rotate-90": isCollapse.value
                  })
                ])
              })
            }), null, 8, ["pt"])) : vue.createCommentVNode("", true)
          ], 2),
          __props.swipeable ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
            key: 0,
            class: vue.normalizeClass([new UTSJSONObject({}), "cl-list-item__swipe", "cl-list-item__swipe-".concat(swipe.direction)])
          }), [
            vue.renderSlot(_ctx.$slots, "swipe-left"),
            vue.renderSlot(_ctx.$slots, "swipe-right")
          ], 2)) : vue.createCommentVNode("", true)
        ], 6),
        vue.createVNode(_component_cl_collapse, new UTSJSONObject({
          modelValue: isCollapse.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event = null) => {
            return isCollapse.value = $event;
          }),
          pt: new UTSJSONObject({
            className: vue.unref(parseClass)(["p--bracket-start-24rpx-bracket-end-", (_e = pt.value.collapse) === null || _e === void 0 ? null : _e.className])
          })
        }), {
          default: vue.withCtx(() => {
            return [
              vue.renderSlot(_ctx.$slots, "collapse")
            ];
          }),
          _: 3
        }, 8, ["modelValue", "pt"])
      ], 34);
    };
  } }));
  const _style_0$e = { "cl-list-item": { "": { "position": "relative", "display": "flex", "width": "100%", "flexDirection": "column" } }, "cl-list-item__wrapper": { "": { "width": "100%", "transitionProperty": "none", "overflow": "visible" }, ".is-transition": { "transitionDuration": "200ms", "transitionProperty": "transform" } }, "cl-list-item__inner": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "paddingTop": "24rpx", "paddingRight": "24rpx", "paddingBottom": "24rpx", "paddingLeft": "24rpx" } }, "cl-list-item__content": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "cl-list-item__swipe": { "": { "position": "absolute", "height": "100%" } }, "cl-list-item__swipe-left": { "": { "left": "100%", "transform": "translateX(1rpx)" } }, "cl-list-item__swipe-right": { "": { "right": "100%" } }, "cl-list-item--disabled": { "": { "opacity": 0.5 } }, "@TRANSITION": { "cl-list-item__wrapper": { "property": "transform", "duration": "200ms" } } };
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["styles", [_style_0$e]]]);
  let PassThrough$6 = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            list: { type: "Unknown", optional: true },
            item: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.list = this.__props__.list;
      this.item = this.__props__.item;
      delete this.__props__;
    }
  };
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-list"
  }, { __name: "cl-list", props: {
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    border: {
      type: Boolean,
      default: false
    }
  }, setup(__props) {
    const props = __props;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    return (_ctx = null, _cache = null) => {
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      const _component_cl_list_item = resolveEasycom(vue.resolveDynamicComponent("cl-list-item"), __easycom_1$1);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-list dark-colon--important-border-surface-700", [new UTSJSONObject({}), new UTSJSONObject({
          "cl-list--border": __props.border
        }), pt.value.className]])
      }), [
        vue.renderSlot(_ctx.$slots, "header", new UTSJSONObject({}), () => {
          return [
            __props.title != "" ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
              key: 0,
              class: "cl-list__title"
            }), vue.toDisplayString(__props.title), 1)) : vue.createCommentVNode("", true)
          ];
        }),
        vue.createElementVNode("view", new UTSJSONObject({ class: "cl-list__items" }), [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.list, (item, index) => {
            var _a, _b, _c, _d, _e;
            return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ key: index }), [
              vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                icon: item.icon,
                label: item.label,
                arrow: item.arrow,
                hoverable: item.hoverable,
                pt: new UTSJSONObject({
                  className: "bg-white dark-colon--important-bg-surface-700 ".concat((_a = pt.value.item) === null || _a === void 0 ? null : _a.className),
                  inner: (_b = pt.value.item) === null || _b === void 0 ? null : _b.inner,
                  label: (_c = pt.value.item) === null || _c === void 0 ? null : _c.label,
                  content: (_d = pt.value.item) === null || _d === void 0 ? null : _d.content,
                  icon: (_e = pt.value.item) === null || _e === void 0 ? null : _e.icon
                })
              }), {
                default: vue.withCtx(() => {
                  return [
                    vue.renderSlot(_ctx.$slots, "item", new UTSJSONObject({ item }), () => {
                      return [
                        vue.createVNode(_component_cl_text, null, {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(item.content), 1)
                            ];
                          }),
                          _: 2
                        }, 1024)
                      ];
                    })
                  ];
                }),
                _: 2
              }, 1032, ["icon", "label", "arrow", "hoverable", "pt"]),
              index != __props.list.length - 1 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                key: 0,
                class: "cl-list__line"
              }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "cl-list__line-inner" }))
              ])) : vue.createCommentVNode("", true)
            ]);
          }), 128)),
          vue.renderSlot(_ctx.$slots, "default")
        ])
      ], 2);
    };
  } }));
  const _style_0$d = { "cl-list": { "": { "transitionDuration": "200ms", "transitionProperty": "borderColor,backgroundColor" } }, "cl-list__title": { "": { "paddingBottom": "14rpx", "fontSize": "24.5rpx", "lineHeight": "35rpx", "color": "rgba(113,113,122,1)", "paddingLeft": "24rpx" } }, "cl-list__items": { "": { "overflow": "hidden", "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx", "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx" } }, "cl-list__line": { "": { "paddingTop": 0, "paddingRight": "24rpx", "paddingBottom": 0, "paddingLeft": "24rpx" } }, "cl-list__line-inner": { "": { "width": "100%", "backgroundColor": "rgba(250,250,250,1)", "height": "1rpx" } }, "cl-list--border": { "": { "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx", "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(228,228,231,1)", "borderRightColor": "rgba(228,228,231,1)", "borderBottomColor": "rgba(228,228,231,1)", "borderLeftColor": "rgba(228,228,231,1)" } }, "@TRANSITION": { "cl-list": { "duration": "200ms", "property": "borderColor,backgroundColor" } } };
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["styles", [_style_0$d]]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    __name: "my",
    setup(__props) {
      const user2 = useStore().user;
      const ui2 = useUi();
      function toLogout() {
        ui2.showConfirm({
          title: t("提示"),
          message: t("确定退出登录吗？"),
          callback(action) {
            if (action == "confirm") {
              user2.logout();
            }
          }
        });
      }
      vue.onReady(() => {
        user2.get();
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_avatar = resolveEasycom(vue.resolveDynamicComponent("cl-avatar"), _sfc_main$o);
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_list_item = resolveEasycom(vue.resolveDynamicComponent("cl-list-item"), __easycom_1$1);
        const _component_cl_list = resolveEasycom(vue.resolveDynamicComponent("cl-list"), __easycom_2$1);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            var _a;
            return [
              vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                fixed: "",
                height: 100,
                "show-back": false,
                "safe-area-top": "",
                "background-color": "transparent"
              })),
              vue.createElementVNode("view", new UTSJSONObject({ class: "p-3" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "flex flex-col justify-center items-center pt-6 pb-3" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "relative overflow-visible" }), [
                    vue.createVNode(_component_cl_avatar, new UTSJSONObject({
                      src: (_a = vue.unref(userInfo)) === null || _a === void 0 ? null : _a.avatarUrl,
                      size: 150,
                      pt: new UTSJSONObject({ className: "-important-rounded-3xl", icon: new UTSJSONObject({ size: 60 }) })
                    }), null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "flex-1 flex flex-col justify-center items-center w-full" }), [
                    vue.createVNode(_component_cl_text, new UTSJSONObject({ pt: new UTSJSONObject({ className: "-important-text-xl mt-5 mb-1 font-bold" }) }), {
                      default: vue.withCtx(() => {
                        var _a2, _b;
                        return [
                          vue.createTextVNode(vue.toDisplayString((_b = (_a2 = vue.unref(userInfo)) === null || _a2 === void 0 ? null : _a2.nickName) !== null && _b !== void 0 ? _b : vue.unref(t)("未登录")), 1)
                        ];
                      }),
                      _: 1
                    }),
                    !vue.unref(user2).isNull() ? (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
                      key: 0,
                      color: "info"
                    }), new UTSJSONObject({
                      default: vue.withCtx(() => {
                        var _a2;
                        return [
                          vue.createTextVNode(vue.toDisplayString((_a2 = vue.unref(userInfo)) === null || _a2 === void 0 ? null : _a2.mobile), 1)
                        ];
                      }),
                      _: 1
                    }))) : vue.createCommentVNode("", true)
                  ])
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "p-3" }), [
                  vue.createVNode(_component_cl_list, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mb-3" }) }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                          label: vue.unref(t)("通用设置"),
                          icon: "settings-line",
                          arrow: "",
                          hoverable: "",
                          onClick: _cache[0] || (_cache[0] = ($event = null) => {
                            return vue.unref(router).to("/pages/set/general");
                          })
                        }), null, 8, ["label"]),
                        vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                          label: vue.unref(t)("通知设置"),
                          icon: "notification-4-line",
                          arrow: "",
                          hoverable: "",
                          onClick: _cache[1] || (_cache[1] = ($event = null) => {
                            return vue.unref(router).to("/pages/set/notice");
                          })
                        }), null, 8, ["label"])
                      ];
                    }),
                    _: 1
                  }),
                  vue.createVNode(_component_cl_list, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mb-3" }) }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                          label: vue.unref($t)("关于{name}", new UTSJSONObject({ name: vue.unref(config).name })),
                          icon: "error-warning-line",
                          arrow: "",
                          hoverable: "",
                          pt: new UTSJSONObject({
                            label: new UTSJSONObject({
                              className: "flex-1"
                            })
                          }),
                          onClick: _cache[2] || (_cache[2] = ($event = null) => {
                            return vue.unref(router).to("/pages/set/about");
                          })
                        }), null, 8, ["label"]),
                        vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                          label: vue.unref(t)("联系客服"),
                          icon: "customer-service-line",
                          arrow: "",
                          hoverable: "",
                          onClick: _cache[3] || (_cache[3] = ($event = null) => {
                            return vue.unref(router).to("/pages/set/cs");
                          })
                        }), null, 8, ["label"])
                      ];
                    }),
                    _: 1
                  }),
                  vue.createVNode(_component_cl_list, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mb-3" }) }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                          hoverable: "",
                          justify: "center",
                          onClick: toLogout
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createVNode(_component_cl_text, new UTSJSONObject({ color: "error" }), {
                                default: vue.withCtx(() => {
                                  return [
                                    vue.createTextVNode(vue.toDisplayString(vue.unref(t)("退出登录")), 1)
                                  ];
                                }),
                                _: 1
                              })
                            ];
                          }),
                          _: 1
                        })
                      ];
                    }),
                    _: 1
                  })
                ])
              ]),
              vue.createVNode(vue.unref(CustomTabbar))
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _style_0$c = { "top-icon": { "": { "marginRight": "21rpx", "display": "flex", "alignItems": "center", "justifyContent": "center", "borderTopLeftRadius": "14rpx", "borderTopRightRadius": "14rpx", "borderBottomRightRadius": "14rpx", "borderBottomLeftRadius": "14rpx", "backgroundColor": "rgba(255,255,255,1)", "paddingTop": "14rpx", "paddingRight": "14rpx", "paddingBottom": "14rpx", "paddingLeft": "14rpx" } } };
  const PagesIndexMy = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["styles", [_style_0$c]]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const ui2 = useUi();
      const user2 = useStore().user;
      function toLogout() {
        ui2.showConfirm({
          title: t("提示"),
          message: t("确定退出登录吗？"),
          callback(action) {
            if (action == "confirm") {
              user2.logout();
            }
          }
        });
      }
      return (_ctx = null, _cache = null) => {
        const _component_cl_list_item = resolveEasycom(vue.resolveDynamicComponent("cl-list-item"), __easycom_1$1);
        const _component_cl_list = resolveEasycom(vue.resolveDynamicComponent("cl-list"), __easycom_2$1);
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("view", new UTSJSONObject({ class: "p-3" }), [
                vue.createVNode(_component_cl_list, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mb-3" }) }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                        label: vue.unref(t)("通用设置"),
                        icon: "settings-line",
                        arrow: "",
                        hoverable: "",
                        onClick: _cache[0] || (_cache[0] = ($event = null) => {
                          return vue.unref(router).to("/pages/set/general");
                        })
                      }), null, 8, ["label"]),
                      vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                        label: vue.unref(t)("通知设置"),
                        icon: "notification-4-line",
                        arrow: "",
                        hoverable: "",
                        onClick: _cache[1] || (_cache[1] = ($event = null) => {
                          return vue.unref(router).to("/pages/set/notice");
                        })
                      }), null, 8, ["label"])
                    ];
                  }),
                  _: 1
                }),
                vue.createVNode(_component_cl_list, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mb-3" }) }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                        label: vue.unref($t)("关于{name}", new UTSJSONObject({ name: vue.unref(config).name })),
                        icon: "error-warning-line",
                        arrow: "",
                        hoverable: "",
                        pt: new UTSJSONObject({
                          label: new UTSJSONObject({
                            className: "flex-1"
                          })
                        }),
                        onClick: _cache[2] || (_cache[2] = ($event = null) => {
                          return vue.unref(router).to("/pages/set/about");
                        })
                      }), null, 8, ["label"]),
                      vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                        label: vue.unref(t)("联系客服"),
                        icon: "customer-service-line",
                        arrow: "",
                        hoverable: "",
                        onClick: _cache[3] || (_cache[3] = ($event = null) => {
                          return vue.unref(router).to("/pages/set/cs");
                        })
                      }), null, 8, ["label"])
                    ];
                  }),
                  _: 1
                }),
                vue.createVNode(_component_cl_list, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mb-3" }) }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                        hoverable: "",
                        justify: "center",
                        onClick: toLogout
                      }), {
                        default: vue.withCtx(() => {
                          return [
                            vue.createVNode(_component_cl_text, new UTSJSONObject({ color: "error" }), {
                              default: vue.withCtx(() => {
                                return [
                                  vue.createTextVNode(vue.toDisplayString(vue.unref(t)("退出登录")), 1)
                                ];
                              }),
                              _: 1
                            })
                          ];
                        }),
                        _: 1
                      })
                    ];
                  }),
                  _: 1
                })
              ])
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "size-set"
  }, { __name: "size-set", setup(__props, _a) {
    var __expose = _a.expose;
    const selectRef = vue.ref(null);
    const list2 = [
      {
        label: "0.9",
        value: 0.9
      },
      {
        label: t$1("默认 1.0"),
        value: 1
      },
      {
        label: "1.1",
        value: 1.1
      },
      {
        label: "1.2",
        value: 1.2
      },
      {
        label: "1.3",
        value: 1.3
      },
      {
        label: "1.4",
        value: 1.4
      }
    ];
    const size = vue.ref(1);
    const visible = vue.ref(false);
    function open() {
      var _a2;
      visible.value = true;
      size.value = (_a2 = config$1.fontSize) !== null && _a2 !== void 0 ? _a2 : 1;
      selectRef.value.open((value = null) => {
        config$1.fontSize = value == 1 ? null : value;
      });
    }
    function close() {
      visible.value = false;
    }
    function onChanging(value) {
      size.value = value;
    }
    __expose({
      visible,
      open,
      close
    });
    return (_ctx = null, _cache = null) => {
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      const _component_cl_select = resolveEasycom(vue.resolveDynamicComponent("cl-select"), __easycom_1$3);
      return vue.openBlock(), vue.createBlock(_component_cl_select, new UTSJSONObject({
        ref_key: "selectRef",
        ref: selectRef,
        modelValue: size.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event = null) => {
          return size.value = $event;
        }),
        title: vue.unref(t$1)("全局字号"),
        options: list2,
        "show-trigger": false,
        onChanging
      }), new UTSJSONObject({
        prepend: vue.withCtx(() => {
          return [
            vue.createElementVNode("view", new UTSJSONObject({ class: "px-3 absolute top-0 left-0 z-10" }), [
              vue.createVNode(_component_cl_text, new UTSJSONObject({
                style: vue.normalizeStyle({
                  fontSize: 28 * size.value + "rpx"
                })
              }), {
                default: vue.withCtx(() => {
                  return [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(t$1)("这是一段示例文字，用于预览不同字号的效果。")), 1)
                  ];
                }),
                _: 1
              }, 8, ["style"])
            ])
          ];
        }),
        _: 1
      }), 8, ["modelValue", "title"]);
    };
  } }));
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "general",
    setup(__props) {
      const refs = useRefs();
      function setLocale2() {
        refs.open("localeSet");
      }
      function setSize() {
        refs.open("sizeSet");
      }
      return (_ctx = null, _cache = null) => {
        const _component_cl_list_item = resolveEasycom(vue.resolveDynamicComponent("cl-list-item"), __easycom_1$1);
        const _component_cl_list = resolveEasycom(vue.resolveDynamicComponent("cl-list"), __easycom_2$1);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("view", new UTSJSONObject({ class: "p-3" }), [
                vue.createVNode(_component_cl_list, null, {
                  default: vue.withCtx(() => {
                    return [
                      vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                        label: vue.unref(t)("多语言"),
                        arrow: "",
                        hoverable: "",
                        onClick: setLocale2
                      }), null, 8, ["label"]),
                      vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                        label: vue.unref(t)("字体大小"),
                        arrow: "",
                        hoverable: "",
                        onClick: setSize
                      }), null, 8, ["label"])
                    ];
                  }),
                  _: 1
                })
              ]),
              vue.createVNode(vue.unref(_sfc_main$B), new UTSJSONObject({
                ref: vue.unref(refs).set("localeSet")
              }), null, 512),
              vue.createVNode(vue.unref(_sfc_main$i), new UTSJSONObject({
                ref: vue.unref(refs).set("sizeSet")
              }), null, 512)
            ];
          }),
          _: 1
        }));
      };
    }
  });
  let PassThrough$5 = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            track: { type: "Unknown", optional: true },
            thumb: { type: "Unknown", optional: true },
            label: { type: "Unknown", optional: true },
            loading: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.track = this.__props__.track;
      this.thumb = this.__props__.thumb;
      this.label = this.__props__.label;
      this.loading = this.__props__.loading;
      delete this.__props__;
    }
  };
  class Rect extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            height: { type: String, optional: false },
            width: { type: String, optional: false },
            size: { type: String, optional: false },
            left: { type: String, optional: false },
            translateX: { type: String, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Rect.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.height = this.__props__.height;
      this.width = this.__props__.width;
      this.size = this.__props__.size;
      this.left = this.__props__.left;
      this.translateX = this.__props__.translateX;
      delete this.__props__;
    }
  }
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-switch"
  }, { __name: "cl-switch", props: {
    // 透传样式配置
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 绑定值 - 开关状态
    modelValue: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 高度
    height: {
      type: Number,
      default: 48
    },
    // 宽度
    width: {
      type: Number,
      default: 80
    }
  }, emits: ["update:modelValue", "change"], setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const disabled = useForm().disabled;
    const isDisabled = vue.computed(() => {
      return props.disabled || disabled.value;
    });
    const value = vue.ref(props.modelValue);
    const isChecked = vue.computed(() => {
      return value.value;
    });
    const rect = vue.computed(() => {
      const height = props.height;
      const width = props.width;
      const size = height - 8;
      const left = 4;
      const translateX = width - height;
      return new Rect({
        height: height + "rpx",
        width: width + "rpx",
        size: size + "rpx",
        left: left + "rpx",
        translateX: isAppIOS() ? rpx2px(translateX) + "px" : "".concat(translateX, "rpx")
      });
    });
    function onTap() {
      if (!isDisabled.value && !props.loading) {
        const val = !value.value;
        value.value = val;
        emit("update:modelValue", val);
        emit("change", val);
      }
    }
    vue.watch(vue.computed(() => {
      return props.modelValue;
    }), (val) => {
      value.value = val;
    });
    return (_ctx = null, _cache = null) => {
      var _a2, _b, _c;
      const _component_cl_loading = resolveEasycom(vue.resolveDynamicComponent("cl-loading"), __easycom_0$7);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-switch", [new UTSJSONObject({}), new UTSJSONObject({
          "cl-switch--disabled": isDisabled.value,
          "cl-switch--checked": isChecked.value
        }), pt.value.className]]),
        onClick: onTap
      }), [
        vue.createElementVNode("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-switch__track", [
            new UTSJSONObject({}),
            new UTSJSONObject({
              "is-checked": isChecked.value,
              "is-dark": vue.unref(isDark)
            }),
            (_a2 = pt.value.track) === null || _a2 === void 0 ? null : _a2.className
          ]]),
          style: vue.normalizeStyle({
            height: rect.value.height,
            width: rect.value.width
          })
        }), [
          vue.createElementVNode("view", new UTSJSONObject({
            class: vue.normalizeClass(["cl-switch__thumb", [new UTSJSONObject({}), (_b = pt.value.thumb) === null || _b === void 0 ? null : _b.className]]),
            style: vue.normalizeStyle({
              height: rect.value.size,
              width: rect.value.size,
              left: rect.value.left,
              transform: "translateX(".concat(isChecked.value ? rect.value.translateX : 0, ")")
            })
          }), [
            __props.loading ? (vue.openBlock(), vue.createBlock(_component_cl_loading, new UTSJSONObject({
              key: 0,
              size: 24,
              color: "primary",
              pt: new UTSJSONObject({
                className: vue.unref(parseClass)([(_c = pt.value.loading) === null || _c === void 0 ? null : _c.className])
              })
            }), null, 8, ["pt"])) : vue.createCommentVNode("", true)
          ], 6)
        ], 6)
      ], 2);
    };
  } }));
  const _style_0$b = { "cl-switch": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "opacity": 1, "transitionDuration": "200ms" }, ".cl-switch--disabled": { "opacity": 0.5 } }, "cl-switch__track": { "": { "position": "relative", "display": "flex", "flexDirection": "row", "alignItems": "center", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999, "transitionDuration": "200ms", "backgroundColor": "rgba(228,228,231,1)" }, ".is-dark": { "backgroundColor": "rgba(113,113,122,1)" }, ".is-checked": { "backgroundColor": "rgba(20,184,166,1)" } }, "cl-switch__thumb": { "": { "position": "absolute", "display": "flex", "alignItems": "center", "justifyContent": "center", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999, "backgroundColor": "rgba(255,255,255,1)", "transitionDuration": "300ms" } }, "@TRANSITION": { "cl-switch": { "duration": "200ms" }, "cl-switch__track": { "duration": "200ms" }, "cl-switch__thumb": { "duration": "300ms" } } };
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["styles", [_style_0$b]]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "notice",
    setup(__props) {
      function onNotifyChange(val) {
        changeNotify(val);
      }
      return (_ctx = null, _cache = null) => {
        const _component_cl_switch = resolveEasycom(vue.resolveDynamicComponent("cl-switch"), __easycom_0$2);
        const _component_cl_list_item = resolveEasycom(vue.resolveDynamicComponent("cl-list-item"), __easycom_1$1);
        const _component_cl_list = resolveEasycom(vue.resolveDynamicComponent("cl-list"), __easycom_2$1);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("view", new UTSJSONObject({ class: "p-3" }), [
                vue.createVNode(_component_cl_list, null, {
                  default: vue.withCtx(() => {
                    return [
                      vue.createVNode(_component_cl_list_item, new UTSJSONObject({
                        label: vue.unref(t)("开启通知")
                      }), {
                        default: vue.withCtx(() => {
                          return [
                            vue.createVNode(_component_cl_switch, new UTSJSONObject({
                              modelValue: vue.unref(notify_enable),
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event = null) => {
                                return vue.isRef(notify_enable) ? notify_enable.value = $event : null;
                              }),
                              onChange: onNotifyChange
                            }), null, 8, ["modelValue"])
                          ];
                        }),
                        _: 1
                      }, 8, ["label"])
                    ];
                  }),
                  _: 1
                })
              ])
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "about",
    setup(__props) {
      vue.onReady(() => {
        uni.setNavigationBarTitle({
          title: $t("关于{name}", new UTSJSONObject({ name: config.name }))
        });
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("view", new UTSJSONObject({ class: "p-3" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "flex flex-col items-center justify-center py-10" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "p-3" }), [
                    vue.createVNode(_component_cl_image, new UTSJSONObject({
                      src: "/static/logo.png",
                      height: 120,
                      width: 120
                    }))
                  ]),
                  vue.createVNode(_component_cl_text, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mt-3 mb-1" }) }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(vue.unref(config).name), 1)
                      ];
                    }),
                    _: 1
                  }),
                  vue.createVNode(_component_cl_text, new UTSJSONObject({
                    color: "info",
                    pt: new UTSJSONObject({
                      className: "-important-text-xs"
                    })
                  }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode("version " + vue.toDisplayString(vue.unref(config).version), 1)
                      ];
                    }),
                    _: 1
                  })
                ])
              ])
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "cs",
    setup(__props) {
      const ui2 = useUi();
      function saveImage() {
        uni.saveImageToPhotosAlbum({
          filePath: "/static/cs.png",
          success: () => {
            ui2.showToast({
              message: "保存成功"
            });
          }
        });
      }
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
        const _component_cl_button = resolveEasycom(vue.resolveDynamicComponent("cl-button"), __easycom_4);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("view", new UTSJSONObject({ class: "p-10 flex flex-col items-center justify-center" }), [
                vue.createVNode(_component_cl_text, new UTSJSONObject({ pt: new UTSJSONObject({ className: "text-center mb-5" }) }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createTextVNode("专注工业控制解决方案")
                    ];
                  }),
                  _: 1
                }),
                vue.createElementVNode("view", new UTSJSONObject({ class: "p-2 bg-white mb-5 rounded-xl" }), [
                  vue.createVNode(_component_cl_image, new UTSJSONObject({
                    src: "/static/cs.png",
                    height: 320,
                    width: 320,
                    "show-menu-by-longpress": ""
                  }))
                ]),
                vue.createVNode(_component_cl_button, new UTSJSONObject({
                  type: "light",
                  icon: "download-line",
                  onClick: saveImage
                }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createTextVNode("保存图片")
                    ];
                  }),
                  _: 1
                })
              ])
            ];
          }),
          _: 1
        }));
      };
    }
  });
  let PassThrough$4 = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            inner: { type: "Unknown", optional: true },
            prefixIcon: { type: "Unknown", optional: true },
            suffixIcon: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.inner = this.__props__.inner;
      this.prefixIcon = this.__props__.prefixIcon;
      this.suffixIcon = this.__props__.suffixIcon;
      delete this.__props__;
    }
  };
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-input"
  }, { __name: "cl-input", props: {
    // 透传样式
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 绑定值
    modelValue: {
      type: String,
      default: ""
    },
    // 输入框类型
    type: {
      type: String,
      default: "text"
    },
    // 前缀图标
    prefixIcon: {
      type: String,
      default: ""
    },
    // 后缀图标
    suffixIcon: {
      type: String,
      default: ""
    },
    // 是否密码框
    password: {
      type: Boolean,
      default: false
    },
    // 是否自动聚焦
    autofocus: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: null
    },
    // 占位符
    placeholder: {
      type: String,
      default: () => {
        return t$1("请输入");
      }
    },
    // 占位符样式类
    placeholderClass: {
      type: String,
      default: ""
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: false
    },
    // 光标与键盘的距离
    cursorSpacing: {
      type: Number,
      default: 5
    },
    // 点击键盘确认按钮时是否保持键盘不收起
    confirmHold: {
      type: Boolean,
      default: false
    },
    // 设置键盘右下角按钮的文字
    confirmType: {
      type: String,
      default: "done"
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: true
    },
    // 最大输入长度
    maxlength: {
      type: Number,
      default: 140
    },
    // 是否保持键盘不收起
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    // 保留精度
    precision: {
      type: Number,
      default: 0
    }
  }, emits: [
    "update:modelValue",
    "input",
    "change",
    "focus",
    "blur",
    "confirm",
    "clear",
    "keyboardheightchange"
  ], setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const disabled = useForm().disabled;
    const isError = useFormItem().isError;
    const isDisabled = vue.computed(() => {
      return disabled.value || props.disabled;
    });
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const _b = useSize(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = pt.value.inner) === null || _a2 === void 0 ? null : _a2.className) !== null && _b2 !== void 0 ? _b2 : "";
    }), ptClassName = _b.ptClassName, getSize = _b.getSize;
    const inputStyle = vue.computed(() => {
      const style = new UTSJSONObject({});
      const fontSize = getSize(null);
      if (fontSize != null) {
        style["fontSize"] = fontSize;
      }
      return style;
    });
    const value = vue.ref("");
    const isFocus = vue.ref(props.autofocus);
    const showClear = vue.computed(() => {
      return isFocus.value && props.clearable && value.value != "";
    });
    const isPassword = vue.ref(props.password);
    const isExceed = vue.computed(() => {
      if (props.type == "digit" && props.precision >= 0 && value.value != "") {
        const parts = value.value.split(".");
        return parts.length > 1 && parts[1].length > props.precision;
      } else {
        return false;
      }
    });
    function showPassword() {
      isPassword.value = !isPassword.value;
    }
    function onFocus(e) {
      isFocus.value = true;
      emit("focus", e);
    }
    function onBlur(e) {
      emit("blur", e);
      if (props.type == "digit" && props.precision > 0 && value.value != "") {
        const numValue = parseFloat(value.value);
        if (!isNaN(numValue)) {
          const formattedValue = numValue.toFixed(props.precision);
          value.value = formattedValue;
          emit("update:modelValue", formattedValue);
          emit("change", formattedValue);
        }
      }
      setTimeout(() => {
        isFocus.value = false;
      }, 0);
    }
    function onInput(e) {
      const v1 = e.detail.value;
      const v2 = value.value;
      value.value = v1;
      emit("update:modelValue", v1);
      emit("input", e);
      if (v1 != v2) {
        emit("change", v1);
      }
    }
    function onConfirm(e) {
      emit("confirm", e);
    }
    function onKeyboardheightchange(e) {
      emit("keyboardheightchange", e);
    }
    function onTap() {
      if (isDisabled.value) {
        return null;
      }
      isFocus.value = true;
    }
    function focus() {
      setTimeout(() => {
        isFocus.value = false;
        vue.nextTick(() => {
          isFocus.value = true;
        });
      }, 0);
    }
    function clear() {
      value.value = "";
      emit("update:modelValue", "");
      emit("change", "");
      emit("clear");
    }
    vue.watch(vue.computed(() => {
      return props.modelValue;
    }), (val) => {
      value.value = val;
    }, {
      immediate: true
    });
    __expose({
      isFocus,
      focus,
      clear
    });
    return (_ctx = null, _cache = null) => {
      var _a2, _b2, _c, _d, _e, _f, _g;
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-input", [new UTSJSONObject({}), pt.value.className, new UTSJSONObject({
          "is-dark": vue.unref(isDark),
          "cl-input--border": __props.border,
          "cl-input--focus": isFocus.value,
          "cl-input--disabled": isDisabled.value,
          "cl-input--error": vue.unref(isError)
        })]]),
        onClick: onTap
      }), [
        vue.renderSlot(_ctx.$slots, "prepend"),
        __props.prefixIcon ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 0,
          class: "cl-input__icon -important-pl-0 pr--bracket-start-12rpx-bracket-end-"
        }), [
          vue.createVNode(_component_cl_icon, new UTSJSONObject({
            name: __props.prefixIcon,
            size: (_b2 = (_a2 = pt.value.prefixIcon) === null || _a2 === void 0 ? null : _a2.size) !== null && _b2 !== void 0 ? _b2 : 32,
            pt: new UTSJSONObject({ className: vue.unref(parseClass)([(_c = pt.value.prefixIcon) === null || _c === void 0 ? null : _c.className]) })
          }), null, 8, ["name", "size", "pt"])
        ])) : vue.createCommentVNode("", true),
        vue.createElementVNode("input", new UTSJSONObject({
          class: vue.normalizeClass(["cl-input__inner", [new UTSJSONObject({}), new UTSJSONObject({
            "is-disabled": isDisabled.value,
            "is-dark": vue.unref(isDark),
            "is-exceed": isExceed.value
          }), vue.unref(ptClassName)]]),
          style: vue.normalizeStyle(inputStyle.value),
          value: value.value,
          disabled: (_d = __props.readonly) !== null && _d !== void 0 ? _d : isDisabled.value,
          type: __props.type,
          password: isPassword.value,
          focus: isFocus.value,
          placeholder: __props.placeholder,
          "placeholder-class": "text-surface-400 ".concat(__props.placeholderClass),
          maxlength: __props.maxlength,
          "cursor-spacing": __props.cursorSpacing,
          "confirm-type": __props.confirmType,
          "confirm-hold": __props.confirmHold,
          "adjust-position": __props.adjustPosition,
          "hold-keyboard": __props.holdKeyboard,
          onInput,
          onFocus,
          onBlur,
          onConfirm,
          onKeyboardheightchange
        }), null, 46, ["value", "disabled", "type", "password", "focus", "placeholder", "placeholder-class", "maxlength", "cursor-spacing", "confirm-type", "confirm-hold", "adjust-position", "hold-keyboard"]),
        __props.suffixIcon ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 1,
          class: "cl-input__icon"
        }), [
          vue.createVNode(_component_cl_icon, new UTSJSONObject({
            name: __props.suffixIcon,
            size: (_f = (_e = pt.value.suffixIcon) === null || _e === void 0 ? null : _e.size) !== null && _f !== void 0 ? _f : 32,
            pt: new UTSJSONObject({ className: vue.unref(parseClass)([(_g = pt.value.prefixIcon) === null || _g === void 0 ? null : _g.className]) })
          }), null, 8, ["name", "size", "pt"])
        ])) : vue.createCommentVNode("", true),
        showClear.value ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 2,
          class: "cl-input__icon",
          onClick: clear
        }), [
          vue.createVNode(_component_cl_icon, new UTSJSONObject({
            name: "close-circle-fill",
            size: 32,
            pt: new UTSJSONObject({ className: "-important-text-surface-400" })
          }))
        ])) : vue.createCommentVNode("", true),
        __props.password ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 3,
          class: "cl-input__icon",
          onClick: showPassword
        }), [
          vue.createVNode(_component_cl_icon, new UTSJSONObject({
            name: isPassword.value ? "eye-line" : "eye-off-line",
            size: 32,
            pt: new UTSJSONObject({ className: "-important-text-surface-300" })
          }), null, 8, ["name"])
        ])) : vue.createCommentVNode("", true),
        vue.renderSlot(_ctx.$slots, "append")
      ], 2);
    };
  } }));
  const _style_0$a = { "cl-input": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "backgroundColor": "rgba(255,255,255,1)", "transitionDuration": "200ms", "borderTopLeftRadius": "14rpx", "borderTopRightRadius": "14rpx", "borderBottomRightRadius": "14rpx", "borderBottomLeftRadius": "14rpx", "height": "66rpx", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "transitionProperty": "backgroundColor,borderColor" }, ".is-dark": { "backgroundColor": "rgba(39,39,42,1)" }, ".is-dark.cl-input--border": { "borderTopColor": "rgba(82,82,91,1)", "borderRightColor": "rgba(82,82,91,1)", "borderBottomColor": "rgba(82,82,91,1)", "borderLeftColor": "rgba(82,82,91,1)" }, ".is-dark.cl-input--border.cl-input--focus": { "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)" }, ".is-dark.cl-input--disabled": { "backgroundColor": "rgba(63,63,70,1)" } }, "cl-input__inner": { "": { "height": "100%", "color": "rgba(63,63,70,1)", "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "fontSize": "28rpx" }, ".is-dark": { "color": "rgba(255,255,255,1)" }, ".is-exceed": { "color": "rgba(239,68,68,1)" }, ".is-exceed.is-dark": { "color": "rgba(248,113,113,1)" } }, "cl-input__icon": { "": { "display": "flex", "height": "100%", "alignItems": "center", "justifyContent": "center", "paddingLeft": "20rpx" } }, "cl-input--border": { "": { "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(228,228,231,1)", "borderRightColor": "rgba(228,228,231,1)", "borderBottomColor": "rgba(228,228,231,1)", "borderLeftColor": "rgba(228,228,231,1)" } }, "cl-input--disabled": { "": { "backgroundColor": "rgba(244,244,245,1)", "opacity": 0.7 } }, "cl-input--focus": { ".cl-input--border": { "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)" } }, "cl-input--error": { "": { "borderTopColor": "rgba(239,68,68,1)", "borderRightColor": "rgba(239,68,68,1)", "borderBottomColor": "rgba(239,68,68,1)", "borderLeftColor": "rgba(239,68,68,1)" } }, "@TRANSITION": { "cl-input": { "duration": "200ms", "property": "backgroundColor,borderColor" } } };
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["styles", [_style_0$a]]]);
  function base64Encode(str) {
    return btoa(str);
  }
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "account",
    props: {
      form: {
        type: Object,
        default: () => {
          return new UTSJSONObject({});
        }
      }
    },
    emits: ["success"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const props = __props;
      const captchaUrl = vue.ref("");
      const captchaKey = vue.ref("");
      const emit = __emit;
      const ui2 = useUi();
      const loading = vue.ref(false);
      const disabled = vue.computed(() => {
        return props.form.username == "" || props.form.password == "" || props.form.captcha == "";
      });
      function loadCaptcha() {
        let uuid = Date.now().toString();
        captchaKey.value = uuid;
        request({
          url: "".concat(apiPath.captcha, "?uuid=").concat(uuid),
          method: "GET"
        }).then((res = null) => {
          captchaUrl.value = res;
        });
      }
      loadCaptcha();
      function toLogin() {
        const _a2 = props.form, username = _a2.username, password = _a2.password, captcha = _a2.captcha;
        loading.value = true;
        const basicAuth = base64Encode("".concat(authParam.client_id, ":").concat(authParam.client_sc));
        request({
          url: apiPath.auth_token,
          method: "POST",
          header: new UTSJSONObject({
            "content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": true,
            "Authorization": "Basic ".concat(basicAuth)
          }),
          data: new UTSJSONObject({
            client_id: authParam.client_id,
            grant_type: "captcha",
            username,
            password,
            captcha: captchaKey.value + "-" + captcha
          })
        }).then((res = null) => {
          if (res != null) {
            const r = parse$1(res);
            if (r != null) {
              emit("success", r);
            }
          }
        }).catch((err = null) => {
          loadCaptcha();
          if (err == null) {
            return null;
          }
          const e = parse$1(err);
          if (e == null) {
            return null;
          }
          ui2.showToast({
            message: e.msg,
            msgNotifier: e.msg
          });
        });
        loading.value = false;
      }
      return (_ctx = null, _cache = null) => {
        const _component_cl_input = resolveEasycom(vue.resolveDynamicComponent("cl-input"), __easycom_0$1);
        const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
        const _component_cl_button = resolveEasycom(vue.resolveDynamicComponent("cl-button"), __easycom_4);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "flex flex-col" }), [
          vue.createElementVNode("view", new UTSJSONObject({ class: "mb-3 flex flex-row" }), [
            vue.createVNode(_component_cl_input, new UTSJSONObject({
              modelValue: __props.form.username,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event = null) => {
                return __props.form.username = $event;
              }),
              "prefix-icon": "device-fill",
              placeholder: vue.unref(t)("请输入账户"),
              border: false,
              pt: new UTSJSONObject({
                className: vue.unref(parseClass)([
                  "-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4",
                  [vue.unref(isDark), "-important-bg-surface-70", "-important-bg-white"]
                ]),
                prefixIcon: new UTSJSONObject({
                  className: "mr-1"
                })
              })
            }), null, 8, ["modelValue", "placeholder", "pt"])
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "relative flex flex-row items-center mb-5" }), [
            vue.createVNode(_component_cl_input, new UTSJSONObject({
              password: "",
              modelValue: __props.form.password,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event = null) => {
                return __props.form.password = $event;
              }),
              clearable: false,
              "prefix-icon": "shield-check-fill",
              placeholder: vue.unref(t)("请输入密码"),
              border: false,
              pt: new UTSJSONObject({
                className: vue.unref(parseClass)([
                  "-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4",
                  [vue.unref(isDark), "-important-bg-surface-70", "-important-bg-white"]
                ]),
                prefixIcon: new UTSJSONObject({
                  className: "mr-1"
                })
              })
            }), null, 8, ["modelValue", "placeholder", "pt"])
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "relative flex flex-row items-center mb-5" }), [
            vue.createVNode(_component_cl_input, new UTSJSONObject({
              class: "captchaInput",
              modelValue: __props.form.captcha,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event = null) => {
                return __props.form.captcha = $event;
              }),
              clearable: false,
              "prefix-icon": "profile-fill",
              placeholder: vue.unref(t)("请输入验证码"),
              maxlength: 5,
              border: false,
              pt: new UTSJSONObject({
                className: vue.unref(parseClass)([
                  "-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4",
                  [vue.unref(isDark), "-important-bg-surface-70", "-important-bg-white"]
                ]),
                prefixIcon: new UTSJSONObject({
                  className: "mr-1"
                })
              })
            }), null, 8, ["modelValue", "placeholder", "pt"]),
            vue.createVNode(_component_cl_image, new UTSJSONObject({
              src: captchaUrl.value,
              onClick: loadCaptcha,
              class: "captcha-img",
              mode: "aspectFit"
            }), {
              error: vue.withCtx(() => {
                return [
                  vue.createElementVNode("text", null, "loading")
                ];
              }),
              _: 1
            }, 8, ["src"])
          ]),
          vue.createVNode(_component_cl_button, new UTSJSONObject({
            pt: new UTSJSONObject({
              className: "-important-h--bracket-start-90rpx-bracket-end- -important-rounded-xl"
            }),
            loading: loading.value,
            disabled: disabled.value,
            onClick: toLogin
          }), {
            default: vue.withCtx(() => {
              return [
                vue.createTextVNode(vue.toDisplayString(vue.unref(t)("登录")), 1)
              ];
            }),
            _: 1
          }, 8, ["loading", "disabled"])
        ]);
      };
    }
  });
  const _style_0$9 = { "captchaInput": { "": { "width": "70%" } }, "captcha-img": { "": { "width": "30%", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "display": "flex", "height": "100%" } } };
  const LoginAccount = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["styles", [_style_0$9]]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props) {
      const user2 = useStore().user;
      const form = vue.reactive({
        username: "",
        password: "",
        captcha: ""
      });
      function toLogin(res) {
        return __awaiter(this, void 0, void 0, function* () {
          let token = {
            token: res.token_type + " " + res.access_token,
            expire: res.expires_in,
            refreshToken: "",
            refreshExpire: 0
          };
          user2.setToken(token);
          user2.get().then((r = null) => {
            router.nextLogin();
          });
        });
      }
      return (_ctx = null, _cache = null) => {
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                "safe-area-top": "",
                "background-color": "transparent"
              })),
              vue.createElementVNode("view", new UTSJSONObject({ class: "px-10" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "flex flex-col items-center justify-center py-20" }), [
                  vue.createElementVNode("view", null, [
                    vue.createVNode(_component_cl_image, new UTSJSONObject({
                      src: "/static/logo.png",
                      mode: "widthFix",
                      width: 120,
                      height: 120
                    }))
                  ]),
                  vue.createVNode(_component_cl_text, new UTSJSONObject({ pt: new UTSJSONObject({ className: "text-xl font-bold mt-3" }) }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(vue.unref(config).name), 1)
                      ];
                    }),
                    _: 1
                  })
                ]),
                vue.createVNode(vue.unref(LoginAccount), new UTSJSONObject({
                  form,
                  onSuccess: toLogin
                }), null, 8, ["form"])
              ])
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _style_0$8 = { "login-item": { "": { "marginLeft": "14rpx", "marginRight": "14rpx", "display": "flex", "alignItems": "center", "justifyContent": "center", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999, "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(244,244,245,1)", "borderRightColor": "rgba(244,244,245,1)", "borderBottomColor": "rgba(244,244,245,1)", "borderLeftColor": "rgba(244,244,245,1)", "backgroundColor": "rgba(255,255,255,1)", "paddingTop": "14rpx", "paddingRight": "14rpx", "paddingBottom": "14rpx", "paddingLeft": "14rpx" }, ".is-dark": { "borderTopColor": "rgba(82,82,91,1)", "borderRightColor": "rgba(82,82,91,1)", "borderBottomColor": "rgba(82,82,91,1)", "borderLeftColor": "rgba(82,82,91,1)", "backgroundColor": "rgba(63,63,70,1)" } } };
  const PagesUserLogin = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["styles", [_style_0$8]]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "equip_detail",
    setup(__props) {
      useRefs();
      let equipId = "";
      const equip = vue.ref({
        id: "-1",
        selfCode: "-1",
        name: t("无法识别"),
        type: 0,
        runState: 0,
        alarmState: 0,
        onlineState: 0
      });
      function loadDetail() {
        request({
          url: apiPath.equip_realtime,
          method: "GET",
          data: new UTSJSONObject({
            id: equipId
          })
        }).then((res = null) => {
          if (res === null) {
            return null;
          }
          let r = parseData(res);
          if (r != null) {
            equip.value = r;
          }
        });
      }
      function typeImage(equip2) {
        return equipImage(equip2);
      }
      vue.onLoad((options) => {
        if (options == null) {
          return null;
        }
        equipId = options.id;
        loadDetail();
      });
      function toEquipHistory() {
        router.to("/pages/equip/equip_collect?sn=" + equip.value.selfCode);
      }
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_button = resolveEasycom(vue.resolveDynamicComponent("cl-button"), __easycom_4);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createElementBlock("scroll-view", new UTSJSONObject({
          style: new UTSJSONObject({ flex: 1 }),
          "scroll-with-animation": true
        }), [
          vue.createVNode(_component_cl_page, null, {
            default: vue.withCtx(() => {
              var _a;
              return [
                vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                  fixed: "",
                  "background-color": vue.unref(isDark) ? "black" : "white",
                  "show-back": true,
                  "safe-area-top": "",
                  height: vue.unref(isMp)() ? null : 100,
                  pt: new UTSJSONObject({
                    className: "-important-z-50"
                  })
                }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createElementVNode("view", new UTSJSONObject({
                        class: vue.normalizeClass(["flex flex-row items-center justify-center p-3 flex-1 w-full", new UTSJSONObject({
                          "pt-0": vue.unref(isMp)()
                        })])
                      }), [
                        vue.createVNode(_component_cl_text, new UTSJSONObject({
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-xl ml-2"
                          })
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(equip.value.name), 1)
                            ];
                          }),
                          _: 1
                        })
                      ], 2)
                    ];
                  }),
                  _: 1
                }, 8, ["background-color", "height"]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "header" }), [
                  vue.createElementVNode("image", new UTSJSONObject({
                    src: typeImage(equip.value),
                    mode: "aspectFill",
                    class: "header-img"
                  }), null, 8, ["src"]),
                  vue.createVNode(vue.unref(EquipBadge), new UTSJSONObject({
                    equip: equip.value,
                    class: "-important-text-xl"
                  }), null, 8, ["equip"]),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "header-info" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "device-name" }), vue.toDisplayString(equip.value.name), 1),
                    vue.createElementVNode("text", new UTSJSONObject({ class: "workshop-name" }), vue.toDisplayString((_a = equip.value.workshop) === null || _a === void 0 ? null : _a.name), 1),
                    vue.createElementVNode("text", new UTSJSONObject({ class: "device-sn" }), vue.toDisplayString(equip.value.selfCode), 1)
                  ])
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "status-card" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "status-item" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "label" }), vue.toDisplayString(vue.unref(t)("在线状态")), 1),
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["dot shadow", equip.value.onlineState == 1 ? "online" : "offline"])
                    }), null, 2)
                  ]),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "status-item" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "label" }), vue.toDisplayString(vue.unref(t)("运行状态")), 1),
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["dot shadow", equip.value.onlineState == 0 ? "offline" : equip.value.runState == 1 ? "run" : "stopped"])
                    }), null, 2)
                  ]),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "status-item" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "label" }), vue.toDisplayString(vue.unref(t)("报警状态")), 1),
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["dot shadow", equip.value.onlineState == 0 ? "offline" : equip.value.alarmState == 1 ? "alarm" : "offline"])
                    }), null, 2)
                  ])
                ]),
                equip.value.alarmTexts != null && equip.value.alarmTexts.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  key: 0,
                  class: "attr-card"
                }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "card-title" }), vue.toDisplayString(vue.unref(t)("实时报警")), 1),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(equip.value.alarmTexts, (i2, idx2) => {
                    return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                      key: idx2,
                      class: "attr-item"
                    }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "text-red-500" }), vue.toDisplayString(i2), 1)
                    ]);
                  }), 128))
                ])) : vue.createCommentVNode("", true),
                equip.value.attrs != null && equip.value.attrs.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  key: 1,
                  class: "attr-card"
                }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "card-title" }), vue.toDisplayString(vue.unref(t)("实时数据")), 1),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(equip.value.attrs, (i, idx) => {
                    return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                      key: idx,
                      class: "attr-item"
                    }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), vue.toDisplayString(i.name), 1),
                      vue.createElementVNode("text", new UTSJSONObject({ class: "value" }), vue.toDisplayString(i.value == null ? vue.unref(t)("暂未获取") : i.value), 1)
                    ]);
                  }), 128))
                ])) : vue.createCommentVNode("", true),
                equip.value.attrs != null && equip.value.attrs.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  key: 2,
                  class: "action-bar"
                }), [
                  vue.createVNode(_component_cl_button, new UTSJSONObject({
                    size: "large",
                    rounded: "",
                    onClick: toEquipHistory
                  }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(vue.unref(t)("历史曲线")), 1)
                      ];
                    }),
                    _: 1
                  })
                ])) : vue.createCommentVNode("", true)
              ];
            }),
            _: 1
          })
        ]);
      };
    }
  });
  const _style_0$7 = { "run": { "": { "backgroundImage": "none", "backgroundColor": "#52c41a" }, ".shadow": { "boxShadow": "0 0 6px rgba(82, 196, 26, 0.6)" } }, "stopped": { "": { "backgroundImage": "none", "backgroundColor": "#FAAD14" }, ".shadow": { "boxShadow": "0 0 6px rgba(250, 173, 20, 0.6)" } }, "online": { "": { "backgroundImage": "none", "backgroundColor": "#1890ff" }, ".shadow": { "boxShadow": "0 0 6px rgba(24, 144, 255, 0.6)" } }, "alarm": { "": { "backgroundImage": "none", "backgroundColor": "#ff4d4f" }, ".shadow": { "boxShadow": "0 0 6px rgba(255, 77, 79, 0.8)" } }, "offline": { "": { "backgroundImage": "none", "backgroundColor": "#bfbfbf" } }, "device-detail": { "": { "backgroundImage": "none", "backgroundColor": "#f6f7f9" } }, "header": { "": { "height": "420rpx", "position": "relative", "marginTop": "35rpx" } }, "header-img": { ".header ": { "height": "100%", "width": "100%" } }, "header-info": { ".header ": { "backgroundImage": "none", "backgroundColor": "rgba(220,220,220,0.8)", "position": "absolute", "bottom": 0, "left": 0, "width": "100%", "paddingTop": "14rpx", "paddingBottom": "14rpx", "paddingLeft": "21rpx", "paddingRight": "21rpx" } }, "device-name": { ".header .header-info ": { "fontSize": "42rpx", "lineHeight": "56rpx", "color": "rgba(75,85,99,1)" } }, "device-sn": { ".header .header-info ": { "fontSize": "28rpx", "lineHeight": "42rpx", "color": "rgba(156,163,175,1)" } }, "workshop-name": { ".header .header-info ": { "fontSize": "21rpx", "lineHeight": "28rpx", "color": "rgba(107,114,128,1)" } }, "status-card": { "": { "marginTop": "28rpx", "marginRight": "28rpx", "marginBottom": "28rpx", "marginLeft": "28rpx", "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx", "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx", "backgroundColor": "rgba(255,255,255,1)" } }, "status-item": { ".status-card ": { "marginTop": "14rpx", "marginRight": "14rpx", "marginBottom": "14rpx", "marginLeft": "14rpx", "display": "flex", "width": "100%", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "label": { ".status-card .status-item ": { "marginLeft": "28rpx", "width": "50%" } }, "dot": { ".status-card .status-item ": { "marginRight": "56rpx", "boxSizing": "border-box", "display": "flex", "height": "21rpx", "width": "21rpx", "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999 } }, "attr-card": { "": { "marginTop": "28rpx", "marginRight": "28rpx", "marginBottom": "28rpx", "marginLeft": "28rpx", "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx", "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx", "backgroundColor": "rgba(255,255,255,1)" } }, "card-title": { ".attr-card ": { "marginTop": "28rpx", "marginLeft": "28rpx", "fontSize": "35rpx", "lineHeight": "49rpx", "fontWeight": "700", "color": "rgba(75,85,99,1)" } }, "attr-item": { ".attr-card ": { "marginTop": "28rpx", "marginRight": "42rpx", "marginBottom": "14rpx", "marginLeft": "42rpx", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "borderBottomWidth": 1, "borderTopColor": "rgba(229,231,235,1)", "borderRightColor": "rgba(229,231,235,1)", "borderBottomColor": "rgba(229,231,235,1)", "borderLeftColor": "rgba(229,231,235,1)" } }, "action-bar": { "": { "display": "flex", "gap": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "btn": { ".action-bar ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "borderTopLeftRadius": "40rpx", "borderTopRightRadius": "40rpx", "borderBottomRightRadius": "40rpx", "borderBottomLeftRadius": "40rpx" } }, "primary": { ".action-bar ": { "backgroundImage": "none", "backgroundColor": "#1677ff", "color": "#ffffff" } } };
  const PagesEquipEquipDetail = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["styles", [_style_0$7]]]);
  let PassThrough$3 = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            item: { type: "Unknown", optional: true },
            itemChecked: { type: "Unknown", optional: true },
            itemWrapper: { type: "Unknown", optional: true },
            expand: { type: "Unknown", optional: true },
            expandIcon: { type: "Unknown", optional: true },
            checkbox: { type: "Unknown", optional: true },
            checkedIcon: { type: "Unknown", optional: true },
            halfCheckedIcon: { type: "Unknown", optional: true },
            uncheckedIcon: { type: "Unknown", optional: true },
            label: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.item = this.__props__.item;
      this.itemChecked = this.__props__.itemChecked;
      this.itemWrapper = this.__props__.itemWrapper;
      this.expand = this.__props__.expand;
      this.expandIcon = this.__props__.expandIcon;
      this.checkbox = this.__props__.checkbox;
      this.checkedIcon = this.__props__.checkedIcon;
      this.halfCheckedIcon = this.__props__.halfCheckedIcon;
      this.uncheckedIcon = this.__props__.uncheckedIcon;
      this.label = this.__props__.label;
      delete this.__props__;
    }
  };
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-tree-item"
  }, { __name: "cl-tree-item", props: {
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    item: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    level: {
      type: Number,
      default: 0
    }
  }, setup(__props) {
    const props = __props;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const ClTree = useParent("cl-tree");
    const hasChildren = vue.computed(() => {
      return props.item.children != null && props.item.children.length > 0;
    });
    const showCheckbox = vue.computed(() => {
      if (ClTree == null) {
        return false;
      }
      return ClTree.checkable == true && ClTree.multiple == true;
    });
    const icon = vue.computed(() => {
      if (ClTree == null) {
        return "";
      }
      return props.item.isExpand == true ? ClTree.expandIcon : ClTree.icon;
    });
    function toExpand() {
      var _a;
      ClTree.setExpanded(props.item.id, !((_a = props.item.isExpand) !== null && _a !== void 0 ? _a : false));
    }
    function toChecked() {
      var _a;
      if (props.item.disabled == true) {
        return null;
      }
      ClTree.setChecked(props.item.id, !((_a = props.item.isChecked) !== null && _a !== void 0 ? _a : false));
    }
    const hover = vue.ref(false);
    function onTouchStart() {
      hover.value = true;
      toExpand();
      if (ClTree != null) {
        if (ClTree.checkable == true && ClTree.multiple != true && props.item.disabled != true) {
          toChecked();
        }
      }
    }
    function onTouchEnd() {
      hover.value = false;
    }
    return (_ctx = null, _cache = null) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      const _component_cl_tree_item = resolveEasycom(vue.resolveDynamicComponent("cl-tree-item", true), __easycom_0);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-tree-item-wrapper", [new UTSJSONObject({}), (_a = pt.value.itemWrapper) === null || _a === void 0 ? null : _a.className]])
      }), [
        vue.createElementVNode("view", new UTSJSONObject({
          class: vue.normalizeClass(["cl-tree-item", [
            new UTSJSONObject({}),
            new UTSJSONObject({
              "is-expand": hover.value,
              "is-dark": vue.unref(isDark),
              "is-checked": __props.item.isChecked == true && ((_b = vue.unref(ClTree)) === null || _b === void 0 ? null : _b.checkable) == true && ((_c = vue.unref(ClTree)) === null || _c === void 0 ? null : _c.multiple) == false,
              "is-half-checked": __props.item.isHalfChecked,
              "is-disabled": __props.item.disabled,
              "is-multiple": (_d = vue.unref(ClTree)) === null || _d === void 0 ? null : _d.multiple
            }),
            (_e = pt.value.item) === null || _e === void 0 ? null : _e.className,
            __props.item.isChecked == true ? (_f = pt.value.itemChecked) === null || _f === void 0 ? null : _f.className : ""
          ]]),
          style: vue.normalizeStyle({
            paddingLeft: "".concat(__props.level * 50 + 16, "rpx")
          }),
          onTouchstart: onTouchStart,
          onTouchend: onTouchEnd,
          onTouchcancel: onTouchEnd
        }), [
          vue.createElementVNode("view", new UTSJSONObject({
            class: vue.normalizeClass(["cl-tree-item__expand", [new UTSJSONObject({}), (_g = pt.value.expand) === null || _g === void 0 ? null : _g.className]])
          }), [
            hasChildren.value ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
              key: 0,
              name: icon.value,
              size: (_j = (_h = pt.value.expandIcon) === null || _h === void 0 ? null : _h.size) !== null && _j !== void 0 ? _j : 34,
              color: (_k = pt.value.expandIcon) === null || _k === void 0 ? null : _k.color,
              pt: new UTSJSONObject({
                className: (_l = pt.value.expandIcon) === null || _l === void 0 ? null : _l.className
              })
            }), null, 8, ["name", "size", "color", "pt"])) : vue.createCommentVNode("", true)
          ], 2),
          vue.createVNode(_component_cl_text, new UTSJSONObject({
            pt: new UTSJSONObject({
              className: vue.unref(parseClass)(["flex-1 mx-1", (_m = pt.value.label) === null || _m === void 0 ? null : _m.className])
            })
          }), {
            default: vue.withCtx(() => {
              return [
                vue.createTextVNode(vue.toDisplayString(__props.item.label), 1)
              ];
            }),
            _: 1
          }, 8, ["pt"]),
          showCheckbox.value ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
            key: 0,
            class: vue.normalizeClass(["cl-tree-item__checkbox", [new UTSJSONObject({}), (_o = pt.value.checkbox) === null || _o === void 0 ? null : _o.className]]),
            onTouchstart: vue.withModifiers(toChecked, ["stop"])
          }), [
            __props.item.isChecked ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
              key: 0,
              name: (_q = (_p = pt.value.checkedIcon) === null || _p === void 0 ? null : _p.name) !== null && _q !== void 0 ? _q : "checkbox-circle-fill",
              size: (_s = (_r = pt.value.checkedIcon) === null || _r === void 0 ? null : _r.size) !== null && _s !== void 0 ? _s : 38,
              color: (_u = (_t = pt.value.checkedIcon) === null || _t === void 0 ? null : _t.color) !== null && _u !== void 0 ? _u : "primary"
            }), null, 8, ["name", "size", "color"])) : __props.item.isHalfChecked ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
              key: 1,
              name: (_w = (_v = pt.value.halfCheckedIcon) === null || _v === void 0 ? null : _v.name) !== null && _w !== void 0 ? _w : "indeterminate-circle-line",
              size: (_y = (_x = pt.value.halfCheckedIcon) === null || _x === void 0 ? null : _x.size) !== null && _y !== void 0 ? _y : 38,
              color: (_0 = (_z = pt.value.halfCheckedIcon) === null || _z === void 0 ? null : _z.color) !== null && _0 !== void 0 ? _0 : "primary"
            }), null, 8, ["name", "size", "color"])) : (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
              key: 2,
              name: (_2 = (_1 = pt.value.uncheckedIcon) === null || _1 === void 0 ? null : _1.name) !== null && _2 !== void 0 ? _2 : "checkbox-blank-circle-line",
              size: (_4 = (_3 = pt.value.uncheckedIcon) === null || _3 === void 0 ? null : _3.size) !== null && _4 !== void 0 ? _4 : 38,
              color: (_6 = (_5 = pt.value.uncheckedIcon) === null || _5 === void 0 ? null : _5.color) !== null && _6 !== void 0 ? _6 : "info"
            }), null, 8, ["name", "size", "color"]))
          ], 34)) : vue.createCommentVNode("", true)
        ], 38),
        hasChildren.value && __props.item.isExpand == true ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, new UTSJSONObject({ key: 0 }), vue.renderList(__props.item.children, (item) => {
          return vue.openBlock(), vue.createBlock(_component_cl_tree_item, new UTSJSONObject({
            key: item.id,
            item,
            level: __props.level + 1,
            pt: props.pt
          }), null, 8, ["item", "level", "pt"]);
        }), 128)) : vue.createCommentVNode("", true)
      ], 2);
    };
  } }));
  const _style_0$6 = { "cl-tree-item": { "": { "display": "flex", "width": "100%", "flexDirection": "row", "alignItems": "center", "borderTopLeftRadius": "14rpx", "borderTopRightRadius": "14rpx", "borderBottomRightRadius": "14rpx", "borderBottomLeftRadius": "14rpx", "paddingTop": "16rpx", "paddingRight": "16rpx", "paddingBottom": "16rpx", "paddingLeft": "16rpx" }, ".is-expand": { "backgroundColor": "rgba(250,250,250,1)" }, ".is-expand.is-dark": { "backgroundColor": "rgba(63,63,70,1)" }, ".is-disabled": { "opacity": 0.5 }, ".is-checked": { "backgroundColor": "rgba(204,251,241,1)" }, ".is-checked.is-multiple": { "backgroundColor": "rgba(0,0,0,0)" }, ".is-checked.is-dark": { "backgroundColor": "rgba(20,184,166,1)" } }, "cl-tree-item__expand": { "": { "display": "flex", "width": "42rpx", "alignItems": "center", "justifyContent": "center" } } };
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["styles", [_style_0$6]]]);
  let PassThrough$2 = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      delete this.__props__;
    }
  };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-tree"
  }, { __name: "cl-tree", props: {
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 绑定值
    modelValue: {
      type: [Array, String, Number],
      default: null
    },
    // 树形结构数据
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 节点图标
    icon: {
      type: String,
      default: "arrow-right-s-fill"
    },
    // 展开图标
    expandIcon: {
      type: String,
      default: "arrow-down-s-fill"
    },
    // 是否严格的遵循父子不互相关联
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 是否可以选择节点
    checkable: {
      type: Boolean,
      default: true
    },
    // 是否允许多选
    multiple: {
      type: Boolean,
      default: false
    }
  }, emits: ["update:modelValue", "change"], setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const data = vue.ref(props.list);
    const nodeMap = vue.computed(() => {
      const map2 = /* @__PURE__ */ new Map();
      function buildMap(nodes, parent = null) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          map2.set(node.id, { node, parent, index: i });
          if (node.children != null && node.children.length > 0) {
            buildMap(node.children, node);
          }
        }
      }
      buildMap(data.value);
      return map2;
    });
    function findNodeInfo(key) {
      const result = UTS.mapGet(nodeMap.value, key);
      return result != null ? result : null;
    }
    function getAncestors(key) {
      const result = [];
      let nodeInfo = findNodeInfo(key);
      while (nodeInfo != null && nodeInfo.parent != null) {
        result.unshift(nodeInfo.parent);
        nodeInfo = findNodeInfo(nodeInfo.parent.id);
      }
      return result;
    }
    function updateAllCheckStates() {
      function updateNodeStates(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const children = node.children != null ? node.children : [];
          if (children.length == 0) {
            node.isHalfChecked = false;
            continue;
          }
          updateNodeStates(children);
          let checkedCount = 0;
          let halfCheckedCount = 0;
          for (let j = 0; j < children.length; j++) {
            if (children[j].isChecked == true) {
              checkedCount++;
            } else if (children[j].isHalfChecked == true) {
              halfCheckedCount++;
            }
          }
          if (checkedCount == children.length) {
            node.isChecked = true;
            node.isHalfChecked = false;
          } else if (checkedCount > 0 || halfCheckedCount > 0) {
            node.isChecked = false;
            node.isHalfChecked = true;
          } else {
            node.isChecked = false;
            node.isHalfChecked = false;
          }
        }
      }
      updateNodeStates(data.value);
    }
    function updateAncestorsCheckState(key) {
      const ancestors = getAncestors(key);
      for (let i = ancestors.length - 1; i >= 0; i--) {
        const ancestor = ancestors[i];
        const children = ancestor.children != null ? ancestor.children : [];
        if (children.length == 0)
          continue;
        let checkedCount = 0;
        let halfCheckedCount = 0;
        for (let j = 0; j < children.length; j++) {
          if (children[j].isChecked == true) {
            checkedCount++;
          } else if (children[j].isHalfChecked == true) {
            halfCheckedCount++;
          }
        }
        if (checkedCount == children.length) {
          ancestor.isChecked = true;
          ancestor.isHalfChecked = false;
        } else if (checkedCount > 0 || halfCheckedCount > 0) {
          ancestor.isChecked = false;
          ancestor.isHalfChecked = true;
        } else {
          ancestor.isChecked = false;
          ancestor.isHalfChecked = false;
        }
      }
    }
    function getDescendants(key) {
      const nodeInfo = findNodeInfo(key);
      if (nodeInfo == null || nodeInfo.node.children == null) {
        return [];
      }
      const result = [];
      const queue = [];
      for (let i = 0; i < nodeInfo.node.children.length; i++) {
        queue.push(nodeInfo.node.children[i]);
      }
      while (queue.length > 0) {
        const node = UTS.arrayShift(queue);
        if (node == null)
          break;
        result.push(node);
        if (node.children != null && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            queue.push(node.children[i]);
          }
        }
      }
      return result;
    }
    function clearChecked() {
      nodeMap.value.forEach((info) => {
        info.node.isChecked = false;
        info.node.isHalfChecked = false;
      });
    }
    function setChecked(key, flag) {
      const nodeInfo = findNodeInfo(key);
      if (nodeInfo == null)
        return null;
      if (!props.multiple) {
        clearChecked();
      }
      nodeInfo.node.isChecked = flag;
      if (props.multiple) {
        if (!props.checkStrictly) {
          const descendants = getDescendants(key);
          for (let i = 0; i < descendants.length; i++) {
            descendants[i].isChecked = flag;
          }
          updateAncestorsCheckState(key);
        }
      }
    }
    function setCheckedKeys(keys2) {
      for (let i = 0; i < keys2.length; i++) {
        const key = keys2[i];
        const nodeInfo = findNodeInfo(key);
        if (nodeInfo != null) {
          nodeInfo.node.isChecked = true;
          if (!props.checkStrictly) {
            const descendants = getDescendants(key);
            for (let j = 0; j < descendants.length; j++) {
              descendants[j].isChecked = true;
            }
          }
        }
      }
      if (!props.checkStrictly) {
        updateAllCheckStates();
      }
    }
    function getCheckedKeys() {
      const result = [];
      function collectCheckedKeys(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.isChecked == true) {
            result.push(node.id);
          }
          if (node.children != null) {
            collectCheckedKeys(node.children);
          }
        }
      }
      collectCheckedKeys(data.value);
      return result;
    }
    function getHalfCheckedKeys() {
      const result = [];
      function collectHalfCheckedKeys(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.isHalfChecked == true) {
            result.push(node.id);
          }
          if (node.children != null) {
            collectHalfCheckedKeys(node.children);
          }
        }
      }
      collectHalfCheckedKeys(data.value);
      return result;
    }
    function setExpanded(key, flag) {
      const nodeInfo = findNodeInfo(key);
      if (nodeInfo == null)
        return null;
      nodeInfo.node.isExpand = flag;
    }
    function setExpandedKeys(keys2) {
      for (let i = 0; i < keys2.length; i++) {
        const nodeInfo = findNodeInfo(keys2[i]);
        if (nodeInfo != null) {
          nodeInfo.node.isExpand = true;
        }
      }
    }
    function getExpandedKeys() {
      const result = [];
      function collectExpandedKeys(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.isExpand == true) {
            result.push(node.id);
          }
          if (node.children != null) {
            collectExpandedKeys(node.children);
          }
        }
      }
      collectExpandedKeys(data.value);
      return result;
    }
    function expandAll() {
      nodeMap.value.forEach((info) => {
        if (info.node.children != null && info.node.children.length > 0) {
          info.node.isExpand = true;
        }
      });
    }
    function collapseAll() {
      nodeMap.value.forEach((info) => {
        info.node.isExpand = false;
      });
    }
    function syncModelValue() {
      if (isEmpty(data.value)) {
        return null;
      }
      const checkedKeys = getCheckedKeys();
      if (props.modelValue == null || !isEqual(checkedKeys, props.modelValue)) {
        const value = props.multiple ? checkedKeys : first(checkedKeys);
        emit("update:modelValue", value);
        emit("change", value);
      }
    }
    function syncCheckedState() {
      if (props.modelValue == null) {
        return null;
      }
      const checkedKeys = getCheckedKeys();
      if (!isEqual(checkedKeys, props.modelValue)) {
        if (Array.isArray(props.modelValue)) {
          setCheckedKeys(props.modelValue);
        } else {
          setChecked(props.modelValue, true);
        }
      }
      syncModelValue();
    }
    vue.watch(vue.computed(() => {
      return props.list;
    }), (val) => {
      data.value = val;
      syncCheckedState();
    }, { immediate: true });
    vue.watch(vue.computed(() => {
      var _a2;
      return [(_a2 = props.modelValue) !== null && _a2 !== void 0 ? _a2 : 0];
    }), () => {
      syncCheckedState();
    }, { immediate: true, deep: true });
    vue.watch(data, () => {
      if (!props.checkStrictly && props.multiple) {
        updateAllCheckStates();
      }
      syncModelValue();
    }, { deep: true });
    __expose({
      icon: vue.computed(() => {
        return props.icon;
      }),
      expandIcon: vue.computed(() => {
        return props.expandIcon;
      }),
      checkStrictly: vue.computed(() => {
        return props.checkStrictly;
      }),
      checkable: vue.computed(() => {
        return props.checkable;
      }),
      multiple: vue.computed(() => {
        return props.multiple;
      }),
      clearChecked,
      setChecked,
      setCheckedKeys,
      getCheckedKeys,
      getHalfCheckedKeys,
      setExpanded,
      setExpandedKeys,
      getExpandedKeys,
      expandAll,
      collapseAll
    });
    return (_ctx = null, _cache = null) => {
      const _component_cl_tree_item = resolveEasycom(vue.resolveDynamicComponent("cl-tree-item"), __easycom_0);
      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        class: vue.normalizeClass(["cl-tree", [new UTSJSONObject({}), pt.value.className]])
      }), [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(data.value, (item) => {
          return vue.openBlock(), vue.createBlock(_component_cl_tree_item, new UTSJSONObject({
            key: item.id,
            item,
            level: 0,
            pt: props.pt
          }), null, 8, ["item", "pt"]);
        }), 128))
      ], 2);
    };
  } }));
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "workshop_tree",
    setup(__props) {
      const ui2 = useUi();
      useRefs();
      const treeRef = vue.ref(null);
      function confirmSelect() {
        ui2.showLoading(t("切换中"));
        workshopTree.selectConfirm();
        setTimeout(() => {
          router.back();
          ui2.hideLoading();
        }, 300);
      }
      vue.onLoad(() => {
        workshopTree.loadWorkshopTree();
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_tree = resolveEasycom(vue.resolveDynamicComponent("cl-tree"), _sfc_main$7);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                fixed: "",
                "background-color": vue.unref(isDark) ? "black" : "white",
                "show-back": true,
                "safe-area-top": "",
                height: vue.unref(isMp)() ? null : 100,
                pt: new UTSJSONObject({
                  className: "-important-z-50"
                })
              }), {
                default: vue.withCtx(() => {
                  return [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["w-full flex flex-row items-end", new UTSJSONObject({
                        "pt-0": vue.unref(isMp)()
                      })])
                    }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "flex flex-row justify-center flex-1" }), [
                        vue.createVNode(_component_cl_text, new UTSJSONObject({
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-xl ml-2"
                          })
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(vue.unref(t)("选择场景")), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      vue.createElementVNode("view", new UTSJSONObject({
                        class: vue.normalizeClass(["flex flex-row justify-end", new UTSJSONObject({
                          "mr-32": vue.unref(isMp)(),
                          "mr-10": !vue.unref(isMp)()
                        })]),
                        onClick: confirmSelect
                      }), [
                        vue.createVNode(_component_cl_text, new UTSJSONObject({
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-base ml-2"
                          })
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(vue.unref(t)("确定")), 1)
                            ];
                          }),
                          _: 1
                        })
                      ], 2)
                    ], 2)
                  ];
                }),
                _: 1
              }, 8, ["background-color", "height"]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "tree overflow-y-auto" }), [
                vue.createVNode(_component_cl_tree, new UTSJSONObject({
                  ref_key: "treeRef",
                  ref: treeRef,
                  list: vue.unref(workshopTree).tree.value,
                  icon: "hospital-line",
                  expandIcon: "hospital-line",
                  pt: new UTSJSONObject({ className: "overflow-y-auto" })
                }), null, 8, ["list"])
              ])
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _style_0$5 = { "tree": { "": { "backgroundImage": "none", "backgroundColor": "#ffffff", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#ebedf0", "borderRightColor": "#ebedf0", "borderBottomColor": "#ebedf0", "borderLeftColor": "#ebedf0", "boxShadow": "0 2rpx 6rpx rgba(0, 0, 0, 0.1)", "marginTop": "14rpx", "marginRight": "14rpx", "marginBottom": "14rpx", "marginLeft": "14rpx", "height": "100%", "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx" } } };
  const PagesEquipWorkshopTree = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["styles", [_style_0$5]]]);
  let PassThrough$1 = class PassThrough2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            className: { type: String, optional: true },
            text: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.className = this.__props__.className;
      this.text = this.__props__.text;
      delete this.__props__;
    }
  };
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-tag"
  }, { __name: "cl-tag", props: {
    // 透传样式
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 类型
    type: {
      type: String,
      default: "primary"
    },
    // 图标
    icon: {
      type: String,
      default: ""
    },
    // 圆角
    rounded: {
      type: Boolean,
      default: false
    },
    // 可关闭
    closable: {
      type: Boolean,
      default: false
    },
    // 镂空
    plain: {
      type: Boolean,
      default: false
    }
  }, emits: ["close"], setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emits = __emit;
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const isHide = vue.ref(false);
    function close() {
      isHide.value = true;
      emits("close");
    }
    const color = vue.computed(() => {
      if (isDark.value && props.type == "info") {
        return "white";
      }
      if (props.plain) {
        return props.type;
      } else {
        return "white";
      }
    });
    return (_ctx = null, _cache = null) => {
      var _a2;
      const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      return !isHide.value ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
        key: 0,
        class: vue.normalizeClass(["cl-tag", [new UTSJSONObject({}), "cl-tag--".concat(__props.type), new UTSJSONObject({
          "cl-tag--rounded": __props.rounded,
          "cl-tag--plain": __props.plain,
          "is-dark": vue.unref(isDark)
        }), pt.value.className]])
      }), [
        __props.icon != "" ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
          key: 0,
          name: __props.icon,
          size: 28,
          color: "white",
          pt: new UTSJSONObject({ className: "mr-1 ml--bracket-start--4rpx-bracket-end-" })
        }), null, 8, ["name"])) : vue.createCommentVNode("", true),
        vue.createVNode(_component_cl_text, new UTSJSONObject({
          color: color.value,
          pt: new UTSJSONObject({
            className: vue.unref(parseClass)(["cl-tag__text text-sm", (_a2 = pt.value.text) === null || _a2 === void 0 ? null : _a2.className])
          })
        }), {
          default: vue.withCtx(() => {
            return [
              vue.renderSlot(_ctx.$slots, "default")
            ];
          }),
          _: 3
        }, 8, ["color", "pt"]),
        __props.closable ? (vue.openBlock(), vue.createBlock(_component_cl_icon, new UTSJSONObject({
          key: 1,
          name: "close-circle-line",
          size: 28,
          color: "white",
          pt: new UTSJSONObject({ className: "ml-1 mr--bracket-start--4rpx-bracket-end-" }),
          onClick: close
        }))) : vue.createCommentVNode("", true)
      ], 2)) : vue.createCommentVNode("", true);
    };
  } }));
  const _style_0$4 = { "cl-tag": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "borderTopLeftRadius": "10.5rpx", "borderTopRightRadius": "10.5rpx", "borderBottomRightRadius": "10.5rpx", "borderBottomLeftRadius": "10.5rpx", "paddingLeft": "21rpx", "paddingRight": "21rpx", "paddingTop": "7rpx", "paddingBottom": "7rpx", "transitionDuration": "0.2s", "transitionProperty": "backgroundColor,borderColor" }, ".cl-tag+": { "marginLeft": "14rpx" } }, "cl-tag__text": { "": { "fontSize": "24.5rpx", "lineHeight": "35rpx" } }, "cl-tag--rounded": { "": { "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999 } }, "cl-tag--primary": { "": { "backgroundColor": "rgba(20,184,166,1)" } }, "cl-tag--success": { "": { "backgroundColor": "rgba(34,197,94,1)" } }, "cl-tag--warn": { "": { "backgroundColor": "rgba(234,179,8,1)" } }, "cl-tag--error": { "": { "backgroundColor": "rgba(239,68,68,1)" } }, "cl-tag--info": { "": { "backgroundColor": "rgba(113,113,122,1)" } }, "cl-tag--plain": { "": { "backgroundColor": "rgba(0,0,0,0)", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)" }, ".cl-tag--primary": { "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)" }, ".cl-tag--success": { "borderTopColor": "rgba(34,197,94,1)", "borderRightColor": "rgba(34,197,94,1)", "borderBottomColor": "rgba(34,197,94,1)", "borderLeftColor": "rgba(34,197,94,1)" }, ".cl-tag--warn": { "borderTopColor": "rgba(234,179,8,1)", "borderRightColor": "rgba(234,179,8,1)", "borderBottomColor": "rgba(234,179,8,1)", "borderLeftColor": "rgba(234,179,8,1)" }, ".cl-tag--error": { "borderTopColor": "rgba(239,68,68,1)", "borderRightColor": "rgba(239,68,68,1)", "borderBottomColor": "rgba(239,68,68,1)", "borderLeftColor": "rgba(239,68,68,1)" }, ".cl-tag--info": { "borderTopColor": "rgba(113,113,122,1)", "borderRightColor": "rgba(113,113,122,1)", "borderBottomColor": "rgba(113,113,122,1)", "borderLeftColor": "rgba(113,113,122,1)" }, ".cl-tag--info.is-dark": { "borderTopColor": "rgba(212,212,216,1)", "borderRightColor": "rgba(212,212,216,1)", "borderBottomColor": "rgba(212,212,216,1)", "borderLeftColor": "rgba(212,212,216,1)" } }, "@TRANSITION": { "cl-tag": { "duration": "0.2s", "property": "backgroundColor,borderColor" } } };
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["styles", [_style_0$4]]]);
  class PassThrough extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            trigger: { type: "Unknown", optional: true },
            popup: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.trigger = this.__props__.trigger;
      this.popup = this.__props__.popup;
      delete this.__props__;
    }
  }
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent(Object.assign({
    name: "cl-select-date"
  }, { __name: "cl-select-date", props: {
    // 透传样式配置，支持外部自定义样式
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 选择器的值，外部v-model绑定
    modelValue: {
      type: String,
      default: ""
    },
    // 选择器的范围值，外部v-model:values绑定
    values: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 表头
    headers: {
      type: Array,
      default: () => {
        return [t$1("年"), t$1("月"), t$1("日"), t$1("时"), t$1("分"), t$1("秒")];
      }
    },
    // 选择器标题
    title: {
      type: String,
      default: () => {
        return t$1("请选择");
      }
    },
    // 选择器占位符
    placeholder: {
      type: String,
      default: () => {
        return t$1("请选择");
      }
    },
    // 是否显示选择器触发器
    showTrigger: {
      type: Boolean,
      default: true
    },
    // 是否禁用选择器
    disabled: {
      type: Boolean,
      default: false
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      default: () => {
        return t$1("确定");
      }
    },
    // 是否显示确认按钮
    showConfirm: {
      type: Boolean,
      default: true
    },
    // 取消按钮文本
    cancelText: {
      type: String,
      default: () => {
        return t$1("取消");
      }
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    },
    // 标签格式化
    labelFormat: {
      type: String,
      default: ""
    },
    // 值格式化
    valueFormat: {
      type: String,
      default: ""
    },
    // 开始日期
    start: {
      type: String,
      default: config$1.startDate
    },
    // 结束日期
    end: {
      type: String,
      default: config$1.endDate
    },
    // 类型，控制选择的粒度
    type: {
      type: String,
      default: "second"
    },
    // 是否范围选择
    rangeable: {
      type: Boolean,
      default: false
    },
    // 开始日期占位符
    startPlaceholder: {
      type: String,
      default: () => {
        return t$1("开始日期");
      }
    },
    // 结束日期占位符
    endPlaceholder: {
      type: String,
      default: () => {
        return t$1("结束日期");
      }
    },
    // 范围分隔符
    rangeSeparator: {
      type: String,
      default: () => {
        return t$1(" 至 ");
      }
    },
    // 是否显示快捷选项
    showShortcuts: {
      type: Boolean,
      default: true
    },
    // 快捷选项
    shortcuts: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }, emits: ["update:modelValue", "change", "update:values", "range-change"], setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const ui2 = useUi();
    const popupRef = vue.ref(null);
    const pt = vue.computed(() => {
      return parsePt(props.pt);
    });
    const ptTrigger = vue.computed(() => {
      return parseToObject(pt.value.trigger);
    });
    const ptPopup = vue.computed(() => {
      return parseToObject(pt.value.popup);
    });
    const formatType = vue.computed(() => {
      switch (props.type) {
        case "year":
          return "YYYY";
        case "month":
          return "YYYY-MM";
        case "date":
          return "YYYY-MM-DD";
        case "hour":
        case "minute":
        case "second":
          return "YYYY-MM-DD HH:mm:ss";
        default:
          return "YYYY-MM-DD HH:mm:ss";
      }
    });
    const labelFormat = vue.computed(() => {
      if (isNull(props.labelFormat) || isEmpty(props.labelFormat)) {
        return formatType.value;
      }
      return props.labelFormat;
    });
    const valueFormat = vue.computed(() => {
      if (isNull(props.valueFormat) || isEmpty(props.valueFormat)) {
        return formatType.value;
      }
      return props.valueFormat;
    });
    const shortcutsIndex = vue.ref(-1);
    const shortcuts = vue.computed(() => {
      if (!isEmpty(props.shortcuts)) {
        return props.shortcuts;
      }
      return [
        {
          label: t$1("今天"),
          value: [dayUts().format(valueFormat.value), dayUts().format(valueFormat.value)]
        },
        {
          label: t$1("近7天"),
          value: [
            dayUts().subtract(7, "day").format(valueFormat.value),
            dayUts().format(valueFormat.value)
          ]
        },
        {
          label: t$1("近30天"),
          value: [
            dayUts().subtract(30, "day").format(valueFormat.value),
            dayUts().format(valueFormat.value)
          ]
        },
        {
          label: t$1("近90天"),
          value: [
            dayUts().subtract(90, "day").format(valueFormat.value),
            dayUts().format(valueFormat.value)
          ]
        },
        {
          label: t$1("近一年"),
          value: [
            dayUts().subtract(1, "year").format(valueFormat.value),
            dayUts().format(valueFormat.value)
          ]
        }
      ];
    });
    const rangeIndex = vue.ref(0);
    const values = vue.ref(["", ""]);
    const value = vue.ref([]);
    const start = vue.computed(() => {
      if (props.rangeable) {
        if (rangeIndex.value == 0) {
          return props.start;
        } else {
          return values.value[0];
        }
      } else {
        return props.start;
      }
    });
    const list2 = vue.computed(() => {
      const _a2 = __read(dayUts(start.value).toArray(), 6), startYear = _a2[0], startMonth = _a2[1], startDate = _a2[2], startHour = _a2[3], startMinute = _a2[4], startSecond = _a2[5];
      const _b = __read(dayUts(props.end).toArray(), 6), endYear = _b[0], endMonth = _b[1], endDate = _b[2], endHour = _b[3], endMinute = _b[4], endSecond = _b[5];
      const arr = [[], [], [], [], [], []];
      if (isEmpty(value.value)) {
        return arr;
      }
      const _c = __read(value.value, 5), year = _c[0], month = _c[1], date = _c[2], hour = _c[3], minute = _c[4];
      const isLeapYear = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
      const days = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month > 0 ? month - 1 : 0];
      const yearRange = Math.max(60, endYear - startYear + 1);
      for (let i = 0; i < yearRange; i++) {
        const yearNum = startYear + i;
        if (yearNum <= endYear) {
          arr[0].push({
            label: yearNum.toString(),
            value: yearNum
          });
        }
        let monthNum = startYear == year ? startMonth + i : i + 1;
        let endMonthNum = endYear == year ? endMonth : 12;
        if (monthNum <= endMonthNum) {
          arr[1].push({
            label: monthNum.toString().padStart(2, "0"),
            value: monthNum
          });
        }
        let dateNum = startYear == year && startMonth == month ? startDate + i : i + 1;
        let endDateNum = endYear == year && endMonth == month ? endDate : days;
        if (dateNum <= endDateNum) {
          arr[2].push({
            label: dateNum.toString().padStart(2, "0"),
            value: dateNum
          });
        }
        let hourNum = startYear == year && startMonth == month && startDate == date ? startHour + i : i;
        let endHourNum = endYear == year && endMonth == month && endDate == date ? endHour : 24;
        if (hourNum < endHourNum) {
          arr[3].push({
            label: hourNum.toString().padStart(2, "0"),
            value: hourNum
          });
        }
        let minuteNum = startYear == year && startMonth == month && startDate == date && startHour == hour ? startMinute + i : i;
        let endMinuteNum = endYear == year && endMonth == month && endDate == date && endHour == hour ? endMinute : 60;
        if (minuteNum < endMinuteNum) {
          arr[4].push({
            label: minuteNum.toString().padStart(2, "0"),
            value: minuteNum
          });
        }
        let secondNum = startYear == year && startMonth == month && startDate == date && startHour == hour && startMinute == minute ? startSecond + i : i;
        let endSecondNum = endYear == year && endMonth == month && endDate == date && endHour == hour && endMinute == minute ? endSecond : 60;
        if (secondNum < endSecondNum) {
          arr[5].push({
            label: secondNum.toString().padStart(2, "0"),
            value: secondNum
          });
        }
      }
      return arr;
    });
    const columnNum = vue.computed(() => {
      return ["year", "month", "date", "hour", "minute", "second"].findIndex((e) => {
        return e == props.type;
      }) + 1;
    });
    const columns = vue.computed(() => {
      return list2.value.slice(0, columnNum.value);
    });
    const indexes = vue.computed(() => {
      if (isEmpty(value.value)) {
        return [];
      }
      return value.value.map((e, i) => {
        let index = list2.value[i].findIndex((a) => {
          return a.value == e;
        });
        if (index == -1) {
          index = list2.value[i].length - 1;
        }
        if (index < 0) {
          index = 0;
        }
        return index;
      });
    });
    function toDate() {
      const parts = [];
      const units = ["", "-", "-", " ", ":", ":"];
      const defaultValue = [2e3, 1, 1, 0, 0, 0];
      units.forEach((key, i) => {
        let val = value.value[i];
        if (i >= columnNum.value) {
          val = defaultValue[i];
        }
        parts.push(key + val.toString().padStart(2, "0"));
      });
      return parts.join("");
    }
    function checkDate(values2) {
      if (values2.length == 0) {
        return values2;
      }
      const checkedValues = [...values2];
      const defaultValues = [2e3, 1, 1, 0, 0, 0];
      for (let i = checkedValues.length; i < 6; i++) {
        checkedValues.push(defaultValues[i]);
      }
      let _a2 = __read(checkedValues, 6), year = _a2[0], month = _a2[1], date = _a2[2], hour = _a2[3], minute = _a2[4], second = _a2[5];
      const isLeapYear = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
      const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const maxDay = daysInMonth[month - 1];
      if (date < 1) {
        date = 1;
      } else if (date > maxDay) {
        date = maxDay;
      }
      if (hour < 0) {
        hour = 0;
      } else if (hour > 23) {
        hour = 23;
      }
      if (minute < 0) {
        minute = 0;
      } else if (minute > 59) {
        minute = 59;
      }
      if (second < 0) {
        second = 0;
      } else if (second > 59) {
        second = 59;
      }
      return [year, month, date, hour, minute, second];
    }
    const text = vue.ref("");
    function updateText() {
      if (props.rangeable) {
        text.value = values.value.map((e) => {
          return dayUts(e).format(labelFormat.value);
        }).join(" ".concat(props.rangeSeparator, " "));
      } else {
        text.value = dayUts(toDate()).format(labelFormat.value);
      }
    }
    function onChange(data) {
      return __awaiter(this, void 0, void 0, function* () {
        value.value = checkDate(data);
        if (dayUts(toDate()).isAfter(dayUts(props.end))) {
          value.value = dayUts(props.end).toArray();
        }
        if (dayUts(toDate()).isBefore(dayUts(props.start))) {
          value.value = dayUts(props.start).toArray();
        }
        if (props.rangeable) {
          values.value[rangeIndex.value] = dayUts(toDate()).format(valueFormat.value);
          if (dayUts(values.value[0]).isAfter(dayUts(values.value[1])) && values.value[1] != "") {
            values.value[1] = values.value[0];
          }
          shortcutsIndex.value = -1;
        }
      });
    }
    function setValue(val) {
      if (isNull(val) || isEmpty(val)) {
        value.value = checkDate(dayUts().toArray());
        text.value = "";
      } else {
        value.value = checkDate(dayUts(val).toArray());
        updateText();
      }
    }
    function setValues(val) {
      if (isEmpty(val)) {
        values.value = ["", ""];
        text.value = "";
      } else {
        values.value = val;
        updateText();
      }
    }
    function setRange(index) {
      rangeIndex.value = index;
      setValue(values.value[index]);
    }
    function setRangeValue(val, index) {
      shortcutsIndex.value = index;
      values.value = [...val];
      setValue(val[rangeIndex.value]);
    }
    const visible = vue.ref(false);
    let callback = null;
    function open(cb = null) {
      if (props.disabled) {
        return null;
      }
      visible.value = true;
      callback = cb;
      vue.nextTick(() => {
        if (props.rangeable) {
          rangeIndex.value = 0;
          setValues(props.values);
          setValue(values.value[0]);
        } else {
          setValue(props.modelValue);
        }
      });
    }
    function close() {
      visible.value = false;
    }
    function onClosed() {
      values.value = ["", ""];
    }
    function clear() {
      text.value = "";
      if (props.rangeable) {
        emit("update:values", []);
        emit("range-change", []);
      } else {
        emit("update:modelValue", "");
        emit("change", "");
      }
    }
    function confirm() {
      if (props.rangeable) {
        const _a2 = __read(values.value, 2), a = _a2[0], b = _a2[1];
        if (a == "" || b == "") {
          ui2.showToast({
            message: t$1("请选择完整时间范围")
          });
          if (a != "") {
            rangeIndex.value = 1;
          }
          return null;
        }
        if (dayUts(a).isAfter(dayUts(b))) {
          ui2.showToast({
            message: t$1("开始日期不能大于结束日期")
          });
          return null;
        }
        emit("update:values", values.value);
        emit("range-change", values.value);
        if (callback != null) {
          callback(values.value);
        }
      } else {
        const val = dayUts(toDate()).format(valueFormat.value);
        emit("update:modelValue", val);
        emit("change", val);
        if (callback != null) {
          callback(val);
        }
      }
      updateText();
      close();
    }
    vue.watch(vue.computed(() => {
      return props.modelValue;
    }), (val) => {
      if (!props.rangeable) {
        setValue(val);
      }
    }, {
      immediate: true
    });
    vue.watch(vue.computed(() => {
      return props.values;
    }), (val) => {
      if (props.rangeable) {
        setValues(val);
      }
    }, {
      immediate: true
    });
    vue.watch(vue.computed(() => {
      return props.labelFormat;
    }), () => {
      updateText();
    });
    __expose({
      open,
      close,
      clear,
      confirm,
      setValue,
      setValues,
      setRange
    });
    return (_ctx = null, _cache = null) => {
      var _a2;
      const _component_cl_select_trigger = resolveEasycom(vue.resolveDynamicComponent("cl-select-trigger"), __easycom_0$3);
      const _component_cl_tag = resolveEasycom(vue.resolveDynamicComponent("cl-tag"), __easycom_1);
      const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
      const _component_cl_picker_view = resolveEasycom(vue.resolveDynamicComponent("cl-picker-view"), __easycom_3$2);
      const _component_cl_button = resolveEasycom(vue.resolveDynamicComponent("cl-button"), __easycom_4);
      const _component_cl_popup = resolveEasycom(vue.resolveDynamicComponent("cl-popup"), __easycom_5);
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        __props.showTrigger ? (vue.openBlock(), vue.createBlock(_component_cl_select_trigger, new UTSJSONObject({
          key: 0,
          pt: ptTrigger.value,
          placeholder: __props.placeholder,
          disabled: __props.disabled,
          focus: (_a2 = popupRef.value) === null || _a2 === void 0 ? null : _a2.isOpen,
          text: text.value,
          "arrow-icon": "calendar-line",
          onOpen: _cache[0] || (_cache[0] = ($event = null) => {
            return open();
          }),
          onClear: clear
        }), null, 8, ["pt", "placeholder", "disabled", "focus", "text"])) : vue.createCommentVNode("", true),
        vue.createVNode(_component_cl_popup, new UTSJSONObject({
          ref_key: "popupRef",
          ref: popupRef,
          modelValue: visible.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event = null) => {
            return visible.value = $event;
          }),
          title: __props.title,
          pt: ptPopup.value,
          onClosed
        }), {
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("view", new UTSJSONObject({
                class: "cl-select-popup",
                onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers(() => {
                }, ["stop"]))
              }), [
                __props.rangeable ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  key: 0,
                  class: "cl-select-popup__range"
                }), [
                  __props.showShortcuts ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    key: 0,
                    class: "cl-select-popup__range-shortcuts"
                  }), [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(shortcuts.value, (item, index) => {
                      return vue.openBlock(), vue.createBlock(_component_cl_tag, new UTSJSONObject({
                        key: index,
                        plain: "",
                        type: shortcutsIndex.value == index ? "primary" : "info",
                        onClick: ($event = null) => {
                          return setRangeValue(item.value, index);
                        }
                      }), new UTSJSONObject({
                        default: vue.withCtx(() => {
                          return [
                            vue.createTextVNode(vue.toDisplayString(item.label), 1)
                          ];
                        }),
                        _: 2
                      }), 1032, ["type", "onClick"]);
                    }), 128))
                  ])) : vue.createCommentVNode("", true),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "cl-select-popup__range-values" }), [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["cl-select-popup__range-values-start", new UTSJSONObject({
                        "is-dark": vue.unref(isDark),
                        active: rangeIndex.value == 0
                      })]),
                      onClick: _cache[1] || (_cache[1] = ($event = null) => {
                        return setRange(0);
                      })
                    }), [
                      values.value.length > 0 && values.value[0] != "" ? (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
                        key: 0,
                        pt: new UTSJSONObject({
                          className: "text-center"
                        })
                      }), new UTSJSONObject({
                        default: vue.withCtx(() => {
                          return [
                            vue.createTextVNode(vue.toDisplayString(values.value[0]), 1)
                          ];
                        }),
                        _: 1
                      }))) : (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
                        key: 1,
                        pt: new UTSJSONObject({
                          className: "text-center text-surface-400"
                        })
                      }), new UTSJSONObject({
                        default: vue.withCtx(() => {
                          return [
                            vue.createTextVNode(vue.toDisplayString(__props.startPlaceholder), 1)
                          ];
                        }),
                        _: 1
                      })))
                    ], 2),
                    vue.createVNode(_component_cl_text, new UTSJSONObject({ pt: new UTSJSONObject({ className: "mx-3" }) }), {
                      default: vue.withCtx(() => {
                        return [
                          vue.createTextVNode(vue.toDisplayString(__props.rangeSeparator), 1)
                        ];
                      }),
                      _: 1
                    }),
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["cl-select-popup__range-values-end", new UTSJSONObject({
                        "is-dark": vue.unref(isDark),
                        active: rangeIndex.value == 1
                      })]),
                      onClick: _cache[2] || (_cache[2] = ($event = null) => {
                        return setRange(1);
                      })
                    }), [
                      values.value.length > 1 && values.value[1] != "" ? (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
                        key: 0,
                        pt: new UTSJSONObject({
                          className: "text-center"
                        })
                      }), new UTSJSONObject({
                        default: vue.withCtx(() => {
                          return [
                            vue.createTextVNode(vue.toDisplayString(values.value[1]), 1)
                          ];
                        }),
                        _: 1
                      }))) : (vue.openBlock(), vue.createBlock(_component_cl_text, new UTSJSONObject({
                        key: 1,
                        pt: new UTSJSONObject({
                          className: "text-center text-surface-400"
                        })
                      }), new UTSJSONObject({
                        default: vue.withCtx(() => {
                          return [
                            vue.createTextVNode(vue.toDisplayString(__props.endPlaceholder), 1)
                          ];
                        }),
                        _: 1
                      })))
                    ], 2)
                  ])
                ])) : vue.createCommentVNode("", true),
                vue.createElementVNode("view", new UTSJSONObject({ class: "cl-select-popup__picker" }), [
                  vue.createVNode(_component_cl_picker_view, new UTSJSONObject({
                    headers: __props.headers,
                    value: indexes.value,
                    columns: columns.value,
                    "reset-on-change": false,
                    onChangeValue: onChange
                  }), null, 8, ["headers", "value", "columns"])
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "cl-select-popup__op" }), [
                  __props.showCancel ? (vue.openBlock(), vue.createBlock(_component_cl_button, new UTSJSONObject({
                    key: 0,
                    size: "large",
                    text: "",
                    border: "",
                    type: "light",
                    pt: new UTSJSONObject({
                      className: "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
                    }),
                    onClick: close
                  }), new UTSJSONObject({
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(__props.cancelText), 1)
                      ];
                    }),
                    _: 1
                  }))) : vue.createCommentVNode("", true),
                  __props.showConfirm ? (vue.openBlock(), vue.createBlock(_component_cl_button, new UTSJSONObject({
                    key: 1,
                    size: "large",
                    pt: new UTSJSONObject({
                      className: "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
                    }),
                    onClick: confirm
                  }), new UTSJSONObject({
                    default: vue.withCtx(() => {
                      return [
                        vue.createTextVNode(vue.toDisplayString(__props.confirmText), 1)
                      ];
                    }),
                    _: 1
                  }))) : vue.createCommentVNode("", true)
                ])
              ], 32)
            ];
          }),
          _: 1
        }, 8, ["modelValue", "title", "pt"])
      ], 64);
    };
  } }));
  const _style_0$3 = { "cl-select-popup__op": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "paddingTop": "24rpx", "paddingRight": "24rpx", "paddingBottom": "24rpx", "paddingLeft": "24rpx" } }, "cl-select-popup__range": { "": { "paddingLeft": "21rpx", "paddingRight": "21rpx", "paddingTop": "14rpx", "paddingBottom": "35rpx" } }, "cl-select-popup__range-values": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center" } }, "cl-select-popup__range-values-start": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(228,228,231,1)", "borderRightColor": "rgba(228,228,231,1)", "borderBottomColor": "rgba(228,228,231,1)", "borderLeftColor": "rgba(228,228,231,1)", "backgroundColor": "rgba(250,250,250,1)", "paddingTop": "14rpx", "paddingBottom": "14rpx" }, ".is-dark": { "borderTopColor": "rgba(113,113,122,1)", "borderRightColor": "rgba(113,113,122,1)", "borderBottomColor": "rgba(113,113,122,1)", "borderLeftColor": "rgba(113,113,122,1)", "backgroundColor": "rgba(63,63,70,1)" }, ".active": { "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)", "backgroundColor": "rgba(0,0,0,0)" } }, "cl-select-popup__range-values-end": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(228,228,231,1)", "borderRightColor": "rgba(228,228,231,1)", "borderBottomColor": "rgba(228,228,231,1)", "borderLeftColor": "rgba(228,228,231,1)", "backgroundColor": "rgba(250,250,250,1)", "paddingTop": "14rpx", "paddingBottom": "14rpx" }, ".is-dark": { "borderTopColor": "rgba(113,113,122,1)", "borderRightColor": "rgba(113,113,122,1)", "borderBottomColor": "rgba(113,113,122,1)", "borderLeftColor": "rgba(113,113,122,1)", "backgroundColor": "rgba(63,63,70,1)" }, ".active": { "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)", "backgroundColor": "rgba(0,0,0,0)" } }, "cl-select-popup__range-shortcuts": { "": { "marginBottom": "28rpx", "display": "flex", "flexDirection": "row", "flexWrap": "wrap", "alignItems": "center" } } };
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["styles", [_style_0$3]]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "equip_collect",
    setup(__props) {
      usePage();
      useRefs();
      const attrConfig = vue.ref([]);
      const data = vue.ref([]);
      const chartRef = vue.ref(null);
      const containerSize = vue.ref(800);
      const selectDateRef = vue.ref(null);
      const customDate = vue.ref(["", ""]);
      let equipSn = "";
      new UTSJSONObject({});
      let singleHeight = 600;
      const shortcuts = vue.ref([
        {
          label: t("今天"),
          value: [
            dayUts().format("YYYY-MM-DD"),
            dayUts().format("YYYY-MM-DD")
          ]
        },
        {
          label: t("昨日"),
          value: [
            dayUts().subtract(1, "day").format("YYYY-MM-DD"),
            dayUts().subtract(1, "day").format("YYYY-MM-DD")
          ]
        },
        {
          label: t("本周"),
          value: [
            dayUts().startOf("week").format("YYYY-MM-DD"),
            dayUts().endOf("week").format("YYYY-MM-DD")
          ]
        },
        {
          label: t("本月"),
          value: [
            dayUts().startOf("month").format("YYYY-MM-DD"),
            dayUts().endOf("month").format("YYYY-MM-DD")
          ]
        }
      ]);
      function generateOption() {
        let visualMap = [];
        let xAxis = [];
        let yAxis = [];
        let grid = [];
        let series = [];
        let title = [];
        let single = 100 / attrConfig.value.length;
        attrConfig.value.forEach((item, index) => {
          visualMap.push(new UTSJSONObject({
            show: false,
            type: "continuous",
            seriesIndex: index
          }));
          title.push(new UTSJSONObject({
            top: "".concat(single / 15 + single * index, "%"),
            left: "center",
            text: item.name
          }));
          xAxis.push(new UTSJSONObject({
            gridIndex: index,
            type: "time",
            splitLine: new UTSJSONObject({
              show: false
            }),
            axisLabel: new UTSJSONObject({
              rotate: 45,
              interval: "auto"
              // 自动调整显示间隔
            })
          }));
          yAxis.push(new UTSJSONObject({
            type: "value",
            gridIndex: index,
            splitLine: new UTSJSONObject({
              show: false
            })
          }));
          grid.push(new UTSJSONObject({
            top: "".concat(single / 5 + single * index, "%"),
            height: "".concat(single * 3 / 5, "%")
          }));
          let vList = [];
          data.value.forEach((item2) => {
            let d = item2.data[item.name];
            if (d != null) {
              vList.push([item2.time, d]);
            } else {
              vList.push([item2.time, ""]);
            }
          });
          series.push(new UTSJSONObject({
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: new UTSJSONObject({}),
            data: vList,
            xAxisIndex: index,
            yAxisIndex: index
          }));
        });
        return new UTSJSONObject({
          visualMap,
          title,
          tooltip: new UTSJSONObject({
            trigger: "axis"
          }),
          xAxis,
          yAxis,
          grid,
          series
        });
      }
      const loadConfig = () => {
        return __awaiter(this, void 0, void 0, function* () {
          yield request({
            url: apiPath.equip_config,
            method: "GET",
            data: new UTSJSONObject({
              equipSn
            })
          }).then((res = null) => {
            if (res === null) {
              return null;
            }
            let r = parseData(res);
            if (r == null || r.config == null) {
              return null;
            }
            if (r.config.attrs == null || r.config.attrs.length <= 0) {
              return null;
            }
            let rr = [];
            r.config.attrs.forEach((item) => {
              if (item.needCollect != null && item.needCollect) {
                rr.push(item);
              }
            });
            containerSize.value = rr.length * singleHeight;
            attrConfig.value = rr;
          });
        });
      };
      const loadHistory = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (attrConfig.value == null || attrConfig.value.length <= 0) {
            return Promise.resolve(null);
          }
          yield request({
            url: apiPath.equip_collect_page,
            method: "POST",
            data: new UTSJSONObject({
              sn: equipSn,
              startDate: customDate.value[0] == null ? null : customDate.value[0] + "  00:00:00",
              endDate: customDate.value[1] == null ? null : customDate.value[1] + " 23:59:59",
              requirePage: false
            })
          }).then((res = null) => {
            if (res === null) {
              return null;
            }
            let r = parseData(res);
            if (r == null) {
              return null;
            }
            data.value = r;
          });
        });
      };
      function reloadHistory(s) {
        loadHistory();
      }
      function formatDate(date = null) {
        if (date == null) {
          return "";
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return "".concat(year, "-").concat(month, "-").concat(day);
      }
      const init = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (chartRef.value == null)
            return Promise.resolve(null);
          yield chartRef.value.init(null);
        });
      };
      const reloadEChart = () => {
        return __awaiter(this, void 0, void 0, function* () {
          let option = generateOption();
          chartRef.value.setOption(option);
        });
      };
      vue.watch(data, () => {
        reloadEChart();
      }, { deep: true });
      vue.onLoad((options) => {
        equipSn = options.sn;
        let current = /* @__PURE__ */ new Date();
        customDate.value = [formatDate(current), formatDate(current)];
        loadConfig();
      });
      vue.onShow(() => {
        setTimeout(() => {
          loadHistory();
        }, 500);
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_select_date = resolveEasycom(vue.resolveDynamicComponent("cl-select-date"), __easycom_2);
        const _component_l_echart = resolveEasycom(vue.resolveDynamicComponent("l-echart"), __easycom_3$1);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createElementBlock("scroll-view", new UTSJSONObject({
          style: new UTSJSONObject({ flex: 1 }),
          "scroll-with-animation": true
        }), [
          vue.createVNode(_component_cl_page, null, {
            default: vue.withCtx(() => {
              return [
                vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                  fixed: "",
                  "background-color": vue.unref(isDark) ? "black" : "white",
                  "show-back": true,
                  "safe-area-top": "",
                  height: vue.unref(isMp)() ? null : 100,
                  pt: new UTSJSONObject({
                    className: "-important-z-50"
                  })
                }), {
                  default: vue.withCtx(() => {
                    return [
                      vue.createElementVNode("view", new UTSJSONObject({
                        class: vue.normalizeClass(["flex flex-row items-center justify-center p-3 flex-1 w-full", new UTSJSONObject({
                          "pt-0": vue.unref(isMp)()
                        })])
                      }), [
                        vue.createVNode(_component_cl_text, new UTSJSONObject({
                          color: "primary",
                          pt: new UTSJSONObject({
                            className: "-important-text-xl ml-2"
                          })
                        }), {
                          default: vue.withCtx(() => {
                            return [
                              vue.createTextVNode(vue.toDisplayString(vue.unref(t)("历史曲线")), 1)
                            ];
                          }),
                          _: 1
                        })
                      ], 2)
                    ];
                  }),
                  _: 1
                }, 8, ["background-color", "height"]),
                attrConfig.value.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  key: 0,
                  class: "p-3"
                }), [
                  vue.createVNode(_component_cl_select_date, new UTSJSONObject({
                    ref: selectDateRef.value,
                    values: customDate.value,
                    "onUpdate:values": _cache[0] || (_cache[0] = ($event = null) => {
                      return customDate.value = $event;
                    }),
                    type: "date",
                    title: "",
                    shortcuts: shortcuts.value,
                    "label-format": "YYYY-MM-DD",
                    "value-format": "YYYY-MM-DD",
                    onRangeChange: reloadHistory,
                    pt: new UTSJSONObject({ className: "text-2xl h-16" }),
                    rangeable: ""
                  }), null, 8, ["values", "shortcuts"]),
                  vue.createElementVNode("view", new UTSJSONObject({
                    class: "echart-equip",
                    style: vue.normalizeStyle("height: " + containerSize.value + "rpx")
                  }), [
                    vue.createVNode(_component_l_echart, new UTSJSONObject({
                      ref_key: "chartRef",
                      ref: chartRef,
                      onFinished: init,
                      style: new UTSJSONObject({ "width": "100%", "height": "100%" })
                    }), null, 512)
                  ], 4)
                ])) : vue.createCommentVNode("", true),
                attrConfig.value.length <= 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  key: 1,
                  class: "p-3 mt-5"
                }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text-gray-400 text-center" }), "-- " + vue.toDisplayString(vue.unref(t)("未对该设备进行数据采集配置")) + " --", 1)
                ])) : vue.createCommentVNode("", true)
              ];
            }),
            _: 1
          })
        ]);
      };
    }
  });
  const _style_0$2 = { "echart-equip": { "": { "overflow": "hidden", "marginTop": "35rpx", "width": "100%", "backgroundColor": "rgba(255,255,255,1)" } } };
  const PagesEquipEquipCollect = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["styles", [_style_0$2]]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "workshop_scada",
    setup(__props) {
      const iframeUrl = vue.ref(null);
      function loadIframeUrl(workshopCode = null) {
        if (workshopCode == null || workshopCode == "-1") {
          iframeUrl.value = null;
          return null;
        }
        request({
          url: apiPath.workshop_scada,
          method: "GET",
          data: new UTSJSONObject({
            workshopCode,
            platform: 2
          })
        }).then((res = null) => {
          if (res === null) {
            iframeUrl.value = null;
            return null;
          }
          const r = parseData(res);
          if (r == null || r.url == null || r.url == "") {
            iframeUrl.value = null;
            return null;
          }
          iframeUrl.value = r.url;
        });
      }
      vue.onLoad((query) => {
        loadIframeUrl(query.workshopCode);
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            return [
              vue.createElementVNode("web-view", new UTSJSONObject({
                src: iframeUrl.value,
                style: new UTSJSONObject({ "flex": "1" })
              }), null, 8, ["src"])
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "message_detail",
    emits: ["maskAsRead"],
    setup(__props, _a) {
      _a.emit;
      const message = vue.ref(null);
      const sourceTitle = vue.ref(null);
      const sourceId = vue.ref(null);
      const sourceSubTitle = vue.ref(null);
      const markAsRead = (id) => {
        return __awaiter(this, void 0, void 0, function* () {
          yield request({
            url: apiPath.message_read,
            method: "GET",
            data: new UTSJSONObject({ messageId: id })
          }).then((res = null) => {
            uni.$emit("maskAsRead", id);
          });
        });
      };
      const equipQuery = (id) => {
        return __awaiter(this, void 0, void 0, function* () {
          yield request({
            url: apiPath.equip_id,
            method: "GET",
            data: new UTSJSONObject({ id })
          }).then((res = null) => {
            var _a2;
            if (res == null) {
              return null;
            }
            const r = parseData(res);
            if (r == null) {
              return null;
            }
            sourceTitle.value = r.name;
            sourceId.value = r.selfCode;
            sourceSubTitle.value = (_a2 = r.workshop) === null || _a2 === void 0 ? null : _a2.name;
          });
        });
      };
      const loadDetail = (id) => {
        return __awaiter(this, void 0, void 0, function* () {
          var _a2;
          yield request({
            url: apiPath.message_detail,
            method: "GET",
            data: new UTSJSONObject({
              id,
              accId: (_a2 = userInfo.value) === null || _a2 === void 0 ? null : _a2.id
            })
          }).then((res = null) => {
            if (res == null) {
              return null;
            }
            const r = parseData(res);
            if (r == null) {
              return null;
            }
            message.value = r;
            if (r.readStatus == 0) {
              markAsRead(r.id);
            }
            if (r.source == "Equip" && r.sourceId != null) {
              equipQuery(r.sourceId);
            }
          });
        });
      };
      function toOther() {
        if (message.value == null || message.value.source == null || message.value.sourceId == null) {
          return null;
        }
        if (message.value.source == "Equip") {
          router.to("/pages/equip/equip_detail?id=" + message.value.sourceId);
        }
      }
      vue.onLoad((options) => {
        if (options == null) {
          return null;
        }
        let id = options.id;
        loadDetail(id);
      });
      return (_ctx = null, _cache = null) => {
        const _component_cl_text = resolveEasycom(vue.resolveDynamicComponent("cl-text"), __easycom_0$6);
        const _component_cl_topbar = resolveEasycom(vue.resolveDynamicComponent("cl-topbar"), __easycom_1$6);
        const _component_cl_image = resolveEasycom(vue.resolveDynamicComponent("cl-image"), __easycom_2$3);
        const _component_cl_icon = resolveEasycom(vue.resolveDynamicComponent("cl-icon"), _sfc_main$R);
        const _component_cl_page = resolveEasycom(vue.resolveDynamicComponent("cl-page"), _sfc_main$G);
        return vue.openBlock(), vue.createBlock(_component_cl_page, null, new UTSJSONObject({
          default: vue.withCtx(() => {
            var _a2, _b, _c, _d;
            return [
              vue.createVNode(_component_cl_topbar, new UTSJSONObject({
                fixed: "",
                "show-back": true,
                "safe-area-top": "",
                "background-color": vue.unref(isDark) ? "black" : "white"
              }), {
                default: vue.withCtx(() => {
                  return [
                    vue.createVNode(_component_cl_text, new UTSJSONObject({
                      pt: new UTSJSONObject({ className: "-important-text-xl font-bold" }),
                      title: vue.unref(t)("消息详情")
                    }), {
                      default: vue.withCtx(() => {
                        return [
                          vue.createTextVNode(" 消息详情 ")
                        ];
                      }),
                      _: 1
                    }, 8, ["title"])
                  ];
                }),
                _: 1
              }, 8, ["background-color"]),
              vue.createElementVNode("scroll-view", new UTSJSONObject({
                "scroll-y": "",
                class: "p-4 content-wrapper"
              }), [
                vue.createElementVNode("view", new UTSJSONObject({
                  class: vue.normalizeClass(["detail-card", new UTSJSONObject({ "card-type1": ((_a2 = message.value) === null || _a2 === void 0 ? null : _a2.type) === 1 })])
                }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "detail-header" }), [
                    vue.createVNode(_component_cl_image, new UTSJSONObject({
                      src: "/static/icon/message/type_".concat(message.value == null ? 0 : message.value.type, ".svg"),
                      class: "detail-icon"
                    }), null, 8, ["src"]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "detail-meta" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "detail-title" }), vue.toDisplayString((_b = message.value) === null || _b === void 0 ? null : _b.title), 1),
                      vue.createElementVNode("text", new UTSJSONObject({ class: "detail-time" }), vue.toDisplayString((_c = message.value) === null || _c === void 0 ? null : _c.createdTime), 1)
                    ])
                  ]),
                  sourceTitle.value != null ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    key: 0,
                    class: "message-source",
                    onClick: toOther
                  }), [
                    vue.createVNode(_component_cl_image, new UTSJSONObject({
                      class: "message-source-left",
                      src: "/static/icon/source.svg"
                    }), null, 8, ["src"]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "message-source-middle" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "text-lg text-gray-600" }), vue.toDisplayString(sourceTitle.value), 1),
                      vue.createElementVNode("text", new UTSJSONObject({ class: "text-xs text-gray-500" }), vue.toDisplayString(sourceSubTitle.value), 1),
                      vue.createElementVNode("text", new UTSJSONObject({ class: "text-base text-gray-400" }), vue.toDisplayString(sourceId.value), 1)
                    ]),
                    vue.createVNode(_component_cl_icon, new UTSJSONObject({
                      class: "message-source-right",
                      name: "arrow-right-s-line",
                      pt: new UTSJSONObject({
                        className: "-important-text-lg text-gray-400"
                      })
                    }))
                  ])) : vue.createCommentVNode("", true),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "detail-content" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "pb-2 text-lg" }), "[" + vue.toDisplayString(vue.unref(t)("报警内容")) + "]:", 1),
                    vue.createElementVNode("text", null, vue.toDisplayString((_d = message.value) === null || _d === void 0 ? null : _d.context), 1)
                  ])
                ], 2)
              ])
            ];
          }),
          _: 1
        }));
      };
    }
  });
  const _style_0$1 = { "detail-card": { "": { "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx", "backgroundColor": "rgba(255,255,255,1)", "paddingTop": "42rpx", "paddingRight": "42rpx", "paddingBottom": "42rpx", "paddingLeft": "42rpx", "boxShadow": "rgba(0, 0, 0, 0.1)" } }, "card-type1": { "": { "borderTopWidth": 2, "borderRightWidth": 2, "borderBottomWidth": 2, "borderLeftWidth": 2, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#ba0404", "borderRightColor": "#ba0404", "borderBottomColor": "#ba0404", "borderLeftColor": "#ba0404" } }, "detail-header": { "": { "marginBottom": "42rpx", "display": "flex", "alignItems": "center" } }, "detail-icon": { "": { "marginRight": "28rpx", "height": "84rpx", "width": "84rpx", "alignItems": "center" } }, "detail-meta": { "": { "marginTop": "35rpx", "display": "flex", "flexDirection": "column" } }, "detail-title": { "": { "marginBottom": "7rpx", "display": "flex", "width": "100%", "textAlign": "center", "fontSize": "42rpx", "lineHeight": "56rpx", "fontWeight": "700" } }, "message-source": { "": { "marginBottom": "35rpx", "display": "flex", "width": "100%", "flexDirection": "row", "alignItems": "center", "borderTopLeftRadius": "7rpx", "borderTopRightRadius": "7rpx", "borderBottomRightRadius": "7rpx", "borderBottomLeftRadius": "7rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(243,244,246,1)", "borderRightColor": "rgba(243,244,246,1)", "borderBottomColor": "rgba(243,244,246,1)", "borderLeftColor": "rgba(243,244,246,1)", "backgroundColor": "rgba(255,255,255,1)", "paddingTop": "14rpx", "paddingRight": "14rpx", "paddingBottom": "14rpx", "paddingLeft": "14rpx" } }, "message-source-middle": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "paddingRight": "14rpx", "paddingLeft": "14rpx" } }, "message-source-left": { "": { "flexGrow": 0, "flexShrink": 0, "flexBasis": "auto", "height": "100%", "width": "28rpx", "alignItems": "center", "justifyContent": "center", "paddingTop": "21rpx", "paddingRight": "21rpx", "paddingBottom": "21rpx", "paddingLeft": "21rpx" } }, "message-source-right": { "": { "flexGrow": 0, "flexShrink": 0, "flexBasis": "auto", "height": "100%", "width": "35rpx" } }, "detail-time": { "": { "display": "flex", "textAlign": "center", "fontSize": "24.5rpx", "lineHeight": "35rpx", "color": "rgba(107,114,128,1)" } }, "detail-content": { "": { "whiteSpace": "pre-wrap", "fontSize": "28rpx", "lineHeight": 1.625 } } };
  const PagesMessageMessageDetail = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0$1]]]);
  __definePage("pages/index/home", PagesIndexHome);
  __definePage("pages/index/equip", PagesIndexEquip);
  __definePage("pages/index/work", PagesIndexWork);
  __definePage("pages/index/message", PagesIndexMessage);
  __definePage("pages/index/my", PagesIndexMy);
  __definePage("pages/set/index", _sfc_main$j);
  __definePage("pages/set/general", _sfc_main$h);
  __definePage("pages/set/notice", _sfc_main$f);
  __definePage("pages/set/about", _sfc_main$e);
  __definePage("pages/set/cs", _sfc_main$d);
  __definePage("pages/user/login", PagesUserLogin);
  __definePage("pages/equip/equip_detail", PagesEquipEquipDetail);
  __definePage("pages/equip/workshop_tree", PagesEquipWorkshopTree);
  __definePage("pages/equip/equip_collect", PagesEquipEquipCollect);
  __definePage("pages/equip/workshop_scada", _sfc_main$2);
  __definePage("pages/message/message_detail", PagesMessageMessageDetail);
  const _sfc_main = vue.defineComponent({
    onLaunch: function() {
      uni.__log__("log", "at App.uvue:15", "App Launch");
      if (router.isLoginPage(router.path()))
        return null;
      const user2 = useStore().user;
      if (user2.isUnLogin()) {
        uni.__log__("log", "at App.uvue:20", "未登陆");
        user2.logout();
        return null;
      }
      connectMessage();
    },
    onShow: function() {
      uni.__log__("log", "at App.uvue:27", "App Show");
      if (router.isLoginPage(router.path()))
        return null;
      const user2 = useStore().user;
      if (user2.isUnLogin()) {
        uni.__log__("log", "at App.uvue:33", "未登陆");
        user2.logout();
        return null;
      }
      user2.get();
      connectMessage();
    },
    onHide: function() {
      disconnectMessage();
    },
    onExit: function() {
      disconnectMessage();
    }
  });
  const _style_0 = { "container": { "": { "width": "100%" } }, "pointer-events-none": { "": { "pointerEvents": "none" } }, "fixed": { "": { "position": "fixed" } }, "absolute": { "": { "position": "absolute" } }, "relative": { "": { "position": "relative" } }, "-important-right-1": { "": { "!right": "7rpx" } }, "-important-right-6": { "": { "!right": "42rpx" } }, "-important-top-1": { "": { "!top": "7rpx" } }, "bottom-0": { "": { "bottom": 0 } }, "bottom-2": { "": { "bottom": "14rpx" } }, "bottom-3": { "": { "bottom": "21rpx" } }, "bottom--bracket-start-2px-bracket-end-": { "": { "bottom": 2 } }, "left-0": { "": { "left": 0 } }, "left-1": { "": { "left": "7rpx" } }, "left-1-slash-3": { "": { "left": "33.333333%" } }, "left-2-slash-3": { "": { "left": "66.666667%" } }, "right-0": { "": { "right": 0 } }, "right-2": { "": { "right": "14rpx" } }, "right-6": { "": { "right": "42rpx" } }, "right-8": { "": { "right": "56rpx" } }, "right--bracket-start--6rpx-bracket-end-": { "": { "right": "-6rpx" } }, "right--bracket-start-24rpx-bracket-end-": { "": { "right": "24rpx" } }, "top-0": { "": { "top": 0 } }, "top-1": { "": { "top": "7rpx" } }, "top-1-slash-2": { "": { "top": "50%" } }, "top-1-slash-3": { "": { "top": "33.333333%" } }, "top-2": { "": { "top": "14rpx" } }, "top-2-slash-3": { "": { "top": "66.666667%" } }, "top-6": { "": { "top": "42rpx" } }, "top--bracket-start-2px-bracket-end-": { "": { "top": 2 } }, "-important-z-50": { "": { "!zIndex": 50 } }, "z-10": { "": { "zIndex": 10 } }, "z-20": { "": { "zIndex": 20 } }, "z-50": { "": { "zIndex": 50 } }, "m-1": { "": { "marginTop": "7rpx", "marginRight": "7rpx", "marginBottom": "7rpx", "marginLeft": "7rpx" } }, "m-2": { "": { "marginTop": "14rpx", "marginRight": "14rpx", "marginBottom": "14rpx", "marginLeft": "14rpx" } }, "m-4": { "": { "marginTop": "28rpx", "marginRight": "28rpx", "marginBottom": "28rpx", "marginLeft": "28rpx" } }, "mx-1": { "": { "marginLeft": "7rpx", "marginRight": "7rpx" } }, "mx-2": { "": { "marginLeft": "14rpx", "marginRight": "14rpx" } }, "mx-3": { "": { "marginLeft": "21rpx", "marginRight": "21rpx" } }, "mb-1": { "": { "marginBottom": "7rpx" } }, "mb-2": { "": { "marginBottom": "14rpx" }, ".5": { "marginBottom": "17.5rpx" } }, "mb-3": { "": { "marginBottom": "21rpx" } }, "mb-4": { "": { "marginBottom": "28rpx" } }, "mb-5": { "": { "marginBottom": "35rpx" } }, "mb-8": { "": { "marginBottom": "56rpx" } }, "ml-1": { "": { "marginLeft": "7rpx" } }, "ml-2": { "": { "marginLeft": "14rpx" } }, "ml-3": { "": { "marginLeft": "21rpx" } }, "ml-4": { "": { "marginLeft": "28rpx" } }, "ml-5": { "": { "marginLeft": "35rpx" } }, "ml-6": { "": { "marginLeft": "42rpx" } }, "ml--bracket-start--4rpx-bracket-end-": { "": { "marginLeft": "-4rpx" } }, "mr-1": { "": { "marginRight": "7rpx" } }, "mr-10": { "": { "marginRight": "70rpx" } }, "mr-2": { "": { "marginRight": "14rpx" } }, "mr-24": { "": { "marginRight": "168rpx" } }, "mr-3": { "": { "marginRight": "21rpx" } }, "mr-32": { "": { "marginRight": "224rpx" } }, "mr-4": { "": { "marginRight": "28rpx" } }, "mr-6": { "": { "marginRight": "42rpx" } }, "mr-8": { "": { "marginRight": "56rpx" } }, "mr--bracket-start--4rpx-bracket-end-": { "": { "marginRight": "-4rpx" } }, "mr--bracket-start-10rpx-bracket-end-": { "": { "marginRight": "10rpx" } }, "mr--bracket-start-8rpx-bracket-end-": { "": { "marginRight": "8rpx" } }, "mr-auto": { "": { "marginRight": "auto" } }, "mt-1": { "": { "marginTop": "7rpx" } }, "mt-2": { "": { "marginTop": "14rpx" } }, "mt-3": { "": { "marginTop": "21rpx" } }, "mt-4": { "": { "marginTop": "28rpx" } }, "mt-5": { "": { "marginTop": "35rpx" } }, "box-border": { "": { "boxSizing": "border-box" } }, "flex": { "": { "display": "flex" } }, "hidden": { "": { "display": "none" } }, "-important-h--bracket-start-600rpx-bracket-end-": { "": { "!height": "600rpx" } }, "-important-h--bracket-start-90rpx-bracket-end-": { "": { "!height": "90rpx" } }, "-important-h-full": { "": { "!height": "100%" } }, "h-1-slash-2": { "": { "height": "50%" } }, "h-12": { "": { "height": "84rpx" } }, "h-14": { "": { "height": "98rpx" } }, "h-16": { "": { "height": "112rpx" } }, "h-2": { "": { "height": "14rpx" } }, "h-3": { "": { "height": "21rpx" } }, "h-4": { "": { "height": "28rpx" } }, "h-8": { "": { "height": "56rpx" } }, "h--bracket-start-160rpx-bracket-end-": { "": { "height": "160rpx" } }, "h--bracket-start-60px-bracket-end-": { "": { "height": 60 } }, "h--bracket-start-72rpx-bracket-end-": { "": { "height": "72rpx" } }, "h--bracket-start-80rpx-bracket-end-": { "": { "height": "80rpx" } }, "h-full": { "": { "height": "100%" } }, "w-1-slash-2": { "": { "width": "50%" } }, "w-1-slash-5": { "": { "width": "20%" } }, "w-12": { "": { "width": "84rpx" } }, "w-2": { "": { "width": "14rpx" } }, "w-24": { "": { "width": "168rpx" } }, "w-3": { "": { "width": "21rpx" } }, "w-4": { "": { "width": "28rpx" } }, "w-4-slash-5": { "": { "width": "80%" } }, "w-5": { "": { "width": "35rpx" } }, "w-6": { "": { "width": "42rpx" } }, "w-8": { "": { "width": "56rpx" } }, "w--bracket-start-100rpx-bracket-end-": { "": { "width": "100rpx" } }, "w--bracket-start-120rpx-bracket-end-": { "": { "width": "120rpx" } }, "w-full": { "": { "width": "100%" } }, "flex-1": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "flex-none": { "": { "flexGrow": 0, "flexShrink": 0, "flexBasis": "auto" } }, "flex-shrink": { "": { "flexShrink": 1 } }, "rotate-90": { "": { "transform": "rotate(90deg)" } }, "transform": { "": { "transform": "none" } }, "resize": { "": { "resize": "both" } }, "flex-row": { "": { "flexDirection": "row" } }, "flex-col": { "": { "flexDirection": "column" } }, "flex-wrap": { "": { "flexWrap": "wrap" } }, "items-start": { "": { "alignItems": "flex-start" } }, "items-end": { "": { "alignItems": "flex-end" } }, "items-center": { "": { "alignItems": "center" } }, "justify-start": { "": { "justifyContent": "flex-start" } }, "justify-end": { "": { "justifyContent": "flex-end" } }, "justify-center": { "": { "justifyContent": "center" } }, "justify-between": { "": { "justifyContent": "space-between" } }, "overflow-hidden": { "": { "overflow": "hidden" } }, "overflow-visible": { "": { "overflow": "visible" } }, "overflow-y-auto": { "": { "overflowY": "auto" } }, "whitespace-nowrap": { "": { "whiteSpace": "nowrap" } }, "whitespace-pre-wrap": { "": { "whiteSpace": "pre-wrap" } }, "-important-rounded-3xl": { "": { "!borderTopLeftRadius": "42rpx", "!borderTopRightRadius": "42rpx", "!borderBottomRightRadius": "42rpx", "!borderBottomLeftRadius": "42rpx" } }, "-important-rounded--bracket-start-60rpx-bracket-end-": { "": { "!borderTopLeftRadius": "60rpx", "!borderTopRightRadius": "60rpx", "!borderBottomRightRadius": "60rpx", "!borderBottomLeftRadius": "60rpx" } }, "-important-rounded-full": { "": { "!borderTopLeftRadius": 9999, "!borderTopRightRadius": 9999, "!borderBottomRightRadius": 9999, "!borderBottomLeftRadius": 9999 } }, "-important-rounded-xl": { "": { "!borderTopLeftRadius": "21rpx", "!borderTopRightRadius": "21rpx", "!borderBottomRightRadius": "21rpx", "!borderBottomLeftRadius": "21rpx" } }, "rounded": { "": { "borderTopLeftRadius": "7rpx", "borderTopRightRadius": "7rpx", "borderBottomRightRadius": "7rpx", "borderBottomLeftRadius": "7rpx" } }, "rounded-2xl": { "": { "borderTopLeftRadius": "28rpx", "borderTopRightRadius": "28rpx", "borderBottomRightRadius": "28rpx", "borderBottomLeftRadius": "28rpx" } }, "rounded-3xl": { "": { "borderTopLeftRadius": "42rpx", "borderTopRightRadius": "42rpx", "borderBottomRightRadius": "42rpx", "borderBottomLeftRadius": "42rpx" } }, "rounded-full": { "": { "borderTopLeftRadius": 9999, "borderTopRightRadius": 9999, "borderBottomRightRadius": 9999, "borderBottomLeftRadius": 9999 } }, "rounded-lg": { "": { "borderTopLeftRadius": "14rpx", "borderTopRightRadius": "14rpx", "borderBottomRightRadius": "14rpx", "borderBottomLeftRadius": "14rpx" } }, "rounded-md": { "": { "borderTopLeftRadius": "10.5rpx", "borderTopRightRadius": "10.5rpx", "borderBottomRightRadius": "10.5rpx", "borderBottomLeftRadius": "10.5rpx" } }, "rounded-sm": { "": { "borderTopLeftRadius": "3.5rpx", "borderTopRightRadius": "3.5rpx", "borderBottomRightRadius": "3.5rpx", "borderBottomLeftRadius": "3.5rpx" } }, "rounded-xl": { "": { "borderTopLeftRadius": "21rpx", "borderTopRightRadius": "21rpx", "borderBottomRightRadius": "21rpx", "borderBottomLeftRadius": "21rpx" } }, "border": { "": { "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1 } }, "border-b": { "": { "borderBottomWidth": 1 } }, "border-solid": { "": { "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid" } }, "border-gray-100": { "": { "borderTopColor": "rgba(243,244,246,1)", "borderRightColor": "rgba(243,244,246,1)", "borderBottomColor": "rgba(243,244,246,1)", "borderLeftColor": "rgba(243,244,246,1)" } }, "border-gray-200": { "": { "borderTopColor": "rgba(229,231,235,1)", "borderRightColor": "rgba(229,231,235,1)", "borderBottomColor": "rgba(229,231,235,1)", "borderLeftColor": "rgba(229,231,235,1)" } }, "border-primary-500": { "": { "borderTopColor": "rgba(20,184,166,1)", "borderRightColor": "rgba(20,184,166,1)", "borderBottomColor": "rgba(20,184,166,1)", "borderLeftColor": "rgba(20,184,166,1)" } }, "border-surface-200": { "": { "borderTopColor": "rgba(228,228,231,1)", "borderRightColor": "rgba(228,228,231,1)", "borderBottomColor": "rgba(228,228,231,1)", "borderLeftColor": "rgba(228,228,231,1)" } }, "border-surface-500": { "": { "borderTopColor": "rgba(113,113,122,1)", "borderRightColor": "rgba(113,113,122,1)", "borderBottomColor": "rgba(113,113,122,1)", "borderLeftColor": "rgba(113,113,122,1)" } }, "border-surface-600": { "": { "borderTopColor": "rgba(82,82,91,1)", "borderRightColor": "rgba(82,82,91,1)", "borderBottomColor": "rgba(82,82,91,1)", "borderLeftColor": "rgba(82,82,91,1)" } }, "border-surface-700": { "": { "borderTopColor": "rgba(63,63,70,1)", "borderRightColor": "rgba(63,63,70,1)", "borderBottomColor": "rgba(63,63,70,1)", "borderLeftColor": "rgba(63,63,70,1)" } }, "border-transparent": { "": { "borderTopColor": "rgba(0,0,0,0)", "borderRightColor": "rgba(0,0,0,0)", "borderBottomColor": "rgba(0,0,0,0)", "borderLeftColor": "rgba(0,0,0,0)" } }, "border-white": { "": { "borderTopColor": "rgba(255,255,255,1)", "borderRightColor": "rgba(255,255,255,1)", "borderBottomColor": "rgba(255,255,255,1)", "borderLeftColor": "rgba(255,255,255,1)" } }, "-important-border-r-transparent": { "": { "!borderRightColor": "rgba(0,0,0,0)" } }, "border-b-transparent": { "": { "borderBottomColor": "rgba(0,0,0,0)" } }, "border-l-transparent": { "": { "borderLeftColor": "rgba(0,0,0,0)" } }, "-important-bg-primary-600": { "": { "!backgroundColor": "rgba(13,148,136,1)" } }, "-important-bg-surface-100": { "": { "!backgroundColor": "rgba(244,244,245,1)" } }, "-important-bg-surface-200": { "": { "!backgroundColor": "rgba(228,228,231,1)" } }, "-important-bg-surface-400": { "": { "!backgroundColor": "rgba(161,161,170,1)" } }, "-important-bg-surface-50": { "": { "!backgroundColor": "rgba(250,250,250,1)" } }, "-important-bg-surface-700": { "": { "!backgroundColor": "rgba(63,63,70,1)" } }, "-important-bg-surface-800": { "": { "!backgroundColor": "rgba(39,39,42,1)" } }, "-important-bg-surface-900": { "": { "!backgroundColor": "rgba(24,24,27,1)" } }, "-important-bg-transparent": { "": { "!backgroundColor": "rgba(0,0,0,0)" } }, "-important-bg-white": { "": { "!backgroundColor": "rgba(255,255,255,1)" } }, "bg-black": { "": { "backgroundColor": "rgba(0,0,0,1)" } }, "bg-blue-500": { "": { "backgroundColor": "rgba(59,130,246,1)" } }, "bg-green-500": { "": { "backgroundColor": "rgba(34,197,94,1)" } }, "bg-primary-50": { "": { "backgroundColor": "rgba(240,253,250,1)" } }, "bg-primary-500": { "": { "backgroundColor": "rgba(20,184,166,1)" } }, "bg-red-500": { "": { "backgroundColor": "rgba(239,68,68,1)" } }, "bg-surface-100": { "": { "backgroundColor": "rgba(244,244,245,1)" } }, "bg-surface-200": { "": { "backgroundColor": "rgba(228,228,231,1)" } }, "bg-surface-300": { "": { "backgroundColor": "rgba(212,212,216,1)" } }, "bg-surface-50": { "": { "backgroundColor": "rgba(250,250,250,1)" } }, "bg-surface-500": { "": { "backgroundColor": "rgba(113,113,122,1)" } }, "bg-surface-600": { "": { "backgroundColor": "rgba(82,82,91,1)" } }, "bg-surface-800": { "": { "backgroundColor": "rgba(39,39,42,1)" } }, "bg-transparent": { "": { "backgroundColor": "rgba(0,0,0,0)" } }, "bg-white": { "": { "backgroundColor": "rgba(255,255,255,1)" } }, "bg-yellow-500": { "": { "backgroundColor": "rgba(234,179,8,1)" } }, "-important-p-0": { "": { "!paddingTop": 0, "!paddingRight": 0, "!paddingBottom": 0, "!paddingLeft": 0 } }, "p-0": { "": { "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0 } }, "p-1": { "": { "paddingTop": "7rpx", "paddingRight": "7rpx", "paddingBottom": "7rpx", "paddingLeft": "7rpx" } }, "p-10": { "": { "paddingTop": "70rpx", "paddingRight": "70rpx", "paddingBottom": "70rpx", "paddingLeft": "70rpx" } }, "p-14": { "": { "paddingTop": "98rpx", "paddingRight": "98rpx", "paddingBottom": "98rpx", "paddingLeft": "98rpx" } }, "p-2": { "": { "paddingTop": "14rpx", "paddingRight": "14rpx", "paddingBottom": "14rpx", "paddingLeft": "14rpx" } }, "p-3": { "": { "paddingTop": "21rpx", "paddingRight": "21rpx", "paddingBottom": "21rpx", "paddingLeft": "21rpx" } }, "p-4": { "": { "paddingTop": "28rpx", "paddingRight": "28rpx", "paddingBottom": "28rpx", "paddingLeft": "28rpx" } }, "p--bracket-start-24rpx-bracket-end-": { "": { "paddingTop": "24rpx", "paddingRight": "24rpx", "paddingBottom": "24rpx", "paddingLeft": "24rpx" } }, "-important-px-4": { "": { "!paddingLeft": "28rpx", "!paddingRight": "28rpx" } }, "px-10": { "": { "paddingLeft": "70rpx", "paddingRight": "70rpx" } }, "px-2": { "": { "paddingLeft": "14rpx", "paddingRight": "14rpx" }, ".5": { "paddingLeft": "17.5rpx", "paddingRight": "17.5rpx" } }, "px-3": { "": { "paddingLeft": "21rpx", "paddingRight": "21rpx" } }, "px-4": { "": { "paddingLeft": "28rpx", "paddingRight": "28rpx" } }, "px--bracket-start-10rpx-bracket-end-": { "": { "paddingLeft": "10rpx", "paddingRight": "10rpx" } }, "px--bracket-start-20rpx-bracket-end-": { "": { "paddingLeft": "20rpx", "paddingRight": "20rpx" } }, "px--bracket-start-32rpx-bracket-end-": { "": { "paddingLeft": "32rpx", "paddingRight": "32rpx" } }, "py-1": { "": { "paddingTop": "7rpx", "paddingBottom": "7rpx" } }, "py-10": { "": { "paddingTop": "70rpx", "paddingBottom": "70rpx" } }, "py-2": { "": { "paddingTop": "14rpx", "paddingBottom": "14rpx" } }, "py-20": { "": { "paddingTop": "140rpx", "paddingBottom": "140rpx" } }, "py-3": { "": { "paddingTop": "21rpx", "paddingBottom": "21rpx" } }, "py-5": { "": { "paddingTop": "35rpx", "paddingBottom": "35rpx" } }, "py--bracket-start-24rpx-bracket-end-": { "": { "paddingTop": "24rpx", "paddingBottom": "24rpx" } }, "-important-pl-0": { "": { "!paddingLeft": 0 } }, "pb-2": { "": { "paddingBottom": "14rpx" } }, "pb-3": { "": { "paddingBottom": "21rpx" } }, "pl-2": { "": { "paddingLeft": "14rpx" } }, "pr-2": { "": { "paddingRight": "14rpx" } }, "pr--bracket-start-12rpx-bracket-end-": { "": { "paddingRight": "12rpx" } }, "pt-0": { "": { "paddingTop": 0 } }, "pt-16": { "": { "paddingTop": "112rpx" } }, "pt-2": { "": { "paddingTop": "14rpx" } }, "pt-24": { "": { "paddingTop": "168rpx" } }, "pt-6": { "": { "paddingTop": "42rpx" } }, "text-center": { "": { "textAlign": "center" } }, "-important-text-2xl": { "": { "!fontSize": "42rpx", "!lineHeight": "56rpx" } }, "-important-text-base": { "": { "!fontSize": "28rpx", "!lineHeight": "42rpx" } }, "-important-text-lg": { "": { "!fontSize": "31.5rpx", "!lineHeight": "49rpx" } }, "-important-text-xl": { "": { "!fontSize": "35rpx", "!lineHeight": "49rpx" } }, "-important-text-xs": { "": { "!fontSize": "21rpx", "!lineHeight": "28rpx" } }, "text-2xl": { "": { "fontSize": "42rpx", "lineHeight": "56rpx" } }, "text-base": { "": { "fontSize": "28rpx", "lineHeight": "42rpx" } }, "text-lg": { "": { "fontSize": "31.5rpx", "lineHeight": "49rpx" } }, "text-md": { "": { "fontSize": "28rpx", "lineHeight": "42rpx" } }, "text-sm": { "": { "fontSize": "24.5rpx", "lineHeight": "35rpx" } }, "text-xl": { "": { "fontSize": "35rpx", "lineHeight": "49rpx" } }, "text-xs": { "": { "fontSize": "21rpx", "lineHeight": "28rpx" } }, "-important-font-bold": { "": { "!fontWeight": "700" } }, "font-bold": { "": { "fontWeight": "700" } }, "font-normal": { "": { "fontWeight": "400" } }, "leading-relaxed": { "": { "lineHeight": 1.625 } }, "-important-text-surface-300": { "": { "!color": "rgba(212,212,216,1)" } }, "-important-text-surface-400": { "": { "!color": "rgba(161,161,170,1)" } }, "-important-text-surface-50": { "": { "!color": "rgba(250,250,250,1)" } }, "text-gray-300": { "": { "color": "rgba(209,213,219,1)" } }, "text-gray-400": { "": { "color": "rgba(156,163,175,1)" } }, "text-gray-500": { "": { "color": "rgba(107,114,128,1)" } }, "text-gray-600": { "": { "color": "rgba(75,85,99,1)" } }, "text-primary-500": { "": { "color": "rgba(20,184,166,1)" } }, "text-red-500": { "": { "color": "rgba(239,68,68,1)" } }, "text-surface-100": { "": { "color": "rgba(244,244,245,1)" } }, "text-surface-400": { "": { "color": "rgba(161,161,170,1)" } }, "text-surface-50": { "": { "color": "rgba(250,250,250,1)" } }, "text-surface-500": { "": { "color": "rgba(113,113,122,1)" } }, "text-surface-900": { "": { "color": "rgba(24,24,27,1)" } }, "text-white": { "": { "color": "rgba(255,255,255,1)" } }, "opacity-0": { "": { "opacity": 0 } }, "opacity-30": { "": { "opacity": 0.3 } }, "opacity-50": { "": { "opacity": 0.5 } }, "opacity-80": { "": { "opacity": 0.8 } }, "shadow": { "": { "boxShadow": "rgba(0, 0, 0, 0.1)" } }, "shadow-lg": { "": { "boxShadow": "rgba(0, 0, 0, 0.1)" } }, "shadow-xl": { "": { "boxShadow": "rgba(0, 0, 0, 0.1)" } }, "transition-none": { "": { "transitionProperty": "none" } }, "duration-200": { "": { "transitionDuration": "200ms" } }, "safe-area-top": { "": { "marginTop": "env(safe-area-inset-top)" } }, "uni-tabbar__icon": { ".uni-tabbar ": { "marginTop": 0 } }, "uni-toast": { "": { "borderTopLeftRadius": "32rpx", "borderTopRightRadius": "32rpx", "borderBottomRightRadius": "32rpx", "borderBottomLeftRadius": "32rpx", "!backgroundColor": "rgba(0,0,0,0.8)" } }, "dark-colon--important-border-surface-700": { "": { "!borderTopColor": "rgba(63,63,70,1)", "!borderRightColor": "rgba(63,63,70,1)", "!borderBottomColor": "rgba(63,63,70,1)", "!borderLeftColor": "rgba(63,63,70,1)" } }, "dark-colon--important-bg-surface-700": { "": { "!backgroundColor": "rgba(63,63,70,1)" } }, "dark-colon--important-bg-surface-800": { "": { "!backgroundColor": "rgba(39,39,42,1)" } }, "dark-colon--important-text-white": { "": { "!color": "rgba(255,255,255,1)" } }, "@FONT-FACE": [{ "fontFamily": "iconfont", "src": 'url("data:font/ttf;base64,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IGJ5IHN2ZzJ0dGYgZnJvbSBGb250ZWxsbyBwcm9qZWN0Lmh0dHA6Ly9mb250ZWxsby5jb20AQwByAGUAYQB0AGUAZAAgAGIAeQAgAGkAYwBvAG4AZgBvAG4AdABjAGwALQBpAGMAbwBuAGYAbwBuAHQAUgBlAGcAdQBsAGEAcgBjAGwALQBpAGMAbwBuAGYAbwBuAHQAYwBsAC0AaQBjAG8AbgBmAG8AbgB0AFYAZQByAHMAaQBvAG4AIAAxAC4AMABjAGwALQBpAGMAbwBuAGYAbwBuAHQARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIBAgEDAQQBBQEGAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMBFAEVARYBFwEYARkBGgEbARwBHQEeAR8BIAEhASIBIwAEYmFjawN5dWUId2FuY2hlbmcGc2hpYmFpBmJvZmFuZwdwaW5nbHVuB2h1YXRvbmcHZGlhbnphbgRmdWxpB2ppdWRpYW4GdHVwaWFuB2Rpbmd3ZWkDdmlwB3l1bmR1YW4IbmFvemhvbmcHamlhb2xpdQZzaG91cnUGemhpY2h1B3NoaWppYW4HcGFpemhhbwVxaWNoZQhzaHVpcGlhbwdkaW5neXVlBmtlZnVfMgx0dWljaHVkZW5nbHUJcGluZ2x1bl8yB3FpYW5iYW8Ic291c3VvXzIKeW91aHVpcXVhbghnb3V3dWRhaQZndWFubGkGcWlhbmJpCWh1YW5nZ3VhbgAAAAA=") format("woff")' }, { "fontFamily": "remixicon", "src": 'url("data:font/ttf;base64,AAEAAAALAIAAAwAwR1NVQiCLJXoAAAE4AAAAVE9TLzJCw1nwAAABjAAAAFZjbWFwhDk4UQAADhAAADVyZ2x5ZtskChIAAEmcAAGVFGhlYWQtsn+tAAAA4AAAADZoaGVhCMcHOgAAALwAAAAkaG10eNbUAAAAAAHkAAAMLGxvY2HMoDOgAABDhAAABhhtYXhwBCEAmAAAARgAAAAgbmFtZRwN5TYAAd6wAAADKnBvc3RJRqFaAAHh3AAANLAAAQAAA/z/TAAABOIAAAAABMkAAQAAAAAAAAAAAAAAAAAAAwsAAQAAAAEAAFIXJRFfDzz1AAsEsAAAAADk5R1cAAAAAOTlHVwAAP9lBMkD4wAAAAgAAgAAAAAAAAABAAADCwCMAAwAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAEE4AGQAAUAAAL5A0gAAACoAvkDSAAAAkAAOgE1AAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAQOoC9e4D/P9MAGwD/AC0AAAAAQAAAAAAAAAAAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAA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AyADJgMoAy4DMAM+A0ADTgNQA1IDVANWA1gDWgNcA2IDZANmA2oDbANuA3QDdgN4A3gDegN8A4IDhAOGA4gDiAOIA4oDjAOOA5ADlgOYA54DoAOiA6YDqAOoA6wDrgOwA7IDtAO+A8ADxAPEA8QDxgPgA+ID5APmA+wD9gP8BA4EEAQQBBIEFAQWBBYEFgQWBCQEJgQoBCgEKAQuBDAENgQ4BDoEQARCBEIEQgRMBFIEVARaBFwEXARkBGYEbARyBHIEeAR6BHoEegR8BH4EgASCBIQEigSMBI4EkASWBJgEmgS4BLoEvAS+BMAEwgTIBMoE0ATSBNQE1gTYBNgE2gTgBOIE6gT0BPQE9gT4BPoE/AT+BQQFBgUIBQgFCAUKBQwFEgUUBRQFFAUWBRgFGgUcBR4FIAUgBSIFLgU2BTgFOAU+BUAFQgVEBUoFXAVmBXQFdgV4BX4FiAWKBYwFkgWYBaIFpAWmBagFqgW8BbwFvgXSBdgF2gXcBd4F8AXyBfIF8gX0BfYF+AX8Bf4GAAYCBgQGBgYIBggGCgYKBhAGEgYSBhYGGAYYBhoGHAYeBiAGIgYoBioGKgYsBiwGLgYwBjIGNAY2BjgAAAE7AgcCBgIIAgkCCgILAbsBugHEAcQAfgB/AqsC3gFGAUcAMQAwACsAKgFPAU4CPQI8AUUBRAGXAZYARwBGAA8ACwAGABYAEwITACICFAAjABAADAAHAAgCDQAaABUAFAABAA4ACgAFAAQAFwASAAMADQAJAg4AGQACABgAEQDvAPAATQBMAiACHwE3ATgASwBKAQ0BDAIjAFQCIQBXAFcCIgBTAFIA3ADbAkwCSwDtAO4CUQJSAPwA+wBaAFsAXABdAQkCJABWAGIAYwItAi4CKgIrAGEAYAIpAigBcgF2AXcBcwF0AXUCNAI1AjYCNwIyAjMApQCkAJsAmgCgAKEAqACpAKwArQCvAK4AvAC9AJ8AngCxALAAvwC+AKYApwCrAKoCaQJpAcIBwgGzAbIBtwG2AbQBtQG5AbgC3ALbAWcBZgD0APMCPwI+Ab8BvgHDAcMAQwBCAEUARAJAAkACgQKAAVgBWQDJAMgBLAErAlcCWACWAJcAgQCAARcBFgCQAJEAkgCTAJUAlACDAIICOQI4AGUAZADVANQCcgJxAdQB1QDOAM8CWQJaAcYBxgBeAFgA/wEAAc0BzAHJAOIA4QIaAhkBWwFaAscCyADGAMcAwwDCAa4BrwEoASkBIgEqASMB3AHdAd8B3gCzALIA6wDsAOoA6QDmAOUCTQJOAOQA4wJQAk8C0ALPAPcA+AFoAWkB8QHwANoA2gIAAgEAZgBnAnkCeQK9ArwCuwGoAakBkwGSAZkBmAE6ATkAawBqAqQCpQF8AX0CWwJcAUEBQAE+AT8CXQJeAfIAJQAkAhwCGwAuAC8CZgJlAmMCZAFhAWAAPwA+AD0APABBAEABMwE0AbwBvQK6ArkA1gDXAmgCZwLKAskC/wL+AvMDBgLLAswDAQMAAvkC+AL9AvwC9AL1AwIDAwL7AvoC9gL3AF8AWQJVAGwAbAEDAQQBbQFsAfQB9QH3AdcB1gHbAdoB2QHYAc8BzgJsAmsAOAA5ADMAMgIeAh0ANQA0ADYANwJgAl8CfwJ+AVEBUAFSAVMC6ALnAMUAxABOAE8BnQGcAJkAmAIxAjAAogCjAX8BfgGBAYABTAFNAS4BLQEwAS8BMgExAfwB/QGlAaQBowGiAs4CzQFqAWsBegF7AXkBeAFeAV8CvgGHAYYB7AHtAYgBiQLaAtECOwI6Au4C7QFcAV0BjQGMAtYC1QDRAkkCSgDQAwgDBwIlAFUBiwGKAsACvwETARIAbgBtAEgASQJ9AnwBVAFVAoUChADeAN0CRQJGAN8A4AC1ALQBsAGxALcAtgHBAcABjwGOATUBNgKvAq4BDwEOAHsAfABwAG8BQgFDAq0CrAJ7AnoBEAERAkgCRwHhAeABCAByAHECQwJEAHkAegGmAacB5QHkAecB5gHjAeIB0gHTAdEB0AJtAm4CqQKoARkBGAEbARoA2QDYAQEBAgBzAHQAzQDMAQYBBwB3AHgBnwGeAOcA6AGQAZEAJwAmACgAKQJqAcUB+gH7APEA8gEnASYCxgLFAtkC2AMEAwUA/QD+AlMB6wHqARUBFAHoAekC7ALrAnACbwD5APoB7wHuAH0AfQJWASQBJQJ4AncAywDKAcsBygLXAcgCpgKnAfkB+AKMAo0CiwKQApECoQKgAooCmwKaApYClwKZApgCngKfApQClQKJAogCnQKcApMCkgFvAW4BHwEeASABIQEdARwBggGDAYUBhAJ2AnUCdAJzAQsBCgFIAUkBSwFKAuAC3wB2AHUDCQMJAwoDCgAbABsAHAAc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AMkAAOvKAADrygAAAMgAAOvbAADr2wAAASwAAOvcAADr3AAAASsAAOvdAADr3QAAAlcAAOveAADr3gAAAlgAAOvfAADr3wAAAJYAAOvgAADr4AAAAJcAAOvhAADr4QAAAIEAAOviAADr4gAAAIAAAOvtAADr7QAAARcAAOvuAADr7gAAARYAAOvxAADr8QAAAJAAAOvyAADr8gAAAJEAAOvzAADr8wAAAJIAAOv0AADr9AAAAJMAAOv1AADr9QAAAJUAAOv2AADr9gAAAJQAAOv3AADr9wAAAIMAAOv4AADr+AAAAIIAAOwBAADsAQAAAjkAAOwCAADsAgAAAjgAAOwNAADsDQAAAGUAAOwOAADsDgAAAGQAAOwVAADsFQAAANUAAOwWAADsFgAAANQAAOwZAADsGQAAAnIAAOwaAADsGgAAAnEAAOwpAADsKQAAAdQAAOwqAADsKgAAAdUAAOwtAADsLQAAAM4AAOwuAADsLgAAAM8AAOw7AADsOwAAAlkAAOw8AADsPAAAAloAAOw/AADsPwAAAcYAAOxAAADsQAAAAcYAAOxBAADsQQAAAF4AAOxCAADsQgAAAFgAAOxRAADsUQAAAP8AAOxSAADsUgAAAQAAAOxVAADsVQAAAc0AAOxWAADsVgAAAcwAAOxaAADsWgAAAckAAOxbAADsWwAAAOIAAOxcAADsXAAAAOEAAOxhAADsYQAAAhoAAOxiAADsYgAAAhkAAOx5AADseQAAAVsAAOx6AADsegAAAVoAAOx/AADsfwAAAscAAOyAAADsgAAAAsgAAOyBAADsgQAAAMYAAOyCAADsggAAAMcAAOyFAADshQAAAMMAAOyGAADshgAAAMIAAOygAADsoAAAAa4AAOyhAADsoQAAAa8AAOynAADspwAAASgAAOypAADsqQAAASkAAOyqAADsqgAAASIAAOysAADsrAAAASoAAOytAADsrQAAASMAAOy0AADstAAAAdwAAOy1AADstQAAAd0AAOy2AADstgAAAd8AAOy3AADstwAAAd4AAOzAAADswAAAALMAAOzBAADswQAAALIAAOzUAADs1AAAAOsAAOzVAADs1QAAAOwAAOzaAADs2gAAAOoAAOzbAADs2wAAAOkAAOzgAADs4AAAAOYAAOzrAADs6wAAAOUAAOzwAADs8AAAAk0AAOzxAADs8QAAAk4AAOz6AADs+gAAAOQAAOz7AADs+wAAAOMAAO0OAADtDgAAAlAAAO0PAADtDwAAAk8AAO0UAADtFAAAAtAAAO0VAADtFQAAAs8AAO0eAADtHgAAAPcAAO0fAADtHwAAAPgAAO0gAADtIAAAAWgAAO0hAADtIQAAAWkAAO0mAADtJgAAAfEAAO0nAADtJwAAAfAAAO0wAADtMAAAANoAAO0xAADtMQAAANoAAO0yAADtMgAAAgAAAO0zAADtMwAAAgEAAO06AADtOgAAAGYAAO07AADtOwAAAGcAAO1CAADtQgAAAnkAAO1DAADtQwAAAnkAAO2LAADtiwAAAr0AAO2MAADtjAAAArwAAO2NAADtjQAAArsAAO2UAADtlAAAAagAAO2VAADtlQAAAakAAO2aAADtmgAAAZMAAO2cAADtnAAAAZIAAO2dAADtnQAAAZkAAO2eAADtngAAAZgAAO26AADtugAAAToAAO27AADtuwAAATkAAO3OAADtzgAAAGsAAO3PAADtzwAAAGoAAO3iAADt4gAAAqQAAO3jAADt4wAAAqUAAO4EAADuBAAAAXwAAO4FAADuBQAAAX0AAO4KAADuCgAAAlsAAO4LAADuCwAAAlwAAO4MAADuDAAAAUEAAO4NAADuDQAAAUAAAO4OAADuDgAAAT4AAO4PAADuDwAAAT8AAO4SAADuEgAAAl0AAO4TAADuEwAAAl4AAO4XAADuFwAAAfIAAO4YAADuGAAAACUAAO4ZAADuGQAAACQAAO4mAADuJgAAAhwAAO4rAADuKwAAAhsAAO42AADuNgAAAC4AAO43AADuNwAAAC8AAO5GAADuRgAAAmYAAO5HAADuRwAAAmUAAO5IAADuSAAAAmMAAO5JAADuSQAAAmQAAO5KAADuSgAAAWEAAO5LAADuSwAAAWAAAO5MAADuTAAAAD8AAO5NAADuTQAAAD4AAO5OAADuTgAAAD0AAO5PAADuTwAAADwAAO5QAADuUAAAAEEAAO5RAADuUQAAAEAAAO5SAADuUgAAATMAAO5TAADuUwAAATQAAO5WAADuVgAAAbwAAO5XAADuVwAAAb0AAO5fAADuXwAAAroAAO5gAADuYAAAArkAAO5yAADucgAAANYAAO5zAADucwAAANcAAO58AADufAAAAmgAAO59AADufQAAAmcAAO5+AADufgAAAsoAAO5/AADufwAAAskAAO6IAADuiAAAAv8AAO6JAADuiQAAAv4AAO6KAADuigAAAvMAAO6LAADuiwAAAwYAAO6MAADujAAAAssAAO6NAADujQAAAswAAO6RAADukQAAAwEAAO6SAADukgAAAwAAAO6TAADukwAAAvkAAO6UAADulAAAAvgAAO6YAADumAAAAv0AAO6ZAADumQAAAvwAAO6aAADumgAAAvQAAO6bAADumwAAAvUAAO6cAADunAAAAwIAAO6dAADunQAAAwMAAO6eAADungAAAvsAAO6fAADunwAAAvoAAO6gAADuoAAAAvYAAO6hAADuoQAAAvcAAO6qAADuqgAAAF8AAO6rAADuqwAAAFkAAO6yAADusgAAAlUAAO63AADutwAAAGwAAO64AADuuAAAAGwAAO66AADuugAAAQMAAO67AADuuwAAAQQAAO6/AADuvwAAAW0AAO7AAADuwAAAAWwAAO7CAADuwgAAAfQAAO7GAADuxgAAAfUAAO7JAADuyQAAAfcAAO7NAADuzQAAAdcAAO7OAADuzgAAAdYAAO7PAADuzwAAAdsAAO7QAADu0AAAAdoAAO7RAADu0QAAAdkAAO7SAADu0gAAAdgAAO7TAADu0wAAAc8AAO7UAADu1AAAAc4AAO7bAADu2wAAAmwAAO7cAADu3AAAAmsAAO7rAADu6wAAADgAAO7sAADu7AAAADkAAO7zAADu8wAAADMAAO72AADu9gAAADIAAO75AADu+QAAAh4AAO76AADu+gAAAh0AAO77AADu+wAAADUAAO78AADu/AAAADQAAO8BAADvAQAAADYAAO8CAADvAgAAADcAAO8HAADvBwAAAmAAAO8IAADvCAAAAl8AAO8JAADvCQAAAn8AAO8KAADvCgAAAn4AAO8TAADvEwAAAVEAAO8UAADvFAAAAVAAAO8XAADvFwAAAVIAAO8YAADvGAAAAVMAAO8dAADvHQAAAugAAO8eAADvHgAAAucAAO8fAADvHwAAAMUAAO8gAADvIAAAAMQAAO8nAADvJwAAAE4AAO8oAADvKAAAAE8AAO86AADvOgAAAZ0AAO8+AADvPgAAAZwAAO9DAADvQwAAAJkAAO9EAADvRAAAAJgAAO9FAADvRQAAAjEAAO9GAADvRgAAAjAAAO9HAADvRwAAAKIAAO9IAADvSAAA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AZ4AAPGaAADxmgAAAOcAAPGbAADxmwAAAOgAAPGeAADxngAAAZAAAPGfAADxnwAAAZEAAPGkAADxpAAAACcAAPGlAADxpQAAACYAAPGmAADxpgAAACgAAPGnAADxpwAAACkAAPGuAADxrgAAAmoAAPGvAADxrwAAAcUAAPG8AADxvAAAAfoAAPG/AADxvwAAAfsAAPHGAADxxgAAAPEAAPHHAADxxwAAAPIAAPHKAADxygAAAScAAPHLAADxywAAASYAAPHSAADx0gAAAsYAAPHTAADx0wAAAsUAAPHYAADx2AAAAtkAAPHZAADx2QAAAtgAAPHdAADx3QAAAwQAAPHeAADx3gAAAwUAAPHnAADx5wAAAP0AAPHoAADx6AAAAP4AAPIBAADyAQAAAlMAAPIGAADyBgAAAesAAPIHAADyBwAAAeoAAPIMAADyDAAAARUAAPINAADyDQAAARQAAPIOAADyDgAAAegAAPIPAADyDwAAAekAAPIQAADyEAAAAuwAAPIRAADyEQAAAusAAPISAADyEgAAAnAAAPIVAADyFQAAAm8AAPIWAADyFgAAAPkAAPIXAADyFwAAAPoAAPIYAADyGAAAAe8AAPIZAADyGQAAAe4AAPIeAADyHgAAAH0AAPIfAADyHwAAAH0AAPInAADyJwAAAlYAAPIuAADyLgAAASQAAPIvAADyLwAAASUAAPIwAADyMAAAAngAAPIxAADyMQAAAncAAPI2AADyNgAAAMsAAPI3AADyNwAAAMoAAPJLAADySwAAAcsAAPJMAADyTAAAAcoAAPJPAADyTwAAAtcAAPJQAADyUAAAAcgAAPJTAADyUwAAAqYAAPJUAADyVAAAAqcAAPJVAADyVQAAAfkAAPJWAADyVgAAAfgAAPJdAADyXQAAAowAAPJeAADyXgAAAo0AAPJfAADyXwAAAosAAPJgAADyYAAAApAAAPJhAADyYQAAApEAAPJiAADyYgAAAqEAAPJjAADyYwAAAqAAAPJkAADyZAAAAooAAPJlAADyZQAAApsAAPJmAADyZgAAApoAAPJpAADyaQAAApYAAPJqAADyagAAApcAAPJrAADyawAAApkAAPJsAADybAAAApgAAPJtAADybQAAAp4AAPJuAADybgAAAp8AAPJxAADycQAAApQAAPJyAADycgAAApUAAPJzAADycwAAAokAAPJ0AADydAAAAogAAPJ1AADydQAAAp0AAPJ2AADydgAAApwAAPJ3AADydwAAApMAAPJ4AADyeAAAApIAAPKHAADyhwAAAW8AAPKIAADyiAAAAW4AAPKLAADyiwAAAR8AAPKMAADyjAAAAR4AAPKPAADyjwAAASAAAPKQAADykAAAASEAAPKRAADykQAAAR0AAPKSAADykgAAARwAAPKbAADymwAAAYIAAPKcAADynAAAAYMAAPKdAADynQAAAYUAAPKeAADyngAAAYQAAPKfAADynwAAAnYAAPKgAADyoAAAAnUAAPKjAADyowAAAnQAAPKkAADypAAAAnMAAPKtAADyrQAAAQsAAPKuAADyrgAAAQoAAPK1AADytQAAAUgAAPK2AADytgAAAUkAAPK3AADytwAAAUsAAPK4AADyuAAAAUoAAPLDAADywwAAAuAAAPLEAADyxAAAAt8AAPLFAADyxQAAAHYAAPLGAADyxgAAAHUAAPLgAADy4AAAAwkAAPLhAADy4QAAAwkAAPLiAADy4gAAAwoAAPLjAADy4wAAAwoAAPLkAADy5AAAABsAAPLlAADy5QAAABsAAPLqAADy6gAAABwAAPLrAADy6wAAABwAAPLwAADy8AAAAgUAAPLxAADy8QAAAgQAAPL8AADy/AAAAhgAAPL9AADy/QAAAhUAAPMAAADzAAAAAhcAAPMBAADzAQAAAhYAAPMeAADzHgAAAccAAPMfAADzHwAAAccAAPMgAADzIAAAAg8AAPMhAADzIQAAACAAAPMiAADzIgAAAhIAAPMjAADzIwAAAB8AAPMkAADzJAAAAhAAAPMlAADzJQAAACEAAPMmAADzJgAAAhEAAPMnAADzJwAAAB4AAPM9AADzPQAAAfMAAPNGAADzRgAAAT0AAPNHAADzRwAAATwAAPNdAADzXQAAAf8AAPNeAADzXgAAAf4AAPNfAADzXwAAAqoAAPNgAADzYAAAArMAAPNhAADzYQAAArIAAPNiAADzYgAAArYAAPNjAADzYwAAArcAAPNkAADzZAAAArUAAPNlAADzZQAAArQAAPNmAADzZgAAAgwAAPNnAADzZwAAAB0AAPNsAADzbAAAAgMAAPNtAADzbQAAAgIAAPNuAADzbgAAALgAAPNvAADzbwAAALkAAPNyAADzcgAAAocAAPNzAADzcwAA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AGwAbwBwAGUAcgBzAC4AIABoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMLAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgFDAUQBRQFGAUcBSAFJAUoBSwFMAU0BTgFPAVABUQFSAVMBVAFVAVYBVwFYAVkBWgFbAVwBXQFeAV8BYAFhAWIBYwFkAWUBZgFnAWgBaQFqAWsBbAFtAW4BbwFwAXEBcgFzAXQBdQF2AXcBeAF5AXoBewF8AX0BfgF/AYABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwG4AbkBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAdQB1QHWAdcB2AHZAdoB2wHcAd0B3gHfAeAB4QHiAeMB5AHlAeYB5wHoAekB6gHrAewB7QHuAe8B8AHxAfIB8wH0AfUB9gH3AfgB+QH6AfsB/AH9Af4B/wIAAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgInAigCKQIqAisCLAItAi4CLwIwAjECMgIzAjQCNQI2AjcCOAI5AjoCOwI8Aj0CPgI/AkACQQJCAkMCRAJFAkYCRwJIAkkCSgJLAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkgKTApQClQKWApcCmAKZApoCmwKcAp0CngKfAqACoQKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAs0CzgLPAtAC0QLSAtMC1ALVAtYC1wLYAtkC2gLbAtwC3QLeAt8C4ALhAuIC4wLkAuUC5gLnAugC6QLqAusC7ALtAu4C7wLwAvEC8gLzAvQC9QL2AvcC+AL5AvoC+wL8Av0C/gL/AwADAQMCAwMDBAMFAwYDBwMIAwkDCgMLAwwDDQMOAw8DEAMRAxIDEwMUAxUDFgMXAxgDGQMaAxsDHAMdAx4DHwMgAyEDIgMjAyQDJQMmAycDKAMpAyoDKwMsAy0DLgMvAzADMQMyAzMDNAM1AzYDNwM4AzkDOgM7AzwDPQM+Az8DQANBA0IDQwNEA0UDRgNHA0gDSQNKA0sDTANNA04DTwNQA1EDUgNTA1QDVQNWA1cDWANZA1oDWwNcA10DXgNfA2ADYQNiA2MDZANlA2YDZwNoA2kDagNrA2wDbQNuA28DcANxA3IDcwN0A3UDdgN3A3gDeQN6A3sDfAN9A34DfwOAA4EDggODA4QDhQOGA4cDiAOJA4oDiwOMA40DjgOPA5ADkQOSA5MDlAOVA5YDlwOYA5kDmgObA5wDnQOeA58DoAOhA6IDowOkA6UDpgOnA6gDqQOqA6sDrAOtA64DrwOwA7EDsgOzA7QDtQO2A7cDuAO5A7oDuwO8A70DvgO/A8ADwQPCA8MDxAPFA8YDxwPIA8kDygPLA8wDzQPOA88D0APRA9ID0wPUA9UD1gPXA9gD2QPaA9sD3APdA94D3wPgA+ED4gPjA+QD5QPmA+cD6APpA+oD6wPsA+0D7gPvA/AD8QPyA/MD9AP1A/YD9wP4A/kD+gP7A/wD/QP+A/8EAAQBBAIEAwQEBAUEBgQHBAgECQQKBAsEDAASYXJyb3ctbGVmdC11cC1saW5lDWFycm93LXVwLWxpbmUTYXJyb3ctcmlnaHQtdXAtbGluZRBhcnJvdy1yaWdodC1saW5lFWFycm93LXJpZ2h0LWRvd24tbGluZQ9hcnJvdy1kb3duLWxpbmUUYXJyb3ctbGVmdC1kb3duLWxpbmUPYXJyb3ctbGVmdC1saW5lFGFycm93LXVwLWNpcmNsZS1saW5lF2Fycm93LXJpZ2h0LWNpcmNsZS1saW5lFmFycm93LWRvd24tY2lyY2xlLWxpbmUWYXJyb3ctbGVmdC1jaXJjbGUtbGluZRRhcnJvdy11cC1jaXJjbGUtZmlsbBdhcnJvdy1yaWdodC1jaXJjbGUtZmlsbBZhcnJvdy1kb3duLWNpcmNsZS1maWxsFmFycm93LWxlZnQtY2lyY2xlLWZpbGwPYXJyb3ctdXAtcy1saW5lEmFycm93LXJpZ2h0LXMtbGluZRFhcnJvdy1kb3duLXMtbGluZRFhcnJvdy1sZWZ0LXMtbGluZRFhcnJvdy1sZWZ0LXMtZmlsbBFhcnJvdy1kb3duLXMtZmlsbBJhcnJvdy1yaWdodC1zLWZpbGwPYXJyb3ctdXAtcy1maWxsEmFycm93LXVwLWRvd24tbGluZRVhcnJvdy1sZWZ0LXJpZ2h0LWxpbmUXYXJyb3ctcmlnaHQtZG91YmxlLWxpbmUUYXJyb3ctdXAtZG91YmxlLWxpbmUMc2tpcC11cC1saW5lE2V4cGFuZC11cC1kb3duLWxpbmUWZXhwYW5kLWxlZnQtcmlnaHQtbGluZRBleHBhbmQtbGVmdC1saW5lEWV4cGFuZC1yaWdodC1saW5lEmFycm93LWdvLWJhY2stbGluZRVhcnJvdy1nby1mb3J3YXJkLWxpbmULaG9tZS0yLWxpbmULaG9tZS0yLWZpbGwMc3RvcmUtMi1saW5lDHN0b3JlLTItZmlsbAxzdG9yZS0zLWZpbGwMc3RvcmUtMy1saW5lFWFuY2llbnQtcGF2aWxpb24tbGluZRVhbmNpZW50LXBhdmlsaW9uLWZpbGwJdGVudC1saW5lCXRlbnQtZmlsbA1ob3NwaXRhbC1maWxsDWhvc3BpdGFsLWxpbmURYW5jaWVudC1nYXRlLWxpbmURYW5jaWVudC1nYXRlLWZpbGwJbWFpbC1saW5lCW1haWwtZmlsbA5tYWlsLXNlbmQtbGluZQ5tYWlsLXNlbmQtZmlsbBBtYWlsLXVucmVhZC1maWxsEG1haWwtdW5yZWFkLWxpbmUNbWFpbC1hZGQtZmlsbA1tYWlsLWFkZC1saW5lDG1haWwtYWktbGluZQxtYWlsLWFpLWZpbGwKaW5ib3gtbGluZQppbmJveC1maWxsEmluYm94LWFyY2hpdmUtbGluZRJpbmJveC1hcmNoaXZlLWZpbGwUaW5ib3gtdW5hcmNoaXZlLWxpbmUUaW5ib3gtdW5hcmNoaXZlLWZpbGwKY2xvdWQtbGluZQpjbG91ZC1maWxsDmNsb3VkLW9mZi1saW5lDmNsb3VkLW9mZi1maWxsDGFyY2hpdmUtbGluZQxhcmNoaXZlLWZpbGwMcHJvZmlsZS1maWxsDHByb2ZpbGUtbGluZQphd2FyZC1saW5lCmF3YXJkLWZpbGwHYXQtbGluZQdhdC1maWxsCm1lZGFsLWZpbGwKbWVkYWwtbGluZRN2ZXJpZmllZC1iYWRnZS1saW5lE3ZlcmlmaWVkLWJhZGdlLWZpbGwOYmFyLWNoYXJ0LWxpbmUZYmFyLWNoYXJ0LWhvcml6b250YWwtbGluZRBiYXItY2hhcnQtMi1saW5lDnBpZS1jaGFydC1saW5lEWJ1YmJsZS1jaGFydC1saW5lFmJhci1jaGFydC1ncm91cGVkLWxpbmUQZG9udXQtY2hhcnQtbGluZQ9saW5lLWNoYXJ0LWxpbmUNYm9va21hcmstZmlsbA1ib29rbWFyay1saW5lDmJyaWVmY2FzZS1maWxsDmJyaWVmY2FzZS1saW5lEGRvbnV0LWNoYXJ0LWZpbGwPbGluZS1jaGFydC1maWxsDWNhbGVuZGFyLWxpbmUNY2FsZW5kYXItZmlsbA9jYWxjdWxhdG9yLWZpbGwPY2FsY3VsYXRvci1saW5lFWN1c3RvbWVyLXNlcnZpY2UtbGluZRVjdXN0b21lci1zZXJ2aWNlLWZpbGwJZmxhZy1maWxsCWZsYWctbGluZQ1mbGFnLW9mZi1saW5lDWZsYWctb2ZmLWZpbGwLZ2xvYmFsLWxpbmULZ2xvYmFsLWZpbGwKbGlua3MtZmlsbAxwcmludGVyLWxpbmUMcHJpbnRlci1maWxsCnJlcGx5LWxpbmUKcmVwbHktZmlsbA9zZW5kLXBsYW5lLWxpbmUPc2VuZC1wbGFuZS1maWxsDnNsaWRlc2hvdy1maWxsDnNsaWRlc2hvdy1saW5lC3dpbmRvdy1saW5lC3dpbmRvdy1maWxsCnN0YWNrLWZpbGwKc3RhY2stbGluZQxzZXJ2aWNlLWZpbGwMc2VydmljZS1saW5lD3JlZ2lzdGVyZWQtZmlsbA9yZWdpc3RlcmVkLWxpbmUOdHJhZGVtYXJrLWZpbGwSYWR2ZXJ0aXNlbWVudC1maWxsEmFkdmVydGlzZW1lbnQtbGluZQ5jb3B5cmlnaHQtbGluZQ5jb3B5cmlnaHQtZmlsbBhjcmVhdGl2ZS1jb21tb25zLW5kLWxpbmUYY3JlYXRpdmUtY29tbW9ucy1uZC1maWxsDGlkLWNhcmQtbGluZQxpZC1jYXJkLWZpbGwOaW5mby1jYXJkLWxpbmUOaW5mby1jYXJkLWZpbGwRcGFzcy1wZW5kaW5nLWZpbGwRcGFzcy1wZW5kaW5nLWxpbmURcGFzcy1leHBpcmVkLWZpbGwRcGFzcy1leHBpcmVkLWxpbmUPcGFzcy12YWxpZC1maWxsD3Bhc3MtdmFsaWQtbGluZQ5tZWdhcGhvbmUtZmlsbA5tZWdhcGhvbmUtbGluZRhjcmVhdGl2ZS1jb21tb25zLWJ5LWZpbGwYY3JlYXRpdmUtY29tbW9ucy1ieS1saW5lFWNyZWF0aXZlLWNvbW1vbnMtZmlsbBVjcmVhdGl2ZS1jb21tb25zLWxpbmUYY3JlYXRpdmUtY29tbW9ucy1uYy1saW5lGGNyZWF0aXZlLWNvbW1vbnMtbmMtZmlsbA1jb3B5bGVmdC1maWxsDWNvcHlsZWZ0LWxpbmUObWVzc2FnZS0yLWxpbmUObWVzc2FnZS0yLWZpbGwPY2hhdC1jaGVjay1saW5lD2NoYXQtY2hlY2stZmlsbBBjaGF0LXVucmVhZC1maWxsEGNoYXQtdW5yZWFkLWxpbmUNY2hhdC1uZXctbGluZQ1jaGF0LW5ldy1maWxsEGNoYXQtZGVsZXRlLWZpbGwQY2hhdC1kZWxldGUtbGluZQxtZXNzYWdlLWZpbGwMbWVzc2FnZS1saW5lC2NoYXQtNC1saW5lC2NoYXQtNC1maWxsEmNoYXQtc2V0dGluZ3MtZmlsbBJjaGF0LXNldHRpbmdzLWxpbmUSY2hhdC1kb3dubG9hZC1maWxsEmNoYXQtZG93bmxvYWQtbGluZRBjaGF0LXVwbG9hZC1saW5lEGNoYXQtdXBsb2FkLWZpbGwRY2hhdC1mb3J3YXJkLWZpbGwRY2hhdC1mb3J3YXJkLWxpbmUPY2hhdC1oZWFydC1saW5lD2NoYXQtaGVhcnQtZmlsbA1jaGF0LW9mZi1saW5lDWNoYXQtb2ZmLWZpbGwNZmVlZGJhY2stbGluZQ1mZWVkYmFjay1maWxsFHF1ZXN0aW9uLWFuc3dlci1saW5lFHF1ZXN0aW9uLWFuc3dlci1maWxsEnF1ZXN0aW9ubmFpcmUtbGluZRJxdWVzdGlvbm5haXJlLWZpbGwKc3BlYWstZmlsbApzcGVhay1saW5lEGNoYXQtdGhyZWFkLWxpbmUQY2hhdC10aHJlYWQtZmlsbBFjaGF0LWhpc3RvcnktZmlsbBFjaGF0LWhpc3RvcnktbGluZRFjaGF0LXByaXZhdGUtbGluZRFjaGF0LXByaXZhdGUtZmlsbBJlbW9qaS1zdGlja2VyLWxpbmUSZW1vamktc3RpY2tlci1maWxsCWVkaXQtbGluZQllZGl0LWZpbGwLbWFya3VwLWxpbmULbWFya3VwLWZpbGwNZWRpdC1ib3gtZmlsbA1lZGl0LWJveC1saW5lDWNvbXB1dGVyLWxpbmUNY29tcHV0ZXItZmlsbAd0di1saW5lB3R2LWZpbGwPc21hcnRwaG9uZS1saW5lD3NtYXJ0cGhvbmUtZmlsbAtkZXZpY2UtZmlsbAtkZXZpY2UtbGluZQpwaG9uZS1saW5lCnBob25lLWZpbGwNaW5zdGFuY2UtZmlsbA1pbnN0YW5jZS1saW5lD2RhdGFiYXNlLTItbGluZQ9kYXRhYmFzZS0yLWZpbGwRa2V5Ym9hcmQtYm94LWZpbGwRa2V5Ym9hcmQtYm94LWxpbmUOc2h1dC1kb3duLWxpbmUOc2h1dC1kb3duLWZpbGwQZmluZ2VycHJpbnQtbGluZRBiYXJjb2RlLWJveC1saW5lEGJhcmNvZGUtYm94LWZpbGwMcXItY29kZS1saW5lDHFyLWNvZGUtZmlsbAxxci1zY2FuLWZpbGwMcXItc2Nhbi1saW5lCmRyYWZ0LWxpbmUKZHJhZnQtZmlsbA9maWxlLXBhcGVyLWxpbmUPZmlsZS1wYXBlci1maWxsCWZpbGUtbGluZQlmaWxlLWZpbGwQc3RpY2t5LW5vdGUtZmlsbBBzdGlja3ktbm90ZS1saW5lDmZpbGUtZWRpdC1saW5lDmZpbGUtZWRpdC1maWxsDmZpbGUtY29weS1maWxsDmZpbGUtY29weS1saW5lCWJpbGwtZmlsbAliaWxsLWxpbmUMYXJ0aWNsZS1maWxsDGFydGljbGUtbGluZQtzdXJ2ZXktZmlsbAtzdXJ2ZXktbGluZQ5jbGlwYm9hcmQtbGluZQ5jbGlwYm9hcmQtZmlsbAluZXdzLWZpbGwJbmV3cy1saW5lDWZpbGUtemlwLWZpbGwNZmlsZS16aXAtbGluZQl0b2RvLWZpbGwJdG9kby1saW5lEGJvb2stbWFya2VkLWxpbmUQYm9vay1tYXJrZWQtZmlsbAl0YXNrLWZpbGwJdGFzay1saW5lD2RvdWJsZS1xdW90ZXMtbA9kb3VibGUtcXVvdGVzLXIPc2luZ2xlLXF1b3Rlcy1sD3NpbmdsZS1xdW90ZXMtcgpsaXN0LWNoZWNrDGxpc3Qtb3JkZXJlZApsaXN0LXJhZGlvCHNvcnQtYXNjCXNvcnQtZGVzYw1zZW5kLWJhY2t3YXJkDWJyaW5nLWZvcndhcmQLd2FsbGV0LWxpbmULd2FsbGV0LWZpbGwOYmFuay1jYXJkLWxpbmUOYmFuay1jYXJkLWZpbGwLcmVmdW5kLWxpbmULcmVmdW5kLWZpbGwJc2FmZS1maWxsCXNhZmUtbGluZQ5wcmljZS10YWctbGluZQ5wcmljZS10YWctZmlsbAt0aWNrZXQtbGluZQt0aWNrZXQtZmlsbAtjb3Vwb24tbGluZQtjb3Vwb24tZmlsbBFzaG9wcGluZy1iYWctbGluZRFzaG9wcGluZy1iYWctZmlsbBJzaG9wcGluZy1jYXJ0LWxpbmUSc2hvcHBpbmctY2FydC1maWxsCHZpcC1saW5lCHZpcC1maWxsEHZpcC1jcm93bi0yLWxpbmUQdmlwLWNyb3duLTItZmlsbBB2aXAtZGlhbW9uZC1maWxsEHZpcC1kaWFtb25kLWxpbmUNZXhjaGFuZ2UtZmlsbA1leGNoYW5nZS1saW5lC3Ryb3BoeS1maWxsC3Ryb3BoeS1saW5lCXN3YXAtbGluZQlzd2FwLWZpbGwRZXhjaGFuZ2UtY255LWxpbmUUZXhjaGFuZ2UtZG9sbGFyLWxpbmUTZXhjaGFuZ2UtZnVuZHMtbGluZRBjb3BwZXItY29pbi1saW5lEGNvcHBlci1jb2luLWZpbGwSbW9uZXktY255LWJveC1saW5lEm1vbmV5LWNueS1ib3gtZmlsbBVtb25leS1jbnktY2lyY2xlLWxpbmUVbW9uZXktY255LWNpcmNsZS1maWxsGG1vbmV5LWRvbGxhci1jaXJjbGUtbGluZRhtb25leS1kb2xsYXItY2lyY2xlLWZpbGwWaW5jcmVhc2UtZGVjcmVhc2UtZmlsbBZpbmNyZWFzZS1kZWNyZWFzZS1saW5lD3JlZC1wYWNrZXQtZmlsbA9yZWQtcGFja2V0LWxpbmUMYXVjdGlvbi1maWxsDGF1Y3Rpb24tbGluZQlnaWZ0LWxpbmUJZ2lmdC1maWxsDTI0LWhvdXJzLWxpbmUIbmZ0LWxpbmUIbmZ0LWZpbGwKaGVhcnQtZmlsbApoZWFydC1saW5lDmhlYXJ0LWFkZC1saW5lDmhlYXJ0LWFkZC1maWxsDnJlc3QtdGltZS1maWxsDnJlc3QtdGltZS1saW5lCmFwcGxlLWxpbmUKYXBwbGUtZmlsbAthbGlwYXktZmlsbAthbGlwYXktbGluZQt3ZWNoYXQtZmlsbAt3ZWNoYXQtbGluZQ93ZWNoYXQtcGF5LWxpbmUPd2VjaGF0LXBheS1maWxsEW1pbmktcHJvZ3JhbS1maWxsEW1pbmktcHJvZ3JhbS1saW5lDGFuZHJvaWQtbGluZQxhbmRyb2lkLWZpbGwMbWFwLXBpbi1saW5lDG1hcC1waW4tZmlsbBFtYXAtcGluLXRpbWUtZmlsbBFtYXAtcGluLXRpbWUtbGluZQxwdXNocGluLWZpbGwMcHVzaHBpbi1saW5lCnVucGluLWxpbmUKdW5waW4tZmlsbAxjb21wYXNzLWZpbGwMY29tcGFzcy1saW5lCmVhcnRoLWxpbmUKZWFydGgtZmlsbBBwYXJraW5nLWJveC1maWxsEHBhcmtpbmctYm94LWxpbmUPbmF2aWdhdGlvbi1maWxsD25hdmlnYXRpb24tbGluZQppbWFnZS1saW5lCmltYWdlLWZpbGwQbXVsdGktaW1hZ2UtbGluZRBtdWx0aS1pbWFnZS1maWxsDXZpZGVvLW9uLWxpbmUNdmlkZW8tb24tZmlsbBFjbGFwcGVyYm9hcmQtbGluZRFjbGFwcGVyYm9hcmQtZmlsbAlmaWxtLWZpbGwJZmlsbS1saW5lCm1vdmllLWZpbGwKbW92aWUtbGluZQlsaXZlLWxpbmUJbGl2ZS1maWxsDHZpZGljb24tbGluZQx2aWRpY29uLWZpbGwOdmlkZW8tb2ZmLWxpbmUOdmlkZW8tb2ZmLWZpbGwLY2FtZXJhLWZpbGwLY2FtZXJhLWxpbmUPY2FtZXJhLW9mZi1maWxsD2NhbWVyYS1vZmYtbGluZRBjYW1lcmEtbGVucy1maWxsEGNhbWVyYS1sZW5zLWxpbmUHbXYtbGluZQdtdi1maWxsDG11c2ljLTItZmlsbAxtdXNpYy0yLWxpbmUOaGVhZHBob25lLWZpbGwOaGVhZHBob25lLWxpbmUIbWljLWxpbmUIbWljLWZpbGwMbWljLW9mZi1saW5lDG1pYy1vZmYtZmlsbBB2b2x1bWUtZG93bi1maWxsEHZvbHVtZS1kb3duLWxpbmUQdm9sdW1lLW11dGUtbGluZRB2b2x1bWUtbXV0ZS1maWxsE25vdGlmaWNhdGlvbi00LWxpbmUTbm90aWZpY2F0aW9uLTQtZmlsbBVub3RpZmljYXRpb24tb2ZmLWZpbGwVbm90aWZpY2F0aW9uLW9mZi1saW5lEHBsYXktY2lyY2xlLWxpbmUQcGxheS1jaXJjbGUtZmlsbBFwYXVzZS1jaXJjbGUtbGluZRFwYXVzZS1jaXJjbGUtZmlsbBJyZWNvcmQtY2lyY2xlLWxpbmUScmVjb3JkLWNpcmNsZS1maWxsEHN0b3AtY2lyY2xlLWZpbGwQc3RvcC1jaXJjbGUtbGluZQ9mdWxsc2NyZWVuLWxpbmUUZnVsbHNjcmVlbi1leGl0LWxpbmUQZXF1YWxpemVyLTItbGluZRBlcXVhbGl6ZXItMi1maWxsCWFwcHMtbGluZQlhcHBzLWZpbGwNZnVuY3Rpb24tbGluZQ1mdW5jdGlvbi1maWxsGWRhc2hib2FyZC1ob3Jpem9udGFsLWxpbmUZZGFzaGJvYXJkLWhvcml6b250YWwtZmlsbAltZW51LWxpbmUNbWVudS1hZGQtbGluZQlzdGFyLWxpbmUJc3Rhci1maWxsDXN0YXItb2ZmLWxpbmUNc3Rhci1vZmYtZmlsbAltb3JlLWxpbmUJbW9yZS1maWxsC21vcmUtMi1saW5lC21vcmUtMi1maWxsDXNldHRpbmdzLWZpbGwNc2V0dGluZ3MtbGluZQtmb3JiaWQtZmlsbAtmb3JiaWQtbGluZQ9wcm9oaWJpdGVkLWxpbmUPcHJvaGliaXRlZC1maWxsEmluZm9ybWF0aW9uLTItbGluZRJpbmZvcm1hdGlvbi0yLWZpbGwSZXJyb3Itd2FybmluZy1maWxsEmVycm9yLXdhcm5pbmctbGluZQ1xdWVzdGlvbi1maWxsDXF1ZXN0aW9uLWxpbmUaY2hlY2tib3gtYmxhbmstY2lyY2xlLWxpbmUaY2hlY2tib3gtYmxhbmstY2lyY2xlLWZpbGwUY2hlY2tib3gtY2lyY2xlLWZpbGwUY2hlY2tib3gtY2lyY2xlLWxpbmUTY2hlY2tib3gtYmxhbmstbGluZRNjaGVja2JveC1ibGFuay1maWxsDWNoZWNrYm94LWxpbmUNY2hlY2tib3gtZmlsbA9hZGQtY2lyY2xlLWxpbmUPYWRkLWNpcmNsZS1maWxsGWluZGV0ZXJtaW5hdGUtY2lyY2xlLWZpbGwZaW5kZXRlcm1pbmF0ZS1jaXJjbGUtbGluZRFjbG9zZS1jaXJjbGUtbGluZRFjbG9zZS1jaXJjbGUtZmlsbBFyYWRpby1idXR0b24tbGluZRFyYWRpby1idXR0b24tZmlsbApjaGVjay1saW5lCmNsb3NlLWxpbmUIYWRkLWxpbmUNc3VidHJhY3QtbGluZQtkaXZpZGUtbGluZQplcXVhbC1saW5lC3VwbG9hZC1saW5lDWRvd25sb2FkLWxpbmUTdXBsb2FkLWNsb3VkLTItbGluZRN1cGxvYWQtY2xvdWQtMi1maWxsFWRvd25sb2FkLWNsb3VkLTItbGluZRVkb3dubG9hZC1jbG91ZC0yLWZpbGwObG9naW4tYm94LWxpbmUObG9naW4tYm94LWZpbGwRc2hpZWxkLWNyb3NzLWxpbmURc2hpZWxkLWNyb3NzLWZpbGwRc2hpZWxkLWNoZWNrLWZpbGwRc2hpZWxkLWNoZWNrLWxpbmUPZGVsZXRlLWJpbi1maWxsD2RlbGV0ZS1iaW4tbGluZQlsb2NrLWxpbmUJbG9jay1maWxsEGxvY2stdW5sb2NrLWxpbmUQbG9jay11bmxvY2stZmlsbBJsb2NrLXBhc3N3b3JkLWxpbmUSbG9jay1wYXNzd29yZC1maWxsCGV5ZS1maWxsCGV5ZS1saW5lDGV5ZS1vZmYtbGluZQxleWUtb2ZmLWZpbGwLc2VhcmNoLWxpbmULc2VhcmNoLWZpbGwKc2hhcmUtbGluZQpzaGFyZS1maWxsDnNoYXJlLWJveC1saW5lDnNoYXJlLWJveC1maWxsEXNoYXJlLWNpcmNsZS1saW5lEXNoYXJlLWNpcmNsZS1maWxsCXRpbWUtZmlsbAl0aW1lLWxpbmUNdGh1bWItdXAtbGluZQ10aHVtYi11cC1maWxsF25vdGlmaWNhdGlvbi1iYWRnZS1maWxsF25vdGlmaWNhdGlvbi1iYWRnZS1saW5lC3RvZ2dsZS1saW5lC3RvZ2dsZS1maWxsC2ZpbHRlci1saW5lC2ZpbHRlci1maWxsDGhpc3RvcnktbGluZQ5sb29wLWxlZnQtbGluZQ1sb2FkZXItMi1saW5lDWxvYWRlci00LWxpbmUQcmVzZXQtcmlnaHQtbGluZQtsb2FkZXItZmlsbAt1c2VyLTMtbGluZQt1c2VyLTMtZmlsbAhzdW4tZmlsbAhzdW4tbGluZQltb29uLWZpbGwJbW9vbi1saW5lDHNoaW5pbmctbGluZQxzaGluaW5nLWZpbGwJZmlyZS1maWxsCWZpcmUtbGluZQ5zcGFya2xpbmctbGluZQ5zcGFya2xpbmctZmlsbApib3gtMS1saW5lCmJveC0xLWZpbGwQYWNjb3VudC1ib3gtbGluZRBhY2NvdW50LWJveC1maWxsE2FjY291bnQtY2lyY2xlLWZpbGwTYWNjb3VudC1jaXJjbGUtbGluZRRhY2NvdW50LXBpbi1ib3gtZmlsbBRhY2NvdW50LXBpbi1ib3gtbGluZQxza2lwLXVwLWZpbGwVYXJyb3ctbGVmdC1yaWdodC1maWxsEmFycm93LXVwLWRvd24tZmlsbBBleHBhbmQtbGVmdC1maWxsEWV4cGFuZC1yaWdodC1maWxsE2V4cGFuZC11cC1kb3duLWZpbGwWZXhwYW5kLWxlZnQtcmlnaHQtZmlsbBJhcnJvdy1nby1iYWNrLWZpbGwVYXJyb3ctZ28tZm9yd2FyZC1maWxsEmNvbnRyYWN0LWxlZnQtbGluZRNjb250cmFjdC1yaWdodC1saW5lE2NvbnRyYWN0LXJpZ2h0LWZpbGwSY29udHJhY3QtbGVmdC1maWxsDmRyYWctbW92ZS1saW5lDmRyYWctbW92ZS1maWxsCWhvbWUtbGluZQlob21lLWZpbGwObWFpbC1vcGVuLWxpbmUObWFpbC1vcGVuLWZpbGwPYXR0YWNobWVudC1saW5lD2F0dGFjaG1lbnQtZmlsbA5iYXItY2hhcnQtZmlsbBliYXItY2hhcnQtaG9yaXpvbnRhbC1maWxsEGJhci1jaGFydC0yLWZpbGwRYnViYmxlLWNoYXJ0LWZpbGwOcGllLWNoYXJ0LWZpbGwWY2FsZW5kYXItc2NoZWR1bGUtbGluZRZjYWxlbmRhci1zY2hlZHVsZS1maWxsEmNhbGVuZGFyLXRvZG8tbGluZRJjYWxlbmRhci10b2RvLWZpbGwTY2FsZW5kYXItZXZlbnQtZmlsbBNjYWxlbmRhci1ldmVudC1saW5lE2NhbGVuZGFyLWNsb3NlLWZpbGwTY2FsZW5kYXItY2hlY2stZmlsbBNjYWxlbmRhci1jaGVjay1saW5lE2NhbGVuZGFyLWNsb3NlLWxpbmUObWVzc2FnZS0zLWxpbmUObWVzc2FnZS0zLWZpbGwLY2hhdC0zLWZpbGwLY2hhdC0zLWxpbmULY2hhdC0xLWZpbGwLY2hhdC0xLWxpbmULY2hhdC0yLWZpbGwLY2hhdC0yLWxpbmUJY3JvcC1saW5lCWNyb3AtZmlsbAxwYWxldHRlLWxpbmUMcGFsZXR0ZS1maWxsEmFudGljbG9ja3dpc2UtbGluZRJhbnRpY2xvY2t3aXNlLWZpbGwOY2xvY2t3aXNlLWxpbmUOY2xvY2t3aXNlLWZpbGwRY29kZS1zLXNsYXNoLWZpbGwLcHV6emxlLWZpbGwLcHV6emxlLWxpbmULc2VydmVyLWZpbGwLc2VydmVyLWxpbmUOcXItc2Nhbi0yLWZpbGwOcXItc2Nhbi0yLWxpbmUJc2Nhbi1saW5lCXNjYW4tZmlsbA9waG9uZS1maW5kLWZpbGwPcGhvbmUtZmluZC1saW5lDGJhcmNvZGUtbGluZQxiYXJjb2RlLWZpbGwOZmlsZS1saXN0LWZpbGwOZmlsZS1saXN0LWxpbmUOZmlsZS10ZXh0LWxpbmUOZmlsZS10ZXh0LWZpbGwJYm9vay1maWxsCWJvb2stbGluZQR0ZXh0C2ZvbnQtZmFtaWx5BGxpbmsJdHJhbnNsYXRlE2NvcHBlci1kaWFtb25kLWZpbGwTY29wcGVyLWRpYW1vbmQtbGluZQxkaXNsaWtlLWZpbGwMZGlzbGlrZS1saW5lDGhlYXJ0LTMtZmlsbAxoZWFydC0zLWxpbmULaGVhcnRzLWZpbGwLaGVhcnRzLWxpbmUIbWFwLWxpbmUIbWFwLWZpbGwRaW1hZ2UtY2lyY2xlLWZpbGwRaW1hZ2UtY2lyY2xlLWxpbmUPaW1hZ2UtZWRpdC1maWxsD2ltYWdlLWVkaXQtbGluZQ5pbWFnZS1hZGQtbGluZQ5pbWFnZS1hZGQtZmlsbA5sYW5kc2NhcGUtbGluZQ5sYW5kc2NhcGUtZmlsbBFjaGVjay1kb3VibGUtbGluZQ1zdWJ0cmFjdC1maWxsEmxvZ291dC1jaXJjbGUtbGluZRJsb2dvdXQtY2lyY2xlLWZpbGwLc2hpZWxkLWZpbGwLc2hpZWxkLWxpbmUKdGltZXItbGluZQp0aW1lci1maWxsEmRlbGV0ZS1iYWNrLTItbGluZRJkZWxldGUtYmFjay0yLWZpbGwTdm9sdW1lLXZpYnJhdGUtbGluZRN2b2x1bWUtdmlicmF0ZS1maWxsF3ZvbHVtZS1vZmYtdmlicmF0ZS1saW5lF3ZvbHVtZS1vZmYtdmlicmF0ZS1maWxsCnRydWNrLWxpbmUKdHJ1Y2stZmlsbBNmbGlnaHQtdGFrZW9mZi1saW5lDXJvYWQtbWFwLWxpbmUNcm9hZC1tYXAtZmlsbA5wdXNocGluLTItbGluZQ5wdXNocGluLTItZmlsbA5tYXAtcGluLTItbGluZQ5tYXAtcGluLTItZmlsbBVjb21wYXNzLWRpc2NvdmVyLWxpbmUVY29tcGFzcy1kaXNjb3Zlci1maWxsDXNpZ25wb3N0LWZpbGwNc2lnbnBvc3QtbGluZQdxcS1saW5lB3FxLWZpbGwLdGlrdG9rLWxpbmULdGlrdG9rLWZpbGwPdXNlci1zbWlsZS1saW5lD3VzZXItc21pbGUtZmlsbAl1c2VyLWxpbmUJdXNlci1maWxsDXVzZXItYWRkLWZpbGwNdXNlci1hZGQtbGluZQ91c2VyLW1pbnVzLWxpbmUPdXNlci1taW51cy1maWxsEHVzZXItZm9sbG93LWZpbGwQdXNlci1mb2xsb3ctbGluZRJ1c2VyLXVuZm9sbG93LWxpbmUSdXNlci11bmZvbGxvdy1maWxsEHVzZXItc2hhcmVkLWZpbGwQdXNlci1zaGFyZWQtbGluZRJ1c2VyLXJlY2VpdmVkLWZpbGwSdXNlci1yZWNlaXZlZC1saW5lEHVzZXItc2VhcmNoLWxpbmUQdXNlci1zZWFyY2gtZmlsbBJ1c2VyLWxvY2F0aW9uLWxpbmUSdXNlci1sb2NhdGlvbi1maWxsDnVzZXItc3Rhci1saW5lDnVzZXItc3Rhci1maWxsEnVzZXItc2V0dGluZ3MtZmlsbBJ1c2VyLXNldHRpbmdzLWxpbmUPdXNlci1oZWFydC1saW5lD3VzZXItaGVhcnQtZmlsbBB1c2VyLWZvcmJpZC1saW5lEHVzZXItZm9yYmlkLWZpbGwKZ3JvdXAtZmlsbApncm91cC1saW5lC3VzZXItMi1maWxsC3VzZXItMi1saW5lEHNoaWVsZC11c2VyLWxpbmUQc2hpZWxkLXVzZXItZmlsbAlza2V0Y2hpbmcMYWxpZ24tYm90dG9tDHJlc3RhcnQtbGluZQxyZXN0YXJ0LWZpbGwMcmVmcmVzaC1saW5lDHJlZnJlc2gtZmlsbA9yZXNldC1sZWZ0LWxpbmUPcmVzZXQtbGVmdC1maWxsDnNraXAtZG93bi1saW5lDnNraXAtZG93bi1maWxsD3NraXAtcmlnaHQtbGluZQ9za2lwLXJpZ2h0LWZpbGwOc2tpcC1sZWZ0LWZpbGwOc2tpcC1sZWZ0LWxpbmUMdGV4dC1zbmlwcGV0EWlucHV0LW1ldGhvZC1saW5lEWlucHV0LW1ldGhvZC1maWxsCWZvbnQtc2l6ZQtmb250LXNpemUtMgpmb250LWNvbG9yCW5vZGUtdHJlZRBwcmljZS10YWctMy1saW5lEHByaWNlLXRhZy0zLWZpbGwLaW5wdXQtZmllbGQNdGltZWxpbmUtdmlldw9wcm9ncmVzcy0yLWxpbmUPcHJvZ3Jlc3MtMi1maWxsCnQtYm94LWxpbmUKdC1ib3gtZmlsbAtlZGl0LTItZmlsbAtlZGl0LTItbGluZQ1sYXlvdXQtMi1saW5lDWxheW91dC0yLWZpbGwSbGF5b3V0LWNvbHVtbi1maWxsEmxheW91dC1jb2x1bW4tbGluZQptb3VzZS1saW5lCm1vdXNlLWZpbGwQZmlsZS11cGxvYWQtbGluZRBmaWxlLXVwbG9hZC1maWxsDnBhZ2Utc2VwYXJhdG9yDWNhcm91c2VsLXZpZXcJbGlzdC12aWV3CnRleHQtYmxvY2sMcGVyY2VudC1saW5lDHBlcmNlbnQtZmlsbAt1cGxvYWQtZmlsbAx0LXNoaXJ0LWxpbmUMdC1zaGlydC1maWxsCG51bWJlci0xFmNoZWNrYm94LW11bHRpcGxlLWxpbmUWY2hlY2tib3gtbXVsdGlwbGUtZmlsbBZjb2xsYXBzZS12ZXJ0aWNhbC1saW5lCWFsaWduLXRvcA13aW5kb3ctMi1saW5lDXdpbmRvdy0yLWZpbGwIc2VvLWxpbmUIc2VvLWZpbGwLc2hhZG93LWxpbmULc2hhZG93LWZpbGwNcHV6emxlLTItbGluZQ1wdXp6bGUtMi1maWxsDW1hcmtkb3duLWxpbmUNbWFya2Rvd24tZmlsbAxzdGFja2VkLXZpZXcNZHJvcGRvd24tbGlzdAx0aW1lci0yLWxpbmUMdGltZXItMi1maWxsC3BhcmVudC1saW5lC3BhcmVudC1maWxsEWZ1bmN0aW9uLWFkZC1saW5lEWZ1bmN0aW9uLWFkZC1maWxsEWFycm93LXVwLWJveC1saW5lEWFycm93LXVwLWJveC1maWxsEmxheW91dC1ib3R0b20tZmlsbBFsYXlvdXQtcmlnaHQtZmlsbBFsYXlvdXQtcmlnaHQtbGluZQ9sYXlvdXQtdG9wLWZpbGwPbGF5b3V0LXRvcC1saW5lEGxheW91dC1sZWZ0LWxpbmUQbGF5b3V0LWxlZnQtZmlsbBFsYXlvdXQtdG9wLTItbGluZRFsYXlvdXQtdG9wLTItZmlsbBNsYXlvdXQtcmlnaHQtMi1saW5lE2xheW91dC1yaWdodC0yLWZpbGwUbGF5b3V0LWJvdHRvbS0yLWxpbmUUbGF5b3V0LWJvdHRvbS0yLWZpbGwSbGF5b3V0LWxlZnQtMi1saW5lEmxheW91dC1sZWZ0LTItZmlsbA9sYXlvdXQtcm93LWZpbGwPbGF5b3V0LXJvdy1saW5lCnRhYmxlLWZpbGwKdGFibGUtbGluZRJsYXlvdXQtYm90dG9tLWxpbmUXcGljdHVyZS1pbi1waWN0dXJlLWxpbmUXcGljdHVyZS1pbi1waWN0dXJlLWZpbGwWYXJyb3ctZG93bi1kb3VibGUtbGluZRZhcnJvdy1sZWZ0LWRvdWJsZS1maWxsAAA=") format("woff")' }], "@TRANSITION": { "transition-none": { "property": "none" }, "duration-200": { "duration": "200ms" } } };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]]]);
  router.beforeEach((to, from, next) => {
    const user2 = useStore().user;
    if (to.isAuth == true || (isNull(to.meta) ? true : to.meta.isAuth == true)) {
      if (!user2.isNull()) {
        next();
      } else {
        router.login();
      }
    } else {
      next();
    }
  });
  const __global__ = typeof globalThis === "undefined" ? Function("return this")() : globalThis;
  __global__.__uniX = true;
  function createApp() {
    const app = vue.createSSRApp(App);
    app.use(cool);
    return {
      app
    };
  }
  createApp().app.mount("#app");
})(Vue);
