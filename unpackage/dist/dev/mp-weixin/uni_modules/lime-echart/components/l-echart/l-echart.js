"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeEchart_components_lEchart_canvas = require("./canvas.js");
const uni_modules_limeEchart_static_web_echarts_esm_min = require("../../static/web/echarts.esm.min.js");
const uni_modules_limeEchart_components_lEchart_utils = require("./utils.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-echart",
  props: {
    webviewStyles: {},
    lStyle: {},
    isDisableScroll: { type: Boolean, default: false },
    isClickable: { type: Boolean, default: true },
    enableHover: { type: Boolean, default: false },
    beforeDelay: { default: 30 },
    landscape: { type: Boolean, default: false },
    autoHideTooltip: { type: Boolean, default: false }
  },
  emits: ["finished"],
  setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const emits = __emit;
    const props = __props;
    const instance = common_vendor.getCurrentInstance();
    const canvasid = `lime-echart-${instance.uid}`;
    const finished = common_vendor.ref(false);
    const initializationQueue = [];
    const callbackQueue = [];
    let chartInstance = null;
    common_vendor.ref(null);
    let canvasNode = null;
    const processInitializationQueue = () => {
      while (initializationQueue.length > 0) {
        if (chartInstance != null) {
          const resolve = UTS.arrayPop(initializationQueue);
          resolve(chartInstance);
        }
      }
      if (chartInstance != null) {
        while (callbackQueue.length > 0) {
          const callback = UTS.arrayPop(callbackQueue);
          callback(chartInstance);
        }
      }
    };
    const checkInitialization = () => {
      if (chartInstance == null) {
        common_vendor.index.__f__("warn", "at uni_modules/lime-echart/components/l-echart/l-echart.uvue:99", `组件还未初始化，请先使用 init`);
        return true;
      }
      return false;
    };
    const setOption = (option) => {
      if (checkInitialization())
        return null;
      chartInstance.setOption(option);
    };
    const showLoading = () => {
      if (checkInitialization())
        return null;
      chartInstance.showLoading();
    };
    const hideLoading = () => {
      if (checkInitialization())
        return null;
      chartInstance.hideLoading();
    };
    const clear = () => {
      if (checkInitialization())
        return null;
      chartInstance.clear();
    };
    const dispose = () => {
      if (checkInitialization())
        return null;
      chartInstance.dispose();
    };
    const resize = (size) => {
      if (checkInitialization())
        return null;
      chartInstance.resize(size);
    };
    const canvasToTempFilePath = (opt) => {
      var _a2;
      if (checkInitialization())
        return null;
      if (canvasNode) {
        (_a2 = opt.success) === null || _a2 === void 0 ? null : _a2.call(opt, new UTSJSONObject({
          tempFilePath: canvasNode.toDataURL()
        }));
      } else {
        common_vendor.index.canvasToTempFilePath(Object.assign(Object.assign({}, opt), { canvasId }), instance.proxy);
      }
    };
    let use2dCanvas = uni_modules_limeEchart_components_lEchart_utils.canIUseCanvas2d();
    const getContext = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
          common_vendor.index.createCanvasContextAsync({
            id: canvasid,
            component: instance.proxy,
            success: (context) => {
              canvasNode = context;
              const canvasContext = context.getContext("2d");
              const canvas = canvasContext.canvas;
              let uniCanvas = null;
              const width = canvas.offsetWidth;
              const height = canvas.offsetHeight;
              const dpr = uni_modules_limeEchart_components_lEchart_utils.devicePixelRatio;
              canvas.width = canvas.offsetWidth * dpr;
              canvas.height = canvas.offsetHeight * dpr;
              canvasContext.scale(dpr, dpr);
              if (use2dCanvas) {
                uniCanvas = new uni_modules_limeEchart_components_lEchart_canvas.Canvas(canvasContext, instance.proxy, true, context);
              } else {
                uniCanvas = new uni_modules_limeEchart_components_lEchart_canvas.Canvas(canvasContext, instance.proxy, false);
              }
              resolve({ canvas: uniCanvas, width, height, devicePixelRatio: dpr, node: context });
            },
            fail(err) {
              reject(err);
              common_vendor.index.__f__("log", "at uni_modules/lime-echart/components/l-echart/l-echart.uvue:194", "err", err);
            }
          });
        });
      });
    };
    const getTouch = (e = null) => {
      const touches = e.touches[0];
      const touch = new UTSJSONObject({
        x: touches.x,
        y: touches.y
      });
      return touch;
    };
    const touchstart = (e = null) => {
      if (chartInstance == null)
        return null;
      const handler = chartInstance.getZr().handler;
      const touch = getTouch(e);
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "mousedown", touch);
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "click", touch);
    };
    const touchmove = (e = null) => {
      if (chartInstance == null)
        return null;
      const handler = chartInstance.getZr().handler;
      const touch = getTouch(e);
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "mousemove", touch);
    };
    const touchend = (e = null) => {
      if (chartInstance == null || !props.autoHideTooltip)
        return null;
      const handler = chartInstance.getZr().handler;
      const touch = new UTSJSONObject({
        x: 999999999,
        y: 999999999
      });
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "mousemove", touch);
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "touchend", touch);
    };
    function init(echarts = null, ...args) {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const library = echarts || uni_modules_limeEchart_static_web_echarts_esm_min.echartsLibrary;
        if (library == null) {
          common_vendor.index.__f__("error", "at uni_modules/lime-echart/components/l-echart/l-echart.uvue:251", "请确保已经引入了 ECharts 库");
          return Promise.reject("请确保已经引入了 ECharts 库");
        }
        let theme = null;
        let opts = new UTSJSONObject({});
        let callback = null;
        args.forEach((item = null) => {
          if (typeof item === "function") {
            callback = item;
          } else if (["string"].includes(typeof item)) {
            theme = item;
          } else if (typeof item === "object") {
            opts = item;
          }
        });
        let config = yield getContext();
        uni_modules_limeEchart_components_lEchart_canvas.setCanvasCreator(library, config);
        chartInstance = library.init(config.canvas, theme, Object.assign(new UTSJSONObject({}), config, opts));
        if (callback != null && typeof callback == "function") {
          callbackQueue.push(callback);
        }
        return new Promise((resolve) => {
          initializationQueue.push(resolve);
          processInitializationQueue();
        });
      });
    }
    common_vendor.onMounted(() => {
      common_vendor.nextTick$1(() => {
        finished.value = true;
        processInitializationQueue();
        emits("finished");
      });
    });
    common_vendor.onUnmounted(() => {
    });
    __expose({
      init,
      setOption,
      showLoading,
      hideLoading,
      clear,
      dispose,
      resize,
      canvasToTempFilePath
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: canvasid
      }, canvasid ? {
        b: common_vendor.sei(canvasid, "canvas"),
        c: common_vendor.o(touchstart),
        d: common_vendor.o(touchmove),
        e: common_vendor.o(touchend)
      } : {}, {
        f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-echart/components/l-echart/l-echart.js.map
