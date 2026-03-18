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
open class GenUniModulesCoolUnixComponentsClEmptyClEmpty : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var text: String by `$props`
    open var icon: String by `$props`
    open var iconSize: Any by `$props`
    open var showIcon: Boolean by `$props`
    open var fixed: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClEmptyClEmpty) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClEmptyClEmpty
            val _cache = __ins.renderCache
            val props = __props
            val pt = computed(fun(): PassThrough__10 {
                return parsePt<PassThrough__10>(props.pt)
            }
            )
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-empty",
                    _uA(
                        _uM<String, Any?>(),
                        _uM("cl-empty--fixed" to _ctx.fixed),
                        pt.value.className
                    )
                ))), _uA(
                    if (isTrue(_ctx.showIcon)) {
                        _cE("image", _uM("key" to 0, "class" to "cl-empty__icon", "src" to ("/static/empty/" + _ctx.icon + ".png"), "style" to _nS(_uM("height" to unref(parseRpx)(_ctx.iconSize))), "mode" to "aspectFit"), null, 12, _uA(
                            "src"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(_ctx.text)) {
                        _cV(_component_cl_text, _uM("key" to 1, "pt" to object : UTSJSONObject() {
                            var className = unref(parseClass)(_uA(
                                "cl-empty__text text-sm text-surface-400",
                                object : UTSJSONObject() {
                                    var `text-surface-100` = unref(isDark)
                                }
                            ))
                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _tD(_ctx.text)
                            )
                        }), "_" to 1), 8, _uA(
                            "pt"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                ), 2)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-empty" to _pS(_uM("display" to "flex", "height" to "100%", "width" to "100%", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "pointerEvents" to "none")), "cl-empty--fixed" to _pS(_uM("position" to "fixed", "top" to 0, "left" to 0, "zIndex" to -1)), "cl-empty__icon" to _pS(_uM("marginBottom" to "20rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "text" to _uM("type" to "String", "default" to fun(): String {
            return t("暂无数据")
        }
        ), "icon" to _uM("type" to "String", "default" to "comm"), "iconSize" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 120), "showIcon" to _uM("type" to "Boolean", "default" to true), "fixed" to _uM("type" to "Boolean", "default" to true)))
        var propsNeedCastKeys = _uA(
            "pt",
            "text",
            "icon",
            "iconSize",
            "showIcon",
            "fixed"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
