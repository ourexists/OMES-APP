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
open class GenPagesIndexMy : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexMy) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexMy
            val _cache = __ins.renderCache
            val user = useStore().user
            val ui = useUi()
            fun gen_toLogout_fn() {
                ui.showConfirm(ClConfirmOptions(title = t__1("提示"), message = t__1("确定退出登录吗？"), callback = fun(action) {
                    if (action == "confirm") {
                        user.logout()
                    }
                }
                ))
            }
            val toLogout = ::gen_toLogout_fn
            fun gen_toSet_fn() {
                router.to("/pages/set/index")
            }
            val toSet = ::gen_toSet_fn
            onReady(fun(){
                user.get()
            }
            )
            return fun(): Any? {
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_avatar = resolveEasyComponent("cl-avatar", GenUniModulesCoolUnixComponentsClAvatarClAvatarClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_list_item = resolveEasyComponent("cl-list-item", GenUniModulesCoolUnixComponentsClListItemClListItemClass)
                val _component_cl_list = resolveEasyComponent("cl-list", GenUniModulesCoolUnixComponentsClListClListClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cV(_component_cl_topbar, _uM("fixed" to "", "height" to 100, "show-back" to false, "safe-area-top" to "", "background-color" to "transparent")),
                        _cE("view", _uM("class" to "p-3"), _uA(
                            _cE("view", _uM("class" to "flex flex-col justify-center items-center pt-6 pb-3"), _uA(
                                _cE("view", _uM("class" to "relative overflow-visible"), _uA(
                                    _cV(_component_cl_avatar, _uM("src" to unref(userInfo)?.avatarUrl, "size" to 150, "pt" to object : UTSJSONObject() {
                                        var className = "-important-rounded-3xl"
                                        var icon = object : UTSJSONObject() {
                                            var size: Number = 60
                                        }
                                    }), null, 8, _uA(
                                        "src"
                                    ))
                                )),
                                _cE("view", _uM("class" to "flex-1 flex flex-col justify-center items-center w-full"), _uA(
                                    _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                        var className = "-important-text-xl mt-5 mb-1 font-bold"
                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(unref(userInfo)?.nickName ?: unref(t__1)("未登录"))
                                        )
                                    }
                                    ), "_" to 1)),
                                    if (isTrue(!unref(user).isNull())) {
                                        _cV(_component_cl_text, _uM("key" to 0, "color" to "info"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _tD(unref(userInfo)?.mobile)
                                            )
                                        }), "_" to 1))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                ))
                            )),
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
                return _uM("top-icon" to _pS(_uM("marginRight" to "21rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to "14rpx", "borderTopRightRadius" to "14rpx", "borderBottomRightRadius" to "14rpx", "borderBottomLeftRadius" to "14rpx", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "14rpx", "paddingRight" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "14rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
