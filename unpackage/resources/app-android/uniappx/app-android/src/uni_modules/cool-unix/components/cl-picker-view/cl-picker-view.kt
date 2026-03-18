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
open class GenUniModulesCoolUnixComponentsClPickerViewClPickerView : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var headers: UTSArray<String> by `$props`
    open var value: UTSArray<Number> by `$props`
    open var columns: UTSArray<UTSArray<ClSelectOption>> by `$props`
    open var itemHeight: Number by `$props`
    open var height: Number by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClPickerViewClPickerView) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClPickerViewClPickerView
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val windowWidth = uni_getWindowInfo().windowWidth
            val headers = computed(fun(): UTSArray<String> {
                return props.headers.slice(0, props.columns.length)
            }
            )
            val maskStyle = computed(fun(): String {
                if (isDark.value) {
                    if (isAppIOS()) {
                        return "background-color: rgba(0, 0, 0, 0);"
                    }
                    return "background-image: linear-gradient(\n\t\t\t180deg,\n\t\t\trgba(0, 0, 0, 0),\n\t\t\trgba(0, 0, 0, 0)\n\t\t)"
                }
                return ""
            }
            )
            val indicatorStyle = computed(fun(): String {
                val width = ((windowWidth - rpx2px(20)) / props.columns.length - rpx2px(2) - 8).toFixed(0)
                var str = ""
                val style: UTSJSONObject = object : UTSJSONObject() {
                    var height = "" + props.itemHeight + "px"
                    var width = "" + width + "px"
                    var left = "4px"
                    var backgroundColor = "rgba(10, 10, 10, 0.04)"
                    var borderRadius = "10px"
                    var border = "1rpx solid rgba(10, 10, 10, 0.2)"
                }
                if (isDark.value) {
                    style["backgroundColor"] = "rgba(0, 0, 0, 0.1)"
                    style["border"] = "1rpx solid rgba(255, 255, 255, 0.3)"
                }
                forInObject(style, fun(value, key){
                    str += "" + key + ": " + value + ";"
                }
                )
                return str
            }
            )
            fun gen_onChange_fn(e: UniPickerViewChangeEvent) {
                val indexs = e.detail.value
                indexs.forEach(fun(v, i, arr){
                    if (i < props.columns.length) {
                        val n = props.columns[i].length
                        if (v >= n) {
                            arr[i] = n - 1
                        }
                    }
                }
                )
                if (isEqual(indexs, props.value)) {
                    return
                }
                val values = props.columns.map(fun(c, i): Any {
                    return if (isNull(c[indexs[i]])) {
                        0
                    } else {
                        c[indexs[i]].value
                    }
                }
                )
                emit("change-value", values)
                emit("change-index", indexs)
            }
            val onChange = ::gen_onChange_fn
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_picker_view_column = resolveComponent("picker-view-column")
                val _component_picker_view = resolveComponent("picker-view")
                return _cE("view", _uM("class" to "cl-picker-view"), _uA(
                    if (headers.value.length > 0) {
                        _cE("view", _uM("key" to 0, "class" to "cl-picker-view__header"), _uA(
                            _cE(Fragment, null, RenderHelpers.renderList(headers.value, fun(label, index, __index, _cached): Any {
                                return _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                    var className = "flex-1 text-sm text-center"
                                }, "key" to index), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(label)
                                    )
                                }), "_" to 2), 1024)
                            }), 128)
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cE("view", _uM("class" to "px--bracket-start-10rpx-bracket-end-", "style" to _nS(_uM("height" to unref(parseRpx)(_ctx.height)))), _uA(
                        _cV(_component_picker_view, _uM("class" to "h-full", "value" to _ctx.value, "mask-style" to maskStyle.value, "mask-top-style" to maskStyle.value, "mask-bottom-style" to maskStyle.value, "indicator-style" to indicatorStyle.value, "onChange" to onChange), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(_ctx.columns, fun(column, columnIndex, __index, _cached): Any {
                                    return _cV(_component_picker_view_column, _uM("class" to "cl-select-popup__column", "key" to columnIndex), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE(Fragment, null, RenderHelpers.renderList(column, fun(item, index, __index, _cached): Any {
                                                return _cE("view", _uM("class" to "cl-picker-view__item", "style" to _nS(_uM("height" to ("" + _ctx.itemHeight + "px"))), "key" to index), _uA(
                                                    _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                                        var className = unref(parseClass)(_uA(
                                                            _uA(
                                                                unref(isDark),
                                                                "text-surface-500"
                                                            ),
                                                            _uA(
                                                                unref(isDark) && index == _ctx.value[columnIndex],
                                                                "text-white"
                                                            )
                                                        ))
                                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                        return _uA(
                                                            _tD(item.label)
                                                        )
                                                    }
                                                    ), "_" to 2), 1032, _uA(
                                                        "pt"
                                                    ))
                                                ), 4)
                                            }
                                            ), 128)
                                        )
                                    }
                                    ), "_" to 2), 1024)
                                }
                                ), 128)
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "value",
                            "mask-style",
                            "mask-top-style",
                            "mask-bottom-style",
                            "indicator-style"
                        ))
                    ), 4)
                ))
            }
        }
        var name = "cl-select-picker-view"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-picker-view" to _pS(_uM("height" to "100%", "width" to "100%")), "cl-picker-view__header" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "paddingTop" to "28rpx", "paddingBottom" to "28rpx")), "cl-picker-view__item" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("change-value" to null, "change-index" to null)
        var props = _nP(_uM("headers" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "value" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "columns" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "itemHeight" to _uM("type" to "Number", "default" to if (isAppIOS()) {
            50
        } else {
            42
        }
        ), "height" to _uM("type" to "Number", "default" to 600)))
        var propsNeedCastKeys = _uA(
            "headers",
            "value",
            "columns",
            "itemHeight",
            "height"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
