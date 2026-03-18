"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_hooks_parent = require("../../cool/hooks/parent.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_tree_item_1 = common_vendor.resolveComponent("cl-tree-item");
  (_easycom_cl_icon_1 + _easycom_cl_text_1 + _easycom_cl_tree_item_1)();
}
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
const _easycom_cl_text = () => "../cl-text/cl-text.js";
const _easycom_cl_tree_item = () => Promise.resolve().then(() => RTovcHJvamVjdC9pb3Qvb21lcy9PTUVTLWFwcC91bmlfbW9kdWxlcy9jb29sLXVuaXgvY29tcG9uZW50cy9jbC10cmVlLWl0ZW0vY2wtdHJlZS1pdGVtLnV2dWU);
if (!Math) {
  (_easycom_cl_icon + _easycom_cl_text + _easycom_cl_tree_item)();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          item: { type: "Unknown", optional: true },
          itemChecked: { type: "Unknown", optional: true },
          itemWrapper: { type: "Unknown", optional: true },
          expand: { type: "Unknown", optional: true },
          expandIcon: { type: "Unknown", optional: true },
          checkbox: { type: "Unknown", optional: true },
          checkedIcon: { type: "Unknown", optional: true },
          halfCheckedIcon: { type: "Unknown", optional: true },
          uncheckedIcon: { type: "Unknown", optional: true },
          label: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.item = this.__props__.item;
    this.itemChecked = this.__props__.itemChecked;
    this.itemWrapper = this.__props__.itemWrapper;
    this.expand = this.__props__.expand;
    this.expandIcon = this.__props__.expandIcon;
    this.checkbox = this.__props__.checkbox;
    this.checkedIcon = this.__props__.checkedIcon;
    this.halfCheckedIcon = this.__props__.halfCheckedIcon;
    this.uncheckedIcon = this.__props__.uncheckedIcon;
    this.label = this.__props__.label;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-tree-item"
}, { __name: "cl-tree-item", props: {
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  item: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  level: {
    type: Number,
    default: 0
  }
}, setup(__props) {
  var _a;
  const props = __props;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const ClTree = (_a = common_vendor.inject("ClTree")) !== null && _a !== void 0 ? _a : uni_modules_coolUnix_cool_hooks_parent.useParent("cl-tree");
  const isCheckedStyle = common_vendor.computed(() => {
    return props.item.isChecked === true && (ClTree == null ? true : ClTree.checkable === true && ClTree.multiple === false);
  });
  const hasChildren = common_vendor.computed(() => {
    return props.item.children != null && props.item.children.length > 0;
  });
  const showCheckbox = common_vendor.computed(() => {
    if (ClTree == null) {
      return false;
    }
    return ClTree.checkable == true && ClTree.multiple == true;
  });
  const icon = common_vendor.computed(() => {
    if (ClTree == null) {
      return "";
    }
    return props.item.isExpand == true ? ClTree.expandIcon : ClTree.icon;
  });
  function toExpand() {
    var _a2;
    ClTree.setExpanded(props.item.id, !((_a2 = props.item.isExpand) !== null && _a2 !== void 0 ? _a2 : false));
  }
  function toChecked() {
    var _a2;
    if (props.item.disabled == true) {
      return null;
    }
    ClTree.setChecked(props.item.id, !((_a2 = props.item.isChecked) !== null && _a2 !== void 0 ? _a2 : false));
  }
  const hover = common_vendor.ref(false);
  function onTouchStart() {
    hover.value = true;
    toExpand();
    if (ClTree != null) {
      if (ClTree.checkable == true && ClTree.multiple != true && props.item.disabled != true) {
        toChecked();
      }
    }
  }
  function onTouchEnd() {
    hover.value = false;
  }
  return (_ctx, _cache) => {
    "raw js";
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
    const __returned__ = common_vendor.e({
      a: hasChildren.value
    }, hasChildren.value ? {
      b: common_vendor.p({
        name: icon.value,
        size: ((_a2 = pt.value.expandIcon) == null ? void 0 : _a2.size) ?? 34,
        color: (_b = pt.value.expandIcon) == null ? void 0 : _b.color,
        pt: {
          className: (_c = pt.value.expandIcon) == null ? void 0 : _c.className
        }
      })
    } : {}, {
      c: common_vendor.n({}),
      d: common_vendor.n((_d = pt.value.expand) == null ? void 0 : _d.className),
      e: common_vendor.t(__props.item.label),
      f: common_vendor.p({
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["flex-1 mx-1", (_e = pt.value.label) == null ? void 0 : _e.className])
        }
      }),
      g: showCheckbox.value
    }, showCheckbox.value ? common_vendor.e({
      h: __props.item.isChecked
    }, __props.item.isChecked ? {
      i: common_vendor.p({
        name: ((_f = pt.value.checkedIcon) == null ? void 0 : _f.name) ?? "checkbox-circle-fill",
        size: ((_g = pt.value.checkedIcon) == null ? void 0 : _g.size) ?? 38,
        color: ((_h = pt.value.checkedIcon) == null ? void 0 : _h.color) ?? "primary"
      })
    } : __props.item.isHalfChecked ? {
      k: common_vendor.p({
        name: ((_i = pt.value.halfCheckedIcon) == null ? void 0 : _i.name) ?? "indeterminate-circle-line",
        size: ((_j = pt.value.halfCheckedIcon) == null ? void 0 : _j.size) ?? 38,
        color: ((_k = pt.value.halfCheckedIcon) == null ? void 0 : _k.color) ?? "primary"
      })
    } : {
      l: common_vendor.p({
        name: ((_l = pt.value.uncheckedIcon) == null ? void 0 : _l.name) ?? "checkbox-blank-circle-line",
        size: ((_m = pt.value.uncheckedIcon) == null ? void 0 : _m.size) ?? 38,
        color: ((_n = pt.value.uncheckedIcon) == null ? void 0 : _n.color) ?? "info"
      })
    }, {
      j: __props.item.isHalfChecked,
      m: common_vendor.n({}),
      n: common_vendor.n((_o = pt.value.checkbox) == null ? void 0 : _o.className),
      o: common_vendor.o(toChecked)
    }) : {}, {
      p: common_vendor.n({}),
      q: common_vendor.n({
        "is-expand": hover.value,
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark),
        "is-checked": isCheckedStyle.value,
        "is-half-checked": __props.item.isHalfChecked,
        "is-disabled": __props.item.disabled,
        "is-multiple": (_p = common_vendor.unref(ClTree)) == null ? void 0 : _p.multiple
      }),
      r: common_vendor.n((_q = pt.value.item) == null ? void 0 : _q.className),
      s: common_vendor.n(__props.item.isChecked == true ? (_r = pt.value.itemChecked) == null ? void 0 : _r.className : ""),
      t: `${__props.level * 50 + 16}rpx`,
      v: common_vendor.o(onTouchStart),
      w: common_vendor.o(onTouchEnd),
      x: common_vendor.o(onTouchEnd),
      y: hasChildren.value && __props.item.isExpand == true
    }, hasChildren.value && __props.item.isExpand == true ? {
      z: common_vendor.f(__props.item.children, (item, k0, i0) => {
        return {
          a: item.id,
          b: "c31c38f3-5-" + i0,
          c: common_vendor.p({
            item,
            level: __props.level + 1,
            pt: props.pt
          })
        };
      })
    } : {}, {
      A: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      B: common_vendor.n({}),
      C: common_vendor.n((_s = pt.value.itemWrapper) == null ? void 0 : _s.className)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c31c38f3"]]);
wx.createComponent(Component);
const RTovcHJvamVjdC9pb3Qvb21lcy9PTUVTLWFwcC91bmlfbW9kdWxlcy9jb29sLXVuaXgvY29tcG9uZW50cy9jbC10cmVlLWl0ZW0vY2wtdHJlZS1pdGVtLnV2dWU = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-tree-item/cl-tree-item.js.map
