"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../cool/utils/comm.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_popup_1 = common_vendor.resolveComponent("cl-popup");
  (_easycom_cl_icon_1 + _easycom_cl_text_1 + _easycom_cl_popup_1)();
}
const _easycom_cl_icon = () => "../cl-icon/cl-icon.js";
const _easycom_cl_text = () => "../cl-text/cl-text.js";
const _easycom_cl_popup = () => "../cl-popup/cl-popup.js";
if (!Math) {
  (_easycom_cl_icon + _easycom_cl_text + _easycom_cl_popup)();
}
class ToastItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          visible: { type: Boolean, optional: false },
          isOpen: { type: Boolean, optional: false },
          icon: { type: String, optional: true },
          image: { type: String, optional: true },
          msgNotifier: { type: String, optional: false },
          position: { type: "Unknown", optional: false },
          duration: { type: Number, optional: false }
        };
      },
      name: "ToastItem"
    };
  }
  constructor(options, metadata = ToastItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.visible = this.__props__.visible;
    this.isOpen = this.__props__.isOpen;
    this.icon = this.__props__.icon;
    this.image = this.__props__.image;
    this.msgNotifier = this.__props__.msgNotifier;
    this.position = this.__props__.position;
    this.duration = this.__props__.duration;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-toast"
}, { __name: "cl-toast", setup(__props, _a) {
  var __expose = _a.expose;
  const list = common_vendor.ref([]);
  let id = 0;
  function close(id2) {
    const item = UTS.arrayFind(list.value, (item2) => {
      return item2.id == id2;
    });
    if (item != null) {
      item.visible = false;
    }
  }
  function open(options) {
    var _a2, _b, _c;
    const item = common_vendor.reactive(new ToastItem({
      id: id++,
      visible: true,
      isOpen: false,
      icon: options.icon,
      image: options.image,
      duration: (_a2 = options.duration) !== null && _a2 !== void 0 ? _a2 : 2e3,
      position: (_b = options.position) !== null && _b !== void 0 ? _b : "center",
      msgNotifier: (_c = options.msgNotifier) !== null && _c !== void 0 ? _c : ""
    }));
    if (!uni_modules_coolUnix_cool_utils_comm.isNull(item.icon) || !uni_modules_coolUnix_cool_utils_comm.isNull(item.image)) {
      item.position = "center";
    }
    switch (options.type) {
      case "success":
        item.icon = "checkbox-circle-line";
        break;
      case "warn":
        item.icon = "error-warning-line";
        break;
      case "error":
        item.icon = "close-circle-line";
        break;
      case "question":
        item.icon = "question-line";
        break;
      case "disabled":
        item.icon = "prohibited-line";
        break;
      case "stop":
        item.icon = "indeterminate-circle-line";
        break;
    }
    if (options.clear == true) {
      list.value = [item];
    } else {
      list.value.push(item);
    }
    setTimeout(() => {
      item.isOpen = true;
      if (item.duration != 0) {
        setTimeout(() => {
          close(item.id);
        }, item.duration);
      }
    }, 50);
  }
  __expose({
    open,
    close
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.f(list.value, (item, id2, i0) => {
        return common_vendor.e({
          a: item.icon != null
        }, item.icon != null ? {
          b: "f15fa9f2-1-" + i0 + "," + ("f15fa9f2-0-" + i0),
          c: common_vendor.p({
            color: "white",
            name: item.icon,
            size: 56,
            pt: {
              className: `mb-1`
            }
          })
        } : {}, {
          d: common_vendor.t(item.msgNotifier),
          e: "f15fa9f2-2-" + i0 + "," + ("f15fa9f2-0-" + i0),
          f: common_vendor.n({
            "is-dark": common_vendor.unref(uni_modules_coolUnix_theme_index.isDark),
            "is-open": item.isOpen
          }),
          g: common_vendor.n(`cl-toast--${item.position}`),
          h: id2,
          i: "f15fa9f2-0-" + i0,
          j: common_vendor.o(($event) => {
            return item.visible = $event;
          }, id2),
          k: common_vendor.p({
            direction: item.position,
            ["show-mask"]: false,
            ["show-header"]: false,
            ["swipe-close"]: false,
            pt: {
              inner: {
                className: "-important-bg-transparent"
              }
            },
            ["keep-alive"]: true,
            ["pointer-events"]: "none",
            modelValue: item.visible,
            id: common_vendor.gei(_ctx, "")
          })
        });
      }),
      b: common_vendor.p({
        color: "white",
        pt: {
          className: "text-center"
        }
      }),
      c: common_vendor.n({}),
      d: common_vendor.gei(_ctx, "")
    };
    return __returned__;
  };
} }));
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f15fa9f2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-toast/cl-toast.js.map
