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
open class GenUniModulesCoolUnixComponentsClFormItemClFormItem : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var label: String by `$props`
    open var prop: String by `$props`
    open var rules: UTSArray<ClFormRule> by `$props`
    open var labelPosition: String? by `$props`
    open var labelWidth: String? by `$props`
    open var showAsterisk: Boolean? by `$props`
    open var showMessage: Boolean? by `$props`
    open var required: Boolean? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClFormItemClFormItem, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClFormItemClFormItem
            val _cache = __ins.renderCache
            val props = __props
            val _useForm = useForm()
            val formRef = _useForm.formRef
            val getError = _useForm.getError
            val getValue = _useForm.getValue
            val validateField = _useForm.validateField
            val addField = _useForm.addField
            val removeField = _useForm.removeField
            val setRule = _useForm.setRule
            val getRule = _useForm.getRule
            val pt = computed(fun(): PassThrough__6 {
                return parsePt<PassThrough__6>(props.pt)
            }
            )
            val errorText = computed<String>(fun(): String {
                return getError(props.prop)
            }
            )
            val isError = computed<Boolean>(fun(): Boolean {
                return errorText.value != ""
            }
            )
            val labelPosition = computed<ClFormLabelPosition>(fun(): String {
                return props.labelPosition ?: formRef.value?.labelPosition ?: "left"
            }
            )
            val labelWidth = computed<String>(fun(): String {
                return props.labelWidth ?: formRef.value?.labelWidth ?: "120rpx"
            }
            )
            val required = computed<Boolean>(fun(): Boolean {
                if (props.required != null) {
                    return props.required!!
                }
                val rules = getRule(props.prop)
                return rules.some(fun(rule): Boolean {
                    return rule.required == true
                }
                )
            }
            )
            val showAsterisk = computed<Boolean>(fun(): Boolean {
                if (!required.value) {
                    return false
                }
                return props.showAsterisk ?: formRef.value?.showAsterisk ?: true
            }
            )
            val showMessage = computed<Boolean>(fun(): Boolean {
                if (!required.value) {
                    return false
                }
                return props.showMessage ?: formRef.value?.showMessage ?: true
            }
            )
            watch(required, fun(kVal: Boolean){
                if (kVal) {
                    addField(props.prop, props.rules)
                } else {
                    removeField(props.prop)
                }
            }
            , WatchOptions(immediate = true))
            onMounted(fun(){
                watch(computed(fun(): Any {
                    val value = getValue(props.prop)
                    if (value == null) {
                        return ""
                    }
                    return value
                }
                ), fun(a: Any, b: Any){
                    if (required.value == true) {
                        if (!isEqual(a, b)) {
                            validateField(props.prop)
                        }
                    }
                }
                , WatchOptions(deep = true))
                watch(computed(fun(): UTSArray<ClFormRule> {
                    return props.rules
                }
                ), fun(kVal: UTSArray<ClFormRule>){
                    setRule(props.prop, kVal)
                }
                , WatchOptions(deep = true))
            }
            )
            onUnmounted(fun(){
                removeField(props.prop)
            }
            )
            __expose(_uM("prop" to props.prop))
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-form-item",
                    _uA(
                        _uM<String, Any?>(),
                        _uM("cl-form-item--error" to isError.value),
                        pt.value.className
                    )
                )), "id" to ("cl-form-item-" + _ctx.prop)), _uA(
                    _cE("view", _uM("class" to _nC(_uA(
                        "cl-form-item__inner",
                        _uA(
                            _uM<String, Any?>(),
                            "is-" + labelPosition.value,
                            pt.value.inner?.className
                        )
                    ))), _uA(
                        if (_ctx.label != "") {
                            _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                "cl-form-item__label",
                                _uA(
                                    _uM<String, Any?>(),
                                    "is-" + labelPosition.value,
                                    pt.value.label?.className
                                )
                            )), "style" to _nS(_uM("width" to if (labelPosition.value != "top") {
                                labelWidth.value
                            } else {
                                "auto"
                            }))), _uA(
                                _cV(_component_cl_text, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(_ctx.label)
                                    )
                                }), "_" to 1)),
                                if (isTrue(showAsterisk.value)) {
                                    _cV(_component_cl_text, _uM("key" to 0, "color" to "error", "pt" to object : UTSJSONObject() {
                                        var className = "ml-1"
                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            " * "
                                        )
                                    }), "_" to 1))
                                } else {
                                    _cC("v-if", true)
                                }
                            ), 6)
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        _cE("view", _uM("class" to _nC(_uA(
                            "cl-form-item__content",
                            _uA(
                                _uM<String, Any?>(),
                                pt.value.content?.className
                            )
                        ))), _uA(
                            renderSlot(_ctx.`$slots`, "default")
                        ), 2)
                    ), 2),
                    if (isTrue(isError.value && showMessage.value)) {
                        _cE("view", _uM("key" to 0, "class" to "cl-form-item__error"), _uA(
                            renderSlot(_ctx.`$slots`, "error", GenUniModulesCoolUnixComponentsClFormItemClFormItemSlotDataError(error = errorText.value), fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_cl_text, _uM("color" to "error", "pt" to object : UTSJSONObject() {
                                        var className = unref(parseClass)(_uA(
                                            "mt-2 text-sm",
                                            pt.value.error?.className
                                        ))
                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(errorText.value)
                                        )
                                    }), "_" to 1), 8, _uA(
                                        "pt"
                                    ))
                                )
                            })
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                ), 10, _uA(
                    "id"
                ))
            }
        }
        var name = "cl-form-item"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-form-item" to _pS(_uM("marginBottom" to "42rpx", "width" to "100%")), "cl-form-item__inner" to _uM("" to _uM("width" to "100%"), ".is-top" to _uM("display" to "flex", "flexDirection" to "column"), ".is-left" to _uM("display" to "flex", "flexDirection" to "row"), ".is-right" to _uM("display" to "flex", "flexDirection" to "row")), "cl-form-item__label" to _uM("" to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center"), ".is-top" to _uM("marginBottom" to "14rpx", "width" to "100%"), ".is-left" to _uM("marginRight" to "21rpx"), ".is-right" to _uM("marginRight" to "21rpx", "justifyContent" to "flex-end")), "cl-form-item__content" to _pS(_uM("position" to "relative", "width" to "100%", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "label" to _uM("type" to "String", "default" to ""), "prop" to _uM("type" to "String", "default" to ""), "rules" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "labelPosition" to _uM("type" to "String", "default" to null), "labelWidth" to _uM("type" to "String", "default" to null), "showAsterisk" to _uM("type" to "Boolean", "default" to null), "showMessage" to _uM("type" to "Boolean", "default" to null), "required" to _uM("type" to "Boolean", "default" to null)))
        var propsNeedCastKeys = _uA(
            "pt",
            "label",
            "prop",
            "rules",
            "labelPosition",
            "labelWidth",
            "showAsterisk",
            "showMessage",
            "required"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
