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
open class GenPagesSetGeneral : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesSetGeneral) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesSetGeneral
            val _cache = __ins.renderCache
            val refs = useRefs()
            fun gen_setLocale_fn() {
                refs.open("localeSet")
            }
            val setLocale = ::gen_setLocale_fn
            fun gen_setSize_fn() {
                refs.open("sizeSet")
            }
            val setSize = ::gen_setSize_fn
            return fun(): Any? {
                val _component_cl_list_item = resolveEasyComponent("cl-list-item", GenUniModulesCoolUnixComponentsClListItemClListItemClass)
                val _component_cl_list = resolveEasyComponent("cl-list", GenUniModulesCoolUnixComponentsClListClListClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cE("view", _uM("class" to "p-3"), _uA(
                            _cV(_component_cl_list, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_cl_list_item, _uM("label" to unref(t__1)("多语言"), "arrow" to "", "hoverable" to "", "onClick" to setLocale), null, 8, _uA(
                                        "label"
                                    )),
                                    _cV(_component_cl_list_item, _uM("label" to unref(t__1)("字体大小"), "arrow" to "", "hoverable" to "", "onClick" to setSize), null, 8, _uA(
                                        "label"
                                    ))
                                )
                            }
                            ), "_" to 1))
                        )),
                        _cV(unref(GenComponentsLocaleSetClass), _uM("ref" to unref(refs).set("localeSet")), null, 512),
                        _cV(unref(GenComponentsSizeSetClass), _uM("ref" to unref(refs).set("sizeSet")), null, 512)
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
