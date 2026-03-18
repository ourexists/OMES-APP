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
open class GenPagesIndexHome : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexHome) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexHome
            val _cache = __ins.renderCache
            val ui = useUi()
            val refs = useRefs()
            fun gen_setWorkshop_fn() {
                router.to("/pages/equip/workshop_tree")
            }
            val setWorkshop = ::gen_setWorkshop_fn
            return fun(): Any? {
                val _component_cl_image = resolveEasyComponent("cl-image", GenUniModulesCoolUnixComponentsClImageClImageClass)
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
                                    _cV(_component_cl_image, _uM("src" to "/static/logo.png", "width" to 60, "height" to 60, "show-loading" to false, "pt" to object : UTSJSONObject() {
                                        var className = "rounded-sm items-center"
                                    })),
                                    _cV(_component_cl_text, _uM("color" to "primary", "pt" to object : UTSJSONObject() {
                                        var className = "-important-text-2xl mr-auto ml-2 items-end"
                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(unref(config__1).name)
                                        )
                                    }
                                    ), "_" to 1)),
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
                        _cE("view", _uM("class" to "mainContainer"), _uA(
                            _cV(unref(GenComponentsMsgNotifierClass), _uM("class" to "msg-notifier")),
                            _cE("view", _uM("class" to "p-3 ml-2 mr-2 mt-2"), _uA(
                                _cV(_component_cl_text, _uM("color" to "primary", "pt" to object : UTSJSONObject() {
                                    var className = "-important-text-xl mr-auto flex-1 w-full"
                                }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(unref(t__1)("设备运行统计"))
                                    )
                                }
                                ), "_" to 1)),
                                _cV(unref(GenPagesIndexComponentsEchartEquipCardClass))
                            ))
                        )),
                        _cV(unref(GenComponentsTabbarClass)),
                        _cV(unref(GenComponentsLocaleSetClass), _uM("ref" to unref(refs).set("localeSet")), null, 512)
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
                return _uM("mainContainer" to _pS(_uM("position" to "relative", "width" to "100%")), "msg-notifier" to _pS(_uM("position" to "absolute", "top" to "70rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
