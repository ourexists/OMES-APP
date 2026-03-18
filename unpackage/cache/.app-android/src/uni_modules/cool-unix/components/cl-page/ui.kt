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
open class GenUniModulesCoolUnixComponentsClPageUi : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClPageUi) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClPageUi
            val _cache = __ins.renderCache
            val confirmRef = ref<ClConfirmComponentPublicInstance?>(null)
            val tipsRef = ref<ClConfirmComponentPublicInstance?>(null)
            val toastRef = ref<ClToastComponentPublicInstance?>(null)
            fun gen_showConfirm_fn(options: ClConfirmOptions) {
                if (confirmRef.value != null) {
                    confirmRef.value!!.open(options)
                }
            }
            val showConfirm = ::gen_showConfirm_fn
            fun gen_showTips_fn(msgNotifier: String, callback: (action: ClConfirmAction) -> Unit) {
                if (tipsRef.value != null) {
                    tipsRef.value!!.open(ClConfirmOptions(title = t("提示"), msgNotifier = msgNotifier, callback = callback, showCancel = false))
                }
            }
            val showTips = ::gen_showTips_fn
            fun gen_showToast_fn(options: ClToastOptions) {
                if (toastRef.value != null) {
                    toastRef.value!!.open(options)
                }
            }
            val showToast = ::gen_showToast_fn
            createUi(UiInstance(showConfirm = showConfirm, showTips = showTips, showToast = showToast))
            return fun(): Any? {
                val _component_cl_confirm = resolveEasyComponent("cl-confirm", GenUniModulesCoolUnixComponentsClConfirmClConfirmClass)
                val _component_cl_toast = resolveEasyComponent("cl-toast", GenUniModulesCoolUnixComponentsClToastClToastClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_cl_confirm, _uM("ref_key" to "confirmRef", "ref" to confirmRef), null, 512),
                    _cV(_component_cl_confirm, _uM("ref_key" to "tipsRef", "ref" to tipsRef), null, 512),
                    _cV(_component_cl_toast, _uM("ref_key" to "toastRef", "ref" to toastRef), null, 512)
                ), 64)
            }
        }
        var name = "cl-page-ui"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
