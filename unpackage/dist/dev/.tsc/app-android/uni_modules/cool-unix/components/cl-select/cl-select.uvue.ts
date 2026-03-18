import _easycom_cl_select_trigger from '@/uni_modules/cool-unix/components/cl-select-trigger/cl-select-trigger.uvue'
import _easycom_cl_empty from '@/uni_modules/cool-unix/components/cl-empty/cl-empty.uvue'
import _easycom_cl_picker_view from '@/uni_modules/cool-unix/components/cl-picker-view/cl-picker-view.uvue'
import _easycom_cl_button from '@/uni_modules/cool-unix/components/cl-button/cl-button.uvue'
import _easycom_cl_popup from '@/uni_modules/cool-unix/components/cl-popup/cl-popup.uvue'
import { ref, computed, type PropType, watch } from "vue";
import type { ClSelectOption, ClSelectValue } from "../../types";
import { isEmpty, isNull, parsePt, parseToObject } from "../../cool";
import type { ClSelectTriggerPassThrough } from "../cl-select-trigger/props";
import type { ClPopupPassThrough } from "../cl-popup/props";
import { t } from "../../locale";

type PassThrough = { __$originalPosition?: UTSSourceMapPosition<"PassThrough", "uni_modules/cool-unix/components/cl-select/cl-select.uvue", 156, 6>;
	trigger?: ClSelectTriggerPassThrough;
	popup?: ClPopupPassThrough;
};

// 解析透传样式配置

const __sfc__ = defineComponent({
  __name: 'cl-select',

	name: "cl-select"
,
  props: {
	// 透传样式配置
	pt: {
		type: Object,
		default: () => ({})
	},
	// 选择器的值
	modelValue: {
		type: [Array, Number, String] as PropType<ClSelectValue>,
		default: null
	},
	// 选择器标题
	title: {
		type: String,
		default: () => t("请选择")
	},
	// 选择器占位符
	placeholder: {
		type: String,
		default: () => t("请选择")
	},
	// 选项数据
	options: {
		type: Array as PropType<ClSelectOption[]>,
		default: () => []
	},
	// 是否显示选择器触发器
	showTrigger: {
		type: Boolean,
		default: true
	},
	// 是否禁用选择器
	disabled: {
		type: Boolean,
		default: false
	},
	// 列数
	columnCount: {
		type: Number as PropType<number>,
		default: 1
	},
	// 分隔符
	splitor: {
		type: String,
		default: " - "
	},
	// 确认按钮文本
	confirmText: {
		type: String,
		default: () => t("确定")
	},
	// 是否显示确认按钮
	showConfirm: {
		type: Boolean,
		default: true
	},
	// 取消按钮文本
	cancelText: {
		type: String,
		default: () => t("取消")
	},
	// 是否显示取消按钮
	showCancel: {
		type: Boolean,
		default: true
	}
},
  emits: ["update:modelValue", "change", "changing"],
  setup(__props, __setupCtx: SetupContext) {
const __expose = __setupCtx.expose
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;





// 组件属性定义
const props = __props;

// 定义事件
function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

// 弹出层引用
const popupRef = ref<ClPopupComponentPublicInstance | null>(null);

// 透传样式类型定义
const pt = computed(() => parsePt<PassThrough>(props.pt));

// 解析触发器透传样式配置
const ptTrigger = computed(() => parseToObject(pt.value.trigger));

// 解析弹窗透传样式配置
const ptPopup = computed(() => parseToObject(pt.value.popup));

// 是否为空选项
const noOptions = computed(() => {
	return isEmpty(props.options);
});

// 当前选中的值
const value = ref<any[]>([]);

// 当前选中项的索引
const indexes = ref<number[]>([]);

// 计算选择器列表数据
const columns = computed<ClSelectOption[][]>(() => {
	// 获取原始选项数据
	let options = props.options;

	// 用于存储每一列的选项数据
	let columns = [] as ClSelectOption[][];

	// 根据当前选中值构建多列数据
	for (let i = 0; i < props.columnCount; i++) {
		// 复制当前层级的选项数据作为当前列的选项
		const column = [...options];

		// 获取当前列的选中值,如果value数组长度不足则为null
		const val = i >= value.value.length ? null : value.value[i];

		// 在当前列选项中查找选中值对应的选项
		let item = options.find((item) => item.value == val);

		// 如果未找到选中项且选项不为空,则默认选中第一项
		if (item == null && !isEmpty(options)) {
			item = options[0];
		}

		// 如果选中项有子选项,则更新options为子选项数据,用于构建下一列
		if (item?.children != null) {
			options = item.children as ClSelectOption[];
		}

		// 将当前列的选项数据添加到columns数组
		columns.push(column);
	}

	// 返回构建好的多列数据
	return columns;
});

// 显示文本
const text = ref("");

// 更新文本内容
function updateText() {
	// 当前绑定的值
	const val = props.modelValue;

	// 如果值为null或空，直接返回空字符串
	if (val == null || isEmpty(val)) {
		text.value = "";
	} else {
		// 用于存储每列的选中值
		let arr: any[];

		if (props.columnCount == 1) {
			// 单列时将值包装为数组
			arr = [val];
		} else {
			// 多列时直接使用数组
			arr = val as any[];
		}

		// 遍历每列的选中值，查找对应label，找不到则用空字符串
		text.value = arr
			.map((e, i) => columns.value[i].find((a) => a.value == e)?.label ?? "")
			.join(props.splitor);
	}
}

// 获取当前选中值
function getValue() {
	return props.columnCount == 1 ? value.value[0] : value.value;
}

// 解析值
function setValue(val: ClSelectValue) {
	// 声明选中值数组
	let _value: any[];

	// 判断值是否为null
	if (val == null) {
		// 设置为空数组
		_value = [];
	}
	// 判断是否为数组类型
	else if (Array.isArray(val)) {
		// 使用该数组
		_value = [...(val as any[])];
	}
	// 其他类型
	else {
		// 转换为数组格式
		_value = [val];
	}

	// 存储每列选中项的索引值
	let _indexes = [] as number[];

	// 遍历所有列
	for (let i = 0; i < props.columnCount; i++) {
		// 获取当前列的选项数据
		const column = columns.value[i];

		// 判断是否超出选中值数组长度
		if (i >= _value.length) {
			// 添加默认索引0
			_indexes.push(0);

			// 添加默认值
			if (!isNull(column) && column.length > 0 && !isNull(column[0])) {
				_value.push(column[0].value);
			}
		}
		// 在范围内
		else {
			// 查找匹配的选项索引
			let index = column.findIndex((e) => e.value == _value[i]);

			// 索引无效时重置为0
			if (index < 0) {
				index = 0;
			}

			// 添加索引
			_indexes.push(index);
		}
	}

	// 更新选中值
	value.value = _value;

	// 更新索引值
	indexes.value = _indexes;

	// 更新显示文本
	updateText();
}

// 选择器值改变事件
function onChange(a: number[]) {
	// 复制当前组件内部维护的索引数组
	const b = [...indexes.value];

	// 标记是否有列发生改变
	let changed = false;

	// 遍历所有列,处理联动逻辑
	for (let i = 0; i < a.length; i++) {
		if (changed) {
			// 如果前面的列发生改变,后续列重置为第一项(索引0)
			b[i] = 0;
		} else {
			// 检查当前列是否发生改变
			if (b[i] != a[i]) {
				// 更新当前列的索引
				b[i] = a[i];
				// 标记已发生改变,后续列需要重置
				changed = true;
			}
		}
	}

	// 更新组件内部维护的索引数组
	indexes.value = b;
	// 根据最新的索引数组,更新选中的值数组
	value.value = b.map((e, i) => (isNull(columns.value[i][e]) ? 0 : columns.value[i][e].value));

	// 触发changing事件
	emit("changing", getValue());
}

// 选择器显示状态
const visible = ref(false);

// 选择回调函数
let callback: ((value: ClSelectValue) => void) | null = null;

// 打开选择器
function open(cb: ((value: ClSelectValue) => void) | null = null) {
	visible.value = true;

	// 设置值
	setValue(props.modelValue);

	// 回调
	callback = cb;
}

// 关闭选择器
function close() {
	visible.value = false;
}

// 清空选择器
function clear() {
	text.value = "";

	if (props.columnCount == 1) {
		emit("update:modelValue", null);
		emit("change", null);
	} else {
		emit("update:modelValue", [] as any[]);
		emit("change", [] as any[]);
	}
}

// 确认选择
function confirm() {
	// 根据列数返回单个值或数组
	const val = getValue();

	// 触发更新事件
	emit("update:modelValue", val);
	emit("change", val);

	// 触发回调
	if (callback != null) {
		callback!(val);
	}

	// 关闭选择器
	close();
}

// 监听modelValue变化
watch(
	computed(() => props.modelValue),
	(val: ClSelectValue) => {
		setValue(val);
	},
	{
		immediate: true
	}
);

__expose({
	open,
	close
});

return (): any | null => {

const _component_cl_select_trigger = resolveEasyComponent("cl-select-trigger",_easycom_cl_select_trigger)
const _component_cl_empty = resolveEasyComponent("cl-empty",_easycom_cl_empty)
const _component_cl_picker_view = resolveEasyComponent("cl-picker-view",_easycom_cl_picker_view)
const _component_cl_button = resolveEasyComponent("cl-button",_easycom_cl_button)
const _component_cl_popup = resolveEasyComponent("cl-popup",_easycom_cl_popup)

  return _cE(Fragment, null, [
    isTrue(_ctx.showTrigger)
      ? _cV(_component_cl_select_trigger, _uM({
          key: 0,
          pt: ptTrigger.value,
          placeholder: _ctx.placeholder,
          disabled: _ctx.disabled,
          focus: popupRef.value?.isOpen,
          text: text.value,
          onOpen: () => {open()},
          onClear: clear
        }), null, 8 /* PROPS */, ["pt", "placeholder", "disabled", "focus", "text", "onOpen"])
      : _cC("v-if", true),
    _cV(_component_cl_popup, _uM({
      ref_key: "popupRef",
      ref: popupRef,
      modelValue: visible.value,
      "onUpdate:modelValue": $event => {(visible).value = $event},
      title: _ctx.title,
      pt: ptPopup.value
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cE("view", _uM({
          class: "cl-select-popup",
          onTouchmove: withModifiers(() => {}, ["stop"])
        }), [
          renderSlot(_ctx.$slots, "prepend"),
          _cE("view", _uM({ class: "cl-select-popup__picker" }), [
            isTrue(noOptions.value)
              ? _cV(_component_cl_empty, _uM({
                  key: 0,
                  fixed: false,
                  pt: {
						className: '-important-h--bracket-start-600rpx-bracket-end-'
					}
                }))
              : _cV(_component_cl_picker_view, _uM({
                  key: 1,
                  value: indexes.value,
                  columns: columns.value,
                  onChangeIndex: onChange
                }), null, 8 /* PROPS */, ["value", "columns"])
          ]),
          renderSlot(_ctx.$slots, "append"),
          _cE("view", _uM({ class: "cl-select-popup__op" }), [
            isTrue(_ctx.showCancel)
              ? _cV(_component_cl_button, _uM({
                  key: 0,
                  size: "large",
                  text: "",
                  border: "",
                  type: "light",
                  pt: {
						className: 'flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-'
					},
                  onClick: close
                }), _uM({
                  default: withSlotCtx((): any[] => [_tD(_ctx.cancelText)]),
                  _: 1 /* STABLE */
                }))
              : _cC("v-if", true),
            isTrue(_ctx.showConfirm && !noOptions.value)
              ? _cV(_component_cl_button, _uM({
                  key: 1,
                  size: "large",
                  pt: {
						className: 'flex-1 -important-rounded-xl h--bracket-start-80rpx-bracket-end-'
					},
                  onClick: confirm
                }), _uM({
                  default: withSlotCtx((): any[] => [_tD(_ctx.confirmText)]),
                  _: 1 /* STABLE */
                }))
              : _cC("v-if", true)
          ])
        ], 40 /* PROPS, NEED_HYDRATION */, ["onTouchmove"])
      ]),
      _: 3 /* FORWARDED */
    }), 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "title", "pt"])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
export type ClSelectComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClSelectClSelectStyles = [_uM([["cl-select-popup__op", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"]]))]])]

import { ClPopupComponentPublicInstance  } from "@/uni_modules/cool-unix/components/cl-popup/cl-popup.uvue"