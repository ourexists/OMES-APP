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
open class GenUniModulesCoolUnixComponentsClAvatarClAvatar : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var src: String by `$props`
    open var size: Any by `$props`
    open var rounded: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClAvatarClAvatar) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClAvatarClAvatar
            val _cache = __ins.renderCache
            val props = __props
            val pt = computed(fun(): PassThrough__14 {
                return parsePt<PassThrough__14>(props.pt)
            }
            )
            return fun(): Any? {
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_image = resolveEasyComponent("cl-image", GenUniModulesCoolUnixComponentsClImageClImageClass)
                return _cV(_component_cl_image, _uM("src" to _ctx.src, "height" to _ctx.size, "width" to _ctx.size, "pt" to object : UTSJSONObject() {
                    var className = unref(parseClass)(_uA(
                        "cl-avatar",
                        object : UTSJSONObject() {
                            var `-important-rounded-full` = _ctx.rounded
                        },
                        pt.value.className
                    ))
                }), _uM("loading" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cV(_component_cl_icon, _uM("name" to (pt.value.icon?.name ?: "user-smile-fill"), "size" to (pt.value.icon?.size ?: 40), "pt" to object : UTSJSONObject() {
                            var className = unref(parseClass)(_uA(
                                _uA(
                                    unref(isDark),
                                    "-important-text-surface-50",
                                    "-important-text-surface-400"
                                ),
                                pt.value.icon?.className
                            ))
                        }), null, 8, _uA(
                            "name",
                            "size",
                            "pt"
                        ))
                    )
                }
                ), "default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        renderSlot(_ctx.`$slots`, "default")
                    )
                }
                ), "_" to 3), 8, _uA(
                    "src",
                    "height",
                    "width",
                    "pt"
                ))
            }
        }
        var name = "cl-avatar"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "src" to _uM("type" to "String", "default" to ""), "size" to _uM("type" to _uA(
            "String",
            "Number"
        ), "default" to 80), "rounded" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "pt",
            "src",
            "size",
            "rounded"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
