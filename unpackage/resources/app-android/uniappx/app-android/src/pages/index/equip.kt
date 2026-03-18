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
open class GenPagesIndexEquip : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexEquip) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexEquip
            val _cache = __ins.renderCache
            val ui = useUi()
            val refs = useRefs()
            val poupOpen = ref<Boolean>(false)
            val equipList = ref(_uA<Equip>())
            val sourceList = ref(_uA<Equip>())
            val equipCount = ref<EquipCount>(EquipCount(total = 0, alarm = 0, online = 0, offline = 0, run = 0, stopped = 0))
            var currentPage: Number = 1
            var pageSize: Number = 20
            var timer: Number? = null
            val loading = ref<Boolean>(false)
            val pageloading = ref<Boolean>(false)
            fun gen_setWorkshop_fn() {
                router.to("/pages/equip/workshop_tree")
            }
            val setWorkshop = ::gen_setWorkshop_fn
            fun gen_typeImage_fn(equip: Equip): String {
                return equipImage(equip)
            }
            val typeImage = ::gen_typeImage_fn
            fun gen_loadPage_fn(page: Number, isReStart: Boolean) {
                if (pageloading.value) {
                    return
                }
                pageloading.value = true
                fun push() {
                    var start: Number = 0
                    if (!isReStart) {
                        start = (page - 1) * pageSize
                    }
                    val end = page * pageSize
                    val nextPage = sourceList.value.slice(start, end)
                    if (nextPage.length > 0) {
                        if (isReStart) {
                            equipList.value = nextPage
                        } else {
                            equipList.value.push(*nextPage.toTypedArray())
                        }
                    } else {
                        if (isReStart) {
                            equipList.value = _uA()
                        }
                    }
                    pageloading.value = false
                }
                setTimeout(fun(){
                    push()
                }
                , 16)
            }
            val loadPage = ::gen_loadPage_fn
            fun gen_loadMore_fn() {
                if (loading.value) {
                    return
                }
                val nextPage = currentPage + 1
                val start = (nextPage - 1) * pageSize
                if (start >= sourceList.value.length) {
                    return
                }
                currentPage = nextPage
                loadPage(currentPage, false)
            }
            val loadMore = ::gen_loadMore_fn
            val reloadData = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (loading.value) {
                            return@w1
                        }
                        loading.value = true
                        try {
                            await(request(RequestOptions__1(url = apiPath["equip_page"] as String, method = "POST", data = object : UTSJSONObject() {
                                var workshopCode = if (workshopTree.selectNode.value.id == -1) {
                                    null
                                } else {
                                    workshopTree.selectNode.value.id
                                }
                                var needRealtime = true
                                var needWorkshopCascade = true
                                var queryWorkshop = true
                                var queryAttrs = true
                                var limitUserWorkshop = true
                                var requirePage = false
                            })).then(fun(res){
                                val c = EquipCount(total = 0, alarm = 0, online = 0, offline = 0, run = 0, stopped = 0)
                                if (res == null) {
                                    sourceList.value = _uA()
                                } else {
                                    var r = parseData<UTSArray<Equip>>(res)
                                    if (r == null) {
                                        sourceList.value = _uA()
                                    } else {
                                        sourceList.value = r
                                    }
                                }
                                if (sourceList.value.length > 0) {
                                    sourceList.value.forEach(fun(item){
                                        if (item.onlineState == 0) {
                                            c.offline++
                                        } else {
                                            c.online++
                                            if (item.runState == 1) {
                                                c.run++
                                            } else {
                                                c.stopped++
                                            }
                                            if (item.alarmState == 1) {
                                                c.alarm++
                                            }
                                        }
                                    }
                                    )
                                }
                                equipCount.value = c
                                loadPage(currentPage, true)
                            }
                            ))
                        }
                         finally {
                            loading.value = false
                        }
                })
            }
            val reloadAll = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        currentPage = 1
                        await(reloadData())
                })
            }
            fun gen_onWorkshopChange_fn(payload: Boolean) {
                if (payload) {
                    reloadData()
                }
            }
            val onWorkshopChange = ::gen_onWorkshopChange_fn
            fun gen_onWorkshopOpenChange_fn(payload: Boolean) {
                poupOpen.value = payload
            }
            val onWorkshopOpenChange = ::gen_onWorkshopOpenChange_fn
            onReachBottom(fun(){
                loadMore()
            }
            )
            onLoad(fun(_options){
                timer = setInterval(fun(){
                    reloadData()
                }
                , config__1.equipRefreshTime)
            }
            )
            onShow(fun(){
                reloadAll()
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
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cV(_component_cl_topbar, _uM("fixed" to "", "background-color" to if (unref(isDark)) {
                            "black"
                        } else {
                            "white"
                        }
                        , "show-back" to false, "safe-area-top" to "", "height" to if (unref(isMp)()) {
                            null
                        } else {
                            100
                        }
                        , "pt" to object : UTSJSONObject() {
                            var className = "-important-z-50"
                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cE("view", _uM("class" to _nC(_uA(
                                    "flex flex-row items-end p-3 flex-1 w-full ml-5",
                                    _uM("pt-0" to unref(isMp)())
                                ))), _uA(
                                    _cE("view", _uM("class" to "flex flex-row flex-1"), _uA(
                                        _cV(_component_cl_text, _uM("color" to "primary", "pt" to object : UTSJSONObject() {
                                            var className = "-important-text-2xl"
                                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _tD(unref(t__1)("设备"))
                                            )
                                        }
                                        ), "_" to 1))
                                    )),
                                    _cE("view", _uM("class" to _nC(_uA(
                                        "flex flex-row justify-end ml-3",
                                        _uM("mr-32" to unref(isMp)(), "mr-3" to !unref(isMp)())
                                    )), "onClick" to setWorkshop), _uA(
                                        _cV(_component_cl_text, _uM("color" to "primary", "pt" to object : UTSJSONObject() {
                                            var className = "-important-text-base ml-2"
                                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _tD(unref(workshopTree).selectNode.value.label)
                                            )
                                        }
                                        ), "_" to 1)),
                                        _cV(_component_cl_icon, _uM("name" to "arrow-right-s-line", "color" to "primary", "pt" to object : UTSJSONObject() {
                                            var className = "-important-text-base mb-1"
                                        }))
                                    ), 2)
                                ), 2)
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "background-color",
                            "height"
                        )),
                        _cE("view", _uM("class" to "flex flex-row p-3 status-summary"), _uA(
                            _cE("view", _uM("class" to "summary-item"), _uA(
                                _cE("view", _uM("class" to "status-dot online shadow")),
                                _cE("text", null, _tD(unref(t__1)("在线")) + " " + _tD(equipCount.value.online), 1)
                            )),
                            _cE("view", _uM("class" to "summary-item"), _uA(
                                _cE("view", _uM("class" to "status-dot offline shadow")),
                                _cE("text", null, _tD(unref(t__1)("离线")) + " " + _tD(equipCount.value.offline), 1)
                            )),
                            _cE("view", _uM("class" to "summary-item"), _uA(
                                _cE("view", _uM("class" to "status-dot run shadow")),
                                _cE("text", null, _tD(unref(t__1)("运行")) + " " + _tD(equipCount.value.run), 1)
                            )),
                            _cE("view", _uM("class" to "summary-item"), _uA(
                                _cE("view", _uM("class" to "status-dot stopped shadow")),
                                _cE("text", null, _tD(unref(t__1)("停止")) + " " + _tD(equipCount.value.stopped), 1)
                            )),
                            _cE("view", _uM("class" to "summary-item"), _uA(
                                _cE("view", _uM("class" to "status-dot alarm shadow")),
                                _cE("text", null, _tD(unref(t__1)("报警")) + " " + _tD(equipCount.value.alarm), 1)
                            ))
                        )),
                        _cE("view", _uM("class" to "flex flex-row p-3 device-list-masonry"), _uA(
                            _cE(Fragment, null, RenderHelpers.renderList(equipList.value, fun(item, index, __index, _cached): Any {
                                return _cE("view", _uM("key" to index, "class" to _nC(_uA(
                                    "device-card",
                                    _uM("is-run" to (item.runState == 1 && item.alarmState == 0), "is-alarm" to (item.alarmState == 1), "is-offline" to (item.onlineState == 0))
                                )), "arrow" to "", "hoverable" to "", "onClick" to fun(){
                                    unref(router).to("/pages/equip/equip_detail?id=" + item.id)
                                }
                                ), _uA(
                                    _cE("view", _uM("class" to "image-wrap"), _uA(
                                        _cE("image", _uM("src" to typeImage(item), "mode" to "aspectFill", "class" to "device-image"), null, 8, _uA(
                                            "src"
                                        )),
                                        _cE("view", _uM("class" to "name-overlay"), _uA(
                                            _cE("text", _uM("class" to "device-name", "bold" to ""), _tD(item.name), 1),
                                            _cE("text", _uM("class" to "workshop-name", "style" to _nS(_uM("padding-top" to "2%"))), _tD(item.workshop?.name), 5)
                                        )),
                                        _cV(unref(GenPagesIndexComponentsEquipBadgeClass), _uM("equip" to item), null, 8, _uA(
                                            "equip"
                                        ))
                                    )),
                                    _cE("view", _uM("class" to "card-footer"), _uA(
                                        _cE("view", _uM("class" to "status-item"), _uA(
                                            _cE("text", _uM("class" to "desc"), _tD(unref(t__1)("在线状态")) + " :", 1),
                                            _cE("view", _uM("class" to _nC(_uA(
                                                "status-dot",
                                                if (item.onlineState == 1) {
                                                    "online"
                                                } else {
                                                    "offline"
                                                }
                                            ))), null, 2)
                                        )),
                                        _cE("view", _uM("class" to "status-item"), _uA(
                                            _cE("text", _uM("class" to "desc"), _tD(unref(t__1)("运行状态")) + " :", 1),
                                            _cE("view", _uM("class" to _nC(_uA(
                                                "status-dot",
                                                if (item.onlineState == 0) {
                                                    "offline"
                                                } else {
                                                    if (item.runState == 1) {
                                                        "run"
                                                    } else {
                                                        "stopped"
                                                    }
                                                }
                                            ))), null, 2)
                                        )),
                                        _cE(Fragment, null, RenderHelpers.renderList(item.alarmTexts, fun(i2, idx2, __index, _cached): Any {
                                            return _cE("view", _uM("key" to idx2), _uA(
                                                _cE("view", _uM("class" to "status-item"), _uA(
                                                    _cE("text", _uM("class" to "desc text-red-500"), _tD(i2), 1)
                                                ))
                                            ))
                                        }
                                        ), 128),
                                        _cE(Fragment, null, RenderHelpers.renderList(item.attrs, fun(i, idx, __index, _cached): Any {
                                            return _cE("view", _uM("key" to idx), _uA(
                                                _cE("view", _uM("class" to "status-item"), _uA(
                                                    _cE("text", _uM("class" to "desc"), _tD(i.name) + " :", 1),
                                                    _cE("text", _uM("class" to "desc"), _tD(if (i.value == null) {
                                                        unref(t__1)("暂未获取")
                                                    } else {
                                                        i.value
                                                    }
                                                    ), 1)
                                                ))
                                            ))
                                        }
                                        ), 128)
                                    ))
                                ), 10, _uA(
                                    "onClick"
                                ))
                            }
                            ), 128)
                        )),
                        if (isTrue(pageloading.value)) {
                            _cE("text", _uM("key" to 0, "class" to "text-center p-2 text-gray-300"), "加载中…")
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        _cV(unref(GenComponentsTabbarClass))
                    )
                }
                ), "_" to 1))
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
                return _uM("run" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#52c41a"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(82, 196, 26, 0.6)")), "stopped" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#FAAD14"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(250, 173, 20, 0.6)")), "online" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#1890ff"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(24, 144, 255, 0.6)")), "alarm" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#ff4d4f"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(255, 77, 79, 0.8)")), "offline" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "#bfbfbf")), "device-list-masonry" to _pS(_uM("marginBottom" to "28rpx", "display" to "flex", "flexWrap" to "wrap", "justifyContent" to "space-between")), "device-card" to _uM("" to _uM("width" to "48%", "marginTop" to "7rpx", "marginRight" to "7rpx", "marginBottom" to "7rpx", "marginLeft" to "7rpx", "overflow" to "hidden", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(243,244,246,1)", "borderRightColor" to "rgba(243,244,246,1)", "borderBottomColor" to "rgba(243,244,246,1)", "borderLeftColor" to "rgba(243,244,246,1)", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "7rpx", "paddingRight" to "7rpx", "paddingBottom" to "7rpx", "paddingLeft" to "7rpx"), ".is-offline" to _uM("opacity" to 0.6), ".is-alarm" to _uM("borderTopColor" to "#ff4d4f", "borderRightColor" to "#ff4d4f", "borderBottomColor" to "#ff4d4f", "borderLeftColor" to "#ff4d4f", "boxShadow" to "0 0 6px rgba(255, 77, 79, 0.8)")), "image-wrap" to _pS(_uM("height" to "180rpx", "backgroundImage" to "none", "backgroundColor" to "#f0f2f5", "position" to "relative", "width" to "100%")), "device-image" to _pS(_uM("height" to "100%", "width" to "100%")), "name-overlay" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "rgba(220,220,220,0.8)", "position" to "absolute", "bottom" to 0, "left" to 0, "width" to "100%", "paddingTop" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "21rpx", "paddingRight" to "21rpx")), "device-name" to _pS(_uM("fontSize" to "42rpx", "lineHeight" to "56rpx", "color" to "rgba(75,85,99,1)")), "workshop-name" to _pS(_uM("fontSize" to "21rpx", "lineHeight" to "28rpx", "color" to "rgba(107,114,128,1)")), "card-footer" to _uM("" to _uM("paddingTop" to "3%", "paddingRight" to "10%", "paddingBottom" to "5%", "paddingLeft" to "10%"), ".column" to _uM("marginBottom" to "35rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "flex-start")), "status-item" to _pS(_uM("display" to "flex", "width" to "100%", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "desc" to _uM(".status-item " to _uM("fontSize" to "24.5rpx", "lineHeight" to "35rpx")), "status-dot" to _uM("" to _uM("boxSizing" to "border-box", "display" to "flex", "height" to "21rpx", "width" to "21rpx", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999), ".summary-item " to _uM("borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "rgba(0,0,0,0.15)", "borderRightColor" to "rgba(0,0,0,0.15)", "borderBottomColor" to "rgba(0,0,0,0.15)", "borderLeftColor" to "rgba(0,0,0,0.15)", "marginRight" to "14rpx", "marginBottom" to "17.5rpx", "boxSizing" to "border-box", "height" to "28rpx", "width" to "28rpx", "alignItems" to "center", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999)), "status-summary" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,1)", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#ebedf0", "borderRightColor" to "#ebedf0", "borderBottomColor" to "#ebedf0", "borderLeftColor" to "#ebedf0", "boxShadow" to "0 2rpx 6rpx rgba(0, 0, 0, 0.1)", "marginTop" to "14rpx", "marginRight" to "14rpx", "marginBottom" to "14rpx", "marginLeft" to "14rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "space-between", "borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx")), "summary-item" to _pS(_uM("display" to "flex", "alignItems" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
