"use strict";
const uni_modules_coolUnix_cool_scroller_index = require("./scroller/index.js");
require("../../../common/vendor.js");
require("./ctx/index.js");
require("../theme/index.js");
require("./router/index.js");
require("../config.js");
const cool = (app) => {
  app.mixin({
    onPageScroll(e) {
      uni_modules_coolUnix_cool_scroller_index.scroller.emit(e.scrollTop);
    }
  });
};
exports.cool = cool;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/index.js.map
