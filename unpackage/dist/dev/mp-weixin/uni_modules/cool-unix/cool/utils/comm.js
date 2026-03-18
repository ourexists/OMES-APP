"use strict";
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
  return value == null || value == void 0;
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
exports.debounce = debounce;
exports.forEach = forEach;
exports.forInObject = forInObject;
exports.get = get;
exports.has = has;
exports.isArray = isArray;
exports.isEmpty = isEmpty;
exports.isEqual = isEqual;
exports.isFunction = isFunction;
exports.isNull = isNull;
exports.isObject = isObject;
exports.isString = isString;
exports.last = last;
exports.map = map;
exports.nth = nth;
exports.toArray = toArray;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/utils/comm.js.map
