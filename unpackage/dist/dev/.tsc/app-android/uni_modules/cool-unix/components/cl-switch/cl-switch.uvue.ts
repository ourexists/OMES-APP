import _easycom_cl_loading from '@/uni_modules/cool-unix/components/cl-loading/cl-loading.uvue'
import { computed, ref, watch } from "vue";
import { isAppIOS, parseClass, parsePt, rpx2px } from "../../cool";
import { isDark } from "../../theme";
import type { PassThroughProps } from "../../types";
import { useForm } from "../../hooks";

type PassThrough = { __$originalPosition?: UTSSourceMapPosition<"PassThrough", "uni_modules/cool-unix/components/cl-switch/cl-switch.uvue", 100, 6>;
	className?: string;
	track?: PassThroughProps;
	thumb?: PassThroughProps;
	label?: PassThroughProps;
	loading?: PassThroughProps;
};

// 解析透传样式配置
type Rect = { __$originalPosition?: UTSSourceMapPosition<"Rect", "uni_modules/cool-unix/components/cl-switch/cl-switch.uvue", 124, 6>;
	height: string;
	width: string;
	size: string;
	left: string;
	translateX: string;
};

const __sfc__ = defineComponent({
  __name: 'cl-switch',

	name: "cl-switch"
,
  props: {
	// 透传样式配置
	pt: {
		type: Object,
		default: () => ({})
	},
	// 绑定值 - 开关状态
	modelValue: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 加载状态
	loading: {
		type: Boolean,
		default: false
	},
	// 高度
	height: {
		type: Number,
		default: 48
	},
	// 宽度
	width: {
		type: Number,
		default: 80
	}
},
  emits: ["update:modelValue", "change"],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;



// 定义组件属性
const props = __props;

// 定义组件事件
function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

// 透传样式类型定义
const pt = computed(() => parsePt<PassThrough>(props.pt));

// cl-form 上下文
const { disabled } = useForm();

// 是否禁用
const isDisabled = computed(() => props.disabled || disabled.value);

// 绑定值
const value = ref(props.modelValue);

// 是否为选中状态
const isChecked = computed(() => value.value);

// 计算开关组件的尺寸样式
const rect = computed<Rect>(() => {
	// 获取开关轨道高度
	const height = props.height;
	// 获取开关轨道宽度
	const width = props.width;
	// 计算圆形按钮尺寸,比轨道高度小8rpx
	const size = height - 8;
	// 设置圆形按钮初始位置,距离左侧px
	const left = 4;
	// 计算圆形按钮移动距离,为轨道宽度减去轨道高度
	const translateX = width - height;

	return {
		height: height + "rpx",
		width: width + "rpx",
		size: size + "rpx",
		left: left + "rpx",
		translateX: isAppIOS() ? rpx2px(translateX) + "px" : `${translateX}rpx`
	};
});

/**
 * 点击事件处理函数
 * 在非禁用且非加载状态下切换开关状态
 */
function onTap() {
	if (!isDisabled.value && !props.loading) {
		// 切换开关状态
		const val = !value.value;
		value.value = val;

		// 触发更新事件
		emit("update:modelValue", val);
		emit("change", val);
	}
}

watch(
	computed(() => props.modelValue),
	(val: boolean) => {
		value.value = val;
	}
);

return (): any | null => {

const _component_cl_loading = resolveEasyComponent("cl-loading",_easycom_cl_loading)

  return _cE("view", _uM({
    class: _nC(["cl-switch", [_uM<string, any | null>({}),
			_uM({
				'cl-switch--disabled': isDisabled.value,
				'cl-switch--checked': isChecked.value
			}),

			pt.value.className
		]]),
    onClick: onTap
  }), [
    _cE("view", _uM({
      class: _nC(["cl-switch__track", [_uM<string, any | null>({}),
				_uM({
					'is-checked': isChecked.value,
					'is-dark': unref(isDark)
				}),
				pt.value.track?.className
			]]),
      style: _nS(_uM({
				height: rect.value.height,
				width: rect.value.width
			}))
    }), [
      _cE("view", _uM({
        class: _nC(["cl-switch__thumb", [_uM<string, any | null>({}),pt.value.thumb?.className]]),
        style: _nS(_uM({
					height: rect.value.size,
					width: rect.value.size,
					left: rect.value.left,
					transform: `translateX(${isChecked.value ? rect.value.translateX : 0})`
				}))
      }), [
        isTrue(_ctx.loading)
          ? _cV(_component_cl_loading, _uM({
              key: 0,
              size: 24,
              color: "primary",
              pt: {
						className: unref(parseClass)([pt.value.loading?.className])
					}
            }), null, 8 /* PROPS */, ["pt"])
          : _cC("v-if", true)
      ], 6 /* CLASS, STYLE */)
    ], 6 /* CLASS, STYLE */)
  ], 2 /* CLASS */)
}
}

})
export default __sfc__
export type ClSwitchComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClSwitchClSwitchStyles = [_uM([["cl-switch", _uM([["", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["opacity", 1], ["transitionDuration", "200ms"]])], [".cl-switch--disabled", _uM([["opacity", 0.5]])]])], ["cl-switch__track", _uM([["", _uM([["position", "relative"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999], ["transitionDuration", "200ms"], ["backgroundColor", "rgba(228,228,231,1)"]])], [".is-dark", _uM([["backgroundColor", "rgba(113,113,122,1)"]])], [".is-checked", _uM([["backgroundColor", "rgba(20,184,166,1)"]])]])], ["cl-switch__thumb", _pS(_uM([["position", "absolute"], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"], ["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999], ["backgroundColor", "rgba(255,255,255,1)"], ["transitionDuration", "300ms"]]))], ["@TRANSITION", _uM([["cl-switch", _uM([["duration", "200ms"]])], ["cl-switch__track", _uM([["duration", "200ms"]])], ["cl-switch__thumb", _uM([["duration", "300ms"]])]])]])]
