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
open class GenComponentsSizeSet : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var visible: Boolean
        get() {
            return unref(this.`$exposed`["visible"]) as Boolean
        }
        set(value) {
            setRefValue(this.`$exposed`, "visible", value)
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
        var setup: (__props: GenComponentsSizeSet, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenComponentsSizeSet
            val _cache = __ins.renderCache
            val selectRef = ref<ClSelectComponentPublicInstance?>(null)
            val list = _uA<ClSelectOption>(ClSelectOption(label = "0.9", value = 0.9), ClSelectOption(label = t("默认 1.0"), value = 1), ClSelectOption(label = "1.1", value = 1.1), ClSelectOption(label = "1.2", value = 1.2), ClSelectOption(label = "1.3", value = 1.3), ClSelectOption(label = "1.4", value = 1.4))
            val size = ref(1)
            val visible = ref(false)
            fun gen_open_fn() {
                visible.value = true
                size.value = config.fontSize ?: 1
                selectRef.value!!.open(fun(value){
                    config.fontSize = if (value == 1) {
                        null
                    } else {
                        (value as Number)
                    }
                }
                )
            }
            val open = ::gen_open_fn
            fun gen_close_fn() {
                visible.value = false
            }
            val close = ::gen_close_fn
            fun gen_onChanging_fn(value: Number) {
                size.value = value
            }
            val onChanging = ::gen_onChanging_fn
            __expose(_uM("visible" to visible, "open" to open, "close" to close))
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_select = resolveEasyComponent("cl-select", GenUniModulesCoolUnixComponentsClSelectClSelectClass)
                return _cV(_component_cl_select, _uM("ref_key" to "selectRef", "ref" to selectRef, "modelValue" to size.value, "onUpdate:modelValue" to fun(`$event`: Number){
                    size.value = `$event`
                }
                , "title" to unref(t)("全局字号"), "options" to list, "show-trigger" to false, "onChanging" to onChanging), _uM("prepend" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cE("view", _uM("class" to "px-3 absolute top-0 left-0 z-10"), _uA(
                            _cV(_component_cl_text, _uM("style" to _nS(_uM("fontSize" to (28 * size.value + "rpx")))), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(unref(t)("这是一段示例文字，用于预览不同字号的效果。"))
                                )
                            }
                            ), "_" to 1), 8, _uA(
                                "style"
                            ))
                        ))
                    )
                }
                ), "_" to 1), 8, _uA(
                    "modelValue",
                    "onUpdate:modelValue",
                    "title"
                ))
            }
        }
        var name = "size-set"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
