"use strict";
const core_store_dict = require("./dict.js");
const core_store_user = require("./user.js");
function useStore() {
  return {
    user: core_store_user.user,
    dict: core_store_dict.dict
  };
}
exports.useStore = useStore;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/core/store/index.js.map
