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
open class GenUniModulesCoolUnixComponentsClTopbarClTopbar : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var title: String by `$props`
    open var color: String by `$props`
    open var backgroundColor: String by `$props`
    open var showBack: Boolean by `$props`
    open var backable: Boolean by `$props`
    open var backPath: String by `$props`
    open var backIcon: String by `$props`
    open var safeAreaTop: Boolean by `$props`
    open var fixed: Boolean by `$props`
    open var height: Any? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClTopbarClTopbar) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClTopbarClTopbar
            val _cache = __ins.renderCache
            val props = __props
            val pt = computed(fun(): PassThrough__8 {
                return parsePt<PassThrough__8>(props.pt)
            }
            )
            val offsetTop = computed(fun(): String {
                if (props.safeAreaTop) {
                    return getSafeAreaHeight("top") + "px"
                }
                return "0px"
            }
            )
            val height = computed(fun(): String {
                if (props.height == null) {
                    return "44px"
                }
                return parseRpx(props.height!!)
            }
            )
            val backgroundColor = computed(fun(): String {
                if (props.backgroundColor != "") {
                    return props.backgroundColor
                }
                val style = router.route()!!.style
                if (style != null) {
                    if (style["navigationBarBackgroundColor"] != null) {
                        return style["navigationBarBackgroundColor"] as String
                    }
                }
                return ""
            }
            )
            val color = computed(fun(): String {
                if (props.color != "") {
                    return props.color
                }
                val style = router.route()!!.style
                if (style != null) {
                    if (style["navigationBarTextStyle"] != null) {
                        return style["navigationBarTextStyle"] as String
                    }
                }
                return ""
            }
            )
            val topbarStyle = computed(fun(): UTSJSONObject {
                val style: UTSJSONObject = object : UTSJSONObject(UTSSourceMapPosition("style", "uni_modules/cool-unix/components/cl-topbar/cl-topbar.uvue", 186, 8)) {
                    var paddingTop = offsetTop.value
                }
                if (pt.value.className == null || !pt.value.className!!.includes("bg-")) {
                    style["backgroundColor"] = backgroundColor.value
                }
                return style
            }
            )
            fun gen_back_fn() {
                if (props.backable) {
                    if (props.backPath != "") {
                        router.to(props.backPath)
                    } else {
                        if (router.isFirstPage()) {
                            router.home()
                        } else {
                            router.back()
                        }
                    }
                }
            }
            val back = ::gen_back_fn
            return fun(): Any? {
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                return _cE(Fragment, null, _uA(
                    if (isTrue(_ctx.fixed)) {
                        _cE("view", _uM("key" to 0, "class" to "cl-topbar-placeholder", "style" to _nS(_uM("marginTop" to offsetTop.value, "height" to height.value))), null, 4)
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cE("view", _uM("class" to _nC(_uA(
                        "cl-topbar",
                        _uA(
                            _uM<String, Any?>(),
                            _uM("cl-topbar--fixed" to _ctx.fixed),
                            pt.value.className
                        )
                    )), "style" to _nS(topbarStyle.value)), _uA(
                        _cE("view", _uM("class" to "cl-topbar__inner", "style" to _nS(_uM("height" to height.value))), _uA(
                            _cE("view", _uM("class" to "cl-topbar__prepend"), _uA(
                                if (isTrue(_ctx.showBack)) {
                                    _cE("view", _uM("key" to 0, "class" to "cl-topbar__icon", "onClick" to fun(){
                                        back()
                                    }), _uA(
                                        _cV(_component_cl_icon, _uM("pt" to object : UTSJSONObject() {
                                            var className = unref(parseClass)(_uA(
                                                _uA(
                                                    !_ctx.backable,
                                                    "opacity-50"
                                                ),
                                                pt.value.back?.className
                                            ))
                                        }, "name" to _ctx.backIcon, "size" to (pt.value.back?.size ?: 48), "color" to (pt.value.back?.color ?: color.value)), null, 8, _uA(
                                            "pt",
                                            "name",
                                            "size",
                                            "color"
                                        ))
                                    ), 8, _uA(
                                        "onClick"
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                renderSlot(_ctx.`$slots`, "prepend")
                            )),
                            _cE("view", _uM("class" to "cl-topbar__content"), _uA(
                                renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        _cV(_component_cl_text, _uM("color" to color.value, "pt" to object : UTSJSONObject() {
                                            var className = unref(parseClass)(_uA(
                                                "text-md",
                                                pt.value.title?.className
                                            ))
                                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _tD(_ctx.title)
                                            )
                                        }
                                        ), "_" to 1), 8, _uA(
                                            "color",
                                            "pt"
                                        ))
                                    )
                                }
                                )
                            )),
                            _cE("view", _uM("class" to "cl-topbar__append"), _uA(
                                renderSlot(_ctx.`$slots`, "append")
                            ))
                        ), 4)
                    ), 6)
                ), 64)
            }
        }
        var name = "cl-topbar"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-topbar__inner" to _pS(_uM("display" to "flex", "width" to "100%", "flexDirection" to "row", "alignItems" to "center")), "cl-topbar__icon" to _pS(_uM("display" to "flex", "height" to "100%", "alignItems" to "center", "justifyContent" to "center", "width" to 30)), "cl-topbar__prepend" to _pS(_uM("position" to "absolute", "left" to 0, "top" to 0, "zIndex" to 10, "display" to "flex", "height" to "100%", "flexDirection" to "row", "alignItems" to "center", "marginLeft" to 3)), "cl-topbar__content" to _pS(_uM("display" to "flex", "height" to "100%", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "cl-topbar__append" to _pS(_uM("position" to "absolute", "right" to 0, "top" to 0, "zIndex" to 10, "display" to "flex", "height" to "100%", "flexDirection" to "row", "alignItems" to "center", "marginRight" to 3)), "cl-topbar--fixed" to _pS(_uM("position" to "fixed", "top" to 0, "left" to 0, "right" to 0, "width" to "100%", "zIndex" to 998)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "title" to _uM("type" to "String", "default" to ""), "color" to _uM("type" to "String", "default" to ""), "backgroundColor" to _uM("type" to "String", "default" to ""), "showBack" to _uM("type" to "Boolean", "default" to true), "backable" to _uM("type" to "Boolean", "default" to true), "backPath" to _uM("type" to "String", "default" to ""), "backIcon" to _uM("type" to "String", "default" to "back"), "safeAreaTop" to _uM("type" to "Boolean", "default" to false), "fixed" to _uM("type" to "Boolean", "default" to false), "height" to _uM("default" to null)))
        var propsNeedCastKeys = _uA(
            "pt",
            "title",
            "color",
            "backgroundColor",
            "showBack",
            "backable",
            "backPath",
            "backIcon",
            "safeAreaTop",
            "fixed",
            "height"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
