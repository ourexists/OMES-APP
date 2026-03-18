"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_cool_hooks_cache = require("../../cool/hooks/cache.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
if (!Array) {
  const _easycom_cl_loading_1 = common_vendor.resolveComponent("cl-loading");
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  (_easycom_cl_loading_1 + _easycom_cl_icon_1 + _easycom_cl_text_1)();
}
const _easycom_cl_loading = () => "../cl-loading/cl-loading.js";
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
const _easycom_cl_text = () => "../cl-text/cl-text.js";
if (!Math) {
  (_easycom_cl_loading + _easycom_cl_icon + _easycom_cl_text)();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true },
          label: { type: "Unknown", optional: true },
          icon: { type: "Unknown", optional: true },
          loading: { type: "Unknown", optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    this.label = this.__props__.label;
    this.icon = this.__props__.icon;
    this.loading = this.__props__.loading;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-button"
}, { __name: "cl-button", props: {
  // 样式穿透
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 按钮类型
  type: {
    type: String,
    default: "primary"
  },
  // 字体、图标颜色
  color: {
    type: String,
    default: ""
  },
  // 图标
  icon: {
    type: String,
    default: ""
  },
  // 文本按钮
  text: {
    type: Boolean,
    default: false
  },
  // 圆角按钮
  rounded: {
    type: Boolean,
    default: false
  },
  // 边框按钮
  border: {
    type: Boolean,
    default: false
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 禁用状态
  disabled: {
    type: Boolean,
    default: false
  },
  // 按钮尺寸
  size: {
    type: String,
    default: "normal"
  },
  // 按钮点击态样式类
  hoverClass: {
    type: String,
    default: ""
  },
  // 是否阻止点击态冒泡
  hoverStopPropagation: {
    type: Boolean,
    default: false
  },
  // 按住后多久出现点击态
  hoverStartTime: {
    type: Number,
    default: 20
  },
  // 手指松开后点击态保留时间
  hoverStayTime: {
    type: Number,
    default: 70
  },
  // 表单提交类型
  formType: {
    type: String,
    default: ""
  },
  // 开放能力类型
  openType: {
    type: String,
    default: ""
  },
  // 语言
  lang: {
    type: String,
    default: "zh_CN"
  },
  // 会话来源
  sessionFrom: {
    type: String,
    default: ""
  },
  // 会话标题
  sendMessageTitle: {
    type: String,
    default: ""
  },
  // 会话路径
  sendMessagePath: {
    type: String,
    default: ""
  },
  // 会话图片
  sendMessageImg: {
    type: String,
    default: ""
  },
  // 显示会话卡片
  showMessageCard: {
    type: Boolean,
    default: false
  },
  // 打开 APP 时，向 APP 传递的参数
  appParameter: {
    type: String,
    default: ""
  },
  // 群ID
  groupId: {
    type: String,
    default: ""
  },
  // 公会ID
  guildId: {
    type: String,
    default: ""
  },
  // 公众号ID
  publicId: {
    type: String,
    default: ""
  },
  // 手机号获取失败时是否弹出错误提示
  phoneNumberNoQuotaToast: {
    type: Boolean,
    default: false
  },
  // 是否创建直播活动
  createliveactivity: {
    type: Boolean,
    default: false
  }
}, emits: [
  "click",
  "tap",
  "getuserinfo",
  "contact",
  "getphonenumber",
  "error",
  "opensetting",
  "launchapp",
  "chooseavatar",
  "chooseaddress",
  "chooseinvoicetitle",
  "addgroupapp",
  "subscribe",
  "login",
  "getrealtimephonenumber",
  "agreeprivacyauthorization"
], setup(__props, _a) {
  var __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const slots = common_vendor.useSlots();
  const cache = uni_modules_coolUnix_cool_hooks_cache.useCache(() => {
    return [
      props.type,
      props.text,
      props.disabled,
      props.loading,
      props.color
    ];
  }).cache;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const isIcon = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_comm.get(slots, "default") == null && uni_modules_coolUnix_cool_utils_comm.get(slots, "content") == null;
  });
  const textColor = common_vendor.computed(() => {
    if (props.color != "") {
      return props.color;
    }
    let color = "light";
    if (props.text) {
      color = props.type;
      if (props.disabled) {
        color = "disabled";
      }
    }
    if (props.type == "light") {
      if (!uni_modules_coolUnix_theme_index.isDark.value) {
        color = "dark";
      }
    }
    return color;
  });
  const leftIcon = common_vendor.computed(() => {
    var _a2, _b;
    let color = textColor.value;
    let size;
    switch (props.size) {
      case "small":
        size = 26;
        break;
      default:
        size = 32;
        break;
    }
    const ptIcon = pt.value.icon;
    if (ptIcon != null) {
      color = (_a2 = ptIcon.color) !== null && _a2 !== void 0 ? _a2 : color;
      size = (_b = ptIcon.size) !== null && _b !== void 0 ? _b : size;
    }
    return {
      size,
      color
    };
  });
  const loadingIcon = common_vendor.computed(() => {
    var _a2, _b;
    let color = textColor.value;
    let size;
    switch (props.size) {
      case "small":
        size = 22;
        break;
      default:
        size = 24;
        break;
    }
    const ptIcon = pt.value.loading;
    if (ptIcon != null) {
      color = (_a2 = ptIcon.color) !== null && _a2 !== void 0 ? _a2 : color;
      size = (_b = ptIcon.size) !== null && _b !== void 0 ? _b : size;
    }
    return {
      size,
      color
    };
  });
  const buttonStyle = common_vendor.computed(() => {
    const style = new UTSJSONObject({});
    if (props.color != "") {
      style["border-color"] = props.color;
    }
    return style;
  });
  const isDisabled = common_vendor.computed(() => {
    return props.disabled || props.loading;
  });
  function onTap(e) {
    if (isDisabled.value)
      return null;
    emit("click", e);
    emit("tap", e);
  }
  function onGetUserInfo(e) {
    emit("getuserinfo", e);
  }
  function onContact(e) {
    emit("contact", e);
  }
  function onGetPhoneNumber(e) {
    emit("getphonenumber", e);
  }
  function onError(e) {
    emit("error", e);
  }
  function onOpenSetting(e) {
    emit("opensetting", e);
  }
  function onLaunchApp(e) {
    emit("launchapp", e);
  }
  function onChooseAvatar(e) {
    emit("chooseavatar", e);
  }
  function onChooseAddress(e) {
    emit("chooseaddress", e);
  }
  function onChooseInvoiceTitle(e) {
    emit("chooseinvoicetitle", e);
  }
  function onAddGroupApp(e) {
    emit("addgroupapp", e);
  }
  function onSubscribe(e) {
    emit("subscribe", e);
  }
  function onLogin(e) {
    emit("login", e);
  }
  function onGetRealtimePhoneNumber(e) {
    emit("getrealtimephonenumber", e);
  }
  function onAgreePrivacyAuthorization(e) {
    emit("agreeprivacyauthorization", e);
  }
  const isHover = common_vendor.ref(false);
  function onTouchStart() {
    if (!isDisabled.value) {
      isHover.value = true;
    }
  }
  function onTouchEnd() {
    isHover.value = false;
  }
  function onTouchCancel() {
    isHover.value = false;
  }
  return (_ctx, _cache) => {
    "raw js";
    var _a2, _b, _c;
    const __returned__ = common_vendor.e({
      a: isDisabled.value,
      b: __props.hoverClass,
      c: __props.hoverStopPropagation,
      d: __props.hoverStartTime,
      e: __props.hoverStayTime,
      f: __props.formType,
      g: __props.openType,
      h: __props.lang,
      i: __props.sessionFrom,
      j: __props.sendMessageTitle,
      k: __props.sendMessagePath,
      l: __props.sendMessageImg,
      m: __props.showMessageCard,
      n: __props.appParameter,
      o: __props.groupId,
      p: __props.guildId,
      q: __props.publicId,
      r: __props.phoneNumberNoQuotaToast,
      s: __props.createliveactivity,
      t: common_vendor.o(onGetUserInfo),
      v: common_vendor.o(onContact),
      w: common_vendor.o(onGetPhoneNumber),
      x: common_vendor.o(onError),
      y: common_vendor.o(onOpenSetting),
      z: common_vendor.o(onLaunchApp),
      A: common_vendor.o(onChooseAvatar),
      B: common_vendor.o(onChooseAddress),
      C: common_vendor.o(onChooseInvoiceTitle),
      D: common_vendor.o(onAddGroupApp),
      E: common_vendor.o(onSubscribe),
      F: common_vendor.o(onLogin),
      G: common_vendor.o(onGetRealtimePhoneNumber),
      H: common_vendor.o(onAgreePrivacyAuthorization),
      I: common_vendor.o(onTouchStart),
      J: common_vendor.o(onTouchEnd),
      K: common_vendor.o(onTouchCancel),
      L: __props.loading && !__props.disabled
    }, __props.loading && !__props.disabled ? {
      M: common_vendor.p({
        color: loadingIcon.value.color,
        size: loadingIcon.value.size,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["mr--bracket-start-10rpx-bracket-end-", (_a2 = pt.value.loading) == null ? void 0 : _a2.className])
        }
      })
    } : {}, {
      N: __props.icon
    }, __props.icon ? {
      O: common_vendor.p({
        name: __props.icon,
        color: leftIcon.value.color,
        size: leftIcon.value.size,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)([{
            "mr--bracket-start-8rpx-bracket-end-": !isIcon.value
          }, (_b = pt.value.icon) == null ? void 0 : _b.className])
        }
      })
    } : {}, {
      P: !isIcon.value
    }, !isIcon.value ? {
      Q: common_vendor.p({
        color: textColor.value,
        pt: {
          className: common_vendor.unref(uni_modules_coolUnix_cool_utils_parse.parseClass)(["cl-button__label", {
            "text-sm": __props.size == "small"
          }, (_c = pt.value.label) == null ? void 0 : _c.className])
        }
      })
    } : {}, {
      R: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      S: common_vendor.n({}),
      T: common_vendor.n(`cl-button--${__props.size}`),
      U: common_vendor.n(`cl-button--${__props.type} `),
      V: common_vendor.n({
        "cl-button--loading": __props.loading,
        "cl-button--disabled": __props.disabled,
        "cl-button--text": __props.text,
        "cl-button--border": __props.border,
        "cl-button--rounded": __props.rounded,
        "cl-button--icon": isIcon.value,
        "cl-button--hover": isHover.value,
        "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark)
      }),
      W: common_vendor.n(isHover.value ? __props.hoverClass : ""),
      X: common_vendor.n(pt.value.className),
      Y: common_vendor.unref(cache).key,
      Z: common_vendor.s(buttonStyle.value),
      aa: common_vendor.o(onTap)
    });
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-47c2a5f4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-button/cl-button.js.map
