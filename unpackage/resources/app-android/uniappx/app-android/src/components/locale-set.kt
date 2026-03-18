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
open class GenComponentsLocaleSet : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
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
        var setup: (__props: GenComponentsLocaleSet, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenComponentsLocaleSet
            val _cache = __ins.renderCache
            val ui = useUi()
            val options = _uA<ClSelectOption>(ClSelectOption(label = "简体中文", value = "zh-cn"), ClSelectOption(label = "繁体中文", value = "zh-tw"), ClSelectOption(label = "English", value = "en"), ClSelectOption(label = "Español", value = "es"), ClSelectOption(label = "日本語", value = "ja"), ClSelectOption(label = "한국어", value = "ko"), ClSelectOption(label = "Français", value = "fr"))
            val selectRef = ref<ClSelectComponentPublicInstance?>(null)
            val active = ref(locale.value)
            fun gen_open_fn() {
                active.value = locale.value
                if (_uA(
                    "zh-Hans",
                    "zh"
                ).some(fun(e): Boolean {
                    return e == locale.value
                }
                )) {
                    active.value = "zh-cn"
                }
                selectRef.value!!.open(fun(value){
                    ui.showLoading(t__1("切换中"))
                    setTimeout(fun(){
                        setLocale(value as String)
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
                return _cV(_component_cl_select, _uM("ref_key" to "selectRef", "ref" to selectRef, "modelValue" to active.value, "onUpdate:modelValue" to fun(`$event`: String){
                    active.value = `$event`
                }
                , "options" to options, "show-trigger" to false, "title" to unref(t__1)("切换语言"), "cancel-text" to unref(t__1)("取消"), "confirm-text" to unref(t__1)("确定")), null, 8, _uA(
                    "modelValue",
                    "onUpdate:modelValue",
                    "title",
                    "cancel-text",
                    "confirm-text"
                ))
            }
        }
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
