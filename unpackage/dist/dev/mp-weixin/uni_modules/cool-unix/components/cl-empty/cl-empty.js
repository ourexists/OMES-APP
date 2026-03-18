"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_coolUnix_locale_index = require("../../locale/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  _easycom_cl_text_1();
}
const _easycom_cl_text = () => "../cl-text/cl-text.js";
if (!Math) {
  _easycom_cl_text();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cl-empty",
  props: {
    // 透传样式配置
    pt: {
      type: Object,
      default: () => {
        return new UTSJSONObject({});
      }
    },
    // 空状态文本
    text: {
      type: String,
      default: () => {
        return uni_modules_coolUnix_locale_index.t("暂无数据");
      }
    },
    // 空状态图标名称
    icon: {
      type: String,
      default: "comm"
    },
    // 图标尺寸
    iconSize: {
      type: [Number, String],
      default: 120
    },
    // 是否显示图标
    showIcon: {
      type: Boolean,
      default: true
    },
    // 是否固定定位
    fixed: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const pt = common_vendor.computed(() => {
      return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: __props.showIcon
      }, __props.showIcon ? {
        b: `/static/empty/${__props.icon}.png`,
        c: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseRpx)(__props.iconSize)
      } : {}, {
        d: __props.text
      }, __props.text ? {
        e: common_vendor.t(__props.text),
        f: common_vendor.p({
          pt: {
            className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["cl-empty__text text-sm text-surface-400", {
              "text-surface-100": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark)
            }])
          }
        })
      } : {}, {
        g: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        h: common_vendor.n({}),
        i: common_vendor.n({
          "cl-empty--fixed": __props.fixed
        }),
        j: common_vendor.n(pt.value.className)
      });
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-85212bb9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-empty/cl-empty.js.map
