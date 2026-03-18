"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_list_item_1 = common_vendor.resolveComponent("cl-list-item");
  (_easycom_cl_text_1 + _easycom_cl_list_item_1)();
}
const _easycom_cl_text = () => "../cl-text/cl-text.js";
const _easycom_cl_list_item = () => "../cl-list-item/cl-list-item.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_list_item)();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          list: { type: "Unknown", optional: true },
          item: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.list = this.__props__.list;
    this.item = this.__props__.item;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-list"
}, { __name: "cl-list", props: {
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  list: {
    type: Array,
    default: () => {
      return [];
    }
  },
  title: {
    type: String,
    default: ""
  },
  border: {
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
    const __returned__ = common_vendor.e({
      a: __props.title != ""
    }, __props.title != "" ? {
      b: common_vendor.t(__props.title)
    } : {}, {
      c: common_vendor.f(__props.list, (item, index, i0) => {
        var _a, _b, _c, _d, _e;
        return common_vendor.e({
          a: common_vendor.t(item.content),
          b: "fa3880d5-1-" + i0 + "," + ("fa3880d5-0-" + i0),
          c: "item-" + i0,
          d: common_vendor.r("item", {
            item
          }, i0),
          e: "fa3880d5-0-" + i0,
          f: common_vendor.p({
            icon: item.icon,
            label: item.label,
            arrow: item.arrow,
            hoverable: item.hoverable,
            pt: {
              className: `bg-white dark-colon--important-bg-surface-700 ${(_a = pt.value.item) == null ? void 0 : _a.className}`,
              inner: (_b = pt.value.item) == null ? void 0 : _b.inner,
              label: (_c = pt.value.item) == null ? void 0 : _c.label,
              content: (_d = pt.value.item) == null ? void 0 : _d.content,
              icon: (_e = pt.value.item) == null ? void 0 : _e.icon
            }
          }),
          g: index != __props.list.length - 1
        }, index != __props.list.length - 1 ? {} : {}, {
          h: index
        });
      }),
      d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      e: common_vendor.n({}),
      f: common_vendor.n({
        "cl-list--border": __props.border
      }),
      g: common_vendor.n(pt.value.className)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fa3880d5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-list/cl-list.js.map
