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
                router.to("/pages/equip/equip_collect?sn=" + equip.value.selfCode)
            }
            val toEquipHistory = ::gen_toEquipHistory_fn
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_button = resolveEasyComponent("cl-button", GenUniModulesCoolUnixComponentsClButtonClButtonClass)
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
                            _cE("view", _uM("class" to "header"), _uA(
                                _cE("image", _uM("src" to typeImage(equip.value), "mode" to "aspectFill", "class" to "header-img"), null, 8, _uA(
                                    "src"
                                )),
                                _cV(unref(GenPagesIndexComponentsEquipBadgeClass), _uM("equip" to equip.value, "class" to "-important-text-xl"), null, 8, _uA(
                                    "equip"
                                )),
                                _cE("view", _uM("class" to "header-info"), _uA(
                                    _cE("text", _uM("class" to "device-name"), _tD(equip.value!!.name), 1),
                                    _cE("text", _uM("class" to "workshop-name"), _tD(equip.value!!.workshop?.name), 1),
                                    _cE("text", _uM("class" to "device-sn"), _tD(equip.value!!.selfCode), 1)
                                ))
                            )),
                            _cE("view", _uM("class" to "status-card"), _uA(
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
                                _cE("view", _uM("key" to 0, "class" to "attr-card"), _uA(
                                    _cE("text", _uM("class" to "card-title"), _tD(unref(t__1)("实时报警")), 1),
                                    _cE(Fragment, null, RenderHelpers.renderList(equip.value!!.alarmTexts, fun(i2, idx2, __index, _cached): Any {
                                        return _cE("view", _uM("key" to idx2, "class" to "attr-item"), _uA(
                                            _cE("text", _uM("class" to "text-red-500"), _tD(i2), 1)
                                        ))
                                    }), 128)
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            if (isTrue(equip.value!!.attrs != null && equip.value!!.attrs!!.length > 0)) {
                                _cE("view", _uM("key" to 1, "class" to "attr-card"), _uA(
                                    _cE("text", _uM("class" to "card-title"), _tD(unref(t__1)("实时数据")), 1),
                                    _cE(Fragment, null, RenderHelpers.renderList(equip.value!!.attrs, fun(i, idx, __index, _cached): Any {
                                        return _cE("view", _uM("key" to idx, "class" to "attr-item"), _uA(
                                            _cE("text", _uM("class" to "name"), _tD(i.name), 1),
                                            _cE("text", _uM("class" to "value"), _tD(if (i.value == null) {
                                                unref(t__1)("暂未获取")
                                            } else {
                                                i.value
                                            }), 1)
                                        ))
                                    }), 128)
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            if (isTrue(equip.value!!.attrs != null && equip.value!!.attrs!!.length > 0)) {
                                _cE("view", _uM("key" to 2, "class" to "action-bar"), _uA(
                                    _cV(_component_cl_button, _uM("size" to "large", "rounded" to "", "onClick" to toEquipHistory), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(unref(t__1)("历史曲线"))
                                        )
                                    }), "_" to 1))
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
                return _uM("run" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#52c41a"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(82, 196, 26, 0.6)")), "stopped" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#FAAD14"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(250, 173, 20, 0.6)")), "online" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#1890ff"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(24, 144, 255, 0.6)")), "alarm" to _uM("" to _uM("backgroundImage" to "none", "backgroundColor" to "#ff4d4f"), ".shadow" to _uM("boxShadow" to "0 0 6px rgba(255, 77, 79, 0.8)")), "offline" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "#bfbfbf")), "device-detail" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "#f6f7f9")), "header" to _pS(_uM("height" to "420rpx", "position" to "relative", "marginTop" to "35rpx")), "header-img" to _uM(".header " to _uM("height" to "100%", "width" to "100%")), "header-info" to _uM(".header " to _uM("backgroundImage" to "none", "backgroundColor" to "rgba(220,220,220,0.8)", "position" to "absolute", "bottom" to 0, "left" to 0, "width" to "100%", "paddingTop" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "21rpx", "paddingRight" to "21rpx")), "device-name" to _uM(".header .header-info " to _uM("fontSize" to "42rpx", "lineHeight" to "56rpx", "color" to "rgba(75,85,99,1)")), "device-sn" to _uM(".header .header-info " to _uM("fontSize" to "28rpx", "lineHeight" to "42rpx", "color" to "rgba(156,163,175,1)")), "workshop-name" to _uM(".header .header-info " to _uM("fontSize" to "21rpx", "lineHeight" to "28rpx", "color" to "rgba(107,114,128,1)")), "status-card" to _pS(_uM("marginTop" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "marginLeft" to "28rpx", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "backgroundColor" to "rgba(255,255,255,1)")), "status-item" to _uM(".status-card " to _uM("marginTop" to "14rpx", "marginRight" to "14rpx", "marginBottom" to "14rpx", "marginLeft" to "14rpx", "display" to "flex", "width" to "100%", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "label" to _uM(".status-card .status-item " to _uM("marginLeft" to "28rpx", "width" to "50%")), "dot" to _uM(".status-card .status-item " to _uM("marginRight" to "56rpx", "boxSizing" to "border-box", "display" to "flex", "height" to "21rpx", "width" to "21rpx", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999)), "attr-card" to _pS(_uM("marginTop" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "marginLeft" to "28rpx", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "backgroundColor" to "rgba(255,255,255,1)")), "card-title" to _uM(".attr-card " to _uM("marginTop" to "28rpx", "marginLeft" to "28rpx", "fontSize" to "35rpx", "lineHeight" to "49rpx", "fontWeight" to "700", "color" to "rgba(75,85,99,1)")), "attr-item" to _uM(".attr-card " to _uM("marginTop" to "28rpx", "marginRight" to "42rpx", "marginBottom" to "14rpx", "marginLeft" to "42rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "borderBottomWidth" to 1, "borderTopColor" to "rgba(229,231,235,1)", "borderRightColor" to "rgba(229,231,235,1)", "borderBottomColor" to "rgba(229,231,235,1)", "borderLeftColor" to "rgba(229,231,235,1)")), "action-bar" to _pS(_uM("display" to "flex", "gap" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "btn" to _uM(".action-bar " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "borderTopLeftRadius" to "40rpx", "borderTopRightRadius" to "40rpx", "borderBottomRightRadius" to "40rpx", "borderBottomLeftRadius" to "40rpx")), "primary" to _uM(".action-bar " to _uM("backgroundImage" to "none", "backgroundColor" to "#1677ff", "color" to "#ffffff")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
