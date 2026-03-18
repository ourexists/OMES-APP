@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI63FBDF4
import android.view.Choreographer
import android.view.Choreographer.FrameCallback
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
import kotlin.Long
import kotlin.properties.Delegates
import io.dcloud.uniapp.extapi.`$emit` as uni__emit
import io.dcloud.uniapp.extapi.clearStorageSync as uni_clearStorageSync
import io.dcloud.uniapp.extapi.getStorageInfoSync as uni_getStorageInfoSync
import io.dcloud.uniapp.extapi.getStorageSync as uni_getStorageSync
import io.dcloud.uniapp.extapi.getWindowInfo as uni_getWindowInfo
import io.dcloud.uniapp.extapi.hideLoading as uni_hideLoading
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.reLaunch as uni_reLaunch
import io.dcloud.uniapp.extapi.redirectTo as uni_redirectTo
import io.dcloud.uniapp.extapi.removeStorageSync as uni_removeStorageSync
import io.dcloud.uniapp.extapi.request as uni_request
import io.dcloud.uniapp.extapi.rpx2px as uni_rpx2px
import io.dcloud.uniapp.extapi.setStorageSync as uni_setStorageSync
import io.dcloud.uniapp.extapi.showLoading as uni_showLoading
import io.dcloud.uniapp.extapi.switchTab as uni_switchTab
val runBlock1 = run {
    __uniConfig.getAppStyles = fun(): Map<String, Map<String, Map<String, Any>>> {
        return GenApp.styles
    }
}
fun <T> useParent(name: String): T? {
    val proxy = getCurrentInstance()!!.proxy
    var p = proxy?.`$parent`
    while(p != null){
        if (p.`$options`.name == name) {
            return p as T?
        }
        p = p.`$parent`
    }
    return p as T?
}
val isMp = fun(): Boolean {
    return false
}
val isAppIOS = fun(): Boolean {
    return false
}
val isH5 = fun(): Boolean {
    return false
}
val isHarmony = fun(): Boolean {
    return false
}
fun isArray(value: Any): Boolean {
    return UTSArray.isArray(value)
}
fun isObject(value: Any): Boolean {
    return UTSAndroid.`typeof`(value) == "object" && !UTSArray.isArray(value) && !isNull(value)
}
fun isString(value: Any): Boolean {
    return UTSAndroid.`typeof`(value) == "string"
}
fun isFunction(value: Any): Boolean {
    return UTSAndroid.`typeof`(value) == "function"
}
fun isNull(value: Any?): Boolean {
    return value == null
}
fun isEmpty(value: Any): Boolean {
    if (isArray(value)) {
        return (value as UTSArray<Any>).length == 0
    }
    if (isString(value)) {
        return value == ""
    }
    if (isObject(value)) {
        return keys(value).length == 0
    }
    return false
}
fun keys(value: Any): UTSArray<String> {
    return UTSJSONObject.keys(value as UTSJSONObject)
}
fun <T> first(array: UTSArray<T>): T? {
    return if (isArray(array) && array.length > 0) {
        array[0]
    } else {
        null
    }
}
fun <T> last(array: UTSArray<T>): T? {
    return if (isArray(array) && array.length > 0) {
        array[array.length - 1]
    } else {
        null
    }
}
fun has(kObject: Any, key: String): Boolean {
    return keys(kObject).includes(key)
}
fun get(kObject: Any, path: String, defaultValue: Any? = null): Any? {
    if (isNull(kObject)) {
        return defaultValue
    }
    val value = UTSJSONObject(kObject).getAny(path)
    if (isNull(value)) {
        return defaultValue
    }
    return value
}
fun <T, U> map(array: UTSArray<T>, iteratee: (item: T, index: Number) -> U): UTSArray<U> {
    val result: UTSArray<U> = _uA()
    if (!isArray(array)) {
        return result
    }
    run {
        var i: Number = 0
        while(i < array.length){
            result.push(iteratee(array[i], i))
            i++
        }
    }
    return result
}
fun <T> nth(array: UTSArray<T>, index: Number): T? {
    if (index >= 0) {
        return array[index]
    }
    return array[array.length + index]
}
fun <T> forEach(data: UTSArray<T>, iteratee: (value: T, index: Number) -> Unit): Unit {
    if (isArray(data)) {
        val array = data as UTSArray<T>
        run {
            var i: Number = 0
            while(i < array.length){
                if (array[i] != null) {
                    iteratee(array[i], i)
                }
                i++
            }
        }
    }
}
fun forInObject(data: Any, iteratee: (value: Any, key: String) -> Unit): Unit {
    if (isObject(data)) {
        val objKeys = keys(data)
        run {
            var i: Number = 0
            while(i < objKeys.length){
                val key = objKeys[i]
                iteratee(get(data, key)!!, key)
                i++
            }
        }
    }
}
fun <T> toArray(data: Any, iteratee: (value: Any, key: String) -> T): UTSArray<T> {
    val result: UTSArray<T> = _uA()
    if (isObject(data)) {
        forInObject(data, fun(value, key){
            result.push(iteratee(value, key))
        }
        )
    }
    return result
}
fun debounce(func: () -> Unit, delay: Number): () -> Number {
    var timeoutId: Number = 0
    return fun(): Number {
        if (timeoutId != 0) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(fun(){
            func()
            timeoutId = 0
        }
        , delay)
        return timeoutId
    }
}
fun isEqual(a: Any, b: Any): Boolean {
    if (isObject(a) && isObject(b)) {
        return isEqual(JSON.stringify(a), JSON.stringify(b))
    } else if (isArray(a) && isArray(b)) {
        return isEqual(JSON.stringify(a), JSON.stringify(b))
    }
    return a == b
}
inline fun <reified T> parse(data: Any): T? {
    return (data as UTSJSONObject).parse<T>()
}
inline fun <reified T> parseObject(data: String): T? {
    return JSON.parseObject<T>(data)
}
inline fun <reified T> parsePt(data: Any): T {
    val genericTypeT = object : io.dcloud.uts.gson.reflect.TypeToken<T>() {
    }.type
    return (data as UTSJSONObject).parse<T>() ?: (UTSObject.toGenericType<T>(UTSJSONObject(), genericTypeT))
}
val parseClass = fun(data: Any): String {
    val names: UTSArray<String> = _uA()
    fun deep(d: Any) {
        if (isArray(d)) {
            forEach(d as UTSArray<Any>, fun(value: Any, _index){
                if (isString(value)) {
                    names.push(value as String)
                } else if (isArray(value)) {
                    val _ref = value as UTSArray<Any>
                    val a = _ref[0]
                    val b = _ref[1]
                    if (a as Boolean) {
                        names.push(b as String)
                    } else {
                        if (value.length > 2) {
                            names.push(value[2] as String)
                        }
                    }
                } else if (isObject(value)) {
                    deep(value)
                }
            }
            )
        }
        if (isObject(d)) {
            forInObject(d, fun(value, key){
                if (value == true && key != "") {
                    names.push(key.trim())
                }
            }
            )
        }
    }
    deep(data)
    return names.join(" ")
}
fun <T> parseToObject(data: T): UTSJSONObject {
    return JSON.parseObject(JSON.stringify(data ?: UTSJSONObject())!!)!!
}
val rpx2px = fun(rpx: Number): Number {
    var px: Number
    px = uni_rpx2px(rpx)
    return px
}
val parseRpx = fun(kVal: Any): String {
    if (UTSAndroid.`typeof`(kVal) == "number") {
        return (kVal as Number) + "rpx"
    }
    return kVal as String
}
val getNum = fun(kVal: String): Number {
    val match = kVal.match(UTSRegExp("-?\\d+(\\.\\d+)?", ""))
    return if (match != null) {
        parseFloat(match[0] ?: "0")
    } else {
        0
    }
}
val getUnit = fun(kVal: String): String {
    val num = getNum(kVal)
    return kVal.replace("" + num, "")
}
val getPx = fun(kVal: Any): Number {
    if (UTSAndroid.`typeof`(kVal) == "number") {
        return rpx2px(kVal as Number)
    }
    val num = getNum(kVal as String)
    val unit = getUnit(kVal as String)
    if (unit == "rpx") {
        return rpx2px(num)
    }
    return num
}
open class Config (
    open var fontSize: Number? = null,
    @JsonNotNull
    open var zIndex: Number,
    @JsonNotNull
    open var startDate: String,
    @JsonNotNull
    open var endDate: String,
    @JsonNotNull
    open var isCustomTabBar: Boolean = false,
    @JsonNotNull
    open var backTop: Boolean = false,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ConfigReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ConfigReactiveObject : Config, IUTSReactive<Config> {
    override var __v_raw: Config
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: Config, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(fontSize = __v_raw.fontSize, zIndex = __v_raw.zIndex, startDate = __v_raw.startDate, endDate = __v_raw.endDate, isCustomTabBar = __v_raw.isCustomTabBar, backTop = __v_raw.backTop) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ConfigReactiveObject {
        return ConfigReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var fontSize: Number?
        get() {
            return _tRG(__v_raw, "fontSize", __v_raw.fontSize, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("fontSize")) {
                return
            }
            val oldValue = __v_raw.fontSize
            __v_raw.fontSize = value
            _tRS(__v_raw, "fontSize", oldValue, value)
        }
    override var zIndex: Number
        get() {
            return _tRG(__v_raw, "zIndex", __v_raw.zIndex, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("zIndex")) {
                return
            }
            val oldValue = __v_raw.zIndex
            __v_raw.zIndex = value
            _tRS(__v_raw, "zIndex", oldValue, value)
        }
    override var startDate: String
        get() {
            return _tRG(__v_raw, "startDate", __v_raw.startDate, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("startDate")) {
                return
            }
            val oldValue = __v_raw.startDate
            __v_raw.startDate = value
            _tRS(__v_raw, "startDate", oldValue, value)
        }
    override var endDate: String
        get() {
            return _tRG(__v_raw, "endDate", __v_raw.endDate, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("endDate")) {
                return
            }
            val oldValue = __v_raw.endDate
            __v_raw.endDate = value
            _tRS(__v_raw, "endDate", oldValue, value)
        }
    override var isCustomTabBar: Boolean
        get() {
            return _tRG(__v_raw, "isCustomTabBar", __v_raw.isCustomTabBar, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("isCustomTabBar")) {
                return
            }
            val oldValue = __v_raw.isCustomTabBar
            __v_raw.isCustomTabBar = value
            _tRS(__v_raw, "isCustomTabBar", oldValue, value)
        }
    override var backTop: Boolean
        get() {
            return _tRG(__v_raw, "backTop", __v_raw.backTop, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("backTop")) {
                return
            }
            val oldValue = __v_raw.backTop
            __v_raw.backTop = value
            _tRS(__v_raw, "backTop", oldValue, value)
        }
}
val config = reactive<Config>(Config(fontSize = null, zIndex = 600, startDate = "2000-01-01 00:00:00", endDate = "2050-12-31 23:59:59", isCustomTabBar = false, backTop = true))
fun hasTextColor(className: String): Boolean {
    if (className == "") {
        return false
    }
    val regex = UTSRegExp("\\btext-(primary|surface|red|blue|green|yellow|purple|pink|indigo|gray|grey|black|white|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose|slate|zinc|neutral|stone)(?:-\\d+)?\\b", "")
    return regex.test(className)
}
fun hasTextSize(className: String): Boolean {
    if (className == "") {
        return false
    }
    val regex = UTSRegExp("\\btext-(xs|sm|md|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\\[\\d+[a-zA-Z%]*\\])\\b", "")
    return regex.test(className)
}
open class DayUts {
    private var _date: Date
    constructor(date: Any?){
        if (date == null || date == "") {
            this._date = Date()
        } else if (UTSAndroid.`typeof`(date) == "string") {
            this._date = Date(date as String)
        } else if (UTSAndroid.`typeof`(date) == "number") {
            this._date = Date(date as Number)
        } else if (date is Date) {
            this._date = Date((date as Date).getTime())
        } else {
            this._date = Date()
        }
    }
    open fun format(template: String): String {
        var actualTemplate: String = template
        val year = this._date.getFullYear()
        val month = this._date.getMonth() + 1
        val date = this._date.getDate()
        val hours = this._date.getHours()
        val minutes = this._date.getMinutes()
        val seconds = this._date.getSeconds()
        val milliseconds = this._date.getMilliseconds()
        var result: String = actualTemplate
        result = result.replace("YYYY", year.toString(10))
        result = result.replace("YY", year.toString(10).slice(-2))
        result = result.replace("MM", month.toString(10).padStart(2, "0"))
        result = result.replace("M", month.toString(10))
        result = result.replace("DD", date.toString(10).padStart(2, "0"))
        result = result.replace("D", date.toString(10))
        result = result.replace("HH", hours.toString(10).padStart(2, "0"))
        result = result.replace("H", hours.toString(10))
        result = result.replace("mm", minutes.toString(10).padStart(2, "0"))
        result = result.replace("m", minutes.toString(10))
        result = result.replace("ss", seconds.toString(10).padStart(2, "0"))
        result = result.replace("s", seconds.toString(10))
        result = result.replace("SSS", milliseconds.toString(10).padStart(3, "0"))
        return result
    }
    open fun getDays(): Number {
        return Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDate()
    }
    open fun isLeapYear(): Boolean {
        return this._date.getFullYear() % 4 == 0 && this._date.getFullYear() % 100 != 0
    }
    open fun getDay(): Number {
        return this._date.getDay()
    }
    open fun startOf(unit: String): DayUts {
        val newDate = Date(this._date.getTime())
        when (unit) {
            "year" -> 
                {
                    newDate.setMonth(0)
                    newDate.setDate(1)
                    newDate.setHours(0)
                    newDate.setMinutes(0)
                    newDate.setSeconds(0)
                    newDate.setMilliseconds(0)
                }
            "month" -> 
                {
                    newDate.setDate(1)
                    newDate.setHours(0)
                    newDate.setMinutes(0)
                    newDate.setSeconds(0)
                    newDate.setMilliseconds(0)
                }
            "week" -> 
                {
                    newDate.setDate(newDate.getDate() - newDate.getDay())
                    newDate.setHours(0)
                    newDate.setMinutes(0)
                    newDate.setSeconds(0)
                    newDate.setMilliseconds(0)
                }
            "day" -> 
                {
                    newDate.setHours(0)
                    newDate.setMinutes(0)
                    newDate.setSeconds(0)
                    newDate.setMilliseconds(0)
                }
        }
        return DayUts(newDate)
    }
    open fun endOf(unit: String): DayUts {
        val newDate = Date(this._date.getTime())
        when (unit) {
            "year" -> 
                {
                    newDate.setMonth(11)
                    newDate.setDate(31)
                    newDate.setHours(23)
                    newDate.setMinutes(59)
                    newDate.setSeconds(59)
                    newDate.setMilliseconds(999)
                }
            "month" -> 
                {
                    newDate.setMonth(newDate.getMonth() + 1)
                    newDate.setDate(0)
                    newDate.setHours(23)
                    newDate.setMinutes(59)
                    newDate.setSeconds(59)
                    newDate.setMilliseconds(999)
                }
            "week" -> 
                {
                    val day = newDate.getDay()
                    val diff = 6 - day
                    newDate.setDate(newDate.getDate() + diff)
                    newDate.setHours(23)
                    newDate.setMinutes(59)
                    newDate.setSeconds(59)
                    newDate.setMilliseconds(999)
                }
            "day" -> 
                {
                    newDate.setHours(23)
                    newDate.setMinutes(59)
                    newDate.setSeconds(59)
                    newDate.setMilliseconds(999)
                }
        }
        return DayUts(newDate)
    }
    open fun isBefore(date: Any): Boolean {
        val compareDate = this._parseDate(date)
        return this._date.getTime() < compareDate.getTime()
    }
    open fun isAfter(date: Any): Boolean {
        val compareDate = this._parseDate(date)
        return this._date.getTime() > compareDate.getTime()
    }
    open fun isSame(date: Any): Boolean {
        val compareDate = this._parseDate(date)
        return this._date.getTime() == compareDate.getTime()
    }
    open fun diff(date: Any): Number {
        val compareDate = this._parseDate(date)
        return this._date.getTime() - compareDate.getTime()
    }
    open fun diffUnit(date: Any, unit: String): Number {
        val compareDate = this._parseDate(date)
        val diffMs = this._date.getTime() - compareDate.getTime()
        when (unit) {
            "day" -> 
                return Math.floor(diffMs / 86400000)
            "hour" -> 
                return Math.floor(diffMs / 3600000)
            "minute" -> 
                return Math.floor(diffMs / 60000)
            "second" -> 
                return Math.floor(diffMs / 1000)
            "millisecond" -> 
                return diffMs
            else -> 
                return diffMs
        }
    }
    open fun add(value: Number, unit: String): DayUts {
        val newDate = Date(this._date.getTime())
        when (unit) {
            "year" -> 
                newDate.setFullYear(newDate.getFullYear() + value)
            "month" -> 
                newDate.setMonth(newDate.getMonth() + value)
            "day" -> 
                newDate.setDate(newDate.getDate() + value)
            "hour" -> 
                newDate.setHours(newDate.getHours() + value)
            "minute" -> 
                newDate.setMinutes(newDate.getMinutes() + value)
            "second" -> 
                newDate.setSeconds(newDate.getSeconds() + value)
        }
        return DayUts(newDate)
    }
    open fun subtract(value: Number, unit: String): DayUts {
        return this.add(-value, unit)
    }
    open fun valueOf(): Number {
        return this._date.getTime()
    }
    open fun toDate(): Date {
        return Date(this._date.getTime())
    }
    open fun toArray(): UTSArray<Number> {
        return _uA(
            this._date.getFullYear(),
            this._date.getMonth() + 1,
            this._date.getDate(),
            this._date.getHours(),
            this._date.getMinutes(),
            this._date.getSeconds()
        )
    }
    private fun _parseDate(date: Any): Date {
        if (date is DayUts) {
            return (date as DayUts).toDate()
        } else if (date is Date) {
            return date as Date
        } else if (UTSAndroid.`typeof`(date) == "string") {
            return Date(date as String)
        } else if (UTSAndroid.`typeof`(date) == "number") {
            return Date(date as Number)
        } else {
            return Date()
        }
    }
}
fun dayUts(date: Any? = Date()): DayUts {
    return DayUts(date)
}
val EXPIRES_SUFFIX = "_deadtime"
open class Storage {
    open fun get(key: String): Any? {
        return uni_getStorageSync(key)
    }
    open fun info(): UTSJSONObject {
        val info = uni_getStorageInfoSync()
        val d: UTSJSONObject = UTSJSONObject()
        info.keys.forEach(fun(e){
            d[e] = this.get(e)
        }
        )
        return d
    }
    open fun set(key: String, value: Any, expires: Number): Unit {
        uni_setStorageSync(key, value)
        if (expires > 0) {
            val expireTime = Date().getTime() + expires * 1000
            uni_setStorageSync("" + key + EXPIRES_SUFFIX, expireTime)
        }
    }
    open fun isExpired(key: String): Boolean {
        val value = uni_getStorageSync("" + key + EXPIRES_SUFFIX) as Number?
        if (value == null) {
            return true
        }
        return value - Date().getTime() <= 0
    }
    open fun remove(key: String) {
        uni_removeStorageSync(key)
        uni_removeStorageSync("" + key + EXPIRES_SUFFIX)
    }
    open fun clear() {
        uni_clearStorageSync()
    }
    open fun once(key: String): Any? {
        val value = this.get(key)
        this.remove(key)
        return value
    }
}
val storage = Storage()
typealias PushAnimationType = String
typealias BackAnimationType = String
typealias PushMode = String
open class BackOptions (
    open var delta: Number? = null,
    open var animationType: BackAnimationType? = null,
    open var animationDuration: Number? = null,
    open var success: ((result: Any) -> Unit)? = null,
    open var fail: ((result: Any) -> Unit)? = null,
    open var complete: ((result: Any) -> Unit)? = null,
) : UTSObject()
open class PushOptions (
    @JsonNotNull
    open var path: String,
    open var mode: PushMode? = null,
    open var events: Any? = null,
    open var query: UTSJSONObject? = null,
    open var params: UTSJSONObject? = null,
    open var isAuth: Boolean? = null,
    open var animationType: PushAnimationType? = null,
    open var animationDuration: Number? = null,
    open var success: ((result: Any) -> Unit)? = null,
    open var fail: ((result: Any) -> Unit)? = null,
    open var complete: ((result: Any) -> Unit)? = null,
) : UTSObject()
open class PageInstance (
    @JsonNotNull
    open var path: String,
    @JsonNotNull
    open var vm: Any,
    open var style: UTSJSONObject? = null,
    @JsonNotNull
    open var query: UTSJSONObject,
    @JsonNotNull
    open var exposed: Any,
    @JsonNotNull
    open var isCustomNavbar: Boolean = false,
    open var meta: UTSJSONObject? = null,
) : UTSObject()
open class RouteInfo (
    @JsonNotNull
    open var path: String,
    @JsonNotNull
    open var query: UTSJSONObject,
    @JsonNotNull
    open var meta: UTSJSONObject,
    open var isAuth: Boolean? = null,
) : UTSObject()
open class Page (
    @JsonNotNull
    open var path: String,
    open var style: UTSJSONObject? = null,
    open var meta: UTSJSONObject? = null,
) : UTSObject()
typealias BeforeEach = (to: RouteInfo, from: PageInstance, next: () -> Unit) -> Unit
typealias AfterLogin = () -> Unit
open class Events (
    open var beforeEach: BeforeEach? = null,
    open var afterLogin: AfterLogin? = null,
) : UTSObject()
open class SubPackage (
    @JsonNotNull
    open var root: String,
    @JsonNotNull
    open var pages: UTSArray<Page>,
) : UTSObject()
open class TabBarItem (
    open var text: String? = null,
    @JsonNotNull
    open var pagePath: String,
    open var iconPath: String? = null,
    open var selectedIconPath: String? = null,
    open var visible: Boolean? = null,
) : UTSObject()
open class TabBar (
    open var custom: Boolean? = null,
    open var color: String? = null,
    open var selectedColor: String? = null,
    open var backgroundColor: String? = null,
    open var borderStyle: String? = null,
    open var blurEffect: String? = null,
    open var list: UTSArray<TabBarItem>? = null,
    open var position: String? = null,
    open var fontSize: String? = null,
    open var iconWidth: String? = null,
    open var spacing: String? = null,
    open var height: String? = null,
    open var backgroundImage: String? = null,
    open var backgroundRepeat: String? = null,
    open var redDotColor: String? = null,
) : UTSObject()
open class Ctx (
    @JsonNotNull
    open var appid: String,
    @JsonNotNull
    open var globalStyle: UTSJSONObject,
    @JsonNotNull
    open var pages: UTSArray<Page>,
    @JsonNotNull
    open var uniIdRouter: UTSJSONObject,
    @JsonNotNull
    open var theme: UTSJSONObject,
    @JsonNotNull
    open var tabBar: TabBar,
    @JsonNotNull
    open var subPackages: UTSArray<SubPackage>,
    @JsonNotNull
    open var SAFE_CHAR_MAP_LOCALE: UTSArray<UTSArray<String>>,
    @JsonNotNull
    open var color: UTSJSONObject,
) : UTSObject()
val ctx = parse<Ctx>(object : UTSJSONObject() {
    var pages = _uA(
        object : UTSJSONObject() {
            var path = "pages/index/home"
            var style = object : UTSJSONObject() {
                var navigationStyle = "custom"
            }
            var meta = object : UTSJSONObject() {
                var isAuth = true
            }
        },
        object : UTSJSONObject() {
            var path = "pages/index/equip"
            var style = object : UTSJSONObject() {
                var navigationStyle = "custom"
            }
            var meta = object : UTSJSONObject() {
                var isAuth = true
            }
        },
        object : UTSJSONObject() {
            var path = "pages/index/work"
            var style = object : UTSJSONObject() {
                var navigationStyle = "custom"
            }
            var meta = object : UTSJSONObject() {
                var isAuth = true
            }
        },
        object : UTSJSONObject() {
            var path = "pages/index/message"
            var style = object : UTSJSONObject() {
                var navigationStyle = "custom"
                var enablePullDownRefresh = true
            }
            var meta = object : UTSJSONObject() {
                var isAuth = true
            }
        },
        object : UTSJSONObject() {
            var path = "pages/index/my"
            var style = object : UTSJSONObject() {
                var navigationStyle = "custom"
            }
            var meta = object : UTSJSONObject() {
                var isAuth = true
            }
        }
    )
    var subPackages = _uA(
        object : UTSJSONObject() {
            var root = "pages/set"
            var pages = _uA(
                object : UTSJSONObject() {
                    var path = "index"
                    var style = object : UTSJSONObject() {
                        var navigationBarTitleText = "设置"
                    }
                    var meta = object : UTSJSONObject() {
                        var isAuth = true
                    }
                },
                object : UTSJSONObject() {
                    var path = "general"
                    var style = object : UTSJSONObject() {
                        var navigationBarTitleText = "通用设置"
                    }
                    var meta = object : UTSJSONObject() {
                        var isAuth = true
                    }
                },
                object : UTSJSONObject() {
                    var path = "notice"
                    var style = object : UTSJSONObject() {
                        var navigationBarTitleText = "通知设置"
                    }
                    var meta = object : UTSJSONObject() {
                        var isAuth = true
                    }
                },
                object : UTSJSONObject() {
                    var path = "about"
                    var style = object : UTSJSONObject() {
                        var navigationBarTitleText = ""
                    }
                    var meta = object : UTSJSONObject() {
                        var isAuth = true
                    }
                },
                object : UTSJSONObject() {
                    var path = "cs"
                    var style = object : UTSJSONObject() {
                        var navigationBarTitleText = "联系技术"
                    }
                    var meta = object : UTSJSONObject() {
                        var isAuth = true
                    }
                }
            )
        },
        object : UTSJSONObject() {
            var root = "pages/user"
            var pages = _uA(
                object : UTSJSONObject() {
                    var path = "login"
                    var style = object : UTSJSONObject() {
                        var navigationStyle = "custom"
                        var disableScroll = true
                    }
                }
            )
        },
        object : UTSJSONObject() {
            var root = "pages/equip"
            var pages = _uA(
                object : UTSJSONObject() {
                    var path = "equip_detail"
                    var style = object : UTSJSONObject() {
                        var navigationStyle = "custom"
                        var disableScroll = true
                    }
                },
                object : UTSJSONObject() {
                    var path = "workshop_tree"
                    var style = object : UTSJSONObject() {
                        var navigationStyle = "custom"
                        var disableScroll = true
                    }
                },
                object : UTSJSONObject() {
                    var path = "equip_collect"
                    var style = object : UTSJSONObject() {
                        var navigationStyle = "custom"
                        var disableScroll = true
                    }
                },
                object : UTSJSONObject() {
                    var path = "workshop_scada"
                    var style = object : UTSJSONObject() {
                        var navigationStyle = "default"
                        var navigationBarTitleText = "工艺组态"
                        var disableScroll = true
                    }
                }
            )
        },
        object : UTSJSONObject() {
            var root = "pages/message"
            var pages = _uA(
                object : UTSJSONObject() {
                    var path = "message_detail"
                    var style = object : UTSJSONObject() {
                        var navigationStyle = "custom"
                        var disableScroll = true
                    }
                }
            )
        }
    )
    var globalStyle = object : UTSJSONObject() {
        var navigationBarTitleText = "OEMES"
        var navigationBarTextStyle = "@navTextStyle"
        var backgroundColorContent = "@bgContentColor"
        var backgroundColor = "@bgColor"
        var navigationBarBackgroundColor = "@navBgColor"
    }
    var tabBar = object : UTSJSONObject() {
        var custom = true
        var color = "@tabColor"
        var selectedColor = "@tabSelectedColor"
        var backgroundColor = "@tabBgColor"
        var borderStyle = "@tabBorderStyle"
        var height = "60px"
        var list = _uA(
            object : UTSJSONObject() {
                var pagePath = "pages/index/home"
                var iconPath = "/static/icon/tabbar/home.png"
                var selectedIconPath = "/static/icon/tabbar/home2.png"
                var text = "首页"
            },
            object : UTSJSONObject() {
                var pagePath = "pages/index/equip"
                var iconPath = "/static/icon/tabbar/equip.png"
                var selectedIconPath = "/static/icon/tabbar/equip2.png"
                var text = "设备"
            },
            object : UTSJSONObject() {
                var pagePath = "pages/index/work"
                var iconPath = "/static/icon/tabbar/work.png"
                var selectedIconPath = "/static/icon/tabbar/work2.png"
                var text = "场景"
            },
            object : UTSJSONObject() {
                var pagePath = "pages/index/message"
                var iconPath = "/static/icon/tabbar/message.png"
                var selectedIconPath = "/static/icon/tabbar/message2.png"
                var text = "消息"
            },
            object : UTSJSONObject() {
                var pagePath = "pages/index/my"
                var iconPath = "/static/icon/tabbar/my.png"
                var selectedIconPath = "/static/icon/tabbar/my2.png"
                var text = "我的"
            }
        )
    }
    var uniIdRouter = UTSJSONObject()
    var appid = "__UNI__63FBDF4"
    var theme = object : UTSJSONObject() {
        var light = object : UTSJSONObject() {
            var bgColor = "#f8f8f8"
            var bgContentColor = "#f8f8f8"
            var navBgColor = "#ffffff"
            var navTextStyle = "black"
            var tabColor = "#999999"
            var tabSelectedColor = "#14b8a6"
            var tabBorderStyle = "white"
            var tabBgColor = "#ffffff"
        }
        var dark = object : UTSJSONObject() {
            var bgColor = "#191919"
            var bgContentColor = "#191919"
            var navBgColor = "#191919"
            var navTextStyle = "white"
            var tabColor = "#cccccc"
            var tabSelectedColor = "#ffffff"
            var tabBorderStyle = "black"
            var tabBgColor = "#191919"
        }
    }
    var color = object : UTSJSONObject() {
        var `primary-50` = "#f0fdfa"
        var `primary-100` = "#ccfbf1"
        var `primary-200` = "#99f6e4"
        var `primary-300` = "#5eead4"
        var `primary-400` = "#2dd4bf"
        var `primary-500` = "#14b8a6"
        var `primary-600` = "#0d9488"
        var `primary-700` = "#0f766e"
        var `primary-800` = "#115e59"
        var `primary-900` = "#134e4a"
        var `primary-950` = "#042f2e"
        var surface = "#ffffff"
        var `surface-50` = "#fafafa"
        var `surface-100` = "#f4f4f5"
        var `surface-200` = "#e4e4e7"
        var `surface-300` = "#d4d4d8"
        var `surface-400` = "#a1a1aa"
        var `surface-500` = "#71717a"
        var `surface-600` = "#52525b"
        var `surface-700` = "#3f3f46"
        var `surface-800` = "#27272a"
        var `surface-900` = "#18181b"
        var `surface-950` = "#09090b"
    }
    var SAFE_CHAR_MAP_LOCALE = _uA(
        _uA(
            "[",
            "-bracket-start-"
        ),
        _uA(
            "]",
            "-bracket-end-"
        ),
        _uA(
            "(",
            "-paren-start-"
        ),
        _uA(
            ")",
            "-paren-end-"
        ),
        _uA(
            "{",
            "-brace-start-"
        ),
        _uA(
            "}",
            "-brace-end-"
        ),
        _uA(
            "\$",
            "-dollar-"
        ),
        _uA(
            "#",
            "-hash-"
        ),
        _uA(
            "!",
            "-important-"
        ),
        _uA(
            "/",
            "-slash-"
        ),
        _uA(
            ":",
            "-colon-"
        ),
        _uA(
            " ",
            "-space-"
        ),
        _uA(
            "<",
            "-lt-"
        ),
        _uA(
            ">",
            "-gt-"
        ),
        _uA(
            "&",
            "-amp-"
        ),
        _uA(
            "|",
            "-pipe-"
        ),
        _uA(
            "^",
            "-caret-"
        ),
        _uA(
            "~",
            "-tilde-"
        ),
        _uA(
            "`",
            "-backtick-"
        ),
        _uA(
            "'",
            "-single-quote-"
        ),
        _uA(
            ".",
            "-dot-"
        ),
        _uA(
            "?",
            "-question-"
        ),
        _uA(
            "*",
            "-star-"
        ),
        _uA(
            "+",
            "-plus-"
        ),
        _uA(
            "-",
            "-dash-"
        ),
        _uA(
            "_",
            "-underscore-"
        ),
        _uA(
            "=",
            "-equal-"
        ),
        _uA(
            "%",
            "-percent-"
        ),
        _uA(
            "@",
            "-at-"
        )
    )
})!!
var PAGES: UTSArray<Page> = ctx.pages.slice()
val runBlock2 = run {
    if (isArray(ctx.subPackages)) {
        ctx.subPackages.forEach(fun(a){
            a.pages.forEach(fun(b){
                PAGES.push(Page(path = a.root + "/" + b.path, style = b.style, meta = b.meta))
            }
            )
        }
        )
    }
    PAGES.forEach(fun(e){
        if (!e.path.startsWith("/")) {
            e.path = "/" + e.path
        }
    }
    )
}
var TABS: UTSArray<TabBarItem> = _uA()
open class Router {
    private var eventsMap = Events()
    open fun params(): UTSJSONObject {
        return (storage.get("router-params") ?: UTSJSONObject()) as UTSJSONObject
    }
    open fun query(): UTSJSONObject {
        return this.route()?.query ?: UTSJSONObject()
    }
    open fun defaultPath(name: String): String {
        val paths: UTSJSONObject = object : UTSJSONObject() {
            var home = PAGES[0].path
            var login = "/pages/user/login"
        }
        return get(paths, name) as String
    }
    open fun getPages(): UTSArray<PageInstance> {
        return map(getCurrentPages(), fun(e, _index): PageInstance {
            var path = e.route!!
            if (path == "/") {
                path = this.defaultPath("home")
            }
            if (!path.startsWith("/")) {
                path = "/" + path
            }
            val page = PAGES.find(fun(e): Boolean {
                return e.path == path
            }
            )
            val style = page?.style
            val meta = page?.meta
            val vm = e.vm as Any
            var exposed = vm
            val query = e.options
            return PageInstance(path = path, vm = vm, exposed = exposed, style = style, meta = meta, query = query, isCustomNavbar = style?.get("navigationStyle") == "custom")
        }
        )
    }
    open fun getPage(path: String): PageInstance? {
        return this.getPages().find(fun(e): Boolean {
            return e.path == path
        }
        )
    }
    open fun route(): PageInstance? {
        return last(this.getPages())
    }
    open fun path(): String {
        return this.route()?.path ?: ""
    }
    open fun to(path: String) {
        this.push(PushOptions(path = path))
    }
    open fun push(options: PushOptions) {
        var _options_query = options.query
        var query = if (_options_query == null) {
            UTSJSONObject()
        } else {
            _options_query
        }
        var _options_params = options.params
        var params = if (_options_params == null) {
            UTSJSONObject()
        } else {
            _options_params
        }
        var _options_mode = options.mode
        var mode = if (_options_mode == null) {
            "navigateTo"
        } else {
            _options_mode
        }
        var path = options.path
        var success = options.success
        var fail = options.fail
        var complete = options.complete
        var animationType = options.animationType
        var animationDuration = options.animationDuration
        var events = options.events
        var isAuth = options.isAuth
        if (!isEmpty(query)) {
            val arr = toArray(query, fun(v, k): String {
                return "" + k + "=" + v
            }
            )
            path += "?" + arr.join("&")
        }
        if (!isEmpty(params)) {
            storage.set("router-params", params, 0)
        }
        if (this.isTabPage(path)) {
            mode = "switchTab"
        }
        val next = fun(){
            when (mode) {
                "navigateTo" -> 
                    uni_navigateTo(NavigateToOptions(url = path, success = success, events = events, fail = fail, complete = complete, animationType = animationType, animationDuration = animationDuration))
                "redirectTo" -> 
                    uni_redirectTo(RedirectToOptions(url = path, success = success, fail = fail, complete = complete))
                "reLaunch" -> 
                    uni_reLaunch(ReLaunchOptions(url = path, success = success, fail = fail, complete = complete))
                "switchTab" -> 
                    uni_switchTab(SwitchTabOptions(url = path, success = success, fail = fail, complete = complete))
            }
        }
        if (this.eventsMap.beforeEach != null) {
            val from = last(this.getPages())
            val to = RouteInfo(path = path, meta = this.getMeta(path), query = query, isAuth = isAuth)
            this.eventsMap.beforeEach!!(to, from!!, next)
        } else {
            next()
        }
    }
    open fun home() {
        this.push(PushOptions(path = this.defaultPath("home")))
    }
    open fun back(options: BackOptions? = null) {
        if (this.isFirstPage()) {
            this.home()
        } else {
            val delta = options?.delta ?: 1
            val next = fun(){
                uni_navigateBack(UTSJSONObject.assign<NavigateBackOptions>(UTSJSONObject(), (options ?: NavigateBackOptions())) as NavigateBackOptions)
            }
            if (this.eventsMap.beforeEach != null) {
                val from = last(this.getPages())
                val to = nth(this.getPages(), -delta - 1)
                if (to != null) {
                    this.eventsMap.beforeEach!!(RouteInfo(path = to.path, query = to.query, meta = to.meta ?: (UTSJSONObject())), from!!, next)
                } else {
                    console.error("[router] found to page is null")
                }
            } else {
                next()
            }
        }
    }
    open fun getMeta(path: String): UTSJSONObject {
        return PAGES.find(fun(e): Boolean {
            return e.path.includes(path)
        }
        )?.meta ?: (UTSJSONObject())
    }
    open fun callMethod(name: String, data: Any?): Any? {
        val fn = get(this.route()!!, "\$vm.\$.exposed." + name) as (d: Any?) -> Any?
        if (isFunction(fn)) {
            return fn(data)
        }
        return null
    }
    open fun isFirstPage(): Boolean {
        return getCurrentPages().length == 1
    }
    open fun isHomePage(): Boolean {
        return this.path() == this.defaultPath("home")
    }
    open fun isCustomNavbarPage(): Boolean {
        return this.route()?.isCustomNavbar ?: false
    }
    open fun isCurrentPage(path: String): Boolean {
        return this.path() == path
    }
    open fun isTabPage(reassignedPath: String? = null): Boolean {
        var path = reassignedPath
        if (path == null) {
            path = this.path()
        }
        if (path == "/") {
            path = this.defaultPath("home")
        }
        return !isNull(TABS.find(fun(e): Boolean {
            return path == e.pagePath
        }
        ))
    }
    open fun isLoginPage(path: String): Boolean {
        return path == this.defaultPath("login")
    }
    open var login = debounce(fun(){
        if (!this.isLoginPage(this.path())) {
            this.push(PushOptions(path = "/pages/user/login", mode = "reLaunch"))
        }
    }
    , 300)
    open fun nextLogin() {
        val pages = this.getPages()
        val index = pages.findIndex(fun(e): Boolean {
            return this.defaultPath("login").includes(e.path)
        }
        )
        if (index < 0) {
            this.home()
        } else {
            this.back(BackOptions(delta = pages.length - index))
        }
        if (this.eventsMap.afterLogin != null) {
            this.eventsMap.afterLogin!!()
        }
        uni__emit("afterLogin", null)
    }
    open fun beforeEach(cb: BeforeEach) {
        this.eventsMap.beforeEach = cb
    }
    open fun afterLogin(cb: AfterLogin) {
        this.eventsMap.afterLogin = cb
    }
}
val router = Router()
fun hasCustomTabBar(): Boolean {
    if (router.isTabPage()) {
        if (isHarmony()) {
            return false
        }
        return config.isCustomTabBar || isH5()
    }
    return false
}
val runBlock3 = run {
    if (ctx.tabBar.list != null) {
        TABS = ctx.tabBar.list!!
        TABS.forEach(fun(e){
            if (!e.pagePath.startsWith("/")) {
                e.pagePath = "/" + e.pagePath
            }
        }
        )
    }
}
fun getSafeAreaHeight(type: String): Number {
    val safeAreaInsets = uni_getWindowInfo().safeAreaInsets
    var h: Number
    if (type == "top") {
        h = safeAreaInsets.top
    } else {
        h = safeAreaInsets.bottom
        if (h == 0) {
            h = 16
        }
    }
    return h
}
fun getTabBarHeight(): Number {
    var h = if (ctx.tabBar.height == null) {
        50
    } else {
        getPx(ctx.tabBar.height!!)
    }
    if (hasCustomTabBar()) {
        h += getSafeAreaHeight("bottom")
    }
    return h
}
typealias Instance = ComponentPublicInstance?
open class Refs {
    open var data = reactive(UTSJSONObject())
    open fun set(name: String): (el: Instance) -> Unit {
        return fun(el: Instance){
            this.data[name] = el
        }
    }
    open fun get(name: String): Instance {
        val d = this.data[name] as ComponentPublicInstance
        if (isNull(d)) {
            return null
        }
        return d
    }
    open fun <T> getExposed(name: String, key: String): T? {
        val d = this.get(name)
        if (isNull(d)) {
            return null
        }
        val ex = d!!.`$exposed` as Map<String, Any>
        if (isNull(ex)) {
            return null
        }
        return ex[key] as T?
    }
    open fun <T> call(name: String, method: String, data: UTSJSONObject? = null): T {
        return this.get(name)!!.`$callMethod`(method, data) as T
    }
    open fun callMethod(name: String, method: String, data: UTSJSONObject? = null): Unit {
        this.get(name)!!.`$callMethod`(method, data)
    }
    open fun open(name: String, data: UTSJSONObject? = null) {
        this.callMethod(name, "open", data)
    }
    open fun close(name: String) {
        return this.callMethod(name, "close")
    }
}
fun useRefs(): Refs {
    return Refs()
}
open class Scroller {
    open var list: Map<String, UTSArray<((top: Number) -> Unit)>> = Map()
    open fun emit(top: Number) {
        val cbs = this.list.get(router.path()) ?: _uA()
        cbs.forEach(fun(cb){
            cb(top)
        }
        )
    }
    open fun on(callback: (top: Number) -> Unit) {
        val path = router.path()
        val cbs = this.list.get(path) ?: _uA()
        cbs.push(callback)
        this.list.set(path, cbs)
    }
    open var off = fun(callback: (top: Number) -> Unit){
        val path = router.path()
        val cbs = this.list.get(path) ?: _uA()
        this.list.set(path, cbs.filter(fun(cb): Boolean {
            return cb != callback
        }
        ))
    }
}
val scroller = Scroller()
typealias EasingFunction = (progress: Number) -> Number
open class AnimationAttribute (
    @JsonNotNull
    open var fromValue: String,
    @JsonNotNull
    open var toValue: String,
    @JsonNotNull
    open var unit: String,
    @JsonNotNull
    open var currentValue: String,
    @JsonNotNull
    open var progress: Number,
    @JsonNotNull
    open var propertyName: String,
) : UTSObject()
open class AnimationOptions (
    open var duration: Number? = null,
    open var loop: Number? = null,
    open var alternate: Boolean? = null,
    open var sequential: Boolean? = null,
    open var timingFunction: String? = null,
    open var bezier: UTSArray<Number>? = null,
    open var complete: (() -> Unit)? = null,
    open var start: (() -> Unit)? = null,
    open var frame: ((progress: Number) -> Unit)? = null,
) : UTSObject()
val BEZIER_SPLINE_SIZE: Number = 11
val BEZIER_SAMPLE_STEP = (1.0 as Number) / (BEZIER_SPLINE_SIZE - 1.0)
fun getBezierCoefficientA(x1: Number, x2: Number): Number {
    return 1.0 - 3.0 * x2 + 3.0 * x1
}
fun getBezierCoefficientB(x1: Number, x2: Number): Number {
    return 3.0 * x2 - 6.0 * x1
}
fun getBezierCoefficientC(x1: Number): Number {
    return 3.0 * x1
}
fun calculateBezierValue(t: Number, x1: Number, x2: Number): Number {
    val a = getBezierCoefficientA(x1, x2)
    val b = getBezierCoefficientB(x1, x2)
    val c = getBezierCoefficientC(x1)
    return ((a * t + b) * t + c) * t
}
fun getBezierSlope(t: Number, x1: Number, x2: Number): Number {
    val a = getBezierCoefficientA(x1, x2)
    val b = getBezierCoefficientB(x1, x2)
    val c = getBezierCoefficientC(x1)
    return 3.0 * a * t * t + 2.0 * b * t + c
}
fun binarySearchBezierT(targetX: Number, reassignedStartT: Number, reassignedEndT: Number, x1: Number, x2: Number): Number {
    var endT = reassignedEndT
    var startT = reassignedStartT
    var currentX: Number
    var currentT: Number
    var iterations: Number = 0
    val maxIterations: Number = 10
    val precision: Number = 0.0000001
    do {
        currentT = startT + (endT - startT) / 2.0
        currentX = calculateBezierValue(currentT, x1, x2) - targetX
        if (currentX > 0.0) {
            endT = currentT
        } else {
            startT = currentT
        }
        iterations++
    }
    while (Math.abs(currentX) > precision && iterations < maxIterations)
    return currentT
}
fun newtonRaphsonBezierT(targetX: Number, initialGuess: Number, x1: Number, x2: Number): Number {
    var t = initialGuess
    val maxIterations: Number = 4
    run {
        var i: Number = 0
        while(i < maxIterations){
            val slope = getBezierSlope(t, x1, x2)
            if (slope == 0.0) {
                return t
            }
            val currentX = calculateBezierValue(t, x1, x2) - targetX
            t = t - currentX / slope
            i++
        }
    }
    return t
}
fun createBezierEasing(x1: Number, y1: Number, x2: Number, y2: Number): EasingFunction? {
    if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) {
        return null
    }
    val sampleValues: UTSArray<Number> = _uA()
    if (x1 != y1 || x2 != y2) {
        run {
            var i: Number = 0
            while(i < BEZIER_SPLINE_SIZE){
                sampleValues.push(calculateBezierValue(i * BEZIER_SAMPLE_STEP, x1, x2))
                i++
            }
        }
    }
    fun getTParameterForX(x: Number): Number {
        var intervalStart: Number = 0.0
        var currentSample: Number = 1
        val lastSample = BEZIER_SPLINE_SIZE - 1
        while(currentSample != lastSample && sampleValues[currentSample] <= x){
            intervalStart += BEZIER_SAMPLE_STEP
            currentSample++
        }
        currentSample--
        val dist = (x - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample])
        val initialGuess = intervalStart + dist * BEZIER_SAMPLE_STEP
        val initialSlope = getBezierSlope(initialGuess, x1, x2)
        if (initialSlope >= 0.001) {
            return newtonRaphsonBezierT(x, initialGuess, x1, x2)
        } else if (initialSlope == 0.0) {
            return initialGuess
        }
        return binarySearchBezierT(x, intervalStart, intervalStart + BEZIER_SAMPLE_STEP, x1, x2)
    }
    return fun(progress: Number): Number {
        if (x1 == y1 && x2 == y2) {
            return progress
        }
        if (progress == 0.0 || progress == 1.0) {
            return progress
        }
        return calculateBezierValue(getTParameterForX(progress), y1, y2)
    }
}
fun getDefaultColor(colorValue: String): String {
    if (colorValue.startsWith("#")) {
        return colorValue
    }
    if (colorValue.startsWith("rgb")) {
        return colorValue
    }
    return "#000000"
}
fun hexToRgb(hex: String): UTSJSONObject {
    val result = UTSRegExp("^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})\$", "i").exec(hex)
    if (result != null) {
        return object : UTSJSONObject() {
            var r = parseInt(result[1] ?: "0", 16)
            var g = parseInt(result[2] ?: "0", 16)
            var b = parseInt(result[3] ?: "0", 16)
            var a: Number = 1.0
        }
    }
    return object : UTSJSONObject() {
        var r: Number = 0
        var g: Number = 0
        var b: Number = 0
        var a: Number = 1.0
    }
}
open class AnimationEngine {
    private val easingPresets = Map<String, UTSArray<Number>>(_uA(
        _uA(
            "linear",
            _uA(
                0.0,
                0.0,
                1.0,
                1.0
            )
        ),
        _uA(
            "ease",
            _uA(
                0.25,
                0.1,
                0.25,
                1.0
            )
        ),
        _uA(
            "easeIn",
            _uA(
                0.42,
                0.0,
                1.0,
                1.0
            )
        ),
        _uA(
            "easeOut",
            _uA(
                0.0,
                0.0,
                0.58,
                1.0
            )
        ),
        _uA(
            "easeInOut",
            _uA(
                0.42,
                0.0,
                0.58,
                1.0
            )
        ),
        _uA(
            "easeInQuad",
            _uA(
                0.55,
                0.085,
                0.68,
                0.53
            )
        ),
        _uA(
            "easeOutQuad",
            _uA(
                0.25,
                0.46,
                0.45,
                0.94
            )
        ),
        _uA(
            "easeInOutQuad",
            _uA(
                0.455,
                0.03,
                0.515,
                0.955
            )
        ),
        _uA(
            "easeInCubic",
            _uA(
                0.55,
                0.055,
                0.675,
                0.19
            )
        ),
        _uA(
            "easeOutCubic",
            _uA(
                0.215,
                0.61,
                0.355,
                1.0
            )
        ),
        _uA(
            "easeInOutCubic",
            _uA(
                0.645,
                0.045,
                0.355,
                1.0
            )
        ),
        _uA(
            "easeInQuart",
            _uA(
                0.895,
                0.03,
                0.685,
                0.22
            )
        ),
        _uA(
            "easeOutQuart",
            _uA(
                0.165,
                0.84,
                0.44,
                1.0
            )
        ),
        _uA(
            "easeInOutQuart",
            _uA(
                0.77,
                0.0,
                0.175,
                1.0
            )
        ),
        _uA(
            "easeInQuint",
            _uA(
                0.755,
                0.05,
                0.855,
                0.06
            )
        ),
        _uA(
            "easeOutQuint",
            _uA(
                0.23,
                1.0,
                0.32,
                1.0
            )
        ),
        _uA(
            "easeInOutQuint",
            _uA(
                0.86,
                0.0,
                0.07,
                1.0
            )
        ),
        _uA(
            "easeInSine",
            _uA(
                0.47,
                0.0,
                0.745,
                0.715
            )
        ),
        _uA(
            "easeOutSine",
            _uA(
                0.39,
                0.575,
                0.565,
                1.0
            )
        ),
        _uA(
            "easeInOutSine",
            _uA(
                0.445,
                0.05,
                0.55,
                0.95
            )
        ),
        _uA(
            "easeInExpo",
            _uA(
                0.95,
                0.05,
                0.795,
                0.035
            )
        ),
        _uA(
            "easeOutExpo",
            _uA(
                0.19,
                1.0,
                0.22,
                1.0
            )
        ),
        _uA(
            "easeInOutExpo",
            _uA(
                1.0,
                0.0,
                0.0,
                1.0
            )
        ),
        _uA(
            "easeInCirc",
            _uA(
                0.6,
                0.04,
                0.98,
                0.335
            )
        ),
        _uA(
            "easeOutCirc",
            _uA(
                0.075,
                0.82,
                0.165,
                1.0
            )
        ),
        _uA(
            "easeInOutBack",
            _uA(
                0.68,
                -0.55,
                0.265,
                1.55
            )
        )
    ))
    private var targetElement: UniElement? = null
    private var animationDuration: Number = 500
    private var isRunning: Boolean = false
    private var isPaused: Boolean = false
    private var currentProgress: Number = 0
    private var isReversed: Boolean = false
    private var isAlternate: Boolean = false
    private var isAlternateReversed: Boolean = false
    private var loopCount: Number = 1
    private var currentLoop: Number = 0
    private var isStopping: Boolean = true
    private var currentAttributeIndex: Number = 0
    private var onComplete: () -> Unit = fun(){}
    private var onStart: () -> Unit = fun(){}
    private var onFrame: (progress: Number) -> Unit = fun(_progress){}
    private var animationAttributes: UTSArray<AnimationAttribute> = _uA()
    private var startTimestamp: Number = 0
    private var currentEasingFunction: EasingFunction? = null
    private var isSequentialMode: Boolean = false
    private var choreographer: Choreographer? = null
    private var frameCallback: FrameCallback? = null
    private var animationFrameId: Number? = null
    constructor(element: UniElement?, options: AnimationOptions){
        this.targetElement = element
        this.animationDuration = if (options.duration != null) {
            options.duration!!
        } else {
            this.animationDuration
        }
        this.loopCount = if (options.loop != null) {
            options.loop!!
        } else {
            this.loopCount
        }
        this.isAlternate = if (options.alternate != null) {
            options.alternate!!
        } else {
            this.isAlternate
        }
        this.isSequentialMode = if (options.sequential != null) {
            options.sequential!!
        } else {
            this.isSequentialMode
        }
        if (options.timingFunction != null) {
            val easingParams = this.easingPresets.get(options.timingFunction!!)
            if (easingParams != null) {
                this.currentEasingFunction = createBezierEasing(easingParams[0], easingParams[1], easingParams[2], easingParams[3])
            }
        }
        if (options.bezier != null && options.bezier!!.length == 4) {
            this.currentEasingFunction = createBezierEasing(options.bezier!![0], options.bezier!![1], options.bezier!![2], options.bezier!![3])
        }
        if (options.complete != null) {
            this.onComplete = options.complete!!
        }
        if (options.start != null) {
            this.onStart = options.start!!
        }
        if (options.frame != null) {
            this.onFrame = options.frame!!
        }
    }
    private fun extractUnit(value: String?, propertyName: String?): String {
        if (value == null) {
            return "px"
        }
        val unit = value.replace(UTSRegExp("[\\d|\\-|\\+|\\.]", "g"), "")
        if (propertyName == "opacity" || propertyName == "z-index") {
            return ""
        }
        return if (unit == "") {
            "px"
        } else {
            unit
        }
    }
    open fun addCustomEasing(name: String, bezierParams: UTSArray<Number>): AnimationEngine {
        if (bezierParams.length == 4) {
            this.easingPresets.set(name, bezierParams)
        }
        return this
    }
    open fun setReverse(reverse: Boolean? = null): AnimationEngine {
        if (reverse != null) {
            this.isReversed = reverse
        } else {
            this.isReversed = !this.isReversed
        }
        return this
    }
    open fun setLoopCount(count: Number): AnimationEngine {
        this.loopCount = count
        return this
    }
    open fun setDuration(duration: Number): AnimationEngine {
        this.animationDuration = duration
        return this
    }
    open fun setAlternate(alternate: Boolean): AnimationEngine {
        this.isAlternate = alternate
        return this
    }
    open fun setSequential(sequential: Boolean): AnimationEngine {
        this.isSequentialMode = sequential
        return this
    }
    open fun addAttribute(propertyName: String, fromValue: String, toValue: String, unique: Boolean = true): AnimationEngine {
        val isColor = this.isColorProperty(propertyName)
        val unit = if (isColor) {
            ""
        } else {
            this.extractUnit(fromValue, propertyName)
        }
        val processedFromValue = if (isColor) {
            getDefaultColor(fromValue)
        } else {
            parseFloat(fromValue).toString(10)
        }
        val processedToValue = if (isColor) {
            getDefaultColor(toValue)
        } else {
            parseFloat(toValue).toString(10)
        }
        var existingIndex = this.animationAttributes.findIndex(fun(attr: AnimationAttribute): Boolean {
            return attr.propertyName == propertyName
        }
        )
        if (!unique) {
            existingIndex = -1
        }
        val newAttribute = AnimationAttribute(fromValue = processedFromValue, toValue = processedToValue, unit = unit, progress = 0, currentValue = processedFromValue, propertyName = propertyName)
        if (existingIndex == -1) {
            this.animationAttributes.push(newAttribute)
        } else {
            this.animationAttributes[existingIndex] = newAttribute
        }
        return this
    }
    open fun transform(property: String, fromValue: String, toValue: String): AnimationEngine {
        return this.addAttribute(property, fromValue, toValue)
    }
    open fun translate(fromX: String, fromY: String, toX: String, toY: String): AnimationEngine {
        this.addAttribute("translateX", fromX, toX)
        this.addAttribute("translateY", fromY, toY)
        return this
    }
    open fun translateX(fromX: String, toX: String): AnimationEngine {
        return this.addAttribute("translateX", fromX, toX)
    }
    open fun translateY(fromY: String, toY: String): AnimationEngine {
        return this.addAttribute("translateY", fromY, toY)
    }
    open fun scale(fromScale: String, toScale: String): AnimationEngine {
        return this.addAttribute("scale", fromScale, toScale)
    }
    open fun rotate(fromDegree: String, toDegree: String): AnimationEngine {
        return this.addAttribute("rotate", fromDegree, toDegree)
    }
    open fun opacity(fromOpacity: String, toOpacity: String): AnimationEngine {
        return this.addAttribute("opacity", fromOpacity, toOpacity)
    }
    private fun interpolateValue(startValue: Number, endValue: Number, progress: Number): Number {
        return startValue + (endValue - startValue) * progress
    }
    private fun isColorProperty(propertyName: String): Boolean {
        return (propertyName.indexOf("background") > -1 || propertyName.indexOf("color") > -1 || propertyName.indexOf("border-color") > -1 || propertyName.indexOf("shadow") > -1)
    }
    private fun isTransformProperty(propertyName: String): Boolean {
        return (propertyName == "scaleX" || propertyName == "scaleY" || propertyName == "scale" || propertyName == "rotateX" || propertyName == "rotateY" || propertyName == "rotate" || propertyName == "translateX" || propertyName == "translateY" || propertyName == "translate")
    }
    private fun setElementProperty(propertyName: String, currentValue: Number, unit: String, progress: Number, attribute: AnimationAttribute): Unit {
        if (this.targetElement == null) {
            return
        }
        val element = this.targetElement!!
        val valueStr = currentValue.toFixed(2)
        when (propertyName) {
            "scaleX" -> 
                element.style!!.setProperty("transform", "scaleX(" + currentValue + ")")
            "scaleY" -> 
                element.style!!.setProperty("transform", "scaleY(" + currentValue + ")")
            "scale" -> 
                element.style!!.setProperty("transform", "scale(" + currentValue + ")")
            "rotateX" -> 
                element.style!!.setProperty("transform", "rotateX(" + (valueStr + unit) + ")")
            "rotateY" -> 
                element.style!!.setProperty("transform", "rotateY(" + (valueStr + unit) + ")")
            "rotate" -> 
                element.style!!.setProperty("transform", "rotate(" + (valueStr + unit) + ")")
            "translateX" -> 
                element.style!!.setProperty("transform", "translateX(" + (valueStr + unit) + ")")
            "translateY" -> 
                element.style!!.setProperty("transform", "translateY(" + (valueStr + unit) + ")")
            "translate" -> 
                element.style!!.setProperty("transform", "translate(" + (valueStr + unit) + "," + (valueStr + unit) + ")")
            else -> 
                if (this.isColorProperty(propertyName)) {
                    val startColor = hexToRgb(attribute.fromValue)
                    val endColor = hexToRgb(attribute.toValue)
                    val startR = if (startColor["getNumber"] != null) {
                        startColor.getNumber("r")
                    } else {
                        (startColor["r"] as Number)
                    }
                    val startG = if (startColor["getNumber"] != null) {
                        startColor.getNumber("g")
                    } else {
                        (startColor["g"] as Number)
                    }
                    val startB = if (startColor["getNumber"] != null) {
                        startColor.getNumber("b")
                    } else {
                        (startColor["b"] as Number)
                    }
                    val startA = if (startColor["getNumber"] != null) {
                        startColor.getNumber("a")
                    } else {
                        (startColor["a"] as Number)
                    }
                    val endR = if (endColor["getNumber"] != null) {
                        endColor.getNumber("r")
                    } else {
                        (endColor["r"] as Number)
                    }
                    val endG = if (endColor["getNumber"] != null) {
                        endColor.getNumber("g")
                    } else {
                        (endColor["g"] as Number)
                    }
                    val endB = if (endColor["getNumber"] != null) {
                        endColor.getNumber("b")
                    } else {
                        (endColor["b"] as Number)
                    }
                    val endA = if (endColor["getNumber"] != null) {
                        endColor.getNumber("a")
                    } else {
                        (endColor["a"] as Number)
                    }
                    val r = this.interpolateValue(if (startR != null) {
                        startR
                    } else {
                        0
                    }, if (endR != null) {
                        endR
                    } else {
                        0
                    }, progress)
                    val g = this.interpolateValue(if (startG != null) {
                        startG
                    } else {
                        0
                    }, if (endG != null) {
                        endG
                    } else {
                        0
                    }, progress)
                    val b = this.interpolateValue(if (startB != null) {
                        startB
                    } else {
                        0
                    }, if (endB != null) {
                        endB
                    } else {
                        0
                    }, progress)
                    val a = this.interpolateValue(if (startA != null) {
                        startA
                    } else {
                        1
                    }, if (endA != null) {
                        endA
                    } else {
                        1
                    }, progress)
                    element.style!!.setProperty(propertyName, "rgba(" + r.toFixed(0) + "," + g.toFixed(0) + "," + b.toFixed(0) + "," + a.toFixed(1) + ")")
                } else {
                    element.style!!.setProperty(propertyName, valueStr + unit)
                }
        }
    }
    private fun runWebAnimation(): Unit {}
    private fun updateAnimationFrame(progress: Number): Unit {
        if (this.targetElement == null) {
            return
        }
        if (!this.isSequentialMode) {
            run {
                var i: Number = 0
                while(i < this.animationAttributes.length){
                    this.updateSingleAttribute(this.animationAttributes[i], progress)
                    i++
                }
            }
        } else {
            if (this.currentAttributeIndex < this.animationAttributes.length) {
                this.updateSingleAttribute(this.animationAttributes[this.currentAttributeIndex], progress)
            }
        }
    }
    private fun updateSingleAttribute(attribute: AnimationAttribute, progress: Number): Unit {
        attribute.progress = progress
        if (!this.isColorProperty(attribute.propertyName)) {
            val fromValue = parseFloat(attribute.fromValue)
            val toValue = parseFloat(attribute.toValue)
            var easedProgress = progress
            if (this.currentEasingFunction != null) {
                easedProgress = this.currentEasingFunction!!(progress)
            }
            var currentValue = this.interpolateValue(fromValue, toValue, easedProgress)
            if (this.isReversed || this.isAlternateReversed) {
                currentValue = this.interpolateValue(toValue, fromValue, easedProgress)
            }
            this.setElementProperty(attribute.propertyName, currentValue, attribute.unit, progress, attribute)
        } else {
            this.setElementProperty(attribute.propertyName, 0, attribute.unit, progress, attribute)
        }
    }
    private fun handleAnimationComplete(): Unit {
        if (this.isSequentialMode && this.currentAttributeIndex < this.animationAttributes.length - 1) {
            this.currentAttributeIndex++
            this.currentProgress = 0
            this.restartAnimation()
            return
        }
        this.currentAttributeIndex = 0
        this.currentProgress = 0
        if (this.isAlternate) {
            this.isAlternateReversed = !this.isAlternateReversed
        }
        if (this.loopCount == -1) {
            this.restartAnimation()
            return
        } else {
            this.currentLoop++
            if (this.currentLoop < this.loopCount) {
                this.restartAnimation()
                return
            }
        }
        this.isRunning = false
        this.onComplete()
    }
    private fun restartAnimation(): Unit {
        this.startTimestamp = 0
        this.runAndroidAnimation()
    }
    private fun runAndroidAnimation(): Unit {
        val self = this
        self.startTimestamp = 0
        if (self.choreographer == null) {
            self.choreographer = Choreographer.getInstance()
        } else {
            if (self.frameCallback != null) {
                self.choreographer!!.removeFrameCallback(self.frameCallback)
            }
        }
        open class frameCallback : Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                if (!self.isRunning || self.isStopping) {
                    return
                }
                if (self.startTimestamp <= 0) {
                    self.startTimestamp = Date.now()
                }
                val elapsed = Date.now() - self.startTimestamp
                val progress = Math.min(elapsed / self.animationDuration + self.currentProgress, 1.0)
                self.updateAnimationFrame(progress)
                if (self.isPaused) {
                    self.isRunning = false
                    self.currentProgress = progress
                    return
                }
                if (progress >= 1.0 || self.isStopping) {
                    self.handleAnimationComplete()
                    return
                }
                if (progress < 1.0 && self.isRunning && !self.isStopping) {
                    self.onFrame(progress)
                    if (self.choreographer != null) {
                        self.choreographer!!.postFrameCallback(this)
                    }
                }
            }
        }
        self.onStart()
        self.frameCallback = frameCallback()
        self.choreographer!!.postFrameCallback(self.frameCallback)
    }
    private fun runMPAnimation(): Unit {}
    open fun play(): AnimationEngine {
        if (this.isRunning) {
            return this
        }
        this.isRunning = true
        this.isStopping = false
        this.isPaused = false
        this.currentLoop = 0
        this.currentAttributeIndex = 0
        this.runAndroidAnimation()
        return this
    }
    open fun playAsync(): UTSPromise<Unit> {
        return UTSPromise<Unit>(fun(resolve, _reject){
            val originalComplete = this.onComplete
            this.onComplete = fun(){
                originalComplete()
                resolve(Unit)
            }
            this.play()
        }
        )
    }
    open fun stop(): AnimationEngine {
        this.isStopping = true
        this.currentProgress = 0
        this.currentAttributeIndex = this.animationAttributes.length
        if (this.choreographer != null && this.frameCallback != null) {
            this.choreographer!!.removeFrameCallback(this.frameCallback)
        }
        this.isRunning = false
        return this
    }
    open fun pause(): AnimationEngine {
        this.isPaused = true
        return this
    }
    open fun resume(): AnimationEngine {
        if (this.isPaused) {
            this.isPaused = false
            this.play()
        }
        return this
    }
    private fun clearElementStyles(): Unit {
        if (this.targetElement == null) {
            return
        }
        val element = this.targetElement!!
        for(attr in resolveUTSValueIterator(this.animationAttributes)){
            val propertyName = attr.propertyName
            if (this.isTransformProperty(propertyName)) {
                element.style!!.setProperty("transform", "")
            } else {
                element.style!!.setProperty(propertyName, "")
            }
        }
    }
    open fun reset(): AnimationEngine {
        this.stop()
        this.clearElementStyles()
        this.currentProgress = 0
        this.currentLoop = 0
        this.currentAttributeIndex = 0
        this.isAlternateReversed = false
        this.isReversed = false
        this.isPaused = false
        this.isStopping = true
        this.startTimestamp = 0
        this.animationAttributes = _uA()
        this.currentEasingFunction = null
        this.onComplete = fun(){}
        this.onStart = fun(){}
        this.onFrame = fun(_progress){}
        if (this.choreographer != null && this.frameCallback != null) {
            this.choreographer!!.removeFrameCallback(this.frameCallback)
            this.frameCallback = null
        }
        this.choreographer = null
        return this
    }
    open fun getProgress(): Number {
        return this.currentProgress
    }
    open fun isAnimating(): Boolean {
        return this.isRunning
    }
    open fun getCurrentLoop(): Number {
        return this.currentLoop
    }
    open fun clearAttributes(): AnimationEngine {
        this.animationAttributes = _uA()
        return this
    }
    open fun getAttributeCount(): Number {
        return this.animationAttributes.length
    }
    open fun fadeIn(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).opacity("0", "1")
    }
    open fun fadeOut(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).opacity("1", "0")
    }
    open fun slideInLeft(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).translateX("-100%", "0%").opacity("0", "1")
    }
    open fun slideInRight(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).translateX("100%", "0%").opacity("0", "1")
    }
    open fun slideInUp(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).addAttribute("translateY", "-100%", "0%").opacity("0", "1")
    }
    open fun slideInDown(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).addAttribute("translateY", "100%", "0%").opacity("0", "1")
    }
    open fun zoomIn(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).scale("0", "1").opacity("0", "1")
    }
    open fun zoomOut(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).scale("1", "0").opacity("1", "0")
    }
    open fun rotateIn(duration: Number = 500, degrees: Number = 360): AnimationEngine {
        return this.setDuration(duration).rotate("0deg", "" + degrees + "deg").opacity("0", "1")
    }
    open fun rotateOut(duration: Number = 500, degrees: Number = 360): AnimationEngine {
        return this.setDuration(duration).rotate("0deg", "" + degrees + "deg").opacity("1", "0")
    }
    open fun bounce(duration: Number = 600): AnimationEngine {
        return this.setDuration(duration).addCustomEasing("bounce", _uA(
            0.68,
            -0.55,
            0.265,
            1.55
        )).scale("1", "1.1").setAlternate(true).setLoopCount(2)
    }
    open fun shake(duration: Number = 500): AnimationEngine {
        return this.setDuration(duration).addAttribute("translateX", "0px", "10px").setAlternate(true).setLoopCount(6)
    }
    open fun sequence(animations: UTSArray<((engine: AnimationEngine) -> AnimationEngine)>): AnimationEngine {
        val self = this
        if (animations.length == 0) {
            return this
        }
        val firstEngine = animations[0](AnimationEngine(this.targetElement, AnimationOptions()))
        if (animations.length == 1) {
            return firstEngine
        }
        fun setNextAnimation(currentEngine: AnimationEngine, remainingAnimations: UTSArray<((engine: AnimationEngine) -> AnimationEngine)>): Unit {
            if (remainingAnimations.length == 0) {
                return
            }
            val originalComplete = currentEngine.onComplete
            currentEngine.onComplete = fun(){
                originalComplete()
                val nextEngine = remainingAnimations[0](AnimationEngine(self.targetElement, AnimationOptions()))
                if (remainingAnimations.length > 1) {
                    setNextAnimation(nextEngine, remainingAnimations.slice(1))
                }
                nextEngine.play()
            }
        }
        setNextAnimation(firstEngine, animations.slice(1))
        return firstEngine
    }
    open fun slideOutLeft(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).translateX("0%", "-100%").opacity("1", "0")
    }
    open fun slideOutRight(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).translateX("0%", "100%").opacity("1", "0")
    }
    open fun slideOutUp(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).addAttribute("translateY", "0%", "-100%").opacity("1", "0")
    }
    open fun slideOutDown(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).addAttribute("translateY", "0%", "100%").opacity("1", "0")
    }
    open fun flipX(duration: Number = 600): AnimationEngine {
        return this.setDuration(duration).addAttribute("rotateX", "0deg", "180deg").addCustomEasing("ease-in-out", _uA(
            0.25,
            0.1,
            0.25,
            1.0
        ))
    }
    open fun flipY(duration: Number = 600): AnimationEngine {
        return this.setDuration(duration).addAttribute("rotateY", "0deg", "180deg").addCustomEasing("ease-in-out", _uA(
            0.25,
            0.1,
            0.25,
            1.0
        ))
    }
    open fun elasticIn(duration: Number = 600): AnimationEngine {
        return this.setDuration(duration).scale("0", "1").opacity("0", "1").addCustomEasing("elastic", _uA(
            0.175,
            0.885,
            0.32,
            1.275
        ))
    }
    open fun elasticOut(duration: Number = 600): AnimationEngine {
        return this.setDuration(duration).scale("1", "0").opacity("1", "0").addCustomEasing("elastic", _uA(
            0.68,
            -0.55,
            0.265,
            1.55
        ))
    }
    open fun rubberBand(duration: Number = 1000): AnimationEngine {
        return this.setDuration(duration).addAttribute("scaleX", "1", "1.25").addAttribute("scaleY", "1", "0.75").setAlternate(true).setLoopCount(2).addCustomEasing("ease-in-out", _uA(
            0.25,
            0.1,
            0.25,
            1.0
        ))
    }
    open fun swing(duration: Number = 1000): AnimationEngine {
        return this.setDuration(duration).addAttribute("rotate", "0deg", "15deg").setAlternate(true).setLoopCount(4).addCustomEasing("ease-in-out", _uA(
            0.25,
            0.1,
            0.25,
            1.0
        ))
    }
    open fun wobble(duration: Number = 1000): AnimationEngine {
        return this.setDuration(duration).addAttribute("translateX", "0px", "25px").addAttribute("rotate", "0deg", "5deg").setAlternate(true).setLoopCount(4)
    }
    open fun rollIn(duration: Number = 600): AnimationEngine {
        return this.setDuration(duration).translateX("-100%", "0%").rotate("-120deg", "0deg").opacity("0", "1")
    }
    open fun rollOut(duration: Number = 600): AnimationEngine {
        return this.setDuration(duration).translateX("0%", "100%").rotate("0deg", "120deg").opacity("1", "0")
    }
    open fun lightSpeed(duration: Number = 500): AnimationEngine {
        return this.setDuration(duration).translateX("-100%", "0%").addAttribute("skewX", "-30deg", "0deg").opacity("0", "1").addCustomEasing("ease-out", _uA(
            0.25,
            0.46,
            0.45,
            0.94
        ))
    }
    open fun float(duration: Number = 3000): AnimationEngine {
        return this.setDuration(duration).translateY("0px", "-10px").setAlternate(true).setLoopCount(-1).addCustomEasing("ease-in-out", _uA(
            0.25,
            0.1,
            0.25,
            1.0
        ))
    }
    open fun breathe(duration: Number = 2000): AnimationEngine {
        return this.setDuration(duration).scale("1", "1.1").setAlternate(true).setLoopCount(-1).addCustomEasing("ease-in-out", _uA(
            0.25,
            0.1,
            0.25,
            1.0
        ))
    }
    open fun glow(duration: Number = 1500): AnimationEngine {
        return this.setDuration(duration).addAttribute("boxShadow", "0 0 5px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,1)").setAlternate(true).setLoopCount(-1).addCustomEasing("ease-in-out", _uA(
            0.25,
            0.1,
            0.25,
            1.0
        ))
    }
    open fun progressBar(duration: Number = 1000, progress: Number = 100): AnimationEngine {
        return this.setDuration(duration).addAttribute("width", "0%", "" + progress + "%").addCustomEasing("ease-out", _uA(
            0.25,
            0.46,
            0.45,
            0.94
        ))
    }
    open fun modalIn(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).scale("0.7", "1").opacity("0", "1").addCustomEasing("ease-out", _uA(
            0.25,
            0.46,
            0.45,
            0.94
        ))
    }
    open fun modalOut(duration: Number = 300): AnimationEngine {
        return this.setDuration(duration).scale("1", "0.7").opacity("1", "0").addCustomEasing("ease-in", _uA(
            0.42,
            0.0,
            1.0,
            1.0
        ))
    }
    open fun cardFlip(duration: Number = 600): AnimationEngine {
        return this.setDuration(duration).addAttribute("rotateY", "0deg", "180deg").addCustomEasing("ease-in-out", _uA(
            0.25,
            0.1,
            0.25,
            1.0
        ))
    }
    open fun ripple(duration: Number = 600): AnimationEngine {
        return this.setDuration(duration).scale("0", "4").opacity("0.7", "0").addCustomEasing("ease-out", _uA(
            0.25,
            0.46,
            0.45,
            0.94
        ))
    }
}
fun createAnimation(element: UniElement?, options: AnimationOptions = AnimationOptions()): AnimationEngine {
    return AnimationEngine(element, options)
}
val cool = fun(app: VueApp){}
open class CacheData (
    @JsonNotNull
    open var key: Number,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return CacheDataReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class CacheDataReactiveObject : CacheData, IUTSReactive<CacheData> {
    override var __v_raw: CacheData
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: CacheData, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(key = __v_raw.key) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): CacheDataReactiveObject {
        return CacheDataReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var key: Number
        get() {
            return _tRG(__v_raw, "key", __v_raw.key, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("key")) {
                return
            }
            val oldValue = __v_raw.key
            __v_raw.key = value
            _tRS(__v_raw, "key", oldValue, value)
        }
}
val isDark = ref(false)
open class UseCache (
    @JsonNotNull
    open var cache: CacheData,
) : UTSObject()
val useCache = fun(source: () -> UTSArray<Any>): UseCache {
    val cache = reactive<CacheData>(CacheData(key = 0))
    watch(source, fun(){
        cache.key++
    }
    )
    watch(isDark, fun(){
        cache.key++
    }
    )
    return UseCache(cache = cache)
}
val t = fun(name: String): String {
    return name
}
val `$t` = fun(name: String, data: Any): String {
    var text = t(name)
    if (!isNull(data)) {
        forInObject(data, fun(reassignedValue, key){
            var value = reassignedValue
            if (UTSAndroid.`typeof`(value) === "number") {
                value = (value as Number).toString()
            }
            text = text.replaceAll("{" + key + "}", value as String)
        }
        )
    }
    return text
}
val iconfont: UTSJSONObject = object : UTSJSONObject() {
    var back = "e6db"
    var yue = "e6bb"
    var wancheng = "e6bc"
    var shibai = "e6bd"
    var bofang = "e6be"
    var pinglun = "e6bf"
    var huatong = "e6c0"
    var dianzan = "e6c1"
    var fuli = "e6c2"
    var jiudian = "e6c3"
    var tupian = "e6c5"
    var dingwei = "e6c6"
    var vip = "e6c8"
    var yunduan = "e6c9"
    var naozhong = "e6ca"
    var jiaoliu = "e6cb"
    var shouru = "e6cc"
    var zhichu = "e6cd"
    var shijian = "e6ce"
    var paizhao = "e6cf"
    var qiche = "e6d0"
    var shuipiao = "e6d1"
    var dingyue = "e6d2"
    var kefu_2 = "e6d3"
    var tuichudenglu = "e6d4"
    var pinglun_2 = "e6d5"
    var qianbao = "e6d6"
    var sousuo_2 = "e6d7"
    var youhuiquan = "e6d8"
    var gouwudai = "e6ea"
    var guanli = "e6fd"
    var qianbi = "e70d"
    var huangguan = "e712"
}
val remixicon: UTSJSONObject = object : UTSJSONObject() {
    var `arrow-left-up-line` = "ea66"
    var `arrow-up-line` = "ea76"
    var `arrow-right-up-line` = "ea70"
    var `arrow-right-line` = "ea6c"
    var `arrow-right-down-line` = "ea6a"
    var `arrow-down-line` = "ea4c"
    var `arrow-left-down-line` = "ea5e"
    var `arrow-left-line` = "ea60"
    var `arrow-up-circle-line` = "ea72"
    var `arrow-right-circle-line` = "ea68"
    var `arrow-down-circle-line` = "ea4a"
    var `arrow-left-circle-line` = "ea5c"
    var `arrow-up-circle-fill` = "ea71"
    var `arrow-right-circle-fill` = "ea67"
    var `arrow-down-circle-fill` = "ea49"
    var `arrow-left-circle-fill` = "ea5b"
    var `arrow-up-s-line` = "ea78"
    var `arrow-right-s-line` = "ea6e"
    var `arrow-down-s-line` = "ea4e"
    var `arrow-left-s-line` = "ea64"
    var `arrow-left-s-fill` = "ea63"
    var `arrow-down-s-fill` = "ea4d"
    var `arrow-right-s-fill` = "ea6d"
    var `arrow-up-s-fill` = "ea77"
    var `arrow-up-down-line` = "ea74"
    var `arrow-left-right-line` = "ea62"
    var `arrow-right-double-line` = "f2e5"
    var `arrow-up-double-line` = "f2eb"
    var `skip-up-line` = "f367"
    var `expand-up-down-line` = "f327"
    var `expand-left-right-line` = "f323"
    var `expand-left-line` = "f321"
    var `expand-right-line` = "f325"
    var `arrow-go-back-line` = "ea58"
    var `arrow-go-forward-line` = "ea5a"
    var `home-2-line` = "ee19"
    var `home-2-fill` = "ee18"
    var `store-2-line` = "f1a5"
    var `store-2-fill` = "f1a4"
    var `store-3-fill` = "f1a6"
    var `store-3-line` = "f1a7"
    var `ancient-pavilion-line` = "ea34"
    var `ancient-pavilion-fill` = "ea33"
    var `tent-line` = "f3df"
    var `tent-fill` = "f3de"
    var `hospital-fill` = "ee36"
    var `hospital-line` = "ee37"
    var `ancient-gate-line` = "ea32"
    var `ancient-gate-fill` = "ea31"
    var `mail-line` = "eef6"
    var `mail-fill` = "eef3"
    var `mail-send-line` = "eefc"
    var `mail-send-fill` = "eefb"
    var `mail-unread-fill` = "ef01"
    var `mail-unread-line` = "ef02"
    var `mail-add-fill` = "eeeb"
    var `mail-add-line` = "eeec"
    var `mail-ai-line` = "f585"
    var `mail-ai-fill` = "f584"
    var `inbox-line` = "ee4f"
    var `inbox-fill` = "ee4e"
    var `inbox-archive-line` = "ee4d"
    var `inbox-archive-fill` = "ee4c"
    var `inbox-unarchive-line` = "ee51"
    var `inbox-unarchive-fill` = "ee50"
    var `cloud-line` = "eb9d"
    var `cloud-fill` = "eb9c"
    var `cloud-off-line` = "eb9f"
    var `cloud-off-fill` = "eb9e"
    var `archive-line` = "ea48"
    var `archive-fill` = "ea47"
    var `profile-fill` = "f02c"
    var `profile-line` = "f02d"
    var `award-line` = "ea8a"
    var `award-fill` = "ea89"
    var `at-line` = "ea83"
    var `at-fill` = "ea82"
    var `medal-fill` = "ef27"
    var `medal-line` = "ef28"
    var `verified-badge-line` = "f3e9"
    var `verified-badge-fill` = "f3e8"
    var `bar-chart-line` = "ea9e"
    var `bar-chart-horizontal-line` = "ea9d"
    var `bar-chart-2-line` = "ea96"
    var `pie-chart-line` = "effa"
    var `bubble-chart-line` = "eb03"
    var `bar-chart-grouped-line` = "ea9b"
    var `donut-chart-line` = "ec42"
    var `line-chart-line` = "eeab"
    var `bookmark-fill` = "eae4"
    var `bookmark-line` = "eae5"
    var `briefcase-fill` = "eaf4"
    var `briefcase-line` = "eaf5"
    var `donut-chart-fill` = "ec41"
    var `line-chart-fill` = "eeaa"
    var `calendar-line` = "eb27"
    var `calendar-fill` = "eb26"
    var `calculator-fill` = "eb1e"
    var `calculator-line` = "eb1f"
    var `customer-service-line` = "ec0e"
    var `customer-service-fill` = "ec0d"
    var `flag-fill` = "ed3a"
    var `flag-line` = "ed3b"
    var `flag-off-line` = "f577"
    var `flag-off-fill` = "f576"
    var `global-line` = "edcf"
    var `global-fill` = "edce"
    var `links-fill` = "eeb7"
    var `links-line` = "eeb8"
    var `printer-line` = "f029"
    var `printer-fill` = "f028"
    var `reply-line` = "f07a"
    var `reply-fill` = "f079"
    var `send-plane-line` = "f0da"
    var `send-plane-fill` = "f0d9"
    var `slideshow-fill` = "f157"
    var `slideshow-line` = "f158"
    var `window-line` = "f2c6"
    var `window-fill` = "f2c5"
    var `stack-fill` = "f180"
    var `stack-line` = "f181"
    var `service-fill` = "f0e1"
    var `service-line` = "f0e2"
    var `registered-fill` = "f069"
    var `registered-line` = "f06a"
    var `trademark-fill` = "f21e"
    var `trademark-line` = "f21f"
    var `advertisement-fill` = "ea16"
    var `advertisement-line` = "ea17"
    var `copyright-line` = "ebe2"
    var `copyright-fill` = "ebe1"
    var `creative-commons-nd-line` = "ebf8"
    var `creative-commons-nd-fill` = "ebf7"
    var `id-card-line` = "f4e9"
    var `id-card-fill` = "f4e8"
    var `info-card-line` = "f57f"
    var `info-card-fill` = "f57e"
    var `pass-pending-fill` = "f388"
    var `pass-pending-line` = "f389"
    var `pass-expired-fill` = "f386"
    var `pass-expired-line` = "f387"
    var `pass-valid-fill` = "f38a"
    var `pass-valid-line` = "f38b"
    var `megaphone-fill` = "f384"
    var `megaphone-line` = "f385"
    var `creative-commons-by-fill` = "ebf1"
    var `creative-commons-by-line` = "ebf2"
    var `creative-commons-fill` = "ebf3"
    var `creative-commons-line` = "ebf4"
    var `creative-commons-nc-line` = "ebf6"
    var `creative-commons-nc-fill` = "ebf5"
    var `copyleft-fill` = "ebdf"
    var `copyleft-line` = "ebe0"
    var `message-2-line` = "ef44"
    var `message-2-fill` = "ef43"
    var `chat-check-line` = "eb55"
    var `chat-check-fill` = "eb54"
    var `chat-unread-fill` = "f529"
    var `chat-unread-line` = "f52a"
    var `chat-new-line` = "eb63"
    var `chat-new-fill` = "eb62"
    var `chat-delete-fill` = "eb56"
    var `chat-delete-line` = "eb57"
    var `message-fill` = "ef47"
    var `message-line` = "ef48"
    var `chat-4-line` = "eb53"
    var `chat-4-fill` = "eb52"
    var `chat-settings-fill` = "eb6c"
    var `chat-settings-line` = "eb6d"
    var `chat-download-fill` = "eb58"
    var `chat-download-line` = "eb59"
    var `chat-upload-line` = "eb75"
    var `chat-upload-fill` = "eb74"
    var `chat-forward-fill` = "eb5c"
    var `chat-forward-line` = "eb5d"
    var `chat-heart-line` = "eb5f"
    var `chat-heart-fill` = "eb5e"
    var `chat-off-line` = "eb65"
    var `chat-off-fill` = "eb64"
    var `feedback-line` = "ecc1"
    var `feedback-fill` = "ecc0"
    var `question-answer-line` = "f043"
    var `question-answer-fill` = "f042"
    var `questionnaire-line` = "f048"
    var `questionnaire-fill` = "f047"
    var `speak-fill` = "f36e"
    var `speak-line` = "f36f"
    var `chat-thread-line` = "f473"
    var `chat-thread-fill` = "f472"
    var `chat-history-fill` = "eb60"
    var `chat-history-line` = "eb61"
    var `chat-private-line` = "eb69"
    var `chat-private-fill` = "eb68"
    var `emoji-sticker-line` = "f37f"
    var `emoji-sticker-fill` = "f37e"
    var `edit-line` = "ec86"
    var `edit-fill` = "ec85"
    var `markup-line` = "ef20"
    var `markup-fill` = "ef1f"
    var `edit-box-fill` = "ec81"
    var `edit-box-line` = "ec82"
    var `computer-line` = "ebca"
    var `computer-fill` = "ebc9"
    var `tv-line` = "f237"
    var `tv-fill` = "f236"
    var `smartphone-line` = "f15a"
    var `smartphone-fill` = "f159"
    var `device-fill` = "ec2d"
    var `device-line` = "ec2e"
    var `phone-line` = "efec"
    var `phone-fill` = "efe9"
    var `instance-fill` = "f382"
    var `instance-line` = "f383"
    var `database-2-line` = "ec16"
    var `database-2-fill` = "ec15"
    var `keyboard-box-fill` = "ee72"
    var `keyboard-box-line` = "ee73"
    var `shut-down-line` = "f126"
    var `shut-down-fill` = "f125"
    var `fingerprint-line` = "ed31"
    var `fingerprint-fill` = "ed30"
    var `barcode-box-line` = "eaa0"
    var `barcode-box-fill` = "ea9f"
    var `qr-code-line` = "f03d"
    var `qr-code-fill` = "f03c"
    var `qr-scan-fill` = "f040"
    var `qr-scan-line` = "f041"
    var `draft-line` = "ec5c"
    var `draft-fill` = "ec5b"
    var `file-paper-line` = "ecfb"
    var `file-paper-fill` = "ecfa"
    var `file-line` = "eceb"
    var `file-fill` = "ece0"
    var `sticky-note-fill` = "f19a"
    var `sticky-note-line` = "f19b"
    var `file-edit-line` = "ecdb"
    var `file-edit-fill` = "ecda"
    var `file-copy-fill` = "ecd4"
    var `file-copy-line` = "ecd5"
    var `bill-fill` = "eac1"
    var `bill-line` = "eac2"
    var `article-fill` = "ea7d"
    var `article-line` = "ea7e"
    var `survey-fill` = "f1c6"
    var `survey-line` = "f1c7"
    var `clipboard-line` = "eb91"
    var `clipboard-fill` = "eb90"
    var `news-fill` = "f417"
    var `news-line` = "f418"
    var `file-zip-fill` = "ed1e"
    var `file-zip-line` = "ed1f"
    var `todo-fill` = "f216"
    var `todo-line` = "f217"
    var `book-marked-line` = "ead9"
    var `book-marked-fill` = "ead8"
    var `task-fill` = "f1e7"
    var `task-line` = "f1e8"
    var `double-quotes-l` = "ec51"
    var `double-quotes-r` = "ec52"
    var `single-quotes-l` = "f13b"
    var `single-quotes-r` = "f13c"
    var `list-check` = "eeba"
    var `list-ordered` = "eebb"
    var `list-radio` = "f39b"
    var `sort-asc` = "f15f"
    var `sort-desc` = "f160"
    var `send-backward` = "f0d6"
    var `bring-forward` = "eaf6"
    var `wallet-line` = "f2ae"
    var `wallet-fill` = "f2ad"
    var `bank-card-line` = "ea92"
    var `bank-card-fill` = "ea91"
    var `refund-line` = "f068"
    var `refund-fill` = "f067"
    var `safe-fill` = "f0aa"
    var `safe-line` = "f0ab"
    var `price-tag-line` = "f025"
    var `price-tag-fill` = "f024"
    var `ticket-line` = "f20d"
    var `ticket-fill` = "f20c"
    var `coupon-line` = "ebee"
    var `coupon-fill` = "ebed"
    var `shopping-bag-line` = "f118"
    var `shopping-bag-fill` = "f117"
    var `shopping-cart-line` = "f120"
    var `shopping-cart-fill` = "f11f"
    var `vip-line` = "f292"
    var `vip-fill` = "f291"
    var `vip-crown-2-line` = "f28c"
    var `vip-crown-2-fill` = "f28b"
    var `vip-diamond-fill` = "f28f"
    var `vip-diamond-line` = "f290"
    var `exchange-fill` = "ecaa"
    var `exchange-line` = "ecad"
    var `trophy-fill` = "f22e"
    var `trophy-line` = "f22f"
    var `swap-line` = "f1cb"
    var `swap-fill` = "f1ca"
    var `exchange-cny-line` = "eca7"
    var `exchange-dollar-line` = "eca9"
    var `exchange-funds-line` = "ecac"
    var `copper-coin-line` = "ebdc"
    var `copper-coin-fill` = "ebdb"
    var `money-cny-box-line` = "ef5f"
    var `money-cny-box-fill` = "ef5e"
    var `money-cny-circle-line` = "ef61"
    var `money-cny-circle-fill` = "ef60"
    var `money-dollar-circle-line` = "ef65"
    var `money-dollar-circle-fill` = "ef64"
    var `increase-decrease-fill` = "ee52"
    var `increase-decrease-line` = "ee53"
    var `red-packet-fill` = "f05f"
    var `red-packet-line` = "f060"
    var `auction-fill` = "ea87"
    var `auction-line` = "ea88"
    var `gift-line` = "edbb"
    var `gift-fill` = "edba"
    var `24-hours-line` = "ea02"
    var `nft-line` = "f347"
    var `nft-fill` = "f346"
    var `heart-fill` = "ee0e"
    var `heart-line` = "ee0f"
    var `heart-add-line` = "ee0d"
    var `heart-add-fill` = "ee0c"
    var `rest-time-fill` = "f07d"
    var `rest-time-line` = "f07e"
    var `apple-line` = "ea40"
    var `apple-fill` = "ea3f"
    var `alipay-fill` = "ea2b"
    var `alipay-line` = "ea2c"
    var `wechat-fill` = "f2b5"
    var `wechat-line` = "f2b6"
    var `wechat-pay-line` = "f2b8"
    var `wechat-pay-fill` = "f2b7"
    var `mini-program-fill` = "ef5a"
    var `mini-program-line` = "ef5b"
    var `android-line` = "ea36"
    var `android-fill` = "ea35"
    var `map-pin-line` = "ef14"
    var `map-pin-fill` = "ef13"
    var `map-pin-time-fill` = "ef17"
    var `map-pin-time-line` = "ef18"
    var `pushpin-fill` = "f038"
    var `pushpin-line` = "f039"
    var `unpin-line` = "f377"
    var `unpin-fill` = "f376"
    var `compass-fill` = "ebc3"
    var `compass-line` = "ebc4"
    var `earth-line` = "ec7a"
    var `earth-fill` = "ec79"
    var `parking-box-fill` = "efcd"
    var `parking-box-line` = "efce"
    var `navigation-fill` = "ef88"
    var `navigation-line` = "ef89"
    var `image-line` = "ee4b"
    var `image-fill` = "ee4a"
    var `multi-image-line` = "f5ee"
    var `multi-image-fill` = "f5ed"
    var `video-on-line` = "f51e"
    var `video-on-fill` = "f51d"
    var `clapperboard-line` = "eb8f"
    var `clapperboard-fill` = "eb8e"
    var `film-fill` = "ed20"
    var `film-line` = "ed21"
    var `movie-fill` = "ef80"
    var `movie-line` = "ef81"
    var `live-line` = "eec0"
    var `live-fill` = "eebf"
    var `vidicon-line` = "f288"
    var `vidicon-fill` = "f287"
    var `video-off-line` = "f51c"
    var `video-off-fill` = "f51b"
    var `camera-fill` = "eb2e"
    var `camera-line` = "eb31"
    var `camera-off-fill` = "eb32"
    var `camera-off-line` = "eb33"
    var `camera-lens-fill` = "eb2f"
    var `camera-lens-line` = "eb30"
    var `mv-line` = "ef87"
    var `mv-fill` = "ef86"
    var `music-2-fill` = "ef82"
    var `music-2-line` = "ef83"
    var `headphone-fill` = "ee04"
    var `headphone-line` = "ee05"
    var `mic-line` = "ef50"
    var `mic-fill` = "ef4f"
    var `mic-off-line` = "ef52"
    var `mic-off-fill` = "ef51"
    var `volume-down-fill` = "f29b"
    var `volume-down-line` = "f29c"
    var `volume-mute-line` = "f29e"
    var `volume-mute-fill` = "f29d"
    var `notification-4-line` = "ef96"
    var `notification-4-fill` = "ef95"
    var `notification-off-fill` = "ef9b"
    var `notification-off-line` = "ef9c"
    var `play-circle-line` = "f009"
    var `play-circle-fill` = "f008"
    var `pause-circle-line` = "efd6"
    var `pause-circle-fill` = "efd5"
    var `record-circle-line` = "f05a"
    var `record-circle-fill` = "f059"
    var `stop-circle-fill` = "f19e"
    var `stop-circle-line` = "f19f"
    var `fullscreen-line` = "ed9c"
    var `fullscreen-exit-line` = "ed9a"
    var `equalizer-2-line` = "f405"
    var `equalizer-2-fill` = "f404"
    var `apps-line` = "ea44"
    var `apps-fill` = "ea43"
    var `function-line` = "ed9e"
    var `function-fill` = "ed9d"
    var `dashboard-horizontal-line` = "f4ce"
    var `dashboard-horizontal-fill` = "f4cd"
    var `menu-line` = "ef3e"
    var `menu-add-line` = "ef3a"
    var `star-line` = "f18b"
    var `star-fill` = "f186"
    var `star-off-line` = "f59b"
    var `star-off-fill` = "f59a"
    var `more-line` = "ef79"
    var `more-fill` = "ef78"
    var `more-2-line` = "ef77"
    var `more-2-fill` = "ef76"
    var `settings-fill` = "f0ed"
    var `settings-line` = "f0ee"
    var `forbid-fill` = "ed94"
    var `forbid-line` = "ed95"
    var `prohibited-line` = "f3a1"
    var `prohibited-fill` = "f3a0"
    var `information-2-line` = "f449"
    var `information-2-fill` = "f448"
    var `error-warning-fill` = "eca0"
    var `error-warning-line` = "eca1"
    var `question-fill` = "f044"
    var `question-line` = "f045"
    var `checkbox-blank-circle-line` = "eb7d"
    var `checkbox-blank-circle-fill` = "eb7c"
    var `checkbox-circle-fill` = "eb80"
    var `checkbox-circle-line` = "eb81"
    var `checkbox-blank-line` = "eb7f"
    var `checkbox-blank-fill` = "eb7e"
    var `checkbox-line` = "eb85"
    var `checkbox-fill` = "eb82"
    var `add-circle-line` = "ea11"
    var `add-circle-fill` = "ea10"
    var `indeterminate-circle-fill` = "ee56"
    var `indeterminate-circle-line` = "ee57"
    var `close-circle-line` = "eb97"
    var `close-circle-fill` = "eb96"
    var `radio-button-line` = "f050"
    var `radio-button-fill` = "f04f"
    var `check-line` = "eb7b"
    var `close-line` = "eb99"
    var `add-line` = "ea13"
    var `subtract-line` = "f1af"
    var `divide-line` = "ec40"
    var `equal-line` = "f31f"
    var `upload-line` = "f250"
    var `download-line` = "ec5a"
    var `upload-cloud-2-line` = "f24c"
    var `upload-cloud-2-fill` = "f24b"
    var `download-cloud-2-line` = "ec56"
    var `download-cloud-2-fill` = "ec55"
    var `login-box-line` = "eed4"
    var `login-box-fill` = "eed3"
    var `shield-cross-line` = "f102"
    var `shield-cross-fill` = "f101"
    var `shield-check-fill` = "f0ff"
    var `shield-check-line` = "f100"
    var `delete-bin-fill` = "ec29"
    var `delete-bin-line` = "ec2a"
    var `lock-line` = "eece"
    var `lock-fill` = "eecd"
    var `lock-unlock-line` = "eed2"
    var `lock-unlock-fill` = "eed1"
    var `lock-password-line` = "eed0"
    var `lock-password-fill` = "eecf"
    var `eye-fill` = "ecb4"
    var `eye-line` = "ecb5"
    var `eye-off-line` = "ecb7"
    var `eye-off-fill` = "ecb6"
    var `search-line` = "f0d1"
    var `search-fill` = "f0d0"
    var `share-line` = "f0fe"
    var `share-fill` = "f0f7"
    var `share-box-line` = "f0f4"
    var `share-box-fill` = "f0f3"
    var `share-circle-line` = "f0f6"
    var `share-circle-fill` = "f0f5"
    var `time-fill` = "f20e"
    var `time-line` = "f20f"
    var `thumb-up-line` = "f207"
    var `thumb-up-fill` = "f206"
    var `notification-badge-fill` = "ef97"
    var `notification-badge-line` = "ef98"
    var `toggle-line` = "f219"
    var `toggle-fill` = "f218"
    var `filter-line` = "ed27"
    var `filter-fill` = "ed26"
    var `history-line` = "ee17"
    var `loop-left-line` = "f33d"
    var `loader-2-line` = "eec2"
    var `loader-4-line` = "eec6"
    var `reset-right-line` = "f544"
    var `loader-fill` = "eec9"
    var `user-3-line` = "f256"
    var `user-3-fill` = "f255"
    var `sun-fill` = "f1bc"
    var `sun-line` = "f1bf"
    var `moon-fill` = "ef72"
    var `moon-line` = "ef75"
    var `shining-line` = "f35e"
    var `shining-fill` = "f35d"
    var `fire-fill` = "ed32"
    var `fire-line` = "ed33"
    var `sparkling-line` = "f36d"
    var `sparkling-fill` = "f36c"
    var `box-1-line` = "f2f1"
    var `box-1-fill` = "f2f0"
    var `account-box-line` = "ea07"
    var `account-box-fill` = "ea06"
    var `account-circle-fill` = "ea08"
    var `account-circle-line` = "ea09"
    var `account-pin-box-fill` = "ea0a"
    var `account-pin-box-line` = "ea0b"
    var `skip-up-fill` = "f366"
    var `arrow-left-right-fill` = "ea61"
    var `arrow-up-down-fill` = "ea73"
    var `arrow-up-double-fill` = "f2ea"
    var `arrow-right-double-fill` = "f2e4"
    var `expand-left-fill` = "f320"
    var `expand-right-fill` = "f324"
    var `expand-up-down-fill` = "f326"
    var `expand-left-right-fill` = "f322"
    var `arrow-go-back-fill` = "ea57"
    var `arrow-go-forward-fill` = "ea59"
    var `contract-left-line` = "f2fd"
    var `contract-right-line` = "f301"
    var `contract-right-fill` = "f300"
    var `contract-left-fill` = "f2fc"
    var `drag-move-line` = "ec62"
    var `drag-move-fill` = "ec61"
    var `home-line` = "ee2b"
    var `home-fill` = "ee26"
    var `mail-open-line` = "eefa"
    var `mail-open-fill` = "eef9"
    var `attachment-line` = "ea86"
    var `attachment-fill` = "ea85"
    var `bar-chart-fill` = "ea99"
    var `bar-chart-horizontal-fill` = "ea9c"
    var `bar-chart-2-fill` = "ea95"
    var `bar-chart-grouped-fill` = "ea9a"
    var `bubble-chart-fill` = "eb02"
    var `pie-chart-fill` = "eff9"
    var `calendar-schedule-line` = "f3f3"
    var `calendar-schedule-fill` = "f3f2"
    var `calendar-todo-line` = "eb29"
    var `calendar-todo-fill` = "eb28"
    var `calendar-event-fill` = "eb24"
    var `calendar-event-line` = "eb25"
    var `calendar-close-fill` = "f38d"
    var `calendar-check-fill` = "eb22"
    var `calendar-check-line` = "eb23"
    var `calendar-close-line` = "f38e"
    var `message-3-line` = "ef46"
    var `message-3-fill` = "ef45"
    var `chat-3-fill` = "eb50"
    var `chat-3-line` = "eb51"
    var `chat-1-fill` = "eb4c"
    var `chat-1-line` = "eb4d"
    var `chat-2-fill` = "eb4e"
    var `chat-2-line` = "eb4f"
    var `crop-line` = "ec02"
    var `crop-fill` = "ec01"
    var `palette-line` = "efc5"
    var `palette-fill` = "efc4"
    var `anticlockwise-line` = "ea3c"
    var `anticlockwise-fill` = "ea3b"
    var `clockwise-line` = "eb95"
    var `clockwise-fill` = "eb94"
    var `code-s-slash-fill` = "ebac"
    var `code-s-slash-line` = "ebad"
    var `puzzle-fill` = "f451"
    var `puzzle-line` = "f452"
    var `server-fill` = "f0df"
    var `server-line` = "f0e0"
    var `qr-scan-2-fill` = "f03e"
    var `qr-scan-2-line` = "f03f"
    var `scan-line` = "f0bd"
    var `scan-fill` = "f0bc"
    var `phone-find-fill` = "efea"
    var `phone-find-line` = "efeb"
    var `barcode-line` = "eaa2"
    var `barcode-fill` = "eaa1"
    var `file-list-fill` = "ecf0"
    var `file-list-line` = "ecf1"
    var `file-text-line` = "ed0f"
    var `file-text-fill` = "ed0e"
    var `book-fill` = "ead6"
    var `book-line` = "ead7"
    var text = "f201"
    var `font-family` = "f390"
    var link = "eeb2"
    var translate = "f227"
    var `copper-diamond-fill` = "ebdd"
    var `copper-diamond-line` = "ebde"
    var `dislike-fill` = "ec3b"
    var `dislike-line` = "ec3c"
    var `heart-3-fill` = "ee0a"
    var `heart-3-line` = "ee0b"
    var `hearts-fill` = "ee12"
    var `hearts-line` = "ee13"
    var `map-line` = "ef08"
    var `map-fill` = "ef07"
    var `image-circle-fill` = "f412"
    var `image-circle-line` = "f413"
    var `image-edit-fill` = "ee48"
    var `image-edit-line` = "ee49"
    var `image-add-line` = "ee47"
    var `image-add-fill` = "ee46"
    var `landscape-line` = "ee7d"
    var `landscape-fill` = "ee7c"
    var `check-double-line` = "eb79"
    var `check-double-fill` = "eb78"
    var `close-fill` = "eb98"
    var `add-fill` = "ea12"
    var `subtract-fill` = "f1ae"
    var `divide-fill` = "ec3f"
    var `equal-fill` = "f31e"
    var `logout-circle-line` = "eedc"
    var `logout-circle-fill` = "eedb"
    var `shield-fill` = "f103"
    var `shield-line` = "f108"
    var `timer-line` = "f215"
    var `timer-fill` = "f212"
    var `delete-back-2-line` = "ec1a"
    var `delete-back-2-fill` = "ec19"
    var `volume-vibrate-line` = "f2a4"
    var `volume-vibrate-fill` = "f2a3"
    var `volume-off-vibrate-line` = "f2a0"
    var `volume-off-vibrate-fill` = "f29f"
    var `truck-line` = "f231"
    var `truck-fill` = "f230"
    var `flight-takeoff-line` = "ed43"
    var `flight-takeoff-fill` = "ed42"
    var `road-map-line` = "f08e"
    var `road-map-fill` = "f08d"
    var `pushpin-2-line` = "f037"
    var `pushpin-2-fill` = "f036"
    var `map-pin-2-line` = "ef0a"
    var `map-pin-2-fill` = "ef09"
    var `compass-discover-line` = "ebc2"
    var `compass-discover-fill` = "ebc1"
    var `signpost-fill` = "f48d"
    var `signpost-line` = "f48e"
    var `qq-line` = "f03b"
    var `qq-fill` = "f03a"
    var `tiktok-line` = "f373"
    var `tiktok-fill` = "f372"
    var `user-smile-line` = "f274"
    var `user-smile-fill` = "f273"
    var `user-line` = "f264"
    var `user-fill` = "f25f"
    var `user-add-fill` = "f25d"
    var `user-add-line` = "f25e"
    var `user-minus-line` = "f54c"
    var `user-minus-fill` = "f54b"
    var `user-follow-fill` = "f260"
    var `user-follow-line` = "f261"
    var `user-unfollow-line` = "f278"
    var `user-unfollow-fill` = "f277"
    var `user-shared-fill` = "f271"
    var `user-shared-line` = "f272"
    var `user-received-fill` = "f269"
    var `user-received-line` = "f26a"
    var `user-search-line` = "f26c"
    var `user-search-fill` = "f26b"
    var `user-location-line` = "f266"
    var `user-location-fill` = "f265"
    var `user-star-line` = "f276"
    var `user-star-fill` = "f275"
    var `user-settings-fill` = "f26d"
    var `user-settings-line` = "f26e"
    var `user-heart-line` = "f263"
    var `user-heart-fill` = "f262"
    var `user-forbid-line` = "f3be"
    var `user-forbid-fill` = "f3bd"
    var `group-fill` = "ede2"
    var `group-line` = "ede3"
    var `user-2-fill` = "f253"
    var `user-2-line` = "f254"
    var `shield-user-line` = "f10c"
    var `shield-user-fill` = "f10b"
    var `circle-line` = "f3c2"
    var `circle-fill` = "f3c1"
    var sketching = "f35f"
    var `align-bottom` = "ea24"
    var `restart-line` = "f080"
    var `restart-fill` = "f07f"
    var `refresh-line` = "f064"
    var `refresh-fill` = "f063"
    var `reset-left-line` = "f542"
    var `reset-left-fill` = "f541"
    var `skip-down-line` = "f361"
    var `skip-down-fill` = "f360"
    var `skip-right-line` = "f365"
    var `skip-right-fill` = "f364"
    var `skip-left-fill` = "f362"
    var `skip-left-line` = "f363"
    var `text-snippet` = "f46e"
    var `input-method-line` = "ee60"
    var `input-method-fill` = "ee5f"
    var `font-size` = "ed8d"
    var `font-size-2` = "ed8c"
    var `font-color` = "ed8b"
    var `node-tree` = "ef90"
    var `price-tag-3-line` = "f023"
    var `price-tag-3-fill` = "f022"
    var `input-field` = "f47a"
    var `timeline-view` = "f46f"
    var `progress-2-line` = "f47e"
    var `progress-2-fill` = "f47d"
    var `t-box-line` = "f1d3"
    var `t-box-fill` = "f1d2"
    var `edit-2-fill` = "ec7f"
    var `edit-2-line` = "ec80"
    var `layout-2-line` = "ee7f"
    var `layout-2-fill` = "ee7e"
    var `layout-column-fill` = "ee8c"
    var `layout-column-line` = "ee8d"
    var `mouse-line` = "ef7d"
    var `mouse-fill` = "ef7c"
    var `file-upload-line` = "ed15"
    var `file-upload-fill` = "ed14"
    var `page-separator` = "efbd"
    var `carousel-view` = "f42c"
    var `list-view` = "f44c"
    var `text-block` = "f46d"
    var `percent-line` = "efe6"
    var `percent-fill` = "efe5"
    var `upload-fill` = "f24f"
    var `t-shirt-line` = "f1d9"
    var `t-shirt-fill` = "f1d8"
    var `number-1` = "efa0"
    var `check-fill` = "eb7a"
    var `checkbox-multiple-line` = "eb89"
    var `checkbox-multiple-fill` = "eb88"
    var `collapse-vertical-line` = "f52e"
    var `align-top` = "ea29"
    var `window-2-line` = "f2c4"
    var `window-2-fill` = "f2c3"
    var `seo-line` = "f3a4"
    var `seo-fill` = "f3a3"
    var `shadow-line` = "f45a"
    var `shadow-fill` = "f459"
    var `puzzle-2-line` = "f450"
    var `puzzle-2-fill` = "f44f"
    var `markdown-line` = "ef1e"
    var `markdown-fill` = "ef1d"
    var `stacked-view` = "f464"
    var `dropdown-list` = "f3c3"
    var `timer-2-line` = "f211"
    var `timer-2-fill` = "f210"
    var `parent-line` = "efca"
    var `parent-fill` = "efc9"
    var `function-add-line` = "f4df"
    var `function-add-fill` = "f4de"
    var `arrow-up-box-line` = "f562"
    var `arrow-up-box-fill` = "f561"
    var `layout-bottom-fill` = "ee8a"
    var `layout-right-fill` = "ee9a"
    var `layout-right-line` = "ee9b"
    var `layout-top-fill` = "eea0"
    var `layout-top-line` = "eea1"
    var `layout-left-line` = "ee94"
    var `layout-left-fill` = "ee93"
    var `layout-top-2-line` = "ee9f"
    var `layout-top-2-fill` = "ee9e"
    var `layout-right-2-line` = "ee99"
    var `layout-right-2-fill` = "ee98"
    var `layout-bottom-2-line` = "ee89"
    var `layout-bottom-2-fill` = "ee88"
    var `layout-left-2-line` = "ee92"
    var `layout-left-2-fill` = "ee91"
    var `layout-row-fill` = "ee9c"
    var `layout-row-line` = "ee9d"
    var `table-fill` = "f1dd"
    var `table-line` = "f1de"
    var `layout-bottom-line` = "ee8b"
    var `picture-in-picture-line` = "eff4"
    var `picture-in-picture-fill` = "eff3"
    var `arrow-down-double-line` = "f2e1"
    var `arrow-down-double-fill` = "f2e0"
    var `arrow-left-double-fill` = "f2e2"
    var `arrow-left-double-line` = "f2e3"
}
val icons: UTSJSONObject = _uO("iconfont" to iconfont, "remixicon" to remixicon)
typealias Size = String
typealias Type = String
open class PassThroughProps (
    open var className: String? = null,
) : UTSObject()
typealias Justify = String
typealias ClInputType = String
typealias ClTextType = String
typealias ClButtonType = String
typealias ClSelectValue = Any?
open class ClSelectOption (
    @JsonNotNull
    open var label: String,
    @JsonNotNull
    open var value: Any,
    open var children: UTSArray<ClSelectOption>? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ClSelectOptionReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ClSelectOptionReactiveObject : ClSelectOption, IUTSReactive<ClSelectOption> {
    override var __v_raw: ClSelectOption
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ClSelectOption, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(label = __v_raw.label, value = __v_raw.value, children = __v_raw.children) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ClSelectOptionReactiveObject {
        return ClSelectOptionReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var label: String
        get() {
            return _tRG(__v_raw, "label", __v_raw.label, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("label")) {
                return
            }
            val oldValue = __v_raw.label
            __v_raw.label = value
            _tRS(__v_raw, "label", oldValue, value)
        }
    override var value: Any
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
    override var children: UTSArray<ClSelectOption>?
        get() {
            return _tRG(__v_raw, "children", __v_raw.children, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("children")) {
                return
            }
            val oldValue = __v_raw.children
            __v_raw.children = value
            _tRS(__v_raw, "children", oldValue, value)
        }
}
typealias ClConfirmAction = String
open class ClConfirmBeforeCloseEvent (
    open var close: () -> Unit,
    open var showLoading: () -> Unit,
    open var hideLoading: () -> Unit,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ClConfirmBeforeCloseEventReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ClConfirmBeforeCloseEventReactiveObject : ClConfirmBeforeCloseEvent, IUTSReactive<ClConfirmBeforeCloseEvent> {
    override var __v_raw: ClConfirmBeforeCloseEvent
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ClConfirmBeforeCloseEvent, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(close = __v_raw.close, showLoading = __v_raw.showLoading, hideLoading = __v_raw.hideLoading) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ClConfirmBeforeCloseEventReactiveObject {
        return ClConfirmBeforeCloseEventReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
open class ClConfirmOptions (
    @JsonNotNull
    open var title: String,
    open var message: String? = null,
    open var callback: ((action: ClConfirmAction) -> Unit)? = null,
    open var beforeClose: ((action: ClConfirmAction, event: ClConfirmBeforeCloseEvent) -> Unit)? = null,
    open var confirmText: String? = null,
    open var showConfirm: Boolean? = null,
    open var cancelText: String? = null,
    open var showCancel: Boolean? = null,
    open var duration: Number? = null,
    open var msgNotifier: String? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ClConfirmOptionsReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ClConfirmOptionsReactiveObject : ClConfirmOptions, IUTSReactive<ClConfirmOptions> {
    override var __v_raw: ClConfirmOptions
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ClConfirmOptions, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(title = __v_raw.title, message = __v_raw.message, callback = __v_raw.callback, beforeClose = __v_raw.beforeClose, confirmText = __v_raw.confirmText, showConfirm = __v_raw.showConfirm, cancelText = __v_raw.cancelText, showCancel = __v_raw.showCancel, duration = __v_raw.duration, msgNotifier = __v_raw.msgNotifier) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ClConfirmOptionsReactiveObject {
        return ClConfirmOptionsReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var title: String
        get() {
            return _tRG(__v_raw, "title", __v_raw.title, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("title")) {
                return
            }
            val oldValue = __v_raw.title
            __v_raw.title = value
            _tRS(__v_raw, "title", oldValue, value)
        }
    override var message: String?
        get() {
            return _tRG(__v_raw, "message", __v_raw.message, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("message")) {
                return
            }
            val oldValue = __v_raw.message
            __v_raw.message = value
            _tRS(__v_raw, "message", oldValue, value)
        }
    override var confirmText: String?
        get() {
            return _tRG(__v_raw, "confirmText", __v_raw.confirmText, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("confirmText")) {
                return
            }
            val oldValue = __v_raw.confirmText
            __v_raw.confirmText = value
            _tRS(__v_raw, "confirmText", oldValue, value)
        }
    override var showConfirm: Boolean?
        get() {
            return _tRG(__v_raw, "showConfirm", __v_raw.showConfirm, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("showConfirm")) {
                return
            }
            val oldValue = __v_raw.showConfirm
            __v_raw.showConfirm = value
            _tRS(__v_raw, "showConfirm", oldValue, value)
        }
    override var cancelText: String?
        get() {
            return _tRG(__v_raw, "cancelText", __v_raw.cancelText, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("cancelText")) {
                return
            }
            val oldValue = __v_raw.cancelText
            __v_raw.cancelText = value
            _tRS(__v_raw, "cancelText", oldValue, value)
        }
    override var showCancel: Boolean?
        get() {
            return _tRG(__v_raw, "showCancel", __v_raw.showCancel, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("showCancel")) {
                return
            }
            val oldValue = __v_raw.showCancel
            __v_raw.showCancel = value
            _tRS(__v_raw, "showCancel", oldValue, value)
        }
    override var duration: Number?
        get() {
            return _tRG(__v_raw, "duration", __v_raw.duration, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("duration")) {
                return
            }
            val oldValue = __v_raw.duration
            __v_raw.duration = value
            _tRS(__v_raw, "duration", oldValue, value)
        }
    override var msgNotifier: String?
        get() {
            return _tRG(__v_raw, "msgNotifier", __v_raw.msgNotifier, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("msgNotifier")) {
                return
            }
            val oldValue = __v_raw.msgNotifier
            __v_raw.msgNotifier = value
            _tRS(__v_raw, "msgNotifier", oldValue, value)
        }
}
typealias ClToastPosition = String
typealias ClToastType = String
open class ClToastOptions (
    open var type: ClToastType? = null,
    open var icon: String? = null,
    open var image: String? = null,
    @JsonNotNull
    open var message: String,
    open var position: ClToastPosition? = null,
    open var duration: Number? = null,
    open var clear: Boolean? = null,
    open var msgNotifier: String? = null,
) : UTSObject()
open class ClListItem (
    @JsonNotNull
    open var label: String,
    open var content: String? = null,
    open var icon: String? = null,
    open var arrow: Boolean? = null,
    open var hoverable: Boolean? = null,
    open var disabled: Boolean? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ClListItemReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ClListItemReactiveObject : ClListItem, IUTSReactive<ClListItem> {
    override var __v_raw: ClListItem
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ClListItem, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(label = __v_raw.label, content = __v_raw.content, icon = __v_raw.icon, arrow = __v_raw.arrow, hoverable = __v_raw.hoverable, disabled = __v_raw.disabled) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ClListItemReactiveObject {
        return ClListItemReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var label: String
        get() {
            return _tRG(__v_raw, "label", __v_raw.label, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("label")) {
                return
            }
            val oldValue = __v_raw.label
            __v_raw.label = value
            _tRS(__v_raw, "label", oldValue, value)
        }
    override var content: String?
        get() {
            return _tRG(__v_raw, "content", __v_raw.content, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("content")) {
                return
            }
            val oldValue = __v_raw.content
            __v_raw.content = value
            _tRS(__v_raw, "content", oldValue, value)
        }
    override var icon: String?
        get() {
            return _tRG(__v_raw, "icon", __v_raw.icon, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("icon")) {
                return
            }
            val oldValue = __v_raw.icon
            __v_raw.icon = value
            _tRS(__v_raw, "icon", oldValue, value)
        }
    override var arrow: Boolean?
        get() {
            return _tRG(__v_raw, "arrow", __v_raw.arrow, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("arrow")) {
                return
            }
            val oldValue = __v_raw.arrow
            __v_raw.arrow = value
            _tRS(__v_raw, "arrow", oldValue, value)
        }
    override var hoverable: Boolean?
        get() {
            return _tRG(__v_raw, "hoverable", __v_raw.hoverable, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("hoverable")) {
                return
            }
            val oldValue = __v_raw.hoverable
            __v_raw.hoverable = value
            _tRS(__v_raw, "hoverable", oldValue, value)
        }
    override var disabled: Boolean?
        get() {
            return _tRG(__v_raw, "disabled", __v_raw.disabled, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("disabled")) {
                return
            }
            val oldValue = __v_raw.disabled
            __v_raw.disabled = value
            _tRS(__v_raw, "disabled", oldValue, value)
        }
}
open class ClListViewItem (
    open var label: String? = null,
    open var value: Any? = null,
    open var index: String? = null,
    open var children: UTSArray<ClListViewItem>? = null,
) : UTSObject()
typealias ClPopupDirection = String
open class ClSelectDateShortcut (
    @JsonNotNull
    open var label: String,
    @JsonNotNull
    open var value: UTSArray<String>,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ClSelectDateShortcutReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ClSelectDateShortcutReactiveObject : ClSelectDateShortcut, IUTSReactive<ClSelectDateShortcut> {
    override var __v_raw: ClSelectDateShortcut
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ClSelectDateShortcut, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(label = __v_raw.label, value = __v_raw.value) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ClSelectDateShortcutReactiveObject {
        return ClSelectDateShortcutReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var label: String
        get() {
            return _tRG(__v_raw, "label", __v_raw.label, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("label")) {
                return
            }
            val oldValue = __v_raw.label
            __v_raw.label = value
            _tRS(__v_raw, "label", oldValue, value)
        }
    override var value: UTSArray<String>
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
}
open class ClFormRule (
    open var required: Boolean? = null,
    open var message: String? = null,
    open var min: Number? = null,
    open var max: Number? = null,
    open var pattern: UTSRegExp? = null,
    open var validator: ((value: Any?) -> Any)? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ClFormRuleReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ClFormRuleReactiveObject : ClFormRule, IUTSReactive<ClFormRule> {
    override var __v_raw: ClFormRule
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ClFormRule, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(required = __v_raw.required, message = __v_raw.message, min = __v_raw.min, max = __v_raw.max, pattern = __v_raw.pattern, validator = __v_raw.validator) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ClFormRuleReactiveObject {
        return ClFormRuleReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var required: Boolean?
        get() {
            return _tRG(__v_raw, "required", __v_raw.required, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("required")) {
                return
            }
            val oldValue = __v_raw.required
            __v_raw.required = value
            _tRS(__v_raw, "required", oldValue, value)
        }
    override var message: String?
        get() {
            return _tRG(__v_raw, "message", __v_raw.message, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("message")) {
                return
            }
            val oldValue = __v_raw.message
            __v_raw.message = value
            _tRS(__v_raw, "message", oldValue, value)
        }
    override var min: Number?
        get() {
            return _tRG(__v_raw, "min", __v_raw.min, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("min")) {
                return
            }
            val oldValue = __v_raw.min
            __v_raw.min = value
            _tRS(__v_raw, "min", oldValue, value)
        }
    override var max: Number?
        get() {
            return _tRG(__v_raw, "max", __v_raw.max, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("max")) {
                return
            }
            val oldValue = __v_raw.max
            __v_raw.max = value
            _tRS(__v_raw, "max", oldValue, value)
        }
    override var pattern: UTSRegExp?
        get() {
            return _tRG(__v_raw, "pattern", __v_raw.pattern, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pattern")) {
                return
            }
            val oldValue = __v_raw.pattern
            __v_raw.pattern = value
            _tRS(__v_raw, "pattern", oldValue, value)
        }
}
open class ClFormValidateError (
    @JsonNotNull
    open var field: String,
    @JsonNotNull
    open var message: String,
) : UTSObject()
typealias ClFormLabelPosition = String
open class ClTreeItem (
    @JsonNotNull
    open var id: Any,
    @JsonNotNull
    open var label: String,
    open var disabled: Boolean? = null,
    open var children: UTSArray<ClTreeItem>? = null,
    open var value: UTSJSONObject? = null,
    open var isExpand: Boolean? = null,
    open var isChecked: Boolean? = null,
    open var isHalfChecked: Boolean? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ClTreeItemReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ClTreeItemReactiveObject : ClTreeItem, IUTSReactive<ClTreeItem> {
    override var __v_raw: ClTreeItem
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ClTreeItem, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(id = __v_raw.id, label = __v_raw.label, disabled = __v_raw.disabled, children = __v_raw.children, value = __v_raw.value, isExpand = __v_raw.isExpand, isChecked = __v_raw.isChecked, isHalfChecked = __v_raw.isHalfChecked) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ClTreeItemReactiveObject {
        return ClTreeItemReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var id: Any
        get() {
            return _tRG(__v_raw, "id", __v_raw.id, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("id")) {
                return
            }
            val oldValue = __v_raw.id
            __v_raw.id = value
            _tRS(__v_raw, "id", oldValue, value)
        }
    override var label: String
        get() {
            return _tRG(__v_raw, "label", __v_raw.label, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("label")) {
                return
            }
            val oldValue = __v_raw.label
            __v_raw.label = value
            _tRS(__v_raw, "label", oldValue, value)
        }
    override var disabled: Boolean?
        get() {
            return _tRG(__v_raw, "disabled", __v_raw.disabled, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("disabled")) {
                return
            }
            val oldValue = __v_raw.disabled
            __v_raw.disabled = value
            _tRS(__v_raw, "disabled", oldValue, value)
        }
    override var children: UTSArray<ClTreeItem>?
        get() {
            return _tRG(__v_raw, "children", __v_raw.children, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("children")) {
                return
            }
            val oldValue = __v_raw.children
            __v_raw.children = value
            _tRS(__v_raw, "children", oldValue, value)
        }
    override var value: UTSJSONObject?
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
    override var isExpand: Boolean?
        get() {
            return _tRG(__v_raw, "isExpand", __v_raw.isExpand, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("isExpand")) {
                return
            }
            val oldValue = __v_raw.isExpand
            __v_raw.isExpand = value
            _tRS(__v_raw, "isExpand", oldValue, value)
        }
    override var isChecked: Boolean?
        get() {
            return _tRG(__v_raw, "isChecked", __v_raw.isChecked, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("isChecked")) {
                return
            }
            val oldValue = __v_raw.isChecked
            __v_raw.isChecked = value
            _tRS(__v_raw, "isChecked", oldValue, value)
        }
    override var isHalfChecked: Boolean?
        get() {
            return _tRG(__v_raw, "isHalfChecked", __v_raw.isHalfChecked, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("isHalfChecked")) {
                return
            }
            val oldValue = __v_raw.isHalfChecked
            __v_raw.isHalfChecked = value
            _tRS(__v_raw, "isHalfChecked", oldValue, value)
        }
}
open class ClTreeNodeInfo (
    @JsonNotNull
    open var node: ClTreeItem,
    open var parent: ClTreeItem? = null,
    @JsonNotNull
    open var index: Number,
) : UTSObject()
open class ClIconPassThrough (
    open var className: String? = null,
) : UTSObject()
open class ClIconProps (
    open var className: String? = null,
    open var pt: ClIconPassThrough? = null,
    open var name: String? = null,
    open var size: Any? = null,
    open var height: Any? = null,
    open var width: Any? = null,
    open var color: String? = null,
) : UTSObject()
open class ClLoadingPassThrough (
    open var className: String? = null,
    open var icon: ClIconProps? = null,
) : UTSObject()
open class ClLoadingProps (
    open var className: String? = null,
    open var pt: ClLoadingPassThrough? = null,
    open var loading: Boolean? = null,
    open var size: Any? = null,
    open var color: String? = null,
) : UTSObject()
open class ClFooterOffset {
    private var data = reactive(UTSJSONObject())
    open fun set(value: Number): Unit {
        this.data[router.path()] = value
    }
    open fun get(): Number {
        return (this.data[router.path()] as Number?) ?: 0
    }
}
val clFooterOffset = ClFooterOffset()
open class Size__1 {
    open var names = _uA(
        "text-xs",
        "text-sm",
        "text-md",
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-3xl",
        "text-4xl",
        "text-5xl",
        "text-6xl",
        "text-7xl",
        "text-8xl",
        "text-9xl"
    )
    open var sizes: UTSArray<Number> = _uA(
        20,
        24,
        28,
        32,
        36,
        44,
        52,
        60,
        72,
        84,
        96,
        120,
        152
    )
    open var lineHeights: UTSArray<Number> = _uA(
        28,
        36,
        44,
        52,
        52,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
    )
    open var className: ComputedRef<String> = computed(fun(): String {
        return ""
    }
    )
    open lateinit var ptClassName: ComputedRef<String>
    constructor(cb: (() -> String)?){
        this.className = computed(cb ?: (fun(): String {
            return ""
        }
        ))
        this.ptClassName = computed(fun(): String {
            if (config.fontSize == null) {
                return this.className.value
            }
            val name = this.names[this.getIndex()]
            return this.className.value.replace("-important-" + name, "").replace(name, "")
        }
        )
    }
    open var getScale = fun(): Number {
        return config.fontSize ?: 1
    }
    open var getRpx = fun(kVal: Any): String {
        val scale = this.getScale()
        if (UTSAndroid.`typeof`(kVal) == "number") {
            return (kVal as Number) * scale + "rpx"
        } else {
            val num = parseFloat(kVal as String)
            val unit = (kVal as String).replace("" + num, "")
            return num * scale + unit
        }
    }
    open var getPxValue = fun(kVal: Any): Number {
        val scale = this.getScale()
        if (UTSAndroid.`typeof`(kVal) == "string") {
            val num = parseFloat(kVal as String)
            val unit = (kVal as String).replace("" + num, "")
            if (unit == "px") {
                return num * scale
            } else {
                return rpx2px(num * scale)
            }
        } else {
            return rpx2px((kVal as Number) * scale)
        }
    }
    open var getPx = fun(kVal: Any): String {
        return this.getPxValue(kVal) + "px"
    }
    open var getIndex = fun(): Number {
        var index = this.names.findIndex(fun(name): Boolean {
            if (this.className.value.includes(name)) {
                return true
            }
            return false
        }
        )
        if (index < 0) {
            index = 2
        }
        return index
    }
    open var getSize = fun(size: Any?): String? {
        if (config.fontSize == null && size == null) {
            return null
        }
        return this.getRpx(size ?: this.sizes[this.getIndex()])
    }
    open var getLineHeight = fun(): String? {
        if (config.fontSize == null) {
            return null
        }
        val lineHeight = this.lineHeights[this.getIndex()]
        return if (lineHeight == 1) {
            "1"
        } else {
            this.getRpx(lineHeight)
        }
    }
}
fun useSize(cb: (() -> String)? = null): Size__1 {
    return Size__1(cb)
}
open class Touch {
    open var startY: Number = 0
    open var startX: Number = 0
    open var horizontal: Number = 0
    open fun start(e: UniTouchEvent) {
        this.startX = e.touches[0].clientX
        this.startY = e.touches[0].clientY
        this.horizontal = 0
    }
    open fun move(e: UniTouchEvent) {
        val x = this.startX - e.touches[0].clientX
        if (this.horizontal == 0) {
            val y = this.startY - e.touches[0].clientY
            if (Math.abs(x) > Math.abs(y)) {
                this.horizontal = 1
            }
            if (this.horizontal == 1) {
                e.preventDefault()
            }
        }
    }
    open fun end() {
        this.startY = 0
        this.horizontal = 0
    }
}
fun useTouch(): Touch {
    return Touch()
}
open class UiInstance (
    open var showConfirm: (options: ClConfirmOptions) -> Unit,
    open var showTips: (message: String, callback: (action: ClConfirmAction) -> Unit) -> Unit,
    open var showToast: (options: ClToastOptions) -> Unit,
) : UTSObject()
val list = Map<String, UiInstance>()
open class Ui {
    open fun getInstance(): UiInstance? {
        return list.get(router.path())
    }
    open fun showConfirm(options: ClConfirmOptions): Unit {
        val instance = this.getInstance()
        if (instance != null) {
            instance.showConfirm(options)
        }
    }
    open fun showTips(message: String, callback: (action: ClConfirmAction) -> Unit): Unit {
        val instance = this.getInstance()
        if (instance != null) {
            instance.showTips(message, callback)
        }
    }
    open fun showToast(options: ClToastOptions): Unit {
        val instance = this.getInstance()
        if (instance != null) {
            instance.showToast(options)
        }
    }
    open fun showLoading(title: String? = null, mask: Boolean? = null): Unit {
        uni_showLoading(ShowLoadingOptions(title = title ?: t("加载中"), mask = mask ?: true))
    }
    open fun hideLoading(): Unit {
        uni_hideLoading()
    }
}
val ui = Ui()
fun useUi(): Ui {
    return ui
}
fun createUi(instance: UiInstance): Unit {
    list.set(router.path(), instance)
}
open class Form {
    open var formRef = ref<ClFormComponentPublicInstance?>(null)
    open lateinit var disabled: ComputedRef<Boolean>
    constructor(){
        if (this.formRef.value == null) {
            val ClForm = useParent<ClFormComponentPublicInstance>("cl-form")
            if (ClForm != null) {
                this.formRef.value = ClForm
            }
        }
        this.disabled = computed<Boolean>(fun(): Boolean {
            if (this.formRef.value == null) {
                return false
            }
            return this.formRef.value!!.disabled
        }
        )
    }
    open var addField = fun(prop: String, rules: UTSArray<ClFormRule>): Unit {
        this.formRef.value!!.addField(prop, rules)
    }
    open var removeField = fun(prop: String): Unit {
        this.formRef.value!!.removeField(prop)
    }
    open var getValue = fun(prop: String): Any? {
        return this.formRef.value!!.getValue(prop)
    }
    open var setError = fun(prop: String, error: String): Unit {
        this.formRef.value!!.setError(prop, error)
    }
    open var getError = fun(prop: String): String {
        return this.formRef.value!!.getError(prop)
    }
    open var getErrors = fun(): UTSPromise<UTSArray<ClFormValidateError>> {
        return wrapUTSPromise(suspend w@{
                return@w this.formRef.value!!.getErrors()
        })
    }
    open var removeError = fun(prop: String): Unit {
        this.formRef.value!!.removeError(prop)
    }
    open var clearErrors = fun(): Unit {
        this.formRef.value!!.clearErrors()
    }
    open var getRule = fun(prop: String): UTSArray<ClFormRule> {
        return this.formRef.value!!.getRule(prop)
    }
    open var setRule = fun(prop: String, rules: UTSArray<ClFormRule>): Unit {
        this.formRef.value!!.setRule(prop, rules)
    }
    open var removeRule = fun(prop: String): Unit {
        this.formRef.value!!.removeRule(prop)
    }
    open var validateRule = fun(value: Any?, rule: ClFormRule): String? {
        return this.formRef.value!!.validateRule(value, rule)
    }
    open var clearValidate = fun(): Unit {
        this.formRef.value!!.clearValidate()
    }
    open var validateField = fun(prop: String): String? {
        return this.formRef.value!!.validateField(prop)
    }
    open var validate = fun(callback: (valid: Boolean, errors: UTSArray<ClFormValidateError>) -> Unit): Unit {
        this.formRef.value!!.validate(callback)
    }
    open var isError = fun(prop: String): Boolean {
        return this.formRef.value!!.getError(prop) != ""
    }
}
open class PassThrough (
    open var className: String? = null,
) : UTSObject()
open class Page__1 {
    open var pageRef: ClPageComponentPublicInstance? = null
    constructor(){
        this.pageRef = useParent<ClPageComponentPublicInstance>("cl-page")
    }
    open var path = fun(): String {
        return router.path()
    }
    open var getScrollTop = fun(): Number {
        return this.pageRef!!.scrollTop as Number
    }
    open var scrollTo = fun(top: Number){
        this.pageRef!!.scrollTo(top)
    }
    open var scrollToTop = fun(){
        this.pageRef!!.scrollToTop()
    }
    open var onScroll = fun(callback: (top: Number) -> Unit){
        scroller.on(callback)
    }
    open var offScroll = fun(callback: (top: Number) -> Unit){
        scroller.off(callback)
    }
}
fun usePage(): Page__1 {
    return Page__1()
}
open class PassThrough__1 (
    open var className: String? = null,
) : UTSObject()
open class Icon (
    @JsonNotNull
    open var font: String,
    @JsonNotNull
    open var text: String,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClIconClIconClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClIconClIcon::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClIconClIcon.name, inheritAttrs = GenUniModulesCoolUnixComponentsClIconClIcon.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClIconClIcon.inject, props = GenUniModulesCoolUnixComponentsClIconClIcon.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClIconClIcon.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClIconClIcon.emits, components = GenUniModulesCoolUnixComponentsClIconClIcon.components, styles = GenUniModulesCoolUnixComponentsClIconClIcon.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClIconClIcon.setup(props as GenUniModulesCoolUnixComponentsClIconClIcon)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClIconClIcon {
    return GenUniModulesCoolUnixComponentsClIconClIcon(instance)
}
)
val GenUniModulesCoolUnixComponentsClBackTopClBackTopClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClBackTopClBackTop::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClBackTopClBackTop.name, inheritAttrs = GenUniModulesCoolUnixComponentsClBackTopClBackTop.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClBackTopClBackTop.inject, props = GenUniModulesCoolUnixComponentsClBackTopClBackTop.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClBackTopClBackTop.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClBackTopClBackTop.emits, components = GenUniModulesCoolUnixComponentsClBackTopClBackTop.components, styles = GenUniModulesCoolUnixComponentsClBackTopClBackTop.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClBackTopClBackTop.setup(props as GenUniModulesCoolUnixComponentsClBackTopClBackTop)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClBackTopClBackTop {
    return GenUniModulesCoolUnixComponentsClBackTopClBackTop(instance)
}
)
open class PassThrough__2 (
    open var className: String? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClTextClTextClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClTextClText::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClTextClText.name, inheritAttrs = GenUniModulesCoolUnixComponentsClTextClText.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClTextClText.inject, props = GenUniModulesCoolUnixComponentsClTextClText.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClTextClText.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClTextClText.emits, components = GenUniModulesCoolUnixComponentsClTextClText.components, styles = GenUniModulesCoolUnixComponentsClTextClText.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClTextClText.setup(props as GenUniModulesCoolUnixComponentsClTextClText)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClTextClText {
    return GenUniModulesCoolUnixComponentsClTextClText(instance)
}
)
open class PassThrough__3 (
    open var className: String? = null,
    open var label: PassThroughProps? = null,
    open var icon: ClIconProps? = null,
    open var loading: ClLoadingProps? = null,
) : UTSObject()
open class PassThrough__4 (
    open var className: String? = null,
    open var icon: ClIconProps? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClLoadingClLoadingClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClLoadingClLoading::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClLoadingClLoading.name, inheritAttrs = GenUniModulesCoolUnixComponentsClLoadingClLoading.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClLoadingClLoading.inject, props = GenUniModulesCoolUnixComponentsClLoadingClLoading.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClLoadingClLoading.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClLoadingClLoading.emits, components = GenUniModulesCoolUnixComponentsClLoadingClLoading.components, styles = GenUniModulesCoolUnixComponentsClLoadingClLoading.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClLoadingClLoading.setup(props as GenUniModulesCoolUnixComponentsClLoadingClLoading)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClLoadingClLoading {
    return GenUniModulesCoolUnixComponentsClLoadingClLoading(instance)
}
)
val GenUniModulesCoolUnixComponentsClButtonClButtonClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClButtonClButton::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClButtonClButton.name, inheritAttrs = GenUniModulesCoolUnixComponentsClButtonClButton.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClButtonClButton.inject, props = GenUniModulesCoolUnixComponentsClButtonClButton.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClButtonClButton.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClButtonClButton.emits, components = GenUniModulesCoolUnixComponentsClButtonClButton.components, styles = GenUniModulesCoolUnixComponentsClButtonClButton.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClButtonClButton.setup(props as GenUniModulesCoolUnixComponentsClButtonClButton)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClButtonClButton {
    return GenUniModulesCoolUnixComponentsClButtonClButton(instance)
}
)
open class HeaderPassThrough (
    open var className: String? = null,
    open var text: PassThroughProps? = null,
) : UTSObject()
open class PassThrough__5 (
    open var className: String? = null,
    open var inner: PassThroughProps? = null,
    open var header: HeaderPassThrough? = null,
    open var container: PassThroughProps? = null,
    open var mask: PassThroughProps? = null,
    open var draw: PassThroughProps? = null,
) : UTSObject()
open class Swipe (
    @JsonNotNull
    open var isMove: Boolean = false,
    @JsonNotNull
    open var isTouch: Boolean = false,
    @JsonNotNull
    open var startY: Number,
    @JsonNotNull
    open var offsetY: Number,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return SwipeReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class SwipeReactiveObject : Swipe, IUTSReactive<Swipe> {
    override var __v_raw: Swipe
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: Swipe, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(isMove = __v_raw.isMove, isTouch = __v_raw.isTouch, startY = __v_raw.startY, offsetY = __v_raw.offsetY) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): SwipeReactiveObject {
        return SwipeReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var isMove: Boolean
        get() {
            return _tRG(__v_raw, "isMove", __v_raw.isMove, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("isMove")) {
                return
            }
            val oldValue = __v_raw.isMove
            __v_raw.isMove = value
            _tRS(__v_raw, "isMove", oldValue, value)
        }
    override var isTouch: Boolean
        get() {
            return _tRG(__v_raw, "isTouch", __v_raw.isTouch, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("isTouch")) {
                return
            }
            val oldValue = __v_raw.isTouch
            __v_raw.isTouch = value
            _tRS(__v_raw, "isTouch", oldValue, value)
        }
    override var startY: Number
        get() {
            return _tRG(__v_raw, "startY", __v_raw.startY, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("startY")) {
                return
            }
            val oldValue = __v_raw.startY
            __v_raw.startY = value
            _tRS(__v_raw, "startY", oldValue, value)
        }
    override var offsetY: Number
        get() {
            return _tRG(__v_raw, "offsetY", __v_raw.offsetY, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("offsetY")) {
                return
            }
            val oldValue = __v_raw.offsetY
            __v_raw.offsetY = value
            _tRS(__v_raw, "offsetY", oldValue, value)
        }
}
val GenUniModulesCoolUnixComponentsClPopupClPopupClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClPopupClPopup::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClPopupClPopup.name, inheritAttrs = GenUniModulesCoolUnixComponentsClPopupClPopup.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClPopupClPopup.inject, props = GenUniModulesCoolUnixComponentsClPopupClPopup.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClPopupClPopup.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClPopupClPopup.emits, components = GenUniModulesCoolUnixComponentsClPopupClPopup.components, styles = GenUniModulesCoolUnixComponentsClPopupClPopup.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClPopupClPopup.setup(props as GenUniModulesCoolUnixComponentsClPopupClPopup, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClPopupClPopup {
    return GenUniModulesCoolUnixComponentsClPopupClPopup(instance)
}
)
val GenUniModulesCoolUnixComponentsClConfirmClConfirmClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClConfirmClConfirm::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesCoolUnixComponentsClConfirmClConfirm.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClConfirmClConfirm.inject, props = GenUniModulesCoolUnixComponentsClConfirmClConfirm.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClConfirmClConfirm.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClConfirmClConfirm.emits, components = GenUniModulesCoolUnixComponentsClConfirmClConfirm.components, styles = GenUniModulesCoolUnixComponentsClConfirmClConfirm.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClConfirmClConfirm.setup(props as GenUniModulesCoolUnixComponentsClConfirmClConfirm, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClConfirmClConfirm {
    return GenUniModulesCoolUnixComponentsClConfirmClConfirm(instance)
}
)
open class ToastItem (
    @JsonNotNull
    open var id: Number,
    @JsonNotNull
    open var visible: Boolean = false,
    @JsonNotNull
    open var isOpen: Boolean = false,
    open var icon: String? = null,
    open var image: String? = null,
    @JsonNotNull
    open var msgNotifier: String,
    @JsonNotNull
    open var position: String,
    @JsonNotNull
    open var duration: Number,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ToastItemReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ToastItemReactiveObject : ToastItem, IUTSReactive<ToastItem> {
    override var __v_raw: ToastItem
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ToastItem, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(id = __v_raw.id, visible = __v_raw.visible, isOpen = __v_raw.isOpen, icon = __v_raw.icon, image = __v_raw.image, msgNotifier = __v_raw.msgNotifier, position = __v_raw.position, duration = __v_raw.duration) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ToastItemReactiveObject {
        return ToastItemReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var id: Number
        get() {
            return _tRG(__v_raw, "id", __v_raw.id, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("id")) {
                return
            }
            val oldValue = __v_raw.id
            __v_raw.id = value
            _tRS(__v_raw, "id", oldValue, value)
        }
    override var visible: Boolean
        get() {
            return _tRG(__v_raw, "visible", __v_raw.visible, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("visible")) {
                return
            }
            val oldValue = __v_raw.visible
            __v_raw.visible = value
            _tRS(__v_raw, "visible", oldValue, value)
        }
    override var isOpen: Boolean
        get() {
            return _tRG(__v_raw, "isOpen", __v_raw.isOpen, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("isOpen")) {
                return
            }
            val oldValue = __v_raw.isOpen
            __v_raw.isOpen = value
            _tRS(__v_raw, "isOpen", oldValue, value)
        }
    override var icon: String?
        get() {
            return _tRG(__v_raw, "icon", __v_raw.icon, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("icon")) {
                return
            }
            val oldValue = __v_raw.icon
            __v_raw.icon = value
            _tRS(__v_raw, "icon", oldValue, value)
        }
    override var image: String?
        get() {
            return _tRG(__v_raw, "image", __v_raw.image, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("image")) {
                return
            }
            val oldValue = __v_raw.image
            __v_raw.image = value
            _tRS(__v_raw, "image", oldValue, value)
        }
    override var msgNotifier: String
        get() {
            return _tRG(__v_raw, "msgNotifier", __v_raw.msgNotifier, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("msgNotifier")) {
                return
            }
            val oldValue = __v_raw.msgNotifier
            __v_raw.msgNotifier = value
            _tRS(__v_raw, "msgNotifier", oldValue, value)
        }
    override var position: String
        get() {
            return _tRG(__v_raw, "position", __v_raw.position, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("position")) {
                return
            }
            val oldValue = __v_raw.position
            __v_raw.position = value
            _tRS(__v_raw, "position", oldValue, value)
        }
    override var duration: Number
        get() {
            return _tRG(__v_raw, "duration", __v_raw.duration, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("duration")) {
                return
            }
            val oldValue = __v_raw.duration
            __v_raw.duration = value
            _tRS(__v_raw, "duration", oldValue, value)
        }
}
val GenUniModulesCoolUnixComponentsClToastClToastClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClToastClToast::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClToastClToast.name, inheritAttrs = GenUniModulesCoolUnixComponentsClToastClToast.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClToastClToast.inject, props = GenUniModulesCoolUnixComponentsClToastClToast.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClToastClToast.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClToastClToast.emits, components = GenUniModulesCoolUnixComponentsClToastClToast.components, styles = GenUniModulesCoolUnixComponentsClToastClToast.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClToastClToast.setup(props as GenUniModulesCoolUnixComponentsClToastClToast, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClToastClToast {
    return GenUniModulesCoolUnixComponentsClToastClToast(instance)
}
)
val GenUniModulesCoolUnixComponentsClPageUiClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClPageUi::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClPageUi.name, inheritAttrs = GenUniModulesCoolUnixComponentsClPageUi.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClPageUi.inject, props = GenUniModulesCoolUnixComponentsClPageUi.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClPageUi.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClPageUi.emits, components = GenUniModulesCoolUnixComponentsClPageUi.components, styles = GenUniModulesCoolUnixComponentsClPageUi.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClPageUi.setup(props as GenUniModulesCoolUnixComponentsClPageUi)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClPageUi {
    return GenUniModulesCoolUnixComponentsClPageUi(instance)
}
)
open class PassThrough__6 (
    open var className: String? = null,
    open var inner: PassThroughProps? = null,
    open var label: PassThroughProps? = null,
    open var content: PassThroughProps? = null,
    open var error: PassThroughProps? = null,
) : UTSObject()
open class FormItem {
    open var formItemRef = ref<ClFormItemComponentPublicInstance?>(null)
    open lateinit var isError: ComputedRef<Boolean>
    constructor(){
        val isError = Form().isError
        if (this.formItemRef.value == null) {
            val ClFormItem = useParent<ClFormItemComponentPublicInstance>("cl-form-item")
            if (ClFormItem != null) {
                this.formItemRef.value = ClFormItem
            }
        }
        this.isError = computed<Boolean>(fun(): Boolean {
            if (this.formItemRef.value == null) {
                return false
            }
            return isError(this.formItemRef.value!!.prop)
        }
        )
    }
}
val useForm = fun(): Form {
    return Form()
}
val useFormItem = fun(): FormItem {
    return FormItem()
}
val GenUniModulesCoolUnixComponentsClFormClFormClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClFormClForm::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClFormClForm.name, inheritAttrs = GenUniModulesCoolUnixComponentsClFormClForm.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClFormClForm.inject, props = GenUniModulesCoolUnixComponentsClFormClForm.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClFormClForm.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClFormClForm.emits, components = GenUniModulesCoolUnixComponentsClFormClForm.components, styles = GenUniModulesCoolUnixComponentsClFormClForm.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClFormClForm.setup(props as GenUniModulesCoolUnixComponentsClFormClForm, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClFormClForm {
    return GenUniModulesCoolUnixComponentsClFormClForm(instance)
}
)
typealias ClFormComponentPublicInstance = GenUniModulesCoolUnixComponentsClFormClForm
val GenUniModulesCoolUnixComponentsClPageClPageClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClPageClPage::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClPageClPage.name, inheritAttrs = GenUniModulesCoolUnixComponentsClPageClPage.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClPageClPage.inject, props = GenUniModulesCoolUnixComponentsClPageClPage.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClPageClPage.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClPageClPage.emits, components = GenUniModulesCoolUnixComponentsClPageClPage.components, styles = GenUniModulesCoolUnixComponentsClPageClPage.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClPageClPage.setup(props as GenUniModulesCoolUnixComponentsClPageClPage, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClPageClPage {
    return GenUniModulesCoolUnixComponentsClPageClPage(instance)
}
)
typealias ClPageComponentPublicInstance = GenUniModulesCoolUnixComponentsClPageClPage
typealias ClConfirmComponentPublicInstance = GenUniModulesCoolUnixComponentsClConfirmClConfirm
typealias ClPopupComponentPublicInstance = GenUniModulesCoolUnixComponentsClPopupClPopup
typealias ClToastComponentPublicInstance = GenUniModulesCoolUnixComponentsClToastClToast
open class GenUniModulesCoolUnixComponentsClFormItemClFormItemSlotDataError (
    @JsonNotNull
    open var error: String,
) : SlotData()
val GenUniModulesCoolUnixComponentsClFormItemClFormItemClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClFormItemClFormItem::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClFormItemClFormItem.name, inheritAttrs = GenUniModulesCoolUnixComponentsClFormItemClFormItem.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClFormItemClFormItem.inject, props = GenUniModulesCoolUnixComponentsClFormItemClFormItem.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClFormItemClFormItem.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClFormItemClFormItem.emits, components = GenUniModulesCoolUnixComponentsClFormItemClFormItem.components, styles = GenUniModulesCoolUnixComponentsClFormItemClFormItem.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClFormItemClFormItem.setup(props as GenUniModulesCoolUnixComponentsClFormItemClFormItem, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClFormItemClFormItem {
    return GenUniModulesCoolUnixComponentsClFormItemClFormItem(instance)
}
)
typealias ClFormItemComponentPublicInstance = GenUniModulesCoolUnixComponentsClFormItemClFormItem
val proxy: UTSJSONObject = object : UTSJSONObject() {
    var dev = object : UTSJSONObject() {
        var target = "http://192.168.1.13:10010"
        var changeOrigin = true
        var rewrite = fun(path: String): String {
            return path.replace("/dev", "")
        }
    }
    var prod = object : UTSJSONObject() {
        var target = "http://22x2097c96.imwork.net"
        var changeOrigin = true
        var rewrite = fun(path: String): String {
            return path.replace("/prod", "/api")
        }
    }
}
val isDev = "production" == "development"
val ignoreTokens: UTSArray<String> = _uA()
open class WxConfig (
    @JsonNotNull
    open var debug: Boolean = false,
) : UTSObject()
open class Config__1 (
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var version: String,
    @JsonNotNull
    open var locale: String,
    @JsonNotNull
    open var website: String,
    @JsonNotNull
    open var host: String,
    @JsonNotNull
    open var baseUrl: String,
    @JsonNotNull
    open var showDarkButton: Boolean = false,
    @JsonNotNull
    open var isCustomTabBar: Boolean = false,
    @JsonNotNull
    open var backTop: Boolean = false,
    @JsonNotNull
    open var wx: WxConfig,
    @JsonNotNull
    open var platform: String,
    @JsonNotNull
    open var equipRefreshTime: Number,
) : UTSObject()
val config__1 = UTSJSONObject.assign<Config__1>(object : UTSJSONObject() {
    var name = "OEMES"
    var version = "1.0.0"
    var locale = "zh"
    var website = ""
    var showDarkButton = if (isMp()) {
        false
    } else {
        true
    }
    var isCustomTabBar = true
    var backTop = true
    var platform = "mes-app"
    var wx = WxConfig(debug = false)
    var equipRefreshTime: Number = 10000
}, if (isDev) {
    getPath("dev")
} else {
    getPath("prod")
}
) as Config__1
fun getPath(env: String): UTSJSONObject {
    val host = get(proxy, env + ".target") as String
    var baseUrl = host
    return _uO("host" to host, "baseUrl" to baseUrl)
}
val apiPath: UTSJSONObject = object : UTSJSONObject() {
    var captcha = "/open/captchaBase" as String
    var auth_token = "/oauth2/token" as String
    var current_user = "/acc/currentUser" as String
    var message_listen = "/message/listen" as String
    var message_page = "/message/selectByPage" as String
    var message_detail = "/message/selectById" as String
    var message_read = "/message/read" as String
    var message_unread_count = "/message/countUnread" as String
    var workshop_tree = "/workshop/selectUserAssignTree" as String
    var equip_page = "/equip/selectByPage" as String
    var equip_count = "/equip/countRealtime" as String
    var equip_realtime = "/equip/selectRealtimeById" as String
    var equip_id = "/equip/selectById" as String
    var equip_run_history = "/equipRecordRun/selectByPage" as String
    var equip_online_history = "/equipRecordOnline/selectByPage" as String
    var equip_alarm_history = "/equipRecordAlarm/selectByPage" as String
    var equip_config = "/equip/queryEquipConfigBySn" as String
    var equip_collect_page = "/equip/collect/selectByPage" as String
    var equip_run_count = "/equipRecordRun/countMerging" as String
    var equip_online_count = "/equipRecordOnline/countMerging" as String
    var equip_alarm_count = "/equipRecordAlarm/countMerging" as String
    var workshop_scada = "/workshop/getScadaUrlByWorkshopCode" as String
}
val authParam: UTSJSONObject = object : UTSJSONObject() {
    var client_id = "mes" as String
    var client_sc = "admin123" as String
}
inline fun <reified T> parseData(data: Any): T? {
    return JSON.parseObject<T>(JSON.stringify(data))
}
open class UserInfo (
    open var unionId: String? = null,
    @JsonNotNull
    open var id: String,
    open var username: String? = null,
    @JsonNotNull
    open var accName: String,
    open var nickName: String? = null,
    open var avatarUrl: String? = null,
    @JsonNotNull
    open var sex: Number,
    open var city: String? = null,
    open var country: String? = null,
    open var province: String? = null,
    open var idCard: String? = null,
    open var email: String? = null,
    open var mobile: String? = null,
    @JsonNotNull
    open var settledTime: String,
    @JsonNotNull
    open var expireTime: String,
    open var loginType: Number? = null,
    open var perfection: Number? = null,
    open var language: String? = null,
    open var source: String? = null,
    open var sourceId: String? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return UserInfoReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class UserInfoReactiveObject : UserInfo, IUTSReactive<UserInfo> {
    override var __v_raw: UserInfo
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: UserInfo, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(unionId = __v_raw.unionId, id = __v_raw.id, username = __v_raw.username, accName = __v_raw.accName, nickName = __v_raw.nickName, avatarUrl = __v_raw.avatarUrl, sex = __v_raw.sex, city = __v_raw.city, country = __v_raw.country, province = __v_raw.province, idCard = __v_raw.idCard, email = __v_raw.email, mobile = __v_raw.mobile, settledTime = __v_raw.settledTime, expireTime = __v_raw.expireTime, loginType = __v_raw.loginType, perfection = __v_raw.perfection, language = __v_raw.language, source = __v_raw.source, sourceId = __v_raw.sourceId) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UserInfoReactiveObject {
        return UserInfoReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var unionId: String?
        get() {
            return _tRG(__v_raw, "unionId", __v_raw.unionId, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("unionId")) {
                return
            }
            val oldValue = __v_raw.unionId
            __v_raw.unionId = value
            _tRS(__v_raw, "unionId", oldValue, value)
        }
    override var id: String
        get() {
            return _tRG(__v_raw, "id", __v_raw.id, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("id")) {
                return
            }
            val oldValue = __v_raw.id
            __v_raw.id = value
            _tRS(__v_raw, "id", oldValue, value)
        }
    override var username: String?
        get() {
            return _tRG(__v_raw, "username", __v_raw.username, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("username")) {
                return
            }
            val oldValue = __v_raw.username
            __v_raw.username = value
            _tRS(__v_raw, "username", oldValue, value)
        }
    override var accName: String
        get() {
            return _tRG(__v_raw, "accName", __v_raw.accName, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("accName")) {
                return
            }
            val oldValue = __v_raw.accName
            __v_raw.accName = value
            _tRS(__v_raw, "accName", oldValue, value)
        }
    override var nickName: String?
        get() {
            return _tRG(__v_raw, "nickName", __v_raw.nickName, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("nickName")) {
                return
            }
            val oldValue = __v_raw.nickName
            __v_raw.nickName = value
            _tRS(__v_raw, "nickName", oldValue, value)
        }
    override var avatarUrl: String?
        get() {
            return _tRG(__v_raw, "avatarUrl", __v_raw.avatarUrl, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("avatarUrl")) {
                return
            }
            val oldValue = __v_raw.avatarUrl
            __v_raw.avatarUrl = value
            _tRS(__v_raw, "avatarUrl", oldValue, value)
        }
    override var sex: Number
        get() {
            return _tRG(__v_raw, "sex", __v_raw.sex, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("sex")) {
                return
            }
            val oldValue = __v_raw.sex
            __v_raw.sex = value
            _tRS(__v_raw, "sex", oldValue, value)
        }
    override var city: String?
        get() {
            return _tRG(__v_raw, "city", __v_raw.city, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("city")) {
                return
            }
            val oldValue = __v_raw.city
            __v_raw.city = value
            _tRS(__v_raw, "city", oldValue, value)
        }
    override var country: String?
        get() {
            return _tRG(__v_raw, "country", __v_raw.country, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("country")) {
                return
            }
            val oldValue = __v_raw.country
            __v_raw.country = value
            _tRS(__v_raw, "country", oldValue, value)
        }
    override var province: String?
        get() {
            return _tRG(__v_raw, "province", __v_raw.province, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("province")) {
                return
            }
            val oldValue = __v_raw.province
            __v_raw.province = value
            _tRS(__v_raw, "province", oldValue, value)
        }
    override var idCard: String?
        get() {
            return _tRG(__v_raw, "idCard", __v_raw.idCard, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("idCard")) {
                return
            }
            val oldValue = __v_raw.idCard
            __v_raw.idCard = value
            _tRS(__v_raw, "idCard", oldValue, value)
        }
    override var email: String?
        get() {
            return _tRG(__v_raw, "email", __v_raw.email, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("email")) {
                return
            }
            val oldValue = __v_raw.email
            __v_raw.email = value
            _tRS(__v_raw, "email", oldValue, value)
        }
    override var mobile: String?
        get() {
            return _tRG(__v_raw, "mobile", __v_raw.mobile, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("mobile")) {
                return
            }
            val oldValue = __v_raw.mobile
            __v_raw.mobile = value
            _tRS(__v_raw, "mobile", oldValue, value)
        }
    override var settledTime: String
        get() {
            return _tRG(__v_raw, "settledTime", __v_raw.settledTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("settledTime")) {
                return
            }
            val oldValue = __v_raw.settledTime
            __v_raw.settledTime = value
            _tRS(__v_raw, "settledTime", oldValue, value)
        }
    override var expireTime: String
        get() {
            return _tRG(__v_raw, "expireTime", __v_raw.expireTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("expireTime")) {
                return
            }
            val oldValue = __v_raw.expireTime
            __v_raw.expireTime = value
            _tRS(__v_raw, "expireTime", oldValue, value)
        }
    override var loginType: Number?
        get() {
            return _tRG(__v_raw, "loginType", __v_raw.loginType, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("loginType")) {
                return
            }
            val oldValue = __v_raw.loginType
            __v_raw.loginType = value
            _tRS(__v_raw, "loginType", oldValue, value)
        }
    override var perfection: Number?
        get() {
            return _tRG(__v_raw, "perfection", __v_raw.perfection, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("perfection")) {
                return
            }
            val oldValue = __v_raw.perfection
            __v_raw.perfection = value
            _tRS(__v_raw, "perfection", oldValue, value)
        }
    override var language: String?
        get() {
            return _tRG(__v_raw, "language", __v_raw.language, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("language")) {
                return
            }
            val oldValue = __v_raw.language
            __v_raw.language = value
            _tRS(__v_raw, "language", oldValue, value)
        }
    override var source: String?
        get() {
            return _tRG(__v_raw, "source", __v_raw.source, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("source")) {
                return
            }
            val oldValue = __v_raw.source
            __v_raw.source = value
            _tRS(__v_raw, "source", oldValue, value)
        }
    override var sourceId: String?
        get() {
            return _tRG(__v_raw, "sourceId", __v_raw.sourceId, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("sourceId")) {
                return
            }
            val oldValue = __v_raw.sourceId
            __v_raw.sourceId = value
            _tRS(__v_raw, "sourceId", oldValue, value)
        }
}
open class Message (
    @JsonNotNull
    open var id: String,
    @JsonNotNull
    open var title: String,
    @JsonNotNull
    open var context: String,
    @JsonNotNull
    open var type: Number,
    @JsonNotNull
    open var platform: String,
    open var notifyId: String? = null,
    open var sourceId: String? = null,
    @JsonNotNull
    open var readStatus: Number,
    open var readTime: String? = null,
    open var createdTime: String? = null,
    open var source: String? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return MessageReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class MessageReactiveObject : Message, IUTSReactive<Message> {
    override var __v_raw: Message
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: Message, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(id = __v_raw.id, title = __v_raw.title, context = __v_raw.context, type = __v_raw.type, platform = __v_raw.platform, notifyId = __v_raw.notifyId, sourceId = __v_raw.sourceId, readStatus = __v_raw.readStatus, readTime = __v_raw.readTime, createdTime = __v_raw.createdTime, source = __v_raw.source) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): MessageReactiveObject {
        return MessageReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var id: String
        get() {
            return _tRG(__v_raw, "id", __v_raw.id, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("id")) {
                return
            }
            val oldValue = __v_raw.id
            __v_raw.id = value
            _tRS(__v_raw, "id", oldValue, value)
        }
    override var title: String
        get() {
            return _tRG(__v_raw, "title", __v_raw.title, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("title")) {
                return
            }
            val oldValue = __v_raw.title
            __v_raw.title = value
            _tRS(__v_raw, "title", oldValue, value)
        }
    override var context: String
        get() {
            return _tRG(__v_raw, "context", __v_raw.context, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("context")) {
                return
            }
            val oldValue = __v_raw.context
            __v_raw.context = value
            _tRS(__v_raw, "context", oldValue, value)
        }
    override var type: Number
        get() {
            return _tRG(__v_raw, "type", __v_raw.type, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("type")) {
                return
            }
            val oldValue = __v_raw.type
            __v_raw.type = value
            _tRS(__v_raw, "type", oldValue, value)
        }
    override var platform: String
        get() {
            return _tRG(__v_raw, "platform", __v_raw.platform, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("platform")) {
                return
            }
            val oldValue = __v_raw.platform
            __v_raw.platform = value
            _tRS(__v_raw, "platform", oldValue, value)
        }
    override var notifyId: String?
        get() {
            return _tRG(__v_raw, "notifyId", __v_raw.notifyId, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("notifyId")) {
                return
            }
            val oldValue = __v_raw.notifyId
            __v_raw.notifyId = value
            _tRS(__v_raw, "notifyId", oldValue, value)
        }
    override var sourceId: String?
        get() {
            return _tRG(__v_raw, "sourceId", __v_raw.sourceId, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("sourceId")) {
                return
            }
            val oldValue = __v_raw.sourceId
            __v_raw.sourceId = value
            _tRS(__v_raw, "sourceId", oldValue, value)
        }
    override var readStatus: Number
        get() {
            return _tRG(__v_raw, "readStatus", __v_raw.readStatus, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("readStatus")) {
                return
            }
            val oldValue = __v_raw.readStatus
            __v_raw.readStatus = value
            _tRS(__v_raw, "readStatus", oldValue, value)
        }
    override var readTime: String?
        get() {
            return _tRG(__v_raw, "readTime", __v_raw.readTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("readTime")) {
                return
            }
            val oldValue = __v_raw.readTime
            __v_raw.readTime = value
            _tRS(__v_raw, "readTime", oldValue, value)
        }
    override var createdTime: String?
        get() {
            return _tRG(__v_raw, "createdTime", __v_raw.createdTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("createdTime")) {
                return
            }
            val oldValue = __v_raw.createdTime
            __v_raw.createdTime = value
            _tRS(__v_raw, "createdTime", oldValue, value)
        }
    override var source: String?
        get() {
            return _tRG(__v_raw, "source", __v_raw.source, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("source")) {
                return
            }
            val oldValue = __v_raw.source
            __v_raw.source = value
            _tRS(__v_raw, "source", oldValue, value)
        }
}
open class UTSError (
    @JsonNotNull
    open var code: String,
    @JsonNotNull
    open var msg: String,
) : UTSObject()
open class EquipConfigAttr (
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var map: String,
    open var value: String? = null,
    open var needCollect: Boolean? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return EquipConfigAttrReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class EquipConfigAttrReactiveObject : EquipConfigAttr, IUTSReactive<EquipConfigAttr> {
    override var __v_raw: EquipConfigAttr
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: EquipConfigAttr, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name, map = __v_raw.map, value = __v_raw.value, needCollect = __v_raw.needCollect) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): EquipConfigAttrReactiveObject {
        return EquipConfigAttrReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var name: String
        get() {
            return _tRG(__v_raw, "name", __v_raw.name, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("name")) {
                return
            }
            val oldValue = __v_raw.name
            __v_raw.name = value
            _tRS(__v_raw, "name", oldValue, value)
        }
    override var map: String
        get() {
            return _tRG(__v_raw, "map", __v_raw.map, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("map")) {
                return
            }
            val oldValue = __v_raw.map
            __v_raw.map = value
            _tRS(__v_raw, "map", oldValue, value)
        }
    override var value: String?
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
    override var needCollect: Boolean?
        get() {
            return _tRG(__v_raw, "needCollect", __v_raw.needCollect, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("needCollect")) {
                return
            }
            val oldValue = __v_raw.needCollect
            __v_raw.needCollect = value
            _tRS(__v_raw, "needCollect", oldValue, value)
        }
}
open class EquipConfigDetail (
    open var runMap: String? = null,
    open var alarmMa: String? = null,
    open var attrs: UTSArray<EquipConfigAttr>? = null,
) : UTSObject()
open class EquipConfig (
    @JsonNotNull
    open var equipId: String,
    open var config: EquipConfigDetail? = null,
) : UTSObject()
open class EquipCollect (
    @JsonNotNull
    open var sn: String,
    @JsonNotNull
    open var data: Record<String, String>,
    @JsonNotNull
    open var time: String,
    @JsonNotNull
    open var tenantId: String,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return EquipCollectReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class EquipCollectReactiveObject : EquipCollect, IUTSReactive<EquipCollect> {
    override var __v_raw: EquipCollect
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: EquipCollect, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(sn = __v_raw.sn, data = __v_raw.data, time = __v_raw.time, tenantId = __v_raw.tenantId) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): EquipCollectReactiveObject {
        return EquipCollectReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var sn: String
        get() {
            return _tRG(__v_raw, "sn", __v_raw.sn, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("sn")) {
                return
            }
            val oldValue = __v_raw.sn
            __v_raw.sn = value
            _tRS(__v_raw, "sn", oldValue, value)
        }
    override var data: Record<String, String>
        get() {
            return _tRG(__v_raw, "data", __v_raw.data, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("data")) {
                return
            }
            val oldValue = __v_raw.data
            __v_raw.data = value
            _tRS(__v_raw, "data", oldValue, value)
        }
    override var time: String
        get() {
            return _tRG(__v_raw, "time", __v_raw.time, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("time")) {
                return
            }
            val oldValue = __v_raw.time
            __v_raw.time = value
            _tRS(__v_raw, "time", oldValue, value)
        }
    override var tenantId: String
        get() {
            return _tRG(__v_raw, "tenantId", __v_raw.tenantId, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("tenantId")) {
                return
            }
            val oldValue = __v_raw.tenantId
            __v_raw.tenantId = value
            _tRS(__v_raw, "tenantId", oldValue, value)
        }
}
open class Equip (
    @JsonNotNull
    open var id: String,
    @JsonNotNull
    open var selfCode: String,
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var type: Number,
    @JsonNotNull
    open var runState: Number,
    @JsonNotNull
    open var alarmState: Number,
    @JsonNotNull
    open var onlineState: Number,
    open var workshop: WorkshopTreeNode? = null,
    open var attrs: UTSArray<EquipAttr>? = null,
    open var alarmTexts: UTSArray<String>? = null,
    open var onlineChangeTime: String? = null,
    open var runChangeTime: String? = null,
    open var alarmChangeTime: String? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return EquipReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class EquipReactiveObject : Equip, IUTSReactive<Equip> {
    override var __v_raw: Equip
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: Equip, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(id = __v_raw.id, selfCode = __v_raw.selfCode, name = __v_raw.name, type = __v_raw.type, runState = __v_raw.runState, alarmState = __v_raw.alarmState, onlineState = __v_raw.onlineState, workshop = __v_raw.workshop, attrs = __v_raw.attrs, alarmTexts = __v_raw.alarmTexts, onlineChangeTime = __v_raw.onlineChangeTime, runChangeTime = __v_raw.runChangeTime, alarmChangeTime = __v_raw.alarmChangeTime) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): EquipReactiveObject {
        return EquipReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var id: String
        get() {
            return _tRG(__v_raw, "id", __v_raw.id, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("id")) {
                return
            }
            val oldValue = __v_raw.id
            __v_raw.id = value
            _tRS(__v_raw, "id", oldValue, value)
        }
    override var selfCode: String
        get() {
            return _tRG(__v_raw, "selfCode", __v_raw.selfCode, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("selfCode")) {
                return
            }
            val oldValue = __v_raw.selfCode
            __v_raw.selfCode = value
            _tRS(__v_raw, "selfCode", oldValue, value)
        }
    override var name: String
        get() {
            return _tRG(__v_raw, "name", __v_raw.name, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("name")) {
                return
            }
            val oldValue = __v_raw.name
            __v_raw.name = value
            _tRS(__v_raw, "name", oldValue, value)
        }
    override var type: Number
        get() {
            return _tRG(__v_raw, "type", __v_raw.type, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("type")) {
                return
            }
            val oldValue = __v_raw.type
            __v_raw.type = value
            _tRS(__v_raw, "type", oldValue, value)
        }
    override var runState: Number
        get() {
            return _tRG(__v_raw, "runState", __v_raw.runState, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("runState")) {
                return
            }
            val oldValue = __v_raw.runState
            __v_raw.runState = value
            _tRS(__v_raw, "runState", oldValue, value)
        }
    override var alarmState: Number
        get() {
            return _tRG(__v_raw, "alarmState", __v_raw.alarmState, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("alarmState")) {
                return
            }
            val oldValue = __v_raw.alarmState
            __v_raw.alarmState = value
            _tRS(__v_raw, "alarmState", oldValue, value)
        }
    override var onlineState: Number
        get() {
            return _tRG(__v_raw, "onlineState", __v_raw.onlineState, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("onlineState")) {
                return
            }
            val oldValue = __v_raw.onlineState
            __v_raw.onlineState = value
            _tRS(__v_raw, "onlineState", oldValue, value)
        }
    override var workshop: WorkshopTreeNode?
        get() {
            return _tRG(__v_raw, "workshop", __v_raw.workshop, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("workshop")) {
                return
            }
            val oldValue = __v_raw.workshop
            __v_raw.workshop = value
            _tRS(__v_raw, "workshop", oldValue, value)
        }
    override var attrs: UTSArray<EquipAttr>?
        get() {
            return _tRG(__v_raw, "attrs", __v_raw.attrs, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("attrs")) {
                return
            }
            val oldValue = __v_raw.attrs
            __v_raw.attrs = value
            _tRS(__v_raw, "attrs", oldValue, value)
        }
    override var alarmTexts: UTSArray<String>?
        get() {
            return _tRG(__v_raw, "alarmTexts", __v_raw.alarmTexts, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("alarmTexts")) {
                return
            }
            val oldValue = __v_raw.alarmTexts
            __v_raw.alarmTexts = value
            _tRS(__v_raw, "alarmTexts", oldValue, value)
        }
    override var onlineChangeTime: String?
        get() {
            return _tRG(__v_raw, "onlineChangeTime", __v_raw.onlineChangeTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("onlineChangeTime")) {
                return
            }
            val oldValue = __v_raw.onlineChangeTime
            __v_raw.onlineChangeTime = value
            _tRS(__v_raw, "onlineChangeTime", oldValue, value)
        }
    override var runChangeTime: String?
        get() {
            return _tRG(__v_raw, "runChangeTime", __v_raw.runChangeTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("runChangeTime")) {
                return
            }
            val oldValue = __v_raw.runChangeTime
            __v_raw.runChangeTime = value
            _tRS(__v_raw, "runChangeTime", oldValue, value)
        }
    override var alarmChangeTime: String?
        get() {
            return _tRG(__v_raw, "alarmChangeTime", __v_raw.alarmChangeTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("alarmChangeTime")) {
                return
            }
            val oldValue = __v_raw.alarmChangeTime
            __v_raw.alarmChangeTime = value
            _tRS(__v_raw, "alarmChangeTime", oldValue, value)
        }
}
open class EquipAttr (
    @JsonNotNull
    open var name: String,
    open var value: String? = null,
    open var equipId: String? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return EquipAttrReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class EquipAttrReactiveObject : EquipAttr, IUTSReactive<EquipAttr> {
    override var __v_raw: EquipAttr
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: EquipAttr, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name, value = __v_raw.value, equipId = __v_raw.equipId) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): EquipAttrReactiveObject {
        return EquipAttrReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var name: String
        get() {
            return _tRG(__v_raw, "name", __v_raw.name, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("name")) {
                return
            }
            val oldValue = __v_raw.name
            __v_raw.name = value
            _tRS(__v_raw, "name", oldValue, value)
        }
    override var value: String?
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
    override var equipId: String?
        get() {
            return _tRG(__v_raw, "equipId", __v_raw.equipId, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("equipId")) {
                return
            }
            val oldValue = __v_raw.equipId
            __v_raw.equipId = value
            _tRS(__v_raw, "equipId", oldValue, value)
        }
}
open class EquipCount (
    @JsonNotNull
    open var total: Number,
    @JsonNotNull
    open var alarm: Number,
    @JsonNotNull
    open var online: Number,
    @JsonNotNull
    open var offline: Number,
    @JsonNotNull
    open var run: Number,
    @JsonNotNull
    open var stopped: Number,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return EquipCountReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class EquipCountReactiveObject : EquipCount, IUTSReactive<EquipCount> {
    override var __v_raw: EquipCount
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: EquipCount, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(total = __v_raw.total, alarm = __v_raw.alarm, online = __v_raw.online, offline = __v_raw.offline, run = __v_raw.run, stopped = __v_raw.stopped) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): EquipCountReactiveObject {
        return EquipCountReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var total: Number
        get() {
            return _tRG(__v_raw, "total", __v_raw.total, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("total")) {
                return
            }
            val oldValue = __v_raw.total
            __v_raw.total = value
            _tRS(__v_raw, "total", oldValue, value)
        }
    override var alarm: Number
        get() {
            return _tRG(__v_raw, "alarm", __v_raw.alarm, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("alarm")) {
                return
            }
            val oldValue = __v_raw.alarm
            __v_raw.alarm = value
            _tRS(__v_raw, "alarm", oldValue, value)
        }
    override var online: Number
        get() {
            return _tRG(__v_raw, "online", __v_raw.online, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("online")) {
                return
            }
            val oldValue = __v_raw.online
            __v_raw.online = value
            _tRS(__v_raw, "online", oldValue, value)
        }
    override var offline: Number
        get() {
            return _tRG(__v_raw, "offline", __v_raw.offline, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("offline")) {
                return
            }
            val oldValue = __v_raw.offline
            __v_raw.offline = value
            _tRS(__v_raw, "offline", oldValue, value)
        }
    override var run: Number
        get() {
            return _tRG(__v_raw, "run", __v_raw.run, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("run")) {
                return
            }
            val oldValue = __v_raw.run
            __v_raw.run = value
            _tRS(__v_raw, "run", oldValue, value)
        }
    override var stopped: Number
        get() {
            return _tRG(__v_raw, "stopped", __v_raw.stopped, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("stopped")) {
                return
            }
            val oldValue = __v_raw.stopped
            __v_raw.stopped = value
            _tRS(__v_raw, "stopped", oldValue, value)
        }
}
open class WorkshopTreeNode (
    @JsonNotNull
    open var id: String,
    @JsonNotNull
    open var selfCode: String,
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var code: String,
    open var pcode: String? = null,
    open var children: UTSArray<WorkshopTreeNode>? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return WorkshopTreeNodeReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class WorkshopTreeNodeReactiveObject : WorkshopTreeNode, IUTSReactive<WorkshopTreeNode> {
    override var __v_raw: WorkshopTreeNode
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: WorkshopTreeNode, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(id = __v_raw.id, selfCode = __v_raw.selfCode, name = __v_raw.name, code = __v_raw.code, pcode = __v_raw.pcode, children = __v_raw.children) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): WorkshopTreeNodeReactiveObject {
        return WorkshopTreeNodeReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var id: String
        get() {
            return _tRG(__v_raw, "id", __v_raw.id, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("id")) {
                return
            }
            val oldValue = __v_raw.id
            __v_raw.id = value
            _tRS(__v_raw, "id", oldValue, value)
        }
    override var selfCode: String
        get() {
            return _tRG(__v_raw, "selfCode", __v_raw.selfCode, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("selfCode")) {
                return
            }
            val oldValue = __v_raw.selfCode
            __v_raw.selfCode = value
            _tRS(__v_raw, "selfCode", oldValue, value)
        }
    override var name: String
        get() {
            return _tRG(__v_raw, "name", __v_raw.name, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("name")) {
                return
            }
            val oldValue = __v_raw.name
            __v_raw.name = value
            _tRS(__v_raw, "name", oldValue, value)
        }
    override var code: String
        get() {
            return _tRG(__v_raw, "code", __v_raw.code, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("code")) {
                return
            }
            val oldValue = __v_raw.code
            __v_raw.code = value
            _tRS(__v_raw, "code", oldValue, value)
        }
    override var pcode: String?
        get() {
            return _tRG(__v_raw, "pcode", __v_raw.pcode, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pcode")) {
                return
            }
            val oldValue = __v_raw.pcode
            __v_raw.pcode = value
            _tRS(__v_raw, "pcode", oldValue, value)
        }
    override var children: UTSArray<WorkshopTreeNode>?
        get() {
            return _tRG(__v_raw, "children", __v_raw.children, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("children")) {
                return
            }
            val oldValue = __v_raw.children
            __v_raw.children = value
            _tRS(__v_raw, "children", oldValue, value)
        }
}
open class WorkshopScada (
    open var url: String? = null,
    open var interval: Number? = null,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return WorkshopScadaReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class WorkshopScadaReactiveObject : WorkshopScada, IUTSReactive<WorkshopScada> {
    override var __v_raw: WorkshopScada
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: WorkshopScada, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(url = __v_raw.url, interval = __v_raw.interval) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): WorkshopScadaReactiveObject {
        return WorkshopScadaReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var url: String?
        get() {
            return _tRG(__v_raw, "url", __v_raw.url, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("url")) {
                return
            }
            val oldValue = __v_raw.url
            __v_raw.url = value
            _tRS(__v_raw, "url", oldValue, value)
        }
    override var interval: Number?
        get() {
            return _tRG(__v_raw, "interval", __v_raw.interval, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("interval")) {
                return
            }
            val oldValue = __v_raw.interval
            __v_raw.interval = value
            _tRS(__v_raw, "interval", oldValue, value)
        }
}
val `default` = _uA(
    _uA(
        "已阅读并同意<__=__><__&__>用户协议<__=__><__&__>隐私政策<__=__><__&__>请先阅读并同意《用户协议》和《隐私政策》<__=__><__&__>我的昵称<__=__><__&__>简介<__=__><__&__>介绍一下自己<__=__><__&__>性别<__=__><__&__>编辑性别<__=__><__&__>生日<__=__><__&__>选择生日<__=__><__&__>地区<__=__><__&__>选择所在的地区<__=__><__&__>选择性别<__=__><__&__>保密<__=__><__&__>男<__=__><__&__>女<__=__><__&__>性别设置成功<__=__><__&__>生日设置成功<__=__><__&__>地区设置成功<__=__><__&__>头像上传成功<__=__><__&__>编辑昵称<__=__><__&__>请输入昵称<__=__><__&__>请设置2-20个字符，不包括@<>/等无效字符<__=__><__&__>确认<__=__><__&__>昵称长度需在2-20个字符之间<__=__><__&__>昵称不能包含@<>/等特殊字符<__=__><__&__>编辑简介<__=__><__&__>简介不能为空<__=__><__&__>提示<__=__><__&__>为提供更好的服务，我们邀请您填写昵称、头像等公开信息<__=__><__&__>头像<__=__><__&__>昵称<__=__><__&__>点击输入昵称<__=__><__&__>取消<__=__><__&__>请上传头像<__=__><__&__>登录中<__=__><__&__>手机登录<__=__><__&__>未注册的手机号登录成功后将自动注册<__=__><__&__>请输入手机号<__=__><__&__>请输入验证码<__=__><__&__>登录<__=__><__&__>购物车 ({num})<__=__><__&__>完成<__=__><__&__>管理<__=__><__&__>删除<__=__><__&__>全选<__=__><__&__>合计<__=__><__&__>去结算<__=__><__&__>温馨提示<__=__><__&__>确定删除该商品吗？<__=__><__&__>删除成功<__=__><__&__>请先选择商品<__=__><__&__>确定删除选中的商品吗？<__=__><__&__>您需支付 {price} 元，请确认支付<__=__><__&__>支付成功<__=__><__&__>已设为默认<__=__><__&__>设为默认<__=__><__&__>修改<__=__><__&__>添加地址<__=__><__&__>删除地址后无法恢复，确认要删除该地址吗？<__=__><__&__>加载中<__=__><__&__>收货人<__=__><__&__>请输入收货人姓名<__=__><__&__>手机号<__=__><__&__>选择省市区<__=__><__&__>详细地址<__=__><__&__>小区楼栋、门牌号、村等<__=__><__&__>默认地址<__=__><__&__>保存<__=__><__&__>收货人不能为空<__=__><__&__>手机号不能为空<__=__><__&__>手机号格式不正确<__=__><__&__>详细地址不能为空<__=__><__&__>所在地区不能为空<__=__><__&__>保存中<__=__><__&__>开启通知<__=__><__&__>通用设置<__=__><__&__>通知设置<__=__><__&__>隐私设置<__=__><__&__>关于{name}<__=__><__&__>联系客服<__=__><__&__>退出登录<__=__><__&__>确定退出登录吗？<__=__><__&__>深色模式<__=__><__&__>多语言<__=__><__&__>字体大小<__=__><__&__>访问官网<__=__><__&__>商城<__=__><__&__>商品分类<__=__><__&__>商品详情<__=__><__&__>商品列表、筛选<__=__><__&__>购物车<__=__><__&__>订单列表、详情<__=__><__&__>收货地址<__=__><__&__>聊天<__=__><__&__>对话列表、历史记录<__=__><__&__>流式回复<__=__><__&__>语言合成<__=__><__&__>语音识别<__=__><__&__>其他<__=__><__&__>文件管理<__=__><__&__>该模板正在开发中<__=__><__&__>未登录<__=__><__&__>总点击<__=__><__&__>赞<__=__><__&__>收藏<__=__><__&__>粉丝<__=__><__&__>接单模式<__=__><__&__>已关闭<__=__><__&__>消息通知<__=__><__&__>待支付<__=__><__&__>未发货<__=__><__&__>已发货<__=__><__&__>售后 / 退款<__=__><__&__>我的钱包<__=__><__&__>数据看板<__=__><__&__>历史记录<__=__><__&__>邀请好友<__=__><__&__>设置<__=__><__&__>开发中，敬请期待<__=__><__&__>基础组件<__=__><__&__>文本<__=__><__&__>按钮<__=__><__&__>图片<__=__><__&__>图标<__=__><__&__>标签<__=__><__&__>表单组件<__=__><__&__>表单验证<__=__><__&__>输入框<__=__><__&__>文本域<__=__><__&__>计数器<__=__><__&__>口令输入<__=__><__&__>键盘<__=__><__&__>单选框<__=__><__&__>多选框<__=__><__&__>开关<__=__><__&__>评分<__=__><__&__>滑块<__=__><__&__>选择器<__=__><__&__>日期选择器<__=__><__&__>时间选择器<__=__><__&__>级联选择器<__=__><__&__>文件上传<__=__><__&__>日历<__=__><__&__>布局组件<__=__><__&__>弹性布局<__=__><__&__>标签页<__=__><__&__>折叠面板<__=__><__&__>吸顶<__=__><__&__>导航栏<__=__><__&__>底部视图<__=__><__&__>悬浮视图<__=__><__&__>数据展示<__=__><__&__>查看更多<__=__><__&__>列表<__=__><__&__>列表视图<__=__><__&__>列表刷新<__=__><__&__>瀑布流<__=__><__&__>轮播图<__=__><__&__>跑马灯<__=__><__&__>分页<__=__><__&__>时间轴<__=__><__&__>拖拽<__=__><__&__>筛选栏<__=__><__&__>树形结构<__=__><__&__>状态组件<__=__><__&__>角标<__=__><__&__>通知栏<__=__><__&__>倒计时<__=__><__&__>数字滚动<__=__><__&__>进度条<__=__><__&__>圆形进度条<__=__><__&__>骨架图<__=__><__&__>加载更多<__=__><__&__>反馈组件<__=__><__&__>操作菜单<__=__><__&__>弹窗<__=__><__&__>确认框<__=__><__&__>提示框<__=__><__&__>签名<__=__><__&__>水印<__=__><__&__>图片裁剪<__=__><__&__>Canvas<__=__><__&__>富文本<__=__><__&__>该功能正在开发中<__=__><__&__>圆形<__=__><__&__>组合<__=__><__&__>基础用法<__=__><__&__>自定义<__=__><__&__>加快滚动速度<__=__><__&__>显示小数位数<__=__><__&__>自定义样式<__=__><__&__>自定义颜色<__=__><__&__>自定义宽度<__=__><__&__>不显示文本<__=__><__&__>改个颜色<__=__><__&__>显示文本<__=__><__&__>快一些<__=__><__&__>带图标<__=__><__&__>设置速度<__=__><__&__>垂直方向<__=__><__&__>3秒后加载完成<__=__><__&__>隐藏为 00 的值<__=__><__&__>指定天数<__=__><__&__>自定义模板<__=__><__&__>指定小时<__=__><__&__>指定分钟<__=__><__&__>指定秒<__=__><__&__>完成后提示<__=__><__&__>3秒后开始倒计时<__=__><__&__>结合按钮<__=__><__&__>购买<__=__><__&__>消息<__=__><__&__>结合图片<__=__><__&__>结合图标<__=__><__&__>点击触发<__=__><__&__>不同大小<__=__><__&__>不同颜色<__=__><__&__>使用base64<__=__><__&__>没有错误提示<__=__><__&__>转动图片<__=__><__&__>验证通过<__=__><__&__>验证失败<__=__><__&__>操作<__=__><__&__>清空<__=__><__&__>预览<__=__><__&__>设置高度<__=__><__&__>毛笔效果<__=__><__&__>添加LOGO<__=__><__&__>圆角定位点<__=__><__&__>内间距<__=__><__&__>导出图片<__=__><__&__>矩形<__=__><__&__>点<__=__><__&__>线性<__=__><__&__>小方格<__=__><__&__>格式化<__=__><__&__>添加<__=__><__&__>减去<__=__><__&__>获取某个单位的开始时间<__=__><__&__>获取某个单位的结束时间<__=__><__&__>是否同一天<__=__><__&__>是否早于<__=__><__&__>是否晚于<__=__><__&__>差值<__=__><__&__>差值（单位）<__=__><__&__>选择图片<__=__><__&__>可调节裁剪框大小<__=__><__&__>预览图片<__=__><__&__>保存图片<__=__><__&__>本页面内容由 canvas 渲染生成，是否立即预览图片效果？<__=__><__&__>基础动画<__=__><__&__>淡入淡出<__=__><__&__>播放动画<__=__><__&__>滑入<__=__><__&__>旋转翻转<__=__><__&__>摇摆抖动<__=__><__&__>特殊效果<__=__><__&__>组合动画<__=__><__&__>标题<__=__><__&__>插槽<__=__><__&__>使用 PT 自定义颜色<__=__><__&__>自定义返回图标<__=__><__&__>自定义返回路径<__=__><__&__>自定义标题内容<__=__><__&__>显示滑块<__=__><__&__>添加间距<__=__><__&__>横向填充<__=__><__&__>适用于标签数量不多的情况<__=__><__&__>居中<__=__><__&__>单个禁用<__=__><__&__>显示下划线<__=__><__&__>禁用<__=__><__&__>取消订单<__=__><__&__>立即购买<__=__><__&__>确认收货<__=__><__&__>评价<__=__><__&__>禁用状态，无法拖拽<__=__><__&__>不吸附边缘，任意位置可拖拽<__=__><__&__>这是一个提示<__=__><__&__>左间隔<__=__><__&__>右移动<__=__><__&__>左移动<__=__><__&__>多个数据<__=__><__&__>点击收起<__=__><__&__>点击展开<__=__><__&__>ref 方式调用<__=__><__&__>自定义图标、文字、大小<__=__><__&__>上传证件照<__=__><__&__>多选<__=__><__&__>限制 3 个<__=__><__&__>边框<__=__><__&__>显示字数<__=__><__&__>自动增高<__=__><__&__>其他颜色<__=__><__&__>大一点<__=__><__&__>正方形<__=__><__&__>范围选择<__=__><__&__>显示值<__=__><__&__>步长10<__=__><__&__>滑块大点<__=__><__&__>换个颜色<__=__><__&__>最大50<__=__><__&__>自定义触发器<__=__><__&__>打开选择器<__=__><__&__>多列<__=__><__&__>通过 children 配置多级数据，并使用 column-count 参数指定显示的列数<__=__><__&__>弹窗中使用<__=__><__&__>打开<__=__><__&__>选择地区<__=__><__&__>绑定值<__=__><__&__>下一步<__=__><__&__>确定<__=__><__&__>关闭<__=__><__&__>显示取消按钮<__=__><__&__>修改按钮文案<__=__><__&__>显示绑定值<__=__><__&__>时<__=__><__&__>时:分<__=__><__&__>时:分:秒<__=__><__&__>标签格式化<__=__><__&__>固定开始、结束日期<__=__><__&__>自定义快捷选项<__=__><__&__>只读<__=__><__&__>显示分数<__=__><__&__>允许半星<__=__><__&__>换个图标<__=__><__&__>纵向排列<__=__><__&__>换个样式<__=__><__&__>不显示图标<__=__><__&__>其他样式<__=__><__&__>数字键盘<__=__><__&__>打开键盘<__=__><__&__>是否显示输入值<__=__><__&__>输入即绑定<__=__><__&__>身份证键盘<__=__><__&__>密码键盘<__=__><__&__>是否加密<__=__><__&__>车牌号键盘<__=__><__&__>数字输入<__=__><__&__>密码输入<__=__><__&__>可清除<__=__><__&__>左右插槽<__=__><__&__>左图标<__=__><__&__>右图标<__=__><__&__>自动聚焦<__=__><__&__>长度为6<__=__><__&__>步进为10<__=__><__&__>最小为10<__=__><__&__>最大为50<__=__><__&__>可以小数<__=__><__&__>可以输入<__=__><__&__>用户名<__=__><__&__>请输入用户名<__=__><__&__>邮箱<__=__><__&__>请输入邮箱地址<__=__><__&__>动态验证<__=__><__&__>联系人<__=__><__&__>添加联系人<__=__><__&__>身高<__=__><__&__>体重<__=__><__&__>所在地区<__=__><__&__>出生年月<__=__><__&__>个人简介<__=__><__&__>请输入个人简介<__=__><__&__>公开状态<__=__><__&__>重置<__=__><__&__>提交<__=__><__&__>未知<__=__><__&__>篮球<__=__><__&__>足球<__=__><__&__>羽毛球<__=__><__&__>乒乓球<__=__><__&__>游泳<__=__><__&__>用户名不能为空<__=__><__&__>用户名长度在3-20个字符之间<__=__><__&__>邮箱不能为空<__=__><__&__>邮箱格式不正确<__=__><__&__>身高不能为空<__=__><__&__>身高在160-190cm之间<__=__><__&__>体重不能为空<__=__><__&__>体重在40-100kg之间<__=__><__&__>标签不能为空<__=__><__&__>标签最多选择2个<__=__><__&__>性别不能为空<__=__><__&__>出生年月不能为空<__=__><__&__>出生年月不大于2010-01-01<__=__><__&__>联系人不能为空<__=__><__&__>提交成功<__=__><__&__>单个 true / false<__=__><__&__>带索引、地区选择<__=__><__&__>换个分隔符<__=__><__&__>列表高度小一点<__=__><__&__>范围选<__=__><__&__>禁用部分日期<__=__><__&__>日历长列表<__=__><__&__>打开日历长列表<__=__><__&__>日历面板<__=__><__&__>自定义文案和颜色<__=__><__&__>显示头<__=__><__&__>显示星期<__=__><__&__>显示其他月份<__=__><__&__>不同位置<__=__><__&__>顶部<__=__><__&__>中间<__=__><__&__>底部<__=__><__&__>不同类型<__=__><__&__>成功<__=__><__&__>失败<__=__><__&__>警告<__=__><__&__>问题<__=__><__&__>停止<__=__><__&__>自定义图标<__=__><__&__>只存在一个<__=__><__&__>不同位置提示<__=__><__&__>不同类型提示<__=__><__&__>带图标提示<__=__><__&__>移除其他已存在的提示<__=__><__&__>打开弹窗<__=__><__&__>设置宽度 80%<__=__><__&__>无头<__=__><__&__>左侧<__=__><__&__>右侧<__=__><__&__>隐藏取消按钮<__=__><__&__>自定义文本<__=__><__&__>关闭前钩子<__=__><__&__>显示时长<__=__><__&__>确定要删除吗？<__=__><__&__>确定要删除吗？3秒后自动关闭<__=__><__&__>带标题、描述<__=__><__&__>无法点击遮罩关闭<__=__><__&__>不需要取消按钮<__=__><__&__>插槽用法<__=__><__&__>反馈<__=__><__&__>删除好友会同时删除所有聊天记录<__=__><__&__>删除好友<__=__><__&__>确定要删除好友吗？<__=__><__&__>点我关闭<__=__><__&__>确定要关闭吗？<__=__><__&__>支付宝<__=__><__&__>微信<__=__><__&__>父子关联<__=__><__&__>选中值<__=__><__&__>选中操作<__=__><__&__>选中部分节点<__=__><__&__>获取选中节点<__=__><__&__>获取半选节点<__=__><__&__>清空选中<__=__><__&__>展开操作<__=__><__&__>展开部分节点<__=__><__&__>获取展开节点<__=__><__&__>展开所有<__=__><__&__>收起所有<__=__><__&__>开通账号<__=__><__&__>赠送500元<__=__><__&__>完成实名认证<__=__><__&__>通过身份证认证<__=__><__&__>绑定银行卡<__=__><__&__>绑定招商银行储蓄卡<__=__><__&__>首次充值<__=__><__&__>充值1000元<__=__><__&__>完成首笔交易<__=__><__&__>优选灵活配置混合A<__=__><__&__>1000元起<__=__><__&__>禁用切换按钮<__=__><__&__>自定义高度<__=__><__&__>多页数<__=__><__&__>上一页<__=__><__&__>下一页<__=__><__&__>横向滚动<__=__><__&__>纵向滚动<__=__><__&__>快一点<__=__><__&__>暂停<__=__><__&__>内容靠左<__=__><__&__>QQ<__=__><__&__>带箭头<__=__><__&__>余额<__=__><__&__>带图片<__=__><__&__>神仙都没用<__=__><__&__>折叠<__=__><__&__>可滑动<__=__><__&__>左滑编辑<__=__><__&__>编辑<__=__><__&__>右滑删除<__=__><__&__>账号<__=__><__&__>我的订单<__=__><__&__>我的收藏<__=__><__&__>筛选<__=__><__&__>长按项即可拖动排序<__=__><__&__>单列排序<__=__><__&__>不需要长按<__=__><__&__>结合列表使用<__=__><__&__>多列排序<__=__><__&__>结合图片使用<__=__><__&__>禁用手势<__=__><__&__>自定义样式2<__=__><__&__>无图片<__=__><__&__>圆角<__=__><__&__>自定义大小<__=__><__&__>省略号<__=__><__&__>多行省略号<__=__><__&__>金额<__=__><__&__>手机号脱敏<__=__><__&__>姓名脱敏<__=__><__&__>邮箱脱敏<__=__><__&__>银行卡脱敏<__=__><__&__>自定义脱敏字符<__=__><__&__>主要<__=__><__&__>危险<__=__><__&__>信息<__=__><__&__>邮件<__=__><__&__>文件<__=__><__&__>可关闭<__=__><__&__>镂空<__=__><__&__>自定义无圆角<__=__><__&__>不同裁剪<__=__><__&__>点击可预览<__=__><__&__>失败时显示<__=__><__&__>自定义圆角<__=__><__&__>设置颜色<__=__><__&__>设置大小<__=__><__&__>集成 iconfont 与 remixicon 图标库，展示部分示例<__=__><__&__>iconfont<__=__><__&__>remixicon<__=__><__&__>复制成功<__=__><__&__>普通<__=__><__&__>浅色<__=__><__&__>深色<__=__><__&__>只显示图标<__=__><__&__>文本模式<__=__><__&__>带边框<__=__><__&__>圆角按钮<__=__><__&__>带左侧图标<__=__><__&__>小<__=__><__&__>默认<__=__><__&__>大<__=__><__&__>无权限<__=__><__&__>服务异常<__=__><__&__>请在微信浏览器中打开<__=__><__&__>已取消支付<__=__><__&__>支付失败<__=__><__&__>授权信息仅用于用户登录<__=__><__&__>登录授权失败<__=__><__&__>获取短信验证码<__=__><__&__>验证码<__=__><__&__>发送短信<__=__><__&__>{n}s后重新获取<__=__><__&__>获取验证码<__=__><__&__>短信已发送，请查收<__=__><__&__>请填写验证码<__=__><__&__>请填写正确的手机号格式<__=__><__&__>全局字号<__=__><__&__>这是一段示例文字，用于预览不同字号的效果。<__=__><__&__>默认 1.0<__=__><__&__>切换语言<__=__><__&__>切换中<__=__><__&__>模板<__=__><__&__>编辑资料<__=__><__&__>Text 文本<__=__><__&__>Button 按钮<__=__><__&__>Image 图片<__=__><__&__>Icon 图标<__=__><__&__>Tag 标签<__=__><__&__>Form 表单验证<__=__><__&__>Input 输入框<__=__><__&__>Textarea 文本域<__=__><__&__>InputNumber 计数器<__=__><__&__>InputOtp 口令输入<__=__><__&__>Keyboard 键盘<__=__><__&__>Radio 单选框<__=__><__&__>Checkbox 多选框<__=__><__&__>Switch 开关<__=__><__&__>Rate 评分<__=__><__&__>Slider 滑块<__=__><__&__>Select 选择器<__=__><__&__>SelectDate 日期选择器<__=__><__&__>SelectTime 时间选择器<__=__><__&__>Cascader 级联选择器<__=__><__&__>Upload 文件上传<__=__><__&__>Calendar 日历<__=__><__&__>Flex 弹性布局<__=__><__&__>Tabs 标签页<__=__><__&__>Collapse 折叠面板<__=__><__&__>Sticky 吸顶<__=__><__&__>TopBar 导航栏<__=__><__&__>FloatView 悬浮视图<__=__><__&__>Footer 底部视图<__=__><__&__>List 列表<__=__><__&__>ListView 列表视图<__=__><__&__>ListViewRefresh 列表刷新<__=__><__&__>Waterfall 瀑布流<__=__><__&__>Banner 轮播图<__=__><__&__>Marquee 跑马灯<__=__><__&__>Pagination 分页<__=__><__&__>Timeline 时间轴<__=__><__&__>Avatar 头像<__=__><__&__>ReadMore 查看更多<__=__><__&__>Draggable 拖拽<__=__><__&__>FilterBar 筛选栏<__=__><__&__>Tree 树形结构<__=__><__&__>Badge 角标<__=__><__&__>NoticeBar 通知栏<__=__><__&__>Countdown 倒计时<__=__><__&__>Progress 进度条<__=__><__&__>ProgressCircle 圆形进度条<__=__><__&__>Skeleton 骨架图<__=__><__&__>LoadMore 加载更多<__=__><__&__>RollingNumber 数字滚动<__=__><__&__>ActionSheet 操作菜单<__=__><__&__>Popup 弹窗<__=__><__&__>Confirm 确认框<__=__><__&__>Toast 提示框<__=__><__&__>QRCode 二维码<__=__><__&__>Sign 签名<__=__><__&__>DayUts 日期<__=__><__&__>Vibrate 震动<__=__><__&__>Cropper 图片裁剪<__=__><__&__>Canvas 画布<__=__><__&__>SVG 图标<__=__><__&__>SlideVerify 滑动验证<__=__><__&__>Animation 动画<__=__><__&__>编辑地址<__=__><__&__>cool-unix<__=__><__&__>首页<__=__><__&__>我的<__=__><__&__>这是一段需要保护的内容<__=__><__&__>水印会覆盖在内容上方，防止内容被盗用<__=__><__&__>可自定义的水印内容区域<__=__><__&__>水印文本<__=__><__&__>字体大小<__=__><__&__>透明度<__=__><__&__>旋转角度<__=__><__&__>水印宽度<__=__><__&__>水印高度<__=__><__&__>水平间距<__=__><__&__>垂直间距<__=__><__&__>字体粗细<__=__><__&__>正常<__=__><__&__>加粗<__=__><__&__>多行文本水印<__=__><__&__>重要文档<__=__><__&__>这是一份重要的文档内容，需要添加水印保护。<__=__><__&__>水印可以防止内容被未授权的复制和传播。<__=__><__&__>图片保护<__=__>"
    )
)
val default__1 = _uA(
    _uA(
        "其他<__=__>Other<__&__>文件管理<__=__>File Management<__&__>该模板正在开发中<__=__>This template is under development<__&__>未登录<__=__>Not logged in<__&__>总点击<__=__>Total clicks<__&__>赞<__=__>Like<__&__>收藏<__=__>Favorite<__&__>粉丝<__=__>Fans<__&__>接单模式<__=__>Order receiving mode<__&__>已关闭<__=__>Closed<__&__>消息通知<__=__>Message notification<__&__>待支付<__=__>Pending payment<__&__>未发货<__=__>Not shipped<__&__>已发货<__=__>Shipped<__&__>售后 / 退款<__=__>After-sales / Refund<__&__>我的钱包<__=__>My wallet<__&__>数据看板<__=__>Data dashboard<__&__>历史记录<__=__>History<__&__>邀请好友<__=__>Invite friends<__&__>设置<__=__>Settings<__&__>转动图片<__=__>Rotate Picture<__&__>验证通过<__=__>Verification Passed<__&__>验证失败<__=__>Verification Failed<__&__>操作<__=__>Operation<__&__>清空<__=__>Clear<__&__>预览<__=__>Preview<__&__>设置高度<__=__>Set Height<__&__>毛笔效果<__=__>Brush Effect<__&__>添加LOGO<__=__>Add LOGO<__&__>圆角定位点<__=__>Rounded Corner Anchor Point<__&__>内间距<__=__>Inner Spacing<__&__>导出图片<__=__>Export Picture<__&__>矩形<__=__>Rectangle<__&__>点<__=__>Point<__&__>线性<__=__>Linear<__&__>小方格<__=__>Small Square<__&__>格式化<__=__>Format<__&__>添加<__=__>Add<__&__>减去<__=__>Subtract<__&__>获取某个单位的开始时间<__=__>Get the Start Time of a Certain Unit<__&__>密码输入<__=__>Password input<__&__>可清除<__=__>Clearable<__&__>左右插槽<__=__>Left and right slots<__&__>左图标<__=__>Left icon<__&__>右图标<__=__>Right icon<__&__>自动聚焦<__=__>Auto focus<__&__>长度为6<__=__>Length is 6<__&__>步进为10<__=__>Step is 10<__&__>最小为10<__=__>Minimum is 10<__&__>最大为50<__=__>Maximum is 50<__&__>可以小数<__=__>Can be decimal<__&__>可以输入<__=__>Can be input<__&__>用户名<__=__>Username<__&__>请输入用户名<__=__>Please enter username<__&__>邮箱<__=__>Email<__&__>请输入邮箱地址<__=__>Please enter email address<__&__>动态验证<__=__>Dynamic verification<__&__>联系人<__=__>Contact<__&__>添加联系人<__=__>Add contact<__&__>身高<__=__>Height<__&__>跑马灯<__=__>Marquee<__&__>分页<__=__>Pagination<__&__>时间轴<__=__>Timeline<__&__>拖拽<__=__>Drag<__&__>筛选栏<__=__>Filter Bar<__&__>树形结构<__=__>Tree Structure<__&__>状态组件<__=__>Status Component<__&__>角标<__=__>Badge<__&__>通知栏<__=__>Notification Bar<__&__>倒计时<__=__>Countdown<__&__>数字滚动<__=__>Digital Scrolling<__&__>进度条<__=__>Progress Bar<__&__>圆形进度条<__=__>Circular Progress Bar<__&__>骨架图<__=__>Skeleton Screen<__&__>加载更多<__=__>Load More<__&__>反馈组件<__=__>Feedback Component<__&__>操作菜单<__=__>Operation Menu<__&__>弹窗<__=__>Pop-up Window<__&__>确认框<__=__>Confirmation Box<__&__>提示框<__=__>Prompt Box<__&__>签名<__=__>Signature<__&__>水印<__=__>Watermark<__&__>图片裁剪<__=__>Image Cropping<__&__>Canvas<__=__>Canvas<__&__>富文本<__=__>Rich Text<__&__>该功能正在开发中<__=__>This function is under development<__&__>圆形<__=__>Circle<__&__>组合<__=__>Combination<__&__>基础用法<__=__>Basic Usage<__&__>自定义<__=__>Customization<__&__>加快滚动速度<__=__>Speed up scrolling<__&__>显示小数位数<__=__>Display decimal places<__&__>自定义样式<__=__>Custom style<__&__>自定义颜色<__=__>Custom color<__&__>自定义宽度<__=__>Custom width<__&__>不显示文本<__=__>Do not display text<__&__>改个颜色<__=__>Change the color<__&__>显示文本<__=__>Display text<__&__>快一些<__=__>Faster<__&__>带图标<__=__>With icon<__&__>设置速度<__=__>Set speed<__&__>左间隔<__=__>Left interval<__&__>右移动<__=__>Right move<__&__>左移动<__=__>Left move<__&__>多个数据<__=__>Multiple data<__&__>点击收起<__=__>Click to collapse<__&__>点击展开<__=__>Click to expand<__&__>ref 方式调用<__=__>Call by ref method<__&__>自定义图标、文字、大小<__=__>Customize icon, text, size<__&__>上传证件照<__=__>Upload ID photo<__&__>多选<__=__>Multiple selection<__&__>限制 3 个<__=__>Limit 3<__&__>边框<__=__>Border<__&__>显示字数<__=__>Displayed characters<__&__>自动增高<__=__>Auto increase<__&__>其他颜色<__=__>Other colors<__&__>大一点<__=__>Bigger<__&__>正方形<__=__>Square<__&__>范围选择<__=__>Range selection<__&__>显示值<__=__>Display value<__&__>步长10<__=__>Step 10<__&__>开发中，敬请期待<__=__>Under development, please look forward to it<__&__>基础组件<__=__>Basic components<__&__>文本<__=__>Text<__&__>按钮<__=__>Button<__&__>图片<__=__>Image<__&__>图标<__=__>Icon<__&__>标签<__=__>Label<__&__>表单组件<__=__>Form components<__&__>表单验证<__=__>Form validation<__&__>输入框<__=__>Input box<__&__>文本域<__=__>Text area<__&__>计数器<__=__>Counter<__&__>口令输入<__=__>Password input<__&__>键盘<__=__>Keyboard<__&__>单选框<__=__>Radio box<__&__>多选框<__=__>Checkbox<__&__>开关<__=__>Switch<__&__>评分<__=__>Rating<__&__>滑块<__=__>Slider<__&__>选择器<__=__>Selector<__&__>可滑动<__=__>Swipeable<__&__>左滑编辑<__=__>Swipe left to edit<__&__>编辑<__=__>Edit<__&__>右滑删除<__=__>Swipe right to delete<__&__>账号<__=__>Account<__&__>我的订单<__=__>My Orders<__&__>我的收藏<__=__>My Favorites<__&__>筛选<__=__>Filter<__&__>长按项即可拖动排序<__=__>Long press on an item to drag and sort<__&__>单列排序<__=__>Single-column sorting<__&__>不需要长按<__=__>No long press required<__&__>结合列表使用<__=__>Use in combination with a list<__&__>多列排序<__=__>Multi-column sorting<__&__>结合图片使用<__=__>Use in combination with images<__&__>禁用手势<__=__>Disable gestures<__&__>自定义样式2<__=__>Custom style 2<__&__>无图片<__=__>No image<__&__>圆角<__=__>Rounded corners<__&__>自定义大小<__=__>Custom size<__&__>省略号<__=__>Ellipsis<__&__>多行省略号<__=__>Multi-line ellipsis<__&__>金额<__=__>Amount<__&__>手机号脱敏<__=__>Mobile number desensitization<__&__>姓名脱敏<__=__>Name desensitization<__&__>邮箱脱敏<__=__>Email desensitization<__&__>银行卡脱敏<__=__>Bank card desensitization<__&__>自定义脱敏字符<__=__>Custom desensitization character<__&__>主要<__=__>Main<__&__>危险<__=__>Dangerous<__&__>信息<__=__>Information<__&__>邮件<__=__>Mail<__&__>文件<__=__>File<__&__>可关闭<__=__>Closable<__&__>镂空<__=__>Hollowed out<__&__>自定义无圆角<__=__>Custom without rounded corners<__&__>不同裁剪<__=__>Different cropping<__&__>点击可预览<__=__>Click to preview<__&__>失败时显示<__=__>Display when failed<__&__>自定义圆角<__=__>Custom rounded corners<__&__>设置颜色<__=__>Set color<__&__>垂直方向<__=__>Vertical direction<__&__>3秒后加载完成<__=__>Load completed after 3 seconds<__&__>隐藏为 00 的值<__=__>Hide the value of 00<__&__>指定天数<__=__>Specify the number of days<__&__>自定义模板<__=__>Custom template<__&__>指定小时<__=__>Specify the hour<__&__>指定分钟<__=__>Specify the minute<__&__>指定秒<__=__>Specify the second<__&__>完成后提示<__=__>Prompt after completion<__&__>3秒后开始倒计时<__=__>Start the countdown after 3 seconds<__&__>结合按钮<__=__>Combine with button<__&__>购买<__=__>Purchase<__&__>消息<__=__>Message<__&__>结合图片<__=__>Combine with picture<__&__>结合图标<__=__>Combine with icon<__&__>点击触发<__=__>Click to trigger<__&__>不同大小<__=__>Different sizes<__&__>不同颜色<__=__>Different colors<__&__>使用base64<__=__>Use base64<__&__>没有错误提示<__=__>No error prompt<__&__>体重<__=__>Weight<__&__>所在地区<__=__>Location<__&__>出生年月<__=__>Date of Birth<__&__>个人简介<__=__>Personal Introduction<__&__>请输入个人简介<__=__>Please enter your personal introduction<__&__>公开状态<__=__>Public Status<__&__>重置<__=__>Reset<__&__>提交<__=__>Submit<__&__>未知<__=__>Unknown<__&__>篮球<__=__>Basketball<__&__>足球<__=__>Football<__&__>羽毛球<__=__>Badminton<__&__>乒乓球<__=__>Table Tennis<__&__>游泳<__=__>Swimming<__&__>用户名不能为空<__=__>Username cannot be empty<__&__>用户名长度在3-20个字符之间<__=__>Username length should be between 3 and 20 characters<__&__>邮箱不能为空<__=__>Email cannot be empty<__&__>邮箱格式不正确<__=__>Invalid email format<__&__>身高不能为空<__=__>Height cannot be empty<__&__>身高在160-190cm之间<__=__>Height should be between 160 and 190 cm<__&__>显示星期<__=__>Show week<__&__>显示其他月份<__=__>Show other months<__&__>不同位置<__=__>Different positions<__&__>顶部<__=__>Top<__&__>中间<__=__>Middle<__&__>底部<__=__>Bottom<__&__>不同类型<__=__>Different types<__&__>成功<__=__>Success<__&__>失败<__=__>Failure<__&__>警告<__=__>Warning<__&__>问题<__=__>Problem<__&__>停止<__=__>Stop<__&__>自定义图标<__=__>Custom icon<__&__>只存在一个<__=__>Only one exists<__&__>不同位置提示<__=__>Different position tips<__&__>不同类型提示<__=__>Different type tips<__&__>带图标提示<__=__>Tips with icon<__&__>移除其他已存在的提示<__=__>Remove other existing tips<__&__>打开弹窗<__=__>Open pop-up window<__&__>设置宽度 80%<__=__>Set width 80%<__&__>充值1000元<__=__>Recharge 1000 yuan<__&__>完成首笔交易<__=__>Complete the first transaction<__&__>优选灵活配置混合A<__=__>Preferred Flexible Allocation Hybrid A<__&__>1000元起<__=__>Starting from 1000 yuan<__&__>禁用切换按钮<__=__>Disable the switch button<__&__>自定义高度<__=__>Customize height<__&__>多页数<__=__>Multiple pages<__&__>上一页<__=__>Previous page<__&__>下一页<__=__>Next page<__&__>横向滚动<__=__>Horizontal scroll<__&__>纵向滚动<__=__>Vertical scroll<__&__>快一点<__=__>Faster<__&__>暂停<__=__>Pause<__&__>内容靠左<__=__>Content aligned to the left<__&__>QQ<__=__>QQ<__&__>带箭头<__=__>With arrow<__&__>余额<__=__>Balance<__&__>带图片<__=__>With picture<__&__>神仙都没用<__=__>Even the gods are useless<__&__>折叠<__=__>Fold<__&__>插槽<__=__>Slot<__&__>使用 PT 自定义颜色<__=__>Use PT to customize color<__&__>自定义返回图标<__=__>Customize back icon<__&__>自定义返回路径<__=__>Customize back path<__&__>自定义标题内容<__=__>Customize title content<__&__>显示滑块<__=__>Show slider<__&__>添加间距<__=__>Add spacing<__&__>横向填充<__=__>Horizontal fill<__&__>适用于标签数量不多的情况<__=__>Suitable for cases with few labels<__&__>居中<__=__>Center<__&__>单个禁用<__=__>Single disable<__&__>显示下划线<__=__>Show underline<__&__>禁用<__=__>Disable<__&__>取消订单<__=__>Cancel order<__&__>立即购买<__=__>Buy now<__&__>确认收货<__=__>Confirm receipt of goods<__&__>评价<__=__>Evaluate<__&__>禁用状态，无法拖拽<__=__>Disabled state, cannot be dragged<__&__>不吸附边缘，任意位置可拖拽<__=__>Does not adhere to the edge, can be dragged anywhere<__&__>这是一个提示<__=__>This is a tip<__&__>标签格式化<__=__>Label formatting<__&__>固定开始、结束日期<__=__>Fixed start and end dates<__&__>自定义快捷选项<__=__>Custom quick options<__&__>只读<__=__>Read-only<__&__>显示分数<__=__>Show scores<__&__>允许半星<__=__>Allow half stars<__&__>换个图标<__=__>Change the icon<__&__>纵向排列<__=__>Vertical arrangement<__&__>换个样式<__=__>Change the style<__&__>不显示图标<__=__>Do not show the icon<__&__>其他样式<__=__>Other styles<__&__>数字键盘<__=__>Numeric keypad<__&__>打开键盘<__=__>Open the keyboard<__&__>是否显示输入值<__=__>Whether to display the input value<__&__>输入即绑定<__=__>Bind on input<__&__>身份证键盘<__=__>ID card keypad<__&__>密码键盘<__=__>Password keypad<__&__>是否加密<__=__>Whether to encrypt<__&__>车牌号键盘<__=__>License plate number keypad<__&__>数字输入<__=__>Numeric input<__&__>请输入验证码<__=__>Please enter the verification code<__&__>登录<__=__>Login<__&__>购物车 ({num})<__=__>Shopping Cart ({num})<__&__>完成<__=__>Complete<__&__>管理<__=__>Manage<__&__>删除<__=__>Delete<__&__>全选<__=__>Select All<__&__>合计<__=__>Total<__&__>去结算<__=__>Go to Checkout<__&__>温馨提示<__=__>Warm Prompt<__&__>确定删除该商品吗？<__=__>Are you sure to delete this product?<__&__>删除成功<__=__>Delete successfully<__&__>请先选择商品<__=__>Please select a product first<__&__>确定删除选中的商品吗？<__=__>Are you sure to delete the selected products?<__&__>您需支付 {price} 元，请确认支付<__=__>You need to pay {price} yuan. Please confirm the payment<__&__>支付成功<__=__>Payment successful<__&__>已设为默认<__=__>Set as default<__&__>设为默认<__=__>Set as default<__&__>修改<__=__>Modify<__&__>添加地址<__=__>Add address<__&__>Flex 弹性布局<__=__>Flex Elastic Layout<__&__>Tabs 标签页<__=__>Tabs<__&__>Collapse 折叠面板<__=__>Collapse Panel<__&__>Sticky 吸顶<__=__>Sticky<__&__>TopBar 导航栏<__=__>TopBar Navigation Bar<__&__>FloatView 悬浮视图<__=__>FloatView Floating View<__&__>Footer 底部视图<__=__>Footer Bottom View<__&__>List 列表<__=__>List<__&__>ListView 列表视图<__=__>ListView List View<__&__>ListViewRefresh 列表刷新<__=__>ListViewRefresh List Refresh<__&__>Waterfall 瀑布流<__=__>Waterfall Flow<__&__>Banner 轮播图<__=__>Banner Carousel<__&__>Marquee 跑马灯<__=__>Marquee Moving Light<__&__>Pagination 分页<__=__>Pagination<__&__>Timeline 时间轴<__=__>Timeline Time Axis<__&__>Avatar 头像<__=__>Avatar<__&__>ReadMore 查看更多<__=__>ReadMore View More<__&__>Draggable 拖拽<__=__>Draggable Drag<__&__>FilterBar 筛选栏<__=__>FilterBar Filter Bar<__&__>Tree 树形结构<__=__>Tree Tree Structure<__&__>获取某个单位的结束时间<__=__>Get the end time of a certain unit<__&__>是否同一天<__=__>Is it the same day<__&__>是否早于<__=__>Is it earlier than<__&__>是否晚于<__=__>Is it later than<__&__>差值<__=__>Difference<__&__>差值（单位）<__=__>Difference (unit)<__&__>选择图片<__=__>Select a picture<__&__>可调节裁剪框大小<__=__>Adjust the size of the cropping frame<__&__>预览图片<__=__>Preview the picture<__&__>保存图片<__=__>Save the picture<__&__>本页面内容由 canvas 渲染生成，是否立即预览图片效果？<__=__>The content of this page is rendered by canvas. Do you want to preview the picture effect immediately?<__&__>基础动画<__=__>Basic animation<__&__>淡入淡出<__=__>Fade in and out<__&__>播放动画<__=__>Play animation<__&__>滑入<__=__>Slide in<__&__>旋转翻转<__=__>Rotate and flip<__&__>摇摆抖动<__=__>Sway and shake<__&__>特殊效果<__=__>Special effects<__&__>组合动画<__=__>Combined animation<__&__>标题<__=__>Title<__&__>已阅读并同意<__=__>Read and agreed<__&__>用户协议<__=__>User Agreement<__&__>隐私政策<__=__>Privacy Policy<__&__>请先阅读并同意《用户协议》和《隐私政策》<__=__>Please read and agree to the User Agreement and Privacy Policy first<__&__>我的昵称<__=__>My Nickname<__&__>简介<__=__>Profile<__&__>介绍一下自己<__=__>Introduce yourself<__&__>性别<__=__>Gender<__&__>编辑性别<__=__>Edit Gender<__&__>生日<__=__>Birthday<__&__>选择生日<__=__>Select Birthday<__&__>地区<__=__>Region<__&__>选择所在的地区<__=__>Select your region<__&__>选择性别<__=__>Select Gender<__&__>保密<__=__>Confidential<__&__>男<__=__>Male<__&__>女<__=__>Female<__&__>性别设置成功<__=__>Gender settings successful<__&__>生日设置成功<__=__>Birthday settings successful<__&__>地区设置成功<__=__>Region settings successful<__&__>关于{name}<__=__>About {name}<__&__>联系客服<__=__>Contact customer service<__&__>退出登录<__=__>Log out<__&__>确定退出登录吗？<__=__>Are you sure you want to log out?<__&__>深色模式<__=__>Dark mode<__&__>多语言<__=__>Multi-language<__&__>字体大小<__=__>Font size<__&__>访问官网<__=__>Visit official website<__&__>商城<__=__>Mall<__&__>商品分类<__=__>Product category<__&__>商品详情<__=__>Product details<__&__>商品列表、筛选<__=__>Product list, filtering<__&__>购物车<__=__>Shopping cart<__&__>订单列表、详情<__=__>Order list, details<__&__>收货地址<__=__>Delivery address<__&__>聊天<__=__>Chat<__&__>对话列表、历史记录<__=__>Conversation list, history<__&__>流式回复<__=__>Streaming reply<__&__>语言合成<__=__>Text-to-Speech<__&__>语音识别<__=__>Speech recognition<__&__>Animation 动画<__=__>Animation Animation<__&__>编辑地址<__=__>Edit Address<__&__>cool-unix<__=__>cool-unix<__&__>首页<__=__>Home Page<__&__>我的<__=__>Mine<__&__>删除地址后无法恢复，确认要删除该地址吗？<__=__>The address cannot be restored after deletion. Are you sure you want to delete this address?<__&__>加载中<__=__>Loading<__&__>收货人<__=__>Consignee<__&__>请输入收货人姓名<__=__>Please enter the consignee's name<__&__>手机号<__=__>Mobile phone number<__&__>选择省市区<__=__>Select province, city and district<__&__>详细地址<__=__>Detailed address<__&__>小区楼栋、门牌号、村等<__=__>Residential building number, house number, village, etc.<__&__>默认地址<__=__>Default address<__&__>保存<__=__>Save<__&__>收货人不能为空<__=__>The consignee cannot be empty<__&__>手机号不能为空<__=__>The mobile phone number cannot be empty<__&__>手机号格式不正确<__=__>The mobile phone number format is incorrect<__&__>详细地址不能为空<__=__>The detailed address cannot be empty<__&__>所在地区不能为空<__=__>The location cannot be empty<__&__>保存中<__=__>Saving<__&__>开启通知<__=__>Enable notifications<__&__>通用设置<__=__>General settings<__&__>通知设置<__=__>Notification settings<__&__>隐私设置<__=__>Privacy settings<__&__>支付失败<__=__>Payment failed<__&__>授权信息仅用于用户登录<__=__>Authorization information is only used for user login<__&__>登录授权失败<__=__>Login authorization failed<__&__>获取短信验证码<__=__>Get SMS verification code<__&__>验证码<__=__>Verification code<__&__>发送短信<__=__>Send SMS<__&__>{n}s后重新获取<__=__>Re-get after {n}s<__&__>获取验证码<__=__>Get verification code<__&__>短信已发送，请查收<__=__>SMS has been sent, please check<__&__>请填写验证码<__=__>Please fill in the verification code<__&__>请填写正确的手机号格式<__=__>Please fill in the correct mobile phone number format<__&__>全局字号<__=__>Global font size<__&__>这是一段示例文字，用于预览不同字号的效果。<__=__>This is a sample text for previewing the effects of different font sizes.<__&__>默认 1.0<__=__>Default 1.0<__&__>切换语言<__=__>Switch language<__&__>切换中<__=__>Switching<__&__>模板<__=__>Template<__&__>编辑资料<__=__>Edit profile<__&__>Text 文本<__=__>Text<__&__>Button 按钮<__=__>Button<__&__>滑块大点<__=__>Slider larger<__&__>换个颜色<__=__>Change color<__&__>最大50<__=__>Maximum 50<__&__>自定义触发器<__=__>Custom trigger<__&__>打开选择器<__=__>Open selector<__&__>多列<__=__>Multiple columns<__&__>通过 children 配置多级数据，并使用 column-count 参数指定显示的列数<__=__>Configure multi-level data through children and use the column-count parameter to specify the number of columns to display<__&__>弹窗中使用<__=__>Use in pop-up window<__&__>打开<__=__>Open<__&__>选择地区<__=__>Select region<__&__>绑定值<__=__>Bind value<__&__>下一步<__=__>Next<__&__>确定<__=__>OK<__&__>关闭<__=__>Close<__&__>显示取消按钮<__=__>Show cancel button<__&__>修改按钮文案<__=__>Modify button text<__&__>显示绑定值<__=__>Show bound value<__&__>时<__=__>When<__&__>时:分<__=__>HH:MM<__&__>时:分:秒<__=__>HH:MM:SS<__&__>设置大小<__=__>Set Size<__&__>集成 iconfont 与 remixicon 图标库，展示部分示例<__=__>Integrate iconfont and remixicon icon libraries and display some examples<__&__>iconfont<__=__>iconfont<__&__>remixicon<__=__>remixicon<__&__>复制成功<__=__>Copy Success<__&__>普通<__=__>Normal<__&__>浅色<__=__>Light Color<__&__>深色<__=__>Dark Color<__&__>只显示图标<__=__>Only Show Icons<__&__>文本模式<__=__>Text Mode<__&__>带边框<__=__>With Border<__&__>圆角按钮<__=__>Rounded Button<__&__>带左侧图标<__=__>With Left Icon<__&__>小<__=__>Small<__&__>默认<__=__>Default<__&__>大<__=__>Large<__&__>无权限<__=__>No Permission<__&__>服务异常<__=__>Service Exception<__&__>请在微信浏览器中打开<__=__>Please Open in WeChat Browser<__&__>已取消支付<__=__>Payment Cancelled<__&__>微信<__=__>WeChat<__&__>父子关联<__=__>Father-son association<__&__>选中值<__=__>Selected value<__&__>选中操作<__=__>Selection operation<__&__>选中部分节点<__=__>Select some nodes<__&__>获取选中节点<__=__>Get selected nodes<__&__>获取半选节点<__=__>Get half-selected nodes<__&__>清空选中<__=__>Clear selection<__&__>展开操作<__=__>Expand operation<__&__>展开部分节点<__=__>Expand some nodes<__&__>获取展开节点<__=__>Get expanded nodes<__&__>展开所有<__=__>Expand all<__&__>收起所有<__=__>Collapse all<__&__>开通账号<__=__>Open an account<__&__>赠送500元<__=__>Give 500 yuan<__&__>完成实名认证<__=__>Complete real-name authentication<__&__>通过身份证认证<__=__>Pass ID card authentication<__&__>绑定银行卡<__=__>Bind a bank card<__&__>绑定招商银行储蓄卡<__=__>Bind China Merchants Bank savings card<__&__>首次充值<__=__>First recharge<__&__>日期选择器<__=__>Date Picker<__&__>时间选择器<__=__>Time Picker<__&__>级联选择器<__=__>Cascading Selector<__&__>文件上传<__=__>File Upload<__&__>日历<__=__>Calendar<__&__>布局组件<__=__>Layout Component<__&__>弹性布局<__=__>Flexible Layout<__&__>标签页<__=__>Tab<__&__>折叠面板<__=__>Collapsible Panel<__&__>吸顶<__=__>Sticky<__&__>导航栏<__=__>Navigation Bar<__&__>底部视图<__=__>Bottom View<__&__>悬浮视图<__=__>Floating View<__&__>数据展示<__=__>Data Display<__&__>查看更多<__=__>View More<__&__>列表<__=__>List<__&__>列表视图<__=__>ListView<__&__>列表刷新<__=__>List Refresh<__&__>瀑布流<__=__>Waterfall Flow<__&__>轮播图<__=__>Carousel<__&__>无头<__=__>Headless<__&__>左侧<__=__>Left<__&__>右侧<__=__>Right<__&__>隐藏取消按钮<__=__>Hide Cancel Button<__&__>自定义文本<__=__>Custom Text<__&__>关闭前钩子<__=__>Pre-Close Hook<__&__>显示时长<__=__>Display Duration<__&__>确定要删除吗？<__=__>Are you sure you want to delete?<__&__>确定要删除吗？3秒后自动关闭<__=__>Automatically close in 3 seconds after asking if you are sure you want to delete<__&__>带标题、描述<__=__>With title and description<__&__>无法点击遮罩关闭<__=__>Cannot close by clicking on the mask<__&__>不需要取消按钮<__=__>Do not need Cancel Button<__&__>插槽用法<__=__>Slot Usage<__&__>反馈<__=__>Feedback<__&__>删除好友会同时删除所有聊天记录<__=__>Deleting a friend will also delete all chat records<__&__>删除好友<__=__>Delete Friend<__&__>确定要删除好友吗？<__=__>Are you sure you want to delete the friend?<__&__>点我关闭<__=__>Click me to close<__&__>确定要关闭吗？<__=__>Are you sure you want to close?<__&__>支付宝<__=__>Alipay<__&__>Badge 角标<__=__>Badge Corner Mark<__&__>NoticeBar 通知栏<__=__>NoticeBar Notification Bar<__&__>Countdown 倒计时<__=__>Countdown Countdown Timer<__&__>Progress 进度条<__=__>Progress Progress Bar<__&__>ProgressCircle 圆形进度条<__=__>ProgressCircle Circular Progress Bar<__&__>Skeleton 骨架图<__=__>Skeleton Skeleton Diagram<__&__>LoadMore 加载更多<__=__>LoadMore Load More<__&__>RollingNumber 数字滚动<__=__>RollingNumber Digital Scroll<__&__>ActionSheet 操作菜单<__=__>ActionSheet Operation Menu<__&__>Popup 弹窗<__=__>Popup Pop-up Window<__&__>Confirm 确认框<__=__>Confirm Confirmation Box<__&__>Toast 提示框<__=__>Toast Toast Message<__&__>QRCode 二维码<__=__>QRCode QR Code<__&__>Sign 签名<__=__>Sign Signature<__&__>DayUts 日期<__=__>DayUts Date<__&__>Vibrate 震动<__=__>Vibrate Vibration<__&__>Cropper 图片裁剪<__=__>Cropper Image Cropper<__&__>Canvas 画布<__=__>Canvas Canvas<__&__>SVG 图标<__=__>SVG SVG Icon<__&__>SlideVerify 滑动验证<__=__>SlideVerify Slide Verification<__&__>体重不能为空<__=__>Weight cannot be empty<__&__>体重在40-100kg之间<__=__>Weight should be between 40 - 100 kg<__&__>标签不能为空<__=__>Label cannot be empty<__&__>标签最多选择2个<__=__>At most 2 labels can be selected<__&__>性别不能为空<__=__>Gender cannot be empty<__&__>出生年月不能为空<__=__>Date of birth cannot be empty<__&__>出生年月不大于2010-01-01<__=__>Date of birth should not be later than 2010-01-01<__&__>联系人不能为空<__=__>Contact person cannot be empty<__&__>提交成功<__=__>Submission successful<__&__>单个 true / false<__=__>Single true / false<__&__>带索引、地区选择<__=__>With index, area selection<__&__>换个分隔符<__=__>Change the delimiter<__&__>列表高度小一点<__=__>Make the list height smaller<__&__>范围选<__=__>Range selection<__&__>禁用部分日期<__=__>Disable some dates<__&__>日历长列表<__=__>Calendar long list<__&__>打开日历长列表<__=__>Open the calendar long list<__&__>日历面板<__=__>Calendar panel<__&__>自定义文案和颜色<__=__>Customize text and color<__&__>显示头<__=__>Show the header<__&__>头像上传成功<__=__>Profile picture uploaded successfully<__&__>编辑昵称<__=__>Edit nickname<__&__>请输入昵称<__=__>Please enter a nickname<__&__>请设置2-20个字符，不包括@<>/等无效字符<__=__>Please set 2-20 characters, excluding invalid characters such as @<>/<__&__>确认<__=__>Confirm<__&__>昵称长度需在2-20个字符之间<__=__>Nickname length should be between 2-20 characters<__&__>昵称不能包含@<>/等特殊字符<__=__>Nickname cannot contain special characters such as @<>/<__&__>编辑简介<__=__>Edit profile<__&__>简介不能为空<__=__>Profile cannot be empty<__&__>提示<__=__>Tip<__&__>为提供更好的服务，我们邀请您填写昵称、头像等公开信息<__=__>To provide better service, we invite you to fill in public information such as nickname and profile picture<__&__>头像<__=__>Profile picture<__&__>昵称<__=__>Nickname<__&__>点击输入昵称<__=__>Click to enter nickname<__&__>取消<__=__>Cancel<__&__>请上传头像<__=__>Please upload a profile picture<__&__>登录中<__=__>Logging in<__&__>手机登录<__=__>Mobile login<__&__>未注册的手机号登录成功后将自动注册<__=__>Unregistered mobile numbers will be automatically registered after successful login<__&__>请输入手机号<__=__>Please enter a mobile number<__&__>Image 图片<__=__>Image Picture<__&__>Icon 图标<__=__>Icon Icon<__&__>Tag 标签<__=__>Tag Tag<__&__>Form 表单验证<__=__>Form Form Validation<__&__>Input 输入框<__=__>Input Input Box<__&__>Textarea 文本域<__=__>Textarea Text Area<__&__>InputNumber 计数器<__=__>InputNumber Counter<__&__>InputOtp 口令输入<__=__>InputOtp Password Input<__&__>Keyboard 键盘<__=__>Keyboard Keyboard<__&__>Radio 单选框<__=__>Radio Radio Button<__&__>Checkbox 多选框<__=__>Checkbox Checkbox<__&__>Switch 开关<__=__>Switch Switch<__&__>Rate 评分<__=__>Rate Rating<__&__>Slider 滑块<__=__>Slider Slider<__&__>Select 选择器<__=__>Select Selector<__&__>SelectDate 日期选择器<__=__>SelectDate Date Selector<__&__>SelectTime 时间选择器<__=__>SelectTime Time Selector<__&__>Cascader 级联选择器<__=__>Cascader Cascading Selector<__&__>Upload 文件上传<__=__>Upload File Upload<__&__>Calendar 日历<__=__>Calendar Calendar<__&__>这是一段需要保护的内容<__=__>This is content that needs to be protected<__&__>水印会覆盖在内容上方，防止内容被盗用<__=__>Watermarks will be overlaid on the content to prevent unauthorized use<__&__>可自定义的水印内容区域<__=__>Customizable watermark content area<__&__>水印文本<__=__>Watermark Text<__&__>字体大小<__=__>Font Size<__&__>透明度<__=__>Opacity<__&__>旋转角度<__=__>Rotation Angle<__&__>水印宽度<__=__>Watermark Width<__&__>水印高度<__=__>Watermark Height<__&__>水平间距<__=__>Horizontal Spacing<__&__>垂直间距<__=__>Vertical Spacing<__&__>字体粗细<__=__>Font Weight<__&__>正常<__=__>Normal<__&__>加粗<__=__>Bold<__&__>多行文本水印<__=__>Multi-line Text Watermark<__&__>重要文档<__=__>Important Document<__&__>这是一份重要的文档内容，需要添加水印保护。<__=__>This is an important document that requires watermark protection.<__&__>水印可以防止内容被未授权的复制和传播。<__=__>Watermarks can prevent unauthorized copying and distribution of content.<__&__>图片保护<__=__>Image Protection"
    )
)
fun parse__1(kVal: UTSArray<UTSArray<String>>): UTSArray<UTSArray<String>> {
    val isCustom = kVal.length == 1 && kVal[0].length == 1
    if (!isCustom) {
        return kVal
    }
    return kVal[0][0].split("<__&__>").map(fun(e): UTSArray<String> {
        return e.split("<__=__>")
    }
    )
}
val messages: UTSJSONObject = object : UTSJSONObject() {
    var `zh-cn` = parse__1(`default`)
    var en = parse__1(default__1)
}
val locale = ref<String>("zh-cn")
val setLocale = fun(value: String){
    locale.value = value
    storage.set("locale", value, 0)
}
val t__1 = fun(name: String): String {
    var data = messages[locale.value] as UTSArray<UTSArray<String>>?
    if (data == null) {
        return name
    }
    var text = data.find(fun(e): Boolean {
        return e[0] == name
    }
    )?.get(1)
    if (text == null || text == "") {
        text = name
    }
    return text
}
val `$t__1` = fun(name: String, data: Any): String {
    var text = t__1(name)
    if (!isNull(data)) {
        forInObject(data, fun(reassignedValue, key){
            var value = reassignedValue
            if (UTSAndroid.`typeof`(value) === "number") {
                value = (value as Number).toString()
            }
            text = text.replaceAll("{" + key + "}", value as String)
        }
        )
    }
    return text
}
open class Store (
    @JsonNotNull
    open var user: User,
    @JsonNotNull
    open var dict: Dict,
) : UTSObject()
open class DictItem (
    @JsonNotNull
    open var id: Number,
    @JsonNotNull
    open var typeId: Number,
    @JsonNotNull
    open var label: String,
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var value: Any,
    @JsonNotNull
    open var orderNum: Number,
    open var parentId: Number? = null,
) : UTSObject()
open class RequestOptions__1 (
    @JsonNotNull
    open var url: String,
    open var method: RequestMethod? = null,
    open var data: Any? = null,
    open var params: Any? = null,
    open var header: Any? = null,
    open var timeout: Number? = null,
    open var withCredentials: Boolean? = null,
    open var firstIpv4: Boolean? = null,
    open var enableChunked: Boolean? = null,
) : UTSObject()
open class Token (
    @JsonNotNull
    open var token: String,
    @JsonNotNull
    open var expire: Number,
    @JsonNotNull
    open var refreshToken: String,
    @JsonNotNull
    open var refreshExpire: Number,
) : UTSObject()
var isStop: Boolean = false
fun useStore(): Store {
    return Store(user = user, dict = dict)
}
open class DictData (
    @JsonNotNull
    open var key: String,
    @JsonNotNull
    open var list: UTSArray<DictItem>,
) : UTSObject()
open class Dict {
    private var data: UTSArray<DictData> = reactive(_uA())
    constructor(){}
    open fun find(key: String): DictData? {
        return this.data.find(fun(e): Boolean {
            return e.key == key
        }
        )
    }
    open fun get(key: String): UTSArray<DictItem> {
        return this.find(key)?.list ?: UTSArray<DictItem>()
    }
    open fun getItem(key: String, value: Any): DictItem? {
        val item = this.get(key).find(fun(e): Boolean {
            return e.value == value
        }
        )
        if (isNull(item)) {
            return null
        }
        return item!!
    }
    open fun getItems(key: String, values: UTSArray<Any>): UTSArray<DictItem> {
        return values.map(fun(e): DictItem? {
            return this.getItem(key, e)
        }
        ).filter(fun(e): Boolean {
            return !isNull(e)
        }
        ) as UTSArray<DictItem>
    }
    open fun getItemLabel(key: String, value: Any): String {
        val item = this.getItem(key, value)
        if (isNull(item) || isNull(item?.label)) {
            return ""
        }
        return item!!.label
    }
    open fun refresh(types: UTSArray<String>?): UTSPromise<Unit> {
        return wrapUTSPromise(suspend w@{
                val res = await(request(RequestOptions__1(url = "/app/dict/info/data", method = "POST", data = _uO("types" to types))))
                if (res == null) {
                    return@w
                }
                forInObject(res, fun(arr, key){
                    var list: UTSArray<DictItem> = _uA()
                    (arr as UTSArray<UTSJSONObject>).forEach(fun(e){
                        e["label"] = e["name"]
                        val d = parse<DictItem>(e)
                        if (d != null) {
                            list.push(d)
                        }
                    }
                    )
                    val item = this.find(key)
                    if (isNull(item)) {
                        this.data.push(DictData(key = key, list = list))
                    } else {
                        item!!.list = list
                    }
                }
                )
        })
    }
}
val dict = Dict()
open class Response (
    open var code: Number? = null,
    open var msg: String? = null,
    open var data: Any? = null,
) : UTSObject()
open class LoginTokenResponse (
    @JsonNotNull
    open var token_type: String,
    @JsonNotNull
    open var access_token: String,
    @JsonNotNull
    open var expires_in: Number,
) : UTSObject()
val isIgnoreToken = fun(url: String): Boolean {
    return ignoreTokens.some(fun(e): Boolean {
        val pattern = e.replace(UTSRegExp("\\*", "g"), ".*")
        return UTSRegExp(pattern).test(url)
    }
    )
}
fun request(options: RequestOptions__1): UTSPromise<Any?> {
    var url = options.url
    var _options_method = options.method
    var method = if (_options_method == null) {
        "GET"
    } else {
        _options_method
    }
    var _options_data = options.data
    var data = if (_options_data == null) {
        UTSJSONObject()
    } else {
        _options_data
    }
    var _options_params = options.params
    var params = if (_options_params == null) {
        UTSJSONObject()
    } else {
        _options_params
    }
    var _options_header = options.header
    var header = if (_options_header == null) {
        UTSJSONObject()
    } else {
        _options_header
    }
    var _options_timeout = options.timeout
    var timeout = if (_options_timeout == null) {
        60000
    } else {
        _options_timeout
    }
    val user = useStore().user
    if (!url.startsWith("http")) {
        url = config__1.baseUrl + url
    }
    var Authorization: String? = user.token
    if (isIgnoreToken(url)) {
        Authorization = null
    }
    return UTSPromise(fun(resolve, reject){
        if (url.includes("?")) {
            url = url + "&locale=" + locale.value
        } else {
            url = url + "?locale=" + locale.value
        }
        val next = fun(){
            uni_request<Any>(RequestOptions(url = url, method = method, data = data, header = UTSJSONObject.assign(_uO("Authorization" to Authorization, "language" to locale.value, "x-era-platform" to config__1.platform, "x-route-tenant" to 0), (header as UTSJSONObject)), timeout = timeout, success = fun(res) {
                if (res.statusCode == 401) {
                    user.logout()
                } else if (res.statusCode == 502) {
                    reject(Response(msg = t__1("服务异常")))
                } else if (res.statusCode == 404) {
                    return reject(Response(msg = "[404] " + url))
                } else if (res.statusCode == 200) {
                    if (res.data == null) {
                        resolve(null)
                    } else if (!isObject(res.data as Any)) {
                        resolve(res.data)
                    } else {
                        val raw = res.data!!
                        val parsed: Response = parse<Response>(raw)!!
                        val code = parsed.code
                        val msg = parsed.msg
                        val data = parsed.data
                        when (code) {
                            200 -> 
                                resolve(data)
                            500 -> 
                                reject(_uO("msg" to msg, "code" to code))
                            401 -> 
                                {
                                    user.logout()
                                    reject(object : UTSJSONObject() {
                                        var msg = t__1("无权限")
                                    })
                                }
                            else -> 
                                if (options.url.includes("/oauth2/token")) {
                                    resolve(res.data)
                                } else {
                                    reject(_uO("msg" to msg, "code" to code))
                                }
                        }
                    }
                } else {
                    reject(object : UTSJSONObject() {
                        var msg = t__1("服务异常")
                    })
                }
            }
            , fail = fun(err) {
                reject(object : UTSJSONObject() {
                    var msg = err.errMsg
                })
            }
            ))
        }
        next()
    }
    )
}
var isConnected = false
var isConnecting = false
val notifyQueue = ref(_uA<Message>())
val notify_message = ref<String>("")
val notify_visible = ref<Boolean>(false)
val notify_enable = ref<Boolean>(true)
val unread_count = ref<Number>(0)
fun initNotifyEnable() {
    val saved = storage.get("notify_enable")
    if (saved == null) {
        notify_enable.value = true
    } else if (UTSAndroid.`typeof`(saved) === "boolean") {
        notify_enable.value = saved as Boolean
    } else if (UTSAndroid.`typeof`(saved) === "number") {
        notify_enable.value = saved as Number !== 0
    } else if (UTSAndroid.`typeof`(saved) === "string") {
        notify_enable.value = saved as String === "true" || saved as String === "1"
    } else {
        notify_enable.value = true
    }
}
val runBlock4 = run {
    initNotifyEnable()
}
fun disconnectMessage() {
    console.log("sse client disconnect=======")
    isStop = true
    isConnected = false
    isConnecting = false
}
open class User {
    open var info = ref<UserInfo?>(null)
    open var token: String? = null
    constructor(){
        val userInfo = storage.get("userInfo")
        val token = storage.get("token") as String?
        this.token = if (token == "") {
            null
        } else {
            token
        }
        if (userInfo != null && isObject(userInfo)) {
            this.set(userInfo)
        }
    }
    open fun get(): UTSPromise<Unit> {
        return wrapUTSPromise(suspend {
                if (this.token != null) {
                    await(request(RequestOptions__1(url = apiPath["current_user"] as String)).then(fun(res){
                        this.set(res)
                    }
                    ).`catch`(fun(){}))
                }
        })
    }
    open fun getSync() {
        if (this.token != null) {
            request(RequestOptions__1(url = apiPath["current_user"] as String)).then(fun(res){
                this.set(res)
            }
            ).`catch`(fun(){})
        }
    }
    open fun set(data: Any?) {
        if (data == null) {
            return
        }
        val user = parse<UserInfo>(data)
        if (user == null) {
            return
        }
        this.info.value = user
        storage.set("userInfo", user as Any, 0)
    }
    open fun remove() {
        this.info.value = null
        storage.remove("userInfo")
    }
    open fun isNull(): Boolean {
        return this.info.value == null
    }
    open fun isUnLogin(): Boolean {
        return user.info.value == null || user.token == null
    }
    open fun clear() {
        storage.remove("userInfo")
        storage.remove("token")
        storage.remove("refreshToken")
        this.token = null
        this.remove()
    }
    open fun logout() {
        this.clear()
        router.login()
        disconnectMessage()
    }
    open fun setToken(data: Token) {
        this.token = data.token
        storage.set("token", data.token, data.expire - 5)
        storage.set("refreshToken", data.refreshToken, data.refreshExpire - 5)
    }
}
val user = User()
val userInfo = computed(fun(): UserInfo? {
    return user.info.value
}
)
fun connectMessage(): UTSPromise<Unit> {
    return wrapUTSPromise(suspend w@{
            console.log("sse connect start")
            if (isConnected || isConnecting) {
                console.log("sse connect is connecting")
                return@w
            }
            isStop = false
            isConnecting = true
            fun poll() {
                if (isStop) {
                    return
                }
                try {
                    val now = Date.now()
                    request(RequestOptions__1(url = apiPath["message_page"] as String, method = "POST", data = object : UTSJSONObject() {
                        var page: Number = 1
                        var pageSize: Number = 10
                        var accId = userInfo.value?.id
                        var platform = config__1.platform
                        var createdTimeStart = formatDateTime(now - 3000)
                        var createdTimeEnd = formatDateTime(now)
                    })).then(fun(res){
                        if (res != null) {
                            val r = parseData<UTSArray<Message>>(res)
                            if (r == null) {
                                return
                            }
                            r.forEach(fun(msg: Message){
                                return pushNotifyQueue(msg)
                            }
                            )
                        }
                    }
                    ).`catch`(fun(err){
                        console.error(err)
                    }
                    )
                    request(RequestOptions__1(url = apiPath["message_unread_count"] as String, method = "GET")).then(fun(res){
                        if (res != null) {
                            unread_count.value = res as Number
                        }
                    }
                    ).`catch`(fun(err){
                        console.error(err)
                    }
                    )
                }
                 catch (err: Throwable) {
                    console.warn("poll error", err)
                }
                 finally {
                    setTimeout(fun(){
                        poll()
                    }
                    , 3000)
                }
            }
            poll()
    })
}
fun formatDateTime(ts: Number): String {
    val d = Date(ts)
    val p = fun(n: Number): String {
        return if (n < 10) {
            "0" + n
        } else {
            "" + n
        }
    }
    return "" + d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds())
}
fun pushNotifyQueue(msg: Message) {
    notifyQueue.value.push(msg)
    if (notifyQueue.value.length > 10) {
        notifyQueue.value.shift()
    }
}
fun onNotify() {
    if (notifyQueue.value.length <= 0) {
        notify_visible.value = false
    } else {
        val msg = notifyQueue.value.shift()
        if (msg == null) {
            return
        }
        notify_visible.value = notify_enable.value ?: true
        if (isDev) {
            console.log(JSON.stringify(msg) + "-" + notify_visible.value + "-" + notify_enable.value)
        }
        notify_message.value = msg.context
    }
}
val runBlock5 = run {
    setInterval(fun(){
        onNotify()
    }
    , 8000)
}
fun changeNotify(kVal: Boolean) {
    storage.set("notify_enable", kVal, 0)
    notify_enable.value = kVal
}
open class GenApp : BaseApp {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onLaunch(fun(_: OnLaunchOptions) {
            console.log("App Launch")
            if (router.isLoginPage(router.path())) {
                return
            }
            val user = useStore().user
            if (user.isUnLogin()) {
                console.log("未登陆")
                user.logout()
                return
            }
            connectMessage()
        }
        , __ins)
        onAppShow(fun(_: OnShowOptions) {
            console.log("App Show")
            if (router.isLoginPage(router.path())) {
                return
            }
            val user = useStore().user
            if (user.isUnLogin()) {
                console.log("未登陆")
                user.logout()
                return
            }
            user.get()
            connectMessage()
        }
        , __ins)
        onAppHide(fun() {
            disconnectMessage()
        }
        , __ins)
        onExit(fun() {
            disconnectMessage()
        }
        , __ins)
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0,
                styles1,
                styles2
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("width" to "100%")), "pointer-events-none" to _pS(_uM("pointerEvents" to "none")), "fixed" to _pS(_uM("position" to "fixed")), "absolute" to _pS(_uM("position" to "absolute")), "relative" to _pS(_uM("position" to "relative")), "-important-right-1" to _pS(_uM("!right" to "7rpx")), "-important-right-6" to _pS(_uM("!right" to "42rpx")), "-important-top-1" to _pS(_uM("!top" to "7rpx")), "bottom-0" to _pS(_uM("bottom" to 0)), "bottom-2" to _pS(_uM("bottom" to "14rpx")), "bottom-3" to _pS(_uM("bottom" to "21rpx")), "bottom--bracket-start-2px-bracket-end-" to _pS(_uM("bottom" to 2)), "left-0" to _pS(_uM("left" to 0)), "left-1" to _pS(_uM("left" to "7rpx")), "left-1-slash-3" to _pS(_uM("left" to "33.333333%")), "left-2-slash-3" to _pS(_uM("left" to "66.666667%")), "right-0" to _pS(_uM("right" to 0)), "right-2" to _pS(_uM("right" to "14rpx")), "right-6" to _pS(_uM("right" to "42rpx")), "right-8" to _pS(_uM("right" to "56rpx")), "right--bracket-start--6rpx-bracket-end-" to _pS(_uM("right" to "-6rpx")), "right--bracket-start-24rpx-bracket-end-" to _pS(_uM("right" to "24rpx")), "top-0" to _pS(_uM("top" to 0)), "top-1" to _pS(_uM("top" to "7rpx")), "top-1-slash-2" to _pS(_uM("top" to "50%")), "top-1-slash-3" to _pS(_uM("top" to "33.333333%")), "top-2" to _pS(_uM("top" to "14rpx")), "top-2-slash-3" to _pS(_uM("top" to "66.666667%")), "top-6" to _pS(_uM("top" to "42rpx")), "top--bracket-start-2px-bracket-end-" to _pS(_uM("top" to 2)), "-important-z-50" to _pS(_uM("!zIndex" to 50)), "z-10" to _pS(_uM("zIndex" to 10)), "z-20" to _pS(_uM("zIndex" to 20)), "z-50" to _pS(_uM("zIndex" to 50)), "m-1" to _pS(_uM("marginTop" to "7rpx", "marginRight" to "7rpx", "marginBottom" to "7rpx", "marginLeft" to "7rpx")), "m-2" to _pS(_uM("marginTop" to "14rpx", "marginRight" to "14rpx", "marginBottom" to "14rpx", "marginLeft" to "14rpx")), "m-4" to _pS(_uM("marginTop" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "marginLeft" to "28rpx")), "mx-1" to _pS(_uM("marginLeft" to "7rpx", "marginRight" to "7rpx")), "mx-2" to _pS(_uM("marginLeft" to "14rpx", "marginRight" to "14rpx")), "mx-3" to _pS(_uM("marginLeft" to "21rpx", "marginRight" to "21rpx")), "mb-1" to _pS(_uM("marginBottom" to "7rpx")), "mb-2" to _uM("" to _uM("marginBottom" to "14rpx"), ".5" to _uM("marginBottom" to "17.5rpx")), "mb-3" to _pS(_uM("marginBottom" to "21rpx")), "mb-4" to _pS(_uM("marginBottom" to "28rpx")), "mb-5" to _pS(_uM("marginBottom" to "35rpx")), "mb-8" to _pS(_uM("marginBottom" to "56rpx")), "ml-1" to _pS(_uM("marginLeft" to "7rpx")), "ml-2" to _pS(_uM("marginLeft" to "14rpx")), "ml-3" to _pS(_uM("marginLeft" to "21rpx")), "ml-4" to _pS(_uM("marginLeft" to "28rpx")), "ml-5" to _pS(_uM("marginLeft" to "35rpx")), "ml-6" to _pS(_uM("marginLeft" to "42rpx")), "ml--bracket-start--4rpx-bracket-end-" to _pS(_uM("marginLeft" to "-4rpx")), "mr-1" to _pS(_uM("marginRight" to "7rpx")), "mr-10" to _pS(_uM("marginRight" to "70rpx")), "mr-2" to _pS(_uM("marginRight" to "14rpx")), "mr-24" to _pS(_uM("marginRight" to "168rpx")), "mr-3" to _pS(_uM("marginRight" to "21rpx")), "mr-32" to _pS(_uM("marginRight" to "224rpx")), "mr-4" to _pS(_uM("marginRight" to "28rpx")), "mr-6" to _pS(_uM("marginRight" to "42rpx")), "mr-8" to _pS(_uM("marginRight" to "56rpx")), "mr--bracket-start--4rpx-bracket-end-" to _pS(_uM("marginRight" to "-4rpx")), "mr--bracket-start-10rpx-bracket-end-" to _pS(_uM("marginRight" to "10rpx")), "mr--bracket-start-8rpx-bracket-end-" to _pS(_uM("marginRight" to "8rpx")), "mr-auto" to _pS(_uM("marginRight" to "auto")), "mt-1" to _pS(_uM("marginTop" to "7rpx")), "mt-2" to _pS(_uM("marginTop" to "14rpx")), "mt-3" to _pS(_uM("marginTop" to "21rpx")), "mt-4" to _pS(_uM("marginTop" to "28rpx")), "mt-5" to _pS(_uM("marginTop" to "35rpx")), "box-border" to _pS(_uM("boxSizing" to "border-box")), "flex" to _pS(_uM("display" to "flex")), "hidden" to _pS(_uM("display" to "none")), "-important-h--bracket-start-600rpx-bracket-end-" to _pS(_uM("!height" to "600rpx")), "-important-h--bracket-start-90rpx-bracket-end-" to _pS(_uM("!height" to "90rpx")), "-important-h-full" to _pS(_uM("!height" to "100%")), "h-1-slash-2" to _pS(_uM("height" to "50%")), "h-12" to _pS(_uM("height" to "84rpx")), "h-14" to _pS(_uM("height" to "98rpx")), "h-16" to _pS(_uM("height" to "112rpx")), "h-2" to _pS(_uM("height" to "14rpx")), "h-3" to _pS(_uM("height" to "21rpx")), "h-4" to _pS(_uM("height" to "28rpx")), "h-8" to _pS(_uM("height" to "56rpx")), "h--bracket-start-160rpx-bracket-end-" to _pS(_uM("height" to "160rpx")), "h--bracket-start-60px-bracket-end-" to _pS(_uM("height" to 60)), "h--bracket-start-72rpx-bracket-end-" to _pS(_uM("height" to "72rpx")), "h--bracket-start-80rpx-bracket-end-" to _pS(_uM("height" to "80rpx")), "h-full" to _pS(_uM("height" to "100%")), "w-1-slash-2" to _pS(_uM("width" to "50%")), "w-1-slash-5" to _pS(_uM("width" to "20%")), "w-12" to _pS(_uM("width" to "84rpx")), "w-2" to _pS(_uM("width" to "14rpx")), "w-24" to _pS(_uM("width" to "168rpx")), "w-3" to _pS(_uM("width" to "21rpx")), "w-4" to _pS(_uM("width" to "28rpx")), "w-4-slash-5" to _pS(_uM("width" to "80%")), "w-5" to _pS(_uM("width" to "35rpx")), "w-6" to _pS(_uM("width" to "42rpx")))
            }
        val styles1: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("w-8" to _pS(_uM("width" to "56rpx")), "w--bracket-start-100rpx-bracket-end-" to _pS(_uM("width" to "100rpx")), "w--bracket-start-120rpx-bracket-end-" to _pS(_uM("width" to "120rpx")), "w-full" to _pS(_uM("width" to "100%")), "flex-1" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "flex-none" to _pS(_uM("flexGrow" to 0, "flexShrink" to 0, "flexBasis" to "auto")), "flex-shrink" to _pS(_uM("flexShrink" to 1)), "rotate-90" to _pS(_uM("transform" to "rotate(90deg)")), "transform" to _pS(_uM("transform" to "none")), "resize" to _pS(_uM("resize" to "both")), "flex-row" to _pS(_uM("flexDirection" to "row")), "flex-col" to _pS(_uM("flexDirection" to "column")), "flex-wrap" to _pS(_uM("flexWrap" to "wrap")), "items-start" to _pS(_uM("alignItems" to "flex-start")), "items-end" to _pS(_uM("alignItems" to "flex-end")), "items-center" to _pS(_uM("alignItems" to "center")), "justify-start" to _pS(_uM("justifyContent" to "flex-start")), "justify-end" to _pS(_uM("justifyContent" to "flex-end")), "justify-center" to _pS(_uM("justifyContent" to "center")), "justify-between" to _pS(_uM("justifyContent" to "space-between")), "overflow-hidden" to _pS(_uM("overflow" to "hidden")), "overflow-visible" to _pS(_uM("overflow" to "visible")), "overflow-y-auto" to _pS(_uM("overflowY" to "auto")), "whitespace-nowrap" to _pS(_uM("whiteSpace" to "nowrap")), "whitespace-pre-wrap" to _pS(_uM("whiteSpace" to "pre-wrap")), "-important-rounded-3xl" to _pS(_uM("!borderTopLeftRadius" to "42rpx", "!borderTopRightRadius" to "42rpx", "!borderBottomRightRadius" to "42rpx", "!borderBottomLeftRadius" to "42rpx")), "-important-rounded--bracket-start-60rpx-bracket-end-" to _pS(_uM("!borderTopLeftRadius" to "60rpx", "!borderTopRightRadius" to "60rpx", "!borderBottomRightRadius" to "60rpx", "!borderBottomLeftRadius" to "60rpx")), "-important-rounded-full" to _pS(_uM("!borderTopLeftRadius" to 9999, "!borderTopRightRadius" to 9999, "!borderBottomRightRadius" to 9999, "!borderBottomLeftRadius" to 9999)), "-important-rounded-xl" to _pS(_uM("!borderTopLeftRadius" to "21rpx", "!borderTopRightRadius" to "21rpx", "!borderBottomRightRadius" to "21rpx", "!borderBottomLeftRadius" to "21rpx")), "rounded" to _pS(_uM("borderTopLeftRadius" to "7rpx", "borderTopRightRadius" to "7rpx", "borderBottomRightRadius" to "7rpx", "borderBottomLeftRadius" to "7rpx")), "rounded-2xl" to _pS(_uM("borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx")), "rounded-3xl" to _pS(_uM("borderTopLeftRadius" to "42rpx", "borderTopRightRadius" to "42rpx", "borderBottomRightRadius" to "42rpx", "borderBottomLeftRadius" to "42rpx")), "rounded-full" to _pS(_uM("borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999)), "rounded-lg" to _pS(_uM("borderTopLeftRadius" to "14rpx", "borderTopRightRadius" to "14rpx", "borderBottomRightRadius" to "14rpx", "borderBottomLeftRadius" to "14rpx")), "rounded-md" to _pS(_uM("borderTopLeftRadius" to "10.5rpx", "borderTopRightRadius" to "10.5rpx", "borderBottomRightRadius" to "10.5rpx", "borderBottomLeftRadius" to "10.5rpx")), "rounded-sm" to _pS(_uM("borderTopLeftRadius" to "3.5rpx", "borderTopRightRadius" to "3.5rpx", "borderBottomRightRadius" to "3.5rpx", "borderBottomLeftRadius" to "3.5rpx")), "rounded-xl" to _pS(_uM("borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx")), "border" to _pS(_uM("borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1)), "border-b" to _pS(_uM("borderBottomWidth" to 1)), "border-solid" to _pS(_uM("borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid")), "border-gray-100" to _pS(_uM("borderTopColor" to "rgba(243,244,246,1)", "borderRightColor" to "rgba(243,244,246,1)", "borderBottomColor" to "rgba(243,244,246,1)", "borderLeftColor" to "rgba(243,244,246,1)")), "border-gray-200" to _pS(_uM("borderTopColor" to "rgba(229,231,235,1)", "borderRightColor" to "rgba(229,231,235,1)", "borderBottomColor" to "rgba(229,231,235,1)", "borderLeftColor" to "rgba(229,231,235,1)")), "border-primary-500" to _pS(_uM("borderTopColor" to "rgba(20,184,166,1)", "borderRightColor" to "rgba(20,184,166,1)", "borderBottomColor" to "rgba(20,184,166,1)", "borderLeftColor" to "rgba(20,184,166,1)")), "border-surface-200" to _pS(_uM("borderTopColor" to "rgba(228,228,231,1)", "borderRightColor" to "rgba(228,228,231,1)", "borderBottomColor" to "rgba(228,228,231,1)", "borderLeftColor" to "rgba(228,228,231,1)")), "border-surface-500" to _pS(_uM("borderTopColor" to "rgba(113,113,122,1)", "borderRightColor" to "rgba(113,113,122,1)", "borderBottomColor" to "rgba(113,113,122,1)", "borderLeftColor" to "rgba(113,113,122,1)")), "border-surface-600" to _pS(_uM("borderTopColor" to "rgba(82,82,91,1)", "borderRightColor" to "rgba(82,82,91,1)", "borderBottomColor" to "rgba(82,82,91,1)", "borderLeftColor" to "rgba(82,82,91,1)")), "border-surface-700" to _pS(_uM("borderTopColor" to "rgba(63,63,70,1)", "borderRightColor" to "rgba(63,63,70,1)", "borderBottomColor" to "rgba(63,63,70,1)", "borderLeftColor" to "rgba(63,63,70,1)")), "border-transparent" to _pS(_uM("borderTopColor" to "rgba(0,0,0,0)", "borderRightColor" to "rgba(0,0,0,0)", "borderBottomColor" to "rgba(0,0,0,0)", "borderLeftColor" to "rgba(0,0,0,0)")), "border-white" to _pS(_uM("borderTopColor" to "rgba(255,255,255,1)", "borderRightColor" to "rgba(255,255,255,1)", "borderBottomColor" to "rgba(255,255,255,1)", "borderLeftColor" to "rgba(255,255,255,1)")), "-important-border-r-transparent" to _pS(_uM("!borderRightColor" to "rgba(0,0,0,0)")), "border-b-transparent" to _pS(_uM("borderBottomColor" to "rgba(0,0,0,0)")), "border-l-transparent" to _pS(_uM("borderLeftColor" to "rgba(0,0,0,0)")), "-important-bg-primary-600" to _pS(_uM("!backgroundColor" to "rgba(13,148,136,1)")), "-important-bg-surface-100" to _pS(_uM("!backgroundColor" to "rgba(244,244,245,1)")), "-important-bg-surface-200" to _pS(_uM("!backgroundColor" to "rgba(228,228,231,1)")), "-important-bg-surface-400" to _pS(_uM("!backgroundColor" to "rgba(161,161,170,1)")), "-important-bg-surface-50" to _pS(_uM("!backgroundColor" to "rgba(250,250,250,1)")), "-important-bg-surface-700" to _pS(_uM("!backgroundColor" to "rgba(63,63,70,1)")), "-important-bg-surface-800" to _pS(_uM("!backgroundColor" to "rgba(39,39,42,1)")), "-important-bg-surface-900" to _pS(_uM("!backgroundColor" to "rgba(24,24,27,1)")), "-important-bg-transparent" to _pS(_uM("!backgroundColor" to "rgba(0,0,0,0)")), "-important-bg-white" to _pS(_uM("!backgroundColor" to "rgba(255,255,255,1)")), "bg-black" to _pS(_uM("backgroundColor" to "rgba(0,0,0,1)")), "bg-blue-500" to _pS(_uM("backgroundColor" to "rgba(59,130,246,1)")), "bg-green-500" to _pS(_uM("backgroundColor" to "rgba(34,197,94,1)")), "bg-primary-50" to _pS(_uM("backgroundColor" to "rgba(240,253,250,1)")), "bg-primary-500" to _pS(_uM("backgroundColor" to "rgba(20,184,166,1)")), "bg-red-500" to _pS(_uM("backgroundColor" to "rgba(239,68,68,1)")), "bg-surface-100" to _pS(_uM("backgroundColor" to "rgba(244,244,245,1)")), "bg-surface-200" to _pS(_uM("backgroundColor" to "rgba(228,228,231,1)")), "bg-surface-300" to _pS(_uM("backgroundColor" to "rgba(212,212,216,1)")), "bg-surface-50" to _pS(_uM("backgroundColor" to "rgba(250,250,250,1)")), "bg-surface-500" to _pS(_uM("backgroundColor" to "rgba(113,113,122,1)")), "bg-surface-600" to _pS(_uM("backgroundColor" to "rgba(82,82,91,1)")), "bg-surface-800" to _pS(_uM("backgroundColor" to "rgba(39,39,42,1)")), "bg-transparent" to _pS(_uM("backgroundColor" to "rgba(0,0,0,0)")), "bg-white" to _pS(_uM("backgroundColor" to "rgba(255,255,255,1)")), "bg-yellow-500" to _pS(_uM("backgroundColor" to "rgba(234,179,8,1)")), "-important-p-0" to _pS(_uM("!paddingTop" to 0, "!paddingRight" to 0, "!paddingBottom" to 0, "!paddingLeft" to 0)), "p-0" to _pS(_uM("paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0)), "p-1" to _pS(_uM("paddingTop" to "7rpx", "paddingRight" to "7rpx", "paddingBottom" to "7rpx", "paddingLeft" to "7rpx")), "p-10" to _pS(_uM("paddingTop" to "70rpx", "paddingRight" to "70rpx", "paddingBottom" to "70rpx", "paddingLeft" to "70rpx")), "p-14" to _pS(_uM("paddingTop" to "98rpx", "paddingRight" to "98rpx", "paddingBottom" to "98rpx", "paddingLeft" to "98rpx")), "p-2" to _pS(_uM("paddingTop" to "14rpx", "paddingRight" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "14rpx")), "p-3" to _pS(_uM("paddingTop" to "21rpx", "paddingRight" to "21rpx", "paddingBottom" to "21rpx", "paddingLeft" to "21rpx")), "p-4" to _pS(_uM("paddingTop" to "28rpx", "paddingRight" to "28rpx", "paddingBottom" to "28rpx", "paddingLeft" to "28rpx")), "p--bracket-start-24rpx-bracket-end-" to _pS(_uM("paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "-important-px-4" to _pS(_uM("!paddingLeft" to "28rpx", "!paddingRight" to "28rpx")), "px-10" to _pS(_uM("paddingLeft" to "70rpx", "paddingRight" to "70rpx")), "px-2" to _uM("" to _uM("paddingLeft" to "14rpx", "paddingRight" to "14rpx"), ".5" to _uM("paddingLeft" to "17.5rpx", "paddingRight" to "17.5rpx")), "px-3" to _pS(_uM("paddingLeft" to "21rpx", "paddingRight" to "21rpx")), "px-4" to _pS(_uM("paddingLeft" to "28rpx", "paddingRight" to "28rpx")), "px--bracket-start-10rpx-bracket-end-" to _pS(_uM("paddingLeft" to "10rpx", "paddingRight" to "10rpx")), "px--bracket-start-20rpx-bracket-end-" to _pS(_uM("paddingLeft" to "20rpx", "paddingRight" to "20rpx")), "px--bracket-start-32rpx-bracket-end-" to _pS(_uM("paddingLeft" to "32rpx", "paddingRight" to "32rpx")), "py-1" to _pS(_uM("paddingTop" to "7rpx", "paddingBottom" to "7rpx")), "py-10" to _pS(_uM("paddingTop" to "70rpx", "paddingBottom" to "70rpx")), "py-2" to _pS(_uM("paddingTop" to "14rpx", "paddingBottom" to "14rpx")), "py-20" to _pS(_uM("paddingTop" to "140rpx", "paddingBottom" to "140rpx")), "py-3" to _pS(_uM("paddingTop" to "21rpx", "paddingBottom" to "21rpx")))
            }
        val styles2: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("py-5" to _pS(_uM("paddingTop" to "35rpx", "paddingBottom" to "35rpx")), "py--bracket-start-24rpx-bracket-end-" to _pS(_uM("paddingTop" to "24rpx", "paddingBottom" to "24rpx")), "-important-pl-0" to _pS(_uM("!paddingLeft" to 0)), "pb-2" to _pS(_uM("paddingBottom" to "14rpx")), "pb-3" to _pS(_uM("paddingBottom" to "21rpx")), "pl-2" to _pS(_uM("paddingLeft" to "14rpx")), "pr-2" to _pS(_uM("paddingRight" to "14rpx")), "pr--bracket-start-12rpx-bracket-end-" to _pS(_uM("paddingRight" to "12rpx")), "pt-0" to _pS(_uM("paddingTop" to 0)), "pt-16" to _pS(_uM("paddingTop" to "112rpx")), "pt-2" to _pS(_uM("paddingTop" to "14rpx")), "pt-24" to _pS(_uM("paddingTop" to "168rpx")), "pt-6" to _pS(_uM("paddingTop" to "42rpx")), "text-center" to _pS(_uM("textAlign" to "center")), "-important-text-2xl" to _pS(_uM("!fontSize" to "42rpx", "!lineHeight" to "56rpx")), "-important-text-base" to _pS(_uM("!fontSize" to "28rpx", "!lineHeight" to "42rpx")), "-important-text-lg" to _pS(_uM("!fontSize" to "31.5rpx", "!lineHeight" to "49rpx")), "-important-text-xl" to _pS(_uM("!fontSize" to "35rpx", "!lineHeight" to "49rpx")), "-important-text-xs" to _pS(_uM("!fontSize" to "21rpx", "!lineHeight" to "28rpx")), "text-2xl" to _pS(_uM("fontSize" to "42rpx", "lineHeight" to "56rpx")), "text-base" to _pS(_uM("fontSize" to "28rpx", "lineHeight" to "42rpx")), "text-lg" to _pS(_uM("fontSize" to "31.5rpx", "lineHeight" to "49rpx")), "text-md" to _pS(_uM("fontSize" to "28rpx", "lineHeight" to "42rpx")), "text-sm" to _pS(_uM("fontSize" to "24.5rpx", "lineHeight" to "35rpx")), "text-xl" to _pS(_uM("fontSize" to "35rpx", "lineHeight" to "49rpx")), "text-xs" to _pS(_uM("fontSize" to "21rpx", "lineHeight" to "28rpx")), "-important-font-bold" to _pS(_uM("!fontWeight" to "700")), "font-bold" to _pS(_uM("fontWeight" to "700")), "font-normal" to _pS(_uM("fontWeight" to "400")), "leading-relaxed" to _pS(_uM("lineHeight" to 1.625)), "-important-text-surface-300" to _pS(_uM("!color" to "rgba(212,212,216,1)")), "-important-text-surface-400" to _pS(_uM("!color" to "rgba(161,161,170,1)")), "-important-text-surface-50" to _pS(_uM("!color" to "rgba(250,250,250,1)")), "text-gray-300" to _pS(_uM("color" to "rgba(209,213,219,1)")), "text-gray-400" to _pS(_uM("color" to "rgba(156,163,175,1)")), "text-gray-500" to _pS(_uM("color" to "rgba(107,114,128,1)")), "text-gray-600" to _pS(_uM("color" to "rgba(75,85,99,1)")), "text-primary-500" to _pS(_uM("color" to "rgba(20,184,166,1)")), "text-red-500" to _pS(_uM("color" to "rgba(239,68,68,1)")), "text-surface-100" to _pS(_uM("color" to "rgba(244,244,245,1)")), "text-surface-400" to _pS(_uM("color" to "rgba(161,161,170,1)")), "text-surface-50" to _pS(_uM("color" to "rgba(250,250,250,1)")), "text-surface-500" to _pS(_uM("color" to "rgba(113,113,122,1)")), "text-surface-900" to _pS(_uM("color" to "rgba(24,24,27,1)")), "text-white" to _pS(_uM("color" to "rgba(255,255,255,1)")), "opacity-0" to _pS(_uM("opacity" to 0)), "opacity-30" to _pS(_uM("opacity" to 0.3)), "opacity-50" to _pS(_uM("opacity" to 0.5)), "opacity-80" to _pS(_uM("opacity" to 0.8)), "shadow" to _pS(_uM("boxShadow" to "rgba(0, 0, 0, 0.1)")), "shadow-lg" to _pS(_uM("boxShadow" to "rgba(0, 0, 0, 0.1)")), "shadow-xl" to _pS(_uM("boxShadow" to "rgba(0, 0, 0, 0.1)")), "transition-none" to _pS(_uM("transitionProperty" to "none")), "duration-200" to _pS(_uM("transitionDuration" to "200ms")), "safe-area-top" to _pS(_uM("marginTop" to "env(safe-area-inset-top)")), "uni-tabbar__icon" to _uM(".uni-tabbar " to _uM("marginTop" to 0)), "uni-toast" to _pS(_uM("borderTopLeftRadius" to "32rpx", "borderTopRightRadius" to "32rpx", "borderBottomRightRadius" to "32rpx", "borderBottomLeftRadius" to "32rpx", "!backgroundColor" to "rgba(0,0,0,0.8)")), "dark-colon--important-border-surface-700" to _pS(_uM("!borderTopColor" to "rgba(63,63,70,1)", "!borderRightColor" to "rgba(63,63,70,1)", "!borderBottomColor" to "rgba(63,63,70,1)", "!borderLeftColor" to "rgba(63,63,70,1)")), "dark-colon--important-bg-surface-700" to _pS(_uM("!backgroundColor" to "rgba(63,63,70,1)")), "dark-colon--important-bg-surface-800" to _pS(_uM("!backgroundColor" to "rgba(39,39,42,1)")), "dark-colon--important-text-white" to _pS(_uM("!color" to "rgba(255,255,255,1)")), "@FONT-FACE" to _uM("0" to _uM("fontFamily" to "iconfont", "src" to "url(\"data:font/ttf;base64,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IGJ5IHN2ZzJ0dGYgZnJvbSBGb250ZWxsbyBwcm9qZWN0Lmh0dHA6Ly9mb250ZWxsby5jb20AQwByAGUAYQB0AGUAZAAgAGIAeQAgAGkAYwBvAG4AZgBvAG4AdABjAGwALQBpAGMAbwBuAGYAbwBuAHQAUgBlAGcAdQBsAGEAcgBjAGwALQBpAGMAbwBuAGYAbwBuAHQAYwBsAC0AaQBjAG8AbgBmAG8AbgB0AFYAZQByAHMAaQBvAG4AIAAxAC4AMABjAGwALQBpAGMAbwBuAGYAbwBuAHQARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIBAgEDAQQBBQEGAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMBFAEVARYBFwEYARkBGgEbARwBHQEeAR8BIAEhASIBIwAEYmFjawN5dWUId2FuY2hlbmcGc2hpYmFpBmJvZmFuZwdwaW5nbHVuB2h1YXRvbmcHZGlhbnphbgRmdWxpB2ppdWRpYW4GdHVwaWFuB2Rpbmd3ZWkDdmlwB3l1bmR1YW4IbmFvemhvbmcHamlhb2xpdQZzaG91cnUGemhpY2h1B3NoaWppYW4HcGFpemhhbwVxaWNoZQhzaHVpcGlhbwdkaW5neXVlBmtlZnVfMgx0dWljaHVkZW5nbHUJcGluZ2x1bl8yB3FpYW5iYW8Ic291c3VvXzIKeW91aHVpcXVhbghnb3V3dWRhaQZndWFubGkGcWlhbmJpCWh1YW5nZ3VhbgAAAAA=\") format(\"woff\")"), "1" to _uM("fontFamily" to "remixicon", "src" to "url(\"data:font/ttf;base64,AAEAAAALAIAAAwAwR1NVQiCLJXoAAAE4AAAAVE9TLzJCw1nwAAABjAAAAFZjbWFwhDk4UQAADhAAADVyZ2x5ZtskChIAAEmcAAGVFGhlYWQtsn+tAAAA4AAAADZoaGVhCMcHOgAAALwAAAAkaG10eNbUAAAAAAHkAAAMLGxvY2HMoDOgAABDhAAABhhtYXhwBCEAmAAAARgAAAAgbmFtZRwN5TYAAd6wAAADKnBvc3RJRqFaAAHh3AAANLAAAQAAA/z/TAAABOIAAAAABMkAAQAAAAAAAAAAAAAAAAAAAwsAAQAAAAEAAFIXJRFfDzz1AAsEsAAAAADk5R1cAAAAAOTlHVwAAP9lBMkD4wAAAAgAAgAAAAAAAAABAAADCwCMAAwAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAEE4AGQAAUAAAL5A0gAAACoAvkDSAAAAkAAOgE1AAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAQOoC9e4D/P9MAGwD/AC0AAAAAQAAAAAAAAAAAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAABOIAAATiAAAE4gAA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AyADJgMoAy4DMAM+A0ADTgNQA1IDVANWA1gDWgNcA2IDZANmA2oDbANuA3QDdgN4A3gDegN8A4IDhAOGA4gDiAOIA4oDjAOOA5ADlgOYA54DoAOiA6YDqAOoA6wDrgOwA7IDtAO+A8ADxAPEA8QDxgPgA+ID5APmA+wD9gP8BA4EEAQQBBIEFAQWBBYEFgQWBCQEJgQoBCgEKAQuBDAENgQ4BDoEQARCBEIEQgRMBFIEVARaBFwEXARkBGYEbARyBHIEeAR6BHoEegR8BH4EgASCBIQEigSMBI4EkASWBJgEmgS4BLoEvAS+BMAEwgTIBMoE0ATSBNQE1gTYBNgE2gTgBOIE6gT0BPQE9gT4BPoE/AT+BQQFBgUIBQgFCAUKBQwFEgUUBRQFFAUWBRgFGgUcBR4FIAUgBSIFLgU2BTgFOAU+BUAFQgVEBUoFXAVmBXQFdgV4BX4FiAWKBYwFkgWYBaIFpAWmBagFqgW8BbwFvgXSBdgF2gXcBd4F8AXyBfIF8gX0BfYF+AX8Bf4GAAYCBgQGBgYIBggGCgYKBhAGEgYSBhYGGAYYBhoGHAYeBiAGIgYoBioGKgYsBiwGLgYwBjIGNAY2BjgAAAE7AgcCBgIIAgkCCgILAbsBugHEAcQAfgB/AqsC3gFGAUcAMQAwACsAKgFPAU4CPQI8AUUBRAGXAZYARwBGAA8ACwAGABYAEwITACICFAAjABAADAAHAAgCDQAaABUAFAABAA4ACgAFAAQAFwASAAMADQAJAg4AGQACABgAEQDvAPAATQBMAiACHwE3ATgASwBKAQ0BDAIjAFQCIQBXAFcCIgBTAFIA3ADbAkwCSwDtAO4CUQJSAPwA+wBaAFsAXABdAQkCJABWAGIAYwItAi4CKgIrAGEAYAIpAigBcgF2AXcBcwF0AXUCNAI1AjYCNwIyAjMApQCkAJsAmgCgAKEAqACpAKwArQCvAK4AvAC9AJ8AngCxALAAvwC+AKYApwCrAKoCaQJpAcIBwgGzAbIBtwG2AbQBtQG5AbgC3ALbAWcBZgD0APMCPwI+Ab8BvgHDAcMAQwBCAEUARAJAAkACgQKAAVgBWQDJAMgBLAErAlcCWACWAJcAgQCAARcBFgCQAJEAkgCTAJUAlACDAIICOQI4AGUAZADVANQCcgJxAdQB1QDOAM8CWQJaAcYBxgBeAFgA/wEAAc0BzAHJAOIA4QIaAhkBWwFaAscCyADGAMcAwwDCAa4BrwEoASkBIgEqASMB3AHdAd8B3gCzALIA6wDsAOoA6QDmAOUCTQJOAOQA4wJQAk8C0ALPAPcA+AFoAWkB8QHwANoA2gIAAgEAZgBnAnkCeQK9ArwCuwGoAakBkwGSAZkBmAE6ATkAawBqAqQCpQF8AX0CWwJcAUEBQAE+AT8CXQJeAfIAJQAkAhwCGwAuAC8CZgJlAmMCZAFhAWAAPwA+AD0APABBAEABMwE0AbwBvQK6ArkA1gDXAmgCZwLKAskC/wL+AvMDBgLLAswDAQMAAvkC+AL9AvwC9AL1AwIDAwL7AvoC9gL3AF8AWQJVAGwAbAEDAQQBbQFsAfQB9QH3AdcB1gHbAdoB2QHYAc8BzgJsAmsAOAA5ADMAMgIeAh0ANQA0ADYANwJgAl8CfwJ+AVEBUAFSAVMC6ALnAMUAxABOAE8BnQGcAJkAmAIxAjAAogCjAX8BfgGBAYABTAFNAS4BLQEwAS8BMgExAfwB/QGlAaQBowGiAs4CzQFqAWsBegF7AXkBeAFeAV8CvgGHAYYB7AHtAYgBiQLaAtECOwI6Au4C7QFcAV0BjQGMAtYC1QDRAkkCSgDQAwgDBwIlAFUBiwGKAsACvwETARIAbgBtAEgASQJ9AnwBVAFVAoUChADeAN0CRQJGAN8A4AC1ALQBsAGxALcAtgHBAcABjwGOATUBNgKvAq4BDwEOAHsAfABwAG8BQgFDAq0CrAJ7AnoBEAERAkgCRwHhAeABCAByAHECQwJEAHkAegGmAacB5QHkAecB5gHjAeIB0gHTAdEB0AJtAm4CqQKoARkBGAEbARoA2QDYAQEBAgBzAHQAzQDMAQYBBwB3AHgBnwGeAOcA6AGQAZEAJwAmACgAKQJqAcUB+gH7APEA8gEnASYCxgLFAtkC2AMEAwUA/QD+AlMB6wHqARUBFAHoAekC7ALrAnACbwD5APoB7wHuAH0AfQJWASQBJQJ4AncAywDKAcsBygLXAcgCpgKnAfkB+AKMAo0CiwKQApECoQKgAooCmwKaApYClwKZApgCngKfApQClQKJAogCnQKcApMCkgFvAW4BHwEeASABIQEdARwBggGDAYUBhAJ2AnUCdAJzAQsBCgFIAUkBSwFKAuAC3wB2AHUDCQMJAwoDCgAbABsAHAAc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AMkAAOvKAADrygAAAMgAAOvbAADr2wAAASwAAOvcAADr3AAAASsAAOvdAADr3QAAAlcAAOveAADr3gAAAlgAAOvfAADr3wAAAJYAAOvgAADr4AAAAJcAAOvhAADr4QAAAIEAAOviAADr4gAAAIAAAOvtAADr7QAAARcAAOvuAADr7gAAARYAAOvxAADr8QAAAJAAAOvyAADr8gAAAJEAAOvzAADr8wAAAJIAAOv0AADr9AAAAJMAAOv1AADr9QAAAJUAAOv2AADr9gAAAJQAAOv3AADr9wAAAIMAAOv4AADr+AAAAIIAAOwBAADsAQAAAjkAAOwCAADsAgAAAjgAAOwNAADsDQAAAGUAAOwOAADsDgAAAGQAAOwVAADsFQAAANUAAOwWAADsFgAAANQAAOwZAADsGQAAAnIAAOwaAADsGgAAAnEAAOwpAADsKQAAAdQAAOwqAADsKgAAAdUAAOwtAADsLQAAAM4AAOwuAADsLgAAAM8AAOw7AADsOwAAAlkAAOw8AADsPAAAAloAAOw/AADsPwAAAcYAAOxAAADsQAAAAcYAAOxBAADsQQAAAF4AAOxCAADsQgAAAFgAAOxRAADsUQAAAP8AAOxSAADsUgAAAQAAAOxVAADsVQAAAc0AAOxWAADsVgAAAcwAAOxaAADsWgAAAckAAOxbAADsWwAAAOIAAOxcAADsXAAAAOEAAOxhAADsYQAAAhoAAOxiAADsYgAAAhkAAOx5AADseQAAAVsAAOx6AADsegAAAVoAAOx/AADsfwAAAscAAOyAAADsgAAAAsgAAOyBAADsgQAAAMYAAOyCAADsggAAAMcAAOyFAADshQAAAMMAAOyGAADshgAAAMIAAOygAADsoAAAAa4AAOyhAADsoQAAAa8AAOynAADspwAAASgAAOypAADsqQAAASkAAOyqAADsqgAAASIAAOysAADsrAAAASoAAOytAADsrQAAASMAAOy0AADstAAAAdwAAOy1AADstQAAAd0AAOy2AADstgAAAd8AAOy3AADstwAAAd4AAOzAAADswAAAALMAAOzBAADswQAAALIAAOzUAADs1AAAAOsAAOzVAADs1QAAAOwAAOzaAADs2gAAAOoAAOzbAADs2wAAAOkAAOzgAADs4AAAAOYAAOzrAADs6wAAAOUAAOzwAADs8AAAAk0AAOzxAADs8QAAAk4AAOz6AADs+gAAAOQAAOz7AADs+wAAAOMAAO0OAADtDgAAAlAAAO0PAADtDwAAAk8AAO0UAADtFAAAAtAAAO0VAADtFQAAAs8AAO0eAADtHgAAAPcAAO0fAADtHwAAAPgAAO0gAADtIAAAAWgAAO0hAADtIQAAAWkAAO0mAADtJgAAAfEAAO0nAADtJwAAAfAAAO0wAADtMAAAANoAAO0xAADtMQAAANoAAO0yAADtMgAAAgAAAO0zAADtMwAAAgEAAO06AADtOgAAAGYAAO07AADtOwAAAGcAAO1CAADtQgAAAnkAAO1DAADtQwAAAnkAAO2LAADtiwAAAr0AAO2MAADtjAAAArwAAO2NAADtjQAAArsAAO2UAADtlAAAAagAAO2VAADtlQAAAakAAO2aAADtmgAAAZMAAO2cAADtnAAAAZIAAO2dAADtnQAAAZkAAO2eAADtngAAAZgAAO26AADtugAAAToAAO27AADtuwAAATkAAO3OAADtzgAAAGsAAO3PAADtzwAAAGoAAO3iAADt4gAAAqQAAO3jAADt4wAAAqUAAO4EAADuBAAAAXwAAO4FAADuBQAAAX0AAO4KAADuCgAAAlsAAO4LAADuCwAAAlwAAO4MAADuDAAAAUEAAO4NAADuDQAAAUAAAO4OAADuDgAAAT4AAO4PAADuDwAAAT8AAO4SAADuEgAAAl0AAO4TAADuEwAAAl4AAO4XAADuFwAAAfIAAO4YAADuGAAAACUAAO4ZAADuGQAAACQAAO4mAADuJgAAAhwAAO4rAADuKwAAAhsAAO42AADuNgAAAC4AAO43AADuNwAAAC8AAO5GAADuRgAAAmYAAO5HAADuRwAAAmUAAO5IAADuSAAAAmMAAO5JAADuSQAAAmQAAO5KAADuSgAAAWEAAO5LAADuSwAAAWAAAO5MAADuTAAAAD8AAO5NAADuTQAAAD4AAO5OAADuTgAAAD0AAO5PAADuTwAAADwAAO5QAADuUAAAAEEAAO5RAADuUQAAAEAAAO5SAADuUgAAATMAAO5TAADuUwAAATQAAO5WAADuVgAAAbwAAO5XAADuVwAAAb0AAO5fAADuXwAAAroAAO5gAADuYAAAArkAAO5yAADucgAAANYAAO5zAADucwAAANcAAO58AADufAAAAmgAAO59AADufQAAAmcAAO5+AADufgAAAsoAAO5/AADufwAAAskAAO6IAADuiAAAAv8AAO6JAADuiQAAAv4AAO6KAADuigAAAvMAAO6LAADuiwAAAwYAAO6MAADujAAAAssAAO6NAADujQAAAswAAO6RAADukQAAAwEAAO6SAADukgAAAwAAAO6TAADukwAAAvkAAO6UAADulAAAAvgAAO6YAADumAAAAv0AAO6ZAADumQAAAvwAAO6aAADumgAAAvQAAO6bAADumwAAAvUAAO6cAADunAAAAwIAAO6dAADunQAAAwMAAO6eAADungAAAvsAAO6fAADunwAAAvoAAO6gAADuoAAAAvYAAO6hAADuoQAAAvcAAO6qAADuqgAAAF8AAO6rAADuqwAAAFkAAO6yAADusgAAAlUAAO63AADutwAAAGwAAO64AADuuAAAAGwAAO66AADuugAAAQMAAO67AADuuwAAAQQAAO6/AADuvwAAAW0AAO7AAADuwAAAAWwAAO7CAADuwgAAAfQAAO7GAADuxgAAAfUAAO7JAADuyQAAAfcAAO7NAADuzQAAAdcAAO7OAADuzgAAAdYAAO7PAADuzwAAAdsAAO7QAADu0AAAAdoAAO7RAADu0QAAAdkAAO7SAADu0gAAAdgAAO7TAADu0wAAAc8AAO7UAADu1AAAAc4AAO7bAADu2wAAAmwAAO7cAADu3AAAAmsAAO7rAADu6wAAADgAAO7sAADu7AAAADkAAO7zAADu8wAAADMAAO72AADu9gAAADIAAO75AADu+QAAAh4AAO76AADu+gAAAh0AAO77AADu+wAAADUAAO78AADu/AAAADQAAO8BAADvAQAAADYAAO8CAADvAgAAADcAAO8HAADvBwAAAmAAAO8IAADvCAAAAl8AAO8JAADvCQAAAn8AAO8KAADvCgAAAn4AAO8TAADvEwAAAVEAAO8UAADvFAAAAVAAAO8XAADvFwAAAVIAAO8YAADvGAAAAVMAAO8dAADvHQAAAugAAO8eAADvHgAAAucAAO8fAADvHwAAAMUAAO8gAADvIAAAAMQAAO8nAADvJwAAAE4AAO8oAADvKAAAAE8AAO86AADvOgAAAZ0AAO8+AADvPgAAAZwAAO9DAADvQwAAAJkAAO9EAADvRAAAAJgAAO9FAADvRQAAAjEAAO9GAADvRgAAAjAAAO9HAADvRwAAAKIAAO9IAADvSAAA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AZ4AAPGaAADxmgAAAOcAAPGbAADxmwAAAOgAAPGeAADxngAAAZAAAPGfAADxnwAAAZEAAPGkAADxpAAAACcAAPGlAADxpQAAACYAAPGmAADxpgAAACgAAPGnAADxpwAAACkAAPGuAADxrgAAAmoAAPGvAADxrwAAAcUAAPG8AADxvAAAAfoAAPG/AADxvwAAAfsAAPHGAADxxgAAAPEAAPHHAADxxwAAAPIAAPHKAADxygAAAScAAPHLAADxywAAASYAAPHSAADx0gAAAsYAAPHTAADx0wAAAsUAAPHYAADx2AAAAtkAAPHZAADx2QAAAtgAAPHdAADx3QAAAwQAAPHeAADx3gAAAwUAAPHnAADx5wAAAP0AAPHoAADx6AAAAP4AAPIBAADyAQAAAlMAAPIGAADyBgAAAesAAPIHAADyBwAAAeoAAPIMAADyDAAAARUAAPINAADyDQAAARQAAPIOAADyDgAAAegAAPIPAADyDwAAAekAAPIQAADyEAAAAuwAAPIRAADyEQAAAusAAPISAADyEgAAAnAAAPIVAADyFQAAAm8AAPIWAADyFgAAAPkAAPIXAADyFwAAAPoAAPIYAADyGAAAAe8AAPIZAADyGQAAAe4AAPIeAADyHgAAAH0AAPIfAADyHwAAAH0AAPInAADyJwAAAlYAAPIuAADyLgAAASQAAPIvAADyLwAAASUAAPIwAADyMAAAAngAAPIxAADyMQAAAncAAPI2AADyNgAAAMsAAPI3AADyNwAAAMoAAPJLAADySwAAAcsAAPJMAADyTAAAAcoAAPJPAADyTwAAAtcAAPJQAADyUAAAAcgAAPJTAADyUwAAAqYAAPJUAADyVAAAAqcAAPJVAADyVQAAAfkAAPJWAADyVgAAAfgAAPJdAADyXQAAAowAAPJeAADyXgAAAo0AAPJfAADyXwAAAosAAPJgAADyYAAAApAAAPJhAADyYQAAApEAAPJiAADyYgAAAqEAAPJjAADyYwAAAqAAAPJkAADyZAAAAooAAPJlAADyZQAAApsAAPJmAADyZgAAApoAAPJpAADyaQAAApYAAPJqAADyagAAApcAAPJrAADyawAAApkAAPJsAADybAAAApgAAPJtAADybQAAAp4AAPJuAADybgAAAp8AAPJxAADycQAAApQAAPJyAADycgAAApUAAPJzAADycwAAAokAAPJ0AADydAAAAogAAPJ1AADydQAAAp0AAPJ2AADydgAAApwAAPJ3AADydwAAApMAAPJ4AADyeAAAApIAAPKHAADyhwAAAW8AAPKIAADyiAAAAW4AAPKLAADyiwAAAR8AAPKMAADyjAAAAR4AAPKPAADyjwAAASAAAPKQAADykAAAASEAAPKRAADykQAAAR0AAPKSAADykgAAARwAAPKbAADymwAAAYIAAPKcAADynAAAAYMAAPKdAADynQAAAYUAAPKeAADyngAAAYQAAPKfAADynwAAAnYAAPKgAADyoAAAAnUAAPKjAADyowAAAnQAAPKkAADypAAAAnMAAPKtAADyrQAAAQsAAPKuAADyrgAAAQoAAPK1AADytQAAAUgAAPK2AADytgAAAUkAAPK3AADytwAAAUsAAPK4AADyuAAAAUoAAPLDAADywwAAAuAAAPLEAADyxAAAAt8AAPLFAADyxQAAAHYAAPLGAADyxgAAAHUAAPLgAADy4AAAAwkAAPLhAADy4QAAAwkAAPLiAADy4gAAAwoAAPLjAADy4wAAAwoAAPLkAADy5AAAABsAAPLlAADy5QAAABsAAPLqAADy6gAAABwAAPLrAADy6wAAABwAAPLwAADy8AAAAgUAAPLxAADy8QAAAgQAAPL8AADy/AAAAhgAAPL9AADy/QAAAhUAAPMAAADzAAAAAhcAAPMBAADzAQAAAhYAAPMeAADzHgAAAccAAPMfAADzHwAAAccAAPMgAADzIAAAAg8AAPMhAADzIQAAACAAAPMiAADzIgAAAhIAAPMjAADzIwAAAB8AAPMkAADzJAAAAhAAAPMlAADzJQAAACEAAPMmAADzJgAAAhEAAPMnAADzJwAAAB4AAPM9AADzPQAAAfMAAPNGAADzRgAAAT0AAPNHAADzRwAAATwAAPNdAADzXQAAAf8AAPNeAADzXgAAAf4AAPNfAADzXwAAAqoAAPNgAADzYAAAArMAAPNhAADzYQAAArIAAPNiAADzYgAAArYAAPNjAADzYwAAArcAAPNkAADzZAAAArUAAPNlAADzZQAAArQAAPNmAADzZgAAAgwAAPNnAADzZwAAAB0AAPNsAADzbAAAAgMAAPNtAADzbQAAAgIAAPNuAADzbgAAALgAAPNvAADzbwAAALkAAPNyAADzcgAAAocAAPNzAADzcwAA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AGwAbwBwAGUAcgBzAC4AIABoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMLAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgFDAUQBRQFGAUcBSAFJAUoBSwFMAU0BTgFPAVABUQFSAVMBVAFVAVYBVwFYAVkBWgFbAVwBXQFeAV8BYAFhAWIBYwFkAWUBZgFnAWgBaQFqAWsBbAFtAW4BbwFwAXEBcgFzAXQBdQF2AXcBeAF5AXoBewF8AX0BfgF/AYABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwG4AbkBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAdQB1QHWAdcB2AHZAdoB2wHcAd0B3gHfAeAB4QHiAeMB5AHlAeYB5wHoAekB6gHrAewB7QHuAe8B8AHxAfIB8wH0AfUB9gH3AfgB+QH6AfsB/AH9Af4B/wIAAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgInAigCKQIqAisCLAItAi4CLwIwAjECMgIzAjQCNQI2AjcCOAI5AjoCOwI8Aj0CPgI/AkACQQJCAkMCRAJFAkYCRwJIAkkCSgJLAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkgKTApQClQKWApcCmAKZApoCmwKcAp0CngKfAqACoQKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAs0CzgLPAtAC0QLSAtMC1ALVAtYC1wLYAtkC2gLbAtwC3QLeAt8C4ALhAuIC4wLkAuUC5gLnAugC6QLqAusC7ALtAu4C7wLwAvEC8gLzAvQC9QL2AvcC+AL5AvoC+wL8Av0C/gL/AwADAQMCAwMDBAMFAwYDBwMIAwkDCgMLAwwDDQMOAw8DEAMRAxIDEwMUAxUDFgMXAxgDGQMaAxsDHAMdAx4DHwMgAyEDIgMjAyQDJQMmAycDKAMpAyoDKwMsAy0DLgMvAzADMQMyAzMDNAM1AzYDNwM4AzkDOgM7AzwDPQM+Az8DQANBA0IDQwNEA0UDRgNHA0gDSQNKA0sDTANNA04DTwNQA1EDUgNTA1QDVQNWA1cDWANZA1oDWwNcA10DXgNfA2ADYQNiA2MDZANlA2YDZwNoA2kDagNrA2wDbQNuA28DcANxA3IDcwN0A3UDdgN3A3gDeQN6A3sDfAN9A34DfwOAA4EDggODA4QDhQOGA4cDiAOJA4oDiwOMA40DjgOPA5ADkQOSA5MDlAOVA5YDlwOYA5kDmgObA5wDnQOeA58DoAOhA6IDowOkA6UDpgOnA6gDqQOqA6sDrAOtA64DrwOwA7EDsgOzA7QDtQO2A7cDuAO5A7oDuwO8A70DvgO/A8ADwQPCA8MDxAPFA8YDxwPIA8kDygPLA8wDzQPOA88D0APRA9ID0wPUA9UD1gPXA9gD2QPaA9sD3APdA94D3wPgA+ED4gPjA+QD5QPmA+cD6APpA+oD6wPsA+0D7gPvA/AD8QPyA/MD9AP1A/YD9wP4A/kD+gP7A/wD/QP+A/8EAAQBBAIEAwQEBAUEBgQHBAgECQQKBAsEDAASYXJyb3ctbGVmdC11cC1saW5lDWFycm93LXVwLWxpbmUTYXJyb3ctcmlnaHQtdXAtbGluZRBhcnJvdy1yaWdodC1saW5lFWFycm93LXJpZ2h0LWRvd24tbGluZQ9hcnJvdy1kb3duLWxpbmUUYXJyb3ctbGVmdC1kb3duLWxpbmUPYXJyb3ctbGVmdC1saW5lFGFycm93LXVwLWNpcmNsZS1saW5lF2Fycm93LXJpZ2h0LWNpcmNsZS1saW5lFmFycm93LWRvd24tY2lyY2xlLWxpbmUWYXJyb3ctbGVmdC1jaXJjbGUtbGluZRRhcnJvdy11cC1jaXJjbGUtZmlsbBdhcnJvdy1yaWdodC1jaXJjbGUtZmlsbBZhcnJvdy1kb3duLWNpcmNsZS1maWxsFmFycm93LWxlZnQtY2lyY2xlLWZpbGwPYXJyb3ctdXAtcy1saW5lEmFycm93LXJpZ2h0LXMtbGluZRFhcnJvdy1kb3duLXMtbGluZRFhcnJvdy1sZWZ0LXMtbGluZRFhcnJvdy1sZWZ0LXMtZmlsbBFhcnJvdy1kb3duLXMtZmlsbBJhcnJvdy1yaWdodC1zLWZpbGwPYXJyb3ctdXAtcy1maWxsEmFycm93LXVwLWRvd24tbGluZRVhcnJvdy1sZWZ0LXJpZ2h0LWxpbmUXYXJyb3ctcmlnaHQtZG91YmxlLWxpbmUUYXJyb3ctdXAtZG91YmxlLWxpbmUMc2tpcC11cC1saW5lE2V4cGFuZC11cC1kb3duLWxpbmUWZXhwYW5kLWxlZnQtcmlnaHQtbGluZRBleHBhbmQtbGVmdC1saW5lEWV4cGFuZC1yaWdodC1saW5lEmFycm93LWdvLWJhY2stbGluZRVhcnJvdy1nby1mb3J3YXJkLWxpbmULaG9tZS0yLWxpbmULaG9tZS0yLWZpbGwMc3RvcmUtMi1saW5lDHN0b3JlLTItZmlsbAxzdG9yZS0zLWZpbGwMc3RvcmUtMy1saW5lFWFuY2llbnQtcGF2aWxpb24tbGluZRVhbmNpZW50LXBhdmlsaW9uLWZpbGwJdGVudC1saW5lCXRlbnQtZmlsbA1ob3NwaXRhbC1maWxsDWhvc3BpdGFsLWxpbmURYW5jaWVudC1nYXRlLWxpbmURYW5jaWVudC1nYXRlLWZpbGwJbWFpbC1saW5lCW1haWwtZmlsbA5tYWlsLXNlbmQtbGluZQ5tYWlsLXNlbmQtZmlsbBBtYWlsLXVucmVhZC1maWxsEG1haWwtdW5yZWFkLWxpbmUNbWFpbC1hZGQtZmlsbA1tYWlsLWFkZC1saW5lDG1haWwtYWktbGluZQxtYWlsLWFpLWZpbGwKaW5ib3gtbGluZQppbmJveC1maWxsEmluYm94LWFyY2hpdmUtbGluZRJpbmJveC1hcmNoaXZlLWZpbGwUaW5ib3gtdW5hcmNoaXZlLWxpbmUUaW5ib3gtdW5hcmNoaXZlLWZpbGwKY2xvdWQtbGluZQpjbG91ZC1maWxsDmNsb3VkLW9mZi1saW5lDmNsb3VkLW9mZi1maWxsDGFyY2hpdmUtbGluZQxhcmNoaXZlLWZpbGwMcHJvZmlsZS1maWxsDHByb2ZpbGUtbGluZQphd2FyZC1saW5lCmF3YXJkLWZpbGwHYXQtbGluZQdhdC1maWxsCm1lZGFsLWZpbGwKbWVkYWwtbGluZRN2ZXJpZmllZC1iYWRnZS1saW5lE3ZlcmlmaWVkLWJhZGdlLWZpbGwOYmFyLWNoYXJ0LWxpbmUZYmFyLWNoYXJ0LWhvcml6b250YWwtbGluZRBiYXItY2hhcnQtMi1saW5lDnBpZS1jaGFydC1saW5lEWJ1YmJsZS1jaGFydC1saW5lFmJhci1jaGFydC1ncm91cGVkLWxpbmUQZG9udXQtY2hhcnQtbGluZQ9saW5lLWNoYXJ0LWxpbmUNYm9va21hcmstZmlsbA1ib29rbWFyay1saW5lDmJyaWVmY2FzZS1maWxsDmJyaWVmY2FzZS1saW5lEGRvbnV0LWNoYXJ0LWZpbGwPbGluZS1jaGFydC1maWxsDWNhbGVuZGFyLWxpbmUNY2FsZW5kYXItZmlsbA9jYWxjdWxhdG9yLWZpbGwPY2FsY3VsYXRvci1saW5lFWN1c3RvbWVyLXNlcnZpY2UtbGluZRVjdXN0b21lci1zZXJ2aWNlLWZpbGwJZmxhZy1maWxsCWZsYWctbGluZQ1mbGFnLW9mZi1saW5lDWZsYWctb2ZmLWZpbGwLZ2xvYmFsLWxpbmULZ2xvYmFsLWZpbGwKbGlua3MtZmlsbAxwcmludGVyLWxpbmUMcHJpbnRlci1maWxsCnJlcGx5LWxpbmUKcmVwbHktZmlsbA9zZW5kLXBsYW5lLWxpbmUPc2VuZC1wbGFuZS1maWxsDnNsaWRlc2hvdy1maWxsDnNsaWRlc2hvdy1saW5lC3dpbmRvdy1saW5lC3dpbmRvdy1maWxsCnN0YWNrLWZpbGwKc3RhY2stbGluZQxzZXJ2aWNlLWZpbGwMc2VydmljZS1saW5lD3JlZ2lzdGVyZWQtZmlsbA9yZWdpc3RlcmVkLWxpbmUOdHJhZGVtYXJrLWZpbGwSYWR2ZXJ0aXNlbWVudC1maWxsEmFkdmVydGlzZW1lbnQtbGluZQ5jb3B5cmlnaHQtbGluZQ5jb3B5cmlnaHQtZmlsbBhjcmVhdGl2ZS1jb21tb25zLW5kLWxpbmUYY3JlYXRpdmUtY29tbW9ucy1uZC1maWxsDGlkLWNhcmQtbGluZQxpZC1jYXJkLWZpbGwOaW5mby1jYXJkLWxpbmUOaW5mby1jYXJkLWZpbGwRcGFzcy1wZW5kaW5nLWZpbGwRcGFzcy1wZW5kaW5nLWxpbmURcGFzcy1leHBpcmVkLWZpbGwRcGFzcy1leHBpcmVkLWxpbmUPcGFzcy12YWxpZC1maWxsD3Bhc3MtdmFsaWQtbGluZQ5tZWdhcGhvbmUtZmlsbA5tZWdhcGhvbmUtbGluZRhjcmVhdGl2ZS1jb21tb25zLWJ5LWZpbGwYY3JlYXRpdmUtY29tbW9ucy1ieS1saW5lFWNyZWF0aXZlLWNvbW1vbnMtZmlsbBVjcmVhdGl2ZS1jb21tb25zLWxpbmUYY3JlYXRpdmUtY29tbW9ucy1uYy1saW5lGGNyZWF0aXZlLWNvbW1vbnMtbmMtZmlsbA1jb3B5bGVmdC1maWxsDWNvcHlsZWZ0LWxpbmUObWVzc2FnZS0yLWxpbmUObWVzc2FnZS0yLWZpbGwPY2hhdC1jaGVjay1saW5lD2NoYXQtY2hlY2stZmlsbBBjaGF0LXVucmVhZC1maWxsEGNoYXQtdW5yZWFkLWxpbmUNY2hhdC1uZXctbGluZQ1jaGF0LW5ldy1maWxsEGNoYXQtZGVsZXRlLWZpbGwQY2hhdC1kZWxldGUtbGluZQxtZXNzYWdlLWZpbGwMbWVzc2FnZS1saW5lC2NoYXQtNC1saW5lC2NoYXQtNC1maWxsEmNoYXQtc2V0dGluZ3MtZmlsbBJjaGF0LXNldHRpbmdzLWxpbmUSY2hhdC1kb3dubG9hZC1maWxsEmNoYXQtZG93bmxvYWQtbGluZRBjaGF0LXVwbG9hZC1saW5lEGNoYXQtdXBsb2FkLWZpbGwRY2hhdC1mb3J3YXJkLWZpbGwRY2hhdC1mb3J3YXJkLWxpbmUPY2hhdC1oZWFydC1saW5lD2NoYXQtaGVhcnQtZmlsbA1jaGF0LW9mZi1saW5lDWNoYXQtb2ZmLWZpbGwNZmVlZGJhY2stbGluZQ1mZWVkYmFjay1maWxsFHF1ZXN0aW9uLWFuc3dlci1saW5lFHF1ZXN0aW9uLWFuc3dlci1maWxsEnF1ZXN0aW9ubmFpcmUtbGluZRJxdWVzdGlvbm5haXJlLWZpbGwKc3BlYWstZmlsbApzcGVhay1saW5lEGNoYXQtdGhyZWFkLWxpbmUQY2hhdC10aHJlYWQtZmlsbBFjaGF0LWhpc3RvcnktZmlsbBFjaGF0LWhpc3RvcnktbGluZRFjaGF0LXByaXZhdGUtbGluZRFjaGF0LXByaXZhdGUtZmlsbBJlbW9qaS1zdGlja2VyLWxpbmUSZW1vamktc3RpY2tlci1maWxsCWVkaXQtbGluZQllZGl0LWZpbGwLbWFya3VwLWxpbmULbWFya3VwLWZpbGwNZWRpdC1ib3gtZmlsbA1lZGl0LWJveC1saW5lDWNvbXB1dGVyLWxpbmUNY29tcHV0ZXItZmlsbAd0di1saW5lB3R2LWZpbGwPc21hcnRwaG9uZS1saW5lD3NtYXJ0cGhvbmUtZmlsbAtkZXZpY2UtZmlsbAtkZXZpY2UtbGluZQpwaG9uZS1saW5lCnBob25lLWZpbGwNaW5zdGFuY2UtZmlsbA1pbnN0YW5jZS1saW5lD2RhdGFiYXNlLTItbGluZQ9kYXRhYmFzZS0yLWZpbGwRa2V5Ym9hcmQtYm94LWZpbGwRa2V5Ym9hcmQtYm94LWxpbmUOc2h1dC1kb3duLWxpbmUOc2h1dC1kb3duLWZpbGwQZmluZ2VycHJpbnQtbGluZRBiYXJjb2RlLWJveC1saW5lEGJhcmNvZGUtYm94LWZpbGwMcXItY29kZS1saW5lDHFyLWNvZGUtZmlsbAxxci1zY2FuLWZpbGwMcXItc2Nhbi1saW5lCmRyYWZ0LWxpbmUKZHJhZnQtZmlsbA9maWxlLXBhcGVyLWxpbmUPZmlsZS1wYXBlci1maWxsCWZpbGUtbGluZQlmaWxlLWZpbGwQc3RpY2t5LW5vdGUtZmlsbBBzdGlja3ktbm90ZS1saW5lDmZpbGUtZWRpdC1saW5lDmZpbGUtZWRpdC1maWxsDmZpbGUtY29weS1maWxsDmZpbGUtY29weS1saW5lCWJpbGwtZmlsbAliaWxsLWxpbmUMYXJ0aWNsZS1maWxsDGFydGljbGUtbGluZQtzdXJ2ZXktZmlsbAtzdXJ2ZXktbGluZQ5jbGlwYm9hcmQtbGluZQ5jbGlwYm9hcmQtZmlsbAluZXdzLWZpbGwJbmV3cy1saW5lDWZpbGUtemlwLWZpbGwNZmlsZS16aXAtbGluZQl0b2RvLWZpbGwJdG9kby1saW5lEGJvb2stbWFya2VkLWxpbmUQYm9vay1tYXJrZWQtZmlsbAl0YXNrLWZpbGwJdGFzay1saW5lD2RvdWJsZS1xdW90ZXMtbA9kb3VibGUtcXVvdGVzLXIPc2luZ2xlLXF1b3Rlcy1sD3NpbmdsZS1xdW90ZXMtcgpsaXN0LWNoZWNrDGxpc3Qtb3JkZXJlZApsaXN0LXJhZGlvCHNvcnQtYXNjCXNvcnQtZGVzYw1zZW5kLWJhY2t3YXJkDWJyaW5nLWZvcndhcmQLd2FsbGV0LWxpbmULd2FsbGV0LWZpbGwOYmFuay1jYXJkLWxpbmUOYmFuay1jYXJkLWZpbGwLcmVmdW5kLWxpbmULcmVmdW5kLWZpbGwJc2FmZS1maWxsCXNhZmUtbGluZQ5wcmljZS10YWctbGluZQ5wcmljZS10YWctZmlsbAt0aWNrZXQtbGluZQt0aWNrZXQtZmlsbAtjb3Vwb24tbGluZQtjb3Vwb24tZmlsbBFzaG9wcGluZy1iYWctbGluZRFzaG9wcGluZy1iYWctZmlsbBJzaG9wcGluZy1jYXJ0LWxpbmUSc2hvcHBpbmctY2FydC1maWxsCHZpcC1saW5lCHZpcC1maWxsEHZpcC1jcm93bi0yLWxpbmUQdmlwLWNyb3duLTItZmlsbBB2aXAtZGlhbW9uZC1maWxsEHZpcC1kaWFtb25kLWxpbmUNZXhjaGFuZ2UtZmlsbA1leGNoYW5nZS1saW5lC3Ryb3BoeS1maWxsC3Ryb3BoeS1saW5lCXN3YXAtbGluZQlzd2FwLWZpbGwRZXhjaGFuZ2UtY255LWxpbmUUZXhjaGFuZ2UtZG9sbGFyLWxpbmUTZXhjaGFuZ2UtZnVuZHMtbGluZRBjb3BwZXItY29pbi1saW5lEGNvcHBlci1jb2luLWZpbGwSbW9uZXktY255LWJveC1saW5lEm1vbmV5LWNueS1ib3gtZmlsbBVtb25leS1jbnktY2lyY2xlLWxpbmUVbW9uZXktY255LWNpcmNsZS1maWxsGG1vbmV5LWRvbGxhci1jaXJjbGUtbGluZRhtb25leS1kb2xsYXItY2lyY2xlLWZpbGwWaW5jcmVhc2UtZGVjcmVhc2UtZmlsbBZpbmNyZWFzZS1kZWNyZWFzZS1saW5lD3JlZC1wYWNrZXQtZmlsbA9yZWQtcGFja2V0LWxpbmUMYXVjdGlvbi1maWxsDGF1Y3Rpb24tbGluZQlnaWZ0LWxpbmUJZ2lmdC1maWxsDTI0LWhvdXJzLWxpbmUIbmZ0LWxpbmUIbmZ0LWZpbGwKaGVhcnQtZmlsbApoZWFydC1saW5lDmhlYXJ0LWFkZC1saW5lDmhlYXJ0LWFkZC1maWxsDnJlc3QtdGltZS1maWxsDnJlc3QtdGltZS1saW5lCmFwcGxlLWxpbmUKYXBwbGUtZmlsbAthbGlwYXktZmlsbAthbGlwYXktbGluZQt3ZWNoYXQtZmlsbAt3ZWNoYXQtbGluZQ93ZWNoYXQtcGF5LWxpbmUPd2VjaGF0LXBheS1maWxsEW1pbmktcHJvZ3JhbS1maWxsEW1pbmktcHJvZ3JhbS1saW5lDGFuZHJvaWQtbGluZQxhbmRyb2lkLWZpbGwMbWFwLXBpbi1saW5lDG1hcC1waW4tZmlsbBFtYXAtcGluLXRpbWUtZmlsbBFtYXAtcGluLXRpbWUtbGluZQxwdXNocGluLWZpbGwMcHVzaHBpbi1saW5lCnVucGluLWxpbmUKdW5waW4tZmlsbAxjb21wYXNzLWZpbGwMY29tcGFzcy1saW5lCmVhcnRoLWxpbmUKZWFydGgtZmlsbBBwYXJraW5nLWJveC1maWxsEHBhcmtpbmctYm94LWxpbmUPbmF2aWdhdGlvbi1maWxsD25hdmlnYXRpb24tbGluZQppbWFnZS1saW5lCmltYWdlLWZpbGwQbXVsdGktaW1hZ2UtbGluZRBtdWx0aS1pbWFnZS1maWxsDXZpZGVvLW9uLWxpbmUNdmlkZW8tb24tZmlsbBFjbGFwcGVyYm9hcmQtbGluZRFjbGFwcGVyYm9hcmQtZmlsbAlmaWxtLWZpbGwJZmlsbS1saW5lCm1vdmllLWZpbGwKbW92aWUtbGluZQlsaXZlLWxpbmUJbGl2ZS1maWxsDHZpZGljb24tbGluZQx2aWRpY29uLWZpbGwOdmlkZW8tb2ZmLWxpbmUOdmlkZW8tb2ZmLWZpbGwLY2FtZXJhLWZpbGwLY2FtZXJhLWxpbmUPY2FtZXJhLW9mZi1maWxsD2NhbWVyYS1vZmYtbGluZRBjYW1lcmEtbGVucy1maWxsEGNhbWVyYS1sZW5zLWxpbmUHbXYtbGluZQdtdi1maWxsDG11c2ljLTItZmlsbAxtdXNpYy0yLWxpbmUOaGVhZHBob25lLWZpbGwOaGVhZHBob25lLWxpbmUIbWljLWxpbmUIbWljLWZpbGwMbWljLW9mZi1saW5lDG1pYy1vZmYtZmlsbBB2b2x1bWUtZG93bi1maWxsEHZvbHVtZS1kb3duLWxpbmUQdm9sdW1lLW11dGUtbGluZRB2b2x1bWUtbXV0ZS1maWxsE25vdGlmaWNhdGlvbi00LWxpbmUTbm90aWZpY2F0aW9uLTQtZmlsbBVub3RpZmljYXRpb24tb2ZmLWZpbGwVbm90aWZpY2F0aW9uLW9mZi1saW5lEHBsYXktY2lyY2xlLWxpbmUQcGxheS1jaXJjbGUtZmlsbBFwYXVzZS1jaXJjbGUtbGluZRFwYXVzZS1jaXJjbGUtZmlsbBJyZWNvcmQtY2lyY2xlLWxpbmUScmVjb3JkLWNpcmNsZS1maWxsEHN0b3AtY2lyY2xlLWZpbGwQc3RvcC1jaXJjbGUtbGluZQ9mdWxsc2NyZWVuLWxpbmUUZnVsbHNjcmVlbi1leGl0LWxpbmUQZXF1YWxpemVyLTItbGluZRBlcXVhbGl6ZXItMi1maWxsCWFwcHMtbGluZQlhcHBzLWZpbGwNZnVuY3Rpb24tbGluZQ1mdW5jdGlvbi1maWxsGWRhc2hib2FyZC1ob3Jpem9udGFsLWxpbmUZZGFzaGJvYXJkLWhvcml6b250YWwtZmlsbAltZW51LWxpbmUNbWVudS1hZGQtbGluZQlzdGFyLWxpbmUJc3Rhci1maWxsDXN0YXItb2ZmLWxpbmUNc3Rhci1vZmYtZmlsbAltb3JlLWxpbmUJbW9yZS1maWxsC21vcmUtMi1saW5lC21vcmUtMi1maWxsDXNldHRpbmdzLWZpbGwNc2V0dGluZ3MtbGluZQtmb3JiaWQtZmlsbAtmb3JiaWQtbGluZQ9wcm9oaWJpdGVkLWxpbmUPcHJvaGliaXRlZC1maWxsEmluZm9ybWF0aW9uLTItbGluZRJpbmZvcm1hdGlvbi0yLWZpbGwSZXJyb3Itd2FybmluZy1maWxsEmVycm9yLXdhcm5pbmctbGluZQ1xdWVzdGlvbi1maWxsDXF1ZXN0aW9uLWxpbmUaY2hlY2tib3gtYmxhbmstY2lyY2xlLWxpbmUaY2hlY2tib3gtYmxhbmstY2lyY2xlLWZpbGwUY2hlY2tib3gtY2lyY2xlLWZpbGwUY2hlY2tib3gtY2lyY2xlLWxpbmUTY2hlY2tib3gtYmxhbmstbGluZRNjaGVja2JveC1ibGFuay1maWxsDWNoZWNrYm94LWxpbmUNY2hlY2tib3gtZmlsbA9hZGQtY2lyY2xlLWxpbmUPYWRkLWNpcmNsZS1maWxsGWluZGV0ZXJtaW5hdGUtY2lyY2xlLWZpbGwZaW5kZXRlcm1pbmF0ZS1jaXJjbGUtbGluZRFjbG9zZS1jaXJjbGUtbGluZRFjbG9zZS1jaXJjbGUtZmlsbBFyYWRpby1idXR0b24tbGluZRFyYWRpby1idXR0b24tZmlsbApjaGVjay1saW5lCmNsb3NlLWxpbmUIYWRkLWxpbmUNc3VidHJhY3QtbGluZQtkaXZpZGUtbGluZQplcXVhbC1saW5lC3VwbG9hZC1saW5lDWRvd25sb2FkLWxpbmUTdXBsb2FkLWNsb3VkLTItbGluZRN1cGxvYWQtY2xvdWQtMi1maWxsFWRvd25sb2FkLWNsb3VkLTItbGluZRVkb3dubG9hZC1jbG91ZC0yLWZpbGwObG9naW4tYm94LWxpbmUObG9naW4tYm94LWZpbGwRc2hpZWxkLWNyb3NzLWxpbmURc2hpZWxkLWNyb3NzLWZpbGwRc2hpZWxkLWNoZWNrLWZpbGwRc2hpZWxkLWNoZWNrLWxpbmUPZGVsZXRlLWJpbi1maWxsD2RlbGV0ZS1iaW4tbGluZQlsb2NrLWxpbmUJbG9jay1maWxsEGxvY2stdW5sb2NrLWxpbmUQbG9jay11bmxvY2stZmlsbBJsb2NrLXBhc3N3b3JkLWxpbmUSbG9jay1wYXNzd29yZC1maWxsCGV5ZS1maWxsCGV5ZS1saW5lDGV5ZS1vZmYtbGluZQxleWUtb2ZmLWZpbGwLc2VhcmNoLWxpbmULc2VhcmNoLWZpbGwKc2hhcmUtbGluZQpzaGFyZS1maWxsDnNoYXJlLWJveC1saW5lDnNoYXJlLWJveC1maWxsEXNoYXJlLWNpcmNsZS1saW5lEXNoYXJlLWNpcmNsZS1maWxsCXRpbWUtZmlsbAl0aW1lLWxpbmUNdGh1bWItdXAtbGluZQ10aHVtYi11cC1maWxsF25vdGlmaWNhdGlvbi1iYWRnZS1maWxsF25vdGlmaWNhdGlvbi1iYWRnZS1saW5lC3RvZ2dsZS1saW5lC3RvZ2dsZS1maWxsC2ZpbHRlci1saW5lC2ZpbHRlci1maWxsDGhpc3RvcnktbGluZQ5sb29wLWxlZnQtbGluZQ1sb2FkZXItMi1saW5lDWxvYWRlci00LWxpbmUQcmVzZXQtcmlnaHQtbGluZQtsb2FkZXItZmlsbAt1c2VyLTMtbGluZQt1c2VyLTMtZmlsbAhzdW4tZmlsbAhzdW4tbGluZQltb29uLWZpbGwJbW9vbi1saW5lDHNoaW5pbmctbGluZQxzaGluaW5nLWZpbGwJZmlyZS1maWxsCWZpcmUtbGluZQ5zcGFya2xpbmctbGluZQ5zcGFya2xpbmctZmlsbApib3gtMS1saW5lCmJveC0xLWZpbGwQYWNjb3VudC1ib3gtbGluZRBhY2NvdW50LWJveC1maWxsE2FjY291bnQtY2lyY2xlLWZpbGwTYWNjb3VudC1jaXJjbGUtbGluZRRhY2NvdW50LXBpbi1ib3gtZmlsbBRhY2NvdW50LXBpbi1ib3gtbGluZQxza2lwLXVwLWZpbGwVYXJyb3ctbGVmdC1yaWdodC1maWxsEmFycm93LXVwLWRvd24tZmlsbBBleHBhbmQtbGVmdC1maWxsEWV4cGFuZC1yaWdodC1maWxsE2V4cGFuZC11cC1kb3duLWZpbGwWZXhwYW5kLWxlZnQtcmlnaHQtZmlsbBJhcnJvdy1nby1iYWNrLWZpbGwVYXJyb3ctZ28tZm9yd2FyZC1maWxsEmNvbnRyYWN0LWxlZnQtbGluZRNjb250cmFjdC1yaWdodC1saW5lE2NvbnRyYWN0LXJpZ2h0LWZpbGwSY29udHJhY3QtbGVmdC1maWxsDmRyYWctbW92ZS1saW5lDmRyYWctbW92ZS1maWxsCWhvbWUtbGluZQlob21lLWZpbGwObWFpbC1vcGVuLWxpbmUObWFpbC1vcGVuLWZpbGwPYXR0YWNobWVudC1saW5lD2F0dGFjaG1lbnQtZmlsbA5iYXItY2hhcnQtZmlsbBliYXItY2hhcnQtaG9yaXpvbnRhbC1maWxsEGJhci1jaGFydC0yLWZpbGwRYnViYmxlLWNoYXJ0LWZpbGwOcGllLWNoYXJ0LWZpbGwWY2FsZW5kYXItc2NoZWR1bGUtbGluZRZjYWxlbmRhci1zY2hlZHVsZS1maWxsEmNhbGVuZGFyLXRvZG8tbGluZRJjYWxlbmRhci10b2RvLWZpbGwTY2FsZW5kYXItZXZlbnQtZmlsbBNjYWxlbmRhci1ldmVudC1saW5lE2NhbGVuZGFyLWNsb3NlLWZpbGwTY2FsZW5kYXItY2hlY2stZmlsbBNjYWxlbmRhci1jaGVjay1saW5lE2NhbGVuZGFyLWNsb3NlLWxpbmUObWVzc2FnZS0zLWxpbmUObWVzc2FnZS0zLWZpbGwLY2hhdC0zLWZpbGwLY2hhdC0zLWxpbmULY2hhdC0xLWZpbGwLY2hhdC0xLWxpbmULY2hhdC0yLWZpbGwLY2hhdC0yLWxpbmUJY3JvcC1saW5lCWNyb3AtZmlsbAxwYWxldHRlLWxpbmUMcGFsZXR0ZS1maWxsEmFudGljbG9ja3dpc2UtbGluZRJhbnRpY2xvY2t3aXNlLWZpbGwOY2xvY2t3aXNlLWxpbmUOY2xvY2t3aXNlLWZpbGwRY29kZS1zLXNsYXNoLWZpbGwLcHV6emxlLWZpbGwLcHV6emxlLWxpbmULc2VydmVyLWZpbGwLc2VydmVyLWxpbmUOcXItc2Nhbi0yLWZpbGwOcXItc2Nhbi0yLWxpbmUJc2Nhbi1saW5lCXNjYW4tZmlsbA9waG9uZS1maW5kLWZpbGwPcGhvbmUtZmluZC1saW5lDGJhcmNvZGUtbGluZQxiYXJjb2RlLWZpbGwOZmlsZS1saXN0LWZpbGwOZmlsZS1saXN0LWxpbmUOZmlsZS10ZXh0LWxpbmUOZmlsZS10ZXh0LWZpbGwJYm9vay1maWxsCWJvb2stbGluZQR0ZXh0C2ZvbnQtZmFtaWx5BGxpbmsJdHJhbnNsYXRlE2NvcHBlci1kaWFtb25kLWZpbGwTY29wcGVyLWRpYW1vbmQtbGluZQxkaXNsaWtlLWZpbGwMZGlzbGlrZS1saW5lDGhlYXJ0LTMtZmlsbAxoZWFydC0zLWxpbmULaGVhcnRzLWZpbGwLaGVhcnRzLWxpbmUIbWFwLWxpbmUIbWFwLWZpbGwRaW1hZ2UtY2lyY2xlLWZpbGwRaW1hZ2UtY2lyY2xlLWxpbmUPaW1hZ2UtZWRpdC1maWxsD2ltYWdlLWVkaXQtbGluZQ5pbWFnZS1hZGQtbGluZQ5pbWFnZS1hZGQtZmlsbA5sYW5kc2NhcGUtbGluZQ5sYW5kc2NhcGUtZmlsbBFjaGVjay1kb3VibGUtbGluZQ1zdWJ0cmFjdC1maWxsEmxvZ291dC1jaXJjbGUtbGluZRJsb2dvdXQtY2lyY2xlLWZpbGwLc2hpZWxkLWZpbGwLc2hpZWxkLWxpbmUKdGltZXItbGluZQp0aW1lci1maWxsEmRlbGV0ZS1iYWNrLTItbGluZRJkZWxldGUtYmFjay0yLWZpbGwTdm9sdW1lLXZpYnJhdGUtbGluZRN2b2x1bWUtdmlicmF0ZS1maWxsF3ZvbHVtZS1vZmYtdmlicmF0ZS1saW5lF3ZvbHVtZS1vZmYtdmlicmF0ZS1maWxsCnRydWNrLWxpbmUKdHJ1Y2stZmlsbBNmbGlnaHQtdGFrZW9mZi1saW5lDXJvYWQtbWFwLWxpbmUNcm9hZC1tYXAtZmlsbA5wdXNocGluLTItbGluZQ5wdXNocGluLTItZmlsbA5tYXAtcGluLTItbGluZQ5tYXAtcGluLTItZmlsbBVjb21wYXNzLWRpc2NvdmVyLWxpbmUVY29tcGFzcy1kaXNjb3Zlci1maWxsDXNpZ25wb3N0LWZpbGwNc2lnbnBvc3QtbGluZQdxcS1saW5lB3FxLWZpbGwLdGlrdG9rLWxpbmULdGlrdG9rLWZpbGwPdXNlci1zbWlsZS1saW5lD3VzZXItc21pbGUtZmlsbAl1c2VyLWxpbmUJdXNlci1maWxsDXVzZXItYWRkLWZpbGwNdXNlci1hZGQtbGluZQ91c2VyLW1pbnVzLWxpbmUPdXNlci1taW51cy1maWxsEHVzZXItZm9sbG93LWZpbGwQdXNlci1mb2xsb3ctbGluZRJ1c2VyLXVuZm9sbG93LWxpbmUSdXNlci11bmZvbGxvdy1maWxsEHVzZXItc2hhcmVkLWZpbGwQdXNlci1zaGFyZWQtbGluZRJ1c2VyLXJlY2VpdmVkLWZpbGwSdXNlci1yZWNlaXZlZC1saW5lEHVzZXItc2VhcmNoLWxpbmUQdXNlci1zZWFyY2gtZmlsbBJ1c2VyLWxvY2F0aW9uLWxpbmUSdXNlci1sb2NhdGlvbi1maWxsDnVzZXItc3Rhci1saW5lDnVzZXItc3Rhci1maWxsEnVzZXItc2V0dGluZ3MtZmlsbBJ1c2VyLXNldHRpbmdzLWxpbmUPdXNlci1oZWFydC1saW5lD3VzZXItaGVhcnQtZmlsbBB1c2VyLWZvcmJpZC1saW5lEHVzZXItZm9yYmlkLWZpbGwKZ3JvdXAtZmlsbApncm91cC1saW5lC3VzZXItMi1maWxsC3VzZXItMi1saW5lEHNoaWVsZC11c2VyLWxpbmUQc2hpZWxkLXVzZXItZmlsbAlza2V0Y2hpbmcMYWxpZ24tYm90dG9tDHJlc3RhcnQtbGluZQxyZXN0YXJ0LWZpbGwMcmVmcmVzaC1saW5lDHJlZnJlc2gtZmlsbA9yZXNldC1sZWZ0LWxpbmUPcmVzZXQtbGVmdC1maWxsDnNraXAtZG93bi1saW5lDnNraXAtZG93bi1maWxsD3NraXAtcmlnaHQtbGluZQ9za2lwLXJpZ2h0LWZpbGwOc2tpcC1sZWZ0LWZpbGwOc2tpcC1sZWZ0LWxpbmUMdGV4dC1zbmlwcGV0EWlucHV0LW1ldGhvZC1saW5lEWlucHV0LW1ldGhvZC1maWxsCWZvbnQtc2l6ZQtmb250LXNpemUtMgpmb250LWNvbG9yCW5vZGUtdHJlZRBwcmljZS10YWctMy1saW5lEHByaWNlLXRhZy0zLWZpbGwLaW5wdXQtZmllbGQNdGltZWxpbmUtdmlldw9wcm9ncmVzcy0yLWxpbmUPcHJvZ3Jlc3MtMi1maWxsCnQtYm94LWxpbmUKdC1ib3gtZmlsbAtlZGl0LTItZmlsbAtlZGl0LTItbGluZQ1sYXlvdXQtMi1saW5lDWxheW91dC0yLWZpbGwSbGF5b3V0LWNvbHVtbi1maWxsEmxheW91dC1jb2x1bW4tbGluZQptb3VzZS1saW5lCm1vdXNlLWZpbGwQZmlsZS11cGxvYWQtbGluZRBmaWxlLXVwbG9hZC1maWxsDnBhZ2Utc2VwYXJhdG9yDWNhcm91c2VsLXZpZXcJbGlzdC12aWV3CnRleHQtYmxvY2sMcGVyY2VudC1saW5lDHBlcmNlbnQtZmlsbAt1cGxvYWQtZmlsbAx0LXNoaXJ0LWxpbmUMdC1zaGlydC1maWxsCG51bWJlci0xFmNoZWNrYm94LW11bHRpcGxlLWxpbmUWY2hlY2tib3gtbXVsdGlwbGUtZmlsbBZjb2xsYXBzZS12ZXJ0aWNhbC1saW5lCWFsaWduLXRvcA13aW5kb3ctMi1saW5lDXdpbmRvdy0yLWZpbGwIc2VvLWxpbmUIc2VvLWZpbGwLc2hhZG93LWxpbmULc2hhZG93LWZpbGwNcHV6emxlLTItbGluZQ1wdXp6bGUtMi1maWxsDW1hcmtkb3duLWxpbmUNbWFya2Rvd24tZmlsbAxzdGFja2VkLXZpZXcNZHJvcGRvd24tbGlzdAx0aW1lci0yLWxpbmUMdGltZXItMi1maWxsC3BhcmVudC1saW5lC3BhcmVudC1maWxsEWZ1bmN0aW9uLWFkZC1saW5lEWZ1bmN0aW9uLWFkZC1maWxsEWFycm93LXVwLWJveC1saW5lEWFycm93LXVwLWJveC1maWxsEmxheW91dC1ib3R0b20tZmlsbBFsYXlvdXQtcmlnaHQtZmlsbBFsYXlvdXQtcmlnaHQtbGluZQ9sYXlvdXQtdG9wLWZpbGwPbGF5b3V0LXRvcC1saW5lEGxheW91dC1sZWZ0LWxpbmUQbGF5b3V0LWxlZnQtZmlsbBFsYXlvdXQtdG9wLTItbGluZRFsYXlvdXQtdG9wLTItZmlsbBNsYXlvdXQtcmlnaHQtMi1saW5lE2xheW91dC1yaWdodC0yLWZpbGwUbGF5b3V0LWJvdHRvbS0yLWxpbmUUbGF5b3V0LWJvdHRvbS0yLWZpbGwSbGF5b3V0LWxlZnQtMi1saW5lEmxheW91dC1sZWZ0LTItZmlsbA9sYXlvdXQtcm93LWZpbGwPbGF5b3V0LXJvdy1saW5lCnRhYmxlLWZpbGwKdGFibGUtbGluZRJsYXlvdXQtYm90dG9tLWxpbmUXcGljdHVyZS1pbi1waWN0dXJlLWxpbmUXcGljdHVyZS1pbi1waWN0dXJlLWZpbGwWYXJyb3ctZG93bi1kb3VibGUtbGluZRZhcnJvdy1sZWZ0LWRvdWJsZS1maWxsAAA=\") format(\"woff\")")), "@TRANSITION" to _uM("transition-none" to _uM("property" to "none"), "duration-200" to _uM("duration" to "200ms")))
            }
    }
}
val GenAppClass = CreateVueAppComponent(GenApp::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "app", name = "", inheritAttrs = true, inject = Map(), props = Map(), propsNeedCastKeys = _uA(), emits = Map(), components = Map(), styles = GenApp.styles)
}
, fun(instance): GenApp {
    return GenApp(instance)
}
)
val runBlock6 = run {
    router.beforeEach(fun(to, from, next){
        val user = useStore().user
        if (to.isAuth == true || (if (isNull(to.meta)) {
            true
        } else {
            to.meta["isAuth"] == true
        }
        )) {
            if (!user.isNull()) {
                next()
            } else {
                router.login()
            }
        } else {
            next()
        }
    }
    )
}
open class PassThrough__7 (
    open var className: String? = null,
    open var inner: PassThroughProps? = null,
    open var error: ClIconProps? = null,
    open var loading: PassThroughProps? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClImageClImageClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClImageClImage::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClImageClImage.name, inheritAttrs = GenUniModulesCoolUnixComponentsClImageClImage.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClImageClImage.inject, props = GenUniModulesCoolUnixComponentsClImageClImage.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClImageClImage.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClImageClImage.emits, components = GenUniModulesCoolUnixComponentsClImageClImage.components, styles = GenUniModulesCoolUnixComponentsClImageClImage.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClImageClImage.setup(props as GenUniModulesCoolUnixComponentsClImageClImage)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClImageClImage {
    return GenUniModulesCoolUnixComponentsClImageClImage(instance)
}
)
open class PassThrough__8 (
    open var className: String? = null,
    open var title: PassThroughProps? = null,
    open var back: ClIconProps? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClTopbarClTopbarClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClTopbarClTopbar::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClTopbarClTopbar.name, inheritAttrs = GenUniModulesCoolUnixComponentsClTopbarClTopbar.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClTopbarClTopbar.inject, props = GenUniModulesCoolUnixComponentsClTopbarClTopbar.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClTopbarClTopbar.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClTopbarClTopbar.emits, components = GenUniModulesCoolUnixComponentsClTopbarClTopbar.components, styles = GenUniModulesCoolUnixComponentsClTopbarClTopbar.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClTopbarClTopbar.setup(props as GenUniModulesCoolUnixComponentsClTopbarClTopbar)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClTopbarClTopbar {
    return GenUniModulesCoolUnixComponentsClTopbarClTopbar(instance)
}
)
open class PassThrough__9 (
    open var className: String? = null,
    open var icon: ClIconProps? = null,
    open var placeholder: PassThroughProps? = null,
    open var text: PassThroughProps? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTriggerClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger.name, inheritAttrs = GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger.inject, props = GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger.emits, components = GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger.components, styles = GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger.setup(props as GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger {
    return GenUniModulesCoolUnixComponentsClSelectTriggerClSelectTrigger(instance)
}
)
open class PassThrough__10 (
    open var className: String? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClEmptyClEmptyClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClEmptyClEmpty::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesCoolUnixComponentsClEmptyClEmpty.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClEmptyClEmpty.inject, props = GenUniModulesCoolUnixComponentsClEmptyClEmpty.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClEmptyClEmpty.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClEmptyClEmpty.emits, components = GenUniModulesCoolUnixComponentsClEmptyClEmpty.components, styles = GenUniModulesCoolUnixComponentsClEmptyClEmpty.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClEmptyClEmpty.setup(props as GenUniModulesCoolUnixComponentsClEmptyClEmpty)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClEmptyClEmpty {
    return GenUniModulesCoolUnixComponentsClEmptyClEmpty(instance)
}
)
val GenUniModulesCoolUnixComponentsClPickerViewClPickerViewClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClPickerViewClPickerView::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClPickerViewClPickerView.name, inheritAttrs = GenUniModulesCoolUnixComponentsClPickerViewClPickerView.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClPickerViewClPickerView.inject, props = GenUniModulesCoolUnixComponentsClPickerViewClPickerView.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClPickerViewClPickerView.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClPickerViewClPickerView.emits, components = GenUniModulesCoolUnixComponentsClPickerViewClPickerView.components, styles = GenUniModulesCoolUnixComponentsClPickerViewClPickerView.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClPickerViewClPickerView.setup(props as GenUniModulesCoolUnixComponentsClPickerViewClPickerView)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClPickerViewClPickerView {
    return GenUniModulesCoolUnixComponentsClPickerViewClPickerView(instance)
}
)
open class ClSelectTriggerPassThrough (
    open var className: String? = null,
    open var icon: ClIconProps? = null,
    open var placeholder: PassThroughProps? = null,
    open var text: PassThroughProps? = null,
) : UTSObject()
open class ClPopupHeaderPassThrough (
    open var className: String? = null,
    open var text: PassThroughProps? = null,
) : UTSObject()
open class ClPopupPassThrough (
    open var className: String? = null,
    open var inner: PassThroughProps? = null,
    open var header: ClPopupHeaderPassThrough? = null,
    open var container: PassThroughProps? = null,
    open var mask: PassThroughProps? = null,
    open var draw: PassThroughProps? = null,
) : UTSObject()
open class PassThrough__11 (
    open var trigger: ClSelectTriggerPassThrough? = null,
    open var popup: ClPopupPassThrough? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClSelectClSelectClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClSelectClSelect::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClSelectClSelect.name, inheritAttrs = GenUniModulesCoolUnixComponentsClSelectClSelect.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClSelectClSelect.inject, props = GenUniModulesCoolUnixComponentsClSelectClSelect.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClSelectClSelect.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClSelectClSelect.emits, components = GenUniModulesCoolUnixComponentsClSelectClSelect.components, styles = GenUniModulesCoolUnixComponentsClSelectClSelect.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClSelectClSelect.setup(props as GenUniModulesCoolUnixComponentsClSelectClSelect, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClSelectClSelect {
    return GenUniModulesCoolUnixComponentsClSelectClSelect(instance)
}
)
typealias ClSelectComponentPublicInstance = GenUniModulesCoolUnixComponentsClSelectClSelect
val GenComponentsLocaleSetClass = CreateVueComponent(GenComponentsLocaleSet::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenComponentsLocaleSet.inheritAttrs, inject = GenComponentsLocaleSet.inject, props = GenComponentsLocaleSet.props, propsNeedCastKeys = GenComponentsLocaleSet.propsNeedCastKeys, emits = GenComponentsLocaleSet.emits, components = GenComponentsLocaleSet.components, styles = GenComponentsLocaleSet.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenComponentsLocaleSet.setup(props as GenComponentsLocaleSet, ctx)
    }
    )
}
, fun(instance, renderer): GenComponentsLocaleSet {
    return GenComponentsLocaleSet(instance)
}
)
open class PassThrough__12 (
    open var className: String? = null,
    open var content: PassThroughProps? = null,
    open var wrapper: PassThroughProps? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClFooterClFooterClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClFooterClFooter::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClFooterClFooter.name, inheritAttrs = GenUniModulesCoolUnixComponentsClFooterClFooter.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClFooterClFooter.inject, props = GenUniModulesCoolUnixComponentsClFooterClFooter.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClFooterClFooter.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClFooterClFooter.emits, components = GenUniModulesCoolUnixComponentsClFooterClFooter.components, styles = GenUniModulesCoolUnixComponentsClFooterClFooter.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClFooterClFooter.setup(props as GenUniModulesCoolUnixComponentsClFooterClFooter)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClFooterClFooter {
    return GenUniModulesCoolUnixComponentsClFooterClFooter(instance)
}
)
open class Item (
    @JsonNotNull
    open var icon: String,
    @JsonNotNull
    open var icon2: String,
    @JsonNotNull
    open var pagePath: String,
    open var text: String? = null,
) : UTSObject()
val GenComponentsTabbarClass = CreateVueComponent(GenComponentsTabbar::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenComponentsTabbar.name, inheritAttrs = GenComponentsTabbar.inheritAttrs, inject = GenComponentsTabbar.inject, props = GenComponentsTabbar.props, propsNeedCastKeys = GenComponentsTabbar.propsNeedCastKeys, emits = GenComponentsTabbar.emits, components = GenComponentsTabbar.components, styles = GenComponentsTabbar.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenComponentsTabbar.setup(props as GenComponentsTabbar)
    }
    )
}
, fun(instance, renderer): GenComponentsTabbar {
    return GenComponentsTabbar(instance)
}
)
open class PassThrough__13 (
    open var className: String? = null,
    open var text: PassThroughProps? = null,
) : UTSObject()
open class Scroll (
    @JsonNotNull
    open var left: Number,
    @JsonNotNull
    open var top: Number,
    @JsonNotNull
    open var translateX: Number,
    @JsonNotNull
    open var duration: Number,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ScrollReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ScrollReactiveObject : Scroll, IUTSReactive<Scroll> {
    override var __v_raw: Scroll
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: Scroll, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(left = __v_raw.left, top = __v_raw.top, translateX = __v_raw.translateX, duration = __v_raw.duration) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ScrollReactiveObject {
        return ScrollReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var left: Number
        get() {
            return _tRG(__v_raw, "left", __v_raw.left, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("left")) {
                return
            }
            val oldValue = __v_raw.left
            __v_raw.left = value
            _tRS(__v_raw, "left", oldValue, value)
        }
    override var top: Number
        get() {
            return _tRG(__v_raw, "top", __v_raw.top, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("top")) {
                return
            }
            val oldValue = __v_raw.top
            __v_raw.top = value
            _tRS(__v_raw, "top", oldValue, value)
        }
    override var translateX: Number
        get() {
            return _tRG(__v_raw, "translateX", __v_raw.translateX, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("translateX")) {
                return
            }
            val oldValue = __v_raw.translateX
            __v_raw.translateX = value
            _tRS(__v_raw, "translateX", oldValue, value)
        }
    override var duration: Number
        get() {
            return _tRG(__v_raw, "duration", __v_raw.duration, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("duration")) {
                return
            }
            val oldValue = __v_raw.duration
            __v_raw.duration = value
            _tRS(__v_raw, "duration", oldValue, value)
        }
}
open class GenUniModulesCoolUnixComponentsClNoticebarClNoticebarSlotDataText (
    @JsonNotNull
    open var item: String,
) : SlotData()
val GenUniModulesCoolUnixComponentsClNoticebarClNoticebarClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClNoticebarClNoticebar::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClNoticebarClNoticebar.name, inheritAttrs = GenUniModulesCoolUnixComponentsClNoticebarClNoticebar.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClNoticebarClNoticebar.inject, props = GenUniModulesCoolUnixComponentsClNoticebarClNoticebar.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClNoticebarClNoticebar.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClNoticebarClNoticebar.emits, components = GenUniModulesCoolUnixComponentsClNoticebarClNoticebar.components, styles = GenUniModulesCoolUnixComponentsClNoticebarClNoticebar.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClNoticebarClNoticebar.setup(props as GenUniModulesCoolUnixComponentsClNoticebarClNoticebar)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClNoticebarClNoticebar {
    return GenUniModulesCoolUnixComponentsClNoticebarClNoticebar(instance)
}
)
val GenComponentsMsgNotifierClass = CreateVueComponent(GenComponentsMsgNotifier::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenComponentsMsgNotifier.name, inheritAttrs = GenComponentsMsgNotifier.inheritAttrs, inject = GenComponentsMsgNotifier.inject, props = GenComponentsMsgNotifier.props, propsNeedCastKeys = GenComponentsMsgNotifier.propsNeedCastKeys, emits = GenComponentsMsgNotifier.emits, components = GenComponentsMsgNotifier.components, styles = GenComponentsMsgNotifier.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenComponentsMsgNotifier.setup(props as GenComponentsMsgNotifier)
    }
    )
}
, fun(instance, renderer): GenComponentsMsgNotifier {
    return GenComponentsMsgNotifier(instance)
}
)
interface echartsProps {
    var webviewStyles: UTSJSONObject?
    var lStyle: Any?
    var isDisableScroll: Boolean
    var isClickable: Boolean
    var enableHover: Boolean
    var beforeDelay: Number
    var landscape: Boolean
    var autoHideTooltip: Boolean
}
typealias EchartsEventHandler = (event: UTSJSONObject) -> Unit
open class Echarts {
    open var options: UTSJSONObject = UTSJSONObject()
    open lateinit var context: UniWebViewElement
    open var eventMap: Map<String, EchartsEventHandler> = Map()
    private var temp: UTSArray<UTSJSONObject> = _uA()
    constructor(context: UniWebViewElement){
        this.context = context
        this.init()
    }
    open fun init() {
        this.context.evalJS("init(null, null, " + JSON.stringify(UTSJSONObject()) + ")")
        this.context.addEventListener("message", fun(e: UniWebViewMessageEvent){
            val detail = e.detail.data[0]
            val file = detail.getString("file")
            val data = detail.get("data")
            val key = detail.getString("event")
            val options = if (UTSAndroid.`typeof`(data) == "object") {
                (data as UTSJSONObject).getJSON("options")
            } else {
                null
            }
            val event = if (UTSAndroid.`typeof`(data) == "object") {
                (data as UTSJSONObject).getString("event")
            } else {
                null
            }
            if (key == "log" && data != null) {
                console.log(data)
            }
            if (event != null && options != null) {
                this.dispatchAction(event.replace(UTSRegExp("\"", "g"), ""), options)
            }
            if (file != null) {
                while(this.temp.length > 0){
                    val opt = this.temp.pop()
                    val success = opt?.get("success")
                    if (UTSAndroid.`typeof`(success) == "function") {
                        success as (res: UTSJSONObject) -> Unit
                        success(object : UTSJSONObject() {
                            var tempFilePath = file
                        })
                    }
                }
            }
        }
        )
    }
    open fun setOption(option: UTSJSONObject) {
        this.options = option
        this.context.evalJS("setOption(" + JSON.stringify(_uA(
            option
        )) + ")")
    }
    open fun setOption(option: UTSJSONObject, notMerge: Boolean = false, lazyUpdate: Boolean = false) {
        this.options = option
        this.context.evalJS("setOption(" + JSON.stringify(_uA(
            option,
            notMerge,
            lazyUpdate
        )) + ")")
    }
    open fun setOption(option: UTSJSONObject, notMerge: UTSJSONObject) {
        this.options = option
        this.context.evalJS("setOption(" + JSON.stringify(_uA(
            option,
            notMerge
        )) + ")")
    }
    open fun getOption(): UTSJSONObject {
        return this.options
    }
    open fun showLoading() {
        this.context.evalJS("showLoading(" + JSON.stringify(_uA<Any>()) + ")")
    }
    open fun showLoading(type: String, opts: UTSJSONObject) {
        this.context.evalJS("showLoading(" + JSON.stringify(_uA(
            type,
            opts
        )) + ")")
    }
    open fun hideLoading() {
        this.context.evalJS("hideLoading()")
    }
    open fun clear() {
        this.context.evalJS("clear()")
    }
    open fun dispose() {
        this.context.evalJS("dispose()")
    }
    open fun resize(size: UTSJSONObject) {
        setTimeout(fun(){
            this.context.evalJS("resize(" + JSON.stringify(size) + ")")
        }
        , 0)
    }
    open fun resize() {
        setTimeout(fun(){
            this.context.evalJS("resize()")
        }
        , 10)
    }
    open fun on(type: String, query: Any, callback: EchartsEventHandler) {
        val key = "" + type + JSON.stringify(query)
        if (UTSAndroid.`typeof`(callback) == "function") {
            this.eventMap.set(key, callback)
        }
        this.context.evalJS("on(" + JSON.stringify(_uA(
            type,
            query
        )) + ")")
        console.warn("uvue 暂不支持事件")
    }
    open fun on(type: String, callback: EchartsEventHandler) {
        val key = "" + type
        if (UTSAndroid.`typeof`(callback) == "function") {
            this.eventMap.set(key, callback)
        }
        this.context.evalJS("on(" + JSON.stringify(_uA(
            type
        )) + ")")
        console.warn("uvue 暂不支持事件")
    }
    open fun dispatchAction(type: String, options: UTSJSONObject) {
        val handler = this.eventMap.get(type)
        if (handler != null) {
            handler(options)
        }
    }
    open fun canvasToTempFilePath(opt: UTSJSONObject) {
        this.context.evalJS("canvasToTempFilePath(" + JSON.stringify(opt) + ")")
        this.temp.push(opt)
    }
    open fun isDisposed(): Boolean {
        return false
    }
}
typealias EChartsResolveCallback = (value: Echarts) -> Unit
val GenUniModulesLimeEchartComponentsLEchartLEchartClass = CreateVueComponent(GenUniModulesLimeEchartComponentsLEchartLEchart::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeEchartComponentsLEchartLEchart.inheritAttrs, inject = GenUniModulesLimeEchartComponentsLEchartLEchart.inject, props = GenUniModulesLimeEchartComponentsLEchartLEchart.props, propsNeedCastKeys = GenUniModulesLimeEchartComponentsLEchartLEchart.propsNeedCastKeys, emits = GenUniModulesLimeEchartComponentsLEchartLEchart.emits, components = GenUniModulesLimeEchartComponentsLEchartLEchart.components, styles = GenUniModulesLimeEchartComponentsLEchartLEchart.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesLimeEchartComponentsLEchartLEchart.setup(props as GenUniModulesLimeEchartComponentsLEchartLEchart, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeEchartComponentsLEchartLEchart {
    return GenUniModulesLimeEchartComponentsLEchartLEchart(instance)
}
)
typealias LEchartComponentPublicInstance = GenUniModulesLimeEchartComponentsLEchartLEchart
val defaultNode = ClTreeItem(id = -1, label = t__1("全部场景"), isExpand = true)
open class WorkshopTree {
    open var selectNode = ref<ClTreeItem>(defaultNode)
    open var tree = ref(_uA<ClTreeItem>())
    open var workshopLoading: Boolean = false
    open var isNeedLoading: Boolean = true
    constructor(){
        this.workshopLoading = false
        this.isNeedLoading = true
    }
    open fun loadWorkshopTree() {
        if (this.workshopLoading) {
            return
        }
        this.workshopLoading = true
        try {
            if (!this.isNeedLoading) {
                return
            }
            request(RequestOptions__1(url = apiPath["workshop_tree"] as String, method = "GET")).then(fun(res){
                this.isNeedLoading = false
                val parent = defaultNode
                if (res == null) {
                    this.tree.value = _uA(
                        parent
                    )
                    return
                }
                parent.isChecked = this.selectNode.value.id === -1
                val r = parseData<UTSArray<WorkshopTreeNode>>(res)
                if (r != null) {
                    parent.children = this.convertWorkshopTree(r)
                }
                this.tree.value = _uA(
                    parent
                )
            }
            )
        }
         finally {
            this.workshopLoading = false
        }
    }
    open fun convertWorkshopTree(nodes: UTSArray<WorkshopTreeNode>): UTSArray<ClTreeItem> {
        return nodes.map(fun(node): ClTreeItem {
            return (ClTreeItem(id = node.selfCode, label = node.name, children = if (node.children == null) {
                null
            } else {
                this.convertWorkshopTree(node.children!!)
            }
            ))
        }
        )
    }
    open fun getCheckedNodes(): UTSArray<ClTreeItem> {
        val result: UTSArray<ClTreeItem> = _uA()
        fun collectCheckedKeys(nodes: UTSArray<ClTreeItem>): Unit {
            run {
                var i: Number = 0
                while(i < nodes.length){
                    val node = nodes[i]
                    if (node.isChecked == true) {
                        result.push(node)
                    }
                    if (node.children != null) {
                        collectCheckedKeys(node.children!!)
                    }
                    i++
                }
            }
        }
        collectCheckedKeys(this.tree.value)
        return result
    }
    open fun selectConfirm() {
        var nodes: UTSArray<ClTreeItem> = this.getCheckedNodes()
        var node: ClTreeItem? = null
        if (nodes.length > 0) {
            node = nodes[0]
            if (node.id == -1) {
                node = null
            }
        }
        if (node == null) {
            this.selectNode.value = defaultNode
        } else {
            this.selectNode.value = node
        }
    }
}
val workshopTree = WorkshopTree()
val GenPagesIndexComponentsEchartEquipCardClass = CreateVueComponent(GenPagesIndexComponentsEchartEquipCard::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenPagesIndexComponentsEchartEquipCard.name, inheritAttrs = GenPagesIndexComponentsEchartEquipCard.inheritAttrs, inject = GenPagesIndexComponentsEchartEquipCard.inject, props = GenPagesIndexComponentsEchartEquipCard.props, propsNeedCastKeys = GenPagesIndexComponentsEchartEquipCard.propsNeedCastKeys, emits = GenPagesIndexComponentsEchartEquipCard.emits, components = GenPagesIndexComponentsEchartEquipCard.components, styles = GenPagesIndexComponentsEchartEquipCard.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesIndexComponentsEchartEquipCard.setup(props as GenPagesIndexComponentsEchartEquipCard)
    }
    )
}
, fun(instance, renderer): GenPagesIndexComponentsEchartEquipCard {
    return GenPagesIndexComponentsEchartEquipCard(instance)
}
)
val GenPagesIndexHomeClass = CreateVueComponent(GenPagesIndexHome::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexHome.inheritAttrs, inject = GenPagesIndexHome.inject, props = GenPagesIndexHome.props, propsNeedCastKeys = GenPagesIndexHome.propsNeedCastKeys, emits = GenPagesIndexHome.emits, components = GenPagesIndexHome.components, styles = GenPagesIndexHome.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesIndexHome.setup(props as GenPagesIndexHome)
    }
    )
}
, fun(instance, renderer): GenPagesIndexHome {
    return GenPagesIndexHome(instance, renderer)
}
)
open class Badge (
    @JsonNotNull
    open var type: String,
    @JsonNotNull
    open var text: String,
) : UTSObject()
fun parseType(e: Equip?): Badge {
    if (e != null) {
        if (e.onlineState == 0) {
            return Badge(type = "offline", text = t__1("离线"))
        }
        if (e.onlineState == 1 && e.alarmState == 1) {
            return Badge(type = "alarm", text = t__1("报警"))
        }
        if (e.onlineState == 1 && e.alarmState == 0 && e.runState == 1) {
            return Badge(type = "run", text = t__1("运行"))
        }
        if (e.onlineState == 1 && e.alarmState == 0 && e.runState == 0) {
            return Badge(type = "stopped", text = t__1("停止"))
        }
    }
    return Badge(type = "offline", text = t__1("离线"))
}
fun equipImage(equip: Equip): String {
    return "/static/png/equip_type" + equip.type + ".png"
}
val GenPagesIndexComponentsEquipBadgeClass = CreateVueComponent(GenPagesIndexComponentsEquipBadge::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenPagesIndexComponentsEquipBadge.name, inheritAttrs = GenPagesIndexComponentsEquipBadge.inheritAttrs, inject = GenPagesIndexComponentsEquipBadge.inject, props = GenPagesIndexComponentsEquipBadge.props, propsNeedCastKeys = GenPagesIndexComponentsEquipBadge.propsNeedCastKeys, emits = GenPagesIndexComponentsEquipBadge.emits, components = GenPagesIndexComponentsEquipBadge.components, styles = GenPagesIndexComponentsEquipBadge.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesIndexComponentsEquipBadge.setup(props as GenPagesIndexComponentsEquipBadge)
    }
    )
}
, fun(instance, renderer): GenPagesIndexComponentsEquipBadge {
    return GenPagesIndexComponentsEquipBadge(instance)
}
)
val GenPagesIndexEquipClass = CreateVueComponent(GenPagesIndexEquip::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexEquip.inheritAttrs, inject = GenPagesIndexEquip.inject, props = GenPagesIndexEquip.props, propsNeedCastKeys = GenPagesIndexEquip.propsNeedCastKeys, emits = GenPagesIndexEquip.emits, components = GenPagesIndexEquip.components, styles = GenPagesIndexEquip.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesIndexEquip.setup(props as GenPagesIndexEquip)
    }
    )
}
, fun(instance, renderer): GenPagesIndexEquip {
    return GenPagesIndexEquip(instance, renderer)
}
)
val GenPagesIndexWorkClass = CreateVueComponent(GenPagesIndexWork::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexWork.inheritAttrs, inject = GenPagesIndexWork.inject, props = GenPagesIndexWork.props, propsNeedCastKeys = GenPagesIndexWork.propsNeedCastKeys, emits = GenPagesIndexWork.emits, components = GenPagesIndexWork.components, styles = GenPagesIndexWork.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesIndexWork.setup(props as GenPagesIndexWork)
    }
    )
}
, fun(instance, renderer): GenPagesIndexWork {
    return GenPagesIndexWork(instance, renderer)
}
)
open class MessageSetPayload (
    open var status: Number? = null,
) : UTSObject()
val GenPagesIndexComponentsMessageSetClass = CreateVueComponent(GenPagesIndexComponentsMessageSet::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenPagesIndexComponentsMessageSet.inheritAttrs, inject = GenPagesIndexComponentsMessageSet.inject, props = GenPagesIndexComponentsMessageSet.props, propsNeedCastKeys = GenPagesIndexComponentsMessageSet.propsNeedCastKeys, emits = GenPagesIndexComponentsMessageSet.emits, components = GenPagesIndexComponentsMessageSet.components, styles = GenPagesIndexComponentsMessageSet.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenPagesIndexComponentsMessageSet.setup(props as GenPagesIndexComponentsMessageSet, ctx)
    }
    )
}
, fun(instance, renderer): GenPagesIndexComponentsMessageSet {
    return GenPagesIndexComponentsMessageSet(instance)
}
)
val GenPagesIndexMessageClass = CreateVueComponent(GenPagesIndexMessage::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexMessage.inheritAttrs, inject = GenPagesIndexMessage.inject, props = GenPagesIndexMessage.props, propsNeedCastKeys = GenPagesIndexMessage.propsNeedCastKeys, emits = GenPagesIndexMessage.emits, components = GenPagesIndexMessage.components, styles = GenPagesIndexMessage.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesIndexMessage.setup(props as GenPagesIndexMessage)
    }
    )
}
, fun(instance, renderer): GenPagesIndexMessage {
    return GenPagesIndexMessage(instance, renderer)
}
)
open class PassThrough__14 (
    open var className: String? = null,
    open var icon: ClIconProps? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClAvatarClAvatarClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClAvatarClAvatar::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClAvatarClAvatar.name, inheritAttrs = GenUniModulesCoolUnixComponentsClAvatarClAvatar.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClAvatarClAvatar.inject, props = GenUniModulesCoolUnixComponentsClAvatarClAvatar.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClAvatarClAvatar.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClAvatarClAvatar.emits, components = GenUniModulesCoolUnixComponentsClAvatarClAvatar.components, styles = GenUniModulesCoolUnixComponentsClAvatarClAvatar.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClAvatarClAvatar.setup(props as GenUniModulesCoolUnixComponentsClAvatarClAvatar)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClAvatarClAvatar {
    return GenUniModulesCoolUnixComponentsClAvatarClAvatar(instance)
}
)
open class PassThrough__15 (
    open var className: String? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClCollapseClCollapseClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClCollapseClCollapse::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClCollapseClCollapse.name, inheritAttrs = GenUniModulesCoolUnixComponentsClCollapseClCollapse.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClCollapseClCollapse.inject, props = GenUniModulesCoolUnixComponentsClCollapseClCollapse.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClCollapseClCollapse.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClCollapseClCollapse.emits, components = GenUniModulesCoolUnixComponentsClCollapseClCollapse.components, styles = GenUniModulesCoolUnixComponentsClCollapseClCollapse.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClCollapseClCollapse.setup(props as GenUniModulesCoolUnixComponentsClCollapseClCollapse, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClCollapseClCollapse {
    return GenUniModulesCoolUnixComponentsClCollapseClCollapse(instance)
}
)
open class ClImagePassThrough (
    open var className: String? = null,
    open var inner: PassThroughProps? = null,
    open var error: ClIconProps? = null,
    open var loading: PassThroughProps? = null,
) : UTSObject()
open class ClImageProps (
    open var className: String? = null,
    open var pt: ClImagePassThrough? = null,
    open var src: String? = null,
    open var mode: String? = null,
    open var border: Boolean? = null,
    open var preview: Boolean? = null,
    open var previewList: UTSArray<String>? = null,
    open var height: Any? = null,
    open var width: Any? = null,
    open var showLoading: Boolean? = null,
    open var lazyLoad: Boolean? = null,
    open var fadeShow: Boolean? = null,
    open var webp: Boolean? = null,
    open var showMenuByLongpress: Boolean? = null,
) : UTSObject()
open class PassThrough__16 (
    open var className: String? = null,
    open var wrapper: PassThroughProps? = null,
    open var inner: PassThroughProps? = null,
    open var label: PassThroughProps? = null,
    open var content: PassThroughProps? = null,
    open var icon: ClIconProps? = null,
    open var image: ClImageProps? = null,
    open var collapse: PassThroughProps? = null,
) : UTSObject()
open class Swipe__1 (
    @JsonNotNull
    open var width: Number,
    @JsonNotNull
    open var maxX: Number,
    @JsonNotNull
    open var startX: Number,
    @JsonNotNull
    open var endX: Number,
    @JsonNotNull
    open var offsetX: Number,
    @JsonNotNull
    open var direction: String,
    @JsonNotNull
    open var moveDirection: String,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return Swipe__1ReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class Swipe__1ReactiveObject : Swipe__1, IUTSReactive<Swipe__1> {
    override var __v_raw: Swipe__1
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: Swipe__1, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(width = __v_raw.width, maxX = __v_raw.maxX, startX = __v_raw.startX, endX = __v_raw.endX, offsetX = __v_raw.offsetX, direction = __v_raw.direction, moveDirection = __v_raw.moveDirection) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): Swipe__1ReactiveObject {
        return Swipe__1ReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var width: Number
        get() {
            return _tRG(__v_raw, "width", __v_raw.width, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("width")) {
                return
            }
            val oldValue = __v_raw.width
            __v_raw.width = value
            _tRS(__v_raw, "width", oldValue, value)
        }
    override var maxX: Number
        get() {
            return _tRG(__v_raw, "maxX", __v_raw.maxX, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("maxX")) {
                return
            }
            val oldValue = __v_raw.maxX
            __v_raw.maxX = value
            _tRS(__v_raw, "maxX", oldValue, value)
        }
    override var startX: Number
        get() {
            return _tRG(__v_raw, "startX", __v_raw.startX, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("startX")) {
                return
            }
            val oldValue = __v_raw.startX
            __v_raw.startX = value
            _tRS(__v_raw, "startX", oldValue, value)
        }
    override var endX: Number
        get() {
            return _tRG(__v_raw, "endX", __v_raw.endX, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("endX")) {
                return
            }
            val oldValue = __v_raw.endX
            __v_raw.endX = value
            _tRS(__v_raw, "endX", oldValue, value)
        }
    override var offsetX: Number
        get() {
            return _tRG(__v_raw, "offsetX", __v_raw.offsetX, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("offsetX")) {
                return
            }
            val oldValue = __v_raw.offsetX
            __v_raw.offsetX = value
            _tRS(__v_raw, "offsetX", oldValue, value)
        }
    override var direction: String
        get() {
            return _tRG(__v_raw, "direction", __v_raw.direction, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("direction")) {
                return
            }
            val oldValue = __v_raw.direction
            __v_raw.direction = value
            _tRS(__v_raw, "direction", oldValue, value)
        }
    override var moveDirection: String
        get() {
            return _tRG(__v_raw, "moveDirection", __v_raw.moveDirection, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("moveDirection")) {
                return
            }
            val oldValue = __v_raw.moveDirection
            __v_raw.moveDirection = value
            _tRS(__v_raw, "moveDirection", oldValue, value)
        }
}
val GenUniModulesCoolUnixComponentsClListItemClListItemClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClListItemClListItem::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClListItemClListItem.name, inheritAttrs = GenUniModulesCoolUnixComponentsClListItemClListItem.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClListItemClListItem.inject, props = GenUniModulesCoolUnixComponentsClListItemClListItem.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClListItemClListItem.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClListItemClListItem.emits, components = GenUniModulesCoolUnixComponentsClListItemClListItem.components, styles = GenUniModulesCoolUnixComponentsClListItemClListItem.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClListItemClListItem.setup(props as GenUniModulesCoolUnixComponentsClListItemClListItem, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClListItemClListItem {
    return GenUniModulesCoolUnixComponentsClListItemClListItem(instance)
}
)
open class ClListItemPassThrough (
    open var className: String? = null,
    open var wrapper: PassThroughProps? = null,
    open var inner: PassThroughProps? = null,
    open var label: PassThroughProps? = null,
    open var content: PassThroughProps? = null,
    open var icon: ClIconProps? = null,
    open var image: ClImageProps? = null,
    open var collapse: PassThroughProps? = null,
) : UTSObject()
open class PassThrough__17 (
    open var className: String? = null,
    open var list: PassThroughProps? = null,
    open var item: ClListItemPassThrough? = null,
) : UTSObject()
open class GenUniModulesCoolUnixComponentsClListClListSlotDataItem (
    @JsonNotNull
    open var item: ClListItem,
) : SlotData()
val GenUniModulesCoolUnixComponentsClListClListClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClListClList::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClListClList.name, inheritAttrs = GenUniModulesCoolUnixComponentsClListClList.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClListClList.inject, props = GenUniModulesCoolUnixComponentsClListClList.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClListClList.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClListClList.emits, components = GenUniModulesCoolUnixComponentsClListClList.components, styles = GenUniModulesCoolUnixComponentsClListClList.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClListClList.setup(props as GenUniModulesCoolUnixComponentsClListClList)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClListClList {
    return GenUniModulesCoolUnixComponentsClListClList(instance)
}
)
val GenPagesIndexMyClass = CreateVueComponent(GenPagesIndexMy::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexMy.inheritAttrs, inject = GenPagesIndexMy.inject, props = GenPagesIndexMy.props, propsNeedCastKeys = GenPagesIndexMy.propsNeedCastKeys, emits = GenPagesIndexMy.emits, components = GenPagesIndexMy.components, styles = GenPagesIndexMy.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesIndexMy.setup(props as GenPagesIndexMy)
    }
    )
}
, fun(instance, renderer): GenPagesIndexMy {
    return GenPagesIndexMy(instance, renderer)
}
)
val GenPagesSetIndexClass = CreateVueComponent(GenPagesSetIndex::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesSetIndex.inheritAttrs, inject = GenPagesSetIndex.inject, props = GenPagesSetIndex.props, propsNeedCastKeys = GenPagesSetIndex.propsNeedCastKeys, emits = GenPagesSetIndex.emits, components = GenPagesSetIndex.components, styles = GenPagesSetIndex.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesSetIndex.setup(props as GenPagesSetIndex)
    }
    )
}
, fun(instance, renderer): GenPagesSetIndex {
    return GenPagesSetIndex(instance, renderer)
}
)
val GenComponentsSizeSetClass = CreateVueComponent(GenComponentsSizeSet::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenComponentsSizeSet.name, inheritAttrs = GenComponentsSizeSet.inheritAttrs, inject = GenComponentsSizeSet.inject, props = GenComponentsSizeSet.props, propsNeedCastKeys = GenComponentsSizeSet.propsNeedCastKeys, emits = GenComponentsSizeSet.emits, components = GenComponentsSizeSet.components, styles = GenComponentsSizeSet.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenComponentsSizeSet.setup(props as GenComponentsSizeSet, ctx)
    }
    )
}
, fun(instance, renderer): GenComponentsSizeSet {
    return GenComponentsSizeSet(instance)
}
)
val GenPagesSetGeneralClass = CreateVueComponent(GenPagesSetGeneral::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesSetGeneral.inheritAttrs, inject = GenPagesSetGeneral.inject, props = GenPagesSetGeneral.props, propsNeedCastKeys = GenPagesSetGeneral.propsNeedCastKeys, emits = GenPagesSetGeneral.emits, components = GenPagesSetGeneral.components, styles = GenPagesSetGeneral.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesSetGeneral.setup(props as GenPagesSetGeneral)
    }
    )
}
, fun(instance, renderer): GenPagesSetGeneral {
    return GenPagesSetGeneral(instance, renderer)
}
)
open class PassThrough__18 (
    open var className: String? = null,
    open var track: PassThroughProps? = null,
    open var thumb: PassThroughProps? = null,
    open var label: PassThroughProps? = null,
    open var loading: PassThroughProps? = null,
) : UTSObject()
open class Rect (
    @JsonNotNull
    open var height: String,
    @JsonNotNull
    open var width: String,
    @JsonNotNull
    open var size: String,
    @JsonNotNull
    open var left: String,
    @JsonNotNull
    open var translateX: String,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClSwitchClSwitchClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClSwitchClSwitch::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClSwitchClSwitch.name, inheritAttrs = GenUniModulesCoolUnixComponentsClSwitchClSwitch.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClSwitchClSwitch.inject, props = GenUniModulesCoolUnixComponentsClSwitchClSwitch.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClSwitchClSwitch.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClSwitchClSwitch.emits, components = GenUniModulesCoolUnixComponentsClSwitchClSwitch.components, styles = GenUniModulesCoolUnixComponentsClSwitchClSwitch.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClSwitchClSwitch.setup(props as GenUniModulesCoolUnixComponentsClSwitchClSwitch)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClSwitchClSwitch {
    return GenUniModulesCoolUnixComponentsClSwitchClSwitch(instance)
}
)
val GenPagesSetNoticeClass = CreateVueComponent(GenPagesSetNotice::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesSetNotice.inheritAttrs, inject = GenPagesSetNotice.inject, props = GenPagesSetNotice.props, propsNeedCastKeys = GenPagesSetNotice.propsNeedCastKeys, emits = GenPagesSetNotice.emits, components = GenPagesSetNotice.components, styles = GenPagesSetNotice.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesSetNotice.setup(props as GenPagesSetNotice)
    }
    )
}
, fun(instance, renderer): GenPagesSetNotice {
    return GenPagesSetNotice(instance, renderer)
}
)
val GenPagesSetAboutClass = CreateVueComponent(GenPagesSetAbout::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesSetAbout.inheritAttrs, inject = GenPagesSetAbout.inject, props = GenPagesSetAbout.props, propsNeedCastKeys = GenPagesSetAbout.propsNeedCastKeys, emits = GenPagesSetAbout.emits, components = GenPagesSetAbout.components, styles = GenPagesSetAbout.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesSetAbout.setup(props as GenPagesSetAbout)
    }
    )
}
, fun(instance, renderer): GenPagesSetAbout {
    return GenPagesSetAbout(instance, renderer)
}
)
val GenPagesSetCsClass = CreateVueComponent(GenPagesSetCs::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesSetCs.inheritAttrs, inject = GenPagesSetCs.inject, props = GenPagesSetCs.props, propsNeedCastKeys = GenPagesSetCs.propsNeedCastKeys, emits = GenPagesSetCs.emits, components = GenPagesSetCs.components, styles = GenPagesSetCs.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesSetCs.setup(props as GenPagesSetCs)
    }
    )
}
, fun(instance, renderer): GenPagesSetCs {
    return GenPagesSetCs(instance, renderer)
}
)
open class LoginForm (
    @JsonNotNull
    open var username: String,
    @JsonNotNull
    open var password: String,
    @JsonNotNull
    open var captcha: String,
) : UTSReactiveObject() {
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return LoginFormReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class LoginFormReactiveObject : LoginForm, IUTSReactive<LoginForm> {
    override var __v_raw: LoginForm
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: LoginForm, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(username = __v_raw.username, password = __v_raw.password, captcha = __v_raw.captcha) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): LoginFormReactiveObject {
        return LoginFormReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var username: String
        get() {
            return _tRG(__v_raw, "username", __v_raw.username, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("username")) {
                return
            }
            val oldValue = __v_raw.username
            __v_raw.username = value
            _tRS(__v_raw, "username", oldValue, value)
        }
    override var password: String
        get() {
            return _tRG(__v_raw, "password", __v_raw.password, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("password")) {
                return
            }
            val oldValue = __v_raw.password
            __v_raw.password = value
            _tRS(__v_raw, "password", oldValue, value)
        }
    override var captcha: String
        get() {
            return _tRG(__v_raw, "captcha", __v_raw.captcha, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("captcha")) {
                return
            }
            val oldValue = __v_raw.captcha
            __v_raw.captcha = value
            _tRS(__v_raw, "captcha", oldValue, value)
        }
}
open class PassThrough__19 (
    open var className: String? = null,
    open var inner: PassThroughProps? = null,
    open var prefixIcon: ClIconProps? = null,
    open var suffixIcon: ClIconProps? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClInputClInputClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClInputClInput::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClInputClInput.name, inheritAttrs = GenUniModulesCoolUnixComponentsClInputClInput.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClInputClInput.inject, props = GenUniModulesCoolUnixComponentsClInputClInput.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClInputClInput.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClInputClInput.emits, components = GenUniModulesCoolUnixComponentsClInputClInput.components, styles = GenUniModulesCoolUnixComponentsClInputClInput.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClInputClInput.setup(props as GenUniModulesCoolUnixComponentsClInputClInput, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClInputClInput {
    return GenUniModulesCoolUnixComponentsClInputClInput(instance)
}
)
fun base64Encode(str: String): String {
    return btoa(str)
}
val GenPagesUserLoginAccountClass = CreateVueComponent(GenPagesUserLoginAccount::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenPagesUserLoginAccount.inheritAttrs, inject = GenPagesUserLoginAccount.inject, props = GenPagesUserLoginAccount.props, propsNeedCastKeys = GenPagesUserLoginAccount.propsNeedCastKeys, emits = GenPagesUserLoginAccount.emits, components = GenPagesUserLoginAccount.components, styles = GenPagesUserLoginAccount.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesUserLoginAccount.setup(props as GenPagesUserLoginAccount)
    }
    )
}
, fun(instance, renderer): GenPagesUserLoginAccount {
    return GenPagesUserLoginAccount(instance)
}
)
val GenPagesUserLoginClass = CreateVueComponent(GenPagesUserLogin::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesUserLogin.inheritAttrs, inject = GenPagesUserLogin.inject, props = GenPagesUserLogin.props, propsNeedCastKeys = GenPagesUserLogin.propsNeedCastKeys, emits = GenPagesUserLogin.emits, components = GenPagesUserLogin.components, styles = GenPagesUserLogin.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesUserLogin.setup(props as GenPagesUserLogin)
    }
    )
}
, fun(instance, renderer): GenPagesUserLogin {
    return GenPagesUserLogin(instance, renderer)
}
)
val GenPagesEquipEquipDetailClass = CreateVueComponent(GenPagesEquipEquipDetail::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesEquipEquipDetail.inheritAttrs, inject = GenPagesEquipEquipDetail.inject, props = GenPagesEquipEquipDetail.props, propsNeedCastKeys = GenPagesEquipEquipDetail.propsNeedCastKeys, emits = GenPagesEquipEquipDetail.emits, components = GenPagesEquipEquipDetail.components, styles = GenPagesEquipEquipDetail.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesEquipEquipDetail.setup(props as GenPagesEquipEquipDetail)
    }
    )
}
, fun(instance, renderer): GenPagesEquipEquipDetail {
    return GenPagesEquipEquipDetail(instance, renderer)
}
)
open class PassThrough__20 (
    open var className: String? = null,
) : UTSObject()
open class PassThrough__21 (
    open var item: PassThroughProps? = null,
    open var itemChecked: PassThroughProps? = null,
    open var itemWrapper: PassThroughProps? = null,
    open var expand: PassThroughProps? = null,
    open var expandIcon: ClIconProps? = null,
    open var checkbox: PassThroughProps? = null,
    open var checkedIcon: ClIconProps? = null,
    open var halfCheckedIcon: ClIconProps? = null,
    open var uncheckedIcon: ClIconProps? = null,
    open var label: PassThroughProps? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClTreeItemClTreeItemClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClTreeItemClTreeItem::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClTreeItemClTreeItem.name, inheritAttrs = GenUniModulesCoolUnixComponentsClTreeItemClTreeItem.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClTreeItemClTreeItem.inject, props = GenUniModulesCoolUnixComponentsClTreeItemClTreeItem.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClTreeItemClTreeItem.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClTreeItemClTreeItem.emits, components = GenUniModulesCoolUnixComponentsClTreeItemClTreeItem.components, styles = GenUniModulesCoolUnixComponentsClTreeItemClTreeItem.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClTreeItemClTreeItem.setup(props as GenUniModulesCoolUnixComponentsClTreeItemClTreeItem)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClTreeItemClTreeItem {
    return GenUniModulesCoolUnixComponentsClTreeItemClTreeItem(instance)
}
)
val GenUniModulesCoolUnixComponentsClTreeClTreeClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClTreeClTree::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClTreeClTree.name, inheritAttrs = GenUniModulesCoolUnixComponentsClTreeClTree.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClTreeClTree.inject, props = GenUniModulesCoolUnixComponentsClTreeClTree.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClTreeClTree.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClTreeClTree.emits, components = GenUniModulesCoolUnixComponentsClTreeClTree.components, styles = GenUniModulesCoolUnixComponentsClTreeClTree.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClTreeClTree.setup(props as GenUniModulesCoolUnixComponentsClTreeClTree, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClTreeClTree {
    return GenUniModulesCoolUnixComponentsClTreeClTree(instance)
}
)
typealias ClTreeComponentPublicInstance = GenUniModulesCoolUnixComponentsClTreeClTree
val GenPagesEquipWorkshopTreeClass = CreateVueComponent(GenPagesEquipWorkshopTree::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesEquipWorkshopTree.inheritAttrs, inject = GenPagesEquipWorkshopTree.inject, props = GenPagesEquipWorkshopTree.props, propsNeedCastKeys = GenPagesEquipWorkshopTree.propsNeedCastKeys, emits = GenPagesEquipWorkshopTree.emits, components = GenPagesEquipWorkshopTree.components, styles = GenPagesEquipWorkshopTree.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesEquipWorkshopTree.setup(props as GenPagesEquipWorkshopTree)
    }
    )
}
, fun(instance, renderer): GenPagesEquipWorkshopTree {
    return GenPagesEquipWorkshopTree(instance, renderer)
}
)
open class ClTextPassThrough (
    open var className: String? = null,
) : UTSObject()
open class PassThrough__22 (
    open var className: String? = null,
    open var text: ClTextPassThrough? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClTagClTagClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClTagClTag::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClTagClTag.name, inheritAttrs = GenUniModulesCoolUnixComponentsClTagClTag.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClTagClTag.inject, props = GenUniModulesCoolUnixComponentsClTagClTag.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClTagClTag.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClTagClTag.emits, components = GenUniModulesCoolUnixComponentsClTagClTag.components, styles = GenUniModulesCoolUnixComponentsClTagClTag.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesCoolUnixComponentsClTagClTag.setup(props as GenUniModulesCoolUnixComponentsClTagClTag)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClTagClTag {
    return GenUniModulesCoolUnixComponentsClTagClTag(instance)
}
)
open class PassThrough__23 (
    open var trigger: ClSelectTriggerPassThrough? = null,
    open var popup: ClPopupPassThrough? = null,
) : UTSObject()
val GenUniModulesCoolUnixComponentsClSelectDateClSelectDateClass = CreateVueComponent(GenUniModulesCoolUnixComponentsClSelectDateClSelectDate::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesCoolUnixComponentsClSelectDateClSelectDate.name, inheritAttrs = GenUniModulesCoolUnixComponentsClSelectDateClSelectDate.inheritAttrs, inject = GenUniModulesCoolUnixComponentsClSelectDateClSelectDate.inject, props = GenUniModulesCoolUnixComponentsClSelectDateClSelectDate.props, propsNeedCastKeys = GenUniModulesCoolUnixComponentsClSelectDateClSelectDate.propsNeedCastKeys, emits = GenUniModulesCoolUnixComponentsClSelectDateClSelectDate.emits, components = GenUniModulesCoolUnixComponentsClSelectDateClSelectDate.components, styles = GenUniModulesCoolUnixComponentsClSelectDateClSelectDate.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesCoolUnixComponentsClSelectDateClSelectDate.setup(props as GenUniModulesCoolUnixComponentsClSelectDateClSelectDate, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesCoolUnixComponentsClSelectDateClSelectDate {
    return GenUniModulesCoolUnixComponentsClSelectDateClSelectDate(instance)
}
)
typealias ClSelectDateComponentPublicInstance = GenUniModulesCoolUnixComponentsClSelectDateClSelectDate
val GenPagesEquipEquipCollectClass = CreateVueComponent(GenPagesEquipEquipCollect::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesEquipEquipCollect.inheritAttrs, inject = GenPagesEquipEquipCollect.inject, props = GenPagesEquipEquipCollect.props, propsNeedCastKeys = GenPagesEquipEquipCollect.propsNeedCastKeys, emits = GenPagesEquipEquipCollect.emits, components = GenPagesEquipEquipCollect.components, styles = GenPagesEquipEquipCollect.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesEquipEquipCollect.setup(props as GenPagesEquipEquipCollect)
    }
    )
}
, fun(instance, renderer): GenPagesEquipEquipCollect {
    return GenPagesEquipEquipCollect(instance, renderer)
}
)
val GenPagesEquipWorkshopScadaClass = CreateVueComponent(GenPagesEquipWorkshopScada::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesEquipWorkshopScada.inheritAttrs, inject = GenPagesEquipWorkshopScada.inject, props = GenPagesEquipWorkshopScada.props, propsNeedCastKeys = GenPagesEquipWorkshopScada.propsNeedCastKeys, emits = GenPagesEquipWorkshopScada.emits, components = GenPagesEquipWorkshopScada.components, styles = GenPagesEquipWorkshopScada.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesEquipWorkshopScada.setup(props as GenPagesEquipWorkshopScada)
    }
    )
}
, fun(instance, renderer): GenPagesEquipWorkshopScada {
    return GenPagesEquipWorkshopScada(instance, renderer)
}
)
val GenPagesMessageMessageDetailClass = CreateVueComponent(GenPagesMessageMessageDetail::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMessageMessageDetail.inheritAttrs, inject = GenPagesMessageMessageDetail.inject, props = GenPagesMessageMessageDetail.props, propsNeedCastKeys = GenPagesMessageMessageDetail.propsNeedCastKeys, emits = GenPagesMessageMessageDetail.emits, components = GenPagesMessageMessageDetail.components, styles = GenPagesMessageMessageDetail.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMessageMessageDetail.setup(props as GenPagesMessageMessageDetail)
    }
    )
}
, fun(instance, renderer): GenPagesMessageMessageDetail {
    return GenPagesMessageMessageDetail(instance, renderer)
}
)
fun createApp(): UTSJSONObject {
    val app = createSSRApp(GenAppClass)
    app.use(cool)
    return _uO("app" to app)
}
fun main(app: IApp) {
    definePageRoutes()
    defineAppConfig()
    (createApp()["app"] as VueApp).mount(app, GenUniApp())
}
open class UniAppConfig : io.dcloud.uniapp.appframe.AppConfig {
    override var name: String = "OEMES"
    override var appid: String = "__UNI__63FBDF4"
    override var versionName: String = "1.0.0"
    override var versionCode: String = "100"
    override var uniCompilerVersion: String = "4.87"
    constructor() : super() {}
}
fun definePageRoutes() {
    __uniRoutes.push(UniPageRoute(path = "pages/index/home", component = GenPagesIndexHomeClass, meta = UniPageMeta(isQuit = true), style = _uM("navigationStyle" to "custom")))
    __uniRoutes.push(UniPageRoute(path = "pages/index/equip", component = GenPagesIndexEquipClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "custom")))
    __uniRoutes.push(UniPageRoute(path = "pages/index/work", component = GenPagesIndexWorkClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "custom")))
    __uniRoutes.push(UniPageRoute(path = "pages/index/message", component = GenPagesIndexMessageClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "custom", "enablePullDownRefresh" to true)))
    __uniRoutes.push(UniPageRoute(path = "pages/index/my", component = GenPagesIndexMyClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "custom")))
    __uniRoutes.push(UniPageRoute(path = "pages/set/index", component = GenPagesSetIndexClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "设置")))
    __uniRoutes.push(UniPageRoute(path = "pages/set/general", component = GenPagesSetGeneralClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "通用设置")))
    __uniRoutes.push(UniPageRoute(path = "pages/set/notice", component = GenPagesSetNoticeClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "通知设置")))
    __uniRoutes.push(UniPageRoute(path = "pages/set/about", component = GenPagesSetAboutClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/set/cs", component = GenPagesSetCsClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "联系技术")))
    __uniRoutes.push(UniPageRoute(path = "pages/user/login", component = GenPagesUserLoginClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "custom", "disableScroll" to true)))
    __uniRoutes.push(UniPageRoute(path = "pages/equip/equip_detail", component = GenPagesEquipEquipDetailClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "custom", "disableScroll" to true)))
    __uniRoutes.push(UniPageRoute(path = "pages/equip/workshop_tree", component = GenPagesEquipWorkshopTreeClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "custom", "disableScroll" to true)))
    __uniRoutes.push(UniPageRoute(path = "pages/equip/equip_collect", component = GenPagesEquipEquipCollectClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "custom", "disableScroll" to true)))
    __uniRoutes.push(UniPageRoute(path = "pages/equip/workshop_scada", component = GenPagesEquipWorkshopScadaClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "default", "navigationBarTitleText" to "工艺组态", "disableScroll" to true)))
    __uniRoutes.push(UniPageRoute(path = "pages/message/message_detail", component = GenPagesMessageMessageDetailClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationStyle" to "custom", "disableScroll" to true)))
}
val __uniTabBar: Map<String, Any?>? = _uM("custom" to true, "color" to "@tabColor", "selectedColor" to "@tabSelectedColor", "backgroundColor" to "@tabBgColor", "borderStyle" to "@tabBorderStyle", "height" to "60px", "list" to _uA(
    _uM("pagePath" to "pages/index/home", "iconPath" to "/static/icon/tabbar/home.png", "selectedIconPath" to "/static/icon/tabbar/home2.png", "text" to "首页"),
    _uM("pagePath" to "pages/index/equip", "iconPath" to "/static/icon/tabbar/equip.png", "selectedIconPath" to "/static/icon/tabbar/equip2.png", "text" to "设备"),
    _uM("pagePath" to "pages/index/work", "iconPath" to "/static/icon/tabbar/work.png", "selectedIconPath" to "/static/icon/tabbar/work2.png", "text" to "场景"),
    _uM("pagePath" to "pages/index/message", "iconPath" to "/static/icon/tabbar/message.png", "selectedIconPath" to "/static/icon/tabbar/message2.png", "text" to "消息"),
    _uM("pagePath" to "pages/index/my", "iconPath" to "/static/icon/tabbar/my.png", "selectedIconPath" to "/static/icon/tabbar/my2.png", "text" to "我的")
))
val __uniLaunchPage: Map<String, Any?> = _uM("url" to "pages/index/home", "style" to _uM("navigationStyle" to "custom"))
fun defineAppConfig() {
    __uniConfig.entryPagePath = "/pages/index/home"
    __uniConfig.globalStyle = _uM("navigationBarTitleText" to "OEMES", "navigationBarTextStyle" to "@navTextStyle", "backgroundColorContent" to "@bgContentColor", "backgroundColor" to "@bgColor", "navigationBarBackgroundColor" to "@navBgColor")
    __uniConfig.getTabBarConfig = fun(): Map<String, Any>? {
        return _uM("custom" to true, "color" to "@tabColor", "selectedColor" to "@tabSelectedColor", "backgroundColor" to "@tabBgColor", "borderStyle" to "@tabBorderStyle", "height" to "60px", "list" to _uA(
            _uM("pagePath" to "pages/index/home", "iconPath" to "/static/icon/tabbar/home.png", "selectedIconPath" to "/static/icon/tabbar/home2.png", "text" to "首页"),
            _uM("pagePath" to "pages/index/equip", "iconPath" to "/static/icon/tabbar/equip.png", "selectedIconPath" to "/static/icon/tabbar/equip2.png", "text" to "设备"),
            _uM("pagePath" to "pages/index/work", "iconPath" to "/static/icon/tabbar/work.png", "selectedIconPath" to "/static/icon/tabbar/work2.png", "text" to "场景"),
            _uM("pagePath" to "pages/index/message", "iconPath" to "/static/icon/tabbar/message.png", "selectedIconPath" to "/static/icon/tabbar/message2.png", "text" to "消息"),
            _uM("pagePath" to "pages/index/my", "iconPath" to "/static/icon/tabbar/my.png", "selectedIconPath" to "/static/icon/tabbar/my2.png", "text" to "我的")
        ))
    }
    __uniConfig.tabBar = __uniConfig.getTabBarConfig()
    __uniConfig.conditionUrl = ""
    __uniConfig.uniIdRouter = _uM()
    __uniConfig.themeConfig = _uM("light" to _uM("bgColor" to "#f8f8f8", "bgContentColor" to "#f8f8f8", "navBgColor" to "#ffffff", "navTextStyle" to "black", "tabColor" to "#999999", "tabSelectedColor" to "#14b8a6", "tabBorderStyle" to "white", "tabBgColor" to "#ffffff"), "dark" to _uM("bgColor" to "#191919", "bgContentColor" to "#191919", "navBgColor" to "#191919", "navTextStyle" to "white", "tabColor" to "#cccccc", "tabSelectedColor" to "#ffffff", "tabBorderStyle" to "black", "tabBgColor" to "#191919"))
    __uniConfig.ready = true
}
open class GenUniApp : UniAppImpl() {
    open val vm: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
    open val `$vm`: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
}
fun getApp(): GenUniApp {
    return getUniApp() as GenUniApp
}
