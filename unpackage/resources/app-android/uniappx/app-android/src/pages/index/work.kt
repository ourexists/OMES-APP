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
            fun gen_setWorkshop_fn() {
                router.to("/pages/equip/workshop_tree")
            }
            val setWorkshop = ::gen_setWorkshop_fn
            fun gen_toScada_fn() {
                router.to("/pages/equip/workshop_scada?workshopCode=" + workshopTree.selectNode.value.id)
            }
            val toScada = ::gen_toScada_fn
            fun gen_loadIframeUrl_fn(workshopCode: String?) {
                if (workshopCode == null || workshopCode == "-1") {
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
            val loadIframeUrl = ::gen_loadIframeUrl_fn
            watch(workshopTree.selectNode, fun(kVal: ClTreeItem?){
                if (kVal != null) {
                    loadIframeUrl(kVal.id as String)
                } else {
                    loadIframeUrl(null)
                }
            }
            )
            onLoad(fun(_options){
                loadIframeUrl(workshopTree.selectNode.value.id as String)
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
                        _cE("view", _uM("class" to "p-4 pt-24 flex flex-col items-center"), _uA(
                            _cV(_component_cl_image, _uM("class" to "image-wrap-1", "src" to "/static/icon/workshop.svg"), null, 8, _uA(
                                "src"
                            )),
                            _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                var className = "mt-4 text-xl font-semibold"
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(unref(workshopTree).selectNode.value.label)
                                )
                            }
                            ), "_" to 1)),
                            _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                var className = "mt-2 text-gray-500"
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(unref(t__1)("编号")) + ": " + _tD(unref(workshopTree).selectNode.value.id)
                                )
                            }
                            ), "_" to 1))
                        )),
                        if (workshopScada.value != null) {
                            _cE("view", _uM("key" to 0, "class" to "p-14 text-gray-300 pt-16"), _uA(
                                _cV(_component_cl_button, _uM("rounded" to "", "onClick" to toScada, "size" to "large"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(unref(t__1)("查看工艺详情"))
                                    )
                                }), "_" to 1))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        if (workshopScada.value == null) {
                            _cE("text", _uM("key" to 1, "class" to "text-center p-2 text-gray-300 pt-16"), _tD(unref(t__1)("当前场景未配置工艺组态")), 1)
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
                return _uM("image-wrap" to _pS(_uM("height" to "180rpx", "backgroundImage" to "none", "backgroundColor" to "#f0f2f5", "position" to "relative", "width" to "100%")), "image-wrap-1" to _pS(_uM("flexGrow" to 0, "flexShrink" to 0, "flexBasis" to "auto", "height" to "100%", "width" to "28rpx", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "21rpx", "paddingRight" to "21rpx", "paddingBottom" to "21rpx", "paddingLeft" to "21rpx")), "view-center" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "flex-start", "paddingTop" to "100rpx")), "workshop-name" to _pS(_uM("fontSize" to "21rpx", "lineHeight" to "28rpx", "color" to "rgba(107,114,128,1)")), "fake-top" to _pS(_uM("position" to "fixed", "top" to 0, "left" to 0, "height" to 44, "width" to "100%", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "zIndex" to 999)), "fake-tab" to _pS(_uM("position" to "fixed", "bottom" to 0, "width" to "100%", "height" to 50, "backgroundImage" to "none", "backgroundColor" to "#ffffff")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
