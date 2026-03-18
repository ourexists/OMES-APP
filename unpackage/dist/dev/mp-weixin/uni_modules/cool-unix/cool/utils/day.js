"use strict";
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
exports.dayUts = dayUts;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/utils/day.js.map
