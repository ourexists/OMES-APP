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
open class GenUniModulesCoolUnixComponentsClPageClPage : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var backTop: Boolean by `$props`
    open var scrollTop: Number
        get() {
            return unref(this.`$exposed`["scrollTop"]) as Number
        }
        set(value) {
            setRefValue(this.`$exposed`, "scrollTop", value)
        }
    open var scrollTo: (top: Number) -> Unit
        get() {
            return unref(this.`$exposed`["scrollTo"]) as (top: Number) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "scrollTo", value)
        }
    open var scrollToTop: () -> Unit
        get() {
            return unref(this.`$exposed`["scrollToTop"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "scrollToTop", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClPageClPage, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClPageClPage
            val _cache = __ins.renderCache
            val scrollTop = ref(0)
            val scrollViewTop = ref(0)
            fun gen_onScroll_fn(e: UniScrollEvent) {
                scroller.emit(e.detail.scrollTop)
            }
            val onScroll = ::gen_onScroll_fn
            scroller.on(fun(top){
                scrollTop.value = top
            }
            )
            fun gen_scrollTo_fn(top: Number) {
                scrollViewTop.value = top
            }
            val scrollTo = ::gen_scrollTo_fn
            fun gen_scrollToTop_fn() {
                scrollTo(0 + Math.random() / 1000)
            }
            val scrollToTop = ::gen_scrollToTop_fn
            __expose(_uM("scrollTop" to scrollTop, "scrollTo" to scrollTo, "scrollToTop" to scrollToTop))
            return fun(): Any? {
                val _component_cl_back_top = resolveEasyComponent("cl-back-top", GenUniModulesCoolUnixComponentsClBackTopClBackTopClass)
                return _cE("scroll-view", _uM("style" to _nS(_uM("flex" to 1)), "scroll-top" to scrollViewTop.value, "scroll-with-animation" to true, "onScroll" to onScroll), _uA(
                    if (isTrue(_ctx.backTop)) {
                        _cV(_component_cl_back_top, _uM("key" to 0))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cV(unref(GenUniModulesCoolUnixComponentsClPageUiClass)),
                    renderSlot(_ctx.`$slots`, "default")
                ), 44, _uA(
                    "scroll-top"
                ))
            }
        }
        var name = "cl-page"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("backTop" to _uM("type" to "Boolean", "default" to config.backTop)))
        var propsNeedCastKeys = _uA(
            "backTop"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
