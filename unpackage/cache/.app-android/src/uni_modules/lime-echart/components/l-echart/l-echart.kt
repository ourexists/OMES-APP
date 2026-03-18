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
open class GenUniModulesLimeEchartComponentsLEchartLEchart : VueComponent, echartsProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var webviewStyles: UTSJSONObject? by `$props`
    override var lStyle: Any? by `$props`
    override var isDisableScroll: Boolean by `$props`
    override var isClickable: Boolean by `$props`
    override var enableHover: Boolean by `$props`
    override var beforeDelay: Number by `$props`
    override var landscape: Boolean by `$props`
    override var autoHideTooltip: Boolean by `$props`
    open var init: (callback: ((chartInstance: Echarts) -> Unit)?) -> UTSPromise<Echarts>
        get() {
            return unref(this.`$exposed`["init"]) as (callback: ((chartInstance: Echarts) -> Unit)?) -> UTSPromise<Echarts>
        }
        set(value) {
            setRefValue(this.`$exposed`, "init", value)
        }
    open var setOption: (option: UTSJSONObject) -> Unit
        get() {
            return unref(this.`$exposed`["setOption"]) as (option: UTSJSONObject) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setOption", value)
        }
    open var showLoading: () -> Unit
        get() {
            return unref(this.`$exposed`["showLoading"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "showLoading", value)
        }
    open var hideLoading: () -> Unit
        get() {
            return unref(this.`$exposed`["hideLoading"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "hideLoading", value)
        }
    open var clear: () -> Unit
        get() {
            return unref(this.`$exposed`["clear"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "clear", value)
        }
    open var dispose: () -> Unit
        get() {
            return unref(this.`$exposed`["dispose"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "dispose", value)
        }
    open var resize: (size: UTSJSONObject) -> Unit
        get() {
            return unref(this.`$exposed`["resize"]) as (size: UTSJSONObject) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "resize", value)
        }
    open var canvasToTempFilePath: (opt: UTSJSONObject) -> Unit
        get() {
            return unref(this.`$exposed`["canvasToTempFilePath"]) as (opt: UTSJSONObject) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "canvasToTempFilePath", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeEchartComponentsLEchartLEchart, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeEchartComponentsLEchartLEchart
            val _cache = __ins.renderCache
            fun emits(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val instance = getCurrentInstance()!!
            val canvasid = "lime-echart-" + instance.uid
            val finished = ref(false)
            val initializationQueue = _uA<EChartsResolveCallback>()
            val callbackQueue = _uA<EChartsResolveCallback>()
            var chartInstance = null as Echarts?
            var chartRef = ref<UniWebViewElement?>(null)
            val processInitializationQueue = fun(){
                if (finished.value) {
                    if (chartInstance == null) {
                        chartInstance = Echarts(chartRef.value!!)
                    }
                    while(initializationQueue.length > 0){
                        val resolve = initializationQueue.pop() as EChartsResolveCallback
                        resolve(chartInstance!!)
                    }
                }
                if (chartInstance != null) {
                    while(callbackQueue.length > 0){
                        val callback = callbackQueue.pop() as EChartsResolveCallback
                        callback(chartInstance!!)
                    }
                }
            }
            val loaded = fun(event: UniWebViewLoadEvent){
                event.stopPropagation()
                event.preventDefault()
                nextTick(fun(){
                    chartRef.value?.getBoundingClientRectAsync()?.then(fun(res){
                        if (res.width > 0 && res.height > 0) {
                            finished.value = true
                            processInitializationQueue()
                            emits("finished")
                        } else {
                            console.warn("【lime-echart】获取尺寸失败，请检查代码样式", " at uni_modules/lime-echart/components/l-echart/l-echart.uvue:89")
                        }
                    }
                    )
                }
                )
            }
            val checkInitialization = fun(): Boolean {
                if (chartInstance == null) {
                    console.warn("组件还未初始化，请先使用 init", " at uni_modules/lime-echart/components/l-echart/l-echart.uvue:99")
                    return true
                }
                return false
            }
            val setOption = fun(option: UTSJSONObject){
                if (checkInitialization()) {
                    return
                }
                chartInstance!!.setOption(option)
            }
            val showLoading = fun(){
                if (checkInitialization()) {
                    return
                }
                chartInstance!!.showLoading()
            }
            val hideLoading = fun(){
                if (checkInitialization()) {
                    return
                }
                chartInstance!!.hideLoading()
            }
            val clear = fun(){
                if (checkInitialization()) {
                    return
                }
                chartInstance!!.clear()
            }
            val dispose = fun(){
                if (checkInitialization()) {
                    return
                }
                chartInstance!!.dispose()
            }
            val resize = fun(size: UTSJSONObject){
                if (checkInitialization()) {
                    return
                }
                chartInstance!!.resize(size)
            }
            val canvasToTempFilePath = fun(opt: UTSJSONObject){
                if (checkInitialization()) {
                    return
                }
                chartInstance!!.canvasToTempFilePath(opt)
            }
            fun gen_init_fn(callback: ((chartInstance: Echarts) -> Unit)?): UTSPromise<Echarts> {
                if (callback != null) {
                    callbackQueue.push(callback)
                }
                return UTSPromise<Echarts>(fun(resolve, _reject){
                    initializationQueue.push(resolve)
                    processInitializationQueue()
                }
                )
            }
            val init = ::gen_init_fn
            __expose(_uM("init" to init, "setOption" to setOption, "showLoading" to showLoading, "hideLoading" to hideLoading, "clear" to clear, "dispose" to dispose, "resize" to resize, "canvasToTempFilePath" to canvasToTempFilePath))
            return fun(): Any? {
                return _cE("web-view", _uM("class" to "lime-echart", "ref_key" to "chartRef", "ref" to chartRef, "onLoad" to loaded, "style" to _nS(_uA(
                    _ctx.lStyle
                )), "webview-styles" to _uA(
                    _ctx.webviewStyles
                ), "src" to "/uni_modules/lime-echart/static/app/uvue.html?v=10112"), null, 44, _uA(
                    "webview-styles"
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("lime-echart" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "width" to "100%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("finished" to null)
        var props = _nP(_uM("webviewStyles" to _uM("type" to "UTSJSONObject", "required" to false), "lStyle" to _uM("type" to _uA(
            "String",
            "UTSJSONObject"
        ), "required" to false), "isDisableScroll" to _uM("type" to "Boolean", "required" to true, "default" to false), "isClickable" to _uM("type" to "Boolean", "required" to true, "default" to true), "enableHover" to _uM("type" to "Boolean", "required" to true, "default" to false), "beforeDelay" to _uM("type" to "Number", "required" to true, "default" to 30), "landscape" to _uM("type" to "Boolean", "required" to true, "default" to false), "autoHideTooltip" to _uM("type" to "Boolean", "required" to true, "default" to false)))
        var propsNeedCastKeys = _uA(
            "isDisableScroll",
            "isClickable",
            "enableHover",
            "beforeDelay",
            "landscape",
            "autoHideTooltip"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
