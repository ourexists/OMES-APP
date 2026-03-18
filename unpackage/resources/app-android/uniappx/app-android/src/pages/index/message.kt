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
import io.dcloud.uniapp.extapi.`$on` as uni__on
import io.dcloud.uniapp.extapi.stopPullDownRefresh as uni_stopPullDownRefresh
open class GenPagesIndexMessage : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onPageScroll(fun(e: OnPageScrollOptions) {
            scroller.emit(e.scrollTop)
        }
        , __ins)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexMessage) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexMessage
            val _cache = __ins.renderCache
            val refs = useRefs()
            val page = ref(1)
            val pageSize: Number = 10
            val list = ref(_uA<Message>())
            val loading = ref(false)
            val hasMore = ref(true)
            val readStatus = ref<Number?>(null)
            val ui = useUi()
            fun gen_setMessage_fn() {
                refs.open("messageSet")
            }
            val setMessage = ::gen_setMessage_fn
            val loadData = fun(isClear: Boolean): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (loading.value) {
                            return@w1
                        }
                        loading.value = true
                        try {
                            await(request(RequestOptions__1(url = apiPath["message_page"] as String, method = "POST", data = _uO("page" to page.value, "pageSize" to pageSize, "accId" to userInfo.value?.id, "platform" to config__1.platform, "readStatus" to if (readStatus.value == -1) {
                                null
                            } else {
                                readStatus.value
                            }
                            ))).then(fun(res){
                                if (res == null) {
                                    if (isClear) {
                                        list.value = _uA()
                                    }
                                    return
                                }
                                val r = parseData<UTSArray<Message>>(res)
                                if (r == null) {
                                    if (isClear) {
                                        list.value = _uA()
                                    }
                                    return
                                }
                                if (isClear) {
                                    list.value = r
                                } else {
                                    list.value.push(*r.toTypedArray())
                                }
                                if (r.length < pageSize) {
                                    hasMore.value = false
                                } else {
                                    hasMore.value = true
                                    page.value++
                                }
                            }
                            ).`catch`(fun(err){
                                hasMore.value = true
                                page.value = 1
                                list.value = _uA()
                            }
                            ))
                        }
                         finally {
                            loading.value = false
                        }
                })
            }
            val reloadData = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        page.value = 1
                        await(loadData(true))
                })
            }
            val loadMore = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (!hasMore.value) {
                            return@w1
                        }
                        await(loadData(false))
                })
            }
            onLoad(fun(_options){
                reloadData()
                uni__on("maskAsRead", fun(id: String){
                    val index = list.value.findIndex(fun(item): Boolean {
                        return item.id == id
                    }
                    )
                    if (index !== -1) {
                        list.value[index].readStatus = 1
                        list.value = list.value.slice()
                    }
                }
                )
            }
            )
            onReachBottom(fun(){
                loadMore()
            }
            )
            onPullDownRefresh(fun(){
                reloadData()
                uni_stopPullDownRefresh()
            }
            )
            fun gen_onMessageChange_fn(payload: MessageSetPayload) {
                if (readStatus.value === payload.status) {
                    return
                }
                readStatus.value = payload.status
                reloadData()
            }
            val onMessageChange = ::gen_onMessageChange_fn
            return fun(): Any? {
                val _component_cl_text = resolveEasyComponent("cl-text", GenUniModulesCoolUnixComponentsClTextClTextClass)
                val _component_cl_icon = resolveEasyComponent("cl-icon", GenUniModulesCoolUnixComponentsClIconClIconClass)
                val _component_cl_topbar = resolveEasyComponent("cl-topbar", GenUniModulesCoolUnixComponentsClTopbarClTopbarClass)
                val _component_cl_image = resolveEasyComponent("cl-image", GenUniModulesCoolUnixComponentsClImageClImageClass)
                val _component_cl_page = resolveEasyComponent("cl-page", GenUniModulesCoolUnixComponentsClPageClPageClass)
                return _cV(_component_cl_page, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cV(_component_cl_topbar, _uM("fixed" to "", "background-color" to if (unref(isDark)) {
                            "black"
                        } else {
                            "white"
                        }
                        , "show-back" to false, "safe-area-top" to "", "height" to if (unref(isMp)()) {
                            null
                        } else {
                            100
                        }
                        , "pt" to object : UTSJSONObject() {
                            var className = "-important-z-50"
                        }), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cE("view", _uM("class" to _nC(_uA(
                                    "flex flex-row items-center justify-center p-3 w-full",
                                    _uM("pt-0" to unref(isMp)())
                                )), "onClick" to setMessage), _uA(
                                    _cV(_component_cl_text, _uM("color" to "primary", "pt" to object : UTSJSONObject() {
                                        var className = "-important-text-xl"
                                    }, "title" to unref(t__1)("消息")), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(unref(t__1)("消息"))
                                        )
                                    }
                                    ), "_" to 1), 8, _uA(
                                        "title"
                                    )),
                                    _cV(_component_cl_icon, _uM("name" to "bar-chart-horizontal-line", "color" to "primary"))
                                ), 2)
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "background-color",
                            "height"
                        )),
                        _cE("view", _uM("class" to "p-3"), _uA(
                            _cE(Fragment, null, RenderHelpers.renderList(list.value, fun(item, __key, __index, _cached): Any {
                                return _cE("view", _uM("key" to item.id, "class" to "swipe-wrapper", "onClick" to fun(){
                                    unref(router).to("/pages/message/message_detail?id=" + item.id)
                                }
                                ), _uA(
                                    _cE("view", _uM("class" to _nC(_uA(
                                        "card",
                                        _uM("card-type1" to (item.type == 1))
                                    ))), _uA(
                                        _cE("view", _uM("class" to "message-icon"), _uA(
                                            _cV(_component_cl_image, _uM("src" to ("/static/icon/message/type_" + item?.type + ".svg"), "class" to "detail-icon"), null, 8, _uA(
                                                "src"
                                            ))
                                        )),
                                        _cE("view", _uM("class" to "message-content"), _uA(
                                            _cE("text", _uM("class" to "card-title"), _tD(item.title), 1),
                                            _cE("text", _uM("class" to "card-time"), _tD(item.createdTime), 1),
                                            _cE("text", _uM("class" to "card-content"), _tD(item.context), 1)
                                        )),
                                        if (item.readStatus == 0) {
                                            _cE("view", _uM("key" to 0, "class" to "dot"))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    ), 2)
                                ), 8, _uA(
                                    "onClick"
                                ))
                            }
                            ), 128),
                            if (isTrue(loading.value)) {
                                _cE("text", _uM("key" to 0, "class" to "text-center p-2 text-gray-300"), "加载中…")
                            } else {
                                _cC("v-if", true)
                            }
                        )),
                        _cV(unref(GenComponentsTabbarClass)),
                        _cV(unref(GenPagesIndexComponentsMessageSetClass), _uM("ref" to unref(refs).set("messageSet"), "status" to readStatus.value, "onChange" to onMessageChange), null, 8, _uA(
                            "status"
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
                return _uM("card" to _pS(_uM("height" to "280rpx", "marginBottom" to "28rpx", "display" to "flex", "flexWrap" to "wrap", "borderTopLeftRadius" to "21rpx", "borderTopRightRadius" to "21rpx", "borderBottomRightRadius" to "21rpx", "borderBottomLeftRadius" to "21rpx", "backgroundColor" to "rgba(255,255,255,1)", "paddingTop" to "28rpx", "paddingRight" to "28rpx", "paddingBottom" to "28rpx", "paddingLeft" to "28rpx", "boxShadow" to "rgba(0, 0, 0, 0.1)")), "message-icon" to _pS(_uM("width" to "30%", "display" to "flex", "height" to "100%", "alignItems" to "center", "justifyContent" to "center")), "message-content" to _pS(_uM("width" to "70%", "display" to "flex", "height" to "100%")), "card-title" to _pS(_uM("marginBottom" to "14rpx", "fontSize" to "42rpx", "lineHeight" to "56rpx", "fontWeight" to "700")), "card-time" to _pS(_uM("marginBottom" to "28rpx", "fontSize" to "24.5rpx", "lineHeight" to "35rpx")), "card-content" to _pS(_uM("fontSize" to "28rpx", "lineHeight" to "42rpx", "fontWeight" to "400")), "card-type1" to _pS(_uM("borderTopWidth" to 2, "borderRightWidth" to 2, "borderBottomWidth" to 2, "borderLeftWidth" to 2, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#ba0404", "borderRightColor" to "#ba0404", "borderBottomColor" to "#ba0404", "borderLeftColor" to "#ba0404")), "card-icon" to _pS(_uM("marginRight" to "28rpx", "width" to "50%")), "swipe-wrapper" to _pS(_uM("position" to "relative")), "dot" to _pS(_uM("position" to "absolute", "right" to "42rpx", "top" to "42rpx", "height" to "21rpx", "width" to "21rpx", "borderTopLeftRadius" to 9999, "borderTopRightRadius" to 9999, "borderBottomRightRadius" to 9999, "borderBottomLeftRadius" to 9999, "backgroundColor" to "rgba(239,68,68,1)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
