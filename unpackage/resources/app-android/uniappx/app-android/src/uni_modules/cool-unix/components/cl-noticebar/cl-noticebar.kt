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
import io.dcloud.uniapp.extapi.getWindowInfo as uni_getWindowInfo
open class GenUniModulesCoolUnixComponentsClNoticebarClNoticebar : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var text: Any? by `$props`
    open var direction: String by `$props`
    open var duration: Number by `$props`
    open var speed: Number by `$props`
    open var height: Any? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClNoticebarClNoticebar) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClNoticebarClNoticebar
            val _cache = __ins.renderCache
            val props = __props
            val proxy = getCurrentInstance()!!.proxy
            val windowWidth = uni_getWindowInfo().windowWidth
            val pt = computed(fun(): PassThrough__13 {
                return parsePt<PassThrough__13>(props.pt)
            }
            )
            val scroll = reactive<Scroll>(Scroll(left = windowWidth, top = 0, translateX = 0, duration = 0))
            var timer: Number = 0
            val list = computed<UTSArray<String>>(fun(): UTSArray<String> {
                return if (UTSArray.isArray(props.text)) {
                    (props.text as UTSArray<String>)
                } else {
                    _uA(
                        props.text as String
                    )
                }
            }
            )
            val scrollerStyle = computed(fun(): UTSJSONObject {
                val style: UTSJSONObject = UTSJSONObject()
                if (props.direction == "horizontal") {
                    style["left"] = "" + scroll.left + "px"
                    style["transform"] = "translateX(-" + scroll.translateX + "px)"
                    style["transition-duration"] = "" + scroll.duration + "ms"
                } else {
                    style["transform"] = "translateY(" + scroll.top + "px)"
                }
                return style
            }
            )
            fun gen_clear_fn(): Unit {
                if (timer != 0) {
                    clearInterval(timer)
                    clearTimeout(timer)
                    timer = 0
                }
            }
            val clear = ::gen_clear_fn
            fun gen_refresh_fn() {
                clear()
                uni_createSelectorQuery().`in`(proxy).select(".cl-noticebar").boundingClientRect(fun(box){
                    val boxHeight = (box as NodeInfo).height ?: 0
                    val boxWidth = (box as NodeInfo).width ?: 0
                    uni_createSelectorQuery().`in`(proxy).select(".cl-noticebar__text").boundingClientRect(fun(text){
                        if (props.direction == "horizontal") {
                            val textWidth = (text as NodeInfo).width ?: 0
                            fun next() {
                                scroll.translateX = textWidth + boxWidth
                                scroll.duration = Math.ceil((scroll.translateX / props.speed) * 1000)
                                scroll.left = boxWidth
                                timer = setTimeout(fun(){
                                    scroll.translateX = 0
                                    scroll.duration = 0
                                    setTimeout(fun(){
                                        next()
                                    }, 100)
                                }, scroll.duration)
                            }
                            next()
                        } else {
                            timer = setInterval(fun(){
                                if (Math.abs(scroll.top) >= boxHeight * (list.value.length - 1)) {
                                    scroll.top = 0
                                } else {
                                    scroll.top -= boxHeight
                                }
                            }
                            , props.duration)
                        }
                    }
                    ).exec()
                }
                ).exec()
            }
            val refresh = ::gen_refresh_fn
            onMounted(fun(){
                watch(computed(fun(): Any {
                    return props.text!!
                }
                ), fun(){
                    refresh()
                }
                , WatchOptions(immediate = true))
            }
            )
            onUnmounted(fun(){
                clear()
            }
            )
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-noticebar",
                    _uA(
                        _uM<String, Any?>(),
                        pt.value.className
                    )
                )), "style" to _nS(_uM("height" to unref(parseRpx)(_ctx.height!!)))), _uA(
                    _cE("view", _uM("class" to _nC(_uA(
                        "cl-noticebar__scroller",
                        _uA(
                            _uM<String, Any?>(),
                            "is-" + _ctx.direction
                        )
                    )), "style" to _nS(scrollerStyle.value)), _uA(
                        _cE(Fragment, null, RenderHelpers.renderList(list.value, fun(item, index, __index, _cached): Any {
                            return _cE("view", _uM("key" to index, "class" to "cl-noticebar__item", "style" to _nS(_uM("height" to unref(parseRpx)(_ctx.height!!)))), _uA(
                                renderSlot(_ctx.`$slots`, "text", GenUniModulesCoolUnixComponentsClNoticebarClNoticebarSlotDataText(item = item), fun(): UTSArray<Any> {
                                    return _uA(
                                        _cE("view", _uM("class" to "cl-noticebar__text"), _uA(
                                            _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                                var className = unref(parseClass)(_uA(
                                                    "whitespace-nowrap",
                                                    pt.value.text?.className
                                                ))
                                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                return _uA(
                                                    _tD(item)
                                                )
                                            }
                                            ), "_" to 2), 1032, _uA(
                                                "pt"
                                            ))
                                        ))
                                    )
                                }
                                )
                            ), 4)
                        }
                        ), 128)
                    ), 6)
                ), 6)
            }
        }
        var name = "cl-noticebar"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-noticebar" to _pS(_uM("flexShrink" to 1)), "cl-noticebar__scroller" to _uM("" to _uM("display" to "flex", "transitionProperty" to "transform", "transitionTimingFunction" to "linear"), ".is-horizontal" to _uM("flexDirection" to "row", "overflow" to "visible"), ".is-vertical" to _uM("flexDirection" to "column", "transitionDuration" to "0.5s")), "cl-noticebar__item" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "@TRANSITION" to _uM("cl-noticebar__scroller" to _uM("property" to "transform", "timingFunction" to "linear", "duration" to "0.5s")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("close" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "text" to _uM("default" to ""), "direction" to _uM("type" to "String", "default" to "horizontal"), "duration" to _uM("type" to "Number", "default" to 3000), "speed" to _uM("type" to "Number", "default" to 100), "height" to _uM("default" to 40)))
        var propsNeedCastKeys = _uA(
            "pt",
            "text",
            "direction",
            "duration",
            "speed",
            "height"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
