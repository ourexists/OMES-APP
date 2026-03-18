"use strict";
function parseData(data) {
  return data;
}
function formatDate(date) {
  if (date == null) {
    return "";
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function parseDate(dateformat) {
  return new Date(dateformat.replace(" ", "T"));
}
exports.formatDate = formatDate;
exports.parseData = parseData;
exports.parseDate = parseDate;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/core/utils/parse.js.map
