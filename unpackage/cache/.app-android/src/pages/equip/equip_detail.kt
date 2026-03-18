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
import io.dcloud.uniapp.extapi.setClipboardData as uni_setClipboardData
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesEquipEquipDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesEquipEquipDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesEquipEquipDetail
            val _cache = __ins.renderCache
            val ui = useUi()
            val refs = useRefs()
            var equipId: String = ""
            val equip = ref<Equip>(Equip(id = "-1", selfCode = "-1", name = t__1("无法识别"), type = 0, runState = 0, alarmState = 0, onlineState = 0))
            fun gen_attrValueWithUnit_fn(attr: EquipAttr): String {
                val kVal = if (attr.value == null) {
                    t__1("暂未获取")
                } else {
                    attr.value!!
                }
                val u = attr.unit
                if (u != null && u !== "") {
                    return kVal + " " + u
                }
                return kVal
            }
            val attrValueWithUnit = ::gen_attrValueWithUnit_fn
            fun gen_loadDetail_fn() {
                request(RequestOptions__1(url = apiPath["equip_realtime"] as String, method = "GET", data = object : UTSJSONObject() {
                    var id = equipId
                })).then(fun(res){
                    if (res == null) {
                        return
                    }
                    var r = parseData<Equip>(res)
                    if (r != null) {
                        equip.value = r
                    }
                }
                )
            }
            val loadDetail = ::gen_loadDetail_fn
            fun gen_copySn_fn() {
                if (equip.value?.selfCode == null) {
                    return
                }
                uni_setClipboardData(SetClipboardDataOptions(data = equip.value.selfCode, success = fun(_) {
                    uni_showToast(ShowToastOptions(title = t__1("已复制"), icon = "success", duration = 1200))
                }
                ))
            }
            val copySn = ::gen_copySn_fn
            fun gen_typeImage_fn(equip: Equip): String {
                return equipImage(equip)
            }
            val typeImage = ::gen_typeImage_fn
            onLoad(fun(options){
                if (options == null) {
                    return
                }
                equipId = options["id"] as String
                loadDetail()
            }
            )
            fun gen_toEquipHistory_fn() {
                if (equip.value!!.attrs == null || equip.value!!.attrs!!.length <= 0) {
                    return
                }
                router.to("/pages/equip/equip_collect?sn=" + equip.value.selfCode)
            }
            val toEquipHistory = ::gen_toEquipHistory_fn
            fun gen_openAttrChart_fn(attr: EquipAttr) {
                if (equip.value?.selfCode == null || attr?.name == null) {
                    return
                }
                val url = "/pages/equip/equip_collect?sn=" + UTSAndroid.consoleDebugError(encodeURIComponent(equip.value.selfCode), " at pages/equip/equip_detail.uvue:228") + "&attr=" + UTSAndroid.consoleDebugError(encodeURIComponent(attr.name), " at pages/equip/equip_detail.uvue:228")
                router.to(url)
            }
            val openAttrChart = ::gen_openAttrChart_fn
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cE("scroll-view", _uM("style" to _nS(_uM("flex" to 1)), "scroll-y" to "true", "scroll-x" to "false", "scroll-with-animation" to true), _uA(
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
                                                _tD(equip.value.name)
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
                            _cE("view", _uM("class" to "header-card card"), _uA(
                                _cE("view", _uM("class" to "header"), _uA(
                                    _cE("image", _uM("src" to typeImage(equip.value), "mode" to "aspectFill", "class" to "header-img"), null, 8, _uA(
                                        "src"
                                    )),
                                    _cV(unref(GenPagesIndexComponentsEquipBadgeClass), _uM("equip" to equip.value, "class" to "-important-text-xl"), null, 8, _uA(
                                        "equip"
                                    ))
                                )),
                                _cE("view", _uM("class" to "header-info"), _uA(
                                    _cE("text", _uM("class" to "device-name"), _tD(equip.value!!.name), 1),
                                    _cE("view", _uM("class" to "header-info-item"), _uA(
                                        _cE("text", _uM("class" to "name"), _tD(unref(t__1)("编号")), 1),
                                        _cE("view", _uM("class" to "sn-wrap"), _uA(
                                            _cE("text", _uM("class" to "device-sn"), _tD(equip.value!!.selfCode), 1),
                                            _cE("text", _uM("class" to "copy-btn", "onClick" to copySn), _tD(unref(t__1)("复制")), 1)
                                        ))
                                    )),
                                    _cE("view", _uM("class" to "header-info-item"), _uA(
                                        _cE("text", _uM("class" to "name"), _tD(unref(t__1)("场景")), 1),
                                        _cE("text", _uM("class" to "value"), _tD(equip.value!!.workshop?.name), 1)
                                    ))
                                ))
                            )),
                            _cE("view", _uM("class" to "status-card card"), _uA(
                                _cE("view", _uM("class" to "status-item"), _uA(
                                    _cE("text", _uM("class" to "label"), _tD(unref(t__1)("在线状态")), 1),
                                    _cE("view", _uM("class" to _nC(_uA(
                                        "dot shadow",
                                        if (equip.value!!.onlineState == 1) {
                                            "online"
                                        } else {
                                            "offline"
                                        }
                                    ))), null, 2)
                                )),
                                _cE("view", _uM("class" to "status-item"), _uA(
                                    _cE("text", _uM("class" to "label"), _tD(unref(t__1)("运行状态")), 1),
                                    _cE("view", _uM("class" to _nC(_uA(
                                        "dot shadow",
                                        if (equip.value!!.onlineState == 0) {
                                            "offline"
                                        } else {
                                            if (equip.value!!.runState == 1) {
                                                "run"
                                            } else {
                                                "stopped"
                                            }
                                        }
                                    ))), null, 2)
                                )),
                                _cE("view", _uM("class" to "status-item"), _uA(
                                    _cE("text", _uM("class" to "label"), _tD(unref(t__1)("报警状态")), 1),
                                    _cE("view", _uM("class" to _nC(_uA(
                                        "dot shadow",
                                        if (equip.value!!.onlineState == 0) {
                                            "offline"
                                        } else {
                                            if (equip.value!!.alarmState == 1) {
                                                "alarm"
                                            } else {
                                                "offline"
                                            }
                                        }
                                    ))), null, 2)
                                ))
                            )),
                            if (isTrue(equip.value!!.alarmTexts != null && equip.value!!.alarmTexts!!.length > 0)) {
                                _cE("view", _uM("key" to 0, "class" to "card attr-card"), _uA(
                                    _cE("text", _uM("class" to "card-title"), _tD(unref(t__1)("实时报警")), 1),
                                    _cE("view", _uM("class" to "attr-grid"), _uA(
                                        _cE(Fragment, null, RenderHelpers.renderList(equip.value!!.alarmTexts, fun(i2, idx2, __index, _cached): Any {
                                            return _cE("view", _uM("key" to idx2, "class" to "alarm-item"), _uA(
                                                _cE("text", _uM("class" to "value"), _tD(i2), 1)
                                            ))
                                        }), 128)
                                    ))
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            _cE("view", _uM("class" to "operate-card"), _uA(
                                _cE("view", _uM("class" to _nC(_uA(
                                    "operate-item",
                                    _uM("disabled" to (equip.value!!.attrs == null || equip.value!!.attrs!!.length <= 0))
                                )), "onClick" to toEquipHistory), _uA(
                                    _cE("view", _uM("class" to "icon-wrap"), _uA(
                                        _cV(_component_cl_icon, _uM("name" to "hospital-line", "class" to "icon"))
                                    )),
                                    _cE("text", _uM("class" to "name"), _tD(unref(t__1)("历史")), 1)
                                ), 2)
                            )),
                            if (isTrue(equip.value!!.attrs != null && equip.value!!.attrs!!.length > 0)) {
                                _cE("view", _uM("key" to 1, "class" to "attr-card card"), _uA(
                                    _cE("text", _uM("class" to "card-title"), _tD(unref(t__1)("实时数据")), 1),
                                    _cE("view", _uM("class" to "attr-grid"), _uA(
                                        _cE(Fragment, null, RenderHelpers.renderList(equip.value!!.attrs, fun(i, idx, __index, _cached): Any {
                                            return _cE("view", _uM("key" to idx, "class" to "attr-item attr-item-clickable", "onClick" to fun(){
                                                openAttrChart(i)
                                            }), _uA(
                                                _cV(_component_cl_icon, _uM("name" to "pushpin-line", "class" to "attr-item-pin", "color" to "primary", "pt" to object : UTSJSONObject() {
                                                    var className = "-important-text-base"
                                                })),
                                                _cE("text", _uM("class" to "value"), _tD(attrValueWithUnit(i)), 1),
                                                _cE("text", _uM("class" to "name"), _tD(i.name), 1)
                                            ), 8, _uA(
                                                "onClick"
                                            ))
                                        }), 128)
                                    ))
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
                return _uM("run" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#52c41a"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(82, 196, 26, 0.6)")), "stopped" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#FAAD14"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(250, 173, 20, 0.6)")), "online" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#1890ff"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(24, 144, 255, 0.6)")), "alarm" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#ff4d4f"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(255, 77, 79, 0.8)")), "offline" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "#bfbfbf")), "card" to _pS(_uM("boxShadow" to "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)", "marginLeft" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "28rpx", "paddingBottom" to "28rpx")), "header-card" to _pS(_uM("alignItems" to "stretch", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "overflow" to "hidden", "marginTop" to "14rpx", "display" to "flex", "flexDirection" to "row", "boxShadow" to "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)", "marginLeft" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "28rpx", "paddingBottom" to "28rpx")), "header" to _pS(_uM("width" to "200rpx", "height" to "200rpx", "flexShrink" to 0, "position" to "relative", "display" to "flex")), "header-img" to _uM(".header " to _uM("backgroundImage" to "none", "backgroundColor" to "#eef2f6", "height" to "100%", "width" to "100%")), "header-info" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "display" to "flex", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "flexDirection" to "column", "paddingLeft" to "28rpx", "paddingRight" to "28rpx", "paddingTop" to "21rpx", "paddingBottom" to "21rpx")), "device-name" to _uM(".header-info " to _uM("marginBottom" to "28rpx", "fontSize" to "35rpx", "lineHeight" to "49rpx", "color" to "rgba(30,41,59,1)")), "header-info-item" to _uM(".header-info " to _uM("borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "rgba(148,163,184,0.12)", "marginBottom" to "14rpx", "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between")), "name" to _uM(".header-info .header-info-item " to _uM("fontSize" to "28rpx", "lineHeight" to "42rpx", "color" to "rgba(71,85,105,1)"), ".disabled " to _uM("color" to "#9ca3af"), ".operate-card .operate-item " to _uM("color" to "#6b7280", "marginTop" to "7rpx", "fontSize" to "24.5rpx", "lineHeight" to "35rpx"), ".attr-card .attr-grid .attr-item " to _uM("color" to "#64748b", "fontSize" to "30rpx", "paddingRight" to "32rpx")), "value" to _uM(".header-info .header-info-item " to _uM("fontSize" to "21rpx", "lineHeight" to "28rpx", "color" to "rgba(148,163,184,1)"), ".attr-card .attr-grid .alarm-item " to _uM("color" to "#ffffff", "fontSize" to "24.5rpx", "lineHeight" to "35rpx"), ".attr-card .attr-grid .attr-item " to _uM("lineHeight" to 1.35, "color" to "#0f172a", "wordBreak" to "break-all", "fontSize" to "38rpx", "paddingRight" to "32rpx")), "workshop-name" to _uM(".header-info " to _uM("fontSize" to "21rpx", "lineHeight" to "28rpx", "color" to "rgba(100,116,139,1)")), "device-sn" to _uM(".header-info " to _uM("fontSize" to "21rpx", "lineHeight" to "28rpx", "color" to "rgba(148,163,184,1)")), "sn-wrap" to _uM(".header-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "gap" to "14rpx")), "copy-btn" to _uM(".header-info " to _uM("fontSize" to "22rpx", "color" to "#2563eb", "paddingTop" to "2rpx", "paddingRight" to "10rpx", "paddingBottom" to "2rpx", "paddingLeft" to "10rpx", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "backgroundImage" to "none", "backgroundColor" to "rgba(37,99,235,0.08)")), "copy-btn-colon-active" to _uM(".header-info " to _uM("opacity" to 0.7)), "disabled" to _pS(_uM("opacity" to 0.3)), "icon-wrap" to _uM(".disabled " to _uM("backgroundImage" to "none", "backgroundColor" to "#f1f5f9"), ".operate-card .operate-item " to _uM("backgroundImage" to "none", "backgroundColor" to "#f5f5f5", "display" to "flex", "height" to "84rpx", "width" to "84rpx", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999, "paddingTop" to "7rpx", "paddingRight" to "7rpx", "paddingBottom" to "7rpx", "paddingLeft" to "7rpx")), "icon" to _uM(".disabled " to _uM("color" to "#9ca3af")), "operate-card" to _pS(_uM("display" to "flex", "flexDirection" to "row", "paddingTop" to "28rpx", "paddingRight" to "28rpx", "paddingBottom" to "28rpx", "paddingLeft" to "28rpx", "boxShadow" to "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)", "marginLeft" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "backgroundColor" to "rgba(255,255,255,1)")), "operate-item" to _uM(".operate-card " to _uM("width" to "20%", "marginRight" to "35rpx", "marginLeft" to "35rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center")), "status-item" to _uM(".status-card " to _uM("marginTop" to "14rpx", "marginRight" to "14rpx", "marginBottom" to "14rpx", "marginLeft" to "14rpx", "display" to "flex", "width" to "100%", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "label" to _uM(".status-card .status-item " to _uM("marginLeft" to "28rpx", "width" to "50%", "fontSize" to "24.5rpx", "lineHeight" to "35rpx", "color" to "rgba(71,85,105,1)")), "dot" to _uM(".status-card .status-item " to _uM("marginRight" to "56rpx", "boxSizing" to "border-box", "display" to "flex", "height" to "21rpx", "width" to "21rpx", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999)), "attr-card" to _pS(_uM("paddingTop" to "40rpx", "paddingRight" to "40rpx", "paddingBottom" to "44rpx", "paddingLeft" to "40rpx")), "card-title" to _uM(".attr-card " to _uM("fontSize" to "40rpx", "color" to "#1e293b", "marginBottom" to "28rpx")), "attr-grid" to _uM(".attr-card " to _uM("display" to "flex", "width" to "100%", "flexDirection" to "row", "flexWrap" to "wrap", "gap" to "20rpx")), "alarm-item" to _uM(".attr-card .attr-grid " to _uM("backgroundImage" to "none", "backgroundColor" to "#ba0404", "boxSizing" to "border-box", "marginTop" to "14rpx", "marginRight" to "14rpx", "marginBottom" to "14rpx", "marginLeft" to "14rpx", "borderTopLeftRadius" to "7rpx", "borderTopRightRadius" to "7rpx", "borderBottomRightRadius" to "7rpx", "borderBottomLeftRadius" to "7rpx", "paddingTop" to "14rpx", "paddingRight" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "14rpx")), "attr-item-clickable" to _uM(".attr-card .attr-grid " to _uM("cursor" to "pointer", "transitionProperty" to "opacity", "transitionDuration" to "0.2s")), "attr-item-clickable-colon-active" to _uM(".attr-card .attr-grid " to _uM("opacity" to 0.85)), "attr-item" to _uM(".attr-card .attr-grid " to _uM("minHeight" to "140rpx", "backgroundImage" to "none", "backgroundColor" to "#f5f6f8", "boxSizing" to "border-box", "position" to "relative", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "28rpx", "paddingRight" to "52rpx", "paddingBottom" to "28rpx", "paddingLeft" to "32rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "flex-start", "justifyContent" to "center", "gap" to "12rpx")), "attr-item-pin" to _uM(".attr-card .attr-grid .attr-item " to _uM("position" to "absolute", "top" to "20rpx", "right" to "20rpx", "opacity" to 0.6, "fontSize" to "40rpx")), "action-bar" to _pS(_uM("display" to "flex", "gap" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "btn" to _uM(".action-bar " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "borderTopLeftRadius" to "40rpx", "borderTopRightRadius" to "40rpx", "borderBottomRightRadius" to "40rpx", "borderBottomLeftRadius" to "40rpx")), "primary" to _uM(".action-bar " to _uM("backgroundImage" to "none", "backgroundColor" to "#2563eb", "borderTopLeftRadius" to "32rpx", "borderTopRightRadius" to "32rpx", "borderBottomRightRadius" to "32rpx", "borderBottomLeftRadius" to "32rpx", "color" to "#ffffff")), "@TRANSITION" to _uM("attr-item-clickable" to _uM("property" to "opacity", "duration" to "0.2s")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
