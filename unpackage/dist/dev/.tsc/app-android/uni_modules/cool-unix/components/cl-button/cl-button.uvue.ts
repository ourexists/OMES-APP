import _easycom_cl_loading from '@/uni_modules/cool-unix/components/cl-loading/cl-loading.uvue'
import _easycom_cl_icon from '@/uni_modules/cool-unix/components/cl-icon/cl-icon.uvue'
import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import { computed, ref, useSlots, type PropType } from "vue";
import { get, parseClass, parsePt, useCache } from "../../cool";
import { isDark } from "../../theme";
import type { ClIconProps } from "../cl-icon/props";
import type { ClButtonType, PassThroughProps, Size } from "../../types";
import type { ClLoadingProps } from "../cl-loading/props";

type PassThrough = { __$originalPosition?: UTSSourceMapPosition<"PassThrough", "uni_modules/cool-unix/components/cl-button/cl-button.uvue", 325, 6>;
	className?: string;
	label?: PassThroughProps;
	icon?: ClIconProps;
	loading?: ClLoadingProps;
};

// 样式穿透计算

const __sfc__ = defineComponent({
  __name: 'cl-button',

	name: "cl-button"
,
  props: {
	// 样式穿透
	pt: {
		type: Object,
		default: () => ({})
	},
	// 按钮类型
	type: {
		type: String as PropType<ClButtonType>,
		default: "primary"
	},
	// 字体、图标颜色
	color: {
		type: String,
		default: ""
	},
	// 图标
	icon: {
		type: String,
		default: ""
	},
	// 文本按钮
	text: {
		type: Boolean,
		default: false
	},
	// 圆角按钮
	rounded: {
		type: Boolean,
		default: false
	},
	// 边框按钮
	border: {
		type: Boolean,
		default: false
	},
	// 加载状态
	loading: {
		type: Boolean,
		default: false
	},
	// 禁用状态
	disabled: {
		type: Boolean,
		default: false
	},
	// 按钮尺寸
	size: {
		type: String as PropType<Size>,
		default: "normal"
	},
	// 按钮点击态样式类
	hoverClass: {
		type: String,
		default: ""
	},
	// 是否阻止点击态冒泡
	hoverStopPropagation: {
		type: Boolean,
		default: false
	},
	// 按住后多久出现点击态
	hoverStartTime: {
		type: Number,
		default: 20
	},
	// 手指松开后点击态保留时间
	hoverStayTime: {
		type: Number,
		default: 70
	},
	// 表单提交类型
	formType: {
		type: String as PropType<"submit" | "reset">,
		default: ""
	},
	// 开放能力类型
	openType: {
		type: String as PropType<
			| "agreePrivacyAuthorization"
			| "feedback"
			| "share"
			| "getUserInfo"
			| "contact"
			| "getPhoneNumber"
			| "launchApp"
			| "openSetting"
			| "chooseAvatar"
			| "getAuthorize"
			| "lifestyle"
			| "contactShare"
			| "openGroupProfile"
			| "openGuildProfile"
			| "openPublicProfile"
			| "shareMessageToFriend"
			| "addFriend"
			| "addColorSign"
			| "addGroupApp"
			| "addToFavorites"
			| "chooseAddress"
			| "chooseInvoiceTitle"
			| "login"
			| "subscribe"
			| "favorite"
			| "watchLater"
			| "openProfile"
			| "liveActivity"
			| "getRealtimePhoneNumber"
		>,
		default: ""
	},
	// 语言
	lang: {
		type: String as PropType<"en" | "zh_CN" | "zh_TW">,
		default: "zh_CN"
	},
	// 会话来源
	sessionFrom: {
		type: String,
		default: ""
	},
	// 会话标题
	sendMessageTitle: {
		type: String,
		default: ""
	},
	// 会话路径
	sendMessagePath: {
		type: String,
		default: ""
	},
	// 会话图片
	sendMessageImg: {
		type: String,
		default: ""
	},
	// 显示会话卡片
	showMessageCard: {
		type: Boolean,
		default: false
	},
	// 打开 APP 时，向 APP 传递的参数
	appParameter: {
		type: String,
		default: ""
	},
	// 群ID
	groupId: {
		type: String,
		default: ""
	},
	// 公会ID
	guildId: {
		type: String,
		default: ""
	},
	// 公众号ID
	publicId: {
		type: String,
		default: ""
	},
	// 手机号获取失败时是否弹出错误提示
	phoneNumberNoQuotaToast: {
		type: Boolean,
		default: false
	},
	// 是否创建直播活动
	createliveactivity: {
		type: Boolean,
		default: false
	}
},
  emits: [
	"click",
	"tap",
	"getuserinfo",
	"contact",
	"getphonenumber",
	"error",
	"opensetting",
	"launchapp",
	"chooseavatar",
	"chooseaddress",
	"chooseinvoicetitle",
	"addgroupapp",
	"subscribe",
	"login",
	"getrealtimephonenumber",
	"agreeprivacyauthorization"
],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;



// 组件属性定义
const props = __props;

// 事件定义
function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

const slots = useSlots();
const { cache } = useCache(() => [
	props.type,
	props.text,
	props.disabled,
	props.loading,
	props.color
]);

// 样式穿透类型
const pt = computed(() => parsePt<PassThrough>(props.pt));

// 是否是图标按钮
const isIcon = computed(() => get(slots, "default") == null && get(slots, "content") == null);

// 文本颜色
const textColor = computed(() => {
	if (props.color != "") {
		return props.color;
	}

	let color = "light";

	if (props.text) {
		color = props.type;

		if (props.disabled) {
			color = "disabled";
		}
	}

	if (props.type == "light") {
		if (!isDark.value) {
			color = "dark";
		}
	}

	return color;
});

// 图标信息
const leftIcon = computed<ClIconProps>(() => {
	let color = textColor.value;
	let size: number | string;

	switch (props.size) {
		case "small":
			size = 26;
			break;
		default:
			size = 32;
			break;
	}

	const ptIcon = pt.value.icon;

	if (ptIcon != null) {
		color = ptIcon.color ?? color;
		size = ptIcon.size ?? size;
	}

	return {
		size,
		color
	};
});

// 加载图标信息
const loadingIcon = computed<ClLoadingProps>(() => {
	let color = textColor.value;
	let size: number | string;

	switch (props.size) {
		case "small":
			size = 22;
			break;
		default:
			size = 24;
			break;
	}

	const ptIcon = pt.value.loading;

	if (ptIcon != null) {
		color = ptIcon.color ?? color;
		size = ptIcon.size ?? size;
	}

	return {
		size,
		color
	};
});

// 按钮样式
const buttonStyle = computed(() => {
	const style = {__$originalPosition: new UTSSourceMapPosition("style", "uni_modules/cool-unix/components/cl-button/cl-button.uvue", 419, 8),};

	if (props.color != "") {
		style["border-color"] = props.color;
	}

	return style;
});

// 是否禁用状态
const isDisabled = computed(() => props.disabled || props.loading);

// 点击事件处理
function onTap(e: UniPointerEvent) {
	if (isDisabled.value) return;

	emit("click", e);
	emit("tap", e);
}

// 获取用户信息事件处理
function onGetUserInfo(e: UniEvent) {
	emit("getuserinfo", e);
}

// 客服消息事件处理
function onContact(e: UniEvent) {
	emit("contact", e);
}

// 获取手机号事件处理
function onGetPhoneNumber(e: UniEvent) {
	emit("getphonenumber", e);
}

// 错误事件处理
function onError(e: UniEvent) {
	emit("error", e);
}

// 打开设置事件处理
function onOpenSetting(e: UniEvent) {
	emit("opensetting", e);
}

// 打开APP事件处理
function onLaunchApp(e: UniEvent) {
	emit("launchapp", e);
}

// 选择头像事件处理
function onChooseAvatar(e: UniEvent) {
	emit("chooseavatar", e);
}

// 选择收货地址事件处理
function onChooseAddress(e: UniEvent) {
	emit("chooseaddress", e);
}

// 选择发票抬头事件处理
function onChooseInvoiceTitle(e: UniEvent) {
	emit("chooseinvoicetitle", e);
}

// 添加群应用事件处理
function onAddGroupApp(e: UniEvent) {
	emit("addgroupapp", e);
}

// 订阅消息事件处理
function onSubscribe(e: UniEvent) {
	emit("subscribe", e);
}

// 登录事件处理
function onLogin(e: UniEvent) {
	emit("login", e);
}

// 获取实时手机号事件处理
function onGetRealtimePhoneNumber(e: UniEvent) {
	emit("getrealtimephonenumber", e);
}

// 同意隐私授权事件处理
function onAgreePrivacyAuthorization(e: UniEvent) {
	emit("agreeprivacyauthorization", e);
}

// 点击态状态
const isHover = ref(false);

// 触摸开始事件处理
function onTouchStart() {
	if (!isDisabled.value) {
		isHover.value = true;
	}
}

// 触摸结束事件处理
function onTouchEnd() {
	isHover.value = false;
}

// 触摸取消事件处理
function onTouchCancel() {
	isHover.value = false;
}

return (): any | null => {

const _component_cl_loading = resolveEasyComponent("cl-loading",_easycom_cl_loading)
const _component_cl_icon = resolveEasyComponent("cl-icon",_easycom_cl_icon)
const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)

  return _cE("view", _uM({
    class: _nC(["cl-button", [_uM<string, any | null>({}),
			`cl-button--${_ctx.size}`,
			`cl-button--${_ctx.type} `,
			_uM({
				'cl-button--loading': _ctx.loading,
				'cl-button--disabled': _ctx.disabled,
				'cl-button--text': _ctx.text,
				'cl-button--border': _ctx.border,
				'cl-button--rounded': _ctx.rounded,
				'cl-button--icon': isIcon.value,
				'cl-button--hover': isHover.value,
				'is-dark': unref(isDark)
			}),
			isHover.value ? _ctx.hoverClass : '',
			pt.value.className
		]]),
    key: unref(cache).key,
    style: _nS(buttonStyle.value),
    onClick: withModifiers(onTap, ["stop"])
  }), [
    _cE("button", _uM({
      class: "cl-button__clicker",
      disabled: isDisabled.value,
      "hover-class": _ctx.hoverClass,
      "hover-stop-propagation": _ctx.hoverStopPropagation,
      "hover-start-time": _ctx.hoverStartTime,
      "hover-stay-time": _ctx.hoverStayTime,
      "form-type": _ctx.formType,
      "open-type": _ctx.openType,
      lang: _ctx.lang,
      "session-from": _ctx.sessionFrom,
      "send-msgNotifier-title": _ctx.sendMessageTitle,
      "send-msgNotifier-path": _ctx.sendMessagePath,
      "send-msgNotifier-img": _ctx.sendMessageImg,
      "show-msgNotifier-card": _ctx.showMessageCard,
      "app-parameter": _ctx.appParameter,
      "group-id": _ctx.groupId,
      "guild-id": _ctx.guildId,
      "public-id": _ctx.publicId,
      "phone-number-no-quota-toast": _ctx.phoneNumberNoQuotaToast,
      createliveactivity: _ctx.createliveactivity,
      onGetuserinfo: onGetUserInfo,
      onContact: onContact,
      onGetphonenumber: onGetPhoneNumber,
      onError: onError,
      onOpensetting: onOpenSetting,
      onLaunchapp: onLaunchApp,
      onChooseavatar: onChooseAvatar,
      onChooseaddress: onChooseAddress,
      onChooseinvoicetitle: onChooseInvoiceTitle,
      onAddgroupapp: onAddGroupApp,
      onSubscribe: onSubscribe,
      onLogin: onLogin,
      onGetrealtimephonenumber: onGetRealtimePhoneNumber,
      onAgreeprivacyauthorization: onAgreePrivacyAuthorization,
      onTouchstart: onTouchStart,
      onTouchend: onTouchEnd,
      onTouchcancel: onTouchCancel
    }), null, 40 /* PROPS, NEED_HYDRATION */, ["disabled", "hover-class", "hover-stop-propagation", "hover-start-time", "hover-stay-time", "form-type", "open-type", "lang", "session-from", "send-msgNotifier-title", "send-msgNotifier-path", "send-msgNotifier-img", "show-msgNotifier-card", "app-parameter", "group-id", "guild-id", "public-id", "phone-number-no-quota-toast", "createliveactivity"]),
    isTrue(_ctx.loading && !_ctx.disabled)
      ? _cV(_component_cl_loading, _uM({
          key: 0,
          color: loadingIcon.value.color,
          size: loadingIcon.value.size,
          pt: {
				className: unref(parseClass)(['mr--bracket-start-10rpx-bracket-end-', pt.value.loading?.className])
			}
        }), null, 8 /* PROPS */, ["color", "size", "pt"])
      : _cC("v-if", true),
    isTrue(_ctx.icon)
      ? _cV(_component_cl_icon, _uM({
          key: 1,
          name: _ctx.icon,
          color: leftIcon.value.color,
          size: leftIcon.value.size,
          pt: {
				className: unref(parseClass)([
					{
						'mr--bracket-start-8rpx-bracket-end-': !isIcon.value
					},
					pt.value.icon?.className
				])
			}
        }), null, 8 /* PROPS */, ["name", "color", "size", "pt"])
      : _cC("v-if", true),
    isTrue(!isIcon.value)
      ? _cE(Fragment, _uM({ key: 2 }), [
          _cV(_component_cl_text, _uM({
            color: textColor.value,
            pt: {
					className: unref(parseClass)([
						'cl-button__label',
						{
							'text-sm': _ctx.size == 'small'
						},
						pt.value.label?.className
					])
				}
          }), _uM({
            default: withSlotCtx((): any[] => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3 /* FORWARDED */
          }), 8 /* PROPS */, ["color", "pt"]),
          renderSlot(_ctx.$slots, "content")
        ], 64 /* STABLE_FRAGMENT */)
      : _cC("v-if", true)
  ], 6 /* CLASS, STYLE */)
}
}

})
export default __sfc__
export type ClButtonComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClButtonClButtonStyles = [_uM([["cl-button", _uM([["", _uM([["position", "relative"], ["boxSizing", "border-box"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(0,0,0,0)"], ["borderRightColor", "rgba(0,0,0,0)"], ["borderBottomColor", "rgba(0,0,0,0)"], ["borderLeftColor", "rgba(0,0,0,0)"], ["overflow", "visible"], ["transitionDuration", "0.3s"], ["transitionProperty", "backgroundColor,borderColor,opacity"]])], [".is-dark.cl-button--disabled", _uM([["backgroundColor", "rgba(161,161,170,1)"]])], [".is-dark.cl-button--disabled.cl-button--border", _uM([["borderTopColor", "rgba(113,113,122,1)"], ["borderRightColor", "rgba(113,113,122,1)"], ["borderBottomColor", "rgba(113,113,122,1)"], ["borderLeftColor", "rgba(113,113,122,1)"]])], [".is-dark.cl-button--text", _uM([["backgroundColor", "rgba(0,0,0,0)"]])], [".is-dark.cl-button--light", _uM([["borderTopColor", "rgba(113,113,122,1)"], ["borderRightColor", "rgba(113,113,122,1)"], ["borderBottomColor", "rgba(113,113,122,1)"], ["borderLeftColor", "rgba(113,113,122,1)"]])], [".cl-button+", _uM([["marginLeft", "14rpx"]])]])], ["cl-button__clicker", _pS(_uM([["position", "absolute"], ["marginTop", 0], ["marginRight", 0], ["marginBottom", 0], ["marginLeft", 0], ["paddingTop", 0], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", 0], ["height", "100%"], ["width", "100%"], ["opacity", 0], ["zIndex", 10]]))], ["cl-button--small", _uM([["", _uM([["paddingTop", "6rpx"], ["paddingRight", "14rpx"], ["paddingBottom", "6rpx"], ["paddingLeft", "14rpx"], ["borderTopLeftRadius", "12rpx"], ["borderTopRightRadius", "12rpx"], ["borderBottomRightRadius", "12rpx"], ["borderBottomLeftRadius", "12rpx"]])], [".cl-button--icon", _uM([["paddingTop", "10rpx"], ["paddingRight", "10rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "10rpx"]])]])], ["cl-button--normal", _uM([["", _uM([["paddingTop", "10rpx"], ["paddingRight", "28rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "28rpx"], ["borderTopLeftRadius", "16rpx"], ["borderTopRightRadius", "16rpx"], ["borderBottomRightRadius", "16rpx"], ["borderBottomLeftRadius", "16rpx"]])], [".cl-button--icon", _uM([["paddingTop", "14rpx"], ["paddingRight", "14rpx"], ["paddingBottom", "14rpx"], ["paddingLeft", "14rpx"]])]])], ["cl-button--large", _uM([["", _uM([["paddingTop", "14rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "14rpx"], ["paddingLeft", "32rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])], [".cl-button--icon", _uM([["paddingTop", "18rpx"], ["paddingRight", "18rpx"], ["paddingBottom", "18rpx"], ["paddingLeft", "18rpx"]])]])], ["cl-button--rounded", _pS(_uM([["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999]]))], ["cl-button--primary", _uM([["", _uM([["backgroundColor", "rgba(20,184,166,1)"]])], [".cl-button--hover", _uM([["backgroundColor", "rgba(13,148,136,1)"]])], [".cl-button--text", _uM([["backgroundColor", "rgba(0,0,0,0)"]])], [".cl-button--text.cl-button--hover", _uM([["backgroundColor", "rgba(0,0,0,0)"], ["opacity", 0.5]])], [".cl-button--border", _uM([["borderTopColor", "rgba(20,184,166,1)"], ["borderRightColor", "rgba(20,184,166,1)"], ["borderBottomColor", "rgba(20,184,166,1)"], ["borderLeftColor", "rgba(20,184,166,1)"]])]])], ["cl-button--warn", _uM([["", _uM([["backgroundColor", "rgba(234,179,8,1)"]])], [".cl-button--hover", _uM([["backgroundColor", "rgba(202,138,4,1)"]])], [".cl-button--text", _uM([["backgroundColor", "rgba(0,0,0,0)"]])], [".cl-button--text.cl-button--hover", _uM([["backgroundColor", "rgba(0,0,0,0)"], ["opacity", 0.5]])], [".cl-button--border", _uM([["borderTopColor", "rgba(234,179,8,1)"], ["borderRightColor", "rgba(234,179,8,1)"], ["borderBottomColor", "rgba(234,179,8,1)"], ["borderLeftColor", "rgba(234,179,8,1)"]])]])], ["cl-button--error", _uM([["", _uM([["backgroundColor", "rgba(239,68,68,1)"]])], [".cl-button--hover", _uM([["backgroundColor", "rgba(220,38,38,1)"]])], [".cl-button--text", _uM([["backgroundColor", "rgba(0,0,0,0)"]])], [".cl-button--text.cl-button--hover", _uM([["backgroundColor", "rgba(0,0,0,0)"], ["opacity", 0.5]])], [".cl-button--border", _uM([["borderTopColor", "rgba(239,68,68,1)"], ["borderRightColor", "rgba(239,68,68,1)"], ["borderBottomColor", "rgba(239,68,68,1)"], ["borderLeftColor", "rgba(239,68,68,1)"]])]])], ["cl-button--info", _uM([["", _uM([["backgroundColor", "rgba(113,113,122,1)"]])], [".cl-button--hover", _uM([["backgroundColor", "rgba(82,82,91,1)"]])], [".cl-button--text", _uM([["backgroundColor", "rgba(0,0,0,0)"]])], [".cl-button--text.cl-button--hover", _uM([["backgroundColor", "rgba(0,0,0,0)"], ["opacity", 0.5]])], [".cl-button--border", _uM([["borderTopColor", "rgba(113,113,122,1)"], ["borderRightColor", "rgba(113,113,122,1)"], ["borderBottomColor", "rgba(113,113,122,1)"], ["borderLeftColor", "rgba(113,113,122,1)"]])]])], ["cl-button--success", _uM([["", _uM([["backgroundColor", "rgba(34,197,94,1)"]])], [".cl-button--hover", _uM([["backgroundColor", "rgba(22,163,74,1)"]])], [".cl-button--text", _uM([["backgroundColor", "rgba(0,0,0,0)"]])], [".cl-button--text.cl-button--hover", _uM([["backgroundColor", "rgba(0,0,0,0)"], ["opacity", 0.5]])], [".cl-button--border", _uM([["borderTopColor", "rgba(34,197,94,1)"], ["borderRightColor", "rgba(34,197,94,1)"], ["borderBottomColor", "rgba(34,197,94,1)"], ["borderLeftColor", "rgba(34,197,94,1)"]])]])], ["cl-button--light", _uM([["", _uM([["borderTopColor", "rgba(63,63,70,1)"], ["borderRightColor", "rgba(63,63,70,1)"], ["borderBottomColor", "rgba(63,63,70,1)"], ["borderLeftColor", "rgba(63,63,70,1)"]])], [".cl-button--hover", _uM([["backgroundColor", "rgba(244,244,245,1)"]])], [".is-dark.cl-button--hover", _uM([["backgroundColor", "rgba(63,63,70,1)"]])]])], ["cl-button--dark", _uM([["", _uM([["backgroundColor", "rgba(63,63,70,1)"]])], [".cl-button--hover", _uM([["backgroundColor", "rgba(39,39,42,1)"]])]])], ["cl-button--disabled", _uM([["", _uM([["backgroundColor", "rgba(212,212,216,1)"]])], [".cl-button--border", _uM([["borderTopColor", "rgba(212,212,216,1)"], ["borderRightColor", "rgba(212,212,216,1)"], ["borderBottomColor", "rgba(212,212,216,1)"], ["borderLeftColor", "rgba(212,212,216,1)"]])]])], ["cl-button--loading", _pS(_uM([["opacity", 0.6]]))], ["@TRANSITION", _uM([["cl-button", _uM([["duration", "0.3s"], ["property", "backgroundColor,borderColor,opacity"]])]])]])]
