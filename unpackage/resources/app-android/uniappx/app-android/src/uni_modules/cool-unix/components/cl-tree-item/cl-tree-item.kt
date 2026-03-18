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
open class GenUniModulesCoolUnixComponentsClTreeItemClTreeItem : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var item: ClTreeItem by `$props`
    open var level: Number by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClTreeItemClTreeItem) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClTreeItemClTreeItem
            val _cache = __ins.renderCache
            val props = __props
            val pt = computed(fun(): PassThrough__21 {
                return parsePt<PassThrough__21>(props.pt)
            }
            )
            val ClTree = useParent<ClTreeComponentPublicInstance>("cl-tree")
            val hasChildren = computed(fun(): Boolean {
                return props.item.children != null && props.item.children!!.length > 0
            }
            )
            val showCheckbox = computed(fun(): Boolean {
                if (ClTree == null) {
                    return false
                }
                return ClTree.checkable == true && ClTree.multiple == true
            }
            )
            val icon = computed(fun(): Any {
                if (ClTree == null) {
                    return ""
                }
                return if (props.item.isExpand == true) {
                    ClTree.expandIcon
                } else {
                    ClTree.icon
                }
            }
            )
            fun gen_toExpand_fn() {
                ClTree!!.setExpanded(props.item.id, !(props.item.isExpand ?: false))
            }
            val toExpand = ::gen_toExpand_fn
            fun gen_toChecked_fn() {
                if (props.item.disabled == true) {
                    return
                }
                ClTree!!.setChecked(props.item.id, !(props.item.isChecked ?: false))
            }
            val toChecked = ::gen_toChecked_fn
            val hover = ref(false)
            fun gen_onTouchStart_fn() {
                hover.value = true
                toExpand()
                if (ClTree != null) {
                    if (ClTree.checkable == true && ClTree.multiple != true && props.item.disabled != true) {
                        toChecked()
                    }
                }
            }
            val onTouchStart = ::gen_onTouchStart_fn
            fun gen_onTouchEnd_fn() {
                hover.value = false
            }
            val onTouchEnd = ::gen_onTouchEnd_fn
            return fun(): Any? {
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_tree_item = resolveEasyComponent("cl-tree-item", GenUniModulesCoolUnixComponentsClTreeItemClTreeItemClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-tree-item-wrapper",
                    _uA(
                        _uM<String, Any?>(),
                        pt.value.itemWrapper?.className
                    )
                ))), _uA(
                    _cE("view", _uM("class" to _nC(_uA(
                        "cl-tree-item",
                        _uA(
                            _uM<String, Any?>(),
                            _uM("is-expand" to hover.value, "is-dark" to unref(isDark), "is-checked" to (_ctx.item.isChecked == true && unref(ClTree)?.checkable == true && unref(ClTree)?.multiple == false), "is-half-checked" to _ctx.item.isHalfChecked, "is-disabled" to _ctx.item.disabled, "is-multiple" to unref(ClTree)?.multiple),
                            pt.value.item?.className,
                            if (_ctx.item.isChecked == true) {
                                pt.value.itemChecked?.className
                            } else {
                                ""
                            }
                        )
                    )), "style" to _nS(_uM("paddingLeft" to ("" + (_ctx.level * 50 + 16) + "rpx"))), "onTouchstart" to onTouchStart, "onTouchend" to onTouchEnd, "onTouchcancel" to onTouchEnd), _uA(
                        _cE("view", _uM("class" to _nC(_uA(
                            "cl-tree-item__expand",
                            _uA(
                                _uM<String, Any?>(),
                                pt.value.expand?.className
                            )
                        ))), _uA(
                            if (isTrue(hasChildren.value)) {
                                _cV(_component_cl_icon, _uM("key" to 0, "name" to icon.value, "size" to (pt.value.expandIcon?.size ?: 34), "color" to pt.value.expandIcon?.color, "pt" to object : UTSJSONObject() {
                                    var className = pt.value.expandIcon?.className
                                }), null, 8, _uA(
                                    "name",
                                    "size",
                                    "color",
                                    "pt"
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                        ), 2),
                        _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                            var className = unref(parseClass)(_uA(
                                "flex-1 mx-1",
                                pt.value.label?.className
                            ))
                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _tD(_ctx.item.label)
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "pt"
                        )),
                        if (isTrue(showCheckbox.value)) {
                            _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                "cl-tree-item__checkbox",
                                _uA(
                                    _uM<String, Any?>(),
                                    pt.value.checkbox?.className
                                )
                            )), "onTouchstart" to withModifiers(toChecked, _uA(
                                "stop"
                            ))), _uA(
                                if (isTrue(_ctx.item.isChecked)) {
                                    _cV(_component_cl_icon, _uM("key" to 0, "name" to (pt.value.checkedIcon?.name ?: "checkbox-circle-fill"), "size" to (pt.value.checkedIcon?.size ?: 38), "color" to (pt.value.checkedIcon?.color ?: "primary")), null, 8, _uA(
                                        "name",
                                        "size",
                                        "color"
                                    ))
                                } else {
                                    if (isTrue(_ctx.item.isHalfChecked)) {
                                        _cV(_component_cl_icon, _uM("key" to 1, "name" to (pt.value.halfCheckedIcon?.name ?: "indeterminate-circle-line"), "size" to (pt.value.halfCheckedIcon?.size ?: 38), "color" to (pt.value.halfCheckedIcon?.color ?: "primary")), null, 8, _uA(
                                            "name",
                                            "size",
                                            "color"
                                        ))
                                    } else {
                                        _cV(_component_cl_icon, _uM("key" to 2, "name" to (pt.value.uncheckedIcon?.name ?: "checkbox-blank-circle-line"), "size" to (pt.value.uncheckedIcon?.size ?: 38), "color" to (pt.value.uncheckedIcon?.color ?: "info")), null, 8, _uA(
                                            "name",
                                            "size",
                                            "color"
                                        ))
                                    }
                                }
                            ), 34)
                        } else {
                            _cC("v-if", true)
                        }
                    ), 38),
                    if (isTrue(hasChildren.value && _ctx.item.isExpand == true)) {
                        _cE(Fragment, _uM("key" to 0), RenderHelpers.renderList(_ctx.item.children, fun(item, __key, __index, _cached): Any {
                            return _cV(_component_cl_tree_item, _uM("key" to item.id, "item" to item, "level" to (_ctx.level + 1), "pt" to props.pt), null, 8, _uA(
                                "item",
                                "level",
                                "pt"
                            ))
                        }), 128)
                    } else {
                        _cC("v-if", true)
                    }
                ), 2)
            }
        }
        var name = "cl-tree-item"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-tree-item" to _uM("" to _uM("display" to "flex", "width" to "100%", "flexDirection" to "row", "alignItems" to "center", "borderTopLeftRadius" to "14rpx", "borderTopRightRadius" to "14rpx", "borderBottomRightRadius" to "14rpx", "borderBottomLeftRadius" to "14rpx", "paddingTop" to "16rpx", "paddingRight" to "16rpx", "paddingBottom" to "16rpx", "paddingLeft" to "16rpx"), ".is-expand" to _uM("backgroundColor" to "rgba(250,250,250,1)"), ".is-expand.is-dark" to _uM("backgroundColor" to "rgba(63,63,70,1)"), ".is-disabled" to _uM("opacity" to 0.5), ".is-checked" to _uM("backgroundColor" to "rgba(204,251,241,1)"), ".is-checked.is-multiple" to _uM("backgroundColor" to "rgba(0,0,0,0)"), ".is-checked.is-dark" to _uM("backgroundColor" to "rgba(20,184,166,1)")), "cl-tree-item__expand" to _pS(_uM("display" to "flex", "width" to "42rpx", "alignItems" to "center", "justifyContent" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "item" to _uM("type" to "Object", "default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "level" to _uM("type" to "Number", "default" to 0)))
        var propsNeedCastKeys = _uA(
            "pt",
            "item",
            "level"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
