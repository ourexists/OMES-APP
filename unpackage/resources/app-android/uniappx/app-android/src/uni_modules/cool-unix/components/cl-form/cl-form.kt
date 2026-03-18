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
open class GenUniModulesCoolUnixComponentsClFormClForm : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var modelValue: Any by `$props`
    open var rules: Map<String, UTSArray<ClFormRule>> by `$props`
    open var labelPosition: String by `$props`
    open var labelWidth: String by `$props`
    open var showAsterisk: Boolean by `$props`
    open var showMessage: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var scrollToError: Boolean by `$props`
    open var data: UTSJSONObject
        get() {
            return unref(this.`$exposed`["data"]) as UTSJSONObject
        }
        set(value) {
            setRefValue(this.`$exposed`, "data", value)
        }
    open var errors: Map<String, String>
        get() {
            return unref(this.`$exposed`["errors"]) as Map<String, String>
        }
        set(value) {
            setRefValue(this.`$exposed`, "errors", value)
        }
    open var fields: Set<String>
        get() {
            return unref(this.`$exposed`["fields"]) as Set<String>
        }
        set(value) {
            setRefValue(this.`$exposed`, "fields", value)
        }
    open var addField: (prop: String, rules: UTSArray<ClFormRule>) -> Unit
        get() {
            return unref(this.`$exposed`["addField"]) as (prop: String, rules: UTSArray<ClFormRule>) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "addField", value)
        }
    open var removeField: (prop: String) -> Unit
        get() {
            return unref(this.`$exposed`["removeField"]) as (prop: String) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "removeField", value)
        }
    open var getValue: (prop: String) -> Any?
        get() {
            return unref(this.`$exposed`["getValue"]) as (prop: String) -> Any?
        }
        set(value) {
            setRefValue(this.`$exposed`, "getValue", value)
        }
    open var setError: (prop: String, error: String) -> Unit
        get() {
            return unref(this.`$exposed`["setError"]) as (prop: String, error: String) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setError", value)
        }
    open var getError: (prop: String) -> String
        get() {
            return unref(this.`$exposed`["getError"]) as (prop: String) -> String
        }
        set(value) {
            setRefValue(this.`$exposed`, "getError", value)
        }
    open var getErrors: () -> UTSPromise<UTSArray<ClFormValidateError>>
        get() {
            return unref(this.`$exposed`["getErrors"]) as () -> UTSPromise<UTSArray<ClFormValidateError>>
        }
        set(value) {
            setRefValue(this.`$exposed`, "getErrors", value)
        }
    open var removeError: (prop: String) -> Unit
        get() {
            return unref(this.`$exposed`["removeError"]) as (prop: String) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "removeError", value)
        }
    open var clearErrors: () -> Unit
        get() {
            return unref(this.`$exposed`["clearErrors"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "clearErrors", value)
        }
    open var getRule: (prop: String) -> UTSArray<ClFormRule>
        get() {
            return unref(this.`$exposed`["getRule"]) as (prop: String) -> UTSArray<ClFormRule>
        }
        set(value) {
            setRefValue(this.`$exposed`, "getRule", value)
        }
    open var setRule: (prop: String, rules: UTSArray<ClFormRule>) -> Unit
        get() {
            return unref(this.`$exposed`["setRule"]) as (prop: String, rules: UTSArray<ClFormRule>) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setRule", value)
        }
    open var removeRule: (prop: String) -> Unit
        get() {
            return unref(this.`$exposed`["removeRule"]) as (prop: String) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "removeRule", value)
        }
    open var validateRule: (value: Any?, rule: ClFormRule) -> String?
        get() {
            return unref(this.`$exposed`["validateRule"]) as (value: Any?, rule: ClFormRule) -> String?
        }
        set(value) {
            setRefValue(this.`$exposed`, "validateRule", value)
        }
    open var clearValidate: () -> Unit
        get() {
            return unref(this.`$exposed`["clearValidate"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "clearValidate", value)
        }
    open var validateField: (prop: String) -> String?
        get() {
            return unref(this.`$exposed`["validateField"]) as (prop: String) -> String?
        }
        set(value) {
            setRefValue(this.`$exposed`, "validateField", value)
        }
    open var validate: (callback: (valid: Boolean, errors: UTSArray<ClFormValidateError>) -> Unit) -> UTSPromise<Unit>
        get() {
            return unref(this.`$exposed`["validate"]) as (callback: (valid: Boolean, errors: UTSArray<ClFormValidateError>) -> Unit) -> UTSPromise<Unit>
        }
        set(value) {
            setRefValue(this.`$exposed`, "validate", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClFormClForm, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClFormClForm
            val _cache = __ins.renderCache
            val props = __props
            val proxy = getCurrentInstance()!!.proxy
            val page = usePage()
            val pt = computed(fun(): PassThrough {
                return parsePt<PassThrough>(props.pt)
            }
            )
            val data = ref(UTSJSONObject())
            val errors = ref(Map<String, String>())
            val fields = ref(Set<String>(_uA()))
            val labelPosition = computed(fun(): String {
                return props.labelPosition
            }
            )
            val labelWidth = computed(fun(): String {
                return props.labelWidth
            }
            )
            val showAsterisk = computed(fun(): Boolean {
                return props.showAsterisk
            }
            )
            val showMessage = computed(fun(): Boolean {
                return props.showMessage
            }
            )
            val disabled = computed(fun(): Boolean {
                return props.disabled
            }
            )
            val errorLock = ref(false)
            fun gen_setError_fn(prop: String, error: String) {
                if (errorLock.value) {
                    return
                }
                if (prop != "") {
                    errors.value.set(prop, error)
                }
            }
            val setError = ::gen_setError_fn
            fun gen_removeError_fn(prop: String) {
                if (prop != "") {
                    errors.value.`delete`(prop)
                }
            }
            val removeError = ::gen_removeError_fn
            fun gen_getError_fn(prop: String): String {
                if (prop != "") {
                    return errors.value.get(prop) ?: ""
                }
                return ""
            }
            val getError = ::gen_getError_fn
            fun gen_getErrors_fn(): UTSPromise<UTSArray<ClFormValidateError>> {
                return wrapUTSPromise(suspend w1@{
                        return@w1 UTSPromise(fun(resolve, _reject){
                            val errs = _uA<ClFormValidateError>()
                            val tops = Map<String, Number>()
                            fun done() {
                                tops.forEach(fun(top, prop){
                                    errs.push(ClFormValidateError(field = prop, message = getError(prop)))
                                }
                                )
                                if (props.scrollToError && errs.length > 0) {
                                    page.scrollTo((tops.get(errs[0].field) ?: 0) + page.getScrollTop())
                                }
                                resolve(errs)
                            }
                            if (errors.value.size == 0) {
                                done()
                                return
                            }
                            nextTick(fun(){
                                var component = proxy
                                uni_createSelectorQuery().`in`(component).selectAll(".cl-form-item--error").boundingClientRect(fun(res){
                                    (res as UTSArray<NodeInfo>).map(fun(e){
                                        tops.set((e.id ?: "").replace("cl-form-item-", ""), e.top ?: 0)
                                    }
                                    )
                                    done()
                                }
                                ).exec()
                            }
                            )
                        }
                        )
                })
            }
            val getErrors = ::gen_getErrors_fn
            fun gen_clearErrors_fn() {
                errors.value.clear()
            }
            val clearErrors = ::gen_clearErrors_fn
            fun gen_getValue_fn(prop: String): Any? {
                if (prop != "") {
                    return get(data.value, prop, null)
                }
                return null
            }
            val getValue = ::gen_getValue_fn
            fun gen_getRule_fn(prop: String): UTSArray<ClFormRule> {
                return props.rules.get(prop) ?: (_uA<ClFormRule>())
            }
            val getRule = ::gen_getRule_fn
            fun gen_setRule_fn(prop: String, rules: UTSArray<ClFormRule>) {
                if (prop != "" && !isEmpty(rules)) {
                    props.rules.set(prop, rules)
                }
            }
            val setRule = ::gen_setRule_fn
            fun gen_removeRule_fn(prop: String) {
                if (prop != "") {
                    props.rules.`delete`(prop)
                }
            }
            val removeRule = ::gen_removeRule_fn
            fun gen_addField_fn(prop: String, rules: UTSArray<ClFormRule>) {
                if (prop != "") {
                    fields.value.add(prop)
                    setRule(prop, rules)
                }
            }
            val addField = ::gen_addField_fn
            fun gen_removeField_fn(prop: String) {
                if (prop != "") {
                    fields.value.`delete`(prop)
                    removeRule(prop)
                    removeError(prop)
                }
            }
            val removeField = ::gen_removeField_fn
            fun gen_validateRule_fn(value: Any?, rule: ClFormRule): String? {
                if (rule.required == true) {
                    if (value == null || (value == "" && isString(value)) || (UTSArray.isArray(value) && (value as UTSArray<Any>).length == 0)) {
                        return rule.message ?: t("此字段为必填项")
                    }
                }
                if ((value == null || (value == "" && isString(value))) && rule.required != true) {
                    return null
                }
                if (rule.min != null) {
                    if (UTSAndroid.`typeof`(value) == "number") {
                        if ((value as Number) < rule.min!!) {
                            return rule.message ?: `$t`("最小值为{min}", object : UTSJSONObject() {
                                var min = rule.min!!
                            })
                        }
                    } else {
                        val len = if (UTSArray.isArray(value)) {
                            (value as UTSArray<Any>).length
                        } else {
                            ("" + value).length
                        }
                        if (len < rule.min!!) {
                            return rule.message ?: `$t`("最少需要{min}个字符", object : UTSJSONObject() {
                                var min = rule.min!!
                            })
                        }
                    }
                }
                if (rule.max != null) {
                    if (UTSAndroid.`typeof`(value) == "number") {
                        if (value as Number > rule.max!!) {
                            return rule.message ?: `$t`("最大值为{max}", object : UTSJSONObject() {
                                var max = rule.max!!
                            })
                        }
                    } else {
                        val len = if (UTSArray.isArray(value)) {
                            (value as UTSArray<Any>).length
                        } else {
                            ("" + value).length
                        }
                        if (len > rule.max!!) {
                            return rule.message ?: `$t`("最多允许{max}个字符", object : UTSJSONObject() {
                                var max = rule.max!!
                            })
                        }
                    }
                }
                if (rule.pattern != null) {
                    if (!rule.pattern!!.test("" + value)) {
                        return rule.message ?: t("格式不正确")
                    }
                }
                if (rule.validator != null) {
                    val result = rule.validator!!(value)
                    if (result != true) {
                        return if (UTSAndroid.`typeof`(result) == "string") {
                            result as String
                        } else {
                            (rule.message ?: t("验证失败"))
                        }
                    }
                }
                return null
            }
            val validateRule = ::gen_validateRule_fn
            fun gen_clearValidate_fn() {
                errorLock.value = true
                nextTick(fun(){
                    clearErrors()
                    errorLock.value = false
                }
                )
            }
            val clearValidate = ::gen_clearValidate_fn
            fun gen_validateField_fn(prop: String): String? {
                var error = null as String?
                if (prop != "") {
                    val value = getValue(prop)
                    val rules = getRule(prop)
                    if (!isEmpty(rules)) {
                        rules.find(fun(rule): Boolean {
                            val msg = validateRule(value, rule)
                            if (msg != null) {
                                error = msg
                                return true
                            }
                            return false
                        }
                        )
                    }
                    removeError(prop)
                }
                if (error != null) {
                    setError(prop, error!!)
                }
                return error
            }
            val validateField = ::gen_validateField_fn
            fun gen_validate_fn(callback: (valid: Boolean, errors: UTSArray<ClFormValidateError>) -> Unit): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        fields.value.forEach(fun(prop){
                            validateField(prop)
                        }
                        )
                        val errs = await(getErrors())
                        callback(errs.length == 0, errs)
                })
            }
            val validate = ::gen_validate_fn
            watch(computed(fun(): UTSJSONObject {
                return parseToObject(props.modelValue)
            }
            ), fun(kVal: UTSJSONObject){
                data.value = kVal
            }
            , WatchOptions(immediate = true, deep = true))
            __expose(_uM("labelPosition" to labelPosition, "labelWidth" to labelWidth, "showAsterisk" to showAsterisk, "showMessage" to showMessage, "disabled" to disabled, "data" to data, "errors" to errors, "fields" to fields, "addField" to addField, "removeField" to removeField, "getValue" to getValue, "setError" to setError, "getError" to getError, "getErrors" to getErrors, "removeError" to removeError, "clearErrors" to clearErrors, "getRule" to getRule, "setRule" to setRule, "removeRule" to removeRule, "validateRule" to validateRule, "clearValidate" to clearValidate, "validateField" to validateField, "validate" to validate))
            return fun(): Any? {
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-form",
                    _uA(
                        _uM<String, Any?>(),
                        "cl-form--label-" + labelPosition.value,
                        _uM("cl-form--disabled" to disabled.value),
                        pt.value.className
                    )
                ))), _uA(
                    renderSlot(_ctx.`$slots`, "default")
                ), 2)
            }
        }
        var name = "cl-form"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-form" to _pS(_uM("width" to "100%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "modelValue" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "rules" to _uM("type" to "Object", "default" to fun(): Map<String, UTSArray<ClFormRule>> {
            return Map<String, UTSArray<ClFormRule>>()
        }
        ), "labelPosition" to _uM("type" to "String", "default" to "top"), "labelWidth" to _uM("type" to "String", "default" to "140rpx"), "showAsterisk" to _uM("type" to "Boolean", "default" to true), "showMessage" to _uM("type" to "Boolean", "default" to true), "disabled" to _uM("type" to "Boolean", "default" to false), "scrollToError" to _uM("type" to "Boolean", "default" to true)))
        var propsNeedCastKeys = _uA(
            "pt",
            "modelValue",
            "rules",
            "labelPosition",
            "labelWidth",
            "showAsterisk",
            "showMessage",
            "disabled",
            "scrollToError"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
