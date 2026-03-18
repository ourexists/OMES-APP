"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_cool_utils_comm = require("./comm.js");
function parse(data) {
  return data;
}
function parsePt(data) {
  return data;
}
const parseClass = (data) => {
  const names = [];
  function deep(d) {
    if (uni_modules_coolUnix_cool_utils_comm.isArray(d)) {
      uni_modules_coolUnix_cool_utils_comm.forEach(d, (value) => {
        if (uni_modules_coolUnix_cool_utils_comm.isString(value)) {
          names.push(value);
        } else if (uni_modules_coolUnix_cool_utils_comm.isArray(value)) {
          const _a = common_vendor.__read(value, 2), a = _a[0], b = _a[1];
          if (a) {
            names.push(b);
          } else {
            if (value.length > 2) {
              names.push(value[2]);
            }
          }
        } else if (uni_modules_coolUnix_cool_utils_comm.isObject(value)) {
          deep(value);
        }
      });
    }
    if (uni_modules_coolUnix_cool_utils_comm.isObject(d)) {
      uni_modules_coolUnix_cool_utils_comm.forInObject(d, (value, key) => {
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
  px = rpx / (750 / common_vendor.index.getWindowInfo().windowWidth);
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
  return val.replace(`${num}`, "");
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
exports.getPx = getPx;
exports.parse = parse;
exports.parseClass = parseClass;
exports.parsePt = parsePt;
exports.parseRpx = parseRpx;
exports.parseToObject = parseToObject;
exports.rpx2px = rpx2px;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/utils/parse.js.map
