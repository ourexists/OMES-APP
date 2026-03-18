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
open class GenPagesEquipWorkshopTree : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesEquipWorkshopTree) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesEquipWorkshopTree
            val _cache = __ins.renderCache
            val ui = useUi()
            val refs = useRefs()
            val treeRef = ref<ClTreeComponentPublicInstance?>(null)
            fun gen_confirmSelect_fn() {
                ui.showLoading(t__1("切换中"))
                workshopTree.selectConfirm()
                setTimeout(fun(){
                    router.back()
                    ui.hideLoading()
                }
                , 300)
            }
            val confirmSelect = ::gen_confirmSelect_fn
            onLoad(fun(_options){
                workshopTree.loadWorkshopTree()
            }
            )
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_tree = resolveEasyComponent("cl-tree", GenUniModulesCoolUnixComponentsClTreeClTreeClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
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
                                    "w-full flex flex-row items-end",
                                    _uM("pt-0" to unref(isMp)())
                                ))), _uA(
                                    _cE("view", _uM("class" to "flex flex-row justify-center flex-1"), _uA(
                                        _cV(_component_cl_text, _uM("color" to "primary", "pt" to object : UTSJSONObject() {
                                            var className = "-important-text-xl ml-2"
                                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _tD(unref(t__1)("选择场景"))
                                            )
                                        }
                                        ), "_" to 1))
                                    )),
                                    _cE("view", _uM("class" to _nC(_uA(
                                        "flex flex-row justify-end",
                                        _uM("mr-32" to unref(isMp)(), "mr-10" to !unref(isMp)())
                                    )), "onClick" to confirmSelect), _uA(
                                        _cV(_component_cl_text, _uM("color" to "primary", "pt" to object : UTSJSONObject() {
                                            var className = "-important-text-base ml-2"
                                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _tD(unref(t__1)("确定"))
                                            )
                                        }
                                        ), "_" to 1))
                                    ), 2)
                                ), 2)
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "background-color",
                            "height"
                        )),
                        _cE("view", _uM("class" to "tree overflow-y-auto"), _uA(
                            _cV(_component_cl_tree, _uM("ref_key" to "treeRef", "ref" to treeRef, "list" to unref(workshopTree).tree.value, "icon" to "hospital-line", "expandIcon" to "hospital-line", "pt" to object : UTSJSONObject() {
                                var className = "overflow-y-auto"
                            }), null, 8, _uA(
                                "list"
                            ))
                        ))
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
                return _uM("tree" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#ebedf0", "borderRightColor" to "#ebedf0", "borderBottomColor" to "#ebedf0", "borderLeftColor" to "#ebedf0", "boxShadow" to "0 2rpx 6rpx rgba(0, 0, 0, 0.1)", "marginTop" to "14rpx", "marginRight" to "14rpx", "marginBottom" to "14rpx", "marginLeft" to "14rpx", "height" to "100%", "borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
