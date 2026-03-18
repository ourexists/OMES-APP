import _easycom_cl_input from '@/uni_modules/cool-unix/components/cl-input/cl-input.uvue'
import _easycom_cl_image from '@/uni_modules/cool-unix/components/cl-image/cl-image.uvue'
import _easycom_cl_button from '@/uni_modules/cool-unix/components/cl-button/cl-button.uvue'
import {t} from "@/locale";
import {computed, type PropType, ref} from "vue";
import type {LoginForm} from "@/pages/user/types";
import {isDark, parse, parseClass, useUi} from "@/uni_modules/cool-unix";
import {type LoginTokenResponse, request} from "@/core/service";
import {apiPath, authParam} from "@/core/apiRouter/path";
import type {Error} from "@/core/types";
import {base64Encode} from "@/pages/user/login/base64";


const __sfc__ = defineComponent({
  __name: 'account',
  props: {
  form: {
    type: Object as PropType<LoginForm>,
    default: () => ({})
  },
},
  emits: ["success"],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const props = __props;

const captchaUrl = ref('');
const captchaKey = ref('');

function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

const ui = useUi();

// 是否加载中
const loading = ref(false);

// 是否禁用
const disabled = computed(() => {
  return props.form.username == "" || props.form.password == "" || props.form.captcha == "";
});

function loadCaptcha() {
  let uuid = Date.now().toString()
  captchaKey.value = uuid
  request({
    url: `${apiPath.captcha}?uuid=${uuid}`,
    method: "GET"
  }).then(res => {
    captchaUrl.value = res as string;
  })
}

loadCaptcha();

// 登录
function toLogin() {

  const {username, password, captcha} = props.form;

  loading.value = true;
  const basicAuth = base64Encode(`${authParam.client_id}:${authParam.client_sc}`);

  request({
    url: apiPath.auth_token as string,
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      "Authorization": `Basic ${basicAuth}`,
    },
    data: {
      client_id: authParam.client_id,
      grant_type: 'captcha',
      username,
      password,
      captcha: captchaKey.value + "-" + captcha
    }
  })
      .then((res) => {
        if (res != null) {
          const r = parse<LoginTokenResponse>(res);
          if (r != null) {
            emit("success", r);
          }
        }
      })
      .catch((err) => {
        loadCaptcha();
        if (err == null) {
          return;
        }
        const e = parse<Error>(err);
        if (e == null) {
          return;
        }
        ui.showToast({
          message: e.msg,
          msgNotifier: e.msg
        });
      });

  loading.value = false;
}

return (): any | null => {

const _component_cl_input = resolveEasyComponent("cl-input",_easycom_cl_input)
const _component_cl_image = resolveEasyComponent("cl-image",_easycom_cl_image)
const _component_cl_button = resolveEasyComponent("cl-button",_easycom_cl_button)

  return _cE("view", _uM({ class: "flex flex-col" }), [
    _cE("view", _uM({ class: "mb-3 flex flex-row" }), [
      _cV(_component_cl_input, _uM({
        modelValue: _ctx.form.username,
        "onUpdate:modelValue": $event => {(_ctx.form.username) = $event},
        "prefix-icon": "device-fill",
        placeholder: unref(t)('请输入账户'),
        border: false,
        pt: {
					className: unref(parseClass)([
						'-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4',
						[unref(isDark), '-important-bg-surface-70', '-important-bg-white']
					]),
					prefixIcon: {
						className: 'mr-1'
					}
				}
      }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "placeholder", "pt"])
    ]),
    _cE("view", _uM({ class: "relative flex flex-row items-center mb-5" }), [
      _cV(_component_cl_input, _uM({
        password: "",
        modelValue: _ctx.form.password,
        "onUpdate:modelValue": $event => {(_ctx.form.password) = $event},
        clearable: false,
        "prefix-icon": "shield-check-fill",
        placeholder: unref(t)('请输入密码'),
        border: false,
        pt: {
					className: unref(parseClass)([
						'-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4',
						[unref(isDark), '-important-bg-surface-70', '-important-bg-white']
					]),
					prefixIcon: {
						className: 'mr-1'
					}
				}
      }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "placeholder", "pt"])
    ]),
    _cE("view", _uM({ class: "relative flex flex-row items-center mb-5" }), [
      _cV(_component_cl_input, _uM({
        class: "captchaInput",
        modelValue: _ctx.form.captcha,
        "onUpdate:modelValue": $event => {(_ctx.form.captcha) = $event},
        clearable: false,
        "prefix-icon": "profile-fill",
        placeholder: unref(t)('请输入验证码'),
        maxlength: 5,
        border: false,
        pt: {
					className: unref(parseClass)([
						'-important-h--bracket-start-90rpx-bracket-end- flex-1 -important-rounded-xl -important-px-4',
						[unref(isDark), '-important-bg-surface-70', '-important-bg-white']
					]),
					prefixIcon: {
						className: 'mr-1'
					}
				}
      }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "placeholder", "pt"]),
      _cV(_component_cl_image, _uM({
        src: captchaUrl.value,
        onClick: loadCaptcha,
        class: "captcha-img",
        mode: "aspectFit"
      }), _uM({
        error: withSlotCtx((): any[] => [
          _cE("text", null, "loading")
        ]),
        _: 1 /* STABLE */
      }), 8 /* PROPS */, ["src"])
    ]),
    _cV(_component_cl_button, _uM({
      pt: {
				className: '-important-h--bracket-start-90rpx-bracket-end- -important-rounded-xl'
			},
      loading: loading.value,
      disabled: disabled.value,
      onClick: toLogin
    }), _uM({
      default: withSlotCtx((): any[] => [_tD(unref(t)("登录"))]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["loading", "disabled"])
  ])
}
}

})
export default __sfc__
const GenPagesUserLoginAccountStyles = [_uM([["captchaInput", _pS(_uM([["width", "70%"]]))], ["captcha-img", _pS(_uM([["width", "30%"], ["borderTopLeftRadius", "4rpx"], ["borderTopRightRadius", "4rpx"], ["borderBottomRightRadius", "4rpx"], ["borderBottomLeftRadius", "4rpx"], ["display", "flex"], ["height", "100%"]]))]])]
