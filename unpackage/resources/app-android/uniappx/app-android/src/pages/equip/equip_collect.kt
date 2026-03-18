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
open class GenPagesEquipEquipCollect : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesEquipEquipCollect) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesEquipEquipCollect
            val _cache = __ins.renderCache
            val ui = useUi()
            val page = usePage()
            val refs = useRefs()
            val attrConfig = ref(_uA<EquipConfigAttr>())
            val data = ref(_uA<EquipCollect>())
            val chartRef = ref<LEchartComponentPublicInstance?>(null)
            val containerSize = ref<Number>(800)
            val selectDateRef = ref<ClSelectDateComponentPublicInstance?>(null)
            val customDate = ref(_uA<String>("", ""))
            var equipSn: String = ""
            var singleHeight: Number = 600
            val shortcuts = ref(_uA<ClSelectDateShortcut>(ClSelectDateShortcut(label = t__1("今天"), value = _uA(
                dayUts().format("YYYY-MM-DD"),
                dayUts().format("YYYY-MM-DD")
            )), ClSelectDateShortcut(label = t__1("昨日"), value = _uA(
                dayUts().subtract(1, "day").format("YYYY-MM-DD"),
                dayUts().subtract(1, "day").format("YYYY-MM-DD")
            )), ClSelectDateShortcut(label = t__1("本周"), value = _uA(
                dayUts().startOf("week").format("YYYY-MM-DD"),
                dayUts().endOf("week").format("YYYY-MM-DD")
            )), ClSelectDateShortcut(label = t__1("本月"), value = _uA(
                dayUts().startOf("month").format("YYYY-MM-DD"),
                dayUts().endOf("month").format("YYYY-MM-DD")
            ))))
            fun gen_generateOption_fn(): UTSJSONObject {
                var visualMap: UTSArray<Any> = _uA()
                var xAxis: UTSArray<Any> = _uA()
                var yAxis: UTSArray<Any> = _uA()
                var grid: UTSArray<Any> = _uA()
                var series: UTSArray<Any> = _uA()
                var title: UTSArray<Any> = _uA()
                var single = (100 as Number) / attrConfig.value.length
                attrConfig.value.forEach(fun(item, index, _array){
                    visualMap.push(object : UTSJSONObject() {
                        var show = false
                        var type = "continuous"
                        var seriesIndex = index
                    })
                    title.push(object : UTSJSONObject() {
                        var top = "" + (single / 15 + single * index) + "%"
                        var left = "center"
                        var text = item.name
                    })
                    xAxis.push(object : UTSJSONObject() {
                        var gridIndex = index
                        var type = "time"
                        var splitLine = object : UTSJSONObject() {
                            var show = false
                        }
                        var axisLabel = object : UTSJSONObject() {
                            var rotate: Number = 45
                            var interval = "auto"
                        }
                    })
                    yAxis.push(object : UTSJSONObject() {
                        var type = "value"
                        var gridIndex = index
                        var splitLine = object : UTSJSONObject() {
                            var show = false
                        }
                    })
                    grid.push(object : UTSJSONObject() {
                        var top = "" + (single / 5 + single * index) + "%"
                        var height = "" + single * 3 / 5 + "%"
                    })
                    var vList: UTSArray<Any> = _uA()
                    data.value.forEach(fun(item2){
                        var d = item2.data[item.name]
                        if (d != null) {
                            vList.push(_uA(
                                item2.time,
                                d
                            ))
                        } else {
                            vList.push(_uA(
                                item2.time,
                                ""
                            ))
                        }
                    }
                    )
                    series.push(object : UTSJSONObject() {
                        var type = "line"
                        var smooth = true
                        var showSymbol = false
                        var areaStyle = UTSJSONObject()
                        var data = vList
                        var xAxisIndex = index
                        var yAxisIndex = index
                    })
                }
                )
                return _uO("visualMap" to visualMap, "title" to title, "tooltip" to object : UTSJSONObject() {
                    var trigger = "axis"
                }, "xAxis" to xAxis, "yAxis" to yAxis, "grid" to grid, "series" to series)
            }
            val generateOption = ::gen_generateOption_fn
            val loadConfig = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        await(request(RequestOptions__1(url = apiPath["equip_config"] as String, method = "GET", data = _uO("equipSn" to equipSn))).then(fun(res){
                            if (res == null) {
                                return
                            }
                            var r = parseData<EquipConfig>(res)
                            if (r == null || r.config == null) {
                                return
                            }
                            if (r.config!!.attrs == null || r.config!!.attrs!!.length <= 0) {
                                return
                            }
                            var rr = _uA<EquipConfigAttr>()
                            r.config!!.attrs!!.forEach(fun(item){
                                if (item.needCollect != null && item.needCollect!!) {
                                    rr.push(item)
                                }
                            }
                            )
                            containerSize.value = rr.length * singleHeight
                            attrConfig.value = rr
                        }
                        ))
                })
            }
            val loadHistory = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (attrConfig.value == null || attrConfig.value.length <= 0) {
                            return@w1
                        }
                        await(request(RequestOptions__1(url = apiPath["equip_collect_page"] as String, method = "POST", data = object : UTSJSONObject() {
                            var sn = equipSn
                            var startDate = if (customDate.value[0] == null) {
                                null
                            } else {
                                customDate.value[0] + "  00:00:00"
                            }
                            var endDate = if (customDate.value[1] == null) {
                                null
                            } else {
                                customDate.value[1] + " 23:59:59"
                            }
                            var requirePage = false
                        })).then(fun(res){
                            if (res == null) {
                                return
                            }
                            var r = parseData<UTSArray<EquipCollect>>(res)
                            if (r == null) {
                                return
                            }
                            data.value = r
                        }
                        ))
                })
            }
            fun gen_reloadHistory_fn(s: UTSArray<String>) {
                loadHistory()
            }
            val reloadHistory = ::gen_reloadHistory_fn
            fun gen_formatDate_fn(date: Date?): String {
                if (date == null) {
                    return ""
                }
                val year = date.getFullYear()
                val month = (date.getMonth() + 1).toString(10).padStart(2, "0")
                val day = date.getDate().toString(10).padStart(2, "0")
                return "" + year + "-" + month + "-" + day
            }
            val formatDate = ::gen_formatDate_fn
            val init = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (chartRef.value == null) {
                            return@w1
                        }
                        val chart = await(chartRef.value!!.init(null))
                })
            }
            val reloadEChart = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        var option = generateOption()
                        chartRef.value!!.setOption(option)
                })
            }
            watch(data, fun(){
                reloadEChart()
            }
            , WatchOptions(deep = true))
            onLoad(fun(options){
                equipSn = options["sn"] as String
                var current = Date()
                customDate.value = _uA(
                    formatDate(current),
                    formatDate(current)
                )
                loadConfig()
            }
            )
            onShow(fun(){
                setTimeout(fun(){
                    loadHistory()
                }
                , 500)
            }
            )
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_select_date = resolveEasyComponent("cl-select-date", GenUniModulesCoolUnixComponentsClSelectDateClSelectDateClass)
                val _component_l_echart = resolveEasyComponent("l-echart", GenUniModulesLimeEchartComponentsLEchartLEchartClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cE("scroll-view", _uM("style" to _nS(_uM("flex" to 1)), "scroll-with-animation" to true), _uA(
                    _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(_component_cl_topbar, _uM("fixed" to "", "background-color" to if (unref(isDark)) {
                                "black"
                            } else {
                                "white"
                            }
                            , "show-back" to true, "safe-area-top" to "", "height" to if (unref(isMp)()) {
                                null
                            } else {
                                100
                            }
                            , "pt" to object : UTSJSONObject() {
                                var className = "-important-z-50"
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cE("view", _uM("class" to _nC(_uA(
                                        "flex flex-row items-center justify-center p-3 flex-1 w-full",
                                        _uM("pt-0" to unref(isMp)())
                                    ))), _uA(
                                        _cV(_component_cl_text, _uM("color" to "primary", "pt" to object : UTSJSONObject() {
                                            var className = "-important-text-xl ml-2"
                                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _tD(unref(t__1)("历史曲线"))
                                            )
                                        }
                                        ), "_" to 1))
                                    ), 2)
                                )
                            }
                            ), "_" to 1), 8, _uA(
                                "background-color",
                                "height"
                            )),
                            if (attrConfig.value.length > 0) {
                                _cE("view", _uM("key" to 0, "class" to "p-3"), _uA(
                                    _cV(_component_cl_select_date, _uM("ref" to selectDateRef.value, "values" to customDate.value, "onUpdate:values" to fun(`$event`: UTSArray<String>){
                                        customDate.value = `$event`
                                    }, "type" to "date", "title" to "", "shortcuts" to shortcuts.value, "label-format" to "YYYY-MM-DD", "value-format" to "YYYY-MM-DD", "onRangeChange" to reloadHistory, "pt" to object : UTSJSONObject() {
                                        var className = "text-2xl h-16"
                                    }, "rangeable" to ""), null, 8, _uA(
                                        "values",
                                        "onUpdate:values",
                                        "shortcuts"
                                    )),
                                    _cE("view", _uM("class" to "echart-equip", "style" to _nS("height: " + containerSize.value + "rpx")), _uA(
                                        _cV(_component_l_echart, _uM("ref_key" to "chartRef", "ref" to chartRef, "onFinished" to init, "style" to _nS(_uM("width" to "100%", "height" to "100%"))), null, 8, _uA(
                                            "style"
                                        ))
                                    ), 4)
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            if (attrConfig.value.length <= 0) {
                                _cE("view", _uM("key" to 1, "class" to "p-3 mt-5"), _uA(
                                    _cE("text", _uM("class" to "text-gray-400 text-center"), "-- " + _tD(unref(t__1)("未对该设备进行数据采集配置")) + " --", 1)
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                        )
                    }
                    ), "_" to 1))
                ), 4)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("echart-equip" to _pS(_uM("overflow" to "hidden", "marginTop" to "35rpx", "width" to "100%", "backgroundColor" to "rgba(255,255,255,1)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
