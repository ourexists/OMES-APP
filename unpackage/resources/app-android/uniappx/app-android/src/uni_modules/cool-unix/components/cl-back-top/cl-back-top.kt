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
import io.dcloud.uniapp.extapi.getWindowInfo as uni_getWindowInfo
open class GenUniModulesCoolUnixComponentsClBackTopClBackTop : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var top: Number? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClBackTopClBackTop) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClBackTopClBackTop
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val screenHeight = uni_getWindowInfo().screenHeight
            val _usePage = usePage()
            val scrollToTop = _usePage.scrollToTop
            val onScroll = _usePage.onScroll
            val offScroll = _usePage.offScroll
            val visible = ref(false)
            val bottom = computed(fun(): String {
                var h: Number = 20
                if (hasCustomTabBar()) {
                    h += getTabBarHeight()
                } else {
                    h += clFooterOffset.get()
                }
                return h + "px"
            }
            )
            val isPage = computed(fun(): Boolean {
                return props.top == null
            }
            )
            fun gen_onVisible_fn(top: Number) {
                visible.value = top > screenHeight - 100
            }
            val onVisible = ::gen_onVisible_fn
            fun gen_toTop_fn() {
                if (isPage.value) {
                    scrollToTop()
                }
                emit("backTop")
            }
            val toTop = ::gen_toTop_fn
            onMounted(fun(){
                if (isPage.value) {
                    onScroll(onVisible)
                } else {
                    watch(computed(fun(): Number {
                        return props.top!!
                    }
                    ), fun(top: Number){
                        onVisible(top)
                    }
                    , WatchOptions(immediate = true))
                }
            }
            )
            onUnmounted(fun(){
                if (isPage.value) {
                    offScroll(onVisible)
                }
            }
            )
            return fun(): Any? {
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                return _cE("view", _uM("class" to "cl-back-top-wrapper", "style" to _nS(_uM("bottom" to bottom.value)), "onClick" to toTop), _uA(
                    _cE("view", _uM("class" to _nC(_uA(
                        "cl-back-top",
                        _uM("is-show" to visible.value)
                    ))), _uA(
                        _cV(_component_cl_icon, _uM("name" to "skip-up-line", "color" to "white", "size" to "25px"))
                    ), 2)
                ), 4)
            }
        }
        var name = "cl-back-top"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-back-top" to _uM("" to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999, "backgroundColor" to "rgba(20,184,166,1)", "transitionDuration" to "300ms", "width" to 40, "height" to 40, "transitionProperty" to "transform", "transform" to "translateX(160rpx)"), ".is-show" to _uM("transform" to "translateX(-20px)")), "cl-back-top-wrapper" to _pS(_uM("position" to "fixed", "right" to 0, "zIndex" to 50, "overflow" to "visible")), "@TRANSITION" to _uM("cl-back-top" to _uM("duration" to "300ms", "property" to "transform")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("backTop" to null)
        var props = _nP(_uM("top" to _uM("type" to "Number", "default" to null)))
        var propsNeedCastKeys = _uA(
            "top"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
