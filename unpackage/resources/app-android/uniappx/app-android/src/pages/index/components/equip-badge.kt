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
open class GenPagesIndexComponentsEquipBadge : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var equip: Any by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexComponentsEquipBadge) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexComponentsEquipBadge
            val _cache = __ins.renderCache
            val ui = useUi()
            val refs = useRefs()
            val props = __props
            val badge = computed(fun(): Badge {
                return parseType(props.equip as Equip)
            }
            )
            return fun(): Any? {
                return if (isTrue(unref(badge))) {
                    _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                        "badge",
                        unref(badge).type
                    ))), _tD(unref(badge).text), 3)
                } else {
                    _cC("v-if", true)
                }
            }
        }
        var name = "equip-badge"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("badge" to _uM("" to _uM("position" to "absolute", "top" to "7rpx", "left" to "7rpx", "borderTopLeftRadius" to "10.5rpx", "borderTopRightRadius" to "10.5rpx", "borderBottomRightRadius" to "10.5rpx", "borderBottomLeftRadius" to "10.5rpx", "paddingTop" to "7rpx", "paddingBottom" to "7rpx", "paddingLeft" to "17.5rpx", "paddingRight" to "17.5rpx", "fontSize" to "21rpx", "lineHeight" to "28rpx", "color" to "rgba(255,255,255,1)"), ".offline" to _uM("backgroundImage" to "none", "backgroundColor" to "#bfbfbf"), ".alarm" to _uM("backgroundImage" to "none", "backgroundColor" to "#ff4d4f"), ".run" to _uM("backgroundImage" to "none", "backgroundColor" to "#52c41a"), ".stopped" to _uM("backgroundImage" to "none", "backgroundColor" to "#FAAD14")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("equip" to _uM("required" to true)))
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
