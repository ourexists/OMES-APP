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
open class GenUniModulesCoolUnixComponentsClConfirmClConfirm : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var open: (options: ClConfirmOptions) -> Unit
        get() {
            return unref(this.`$exposed`["open"]) as (options: ClConfirmOptions) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "open", value)
        }
    open var close: () -> Unit
        get() {
            return unref(this.`$exposed`["close"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "close", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClConfirmClConfirm, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClConfirmClConfirm
            val _cache = __ins.renderCache
            val visible = ref(false)
            val closed = ref(true)
            val config = reactive<ClConfirmOptions>(ClConfirmOptions(title = "", msgNotifier = ""))
            val loading = ref(false)
            fun gen_showLoading_fn() {
                loading.value = true
            }
            val showLoading = ::gen_showLoading_fn
            fun gen_hideLoading_fn() {
                loading.value = false
            }
            val hideLoading = ::gen_hideLoading_fn
            fun gen_close_fn() {
                visible.value = false
            }
            val close = ::gen_close_fn
            var timer: Number = 0
            fun gen_open_fn(options: ClConfirmOptions) {
                val next = fun(){
                    clearTimeout(timer)
                    closed.value = false
                    visible.value = true
                    config.title = options.title
                    config.msgNotifier = options.msgNotifier
                    config.showCancel = options.showCancel ?: true
                    config.showConfirm = options.showConfirm ?: true
                    config.cancelText = options.cancelText ?: t("取消")
                    config.confirmText = options.confirmText ?: t("确定")
                    config.duration = options.duration ?: 0
                    config.callback = options.callback
                    config.beforeClose = options.beforeClose
                    if (config.duration != 0) {
                        timer = setTimeout(fun(){
                            close()
                        }
                        , config.duration!!)
                    }
                }
                if (closed.value) {
                    next()
                } else {
                    setTimeout(fun(){
                        next()
                    }
                    , 360)
                }
            }
            val open = ::gen_open_fn
            fun gen_onClosed_fn() {
                hideLoading()
                closed.value = true
            }
            val onClosed = ::gen_onClosed_fn
            fun gen_onAction_fn(action: ClConfirmAction) {
                if (config.beforeClose == null) {
                    visible.value = false
                    if (config.callback != null) {
                        config.callback!!(action)
                    }
                } else {
                    config.beforeClose!!(action, ClConfirmBeforeCloseEvent(close = close, showLoading = showLoading, hideLoading = hideLoading))
                }
            }
            val onAction = ::gen_onAction_fn
            __expose(_uM("open" to open, "close" to close))
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_button = resolveEasyComponent("cl-button", GenUniModulesCoolUnixComponentsClButtonClButtonClass)
                val _component_cl_popup = resolveEasyComponent("cl-popup", GenUniModulesCoolUnixComponentsClPopupClPopupClass)
                return _cV(_component_cl_popup, _uM("modelValue" to visible.value, "onUpdate:modelValue" to fun(`$event`: Boolean){
                    visible.value = `$event`
                }
                , "pt" to object : UTSJSONObject() {
                    var className = "-important-rounded--bracket-start-60rpx-bracket-end-"
                }, "size" to "70%", "show-close" to false, "show-header" to false, "mask-closable" to false, "direction" to "center", "onMaskClose" to fun(){
                    onAction("close")
                }
                , "onClosed" to onClosed), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cE("view", _uM("class" to "cl-confirm"), _uA(
                            _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                var className = unref(parseClass)(_uA(
                                    "cl-confirm__title text-lg text-center font-bold mb-2"
                                ))
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(config.title)
                                )
                            }
                            ), "_" to 1), 8, _uA(
                                "pt"
                            )),
                            _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                var className = unref(parseClass)(_uA(
                                    "cl-confirm__message text-md text-center mb-8"
                                ))
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(config.msgNotifier)
                                )
                            }
                            ), "_" to 1), 8, _uA(
                                "pt"
                            )),
                            _cE("view", _uM("class" to "cl-confirm__actions"), _uA(
                                if (isTrue(config.showCancel)) {
                                    _cV(_component_cl_button, _uM("key" to 0, "size" to "large", "text" to "", "rounded" to "", "border" to "", "type" to "info", "pt" to object : UTSJSONObject() {
                                        var className = "flex-1 h--bracket-start-80rpx-bracket-end-"
                                    }, "onClick" to fun(){
                                        onAction("cancel")
                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(config.cancelText)
                                        )
                                    }), "_" to 1), 8, _uA(
                                        "onClick"
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(config.showConfirm)) {
                                    _cV(_component_cl_button, _uM("key" to 1, "size" to "large", "rounded" to "", "loading" to loading.value, "pt" to object : UTSJSONObject() {
                                        var className = "flex-1 h--bracket-start-80rpx-bracket-end-"
                                    }, "onClick" to fun(){
                                        onAction("confirm")
                                    }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(config.confirmText)
                                        )
                                    }), "_" to 1), 8, _uA(
                                        "loading",
                                        "onClick"
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                            ))
                        ))
                    )
                }
                ), "_" to 1), 8, _uA(
                    "modelValue",
                    "onUpdate:modelValue",
                    "onMaskClose"
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-confirm" to _pS(_uM("paddingTop" to "28rpx", "paddingRight" to "28rpx", "paddingBottom" to "28rpx", "paddingLeft" to "28rpx")), "cl-confirm__actions" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
