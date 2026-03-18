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
open class GenUniModulesCoolUnixComponentsClListClList : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var list: UTSArray<ClListItem> by `$props`
    open var title: String by `$props`
    open var border: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClListClList) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClListClList
            val _cache = __ins.renderCache
            val props = __props
            val pt = computed(fun(): PassThrough__17 {
                return parsePt<PassThrough__17>(props.pt)
            }
            )
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_list_item = resolveEasyComponent("cl-list-item", GenUniModulesCoolUnixComponentsClListItemClListItemClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-list dark-colon--important-border-surface-700",
                    _uA(
                        _uM<String, Any?>(),
                        _uM("cl-list--border" to _ctx.border),
                        pt.value.className
                    )
                ))), _uA(
                    renderSlot(_ctx.`$slots`, "header", UTSJSONObject(), fun(): UTSArray<Any> {
                        return _uA(
                            if (_ctx.title != "") {
                                _cE("text", _uM("key" to 0, "class" to "cl-list__title"), _tD(_ctx.title), 1)
                            } else {
                                _cC("v-if", true)
                            }
                        )
                    }
                    ),
                    _cE("view", _uM("class" to "cl-list__items"), _uA(
                        _cE(Fragment, null, RenderHelpers.renderList(_ctx.list, fun(item, index, __index, _cached): Any {
                            return _cE("view", _uM("key" to index), _uA(
                                _cV(_component_cl_list_item, _uM("icon" to item.icon, "label" to item.label, "arrow" to item.arrow, "hoverable" to item.hoverable, "pt" to object : UTSJSONObject() {
                                    var className = "bg-white dark-colon--important-bg-surface-700 " + pt.value.item?.className
                                    var inner = pt.value.item?.inner
                                    var label = pt.value.item?.label
                                    var content = pt.value.item?.content
                                    var icon = pt.value.item?.icon
                                }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        renderSlot(_ctx.`$slots`, "item", GenUniModulesCoolUnixComponentsClListClListSlotDataItem(item = item), fun(): UTSArray<Any> {
                                            return _uA(
                                                _cV(_component_cl_text, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                    return _uA(
                                                        _tD(item.content)
                                                    )
                                                }
                                                ), "_" to 2), 1024)
                                            )
                                        }
                                        )
                                    )
                                }
                                ), "_" to 2), 1032, _uA(
                                    "icon",
                                    "label",
                                    "arrow",
                                    "hoverable",
                                    "pt"
                                )),
                                if (index != _ctx.list.length - 1) {
                                    _cE("view", _uM("key" to 0, "class" to "cl-list__line"), _uA(
                                        _cE("view", _uM("class" to "cl-list__line-inner"))
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                            ))
                        }
                        ), 128),
                        renderSlot(_ctx.`$slots`, "default")
                    ))
                ), 2)
            }
        }
        var name = "cl-list"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-list" to _pS(_uM("transitionDuration" to "200ms", "transitionProperty" to "borderColor,backgroundColor")), "cl-list__title" to _pS(_uM("paddingBottom" to "14rpx", "fontSize" to "24.5rpx", "lineHeight" to "35rpx", "color" to "rgba(113,113,122,1)", "paddingLeft" to "24rpx")), "cl-list__items" to _pS(_uM("overflow" to "hidden", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx")), "cl-list__line" to _pS(_uM("paddingTop" to 0, "paddingRight" to "24rpx", "paddingBottom" to 0, "paddingLeft" to "24rpx")), "cl-list__line-inner" to _pS(_uM("width" to "100%", "backgroundColor" to "rgba(250,250,250,1)", "height" to "1rpx")), "cl-list--border" to _pS(_uM("borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(228,228,231,1)", "borderRightColor" to "rgba(228,228,231,1)", "borderBottomColor" to "rgba(228,228,231,1)", "borderLeftColor" to "rgba(228,228,231,1)")), "@TRANSITION" to _uM("cl-list" to _uM("duration" to "200ms", "property" to "borderColor,backgroundColor")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "list" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "title" to _uM("type" to "String", "default" to ""), "border" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "pt",
            "list",
            "title",
            "border"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
