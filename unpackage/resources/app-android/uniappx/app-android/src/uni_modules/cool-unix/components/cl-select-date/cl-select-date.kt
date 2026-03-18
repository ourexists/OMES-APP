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
open class GenUniModulesCoolUnixComponentsClSelectDateClSelectDate : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var modelValue: String by `$props`
    open var values: UTSArray<String> by `$props`
    open var headers: UTSArray<String> by `$props`
    open var title: String by `$props`
    open var placeholder: String by `$props`
    open var showTrigger: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var confirmText: String by `$props`
    open var showConfirm: Boolean by `$props`
    open var cancelText: String by `$props`
    open var showCancel: Boolean by `$props`
    open var labelFormat: String by `$props`
    open var valueFormat: String by `$props`
    open var start: String by `$props`
    open var end: String by `$props`
    open var type: String by `$props`
    open var rangeable: Boolean by `$props`
    open var startPlaceholder: String by `$props`
    open var endPlaceholder: String by `$props`
    open var rangeSeparator: String by `$props`
    open var showShortcuts: Boolean by `$props`
    open var shortcuts: UTSArray<ClSelectDateShortcut> by `$props`
    open fun open(cb: ((value: Any) -> Unit)? = null) {
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
    open var clear: () -> Unit
        get() {
            return unref(this.`$exposed`["clear"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "clear", value)
        }
    open var confirm: () -> Unit
        get() {
            return unref(this.`$exposed`["confirm"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "confirm", value)
        }
    open var setValue: (kVal: String) -> Unit
        get() {
            return unref(this.`$exposed`["setValue"]) as (kVal: String) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setValue", value)
        }
    open var setValues: (kVal: UTSArray<String>) -> Unit
        get() {
            return unref(this.`$exposed`["setValues"]) as (kVal: UTSArray<String>) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setValues", value)
        }
    open var setRange: (index: Number) -> Unit
        get() {
            return unref(this.`$exposed`["setRange"]) as (index: Number) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setRange", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClSelectDateClSelectDate, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClSelectDateClSelectDate
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val ui = useUi()
            val popupRef = ref<ClPopupComponentPublicInstance?>(null)
            val pt = computed(fun(): PassThrough__23 {
                return parsePt<PassThrough__23>(props.pt)
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
            val formatType = computed(fun(): String {
                when (props.type) {
                    "year" -> 
                        return "YYYY"
                    "month" -> 
                        return "YYYY-MM"
                    "date" -> 
                        return "YYYY-MM-DD"
                    "hour", "minute", "second" -> 
                        return "YYYY-MM-DD HH:mm:ss"
                    else -> 
                        return "YYYY-MM-DD HH:mm:ss"
                }
            }
            )
            val labelFormat = computed(fun(): String {
                if (isNull(props.labelFormat) || isEmpty(props.labelFormat)) {
                    return formatType.value
                }
                return props.labelFormat
            }
            )
            val valueFormat = computed(fun(): String {
                if (isNull(props.valueFormat) || isEmpty(props.valueFormat)) {
                    return formatType.value
                }
                return props.valueFormat
            }
            )
            val shortcutsIndex = ref<Number>(-1)
            val shortcuts = computed<UTSArray<ClSelectDateShortcut>>(fun(): UTSArray<ClSelectDateShortcut> {
                if (!isEmpty(props.shortcuts)) {
                    return props.shortcuts
                }
                return _uA(
                    ClSelectDateShortcut(label = t("今天"), value = _uA(
                        dayUts().format(valueFormat.value),
                        dayUts().format(valueFormat.value)
                    )),
                    ClSelectDateShortcut(label = t("近7天"), value = _uA(
                        dayUts().subtract(7, "day").format(valueFormat.value),
                        dayUts().format(valueFormat.value)
                    )),
                    ClSelectDateShortcut(label = t("近30天"), value = _uA(
                        dayUts().subtract(30, "day").format(valueFormat.value),
                        dayUts().format(valueFormat.value)
                    )),
                    ClSelectDateShortcut(label = t("近90天"), value = _uA(
                        dayUts().subtract(90, "day").format(valueFormat.value),
                        dayUts().format(valueFormat.value)
                    )),
                    ClSelectDateShortcut(label = t("近一年"), value = _uA(
                        dayUts().subtract(1, "year").format(valueFormat.value),
                        dayUts().format(valueFormat.value)
                    ))
                )
            }
            )
            val rangeIndex = ref<Number>(0)
            val values = ref(_uA<String>("", ""))
            val value = ref(_uA<Number>())
            val start = computed(fun(): String {
                if (props.rangeable) {
                    if (rangeIndex.value == 0) {
                        return props.start
                    } else {
                        return values.value[0]
                    }
                } else {
                    return props.start
                }
            }
            )
            val list = computed(fun(): UTSArray<UTSArray<ClSelectOption>> {
                val _dayUts_toArray = dayUts(start.value).toArray()
                val startYear = _dayUts_toArray[0]
                val startMonth = _dayUts_toArray[1]
                val startDate = _dayUts_toArray[2]
                val startHour = _dayUts_toArray[3]
                val startMinute = _dayUts_toArray[4]
                val startSecond = _dayUts_toArray[5]
                val _dayUts_toArray__1 = dayUts(props.end).toArray()
                val endYear = _dayUts_toArray__1[0]
                val endMonth = _dayUts_toArray__1[1]
                val endDate = _dayUts_toArray__1[2]
                val endHour = _dayUts_toArray__1[3]
                val endMinute = _dayUts_toArray__1[4]
                val endSecond = _dayUts_toArray__1[5]
                val arr = _uA<UTSArray<ClSelectOption>>(_uA(), _uA(), _uA(), _uA(), _uA(), _uA())
                if (isEmpty(value.value)) {
                    return arr
                }
                val _value_value = value.value
                val year = _value_value[0]
                val month = _value_value[1]
                val date = _value_value[2]
                val hour = _value_value[3]
                val minute = _value_value[4]
                val isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
                val days = _uA(
                    31,
                    if (isLeapYear) {
                        29
                    } else {
                        28
                    }
                    ,
                    31,
                    30,
                    31,
                    30,
                    31,
                    31,
                    30,
                    31,
                    30,
                    31
                )[if (month > 0) {
                    month - 1
                } else {
                    0
                }
                ]
                val yearRange = Math.max(60, endYear - startYear + 1)
                run {
                    var i: Number = 0
                    while(i < yearRange){
                        val yearNum = startYear + i
                        if (yearNum <= endYear) {
                            arr[0].push(ClSelectOption(label = yearNum.toString(10), value = yearNum))
                        }
                        var monthNum = if (startYear == year) {
                            startMonth + i
                        } else {
                            i + 1
                        }
                        var endMonthNum = if (endYear == year) {
                            endMonth
                        } else {
                            12
                        }
                        if (monthNum <= endMonthNum) {
                            arr[1].push(ClSelectOption(label = monthNum.toString(10).padStart(2, "0"), value = monthNum))
                        }
                        var dateNum = if (startYear == year && startMonth == month) {
                            startDate + i
                        } else {
                            i + 1
                        }
                        var endDateNum = if (endYear == year && endMonth == month) {
                            endDate
                        } else {
                            days
                        }
                        if (dateNum <= endDateNum) {
                            arr[2].push(ClSelectOption(label = dateNum.toString(10).padStart(2, "0"), value = dateNum))
                        }
                        var hourNum = if (startYear == year && startMonth == month && startDate == date) {
                            startHour + i
                        } else {
                            i
                        }
                        var endHourNum = if (endYear == year && endMonth == month && endDate == date) {
                            endHour
                        } else {
                            24
                        }
                        if (hourNum < endHourNum) {
                            arr[3].push(ClSelectOption(label = hourNum.toString(10).padStart(2, "0"), value = hourNum))
                        }
                        var minuteNum = if (startYear == year && startMonth == month && startDate == date && startHour == hour) {
                            startMinute + i
                        } else {
                            i
                        }
                        var endMinuteNum = if (endYear == year && endMonth == month && endDate == date && endHour == hour) {
                            endMinute
                        } else {
                            60
                        }
                        if (minuteNum < endMinuteNum) {
                            arr[4].push(ClSelectOption(label = minuteNum.toString(10).padStart(2, "0"), value = minuteNum))
                        }
                        var secondNum = if (startYear == year && startMonth == month && startDate == date && startHour == hour && startMinute == minute) {
                            startSecond + i
                        } else {
                            i
                        }
                        var endSecondNum = if (endYear == year && endMonth == month && endDate == date && endHour == hour && endMinute == minute) {
                            endSecond
                        } else {
                            60
                        }
                        if (secondNum < endSecondNum) {
                            arr[5].push(ClSelectOption(label = secondNum.toString(10).padStart(2, "0"), value = secondNum))
                        }
                        i++
                    }
                }
                return arr
            }
            )
            val columnNum = computed(fun(): Number {
                return (_uA(
                    "year",
                    "month",
                    "date",
                    "hour",
                    "minute",
                    "second"
                ).findIndex(fun(e): Boolean {
                    return e == props.type
                }
                ) + 1)
            }
            )
            val columns = computed(fun(): UTSArray<UTSArray<ClSelectOption>> {
                return list.value.slice(0, columnNum.value)
            }
            )
            val indexes = computed(fun(): UTSArray<Number> {
                if (isEmpty(value.value)) {
                    return _uA()
                }
                return value.value.map(fun(e, i): Number {
                    var index = list.value[i].findIndex(fun(a): Boolean {
                        return a.value == e
                    }
                    ) as Number
                    if (index == -1) {
                        index = list.value[i].length - 1
                    }
                    if (index < 0) {
                        index = 0
                    }
                    return index
                }
                )
            }
            )
            fun gen_toDate_fn(): String {
                val parts: UTSArray<String> = _uA()
                val units = _uA(
                    "",
                    "-",
                    "-",
                    " ",
                    ":",
                    ":"
                )
                val defaultValue: UTSArray<Number> = _uA(
                    2000,
                    1,
                    1,
                    0,
                    0,
                    0
                )
                units.forEach(fun(key, i){
                    var kVal = value.value[i]
                    if (i >= columnNum.value) {
                        kVal = defaultValue[i]
                    }
                    parts.push(key + kVal.toString(10).padStart(2, "0"))
                }
                )
                return parts.join("")
            }
            val toDate = ::gen_toDate_fn
            fun gen_checkDate_fn(values: UTSArray<Number>): UTSArray<Number> {
                if (values.length == 0) {
                    return values
                }
                val checkedValues = values.slice()
                val defaultValues: UTSArray<Number> = _uA(
                    2000,
                    1,
                    1,
                    0,
                    0,
                    0
                )
                run {
                    var i = checkedValues.length
                    while(i < 6){
                        checkedValues.push(defaultValues[i])
                        i++
                    }
                }
                var year = checkedValues[0]
                var month = checkedValues[1]
                var date = checkedValues[2]
                var hour = checkedValues[3]
                var minute = checkedValues[4]
                var second = checkedValues[5]
                val isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
                val daysInMonth = _uA(
                    31,
                    if (isLeapYear) {
                        29
                    } else {
                        28
                    }
                    ,
                    31,
                    30,
                    31,
                    30,
                    31,
                    31,
                    30,
                    31,
                    30,
                    31
                )
                val maxDay = daysInMonth[month - 1]
                if (date < 1) {
                    date = 1
                } else if (date > maxDay) {
                    date = maxDay
                }
                if (hour < 0) {
                    hour = 0
                } else if (hour > 23) {
                    hour = 23
                }
                if (minute < 0) {
                    minute = 0
                } else if (minute > 59) {
                    minute = 59
                }
                if (second < 0) {
                    second = 0
                } else if (second > 59) {
                    second = 59
                }
                return _uA(
                    year,
                    month,
                    date,
                    hour,
                    minute,
                    second
                )
            }
            val checkDate = ::gen_checkDate_fn
            val text = ref("")
            fun gen_updateText_fn() {
                if (props.rangeable) {
                    text.value = values.value.map(fun(e): String {
                        return dayUts(e).format(labelFormat.value)
                    }).join(" " + props.rangeSeparator + " ")
                } else {
                    text.value = dayUts(toDate()).format(labelFormat.value)
                }
            }
            val updateText = ::gen_updateText_fn
            fun gen_onChange_fn(data: UTSArray<Number>): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        value.value = checkDate(data)
                        if (dayUts(toDate()).isAfter(dayUts(props.end))) {
                            value.value = dayUts(props.end).toArray()
                        }
                        if (dayUts(toDate()).isBefore(dayUts(props.start))) {
                            value.value = dayUts(props.start).toArray()
                        }
                        if (props.rangeable) {
                            values.value[rangeIndex.value] = dayUts(toDate()).format(valueFormat.value)
                            if (dayUts(values.value[0]).isAfter(dayUts(values.value[1])) && values.value[1] != "") {
                                values.value[1] = values.value[0]
                            }
                            shortcutsIndex.value = -1
                        }
                })
            }
            val onChange = ::gen_onChange_fn
            fun gen_setValue_fn(kVal: String) {
                if (isNull(kVal) || isEmpty(kVal)) {
                    value.value = checkDate(dayUts().toArray())
                    text.value = ""
                } else {
                    value.value = checkDate(dayUts(kVal).toArray())
                    updateText()
                }
            }
            val setValue = ::gen_setValue_fn
            fun gen_setValues_fn(kVal: UTSArray<String>) {
                if (isEmpty(kVal)) {
                    values.value = _uA(
                        "",
                        ""
                    )
                    text.value = ""
                } else {
                    values.value = kVal
                    updateText()
                }
            }
            val setValues = ::gen_setValues_fn
            fun gen_setRange_fn(index: Number) {
                rangeIndex.value = index
                setValue(values.value[index])
            }
            val setRange = ::gen_setRange_fn
            fun gen_setRangeValue_fn(kVal: UTSArray<String>, index: Number) {
                shortcutsIndex.value = index
                values.value = kVal.slice() as UTSArray<String>
                setValue(kVal[rangeIndex.value])
            }
            val setRangeValue = ::gen_setRangeValue_fn
            val visible = ref(false)
            var callback: ((value: Any) -> Unit)? = null
            fun open(cb: ((value: Any) -> Unit)? = null) {
                if (props.disabled) {
                    return
                }
                visible.value = true
                callback = cb
                nextTick(fun(){
                    if (props.rangeable) {
                        rangeIndex.value = 0
                        setValues(props.values)
                        setValue(values.value[0])
                    } else {
                        setValue(props.modelValue)
                    }
                }
                )
            }
            fun gen_close_fn() {
                visible.value = false
            }
            val close = ::gen_close_fn
            fun gen_onClosed_fn() {
                values.value = _uA(
                    "",
                    ""
                )
            }
            val onClosed = ::gen_onClosed_fn
            fun gen_clear_fn() {
                text.value = ""
                if (props.rangeable) {
                    emit("update:values", _uA<String>())
                    emit("range-change", _uA<String>())
                } else {
                    emit("update:modelValue", "")
                    emit("change", "")
                }
            }
            val clear = ::gen_clear_fn
            fun gen_confirm_fn() {
                if (props.rangeable) {
                    val _values_value = values.value
                    val a = _values_value[0]
                    val b = _values_value[1]
                    if (a == "" || b == "") {
                        ui.showToast(ClToastOptions(message = t("请选择完整时间范围")))
                        if (a != "") {
                            rangeIndex.value = 1
                        }
                        return
                    }
                    if (dayUts(a).isAfter(dayUts(b))) {
                        ui.showToast(ClToastOptions(message = t("开始日期不能大于结束日期")))
                        return
                    }
                    emit("update:values", values.value)
                    emit("range-change", values.value)
                    if (callback != null) {
                        callback!!(values.value as UTSArray<String>)
                    }
                } else {
                    val kVal = dayUts(toDate()).format(valueFormat.value)
                    emit("update:modelValue", kVal)
                    emit("change", kVal)
                    if (callback != null) {
                        callback!!(kVal)
                    }
                }
                updateText()
                close()
            }
            val confirm = ::gen_confirm_fn
            watch(computed(fun(): String {
                return props.modelValue
            }
            ), fun(kVal: String){
                if (!props.rangeable) {
                    setValue(kVal)
                }
            }
            , WatchOptions(immediate = true))
            watch(computed(fun(): UTSArray<String> {
                return props.values
            }
            ), fun(kVal: UTSArray<String>){
                if (props.rangeable) {
                    setValues(kVal)
                }
            }
            , WatchOptions(immediate = true))
            watch(computed(fun(): String {
                return props.labelFormat
            }
            ), fun(){
                updateText()
            }
            )
            __expose(_uM("open" to ::open, "close" to close, "clear" to clear, "confirm" to confirm, "setValue" to setValue, "setValues" to setValues, "setRange" to setRange))
            return fun(): Any? {
                val _component_cl_select_trigger = resolveEasyComponent("cl-select-trigger", GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTriggerClass)
                val _component_cl_tag = resolveEasyComponent("cl-tag", GenUniModulesCoolUnixComponentsClTagClTagClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_picker_view = resolveEasyComponent("cl-picker-view", GenUniModulesCoolUnixComponentsClPickerViewClPickerViewClass)
                val _component_cl_button = resolveEasyComponent("cl-button", GenUniModulesCoolUnixComponentsClButtonClButtonClass)
                val _component_cl_popup = resolveEasyComponent("cl-popup", GenUniModulesCoolUnixComponentsClPopupClPopupClass)
                return _cE(Fragment, null, _uA(
                    if (isTrue(_ctx.showTrigger)) {
                        _cV(_component_cl_select_trigger, _uM("key" to 0, "pt" to ptTrigger.value, "placeholder" to _ctx.placeholder, "disabled" to _ctx.disabled, "focus" to popupRef.value?.isOpen, "text" to text.value, "arrow-icon" to "calendar-line", "onOpen" to fun(){
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
                    , "title" to _ctx.title, "pt" to ptPopup.value, "onClosed" to onClosed), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cE("view", _uM("class" to "cl-select-popup", "onTouchmove" to withModifiers(fun(){}, _uA(
                                "stop"
                            ))), _uA(
                                if (isTrue(_ctx.rangeable)) {
                                    _cE("view", _uM("key" to 0, "class" to "cl-select-popup__range"), _uA(
                                        if (isTrue(_ctx.showShortcuts)) {
                                            _cE("view", _uM("key" to 0, "class" to "cl-select-popup__range-shortcuts"), _uA(
                                                _cE(Fragment, null, RenderHelpers.renderList(shortcuts.value, fun(item, index, __index, _cached): Any {
                                                    return _cV(_component_cl_tag, _uM("key" to index, "plain" to "", "type" to if (shortcutsIndex.value == index) {
                                                        "primary"
                                                    } else {
                                                        "info"
                                                    }, "onClick" to fun(){
                                                        setRangeValue(item.value, index)
                                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                        return _uA(
                                                            _tD(item.label)
                                                        )
                                                    }), "_" to 2), 1032, _uA(
                                                        "type",
                                                        "onClick"
                                                    ))
                                                }), 128)
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        },
                                        _cE("view", _uM("class" to "cl-select-popup__range-values"), _uA(
                                            _cE("view", _uM("class" to _nC(_uA(
                                                "cl-select-popup__range-values-start",
                                                _uM("is-dark" to unref(isDark), "active" to (rangeIndex.value == 0))
                                            )), "onClick" to fun(){
                                                setRange(0)
                                            }), _uA(
                                                if (isTrue(values.value.length > 0 && values.value[0] != "")) {
                                                    _cV(_component_cl_text, _uM("key" to 0, "pt" to object : UTSJSONObject() {
                                                        var className = "text-center"
                                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                        return _uA(
                                                            _tD(values.value[0])
                                                        )
                                                    }), "_" to 1))
                                                } else {
                                                    _cV(_component_cl_text, _uM("key" to 1, "pt" to object : UTSJSONObject() {
                                                        var className = "text-center text-surface-400"
                                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                        return _uA(
                                                            _tD(_ctx.startPlaceholder)
                                                        )
                                                    }), "_" to 1))
                                                }
                                            ), 10, _uA(
                                                "onClick"
                                            )),
                                            _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                                var className = "mx-3"
                                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                return _uA(
                                                    _tD(_ctx.rangeSeparator)
                                                )
                                            }), "_" to 1)),
                                            _cE("view", _uM("class" to _nC(_uA(
                                                "cl-select-popup__range-values-end",
                                                _uM("is-dark" to unref(isDark), "active" to (rangeIndex.value == 1))
                                            )), "onClick" to fun(){
                                                setRange(1)
                                            }), _uA(
                                                if (isTrue(values.value.length > 1 && values.value[1] != "")) {
                                                    _cV(_component_cl_text, _uM("key" to 0, "pt" to object : UTSJSONObject() {
                                                        var className = "text-center"
                                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                        return _uA(
                                                            _tD(values.value[1])
                                                        )
                                                    }), "_" to 1))
                                                } else {
                                                    _cV(_component_cl_text, _uM("key" to 1, "pt" to object : UTSJSONObject() {
                                                        var className = "text-center text-surface-400"
                                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                        return _uA(
                                                            _tD(_ctx.endPlaceholder)
                                                        )
                                                    }), "_" to 1))
                                                }
                                            ), 10, _uA(
                                                "onClick"
                                            ))
                                        ))
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                _cE("view", _uM("class" to "cl-select-popup__picker"), _uA(
                                    _cV(_component_cl_picker_view, _uM("headers" to _ctx.headers, "value" to indexes.value, "columns" to columns.value, "reset-on-change" to false, "onChangeValue" to onChange), null, 8, _uA(
                                        "headers",
                                        "value",
                                        "columns"
                                    ))
                                )),
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
                                    if (isTrue(_ctx.showConfirm)) {
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
                    ), "_" to 1), 8, _uA(
                        "modelValue",
                        "onUpdate:modelValue",
                        "title",
                        "pt"
                    ))
                ), 64)
            }
        }
        var name = "cl-select-date"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-select-popup__op" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "cl-select-popup__range" to _pS(_uM("paddingLeft" to "21rpx", "paddingRight" to "21rpx", "paddingTop" to "14rpx", "paddingBottom" to "35rpx")), "cl-select-popup__range-values" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center")), "cl-select-popup__range-values-start" to _uM("" to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(228,228,231,1)", "borderRightColor" to "rgba(228,228,231,1)", "borderBottomColor" to "rgba(228,228,231,1)", "borderLeftColor" to "rgba(228,228,231,1)", "backgroundColor" to "rgba(250,250,250,1)", "paddingTop" to "14rpx", "paddingBottom" to "14rpx"), ".is-dark" to _uM("borderTopColor" to "rgba(113,113,122,1)", "borderRightColor" to "rgba(113,113,122,1)", "borderBottomColor" to "rgba(113,113,122,1)", "borderLeftColor" to "rgba(113,113,122,1)", "backgroundColor" to "rgba(63,63,70,1)"), ".active" to _uM("borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)", "backgroundColor" to "rgba(0,0,0,0)")), "cl-select-popup__range-values-end" to _uM("" to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(228,228,231,1)", "borderRightColor" to "rgba(228,228,231,1)", "borderBottomColor" to "rgba(228,228,231,1)", "borderLeftColor" to "rgba(228,228,231,1)", "backgroundColor" to "rgba(250,250,250,1)", "paddingTop" to "14rpx", "paddingBottom" to "14rpx"), ".is-dark" to _uM("borderTopColor" to "rgba(113,113,122,1)", "borderRightColor" to "rgba(113,113,122,1)", "borderBottomColor" to "rgba(113,113,122,1)", "borderLeftColor" to "rgba(113,113,122,1)", "backgroundColor" to "rgba(63,63,70,1)"), ".active" to _uM("borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)", "backgroundColor" to "rgba(0,0,0,0)")), "cl-select-popup__range-shortcuts" to _pS(_uM("marginBottom" to "28rpx", "display" to "flex", "flexDirection" to "row", "flexWrap" to "wrap", "alignItems" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("update:modelValue" to null, "change" to null, "update:values" to null, "range-change" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "modelValue" to _uM("type" to "String", "default" to ""), "values" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "headers" to _uM("type" to "Array", "default" to fun(): UTSArray<String> {
            return _uA(
                t("年"),
                t("月"),
                t("日"),
                t("时"),
                t("分"),
                t("秒")
            )
        }
        ), "title" to _uM("type" to "String", "default" to fun(): String {
            return t("请选择")
        }
        ), "placeholder" to _uM("type" to "String", "default" to fun(): String {
            return t("请选择")
        }
        ), "showTrigger" to _uM("type" to "Boolean", "default" to true), "disabled" to _uM("type" to "Boolean", "default" to false), "confirmText" to _uM("type" to "String", "default" to fun(): String {
            return t("确定")
        }
        ), "showConfirm" to _uM("type" to "Boolean", "default" to true), "cancelText" to _uM("type" to "String", "default" to fun(): String {
            return t("取消")
        }
        ), "showCancel" to _uM("type" to "Boolean", "default" to true), "labelFormat" to _uM("type" to "String", "default" to ""), "valueFormat" to _uM("type" to "String", "default" to ""), "start" to _uM("type" to "String", "default" to config.startDate), "end" to _uM("type" to "String", "default" to config.endDate), "type" to _uM("type" to "String", "default" to "second"), "rangeable" to _uM("type" to "Boolean", "default" to false), "startPlaceholder" to _uM("type" to "String", "default" to fun(): String {
            return t("开始日期")
        }
        ), "endPlaceholder" to _uM("type" to "String", "default" to fun(): String {
            return t("结束日期")
        }
        ), "rangeSeparator" to _uM("type" to "String", "default" to fun(): String {
            return t(" 至 ")
        }
        ), "showShortcuts" to _uM("type" to "Boolean", "default" to true), "shortcuts" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        )))
        var propsNeedCastKeys = _uA(
            "pt",
            "modelValue",
            "values",
            "headers",
            "title",
            "placeholder",
            "showTrigger",
            "disabled",
            "confirmText",
            "showConfirm",
            "cancelText",
            "showCancel",
            "labelFormat",
            "valueFormat",
            "start",
            "end",
            "type",
            "rangeable",
            "startPlaceholder",
            "endPlaceholder",
            "rangeSeparator",
            "showShortcuts",
            "shortcuts"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
