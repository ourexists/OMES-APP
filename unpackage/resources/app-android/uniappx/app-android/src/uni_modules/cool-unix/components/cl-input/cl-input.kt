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
open class GenUniModulesCoolUnixComponentsClInputClInput : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var modelValue: String by `$props`
    open var type: String by `$props`
    open var prefixIcon: String by `$props`
    open var suffixIcon: String by `$props`
    open var password: Boolean by `$props`
    open var autofocus: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var readonly: Boolean? by `$props`
    open var placeholder: String by `$props`
    open var placeholderClass: String by `$props`
    open var border: Boolean by `$props`
    open var clearable: Boolean by `$props`
    open var cursorSpacing: Number by `$props`
    open var confirmHold: Boolean by `$props`
    open var confirmType: String by `$props`
    open var adjustPosition: Boolean by `$props`
    open var maxlength: Number by `$props`
    open var holdKeyboard: Boolean by `$props`
    open var precision: Number by `$props`
    open var isFocus: Boolean
        get() {
            return unref(this.`$exposed`["isFocus"]) as Boolean
        }
        set(value) {
            setRefValue(this.`$exposed`, "isFocus", value)
        }
    open var focus: () -> Unit
        get() {
            return unref(this.`$exposed`["focus"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "focus", value)
        }
    open var clear: () -> Unit
        get() {
            return unref(this.`$exposed`["clear"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "clear", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClInputClInput, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClInputClInput
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
            val pt = computed(fun(): PassThrough__19 {
                return parsePt<PassThrough__19>(props.pt)
            }
            )
            val _useSize = useSize(fun(): String {
                return pt.value.inner?.className ?: ""
            }
            )
            val ptClassName = _useSize.ptClassName
            val getSize = _useSize.getSize
            val inputStyle = computed(fun(): UTSJSONObject {
                val style: UTSJSONObject = UTSJSONObject()
                val fontSize = getSize(null)
                if (fontSize != null) {
                    style["fontSize"] = fontSize
                }
                return style
            }
            )
            val value = ref<String>("")
            val isFocus = ref<Boolean>(props.autofocus)
            val showClear = computed(fun(): Boolean {
                return isFocus.value && props.clearable && value.value != ""
            }
            )
            val isPassword = ref(props.password)
            val isExceed = computed(fun(): Boolean {
                if (props.type == "digit" && props.precision >= 0 && value.value != "") {
                    val parts = value.value.split(".")
                    return parts.length > 1 && parts[1].length > props.precision
                } else {
                    return false
                }
            }
            )
            fun gen_showPassword_fn() {
                isPassword.value = !isPassword.value
            }
            val showPassword = ::gen_showPassword_fn
            fun gen_onFocus_fn(e: UniInputFocusEvent) {
                isFocus.value = true
                emit("focus", e)
            }
            val onFocus = ::gen_onFocus_fn
            fun gen_onBlur_fn(e: UniInputBlurEvent) {
                emit("blur", e)
                if (props.type == "digit" && props.precision > 0 && value.value != "") {
                    val numValue = parseFloat(value.value)
                    if (!isNaN(numValue)) {
                        val formattedValue = numValue.toFixed(props.precision)
                        value.value = formattedValue
                        emit("update:modelValue", formattedValue)
                        emit("change", formattedValue)
                    }
                }
                setTimeout(fun(){
                    isFocus.value = false
                }
                , 0)
            }
            val onBlur = ::gen_onBlur_fn
            fun gen_onInput_fn(e: UniInputEvent) {
                val v1 = e.detail.value
                val v2 = value.value
                value.value = v1
                emit("update:modelValue", v1)
                emit("input", e)
                if (v1 != v2) {
                    emit("change", v1)
                }
            }
            val onInput = ::gen_onInput_fn
            fun gen_onConfirm_fn(e: UniInputConfirmEvent) {
                emit("confirm", e)
            }
            val onConfirm = ::gen_onConfirm_fn
            fun gen_onKeyboardheightchange_fn(e: UniInputKeyboardHeightChangeEvent) {
                emit("keyboardheightchange", e)
            }
            val onKeyboardheightchange = ::gen_onKeyboardheightchange_fn
            fun gen_onTap_fn() {
                if (isDisabled.value) {
                    return
                }
                isFocus.value = true
            }
            val onTap = ::gen_onTap_fn
            fun gen_focus_fn() {
                setTimeout(fun(){
                    isFocus.value = false
                    nextTick(fun(){
                        isFocus.value = true
                    }
                    )
                }
                , 0)
            }
            val focus = ::gen_focus_fn
            fun gen_clear_fn() {
                value.value = ""
                emit("update:modelValue", "")
                emit("change", "")
                emit("clear")
            }
            val clear = ::gen_clear_fn
            watch(computed(fun(): String {
                return props.modelValue
            }
            ), fun(kVal: String){
                value.value = kVal
            }
            , WatchOptions(immediate = true))
            __expose(_uM("isFocus" to isFocus, "focus" to focus, "clear" to clear))
            return fun(): Any? {
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-input",
                    _uA(
                        _uM<String, Any?>(),
                        pt.value.className,
                        _uM("is-dark" to unref(isDark), "cl-input--border" to _ctx.border, "cl-input--focus" to isFocus.value, "cl-input--disabled" to isDisabled.value, "cl-input--error" to unref(isError))
                    )
                )), "onClick" to onTap), _uA(
                    renderSlot(_ctx.`$slots`, "prepend"),
                    if (isTrue(_ctx.prefixIcon)) {
                        _cE("view", _uM("key" to 0, "class" to "cl-input__icon -important-pl-0 pr--bracket-start-12rpx-bracket-end-"), _uA(
                            _cV(_component_cl_icon, _uM("name" to _ctx.prefixIcon, "size" to (pt.value.prefixIcon?.size ?: 32), "pt" to object : UTSJSONObject() {
                                var className = unref(parseClass)(_uA(
                                    pt.value.prefixIcon?.className
                                ))
                            }), null, 8, _uA(
                                "name",
                                "size",
                                "pt"
                            ))
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cE("input", _uM("class" to _nC(_uA(
                        "cl-input__inner",
                        _uA(
                            _uM<String, Any?>(),
                            _uM("is-disabled" to isDisabled.value, "is-dark" to unref(isDark), "is-exceed" to isExceed.value),
                            unref(ptClassName)
                        )
                    )), "style" to _nS(inputStyle.value), "value" to value.value, "disabled" to (_ctx.readonly ?: isDisabled.value), "type" to _ctx.type, "password" to isPassword.value, "focus" to isFocus.value, "placeholder" to _ctx.placeholder, "placeholder-class" to ("text-surface-400 " + _ctx.placeholderClass), "maxlength" to _ctx.maxlength, "cursor-spacing" to _ctx.cursorSpacing, "confirm-type" to _ctx.confirmType, "confirm-hold" to _ctx.confirmHold, "adjust-position" to _ctx.adjustPosition, "hold-keyboard" to _ctx.holdKeyboard, "onInput" to onInput, "onFocus" to onFocus, "onBlur" to onBlur, "onConfirm" to onConfirm, "onKeyboardheightchange" to onKeyboardheightchange), null, 46, _uA(
                        "value",
                        "disabled",
                        "type",
                        "password",
                        "focus",
                        "placeholder",
                        "placeholder-class",
                        "maxlength",
                        "cursor-spacing",
                        "confirm-type",
                        "confirm-hold",
                        "adjust-position",
                        "hold-keyboard"
                    )),
                    if (isTrue(_ctx.suffixIcon)) {
                        _cE("view", _uM("key" to 1, "class" to "cl-input__icon"), _uA(
                            _cV(_component_cl_icon, _uM("name" to _ctx.suffixIcon, "size" to (pt.value.suffixIcon?.size ?: 32), "pt" to object : UTSJSONObject() {
                                var className = unref(parseClass)(_uA(
                                    pt.value.prefixIcon?.className
                                ))
                            }), null, 8, _uA(
                                "name",
                                "size",
                                "pt"
                            ))
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(showClear.value)) {
                        _cE("view", _uM("key" to 2, "class" to "cl-input__icon", "onClick" to clear), _uA(
                            _cV(_component_cl_icon, _uM("name" to "close-circle-fill", "size" to 32, "pt" to object : UTSJSONObject() {
                                var className = "-important-text-surface-400"
                            }))
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(_ctx.password)) {
                        _cE("view", _uM("key" to 3, "class" to "cl-input__icon", "onClick" to showPassword), _uA(
                            _cV(_component_cl_icon, _uM("name" to if (isPassword.value) {
                                "eye-line"
                            } else {
                                "eye-off-line"
                            }, "size" to 32, "pt" to object : UTSJSONObject() {
                                var className = "-important-text-surface-300"
                            }), null, 8, _uA(
                                "name"
                            ))
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    renderSlot(_ctx.`$slots`, "append")
                ), 2)
            }
        }
        var name = "cl-input"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-input" to _uM("" to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "backgroundColor" to "rgba(255,255,255,1)", "transitionDuration" to "200ms", "borderTopLeftRadius" to "14rpx", "borderTopRightRadius" to "14rpx", "borderBottomRightRadius" to "14rpx", "borderBottomLeftRadius" to "14rpx", "height" to "66rpx", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx", "transitionProperty" to "backgroundColor,borderColor"), ".is-dark" to _uM("backgroundColor" to "rgba(39,39,42,1)"), ".is-dark.cl-input--border" to _uM("borderTopColor" to "rgba(82,82,91,1)", "borderRightColor" to "rgba(82,82,91,1)", "borderBottomColor" to "rgba(82,82,91,1)", "borderLeftColor" to "rgba(82,82,91,1)"), ".is-dark.cl-input--border.cl-input--focus" to _uM("borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)"), ".is-dark.cl-input--disabled" to _uM("backgroundColor" to "rgba(63,63,70,1)")), "cl-input__inner" to _uM("" to _uM("height" to "100%", "color" to "rgba(63,63,70,1)", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "28rpx"), ".is-dark" to _uM("color" to "rgba(255,255,255,1)"), ".is-exceed" to _uM("color" to "rgba(239,68,68,1)"), ".is-exceed.is-dark" to _uM("color" to "rgba(248,113,113,1)")), "cl-input__icon" to _pS(_uM("display" to "flex", "height" to "100%", "alignItems" to "center", "justifyContent" to "center", "paddingLeft" to "20rpx")), "cl-input--border" to _pS(_uM("borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(228,228,231,1)", "borderRightColor" to "rgba(228,228,231,1)", "borderBottomColor" to "rgba(228,228,231,1)", "borderLeftColor" to "rgba(228,228,231,1)")), "cl-input--disabled" to _pS(_uM("backgroundColor" to "rgba(244,244,245,1)", "opacity" to 0.7)), "cl-input--focus" to _uM(".cl-input--border" to _uM("borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)")), "cl-input--error" to _pS(_uM("borderTopColor" to "rgba(239,68,68,1)", "borderRightColor" to "rgba(239,68,68,1)", "borderBottomColor" to "rgba(239,68,68,1)", "borderLeftColor" to "rgba(239,68,68,1)")), "@TRANSITION" to _uM("cl-input" to _uM("duration" to "200ms", "property" to "backgroundColor,borderColor")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("update:modelValue" to null, "input" to null, "change" to null, "focus" to null, "blur" to null, "confirm" to null, "clear" to null, "keyboardheightchange" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "modelValue" to _uM("type" to "String", "default" to ""), "type" to _uM("type" to "String", "default" to "text"), "prefixIcon" to _uM("type" to "String", "default" to ""), "suffixIcon" to _uM("type" to "String", "default" to ""), "password" to _uM("type" to "Boolean", "default" to false), "autofocus" to _uM("type" to "Boolean", "default" to false), "disabled" to _uM("type" to "Boolean", "default" to false), "readonly" to _uM("type" to "Boolean", "default" to null), "placeholder" to _uM("type" to "String", "default" to fun(): String {
            return t("请输入")
        }
        ), "placeholderClass" to _uM("type" to "String", "default" to ""), "border" to _uM("type" to "Boolean", "default" to true), "clearable" to _uM("type" to "Boolean", "default" to false), "cursorSpacing" to _uM("type" to "Number", "default" to 5), "confirmHold" to _uM("type" to "Boolean", "default" to false), "confirmType" to _uM("type" to "String", "default" to "done"), "adjustPosition" to _uM("type" to "Boolean", "default" to true), "maxlength" to _uM("type" to "Number", "default" to 140), "holdKeyboard" to _uM("type" to "Boolean", "default" to false), "precision" to _uM("type" to "Number", "default" to 0)))
        var propsNeedCastKeys = _uA(
            "pt",
            "modelValue",
            "type",
            "prefixIcon",
            "suffixIcon",
            "password",
            "autofocus",
            "disabled",
            "readonly",
            "placeholder",
            "placeholderClass",
            "border",
            "clearable",
            "cursorSpacing",
            "confirmHold",
            "confirmType",
            "adjustPosition",
            "maxlength",
            "holdKeyboard",
            "precision"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
