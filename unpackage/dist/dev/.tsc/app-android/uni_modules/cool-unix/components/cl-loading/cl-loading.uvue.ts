import { computed, onMounted, shallowRef, watch } from "vue";
import { createAnimation, ctx, parsePt } from "../../cool";
import { isDark } from "../../theme";
import type { ClIconProps } from "../cl-icon/props";
import { useSize } from "../../hooks";

type PassThrough = { __$originalPosition?: UTSSourceMapPosition<"PassThrough", "uni_modules/cool-unix/components/cl-loading/cl-loading.uvue", 64, 6>;
	className?: string;
	icon?: ClIconProps;
};

// 解析透传样式

const __sfc__ = defineComponent({
  __name: 'cl-loading',

	name: "cl-loading"
,
  props: {
	// 透传样式
	pt: {
		type: Object,
		default: () => ({})
	},
	// 是否加载中
	loading: {
		type: Boolean,
		default: true
	},
	// 图标大小
	size: {
		type: [Number, String],
		default: 24
	},
	// 图标颜色
	color: {
		type: String,
		default: ""
	}
},
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;



// 定义组件属性
const props = __props;

const { getPx } = useSize();

// 透传样式类型定义
const pt = computed(() => parsePt<PassThrough>(props.pt));

// 组件引用
const loadingRef = shallowRef<UniElement | null>(null);

// 颜色值
const color = computed<string>(() => {
	if (props.color == "") {
		return isDark.value ? "#ffffff" : (ctx.color["surface-700"] as string);
	}

	switch (props.color) {
		case "primary":
			return ctx.color["primary-500"] as string;
		case "success":
			return "#22c55e";
		case "warn":
			return "#eab308";
		case "error":
			return "#ef4444";
		case "info":
			return "#71717a";
		case "dark":
			return "#3f3f46";
		case "light":
			return "#ffffff";
		case "disabled":
			return "#d4d4d8";
		default:
			return props.color;
	}
});

// 开始旋转动画
async function start() {
	createAnimation(loadingRef.value, {
		duration: 2500,
		loop: -1,
		timingFunction: "linear"
	})
		.rotate("0deg", "360deg")
		.play();
}

// 组件挂载后监听loading状态
onMounted(() => {
	watch(
		computed(() => props.loading),
		(val: boolean) => {
			// 当loading为true时开始旋转
			if (val) {
				start();
			}
		},
		{
			immediate: true
		}
	);
});

return (): any | null => {

  return isTrue(_ctx.loading)
    ? _cE("view", _uM({
        key: 0,
        ref_key: "loadingRef",
        ref: loadingRef,
        class: _nC(["cl-loading", [_uM<string, any | null>({}),
			_uM({
				'cl-loading--dark': unref(isDark) && color.value == '',
				'-important-border-r-transparent': true
			}),
			pt.value.className
		]]),
        style: _nS(_uM({
			height: unref(getPx)(_ctx.size!),
			width: unref(getPx)(_ctx.size!),
			borderWidth: '1px',
			borderTopColor: color.value,
			borderRightColor: 'transparent',
			borderBottomColor: color.value,
			borderLeftColor: color.value
		}))
      }), null, 6 /* CLASS, STYLE */)
    : _cC("v-if", true)
}
}

})
export default __sfc__
export type ClLoadingComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClLoadingClLoadingStyles = [_uM([["cl-loading", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(63,63,70,1)"], ["borderRightColor", "rgba(63,63,70,1)"], ["borderBottomColor", "rgba(63,63,70,1)"], ["borderLeftColor", "rgba(63,63,70,1)"]]))], ["cl-loading--dark", _pS(_uM([["!borderTopColor", "#FFFFFF"], ["!borderRightColor", "rgba(0,0,0,0)"], ["!borderBottomColor", "#FFFFFF"], ["!borderLeftColor", "#FFFFFF"]]))]])]
