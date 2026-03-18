import _easycom_cl_select from '@/uni_modules/cool-unix/components/cl-select/cl-select.uvue'
import {type ClSelectOption, useUi} from "@/uni_modules/cool-unix";
import {locale, setLocale, t} from "@/locale";
import {ref} from "vue";


const __sfc__ = defineComponent({
  __name: 'locale-set',
  setup(__props, __setupCtx: SetupContext) {
const __expose = __setupCtx.expose
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const ui = useUi();

// 语言列表
const options = [
  {
    label: "简体中文",
    value: "zh-cn"
  },
  {
    label: "繁体中文",
    value: "zh-tw"
  },
  {
    label: "English",
    value: "en"
  },
  {
    label: "Español",
    value: "es"
  },
  {
    label: "日本語",
    value: "ja"
  },
  {
    label: "한국어",
    value: "ko"
  },
  {
    label: "Français",
    value: "fr"
  }
] as ClSelectOption[];

const selectRef = ref<ClSelectComponentPublicInstance | null>(null);

// 当前语言
const active = ref(locale.value);

// 打开
function open() {
  active.value = locale.value;

  if (["zh-Hans", "zh"].some((e) => e == locale.value)) {
    active.value = "zh-cn";
  }

  selectRef.value!.open((value) => {
    ui.showLoading(t("切换中"));

    setTimeout(() => {
      setLocale(value as string);
      ui.hideLoading();
    }, 500);
  });
}

// 关闭
function close() {
  selectRef.value!.close();
}

__expose({
  open,
  close
});

return (): any | null => {

const _component_cl_select = resolveEasyComponent("cl-select",_easycom_cl_select)

  return _cV(_component_cl_select, _uM({
    ref_key: "selectRef",
    ref: selectRef,
    modelValue: active.value,
    "onUpdate:modelValue": $event => {(active).value = $event},
    options: options,
    "show-trigger": false,
    title: unref(t)('切换语言'),
    "cancel-text": unref(t)('取消'),
    "confirm-text": unref(t)('确定')
  }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "title", "cancel-text", "confirm-text"])
}
}

})
export default __sfc__
const GenComponentsLocaleSetStyles = []

import { ClSelectComponentPublicInstance  } from "@/uni_modules/cool-unix/components/cl-select/cl-select.uvue"