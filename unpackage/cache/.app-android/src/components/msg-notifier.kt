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
open class GenComponentsMsgNotifier : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenComponentsMsgNotifier) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenComponentsMsgNotifier
            val _cache = __ins.renderCache
            return fun(): Any? {
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_noticebar = resolveEasyComponent("cl-noticebar", GenUniModulesCoolUnixComponentsClNoticebarClNoticebarClass)
                return if (isTrue(unref(notify_visible))) {
                    _cE("view", _uM("key" to 0, "class" to "msgNotifier"), _uA(
                        _cV(_component_cl_icon, _uM("name" to "notification-4-line", "color" to "primary")),
                        _cV(_component_cl_noticebar, _uM("speed" to 30, "text" to unref(notify_message)), null, 8, _uA(
                            "text"
                        ))
                    ))
                } else {
                    _cC("v-if", true)
                }
            }
        }
        var name = "msg-notifier"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("msgNotifier" to _pS(_uM("width" to "80%", "marginTop" to 0, "marginRight" to "10%", "marginBottom" to 0, "marginLeft" to "10%", "boxSizing" to "border-box", "backgroundImage" to "none", "backgroundColor" to "rgba(134,239,172,0.2)", "zIndex" to 50, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "borderTopLeftRadius" to "28rpx", "borderTopRightRadius" to "28rpx", "borderBottomRightRadius" to "28rpx", "borderBottomLeftRadius" to "28rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(243,244,246,1)", "borderRightColor" to "rgba(243,244,246,1)", "borderBottomColor" to "rgba(243,244,246,1)", "borderLeftColor" to "rgba(243,244,246,1)", "paddingTop" to "21rpx", "paddingRight" to "21rpx", "paddingBottom" to "21rpx", "paddingLeft" to "21rpx")), "cl-icon" to _uM(".msgNotifier " to _uM("width" to "20%", "flexGrow" to 0, "flexShrink" to 0, "flexBasis" to "auto", "textAlign" to "center", "fontWeight" to "700")), "cl-noticebar" to _uM(".msgNotifier " to _uM("marginLeft" to "28rpx", "width" to "80%", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
