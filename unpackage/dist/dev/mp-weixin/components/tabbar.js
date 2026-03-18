"use strict";
const common_vendor = require("../common/vendor.js");
const uni_modules_coolUnix_cool_router_index = require("../uni_modules/cool-unix/cool/router/index.js");
const uni_modules_coolUnix_cool_ctx_index = require("../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../uni_modules/cool-unix/cool/utils/parse.js");
require("../uni_modules/cool-unix/config.js");
const locale_index = require("../locale/index.js");
const core_store_user = require("../core/store/user.js");
if (!Array) {
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_footer_1 = common_vendor.resolveComponent("cl-footer");
  (_easycom_cl_image_1 + _easycom_cl_text_1 + _easycom_cl_footer_1)();
}
const _easycom_cl_image = () => "../uni_modules/cool-unix/components/cl-image/cl-image.js";
const _easycom_cl_text = () => "../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_footer = () => "../uni_modules/cool-unix/components/cl-footer/cl-footer.js";
if (!Math) {
  (_easycom_cl_image + _easycom_cl_text + _easycom_cl_footer)();
}
class Item extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          icon: { type: String, optional: false },
          icon2: { type: String, optional: false },
          pagePath: { type: String, optional: false },
          text: { type: String, optional: true }
        };
      },
      name: "Item"
    };
  }
  constructor(options, metadata = Item.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.icon = this.__props__.icon;
    this.icon2 = this.__props__.icon2;
    this.pagePath = this.__props__.pagePath;
    this.text = this.__props__.text;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "custom-tabbar"
}, { __name: "tabbar", setup(__props) {
  const path = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_router_index.router.path();
  });
  const list = common_vendor.computed(() => {
    var _a;
    return ((_a = uni_modules_coolUnix_cool_ctx_index.ctx.tabBar.list) !== null && _a !== void 0 ? _a : []).map((e) => {
      var _a2;
      return new Item({
        icon: e.iconPath,
        icon2: e.selectedIconPath,
        pagePath: e.pagePath,
        text: locale_index.t((_a2 = e.text) === null || _a2 === void 0 ? null : _a2.replaceAll("%", ""))
      });
    });
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.f(list.value, (item, k0, i0) => {
        return common_vendor.e({
          a: "a872b9ed-1-" + i0 + ",a872b9ed-0",
          b: common_vendor.p({
            src: path.value == item.pagePath ? item.icon2 : item.icon,
            height: 56,
            width: 56
          }),
          c: item.pagePath.includes("message") && common_vendor.unref(core_store_user.unread_count) > 0
        }, item.pagePath.includes("message") && common_vendor.unref(core_store_user.unread_count) > 0 ? {
          d: common_vendor.t(common_vendor.unref(core_store_user.unread_count) > 99 ? "99+" : common_vendor.unref(core_store_user.unread_count))
        } : {}, {
          e: item.text != null
        }, item.text != null ? {
          f: common_vendor.t(common_vendor.unref(locale_index.t)(item.text)),
          g: "a872b9ed-2-" + i0 + ",a872b9ed-0",
          h: common_vendor.p({
            pt: {
              className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["text-xs mt-1", [path.value == item.pagePath, "text-primary-500", "text-surface-400"]])
            }
          })
        } : {}, {
          i: item.pagePath,
          j: common_vendor.o(($event) => {
            return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to(item.pagePath);
          }, item.pagePath)
        });
      }),
      b: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? 1 : "",
      c: common_vendor.gei(_ctx, ""),
      d: common_vendor.p({
        pt: {
          content: {
            className: "-important-p-0 h--bracket-start-60px-bracket-end-"
          }
        },
        id: common_vendor.gei(_ctx, "")
      })
    };
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a872b9ed"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/tabbar.js.map
