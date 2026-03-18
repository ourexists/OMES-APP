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
open class GenUniModulesCoolUnixComponentsClLoadingClLoading : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var loading: Boolean by `$props`
    open var size: Any by `$props`
    open var color: String by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClLoadingClLoading) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClLoadingClLoading
            val _cache = __ins.renderCache
            val props = __props
            val getPx = useSize().getPx
            val pt = computed(fun(): PassThrough__4 {
                return parsePt<PassThrough__4>(props.pt)
            }
            )
            val loadingRef = shallowRef<UniElement?>(null)
            val color = computed<String>(fun(): String {
                if (props.color == "") {
                    return if (isDark.value) {
                        "#ffffff"
                    } else {
                        (ctx.color["surface-700"] as String)
                    }
                }
                when (props.color) {
                    "primary" -> 
                        return ctx.color["primary-500"] as String
                    "success" -> 
                        return "#22c55e"
                    "warn" -> 
                        return "#eab308"
                    "error" -> 
                        return "#ef4444"
                    "info" -> 
                        return "#71717a"
                    "dark" -> 
                        return "#3f3f46"
                    "light" -> 
                        return "#ffffff"
                    "disabled" -> 
                        return "#d4d4d8"
                    else -> 
                        return props.color
                }
            }
            )
            fun gen_start_fn(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        createAnimation(loadingRef.value, AnimationOptions(duration = 2500, loop = -1, timingFunction = "linear")).rotate("0deg", "360deg").play()
                })
            }
            val start = ::gen_start_fn
            onMounted(fun(){
                watch(computed(fun(): Boolean {
                    return props.loading
                }
                ), fun(kVal: Boolean){
                    if (kVal) {
                        start()
                    }
                }
                , WatchOptions(immediate = true))
            }
            )
            return fun(): Any? {
                return if (isTrue(_ctx.loading)) {
                    _cE("view", _uM("key" to 0, "ref_key" to "loadingRef", "ref" to loadingRef, "class" to _nC(_uA(
                        "cl-loading",
                        _uA(
                            _uM<String, Any?>(),
                            _uM("cl-loading--dark" to (unref(isDark) && color.value == ""), "-important-border-r-transparent" to true),
                            pt.value.className
                        )
                    )), "style" to _nS(_uM("height" to unref(getPx)(_ctx.size!!), "width" to unref(getPx)(_ctx.size!!), "borderWidth" to "1px", "borderTopColor" to color.value, "borderRightColor" to "transparent", "borderBottomColor" to color.value, "borderLeftColor" to color.value))), null, 6)
                } else {
                    _cC("v-if", true)
                }
            }
        }
        var name = "cl-loading"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-loading" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(63,63,70,1)", "borderRightColor" to "rgba(63,63,70,1)", "borderBottomColor" to "rgba(63,63,70,1)", "borderLeftColor" to "rgba(63,63,70,1)")), "cl-loading--dark" to _pS(_uM("!borderTopColor" to "#FFFFFF", "!borderRightColor" to "rgba(0,0,0,0)", "!borderBottomColor" to "#FFFFFF", "!borderLeftColor" to "#FFFFFF")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "loading" to _uM("type" to "Boolean", "default" to true), "size" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 24), "color" to _uM("type" to "String", "default" to "")))
        var propsNeedCastKeys = _uA(
            "pt",
            "loading",
            "size",
            "color"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
