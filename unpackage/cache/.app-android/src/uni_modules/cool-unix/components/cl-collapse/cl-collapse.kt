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
import io.dcloud.uniapp.extapi.createSelectorQuery as uni_createSelectorQuery
open class GenUniModulesCoolUnixComponentsClCollapseClCollapse : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var modelValue: Boolean by `$props`
    open var show: () -> Unit
        get() {
            return unref(this.`$exposed`["show"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "show", value)
        }
    open var hide: () -> Unit
        get() {
            return unref(this.`$exposed`["hide"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "hide", value)
        }
    open var toggle: () -> Unit
        get() {
            return unref(this.`$exposed`["toggle"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "toggle", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClCollapseClCollapse, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClCollapseClCollapse
            val _cache = __ins.renderCache
            val props = __props
            val proxy = getCurrentInstance()!!.proxy
            val pt = computed(fun(): PassThrough__15 {
                return parsePt<PassThrough__15>(props.pt)
            }
            )
            val isOpened = ref(false)
            val height = ref(0)
            fun gen_show_fn() {
                isOpened.value = true
                uni_createSelectorQuery().`in`(proxy).select(".cl-collapse__content").boundingClientRect(fun(node){
                    height.value = (node as NodeInfo).height ?: 0
                }
                ).exec()
            }
            val show = ::gen_show_fn
            fun gen_hide_fn() {
                isOpened.value = false
                height.value = 0
            }
            val hide = ::gen_hide_fn
            fun gen_toggle_fn() {
                if (isOpened.value) {
                    hide()
                } else {
                    show()
                }
            }
            val toggle = ::gen_toggle_fn
            watch(computed(fun(): Boolean {
                return props.modelValue
            }
            ), fun(kVal: Boolean){
                if (kVal) {
                    show()
                } else {
                    hide()
                }
            }
            )
            __expose(_uM("show" to show, "hide" to hide, "toggle" to toggle))
            return fun(): Any? {
                return _cE("view", _uM("class" to "cl-collapse", "style" to _nS(_uM("height" to ("" + height.value + "px")))), _uA(
                    _cE("view", _uM("class" to _nC(_uA(
                        "cl-collapse__content",
                        _uA(
                            _uM<String, Any?>(),
                            pt.value.className
                        )
                    ))), _uA(
                        renderSlot(_ctx.`$slots`, "default")
                    ), 2)
                ), 4)
            }
        }
        var name = "cl-collapse"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-collapse" to _pS(_uM("position" to "relative", "transitionProperty" to "height", "transitionDuration" to "0.2s")), "cl-collapse__content" to _pS(_uM("position" to "absolute", "top" to 0, "left" to 0, "width" to "100%", "paddingTop" to "21rpx")), "@TRANSITION" to _uM("cl-collapse" to _uM("property" to "height", "duration" to "0.2s")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "modelValue" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "pt",
            "modelValue"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
