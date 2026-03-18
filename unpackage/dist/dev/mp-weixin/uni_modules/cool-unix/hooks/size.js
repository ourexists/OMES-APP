"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_coolUnix_config = require("../config.js");
require("../cool/router/index.js");
require("../cool/ctx/index.js");
require("../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../cool/utils/parse.js");
class Size {
  constructor(cb) {
    this.names = [
      "text-xs",
      "text-sm",
      "text-md",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
      "text-7xl",
      "text-8xl",
      "text-9xl"
    ];
    this.sizes = [20, 24, 28, 32, 36, 44, 52, 60, 72, 84, 96, 120, 152];
    this.lineHeights = [28, 36, 44, 52, 52, 1, 1, 1, 1, 1, 1, 1, 1];
    this.className = common_vendor.computed(() => {
      return "";
    });
    this.getScale = () => {
      var _a;
      return (_a = uni_modules_coolUnix_config.config.fontSize) !== null && _a !== void 0 ? _a : 1;
    };
    this.getRpx = (val) => {
      const scale = this.getScale();
      if (typeof val == "number") {
        return val * scale + "rpx";
      } else {
        const num = parseFloat(val);
        const unit = val.replace(`${num}`, "");
        return num * scale + unit;
      }
    };
    this.getPxValue = (val) => {
      const scale = this.getScale();
      if (typeof val == "string") {
        const num = parseFloat(val);
        const unit = val.replace(`${num}`, "");
        if (unit == "px") {
          return num * scale;
        } else {
          return uni_modules_coolUnix_cool_utils_parse.rpx2px(num * scale);
        }
      } else {
        return uni_modules_coolUnix_cool_utils_parse.rpx2px(val * scale);
      }
    };
    this.getPx = (val) => {
      return this.getPxValue(val) + "px";
    };
    this.getIndex = () => {
      let index = this.names.findIndex((name) => {
        if (this.className.value.includes(name)) {
          return true;
        }
        return false;
      });
      if (index < 0) {
        index = 2;
      }
      return index;
    };
    this.getSize = (size) => {
      if (uni_modules_coolUnix_config.config.fontSize == null && size == null) {
        return null;
      }
      return this.getRpx(size !== null && size !== void 0 ? size : this.sizes[this.getIndex()]);
    };
    this.getLineHeight = () => {
      if (uni_modules_coolUnix_config.config.fontSize == null) {
        return null;
      }
      const lineHeight = this.lineHeights[this.getIndex()];
      return lineHeight == 1 ? `1` : this.getRpx(lineHeight);
    };
    this.className = common_vendor.computed(cb !== null && cb !== void 0 ? cb : () => {
      return "";
    });
    this.ptClassName = common_vendor.computed(() => {
      if (uni_modules_coolUnix_config.config.fontSize == null) {
        return this.className.value;
      }
      const name = this.names[this.getIndex()];
      return this.className.value.replace(`-important-${name}`, "").replace(name, "");
    });
  }
}
function useSize(cb = null) {
  return new Size(cb);
}
exports.useSize = useSize;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/hooks/size.js.map
