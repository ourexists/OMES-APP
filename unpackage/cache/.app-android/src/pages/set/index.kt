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
open class GenPagesSetIndex : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesSetIndex) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesSetIndex
            val _cache = __ins.renderCache
            val ui = useUi()
            val user = useStore().user
            fun gen_toLogout_fn() {
                ui.showConfirm(ClConfirmOptions(title = t__1("提示"), message = t__1("确定退出登录吗？"), callback = fun(action) {
                    if (action == "confirm") {
                        user.logout()
                    }
                }
                ))
            }
            val toLogout = ::gen_toLogout_fn
            return fun(): Any? {
                val _component_cl_list_item = resolveEasyComponent("cl-list-item", GenUniModulesCoolUnixComponentsClListItemClListItemClass)
                val _component_cl_list = resolveEasyComponent("cl-list", GenUniModulesCoolUnixComponentsClListClListClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cE("view", _uM("class" to "p-3"), _uA(
                            _cV(_component_cl_list, _uM("pt" to object : UTSJSONObject() {
                                var className = "mb-3"
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_cl_list_item, _uM("label" to unref(t__1)("通用设置"), "icon" to "settings-line", "arrow" to "", "hoverable" to "", "onClick" to fun(){
                                        unref(router).to("/pages/set/general")
                                    }
                                    ), null, 8, _uA(
                                        "label",
                                        "onClick"
                                    )),
                                    _cV(_component_cl_list_item, _uM("label" to unref(t__1)("通知设置"), "icon" to "notification-4-line", "arrow" to "", "hoverable" to "", "onClick" to fun(){
                                        unref(router).to("/pages/set/notice")
                                    }
                                    ), null, 8, _uA(
                                        "label",
                                        "onClick"
                                    ))
                                )
                            }
                            ), "_" to 1)),
                            _cV(_component_cl_list, _uM("pt" to object : UTSJSONObject() {
                                var className = "mb-3"
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_cl_list_item, _uM("label" to unref(`$t__1`)("关于{name}", object : UTSJSONObject() {
                                        var name = unref(config__1).name
                                    }), "icon" to "error-warning-line", "arrow" to "", "hoverable" to "", "pt" to object : UTSJSONObject() {
                                        var label = object : UTSJSONObject() {
                                            var className = "flex-1"
                                        }
                                    }, "onClick" to fun(){
                                        unref(router).to("/pages/set/about")
                                    }
                                    ), null, 8, _uA(
                                        "label",
                                        "onClick"
                                    )),
                                    _cV(_component_cl_list_item, _uM("label" to unref(t__1)("联系客服"), "icon" to "customer-service-line", "arrow" to "", "hoverable" to "", "onClick" to fun(){
                                        unref(router).to("/pages/set/cs")
                                    }
                                    ), null, 8, _uA(
                                        "label",
                                        "onClick"
                                    ))
                                )
                            }
                            ), "_" to 1)),
                            _cV(_component_cl_list, _uM("pt" to object : UTSJSONObject() {
                                var className = "mb-3"
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_cl_list_item, _uM("hoverable" to "", "justify" to "center", "onClick" to toLogout), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _cV(_component_cl_text, _uM("color" to "error"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                return _uA(
                                                    _tD(unref(t__1)("退出登录"))
                                                )
                                            }
                                            ), "_" to 1))
                                        )
                                    }
                                    ), "_" to 1))
                                )
                            }
                            ), "_" to 1))
                        ))
                    )
                }
                ), "_" to 1))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(), _uA(
                GenApp.styles
            ))
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
