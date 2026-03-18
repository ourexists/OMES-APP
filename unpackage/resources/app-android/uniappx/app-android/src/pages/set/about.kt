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
import io.dcloud.uniapp.extapi.setNavigationBarTitle as uni_setNavigationBarTitle
open class GenPagesSetAbout : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesSetAbout) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesSetAbout
            val _cache = __ins.renderCache
            onReady(fun(){
                uni_setNavigationBarTitle(SetNavigationBarTitleOptions(title = `$t__1`("关于{name}", object : UTSJSONObject() {
                    var name = config__1.name
                })))
            }
            )
            return fun(): Any? {
                val _component_cl_image = resolveEasyComponent("cl-image", GenUniModulesCoolUnixComponentsClImageClImageClass)
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cE("view", _uM("class" to "p-3"), _uA(
                            _cE("view", _uM("class" to "flex flex-col items-center justify-center py-10"), _uA(
                                _cE("view", _uM("class" to "p-3"), _uA(
                                    _cV(_component_cl_image, _uM("src" to "/static/logo.png", "height" to 120, "width" to 120))
                                )),
                                _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                    var className = "mt-3 mb-1"
                                }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(unref(config__1).name)
                                    )
                                }
                                ), "_" to 1)),
                                _cV(_component_cl_text, _uM("color" to "info", "pt" to object : UTSJSONObject() {
                                    var className = "-important-text-xs"
                                }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "version " + _tD(unref(config__1).version)
                                    )
                                }
                                ), "_" to 1))
                            ))
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
