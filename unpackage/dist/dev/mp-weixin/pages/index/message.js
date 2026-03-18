"use strict";
const common_vendor = require("../../common/vendor.js");
const locale_index = require("../../locale/index.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
require("../../core/store/dict.js");
const core_store_user = require("../../core/store/user.js");
const config_index = require("../../config/index.js");
const uni_modules_coolUnix_cool_router_index = require("../../uni_modules/cool-unix/cool/router/index.js");
require("../../uni_modules/cool-unix/cool/ctx/index.js");
const uni_modules_coolUnix_theme_index = require("../../uni_modules/cool-unix/theme/index.js");
const uni_modules_coolUnix_cool_hooks_refs = require("../../uni_modules/cool-unix/cool/hooks/refs.js");
const uni_modules_coolUnix_cool_utils_device = require("../../uni_modules/cool-unix/cool/utils/device.js");
require("../../uni_modules/cool-unix/config.js");
const core_utils_parse = require("../../core/utils/parse.js");
if (!Array) {
  const _easycom_cl_text_1 = common_vendor.resolveComponent("cl-text");
  const _easycom_cl_icon_1 = common_vendor.resolveComponent("cl-icon");
  const _easycom_cl_topbar_1 = common_vendor.resolveComponent("cl-topbar");
  const _easycom_cl_image_1 = common_vendor.resolveComponent("cl-image");
  const _easycom_cl_page_1 = common_vendor.resolveComponent("cl-page");
  (_easycom_cl_text_1 + _easycom_cl_icon_1 + _easycom_cl_topbar_1 + _easycom_cl_image_1 + _easycom_cl_page_1)();
}
const _easycom_cl_text = () => "../../uni_modules/cool-unix/components/cl-text/cl-text.js";
const _easycom_cl_icon = () => "../../uni_modules/cool-unix/components/cl-icon/cl-icon.js";
const _easycom_cl_topbar = () => "../../uni_modules/cool-unix/components/cl-topbar/cl-topbar.js";
const _easycom_cl_image = () => "../../uni_modules/cool-unix/components/cl-image/cl-image.js";
const _easycom_cl_page = () => "../../uni_modules/cool-unix/components/cl-page/cl-page.js";
if (!Math) {
  (_easycom_cl_text + _easycom_cl_icon + _easycom_cl_topbar + _easycom_cl_image + common_vendor.unref(CustomTabbar) + common_vendor.unref(MessageSet) + _easycom_cl_page)();
}
const CustomTabbar = () => "../../components/tabbar.js";
const MessageSet = () => "./components/message-set.js";
const pageSize = 10;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message",
  setup(__props) {
    const refs = uni_modules_coolUnix_cool_hooks_refs.useRefs();
    const page = common_vendor.ref(1);
    const list = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const hasMore = common_vendor.ref(true);
    const readStatus = common_vendor.ref(null);
    function setMessage() {
      refs.open("messageSet");
    }
    const loadData = (isClear) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        if (loading.value) {
          return Promise.resolve(null);
        }
        loading.value = true;
        try {
          yield core_service_index.request({
            url: core_apiRouter_path.apiPath.message_page,
            method: "POST",
            data: new UTSJSONObject({
              page: page.value,
              pageSize,
              accId: (_a = core_store_user.userInfo.value) === null || _a === void 0 ? null : _a.id,
              platform: config_index.config.platform,
              readStatus: readStatus.value == -1 ? null : readStatus.value
            })
          }).then((res = null) => {
            if (res === null) {
              if (isClear) {
                list.value = [];
              }
              return null;
            }
            const r = core_utils_parse.parseData(res);
            if (r === null) {
              if (isClear) {
                list.value = [];
              }
              return null;
            }
            if (isClear) {
              list.value = r;
            } else {
              list.value.push(...r);
            }
            if (r.length < pageSize) {
              hasMore.value = false;
            } else {
              hasMore.value = true;
              page.value++;
            }
          }).catch((err = null) => {
            hasMore.value = true;
            page.value = 1;
            list.value = [];
          });
        } finally {
          loading.value = false;
        }
      });
    };
    const reloadData = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        page.value = 1;
        yield loadData(true);
      });
    };
    const loadMore = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!hasMore.value) {
          return Promise.resolve(null);
        }
        yield loadData(false);
      });
    };
    common_vendor.onLoad(() => {
      reloadData();
      common_vendor.index.$on("maskAsRead", (id) => {
        const index = list.value.findIndex((item) => {
          return item.id == id;
        });
        if (index !== -1) {
          list.value[index].readStatus = 1;
          list.value = [...list.value];
        }
      });
    });
    common_vendor.onReachBottom(() => {
      loadMore();
    });
    common_vendor.onPullDownRefresh(() => {
      reloadData();
      common_vendor.index.stopPullDownRefresh();
    });
    function onMessageChange(payload = null) {
      if (readStatus.value === payload.status) {
        return null;
      }
      readStatus.value = payload.status;
      reloadData();
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.t(common_vendor.unref(locale_index.t)("消息")),
        b: common_vendor.p({
          color: "primary",
          pt: {
            className: "-important-text-xl"
          },
          title: common_vendor.unref(locale_index.t)("消息")
        }),
        c: common_vendor.p({
          name: "bar-chart-horizontal-line",
          color: "primary"
        }),
        d: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? 1 : "",
        e: common_vendor.o(setMessage),
        f: common_vendor.p({
          fixed: true,
          ["background-color"]: common_vendor.unref(uni_modules_coolUnix_theme_index.isDark) ? "black" : "white",
          ["show-back"]: false,
          ["safe-area-top"]: true,
          height: common_vendor.unref(uni_modules_coolUnix_cool_utils_device.isMp)() ? null : 100,
          pt: {
            className: "-important-z-50"
          }
        }),
        g: common_vendor.f(list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: "2de783dc-4-" + i0 + ",2de783dc-0",
            b: common_vendor.p({
              src: `/static/icon/message/type_${item == null ? void 0 : item.type}.svg`
            }),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.createdTime),
            e: common_vendor.t(item.context),
            f: item.readStatus == 0
          }, item.readStatus == 0 ? {} : {}, {
            g: item.type == 1 ? 1 : "",
            h: item.id,
            i: common_vendor.o(($event) => {
              return common_vendor.unref(uni_modules_coolUnix_cool_router_index.router).to("/pages/message/message_detail?id=" + item.id);
            }, item.id)
          });
        }),
        h: loading.value
      }, loading.value ? {} : {}, {
        i: common_vendor.sr(common_vendor.unref(refs).set("messageSet"), "2de783dc-6,2de783dc-0"),
        j: common_vendor.unref(refs).set("messageSet"),
        k: common_vendor.o(onMessageChange),
        l: common_vendor.p({
          status: readStatus.value
        }),
        m: common_vendor.gei(_ctx, ""),
        n: common_vendor.p({
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2de783dc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/message.js.map
