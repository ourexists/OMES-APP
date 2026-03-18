"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  (_easycom_cl_icon_1 + _easycom_cl_image_1)();
}
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
const _easycom_cl_image = () => "../cl-image/cl-image.js";
if (!Math) {
  (_easycom_cl_icon + _easycom_cl_image)();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          icon: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.icon = this.__props__.icon;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-avatar"
}, { __name: "cl-avatar", props: {
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  src: {
    type: String,
    default: ""
  },
  size: {
    type: [String, Number],
    default: 80
  },
  rounded: {
    type: Boolean,
    default: false
  }
}, setup(__props) {
  const props = __props;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  return (_ctx, _cache) => {
    "raw js";
    var _a, _b, _c;
    const __returned__ = {
      a: common_vendor.p({
        name: ((_a = pt.value.icon) == null ? void 0 : _a.name) ?? "user-smile-fill",
        size: ((_b = pt.value.icon) == null ? void 0 : _b.size) ?? 40,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)([[common_vendor.unref(uni_modules_coolUnix_theme_index.isDark), "-important-text-surface-50", "-important-text-surface-400"], (_c = pt.value.icon) == null ? void 0 : _c.className])
        }
      }),
      b: common_vendor.gei(_ctx, ""),
      c: common_vendor.p({
        src: __props.src,
        height: __props.size,
        width: __props.size,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["cl-avatar", {
            "-important-rounded-full": __props.rounded
          }, pt.value.className])
        },
        id: common_vendor.gei(_ctx, "")
      })
    };
    return __returned__;
  };
} }));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-avatar/cl-avatar.js.map
