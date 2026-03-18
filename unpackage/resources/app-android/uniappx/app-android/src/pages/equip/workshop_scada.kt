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
open class GenPagesEquipWorkshopScada : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesEquipWorkshopScada) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesEquipWorkshopScada
            val _cache = __ins.renderCache
            val iframeUrl = ref<String?>(null)
            fun gen_loadIframeUrl_fn(workshopCode: String?) {
                if (workshopCode == null || workshopCode == "-1") {
                    iframeUrl.value = null
                    return
                }
                request(RequestOptions__1(url = apiPath["workshop_scada"] as String, method = "GET", data = _uO("workshopCode" to workshopCode, "platform" to 2))).then(fun(res){
                    if (res == null) {
                        iframeUrl.value = null
                        return
                    }
                    val r = parseData<WorkshopScada>(res)
                    if (r == null || r.url == null || r.url == "") {
                        iframeUrl.value = null
                        return
                    }
                    iframeUrl.value = r.url
                }
                )
            }
            val loadIframeUrl = ::gen_loadIframeUrl_fn
            onLoad(fun(query){
                loadIframeUrl(query["workshopCode"])
            }
            )
            return fun(): Any? {
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cE("web-view", _uM("src" to iframeUrl.value, "style" to _nS(_uM("flex" to "1"))), null, 12, _uA(
                            "src"
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
