"use strict";
const config_index = require("../../config/index.js");
const locale_index = require("../../locale/index.js");
function fullImageUrl(path) {
  var _a;
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = (_a = config_index.config.baseUrl) !== null && _a !== void 0 ? _a : "";
  const trimBase = base.replace(/\/+$/, "");
  const trimPath = path.replace(/^\/+/, "");
  return trimBase ? `${trimBase}/${trimPath}` : path;
}
function parseType(e) {
  if (e != null) {
    if (e.onlineState == 0) {
      return { type: "offline", text: locale_index.t("离线") };
    }
    if (e.onlineState == 1 && e.alarmState == 1) {
      return { type: "alarm", text: locale_index.t("报警") };
    }
    if (e.onlineState == 1 && e.alarmState == 0 && e.runState == 1) {
      return { type: "run", text: locale_index.t("运行") };
    }
    if (e.onlineState == 1 && e.alarmState == 0 && e.runState == 0) {
      return { type: "stopped", text: locale_index.t("停止") };
    }
  }
  return { type: "offline", text: locale_index.t("离线") };
}
function equipImage(equip) {
  if (equip.productImage != null && equip.productImage !== "") {
    return fullImageUrl(equip.productImage);
  }
  return null;
}
exports.equipImage = equipImage;
exports.parseType = parseType;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/core/utils/equipParser.js.map
