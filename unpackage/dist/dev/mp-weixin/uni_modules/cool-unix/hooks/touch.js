"use strict";
class Touch {
  constructor() {
    this.startY = 0;
    this.startX = 0;
    this.horizontal = 0;
  }
  start(e) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
    this.horizontal = 0;
  }
  move(e) {
    const x = this.startX - e.touches[0].clientX;
    if (this.horizontal == 0) {
      const y = this.startY - e.touches[0].clientY;
      if (Math.abs(x) > Math.abs(y)) {
        this.horizontal = 1;
      }
      if (this.horizontal == 1) {
        e.preventDefault();
      }
    }
  }
  end() {
    this.startY = 0;
    this.horizontal = 0;
  }
}
function useTouch() {
  return new Touch();
}
exports.useTouch = useTouch;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/hooks/touch.js.map
