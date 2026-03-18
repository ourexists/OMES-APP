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
import io.dcloud.uniapp.extapi.createSelectorQuery as uni_createSelectorQuery
open class GenUniModulesCoolUnixComponentsClFooterClFooter : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var minHeight: Number by `$props`
    open var vt: Number by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClFooterClFooter) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClFooterClFooter
            val _cache = __ins.renderCache
            val props = __props
            val proxy = getCurrentInstance()!!.proxy
            val pt = computed(fun(): PassThrough__12 {
                return parsePt<PassThrough__12>(props.pt)
            }
            )
            val height = ref(0)
            val visible = ref(true)
            fun gen_getHeight_fn() {
                nextTick(fun(){
                    setTimeout(fun(){
                        uni_createSelectorQuery().`in`(proxy).select(".cl-footer").boundingClientRect(fun(res){
                            val h = Math.floor((res as NodeInfo).height ?: 0)
                            height.value = h
                            visible.value = h > props.minHeight + getSafeAreaHeight("bottom")
                            clFooterOffset.set(if (visible.value) {
                                h
                            } else {
                                0
                            }
                            )
                        }
                        ).exec()
                    }
                    , if (isHarmony()) {
                        50
                    } else {
                        0
                    }
                    )
                }
                )
            }
            val getHeight = ::gen_getHeight_fn
            onMounted(fun(){
                watch(computed(fun(): Number {
                    return props.vt
                }
                ), fun(){
                    visible.value = true
                    getHeight()
                }
                , WatchOptions(immediate = true))
            }
            )
            return fun(): Any? {
                return _cE(Fragment, null, _uA(
                    if (isTrue(visible.value)) {
                        _cE("view", _uM("key" to 0, "class" to "cl-footer-placeholder", "style" to _nS(_uM("height" to (height.value + "px")))), null, 4)
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cE("view", _uM("class" to _nC(_uA(
                        "cl-footer-wrapper",
                        _uA(
                            _uM<String, Any?>(),
                            pt.value.wrapper?.className
                        )
                    ))), _uA(
                        if (isTrue(visible.value)) {
                            _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                "cl-footer",
                                _uA(
                                    _uM<String, Any?>(),
                                    _uM("is-dark" to unref(isDark)),
                                    pt.value.className
                                )
                            ))), _uA(
                                _cE("view", _uM("class" to _nC(_uA(
                                    "cl-footer__content",
                                    _uA(
                                        _uM<String, Any?>(),
                                        pt.value.content?.className
                                    )
                                ))), _uA(
                                    renderSlot(_ctx.`$slots`, "default")
                                ), 2)
                            ), 2)
                        } else {
                            _cC("v-if", true)
                        }
                    ), 2)
                ), 64)
            }
        }
        var name = "cl-footer"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-footer" to _uM("" to _uM("overflow" to "visible", "backgroundColor" to "rgba(255,255,255,1)", "paddingBottom" to "env(safe-area-inset-bottom)"), ".is-dark" to _uM("backgroundColor" to "rgba(24,24,27,1)")), "cl-footer__content" to _pS(_uM("overflow" to "visible", "paddingLeft" to "21rpx", "paddingRight" to "21rpx", "paddingTop" to "21rpx", "paddingBottom" to "21rpx")), "cl-footer-wrapper" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "width" to "100%", "overflow" to "visible")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "minHeight" to _uM("type" to "Number", "default" to 30), "vt" to _uM("type" to "Number", "default" to 0)))
        var propsNeedCastKeys = _uA(
            "pt",
            "minHeight",
            "vt"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
