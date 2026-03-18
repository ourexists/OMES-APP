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
import io.dcloud.uniapp.extapi.`$emit` as uni__emit
open class GenPagesMessageMessageDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMessageMessageDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMessageMessageDetail
            val _cache = __ins.renderCache
            val ui = useUi()
            val message = ref<Message?>(null)
            val sourceTitle = ref<String?>(null)
            val sourceId = ref<String?>(null)
            val sourceSubTitle = ref<String?>(null)
            val markAsRead = fun(id: String): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        await(request(RequestOptions__1(url = apiPath["message_read"] as String, method = "GET", data = object : UTSJSONObject() {
                            var messageId = id
                        })).then(fun(res){
                            uni__emit("maskAsRead", id)
                        }
                        ))
                })
            }
            val equipQuery = fun(id: String): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        await(request(RequestOptions__1(url = apiPath["equip_id"] as String, method = "GET", data = _uO("id" to id))).then(fun(res){
                            if (res == null) {
                                return
                            }
                            val r = parseData<Equip>(res)
                            if (r == null) {
                                return
                            }
                            sourceTitle.value = r.name
                            sourceId.value = r.selfCode
                            sourceSubTitle.value = r.workshop?.name
                        }
                        ))
                })
            }
            val loadDetail = fun(id: String): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        await(request(RequestOptions__1(url = apiPath["message_detail"] as String, method = "GET", data = _uO("id" to id, "accId" to userInfo.value?.id))).then(fun(res){
                            if (res == null) {
                                return
                            }
                            val r = parseData<Message>(res)
                            if (r == null) {
                                return
                            }
                            message.value = r
                            if (r.readStatus == 0) {
                                markAsRead(r.id)
                            }
                            if (r.source == "Equip" && r.sourceId != null) {
                                equipQuery(r.sourceId!!)
                            }
                        }
                        ))
                })
            }
            fun gen_toOther_fn() {
                if (message.value == null || message.value!!.source == null || message.value!!.sourceId == null) {
                    return
                }
                if (message.value!!.source == "Equip") {
                    router.to("/pages/equip/equip_detail?id=" + message.value!!.sourceId!!)
                }
            }
            val toOther = ::gen_toOther_fn
            onLoad(fun(options){
                if (options == null) {
                    return
                }
                var id = options["id"] as String
                loadDetail(id)
            }
            )
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_image = resolveEasyComponent("cl-image", GenUniModulesCoolUnixComponentsClImageClImageClass)
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cV(_component_cl_topbar, _uM("fixed" to "", "show-back" to true, "safe-area-top" to "", "background-color" to if (unref(isDark)) {
                            "black"
                        } else {
                            "white"
                        }
                        ), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cV(_component_cl_text, _uM("pt" to object : UTSJSONObject() {
                                    var className = "-important-text-xl font-bold"
                                }, "title" to unref(t__1)("消息详情")), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        " 消息详情 "
                                    )
                                }
                                ), "_" to 1), 8, _uA(
                                    "title"
                                ))
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "background-color"
                        )),
                        _cE("scroll-view", _uM("scroll-y" to "", "class" to "p-4 content-wrapper"), _uA(
                            _cE("view", _uM("class" to _nC(_uA(
                                "detail-card",
                                _uM("card-type1" to (message.value?.type === 1))
                            ))), _uA(
                                _cE("view", _uM("class" to "detail-header"), _uA(
                                    _cV(_component_cl_image, _uM("src" to ("/static/icon/message/type_" + (if (message.value == null) {
                                        0
                                    } else {
                                        message.value!!.type
                                    }
                                    ) + ".svg"), "class" to "detail-icon"), null, 8, _uA(
                                        "src"
                                    )),
                                    _cE("view", _uM("class" to "detail-meta"), _uA(
                                        _cE("text", _uM("class" to "detail-title"), _tD(message.value?.title), 1),
                                        _cE("text", _uM("class" to "detail-time"), _tD(message.value?.createdTime), 1)
                                    ))
                                )),
                                if (sourceTitle.value != null) {
                                    _cE("view", _uM("key" to 0, "class" to "message-source", "onClick" to toOther), _uA(
                                        _cV(_component_cl_image, _uM("class" to "message-source-left", "src" to "/static/icon/source.svg"), null, 8, _uA(
                                            "src"
                                        )),
                                        _cE("view", _uM("class" to "message-source-middle"), _uA(
                                            _cE("text", _uM("class" to "text-lg text-gray-600"), _tD(sourceTitle.value), 1),
                                            _cE("text", _uM("class" to "text-xs text-gray-500"), _tD(sourceSubTitle.value), 1),
                                            _cE("text", _uM("class" to "text-base text-gray-400"), _tD(sourceId.value), 1)
                                        )),
                                        _cV(_component_cl_icon, _uM("class" to "message-source-right", "name" to "arrow-right-s-line", "pt" to object : UTSJSONObject() {
                                            var className = "-important-text-lg text-gray-400"
                                        }))
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                _cE("view", _uM("class" to "detail-content"), _uA(
                                    _cE("text", _uM("class" to "pb-2 text-lg"), "[" + _tD(unref(t__1)("报警内容")) + "]:", 1),
                                    _cE("text", null, _tD(message.value?.context), 1)
                                ))
                            ), 2)
                        ))
                    )
                }
                ), "_" to 1))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("detail-card" to _pS(_uM("borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "42rpx", "paddingRight" to "42rpx", "paddingBottom" to "42rpx", "paddingLeft" to "42rpx", "boxShadow" to "rgba(0, 0, 0, 0.1)")), "card-type1" to _pS(_uM("borderTopWidth" to 2, "borderRightWidth" to 2, "borderBottomWidth" to 2, "borderLeftWidth" to 2, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#ba0404", "borderRightColor" to "#ba0404", "borderBottomColor" to "#ba0404", "borderLeftColor" to "#ba0404")), "detail-header" to _pS(_uM("marginBottom" to "42rpx", "display" to "flex", "alignItems" to "center")), "detail-icon" to _pS(_uM("marginRight" to "28rpx", "height" to "84rpx", "width" to "84rpx", "alignItems" to "center")), "detail-meta" to _pS(_uM("marginTop" to "35rpx", "display" to "flex", "flexDirection" to "column")), "detail-title" to _pS(_uM("marginBottom" to "7rpx", "display" to "flex", "width" to "100%", "textAlign" to "center", "fontSize" to "42rpx", "lineHeight" to "56rpx", "fontWeight" to "700")), "message-source" to _pS(_uM("marginBottom" to "35rpx", "display" to "flex", "width" to "100%", "flexDirection" to "row", "alignItems" to "center", "borderTopLeftRadius" to "7rpx", "borderTopRightRadius" to "7rpx", "borderBottomRightRadius" to "7rpx", "borderBottomLeftRadius" to "7rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(243,244,246,1)", "borderRightColor" to "rgba(243,244,246,1)", "borderBottomColor" to "rgba(243,244,246,1)", "borderLeftColor" to "rgba(243,244,246,1)", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "14rpx", "paddingRight" to "14rpx", "paddingBottom" to "14rpx", "paddingLeft" to "14rpx")), "message-source-middle" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingRight" to "14rpx", "paddingLeft" to "14rpx")), "message-source-left" to _pS(_uM("flexGrow" to 0, "flexShrink" to 0, "flexBasis" to "auto", "height" to "100%", "width" to "28rpx", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "21rpx", "paddingRight" to "21rpx", "paddingBottom" to "21rpx", "paddingLeft" to "21rpx")), "message-source-right" to _pS(_uM("flexGrow" to 0, "flexShrink" to 0, "flexBasis" to "auto", "height" to "100%", "width" to "35rpx")), "detail-time" to _pS(_uM("display" to "flex", "textAlign" to "center", "fontSize" to "24.5rpx", "lineHeight" to "35rpx", "color" to "rgba(107,114,128,1)")), "detail-content" to _pS(_uM("whiteSpace" to "pre-wrap", "fontSize" to "28rpx", "lineHeight" to 1.625)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("maskAsRead" to null)
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
