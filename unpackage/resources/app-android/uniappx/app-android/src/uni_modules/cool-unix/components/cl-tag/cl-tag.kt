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
open class GenUniModulesCoolUnixComponentsClTagClTag : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var type: String by `$props`
    open var icon: String by `$props`
    open var rounded: Boolean by `$props`
    open var closable: Boolean by `$props`
    open var plain: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClTagClTag) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClTagClTag
            val _cache = __ins.renderCache
            val props = __props
            fun emits(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val pt = computed(fun(): PassThrough__22 {
                return parsePt<PassThrough__22>(props.pt)
            }
            )
            val isHide = ref(false)
            fun gen_close_fn() {
                isHide.value = true
                emits("close")
            }
            val close = ::gen_close_fn
            val color = computed(fun(): String {
                if (isDark.value && props.type == "info") {
                    return "white"
                }
                if (props.plain) {
                    return props.type
                } else {
                    return "white"
                }
            }
            )
            return fun(): Any? {
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                return if (isTrue(!isHide.value)) {
                    _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                        "cl-tag",
                        _uA(
                            _uM<String, Any?>(),
                            "cl-tag--" + _ctx.type,
                            _uM("cl-tag--rounded" to _ctx.rounded, "cl-tag--plain" to _ctx.plain, "is-dark" to unref(isDark)),
                            pt.value.className
                        )
                    ))), _uA(
                        if (_ctx.icon != "") {
                            _cV(_component_cl_icon, _uM("key" to 0, "name" to _ctx.icon, "size" to 28, "color" to "white", "pt" to object : UTSJSONObject() {
                                var className = "mr-1 ml--bracket-start--4rpx-bracket-end-"
                            }), null, 8, _uA(
                                "name"
                            ))
                        } else {
                            _cC("v-if", true)
                        },
                        _cV(_component_cl_text, _uM("color" to color.value, "pt" to object : UTSJSONObject() {
                            var className = unref(parseClass)(_uA(
                                "cl-tag__text text-sm",
                                pt.value.text?.className
                            ))
                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                renderSlot(_ctx.`$slots`, "default")
                            )
                        }), "_" to 3), 8, _uA(
                            "color",
                            "pt"
                        )),
                        if (isTrue(_ctx.closable)) {
                            _cV(_component_cl_icon, _uM("key" to 1, "name" to "close-circle-line", "size" to 28, "color" to "white", "pt" to object : UTSJSONObject() {
                                var className = "ml-1 mr--bracket-start--4rpx-bracket-end-"
                            }, "onClick" to close))
                        } else {
                            _cC("v-if", true)
                        }
                    ), 2)
                } else {
                    _cC("v-if", true)
                }
            }
        }
        var name = "cl-tag"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-tag" to _uM("" to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to "10.5rpx", "borderTopRightRadius" to "10.5rpx", "borderBottomRightRadius" to "10.5rpx", "borderBottomLeftRadius" to "10.5rpx", "paddingLeft" to "21rpx", "paddingRight" to "21rpx", "paddingTop" to "7rpx", "paddingBottom" to "7rpx", "transitionDuration" to "0.2s", "transitionProperty" to "backgroundColor,borderColor"), ".cl-tag+" to _uM("marginLeft" to "14rpx")), "cl-tag__text" to _pS(_uM("fontSize" to "24.5rpx", "lineHeight" to "35rpx")), "cl-tag--rounded" to _pS(_uM("borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999)), "cl-tag--primary" to _pS(_uM("backgroundColor" to "rgba(20,184,166,1)")), "cl-tag--success" to _pS(_uM("backgroundColor" to "rgba(34,197,94,1)")), "cl-tag--warn" to _pS(_uM("backgroundColor" to "rgba(234,179,8,1)")), "cl-tag--error" to _pS(_uM("backgroundColor" to "rgba(239,68,68,1)")), "cl-tag--info" to _pS(_uM("backgroundColor" to "rgba(113,113,122,1)")), "cl-tag--plain" to _uM("" to _uM("backgroundColor" to "rgba(0,0,0,0)", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)"), ".cl-tag--primary" to _uM("borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)"), ".cl-tag--success" to _uM("borderTopColor" to "rgba(34,197,94,1)", "borderRightColor" to "rgba(34,197,94,1)", "borderBottomColor" to "rgba(34,197,94,1)", "borderLeftColor" to "rgba(34,197,94,1)"), ".cl-tag--warn" to _uM("borderTopColor" to "rgba(234,179,8,1)", "borderRightColor" to "rgba(234,179,8,1)", "borderBottomColor" to "rgba(234,179,8,1)", "borderLeftColor" to "rgba(234,179,8,1)"), ".cl-tag--error" to _uM("borderTopColor" to "rgba(239,68,68,1)", "borderRightColor" to "rgba(239,68,68,1)", "borderBottomColor" to "rgba(239,68,68,1)", "borderLeftColor" to "rgba(239,68,68,1)"), ".cl-tag--info" to _uM("borderTopColor" to "rgba(113,113,122,1)", "borderRightColor" to "rgba(113,113,122,1)", "borderBottomColor" to "rgba(113,113,122,1)", "borderLeftColor" to "rgba(113,113,122,1)"), ".cl-tag--info.is-dark" to _uM("borderTopColor" to "rgba(212,212,216,1)", "borderRightColor" to "rgba(212,212,216,1)", "borderBottomColor" to "rgba(212,212,216,1)", "borderLeftColor" to "rgba(212,212,216,1)")), "@TRANSITION" to _uM("cl-tag" to _uM("duration" to "0.2s", "property" to "backgroundColor,borderColor")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("close" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "type" to _uM("type" to "String", "default" to "primary"), "icon" to _uM("type" to "String", "default" to ""), "rounded" to _uM("type" to "Boolean", "default" to false), "closable" to _uM("type" to "Boolean", "default" to false), "plain" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "pt",
            "type",
            "icon",
            "rounded",
            "closable",
            "plain"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
