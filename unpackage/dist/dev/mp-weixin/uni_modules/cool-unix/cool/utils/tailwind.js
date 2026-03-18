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
exports.hasTextColor = hasTextColor;
exports.hasTextSize = hasTextSize;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/utils/tailwind.js.map
