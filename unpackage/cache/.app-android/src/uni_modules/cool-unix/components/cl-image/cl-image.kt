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
import io.dcloud.uniapp.extapi.previewImage as uni_previewImage
open class GenUniModulesCoolUnixComponentsClImageClImage : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var src: String by `$props`
    open var mode: String by `$props`
    open var border: Boolean by `$props`
    open var preview: Boolean by `$props`
    open var previewList: UTSArray<String> by `$props`
    open var height: Any? by `$props`
    open var width: Any? by `$props`
    open var showLoading: Boolean by `$props`
    open var lazyLoad: Boolean by `$props`
    open var fadeShow: Boolean by `$props`
    open var webp: Boolean by `$props`
    open var showMenuByLongpress: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClImageClImage) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClImageClImage
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val pt = computed(fun(): PassThrough__7 {
                return parsePt<PassThrough__7>(props.pt)
            }
            )
            val isLoading = ref(true)
            val isError = ref(false)
            fun gen_onLoad_fn(e: UniEvent) {
                isLoading.value = false
                isError.value = false
                emit("load", e)
            }
            val onLoad__1 = ::gen_onLoad_fn
            fun gen_onError_fn(e: UniEvent) {
                isLoading.value = false
                isError.value = true
                emit("error", e)
            }
            val onError = ::gen_onError_fn
            fun gen_onTap_fn() {
                if (props.preview) {
                    val urls = if (isEmpty(props.previewList)) {
                        _uA(
                            props.src
                        )
                    } else {
                        props.previewList
                    }
                    uni_previewImage(PreviewImageOptions(urls = urls, current = props.src))
                }
            }
            val onTap = ::gen_onTap_fn
            return fun(): Any? {
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_loading = resolveEasyComponent("cl-loading", GenUniModulesCoolUnixComponentsClLoadingClLoadingClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-image",
                    _uA(
                        _uM<String, Any?>(),
                        pt.value.className
                    )
                )), "style" to _nS(_uM("width" to unref(parseRpx)(_ctx.width!!), "height" to unref(parseRpx)(_ctx.height!!)))), _uA(
                    if (isTrue(isError.value)) {
                        _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                            "cl-image__error",
                            _uA(
                                _uM<String, Any?>(),
                                _uM("is-dark" to unref(isDark)),
                                pt.value.error?.className
                            )
                        ))), _uA(
                            renderSlot(_ctx.`$slots`, "error", UTSJSONObject(), fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_cl_icon, _uM("name" to (pt.value.error?.name ?: "close-line"), "size" to (pt.value.error?.size ?: 40), "pt" to object : UTSJSONObject() {
                                        var className = unref(parseClass)(_uA(
                                            "-important-text-surface-400",
                                            pt.value.error?.className
                                        ))
                                    }), null, 8, _uA(
                                        "name",
                                        "size",
                                        "pt"
                                    ))
                                )
                            })
                        ), 2)
                    } else {
                        if (isTrue(isLoading.value && _ctx.showLoading)) {
                            _cE("view", _uM("key" to 1, "class" to _nC(_uA(
                                "cl-image__loading",
                                _uA(
                                    _uM<String, Any?>(),
                                    _uM("is-dark" to unref(isDark)),
                                    pt.value.loading?.className
                                )
                            ))), _uA(
                                renderSlot(_ctx.`$slots`, "loading", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        _cV(_component_cl_loading, _uM("loading" to true))
                                    )
                                })
                            ), 2)
                        } else {
                            _cC("v-if", true)
                        }
                    }
                    ,
                    _cE("image", _uM("class" to _nC(_uA(
                        "cl-image__inner",
                        _uA(
                            _uM<String, Any?>(),
                            pt.value.inner?.className
                        )
                    )), "src" to _ctx.src, "mode" to _ctx.mode, "lazy-load" to _ctx.lazyLoad, "webp" to _ctx.webp, "show-menu-by-longpress" to _ctx.showMenuByLongpress, "onLoad" to onLoad__1, "onError" to onError, "onClick" to onTap), null, 42, _uA(
                        "src",
                        "mode",
                        "lazy-load",
                        "webp",
                        "show-menu-by-longpress"
                    )),
                    renderSlot(_ctx.`$slots`, "default")
                ), 6)
            }
        }
        var name = "cl-image"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("cl-image" to _pS(_uM("position" to "relative", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center")), "cl-image__inner" to _pS(_uM("height" to "100%", "width" to "100%", "borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx")), "cl-image__loading" to _uM("" to _uM("position" to "absolute", "height" to "100%", "width" to "100%", "borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx", "backgroundColor" to "rgba(228,228,231,1)", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center"), ".is-dark" to _uM("backgroundColor" to "rgba(63,63,70,1)")), "cl-image__error" to _uM("" to _uM("position" to "absolute", "height" to "100%", "width" to "100%", "borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx", "backgroundColor" to "rgba(228,228,231,1)", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center"), ".is-dark" to _uM("backgroundColor" to "rgba(63,63,70,1)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("load" to null, "error" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "src" to _uM("type" to "String", "default" to ""), "mode" to _uM("type" to "String", "default" to "aspectFill"), "border" to _uM("type" to "Boolean", "default" to false), "preview" to _uM("type" to "Boolean", "default" to false), "previewList" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "height" to _uM("default" to 120), "width" to _uM("default" to 120), "showLoading" to _uM("type" to "Boolean", "default" to true), "lazyLoad" to _uM("type" to "Boolean", "default" to false), "fadeShow" to _uM("type" to "Boolean", "default" to false), "webp" to _uM("type" to "Boolean", "default" to false), "showMenuByLongpress" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "pt",
            "src",
            "mode",
            "border",
            "preview",
            "previewList",
            "height",
            "width",
            "showLoading",
            "lazyLoad",
            "fadeShow",
            "webp",
            "showMenuByLongpress"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
