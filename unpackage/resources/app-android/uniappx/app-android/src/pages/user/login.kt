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
open class GenPagesUserLogin : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesUserLogin) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesUserLogin
            val _cache = __ins.renderCache
            val user = useStore().user
            val ui = useUi()
            val form = reactive<LoginForm>(LoginForm(username = "", password = "", captcha = ""))
            fun gen_toLogin_fn(res: LoginTokenResponse): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        var token = Token(token = res.token_type + " " + res.access_token, expire = res.expires_in, refreshToken = "", refreshExpire = 0)
                        user.setToken(token!!)
                        user.get().then(fun(r){
                            router.nextLogin()
                        }
                        )
                })
            }
            val toLogin = ::gen_toLogin_fn
            return fun(): Any? {
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_image = resolveEasyComponent("cl-image", GenUniModulesCoolUnixComponentsClImageClImageClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cV(_component_cl_topbar, _uM("safe-area-top" to "", "background-color" to "transparent")),
                        _cE("view", _uM("class" to "px-10"), _uA(
                            _cE("view", _uM("class" to "flex flex-col items-center justify-center py-20"), _uA(
                                _cE("view", null, _uA(
                                    _cV(_component_cl_image, _uM("src" to "/static/logo.png", "mode" to "widthFix", "width" to 120, "height" to 120))
                                )),
                                _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                    var className = "text-xl font-bold mt-3"
                                }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(unref(config__1).name)
                                    )
                                }
                                ), "_" to 1))
                            )),
                            _cV(unref(GenPagesUserLoginAccountClass), _uM("form" to form, "onSuccess" to toLogin), null, 8, _uA(
                                "form"
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
                return _uM("login-item" to _uM("" to _uM("marginLeft" to "14rpx", "marginRight" to "14rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999, "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(244,244,245,1)", "borderRightColor" to "rgba(244,244,245,1)", "borderBottomColor" to "rgba(244,244,245,1)", "borderLeftColor" to "rgba(244,244,245,1)", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "14rpx", "paddingRight" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "14rpx"), ".is-dark" to _uM("borderTopColor" to "rgba(82,82,91,1)", "borderRightColor" to "rgba(82,82,91,1)", "borderBottomColor" to "rgba(82,82,91,1)", "borderLeftColor" to "rgba(82,82,91,1)", "backgroundColor" to "rgba(63,63,70,1)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
