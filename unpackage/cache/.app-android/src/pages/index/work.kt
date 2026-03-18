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
open class GenPagesIndexWork : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexWork) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexWork
            val _cache = __ins.renderCache
            val ui = useUi()
            val refs = useRefs()
            val workshopScada = ref<WorkshopScada?>(null)
            val realtimes = ref(_uA<WorkshopRealtimeCollect>())
            fun gen_setWorkshop_fn() {
                router.to("/pages/equip/workshop_tree")
            }
            val setWorkshop = ::gen_setWorkshop_fn
            fun gen_toScada_fn() {
                if (workshopScada.value == null) {
                    return
                }
                router.to("/pages/equip/workshop_scada?workshopCode=" + workshopTree.selectNode.value.id)
            }
            val toScada = ::gen_toScada_fn
            fun loadIframeUrl(workshopCode: Any?) {
                if (workshopCode == null || workshopCode == "-1" || workshopCode == -1) {
                    workshopScada.value = null
                    return
                }
                request(RequestOptions__1(url = apiPath["workshop_scada"] as String, method = "GET", data = _uO("workshopCode" to workshopCode, "platform" to 2))).then(fun(res){
                    if (res == null) {
                        workshopScada.value = null
                        return
                    }
                    val r = parseData<WorkshopScada>(res)
                    if (r == null || r.url == null || r.url == "") {
                        workshopScada.value = null
                        return
                    }
                    workshopScada.value = r
                }
                )
            }
            fun loadRealtime(workshopCode: Any?) {
                if (workshopCode == null || workshopCode == "-1" || workshopCode == -1) {
                    realtimes.value = _uA()
                    return
                }
                request(RequestOptions__1(url = apiPath["workshop_realtime"] as String, method = "GET", data = _uO("workshopCode" to workshopCode))).then(fun(res){
                    if (res == null) {
                        realtimes.value = _uA()
                        return
                    }
                    var r = parseData<UTSArray<WorkshopRealtimeCollect>>(res)
                    if (r == null) {
                        realtimes.value = _uA()
                        return
                    }
                    realtimes.value = r
                }
                )
            }
            watch(workshopTree.selectNode, fun(kVal: ClTreeItem?){
                if (kVal != null) {
                    loadIframeUrl(kVal.id)
                    loadRealtime(kVal.id)
                } else {
                    loadIframeUrl(null)
                    loadRealtime(null)
                }
            }
            )
            onLoad(fun(_options){
                loadIframeUrl(workshopTree.selectNode.value.id)
                loadRealtime(workshopTree.selectNode.value.id)
            }
            )
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_image = resolveEasyComponent("cl-image", GenUniModulesCoolUnixComponentsClImageClImageClass)
                val _component_cl_button = resolveEasyComponent("cl-button", GenUniModulesCoolUnixComponentsClButtonClButtonClass)
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
                                                _tD(unref(t__1)("场景"))
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
                        _cE("view", _uM("class" to "p-2 flex flex-col"), _uA(
                            _cE("view", _uM("class" to "header-card"), _uA(
                                _cV(_component_cl_image, _uM("class" to "image-wrap", "src" to "/static/icon/workshop.svg"), null, 8, _uA(
                                    "src"
                                )),
                                _cE("view", _uM("class" to "header-info"), _uA(
                                    _cE("view", _uM("class" to "scene-header"), _uA(
                                        _cE("text", _uM("class" to "sence-name"), _tD(unref(workshopTree).selectNode.value.label), 1),
                                        _cV(_component_cl_button, _uM("icon" to "arrow-left-right-line", "class" to "switch-btn", "onClick" to setWorkshop))
                                    )),
                                    _cE("view", _uM("class" to "header-info-item"), _uA(
                                        _cE("text", _uM("class" to "name"), _tD(unref(t__1)("编号")), 1),
                                        _cE("text", _uM("class" to "value"), _tD(unref(workshopTree).selectNode.value.id), 1)
                                    ))
                                ))
                            )),
                            _cE("view", _uM("class" to "operate-card"), _uA(
                                _cE("view", _uM("class" to _nC(_uA(
                                    "operate-item",
                                    _uM("disabled" to (workshopScada.value == null))
                                )), "onClick" to toScada), _uA(
                                    _cE("view", _uM("class" to "icon-wrap"), _uA(
                                        _cV(_component_cl_icon, _uM("name" to "hospital-line", "class" to "icon"))
                                    )),
                                    _cE("text", _uM("class" to "name"), _tD(unref(t__1)("工艺")), 1)
                                ), 2)
                            )),
                            if (isTrue(realtimes.value != null && realtimes.value.length > 0)) {
                                _cE("view", _uM("key" to 0, "class" to "attr-card card"), _uA(
                                    _cE("text", _uM("class" to "card-title"), _tD(unref(t__1)("场景属性")), 1),
                                    _cE("view", _uM("class" to "attr-grid"), _uA(
                                        _cE(Fragment, null, RenderHelpers.renderList(realtimes.value, fun(i, idx, __index, _cached): Any {
                                            return _cE("view", _uM("key" to idx, "class" to "attr-item"), _uA(
                                                _cV(_component_cl_icon, _uM("name" to "pushpin-line", "class" to "attr-item-pin", "color" to "primary", "pt" to object : UTSJSONObject() {
                                                    var className = "-important-text-base"
                                                })),
                                                _cE("text", _uM("class" to "value"), _tD(if (i.value == null) {
                                                    unref(t__1)("暂未获取")
                                                } else {
                                                    i.value
                                                }) + _tD(if ((i.unit != null && i.unit !== "")) {
                                                    " " + i.unit!!
                                                } else {
                                                    ""
                                                }), 1),
                                                _cE("text", _uM("class" to "name"), _tD(i.name), 1)
                                            ))
                                        }), 128)
                                    ))
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                        )),
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
                return _uM("card" to _pS(_uM("boxShadow" to "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)", "marginLeft" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "28rpx", "paddingBottom" to "28rpx")), "header-card" to _pS(_uM("alignItems" to "stretch", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "overflow" to "hidden", "marginTop" to "14rpx", "display" to "flex", "flexDirection" to "row", "boxShadow" to "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)", "marginLeft" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "28rpx", "paddingBottom" to "28rpx")), "image-wrap" to _uM(".header-card " to _uM("height" to "250rpx", "width" to "300rpx", "marginTop" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "marginLeft" to "28rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center")), "header-info" to _uM(".header-card " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "display" to "flex", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "flexDirection" to "column", "paddingLeft" to "28rpx", "paddingRight" to "28rpx", "paddingTop" to "21rpx", "paddingBottom" to "21rpx")), "scene-header" to _uM(".header-card .header-info " to _uM("marginBottom" to "28rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "sence-name" to _uM(".header-card .header-info .scene-header " to _uM("display" to "flex", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "35rpx", "lineHeight" to "49rpx", "color" to "rgba(30,41,59,1)")), "switch-btn" to _uM(".header-card .header-info .scene-header " to _uM("display" to "flex", "aspectRatio" to "1 / 1")), "header-info-item" to _uM(".header-card .header-info " to _uM("borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "rgba(148,163,184,0.12)", "marginBottom" to "14rpx", "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between")), "name" to _uM(".header-card .header-info .header-info-item " to _uM("fontSize" to "28rpx", "lineHeight" to "42rpx", "color" to "rgba(71,85,105,1)"), ".disabled " to _uM("color" to "#9ca3af"), ".operate-card .operate-item " to _uM("color" to "#6b7280", "marginTop" to "7rpx", "fontSize" to "24.5rpx", "lineHeight" to "35rpx"), ".attr-card .attr-grid .attr-item " to _uM("color" to "#64748b", "fontSize" to "30rpx", "paddingRight" to "32rpx")), "value" to _uM(".header-card .header-info .header-info-item " to _uM("fontSize" to "28rpx", "lineHeight" to "42rpx", "color" to "rgba(30,41,59,1)"), ".attr-card .attr-grid .alarm-item " to _uM("color" to "#ffffff", "fontSize" to "24.5rpx", "lineHeight" to "35rpx"), ".attr-card .attr-grid .attr-item " to _uM("lineHeight" to 1.35, "color" to "#0f172a", "wordBreak" to "break-all", "fontSize" to "38rpx", "paddingRight" to "32rpx")), "disabled" to _pS(_uM("opacity" to 0.3)), "icon-wrap" to _uM(".disabled " to _uM("backgroundImage" to "none", "backgroundColor" to "#f1f5f9"), ".operate-card .operate-item " to _uM("backgroundImage" to "none", "backgroundColor" to "#f5f5f5", "display" to "flex", "height" to "84rpx", "width" to "84rpx", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999, "paddingTop" to "7rpx", "paddingRight" to "7rpx", "paddingBottom" to "7rpx", "paddingLeft" to "7rpx")), "icon" to _uM(".disabled " to _uM("color" to "#9ca3af")), "operate-card" to _pS(_uM("display" to "flex", "flexDirection" to "row", "paddingTop" to "28rpx", "paddingRight" to "28rpx", "paddingBottom" to "28rpx", "paddingLeft" to "28rpx", "boxShadow" to "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)", "marginLeft" to "28rpx", "marginRight" to "28rpx", "marginBottom" to "28rpx", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "backgroundColor" to "rgba(255,255,255,1)")), "operate-item" to _uM(".operate-card " to _uM("width" to "20%", "marginRight" to "35rpx", "marginLeft" to "35rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center")), "attr-card" to _pS(_uM("paddingTop" to "40rpx", "paddingRight" to "40rpx", "paddingBottom" to "44rpx", "paddingLeft" to "40rpx")), "card-title" to _uM(".attr-card " to _uM("fontSize" to "40rpx", "color" to "#1e293b", "marginBottom" to "28rpx")), "attr-grid" to _uM(".attr-card " to _uM("display" to "flex", "width" to "100%", "flexDirection" to "row", "flexWrap" to "wrap", "gap" to "20rpx")), "alarm-item" to _uM(".attr-card .attr-grid " to _uM("backgroundImage" to "none", "backgroundColor" to "#ba0404", "boxSizing" to "border-box", "marginTop" to "14rpx", "marginRight" to "14rpx", "marginBottom" to "14rpx", "marginLeft" to "14rpx", "borderTopLeftRadius" to "7rpx", "borderTopRightRadius" to "7rpx", "borderBottomRightRadius" to "7rpx", "borderBottomLeftRadius" to "7rpx", "paddingTop" to "14rpx", "paddingRight" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "14rpx")), "attr-item" to _uM(".attr-card .attr-grid " to _uM("minHeight" to "140rpx", "backgroundImage" to "none", "backgroundColor" to "#f5f6f8", "boxSizing" to "border-box", "position" to "relative", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "28rpx", "paddingRight" to "52rpx", "paddingBottom" to "28rpx", "paddingLeft" to "32rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "flex-start", "justifyContent" to "center", "gap" to "12rpx")), "attr-item-pin" to _uM(".attr-card .attr-grid .attr-item " to _uM("position" to "absolute", "top" to "20rpx", "right" to "20rpx", "opacity" to 0.6, "fontSize" to "40rpx")), "workshop-name" to _pS(_uM("fontSize" to "21rpx", "lineHeight" to "28rpx", "color" to "rgba(107,114,128,1)")), "fake-top" to _pS(_uM("position" to "fixed", "top" to 0, "left" to 0, "height" to 44, "width" to "100%", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "zIndex" to 999)), "fake-tab" to _pS(_uM("position" to "fixed", "bottom" to 0, "width" to "100%", "height" to 50, "backgroundImage" to "none", "backgroundColor" to "#ffffff")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
