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
import io.dcloud.uniapp.extapi.saveImageToPhotosAlbum as uni_saveImageToPhotosAlbum
open class GenPagesSetCs : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesSetCs) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesSetCs
            val _cache = __ins.renderCache
            val ui = useUi()
            fun gen_saveImage_fn() {
                uni_saveImageToPhotosAlbum(SaveImageToPhotosAlbumOptions(filePath = "/static/cs.png", success = fun(_){
                    ui.showToast(ClToastOptions(message = "保存成功"))
                }
                ))
            }
            val saveImage = ::gen_saveImage_fn
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_image = resolveEasyComponent("cl-image", GenUniModulesCoolUnixComponentsClImageClImageClass)
                val _component_cl_button = resolveEasyComponent("cl-button", GenUniModulesCoolUnixComponentsClButtonClButtonClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cE("view", _uM("class" to "p-10 flex flex-col items-center justify-center"), _uA(
                            _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                var className = "text-center mb-5"
                            }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    "专注工业控制解决方案"
                                )
                            }
                            ), "_" to 1)),
                            _cE("view", _uM("class" to "p-2 bg-white mb-5 rounded-xl"), _uA(
                                _cV(_component_cl_image, _uM("src" to "/static/cs.png", "height" to 320, "width" to 320, "show-menu-by-longpress" to ""))
                            )),
                            _cV(_component_cl_button, _uM("type" to "light", "icon" to "download-line", "onClick" to saveImage), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    "保存图片"
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
