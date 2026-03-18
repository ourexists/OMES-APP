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
open class GenUniModulesCoolUnixComponentsClIconClIcon : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var name: String by `$props`
    open var size: Any? by `$props`
    open var height: Any? by `$props`
    open var width: Any? by `$props`
    open var color: String by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClIconClIcon) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClIconClIcon
            val _cache = __ins.renderCache
            val props = __props
            val pt = computed(fun(): PassThrough__1 {
                return parsePt<PassThrough__1>(props.pt)
            }
            )
            val cache = useCache(fun(): UTSArray<Any> {
                return _uA(
                    props.color
                )
            }
            ).cache
            val _useSize = useSize(fun(): String {
                return pt.value.className ?: ""
            }
            )
            val getRpx = _useSize.getRpx
            val ptClassName = _useSize.ptClassName
            val icon = computed<Icon>(fun(): Icon {
                var font = ""
                var text = ""
                try {
                    var code = ""
                    forInObject(icons, fun(value, key){
                        if (has(value, props.name)) {
                            font = key
                            code = get(value, props.name) as String
                        }
                    }
                    )
                    text = String.fromCharCode(parseInt(code, 16))
                }
                 catch (e: Throwable) {
                    console.error("图标 " + props.name + " 不存在", e)
                }
                return Icon(font = font, text = text)
            }
            )
            val color = computed(fun(): String {
                if (props.color != "") {
                    when (props.color) {
                        "primary" -> 
                            return ctx.color["primary-500"] as String
                        "success" -> 
                            return "#22c55e"
                        "warn" -> 
                            return "#eab308"
                        "error" -> 
                            return "#ef4444"
                        "info" -> 
                            return ctx.color["surface-500"] as String
                        "dark" -> 
                            return ctx.color["surface-700"] as String
                        "light" -> 
                            return ctx.color["surface-50"] as String
                        "disabled" -> 
                            return ctx.color["surface-300"] as String
                        else -> 
                            return props.color
                    }
                }
                return if (isDark.value) {
                    "white"
                } else {
                    (ctx.color["surface-700"] as String)
                }
            }
            )
            val iconStyle = computed(fun(): UTSJSONObject {
                val style: UTSJSONObject = UTSJSONObject()
                if (!hasTextColor(ptClassName.value)) {
                    style["color"] = color.value
                }
                if (icon.value.font != "") {
                    style["fontFamily"] = icon.value.font
                }
                style["fontSize"] = getRpx(props.size!!)
                style["height"] = getRpx(props.height ?: props.size!!)
                style["lineHeight"] = getRpx(props.size!!)
                style["width"] = getRpx(props.width ?: props.size!!)
                return style
            }
            )
            return fun(): Any? {
                return _cE("text", _uM("class" to _nC(_uA(
                    "cl-icon",
                    _uA(
                        _uM<String, Any?>(),
                        unref(ptClassName)
                    )
                )), "style" to _nS(iconStyle.value), "key" to unref(cache).key), _tD(icon.value.text), 7)
            }
        }
        var name = "cl-icon"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "name" to _uM("type" to "String", "default" to ""), "size" to _uM("default" to 32), "height" to _uM("default" to null), "width" to _uM("default" to null), "color" to _uM("type" to "String", "default" to "")))
        var propsNeedCastKeys = _uA(
            "pt",
            "name",
            "size",
            "height",
            "width",
            "color"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
