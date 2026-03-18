"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../uni_modules/cool-unix/cool/router/index.js");
require("../../../uni_modules/cool-unix/cool/ctx/index.js");
require("../../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../../uni_modules/cool-unix/cool/hooks/refs.js");
require("../../../uni_modules/cool-unix/config.js");
const core_utils_equipParser = require("../../../core/utils/equipParser.js");
class EquipBadgePayload extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          equip: { type: "Unknown", optional: false }
        };
      },
      name: "EquipBadgePayload"
    };
  }
  constructor(options, metadata = EquipBadgePayload.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.equip = this.__props__.equip;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "equip-badge"
}, { __name: "equip-badge", props: {
  equip: {}
}, setup(__props) {
  uni_modules_coolUnix_cool_hooks_refs.useRefs();
  const props = __props;
  const badge = common_vendor.computed(() => {
    return core_utils_equipParser.parseType(props.equip);
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = common_vendor.e({
      a: common_vendor.unref(badge)
    }, common_vendor.unref(badge) ? {
      b: common_vendor.t(common_vendor.unref(badge).text),
      c: common_vendor.sei(common_vendor.gei(_ctx, ""), "text"),
      d: common_vendor.n(common_vendor.unref(badge).type)
    } : {});
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-74f9fd95"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/equip-badge.js.map
