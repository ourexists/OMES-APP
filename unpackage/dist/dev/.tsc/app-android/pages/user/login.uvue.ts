import _easycom_cl_topbar from '@/uni_modules/cool-unix/components/cl-topbar/cl-topbar.uvue'
import _easycom_cl_image from '@/uni_modules/cool-unix/components/cl-image/cl-image.uvue'
import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_page from '@/uni_modules/cool-unix/components/cl-page/cl-page.uvue'
import {config} from "@/config";
import {router, useUi} from "@/uni_modules/cool-unix";
import {type Token, useStore} from "@/core/store";
import {reactive} from "vue";
import {type LoginTokenResponse} from "@/core/service";
import type {LoginForm} from "@/pages/user/types";
import LoginAccount from "@/pages/user/login/account.uvue";


const __sfc__ = defineComponent({
  __name: 'login',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const {user} = useStore();
const ui = useUi();


// 表单
const form = reactive<LoginForm>({
  username: "",
  password: "",
  captcha: ""
});

// 登录成功
async function toLogin(res: LoginTokenResponse) {
  let token = {
    token: res.token_type + " " + res.access_token,
    expire: res.expires_in,
    refreshToken: "",
    refreshExpire: 0
  } as Token;
  user.setToken(token!);
  user.get().then(r => {
    router.nextLogin();
  });
}

return (): any | null => {

const _component_cl_topbar = resolveEasyComponent("cl-topbar",_easycom_cl_topbar)
const _component_cl_image = resolveEasyComponent("cl-image",_easycom_cl_image)
const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_page = resolveEasyComponent("cl-page",_easycom_cl_page)

  return _cV(_component_cl_page, null, _uM({
    default: withSlotCtx((): any[] => [
      _cV(_component_cl_topbar, _uM({
        "safe-area-top": "",
        "background-color": "transparent"
      })),
      _cE("view", _uM({ class: "px-10" }), [
        _cE("view", _uM({ class: "flex flex-col items-center justify-center py-20" }), [
          _cE("view", null, [
            _cV(_component_cl_image, _uM({
              src: "/static/logo.png",
              mode: "widthFix",
              width: 120,
              height: 120
            }))
          ]),
          _cV(_component_cl_text, _uM({ pt: { className: 'text-xl font-bold mt-3' } }), _uM({
            default: withSlotCtx((): any[] => [_tD(unref(config).name)]),
            _: 1 /* STABLE */
          }))
        ]),
        _cV(unref(LoginAccount), _uM({
          form: form,
          onSuccess: toLogin
        }), null, 8 /* PROPS */, ["form"])
      ])
    ]),
    _: 1 /* STABLE */
  }))
}
}

})
export default __sfc__
const GenPagesUserLoginStyles = [_uM([["login-item", _uM([["", _uM([["marginLeft", "14rpx"], ["marginRight", "14rpx"], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"], ["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(244,244,245,1)"], ["borderRightColor", "rgba(244,244,245,1)"], ["borderBottomColor", "rgba(244,244,245,1)"], ["borderLeftColor", "rgba(244,244,245,1)"], ["backgroundColor", "rgba(255,255,255,1)"], ["paddingTop", "14rpx"], ["paddingRight", "14rpx"], ["paddingBottom", "14rpx"], ["paddingLeft", "14rpx"]])], [".is-dark", _uM([["borderTopColor", "rgba(82,82,91,1)"], ["borderRightColor", "rgba(82,82,91,1)"], ["borderBottomColor", "rgba(82,82,91,1)"], ["borderLeftColor", "rgba(82,82,91,1)"], ["backgroundColor", "rgba(63,63,70,1)"]])]])]])]
