"use strict";
const uni_modules_coolUnix_cool_utils_comm = require("../utils/comm.js");
require("../../../../common/vendor.js");
const uni_modules_coolUnix_cool_utils_parse = require("../utils/parse.js");
require("../router/index.js");
require("../../config.js");
const ctx = uni_modules_coolUnix_cool_utils_parse.parse({
  "pages": [
    {
      "path": "pages/index/work",
      "style": {
        "navigationStyle": "custom"
      },
      "meta": {
        "isAuth": true
      }
    },
    {
      "path": "pages/index/inspect",
      "style": {
        "navigationStyle": "custom",
        "enablePullDownRefresh": true
      },
      "meta": {
        "isAuth": true
      }
    },
    {
      "path": "pages/index/equip",
      "style": {
        "navigationStyle": "custom"
      },
      "meta": {
        "isAuth": true
      }
    },
    {
      "path": "pages/index/message",
      "style": {
        "navigationStyle": "custom",
        "enablePullDownRefresh": true
      },
      "meta": {
        "isAuth": true
      }
    },
    {
      "path": "pages/index/my",
      "style": {
        "navigationStyle": "custom"
      },
      "meta": {
        "isAuth": true
      }
    },
    {
      "path": "pages/inspect/task_detail",
      "style": {
        "navigationStyle": "custom"
      },
      "meta": {
        "isAuth": true
      }
    },
    {
      "path": "pages/inspect/device_inspect",
      "style": {
        "navigationStyle": "custom"
      },
      "meta": {
        "isAuth": true
      }
    }
  ],
  "subPackages": [
    {
      "root": "pages/set",
      "pages": [
        {
          "path": "index",
          "style": {
            "navigationBarTitleText": "设置"
          },
          "meta": {
            "isAuth": true
          }
        },
        {
          "path": "general",
          "style": {
            "navigationBarTitleText": "通用设置"
          },
          "meta": {
            "isAuth": true
          }
        },
        {
          "path": "notice",
          "style": {
            "navigationBarTitleText": "通知设置"
          },
          "meta": {
            "isAuth": true
          }
        },
        {
          "path": "about",
          "style": {
            "navigationBarTitleText": ""
          },
          "meta": {
            "isAuth": true
          }
        },
        {
          "path": "cs",
          "style": {
            "navigationBarTitleText": "联系技术"
          },
          "meta": {
            "isAuth": true
          }
        }
      ]
    },
    {
      "root": "pages/user",
      "pages": [
        {
          "path": "login",
          "style": {
            "navigationStyle": "custom",
            "disableScroll": true
          }
        }
      ]
    },
    {
      "root": "pages/equip",
      "pages": [
        {
          "path": "equip_detail",
          "style": {
            "navigationStyle": "custom",
            "disableScroll": true
          }
        },
        {
          "path": "workshop_tree",
          "style": {
            "navigationStyle": "custom",
            "disableScroll": true
          }
        },
        {
          "path": "equip_collect",
          "style": {
            "navigationStyle": "custom",
            "disableScroll": true
          }
        },
        {
          "path": "workshop_scada",
          "style": {
            "navigationStyle": "default",
            "navigationBarTitleText": "工艺组态",
            "disableScroll": true
          }
        }
      ]
    },
    {
      "root": "pages/message",
      "pages": [
        {
          "path": "message_detail",
          "style": {
            "navigationStyle": "custom",
            "disableScroll": true
          }
        }
      ]
    }
  ],
  "globalStyle": {
    "navigationBarTitleText": "OMES",
    "navigationBarTextStyle": "@navTextStyle",
    "backgroundColorContent": "@bgContentColor",
    "backgroundColor": "@bgColor",
    "navigationBarBackgroundColor": "@navBgColor"
  },
  "tabBar": {
    "custom": true,
    "color": "@tabColor",
    "selectedColor": "@tabSelectedColor",
    "backgroundColor": "@tabBgColor",
    "borderStyle": "@tabBorderStyle",
    "height": "60px",
    "list": [
      {
        "pagePath": "pages/index/inspect",
        "iconPath": "/static/icon/tabbar/xj.png",
        "selectedIconPath": "/static/icon/tabbar/xj2.png",
        "text": "巡检"
      },
      {
        "pagePath": "pages/index/equip",
        "iconPath": "/static/icon/tabbar/equip.png",
        "selectedIconPath": "/static/icon/tabbar/equip2.png",
        "text": "设备"
      },
      {
        "pagePath": "pages/index/work",
        "iconPath": "/static/icon/tabbar/work.png",
        "selectedIconPath": "/static/icon/tabbar/work2.png",
        "text": "场景"
      },
      {
        "pagePath": "pages/index/message",
        "iconPath": "/static/icon/tabbar/message.png",
        "selectedIconPath": "/static/icon/tabbar/message2.png",
        "text": "消息"
      },
      {
        "pagePath": "pages/index/my",
        "iconPath": "/static/icon/tabbar/my.png",
        "selectedIconPath": "/static/icon/tabbar/my2.png",
        "text": "我的"
      }
    ]
  },
  "uniIdRouter": {},
  "appid": "__UNI__63FBDF4",
  "theme": {
    "light": {
      "bgColor": "#f8f8f8",
      "bgContentColor": "#f8f8f8",
      "navBgColor": "#ffffff",
      "navTextStyle": "black",
      "tabColor": "#999999",
      "tabSelectedColor": "#14b8a6",
      "tabBorderStyle": "white",
      "tabBgColor": "#ffffff"
    },
    "dark": {
      "bgColor": "#191919",
      "bgContentColor": "#191919",
      "navBgColor": "#191919",
      "navTextStyle": "white",
      "tabColor": "#cccccc",
      "tabSelectedColor": "#ffffff",
      "tabBorderStyle": "black",
      "tabBgColor": "#191919"
    }
  },
  "color": {
    "primary-50": "#f0fdfa",
    "primary-100": "#ccfbf1",
    "primary-200": "#99f6e4",
    "primary-300": "#5eead4",
    "primary-400": "#2dd4bf",
    "primary-500": "#14b8a6",
    "primary-600": "#0d9488",
    "primary-700": "#0f766e",
    "primary-800": "#115e59",
    "primary-900": "#134e4a",
    "primary-950": "#042f2e",
    "surface": "#ffffff",
    "surface-50": "#fafafa",
    "surface-100": "#f4f4f5",
    "surface-200": "#e4e4e7",
    "surface-300": "#d4d4d8",
    "surface-400": "#a1a1aa",
    "surface-500": "#71717a",
    "surface-600": "#52525b",
    "surface-700": "#3f3f46",
    "surface-800": "#27272a",
    "surface-900": "#18181b",
    "surface-950": "#09090b"
  },
  "SAFE_CHAR_MAP_LOCALE": [
    [
      "[",
      "-bracket-start-"
    ],
    [
      "]",
      "-bracket-end-"
    ],
    [
      "(",
      "-paren-start-"
    ],
    [
      ")",
      "-paren-end-"
    ],
    [
      "{",
      "-brace-start-"
    ],
    [
      "}",
      "-brace-end-"
    ],
    [
      "$",
      "-dollar-"
    ],
    [
      "#",
      "-hash-"
    ],
    [
      "!",
      "-important-"
    ],
    [
      "/",
      "-slash-"
    ],
    [
      ":",
      "-colon-"
    ],
    [
      " ",
      "-space-"
    ],
    [
      "<",
      "-lt-"
    ],
    [
      ">",
      "-gt-"
    ],
    [
      "&",
      "-amp-"
    ],
    [
      "|",
      "-pipe-"
    ],
    [
      "^",
      "-caret-"
    ],
    [
      "~",
      "-tilde-"
    ],
    [
      "`",
      "-backtick-"
    ],
    [
      "'",
      "-single-quote-"
    ],
    [
      ".",
      "-dot-"
    ],
    [
      "?",
      "-question-"
    ],
    [
      "*",
      "-star-"
    ],
    [
      "+",
      "-plus-"
    ],
    [
      "-",
      "-dash-"
    ],
    [
      "_",
      "-underscore-"
    ],
    [
      "=",
      "-equal-"
    ],
    [
      "%",
      "-percent-"
    ],
    [
      "@",
      "-at-"
    ]
  ]
});
let PAGES = [...ctx.pages];
if (uni_modules_coolUnix_cool_utils_comm.isArray(ctx.subPackages)) {
  ctx.subPackages.forEach((a) => {
    a.pages.forEach((b) => {
      PAGES.push({
        path: a.root + "/" + b.path,
        style: b.style,
        meta: b.meta
      });
    });
  });
}
PAGES.forEach((e) => {
  if (!e.path.startsWith("/")) {
    e.path = "/" + e.path;
  }
});
exports.TABS = [];
if (ctx.tabBar.list != null) {
  exports.TABS = ctx.tabBar.list;
  exports.TABS.forEach((e) => {
    if (!e.pagePath.startsWith("/")) {
      e.pagePath = "/" + e.pagePath;
    }
  });
}
exports.PAGES = PAGES;
exports.ctx = ctx;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/cool/ctx/index.js.map
