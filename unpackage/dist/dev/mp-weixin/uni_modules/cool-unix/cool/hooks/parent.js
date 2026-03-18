"use strict";
const common_vendor = require("../../../../common/vendor.js");
function useParent(name) {
  const proxy = common_vendor.getCurrentInstance().proxy;
  let p = proxy === null || proxy === void 0 ? void 0 : proxy.$parent;
  while (p != null) {
    if (p.$options.name == name) {
      return p;
    }
    p = p.$parent;
  }
  return p;
}
exports.useParent = useParent;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/hooks/parent.js.map
