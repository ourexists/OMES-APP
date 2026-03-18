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
open class GenUniModulesCoolUnixComponentsClSelectClSelect : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var modelValue: Any? by `$props`
    open var title: String by `$props`
    open var placeholder: String by `$props`
    open var options: UTSArray<ClSelectOption> by `$props`
    open var showTrigger: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var columnCount: Number by `$props`
    open var splitor: String by `$props`
    open var confirmText: String by `$props`
    open var showConfirm: Boolean by `$props`
    open var cancelText: String by `$props`
    open var showCancel: Boolean by `$props`
    open fun open(cb: ((value: ClSelectValue) -> Unit)? = null) {
        callKotlinFunction(this.`$exposed`["open"]!!, _uA(
            cb
        ))
    }
    open var close: () -> Unit
        get() {
            return unref(this.`$exposed`["close"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "close", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClSelectClSelect, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClSelectClSelect
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val popupRef = ref<ClPopupComponentPublicInstance?>(null)
            val pt = computed(fun(): PassThrough__11 {
                return parsePt<PassThrough__11>(props.pt)
            }
            )
            val ptTrigger = computed(fun(): UTSJSONObject {
                return parseToObject(pt.value.trigger)
            }
            )
            val ptPopup = computed(fun(): UTSJSONObject {
                return parseToObject(pt.value.popup)
            }
            )
            val noOptions = computed(fun(): Boolean {
                return isEmpty(props.options)
            }
            )
            val value = ref(_uA<Any>())
            val indexes = ref(_uA<Number>())
            val columns = computed<UTSArray<UTSArray<ClSelectOption>>>(fun(): UTSArray<UTSArray<ClSelectOption>> {
                var options = props.options
                var columns = _uA<UTSArray<ClSelectOption>>()
                run {
                    var i: Number = 0
                    while(i < props.columnCount){
                        val column = options.slice()
                        val kVal = if (i >= value.value.length) {
                            null
                        } else {
                            value.value[i]
                        }
                        var item = options.find(fun(item): Boolean {
                            return item.value == kVal
                        }
                        )
                        if (item == null && !isEmpty(options)) {
                            item = options[0]
                        }
                        if (item?.children != null) {
                            options = item.children as UTSArray<ClSelectOption>
                        }
                        columns.push(column)
                        i++
                    }
                }
                return columns
            }
            )
            val text = ref("")
            fun gen_updateText_fn() {
                val kVal = props.modelValue
                if (kVal == null || isEmpty(kVal)) {
                    text.value = ""
                } else {
                    var arr: UTSArray<Any>
                    if (props.columnCount == 1) {
                        arr = _uA(
                            kVal
                        )
                    } else {
                        arr = kVal as UTSArray<Any>
                    }
                    text.value = arr.map(fun(e, i): String {
                        return columns.value[i].find(fun(a): Boolean {
                            return a.value == e
                        }
                        )?.label ?: ""
                    }
                    ).join(props.splitor)
                }
            }
            val updateText = ::gen_updateText_fn
            fun gen_getValue_fn(): Any {
                return if (props.columnCount == 1) {
                    value.value[0]
                } else {
                    value.value
                }
            }
            val getValue = ::gen_getValue_fn
            fun setValue(kVal: Any?) {
                var _value: UTSArray<Any>
                if (kVal == null) {
                    _value = _uA()
                } else if (UTSArray.isArray(kVal)) {
                    _value = (kVal as UTSArray<Any>).slice()
                } else {
                    _value = _uA(
                        kVal
                    )
                }
                var _indexes = _uA<Number>()
                run {
                    var i: Number = 0
                    while(i < props.columnCount){
                        val column = columns.value[i]
                        if (i >= _value.length) {
                            _indexes.push(0)
                            if (!isNull(column) && column.length > 0 && !isNull(column[0])) {
                                _value.push(column[0].value)
                            }
                        } else {
                            var index = column.findIndex(fun(e): Boolean {
                                return e.value == _value[i]
                            }
                            )
                            if (index < 0) {
                                index = 0
                            }
                            _indexes.push(index)
                        }
                        i++
                    }
                }
                value.value = _value
                indexes.value = _indexes
                updateText()
            }
            fun gen_onChange_fn(a: UTSArray<Number>) {
                val b = indexes.value.slice()
                var changed = false
                run {
                    var i: Number = 0
                    while(i < a.length){
                        if (changed) {
                            b[i] = 0
                        } else {
                            if (b[i] != a[i]) {
                                b[i] = a[i]
                                changed = true
                            }
                        }
                        i++
                    }
                }
                indexes.value = b
                value.value = b.map(fun(e, i): Any {
                    return if (isNull(columns.value[i][e])) {
                        0
                    } else {
                        columns.value[i][e].value
                    }
                }
                )
                emit("changing", getValue())
            }
            val onChange = ::gen_onChange_fn
            val visible = ref(false)
            var callback: ((value: ClSelectValue) -> Unit)? = null
            fun open(cb: ((value: ClSelectValue) -> Unit)? = null) {
                visible.value = true
                setValue(props.modelValue)
                callback = cb
            }
            fun gen_close_fn() {
                visible.value = false
            }
            val close = ::gen_close_fn
            fun gen_clear_fn() {
                text.value = ""
                if (props.columnCount == 1) {
                    emit("update:modelValue", null)
                    emit("change", null)
                } else {
                    emit("update:modelValue", _uA<Any>())
                    emit("change", _uA<Any>())
                }
            }
            val clear = ::gen_clear_fn
            fun gen_confirm_fn() {
                val kVal = getValue()
                emit("update:modelValue", kVal)
                emit("change", kVal)
                if (callback != null) {
                    callback!!(kVal)
                }
                close()
            }
            val confirm = ::gen_confirm_fn
            watch(computed(fun(): Any? {
                return props.modelValue
            }
            ), fun(kVal: ClSelectValue){
                setValue(kVal)
            }
            , WatchOptions(immediate = true))
            __expose(_uM("open" to ::open, "close" to close))
            return fun(): Any? {
                val _component_cl_select_trigger = resolveEasyComponent("cl-select-trigger", GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTriggerClass)
                val _component_cl_empty = resolveEasyComponent("cl-empty", GenUniModulesCoolUnixComponentsClEmptyClEmptyClass)
                val _component_cl_picker_view = resolveEasyComponent("cl-picker-view", GenUniModulesCoolUnixComponentsClPickerViewClPickerViewClass)
                val _component_cl_button = resolveEasyComponent("cl-button", GenUniModulesCoolUnixComponentsClButtonClButtonClass)
                val _component_cl_popup = resolveEasyComponent("cl-popup", GenUniModulesCoolUnixComponentsClPopupClPopupClass)
                return _cE(Fragment, null, _uA(
                    if (isTrue(_ctx.showTrigger)) {
                        _cV(_component_cl_select_trigger, _uM("key" to 0, "pt" to ptTrigger.value, "placeholder" to _ctx.placeholder, "disabled" to _ctx.disabled, "focus" to popupRef.value?.isOpen, "text" to text.value, "onOpen" to fun(){
                            open()
                        }, "onClear" to clear), null, 8, _uA(
                            "pt",
                            "placeholder",
                            "disabled",
                            "focus",
                            "text",
                            "onOpen"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cV(_component_cl_popup, _uM("ref_key" to "popupRef", "ref" to popupRef, "modelValue" to visible.value, "onUpdate:modelValue" to fun(`$event`: Boolean){
                        visible.value = `$event`
                    }
                    , "title" to _ctx.title, "pt" to ptPopup.value), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cE("view", _uM("class" to "cl-select-popup", "onTouchmove" to withModifiers(fun(){}, _uA(
                                "stop"
                            ))), _uA(
                                renderSlot(_ctx.`$slots`, "prepend"),
                                _cE("view", _uM("class" to "cl-select-popup__picker"), _uA(
                                    if (isTrue(noOptions.value)) {
                                        _cV(_component_cl_empty, _uM("key" to 0, "fixed" to false, "pt" to object : UTSJSONObject() {
                                            var className = "-important-h--bracket-start-600rpx-bracket-end-"
                                        }))
                                    } else {
                                        _cV(_component_cl_picker_view, _uM("key" to 1, "value" to indexes.value, "columns" to columns.value, "onChangeIndex" to onChange), null, 8, _uA(
                                            "value",
                                            "columns"
                                        ))
                                    }
                                )),
                                renderSlot(_ctx.`$slots`, "append"),
                                _cE("view", _uM("class" to "cl-select-popup__op"), _uA(
                                    if (isTrue(_ctx.showCancel)) {
                                        _cV(_component_cl_button, _uM("key" to 0, "size" to "large", "text" to "", "border" to "", "type" to "light", "pt" to object : UTSJSONObject() {
                                            var className = "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
                                        }, "onClick" to close), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _tD(_ctx.cancelText)
                                            )
                                        }), "_" to 1))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                    ,
                                    if (isTrue(_ctx.showConfirm && !noOptions.value)) {
                                        _cV(_component_cl_button, _uM("key" to 1, "size" to "large", "pt" to object : UTSJSONObject() {
                                            var className = "flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-"
                                        }, "onClick" to confirm), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _tD(_ctx.confirmText)
                                            )
                                        }), "_" to 1))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                ))
                            ), 40, _uA(
                                "onTouchmove"
                            ))
                        )
                    }
                    ), "_" to 3), 8, _uA(
                        "modelValue",
                        "onUpdate:modelValue",
                        "title",
                        "pt"
                    ))
                ), 64)
            }
        }
        var name = "cl-select"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-select-popup__op" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("update:modelValue" to null, "change" to null, "changing" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "modelValue" to _uM("default" to null), "title" to _uM("type" to "String", "default" to fun(): String {
            return t("请选择")
        }
        ), "placeholder" to _uM("type" to "String", "default" to fun(): String {
            return t("请选择")
        }
        ), "options" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "showTrigger" to _uM("type" to "Boolean", "default" to true), "disabled" to _uM("type" to "Boolean", "default" to false), "columnCount" to _uM("type" to "Number", "default" to 1), "splitor" to _uM("type" to "String", "default" to " - "), "confirmText" to _uM("type" to "String", "default" to fun(): String {
            return t("确定")
        }
        ), "showConfirm" to _uM("type" to "Boolean", "default" to true), "cancelText" to _uM("type" to "String", "default" to fun(): String {
            return t("取消")
        }
        ), "showCancel" to _uM("type" to "Boolean", "default" to true)))
        var propsNeedCastKeys = _uA(
            "pt",
            "modelValue",
            "title",
            "placeholder",
            "options",
            "showTrigger",
            "disabled",
            "columnCount",
            "splitor",
            "confirmText",
            "showConfirm",
            "cancelText",
            "showCancel"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
