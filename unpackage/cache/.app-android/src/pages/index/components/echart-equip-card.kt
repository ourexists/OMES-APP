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
open class GenPagesIndexComponentsEchartEquipCard : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexComponentsEchartEquipCard) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexComponentsEchartEquipCard
            val _cache = __ins.renderCache
            val ui = useUi()
            val refs = useRefs()
            val chartRef = ref<LEchartComponentPublicInstance?>(null)
            val loading = ref<Boolean>(false)
            val equipCount = ref<EquipCount>(EquipCount(total = 0, alarm = 0, online = 0, offline = 0, run = 0, stopped = 0))
            var timer: Number? = null
            val init = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (chartRef.value == null) {
                            return@w1
                        }
                        val chart = await(chartRef.value!!.init(null))
                        chart.setOption(object : UTSJSONObject() {
                            var tooltip = object : UTSJSONObject() {
                                var trigger = "item"
                            }
                            var legend = object : UTSJSONObject() {
                                var orient = "vertical"
                                var right = "5%"
                                var top = "15%"
                            }
                            var color = _uA(
                                "#bfbfbf",
                                "#1890ff",
                                "#FAAD14",
                                "#52c41a"
                            )
                            var series = _uA(
                                object : UTSJSONObject() {
                                    var name = t__1("设备在线统计")
                                    var type = "pie"
                                    var radius = _uA(
                                        "30%",
                                        "45%"
                                    )
                                    var center = _uA(
                                        "25%",
                                        "50%"
                                    )
                                    var itemStyle = object : UTSJSONObject() {
                                        var borderColor = "#fff"
                                        var borderWidth: Number = 1
                                    }
                                    var emphasis = object : UTSJSONObject() {
                                        var itemStyle = object : UTSJSONObject() {
                                            var shadowBlur: Number = 10
                                            var shadowColor = "rgba(0,0,0,0.3)"
                                        }
                                    }
                                    var label = object : UTSJSONObject() {
                                        var show = true
                                        var formatter = "{d}%"
                                        var position = "inside"
                                    }
                                    var data = _uA(
                                        object : UTSJSONObject() {
                                            var value = equipCount.value.offline
                                            var name = t__1("离线")
                                        },
                                        object : UTSJSONObject() {
                                            var value = equipCount.value.online
                                            var name = t__1("在线")
                                        }
                                    )
                                },
                                object : UTSJSONObject() {
                                    var name = t__1("设备运行状态")
                                    var type = "pie"
                                    var radius = _uA(
                                        "30%",
                                        "45%"
                                    )
                                    var center = _uA(
                                        "55%",
                                        "50%"
                                    )
                                    var itemStyle = object : UTSJSONObject() {
                                        var borderColor = "#fff"
                                        var borderWidth: Number = 1
                                    }
                                    var emphasis = object : UTSJSONObject() {
                                        var itemStyle = object : UTSJSONObject() {
                                            var shadowBlur: Number = 10
                                            var shadowColor = "rgba(0,0,0,0.3)"
                                        }
                                    }
                                    var label = object : UTSJSONObject() {
                                        var show = true
                                        var formatter = "{d}%"
                                        var position = "inside"
                                    }
                                    var data = _uA(
                                        object : UTSJSONObject() {
                                            var value = equipCount.value.stopped
                                            var name = t__1("停止")
                                        },
                                        object : UTSJSONObject() {
                                            var value = equipCount.value.run
                                            var name = t__1("运行")
                                        }
                                    )
                                }
                            )
                        })
                })
            }
            fun gen_reloadEChart_fn() {
                chartRef.value!!.setOption(object : UTSJSONObject() {
                    var series = _uA(
                        object : UTSJSONObject() {
                            var data = _uA(
                                object : UTSJSONObject() {
                                    var value = equipCount.value.offline
                                    var name = t__1("离线")
                                },
                                object : UTSJSONObject() {
                                    var value = equipCount.value.online
                                    var name = t__1("在线")
                                }
                            )
                        },
                        object : UTSJSONObject() {
                            var data = _uA(
                                object : UTSJSONObject() {
                                    var value = equipCount.value.stopped
                                    var name = t__1("停止")
                                },
                                object : UTSJSONObject() {
                                    var value = equipCount.value.run
                                    var name = t__1("运行")
                                }
                            )
                        }
                    )
                })
            }
            val reloadEChart = ::gen_reloadEChart_fn
            fun gen_reloadData_fn() {
                if (loading.value) {
                    return
                }
                loading.value = true
                try {
                    request(RequestOptions__1(url = apiPath["equip_count"] as String, method = "POST", data = object : UTSJSONObject() {
                        var needWorkshopCascade = false
                        var limitUserWorkshop = true
                        var workshopCode = if (workshopTree.selectNode.value.id == -1) {
                            null
                        } else {
                            workshopTree.selectNode.value.id
                        }
                    })).then(fun(res){
                        if (res == null) {
                            return
                        }
                        var t = parseData<EquipCount>(res)
                        if (t == null) {
                            return
                        }
                        equipCount.value = t
                    }
                    )
                }
                 finally {
                    loading.value = false
                }
            }
            val reloadData = ::gen_reloadData_fn
            watch(equipCount, fun(){
                reloadEChart()
            }
            , WatchOptions(deep = true))
            onMounted(fun(){
                timer = setInterval(fun(){
                    reloadData()
                }
                , config__1.equipRefreshTime)
            }
            )
            onUnmounted(fun(){
                if (timer != null) {
                    clearInterval(timer as Number)
                    timer = null
                }
            }
            )
            onShow(fun(){
                setTimeout(fun(){
                    reloadData()
                }
                , 500)
            }
            )
            onHide(fun(){
                if (timer != null) {
                    clearInterval(timer as Number)
                    timer = null
                }
            }
            )
            return fun(): Any? {
                val _component_l_echart = resolveEasyComponent("l-echart", GenUniModulesLimeEchartComponentsLEchartLEchartClass)
                return _cE("view", _uM("class" to "count-card"), _uA(
                    _cE("view", _uM("class" to "w-full echart-equip"), _uA(
                        _cV(_component_l_echart, _uM("ref_key" to "chartRef", "ref" to chartRef, "onFinished" to init), null, 512)
                    )),
                    _cE("view", _uM("class" to "count-status-group"), _uA(
                        _cE("view", _uM("class" to "count-status"), _uA(
                            _cE("text", _uM("class" to "count-title total"), _tD(unref(t__1)("设备总计")), 1),
                            _cE("text", _uM("class" to "count-num"), _tD(equipCount.value.total), 1)
                        )),
                        _cE("view", _uM("class" to "count-status"), _uA(
                            _cE("text", _uM("class" to "count-title alarm"), _tD(unref(t__1)("报警设备")), 1),
                            _cE("text", _uM("class" to "count-num"), _tD(equipCount.value.alarm), 1)
                        ))
                    )),
                    _cE("view", _uM("class" to "count-status-group"), _uA(
                        _cE("view", _uM("class" to "count-status items-center"), _uA(
                            _cE("text", _uM("class" to "count-title online"), _tD(unref(t__1)("在线设备")), 1),
                            _cE("text", _uM("class" to "count-num"), _tD(equipCount.value.online), 1)
                        )),
                        _cE("view", _uM("class" to "count-status"), _uA(
                            _cE("text", _uM("class" to "count-title offline"), _tD(unref(t__1)("离线设备")), 1),
                            _cE("text", _uM("class" to "count-num"), _tD(equipCount.value.offline), 1)
                        )),
                        _cE("view", _uM("class" to "count-status"), _uA(
                            _cE("text", _uM("class" to "count-title run"), _tD(unref(t__1)("运行设备")), 1),
                            _cE("text", _uM("class" to "count-num"), _tD(equipCount.value.run), 1)
                        )),
                        _cE("view", _uM("class" to "count-status"), _uA(
                            _cE("text", _uM("class" to "count-title stopped"), _tD(unref(t__1)("停止设备")), 1),
                            _cE("text", _uM("class" to "count-num"), _tD(equipCount.value.stopped), 1)
                        ))
                    ))
                ))
            }
        }
        var name = "chart-equip-runtime"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("count-card" to _pS(_uM("height" to "720rpx", "marginTop" to "14rpx", "display" to "flex", "width" to "100%", "alignItems" to "center", "borderTopLeftRadius" to "42rpx", "borderTopRightRadius" to "42rpx", "borderBottomRightRadius" to "42rpx", "borderBottomLeftRadius" to "42rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(243,244,246,1)", "borderRightColor" to "rgba(243,244,246,1)", "borderBottomColor" to "rgba(243,244,246,1)", "borderLeftColor" to "rgba(243,244,246,1)", "backgroundColor" to "rgba(255,255,255,1)")), "echart-equip" to _uM(".count-card " to _uM("height" to "50%")), "count-status" to _pS(_uM("display" to "flex", "width" to "168rpx", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "7rpx", "paddingRight" to "7rpx", "paddingBottom" to "7rpx", "paddingLeft" to "7rpx")), "count-title" to _uM("" to _uM("borderTopLeftRadius" to "7rpx", "borderTopRightRadius" to "7rpx", "borderBottomRightRadius" to "7rpx", "borderBottomLeftRadius" to "7rpx", "paddingTop" to "14rpx", "paddingRight" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "14rpx", "fontSize" to "24.5rpx", "lineHeight" to "35rpx", "color" to "rgba(255,255,255,1)"), ".total" to _uM("backgroundColor" to "#858484"), ".online" to _uM("backgroundColor" to "rgba(59,130,246,1)"), ".offline" to _uM("backgroundImage" to "none", "backgroundColor" to "#bfbfbf"), ".alarm" to _uM("backgroundColor" to "rgba(239,68,68,1)"), ".run" to _uM("backgroundColor" to "rgba(34,197,94,1)"), ".stopped" to _uM("backgroundColor" to "rgba(234,179,8,1)")), "count-num" to _pS(_uM("marginTop" to "21rpx", "fontSize" to "31.5rpx", "lineHeight" to "49rpx")), "count-status-group" to _pS(_uM("display" to "flex", "width" to "100%", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "14rpx", "paddingRight" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "14rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
