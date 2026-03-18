import { getSafeAreaHeight, isHarmony, parsePt } from "../../cool";
import { isDark } from "../../theme";
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from "vue";
import type { PassThroughProps } from "../../types";
import { clFooterOffset } from "./offset";

type PassThrough = { __$originalPosition?: UTSSourceMapPosition<"PassThrough", "uni_modules/cool-unix/components/cl-footer/cl-footer.uvue", 52, 6>;
	className?: string;
	content?: PassThroughProps;
	wrapper?: PassThroughProps;
};


const __sfc__ = defineComponent({
  __name: 'cl-footer',

	name: "cl-footer"
,
  props: {
	pt: {
		type: Object,
		default: () => ({})
	},
	// 最小高度，小于该高度时，不显示
	minHeight: {
		type: Number,
		default: 30
	},
	// 监听值，触发更新
	vt: {
		type: Number,
		default: 0
	}
},
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;



const props = __props;

const { proxy } = getCurrentInstance()!;

const pt = computed(() => parsePt<PassThrough>(props.pt));

// 内容高度
const height = ref(0);

// 是否显示
const visible = ref(true);

// 获取内容高度
function getHeight() {
	nextTick(() => {
		setTimeout(
			() => {
				uni.createSelectorQuery()
					.in(proxy)
					.select(".cl-footer")
					.boundingClientRect((res) => {
						// 获取内容高度
						const h = Math.floor((res as NodeInfo).height ?? 0);

						// 设置高度
						height.value = h;

						// 如果内容高度大于最小高度，则显示
						visible.value = h > props.minHeight + getSafeAreaHeight("bottom");

						// 隔离高度
						clFooterOffset.set(visible.value ? h : 0);
					})
					.exec();
			},
			isHarmony() ? 50 : 0
		);
	});
}

onMounted(() => {
	watch(
		computed(() => props.vt),
		() => {
			visible.value = true;
			getHeight();
		},
		{
			immediate: true
		}
	);
});

return (): any | null => {

  return _cE(Fragment, null, [
    isTrue(visible.value)
      ? _cE("view", _uM({
          key: 0,
          class: "cl-footer-placeholder",
          style: _nS(_uM({ height: height.value + 'px' }))
        }), null, 4 /* STYLE */)
      : _cC("v-if", true),
    _cE("view", _uM({
      class: _nC(["cl-footer-wrapper", [_uM<string, any | null>({}),pt.value.wrapper?.className]])
    }), [
      isTrue(visible.value)
        ? _cE("view", _uM({
            key: 0,
            class: _nC(["cl-footer", [_uM<string, any | null>({}),
				_uM({
					'is-dark': unref(isDark)
				}),
				pt.value.className
			]])
          }), [
            _cE("view", _uM({
              class: _nC(["cl-footer__content", [_uM<string, any | null>({}),pt.value.content?.className]])
            }), [
              renderSlot(_ctx.$slots, "default")
            ], 2 /* CLASS */)
          ], 2 /* CLASS */)
        : _cC("v-if", true)
    ], 2 /* CLASS */)
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
export type ClFooterComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClFooterClFooterStyles = [_uM([["cl-footer", _uM([["", _uM([["overflow", "visible"], ["backgroundColor", "rgba(255,255,255,1)"], ["paddingBottom", "env(safe-area-inset-bottom)"]])], [".is-dark", _uM([["backgroundColor", "rgba(24,24,27,1)"]])]])], ["cl-footer__content", _pS(_uM([["overflow", "visible"], ["paddingLeft", "21rpx"], ["paddingRight", "21rpx"], ["paddingTop", "21rpx"], ["paddingBottom", "21rpx"]]))], ["cl-footer-wrapper", _pS(_uM([["position", "fixed"], ["bottom", 0], ["left", 0], ["width", "100%"], ["overflow", "visible"]]))]])]
