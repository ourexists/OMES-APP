import _easycom_cl_select from '@/uni_modules/cool-unix/components/cl-select/cl-select.uvue'
import {type ClSelectOption, isDark, useUi} from "@/uni_modules/cool-unix";
import {t} from "@/locale";
import {ref} from "vue";

export type MessageSetPayload = { __$originalPosition?: UTSSourceMapPosition<"MessageSetPayload", "pages/index/components/message-set.uvue", 29, 13>;
  status: number | null
}


const __sfc__ = defineComponent({
  __name: 'message-set',
  props: {
    status: { type: Number, required: false }
  },
  emits: ["change"],
  setup(__props, __setupCtx: SetupContext) {
const __expose = __setupCtx.expose
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const ui = useUi();

const statusOptions = [
  {label: "全部", value: -1},
  {label: "未读", value: 0},
  {label: "已读", value: 1}
] as ClSelectOption[];

const selectRef = ref<ClSelectComponentPublicInstance | null>(null);
const selectStatus = ref<number>(-1);

const props = __props;

function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}


// 统一派发事件
function emitFilter() {
  const status: number | null = selectStatus.value == -1 ? null : selectStatus.value;
  emit('change', {status} as MessageSetPayload)
}

// 打开
function open() {
  selectStatus.value = props.status == null ? -1 : props.status;
  selectRef.value!.open((value) => {
    ui.showLoading(t("切换中"));
    setTimeout(() => {
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

  return _cE("view", _uM({
    class: _nC(["message-set", _uM({ 'is-dark': unref(isDark) })])
  }), [
    _cV(_component_cl_select, _uM({
      ref_key: "selectRef",
      ref: selectRef,
      modelValue: selectStatus.value,
      "onUpdate:modelValue": $event => {(selectStatus).value = $event},
      options: statusOptions,
      "show-trigger": false,
      title: unref(t)('已读状态'),
      "cancel-text": unref(t)('取消'),
      "confirm-text": unref(t)('确定'),
      onChange: emitFilter
    }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "title", "cancel-text", "confirm-text"])
  ], 2 /* CLASS */)
}
}

})
export default __sfc__
const GenPagesIndexComponentsMessageSetStyles = []

import { ClSelectComponentPublicInstance  } from "@/uni_modules/cool-unix/components/cl-select/cl-select.uvue"