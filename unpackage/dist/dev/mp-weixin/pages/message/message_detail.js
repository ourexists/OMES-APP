"use strict";
const common_vendor = require("../../common/vendor.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../uni_modules/cool-unix/theme/index.js");
require("../../uni_modules/cool-unix/config.js");
const locale_index = require("../../locale/index.js");
require("../../core/store/dict.js");
const core_store_user = require("../../core/store/user.js");
const core_utils_parse = require("../../core/utils/parse.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_text_1 + _easycom_cl_topbar_1 + _easycom_cl_image_1 + _easycom_cl_icon_1 + _easycom_cl_page_1)();
}
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_image = () => "../../uni_modules/cool-unix/components/cl-image/cl-image.js";
const _easycom_cl_icon = () => "../../uni_modules/cool-unix/components/cl-icon/cl-icon.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_topbar + _easycom_cl_image + _easycom_cl_icon + _easycom_cl_page)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message_detail",
  emits: ["maskAsRead"],
  setup(__props, _a) {
    _a.emit;
    const message = common_vendor.ref(null);
    const sourceTitle = common_vendor.ref(null);
    const sourceId = common_vendor.ref(null);
    const sourceSubTitle = common_vendor.ref(null);
    const markAsRead = (id) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        yield core_service_index.request({
          url: core_apiRouter_path.apiPath.message_read,
          method: "GET",
          data: new UTSJSONObject({ messageId: id })
        }).then((res = null) => {
          common_vendor.index.$emit("maskAsRead", id);
        });
      });
    };
    const equipQuery = (id) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        yield core_service_index.request({
          url: core_apiRouter_path.apiPath.equip_id,
          method: "GET",
          data: new UTSJSONObject({ id })
        }).then((res = null) => {
          var _a2;
          if (res == null) {
            return null;
          }
          const r = core_utils_parse.parseData(res);
          if (r == null) {
            return null;
          }
          sourceTitle.value = r.name;
          sourceId.value = r.selfCode;
          sourceSubTitle.value = (_a2 = r.workshop) === null || _a2 === void 0 ? null : _a2.name;
        });
      });
    };
    const loadDetail = (id) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a2;
        yield core_service_index.request({
          url: core_apiRouter_path.apiPath.message_detail,
          method: "GET",
          data: new UTSJSONObject({
            id,
            accId: (_a2 = core_store_user.userInfo.value) === null || _a2 === void 0 ? null : _a2.id
          })
        }).then((res = null) => {
          if (res == null) {
            return null;
          }
          const r = core_utils_parse.parseData(res);
          if (r == null) {
            return null;
          }
          message.value = r;
          if (r.readStatus == 0) {
            markAsRead(r.id);
          }
          if (r.source == "Equip" && r.sourceId != null) {
            equipQuery(r.sourceId);
          }
        });
      });
    };
    function toOther() {
      if (message.value == null || message.value.source == null || message.value.sourceId == null) {
        return null;
      }
      if (message.value.source == "Equip") {
        uni_modules_coolUnix_cool_router_index.router.to("/pages/equip/equip_detail?id=" + message.value.sourceId);
      }
    }
    common_vendor.onLoad((options) => {
      if (options == null) {
        return null;
      }
      let id = options.id;
      loadDetail(id);
    });
    return (_ctx, _cache) => {
      "raw js";
      var _a2, _b, _c, _d;
      const __returned__ = common_vendor.e({
        a: common_vendor.p({
          pt: {
            className: "-important-text-xl font-bold"
          },
          title: common_vendor.unref(locale_index.t)("消息详情")
        }),
        b: common_vendor.p({
          fixed: true,
          ["show-back"]: true,
          ["safe-area-top"]: true,
          ["background-color"]: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "black" : "white"
        }),
        c: common_vendor.p({
          src: `/static/icon/message/type_${message.value == null ? 0 : message.value.type}.svg`
        }),
        d: common_vendor.t((_a2 = message.value) == null ? void 0 : _a2.title),
        e: common_vendor.t((_b = message.value) == null ? void 0 : _b.createdTime),
        f: sourceTitle.value != null
      }, sourceTitle.value != null ? {
        g: common_vendor.p({
          src: `/static/icon/source.svg`
        }),
        h: common_vendor.t(sourceTitle.value),
        i: common_vendor.t(sourceSubTitle.value),
        j: common_vendor.t(sourceId.value),
        k: common_vendor.p({
          name: "arrow-right-s-line",
          pt: {
            className: "-important-text-lg text-gray-400"
          }
        }),
        l: common_vendor.o(toOther)
      } : {}, {
        m: common_vendor.t(common_vendor.unref(locale_index.t)("报警内容")),
        n: common_vendor.t((_c = message.value) == null ? void 0 : _c.context),
        o: ((_d = message.value) == null ? void 0 : _d.type) === 1 ? 1 : "",
        p: common_vendor.gei(_ctx, ""),
        q: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-696000ff"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message_detail.js.map
