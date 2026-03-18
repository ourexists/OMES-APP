@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI63FBDF4
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import kotlin.properties.Delegates
open class GenUniModulesCoolUnixComponentsClButtonClButton : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var type: String by `$props`
    open var color: String by `$props`
    open var icon: String by `$props`
    open var text: Boolean by `$props`
    open var rounded: Boolean by `$props`
    open var border: Boolean by `$props`
    open var loading: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var size: String by `$props`
    open var hoverClass: String by `$props`
    open var hoverStopPropagation: Boolean by `$props`
    open var hoverStartTime: Number by `$props`
    open var hoverStayTime: Number by `$props`
    open var formType: String by `$props`
    open var openType: String by `$props`
    open var lang: String by `$props`
    open var sessionFrom: String by `$props`
    open var sendMessageTitle: String by `$props`
    open var sendMessagePath: String by `$props`
    open var sendMessageImg: String by `$props`
    open var showMessageCard: Boolean by `$props`
    open var appParameter: String by `$props`
    open var groupId: String by `$props`
    open var guildId: String by `$props`
    open var publicId: String by `$props`
    open var phoneNumberNoQuotaToast: Boolean by `$props`
    open var createliveactivity: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClButtonClButton) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClButtonClButton
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val slots = useSlots()
            val cache = useCache(fun(): UTSArray<Any> {
                return _uA(
                    props.type,
                    props.text,
                    props.disabled,
                    props.loading,
                    props.color
                )
            }
            ).cache
            val pt = computed(fun(): PassThrough__3 {
                return parsePt<PassThrough__3>(props.pt)
            }
            )
            val isIcon = computed(fun(): Boolean {
                return get(slots, "default") == null && get(slots, "content") == null
            }
            )
            val textColor = computed(fun(): String {
                if (props.color != "") {
                    return props.color
                }
                var color = "light"
                if (props.text) {
                    color = props.type
                    if (props.disabled) {
                        color = "disabled"
                    }
                }
                if (props.type == "light") {
                    if (!isDark.value) {
                        color = "dark"
                    }
                }
                return color
            }
            )
            val leftIcon = computed<ClIconProps>(fun(): ClIconProps {
                var color = textColor.value
                var size: Any
                when (props.size) {
                    "small" -> 
                        size = 26
                    else -> 
                        size = 32
                }
                val ptIcon = pt.value.icon
                if (ptIcon != null) {
                    color = ptIcon.color ?: color
                    size = ptIcon.size ?: size as Number
                }
                return ClIconProps(size = size, color = color)
            }
            )
            val loadingIcon = computed<ClLoadingProps>(fun(): ClLoadingProps {
                var color = textColor.value
                var size: Any
                when (props.size) {
                    "small" -> 
                        size = 22
                    else -> 
                        size = 24
                }
                val ptIcon = pt.value.loading
                if (ptIcon != null) {
                    color = ptIcon.color ?: color
                    size = ptIcon.size ?: size as Number
                }
                return ClLoadingProps(size = size, color = color)
            }
            )
            val buttonStyle = computed(fun(): UTSJSONObject {
                val style: UTSJSONObject = object : UTSJSONObject(UTSSourceMapPosition("style", "uni_modules/cool-unix/components/cl-button/cl-button.uvue", 419, 8)) {
                }
                if (props.color != "") {
                    style["border-color"] = props.color
                }
                return style
            }
            )
            val isDisabled = computed(fun(): Boolean {
                return props.disabled || props.loading
            }
            )
            fun gen_onTap_fn(e: UniPointerEvent) {
                if (isDisabled.value) {
                    return
                }
                emit("click", e)
                emit("tap", e)
            }
            val onTap = ::gen_onTap_fn
            fun gen_onGetUserInfo_fn(e: UniEvent) {
                emit("getuserinfo", e)
            }
            val onGetUserInfo = ::gen_onGetUserInfo_fn
            fun gen_onContact_fn(e: UniEvent) {
                emit("contact", e)
            }
            val onContact = ::gen_onContact_fn
            fun gen_onGetPhoneNumber_fn(e: UniEvent) {
                emit("getphonenumber", e)
            }
            val onGetPhoneNumber = ::gen_onGetPhoneNumber_fn
            fun gen_onError_fn(e: UniEvent) {
                emit("error", e)
            }
            val onError = ::gen_onError_fn
            fun gen_onOpenSetting_fn(e: UniEvent) {
                emit("opensetting", e)
            }
            val onOpenSetting = ::gen_onOpenSetting_fn
            fun gen_onLaunchApp_fn(e: UniEvent) {
                emit("launchapp", e)
            }
            val onLaunchApp = ::gen_onLaunchApp_fn
            fun gen_onChooseAvatar_fn(e: UniEvent) {
                emit("chooseavatar", e)
            }
            val onChooseAvatar = ::gen_onChooseAvatar_fn
            fun gen_onChooseAddress_fn(e: UniEvent) {
                emit("chooseaddress", e)
            }
            val onChooseAddress = ::gen_onChooseAddress_fn
            fun gen_onChooseInvoiceTitle_fn(e: UniEvent) {
                emit("chooseinvoicetitle", e)
            }
            val onChooseInvoiceTitle = ::gen_onChooseInvoiceTitle_fn
            fun gen_onAddGroupApp_fn(e: UniEvent) {
                emit("addgroupapp", e)
            }
            val onAddGroupApp = ::gen_onAddGroupApp_fn
            fun gen_onSubscribe_fn(e: UniEvent) {
                emit("subscribe", e)
            }
            val onSubscribe = ::gen_onSubscribe_fn
            fun gen_onLogin_fn(e: UniEvent) {
                emit("login", e)
            }
            val onLogin = ::gen_onLogin_fn
            fun gen_onGetRealtimePhoneNumber_fn(e: UniEvent) {
                emit("getrealtimephonenumber", e)
            }
            val onGetRealtimePhoneNumber = ::gen_onGetRealtimePhoneNumber_fn
            fun gen_onAgreePrivacyAuthorization_fn(e: UniEvent) {
                emit("agreeprivacyauthorization", e)
            }
            val onAgreePrivacyAuthorization = ::gen_onAgreePrivacyAuthorization_fn
            val isHover = ref(false)
            fun gen_onTouchStart_fn() {
                if (!isDisabled.value) {
                    isHover.value = true
                }
            }
            val onTouchStart = ::gen_onTouchStart_fn
            fun gen_onTouchEnd_fn() {
                isHover.value = false
            }
            val onTouchEnd = ::gen_onTouchEnd_fn
            fun gen_onTouchCancel_fn() {
                isHover.value = false
            }
            val onTouchCancel = ::gen_onTouchCancel_fn
            return fun(): Any? {
                val _component_cl_loading = resolveEasyComponent("cl-loading", GenUniModulesCoolUnixComponentsClLoadingClLoadingClass)
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-button",
                    _uA(
                        _uM<String, Any?>(),
                        "cl-button--" + _ctx.size,
                        "cl-button--" + _ctx.type + " ",
                        _uM("cl-button--loading" to _ctx.loading, "cl-button--disabled" to _ctx.disabled, "cl-button--text" to _ctx.text, "cl-button--border" to _ctx.border, "cl-button--rounded" to _ctx.rounded, "cl-button--icon" to isIcon.value, "cl-button--hover" to isHover.value, "is-dark" to unref(isDark)),
                        if (isHover.value) {
                            _ctx.hoverClass
                        } else {
                            ""
                        }
                        ,
                        pt.value.className
                    )
                )), "key" to unref(cache).key, "style" to _nS(buttonStyle.value), "onClick" to withModifiers(onTap, _uA(
                    "stop"
                ))), _uA(
                    _cE("button", _uM("class" to "cl-button__clicker", "disabled" to isDisabled.value, "hover-class" to _ctx.hoverClass, "hover-stop-propagation" to _ctx.hoverStopPropagation, "hover-start-time" to _ctx.hoverStartTime, "hover-stay-time" to _ctx.hoverStayTime, "form-type" to _ctx.formType, "open-type" to _ctx.openType, "lang" to _ctx.lang, "session-from" to _ctx.sessionFrom, "send-msgNotifier-title" to _ctx.sendMessageTitle, "send-msgNotifier-path" to _ctx.sendMessagePath, "send-msgNotifier-img" to _ctx.sendMessageImg, "show-msgNotifier-card" to _ctx.showMessageCard, "app-parameter" to _ctx.appParameter, "group-id" to _ctx.groupId, "guild-id" to _ctx.guildId, "public-id" to _ctx.publicId, "phone-number-no-quota-toast" to _ctx.phoneNumberNoQuotaToast, "createliveactivity" to _ctx.createliveactivity, "onGetuserinfo" to onGetUserInfo, "onContact" to onContact, "onGetphonenumber" to onGetPhoneNumber, "onError" to onError, "onOpensetting" to onOpenSetting, "onLaunchapp" to onLaunchApp, "onChooseavatar" to onChooseAvatar, "onChooseaddress" to onChooseAddress, "onChooseinvoicetitle" to onChooseInvoiceTitle, "onAddgroupapp" to onAddGroupApp, "onSubscribe" to onSubscribe, "onLogin" to onLogin, "onGetrealtimephonenumber" to onGetRealtimePhoneNumber, "onAgreeprivacyauthorization" to onAgreePrivacyAuthorization, "onTouchstart" to onTouchStart, "onTouchend" to onTouchEnd, "onTouchcancel" to onTouchCancel), null, 40, _uA(
                        "disabled",
                        "hover-class",
                        "hover-stop-propagation",
                        "hover-start-time",
                        "hover-stay-time",
                        "form-type",
                        "open-type",
                        "lang",
                        "session-from",
                        "send-msgNotifier-title",
                        "send-msgNotifier-path",
                        "send-msgNotifier-img",
                        "show-msgNotifier-card",
                        "app-parameter",
                        "group-id",
                        "guild-id",
                        "public-id",
                        "phone-number-no-quota-toast",
                        "createliveactivity"
                    )),
                    if (isTrue(_ctx.loading && !_ctx.disabled)) {
                        _cV(_component_cl_loading, _uM("key" to 0, "color" to loadingIcon.value.color, "size" to loadingIcon.value.size, "pt" to object : UTSJSONObject() {
                            var className = unref(parseClass)(_uA(
                                "mr--bracket-start-10rpx-bracket-end-",
                                pt.value.loading?.className
                            ))
                        }), null, 8, _uA(
                            "color",
                            "size",
                            "pt"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(_ctx.icon)) {
                        _cV(_component_cl_icon, _uM("key" to 1, "name" to _ctx.icon, "color" to leftIcon.value.color, "size" to leftIcon.value.size, "pt" to object : UTSJSONObject() {
                            var className = unref(parseClass)(_uA(
                                object : UTSJSONObject() {
                                    var `mr--bracket-start-8rpx-bracket-end-` = !isIcon.value
                                },
                                pt.value.icon?.className
                            ))
                        }), null, 8, _uA(
                            "name",
                            "color",
                            "size",
                            "pt"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(!isIcon.value)) {
                        _cE(Fragment, _uM("key" to 2), _uA(
                            _cV(_component_cl_text, _uM("color" to textColor.value, "pt" to object : UTSJSONObject() {
                                var className = unref(parseClass)(_uA(
                                    "cl-button__label",
                                    object : UTSJSONObject() {
                                        var `text-sm` = _ctx.size == "small"
                                    },
                                    pt.value.label?.className
                                ))
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    renderSlot(_ctx.`$slots`, "default")
                                )
                            }), "_" to 3), 8, _uA(
                                "color",
                                "pt"
                            )),
                            renderSlot(_ctx.`$slots`, "content")
                        ), 64)
                    } else {
                        _cC("v-if", true)
                    }
                ), 6)
            }
        }
        var name = "cl-button"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-button" to _uM("" to _uM("position" to "relative", "boxSizing" to "border-box", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(0,0,0,0)", "borderRightColor" to "rgba(0,0,0,0)", "borderBottomColor" to "rgba(0,0,0,0)", "borderLeftColor" to "rgba(0,0,0,0)", "overflow" to "visible", "transitionDuration" to "0.3s", "transitionProperty" to "backgroundColor,borderColor,opacity"), ".is-dark.cl-button--disabled" to _uM("backgroundColor" to "rgba(161,161,170,1)"), ".is-dark.cl-button--disabled.cl-button--border" to _uM("borderTopColor" to "rgba(113,113,122,1)", "borderRightColor" to "rgba(113,113,122,1)", "borderBottomColor" to "rgba(113,113,122,1)", "borderLeftColor" to "rgba(113,113,122,1)"), ".is-dark.cl-button--text" to _uM("backgroundColor" to "rgba(0,0,0,0)"), ".is-dark.cl-button--light" to _uM("borderTopColor" to "rgba(113,113,122,1)", "borderRightColor" to "rgba(113,113,122,1)", "borderBottomColor" to "rgba(113,113,122,1)", "borderLeftColor" to "rgba(113,113,122,1)"), ".cl-button+" to _uM("marginLeft" to "14rpx")), "cl-button__clicker" to _pS(_uM("position" to "absolute", "marginTop" to 0, "marginRight" to 0, "marginBottom" to 0, "marginLeft" to 0, "paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0, "height" to "100%", "width" to "100%", "opacity" to 0, "zIndex" to 10)), "cl-button--small" to _uM("" to _uM("paddingTop" to "6rpx", "paddingRight" to "14rpx", "paddingBottom" to "6rpx", "paddingLeft" to "14rpx", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx"), ".cl-button--icon" to _uM("paddingTop" to "10rpx", "paddingRight" to "10rpx", "paddingBottom" to "10rpx", "paddingLeft" to "10rpx")), "cl-button--normal" to _uM("" to _uM("paddingTop" to "10rpx", "paddingRight" to "28rpx", "paddingBottom" to "10rpx", "paddingLeft" to "28rpx", "borderTopLeftRadius" to "16rpx", "borderTopRightRadius" to "16rpx", "borderBottomRightRadius" to "16rpx", "borderBottomLeftRadius" to "16rpx"), ".cl-button--icon" to _uM("paddingTop" to "14rpx", "paddingRight" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "14rpx")), "cl-button--large" to _uM("" to _uM("paddingTop" to "14rpx", "paddingRight" to "32rpx", "paddingBottom" to "14rpx", "paddingLeft" to "32rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx"), ".cl-button--icon" to _uM("paddingTop" to "18rpx", "paddingRight" to "18rpx", "paddingBottom" to "18rpx", "paddingLeft" to "18rpx")), "cl-button--rounded" to _pS(_uM("borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999)), "cl-button--primary" to _uM("" to _uM("backgroundColor" to "rgba(20,184,166,1)"), ".cl-button--hover" to _uM("backgroundColor" to "rgba(13,148,136,1)"), ".cl-button--text" to _uM("backgroundColor" to "rgba(0,0,0,0)"), ".cl-button--text.cl-button--hover" to _uM("backgroundColor" to "rgba(0,0,0,0)", "opacity" to 0.5), ".cl-button--border" to _uM("borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)")), "cl-button--warn" to _uM("" to _uM("backgroundColor" to "rgba(234,179,8,1)"), ".cl-button--hover" to _uM("backgroundColor" to "rgba(202,138,4,1)"), ".cl-button--text" to _uM("backgroundColor" to "rgba(0,0,0,0)"), ".cl-button--text.cl-button--hover" to _uM("backgroundColor" to "rgba(0,0,0,0)", "opacity" to 0.5), ".cl-button--border" to _uM("borderTopColor" to "rgba(234,179,8,1)", "borderRightColor" to "rgba(234,179,8,1)", "borderBottomColor" to "rgba(234,179,8,1)", "borderLeftColor" to "rgba(234,179,8,1)")), "cl-button--error" to _uM("" to _uM("backgroundColor" to "rgba(239,68,68,1)"), ".cl-button--hover" to _uM("backgroundColor" to "rgba(220,38,38,1)"), ".cl-button--text" to _uM("backgroundColor" to "rgba(0,0,0,0)"), ".cl-button--text.cl-button--hover" to _uM("backgroundColor" to "rgba(0,0,0,0)", "opacity" to 0.5), ".cl-button--border" to _uM("borderTopColor" to "rgba(239,68,68,1)", "borderRightColor" to "rgba(239,68,68,1)", "borderBottomColor" to "rgba(239,68,68,1)", "borderLeftColor" to "rgba(239,68,68,1)")), "cl-button--info" to _uM("" to _uM("backgroundColor" to "rgba(113,113,122,1)"), ".cl-button--hover" to _uM("backgroundColor" to "rgba(82,82,91,1)"), ".cl-button--text" to _uM("backgroundColor" to "rgba(0,0,0,0)"), ".cl-button--text.cl-button--hover" to _uM("backgroundColor" to "rgba(0,0,0,0)", "opacity" to 0.5), ".cl-button--border" to _uM("borderTopColor" to "rgba(113,113,122,1)", "borderRightColor" to "rgba(113,113,122,1)", "borderBottomColor" to "rgba(113,113,122,1)", "borderLeftColor" to "rgba(113,113,122,1)")), "cl-button--success" to _uM("" to _uM("backgroundColor" to "rgba(34,197,94,1)"), ".cl-button--hover" to _uM("backgroundColor" to "rgba(22,163,74,1)"), ".cl-button--text" to _uM("backgroundColor" to "rgba(0,0,0,0)"), ".cl-button--text.cl-button--hover" to _uM("backgroundColor" to "rgba(0,0,0,0)", "opacity" to 0.5), ".cl-button--border" to _uM("borderTopColor" to "rgba(34,197,94,1)", "borderRightColor" to "rgba(34,197,94,1)", "borderBottomColor" to "rgba(34,197,94,1)", "borderLeftColor" to "rgba(34,197,94,1)")), "cl-button--light" to _uM("" to _uM("borderTopColor" to "rgba(63,63,70,1)", "borderRightColor" to "rgba(63,63,70,1)", "borderBottomColor" to "rgba(63,63,70,1)", "borderLeftColor" to "rgba(63,63,70,1)"), ".cl-button--hover" to _uM("backgroundColor" to "rgba(244,244,245,1)"), ".is-dark.cl-button--hover" to _uM("backgroundColor" to "rgba(63,63,70,1)")), "cl-button--dark" to _uM("" to _uM("backgroundColor" to "rgba(63,63,70,1)"), ".cl-button--hover" to _uM("backgroundColor" to "rgba(39,39,42,1)")), "cl-button--disabled" to _uM("" to _uM("backgroundColor" to "rgba(212,212,216,1)"), ".cl-button--border" to _uM("borderTopColor" to "rgba(212,212,216,1)", "borderRightColor" to "rgba(212,212,216,1)", "borderBottomColor" to "rgba(212,212,216,1)", "borderLeftColor" to "rgba(212,212,216,1)")), "cl-button--loading" to _pS(_uM("opacity" to 0.6)), "@TRANSITION" to _uM("cl-button" to _uM("duration" to "0.3s", "property" to "backgroundColor,borderColor,opacity")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "tap" to null, "getuserinfo" to null, "contact" to null, "getphonenumber" to null, "error" to null, "opensetting" to null, "launchapp" to null, "chooseavatar" to null, "chooseaddress" to null, "chooseinvoicetitle" to null, "addgroupapp" to null, "subscribe" to null, "login" to null, "getrealtimephonenumber" to null, "agreeprivacyauthorization" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "type" to _uM("type" to "String", "default" to "primary"), "color" to _uM("type" to "String", "default" to ""), "icon" to _uM("type" to "String", "default" to ""), "text" to _uM("type" to "Boolean", "default" to false), "rounded" to _uM("type" to "Boolean", "default" to false), "border" to _uM("type" to "Boolean", "default" to false), "loading" to _uM("type" to "Boolean", "default" to false), "disabled" to _uM("type" to "Boolean", "default" to false), "size" to _uM("type" to "String", "default" to "normal"), "hoverClass" to _uM("type" to "String", "default" to ""), "hoverStopPropagation" to _uM("type" to "Boolean", "default" to false), "hoverStartTime" to _uM("type" to "Number", "default" to 20), "hoverStayTime" to _uM("type" to "Number", "default" to 70), "formType" to _uM("type" to "String", "default" to ""), "openType" to _uM("type" to "String", "default" to ""), "lang" to _uM("type" to "String", "default" to "zh_CN"), "sessionFrom" to _uM("type" to "String", "default" to ""), "sendMessageTitle" to _uM("type" to "String", "default" to ""), "sendMessagePath" to _uM("type" to "String", "default" to ""), "sendMessageImg" to _uM("type" to "String", "default" to ""), "showMessageCard" to _uM("type" to "Boolean", "default" to false), "appParameter" to _uM("type" to "String", "default" to ""), "groupId" to _uM("type" to "String", "default" to ""), "guildId" to _uM("type" to "String", "default" to ""), "publicId" to _uM("type" to "String", "default" to ""), "phoneNumberNoQuotaToast" to _uM("type" to "Boolean", "default" to false), "createliveactivity" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "pt",
            "type",
            "color",
            "icon",
            "text",
            "rounded",
            "border",
            "loading",
            "disabled",
            "size",
            "hoverClass",
            "hoverStopPropagation",
            "hoverStartTime",
            "hoverStayTime",
            "formType",
            "openType",
            "lang",
            "sessionFrom",
            "sendMessageTitle",
            "sendMessagePath",
            "sendMessageImg",
            "showMessageCard",
            "appParameter",
            "groupId",
            "guildId",
            "publicId",
            "phoneNumberNoQuotaToast",
            "createliveactivity"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
