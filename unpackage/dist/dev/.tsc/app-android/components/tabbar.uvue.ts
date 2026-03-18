import _easycom_cl_image from '@/uni_modules/cool-unix/components/cl-image/cl-image.uvue'
import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_footer from '@/uni_modules/cool-unix/components/cl-footer/cl-footer.uvue'
import {ctx, isDark, parseClass, router} from "@/uni_modules/cool-unix";
import {t} from "@/locale";

import {computed} from "vue";
import {unread_count} from "@/components/msg-notifier";

type Item = { __$originalPosition?: UTSSourceMapPosition<"Item", "components/tabbar.uvue", 57, 6>;
  icon: string;
  icon2: string;
  pagePath: string;
  text: string | null;
};


const __sfc__ = defineComponent({
  __name: 'tabbar',

  name: "custom-tabbar"
,
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;



const path = computed(() => router.path());

// tabbar 列表
const list = computed<Item[]>(() => {
  return (ctx.tabBar.list ?? []).map((e) => {
    return {
      icon: e.iconPath!,
      icon2: e.selectedIconPath!,
      pagePath: e.pagePath,
      text: t(e.text?.replaceAll("%", "")!)
    } as Item;
  });
});

// 隐藏原生 tabBar

if (ctx.tabBar.list != null) {
  uni.hideTabBar();
}


return (): any | null => {

const _component_cl_image = resolveEasyComponent("cl-image",_easycom_cl_image)
const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_footer = resolveEasyComponent("cl-footer",_easycom_cl_footer)

  return _cV(_component_cl_footer, _uM({ pt: {
			content: {
				className: '-important-p-0 h--bracket-start-60px-bracket-end-'
			}
		} }), _uM({
    default: withSlotCtx((): any[] => [
      _cE("view", _uM({
        class: _nC(["custom-tabbar", _uM({ 'is-dark': unref(isDark) })])
      }), [
        _cE(Fragment, null, RenderHelpers.renderList(list.value, (item, __key, __index, _cached): any => {
          return _cE("view", _uM({
            class: "custom-tabbar-item",
            key: item.pagePath,
            onClick: () => {unref(router).to(item.pagePath)}
          }), [
            _cV(_component_cl_image, _uM({
              src: path.value == item.pagePath ? item.icon2 : item.icon,
              height: 56,
              width: 56
            }), null, 8 /* PROPS */, ["src"]),
            isTrue(item.pagePath.includes('message') && unref(unread_count)  > 0)
              ? _cE("text", _uM({
                  key: 0,
                  class: "badge"
                }), _tD(unref(unread_count) > 99 ? '99+' : unref(unread_count)), 1 /* TEXT */)
              : _cC("v-if", true),
            item.text != null
              ? _cV(_component_cl_text, _uM({
                  key: 1,
                  pt: {
						className: unref(parseClass)([
							'text-xs mt-1',
							[path.value == item.pagePath, 'text-primary-500', 'text-surface-400']
						])
					}
                }), _uM({
                  default: withSlotCtx((): any[] => [_tD(unref(t)(item.text!))]),
                  _: 2 /* DYNAMIC */
                }), 1032 /* PROPS, DYNAMIC_SLOTS */, ["pt"])
              : _cC("v-if", true)
          ], 8 /* PROPS */, ["onClick"])
        }), 128 /* KEYED_FRAGMENT */)
      ], 2 /* CLASS */)
    ]),
    _: 1 /* STABLE */
  }))
}
}

})
export default __sfc__
const GenComponentsTabbarStyles = [_uM([["custom-tabbar", _pS(_uM([["display", "flex"], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["flexDirection", "row"], ["alignItems", "center"]]))], ["custom-tabbar-item", _pS(_uM([["display", "flex"], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["icon-wrapper", _pS(_uM([["position", "relative"]]))], ["badge", _pS(_uM([["position", "absolute"], ["top", "0rpx"], ["right", "40rpx"], ["minWidth", "32rpx"], ["height", "32rpx"], ["backgroundColor", "#f44336"], ["color", "#ffffff"], ["fontSize", "20rpx"], ["lineHeight", "32rpx"], ["textAlign", "center"], ["boxSizing", "border-box"], ["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999]]))]])]
