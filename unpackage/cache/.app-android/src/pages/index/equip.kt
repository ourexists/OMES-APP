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
            val viewMode = ref<String>("card")
            val statusFilter = ref<StatusFilterKey>(null)
            fun gen_getFilteredSourceList_fn(): UTSArray<Equip> {
                val list = sourceList.value
                val f = statusFilter.value
                if (f == null) {
                    return list
                }
                return list.filter(fun(item: Equip): Boolean {
                    if (f === "online") {
                        return item.onlineState === 1
                    }
                    if (f === "offline") {
                        return item.onlineState === 0
                    }
                    if (f === "run") {
                        return item.onlineState === 1 && item.runState === 1
                    }
                    if (f === "stopped") {
                        return item.onlineState === 1 && item.runState === 0
                    }
                    if (f === "alarm") {
                        return item.alarmState === 1
                    }
                    return true
                }
                )
            }
            val getFilteredSourceList = ::gen_getFilteredSourceList_fn
            fun gen_setWorkshop_fn() {
                router.to("/pages/equip/workshop_tree")
            }
            val setWorkshop = ::gen_setWorkshop_fn
            fun gen_typeImage_fn(equip: Equip): String {
                return equipImage(equip)
            }
            val typeImage = ::gen_typeImage_fn
            fun gen_getAlarmTexts_fn(item: Equip): UTSArray<String> {
                return item.alarmTexts ?: _uA()
            }
            val getAlarmTexts = ::gen_getAlarmTexts_fn
            fun gen_getAttrs_fn(item: Equip): UTSArray<EquipAttr> {
                return item.attrs ?: _uA()
            }
            val getAttrs = ::gen_getAttrs_fn
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
                    val list = getFilteredSourceList()
                    val nextPage = list.slice(start, end)
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
                if (start >= getFilteredSourceList().length) {
                    return
                }
                currentPage = nextPage
                loadPage(currentPage, false)
            }
            val loadMore = ::gen_loadMore_fn
            fun gen_setStatusFilter_fn(key: StatusFilterKey) {
                statusFilter.value = if (statusFilter.value === key) {
                    null
                } else {
                    key
                }
                currentPage = 1
                loadPage(1, true)
            }
            val setStatusFilter = ::gen_setStatusFilter_fn
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
                if (timer != null) {
                    clearInterval(timer as Number)
                }
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
                                    "flex flex-row items-center p-3 flex-1 w-full ml-5",
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
                                    _cE("view", _uM("class" to "flex flex-row items-center gap-2"), _uA(
                                        _cE("view", _uM("class" to _nC(_uA(
                                            "flex items-center justify-center w-8 h-8 rounded-lg",
                                            if (unref(isDark)) {
                                                "bg-gray-700"
                                            } else {
                                                "bg-gray-200"
                                            }
                                        )), "onClick" to fun(){
                                            viewMode.value = if (viewMode.value === "card") {
                                                "list"
                                            } else {
                                                "card"
                                            }
                                        }
                                        ), _uA(
                                            _cV(_component_cl_icon, _uM("name" to if (viewMode.value === "card") {
                                                "list-view"
                                            } else {
                                                "apps-line"
                                            }
                                            , "color" to "primary", "pt" to object : UTSJSONObject() {
                                                var className = "-important-text-lg"
                                            }), null, 8, _uA(
                                                "name"
                                            ))
                                        ), 10, _uA(
                                            "onClick"
                                        )),
                                        _cE("view", _uM("class" to _nC(_uA(
                                            "flex flex-row justify-end ml-1",
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
                                    ))
                                ), 2)
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "background-color",
                            "height"
                        )),
                        _cE("view", _uM("class" to "flex flex-row p-3 status-summary"), _uA(
                            _cE("view", _uM("class" to _nC(_uA(
                                "summary-item",
                                _uM("summary-item-active" to (statusFilter.value === "online"))
                            )), "onClick" to fun(){
                                setStatusFilter("online")
                            }
                            ), _uA(
                                _cE("view", _uM("class" to "status-dot online shadow")),
                                _cE("view", _uM("class" to "summary-item-col"), _uA(
                                    _cE("text", _uM("class" to "summary-item-txt"), _tD(unref(t__1)("在线")), 1),
                                    _cE("text", _uM("class" to "summary-item-num"), _tD(equipCount.value.online), 1)
                                ))
                            ), 10, _uA(
                                "onClick"
                            )),
                            _cE("view", _uM("class" to _nC(_uA(
                                "summary-item",
                                _uM("summary-item-active" to (statusFilter.value === "offline"))
                            )), "onClick" to fun(){
                                setStatusFilter("offline")
                            }
                            ), _uA(
                                _cE("view", _uM("class" to "status-dot offline shadow")),
                                _cE("view", _uM("class" to "summary-item-col"), _uA(
                                    _cE("text", _uM("class" to "summary-item-txt"), _tD(unref(t__1)("离线")), 1),
                                    _cE("text", _uM("class" to "summary-item-num"), _tD(equipCount.value.offline), 1)
                                ))
                            ), 10, _uA(
                                "onClick"
                            )),
                            _cE("view", _uM("class" to _nC(_uA(
                                "summary-item",
                                _uM("summary-item-active" to (statusFilter.value === "run"))
                            )), "onClick" to fun(){
                                setStatusFilter("run")
                            }
                            ), _uA(
                                _cE("view", _uM("class" to "status-dot run shadow")),
                                _cE("view", _uM("class" to "summary-item-col"), _uA(
                                    _cE("text", _uM("class" to "summary-item-txt"), _tD(unref(t__1)("运行")), 1),
                                    _cE("text", _uM("class" to "summary-item-num"), _tD(equipCount.value.run), 1)
                                ))
                            ), 10, _uA(
                                "onClick"
                            )),
                            _cE("view", _uM("class" to _nC(_uA(
                                "summary-item",
                                _uM("summary-item-active" to (statusFilter.value === "stopped"))
                            )), "onClick" to fun(){
                                setStatusFilter("stopped")
                            }
                            ), _uA(
                                _cE("view", _uM("class" to "status-dot stopped shadow")),
                                _cE("view", _uM("class" to "summary-item-col"), _uA(
                                    _cE("text", _uM("class" to "summary-item-txt"), _tD(unref(t__1)("停止")), 1),
                                    _cE("text", _uM("class" to "summary-item-num"), _tD(equipCount.value.stopped), 1)
                                ))
                            ), 10, _uA(
                                "onClick"
                            )),
                            _cE("view", _uM("class" to _nC(_uA(
                                "summary-item",
                                _uM("summary-item-active" to (statusFilter.value === "alarm"))
                            )), "onClick" to fun(){
                                setStatusFilter("alarm")
                            }
                            ), _uA(
                                _cE("view", _uM("class" to "status-dot alarm shadow")),
                                _cE("view", _uM("class" to "summary-item-col"), _uA(
                                    _cE("text", _uM("class" to "summary-item-txt"), _tD(unref(t__1)("报警")), 1),
                                    _cE("text", _uM("class" to "summary-item-num"), _tD(equipCount.value.alarm), 1)
                                ))
                            ), 10, _uA(
                                "onClick"
                            ))
                        )),
                        if (viewMode.value === "card") {
                            _cE("view", _uM("key" to 0, "class" to "device-card-list"), _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(equipList.value, fun(item, index, __index, _cached): Any {
                                    return _cE("view", _uM("key" to index, "class" to _nC(_uA(
                                        "device-card",
                                        _uM("is-run" to (item.runState == 1 && item.alarmState == 0), "is-alarm" to (item.alarmState == 1), "is-offline" to (item.onlineState == 0))
                                    )), "onClick" to fun(){
                                        unref(router).to("/pages/equip/equip_detail?id=" + item.id)
                                    }), _uA(
                                        _cE("view", _uM("class" to "card-main"), _uA(
                                            _cE("view", _uM("class" to "card-img-wrap"), _uA(
                                                _cE("image", _uM("src" to typeImage(item), "mode" to "aspectFill", "class" to "card-img"), null, 8, _uA(
                                                    "src"
                                                )),
                                                _cV(unref(GenPagesIndexComponentsEquipBadgeClass), _uM("equip" to item), null, 8, _uA(
                                                    "equip"
                                                ))
                                            )),
                                            _cE("view", _uM("class" to "card-info"), _uA(
                                                _cE("text", _uM("class" to "card-name"), _tD(item.name), 1),
                                                _cE("text", _uM("class" to "card-workshop"), _tD(item.workshop?.name), 1),
                                                _cE("text", _uM("class" to "card-sn"), _tD(item.selfCode), 1),
                                                _cE("view", _uM("class" to "card-status-row"), _uA(
                                                    _cE("view", _uM("class" to _nC(_uA(
                                                        "status-dot card-dot",
                                                        if (item.onlineState == 1) {
                                                            "online"
                                                        } else {
                                                            "offline"
                                                        }
                                                    ))), null, 2),
                                                    _cE("text", _uM("class" to "card-status-txt"), _tD(if (item.onlineState == 1) {
                                                        unref(t__1)("在线")
                                                    } else {
                                                        unref(t__1)("离线")
                                                    }), 1),
                                                    _cE("view", _uM("class" to _nC(_uA(
                                                        "status-dot card-dot",
                                                        if (item.onlineState == 0) {
                                                            "offline"
                                                        } else {
                                                            if (item.runState == 1) {
                                                                "run"
                                                            } else {
                                                                "stopped"
                                                            }
                                                        }
                                                    ))), null, 2),
                                                    _cE("text", _uM("class" to "card-status-txt"), _tD(if (item.onlineState == 0) {
                                                        "-"
                                                    } else {
                                                        if (item.runState == 1) {
                                                            unref(t__1)("运行")
                                                        } else {
                                                            unref(t__1)("停止")
                                                        }
                                                    }), 1),
                                                    if (item.alarmState == 1) {
                                                        _cE(Fragment, _uM("key" to 0), _uA(
                                                            _cE("view", _uM("class" to "status-dot card-dot alarm")),
                                                            _cE("text", _uM("class" to "card-status-txt card-alarm-label"), _tD(unref(t__1)("报警")), 1)
                                                        ), 64)
                                                    } else {
                                                        _cC("v-if", true)
                                                    }
                                                ))
                                            ))
                                        )),
                                        if (isTrue(getAlarmTexts(item).length > 0 || getAttrs(item).length > 0)) {
                                            _cE("view", _uM("key" to 0, "class" to "card-dynamic"), _uA(
                                                _cE(Fragment, null, RenderHelpers.renderList(getAlarmTexts(item), fun(i2, idx2, __index, _cached): Any {
                                                    return _cE("view", _uM("key" to ("alarm-" + idx2), "class" to "card-alarm-row"), _uA(
                                                        _cE("text", _uM("class" to "card-alarm-txt"), _tD(i2), 1)
                                                    ))
                                                }), 128),
                                                _cE(Fragment, null, RenderHelpers.renderList(getAttrs(item), fun(i, idx, __index, _cached): Any {
                                                    return _cE("view", _uM("key" to ("attr-" + idx), "class" to "card-attr-row"), _uA(
                                                        _cE("text", _uM("class" to "card-attr-label"), _tD(i.name), 1),
                                                        _cE("text", _uM("class" to "card-attr-value"), _tD(if (i.value == null) {
                                                            unref(t__1)("暂未获取")
                                                        } else {
                                                            i.value
                                                        }) + _tD(if ((i.unit != null && i.unit !== "")) {
                                                            " " + i.unit!!
                                                        } else {
                                                            ""
                                                        }), 1)
                                                    ))
                                                }), 128)
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    ), 10, _uA(
                                        "onClick"
                                    ))
                                }), 128)
                            ))
                        } else {
                            _cE("view", _uM("key" to 1, "class" to "px-3 pb-4 device-list-wrap"), _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(equipList.value, fun(item, index, __index, _cached): Any {
                                    return _cE("view", _uM("key" to index, "class" to _nC(_uA(
                                        "device-list-item",
                                        _uM("is-run" to (item.runState == 1 && item.alarmState == 0), "is-alarm" to (item.alarmState == 1), "is-offline" to (item.onlineState == 0))
                                    )), "onClick" to fun(){
                                        unref(router).to("/pages/equip/equip_detail?id=" + item.id)
                                    }
                                    ), _uA(
                                        _cE("view", _uM("class" to "device-list-thumb"), _uA(
                                            _cE("image", _uM("src" to typeImage(item), "mode" to "aspectFill", "class" to "device-list-image"), null, 8, _uA(
                                                "src"
                                            )),
                                            _cV(unref(GenPagesIndexComponentsEquipBadgeClass), _uM("equip" to item), null, 8, _uA(
                                                "equip"
                                            ))
                                        )),
                                        _cE("view", _uM("class" to "device-list-body"), _uA(
                                            _cE("text", _uM("class" to "device-list-name"), _tD(item.name), 1),
                                            _cE("text", _uM("class" to "device-list-meta"), _tD(item.workshop?.name) + " · " + _tD(item.selfCode), 1),
                                            _cE("view", _uM("class" to "device-list-status"), _uA(
                                                _cE("view", _uM("class" to _nC(_uA(
                                                    "status-dot list-dot",
                                                    if (item.onlineState == 1) {
                                                        "online"
                                                    } else {
                                                        "offline"
                                                    }
                                                ))), null, 2),
                                                _cE("text", _uM("class" to "status-label"), _tD(if (item.onlineState == 1) {
                                                    unref(t__1)("在线")
                                                } else {
                                                    unref(t__1)("离线")
                                                }
                                                ), 1),
                                                _cE("view", _uM("class" to _nC(_uA(
                                                    "status-dot list-dot ml-2",
                                                    if (item.onlineState == 0) {
                                                        "offline"
                                                    } else {
                                                        if (item.runState == 1) {
                                                            "run"
                                                        } else {
                                                            "stopped"
                                                        }
                                                    }
                                                ))), null, 2),
                                                _cE("text", _uM("class" to "status-label"), _tD(if (item.onlineState == 0) {
                                                    "-"
                                                } else {
                                                    if (item.runState == 1) {
                                                        unref(t__1)("运行")
                                                    } else {
                                                        unref(t__1)("停止")
                                                    }
                                                }
                                                ), 1)
                                            ))
                                        )),
                                        _cV(_component_cl_icon, _uM("name" to "arrow-right-s-line", "color" to "primary", "pt" to object : UTSJSONObject() {
                                            var className = "-important-text-lg flex-shrink-0"
                                        }))
                                    ), 10, _uA(
                                        "onClick"
                                    ))
                                }
                                ), 128)
                            ))
                        }
                        ,
                        if (isTrue(pageloading.value)) {
                            _cE("text", _uM("key" to 2, "class" to "text-center p-2 loading-hint"), "加载中…")
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
                return _uM("run" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#52c41a"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(82, 196, 26, 0.6)")), "stopped" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#FAAD14"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(250, 173, 20, 0.6)")), "online" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#1890ff"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(24, 144, 255, 0.6)")), "alarm" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#ff4d4f"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(255, 77, 79, 0.8)")), "offline" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "#bfbfbf")), "device-card-list" to _pS(_uM("paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginBottom" to "28rpx", "display" to "flex", "flexDirection" to "column")), "device-card" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e5e7eb", "borderRightColor" to "#e5e7eb", "borderBottomColor" to "#e5e7eb", "borderLeftColor" to "#e5e7eb", "borderTopLeftRadius" to "16rpx", "borderTopRightRadius" to "16rpx", "borderBottomRightRadius" to "16rpx", "borderBottomLeftRadius" to "16rpx", "overflow" to "hidden", "position" to "relative", "transitionProperty" to "borderColor", "transitionDuration" to "0.2s", "transitionTimingFunction" to "ease", "boxShadow" to "0 2rpx 12rpx rgba(0, 0, 0, 0.06)", "paddingTop" to "12rpx", "paddingRight" to "12rpx", "paddingBottom" to "12rpx", "paddingLeft" to "12rpx", "boxSizing" to "border-box", "marginBottom" to "24rpx"), ".is-run" to _uM("borderTopColor" to "rgba(82,196,26,0.35)", "borderRightColor" to "rgba(82,196,26,0.35)", "borderBottomColor" to "rgba(82,196,26,0.35)", "borderLeftColor" to "rgba(82,196,26,0.35)"), ".is-alarm-colon--colon-before" to _uM("content" to "\"\"", "position" to "absolute", "left" to 0, "top" to 0, "width" to "6rpx", "height" to "100%", "backgroundImage" to "none", "backgroundColor" to "#f43f5e", "zIndex" to 1), ".is-offline" to _uM("opacity" to 0.65)), "device-card-colon-last-child" to _uM(".device-card-list " to _uM("marginBottom" to 0)), "card-main" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "height" to "160rpx", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "overflow" to "hidden", "backgroundImage" to "none", "backgroundColor" to "#fafbfc", "flexShrink" to 0)), "card-img-wrap" to _pS(_uM("width" to "160rpx", "height" to "160rpx", "flexShrink" to 0, "backgroundImage" to "none", "backgroundColor" to "#f1f5f9", "position" to "relative", "overflow" to "hidden")), "card-img" to _pS(_uM("width" to "100%", "height" to "100%", "opacity" to 0.92, "objectFit" to "cover")), "card-info" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "minWidth" to 0, "paddingTop" to "16rpx", "paddingRight" to "20rpx", "paddingBottom" to "16rpx", "paddingLeft" to "20rpx", "display" to "flex", "flexDirection" to "column", "justifyContent" to "center", "overflow" to "hidden")), "card-name" to _pS(_uM("color" to "#1e293b", "fontSize" to "30rpx", "lineHeight" to 1.35, "overflow" to "hidden", "textOverflow" to "ellipsis", "whiteSpace" to "nowrap")), "card-workshop" to _pS(_uM("color" to "#64748b", "fontSize" to "24rpx", "marginTop" to "8rpx")), "card-sn" to _pS(_uM("color" to "#94a3b8", "fontSize" to "22rpx", "marginTop" to "4rpx")), "card-status-row" to _pS(_uM("marginTop" to "12rpx", "display" to "flex", "flexDirection" to "row", "flexWrap" to "wrap", "alignItems" to "center", "gap" to "16rpx 24rpx")), "card-dot" to _pS(_uM("width" to "12rpx", "height" to "12rpx", "boxShadow" to "0 0 4rpx currentColor", "flexShrink" to 0)), "card-status-txt" to _pS(_uM("fontSize" to "22rpx", "color" to "#475569", "marginRight" to "4rpx")), "card-alarm-label" to _pS(_uM("color" to "#dc2626")), "card-dynamic" to _pS(_uM("paddingTop" to "12rpx", "paddingRight" to "24rpx", "paddingBottom" to "20rpx", "paddingLeft" to "24rpx", "backgroundImage" to "none", "backgroundColor" to "#f8fafc", "borderTopWidth" to 1, "borderTopStyle" to "solid", "borderTopColor" to "#f1f5f9", "maxHeight" to "260rpx", "overflowY" to "auto", "flexShrink" to 1)), "card-alarm-row" to _pS(_uM("marginBottom" to "6rpx")), "card-alarm-txt" to _pS(_uM("fontSize" to "32rpx", "fontWeight" to "700", "color" to "#dc2626")), "card-attr-row" to _pS(_uM("marginTop" to "10rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "card-attr-label" to _pS(_uM("fontSize" to "30rpx", "fontWeight" to "700", "color" to "#475569", "flexShrink" to 0, "marginRight" to "12rpx")), "card-attr-value" to _pS(_uM("fontSize" to "32rpx", "fontWeight" to "700", "color" to "#1e293b", "textAlign" to "right", "overflow" to "hidden", "textOverflow" to "ellipsis", "whiteSpace" to "nowrap")), "status-dot" to _uM("" to _uM("boxShadow" to "0 0 6px currentColor", "boxSizing" to "border-box", "display" to "flex", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999), ".summary-item " to _uM("borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(0,0,0,0.08)", "borderRightColor" to "rgba(0,0,0,0.08)", "borderBottomColor" to "rgba(0,0,0,0.08)", "borderLeftColor" to "rgba(0,0,0,0.08)", "width" to "28rpx", "height" to "28rpx", "minWidth" to "28rpx", "minHeight" to "28rpx", "marginBottom" to "6rpx", "flexShrink" to 0, "overflow" to "visible", "boxShadow" to "0 0 6rpx currentColor", "boxSizing" to "border-box", "display" to "flex", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999)), "status-summary" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "#f8fafc", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "marginTop" to "12rpx", "marginRight" to "24rpx", "marginBottom" to "12rpx", "marginLeft" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "overflow" to "visible", "display" to "flex", "flexWrap" to "wrap", "alignItems" to "center", "justifyContent" to "space-between", "gap" to "8rpx 0")), "summary-item" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "minHeight" to "88rpx", "minWidth" to "80rpx", "overflow" to "visible", "cursor" to "pointer", "paddingTop" to "24rpx", "paddingRight" to "20rpx", "paddingBottom" to "24rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "transitionProperty" to "background", "transitionDuration" to "0.2s", "transitionTimingFunction" to "ease")), "summary-item-col" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "textAlign" to "center")), "summary-item-txt" to _pS(_uM("fontSize" to "22rpx", "color" to "#334155", "lineHeight" to 1.2, "textAlign" to "center")), "summary-item-num" to _pS(_uM("fontSize" to "26rpx", "color" to "#334155", "lineHeight" to 1.3, "marginTop" to "2rpx", "textAlign" to "center")), "summary-item-active" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "rgba(59,130,246,0.12)", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx")), "device-list-wrap" to _pS(_uM("display" to "flex", "flexDirection" to "column", "gap" to "14rpx")), "device-list-item" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e5e7eb", "borderRightColor" to "#e5e7eb", "borderBottomColor" to "#e5e7eb", "borderLeftColor" to "#e5e7eb", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "paddingTop" to "16rpx", "paddingRight" to "20rpx", "paddingBottom" to "16rpx", "paddingLeft" to "20rpx", "boxShadow" to "0 1rpx 4rpx rgba(0, 0, 0, 0.06)", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "transitionProperty" to "borderColor", "transitionDuration" to "0.2s", "transitionTimingFunction" to "ease"), ".is-offline" to _uM("opacity" to 0.6), ".is-alarm" to _uM("borderLeftWidth" to "4rpx", "borderLeftStyle" to "solid", "borderLeftColor" to "#f43f5e")), "device-list-thumb" to _pS(_uM("width" to "120rpx", "height" to "120rpx", "borderTopLeftRadius" to "8rpx", "borderTopRightRadius" to "8rpx", "borderBottomRightRadius" to "8rpx", "borderBottomLeftRadius" to "8rpx", "overflow" to "hidden", "backgroundImage" to "none", "backgroundColor" to "#f1f5f9", "flexShrink" to 0, "position" to "relative")), "device-list-image" to _pS(_uM("width" to "100%", "height" to "100%", "opacity" to 0.9)), "device-list-body" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "minWidth" to 0, "marginLeft" to "24rpx", "display" to "flex", "flexDirection" to "column", "justifyContent" to "center")), "device-list-name" to _pS(_uM("color" to "#1e293b", "fontSize" to "30rpx")), "device-list-meta" to _pS(_uM("color" to "#64748b", "fontSize" to "24rpx", "marginTop" to "6rpx")), "device-list-status" to _pS(_uM("marginTop" to "8rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "list-dot" to _uM(".device-list-status " to _uM("width" to "12rpx", "height" to "12rpx", "boxShadow" to "0 0 4px currentColor")), "status-label" to _uM(".device-list-status " to _uM("fontSize" to "22rpx", "color" to "#64748b", "marginLeft" to "6rpx")), "loading-hint" to _pS(_uM("color" to "#64748b", "fontSize" to "26rpx")), "@TRANSITION" to _uM("device-card" to _uM("property" to "borderColor", "duration" to "0.2s", "timingFunction" to "ease"), "summary-item" to _uM("property" to "background", "duration" to "0.2s", "timingFunction" to "ease"), "device-list-item" to _uM("property" to "borderColor", "duration" to "0.2s", "timingFunction" to "ease")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
