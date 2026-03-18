import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import { t } from "../../locale";
import { isDark } from "../../theme";
import { parseClass, parsePt, parseRpx } from "../../cool";
import { computed } from "vue";

// 组件属性定义
type PassThrough = { __$originalPosition?: UTSSourceMapPosition<"PassThrough", "uni_modules/cool-unix/components/cl-empty/cl-empty.uvue", 77, 6>;
	className?: string; // 根元素类名
};

// 解析透传样式配置

const __sfc__ = defineComponent({
  __name: 'cl-empty',
  props: {
	// 透传样式配置
	pt: {
		type: Object,
		default: () => ({})
	},
	// 空状态文本
	text: {
		type: String,
		default: () => t("暂无数据")
	},
	// 空状态图标名称
	icon: {
		type: String,
		default: "comm"
	},
	// 图标尺寸
	iconSize: {
		type: [Number, String],
		default: 120
	},
	// 是否显示图标
	showIcon: {
		type: Boolean,
		default: true
	},
	// 是否固定定位
	fixed: {
		type: Boolean,
		default: true
	}
},
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const props = __props;

// 透传样式类型定义
const pt = computed(() => parsePt<PassThrough>(props.pt));

return (): any | null => {

const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)

  return _cE("view", _uM({
    class: _nC(["cl-empty", [_uM<string, any | null>({}),
			_uM({
				'cl-empty--fixed': _ctx.fixed
			}),
			pt.value.className
		]])
  }), [
    isTrue(_ctx.showIcon)
      ? _cE("image", _uM({
          key: 0,
          class: "cl-empty__icon",
          src: `/static/empty/${_ctx.icon}.png`,
          style: _nS(_uM({
				height: unref(parseRpx)(_ctx.iconSize)
			})),
          mode: "aspectFit"
        }), null, 12 /* STYLE, PROPS */, ["src"])
      : _cC("v-if", true),
    isTrue(_ctx.text)
      ? _cV(_component_cl_text, _uM({
          key: 1,
          pt: {
				className: unref(parseClass)([
					'cl-empty__text text-sm text-surface-400',
					{
						'text-surface-100': unref(isDark)
					}
				])
			}
        }), _uM({
          default: withSlotCtx((): any[] => [_tD(_ctx.text)]),
          _: 1 /* STABLE */
        }), 8 /* PROPS */, ["pt"])
      : _cC("v-if", true)
  ], 2 /* CLASS */)
}
}

})
export default __sfc__
export type ClEmptyComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClEmptyClEmptyStyles = [_uM([["cl-empty", _pS(_uM([["display", "flex"], ["height", "100%"], ["width", "100%"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"], ["pointerEvents", "none"]]))], ["cl-empty--fixed", _pS(_uM([["position", "fixed"], ["top", 0], ["left", 0], ["zIndex", -1]]))], ["cl-empty__icon", _pS(_uM([["marginBottom", "20rpx"]]))]])]
