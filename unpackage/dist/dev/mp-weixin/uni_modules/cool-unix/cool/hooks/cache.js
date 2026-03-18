"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const useCache = (source) => {
  const cache = common_vendor.reactive({
    key: 0
  });
  common_vendor.watch(source, () => {
    cache.key++;
  });
  common_vendor.watch(uni_modules_coolUnix_theme_index.isDark, () => {
    cache.key++;
  });
  return {
    cache
  };
};
exports.useCache = useCache;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/hooks/cache.js.map
