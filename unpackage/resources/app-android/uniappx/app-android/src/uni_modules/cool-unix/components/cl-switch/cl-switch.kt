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
open class GenUniModulesCoolUnixComponentsClSwitchClSwitch : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var modelValue: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var loading: Boolean by `$props`
    open var height: Number by `$props`
    open var width: Number by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClSwitchClSwitch) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClSwitchClSwitch
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val pt = computed(fun(): PassThrough__18 {
                return parsePt<PassThrough__18>(props.pt)
            }
            )
            val disabled = useForm().disabled
            val isDisabled = computed(fun(): Boolean {
                return props.disabled || disabled.value
            }
            )
            val value = ref(props.modelValue)
            val isChecked = computed(fun(): Boolean {
                return value.value
            }
            )
            val rect = computed<Rect>(fun(): Rect {
                val height = props.height
                val width = props.width
                val size = height - 8
                val left: Number = 4
                val translateX = width - height
                return Rect(height = height + "rpx", width = width + "rpx", size = size + "rpx", left = left + "rpx", translateX = if (isAppIOS()) {
                    rpx2px(translateX) + "px"
                } else {
                    "" + translateX + "rpx"
                }
                )
            }
            )
            fun gen_onTap_fn() {
                if (!isDisabled.value && !props.loading) {
                    val kVal = !value.value
                    value.value = kVal
                    emit("update:modelValue", kVal)
                    emit("change", kVal)
                }
            }
            val onTap = ::gen_onTap_fn
            watch(computed(fun(): Boolean {
                return props.modelValue
            }
            ), fun(kVal: Boolean){
                value.value = kVal
            }
            )
            return fun(): Any? {
                val _component_cl_loading = resolveEasyComponent("cl-loading", GenUniModulesCoolUnixComponentsClLoadingClLoadingClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-switch",
                    _uA(
                        _uM<String, Any?>(),
                        _uM("cl-switch--disabled" to isDisabled.value, "cl-switch--checked" to isChecked.value),
                        pt.value.className
                    )
                )), "onClick" to onTap), _uA(
                    _cE("view", _uM("class" to _nC(_uA(
                        "cl-switch__track",
                        _uA(
                            _uM<String, Any?>(),
                            _uM("is-checked" to isChecked.value, "is-dark" to unref(isDark)),
                            pt.value.track?.className
                        )
                    )), "style" to _nS(_uM("height" to rect.value.height, "width" to rect.value.width))), _uA(
                        _cE("view", _uM("class" to _nC(_uA(
                            "cl-switch__thumb",
                            _uA(
                                _uM<String, Any?>(),
                                pt.value.thumb?.className
                            )
                        )), "style" to _nS(_uM("height" to rect.value.size, "width" to rect.value.size, "left" to rect.value.left, "transform" to ("translateX(" + (if (isChecked.value) {
                            rect.value.translateX
                        } else {
                            0
                        }
                        ) + ")")))), _uA(
                            if (isTrue(_ctx.loading)) {
                                _cV(_component_cl_loading, _uM("key" to 0, "size" to 24, "color" to "primary", "pt" to object : UTSJSONObject() {
                                    var className = unref(parseClass)(_uA(
                                        pt.value.loading?.className
                                    ))
                                }), null, 8, _uA(
                                    "pt"
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                        ), 6)
                    ), 6)
                ), 2)
            }
        }
        var name = "cl-switch"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-switch" to _uM("" to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "opacity" to 1, "transitionDuration" to "200ms"), ".cl-switch--disabled" to _uM("opacity" to 0.5)), "cl-switch__track" to _uM("" to _uM("position" to "relative", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999, "transitionDuration" to "200ms", "backgroundColor" to "rgba(228,228,231,1)"), ".is-dark" to _uM("backgroundColor" to "rgba(113,113,122,1)"), ".is-checked" to _uM("backgroundColor" to "rgba(20,184,166,1)")), "cl-switch__thumb" to _pS(_uM("position" to "absolute", "display" to "flex", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999, "backgroundColor" to "rgba(255,255,255,1)", "transitionDuration" to "300ms")), "@TRANSITION" to _uM("cl-switch" to _uM("duration" to "200ms"), "cl-switch__track" to _uM("duration" to "200ms"), "cl-switch__thumb" to _uM("duration" to "300ms")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("update:modelValue" to null, "change" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "modelValue" to _uM("type" to "Boolean", "default" to false), "disabled" to _uM("type" to "Boolean", "default" to false), "loading" to _uM("type" to "Boolean", "default" to false), "height" to _uM("type" to "Number", "default" to 48), "width" to _uM("type" to "Number", "default" to 80)))
        var propsNeedCastKeys = _uA(
            "pt",
            "modelValue",
            "disabled",
            "loading",
            "height",
            "width"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
