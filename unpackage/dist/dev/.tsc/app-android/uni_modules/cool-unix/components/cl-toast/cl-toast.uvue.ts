import _easycom_cl_icon from '@/uni_modules/cool-unix/components/cl-icon/cl-icon.uvue'
import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_popup from '@/uni_modules/cool-unix/components/cl-popup/cl-popup.uvue'
import {reactive, ref} from "vue";
import type {ClToastOptions} from "../../types";
import {isNull} from "../../cool";
import {isDark} from "../../theme";

type ToastItem = { __$originalPosition?: UTSSourceMapPosition<"ToastItem", "uni_modules/cool-unix/components/cl-toast/cl-toast.uvue", 65, 6>;
  id: number; // 唯一标识
  visible: boolean; // 是否显示
  isOpen: boolean; // 是否打开
  icon?: string; // 可选，图标名称
  image?: string; // 可选，图片地址
  msgNotifier: string; // 显示的文本内容
  position: "top" | "center" | "bottom"; // 显示位置
  duration: number; // 显示时长（毫秒）
};

// toast列表，当前仅用于v-for结构，实际只显示一个

const __sfc__ = defineComponent({
  __name: 'cl-toast',

  name: "cl-toast"
,
  setup(__props, __setupCtx: SetupContext) {
const __expose = __setupCtx.expose
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;



// ToastItem 类型定义，表示单个toast的属性
const list = ref<ToastItem[]>([]);

// 用于生成唯一id
let id = 0;

// 关闭toast的方法
function close(id: number) {
  const item = list.value.find((item) => item.id == id);

  if (item != null) {
    item.visible = false;
  }
}

// 打开toast的方法，传入配置信息
function open(options: ClToastOptions) {
  // 创建一个新的 ToastItem 实例，包含所有配置信息
  const item = reactive<ToastItem>({
    id: id++,
    visible: true,
    isOpen: false,
    icon: options.icon,
    image: options.image,
    duration: options.duration ?? 2000,
    position: options.position ?? "center",
    msgNotifier: options.msgNotifier ?? ""
  });

  // 如果有icon或image，强制居中显示
  if (!isNull(item.icon) || !isNull(item.image)) {
    item.position = "center";
  }

  switch (options.type) {
    case "success":
      item.icon = "checkbox-circle-line";
      break;
    case "warn":
      item.icon = "error-warning-line";
      break;
    case "error":
      item.icon = "close-circle-line";
      break;
    case "question":
      item.icon = "question-line";
      break;
    case "disabled":
      item.icon = "prohibited-line";
      break;
    case "stop":
      item.icon = "indeterminate-circle-line";
      break;
  }

  // 如果clear为true，则只保留当前toast，否则追加到列表
  if (options.clear == true) {
    list.value = [item];
  } else {
    list.value.push(item);
  }

  // 延迟打开toast，避免闪烁
  setTimeout(() => {
    item.isOpen = true;

    // 如果duration不为0，则自动关闭toast
    if (item.duration != 0) {
      setTimeout(() => {
        close(item.id); // 到时自动关闭
      }, item.duration!);
    }
  }, 50);
}

__expose({
  open,
  close
});

return (): any | null => {

const _component_cl_icon = resolveEasyComponent("cl-icon",_easycom_cl_icon)
const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_popup = resolveEasyComponent("cl-popup",_easycom_cl_popup)

  return _cE(Fragment, null, RenderHelpers.renderList(list.value, (item, id, __index, _cached): any => {
    return _cV(_component_cl_popup, _uM({
      key: id,
      direction: item.position,
      "show-mask": false,
      "show-header": false,
      "swipe-close": false,
      pt: {
			inner: {
				className: '-important-bg-transparent'
			}
		},
      "keep-alive": "",
      "pointer-events": "none",
      modelValue: item.visible,
      "onUpdate:modelValue": $event => {(item.visible) = $event}
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cE("view", _uM({ class: "cl-toast-wrapper" }), [
          _cE("view", _uM({
            class: _nC(["cl-toast", [_uM<string, any | null>({}),
					_uM({
						'is-dark': unref(isDark),
						'is-open': item.isOpen
					}),
					`cl-toast--${item.position}`
				]])
          }), [
            _cE("view", _uM({ class: "flex flex-row justify-center" }), [
              item.icon != null
                ? _cV(_component_cl_icon, _uM({
                    key: 0,
                    color: "white",
                    name: item.icon,
                    size: 56,
                    pt: {
							className: `mb-1`
						}
                  }), null, 8 /* PROPS */, ["name"])
                : _cC("v-if", true)
            ]),
            _cV(_component_cl_text, _uM({
              color: "white",
              pt: {
						className: 'text-center'
					}
            }), _uM({
              default: withSlotCtx((): any[] => [_tD(item.msgNotifier)]),
              _: 2 /* DYNAMIC */
            }), 1024 /* DYNAMIC_SLOTS */)
          ], 2 /* CLASS */)
        ])
      ]),
      _: 2 /* DYNAMIC */
    }), 1032 /* PROPS, DYNAMIC_SLOTS */, ["direction", "modelValue", "onUpdate:modelValue"])
  }), 128 /* KEYED_FRAGMENT */)
}
}

})
export default __sfc__
export type ClToastComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClToastClToastStyles = [_uM([["cl-toast-wrapper", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"], ["paddingTop", "50rpx"], ["paddingRight", 0], ["paddingBottom", "50rpx"], ["paddingLeft", 0]]))], ["cl-toast", _uM([["", _uM([["borderTopLeftRadius", "28rpx"], ["borderTopRightRadius", "28rpx"], ["borderBottomRightRadius", "28rpx"], ["borderBottomLeftRadius", "28rpx"], ["paddingLeft", "32rpx"], ["paddingRight", "32rpx"], ["paddingTop", "24rpx"], ["paddingBottom", "24rpx"], ["backgroundColor", "rgba(50,50,50,0.9)"], ["maxWidth", "600rpx"], ["opacity", 0]])], [".is-open", _uM([["opacity", 1]])], [".is-dark", _uM([["backgroundColor", "rgba(70,70,70,0.9)"]])]])]])]
