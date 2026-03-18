import _easycom_cl_select_trigger from '@/uni_modules/cool-unix/components/cl-select-trigger/cl-select-trigger.uvue'
import _easycom_cl_tag from '@/uni_modules/cool-unix/components/cl-tag/cl-tag.uvue'
import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_picker_view from '@/uni_modules/cool-unix/components/cl-picker-view/cl-picker-view.uvue'
import _easycom_cl_button from '@/uni_modules/cool-unix/components/cl-button/cl-button.uvue'
import _easycom_cl_popup from '@/uni_modules/cool-unix/components/cl-popup/cl-popup.uvue'
import { ref, computed, type PropType, watch, nextTick } from "vue";
import type { ClSelectDateShortcut, ClSelectOption } from "../../types";
import { dayUts, isEmpty, isNull, parsePt, parseToObject } from "../../cool";
import type { ClSelectTriggerPassThrough } from "../cl-select-trigger/props";
import type { ClPopupPassThrough } from "../cl-popup/props";
import { t } from "../../locale";
import { isDark } from "../../theme";
import { useUi } from "../../hooks";
import { config } from "../../config";

type PassThrough = { __$originalPosition?: UTSSourceMapPosition<"PassThrough", "uni_modules/cool-unix/components/cl-select-date/cl-select-date.uvue", 264, 6>;
	trigger?: ClSelectTriggerPassThrough;
	popup?: ClPopupPassThrough;
};

// 解析透传样式配置，返回合并后的样式对象

const __sfc__ = defineComponent({
  __name: 'cl-select-date',

	name: "cl-select-date"
,
  props: {
	// 透传样式配置，支持外部自定义样式
	pt: {
		type: Object,
		default: () => ({})
	},
	// 选择器的值，外部v-model绑定
	modelValue: {
		type: String,
		default: ""
	},
	// 选择器的范围值，外部v-model:values绑定
	values: {
		type: Array as PropType<string[]>,
		default: () => []
	},
	// 表头
	headers: {
		type: Array as PropType<string[]>,
		default: () => [t("年"), t("月"), t("日"), t("时"), t("分"), t("秒")]
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
	},
	// 标签格式化
	labelFormat: {
		type: String as PropType<string>,
		default: ""
	},
	// 值格式化
	valueFormat: {
		type: String as PropType<string>,
		default: ""
	},
	// 开始日期
	start: {
		type: String,
		default: config.startDate
	},
	// 结束日期
	end: {
		type: String,
		default: config.endDate
	},
	// 类型，控制选择的粒度
	type: {
		type: String as PropType<"year" | "month" | "date" | "hour" | "minute" | "second">,
		default: "second"
	},
	// 是否范围选择
	rangeable: {
		type: Boolean,
		default: false
	},
	// 开始日期占位符
	startPlaceholder: {
		type: String,
		default: () => t("开始日期")
	},
	// 结束日期占位符
	endPlaceholder: {
		type: String,
		default: () => t("结束日期")
	},
	// 范围分隔符
	rangeSeparator: {
		type: String,
		default: () => t(" 至 ")
	},
	// 是否显示快捷选项
	showShortcuts: {
		type: Boolean,
		default: true
	},
	// 快捷选项
	shortcuts: {
		type: Array as PropType<ClSelectDateShortcut[]>,
		default: () => []
	}
},
  emits: ["update:modelValue", "change", "update:values", "range-change"],
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

const ui = useUi();

// 弹出层引用，用于控制popup的显示与隐藏
const popupRef = ref<ClPopupComponentPublicInstance | null>(null);

// 透传样式类型定义
const pt = computed(() => parsePt<PassThrough>(props.pt));

// 解析触发器透传样式配置
const ptTrigger = computed(() => parseToObject(pt.value.trigger));

// 解析弹窗透传样式配置
const ptPopup = computed(() => parseToObject(pt.value.popup));

// 格式化类型
const formatType = computed(() => {
	switch (props.type) {
		case "year":
			return "YYYY";
		case "month":
			return "YYYY-MM";
		case "date":
			return "YYYY-MM-DD";
		case "hour":
		case "minute":
		case "second":
			return "YYYY-MM-DD HH:mm:ss";
		default:
			return "YYYY-MM-DD HH:mm:ss";
	}
});

// 标签格式化
const labelFormat = computed(() => {
	if (isNull(props.labelFormat) || isEmpty(props.labelFormat)) {
		return formatType.value;
	}

	return props.labelFormat;
});

// 值格式化
const valueFormat = computed(() => {
	if (isNull(props.valueFormat) || isEmpty(props.valueFormat)) {
		return formatType.value;
	}

	return props.valueFormat;
});

// 快捷选项索引
const shortcutsIndex = ref<number>(-1);

// 快捷选项列表
const shortcuts = computed<ClSelectDateShortcut[]>(() => {
	if (!isEmpty(props.shortcuts)) {
		return props.shortcuts;
	}

	return [
		{
			label: t("今天"),
			value: [dayUts().format(valueFormat.value), dayUts().format(valueFormat.value)]
		},
		{
			label: t("近7天"),
			value: [
				dayUts().subtract(7, "day").format(valueFormat.value),
				dayUts().format(valueFormat.value)
			]
		},
		{
			label: t("近30天"),
			value: [
				dayUts().subtract(30, "day").format(valueFormat.value),
				dayUts().format(valueFormat.value)
			]
		},
		{
			label: t("近90天"),
			value: [
				dayUts().subtract(90, "day").format(valueFormat.value),
				dayUts().format(valueFormat.value)
			]
		},
		{
			label: t("近一年"),
			value: [
				dayUts().subtract(1, "year").format(valueFormat.value),
				dayUts().format(valueFormat.value)
			]
		}
	];
});

// 范围值索引，0为开始日期，1为结束日期
const rangeIndex = ref<number>(0);

// 范围值，依次为开始日期、结束日期
const values = ref<string[]>(["", ""]);

// 当前选中的值，存储为数组，依次为年月日时分秒
const value = ref<number[]>([]);

// 开始日期
const start = computed(() => {
	if (props.rangeable) {
		if (rangeIndex.value == 0) {
			return props.start;
		} else {
			return values.value[0];
		}
	} else {
		return props.start;
	}
});

// 时间选择器列表，动态生成每一列的选项
const list = computed(() => {
	// 解析开始日期为年月日时分秒数组
	const [startYear, startMonth, startDate, startHour, startMinute, startSecond] = dayUts(
		start.value
	).toArray();
	// 解析结束日期为年月日时分秒数组
	const [endYear, endMonth, endDate, endHour, endMinute, endSecond] = dayUts(props.end).toArray();
	// 初始化年月日时分秒六个选项数组
	const arr = [[], [], [], [], [], []] as ClSelectOption[][];
	// 边界处理，如果value为空，返回空数组
	if (isEmpty(value.value)) {
		return arr;
	}
	// 获取当前选中的年月日时分秒值
	const [year, month, date, hour, minute] = value.value;
	// 判断是否为闰年
	const isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
	// 根据月份和是否闰年获取当月天数
	const days = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
		month > 0 ? month - 1 : 0
	];
	// 计算年份范围，确保至少有60年可选
	const yearRange = Math.max(60, endYear - startYear + 1);
	// 遍历生成年月日时分秒的选项
	for (let i = 0; i < yearRange; i++) {
		// 计算当前遍历的年份
		const yearNum = startYear + i;
		// 如果年份在结束年份范围内，添加到年份选项
		if (yearNum <= endYear) {
			arr[0].push({
				label: yearNum.toString(),
				value: yearNum
			});
		}
		// 处理月份选项
		let monthNum = startYear == year ? startMonth + i : i + 1;
		let endMonthNum = endYear == year ? endMonth : 12;
		// 添加有效的月份选项
		if (monthNum <= endMonthNum) {
			arr[1].push({
				label: monthNum.toString().padStart(2, "0"),
				value: monthNum
			});
		}
		// 处理日期选项
		let dateNum = startYear == year && startMonth == month ? startDate + i : i + 1;
		let endDateNum = endYear == year && endMonth == month ? endDate : days;
		// 添加有效的日期选项
		if (dateNum <= endDateNum) {
			arr[2].push({
				label: dateNum.toString().padStart(2, "0"),
				value: dateNum
			});
		}
		// 处理小时选项
		let hourNum =
			startYear == year && startMonth == month && startDate == date ? startHour + i : i;
		let endHourNum = endYear == year && endMonth == month && endDate == date ? endHour : 24;
		// 添加有效的小时选项
		if (hourNum < endHourNum) {
			arr[3].push({
				label: hourNum.toString().padStart(2, "0"),
				value: hourNum
			});
		}
		// 处理分钟选项
		let minuteNum =
			startYear == year && startMonth == month && startDate == date && startHour == hour
				? startMinute + i
				: i;
		let endMinuteNum =
			endYear == year && endMonth == month && endDate == date && endHour == hour
				? endMinute
				: 60;
		// 添加有效的分钟选项
		if (minuteNum < endMinuteNum) {
			arr[4].push({
				label: minuteNum.toString().padStart(2, "0"),
				value: minuteNum
			});
		}
		// 处理秒钟选项
		let secondNum =
			startYear == year &&
			startMonth == month &&
			startDate == date &&
			startHour == hour &&
			startMinute == minute
				? startSecond + i
				: i;
		let endSecondNum =
			endYear == year &&
			endMonth == month &&
			endDate == date &&
			endHour == hour &&
			endMinute == minute
				? endSecond
				: 60;
		// 添加有效的秒钟选项
		if (secondNum < endSecondNum) {
			arr[5].push({
				label: secondNum.toString().padStart(2, "0"),
				value: secondNum
			});
		}
	}
	// 返回包含所有时间选项的数组
	return arr;
});

// 列数，决定显示多少列（年、月、日、时、分、秒）
const columnNum = computed(() => {
	return (
		["year", "month", "date", "hour", "minute", "second"].findIndex((e) => e == props.type) + 1
	);
});

// 列数据，取出需要显示的列
const columns = computed(() => {
	return list.value.slice(0, columnNum.value);
});

// 当前选中项的索引，返回每一列当前选中的下标
const indexes = computed(() => {
	// 如果当前值为空，返回空数组
	if (isEmpty(value.value)) {
		return [];
	}

	// 遍历每一列，查找当前值在选项中的下标
	return value.value.map((e, i) => {
		let index = list.value[i].findIndex((a) => a.value == e) as number;

		// 如果未找到，返回最后一个
		if (index == -1) {
			index = list.value[i].length - 1;
		}

		// 如果小于0，返回0
		if (index < 0) {
			index = 0;
		}

		return index;
	});
});

// 将当前选中的年月日时分秒拼接为字符串
function toDate() {
	// 使用数组存储日期时间各部分,避免重复字符串拼接
	const parts: string[] = [];
	// 月日时分秒需要补0对齐
	const units = ["", "-", "-", " ", ":", ":"];
	// 默认值
	const defaultValue = [2000, 1, 1, 0, 0, 0];
	// 遍历处理各个时间单位
	units.forEach((key, i) => {
		let val = value.value[i];
		// 超出当前列数时，使用默认值
		if (i >= columnNum.value) {
			val = defaultValue[i];
		}
		// 拼接字符串并补0
		parts.push(key + val.toString().padStart(2, "0"));
	});
	// 拼接所有部分返回
	return parts.join("");
}

// 检查边界值
function checkDate(values: number[]): number[] {
	if (values.length == 0) {
		return values;
	}

	// 确保至少有6个元素，缺失的用默认值填充
	const checkedValues = [...values];
	const defaultValues = [2000, 1, 1, 0, 0, 0];
	for (let i = checkedValues.length; i < 6; i++) {
		checkedValues.push(defaultValues[i]);
	}

	let [year, month, date, hour, minute, second] = checkedValues;

	// 检查日期边界（根据年份和月份确定最大天数）
	// 判断是否为闰年
	const isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
	// 每月天数数组，2月根据闰年判断
	const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const maxDay = daysInMonth[month - 1];

	if (date < 1) {
		date = 1;
	} else if (date > maxDay) {
		date = maxDay;
	}

	// 检查小时边界 (0-23)
	if (hour < 0) {
		hour = 0;
	} else if (hour > 23) {
		hour = 23;
	}

	// 检查分钟边界 (0-59)
	if (minute < 0) {
		minute = 0;
	} else if (minute > 59) {
		minute = 59;
	}

	// 检查秒钟边界 (0-59)
	if (second < 0) {
		second = 0;
	} else if (second > 59) {
		second = 59;
	}

	return [year, month, date, hour, minute, second];
}

// 显示文本
const text = ref("");

// 更新文本内容
function updateText() {
	if (props.rangeable) {
		text.value = values.value
			.map((e) => dayUts(e).format(labelFormat.value))
			.join(` ${props.rangeSeparator} `);
	} else {
		text.value = dayUts(toDate()).format(labelFormat.value);
	}
}

// 选择器值改变事件，更新value
async function onChange(data: number[]) {
	// 更新value
	value.value = checkDate(data);

	// 不能大于结束日期
	if (dayUts(toDate()).isAfter(dayUts(props.end))) {
		value.value = dayUts(props.end).toArray();
	}

	// 不能小于开始日期
	if (dayUts(toDate()).isBefore(dayUts(props.start))) {
		value.value = dayUts(props.start).toArray();
	}

	// 设置范围值
	if (props.rangeable) {
		values.value[rangeIndex.value] = dayUts(toDate()).format(valueFormat.value);

		// 判断开始日期是否大于结束日期
		if (dayUts(values.value[0]).isAfter(dayUts(values.value[1])) && values.value[1] != "") {
			values.value[1] = values.value[0];
		}

		// 重置快捷选项索引
		shortcutsIndex.value = -1;
	}
}

// 设置value
function setValue(val: string) {
	// 如果值为空，使用当前时间
	if (isNull(val) || isEmpty(val)) {
		value.value = checkDate(dayUts().toArray());
		text.value = "";
	} else {
		// 否则解析为数组
		value.value = checkDate(dayUts(val).toArray());
		updateText();
	}
}

// 设置values
function setValues(val: string[]) {
	if (isEmpty(val)) {
		values.value = ["", ""];
		text.value = "";
	} else {
		values.value = val;
		updateText();
	}
}

// 设置范围值索引
function setRange(index: number) {
	rangeIndex.value = index;
	setValue(values.value[index]);
}

// 设置范围值
function setRangeValue(val: string[], index: number) {
	shortcutsIndex.value = index;
	values.value = [...val] as string[];
	setValue(val[rangeIndex.value]);
}

// 选择器显示状态，控制popup显示
const visible = ref(false);

// 选择回调函数
let callback: ((value: string | string[]) => void) | null = null;

// 打开选择器
function open(cb: ((value: string | string[]) => void) | null = null) {
	// 如果组件被禁用，则不执行后续操作，直接返回
	if (props.disabled) {
		return;
	}

	// 显示选择器弹窗
	visible.value = true;
	// 保存回调函数
	callback = cb;

	nextTick(() => {
		if (props.rangeable) {
			// 如果是范围选择，初始化为选择开始时间
			rangeIndex.value = 0;

			// 设置范围值
			setValues(props.values);

			// 设置当前选中的值为范围的开始值
			setValue(values.value[0]);
		} else {
			// 非范围选择，设置当前选中的值为modelValue
			setValue(props.modelValue);
		}
	});
}

// 关闭选择器，设置visible为false
function close() {
	visible.value = false;
}

// 选择器关闭后
function onClosed() {
	values.value = ["", ""];
}

// 清空选择器，重置显示文本并触发事件
function clear() {
	text.value = "";

	if (props.rangeable) {
		emit("update:values", [] as string[]);
		emit("range-change", [] as string[]);
	} else {
		emit("update:modelValue", "");
		emit("change", "");
	}
}

// 确认选择，触发事件并关闭选择器
function confirm() {
	if (props.rangeable) {
		const [a, b] = values.value;

		if (a == "" || b == "") {
			ui.showToast({
				message: t("请选择完整时间范围")
			});

			if (a != "") {
				rangeIndex.value = 1;
			}

			return;
		}

		if (dayUts(a).isAfter(dayUts(b))) {
			ui.showToast({
				message: t("开始日期不能大于结束日期")
			});

			return;
		}

		// 触发更新事件
		emit("update:values", values.value);
		emit("range-change", values.value);

		// 触发回调
		if (callback != null) {
			callback!(values.value as string[]);
		}
	} else {
		const val = dayUts(toDate()).format(valueFormat.value);

		// 触发更新事件
		emit("update:modelValue", val);
		emit("change", val);

		// 触发回调
		if (callback != null) {
			callback!(val);
		}
	}

	// 更新显示文本
	updateText();

	// 关闭选择器
	close();
}

// 监听modelValue变化
watch(
	computed(() => props.modelValue),
	(val: string) => {
		if (!props.rangeable) {
			setValue(val);
		}
	},
	{
		immediate: true
	}
);

// 监听values变化
watch(
	computed(() => props.values),
	(val: string[]) => {
		if (props.rangeable) {
			setValues(val);
		}
	},
	{
		immediate: true
	}
);

// 更新显示文本
watch(
	computed(() => props.labelFormat),
	() => {
		updateText();
	}
);

__expose({
	open,
	close,
	clear,
	confirm,
	setValue,
	setValues,
	setRange
});

return (): any | null => {

const _component_cl_select_trigger = resolveEasyComponent("cl-select-trigger",_easycom_cl_select_trigger)
const _component_cl_tag = resolveEasyComponent("cl-tag",_easycom_cl_tag)
const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
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
          "arrow-icon": "calendar-line",
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
      pt: ptPopup.value,
      onClosed: onClosed
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cE("view", _uM({
          class: "cl-select-popup",
          onTouchmove: withModifiers(() => {}, ["stop"])
        }), [
          isTrue(_ctx.rangeable)
            ? _cE("view", _uM({
                key: 0,
                class: "cl-select-popup__range"
              }), [
                isTrue(_ctx.showShortcuts)
                  ? _cE("view", _uM({
                      key: 0,
                      class: "cl-select-popup__range-shortcuts"
                    }), [
                      _cE(Fragment, null, RenderHelpers.renderList(shortcuts.value, (item, index, __index, _cached): any => {
                        return _cV(_component_cl_tag, _uM({
                          key: index,
                          plain: "",
                          type: shortcutsIndex.value == index ? 'primary' : 'info',
                          onClick: () => {setRangeValue(item.value, index)}
                        }), _uM({
                          default: withSlotCtx((): any[] => [_tD(item.label)]),
                          _: 2 /* DYNAMIC */
                        }), 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "onClick"])
                      }), 128 /* KEYED_FRAGMENT */)
                    ])
                  : _cC("v-if", true),
                _cE("view", _uM({ class: "cl-select-popup__range-values" }), [
                  _cE("view", _uM({
                    class: _nC(["cl-select-popup__range-values-start", _uM({
							'is-dark': unref(isDark),
							active: rangeIndex.value == 0
						})]),
                    onClick: () => {setRange(0)}
                  }), [
                    isTrue(values.value.length  > 0 && values.value[0] != '')
                      ? _cV(_component_cl_text, _uM({
                          key: 0,
                          pt: {
								className: 'text-center'
							}
                        }), _uM({
                          default: withSlotCtx((): any[] => [_tD(values.value[0])]),
                          _: 1 /* STABLE */
                        }))
                      : _cV(_component_cl_text, _uM({
                          key: 1,
                          pt: {
								className: 'text-center text-surface-400'
							}
                        }), _uM({
                          default: withSlotCtx((): any[] => [_tD(_ctx.startPlaceholder)]),
                          _: 1 /* STABLE */
                        }))
                  ], 10 /* CLASS, PROPS */, ["onClick"]),
                  _cV(_component_cl_text, _uM({ pt: { className: 'mx-3' } }), _uM({
                    default: withSlotCtx((): any[] => [_tD(_ctx.rangeSeparator)]),
                    _: 1 /* STABLE */
                  })),
                  _cE("view", _uM({
                    class: _nC(["cl-select-popup__range-values-end", _uM({
							'is-dark': unref(isDark),
							active: rangeIndex.value == 1
						})]),
                    onClick: () => {setRange(1)}
                  }), [
                    isTrue(values.value.length  > 1 && values.value[1] != '')
                      ? _cV(_component_cl_text, _uM({
                          key: 0,
                          pt: {
								className: 'text-center'
							}
                        }), _uM({
                          default: withSlotCtx((): any[] => [_tD(values.value[1])]),
                          _: 1 /* STABLE */
                        }))
                      : _cV(_component_cl_text, _uM({
                          key: 1,
                          pt: {
								className: 'text-center text-surface-400'
							}
                        }), _uM({
                          default: withSlotCtx((): any[] => [_tD(_ctx.endPlaceholder)]),
                          _: 1 /* STABLE */
                        }))
                  ], 10 /* CLASS, PROPS */, ["onClick"])
                ])
              ])
            : _cC("v-if", true),
          _cE("view", _uM({ class: "cl-select-popup__picker" }), [
            _cV(_component_cl_picker_view, _uM({
              headers: _ctx.headers,
              value: indexes.value,
              columns: columns.value,
              "reset-on-change": false,
              onChangeValue: onChange
            }), null, 8 /* PROPS */, ["headers", "value", "columns"])
          ]),
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
            isTrue(_ctx.showConfirm)
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
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "title", "pt"])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
export type ClSelectDateComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClSelectDateClSelectDateStyles = [_uM([["cl-select-popup__op", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"]]))], ["cl-select-popup__range", _pS(_uM([["paddingLeft", "21rpx"], ["paddingRight", "21rpx"], ["paddingTop", "14rpx"], ["paddingBottom", "35rpx"]]))], ["cl-select-popup__range-values", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["cl-select-popup__range-values-start", _uM([["", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["borderTopLeftRadius", "21rpx"], ["borderTopRightRadius", "21rpx"], ["borderBottomRightRadius", "21rpx"], ["borderBottomLeftRadius", "21rpx"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(228,228,231,1)"], ["borderRightColor", "rgba(228,228,231,1)"], ["borderBottomColor", "rgba(228,228,231,1)"], ["borderLeftColor", "rgba(228,228,231,1)"], ["backgroundColor", "rgba(250,250,250,1)"], ["paddingTop", "14rpx"], ["paddingBottom", "14rpx"]])], [".is-dark", _uM([["borderTopColor", "rgba(113,113,122,1)"], ["borderRightColor", "rgba(113,113,122,1)"], ["borderBottomColor", "rgba(113,113,122,1)"], ["borderLeftColor", "rgba(113,113,122,1)"], ["backgroundColor", "rgba(63,63,70,1)"]])], [".active", _uM([["borderTopColor", "rgba(20,184,166,1)"], ["borderRightColor", "rgba(20,184,166,1)"], ["borderBottomColor", "rgba(20,184,166,1)"], ["borderLeftColor", "rgba(20,184,166,1)"], ["backgroundColor", "rgba(0,0,0,0)"]])]])], ["cl-select-popup__range-values-end", _uM([["", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["borderTopLeftRadius", "21rpx"], ["borderTopRightRadius", "21rpx"], ["borderBottomRightRadius", "21rpx"], ["borderBottomLeftRadius", "21rpx"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(228,228,231,1)"], ["borderRightColor", "rgba(228,228,231,1)"], ["borderBottomColor", "rgba(228,228,231,1)"], ["borderLeftColor", "rgba(228,228,231,1)"], ["backgroundColor", "rgba(250,250,250,1)"], ["paddingTop", "14rpx"], ["paddingBottom", "14rpx"]])], [".is-dark", _uM([["borderTopColor", "rgba(113,113,122,1)"], ["borderRightColor", "rgba(113,113,122,1)"], ["borderBottomColor", "rgba(113,113,122,1)"], ["borderLeftColor", "rgba(113,113,122,1)"], ["backgroundColor", "rgba(63,63,70,1)"]])], [".active", _uM([["borderTopColor", "rgba(20,184,166,1)"], ["borderRightColor", "rgba(20,184,166,1)"], ["borderBottomColor", "rgba(20,184,166,1)"], ["borderLeftColor", "rgba(20,184,166,1)"], ["backgroundColor", "rgba(0,0,0,0)"]])]])], ["cl-select-popup__range-shortcuts", _pS(_uM([["marginBottom", "28rpx"], ["display", "flex"], ["flexDirection", "row"], ["flexWrap", "wrap"], ["alignItems", "center"]]))]])]

import { ClPopupComponentPublicInstance  } from "@/uni_modules/cool-unix/components/cl-popup/cl-popup.uvue"