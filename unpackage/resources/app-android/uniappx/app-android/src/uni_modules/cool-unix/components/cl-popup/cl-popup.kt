@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI63FBDF4
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import kotlin.properties.Delegates
open class GenUniModulesCoolUnixComponentsClPopupClPopup : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var modelValue: Boolean by `$props`
    open var title: String? by `$props`
    open var direction: String by `$props`
    open var size: Any by `$props`
    open var showHeader: Boolean by `$props`
    open var showClose: Boolean by `$props`
    open var showMask: Boolean by `$props`
    open var maskClosable: Boolean by `$props`
    open var swipeClose: Boolean by `$props`
    open var swipeCloseThreshold: Number by `$props`
    open var pointerEvents: String by `$props`
    open var keepAlive: Boolean by `$props`
    open var enablePortal: Boolean by `$props`
    open var isOpened: Boolean
        get() {
            return unref(this.`$exposed`["isOpened"]) as Boolean
        }
        set(value) {
            setRefValue(this.`$exposed`, "isOpened", value)
        }
    open var isOpen: Boolean
        get() {
            return unref(this.`$exposed`["isOpen"]) as Boolean
        }
        set(value) {
            setRefValue(this.`$exposed`, "isOpen", value)
        }
    open var open: () -> Unit
        get() {
            return unref(this.`$exposed`["open"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "open", value)
        }
    open var close: () -> Unit
        get() {
            return unref(this.`$exposed`["close"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "close", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClPopupClPopup, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClPopupClPopup
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val pt = computed(fun(): PassThrough__5 {
                return parsePt<PassThrough__5>(props.pt)
            }
            )
            val visible = ref(false)
            val status = ref(0)
            val isOpen = ref(false)
            val isOpened = ref(false)
            val zIndex = ref(config.zIndex)
            val height = computed(fun(): String {
                when (props.direction) {
                    "top", "bottom" -> 
                        return parseRpx(props.size)
                    "left", "right" -> 
                        return "100%"
                    else -> 
                        return ""
                }
            }
            )
            val width = computed(fun(): String {
                when (props.direction) {
                    "top", "bottom" -> 
                        return "100%"
                    "left", "right", "center" -> 
                        return parseRpx(props.size)
                    else -> 
                        return ""
                }
            }
            )
            val paddingBottom = computed(fun(): String {
                var h: Number = 0
                if (props.direction == "bottom") {
                    h += getSafeAreaHeight("bottom")
                }
                return h + "px"
            }
            )
            val isSwipeClose = computed(fun(): Boolean {
                return props.direction == "bottom" && props.swipeClose
            }
            )
            var timer: Number = 0
            fun gen_open_fn() {
                zIndex.value = config.zIndex++
                if (!visible.value) {
                    visible.value = true
                    emit("update:modelValue", true)
                    emit("open")
                    setTimeout(fun(){
                        status.value = 1
                        timer = setTimeout(fun(){
                            isOpened.value = true
                            emit("opened")
                        }
                        , 350)
                    }
                    , if (isAppIOS()) {
                        100
                    } else {
                        50
                    }
                    )
                }
            }
            val open = ::gen_open_fn
            fun gen_close_fn() {
                if (status.value == 1) {
                    isOpened.value = false
                    status.value = 2
                    emit("close")
                    if (timer != 0) {
                        clearTimeout(timer)
                    }
                    timer = setTimeout(fun(){
                        visible.value = false
                        status.value = 0
                        emit("update:modelValue", false)
                        emit("closed")
                    }
                    , 350)
                }
            }
            val close = ::gen_close_fn
            fun gen_maskClose_fn() {
                if (props.maskClosable) {
                    close()
                }
                emit("maskClose")
            }
            val maskClose = ::gen_maskClose_fn
            val swipe = reactive<Swipe>(Swipe(isMove = false, isTouch = false, startY = 0, offsetY = 0))
            fun gen_onTouchStart_fn(e: UniTouchEvent) {
                if (props.direction != "bottom") {
                    return
                }
                if (isOpened.value && isSwipeClose.value) {
                    swipe.isTouch = true
                    swipe.startY = e.touches[0].clientY
                }
            }
            val onTouchStart = ::gen_onTouchStart_fn
            fun gen_onTouchMove_fn(e: UniTouchEvent) {
                if (swipe.isTouch) {
                    swipe.isMove = true
                    val offsetY = (e.touches[0] as UniTouch).pageY - swipe.startY
                    if (offsetY > 0) {
                        swipe.offsetY = offsetY
                    }
                }
            }
            val onTouchMove = ::gen_onTouchMove_fn
            fun gen_onTouchEnd_fn() {
                if (swipe.isTouch) {
                    swipe.isTouch = false
                    swipe.isMove = false
                    if (swipe.offsetY > props.swipeCloseThreshold) {
                        close()
                    }
                    swipe.offsetY = 0
                }
            }
            val onTouchEnd = ::gen_onTouchEnd_fn
            val popupStyle = computed(fun(): UTSJSONObject {
                val style: UTSJSONObject = UTSJSONObject()
                style["height"] = height.value
                style["width"] = width.value
                if (swipe.isTouch) {
                    style["transform"] = "translateY(" + swipe.offsetY + "px)"
                }
                return style
            }
            )
            watch(computed(fun(): Boolean {
                return props.modelValue
            }
            ), fun(kVal: Boolean){
                if (kVal) {
                    open()
                } else {
                    close()
                }
            }
            , WatchOptions(immediate = true))
            watch(status, fun(kVal: Number){
                isOpen.value = kVal == 1
            }
            )
            __expose(_uM("isOpened" to isOpened, "isOpen" to isOpen, "open" to open, "close" to close))
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                return if (isTrue(if (_ctx.keepAlive) {
                    true
                } else {
                    visible.value
                }
                )) {
                    withDirectives(_cE("view", _uM("key" to 0, "class" to _nC(_uA(
                        "cl-popup-wrapper",
                        _uA(
                            _uM<String, Any?>(),
                            "cl-popup-wrapper--" + _ctx.direction
                        )
                    )), "style" to _nS(_uM("zIndex" to zIndex.value, "pointerEvents" to _ctx.pointerEvents)), "onTouchmove" to withModifiers(fun(){}, _uA(
                        "stop",
                        "prevent"
                    ))), _uA(
                        if (isTrue(_ctx.showMask)) {
                            _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                "cl-popup-mask",
                                _uA(
                                    _uM<String, Any?>(),
                                    _uM("is-open" to (status.value == 1), "is-close" to (status.value == 2)),
                                    pt.value.mask?.className
                                )
                            )), "onClick" to maskClose), null, 2)
                        } else {
                            _cC("v-if", true)
                        },
                        _cE("view", _uM("class" to _nC(_uA(
                            "cl-popup",
                            _uA(
                                _uM<String, Any?>(),
                                _uM("is-open" to (status.value == 1), "is-close" to (status.value == 2), "is-custom-navbar" to unref(router).isCustomNavbarPage(), "stop-transition" to swipe.isTouch),
                                pt.value.className
                            )
                        )), "style" to _nS(popupStyle.value), "onTouchstart" to onTouchStart, "onTouchmove" to onTouchMove, "onTouchend" to onTouchEnd, "onTouchcancel" to onTouchEnd), _uA(
                            _cE("view", _uM("class" to _nC(_uA(
                                "cl-popup__inner",
                                _uA(
                                    _uM<String, Any?>(),
                                    _uM("is-dark" to unref(isDark)),
                                    pt.value.inner?.className
                                )
                            )), "style" to _nS(_uM("paddingBottom" to paddingBottom.value))), _uA(
                                if (isTrue(isSwipeClose.value)) {
                                    _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                        "cl-popup__draw",
                                        _uA(
                                            _uM<String, Any?>(),
                                            _uM("-important-bg-surface-400" to swipe.isMove),
                                            pt.value.draw?.className
                                        )
                                    ))), null, 2)
                                } else {
                                    _cC("v-if", true)
                                },
                                if (isTrue(_ctx.showHeader)) {
                                    _cE("view", _uM("key" to 1, "class" to _nC(_uA(
                                        "cl-popup__header",
                                        _uA(
                                            _uM<String, Any?>(),
                                            pt.value.header?.className
                                        )
                                    ))), _uA(
                                        renderSlot(_ctx.`$slots`, "header", UTSJSONObject(), fun(): UTSArray<Any> {
                                            return _uA(
                                                _cV(_component_cl_text, _uM("ellipsis" to "", "pt" to object : UTSJSONObject() {
                                                    var className = "text-lg font-bold " + pt.value.header?.text?.className
                                                }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                    return _uA(
                                                        _tD(_ctx.title)
                                                    )
                                                }), "_" to 1), 8, _uA(
                                                    "pt"
                                                ))
                                            )
                                        }),
                                        if (isTrue(isOpen.value && _ctx.showClose)) {
                                            _cV(_component_cl_icon, _uM("key" to 0, "name" to "close-circle-fill", "size" to 40, "pt" to object : UTSJSONObject() {
                                                var className = unref(parseClass)(_uA(
                                                    "absolute right--bracket-start-24rpx-bracket-end- text-surface-400",
                                                    _uA(
                                                        unref(isDark),
                                                        "text-surface-50"
                                                    )
                                                ))
                                            }, "onClick" to close, "onTouchmove" to withModifiers(fun(){}, _uA(
                                                "stop"
                                            ))), null, 8, _uA(
                                                "pt",
                                                "onTouchmove"
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    ), 2)
                                } else {
                                    _cC("v-if", true)
                                },
                                _cE("view", _uM("class" to _nC(_uA(
                                    "cl-popup__container",
                                    _uA(
                                        _uM<String, Any?>(),
                                        pt.value.container?.className
                                    )
                                )), "onTouchmove" to withModifiers(fun(){}, _uA(
                                    "stop"
                                ))), _uA(
                                    renderSlot(_ctx.`$slots`, "default")
                                ), 42, _uA(
                                    "onTouchmove"
                                ))
                            ), 6)
                        ), 38)
                    ), 46, _uA(
                        "onTouchmove"
                    )), _uA(
                        _uA(
                            vShow,
                            visible.value
                        )
                    ))
                } else {
                    _cC("v-if", true)
                }
            }
        }
        var name = "cl-popup"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-popup-wrapper" to _pS(_uM("height" to "100%", "width" to "100%", "position" to "fixed", "top" to 0, "bottom" to 0, "left" to 0, "right" to 0, "pointerEvents" to "none")), "cl-popup-mask" to _uM(".cl-popup-wrapper " to _uM("position" to "absolute", "top" to 0, "bottom" to 0, "left" to 0, "right" to 0, "height" to "100%", "width" to "100%", "backgroundColor" to "rgba(0,0,0,1)", "opacity" to 0, "transitionProperty" to "opacity"), ".cl-popup-wrapper .is-open" to _uM("opacity" to 0.4, "transitionDuration" to "0.3s"), ".cl-popup-wrapper .is-close" to _uM("transitionDuration" to "0.3s")), "cl-popup" to _uM(".cl-popup-wrapper " to _uM("position" to "absolute", "transitionDuration" to "300ms", "transitionProperty" to "transform"), ".cl-popup-wrapper .stop-transition" to _uM("transitionProperty" to "none"), ".cl-popup-wrapper--left " to _uM("left" to 0, "top" to 0, "transform" to "translateX(-100%)"), ".cl-popup-wrapper--left .is-open" to _uM("transform" to "translateX(0)"), ".cl-popup-wrapper--right " to _uM("right" to 0, "top" to 0, "transform" to "translateX(100%)"), ".cl-popup-wrapper--right .is-open" to _uM("transform" to "translateX(0)"), ".cl-popup-wrapper--top " to _uM("left" to 0, "top" to 0, "transform" to "translateY(-100%)"), ".cl-popup-wrapper--top .is-open" to _uM("transform" to "translateY(0)"), ".cl-popup-wrapper--left>.is-custom-navbar" to _uM("top" to 0), ".cl-popup-wrapper--right>.is-custom-navbar" to _uM("top" to 0), ".cl-popup-wrapper--top>.is-custom-navbar" to _uM("top" to 0), ".cl-popup-wrapper--bottom>" to _uM("left" to 0, "bottom" to 0, "transform" to "translateY(100%)"), ".cl-popup-wrapper--bottom>.is-open" to _uM("transform" to "translateY(0)"), ".cl-popup-wrapper--bottom>.is-close" to _uM("transform" to "translateY(100%)"), ".cl-popup-wrapper--center>" to _uM("transform" to "scale(1.3)", "opacity" to 0, "transitionProperty" to "transform,opacity"), ".cl-popup-wrapper--center>.is-open" to _uM("transform" to "translate(0, 0) scale(1)", "opacity" to 1)), "cl-popup__inner" to _uM(".cl-popup-wrapper " to _uM("display" to "flex", "height" to "100%", "width" to "100%", "flexDirection" to "column", "backgroundColor" to "rgba(255,255,255,1)"), ".cl-popup-wrapper .is-dark" to _uM("backgroundColor" to "rgba(63,63,70,1)"), ".cl-popup-wrapper--top .cl-popup " to _uM("borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx"), ".cl-popup-wrapper--bottom>.cl-popup " to _uM("borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx"), ".cl-popup-wrapper--center>.cl-popup " to _uM("borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx")), "cl-popup__draw" to _uM(".cl-popup-wrapper " to _uM("borderTopLeftRadius" to "10.5rpx", "borderTopRightRadius" to "10.5rpx", "borderBottomRightRadius" to "10.5rpx", "borderBottomLeftRadius" to "10.5rpx", "backgroundColor" to "rgba(228,228,231,1)", "position" to "absolute", "top" to "14rpx", "left" to "50%", "height" to "10rpx", "width" to "70rpx", "transform" to "translateX(-50%)", "transitionProperty" to "backgroundColor", "transitionDuration" to "0.2s")), "cl-popup__header" to _uM(".cl-popup-wrapper " to _uM("display" to "flex", "flexDirection" to "row", "flexWrap" to "wrap", "alignItems" to "center", "height" to "90rpx", "paddingTop" to 0, "paddingRight" to "80rpx", "paddingBottom" to 0, "paddingLeft" to "26rpx")), "cl-popup__container" to _uM(".cl-popup-wrapper " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "cl-popup-wrapper--center" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center")), "@TRANSITION" to _uM("cl-popup-mask" to _uM("property" to "opacity", "duration" to "0.3s"), "cl-popup" to _uM("duration" to "300ms", "property" to "transform,opacity"), "cl-popup__draw" to _uM("property" to "backgroundColor", "duration" to "0.2s")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("update:modelValue" to null, "open" to null, "opened" to null, "close" to null, "closed" to null, "maskClose" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "modelValue" to _uM("type" to "Boolean", "default" to false), "title" to _uM("type" to "String", "default" to null), "direction" to _uM("type" to "String", "default" to "bottom"), "size" to _uM("type" to _uA(
            "String",
            "Number"
        ), "default" to ""), "showHeader" to _uM("type" to "Boolean", "default" to true), "showClose" to _uM("type" to "Boolean", "default" to true), "showMask" to _uM("type" to "Boolean", "default" to true), "maskClosable" to _uM("type" to "Boolean", "default" to true), "swipeClose" to _uM("type" to "Boolean", "default" to true), "swipeCloseThreshold" to _uM("type" to "Number", "default" to 150), "pointerEvents" to _uM("type" to "String", "default" to "auto"), "keepAlive" to _uM("type" to "Boolean", "default" to false), "enablePortal" to _uM("type" to "Boolean", "default" to true)))
        var propsNeedCastKeys = _uA(
            "pt",
            "modelValue",
            "title",
            "direction",
            "size",
            "showHeader",
            "showClose",
            "showMask",
            "maskClosable",
            "swipeClose",
            "swipeCloseThreshold",
            "pointerEvents",
            "keepAlive",
            "enablePortal"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
