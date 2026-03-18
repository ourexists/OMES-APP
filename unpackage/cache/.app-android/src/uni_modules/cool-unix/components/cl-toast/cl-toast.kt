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
open class GenUniModulesCoolUnixComponentsClToastClToast : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var open: (options: ClToastOptions) -> Unit
        get() {
            return unref(this.`$exposed`["open"]) as (options: ClToastOptions) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "open", value)
        }
    open var close: (id: Number) -> Unit
        get() {
            return unref(this.`$exposed`["close"]) as (id: Number) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "close", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClToastClToast, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClToastClToast
            val _cache = __ins.renderCache
            val list = ref(_uA<ToastItem>())
            var id: Number = 0
            fun gen_close_fn(id: Number) {
                val item = list.value.find(fun(item): Boolean {
                    return item.id == id
                }
                )
                if (item != null) {
                    item.visible = false
                }
            }
            val close = ::gen_close_fn
            fun gen_open_fn(options: ClToastOptions) {
                val item = reactive<ToastItem>(ToastItem(id = id++, visible = true, isOpen = false, icon = options.icon, image = options.image, duration = options.duration ?: 2000, position = options.position ?: "center", msgNotifier = options.msgNotifier ?: ""))
                if (!isNull(item.icon) || !isNull(item.image)) {
                    item.position = "center"
                }
                when (options.type) {
                    "success" -> 
                        item.icon = "checkbox-circle-line"
                    "warn" -> 
                        item.icon = "error-warning-line"
                    "error" -> 
                        item.icon = "close-circle-line"
                    "question" -> 
                        item.icon = "question-line"
                    "disabled" -> 
                        item.icon = "prohibited-line"
                    "stop" -> 
                        item.icon = "indeterminate-circle-line"
                }
                if (options.clear == true) {
                    list.value = _uA(
                        item
                    )
                } else {
                    list.value.push(item)
                }
                setTimeout(fun(){
                    item.isOpen = true
                    if (item.duration != 0) {
                        setTimeout(fun(){
                            close(item.id)
                        }
                        , item.duration!!)
                    }
                }
                , 50)
            }
            val open = ::gen_open_fn
            __expose(_uM("open" to open, "close" to close))
            return fun(): Any? {
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_popup = resolveEasyComponent("cl-popup", GenUniModulesCoolUnixComponentsClPopupClPopupClass)
                return _cE(Fragment, null, RenderHelpers.renderList(list.value, fun(item, id, __index, _cached): Any {
                    return _cV(_component_cl_popup, _uM("key" to id, "direction" to item.position, "show-mask" to false, "show-header" to false, "swipe-close" to false, "pt" to object : UTSJSONObject() {
                        var inner = object : UTSJSONObject() {
                            var className = "-important-bg-transparent"
                        }
                    }, "keep-alive" to "", "pointer-events" to "none", "modelValue" to item.visible, "onUpdate:modelValue" to fun(`$event`: Boolean){
                        item.visible = `$event`
                    }
                    ), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cE("view", _uM("class" to "cl-toast-wrapper"), _uA(
                                _cE("view", _uM("class" to _nC(_uA(
                                    "cl-toast",
                                    _uA(
                                        _uM<String, Any?>(),
                                        _uM("is-dark" to unref(isDark), "is-open" to item.isOpen),
                                        "cl-toast--" + item.position
                                    )
                                ))), _uA(
                                    _cE("view", _uM("class" to "flex flex-row justify-center"), _uA(
                                        if (item.icon != null) {
                                            _cV(_component_cl_icon, _uM("key" to 0, "color" to "white", "name" to item.icon, "size" to 56, "pt" to object : UTSJSONObject() {
                                                var className = "mb-1"
                                            }), null, 8, _uA(
                                                "name"
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    )),
                                    _cV(_component_cl_text, _uM("color" to "white", "pt" to object : UTSJSONObject() {
                                        var className = "text-center"
                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(item.msgNotifier)
                                        )
                                    }
                                    ), "_" to 2), 1024)
                                ), 2)
                            ))
                        )
                    }
                    ), "_" to 2), 1032, _uA(
                        "direction",
                        "modelValue",
                        "onUpdate:modelValue"
                    ))
                }
                ), 128)
            }
        }
        var name = "cl-toast"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-toast-wrapper" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "50rpx", "paddingRight" to 0, "paddingBottom" to "50rpx", "paddingLeft" to 0)), "cl-toast" to _uM("" to _uM("borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "paddingLeft" to "32rpx", "paddingRight" to "32rpx", "paddingTop" to "24rpx", "paddingBottom" to "24rpx", "backgroundColor" to "rgba(50,50,50,0.9)", "maxWidth" to "600rpx", "opacity" to 0), ".is-open" to _uM("opacity" to 1), ".is-dark" to _uM("backgroundColor" to "rgba(70,70,70,0.9)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
