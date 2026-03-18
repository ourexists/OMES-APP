import _easycom_cl_icon from '@/uni_modules/cool-unix/components/cl-icon/cl-icon.uvue'
import _easycom_cl_loading from '@/uni_modules/cool-unix/components/cl-loading/cl-loading.uvue'
import { computed, ref, type PropType } from "vue";
import type { PassThroughProps } from "../../types";
import { isEmpty, parseClass, parsePt, parseRpx } from "../../cool";
import { isDark } from "../../theme";
import type { ClIconProps } from "../cl-icon/props";

type PassThrough = { __$originalPosition?: UTSSourceMapPosition<"PassThrough", "uni_modules/cool-unix/components/cl-image/cl-image.uvue", 161, 6>;
	className?: string;
	inner?: PassThroughProps;
	error?: ClIconProps;
	loading?: PassThroughProps;
};

// 解析透传样式

const __sfc__ = defineComponent({
  __name: 'cl-image',

	name: "cl-image"
,
  props: {
	// 透传样式
	pt: {
		type: Object,
		default: () => ({})
	},
	// 图片源
	src: {
		type: String,
		default: ""
	},
	// 图片裁剪、缩放的模式
	mode: {
		type: String as PropType<
			| "scaleToFill"
			| "aspectFit"
			| "aspectFill"
			| "widthFix"
			| "heightFix"
			| "top"
			| "bottom"
			| "center"
			| "left"
			| "right"
			| "top left"
			| "top right"
			| "bottom left"
			| "bottom right"
		>,
		default: "aspectFill"
	},
	// 是否显示边框
	border: {
		type: Boolean,
		default: false
	},
	// 是否预览
	preview: {
		type: Boolean,
		default: false
	},
	// 预览图片列表
	previewList: {
		type: Array as PropType<string[]>,
		default: () => []
	},
	// 图片高度
	height: {
		type: [String, Number] as PropType<string | number>,
		default: 120
	},
	// 图片宽度
	width: {
		type: [String, Number] as PropType<string | number>,
		default: 120
	},
	// 是否显示加载状态
	showLoading: {
		type: Boolean,
		default: true
	},
	// 是否懒加载
	lazyLoad: {
		type: Boolean,
		default: false
	},
	// 图片显示动画效果
	fadeShow: {
		type: Boolean,
		default: false
	},
	// 是否解码webp格式
	webp: {
		type: Boolean,
		default: false
	},
	// 是否长按显示菜单
	showMenuByLongpress: {
		type: Boolean,
		default: false
	}
},
  emits: ["load", "error"],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;



const props = __props;

// 事件定义
function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

// 透传样式类型
const pt = computed(() => parsePt<PassThrough>(props.pt));

// 加载状态
const isLoading = ref(true);

// 加载失败状态
const isError = ref(false);

// 图片加载成功
function onLoad(e: UniEvent) {
	isLoading.value = false;
	isError.value = false;
	emit("load", e);
}

// 图片加载失败
function onError(e: UniEvent) {
	isLoading.value = false;
	isError.value = true;
	emit("error", e);
}

// 图片点击
function onTap() {
	if (props.preview) {
		const urls = isEmpty(props.previewList) ? [props.src] : props.previewList;

		uni.previewImage({
			urls,
			current: props.src
		});
	}
}

return (): any | null => {

const _component_cl_icon = resolveEasyComponent("cl-icon",_easycom_cl_icon)
const _component_cl_loading = resolveEasyComponent("cl-loading",_easycom_cl_loading)

  return _cE("view", _uM({
    class: _nC(["cl-image", [_uM<string, any | null>({}),pt.value.className]]),
    style: _nS(_uM({
			width: unref(parseRpx)(_ctx.width!),
			height: unref(parseRpx)(_ctx.height!)
		}))
  }), [
    isTrue(isError.value)
      ? _cE("view", _uM({
          key: 0,
          class: _nC(["cl-image__error", [_uM<string, any | null>({}),
				_uM({
					'is-dark': unref(isDark)
				}),
				pt.value.error?.className
			]])
        }), [
          renderSlot(_ctx.$slots, "error", {}, (): any[] => [
            _cV(_component_cl_icon, _uM({
              name: pt.value.error?.name ?? 'close-line',
              size: pt.value.error?.size ?? 40,
              pt: {
						className: unref(parseClass)(['-important-text-surface-400', pt.value.error?.className])
					}
            }), null, 8 /* PROPS */, ["name", "size", "pt"])
          ])
        ], 2 /* CLASS */)
      : isTrue(isLoading.value && _ctx.showLoading)
        ? _cE("view", _uM({
            key: 1,
            class: _nC(["cl-image__loading", [_uM<string, any | null>({}),
				_uM({
					'is-dark': unref(isDark)
				}),
				pt.value.loading?.className
			]])
          }), [
            renderSlot(_ctx.$slots, "loading", {}, (): any[] => [
              _cV(_component_cl_loading, _uM({ loading: true }))
            ])
          ], 2 /* CLASS */)
        : _cC("v-if", true),
    _cE("image", _uM({
      class: _nC(["cl-image__inner", [_uM<string, any | null>({}),pt.value.inner?.className]]),
      src: _ctx.src,
      mode: _ctx.mode,
      "lazy-load": _ctx.lazyLoad,
      webp: _ctx.webp,
      "show-menu-by-longpress": _ctx.showMenuByLongpress,
      onLoad: onLoad,
      onError: onError,
      onClick: onTap
    }), null, 42 /* CLASS, PROPS, NEED_HYDRATION */, ["src", "mode", "lazy-load", "webp", "show-menu-by-longpress"]),
    renderSlot(_ctx.$slots, "default")
  ], 6 /* CLASS, STYLE */)
}
}

})
export default __sfc__
export type ClImageComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClImageClImageStyles = [_uM([["cl-image", _pS(_uM([["position", "relative"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["cl-image__inner", _pS(_uM([["height", "100%"], ["width", "100%"], ["borderTopLeftRadius", "21rpx"], ["borderTopRightRadius", "21rpx"], ["borderBottomRightRadius", "21rpx"], ["borderBottomLeftRadius", "21rpx"]]))], ["cl-image__loading", _uM([["", _uM([["position", "absolute"], ["height", "100%"], ["width", "100%"], ["borderTopLeftRadius", "21rpx"], ["borderTopRightRadius", "21rpx"], ["borderBottomRightRadius", "21rpx"], ["borderBottomLeftRadius", "21rpx"], ["backgroundColor", "rgba(228,228,231,1)"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"]])], [".is-dark", _uM([["backgroundColor", "rgba(63,63,70,1)"]])]])], ["cl-image__error", _uM([["", _uM([["position", "absolute"], ["height", "100%"], ["width", "100%"], ["borderTopLeftRadius", "21rpx"], ["borderTopRightRadius", "21rpx"], ["borderBottomRightRadius", "21rpx"], ["borderBottomLeftRadius", "21rpx"], ["backgroundColor", "rgba(228,228,231,1)"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"]])], [".is-dark", _uM([["backgroundColor", "rgba(63,63,70,1)"]])]])]])]
