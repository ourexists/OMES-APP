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
open class GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var text: String by `$props`
    open var placeholder: String by `$props`
    open var arrowIcon: String by `$props`
    open var disabled: Boolean by `$props`
    open var focus: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val disabled = useForm().disabled
            val isError = useFormItem().isError
            val isDisabled = computed(fun(): Boolean {
                return disabled.value || props.disabled
            }
            )
            val pt = computed(fun(): PassThrough__9 {
                return parsePt<PassThrough__9>(props.pt)
            }
            )
            val showText = computed(fun(): Boolean {
                return props.text != ""
            }
            )
            fun gen_clear_fn() {
                emit("clear")
            }
            val clear = ::gen_clear_fn
            fun gen_open_fn() {
                if (isDisabled.value) {
                    return
                }
                emit("open")
            }
            val open = ::gen_open_fn
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-select-trigger",
                    _uA(
                        _uM<String, Any?>(),
                        _uM("is-dark" to unref(isDark), "cl-select-trigger--disabled" to isDisabled.value, "cl-select-trigger--focus" to _ctx.focus, "cl-select-trigger--error" to unref(isError)),
                        pt.value.className
                    )
                )), "onClick" to open), _uA(
                    _cE("view", _uM("class" to "cl-select-trigger__content"), _uA(
                        if (isTrue(showText.value)) {
                            _cV(_component_cl_text, _uM("key" to 0, "pt" to object : UTSJSONObject() {
                                var className = unref(parseClass)(_uA(
                                    object : UTSJSONObject() {
                                        var `text-surface-400` = isDisabled.value
                                    },
                                    pt.value.text?.className
                                ))
                            }, "ellipsis" to ""), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(_ctx.text)
                                )
                            }), "_" to 1), 8, _uA(
                                "pt"
                            ))
                        } else {
                            _cV(_component_cl_text, _uM("key" to 1, "pt" to object : UTSJSONObject() {
                                var className = unref(parseClass)(_uA(
                                    "text-surface-400",
                                    pt.value.placeholder?.className
                                ))
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(_ctx.placeholder)
                                )
                            }
                            ), "_" to 1), 8, _uA(
                                "pt"
                            ))
                        }
                    )),
                    if (isTrue(showText.value && !isDisabled.value)) {
                        _cE("view", _uM("key" to 0, "class" to "cl-select-trigger__icon", "onClick" to withModifiers(clear, _uA(
                            "stop"
                        ))), _uA(
                            _cV(_component_cl_icon, _uM("name" to "close-circle-fill", "size" to 32, "pt" to object : UTSJSONObject() {
                                var className = "text-surface-400"
                            }))
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(!isDisabled.value && !showText.value)) {
                        _cE("view", _uM("key" to 1, "class" to "cl-select-trigger__icon"), _uA(
                            _cV(_component_cl_icon, _uM("name" to (pt.value.icon?.name ?: _ctx.arrowIcon), "size" to (pt.value.icon?.size ?: 32), "pt" to object : UTSJSONObject() {
                                var className = "text-surface-400 " + pt.value.icon?.className
                            }), null, 8, _uA(
                                "name",
                                "size",
                                "pt"
                            ))
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                ), 2)
            }
        }
        var name = "cl-select-trigger"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-select-trigger" to _uM("" to _uM("boxSizing" to "border-box", "display" to "flex", "width" to "100%", "flexDirection" to "row", "alignItems" to "center", "borderTopLeftRadius" to "14rpx", "borderTopRightRadius" to "14rpx", "borderBottomRightRadius" to "14rpx", "borderBottomLeftRadius" to "14rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(228,228,231,1)", "borderRightColor" to "rgba(228,228,231,1)", "borderBottomColor" to "rgba(228,228,231,1)", "borderLeftColor" to "rgba(228,228,231,1)", "backgroundColor" to "rgba(255,255,255,1)", "height" to "66rpx", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx"), ".is-dark" to _uM("borderTopColor" to "rgba(63,63,70,1)", "borderRightColor" to "rgba(63,63,70,1)", "borderBottomColor" to "rgba(63,63,70,1)", "borderLeftColor" to "rgba(63,63,70,1)", "backgroundColor" to "rgba(39,39,42,1)"), ".is-dark.cl-select-trigger--disabled" to _uM("backgroundColor" to "rgba(63,63,70,1)")), "cl-select-trigger__content" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "cl-select-trigger__icon" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "paddingLeft" to "20rpx")), "cl-select-trigger--disabled" to _pS(_uM("backgroundColor" to "rgba(244,244,245,1)", "opacity" to 0.7)), "cl-select-trigger--focus" to _uM("" to _uM("borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)"), ".is-dark" to _uM("borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)")), "cl-select-trigger--error" to _pS(_uM("borderTopColor" to "rgba(239,68,68,1)", "borderRightColor" to "rgba(239,68,68,1)", "borderBottomColor" to "rgba(239,68,68,1)", "borderLeftColor" to "rgba(239,68,68,1)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("open" to null, "clear" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "text" to _uM("type" to "String", "default" to ""), "placeholder" to _uM("type" to "String", "default" to fun(): String {
            return t("请选择")
        }
        ), "arrowIcon" to _uM("type" to "String", "default" to "arrow-down-s-line"), "disabled" to _uM("type" to "Boolean", "default" to false), "focus" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "pt",
            "text",
            "placeholder",
            "arrowIcon",
            "disabled",
            "focus"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
