import 'D:/develop/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-console/src/runtime/app/index.ts';import App from "@/App.uvue";

// [cool-unix]需添加
import {cool} from "@/uni_modules/cool-unix";

import {createSSRApp} from "vue";
import "@/router";

export function createApp() {
    const app = createSSRApp(App);

    // [cool-unix]需添加
    app.use(cool);

    return {
        app
    };
}

export function main(app: IApp) {
    definePageRoutes();
    defineAppConfig();
    (createApp()['app'] as VueApp).mount(app, GenUniApp());
}

export class UniAppConfig extends io.dcloud.uniapp.appframe.AppConfig {
    override name: string = "OMES"
    override appid: string = "__UNI__63FBDF4"
    override versionName: string = "1.0.0"
    override versionCode: string = "100"
    override uniCompilerVersion: string = "4.87"
    
    constructor() { super() }
}

import GenPagesIndexHomeClass from './pages/index/home.uvue'
import GenPagesIndexEquipClass from './pages/index/equip.uvue'
import GenPagesIndexWorkClass from './pages/index/work.uvue'
import GenPagesIndexMessageClass from './pages/index/message.uvue'
import GenPagesIndexMyClass from './pages/index/my.uvue'
import GenPagesSetIndexClass from './pages/set/index.uvue'
import GenPagesSetGeneralClass from './pages/set/general.uvue'
import GenPagesSetNoticeClass from './pages/set/notice.uvue'
import GenPagesSetAboutClass from './pages/set/about.uvue'
import GenPagesSetCsClass from './pages/set/cs.uvue'
import GenPagesUserLoginClass from './pages/user/login.uvue'
import GenPagesEquipEquipDetailClass from './pages/equip/equip_detail.uvue'
import GenPagesEquipWorkshopTreeClass from './pages/equip/workshop_tree.uvue'
import GenPagesEquipEquipCollectClass from './pages/equip/equip_collect.uvue'
import GenPagesEquipWorkshopScadaClass from './pages/equip/workshop_scada.uvue'
import GenPagesMessageMessageDetailClass from './pages/message/message_detail.uvue'
function definePageRoutes() {
__uniRoutes.push({ path: "pages/index/home", component: GenPagesIndexHomeClass, meta: { isQuit: true } as UniPageMeta, style: _uM([["navigationStyle","custom"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/equip", component: GenPagesIndexEquipClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/work", component: GenPagesIndexWorkClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/message", component: GenPagesIndexMessageClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["enablePullDownRefresh",true]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/my", component: GenPagesIndexMyClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/set/index", component: GenPagesSetIndexClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","设置"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/set/general", component: GenPagesSetGeneralClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","通用设置"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/set/notice", component: GenPagesSetNoticeClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","通知设置"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/set/about", component: GenPagesSetAboutClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/set/cs", component: GenPagesSetCsClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","联系技术"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/user/login", component: GenPagesUserLoginClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["disableScroll",true]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/equip/equip_detail", component: GenPagesEquipEquipDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["disableScroll",true]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/equip/workshop_tree", component: GenPagesEquipWorkshopTreeClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["disableScroll",true]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/equip/equip_collect", component: GenPagesEquipEquipCollectClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["disableScroll",true]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/equip/workshop_scada", component: GenPagesEquipWorkshopScadaClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","default"],["navigationBarTitleText","工艺组态"],["disableScroll",true]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/message/message_detail", component: GenPagesMessageMessageDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["disableScroll",true]]) } as UniPageRoute)
}
const __uniTabBar: Map<string, any | null> | null = _uM([["custom",true],["color","@tabColor"],["selectedColor","@tabSelectedColor"],["backgroundColor","@tabBgColor"],["borderStyle","@tabBorderStyle"],["height","60px"],["list",[_uM([["pagePath","pages/index/home"],["iconPath","/static/icon/tabbar/home.png"],["selectedIconPath","/static/icon/tabbar/home2.png"],["text","首页"]]),_uM([["pagePath","pages/index/equip"],["iconPath","/static/icon/tabbar/equip.png"],["selectedIconPath","/static/icon/tabbar/equip2.png"],["text","设备"]]),_uM([["pagePath","pages/index/work"],["iconPath","/static/icon/tabbar/work.png"],["selectedIconPath","/static/icon/tabbar/work2.png"],["text","场景"]]),_uM([["pagePath","pages/index/message"],["iconPath","/static/icon/tabbar/message.png"],["selectedIconPath","/static/icon/tabbar/message2.png"],["text","消息"]]),_uM([["pagePath","pages/index/my"],["iconPath","/static/icon/tabbar/my.png"],["selectedIconPath","/static/icon/tabbar/my2.png"],["text","我的"]])]]])
const __uniLaunchPage: Map<string, any | null> = _uM([["url","pages/index/home"],["style",_uM([["navigationStyle","custom"]])]])
function defineAppConfig(){
  __uniConfig.entryPagePath = '/pages/index/home'
  __uniConfig.globalStyle = _uM([["navigationBarTitleText","OMES"],["navigationBarTextStyle","@navTextStyle"],["backgroundColorContent","@bgContentColor"],["backgroundColor","@bgColor"],["navigationBarBackgroundColor","@navBgColor"]])
  __uniConfig.getTabBarConfig = ():Map<string, any> | null =>  _uM([["custom",true],["color","@tabColor"],["selectedColor","@tabSelectedColor"],["backgroundColor","@tabBgColor"],["borderStyle","@tabBorderStyle"],["height","60px"],["list",[_uM([["pagePath","pages/index/home"],["iconPath","/static/icon/tabbar/home.png"],["selectedIconPath","/static/icon/tabbar/home2.png"],["text","首页"]]),_uM([["pagePath","pages/index/equip"],["iconPath","/static/icon/tabbar/equip.png"],["selectedIconPath","/static/icon/tabbar/equip2.png"],["text","设备"]]),_uM([["pagePath","pages/index/work"],["iconPath","/static/icon/tabbar/work.png"],["selectedIconPath","/static/icon/tabbar/work2.png"],["text","场景"]]),_uM([["pagePath","pages/index/message"],["iconPath","/static/icon/tabbar/message.png"],["selectedIconPath","/static/icon/tabbar/message2.png"],["text","消息"]]),_uM([["pagePath","pages/index/my"],["iconPath","/static/icon/tabbar/my.png"],["selectedIconPath","/static/icon/tabbar/my2.png"],["text","我的"]])]]])
  __uniConfig.tabBar = __uniConfig.getTabBarConfig()
  __uniConfig.conditionUrl = ''
  __uniConfig.uniIdRouter = _uM()
  __uniConfig.themeConfig = _uM([["light",_uM([["bgColor","#f8f8f8"],["bgContentColor","#f8f8f8"],["navBgColor","#ffffff"],["navTextStyle","black"],["tabColor","#999999"],["tabSelectedColor","#14b8a6"],["tabBorderStyle","white"],["tabBgColor","#ffffff"]])],["dark",_uM([["bgColor","#191919"],["bgContentColor","#191919"],["navBgColor","#191919"],["navTextStyle","white"],["tabColor","#cccccc"],["tabSelectedColor","#ffffff"],["tabBorderStyle","black"],["tabBgColor","#191919"]])]])
  __uniConfig.ready = true
}
