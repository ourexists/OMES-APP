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
open class GenPagesUserLoginAccount : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var form: LoginForm by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesUserLoginAccount) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesUserLoginAccount
            val _cache = __ins.renderCache
            val props = __props
            val captchaUrl = ref("")
            val captchaKey = ref("")
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val ui = useUi()
            val loading = ref(false)
            val disabled = computed(fun(): Boolean {
                return props.form.username == "" || props.form.password == "" || props.form.captcha == ""
            }
            )
            fun gen_loadCaptcha_fn() {
                var uuid = Date.now().toString(10)
                captchaKey.value = uuid
                request(RequestOptions__1(url = "" + apiPath["captcha"] + "?uuid=" + uuid, method = "GET")).then(fun(res){
                    captchaUrl.value = res as String
                }
                )
            }
            val loadCaptcha = ::gen_loadCaptcha_fn
            loadCaptcha()
            fun gen_toLogin_fn() {
                val _props_form = props.form
                val username = _props_form.username
                val password = _props_form.password
                val captcha = _props_form.captcha
                loading.value = true
                val basicAuth = base64Encode("" + authParam["client_id"] + ":" + authParam["client_sc"])
                request(RequestOptions__1(url = apiPath["auth_token"] as String, method = "POST", header = object : UTSJSONObject() {
                    var `content-type` = "application/x-www-form-urlencoded"
                    var `Access-Control-Allow-Origin` = true
                    var Authorization = "Basic " + basicAuth
                }, data = _uO("client_id" to authParam["client_id"], "grant_type" to "captcha", "username" to username, "password" to password, "captcha" to (captchaKey.value + "-" + captcha)))).then(fun(res){
                    if (res != null) {
                        val r = parse<LoginTokenResponse>(res)
                        if (r != null) {
                            emit("success", r)
                        }
                    }
                }
                ).`catch`(fun(err){
                    loadCaptcha()
                    if (err == null) {
                        return
                    }
                    val e = parse<UTSError>(err)
                    if (e == null) {
                        return
                    }
                    ui.showToast(ClToastOptions(message = e.msg, msgNotifier = e.msg))
                }
                )
                loading.value = false
            }
            val toLogin = ::gen_toLogin_fn
            return fun(): Any? {
                val _component_cl_input = resolveEasyComponent("cl-input", GenUniModulesCoolUnixComponentsClInputClInputClass)
                val _component_cl_image = resolveEasyComponent("cl-image", GenUniModulesCoolUnixComponentsClImageClImageClass)
                val _component_cl_button = resolveEasyComponent("cl-button", GenUniModulesCoolUnixComponentsClButtonClButtonClass)
                return _cE("view", _uM("class" to "flex flex-col"), _uA(
                    _cE("view", _uM("class" to "mb-3 flex flex-row"), _uA(
                        _cV(_component_cl_input, _uM("modelValue" to _ctx.form.username, "onUpdate:modelValue" to fun(`$event`: String){
                            _ctx.form.username = `$event`
                        }
                        , "prefix-icon" to "device-fill", "placeholder" to unref(t__1)("请输入账户"), "border" to false, "pt" to object : UTSJSONObject() {
                            var className = unref(parseClass)(_uA(
                                "-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4",
                                _uA(
                                    unref(isDark),
                                    "-important-bg-surface-70",
                                    "-important-bg-white"
                                )
                            ))
                            var prefixIcon = object : UTSJSONObject() {
                                var className = "mr-1"
                            }
                        }), null, 8, _uA(
                            "modelValue",
                            "onUpdate:modelValue",
                            "placeholder",
                            "pt"
                        ))
                    )),
                    _cE("view", _uM("class" to "relative flex flex-row items-center mb-5"), _uA(
                        _cV(_component_cl_input, _uM("password" to "", "modelValue" to _ctx.form.password, "onUpdate:modelValue" to fun(`$event`: String){
                            _ctx.form.password = `$event`
                        }
                        , "clearable" to false, "prefix-icon" to "shield-check-fill", "placeholder" to unref(t__1)("请输入密码"), "border" to false, "pt" to object : UTSJSONObject() {
                            var className = unref(parseClass)(_uA(
                                "-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4",
                                _uA(
                                    unref(isDark),
                                    "-important-bg-surface-70",
                                    "-important-bg-white"
                                )
                            ))
                            var prefixIcon = object : UTSJSONObject() {
                                var className = "mr-1"
                            }
                        }), null, 8, _uA(
                            "modelValue",
                            "onUpdate:modelValue",
                            "placeholder",
                            "pt"
                        ))
                    )),
                    _cE("view", _uM("class" to "relative flex flex-row items-center mb-5"), _uA(
                        _cV(_component_cl_input, _uM("class" to "captchaInput", "modelValue" to _ctx.form.captcha, "onUpdate:modelValue" to fun(`$event`: String){
                            _ctx.form.captcha = `$event`
                        }
                        , "clearable" to false, "prefix-icon" to "profile-fill", "placeholder" to unref(t__1)("请输入验证码"), "maxlength" to 5, "border" to false, "pt" to object : UTSJSONObject() {
                            var className = unref(parseClass)(_uA(
                                "-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4",
                                _uA(
                                    unref(isDark),
                                    "-important-bg-surface-70",
                                    "-important-bg-white"
                                )
                            ))
                            var prefixIcon = object : UTSJSONObject() {
                                var className = "mr-1"
                            }
                        }), null, 8, _uA(
                            "modelValue",
                            "onUpdate:modelValue",
                            "placeholder",
                            "pt"
                        )),
                        _cV(_component_cl_image, _uM("src" to captchaUrl.value, "onClick" to loadCaptcha, "class" to "captcha-img", "mode" to "aspectFit"), _uM("error" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cE("text", null, "loading")
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "src"
                        ))
                    )),
                    _cV(_component_cl_button, _uM("pt" to object : UTSJSONObject() {
                        var className = "-important-h--bracket-start-90rpx-bracket-end- -important-rounded-xl"
                    }, "loading" to loading.value, "disabled" to disabled.value, "onClick" to toLogin), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _tD(unref(t__1)("登录"))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "loading",
                        "disabled"
                    ))
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
                return _uM("captchaInput" to _pS(_uM("width" to "70%")), "captcha-img" to _pS(_uM("width" to "30%", "borderTopLeftRadius" to "4rpx", "borderTopRightRadius" to "4rpx", "borderBottomRightRadius" to "4rpx", "borderBottomLeftRadius" to "4rpx", "display" to "flex", "height" to "100%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("success" to null)
        var props = _nP(_uM("form" to _uM("type" to "Object", "default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        )))
        var propsNeedCastKeys = _uA(
            "form"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
