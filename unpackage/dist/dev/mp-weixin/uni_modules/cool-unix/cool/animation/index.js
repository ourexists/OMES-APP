"use strict";
const common_vendor = require("../../../../common/vendor.js");
const BEZIER_SPLINE_SIZE = 11;
const BEZIER_SAMPLE_STEP = 1 / (BEZIER_SPLINE_SIZE - 1);
function getBezierCoefficientA(x1, x2) {
  return 1 - 3 * x2 + 3 * x1;
}
function getBezierCoefficientB(x1, x2) {
  return 3 * x2 - 6 * x1;
}
function getBezierCoefficientC(x1) {
  return 3 * x1;
}
function calculateBezierValue(t, x1, x2) {
  const a = getBezierCoefficientA(x1, x2);
  const b = getBezierCoefficientB(x1, x2);
  const c = getBezierCoefficientC(x1);
  return ((a * t + b) * t + c) * t;
}
function getBezierSlope(t, x1, x2) {
  const a = getBezierCoefficientA(x1, x2);
  const b = getBezierCoefficientB(x1, x2);
  const c = getBezierCoefficientC(x1);
  return 3 * a * t * t + 2 * b * t + c;
}
function binarySearchBezierT(targetX, startT, endT, x1, x2) {
  let currentX;
  let currentT;
  let iterations = 0;
  const maxIterations = 10;
  const precision = 1e-7;
  do {
    currentT = startT + (endT - startT) / 2;
    currentX = calculateBezierValue(currentT, x1, x2) - targetX;
    if (currentX > 0) {
      endT = currentT;
    } else {
      startT = currentT;
    }
    iterations++;
  } while (Math.abs(currentX) > precision && iterations < maxIterations);
  return currentT;
}
function newtonRaphsonBezierT(targetX, initialGuess, x1, x2) {
  let t = initialGuess;
  const maxIterations = 4;
  for (let i = 0; i < maxIterations; i++) {
    const slope = getBezierSlope(t, x1, x2);
    if (slope == 0) {
      return t;
    }
    const currentX = calculateBezierValue(t, x1, x2) - targetX;
    t = t - currentX / slope;
  }
  return t;
}
function createBezierEasing(x1, y1, x2, y2) {
  if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) {
    return null;
  }
  const sampleValues = [];
  if (x1 != y1 || x2 != y2) {
    for (let i = 0; i < BEZIER_SPLINE_SIZE; i++) {
      sampleValues.push(calculateBezierValue(i * BEZIER_SAMPLE_STEP, x1, x2));
    }
  }
  function getTParameterForX(x) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = BEZIER_SPLINE_SIZE - 1;
    for (; currentSample != lastSample && sampleValues[currentSample] <= x; currentSample++) {
      intervalStart += BEZIER_SAMPLE_STEP;
    }
    currentSample--;
    const dist = (x - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const initialGuess = intervalStart + dist * BEZIER_SAMPLE_STEP;
    const initialSlope = getBezierSlope(initialGuess, x1, x2);
    if (initialSlope >= 1e-3) {
      return newtonRaphsonBezierT(x, initialGuess, x1, x2);
    } else if (initialSlope == 0) {
      return initialGuess;
    }
    return binarySearchBezierT(x, intervalStart, intervalStart + BEZIER_SAMPLE_STEP, x1, x2);
  }
  return function(progress) {
    if (x1 == y1 && x2 == y2) {
      return progress;
    }
    if (progress == 0 || progress == 1) {
      return progress;
    }
    return calculateBezierValue(getTParameterForX(progress), y1, y2);
  };
}
function getDefaultColor(colorValue) {
  if (colorValue.startsWith("#")) {
    return colorValue;
  }
  if (colorValue.startsWith("rgb")) {
    return colorValue;
  }
  return "#000000";
}
function hexToRgb(hex) {
  var _a, _b, _c;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result != null) {
    return {
      r: parseInt((_a = result[1]) !== null && _a !== void 0 ? _a : "0", 16),
      g: parseInt((_b = result[2]) !== null && _b !== void 0 ? _b : "0", 16),
      b: parseInt((_c = result[3]) !== null && _c !== void 0 ? _c : "0", 16),
      a: 1
      // 透明度，默认不透明
    };
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
class AnimationEngine {
  /**
   * 创建动画引擎实例
   * 初始化动画引擎，设置目标元素和动画配置
   * @param element 目标DOM元素，null时仅做计算不应用样式
   * @param options 动画配置选项，包含持续时间、缓动函数等
   */
  constructor(element, options) {
    this.easingPresets = /* @__PURE__ */ new Map([
      ["linear", [0, 0, 1, 1]],
      ["ease", [0.25, 0.1, 0.25, 1]],
      ["easeIn", [0.42, 0, 1, 1]],
      ["easeOut", [0, 0, 0.58, 1]],
      ["easeInOut", [0.42, 0, 0.58, 1]],
      ["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
      ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
      ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
      ["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
      ["easeOutCubic", [0.215, 0.61, 0.355, 1]],
      ["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
      ["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
      ["easeOutQuart", [0.165, 0.84, 0.44, 1]],
      ["easeInOutQuart", [0.77, 0, 0.175, 1]],
      ["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
      ["easeOutQuint", [0.23, 1, 0.32, 1]],
      ["easeInOutQuint", [0.86, 0, 0.07, 1]],
      ["easeInSine", [0.47, 0, 0.745, 0.715]],
      ["easeOutSine", [0.39, 0.575, 0.565, 1]],
      ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
      ["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
      ["easeOutExpo", [0.19, 1, 0.22, 1]],
      ["easeInOutExpo", [1, 0, 0, 1]],
      ["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
      ["easeOutCirc", [0.075, 0.82, 0.165, 1]],
      ["easeInOutBack", [0.68, -0.55, 0.265, 1.55]]
      // 回弹效果
    ]);
    this.targetElement = null;
    this.animationDuration = 500;
    this.isRunning = false;
    this.isPaused = false;
    this.currentProgress = 0;
    this.isReversed = false;
    this.isAlternate = false;
    this.isAlternateReversed = false;
    this.loopCount = 1;
    this.currentLoop = 0;
    this.isStopping = true;
    this.currentAttributeIndex = 0;
    this.onComplete = () => {
    };
    this.onStart = () => {
    };
    this.onFrame = () => {
    };
    this.animationAttributes = [];
    this.startTimestamp = 0;
    this.currentEasingFunction = null;
    this.isSequentialMode = false;
    this.animationFrameId = null;
    this.targetElement = element;
    this.animationDuration = options.duration != null ? options.duration : this.animationDuration;
    this.loopCount = options.loop != null ? options.loop : this.loopCount;
    this.isAlternate = options.alternate != null ? options.alternate : this.isAlternate;
    this.isSequentialMode = options.sequential != null ? options.sequential : this.isSequentialMode;
    if (options.timingFunction != null) {
      const easingParams = this.easingPresets.get(options.timingFunction);
      if (easingParams != null) {
        this.currentEasingFunction = createBezierEasing(
          easingParams[0],
          // x1坐标
          easingParams[1],
          // y1坐标
          easingParams[2],
          // x2坐标
          easingParams[3]
          // y2坐标
        );
      }
    }
    if (options.bezier != null && options.bezier.length == 4) {
      this.currentEasingFunction = createBezierEasing(
        options.bezier[0],
        // 自定义x1坐标
        options.bezier[1],
        // 自定义y1坐标
        options.bezier[2],
        // 自定义x2坐标
        options.bezier[3]
        // 自定义y2坐标
      );
    }
    if (options.complete != null) {
      this.onComplete = options.complete;
    }
    if (options.start != null) {
      this.onStart = options.start;
    }
    if (options.frame != null) {
      this.onFrame = options.frame;
    }
  }
  /**
   * 从样式值中提取单位
   * 解析CSS值中的单位部分，用于动画计算
   * @param value 样式值，如 "100px", "50%"
   * @param propertyName CSS属性名称，用于判断是否需要默认单位
   * @returns 单位字符串
   */
  extractUnit(value, propertyName) {
    if (value == null)
      return "px";
    const unit = value.replace(/[\d|\-|\+|\.]/g, "");
    if (propertyName == "opacity" || propertyName == "z-index") {
      return "";
    }
    return unit == "" ? "px" : unit;
  }
  /**
   * 添加自定义缓动函数
   * 向引擎注册新的缓动函数，可在后续动画中使用
   * @param name 缓动函数名称
   * @param bezierParams 贝塞尔曲线参数 [x1, y1, x2, y2]
   */
  addCustomEasing(name, bezierParams) {
    if (bezierParams.length == 4) {
      this.easingPresets.set(name, bezierParams);
    }
    return this;
  }
  /**
   * 设置动画反向播放
   * 控制动画从结束值向起始值播放
   * @param reverse 是否反向播放，null表示切换当前状态
   */
  setReverse(reverse = null) {
    if (reverse != null) {
      this.isReversed = reverse;
    } else {
      this.isReversed = !this.isReversed;
    }
    return this;
  }
  /**
   * 设置循环播放次数
   * 控制动画重复执行的次数
   * @param count 循环次数，-1表示无限循环
   */
  setLoopCount(count) {
    this.loopCount = count;
    return this;
  }
  /**
   * 设置动画持续时间
   * 控制动画从开始到结束的总时长
   * @param duration 持续时间(毫秒)
   */
  setDuration(duration) {
    this.animationDuration = duration;
    return this;
  }
  /**
   * 设置往返播放模式
   * 控制动画是否在每次循环时反向播放
   * @param alternate 是否往返播放
   */
  setAlternate(alternate) {
    this.isAlternate = alternate;
    return this;
  }
  /**
   * 设置顺序执行模式
   * 控制多个属性是同时动画还是依次动画
   * @param sequential 是否按属性顺序依次执行
   */
  setSequential(sequential) {
    this.isSequentialMode = sequential;
    return this;
  }
  /**
   * 添加动画属性
   * 向动画引擎添加一个CSS属性的动画配置
   * @param propertyName CSS属性名称
   * @param fromValue 起始值(支持数字+单位，如"100px"、"50%")
   * @param toValue 结束值(单位必须与起始值一致)
   * @param unique 是否唯一，true时同名属性会被替换
   */
  addAttribute(propertyName, fromValue, toValue, unique = true) {
    const isColor = this.isColorProperty(propertyName);
    const unit = isColor ? "" : this.extractUnit(fromValue, propertyName);
    const processedFromValue = isColor ? getDefaultColor(fromValue) : parseFloat(fromValue).toString();
    const processedToValue = isColor ? getDefaultColor(toValue) : parseFloat(toValue).toString();
    let existingIndex = this.animationAttributes.findIndex((attr) => {
      return attr.propertyName == propertyName;
    });
    if (!unique) {
      existingIndex = -1;
    }
    const newAttribute = {
      fromValue: processedFromValue,
      toValue: processedToValue,
      unit,
      progress: 0,
      currentValue: processedFromValue,
      propertyName
      // 属性名称
    };
    if (existingIndex == -1) {
      this.animationAttributes.push(newAttribute);
    } else {
      this.animationAttributes[existingIndex] = newAttribute;
    }
    return this;
  }
  /**
   * 快捷方法：添加变换属性
   */
  transform(property, fromValue, toValue) {
    return this.addAttribute(property, fromValue, toValue);
  }
  /**
   * 快捷方法：添加位移动画
   */
  translate(fromX, fromY, toX, toY) {
    this.addAttribute("translateX", fromX, toX);
    this.addAttribute("translateY", fromY, toY);
    return this;
  }
  /**
   * 添加X轴位移动画
   * @param fromX 起始X位置，可以使用"current"表示当前位置
   * @param toX 结束X位置
   * @returns
   */
  translateX(fromX, toX) {
    return this.addAttribute("translateX", fromX, toX);
  }
  /**
   * 添加Y轴位移动画
   * @param fromY 起始Y位置，可以使用"current"表示当前位置
   * @param toY 结束Y位置
   * @returns
   */
  translateY(fromY, toY) {
    return this.addAttribute("translateY", fromY, toY);
  }
  /**
   * 快捷方法：添加缩放动画
   */
  scale(fromScale, toScale) {
    return this.addAttribute("scale", fromScale, toScale);
  }
  /**
   * 快捷方法：添加旋转动画
   */
  rotate(fromDegree, toDegree) {
    return this.addAttribute("rotate", fromDegree, toDegree);
  }
  /**
   * 快捷方法：添加透明度动画
   */
  opacity(fromOpacity, toOpacity) {
    return this.addAttribute("opacity", fromOpacity, toOpacity);
  }
  /**
   * 线性插值计算
   * 根据进度在两个数值之间进行插值，用于计算动画中间值
   * @param startValue 起始值
   * @param endValue 结束值
   * @param progress 进度 (0-1)
   */
  interpolateValue(startValue, endValue, progress) {
    return startValue + (endValue - startValue) * progress;
  }
  /**
   * 判断是否为颜色相关属性
   * 检测CSS属性名是否与颜色相关，用于特殊的颜色动画处理
   * @param propertyName 属性名称
   */
  isColorProperty(propertyName) {
    return propertyName.indexOf("background") > -1 || // 背景颜色相关
    propertyName.indexOf("color") > -1 || // 文字颜色相关
    propertyName.indexOf("border-color") > -1 || // 边框颜色相关
    propertyName.indexOf("shadow") > -1;
  }
  /**
   * 判断是否为Transform相关属性
   * 检测属性名是否为transform相关的CSS属性
   * @param propertyName CSS属性名称
   * @returns 是否为transform属性
   */
  isTransformProperty(propertyName) {
    return propertyName == "scaleX" || // X轴缩放
    propertyName == "scaleY" || // Y轴缩放
    propertyName == "scale" || // 等比缩放
    propertyName == "rotateX" || // X轴旋转
    propertyName == "rotateY" || // Y轴旋转
    propertyName == "rotate" || // Z轴旋转
    propertyName == "translateX" || // X轴位移
    propertyName == "translateY" || // Y轴位移
    propertyName == "translate";
  }
  /**
   * 设置元素样式属性
   * 根据属性类型应用相应的样式值，支持transform、颜色、普通数值属性
   * @param propertyName 属性名称
   * @param currentValue 当前值
   * @param unit 单位
   * @param progress 动画进度
   * @param attribute 动画属性对象
   */
  setElementProperty(propertyName, currentValue, unit, progress, attribute) {
    if (this.targetElement == null)
      return;
    const element = this.targetElement;
    const valueStr = currentValue.toFixed(2);
    if (element.style == null) {
      return;
    }
    switch (propertyName) {
      case "scaleX":
        element.style.setProperty("transform", `scaleX(${currentValue})`);
        break;
      case "scaleY":
        element.style.setProperty("transform", `scaleY(${currentValue})`);
        break;
      case "scale":
        element.style.setProperty("transform", `scale(${currentValue})`);
        break;
      case "rotateX":
        element.style.setProperty("transform", `rotateX(${valueStr + unit})`);
        break;
      case "rotateY":
        element.style.setProperty("transform", `rotateY(${valueStr + unit})`);
        break;
      case "rotate":
        element.style.setProperty("transform", `rotate(${valueStr + unit})`);
        break;
      case "translateX":
        element.style.setProperty("transform", `translateX(${valueStr + unit})`);
        break;
      case "translateY":
        element.style.setProperty("transform", `translateY(${valueStr + unit})`);
        break;
      case "translate":
        element.style.setProperty("transform", `translate(${valueStr + unit},${valueStr + unit})`);
        break;
      default:
        if (this.isColorProperty(propertyName)) {
          const startColor = hexToRgb(attribute.fromValue);
          const endColor = hexToRgb(attribute.toValue);
          const startR = startColor.getNumber != null ? startColor.getNumber("r") : startColor["r"];
          const startG = startColor.getNumber != null ? startColor.getNumber("g") : startColor["g"];
          const startB = startColor.getNumber != null ? startColor.getNumber("b") : startColor["b"];
          const startA = startColor.getNumber != null ? startColor.getNumber("a") : startColor["a"];
          const endR = endColor.getNumber != null ? endColor.getNumber("r") : endColor["r"];
          const endG = endColor.getNumber != null ? endColor.getNumber("g") : endColor["g"];
          const endB = endColor.getNumber != null ? endColor.getNumber("b") : endColor["b"];
          const endA = endColor.getNumber != null ? endColor.getNumber("a") : endColor["a"];
          const r = this.interpolateValue(startR != null ? startR : 0, endR != null ? endR : 0, progress);
          const g = this.interpolateValue(startG != null ? startG : 0, endG != null ? endG : 0, progress);
          const b = this.interpolateValue(startB != null ? startB : 0, endB != null ? endB : 0, progress);
          const a = this.interpolateValue(startA != null ? startA : 1, endA != null ? endA : 1, progress);
          element.style.setProperty(propertyName, `rgba(${r.toFixed(0)},${g.toFixed(0)},${b.toFixed(0)},${a.toFixed(1)})`);
        } else {
          element.style.setProperty(propertyName, valueStr + unit);
        }
        break;
    }
  }
  /**
   * Web平台动画运行方法 (H5/iOS/Harmony)
   * 使用requestAnimationFrame实现流畅的动画循环
   */
  runWebAnimation() {
  }
  /**
   * 更新动画帧
   * 根据执行模式更新所有或当前属性的动画值
   * @param progress 当前进度 (0-1)
   */
  updateAnimationFrame(progress) {
    if (this.targetElement == null)
      return;
    if (!this.isSequentialMode) {
      for (let i = 0; i < this.animationAttributes.length; i++) {
        this.updateSingleAttribute(this.animationAttributes[i], progress);
      }
    } else {
      if (this.currentAttributeIndex < this.animationAttributes.length) {
        this.updateSingleAttribute(this.animationAttributes[this.currentAttributeIndex], progress);
      }
    }
  }
  /**
   * 更新单个属性的动画
   * 计算属性的当前值并应用到元素上
   * @param attribute 动画属性
   * @param progress 进度
   */
  updateSingleAttribute(attribute, progress) {
    attribute.progress = progress;
    if (!this.isColorProperty(attribute.propertyName)) {
      const fromValue = parseFloat(attribute.fromValue);
      const toValue_1 = parseFloat(attribute.toValue);
      let easedProgress = progress;
      if (this.currentEasingFunction != null) {
        easedProgress = this.currentEasingFunction(progress);
      }
      let currentValue = this.interpolateValue(fromValue, toValue_1, easedProgress);
      if (this.isReversed || this.isAlternateReversed) {
        currentValue = this.interpolateValue(toValue_1, fromValue, easedProgress);
      }
      this.setElementProperty(attribute.propertyName, currentValue, attribute.unit, progress, attribute);
    } else {
      this.setElementProperty(attribute.propertyName, 0, attribute.unit, progress, attribute);
    }
  }
  /**
   * 处理动画完成
   */
  handleAnimationComplete() {
    if (this.isSequentialMode && this.currentAttributeIndex < this.animationAttributes.length - 1) {
      this.currentAttributeIndex++;
      this.currentProgress = 0;
      this.restartAnimation();
      return;
    }
    this.currentAttributeIndex = 0;
    this.currentProgress = 0;
    if (this.isAlternate) {
      this.isAlternateReversed = !this.isAlternateReversed;
    }
    if (this.loopCount == -1) {
      this.restartAnimation();
      return;
    } else {
      this.currentLoop++;
      if (this.currentLoop < this.loopCount) {
        this.restartAnimation();
        return;
      }
    }
    this.isRunning = false;
    this.onComplete();
  }
  /**
   * 根据平台重新启动动画
   */
  restartAnimation() {
    this.startTimestamp = 0;
    this.runMPAnimation();
  }
  /**
   * Android平台动画运行方法
   */
  runAndroidAnimation() {
  }
  /**
   * 小程序平台动画运行方法
   */
  runMPAnimation() {
    const self = this;
    self.startTimestamp = 0;
    if (self.displayLinkTimer != 0) {
      clearTimeout(self.displayLinkTimer);
    }
    function animationLoop() {
      if (self.startTimestamp <= 0) {
        self.startTimestamp = Date.now();
      }
      const elapsed = Date.now() - self.startTimestamp;
      const progress = Math.min(elapsed / self.animationDuration + self.currentProgress, 1);
      self.updateAnimationFrame(progress);
      if (self.isPaused) {
        self.isRunning = false;
        self.currentProgress = progress;
        return;
      }
      if (progress >= 1 || self.isStopping) {
        self.handleAnimationComplete();
        return;
      }
      if (progress < 1 && self.isRunning) {
        self.onFrame(progress);
        self.displayLinkTimer = setTimeout(animationLoop, 16);
      }
    }
    self.onStart();
    animationLoop();
  }
  /**
   * 开始播放动画
   */
  play() {
    if (this.isRunning)
      return this;
    this.isRunning = true;
    this.isStopping = false;
    this.isPaused = false;
    this.currentLoop = 0;
    this.currentAttributeIndex = 0;
    this.runMPAnimation();
    return this;
  }
  /**
   * 异步播放动画，支持await
   * @returns Promise，动画完成时resolve
   */
  playAsync() {
    return new Promise((resolve) => {
      const originalComplete = this.onComplete;
      this.onComplete = () => {
        originalComplete();
        resolve();
      };
      this.play();
    });
  }
  /**
   * 停止动画
   * 会立即停止动画并跳转到结束状态
   */
  stop() {
    this.isStopping = true;
    this.currentProgress = 0;
    this.currentAttributeIndex = this.animationAttributes.length;
    if (this.displayLinkTimer != 0) {
      clearTimeout(this.displayLinkTimer);
      this.displayLinkTimer = 0;
    }
    this.isRunning = false;
    return this;
  }
  /**
   * 暂停动画
   * 保留当前状态，可以通过play()恢复
   */
  pause() {
    this.isPaused = true;
    return this;
  }
  /**
   * 恢复暂停的动画
   */
  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.play();
    }
    return this;
  }
  /**
   * 清空应用到元素上的动画样式
   * 只清空实际被动画引擎设置过的CSS属性
   */
  clearElementStyles() {
    var e_1, _a;
    if (this.targetElement == null)
      return;
    const element = this.targetElement;
    try {
      for (var _b = common_vendor.__values(this.animationAttributes), _c = _b.next(); !_c.done; _c = _b.next()) {
        var attr = _c.value;
        const propertyName = attr.propertyName;
        if (this.isTransformProperty(propertyName)) {
          element.style.setProperty("transform", "");
        } else {
          element.style.setProperty(propertyName, "");
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return))
          _a.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  }
  /**
   * 重置动画到初始状态，清空所有内容
   */
  reset() {
    this.stop();
    this.clearElementStyles();
    this.currentProgress = 0;
    this.currentLoop = 0;
    this.currentAttributeIndex = 0;
    this.isAlternateReversed = false;
    this.isReversed = false;
    this.isPaused = false;
    this.isStopping = true;
    this.startTimestamp = 0;
    this.animationAttributes = [];
    this.currentEasingFunction = null;
    this.onComplete = () => {
    };
    this.onStart = () => {
    };
    this.onFrame = () => {
    };
    if (this.displayLinkTimer != 0) {
      clearTimeout(this.displayLinkTimer);
      this.displayLinkTimer = 0;
    }
    return this;
  }
  /**
   * 获取当前动画进度
   */
  getProgress() {
    return this.currentProgress;
  }
  /**
   * 获取动画是否正在运行
   */
  isAnimating() {
    return this.isRunning;
  }
  /**
   * 获取当前循环次数
   */
  getCurrentLoop() {
    return this.currentLoop;
  }
  /**
   * 清除所有动画属性
   */
  clearAttributes() {
    this.animationAttributes = [];
    return this;
  }
  /**
   * 获取动画属性数量
   */
  getAttributeCount() {
    return this.animationAttributes.length;
  }
  /**
   * 淡入动画
   * @param duration 持续时间
   */
  fadeIn(duration = 300) {
    return this.setDuration(duration).opacity("0", "1");
  }
  /**
   * 淡出动画
   * @param duration 持续时间
   */
  fadeOut(duration = 300) {
    return this.setDuration(duration).opacity("1", "0");
  }
  /**
   * 滑入动画(从左)
   * @param duration 持续时间
   */
  slideInLeft(duration = 300) {
    return this.setDuration(duration).translateX("-100%", "0%").opacity("0", "1");
  }
  /**
   * 滑入动画(从右)
   * @param duration 持续时间
   */
  slideInRight(duration = 300) {
    return this.setDuration(duration).translateX("100%", "0%").opacity("0", "1");
  }
  /**
   * 滑入动画(从上)
   * @param duration 持续时间
   */
  slideInUp(duration = 300) {
    return this.setDuration(duration).addAttribute("translateY", "-100%", "0%").opacity("0", "1");
  }
  /**
   * 滑入动画(从下)
   * @param duration 持续时间
   */
  slideInDown(duration = 300) {
    return this.setDuration(duration).addAttribute("translateY", "100%", "0%").opacity("0", "1");
  }
  /**
   * 缩放动画(放大)
   * @param duration 持续时间
   */
  zoomIn(duration = 300) {
    return this.setDuration(duration).scale("0", "1").opacity("0", "1");
  }
  /**
   * 缩放动画(缩小)
   * @param duration 持续时间
   */
  zoomOut(duration = 300) {
    return this.setDuration(duration).scale("1", "0").opacity("1", "0");
  }
  /**
   * 旋转动画
   * @param duration 持续时间
   * @param degrees 旋转角度
   */
  rotateIn(duration = 500, degrees = 360) {
    return this.setDuration(duration).rotate("0deg", `${degrees}deg`).opacity("0", "1");
  }
  /**
   * 旋转退出动画
   * @param duration 持续时间
   * @param degrees 旋转角度
   */
  rotateOut(duration = 500, degrees = 360) {
    return this.setDuration(duration).rotate("0deg", `${degrees}deg`).opacity("1", "0");
  }
  /**
   * 弹跳动画
   * @param duration 持续时间
   */
  bounce(duration = 600) {
    return this.setDuration(duration).addCustomEasing("bounce", [0.68, -0.55, 0.265, 1.55]).scale("1", "1.1").setAlternate(true).setLoopCount(2);
  }
  /**
   * 摇摆动画
   * @param duration 持续时间
   */
  shake(duration = 500) {
    return this.setDuration(duration).addAttribute("translateX", "0px", "10px").setAlternate(true).setLoopCount(6);
  }
  /**
   * 链式动画：支持多个动画依次执行
   * @param animations 动画配置函数数组
   */
  sequence(animations) {
    const self = this;
    if (animations.length == 0) {
      return this;
    }
    const firstEngine = animations[0](new AnimationEngine(this.targetElement, {}));
    if (animations.length == 1) {
      return firstEngine;
    }
    function setNextAnimation(currentEngine, remainingAnimations) {
      if (remainingAnimations.length == 0) {
        return;
      }
      const originalComplete = currentEngine.onComplete;
      currentEngine.onComplete = () => {
        originalComplete();
        const nextEngine = remainingAnimations[0](new AnimationEngine(self.targetElement, {}));
        if (remainingAnimations.length > 1) {
          setNextAnimation(nextEngine, remainingAnimations.slice(1));
        }
        nextEngine.play();
      };
    }
    setNextAnimation(firstEngine, animations.slice(1));
    return firstEngine;
  }
  /**
   * 滑出动画(向左)
   * @param duration 持续时间
   */
  slideOutLeft(duration = 300) {
    return this.setDuration(duration).translateX("0%", "-100%").opacity("1", "0");
  }
  /**
   * 滑出动画(向右)
   * @param duration 持续时间
   */
  slideOutRight(duration = 300) {
    return this.setDuration(duration).translateX("0%", "100%").opacity("1", "0");
  }
  /**
   * 滑出动画(向上)
   * @param duration 持续时间
   */
  slideOutUp(duration = 300) {
    return this.setDuration(duration).addAttribute("translateY", "0%", "-100%").opacity("1", "0");
  }
  /**
   * 滑出动画(向下)
   * @param duration 持续时间
   */
  slideOutDown(duration = 300) {
    return this.setDuration(duration).addAttribute("translateY", "0%", "100%").opacity("1", "0");
  }
  /**
   * 翻转动画(水平)
   * @param duration 持续时间
   */
  flipX(duration = 600) {
    return this.setDuration(duration).addAttribute("rotateX", "0deg", "180deg").addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
  }
  /**
   * 翻转动画(垂直)
   * @param duration 持续时间
   */
  flipY(duration = 600) {
    return this.setDuration(duration).addAttribute("rotateY", "0deg", "180deg").addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
  }
  /**
   * 弹性进入动画
   * @param duration 持续时间
   */
  elasticIn(duration = 600) {
    return this.setDuration(duration).scale("0", "1").opacity("0", "1").addCustomEasing("elastic", [0.175, 0.885, 0.32, 1.275]);
  }
  /**
   * 弹性退出动画
   * @param duration 持续时间
   */
  elasticOut(duration = 600) {
    return this.setDuration(duration).scale("1", "0").opacity("1", "0").addCustomEasing("elastic", [0.68, -0.55, 0.265, 1.55]);
  }
  /**
   * 回弹动画
   * @param duration 持续时间
   */
  rubberBand(duration = 1e3) {
    return this.setDuration(duration).addAttribute("scaleX", "1", "1.25").addAttribute("scaleY", "1", "0.75").setAlternate(true).setLoopCount(2).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
  }
  /**
   * 摆动动画
   * @param duration 持续时间
   */
  swing(duration = 1e3) {
    return this.setDuration(duration).addAttribute("rotate", "0deg", "15deg").setAlternate(true).setLoopCount(4).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
  }
  /**
   * 抖动动画
   * @param duration 持续时间
   */
  wobble(duration = 1e3) {
    return this.setDuration(duration).addAttribute("translateX", "0px", "25px").addAttribute("rotate", "0deg", "5deg").setAlternate(true).setLoopCount(4);
  }
  /**
   * 滚动进入动画
   * @param duration 持续时间
   */
  rollIn(duration = 600) {
    return this.setDuration(duration).translateX("-100%", "0%").rotate("-120deg", "0deg").opacity("0", "1");
  }
  /**
   * 滚动退出动画
   * @param duration 持续时间
   */
  rollOut(duration = 600) {
    return this.setDuration(duration).translateX("0%", "100%").rotate("0deg", "120deg").opacity("1", "0");
  }
  /**
   * 灯光效果动画
   * @param duration 持续时间
   */
  lightSpeed(duration = 500) {
    return this.setDuration(duration).translateX("-100%", "0%").addAttribute("skewX", "-30deg", "0deg").opacity("0", "1").addCustomEasing("ease-out", [0.25, 0.46, 0.45, 0.94]);
  }
  /**
   * 浮动动画
   * @param duration 持续时间
   */
  float(duration = 3e3) {
    return this.setDuration(duration).translateY("0px", "-10px").setAlternate(true).setLoopCount(-1).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
  }
  /**
   * 呼吸动画
   * @param duration 持续时间
   */
  breathe(duration = 2e3) {
    return this.setDuration(duration).scale("1", "1.1").setAlternate(true).setLoopCount(-1).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
  }
  /**
   * 发光动画
   * @param duration 持续时间
   */
  glow(duration = 1500) {
    return this.setDuration(duration).addAttribute("boxShadow", "0 0 5px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,1)").setAlternate(true).setLoopCount(-1).addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
  }
  /**
   * 进度条动画
   * @param duration 持续时间
   * @param progress 进度百分比 (0-100)
   */
  progressBar(duration = 1e3, progress = 100) {
    return this.setDuration(duration).addAttribute("width", "0%", `${progress}%`).addCustomEasing("ease-out", [0.25, 0.46, 0.45, 0.94]);
  }
  /**
   * 模态框进入动画
   * @param duration 持续时间
   */
  modalIn(duration = 300) {
    return this.setDuration(duration).scale("0.7", "1").opacity("0", "1").addCustomEasing("ease-out", [0.25, 0.46, 0.45, 0.94]);
  }
  /**
   * 模态框退出动画
   * @param duration 持续时间
   */
  modalOut(duration = 300) {
    return this.setDuration(duration).scale("1", "0.7").opacity("1", "0").addCustomEasing("ease-in", [0.42, 0, 1, 1]);
  }
  /**
   * 卡片翻转动画
   * @param duration 持续时间
   */
  cardFlip(duration = 600) {
    return this.setDuration(duration).addAttribute("rotateY", "0deg", "180deg").addCustomEasing("ease-in-out", [0.25, 0.1, 0.25, 1]);
  }
  /**
   * 波纹扩散动画
   * @param duration 持续时间
   */
  ripple(duration = 600) {
    return this.setDuration(duration).scale("0", "4").opacity("0.7", "0").addCustomEasing("ease-out", [0.25, 0.46, 0.45, 0.94]);
  }
}
function createAnimation(element, options = {}) {
  return new AnimationEngine(element, options);
}
exports.createAnimation = createAnimation;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/animation/index.js.map
