import _easycom_cl_icon from '@/uni_modules/cool-unix/components/cl-icon/cl-icon.uvue'
import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_tree_item from '@/uni_modules/cool-unix/components/cl-tree-item/cl-tree-item.uvue'
import { computed, ref, inject, type PropType } from "vue";
import { parseClass, parsePt, useParent } from "../../cool";
import { isDark } from "../../theme";
import type { ClTreeItem, PassThroughProps } from "../../types";
import type { ClIconProps } from "../cl-icon/props";

type PassThrough = { __$originalPosition?: UTSSourceMapPosition<"PassThrough", "uni_modules/cool-unix/components/cl-tree-item/cl-tree-item.uvue", 115, 6>;
	item?: PassThroughProps; // 自定义类名
	itemChecked?: PassThroughProps; // 选中状态属性
	itemWrapper?: PassThroughProps; // 外层包裹属性
	expand?: PassThroughProps; // 展开区域属性
	expandIcon?: ClIconProps; // 展开图标属性
	checkbox?: PassThroughProps; // 复选框区域属性
	checkedIcon?: ClIconProps; // 选中图标属性
	halfCheckedIcon?: ClIconProps; // 半选图标属性
	uncheckedIcon?: ClIconProps; // 未选中图标属性
	label?: PassThroughProps; // 标签属性
};

// 解析pt透传属性，便于自定义样式和图标

const __sfc__ = defineComponent({
  __name: 'cl-tree-item',

	name: "cl-tree-item"
,
  props: {
	pt: {
		type: Object,
		default: () => ({})
	},
	item: {
		type: Object as PropType<ClTreeItem>,
		default: () => ({})
	},
	level: {
		type: Number,
		default: 0
	}
},
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;



const props = __props;

// 透传属性类型定义，支持自定义各部分样式和图标
const pt = computed(() => parsePt<PassThrough>(props.pt));

// 优先从 inject 获取树实例（保证递归子节点也能拿到），否则再通过 useParent 查找
const ClTree = inject<ClTreeComponentPublicInstance>("ClTree") ?? useParent<ClTreeComponentPublicInstance>("cl-tree");

// 判断当前节点是否有子节点
const hasChildren = computed(() => props.item.children != null && props.item.children.length > 0);

// 判断当前节点是否显示复选框
const showCheckbox = computed(() => {
	if (ClTree == null) {
		return false;
	}

	return ClTree.checkable == true && ClTree.multiple == true;
});

// 计算当前节点应显示的图标（展开/收起）
const icon = computed(() => {
	if (ClTree == null) {
		return "";
	}
	return props.item.isExpand == true ? ClTree.expandIcon : ClTree.icon;
});

// 切换当前节点的展开状态
function toExpand() {
	ClTree!.setExpanded(props.item.id, !(props.item.isExpand ?? false));
}

// 切换当前节点的选中状态
function toChecked() {
	if (props.item.disabled == true) {
		return;
	}

	ClTree!.setChecked(props.item.id, !(props.item.isChecked ?? false));
}

// 控制节点按下时的hover状态
const hover = ref(false);

// 触摸开始时触发，设置hover并展开/收起
function onTouchStart() {
	hover.value = true;
	toExpand();

	if (ClTree != null) {
		if (ClTree.checkable == true && ClTree.multiple != true && props.item.disabled != true) {
			toChecked();
		}
	}
}

// 触摸结束时触发，取消hover
function onTouchEnd() {
	hover.value = false;
}

return (): any | null => {

const _component_cl_icon = resolveEasyComponent("cl-icon",_easycom_cl_icon)
const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_tree_item = resolveEasyComponent("cl-tree-item",_easycom_cl_tree_item)

  return _cE("view", _uM({
    class: _nC(["cl-tree-item-wrapper", [_uM<string, any | null>({}),pt.value.itemWrapper?.className]])
  }), [
    _cE("view", _uM({
      class: _nC(["cl-tree-item", [_uM<string, any | null>({}),
				_uM({
					'is-expand': hover.value,
					'is-dark': unref(isDark),
					'is-checked':
						_ctx.item.isChecked == true &&
						unref(ClTree)?.checkable == true &&
						unref(ClTree)?.multiple == false,
					'is-half-checked': _ctx.item.isHalfChecked,
					'is-disabled': _ctx.item.disabled,
					'is-multiple': unref(ClTree)?.multiple
				}),
				pt.value.item?.className,
				_ctx.item.isChecked == true ? pt.value.itemChecked?.className : ''
			]]),
      style: _nS(_uM({
				paddingLeft: `${_ctx.level * 50 + 16}rpx`
			})),
      onTouchstart: onTouchStart,
      onTouchend: onTouchEnd,
      onTouchcancel: onTouchEnd
    }), [
      _cE("view", _uM({
        class: _nC(["cl-tree-item__expand", [_uM<string, any | null>({}),pt.value.expand?.className]])
      }), [
        isTrue(hasChildren.value)
          ? _cV(_component_cl_icon, _uM({
              key: 0,
              name: icon.value,
              size: pt.value.expandIcon?.size ?? 34,
              color: pt.value.expandIcon?.color,
              pt: {
						className: pt.value.expandIcon?.className
					}
            }), null, 8 /* PROPS */, ["name", "size", "color", "pt"])
          : _cC("v-if", true)
      ], 2 /* CLASS */),
      _cV(_component_cl_text, _uM({
        pt: {
					className: unref(parseClass)(['flex-1 mx-1', pt.value.label?.className])
				}
      }), _uM({
        default: withSlotCtx((): any[] => [_tD(_ctx.item.label)]),
        _: 1 /* STABLE */
      }), 8 /* PROPS */, ["pt"]),
      isTrue(showCheckbox.value)
        ? _cE("view", _uM({
            key: 0,
            class: _nC(["cl-tree-item__checkbox", [_uM<string, any | null>({}),pt.value.checkbox?.className]]),
            onTouchstart: withModifiers(toChecked, ["stop"])
          }), [
            isTrue(_ctx.item.isChecked)
              ? _cV(_component_cl_icon, _uM({
                  key: 0,
                  name: pt.value.checkedIcon?.name ?? 'checkbox-circle-fill',
                  size: pt.value.checkedIcon?.size ?? 38,
                  color: pt.value.checkedIcon?.color ?? 'primary'
                }), null, 8 /* PROPS */, ["name", "size", "color"])
              : isTrue(_ctx.item.isHalfChecked)
                ? _cV(_component_cl_icon, _uM({
                    key: 1,
                    name: pt.value.halfCheckedIcon?.name ?? 'indeterminate-circle-line',
                    size: pt.value.halfCheckedIcon?.size ?? 38,
                    color: pt.value.halfCheckedIcon?.color ?? 'primary'
                  }), null, 8 /* PROPS */, ["name", "size", "color"])
                : _cV(_component_cl_icon, _uM({
                    key: 2,
                    name: pt.value.uncheckedIcon?.name ?? 'checkbox-blank-circle-line',
                    size: pt.value.uncheckedIcon?.size ?? 38,
                    color: pt.value.uncheckedIcon?.color ?? 'info'
                  }), null, 8 /* PROPS */, ["name", "size", "color"])
          ], 34 /* CLASS, NEED_HYDRATION */)
        : _cC("v-if", true)
    ], 38 /* CLASS, STYLE, NEED_HYDRATION */),
    isTrue(hasChildren.value && _ctx.item.isExpand == true)
      ? _cE(Fragment, _uM({ key: 0 }), RenderHelpers.renderList(_ctx.item.children, (item, __key, __index, _cached): any => {
          return _cV(_component_cl_tree_item, _uM({
            key: item.id,
            item: item,
            level: _ctx.level + 1,
            pt: props.pt
          }), null, 8 /* PROPS */, ["item", "level", "pt"])
        }), 128 /* KEYED_FRAGMENT */)
      : _cC("v-if", true)
  ], 2 /* CLASS */)
}
}

})
export default __sfc__
export type ClTreeItemComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesCoolUnixComponentsClTreeItemClTreeItemStyles = [_uM([["cl-tree-item", _uM([["", _uM([["display", "flex"], ["width", "100%"], ["flexDirection", "row"], ["alignItems", "center"], ["borderTopLeftRadius", "14rpx"], ["borderTopRightRadius", "14rpx"], ["borderBottomRightRadius", "14rpx"], ["borderBottomLeftRadius", "14rpx"], ["paddingTop", "16rpx"], ["paddingRight", "16rpx"], ["paddingBottom", "16rpx"], ["paddingLeft", "16rpx"]])], [".is-expand", _uM([["backgroundColor", "rgba(250,250,250,1)"]])], [".is-expand.is-dark", _uM([["backgroundColor", "rgba(63,63,70,1)"]])], [".is-disabled", _uM([["opacity", 0.5]])], [".is-checked", _uM([["backgroundColor", "rgba(204,251,241,1)"]])], [".is-checked.is-multiple", _uM([["backgroundColor", "rgba(0,0,0,0)"]])], [".is-checked.is-dark", _uM([["backgroundColor", "rgba(20,184,166,1)"]])]])], ["cl-tree-item__expand", _pS(_uM([["display", "flex"], ["width", "42rpx"], ["alignItems", "center"], ["justifyContent", "center"]]))]])]

import { ClTreeComponentPublicInstance  } from "@/uni_modules/cool-unix/components/cl-tree/cl-tree.uvue"