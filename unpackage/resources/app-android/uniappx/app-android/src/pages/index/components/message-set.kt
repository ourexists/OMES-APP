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
open class GenPagesIndexComponentsMessageSet : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var status: Number? by `$props`
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
        var setup: (__props: GenPagesIndexComponentsMessageSet, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexComponentsMessageSet
            val _cache = __ins.renderCache
            val ui = useUi()
            val statusOptions = _uA<ClSelectOption>(ClSelectOption(label = "全部", value = -1), ClSelectOption(label = "未读", value = 0), ClSelectOption(label = "已读", value = 1))
            val selectRef = ref<ClSelectComponentPublicInstance?>(null)
            val selectStatus = ref<Number>(-1)
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            fun gen_emitFilter_fn() {
                val status: Number? = if (selectStatus.value == -1) {
                    null
                } else {
                    selectStatus.value
                }
                emit("change", MessageSetPayload(status = status))
            }
            val emitFilter = ::gen_emitFilter_fn
            fun gen_open_fn() {
                selectStatus.value = if (props.status == null) {
                    -1
                } else {
                    props.status!!
                }
                selectRef.value!!.open(fun(value){
                    ui.showLoading(t__1("切换中"))
                    setTimeout(fun(){
                        ui.hideLoading()
                    }
                    , 500)
                }
                )
            }
            val open = ::gen_open_fn
            fun gen_close_fn() {
                selectRef.value!!.close()
            }
            val close = ::gen_close_fn
            __expose(_uM("open" to open, "close" to close))
            return fun(): Any? {
                val _component_cl_select = resolveEasyComponent("cl-select", GenUniModulesCoolUnixComponentsClSelectClSelectClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "message-set",
                    _uM("is-dark" to unref(isDark))
                ))), _uA(
                    _cV(_component_cl_select, _uM("ref_key" to "selectRef", "ref" to selectRef, "modelValue" to selectStatus.value, "onUpdate:modelValue" to fun(`$event`: Number){
                        selectStatus.value = `$event`
                    }
                    , "options" to statusOptions, "show-trigger" to false, "title" to unref(t__1)("已读状态"), "cancel-text" to unref(t__1)("取消"), "confirm-text" to unref(t__1)("确定"), "onChange" to emitFilter), null, 8, _uA(
                        "modelValue",
                        "onUpdate:modelValue",
                        "title",
                        "cancel-text",
                        "confirm-text"
                    ))
                ), 2)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("change" to null)
        var props = _nP(_uM("status" to _uM("type" to "Number", "required" to false)))
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
