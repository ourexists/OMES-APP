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
open class GenPagesSetNotice : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesSetNotice) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesSetNotice
            val _cache = __ins.renderCache
            fun gen_onNotifyChange_fn(kVal: Boolean) {
                changeNotify(kVal)
            }
            val onNotifyChange = ::gen_onNotifyChange_fn
            return fun(): Any? {
                val _component_cl_switch = resolveEasyComponent("cl-switch", GenUniModulesCoolUnixComponentsClSwitchClSwitchClass)
                val _component_cl_list_item = resolveEasyComponent("cl-list-item", GenUniModulesCoolUnixComponentsClListItemClListItemClass)
                val _component_cl_list = resolveEasyComponent("cl-list", GenUniModulesCoolUnixComponentsClListClListClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cE("view", _uM("class" to "p-3"), _uA(
                            _cV(_component_cl_list, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_cl_list_item, _uM("label" to unref(t__1)("开启通知")), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _cV(_component_cl_switch, _uM("modelValue" to unref(notify_enable), "onUpdate:modelValue" to fun(`$event`: Boolean){
                                                trySetRefValue(notify_enable, `$event`)
                                            }
                                            , "onChange" to onNotifyChange), null, 8, _uA(
                                                "modelValue"
                                            ))
                                        )
                                    }
                                    ), "_" to 1), 8, _uA(
                                        "label"
                                    ))
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
